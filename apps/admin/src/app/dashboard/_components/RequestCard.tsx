"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTransition } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import { createVideo } from "@/lib/video";

export default function RequestCard({
  v,
}: {
  v: {
    id: string;
    status: string;
    link: string;
    youtube_id: string;
    user: User;
    created_at: string;
  };
}) {
  const [isPending, startTransition] = useTransition();

  function handleRequestAccept(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    startTransition(async () => {
      await createVideo(v.user.id, v.link, v.youtube_id, v.id);
    });
  }
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>{v.user.name}</CardTitle>
          <CardDescription>
            {formatDistanceToNow(parseISO(v.created_at), { addSuffix: true })}
          </CardDescription>
          <CardAction>
            <Button variant="link">{v.status}</Button>
          </CardAction>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{v.link}</Label>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{v.youtube_id}</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <div className="flex justify-center items-center gap-4">
            <Button
              type="submit"
              className={cn(
                "cursor-pointer bg-green-500 text-black hover:bg-green-500",
                isPending && "opacity-50 cursor-not-allowed animate-spin"
              )}
              onClick={handleRequestAccept}
            >
              Accept
            </Button>
          </div>
          <Button variant="destructive" className="ml-auto cursor-pointer">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
