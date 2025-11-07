import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

export default function TimelineSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 animate-pulse" />
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          <span className="bg-muted inline-block h-3 w-64 animate-pulse rounded" />
        </p>
      </CardHeader>
      <CardContent>
        <ul className="timeline timeline-vertical">
          {[...Array(3)].map((_, index) => (
            <li key={index}>
              {index !== 0 && <hr />}
              <Card
                className={cn(
                  "timeline-box w-full border-none p-0 shadow-none",
                  index & 1 ? "timeline-start" : "timeline-end",
                )}
              >
                <div className="flex flex-col gap-2 rounded-lg">
                  <div className="bg-muted relative mx-4 aspect-video animate-pulse overflow-hidden rounded-md" />
                  <div className="mx-4 flex-1">
                    <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
                  </div>
                </div>
              </Card>
              <div className="timeline-middle">
                <div className="bg-muted h-4 w-4 animate-pulse rounded-full" />
              </div>
              <p
                className={cn(
                  "text-muted-foreground mx-4 text-xs",
                  index & 1 ? "timeline-end" : "timeline-start",
                )}
              >
                <span className="bg-muted inline-block h-3 w-16 animate-pulse rounded" />
              </p>
              {index !== 2 && <hr />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
