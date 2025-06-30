import { VideoRequestResponse } from "./types";

export async function fetchVideoRequests(): Promise<VideoRequestResponse | null> {
  try {
    const response = await fetch("http://localhost:8080/request", {
      headers: {
        Origin: "http://localhost:3000", // TODO: change this to your actual domain in env file
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
