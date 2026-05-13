import { mplIdSeason17Matches, MPL_ID_SEASON_17_ID } from "@/data/mpl-id/matches";
import { MPL_ID_REGION_SLUG } from "@/data/mpl-id/region";
import { mplIdTeams } from "@/data/mpl-id/teams";
import { calculateStandings } from "@/lib/ranking";
import type { Season, Week } from "@/types/regions";

function getMatchesThroughWeek(weekNumber: number) {
  return mplIdSeason17Matches.filter((match) => match.week <= weekNumber);
}

export const mplIdSeason17Weeks: Week[] = Array.from(
  new Set(mplIdSeason17Matches.map((match) => match.week))
)
  .sort((a, b) => a - b)
  .map((weekNumber) => {
    const matches = mplIdSeason17Matches.filter(
      (match) => match.week === weekNumber
    );

    return {
      id: `${MPL_ID_SEASON_17_ID}-week-${weekNumber}`,
      seasonId: MPL_ID_SEASON_17_ID,
      weekNumber,
      label: `Week ${weekNumber}`,
      matches,
      standingsSnapshot: calculateStandings(
        mplIdTeams,
        getMatchesThroughWeek(weekNumber)
      )
    };
  });

export const mplIdSeason17: Season = {
  id: MPL_ID_SEASON_17_ID,
  regionSlug: MPL_ID_REGION_SLUG,
  name: "Season 17",
  stage: "Regular Season",
  currentWeek: 8,
  totalMatches: 72,
  totalTeams: mplIdTeams.length,
  weeks: mplIdSeason17Weeks
};
