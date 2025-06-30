"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pin, Bookmark } from "lucide-react";
import { useState } from "react";
import { Video } from "@/lib/types";

export function VideoCard({ video }: { video: Video }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link href={`/community/${video.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 p-0 hover:shadow-none h-72">
        <CardContent className="p-0 flex flex-col h-full">
          <div
            className="relative aspect-video overflow-hidden rounded-t-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                size="icon"
                variant="secondary"
                className="h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
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
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1 ">
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
                    {/* {formatNumber(video.internalMetrics.views)} */}0
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Pin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {/* {formatNumber(video.internalMetrics.pins)} */}0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
