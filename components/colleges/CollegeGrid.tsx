import CollegeCard from "./CollegeCard";
import Pagination from "./Pagination";
import EmptyState from "@/components/ui/EmptyState";
import SortDropdown from "./SortDropdown";
import { getColleges } from "@/services/collegeService";
import { collegeQuerySchema } from "@/lib/validation";

export default async function CollegeGrid({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let data;
  try {
    const parsedQuery = collegeQuerySchema.parse(searchParams);
    data = await getColleges(parsedQuery);
  } catch (error) {
    console.error("Failed to query colleges:", error);
    return (
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-2">
        <p className="font-semibold text-slate-900">Unable to load colleges right now</p>
        <p className="text-slate-500">Please verify your query parameters or check back in a moment.</p>
        <div className="pt-1">
          <a href="/explore" className="inline-flex text-xs font-medium text-slate-900 underline underline-offset-2">
            Reset directory filters →
          </a>
        </div>
      </div>
    );
  }

  if (data.colleges.length === 0) {
    return (
      <div className="space-y-4">
        <EmptyState
          title="No colleges match these filters"
          description="No institutions matched your active search query or filter criteria. Clear your filters to view all colleges."
          action={{
            label: "Clear all filters",
            href: "/explore",
          }}
        />
      </div>
    );
  }

  const startRecord = (data.pagination.page - 1) * data.pagination.limit + 1;
  const endRecord = Math.min(data.pagination.page * data.pagination.limit, data.pagination.total);

  return (
    <div className="space-y-4">
      {/* Results header & sort controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-900">{startRecord}–{endRecord}</span> of{" "}
          <span className="font-semibold text-slate-900">{data.pagination.total}</span> institutions
        </div>

        <SortDropdown />
      </div>

      {/* College Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pt-4 border-t border-slate-200">
        <Pagination pagination={data.pagination} />
      </div>
    </div>
  );
}
