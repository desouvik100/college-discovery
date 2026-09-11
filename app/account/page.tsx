"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center text-xs text-slate-500">
        Loading account details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Account
        </h1>
        <p className="text-xs text-slate-500">
          You must be signed in to view your account details.
        </p>
        <div className="pt-2">
          <Link
            href="/login?redirect=/account"
            className="inline-block px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded hover:bg-slate-800 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Account
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your session and access your saved research.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Profile Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Name</span>
            <span className="font-semibold text-slate-900 text-sm">
              {user.name}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-0.5">Email</span>
            <span className="font-semibold text-slate-900 text-sm">
              {user.email}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-0.5">Member Since</span>
            <span className="text-slate-700 font-medium">
              {memberSince}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Saved Research
        </h2>

        <div className="divide-y divide-slate-100 text-xs">
          <Link
            href="/saved"
            className="py-3 flex items-center justify-between group hover:text-slate-900 text-slate-700"
          >
            <div>
              <p className="font-semibold text-slate-900 group-hover:underline">
                Saved Colleges
              </p>
              <p className="text-slate-500 text-[11px]">
                Your shortlisted colleges and academic institutions.
              </p>
            </div>
            <span className="text-slate-400 group-hover:text-slate-900">→</span>
          </Link>

          <Link
            href="/account/comparisons"
            className="py-3 flex items-center justify-between group hover:text-slate-900 text-slate-700"
          >
            <div>
              <p className="font-semibold text-slate-900 group-hover:underline">
                Saved Comparisons
              </p>
              <p className="text-slate-500 text-[11px]">
                Side-by-side matrices and evaluations you have preserved.
              </p>
            </div>
            <span className="text-slate-400 group-hover:text-slate-900">→</span>
          </Link>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => logout()}
          className="text-slate-500 hover:text-rose-600 font-medium transition-colors"
        >
          Sign out of all devices
        </button>

        <Link
          href="/explore"
          className="text-slate-600 hover:text-slate-900 underline underline-offset-2"
        >
          Explore colleges →
        </Link>
      </div>
    </div>
  );
}
