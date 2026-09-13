import { unwrap } from "@repo/api-client";

import { api } from "./api";

export async function addBookmark(videoID: string) {
  return unwrap(
    await api().POST("/api/v1/bookmark/{id}", {
      params: { path: { id: videoID } },
    }),
    "Create bookmark",
  );
}

export async function deleteBookmark(videoID: string) {
  return unwrap(
    await api().DELETE("/api/v1/bookmark/{id}", {
      params: { path: { id: videoID } },
    }),
    "Delete bookmark",
  );
}
