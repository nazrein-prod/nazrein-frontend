import { BookmarkedVideos } from "./_components/BookmarkedVideos";
import { TrackedVideos } from "./_components/TrackedVideos";
import { VideoRequests } from "./_components/VideoRequests";
import VideoInput from "./_components/VideoInput";
import Metrics from "./_components/Metrics";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <VideoInput />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Metrics />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-8">
            <VideoRequests />
            <BookmarkedVideos />
          </div>

          <div>
            <TrackedVideos />
          </div>
        </div>
      </div>
    </div>
  );
}
