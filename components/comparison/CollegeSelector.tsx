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
    <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4" ref={containerRef}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Selected Institutions ({selectedIds.length}/3)
          </h2>
          <p className="text-xs text-slate-500">
            Add up to 3 colleges to compare tuition, placement benchmarks, and rankings.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => router.push("/compare")}
            className="text-xs text-slate-500 hover:text-slate-900 underline underline-offset-2 self-start sm:self-auto"
          >
            Clear selection
          </button>
        )}
      </div>

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedIds.map((id, index) => {
            const college = colleges.find((c) => c.id === id);
            return (
              <span
                key={id}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 rounded text-xs font-medium"
              >
                <span>{college ? college.name : `Institution ${index + 1}`}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(id)}
                  className="text-slate-400 hover:text-slate-700 font-bold ml-1"
                  title="Remove from comparison"
                >
                  ×
                </button>
              </span>
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
            className="w-full h-9 px-3 rounded-md border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          {isOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {loading && (
                <div className="p-3 text-xs text-slate-500 text-center">Searching institutions...</div>
              )}
              {!loading && results.length === 0 && (
                <div className="p-3 text-xs text-slate-500 text-center">No matching institutions found</div>
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
                      className={`w-full text-left px-3 py-2.5 text-xs border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        alreadySelected ? "opacity-50 bg-slate-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{c.name}</p>
                        <p className="text-[11px] text-slate-500">{c.location} • {c.collegeType}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <span className="font-medium text-slate-700">★ {Number(c.rating).toFixed(1)}</span>
                        {alreadySelected ? (
                          <span className="block text-[10px] text-slate-400">Selected</span>
                        ) : (
                          <span className="block text-[10px] text-slate-900 font-medium">+ Add</span>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">
          Maximum of 3 institutions selected for side-by-side comparison. Remove one to replace it.
        </p>
      )}
    </div>
  );
}
