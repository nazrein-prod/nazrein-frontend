import { unwrap } from "@repo/api-client";

import { api } from "./api";
import type { SessionAdmin } from "./types";

export async function getClientSideSession(): Promise<{
  data: SessionAdmin;
}> {
  return unwrap(await api().GET("/auth/admin", {}), "Fetch admin session");
}
