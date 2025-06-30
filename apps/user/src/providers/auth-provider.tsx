"use client";

import { SessionUser } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: SessionUser | null;
  isLoading: boolean;
  isError: boolean;
  isPending: boolean;
  refetchUser: () => void;
}

type UserProviderProps = {
  initialUser: SessionUser | null;
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  initialUser = null,
  children,
}: UserProviderProps) {
  // const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: fetchUser,
    initialData: initialUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: { status: number }) => {
      // Don't retry on 401 (unauthorized)
      if (error?.status === 401) return false;
      return failureCount < 2;
    },
  });

  const value: AuthContextType = {
    user: user || null,
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

export async function fetchUser(): Promise<SessionUser | null> {
  const response = await fetch("http://localhost:8080/auth/me", {
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
