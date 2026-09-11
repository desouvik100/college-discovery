"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();

  const publicNavLinks = [
    { href: "/explore", label: "Explore" },
    { href: "/compare", label: "Compare" },
    { href: "/predictor", label: "Predictor" },
  ];

  const authNavLinks = user
    ? [...publicNavLinks, { href: "/saved", label: "Saved" }]
    : publicNavLinks;

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <header className="surface-primary border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="section-title text-stone-900 tracking-tight"
            >
              College Discovery
            </Link>

            <nav className="hidden md:flex items-center space-x-1 h-16">
              {authNavLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`h-full flex items-center px-4 body-text font-medium transition-colors border-b-2 ${
                      active
                        ? "border-stone-900 text-stone-900"
                        : "border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="w-20 h-6 bg-stone-100 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center space-x-3 small-text">
                <Link
                  href="/account"
                  className={`font-medium px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/account")
                      ? "text-stone-900 bg-stone-100 font-semibold"
                      : "text-stone-700 hover:text-stone-950 hover:bg-stone-50"
                  }`}
                  title="Your Account"
                >
                  {user.name}
                </Link>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="text-stone-500 hover:text-stone-900 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 small-text">
                <Link
                  href="/login"
                  className="btn btn-ghost"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4 space-y-2">
            {authNavLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 body-text rounded transition-colors ${
                    active
                      ? "bg-stone-100 text-stone-900 font-semibold"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-stone-100 px-4 space-y-3">
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block body-text font-medium text-stone-800 hover:text-stone-950 transition-colors"
                  >
                    Account ({user.name})
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="block w-full text-left body-text text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-ghost flex-1 justify-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-primary flex-1 justify-center"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
