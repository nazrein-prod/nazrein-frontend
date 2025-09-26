"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pin, Bookmark } from "lucide-react";
import { useState } from "react";
import { Video } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBookmark, deleteBookmark } from "@/lib/bookmark";
import { toast } from "sonner";
import { motion } from "motion/react";
import { getClientSideSession } from "@/lib/user-client";

export function VideoCard({ video }: { video: Video }) {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
  });

  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    video.is_bookmarked || false,
  );

  const { mutate: addBookmarkMutate } = useMutation({
    mutationFn: async (id: string) => {
      return await addBookmark(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarked"] });
      setIsBookmarked(true);
    },
    onError: (error) => {
      console.error("Failed to add bookmark:", error);
      toast.error("Something went wrong. Please try again.");
      setIsBookmarked(false);
    },
  });

  const { mutate: deleteBookmarkMutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteBookmark(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarked"] });
      setIsBookmarked(false);
    },
    onError: (error) => {
      console.error("Failed to delete bookmark:", error);
      setIsBookmarked(true);
    },
  });

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Please sign in to bookmark videos.");
      return;
    }
    setIsBookmarked(!isBookmarked);

    if (isBookmarked) {
      deleteBookmarkMutate(video.id);
    } else {
      addBookmarkMutate(video.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/community/${video.id}`}>
        <Card
          className="group cursor-pointer transition-all duration-300 p-0  h-72 shadow-none border-[rgba(150,150,150,0.8)] border-none text-background"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(226, 232, 240, 0.15), transparent 70%), #1a1a1a",
          }}
        >
          <CardContent className="p-0 flex flex-col h-full">
            <div
              className="relative aspect-video overflow-hidden rounded-t-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 overflow-hidden"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-12 w-12 rounded-full bg-white/60 hover:bg-white shadow-lg"
                  onClick={handleBookmarkClick}
                >
                  <Bookmark
                    className={`h-5 w-5 transition-colors ${
                      isBookmarked
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1 text-secondary/80">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-1">
                  {video.channel_title}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {video.visits}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Pin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {video.bookmark_count ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
