import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ImageIcon, Calendar } from "lucide-react";
import Image from "next/image";

interface TimelineItem {
  date: string;
  type: string;
  previousValue: string;
  currentValue: string;
  reason: string;
}

interface VideoTimelineProps {
  history: TimelineItem[];
}

export function VideoTimeline({ history }: VideoTimelineProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeIcon = (type: string) => {
    return type === "title" ? (
      <FileText className="h-4 w-4" />
    ) : (
      <ImageIcon className="h-4 w-4" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === "title" ? "bg-blue-500" : "bg-green-500";
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Change History
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track of title and thumbnail modifications over time
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative py-4">
          {/* Central gradient line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 transform -translate-x-1/2" />

          <div className="space-y-8">
            {history.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${getTypeColor(item.type)} flex items-center justify-center text-white z-10 border-4 border-background`}
                  >
                    {getTypeIcon(item.type)}
                  </div>

                  {/* Event card */}
                  <div
                    className={`flex ${isLeft ? "justify-start pr-8" : "justify-end pl-8"}`}
                  >
                    <Card
                      className={`w-full max-w-sm ${isLeft ? "mr-4" : "ml-4"}`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                item.type === "title" ? "default" : "secondary"
                              }
                            >
                              {item.type === "title"
                                ? "Title Change"
                                : "Thumbnail Change"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(item.date)}
                            </span>
                          </div>

                          {item.type === "title" ? (
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Previous:
                                </p>
                                <p className="text-sm bg-muted p-2 rounded text-muted-foreground line-through">
                                  {item.previousValue}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Current:
                                </p>
                                <p className="text-sm bg-green-50 dark:bg-green-950 p-2 rounded border border-green-200 dark:border-green-800">
                                  {item.currentValue}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Previous:
                                </p>
                                <div className="relative w-full h-16 bg-muted rounded overflow-hidden">
                                  <Image
                                    src="/placeholder.svg?height=64&width=112"
                                    alt="Previous thumbnail"
                                    fill
                                    className="object-cover opacity-50"
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Current:
                                </p>
                                <div className="relative w-full h-16 bg-green-50 dark:bg-green-950 rounded overflow-hidden border border-green-200 dark:border-green-800">
                                  <Image
                                    src="/placeholder.svg?height=64&width=112"
                                    alt="Current thumbnail"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="bg-muted/50 p-2 rounded">
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Reason:</span>{" "}
                              {item.reason}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
