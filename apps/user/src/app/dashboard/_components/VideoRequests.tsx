"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle, XCircle, Clock, Dot } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteVideoRequest, fetchVideoRequests } from "@/lib/videoRequest";
import { VideoRequestStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "sonner";

export function VideoRequests() {
  const queryClient = useQueryClient();
  const { data: requests } = useQuery({
    queryFn: fetchVideoRequests,
    queryKey: ["requests"],
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteVideoRequest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error) => {
      console.error("Failed to delete video request:", error);
      toast.error("Something went wrong. Please try again.");
    },
  });

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
    <Card className="text-secondary bg-primary border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Video Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-medium">
            Recent Requests (Last 30 days)
          </h4>
          {!requests || !requests.data || requests.data.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No video requests yet.
            </p>
          ) : (
            <div className="max-h-[700px] space-y-3 overflow-auto">
              {requests.data.map((request) => (
                <div key={request.id} className="space-y-3 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h5 className="line-clamp-1 text-sm font-medium">
                        {request.youtube_id}
                      </h5>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Requested: {formatDate(request.created_at)}
                      </p>
                      {request.processed_at && (
                        <p className="text-muted-foreground flex text-xs">
                          Responded: {formatDate(request.processed_at)}
                          <Dot size={16} />
                          {formatDistanceToNow(parseISO(request.processed_at), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <Badge
                        variant={getStatusVariant(request.status)}
                        className={cn(
                          "flex items-center gap-1",
                          getStatusColor(request.status),
                        )}
                      >
                        {getStatusIcon(request.status)}
                        {request.status}
                      </Badge>
                      {request.status === VideoRequestStatus.PENDING && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => mutate(request.id)}
                          className="h-8 w-8 cursor-pointer p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {request.rejection_reason && (
                    <div className="rounded p-2 text-xs">
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
