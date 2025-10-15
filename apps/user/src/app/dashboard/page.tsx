import { BookmarkedVideos } from "./_components/BookmarkedVideos";
import { TrackedVideos } from "./_components/TrackedVideos";
import { VideoRequests } from "./_components/VideoRequests";
import VideoInput from "./_components/VideoInput";
import Metrics from "./_components/Metrics";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <VideoInput />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Metrics />
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
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
