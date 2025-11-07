"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllVideoRequestData } from "@/lib/videoRequest";
import { useQuery } from "@tanstack/react-query";
import { Clock, CheckCircle, XCircle, Users, Loader2 } from "lucide-react";

export default function DashboardMetrics() {
  const { data: requests, isPending } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllVideoRequestData,
  });

  const pendingCount = requests?.data?.filter(
    (r) => r.status === "PENDING"
  ).length;
  const acceptedCount = requests?.data?.filter(
    (r) => r.status === "ACCEPTED"
  ).length;
  const rejectedCount = requests?.data?.filter(
    (r) => r.status === "REJECTED"
  ).length;
  const totalUsers = new Set(requests?.data?.map((r) => r.user.id)).size;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Requests
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[2.5rem] flex items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {pendingCount ? pendingCount : "NA"}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Awaiting review</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[2.5rem] flex items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {acceptedCount ? acceptedCount : "NA"}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Approved for tracking</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[2.5rem] flex items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {rejectedCount ? rejectedCount : "NA"}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Declined requests</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="min-h-[2.5rem] flex items-center">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="text-2xl font-bold">
                {totalUsers ? totalUsers : "NA"}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Making requests</p>
        </CardContent>
      </Card>
    </>
  );
}
