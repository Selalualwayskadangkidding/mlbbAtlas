import { mplIdSeason17Matches } from "@/data/mpl-id/matches";
import {
  createServerSupabaseClient,
  isSupabaseConfigured
} from "@/lib/supabase/server";
import type {
  Match,
  MatchStatus,
  VerifiedDataStatus
} from "@/types/regions";

interface MatchRow {
  id: string;
  season_id: string;
  region_slug: string;
  week: number;
  date: string;
  time: string;
  team_a: string;
  team_b: string;
  score_a: number | null;
  score_b: number | null;
  status: string;
  format: string;
  verified_data_status: string;
  updated_at?: string | null;
}

export interface AdminMatchesData {
  matches: Match[];
  persistenceConfigured: boolean;
  source: "supabase" | "local-fallback";
}

export interface UpdateAdminMatchInput {
  scoreA: number | null;
  scoreB: number | null;
  status: MatchStatus;
  verifiedDataStatus: VerifiedDataStatus;
}

function rowToMatch(row: MatchRow): Match {
  return {
    id: row.id,
    seasonId: row.season_id,
    regionSlug: row.region_slug,
    week: row.week,
    date: row.date,
    time: row.time,
    teamA: row.team_a,
    teamB: row.team_b,
    scoreA: row.score_a,
    scoreB: row.score_b,
    status: row.status as MatchStatus,
    format: "BO3",
    verifiedDataStatus: row.verified_data_status as VerifiedDataStatus
  };
}

export function matchToRow(match: Match): MatchRow {
  return {
    id: match.id,
    season_id: match.seasonId,
    region_slug: match.regionSlug,
    week: match.week,
    date: match.date,
    time: match.time,
    team_a: match.teamA,
    team_b: match.teamB,
    score_a: match.scoreA,
    score_b: match.scoreB,
    status: match.status,
    format: match.format,
    verified_data_status: match.verifiedDataStatus,
    updated_at: new Date().toISOString()
  };
}

// Seed helper: prepares the current local verified match dataset for DB upsert.
export function getLocalMatchesForDatabaseInsert(): MatchRow[] {
  return mplIdSeason17Matches.map(matchToRow);
}

function findLocalMatch(matchId: string) {
  return mplIdSeason17Matches.find((match) => match.id === matchId);
}

export async function getAdminMatches(): Promise<AdminMatchesData> {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return {
      matches: mplIdSeason17Matches,
      persistenceConfigured: false,
      source: "local-fallback"
    };
  }

  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("week", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) {
    return {
      matches: mplIdSeason17Matches,
      persistenceConfigured: isSupabaseConfigured(),
      source: "local-fallback"
    };
  }

  return {
    matches: (data as MatchRow[]).map(rowToMatch),
    persistenceConfigured: true,
    source: "supabase"
  };
}

export async function updateAdminMatch(
  matchId: string,
  input: UpdateAdminMatchInput
): Promise<Match> {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    throw new Error("Persistence is not configured yet.");
  }

  // TODO: Add admin authentication/authorization before exposing write access.
  const existingLocalMatch = findLocalMatch(matchId);

  if (!existingLocalMatch) {
    throw new Error(`Unknown match id: ${matchId}`);
  }

  const updatedMatch: Match = {
    ...existingLocalMatch,
    scoreA: input.scoreA,
    scoreB: input.scoreB,
    status: input.status,
    verifiedDataStatus: input.verifiedDataStatus
  };

  const { data, error } = await supabase
    .from("matches")
    .upsert(matchToRow(updatedMatch), { onConflict: "id" })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update match.");
  }

  return rowToMatch(data as MatchRow);
}
