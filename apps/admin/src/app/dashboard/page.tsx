import AdminRequestsTable from "./_components/AdminRequestsTable";
import DashboardMetrics from "./_components/DashboardMetrics";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Review and manage video tracking requests from users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardMetrics />
        </div>

        <AdminRequestsTable />
      </div>
    </div>
  );
}
