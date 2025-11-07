"use server";

import { SingleVideoResponse, VideoAnalyticsResponse } from "@/lib/types";

export async function getVideoInfo(
  videoID: string,
): Promise<SingleVideoResponse | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/public/videos/${videoID}`,
      {
        headers: {
          Origin: process.env.NEXT_PUBLIC_ORIGIN!,
        },
      },
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching community videos", error);
    return null;
  }
}

export async function getVideoAnalytics(
  videoID: string,
): Promise<VideoAnalyticsResponse | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/public/videos/analytics/${videoID}`,
      {
        headers: {
          Origin: process.env.NEXT_PUBLIC_ORIGIN!,
        },
      },
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching community videos", error);
    return null;
  }
}
