import { ScheduleDashboard } from "@/components/regions/ScheduleDashboard";
import {
  getMplIdRegion,
  getMplIdSchedule,
  getMplIdStandings,
  getMplIdTeams
} from "@/services/regions/mpl-id";

export default async function MplIdSchedulePage() {
  const [regionData, scheduleData, standingsData, teamsData] =
    await Promise.all([
      getMplIdRegion(),
      getMplIdSchedule(),
      getMplIdStandings(),
      getMplIdTeams()
    ]);

  return (
    <ScheduleDashboard
      teams={teamsData.teams}
      currentWeek={regionData.currentSeason.currentWeek}
      currentStandings={standingsData.currentStandings}
      standingsSnapshots={scheduleData.standingsSnapshots}
      matchesByWeek={scheduleData.matchesByWeek}
    />
  );
}
