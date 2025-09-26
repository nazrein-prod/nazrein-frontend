export async function createVideo(
  user_id: string,
  link: string,
  youtube_id: string,
  request_id: string,
) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/admin/request`, {
      method: "POST",
      body: JSON.stringify({
        user_id,
        link,
        youtube_id,
        request_id,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user data", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to create video. Please try again.");
  }
}
