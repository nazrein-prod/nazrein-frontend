import { env } from "next-runtime-env";
import {
  BookmarkedVideoResponse,
  CommunityVideoResponse,
  TrackedVideoResponse,
} from "./types";

export async function getTrackedVideos(): Promise<TrackedVideoResponse | null> {
  const response = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/videos`,
    {
      credentials: "include",
    },
  );

  if (!response.ok)
    throw new Error(`Failed to fetch tracked videos: ${response.statusText}`);

  const videos = await response.json();
  return videos;
}

export async function getBookmarkedVideos(): Promise<BookmarkedVideoResponse> {
  const response = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/videos/bookmarks`,
    {
      credentials: "include",
    },
  );

  if (!response.ok)
    throw new Error(
      `Failed to fetch bookmarked videos: ${response.statusText}`,
    );

  const videos = (await response.json()) as BookmarkedVideoResponse;
  return videos;
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
    url = `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/public/videos?page=${page}&limit=${limit}&q=${query}&sortBy=${sortBy}&type=${searchType?.toLowerCase()}`;
  } else {
    url = `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/public/videos?page=${page}&limit=${limit}&sortBy=${sortBy}&type=${searchType?.toLowerCase()}`;
  }

  try {
    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching community videos", error);
    throw error;
  }
}

export async function getAutocompleteVideoNames(query: string) {
  const response = await fetch(
    `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/public/videos/autocomplete?q=${query}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
