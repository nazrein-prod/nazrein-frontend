import { DashboardMetricsResponse } from "./types";

export async function getDashboardMetrics(
  user_id: string,
): Promise<DashboardMetricsResponse | undefined> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/dashboard/metrics/${user_id}`,
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
