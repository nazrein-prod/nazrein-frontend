"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink, Clock } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getTrackedVideos } from "@/lib/video";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow, parseISO } from "date-fns";

export function TrackedVideos() {
  const { data: trackedVideos } = useQuery({
    queryFn: getTrackedVideos,
    queryKey: ["tracked"],
  });

  return (
    <Card
      className="text-secondary bg-primary border-none shadow-none"
      // style={{
      //   background:
      //     "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
      // }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Tracked Videos
          </CardTitle>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-primary cursor-pointer"
            >
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {!trackedVideos ||
        !trackedVideos.data ||
        trackedVideos.data.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No tracked videos yet.
          </p>
        ) : (
          <div className="space-y-4">
            {trackedVideos.data.map((video) => (
              <Link key={video.id} href={`/community/${video.id}`}>
                <div className="hover:bg-secondary group flex gap-3 rounded-lg p-3 transition-colors">
                  <div className="relative w-20 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt="hello"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
                        {video.title}
                      </h4>
                      <ExternalLink className="text-muted-foreground h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="text-muted-foreground truncate text-xs">
                      {video.channel_title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={"secondary"}
                        className="group-hover:bg-primary group-hover:text-secondary flex items-center gap-1 text-xs"
                      >
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(parseISO(video.published_at), {
                          addSuffix: true,
                        })}
                      </Badge>
                    </div>
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
