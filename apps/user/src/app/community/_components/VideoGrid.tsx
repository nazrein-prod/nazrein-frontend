import { getCommunityVideos } from "@/lib/video";
import { VideoCard } from "./VideoCard";

export async function VideoGrid() {
  const videos = await getCommunityVideos();
  console.log(videos);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos ? (
        videos.data.videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <>No videos found</>
      )}
    </div>
  );
}
