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

export default function UserAuth() {
  const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
  });

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="hidden md:block w-20 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return (
      <Link
        href={`${process.env.BACKEND_URL}/auth/google/login`}
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
          <div className="flex items-center md:space-x-3 cursor-pointer text-secondary">
            {session.user_image ? (
              <Avatar>
                <AvatarImage src={session.user_image} alt={session.user_name} />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} className="mr-2 md:mr-0">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.user_image} alt={session.user_name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session.user_name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {session.user_email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`${process.env.BACKEND_URL}/auth/google/logout`}
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
