export enum VideoRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type SessionUser = {
  user_id: string;
  user_email: string;
  user_image: string;
  user_name: string;
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
  created_at: string;
  updated_at: string;
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
