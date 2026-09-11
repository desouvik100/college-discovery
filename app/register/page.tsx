"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/saved";

  const { refreshAuth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to create your account right now. Please try again.");
        setIsLoading(false);
        return;
      }

      await refreshAuth();
      router.push(redirectUrl);
      router.refresh();
    } catch {
      setError("Network connection issue. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="w-full max-w-sm space-y-6 bg-white p-8 border border-slate-200 rounded-lg shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Save colleges, comparisons and continue your research later.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 leading-relaxed"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-slate-500 hover:text-slate-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type your password"
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded transition-colors disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            href={redirectUrl !== "/saved" ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login"}
            className="font-semibold text-slate-900 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
