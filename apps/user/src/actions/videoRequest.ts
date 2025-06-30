"use server";

import { revalidatePath } from "next/cache";

export async function submitVideoRequest(
  link: string,
  youtube_id: string
): Promise<{ message: string } | null> {
  try {
    const response = await fetch("http://localhost:8080/request", {
      method: "POST",
      body: JSON.stringify({
        link,
        youtube_id,
      }),

      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  } finally {
    revalidatePath("/dashboard");
  }
}
