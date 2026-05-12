import { Header } from "@/components/layout/Header";
import { MplIdDashboard } from "@/components/regions/MplIdDashboard";
import {
  mplIdMatchesByWeek,
  mplIdRegion,
  mplIdStandings,
  mplIdStandingsSnapshots,
  mplIdTeams
} from "@/data/mock/mpl-id";

export default function MplIdPage() {
  return (
    <main className="min-h-screen bg-atlas-background text-atlas-primary">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
        <MplIdDashboard
          region={mplIdRegion}
          teams={mplIdTeams}
          currentStandings={mplIdStandings}
          standingsSnapshots={mplIdStandingsSnapshots}
          matchesByWeek={mplIdMatchesByWeek}
          seasonMatchCount={72}
          matchesPlayedCount={42}
        />
      </div>
    </main>
  );
}
