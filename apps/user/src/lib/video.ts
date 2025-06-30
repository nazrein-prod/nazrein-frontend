import { CommunityVideoResponse, TrackedVideoResponse } from "./types";

export async function getCommunityVideos(): Promise<CommunityVideoResponse | null> {
  try {
    const response = await fetch(
      "http://localhost:8080/videos?page=1&limit=10&sortBy=recent",
      {
        credentials: "include",
      }
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching community videos", error);
    return null;
  }
}

export async function getTrackedVideos(
  user_id: string
): Promise<TrackedVideoResponse | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/videos/user/${user_id}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching tracked videos", error);
    return null;
  }
}
