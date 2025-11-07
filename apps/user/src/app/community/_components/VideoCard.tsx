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
          className="group text-background h-72 cursor-pointer border-none border-[rgba(150,150,150,0.8)] p-0 shadow-none transition-all duration-300"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(226, 232, 240, 0.15), transparent 70%), #1a1a1a",
          }}
        >
          <CardContent className="flex h-full flex-col p-0">
            <div
              className="relative aspect-video overflow-hidden rounded-t-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="overflow-hidden object-cover transition-transform duration-300 group-hover:scale-105"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div
                className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-12 w-12 rounded-full bg-white/60 shadow-lg hover:bg-white"
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

            <div className="flex flex-1 flex-col space-y-3 p-4">
              <div className="flex-1">
                <h3 className="text-secondary/80 mb-1 line-clamp-2 text-sm leading-tight font-semibold">
                  {video.title}
                </h3>
                <p className="text-muted-foreground line-clamp-1 text-xs">
                  {video.channel_title}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="text-muted-foreground h-3 w-3" />
                    <span className="text-muted-foreground text-xs">
                      {video.visits}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Pin className="text-muted-foreground h-3 w-3" />
                    <span className="text-muted-foreground text-xs">
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
