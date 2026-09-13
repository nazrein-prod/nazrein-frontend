"use client";

import Link from "next/link";
import UserAuth from "./UserAuth";
import UserNav from "./UserNav";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { getClientSideSession } from "@/lib/user-client";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
  });

  return (
    <header className="bg-primary sticky top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between py-4 pr-4 pl-8 md:px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black">nazrein</span>
        </Link>
        <div className="hidden md:block">
          <UserNav />
        </div>
        <div className="flex items-center gap-4 md:gap-4">
          <UserAuth />

          <motion.div className="md:hidden" whileHover={{ scale: 1.05 }}>
            <Button
              size={"sm"}
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="text-white" />
            </Button>
          </motion.div>
        </div>
      </div>

      {isOpen && (
        <div
          style={{ top: "70px", height: "calc(100dvh - 72px)" }}
          className={cn(
            "fixed inset-0 h-dvh flex-1 flex-col overflow-y-auto bg-neutral-900 p-4",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
            "md:hidden",
          )}
        >
          <nav className="text-secondary flex w-full flex-col gap-4 px-8 py-4 font-medium">
            {session && (
              <Link
                href="/dashboard"
                className="text-secondary hover:bg-secondary hover:text-primary flex cursor-pointer items-center justify-between p-4"
                onClick={() => setIsOpen(false)}
              >
                <span>Dashboard</span>
                <ArrowRight size={16} />
              </Link>
            )}
            <Link
              href="/community"
              className="text-secondary hover:bg-secondary hover:text-primary flex cursor-pointer items-center justify-between p-4"
              onClick={() => setIsOpen(false)}
            >
              <span>Community</span>
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
