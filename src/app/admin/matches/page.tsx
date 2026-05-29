import { AdminMatchResultPanel } from "@/components/admin/AdminMatchResultPanel";
import { getAdminMatches } from "@/services/admin/matches";
import { getMplIdTeams } from "@/services/regions/mpl-id";

export default async function AdminMatchesPage() {
  const [adminMatchesData, teamsData] = await Promise.all([
    getAdminMatches(),
    getMplIdTeams()
  ]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminMatchResultPanel
          matches={adminMatchesData.matches}
          teams={teamsData.teams}
          persistenceConfigured={adminMatchesData.persistenceConfigured}
          source={adminMatchesData.source}
        />
      </div>
    </main>
  );
}
