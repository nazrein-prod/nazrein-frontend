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
 * Server-side API client, for proxy.ts. Server-side fetches send no Origin of
 * their own, and the API's CORS middleware refuses unlisted origins.
 */
export function serverApi(headers?: Record<string, string>) {
  return createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
    origin: process.env.NEXT_PUBLIC_ADMIN_ORIGIN,
    headers,
  });
}
