import { unwrap } from "@repo/api-client";

import { api } from "./api";
import type {
  BookmarkedVideoResponse,
  CommunityVideoResponse,
  TrackedVideoResponse,
} from "./types";

export async function getTrackedVideos(): Promise<TrackedVideoResponse> {
  return unwrap(await api().GET("/api/v1/videos", {}), "Fetch tracked videos");
}

export async function getBookmarkedVideos(): Promise<BookmarkedVideoResponse> {
  return unwrap(
    await api().GET("/api/v1/videos/bookmarks", {}),
    "Fetch bookmarked videos",
  );
}

export async function getCommunityVideos(
  query: string | null = null,
  sortBy: string | null = "popular",
  searchType: string | null = "video",
  page: number = 1,
  limit: number = 10,
): Promise<CommunityVideoResponse> {
  return unwrap(
    await api().GET("/api/v1/public/videos", {
      params: {
        query: {
          page,
          limit,
          sortBy: (sortBy ?? "popular") as "popular" | "recent",
          type: (searchType ?? "video").toLowerCase() as "video" | "channel",
          // Omitted entirely when empty — the API treats an empty q as "no
          // search", and sending `q=` would be a search for the empty string.
          ...(query ? { q: query } : {}),
        },
      },
    }),
    "Fetch community videos",
  );
}

export async function getAutocompleteVideoNames(query: string) {
  return unwrap(
    await api().GET("/api/v1/public/videos/autocomplete", {
      params: { query: { q: query } },
    }),
    "Fetch autocomplete suggestions",
  );
}
