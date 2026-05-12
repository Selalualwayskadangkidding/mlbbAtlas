import { TeamsSection } from "@/components/regions/TeamsSection";
import { mplIdStandings, mplIdTeams } from "@/data/mock/mpl-id";

export default function MplIdTeamsPage() {
  return <TeamsSection teams={mplIdTeams} standings={mplIdStandings} />;
}
