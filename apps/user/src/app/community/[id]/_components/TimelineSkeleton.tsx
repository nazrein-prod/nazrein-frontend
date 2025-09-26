import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

export default function TimelineSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          <span className="h-3 w-64 bg-muted rounded animate-pulse inline-block" />
        </p>
      </CardHeader>
      <CardContent>
        <ul className="timeline timeline-vertical">
          {[...Array(3)].map((_, index) => (
            <li key={index}>
              {index !== 0 && <hr />}
              <Card
                className={cn(
                  "timeline-box p-0 shadow-none border-none w-full",
                  index & 1 ? "timeline-start " : "timeline-end",
                )}
              >
                <div className="flex flex-col gap-2 rounded-lg">
                  <div className="relative aspect-video rounded-md overflow-hidden mx-4 bg-muted animate-pulse" />
                  <div className="flex-1 mx-4">
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </Card>
              <div className="timeline-middle">
                <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
              </div>
              <p
                className={cn(
                  "text-xs text-muted-foreground mx-4",
                  index & 1 ? "timeline-end" : "timeline-start",
                )}
              >
                <span className="h-3 w-16 bg-muted rounded animate-pulse inline-block" />
              </p>
              {index !== 2 && <hr />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
