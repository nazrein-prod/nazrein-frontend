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
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Calendar className="h-5 w-5" />
          Change History
        </CardTitle>
        <p className="text-sm text-muted-foreground">
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
                      "timeline-box p-0 shadow-none border-none w-full bg-primary text-background",
                      index & 1 ? "timeline-start " : "timeline-end",
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="relative aspect-video rounded-md overflow-hidden mx-4">
                        <Image
                          src={video.image_url || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 mx-4">
                        <h4 className="font-medium text-xs line-clamp-2">
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
                      "text-xs text-muted-foreground mx-4",
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
