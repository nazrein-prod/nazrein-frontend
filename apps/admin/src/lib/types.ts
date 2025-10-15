export enum VideoRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type SessionAdmin = {
  id: string;
  email: string;
  image: string;
  name: string;
};

export type User = {
  id: string;
  google_id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  track_limit: number;
  videos_tracked: number;
  created_at: string;
  updated_at: string;
};

export type VideoRequestResponse = {
  data: {
    id: string;
    status: VideoRequestStatus;
    link: string;
    youtube_id: string;
    user: User;
    created_at: string;
  }[];
};
