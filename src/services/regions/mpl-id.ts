import { mplIdJourney } from "@/data/mpl-id/journey";
import { mplIdSeason17Matches } from "@/data/mpl-id/matches";
import { mplIdRegion } from "@/data/mpl-id/region";
import { mplIdSeason17 } from "@/data/mpl-id/seasons";
import { mplIdSeason17StandingsReference } from "@/data/mpl-id/standings-reference";
import { mplIdSeason17VerifiedStandingsSnapshots } from "@/data/mpl-id/standings-snapshots";
import { mplIdTeams } from "@/data/mpl-id/teams";
import {
  calculateStandings,
  validateStandingsAgainstReference
} from "@/lib/ranking";
import type { ApiResponseMeta } from "@/types/api";
import type {
  JourneySeason,
  Match,
  Region,
  Season,
  Standing,
  StandingValidationIssue,
  StandingsSnapshot,
  Team
} from "@/types/regions";

const SOURCE_LABEL = "internal-verified-data";

export interface MplIdRegionData {
  region: Region;
  currentSeason: Season;
}

export interface MplIdStandingsData {
  currentStandings: Standing[];
  snapshots: StandingsSnapshot[];
  validationIssues: StandingValidationIssue[];
}

export interface MplIdScheduleData {
  currentWeek: number;
  matches: Match[];
  matchesByWeek: Record<number, Match[]>;
  standingsSnapshots: StandingsSnapshot[];
}

export interface MplIdTeamsData {
  teams: Team[];
  currentStandings: Standing[];
}

export interface MplIdJourneyData {
  seasons: JourneySeason[];
}

function getFinishedMatchesThroughWeek(weekNumber: number) {
  return mplIdSeason17Matches.filter(
    (match) => match.week <= weekNumber && match.status === "finished"
  );
}

function getStandingsSnapshots(): StandingsSnapshot[] {
  return mplIdSeason17.weeks.map((week) => ({
    week: week.weekNumber,
    standings:
      mplIdSeason17VerifiedStandingsSnapshots.find(
        (snapshot) => snapshot.week === week.weekNumber
      )?.standings ??
      calculateStandings(
        mplIdTeams,
        getFinishedMatchesThroughWeek(week.weekNumber)
      )
  }));
}

function getCurrentStandings() {
  return calculateStandings(mplIdTeams, mplIdSeason17Matches);
}

function getMatchesByWeek() {
  return mplIdSeason17.weeks.reduce<Record<number, Match[]>>((weeks, week) => {
    return {
      ...weeks,
      [week.weekNumber]: week.matches
    };
  }, {});
}

function getValidationIssues() {
  const issues = validateStandingsAgainstReference(
    getCurrentStandings(),
    mplIdSeason17StandingsReference
  );

  if (process.env.NODE_ENV === "development" && issues.length > 0) {
    console.warn("MPL ID standings validation issues", issues);
  }

  return issues;
}

export function getMplIdDataStatus() {
  const statuses = mplIdSeason17Matches.map((match) => match.verifiedDataStatus);

  if (statuses.includes("partial")) {
    return "partial";
  }

  if (statuses.includes("placeholder")) {
    return "placeholder";
  }

  return "verified";
}

export function hasMplIdPartialData() {
  return mplIdSeason17Matches.some(
    (match) => match.verifiedDataStatus === "partial"
  );
}

export async function getMplIdApiMeta(): Promise<ApiResponseMeta> {
  return {
    source: SOURCE_LABEL,
    regionSlug: mplIdRegion.slug,
    seasonId: mplIdSeason17.id,
    dataStatus: getMplIdDataStatus(),
    validationIssues: getValidationIssues().length
  };
}

// TODO: Replace local verified data with Liquipedia/API/database source when integration is approved.
// TODO: Replace local internal data with database/admin panel later.
export async function getMplIdRegion(): Promise<MplIdRegionData> {
  return {
    region: mplIdRegion,
    currentSeason: mplIdSeason17
  };
}

// TODO: Future admin panel should update matches, not standings directly.
// Standings should remain derived from match results. Manual override is emergency-only.
export async function getMplIdStandings(): Promise<MplIdStandingsData> {
  return {
    currentStandings: getCurrentStandings(),
    snapshots: getStandingsSnapshots(),
    validationIssues: getValidationIssues()
  };
}

// TODO: Replace local verified data with Liquipedia/API/database source when integration is approved.
// TODO: Admin panel should update match results; standings must stay derived from matches.
export async function getMplIdSeason(): Promise<Season> {
  return mplIdSeason17;
}

// TODO: Replace local verified data with Liquipedia/API/database source when integration is approved.
// TODO: Manual standings override should only be optional/emergency.
export async function getMplIdMatches(): Promise<Match[]> {
  return mplIdSeason17Matches;
}

// TODO: Future admin panel should update matches, not standings directly.
// TODO: Replace local internal data with database/admin panel later.
export async function getMplIdSchedule(): Promise<MplIdScheduleData> {
  return {
    currentWeek: mplIdSeason17.currentWeek,
    matches: mplIdSeason17Matches,
    matchesByWeek: getMatchesByWeek(),
    standingsSnapshots: getStandingsSnapshots()
  };
}

// TODO: Replace local verified data with Liquipedia/API/database source when integration is approved.
export async function getMplIdTeams(): Promise<MplIdTeamsData> {
  return {
    teams: mplIdTeams,
    currentStandings: getCurrentStandings()
  };
}

// TODO: Replace local verified data with Liquipedia/API/database source when integration is approved.
export async function getMplIdJourney(): Promise<MplIdJourneyData> {
  return {
    seasons: mplIdJourney
  };
}
