"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideoRequests } from "@/lib/videoRequest";
import { useAuth } from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import { VideoRequestStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function VideoRequests() {
  const { user } = useAuth();
  if (!user) {
    redirect("/");
  }

  const { data: requests } = useQuery({
    queryFn: fetchVideoRequests,
    queryKey: ["requests", user.user_id],
    staleTime: Infinity,
  });

  // const handleDeleteRequest = (id: string) => {
  //   setRequests(requests.filter((req) => req.id !== id));
  // };

  function getStatusIcon(status: VideoRequestStatus) {
    switch (status) {
      case VideoRequestStatus.PENDING:
        return <Clock className="h-4 w-4" />;
      case VideoRequestStatus.ACCEPTED:
        return <CheckCircle className="h-4 w-4" />;
      case VideoRequestStatus.REJECTED:
        return <XCircle className="h-4 w-4" />;
    }
  }

  function getStatusVariant(status: VideoRequestStatus) {
    switch (status) {
      case VideoRequestStatus.PENDING:
        return "secondary" as const;
      case VideoRequestStatus.ACCEPTED:
        return "default" as const;
      case VideoRequestStatus.REJECTED:
        return "destructive" as const;
    }
  }

  function getStatusColor(status: VideoRequestStatus) {
    switch (status) {
      case VideoRequestStatus.PENDING:
        return "bg-yellow-500";
      case VideoRequestStatus.ACCEPTED:
        return "bg-green-500";
      case VideoRequestStatus.REJECTED:
        return "bg-red-500";
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Video Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Requests list */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Recent Requests (Last 30 days)
          </h4>
          {!requests || requests.data.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No video requests yet.
            </p>
          ) : (
            <div className="space-y-3">
              {requests.data.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm line-clamp-1">
                        {request.youtube_id}
                      </h5>
                      {/* <p className="text-xs text-muted-foreground">
                        {request.channelTitle}
                      </p> */}
                      <p className="text-xs text-muted-foreground mt-1">
                        Requested: {formatDate(request.created_at)}
                      </p>
                      {request.processed_at && (
                        <p className="text-xs text-muted-foreground">
                          Responded: {formatDate(request.processed_at)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge
                        variant={getStatusVariant(request.status)}
                        className={cn(
                          "flex items-center gap-1",
                          getStatusColor(request.status)
                        )}
                      >
                        {getStatusIcon(request.status)}
                        {request.status}
                      </Badge>
                      {request.status === VideoRequestStatus.PENDING && (
                        <Button
                          size="sm"
                          variant="ghost"
                          // onClick={() => handleDeleteRequest(request.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {request.rejection_reason && (
                    <div className="bg-muted p-2 rounded text-xs">
                      <span className="font-medium">Reason:</span>{" "}
                      {request.rejection_reason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
