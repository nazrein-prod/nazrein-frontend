import { unwrap } from "@repo/api-client";

import { api } from "./api";
import type { VideoRequestResponse } from "./types";

export async function getAllVideoRequestData(): Promise<VideoRequestResponse | null> {
  const { data, error } = await api().GET("/admin/request", {});

  if (error !== undefined || data === undefined) {
    console.error("Error fetching video requests", error);
    return null;
  }
  return data;
}

export async function updateVideoRequest(
  user_id: string,
  admin_id: string | undefined,
  request_id: string,
  status: string,
  reason: string,
): Promise<{ message: string }> {
  if (!admin_id) {
    throw new Error("Admin ID not found");
  }

  return unwrap(
    await api().PATCH("/admin/request/{request_id}", {
      params: { path: { request_id } },
      body: {
        user_id,
        status: status as "PENDING" | "ACCEPTED" | "REJECTED",
        processed_by: admin_id,
        rejection_reason: reason,
      },
    }),
    "Update video request",
  );
}
