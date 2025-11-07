import { Card, CardContent } from "@/components/ui/card";

export default function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card
          key={idx}
          className="bg-primary border-secondary/30 h-72 animate-pulse overflow-hidden p-0"
        >
          <CardContent className="flex h-full flex-col p-0">
            <div className="bg-primary relative aspect-video rounded-t-lg" />

            <div className="flex flex-1 flex-col space-y-3 p-4">
              <div className="flex-1 space-y-2">
                <div className="bg-secondary h-4 w-3/4 rounded" />
                <div className="bg-secondary h-3 w-1/2 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="bg-secondary h-3 w-3 rounded-full" />
                    <div className="bg-secondary h-3 w-6 rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-secondary h-3 w-3 rounded-full" />
                    <div className="bg-secondary h-3 w-6 rounded" />
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
