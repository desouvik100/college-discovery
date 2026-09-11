"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import CollegeSelector from "@/components/comparison/CollegeSelector";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSavedComparison, setIsSavedComparison] = useState(false);
  const [isSavingComparison, setIsSavingComparison] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const selectedIds = searchParams.get("ids")?.split(",").filter(Boolean) || [];

  useEffect(() => {
    setIsSavedComparison(false);
    setSaveError(null);
    if (selectedIds.length > 0) {
      fetchColleges();
    } else {
      setColleges([]);
    }
  }, [searchParams]);

  const handleSaveComparison = async () => {
    if (!user) return;
    if (selectedIds.length < 2 || selectedIds.length > 3) return;

    setIsSavingComparison(true);
    setSaveError(null);

    try {
      const res = await fetch("/api/saved-comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeIds: selectedIds }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error || "Failed to save comparison");
      } else {
        setIsSavedComparison(true);
      }
    } catch {
      setSaveError("Network error saving comparison");
    } finally {
      setIsSavingComparison(false);
    }
  };


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
      <header className="space-y-2">
        <h1 className="display-title">
          Compare Institutions
        </h1>
        <p className="body-text text-stone-600">
          Evaluate parameters, tuition benchmarks, placement records, and program breadth side by side.
        </p>
      </header>

      <CollegeSelector selectedIds={selectedIds} colleges={colleges} />

      {loading && (
        <div className="py-16 text-center">
          <div className="body-text text-stone-500">Loading comparison data...</div>
        </div>
      )}

      {error && (
        <div className="surface-primary p-6 border border-red-200 rounded-lg">
          <div className="body-text text-red-800">{error}</div>
        </div>
      )}

      {!loading && !error && selectedIds.length === 0 && (
        <div className="text-center py-16 space-y-6">
          <div className="space-y-3">
            <h3 className="section-title">No institutions selected</h3>
            <p className="body-text text-stone-600 max-w-md mx-auto">
              Search above to select 2 to 3 institutions for comparison, or browse our college directory.
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 body-text text-stone-700 hover:text-stone-900 transition-colors"
          >
            Browse college catalog
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
            </svg>
          </Link>
        </div>
      )}

      {!loading && !error && selectedIds.length === 1 && colleges.length > 0 && (
        <div className="surface-secondary p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="small-text font-medium text-stone-600">1 of 3 selected</span>
            <button
              onClick={() => handleRemove(colleges[0].id)}
              className="small-text text-stone-500 hover:text-stone-700 transition-colors"
            >
              Remove
            </button>
          </div>
          
          <div className="space-y-2">
            <h3 className="section-title">{colleges[0].name}</h3>
            <p className="small-text text-stone-600">
              {colleges[0].city}, {colleges[0].state} • Rating: ★ {Number(colleges[0].rating).toFixed(1)} • Tuition: {formatCurrency(colleges[0].totalFees)}
            </p>
          </div>
          
          <div className="pt-4 border-t border-stone-200">
            <p className="small-text text-stone-600">
              Add at least one more institution above to display the comparison matrix.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && colleges.length >= 2 && (
        <div className="space-y-6">
          <div className="surface-primary p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="section-title mb-2">Side-by-side comparison</h3>
              <p className="body-text text-stone-600">
                Comparing {colleges.length} institutions across key parameters
              </p>
            </div>

            <div className="flex items-center gap-4">
              {saveError && (
                <span className="small-text text-red-600">{saveError}</span>
              )}
              {user ? (
                isSavedComparison ? (
                  <div className="flex items-center gap-2 px-4 py-2 surface-secondary rounded-lg">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="small-text font-medium">Comparison saved</span>
                    <Link href="/account/comparisons" className="small-text text-stone-600 hover:text-stone-900 transition-colors">
                      View all
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveComparison}
                    disabled={isSavingComparison}
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {isSavingComparison ? "Saving..." : "Save comparison"}
                  </button>
                )
              ) : (
                <div className="flex items-center gap-3 body-text text-stone-600">
                  <span>Sign in to save this comparison</span>
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/compare?ids=${selectedIds.join(",")}`)}`}
                    className="font-medium text-stone-900 hover:text-stone-700 transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="surface-primary border border-stone-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="p-6 w-48 text-left">
                    <span className="small-text font-medium text-stone-600 uppercase tracking-wider">
                      Parameter
                    </span>
                  </th>
                  {colleges.map((college) => (
                    <th key={college.id} className="p-6 min-w-[240px] align-top text-left">
                      <div className="space-y-3">
                        <Link
                          href={`/colleges/${college.id}`}
                          className="block section-title text-stone-900 hover:text-stone-700 transition-colors"
                        >
                          {college.name}
                        </Link>
                        <p className="small-text text-stone-600">
                          {college.city}, {college.state}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRemove(college.id)}
                          className="small-text text-stone-500 hover:text-red-600 transition-colors"
                        >
                          Remove from comparison
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Affiliation Type
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-6 body-text text-stone-900 capitalize font-medium">
                      {college.collegeType.toLowerCase()}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Established Year
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-6 body-text text-stone-900 font-mono">
                      {college.establishedYear}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Rating
                  </td>
                  {colleges.map((college) => {
                    const isTop = maxRating && college.rating === maxRating;
                    return (
                      <td key={college.id} className="p-6">
                        <div className="flex items-center gap-2">
                          <span className={`body-text font-mono ${isTop ? "text-emerald-700 font-semibold" : "text-stone-900"}`}>
                            ★ {Number(college.rating).toFixed(1)} / 5.0
                          </span>
                          {isTop && (
                            <span className="small-text text-emerald-600 font-medium">
                              Highest
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Annual Tuition
                  </td>
                  {colleges.map((college) => {
                    const isLowest = minFees && college.totalFees === minFees;
                    return (
                      <td key={college.id} className="p-6">
                        <div className="flex items-center gap-2">
                          <span className={`body-text font-mono ${isLowest ? "text-emerald-700 font-semibold" : "text-stone-900"}`}>
                            {formatCurrency(college.totalFees)}
                          </span>
                          {isLowest && (
                            <span className="small-text text-emerald-600 font-medium">
                              Lowest
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Average Package
                  </td>
                  {colleges.map((college) => {
                    const pkg = college.placementStats?.averagePackage;
                    const isTop = pkg && maxAvgPkg && pkg === maxAvgPkg;
                    return (
                      <td key={college.id} className="p-6">
                        {pkg ? (
                          <div className="flex items-center gap-2">
                            <span className={`body-text font-mono ${isTop ? "text-emerald-700 font-semibold" : "text-stone-900"}`}>
                              ₹{(pkg / 100000).toFixed(1)} LPA
                            </span>
                            {isTop && (
                              <span className="small-text text-emerald-600 font-medium">
                                Highest
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="body-text text-stone-500 italic">Not available</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Highest Package
                  </td>
                  {colleges.map((college) => {
                    const pkg = college.placementStats?.highestPackage;
                    const isTop = pkg && maxHighestPkg && pkg === maxHighestPkg;
                    return (
                      <td key={college.id} className="p-6">
                        {pkg ? (
                          <div className="flex items-center gap-2">
                            <span className={`body-text font-mono ${isTop ? "text-emerald-700 font-semibold" : "text-stone-900"}`}>
                              ₹{(pkg / 100000).toFixed(1)} LPA
                            </span>
                            {isTop && (
                              <span className="small-text text-emerald-600 font-medium">
                                Highest
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="body-text text-stone-500 italic">Not available</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Placement Rate
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-6 body-text font-mono text-stone-900">
                      {college.placementStats?.placementRate
                        ? `${college.placementStats.placementRate}%`
                        : "N/A"}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Key Recruiters
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-6">
                      {college.placementStats?.topRecruiters?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {college.placementStats.topRecruiters.map((r: string) => (
                            <span
                              key={r}
                              className="small-text px-2 py-1 bg-stone-100 text-stone-700 rounded"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="body-text text-stone-500 italic">Not specified</span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 body-text font-medium text-stone-700 bg-stone-50/30">
                    Program Sample
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-6">
                      <div className="space-y-1">
                        {college.courses?.map((cName: string) => (
                          <div key={cName} className="small-text text-stone-700" title={cName}>
                            • {cName}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="bg-stone-50/40">
                  <td className="p-6 body-text font-medium text-stone-700">
                    Actions
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-6">
                      <Link
                        href={`/colleges/${college.id}`}
                        className="inline-flex items-center gap-2 body-text text-stone-700 hover:text-stone-900 transition-colors font-medium"
                      >
                        View profile
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
                        </svg>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

