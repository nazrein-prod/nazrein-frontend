export type SessionUser = {
  user_id: string;
  user_email: string;
  user_image: string;
  user_name: string;
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
    status: string;
    link: string;
    youtube_id: string;
    user: User;
    created_at: string;
  }[];
};
