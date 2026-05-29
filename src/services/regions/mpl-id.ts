import { mplIdJourney } from "@/data/mpl-id/journey";
import { mplIdRegion } from "@/data/mpl-id/region";
import { mplIdSeason17 } from "@/data/mpl-id/seasons";
import { mplIdSeason17StandingsReference } from "@/data/mpl-id/standings-reference";
import { mplIdTeams } from "@/data/mpl-id/teams";
import { getAdminMatches } from "@/services/admin/matches";
import {
  calculateStandings,
  validateStandingsAgainstReference
} from "@/lib/ranking";
import { applyPlayoffStatuses } from "@/lib/playoffs";
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

type MplIdMatchSource = "supabase" | "local-fallback";

export interface MplIdRegionData {
  region: Region;
  currentSeason: Season;
}

export interface MplIdStandingsData {
  currentStandings: Standing[];
  snapshots: StandingsSnapshot[];
  validationIssues: StandingValidationIssue[];
  source: MplIdMatchSource;
}

export interface MplIdScheduleData {
  currentWeek: number;
  matches: Match[];
  matchesByWeek: Record<number, Match[]>;
  standingsSnapshots: StandingsSnapshot[];
  source: MplIdMatchSource;
}

export interface MplIdTeamsData {
  teams: Team[];
  currentStandings: Standing[];
  source: MplIdMatchSource;
}

export interface MplIdJourneyData {
  seasons: JourneySeason[];
}

async function getMplIdMatchSource() {
  return getAdminMatches();
}

function getFinishedMatchesThroughWeek(matches: Match[], weekNumber: number) {
  return matches.filter(
    (match) => match.week <= weekNumber && match.status === "finished"
  );
}

function getScenarioMatchesThroughWeek(matches: Match[], weekNumber: number) {
  return matches.map((match) => {
    if (match.week <= weekNumber) {
      return match;
    }

    return {
      ...match,
      status: "upcoming" as const,
      scoreA: null,
      scoreB: null
    };
  });
}

function getStandingsSnapshots(matches: Match[]): StandingsSnapshot[] {
  return mplIdSeason17.weeks.map((week) => {
    const standings = calculateStandings(
      mplIdTeams,
      getFinishedMatchesThroughWeek(matches, week.weekNumber)
    );

    return {
      week: week.weekNumber,
      standings: applyPlayoffStatuses(
        standings,
        getScenarioMatchesThroughWeek(matches, week.weekNumber)
      )
    };
  });
}

function getCurrentStandings(matches: Match[]) {
  return applyPlayoffStatuses(
    calculateStandings(mplIdTeams, matches),
    matches
  );
}

function getMatchesByWeek(matches: Match[]) {
  return matches.reduce<Record<number, Match[]>>((weeks, match) => {
    return {
      ...weeks,
      [match.week]: [...(weeks[match.week] ?? []), match]
    };
  }, {});
}

function getValidationIssues(matches: Match[]) {
  const issues = validateStandingsAgainstReference(
    getCurrentStandings(matches),
    mplIdSeason17StandingsReference
  );

  if (process.env.NODE_ENV === "development" && issues.length > 0) {
    console.warn("MPL ID standings validation issues", issues);
  }

  return issues;
}

export async function getMplIdDataStatus() {
  const matchSource = await getMplIdMatchSource();
  const statuses = matchSource.matches.map((match) => match.verifiedDataStatus);

  if (statuses.includes("partial")) {
    return "partial";
  }

  if (statuses.includes("placeholder")) {
    return "placeholder";
  }

  return "verified";
}

export async function hasMplIdPartialData() {
  const matchSource = await getMplIdMatchSource();

  return matchSource.matches.some(
    (match) => match.verifiedDataStatus === "partial"
  );
}

export async function getMplIdApiMeta(): Promise<ApiResponseMeta> {
  const matchSource = await getMplIdMatchSource();

  return {
    source: matchSource.source,
    regionSlug: mplIdRegion.slug,
    seasonId: mplIdSeason17.id,
    dataStatus: await getMplIdDataStatus(),
    validationIssues: getValidationIssues(matchSource.matches).length
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
  const matchSource = await getMplIdMatchSource();

  return {
    currentStandings: getCurrentStandings(matchSource.matches),
    snapshots: getStandingsSnapshots(matchSource.matches),
    validationIssues: getValidationIssues(matchSource.matches),
    source: matchSource.source
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
  const matchSource = await getMplIdMatchSource();

  return matchSource.matches;
}

// TODO: Future admin panel should update matches, not standings directly.
// TODO: Replace local internal data with database/admin panel later.
export async function getMplIdSchedule(): Promise<MplIdScheduleData> {
  const matchSource = await getMplIdMatchSource();

  return {
    currentWeek: mplIdSeason17.currentWeek,
    matches: matchSource.matches,
    matchesByWeek: getMatchesByWeek(matchSource.matches),
    standingsSnapshots: getStandingsSnapshots(matchSource.matches),
    source: matchSource.source
  };
}

// TODO: Replace local verified data with Liquipedia/API/database source when integration is approved.
export async function getMplIdTeams(): Promise<MplIdTeamsData> {
  const matchSource = await getMplIdMatchSource();

  return {
    teams: mplIdTeams,
    currentStandings: getCurrentStandings(matchSource.matches),
    source: matchSource.source
  };
}

// TODO: Replace local verified data with Liquipedia/API/database source when integration is approved.
export async function getMplIdJourney(): Promise<MplIdJourneyData> {
  return {
    seasons: mplIdJourney
  };
}
