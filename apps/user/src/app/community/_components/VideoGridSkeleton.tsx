import { Card, CardContent } from "@/components/ui/card";

export default function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card
          key={idx}
          className="h-72 animate-pulse p-0 bg-primary border-secondary/30 overflow-hidden"
        >
          <CardContent className="p-0 flex flex-col h-full ">
            <div className="relative aspect-video bg-primary rounded-t-lg" />

            <div className="p-4 space-y-3 flex-1 flex flex-col">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-secondary rounded-full" />
                    <div className="h-3 w-6 bg-secondary rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-secondary rounded-full" />
                    <div className="h-3 w-6 bg-secondary rounded" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
