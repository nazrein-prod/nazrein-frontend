export enum VideoRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type SessionUser = {
  id: string;
  email: string;
  image: string;
  name: string;
};

export type VideoRequest = {
  id: string;
  status: VideoRequestStatus;
  link: string;
  youtube_id: string;
  user_id: string;
  processed_by: string | null;
  processed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type VideoRequestResponse = {
  data: VideoRequest[];
};

export type Video = {
  id: string;
  link: string;
  published_at: string;
  title: string;
  description: string;
  thumbnail: string;
  youtube_id: string;
  channel_title: string;
  channel_id: string;
  user_id: string;
  is_active: boolean;
  visits: number;
  created_at: string;
  updated_at: string;
  is_bookmarked?: boolean;
  bookmarked_at?: string;
  bookmark_count?: number;
};

export type SingleVideoResponse = {
  data: Video;
};

export type CommunityVideoResponse = {
  data: { videos: Video[] };
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type TrackedVideoResponse = {
  data: Video[];
};

export type Metrics = {
  bookmarked: number;
  tracked: number;
  pending: number;
};

export type DashboardMetricsResponse = {
  data: Metrics;
};

export type BookmarkedVideoResponse = {
  data: Video[];
};

export type ClickHouseVideo = {
  snapshot_time: string;
  title: string;
  image_url: string;
  link: string;
};

export type VideoAnalyticsResponse = {
  data: ClickHouseVideo[];
};
