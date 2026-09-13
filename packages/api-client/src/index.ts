import createOpenApiClient from "openapi-fetch";

import type { components, paths } from "./schema";

export type Schema = components["schemas"];

export type Video = Schema["Video"];
export type VideoWithCounts = Schema["VideoWithCounts"];
export type VideoListItem = Schema["VideoListItem"];
export type BookmarkedVideo = Schema["BookmarkedVideo"];
export type VideoRequest = Schema["VideoRequest"];
export type SimilarVideo = Schema["SimilarVideo"];

export type UserInfo = Schema["UserInfo"];
export type AdminInfo = Schema["AdminInfo"];
export type DashboardMetrics = Schema["DashboardMetrics"];
export type VideoTimelineSnapshot = Schema["VideoTimelineSnapshot"];

export type PublicVideosResponse = Schema["PublicVideosResponse"];
export type SingleVideoResponse = Schema["SingleVideoResponse"];
export type UserVideosResponse = Schema["UserVideosResponse"];
export type BookmarkedVideosResponse = Schema["BookmarkedVideosResponse"];
export type VideoRequestsResponse = Schema["VideoRequestsResponse"];
export type VideoAnalyticsResponse = Schema["VideoAnalyticsResponse"];
export type DashboardMetricsResponse = Schema["DashboardMetricsResponse"];
export type SimilarVideosResponse = Schema["SimilarVideosResponse"];
export type AdminVideoRequestsResponse = Schema["AdminVideoRequestsResponse"];

export type { components, paths };

/**
 * The API's session cookies are set on `.nazrein.dev` and must ride along with
 * every request, including cross-origin ones from the browser.
 */
const CREDENTIALS: RequestCredentials = "include";

export interface ApiClientOptions {
  /** API base URL. Read at call time, never at module load — the apps resolve
   *  `NEXT_PUBLIC_*` at container start via next-runtime-env. */
  baseUrl: string;
  /** Sent as the `Origin` header. Required for server-side fetches, which send
   *  no Origin of their own and would be refused by the API's CORS middleware. */
  origin?: string;
  /** Forwarded verbatim. Used by `proxy.ts` to pass the incoming session on. */
  headers?: Record<string, string>;
}

/**
 * Builds a client whose paths, methods, query parameters and response types are
 * all checked against the OpenAPI spec at compile time.
 */
export function createApiClient({
  baseUrl,
  origin,
  headers,
}: ApiClientOptions) {
  return createOpenApiClient<paths>({
    baseUrl,
    credentials: CREDENTIALS,
    headers: {
      ...(origin ? { Origin: origin } : {}),
      ...headers,
    },
  });
}

export type ApiClient = ReturnType<typeof createApiClient>;

export function unwrap<T>(
  result: { data?: T; error?: unknown; response: Response },
  context: string,
): T {
  if (result.error !== undefined || result.data === undefined) {
    throw new Error(
      `${context} failed: ${result.response.status} ${result.response.statusText}`,
    );
  }
  return result.data;
}
