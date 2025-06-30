import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Eye, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface VideoDetailsProps {
  video: {
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        maxres: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
    };
  };
}

export function VideoDetails({ video }: VideoDetailsProps) {
  const { snippet } = video;
  const publishedDate = new Date(snippet.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Mock additional data that would typically come from the API
  const mockStats = {
    viewCount: "62,847,291",
    likeCount: "1,234,567",
    duration: "21:03",
  };

  return (
    <div className="space-y-6">
      {/* Video Thumbnail */}
      <Card className="overflow-hidden relative aspect-video">
        <Image
          src={snippet.thumbnails.maxres.url || "/placeholder.svg"}
          alt={snippet.title}
          fill
          className="object-cover rounded-md"
          priority
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
          {mockStats.duration}
        </div>
      </Card>

      {/* Video Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
            {snippet.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {snippet.channelTitle}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{publishedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{mockStats.viewCount} views</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{mockStats.likeCount} likes</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">TED Talk</Badge>
            <Badge variant="secondary">Psychology</Badge>
            <Badge variant="secondary">Self-Improvement</Badge>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Description</h2>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {snippet.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
