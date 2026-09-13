/**
 * API types re-exported from the shared client, which generates them from
 * server/api/openapi.yaml. Nothing here is hand-written.
 */
import type { Schema } from "@repo/api-client";

export type { Schema };

export type SessionAdmin = Schema["AdminInfo"];
export type User = Schema["AdminUser"];
export type AdminVideoRequest = Schema["AdminVideoRequest"];
export type VideoRequestResponse = Schema["AdminVideoRequestsResponse"];
export type ApproveVideoRequestInput = Schema["ApproveVideoRequestInput"];
export type PatchVideoRequestInput = Schema["PatchVideoRequestInput"];

/** Runtime values for the request status enum; the type comes from the spec. */
export const VideoRequestStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
} as const;
export type VideoRequestStatus =
  (typeof VideoRequestStatus)[keyof typeof VideoRequestStatus];
