"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("search") || "");

  const targetPath = pathname === "/" ? "/explore" : pathname;

  useEffect(() => {
    setTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = term.trim();

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`${targetPath}?${params.toString()}`);
  };

  const handleClear = () => {
    setTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`${targetPath}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative flex items-center">
        <svg
          className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by college name, city, or state (e.g., IIT, Delhi, Bangalore)..."
          className="w-full h-10 pl-9 pr-24 rounded-md border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 shadow-sm"
        />
        <div className="absolute right-1.5 flex items-center space-x-1">
          {term && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-1 rounded"
              title="Clear search"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="h-7 px-3 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
