import { BookmarkedVideoResponse, TrackedVideoResponse } from "./types";

export async function getTrackedVideos(
  user_id: string
): Promise<TrackedVideoResponse | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/videos/user/${user_id}`,
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

export async function getBookmarkedVideos(): Promise<BookmarkedVideoResponse | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/videos/bookmarks`, {
      credentials: "include",
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching bookmarked videos", error);
    return null;
  }
}
