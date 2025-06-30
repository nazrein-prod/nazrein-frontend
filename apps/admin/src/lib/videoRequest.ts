import { cookies } from "next/headers";
import { VideoRequestResponse } from "./types";

export async function getAllVideoRequestData(): Promise<VideoRequestResponse | null> {
  const cookieHeader = (await cookies()).toString();

  try {
    const response = await fetch("http://localhost:8080/admin/request", {
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
