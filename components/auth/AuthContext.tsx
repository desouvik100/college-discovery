"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserPublicProfile } from "@/lib/types";

interface AuthContextType {
  user: UserPublicProfile | null;
  isLoading: boolean;
  savedCollegeIds: Set<string>;
  isSaved: (collegeId: string) => boolean;
  saveCollege: (collegeId: string) => Promise<{ success: boolean; error?: string }>;
  removeCollege: (collegeId: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPublicProfile | null>(null);
  const [savedCollegeIds, setSavedCollegeIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setSavedCollegeIds(new Set(data.savedCollegeIds || []));
        } else {
          setUser(null);
          setSavedCollegeIds(new Set());
        }
      } else {
        setUser(null);
        setSavedCollegeIds(new Set());
      }
    } catch {
      setUser(null);
      setSavedCollegeIds(new Set());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const isSaved = useCallback(
    (collegeId: string) => {
      return savedCollegeIds.has(collegeId);
    },
    [savedCollegeIds]
  );

  const saveCollege = useCallback(
    async (collegeId: string) => {
      if (!user) {
        return { success: false, error: "Sign in to save colleges." };
      }

      setSavedCollegeIds((prev) => new Set([...Array.from(prev), collegeId]));

      try {
        const response = await fetch("/api/saved-colleges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collegeId }),
        });

        const data = await response.json();

        if (!response.ok) {
          setSavedCollegeIds((prev) => {
            const next = new Set(prev);
            next.delete(collegeId);
            return next;
          });
          return { success: false, error: data.error || "Failed to save college" };
        }

        return { success: true };
      } catch (err) {
        setSavedCollegeIds((prev) => {
          const next = new Set(prev);
          next.delete(collegeId);
          return next;
        });
        return { success: false, error: "Network error saving college" };
      }
    },
    [user]
  );

  const removeCollege = useCallback(
    async (collegeId: string) => {
      if (!user) {
        return { success: false, error: "Sign in required." };
      }

      setSavedCollegeIds((prev) => {
        const next = new Set(prev);
        next.delete(collegeId);
        return next;
      });

      try {
        const response = await fetch(`/api/saved-colleges/${collegeId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          setSavedCollegeIds((prev) => new Set([...Array.from(prev), collegeId]));
          const data = await response.json();
          return { success: false, error: data.error || "Failed to remove college" };
        }

        return { success: true };
      } catch {
        setSavedCollegeIds((prev) => new Set([...Array.from(prev), collegeId]));
        return { success: false, error: "Network error removing college" };
      }
    },
    [user]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setSavedCollegeIds(new Set());
      window.location.href = "/";
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        savedCollegeIds,
        isSaved,
        saveCollege,
        removeCollege,
        logout,
        refreshAuth: fetchSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
