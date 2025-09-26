import { SessionUser } from "./types";

export async function getClientSideSession(): Promise<SessionUser | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
      credentials: "include",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Client-side auth check failed:", error);
    return null;
  }
}
