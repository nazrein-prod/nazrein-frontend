"use client";

import { Button } from "@/components/ui/button";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center">
      Admin Dashboard
      <Button
        size="sm"
        className="cursor-pointer"
        onClick={() => {
          router.push(`${process.env.BACKEND_URL}/auth/admin/google/login`);
        }}
      >
        <LogIn size="16" />
        Sign in
      </Button>
    </div>
  );
}
