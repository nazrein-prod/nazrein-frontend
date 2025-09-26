"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, ExternalLink } from "lucide-react";
import { getBookmarkedVideos } from "@/lib/video";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";

export function BookmarkedVideos() {
  const { data: bookmarkedVideos } = useQuery({
    queryFn: () => getBookmarkedVideos(),
    queryKey: ["bookmarked"],
  });

  return (
    <Card className="shadow-none border-none text-secondary bg-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Bookmarked Videos
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {bookmarkedVideos?.data?.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No bookmarked videos yet.
          </p>
        ) : (
          <div className="space-y-3">
            {bookmarkedVideos?.data?.map((v) => (
              <Link key={v.id} href={`/community/${v.id}`}>
                <div className="flex gap-3 p-3 rounded-lg group-hover:custom-hover-bg transition-colors group">
                  <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={v.thumbnail || "/placeholder.svg"}
                      alt={v.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2  transition-colors">
                      {v.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {v.channel_title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Saved{" "}
                      {formatDistanceToNow(parseISO(v.bookmarked_at || ""), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
