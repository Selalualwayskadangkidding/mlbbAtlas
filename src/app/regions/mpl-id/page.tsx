import { CurrentStandings } from "@/components/regions/CurrentStandings";
import { DataTransparencyNote } from "@/components/regions/DataTransparencyNote";
import { DevValidationSummary } from "@/components/regions/DevValidationSummary";
import { FeaturedMatchHighlight } from "@/components/regions/FeaturedMatchHighlight";
import { RegionHero } from "@/components/regions/RegionHero";
import {
  getMplIdApiMeta,
  hasMplIdPartialData,
  getMplIdRegion,
  getMplIdSchedule,
  getMplIdStandings,
  getMplIdTeams
} from "@/services/regions/mpl-id";
import type { Team } from "@/types/regions";

function getCompactTeamName(teams: Team[], slug: string) {
  const team = teams.find((item) => item.slug === slug);

  return (
    team?.name
      .replace(" Esports", "")
      .replace(" Hoshi", "")
      .replace(" Glory", "")
      .replace(" By Vit", "")
      .replace("Team Liquid ID", "TLID") ?? "TBD"
  );
}

export default async function MplIdPage() {
  const [
    regionData,
    scheduleData,
    standingsData,
    teamsData,
    apiMeta,
    hasPartialData
  ] =
    await Promise.all([
      getMplIdRegion(),
      getMplIdSchedule(),
      getMplIdStandings(),
      getMplIdTeams(),
      getMplIdApiMeta(),
      hasMplIdPartialData()
    ]);
  const currentWeek = regionData.currentSeason.currentWeek;
  const leaderStanding = standingsData.currentStandings.find(
    (standing) => standing.rank === 1
  );
  const currentLeader = getCompactTeamName(
    teamsData.teams,
    leaderStanding?.teamSlug ?? ""
  );
  const featuredMatch =
    scheduleData.matchesByWeek[currentWeek]?.find(
      (match) => match.status === "live"
    ) ??
    scheduleData.matchesByWeek[currentWeek]?.find(
      (match) => match.status === "upcoming"
    );

  return (
    <>
      <RegionHero
        region={regionData.region}
        season={regionData.currentSeason}
        currentLeader={currentLeader}
        matchesPlayedLabel={`${
          scheduleData.matches.filter((match) => match.status === "finished")
            .length
        }/${regionData.currentSeason.totalMatches}`}
        nextMatchLabel={
          featuredMatch
            ? `${getCompactTeamName(
                teamsData.teams,
                featuredMatch.teamA
              )} vs ${getCompactTeamName(
                teamsData.teams,
                featuredMatch.teamB
              )}`
            : "TBD"
        }
      />
      <CurrentStandings
        standings={standingsData.currentStandings}
        teams={teamsData.teams}
        title="Current Standings"
        description="MPL Indonesia Season 17 table derived from finished match rows."
      />
      <DataTransparencyNote hasPartialData={hasPartialData} />
      <DevValidationSummary
        validationIssues={standingsData.validationIssues.length}
        sourceLabel={apiMeta.source}
      />
      <FeaturedMatchHighlight match={featuredMatch} teams={teamsData.teams} />
    </>
  );
}
