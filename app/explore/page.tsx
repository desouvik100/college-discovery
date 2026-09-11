import { Suspense } from "react";
import CollegeGrid from "@/components/colleges/CollegeGrid";
import SearchBar from "@/components/colleges/SearchBar";
import FilterPanel from "@/components/colleges/FilterPanel";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export const metadata = {
  title: "Explore Colleges | College Discovery",
  description:
    "Filter and compare accredited engineering, medical, and technology institutions across India with historical placement outcomes and admission cutoffs.",
};

export default function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Title & Search Bar in flow */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Explore Colleges
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search institutions across India. Filter by state, type, tuition range, and verify placement statistics.
          </p>
        </div>

        <SearchBar />
      </div>

      {/* Main Discovery Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-1">
          <FilterPanel />
        </aside>

        {/* Results Stream */}
        <main className="lg:col-span-3">
          <Suspense fallback={<LoadingSkeleton />}>
            <CollegeGrid searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
