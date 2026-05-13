import { TeamsSection } from "@/components/regions/TeamsSection";
import { getMplIdTeams } from "@/services/regions/mpl-id";

export default async function MplIdTeamsPage() {
  const data = await getMplIdTeams();

  return <TeamsSection teams={data.teams} standings={data.currentStandings} />;
}
