"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitVideoRequest(
  link: string,
  youtube_id: string,
): Promise<{ message: string } | null> {
  const cookieHeader = (await cookies()).toString();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/request`,
      {
        method: "POST",
        body: JSON.stringify({
          link,
          youtube_id,
        }),
        headers: {
          Cookie: decodeURIComponent(cookieHeader),
          Origin: process.env.NEXT_PUBLIC_ORIGIN!,
        },
      },
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function deleteVideoRequest(
  id: string,
): Promise<{ message: string }> {
  const cookieHeader = (await cookies()).toString();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/${id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: decodeURIComponent(cookieHeader),
          Origin: process.env.NEXT_PUBLIC_ORIGIN!,
        },
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
