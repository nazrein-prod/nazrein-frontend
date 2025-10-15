"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, ExternalLink } from "lucide-react";
import { getBookmarkedVideos } from "@/lib/video";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";

export function BookmarkedVideos() {
  const {
    data: bookmarkedVideos,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getBookmarkedVideos,
    queryKey: ["bookmark"],
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !bookmarkedVideos) {
    return <h1>Error</h1>;
  }

  return (
    <Card className="text-secondary bg-primary border-none shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Bookmarked Videos
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {bookmarkedVideos.data.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No bookmarked videos yet.
          </p>
        ) : (
          <div className="space-y-3">
            {bookmarkedVideos.data.map((v) => (
              <Link key={v.id} href={`/community/${v.id}`}>
                <div className="group-hover:custom-hover-bg group flex gap-3 rounded-lg p-3 transition-colors">
                  <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={v.thumbnail || "/placeholder.svg"}
                      alt={v.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-sm font-medium transition-colors">
                      {v.title}
                    </h4>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {v.channel_title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Saved{" "}
                      {formatDistanceToNow(parseISO(v.bookmarked_at || ""), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <ExternalLink className="text-muted-foreground h-4 w-4 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
