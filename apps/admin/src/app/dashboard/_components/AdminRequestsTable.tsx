"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VideoRequestStatus } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Filter,
  ExternalLink,
  User,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { RejectionModal } from "./RejectionModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVideo } from "@/lib/video";
import { getAllVideoRequestData, updateVideoRequest } from "@/lib/videoRequest";
import { toast } from "sonner";
import { getClientSideSession } from "@/lib/user";

export default function AdminRequestsTable() {
  const {
    data: session,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getClientSideSession,
    retry: false,
  });
  const queryClient = useQueryClient();

  const {
    data: requests,
    // isPending: isRequestsPending
  } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllVideoRequestData,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create_video"],
    mutationFn: async ({
      request_id,
      link,
      youtube_id,
      user_id,
    }: {
      request_id: string;
      link: string;
      youtube_id: string;
      user_id: string;
    }) => {
      return await createVideo(user_id, link, youtube_id, request_id);
    },
    onSuccess: () => {
      toast.success("Video created successfully!");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateVideoRequestMutation } = useMutation({
    mutationKey: ["update_video_request"],
    mutationFn: async ({
      requestID,
      reason,
      userID,
    }: {
      requestID: string;
      reason: string;
      userID: string;
    }) => {
      return await updateVideoRequest(
        userID,
        session?.data.id,
        requestID,
        "REJECTED",
        reason
      );
    },
    onSuccess: () => {
      toast.success("Video request approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rejectionModal, setRejectionModal] = useState<{
    isOpen: boolean;
    requestID: string;
    userID: string;
  }>({ isOpen: false, requestID: "", userID: "" });

  const filteredRequests = requests?.data?.filter((request) => {
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesStatus;
  });

  function handleApprove(
    requestId: string,
    link: string,
    youtube_id: string,
    user_id: string
  ) {
    mutate({ request_id: requestId, link, youtube_id, user_id });
  }

  function handleReject(requestID: string, userID: string) {
    setRejectionModal({ isOpen: true, requestID, userID });
  }

  async function handleRejectWithReason(
    requestID: string,
    reason: string,
    userID: string
  ) {
    updateVideoRequestMutation({ requestID, reason, userID });
    setRejectionModal({ isOpen: false, requestID: "", userID: "" });
  }

  function getStatusBadge(status: VideoRequestStatus) {
    switch (status) {
      case VideoRequestStatus.PENDING:
        return (
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case VideoRequestStatus.ACCEPTED:
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case VideoRequestStatus.REJECTED:
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!session || isError) {
    return <h1>Error</h1>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Video Requests
          </CardTitle>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Video</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests && filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No requests found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests &&
                filteredRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {request.id}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {request.link}
                          </p>
                          <a
                            href={request.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                          >
                            View Video <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                          <AvatarImage
                            src={request.user.image || "/placeholder.svg"}
                            alt={request.user.name}
                          />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {request.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.user.videos_tracked}/
                            {request.user.track_limit} tracked
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        {getStatusBadge(request.status)}
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="text-sm">
                        {formatDate(request.created_at)}
                      </p>
                    </TableCell>

                    <TableCell>
                      {request.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleApprove(
                                request.id,
                                request.link,
                                request.youtube_id,
                                request.user.id
                              )
                            }
                            disabled={isPending}
                            className="bg-green-600 hover:bg-green-700 cursor-pointer"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleReject(request.id, request.user.id)
                            }
                            className="cursor-pointer"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {request.status === "ACCEPTED"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <RejectionModal
        isOpen={rejectionModal.isOpen}
        onClose={() =>
          setRejectionModal({ isOpen: false, requestID: "", userID: "" })
        }
        onReject={(reason) =>
          handleRejectWithReason(
            rejectionModal.requestID,
            reason,
            rejectionModal.userID
          )
        }
      />
    </Card>
  );
}
