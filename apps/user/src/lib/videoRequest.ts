import { env } from "next-runtime-env";
import { VideoRequestResponse } from "./types";

export async function fetchVideoRequests(): Promise<VideoRequestResponse | null> {
  try {
    const response = await fetch(
      `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/request`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
}

export async function submitVideoRequest(
  link: string,
  youtube_id: string,
): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/request`,
      {
        method: "POST",
        body: JSON.stringify({
          link,
          youtube_id,
        }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error submitting video request:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to submit video request. Please try again.");
  }
}

export async function deleteVideoRequest(
  id: string,
): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/request/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting video request:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to delete video request. Please try again.");
  }
}
