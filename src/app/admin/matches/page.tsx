import { AdminMatchResultPanel } from "@/components/admin/AdminMatchResultPanel";
import {
  getMplIdSchedule,
  getMplIdTeams
} from "@/services/regions/mpl-id";

export default async function AdminMatchesPage() {
  const [scheduleData, teamsData] = await Promise.all([
    getMplIdSchedule(),
    getMplIdTeams()
  ]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminMatchResultPanel
          matches={scheduleData.matches}
          teams={teamsData.teams}
        />
      </div>
    </main>
  );
}
