import { Suspense } from "react";
import { VideoDetails } from "./_components/VideoDetails";
import { VideoTimeline } from "./_components/VideoTimeline";
import TimelineSkeleton from "./_components/TimelineSkeleton";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function VideoInfoPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl lg:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {/* FIX: VideoDetails sekeleton */}
            <Suspense fallback={<h1>Loading...</h1>}>
              <VideoDetails videoID={id} />
            </Suspense>
          </div>
          <div className="lg:col-span-2">
            <Suspense fallback={<TimelineSkeleton />}>
              <VideoTimeline videoID={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
