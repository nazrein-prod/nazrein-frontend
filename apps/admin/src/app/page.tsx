"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getClientSideSession } from "@/lib/user";
import { useQuery } from "@tanstack/react-query";
import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { env } from "next-runtime-env";

export default function Home() {
  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          <div className="hidden h-4 w-20 animate-pulse rounded bg-gray-200 md:block" />
        </div>
      </div>
    );
  }

  if (!session || isError) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Link
          href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/admin/google/login`}
          className="flex items-center space-x-2"
        >
          <Button
            size="sm"
            className="bg-primary text-secondary hover:bg-primary hover:text-secondary cursor-pointer"
          >
            <LogIn size="16" />
            <p>Sign In</p>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      Admin
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-secondary flex cursor-pointer items-center md:space-x-3">
            {session.data.image ? (
              <Avatar>
                <AvatarImage src={session.data.image} alt={session.data.name} />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <User className="text-muted-foreground h-4 w-4" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={10}
          className="bg-almond dark:bg-charcoal dark:text-almond mr-4 md:mr-8"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.data.image} alt={session.data.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session.data.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {session.data.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/admin/google/logout`}
              className="focus:bg-almond-darker dark:focus:bg-almond dark:focus:text-charcoal cursor-pointer"
            >
              <LogOut className="hover:text-charcoal" />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
