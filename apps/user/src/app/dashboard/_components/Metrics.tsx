"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetrics } from "@/lib/dashboard";
import { useAuth } from "@/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Eye, Clock, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function Metrics() {
  const { user } = useAuth();

  if (!user) {
    redirect("/");
  }

  const { data: metrics, isPending } = useQuery({
    queryKey: ["metrics"],
    queryFn: () => getDashboardMetrics(user.user_id),
  });

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Bookmarked Videos
          </CardTitle>
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[2.5rem] flex items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {metrics ? metrics.data.bookmarked : "NA"}
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">Videos pinned</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Tracked Videos</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[2.5rem] flex items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {metrics ? metrics.data.tracked : "NA"}
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">Videos with analytics</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Pending Requests
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[2.5rem] flex items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {metrics ? metrics.data.pending : "NA"}
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">Awaiting approval</p>
        </CardContent>
      </Card>
    </>
  );
}
