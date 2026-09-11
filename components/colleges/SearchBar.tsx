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
    <form onSubmit={handleSearch} className="relative max-w-2xl">
      <div className="relative flex items-center">
        <svg
          className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by college name, city, or state..."
          className="w-full h-11 pl-9 pr-24 border border-stone-300 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-all duration-200 rounded-md"
        />
        <div className="absolute right-1.5 flex items-center space-x-1">
          {term && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-stone-400 hover:text-stone-600 px-2 py-1 rounded transition-colors"
              title="Clear search"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="h-8 px-3 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
