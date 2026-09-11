"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";
import { SavedCollegeItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import CollegeImage from "@/components/ui/CollegeImage";

const TYPE_LABELS: Record<string, string> = {
  GOVERNMENT: "Government",
  PRIVATE: "Private",
  DEEMED: "Deemed University",
};

export default function SavedCollegesPage() {
  const { user, isLoading: authLoading, removeCollege } = useAuth();
  const [savedColleges, setSavedColleges] = useState<SavedCollegeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchSaved = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/saved-colleges");
      if (!res.ok) {
        throw new Error("Failed to load saved colleges");
      }
      const data = await res.json();
      setSavedColleges(data.savedColleges || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load saved colleges");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchSaved();
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, user, fetchSaved]);

  const handleRemove = async (collegeId: string) => {
    setRemovingId(collegeId);
    const result = await removeCollege(collegeId);
    if (result.success) {
      setSavedColleges((prev) => prev.filter((item) => item.college.id !== collegeId));
    }
    setRemovingId(null);
  };

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-xs text-slate-500">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Saved Colleges
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Sign in to access your saved colleges and manage your shortlist.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3 text-xs">
          <Link
            href="/login?redirect=/saved"
            className="px-4 py-2 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register?redirect=/saved"
            className="px-4 py-2 bg-white text-slate-700 font-medium border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Saved Colleges
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your personal shortlist of institutions for quick reference and comparison.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          <Link
            href="/account/comparisons"
            className="text-slate-600 hover:text-slate-900 underline underline-offset-2 mr-4"
          >
            Saved comparisons →
          </Link>
          <Link
            href="/explore"
            className="text-slate-600 hover:text-slate-900 underline underline-offset-2"
          >
            Explore more colleges →
          </Link>
        </div>
      </div>

      {loading && (
        <div className="py-16 text-center text-xs text-slate-500">
          Loading your saved colleges...
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="p-4 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800"
        >
          {error}
        </div>
      )}

      {!loading && !error && savedColleges.length === 0 && (
        <div className="text-center py-16 px-4 border border-dashed border-slate-200 rounded-lg bg-white space-y-3 max-w-lg mx-auto">
          <p className="text-sm font-semibold text-slate-900">
            Your saved colleges will appear here.
          </p>
          <p className="text-xs text-slate-500">
            Save colleges while browsing to keep them in one place.
          </p>
          <div className="pt-2">
            <Link
              href="/explore"
              className="inline-flex items-center px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded hover:bg-slate-800 transition-colors"
            >
              Explore colleges
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && savedColleges.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedColleges.map((item) => {
            const { college } = item;
            const placement = college.latestPlacement;
            const isRemoving = removingId === college.id;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CollegeImage
                      imageUrl={college.imageUrl}
                      imageAlt={college.imageAlt || college.name}
                      name={college.name}
                      className="w-12 h-12 rounded border border-slate-200 object-cover shrink-0 mt-0.5"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold text-slate-900 leading-snug line-clamp-1">
                          <Link
                            href={`/colleges/${college.id}`}
                            className="hover:underline"
                          >
                            {college.name}
                          </Link>
                        </h3>
                        <div className="flex-shrink-0 flex items-center gap-1 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-xs font-semibold text-slate-800">
                          <span className="text-amber-500">★</span>
                          <span>{Number(college.rating).toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {college.city}, {college.state} •{" "}
                        {TYPE_LABELS[college.collegeType] || college.collegeType}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Annual Tuition
                      </span>
                      <span className="font-semibold text-slate-900 font-mono text-sm">
                        {formatCurrency(college.totalFees)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Placement Track
                      </span>
                      {placement ? (
                        <div className="space-y-0.5 font-mono text-xs">
                          <p className="font-semibold text-slate-900">
                            ₹{(placement.averagePackage / 100000).toFixed(1)}L{" "}
                            <span className="font-normal text-slate-400 text-[11px]">
                              avg
                            </span>
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {(placement.highestPackage / 100000).toFixed(0)}L max •{" "}
                            {placement.placementRate}%
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-400 italic">Data not reported</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => handleRemove(college.id)}
                    disabled={isRemoving}
                    className="text-slate-400 hover:text-rose-600 text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    {isRemoving ? "Removing..." : "Remove"}
                  </button>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/compare?ids=${college.id}`}
                      className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2 py-1 rounded transition-colors text-[11px] font-medium"
                    >
                      + Compare
                    </Link>
                    <Link
                      href={`/colleges/${college.id}`}
                      className="font-semibold text-slate-900 hover:text-slate-700 underline underline-offset-2 flex items-center gap-1 text-xs"
                    >
                      View details <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
