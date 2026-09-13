import { unwrap } from "@repo/api-client";

import { api } from "./api";
import type { VideoRequestResponse } from "./types";

export async function fetchVideoRequests(): Promise<VideoRequestResponse | null> {
  const { data, error } = await api().GET("/api/v1/request", {});

  if (error !== undefined || data === undefined) {
    console.error("Error fetching video requests", error);
    return null;
  }
  return data;
}

export async function submitVideoRequest(
  link: string,
  youtube_id: string,
): Promise<{ message: string }> {
  // openapi-fetch serialises `body` and sets Content-Type: application/json.
  // The previous hand-written fetch sent the JSON without that header, which
  // the API's spec validator now rejects.
  return unwrap(
    await api().POST("/api/v1/request", { body: { link, youtube_id } }),
    "Submit video request",
  );
}

export async function deleteVideoRequest(
  id: string,
): Promise<{ message: string }> {
  return unwrap(
    await api().DELETE("/api/v1/request/{id}", {
      params: { path: { id } },
    }),
    "Delete video request",
  );
}
