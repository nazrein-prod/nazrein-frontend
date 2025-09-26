"use client";

import { getCommunityVideos } from "@/lib/video";
import { VideoCard } from "./VideoCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoGridSkeleton from "./VideoGridSkeleton";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function VideoGrid() {
  const queryParams = useSearchParams();
  const query = queryParams.get("q");
  const sortBy = queryParams.get("sortBy") ?? "popular";
  const searchType = queryParams.get("type") ?? "video";
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["videos", query, sortBy, searchType],
    queryFn: ({ pageParam = 1 }) =>
      getCommunityVideos(query, sortBy, searchType, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.hasMore) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return <VideoGridSkeleton />;
  }

  if (isError) {
    return <div className="text-center py-8">Error loading videos</div>;
  }

  const allVideos =
    data?.pages.flatMap((page) => page?.data.videos ?? []) ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allVideos.length > 0 ? (
          allVideos.map((video) => <VideoCard key={video.id} video={video} />)
        ) : (
          <div className="col-span-full text-center py-8">No videos found</div>
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <div className="text-sm text-gray-500">Loading more videos...</div>
          ) : (
            <div className="text-sm text-gray-400">Scroll to load more</div>
          )}
        </div>
      )}

      {!hasNextPage && allVideos.length > 0 && (
        <div className="text-center py-4 text-sm text-gray-500">
          No more videos to load
        </div>
      )}
    </div>
  );
}
