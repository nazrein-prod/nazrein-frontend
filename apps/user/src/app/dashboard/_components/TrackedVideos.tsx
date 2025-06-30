"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, ExternalLink } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTrackedVideos } from "@/lib/video";

export function TrackedVideos() {
  const { user } = useAuth();
  if (!user) {
    redirect("/");
  }

  const { data: trackedVideos } = useQuery({
    queryFn: () => getTrackedVideos(user.user_id),
    queryKey: ["video", "tracked", user.user_id],
    staleTime: Infinity,
  });

  function formatNumber(num: number) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Tracked Videos
          </CardTitle>
          <Link href="/">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {!trackedVideos || trackedVideos.data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No tracked videos yet.
          </p>
        ) : (
          <div className="space-y-4">
            {trackedVideos.data.map((video) => (
              <Link key={video.id} href={`/video/${video.id}`}>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                  <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt="hello"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {video.channel_title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {/* <span>{formatNumber(video.internalViews)} views</span>
                      <span>{video.changeCount} changes</span>
                      <span>Updated {formatDate(video.lastUpdate)}</span> */}
                    </div>
                    {/* <div className="flex items-center gap-2">
                      {video.youtube_id && (
                        <Badge
                          variant="secondary"
                          className="text-xs flex items-center gap-1"
                        >
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                    </div> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
