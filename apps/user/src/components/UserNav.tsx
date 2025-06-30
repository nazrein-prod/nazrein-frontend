"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, User } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";

export default function UserNav() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="hidden md:block w-20 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="http://localhost:8080/auth/google/login"
        className="flex items-center space-x-2"
      >
        <Button size="sm" className="cursor-pointer">
          <LogIn size="16" />
          <p>Sign In</p>
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-3">
        {user.user_image ? (
          <Image
            src={user.user_image}
            alt={user.user_name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        )}
        <div className="hidden md:flex flex-col">
          <span className="text-sm font-medium text-black">
            {user.user_name || "User"}
          </span>
          <span className="text-xs text-gray-600">{user.user_email}</span>
        </div>
      </div>

      {/* <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          className="text-black hover:bg-gray-100"
          asChild
        >
          <Link href="/" title="New Timeline">
            <Plus size="16" />
            <span className="hidden md:inline ml-1">New</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-black hover:bg-gray-100"
          asChild
        >
          <Link href="/dashboard" title="Dashboard">
            <Settings size="16" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-black hover:bg-gray-100"
          title="Sign Out"
        >
          <LogOut size="16" />
          <Link href="http://localhost:8080/auth/google/logout">Logout</Link>
        </Button>
      </div> */}
    </div>
  );
}
