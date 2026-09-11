"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import CollegeSelector from "@/components/comparison/CollegeSelector";
import { formatCurrency } from "@/lib/utils";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedIds = searchParams.get("ids")?.split(",").filter(Boolean) || [];

  useEffect(() => {
    if (selectedIds.length > 0) {
      fetchColleges();
    } else {
      setColleges([]);
    }
  }, [searchParams]);

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/colleges/compare?ids=${selectedIds.join(",")}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch comparison institutions");
      }

      setColleges(data.colleges || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comparison institutions");
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (idToRemove: string) => {
    const newIds = selectedIds.filter((id) => id !== idToRemove);
    if (newIds.length > 0) {
      router.push(`/compare?ids=${newIds.join(",")}`);
    } else {
      router.push("/compare");
    }
  };

  const maxRating = colleges.length > 1 ? Math.max(...colleges.map((c) => c.rating)) : null;
  const minFees = colleges.length > 1 ? Math.min(...colleges.map((c) => c.totalFees)) : null;
  const maxAvgPkg =
    colleges.length > 1
      ? Math.max(...colleges.map((c) => c.placementStats?.averagePackage || 0))
      : null;
  const maxHighestPkg =
    colleges.length > 1
      ? Math.max(...colleges.map((c) => c.placementStats?.highestPackage || 0))
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Compare Institutions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Evaluate parameters, tuition benchmarks, placement records, and program breadth side by side.
        </p>
      </div>

      <CollegeSelector selectedIds={selectedIds} colleges={colleges} />

      {loading && (
        <div className="py-12 text-center text-xs text-slate-500">
          Loading comparison data...
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800">
          {error}
        </div>
      )}

      {!loading && !error && selectedIds.length === 0 && (
        <div className="text-center py-6 px-4 border border-dashed border-slate-200 rounded-lg bg-white space-y-2">
          <p className="text-xs font-semibold text-slate-800">
            No institutions selected for comparison
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Search above by college name or city to select 2 to 3 institutions, or add them directly from the directory.
          </p>
          <div className="pt-1">
            <Link
              href="/explore"
              className="inline-flex items-center text-xs font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2"
            >
              Browse college catalog →
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && selectedIds.length === 1 && colleges.length > 0 && (
        <div className="p-5 border border-slate-200 rounded-lg bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">1 of 3 Selected</span>
            <button
              onClick={() => handleRemove(colleges[0].id)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Remove
            </button>
          </div>
          <p className="text-base font-bold text-slate-900">{colleges[0].name}</p>
          <p className="text-xs text-slate-500">
            {colleges[0].city}, {colleges[0].state} • Rating: ★ {Number(colleges[0].rating).toFixed(1)} • Tuition: {formatCurrency(colleges[0].totalFees)}
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            Add at least one more institution above to display the comparison matrix.
          </div>
        </div>
      )}

      {!loading && !error && colleges.length >= 2 && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 w-48 text-slate-500 font-medium uppercase tracking-wider text-[11px]">
                    Parameter
                  </th>
                  {colleges.map((college) => (
                    <th key={college.id} className="p-4 min-w-[220px] align-top">
                      <div className="space-y-1">
                        <Link
                          href={`/colleges/${college.id}`}
                          className="font-bold text-sm text-slate-900 hover:text-slate-700 underline underline-offset-2 block"
                        >
                          {college.name}
                        </Link>
                        <p className="text-[11px] text-slate-500 font-normal">
                          {college.city}, {college.state}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRemove(college.id)}
                          className="text-[11px] text-slate-400 hover:text-rose-600 pt-1 block"
                        >
                          Remove from comparison
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Affiliation Type
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-4 text-slate-800 capitalize font-medium">
                      {college.collegeType.toLowerCase()}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Established Year
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-4 text-slate-800 font-mono">
                      {college.establishedYear}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Star Rating
                  </td>
                  {colleges.map((college) => {
                    const isTop = maxRating && college.rating === maxRating;
                    return (
                      <td key={college.id} className="p-4 font-mono font-medium">
                        <span className={isTop ? "text-emerald-700 font-bold" : "text-slate-800"}>
                          ★ {Number(college.rating).toFixed(1)} / 5.0
                        </span>
                        {isTop && (
                          <span className="ml-1 text-[10px] text-emerald-600 uppercase font-sans">
                            (Highest)
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Annual Tuition
                  </td>
                  {colleges.map((college) => {
                    const isLowest = minFees && college.totalFees === minFees;
                    return (
                      <td key={college.id} className="p-4 font-mono font-medium">
                        <span className={isLowest ? "text-emerald-700 font-bold" : "text-slate-800"}>
                          {formatCurrency(college.totalFees)}
                        </span>
                        {isLowest && (
                          <span className="ml-1 text-[10px] text-emerald-600 uppercase font-sans">
                            (Lowest)
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Avg Package (Placement)
                  </td>
                  {colleges.map((college) => {
                    const pkg = college.placementStats?.averagePackage;
                    const isTop = pkg && maxAvgPkg && pkg === maxAvgPkg;
                    return (
                      <td key={college.id} className="p-4 font-mono">
                        {pkg ? (
                          <>
                            <span className={isTop ? "text-emerald-700 font-bold" : "text-slate-800"}>
                              ₹{(pkg / 100000).toFixed(1)} LPA
                            </span>
                            {isTop && (
                              <span className="ml-1 text-[10px] text-emerald-600 uppercase font-sans">
                                (Highest)
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-slate-400 italic">Not available</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Highest Package
                  </td>
                  {colleges.map((college) => {
                    const pkg = college.placementStats?.highestPackage;
                    const isTop = pkg && maxHighestPkg && pkg === maxHighestPkg;
                    return (
                      <td key={college.id} className="p-4 font-mono">
                        {pkg ? (
                          <span className={isTop ? "text-emerald-700 font-bold" : "text-slate-800"}>
                            ₹{(pkg / 100000).toFixed(1)} LPA
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Not available</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Placement Percentage
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-4 font-mono text-slate-800">
                      {college.placementStats?.placementRate
                        ? `${college.placementStats.placementRate}%`
                        : "N/A"}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Primary Recruiters
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-4">
                      {college.placementStats?.topRecruiters?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {college.placementStats.topRecruiters.map((r: string) => (
                            <span
                              key={r}
                              className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Not specified</span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">
                    Programs Sample
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-4 text-slate-600 space-y-0.5 text-[11px]">
                      {college.courses?.map((cName: string) => (
                        <div key={cName} className="truncate max-w-[200px]" title={cName}>
                          • {cName}
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                <tr className="bg-slate-50/40">
                  <td className="p-4 font-semibold text-slate-600">Action</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-4">
                      <Link
                        href={`/colleges/${college.id}`}
                        className="inline-flex items-center text-xs font-semibold text-slate-900 hover:text-slate-700 underline underline-offset-2"
                      >
                        View college profile →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
