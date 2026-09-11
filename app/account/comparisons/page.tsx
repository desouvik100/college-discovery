"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { SavedComparisonItem } from "@/lib/types";

export default function SavedComparisonsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [comparisons, setComparisons] = useState<SavedComparisonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchComparisons = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/saved-comparisons");
      if (!res.ok) {
        throw new Error("Failed to load saved comparisons");
      }
      const data = await res.json();
      setComparisons(data.savedComparisons || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load comparisons");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchComparisons();
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, user, fetchComparisons]);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/saved-comparisons/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComparisons((prev) => prev.filter((c) => c.id !== id));
        setConfirmDeleteId(null);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete comparison");
      }
    } catch {
      setError("Network error while deleting comparison");
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-xs text-slate-500">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Saved Comparisons
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to access your saved college comparisons.
        </p>
        <div className="pt-2">
          <Link
            href="/login?redirect=/account/comparisons"
            className="inline-block px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded hover:bg-slate-800 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Saved Comparisons
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access side-by-side matrices you previously analyzed.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          <Link
            href="/saved"
            className="text-slate-600 hover:text-slate-900 underline underline-offset-2 mr-4"
          >
            Saved colleges →
          </Link>
          <Link
            href="/compare"
            className="text-slate-600 hover:text-slate-900 underline underline-offset-2"
          >
            New comparison →
          </Link>
        </div>
      </div>

      {loading && (
        <div className="py-16 text-center text-xs text-slate-500">
          Loading saved comparisons...
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

      {!loading && !error && comparisons.length === 0 && (
        <div className="text-center py-16 px-4 border border-dashed border-slate-200 rounded-lg bg-white space-y-3 max-w-lg mx-auto">
          <p className="text-sm font-semibold text-slate-900">
            You haven&apos;t saved any comparisons yet.
          </p>
          <p className="text-xs text-slate-500">
            Compare 2 to 3 institutions side by side and save the matrix to revisit anytime.
          </p>
          <div className="pt-2">
            <Link
              href="/compare"
              className="inline-flex items-center px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded hover:bg-slate-800 transition-colors"
            >
              Start a comparison
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && comparisons.length > 0 && (
        <div className="space-y-3">
          {comparisons.map((item) => {
            const collegeIds = item.colleges.map((c) => c.collegeId).join(",");
            const names = item.colleges.map((c) => c.college.name);
            const savedDate = new Date(item.savedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const isConfirming = confirmDeleteId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <h2 className="text-sm font-bold text-slate-900 leading-snug">
                    {names.join(" vs ")}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {names.length} institutions • Saved {savedDate}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs">
                  {isConfirming ? (
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
                      <span className="text-[11px] text-slate-600">Delete comparison?</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                        className="text-[11px] font-semibold text-rose-600 hover:text-rose-800"
                      >
                        {isDeleting ? "..." : "Confirm"}
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-[11px] text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href={`/compare?ids=${collegeIds}`}
                        className="font-semibold text-slate-900 hover:text-slate-700 underline underline-offset-2"
                      >
                        Open comparison →
                      </Link>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
