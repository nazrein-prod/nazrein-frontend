import { api } from "./api";
import type { DashboardMetricsResponse } from "./types";

export async function getDashboardMetrics(): Promise<
  DashboardMetricsResponse | undefined
> {
  const { data, error } = await api().GET("/api/v1/dashboard/metrics", {});

  if (error !== undefined || data === undefined) {
    console.error("Error fetching dashboard metrics", error);
    return undefined;
  }
  return data;
}
