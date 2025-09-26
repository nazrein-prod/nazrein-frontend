"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink, Clock } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getTrackedVideos } from "@/lib/video";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getClientSideSession } from "@/lib/user-client";

export function TrackedVideos() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
  });

  if (!session) {
    redirect("/");
  }

  const { data: trackedVideos } = useQuery({
    queryFn: () => getTrackedVideos(session.user_id),
    queryKey: ["tracked"],
  });

  console.log(trackedVideos);

  return (
    <Card
      className="shadow-none border-none text-secondary"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
      }}
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
          <p className="text-sm text-muted-foreground text-center py-8">
            No tracked videos yet.
          </p>
        ) : (
          <div className="space-y-4">
            {trackedVideos.data.map((video) => (
              <Link key={video.id} href={`/community/${video.id}`}>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group">
                  <div className="relative w-20 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt="hello"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {video.channel_title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={"secondary"}
                        className="text-xs flex items-center gap-1 group-hover:bg-primary group-hover:text-secondary"
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
