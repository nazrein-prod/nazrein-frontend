import { getAllVideoRequestData } from "@/lib/videoRequest";
import RequestCard from "./_components/RequestCard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const data = await getAllVideoRequestData();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen border-2 ">
      <div className="flex flex-col items-start justify-between px-4 py-6">
        <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>

      <div className="grid px-6 md:grid-cols-4 gap-4 md:gap-6">
        {data.data.map((v, i) => {
          return (
            <div
              key={i}
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: i * 0.1 }}
            >
              <RequestCard v={v} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
