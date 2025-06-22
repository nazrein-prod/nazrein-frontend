"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-8 lg:px-24 py-6 font-nunito flex items-center justify-around bg-white">
      <Link href="/" className={`font-black text-xl`}>
        track.this
      </Link>

      <div className="flex items-center gap-2 ml-auto">
        <Button
          size="sm"
          className="cursor-pointer mr-2"
          // onClick={() => signIn()}
        >
          <LogIn size="16" />
          Sign in
        </Button>
      </div>
    </header>
  );
}
