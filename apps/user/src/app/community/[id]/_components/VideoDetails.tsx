import { getVideoInfo } from "@/actions/video";
import { User, Calendar, Eye, Pin } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Thumbnail from "./Thumbnail";

export async function VideoDetails({ videoID }: { videoID: string }) {
  const video = await getVideoInfo(videoID);

  return (
    <div className="space-y-6">
      <Thumbnail video={video} />

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
            {video?.data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="font-medium">{video?.data.channel_title}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {video
                  ? formatDistanceToNow(parseISO(video?.data.published_at), {
                      addSuffix: true,
                    })
                  : "NA"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{video?.data.visits} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Pin className="h-4 w-4" />
              <span>{video?.data.bookmark_count} bookmarks </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
