"use client";

import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";

export default function UserNav() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4 lg:gap-16 font-nunito ">
      {user && (
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:underline hover:underline-offset-2"
        >
          <span className=" font-nunito">Dashboard</span>
        </Link>
      )}
      <Link
        href="/community"
        className="flex items-center gap-2 hover:underline hover:underline-offset-2"
      >
        <span className=" font-nunito">Community</span>
      </Link>
    </div>
  );
}
