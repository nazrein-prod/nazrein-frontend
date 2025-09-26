"use client";

import { getClientSideSession } from "@/lib/user-client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function UserNav() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
  });

  return (
    <div className="flex items-center gap-4 lg:gap-16">
      {session && (
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:underline hover:underline-offset-2"
        >
          <span>Dashboard</span>
        </Link>
      )}
      <Link
        href="/community"
        className="flex items-center gap-2 hover:underline hover:underline-offset-2"
      >
        <span>Community</span>
      </Link>
    </div>
  );
}
