import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Bookmark, Eye } from "lucide-react";
import { BookmarkedVideos } from "./_components/BookmarkedVideos";
import { TrackedVideos } from "./_components/TrackedVideos";
import { VideoRequests } from "./_components/VideoRequests";
import VideoInput from "./_components/VIdeoInput";
// import { fetchVideoRequests } from "@/lib/videoRequest";

const dashboardStats = {
  bookmarkedCount: 12,
  trackedCount: 2,
  pendingRequests: 3,
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your bookmarked videos, track analytics, and submit new video
            requests for tracking.
          </p>
        </div> */}

        <div className="mb-8">
          <VideoInput />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Bookmarked Videos
              </CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.bookmarkedCount}
              </div>
              <p className="text-xs text-muted-foreground">Videos pinned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Tracked Videos
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.trackedCount}/3
              </div>
              <p className="text-xs text-muted-foreground">
                Videos with analytics
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.pendingRequests}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
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
