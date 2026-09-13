import { createApiClient } from "@repo/api-client";
import { env } from "next-runtime-env";

/**
 * Client-side API client.
 */
export function api() {
  return createApiClient({
    baseUrl: env("NEXT_PUBLIC_BACKEND_URL") ?? "",
  });
}

/**
 * Server-side API client, for server actions and proxy.ts.
 */
export function serverApi(headers?: Record<string, string>) {
  return createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
    origin: process.env.NEXT_PUBLIC_ORIGIN,
    headers,
  });
}
