"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PaginationData } from "@/lib/types";

interface PaginationProps {
  pagination: PaginationData;
}

export default function Pagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, totalPages } = pagination;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, Math.max(page + 2, 5));
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <nav className="flex items-center justify-between text-xs text-slate-600" aria-label="Pagination">
      <div>
        Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="h-8 px-2.5 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-700 transition-colors"
        >
          Previous
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePageChange(p)}
              className={`h-8 w-8 rounded font-mono text-xs font-medium transition-colors ${
                p === page
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="h-8 px-2.5 rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-700 transition-colors"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
