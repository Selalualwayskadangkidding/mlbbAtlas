import { CurrentStandings } from "@/components/regions/CurrentStandings";
import { FeaturedMatchHighlight } from "@/components/regions/FeaturedMatchHighlight";
import { RegionHero } from "@/components/regions/RegionHero";
import {
  mplIdMatchesByWeek,
  mplIdCurrentSeason,
  mplIdRegion,
  mplIdStandings,
  mplIdTeams
} from "@/data/mock/mpl-id";

function getCompactTeamName(slug: string) {
  const team = mplIdTeams.find((item) => item.slug === slug);

  return (
    team?.name
      .replace(" Esports", "")
      .replace(" Hoshi", "")
      .replace(" Glory", "")
      .replace(" By Vit", "")
      .replace("Team Liquid ID", "TLID") ?? "TBD"
  );
}

export default function MplIdPage() {
  const currentWeek = mplIdCurrentSeason.currentWeek;
  const leaderStanding = mplIdStandings.find((standing) => standing.rank === 1);
  const currentLeader = getCompactTeamName(leaderStanding?.teamSlug ?? "");
  const featuredMatch =
    mplIdMatchesByWeek[currentWeek]?.find((match) => match.status === "live") ??
    mplIdMatchesByWeek[currentWeek]?.find(
      (match) => match.status === "upcoming"
    );

  return (
    <>
      <RegionHero
        region={mplIdRegion}
        season={mplIdCurrentSeason}
        currentLeader={currentLeader}
        matchesPlayedLabel={`42/${mplIdCurrentSeason.totalMatches}`}
        nextMatchLabel={
          featuredMatch
            ? `${getCompactTeamName(featuredMatch.teamASlug)} vs ${getCompactTeamName(
                featuredMatch.teamBSlug
              )}`
            : "TBD"
        }
      />
      <CurrentStandings
        standings={mplIdStandings}
        teams={mplIdTeams}
        title="Current Standings"
        description="Live MPL Indonesia table for the current mock season."
      />
      <FeaturedMatchHighlight match={featuredMatch} teams={mplIdTeams} />
    </>
  );
}
