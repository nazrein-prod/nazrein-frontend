import { env } from "next-runtime-env";
import { DashboardMetricsResponse } from "./types";

export async function getDashboardMetrics(): Promise<
  DashboardMetricsResponse | undefined
> {
  try {
    const response = await fetch(
      `${env("NEXT_PUBLIC_BACKEND_URL")}/api/v1/dashboard/metrics`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) return undefined;
    return response.json();
  } catch (error) {
    console.error("Error fetching tracked videos", error);
    return undefined;
  }
}
