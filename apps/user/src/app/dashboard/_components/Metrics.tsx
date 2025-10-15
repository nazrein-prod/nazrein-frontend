"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetrics } from "@/lib/dashboard";

import { useQuery } from "@tanstack/react-query";
import { Bookmark, Eye, Clock, Loader2 } from "lucide-react";

export default function Metrics() {
  const {
    data: metrics,
    isPending,
    // isError,  FIX
  } = useQuery({
    queryKey: ["metrics"],
    queryFn: getDashboardMetrics,
  });

  return (
    <>
      <Card
        className="text-secondary border-none shadow-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #1a1a1a",
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Bookmarked Videos
          </CardTitle>
          <Bookmark className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[2.5rem] items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {metrics ? metrics.data.bookmarked : "NA"}
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-xs">Videos pinned</p>
        </CardContent>
      </Card>

      <Card
        className="text-secondary border-none shadow-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #1a1a1a",
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Tracked Videos</CardTitle>
          <Eye className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[2.5rem] items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {metrics ? metrics.data.tracked : "NA"}
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-xs">Videos with analytics</p>
        </CardContent>
      </Card>

      <Card
        className="text-secondary border-none shadow-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #1a1a1a",
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Pending Requests
          </CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[2.5rem] items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {metrics ? metrics.data.pending : "NA"}
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-xs">Awaiting approval</p>
        </CardContent>
      </Card>
    </>
  );
}
