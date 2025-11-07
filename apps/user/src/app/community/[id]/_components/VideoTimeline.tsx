import { getVideoAnalytics } from "@/actions/video";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Calendar, CircleDot } from "lucide-react";
import Image from "next/image";

export async function VideoTimeline({ videoID }: { videoID: string }) {
  // await wait(2000);
  const videoTimeline = await getVideoAnalytics(videoID);

  return (
    <Card className="bg-primary">
      <CardHeader>
        <CardTitle className="text-secondary flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Change History
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Track of title and thumbnail modifications over time
        </p>
      </CardHeader>
      <CardContent className="max-h-[800px] overflow-y-auto">
        <ul className="timeline timeline-vertical">
          {!videoTimeline || !videoTimeline.data ? (
            <h1>No tracking history available</h1>
          ) : (
            videoTimeline.data.map((video, index) => {
              return (
                <li key={index}>
                  {index != 0 && <hr />}
                  <Card
                    className={cn(
                      "timeline-box bg-primary text-background w-full border-none p-0 shadow-none",
                      index & 1 ? "timeline-start" : "timeline-end",
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="relative mx-4 aspect-video overflow-hidden rounded-md">
                        <Image
                          src={video.image_url || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="mx-4 flex-1">
                        <h4 className="line-clamp-2 text-xs font-medium">
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  </Card>
                  <div className="timeline-middle">
                    <CircleDot className="text-secondary" />
                  </div>
                  <p
                    className={cn(
                      "text-muted-foreground mx-4 text-xs",
                      index & 1 ? "timeline-end" : "timeline-start",
                    )}
                  >
                    {format(parseISO(video.snapshot_time), "MMMM yyy")}
                  </p>
                  {index != videoTimeline.data.length - 1 && <hr />}
                </li>
              );
            })
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
