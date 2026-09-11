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
    <div className="bg-stone-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="container-wide py-8">
          <h1 className="page-title mb-2">
            Explore Colleges
          </h1>
          <p className="body-text text-stone-600 max-w-3xl">
            Search and filter accredited institutions across India. Compare fees, placements, ratings, and admission requirements.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b border-stone-200">
        <div className="container-wide py-6">
          <SearchBar />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container-wide py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <FilterPanel />
            </div>
          </aside>

          {/* College Results */}
          <main className="lg:col-span-3">
            <Suspense fallback={<LoadingSkeleton />}>
              <CollegeGrid searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
