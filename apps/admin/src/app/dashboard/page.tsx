import AdminRequestsTable from "./_components/AdminRequestsTable";
import DashboardMetrics from "./_components/DashboardMetrics";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Review and manage video tracking requests from users.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <DashboardMetrics />
        </div>

        <AdminRequestsTable />
      </div>
    </div>
  );
}
