"use server";

import { serverApi } from "@/lib/api";
import type { SingleVideoResponse, VideoAnalyticsResponse } from "@/lib/types";

export async function getVideoInfo(
  videoID: string,
): Promise<SingleVideoResponse | null> {
  const { data, error } = await serverApi().GET("/api/v1/public/videos/{id}", {
    params: { path: { id: videoID } },
  });

  if (error !== undefined || data === undefined) {
    console.error("Error fetching video info", error);
    return null;
  }
  return data;
}

export async function getVideoAnalytics(
  videoID: string,
): Promise<VideoAnalyticsResponse | null> {
  const { data, error } = await serverApi().GET(
    "/api/v1/public/videos/analytics/{id}",
    { params: { path: { id: videoID } } },
  );

  if (error !== undefined || data === undefined) {
    console.error("Error fetching video analytics", error);
    return null;
  }
  return data;
}
