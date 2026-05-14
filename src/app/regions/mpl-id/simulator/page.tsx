import { MplIdSimulatorDashboard } from "@/components/simulator/MplIdSimulatorDashboard";
import {
  getMplIdSchedule,
  getMplIdStandings,
  getMplIdTeams
} from "@/services/regions/mpl-id";

export default async function MplIdSimulatorPage() {
  const [scheduleData, standingsData, teamsData] = await Promise.all([
    getMplIdSchedule(),
    getMplIdStandings(),
    getMplIdTeams()
  ]);

  return (
    <MplIdSimulatorDashboard
      teams={teamsData.teams}
      matches={scheduleData.matches}
      currentWeek={scheduleData.currentWeek}
      originalStandings={standingsData.currentStandings}
    />
  );
}
