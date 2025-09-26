import { cookies } from "next/headers";
import { SessionUser } from "./types";

export async function getServerSideSession(): Promise<SessionUser | null> {
  const cookieHeader = (await cookies()).toString();

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
      headers: {
        Cookie: decodeURIComponent(cookieHeader),
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Server-side auth check failed:", error);
    return null;
  }
}
