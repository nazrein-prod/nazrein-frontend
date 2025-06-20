"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openSideBar, setOpenSidebar] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen flex-col">
      <div style={{ height: "73px" }}></div>
      <header className="bg-neutral-900 fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur transition-colors">
        <div className="px-4 relative flex items-center py-4">
          <Link
            href={"#"}
            referrerPolicy="no-referrer"
            target="#"
            className="text-white font-bold text-2xl"
          >
            Trackyt
          </Link>
          <div className="relative z-10 ml-auto mr-4 md:hidden"></div>
          <Button
            className="md:hidden focus:outline-none cursor-pointer hover:text-neutral-200 bg-slate p-2"
            onClick={() => setOpenSidebar(!openSideBar)}
          >
            <span className="sr-only">Open menu</span>
            <Menu />
          </Button>
          {openSideBar && (
            <div
              style={{ top: "72px", height: "calc(100dvh - 72px)" }}
              className="pointer-events-auto opacity-100 fixed inset-0 flex h-dvh flex-1 flex-col overflow-y-auto bg-neutral-900 p-4 transition-opacity md:relative md:top-0 md:ml-0 md:h-auto md:flex-row md:items-center md:overflow-y-visible md:bg-transparent md:p-0 lg:ml-8 xl:ml-20"
            >
              <nav className="w-full md:w-auto md:shrink-0"></nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
