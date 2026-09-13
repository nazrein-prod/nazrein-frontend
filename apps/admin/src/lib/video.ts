import { unwrap } from "@repo/api-client";

import { api } from "./api";

export async function createVideo(
  user_id: string,
  link: string,
  youtube_id: string,
  request_id: string,
) {
  // openapi-fetch serialises `body` and sets Content-Type: application/json,
  // which the API's spec validator requires.
  return unwrap(
    await api().POST("/admin/request", {
      body: { user_id, link, youtube_id, request_id },
    }),
    "Approve video request",
  );
}
