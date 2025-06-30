import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink } from "lucide-react";

interface BookmarkedVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  bookmarkedDate: string;
}

// Mock data for bookmarked videos
const mockBookmarkedVideos: BookmarkedVideo[] = [
  {
    id: "Ks-_Mh1QhMc",
    title: "Your Body Language May Shape Who You Are | Amy Cuddy | TED",
    channelTitle: "TED",
    thumbnailUrl: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
    bookmarkedDate: "2024-01-20T10:30:00Z",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Video)",
    channelTitle: "Rick Astley",
    thumbnailUrl: "/placeholder.svg?height=90&width=120",
    bookmarkedDate: "2024-01-18T14:20:00Z",
  },
  {
    id: "9bZkp7q19f0",
    title: "The Power of Vulnerability | Brené Brown | TED",
    channelTitle: "TED",
    thumbnailUrl: "/placeholder.svg?height=90&width=120",
    bookmarkedDate: "2024-01-15T16:45:00Z",
  },
];

export function BookmarkedVideos() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Bookmarked Videos
          </CardTitle>
          <Link href="/">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {mockBookmarkedVideos.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No bookmarked videos yet.
          </p>
        ) : (
          <div className="space-y-3">
            {mockBookmarkedVideos.slice(0, 5).map((video) => (
              <Link key={video.id} href={`/video/${video.id}`}>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                  <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={video.thumbnailUrl || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {video.channelTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Saved {formatDate(video.bookmarkedDate)}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
