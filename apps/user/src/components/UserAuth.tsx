"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getClientSideSession } from "@/lib/user-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "next-runtime-env";

export default function UserAuth() {
  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
  });

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        <div className="hidden h-4 w-20 animate-pulse rounded bg-gray-200 md:block" />
      </div>
    );
  }

  if (!session || isError) {
    return (
      <Link
        href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/google/login`}
        className="flex items-center space-x-2"
      >
        <Button
          size="sm"
          className="cursor-pointer bg-white text-black hover:bg-white hover:text-black"
        >
          <LogIn size="16" />
          <p>Sign In</p>
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-3">
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
        <DropdownMenuContent sideOffset={10} className="mr-2 md:mr-0">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.data.image} alt={session.data.name} />
                <AvatarFallback className="rounded-lg"></AvatarFallback>
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
              href={`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/google/logout`}
              className="cursor-pointer"
            >
              <LogOut />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
