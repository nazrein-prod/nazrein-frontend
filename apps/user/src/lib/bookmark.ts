import { env } from "next-runtime-env";

export async function addBookmark(videoID: string) {
  try {
    const response = await fetch(
      `${env("NEXT_PUBLIC_BACKEND_URL")}}/api/v1/bookmark/${videoID}`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating bookmark", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to bookmark request. Please try again.");
  }
}

export async function deleteBookmark(videoID: string) {
  try {
    const response = await fetch(
      `${env("NEXT_PUBLIC_BACKEND_URL")}}/api/v1/bookmark/${videoID}`,
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
    console.error("Error deleting bookmark", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to delete bookmark. Please try again.");
  }
}
