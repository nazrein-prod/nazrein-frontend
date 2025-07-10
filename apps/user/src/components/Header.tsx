"use client";

import Link from "next/link";
import UserAuth from "./UserAuth";
import UserNav from "./UserNav";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black font-nunito">nazrein</span>
        </Link>
        <div className="hidden md:block">
          <UserNav />
        </div>
        <div className="flex items-center gap-4">
          <UserAuth />
          <div className="md:hidden">
            <Button
              size={"sm"}
              className="cursor-pointer "
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="text-white" />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          style={{ top: "70px", height: "calc(100dvh - 72px)" }}
          className={cn(
            "fixed inset-0 h-dvh flex-1 flex-col overflow-y-auto p-4 bg-neutral-900",
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          <nav className="w-full flex flex-col gap-4 font-medium text-white px-8 py-4">
            {user && (
              <Link
                href="/dashboard"
                className="flex text-white items-center p-4 justify-between cursor-pointer hover:bg-neutral-400"
                onClick={() => setIsOpen(false)}
              >
                <span className=" font-nunito">Dashboard</span>
                <ArrowRight size={16} />
              </Link>
            )}
            <Link
              href="/community"
              className="flex text-white items-center p-4 justify-between cursor-pointer hover:bg-neutral-400"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-nunito">Community</span>
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
