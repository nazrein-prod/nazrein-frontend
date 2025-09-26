import {
  BookmarkedVideoResponse,
  CommunityVideoResponse,
  TrackedVideoResponse,
} from "./types";

export async function getTrackedVideos(
  user_id: string,
): Promise<TrackedVideoResponse | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/videos/user/${user_id}`,
      {
        credentials: "include",
      },
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
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/videos/bookmarks`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching bookmarked videos", error);
    return null;
  }
}

export async function getCommunityVideos(
  query: string | null = null,
  sortBy: string | null = "popular",
  searchType: string | null = "video",
  page: number = 1,
  limit: number = 10,
): Promise<CommunityVideoResponse | null> {
  let url = "";
  if (query) {
    url = `${process.env.BACKEND_URL}/api/videos?page=${page}&limit=${limit}&q=${query}&sortBy=${sortBy}&type=${searchType?.toLowerCase()}`;
  } else {
    url = `${process.env.BACKEND_URL}/api/videos?page=${page}&limit=${limit}&sortBy=${sortBy}&type=${searchType?.toLowerCase()}`;
  }

  try {
    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching community videos", error);
    throw error;
  }
}

export async function getAutocompleteVideoNames(query: string) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/videos/autocomplete?q=${query}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching community videos", error);
    throw error;
  }
}
