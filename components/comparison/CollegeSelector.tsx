"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface CollegeItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalFees: number;
  collegeType: string;
}

interface CollegeSelectorProps {
  selectedIds: string[];
  colleges?: CollegeItem[];
}

export default function CollegeSelector({ selectedIds, colleges = [] }: CollegeSelectorProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<CollegeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (search.trim().length >= 2) {
      const timer = setTimeout(() => {
        performSearch(search.trim());
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [search]);

  const performSearch = async (term: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/colleges?search=${encodeURIComponent(term)}&limit=8`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.colleges || []);
        setIsOpen(true);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 3) return;

    const newIds = [...selectedIds, id];
    router.push(`/compare?ids=${newIds.join(",")}`);
    setSearch("");
    setIsOpen(false);
  };

  const handleRemove = (idToRemove: string) => {
    const newIds = selectedIds.filter((id) => id !== idToRemove);
    if (newIds.length > 0) {
      router.push(`/compare?ids=${newIds.join(",")}`);
    } else {
      router.push("/compare");
    }
  };

  return (
    <div className="surface-primary p-6 space-y-6" ref={containerRef}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <h2 className="section-title">
            Selected Institutions ({selectedIds.length}/3)
          </h2>
          <p className="body-text text-stone-600">
            Add up to 3 colleges to compare tuition, placement benchmarks, and rankings.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => router.push("/compare")}
            className="btn btn-ghost self-start lg:self-auto"
          >
            Clear selection
          </button>
        )}
      </div>

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {selectedIds.map((id, index) => {
            const college = colleges.find((c) => c.id === id);
            return (
              <div
                key={id}
                className="inline-flex items-center gap-3 px-4 py-3 surface-secondary rounded-lg border border-stone-200"
              >
                <span className="body-text font-medium text-stone-900">
                  {college ? college.name : `Institution ${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(id)}
                  className="text-stone-500 hover:text-red-600 transition-colors"
                  title="Remove from comparison"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedIds.length < 3 ? (
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => search.length >= 2 && setIsOpen(true)}
            placeholder="Type college or city name to add (e.g., IIT Delhi, BITS, Bangalore)..."
            className="input w-full"
          />

          {isOpen && (
            <div className="absolute z-20 mt-2 w-full surface-primary border border-stone-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {loading && (
                <div className="p-4 body-text text-stone-600 text-center">Searching institutions...</div>
              )}
              {!loading && results.length === 0 && (
                <div className="p-4 body-text text-stone-600 text-center">No matching institutions found</div>
              )}
              {!loading &&
                results.map((c) => {
                  const alreadySelected = selectedIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      disabled={alreadySelected}
                      onClick={() => handleSelect(c.id)}
                      className={`w-full text-left px-4 py-4 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors flex items-center justify-between ${
                        alreadySelected ? "opacity-50 bg-stone-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="body-text font-medium text-stone-900">{c.name}</p>
                        <p className="small-text text-stone-600">{c.location} • {c.collegeType}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4 space-y-1">
                        <div className="body-text font-medium text-stone-700">★ {Number(c.rating).toFixed(1)}</div>
                        {alreadySelected ? (
                          <div className="small-text text-stone-500">Selected</div>
                        ) : (
                          <div className="small-text text-stone-900 font-medium">Add</div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 surface-secondary rounded-lg">
          <p className="body-text text-stone-600">
            Maximum of 3 institutions selected for side-by-side comparison. Remove one to replace it.
          </p>
        </div>
      )}
    </div>
  );
}
