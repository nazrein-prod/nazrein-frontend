import { VideoRequestResponse } from "./types";

export async function getAllVideoRequestData(): Promise<VideoRequestResponse | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/admin/request`, {
      credentials: "include",
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
}

export async function updateVideoRequest(
  user_id: string,
  admin_id: string,
  request_id: string,
  status: string,
  reason: string,
): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/admin/request/${request_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          user_id,
          status,
          processed_by: admin_id,
          rejection_reason: reason,
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
    console.error("Error updating video request:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to update video request. Please try again.");
  }
}
