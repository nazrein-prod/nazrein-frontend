"use server";

import { cookies } from "next/headers";

export async function createVideo(
  user_id: string,
  link: string,
  youtube_id: string,
  request_id: string
) {
  const cookieHeader = (await cookies()).toString();

  try {
    const response = await fetch("http://localhost:8080/admin/request", {
      method: "POST",
      body: JSON.stringify({
        user_id,
        link,
        youtube_id,
        request_id,
      }),
      headers: {
        Cookie: decodeURIComponent(cookieHeader),
      },
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
}
