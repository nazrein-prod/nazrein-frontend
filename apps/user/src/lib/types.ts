/**
 * API types re-exported from the shared client, which generates them from
 * server/api/openapi.yaml. Nothing here is hand-written
 */
export type {
  BookmarkedVideo,
  BookmarkedVideosResponse as BookmarkedVideoResponse,
  DashboardMetrics as Metrics,
  DashboardMetricsResponse,
  PublicVideosResponse as CommunityVideoResponse,
  Schema,
  SingleVideoResponse,
  UserInfo as SessionUser,
  UserVideosResponse as TrackedVideoResponse,
  Video,
  VideoAnalyticsResponse,
  VideoListItem,
  VideoRequest,
  VideoRequestsResponse as VideoRequestResponse,
  VideoTimelineSnapshot as ClickHouseVideo,
  VideoWithCounts,
} from "@repo/api-client";

/** Runtime values for the request status enum; the type comes from the spec. */
export const VideoRequestStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
} as const;
export type VideoRequestStatus =
  (typeof VideoRequestStatus)[keyof typeof VideoRequestStatus];
