"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";

interface SaveCollegeButtonProps {
  collegeId: string;
  collegeName?: string;
  variant?: "card" | "detail" | "text";
  className?: string;
}

export default function SaveCollegeButton({
  collegeId,
  collegeName,
  variant = "card",
  className = "",
}: SaveCollegeButtonProps) {
  const { user, isSaved, saveCollege, removeCollege } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const promptRef = useRef<HTMLDivElement>(null);

  const saved = isSaved(collegeId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (promptRef.current && !promptRef.current.contains(event.target as Node)) {
        setShowPrompt(false);
      }
    }
    if (showPrompt) {
      document.addEventListener("mousedown", handleClickOutside);
      const timer = setTimeout(() => setShowPrompt(false), 4500);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        clearTimeout(timer);
      };
    }
  }, [showPrompt]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowPrompt(true);
      return;
    }

    setIsProcessing(true);
    if (saved) {
      await removeCollege(collegeId);
    } else {
      await saveCollege(collegeId);
    }
    setIsProcessing(false);
  };

  const getButtonStyles = () => {
    if (variant === "detail") {
      return saved
        ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 transition-colors"
        : "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors";
    }

    if (variant === "text") {
      return saved
        ? "text-slate-900 font-semibold text-xs hover:text-rose-600 transition-colors"
        : "text-slate-500 hover:text-slate-800 text-xs transition-colors";
    }

    // Default card variant
    return saved
      ? "inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200 transition-colors"
      : "inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors";
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isProcessing}
        aria-label={
          saved
            ? `Remove ${collegeName || "college"} from saved`
            : `Save ${collegeName || "college"}`
        }
        className={`${getButtonStyles()} ${className} disabled:opacity-60`}
      >
        <svg
          className={variant === "detail" ? "w-3.5 h-3.5" : "w-3 h-3"}
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={saved ? "0" : "2"}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <span>
          {isProcessing ? "Updating..." : saved ? "Saved" : "Save"}
        </span>
      </button>

      {showPrompt && (
        <div
          ref={promptRef}
          role="tooltip"
          className="absolute right-0 top-full mt-1.5 z-30 w-52 p-2.5 bg-slate-900 text-white rounded-md shadow-lg text-xs leading-tight animate-in fade-in zoom-in-95"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-slate-100">Sign in to save colleges.</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Keep track of your research in one place.</p>
              <div className="mt-2 flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-block px-2 py-1 bg-white text-slate-900 font-semibold rounded text-[11px] hover:bg-slate-100"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="text-[11px] text-slate-300 hover:text-white underline underline-offset-2"
                >
                  Create account
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(false);
              }}
              className="text-slate-400 hover:text-white"
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
