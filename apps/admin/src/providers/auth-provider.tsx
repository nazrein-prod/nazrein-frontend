"use client";

import { SessionAdmin } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface AuthContextType {
  admin: SessionAdmin | null;
  isLoading: boolean;
  isError: boolean;
  isPending: boolean;
  refetchUser: () => void;
}

type UserProviderProps = {
  initialAdmin: SessionAdmin | null;
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  initialAdmin = null,
  children,
}: UserProviderProps) {
  const {
    data: admin,
    isLoading,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["auth", "admin"],
    queryFn: fetchUser,
    initialData: initialAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: { status: number }) => {
      // Don't retry on 401 (unauthorized)
      if (error?.status === 401) return false;
      return failureCount < 2;
    },
  });

  const value: AuthContextType = {
    admin: admin || null,
    isLoading,
    isError,
    isPending,
    refetchUser: () => refetch(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export async function fetchUser(): Promise<SessionAdmin | null> {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/admin`, {
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error("Failed to fetch admin");
  }

  return response.json();
}
