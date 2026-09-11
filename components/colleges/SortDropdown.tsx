"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "rating";
  const currentOrder = searchParams.get("sortOrder") || "desc";
  const combined = `${currentSort}_${currentOrder}`;

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("_");
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-600">
      <span className="text-slate-400 font-medium">Sort by:</span>
      <select
        value={combined}
        onChange={(e) => handleSortChange(e.target.value)}
        className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
      >
        <option value="rating_desc">Highest Rating</option>
        <option value="fees_asc">Fees (Low to High)</option>
        <option value="fees_desc">Fees (High to Low)</option>
        <option value="name_asc">Name (A–Z)</option>
      </select>
    </div>
  );
}
