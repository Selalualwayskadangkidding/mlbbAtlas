import { ScheduleDashboard } from "@/components/regions/ScheduleDashboard";
import {
  mplIdMatchesByWeek,
  mplIdCurrentSeason,
  mplIdStandings,
  mplIdStandingsSnapshots,
  mplIdTeams
} from "@/data/mock/mpl-id";

export default function MplIdSchedulePage() {
  return (
    <ScheduleDashboard
      teams={mplIdTeams}
      currentWeek={mplIdCurrentSeason.currentWeek}
      currentStandings={mplIdStandings}
      standingsSnapshots={mplIdStandingsSnapshots}
      matchesByWeek={mplIdMatchesByWeek}
    />
  );
}
