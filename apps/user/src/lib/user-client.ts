import { api } from "./api";
import type { SessionUser } from "./types";

export async function getClientSideSession(): Promise<{
  data: SessionUser;
} | null> {
  const { data, error } = await api().GET("/auth/user", {});

  if (error !== undefined || data === undefined) {
    return null;
  }
  return data;
}
