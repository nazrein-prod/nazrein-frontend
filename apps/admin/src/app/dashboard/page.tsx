import { getAllVideoRequestData } from "@/lib/videoRequest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle, Users } from "lucide-react";
import AdminRequestsTable from "./_components/AdminRequestsTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const requests = await getAllVideoRequestData();

  if (!requests) {
    return <div>Loading...</div>;
  }

  const pendingCount = requests.data.filter(
    (r) => r.status === "PENDING"
  ).length;
  const acceptedCount = requests.data.filter(
    (r) => r.status === "ACCEPTED"
  ).length;
  const rejectedCount = requests.data.filter(
    (r) => r.status === "REJECTED"
  ).length;
  const totalUsers = new Set(requests.data.map((r) => r.user.id)).size;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Review and manage video tracking requests from users.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptedCount}</div>
              <p className="text-xs text-muted-foreground">
                Approved for tracking
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <p className="text-xs text-muted-foreground">Declined requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Making requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <AdminRequestsTable requests={requests} />
      </div>
    </div>
  );
}
