export type StandingStatus =
  | "upper-bracket-secured"
  | "playoff-secured"
  | "outside-playoff-zone"
  | "eliminated";

export type MatchStatus = "finished" | "live" | "upcoming";

export type StandingViewMode = "current" | "after-selected-week";

export type VerifiedDataStatus = "verified" | "partial" | "placeholder";

export interface Region {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  subtitle: string;
  logoSrc: string;
}

export interface Season {
  id: string;
  regionSlug: string;
  name: string;
  stage: string;
  currentWeek: number;
  totalMatches: number;
  totalTeams: number;
  weeks: Week[];
}

export interface Team {
  id: string;
  regionSlug: string;
  name: string;
  shortName: string;
  slug: string;
  logoSrc: string;
}

export interface Week {
  id: string;
  seasonId: string;
  weekNumber: number;
  label: string;
  matches: Match[];
  standingsSnapshot: Standing[];
}

export interface Standing {
  rank: number;
  teamSlug: string;
  matchRecord: string;
  gameRecord: string;
  gameDifference: number;
  matchPoints: number;
  form: string[];
  status: StandingStatus;
}

export interface Match {
  id: string;
  seasonId: string;
  regionSlug: string;
  week: number;
  teamA: string;
  teamB: string;
  scoreA: number | null;
  scoreB: number | null;
  status: MatchStatus;
  format: "BO3";
  date: string;
  time: string;
  verifiedDataStatus: VerifiedDataStatus;
  isSimulated?: boolean;
}

export interface StandingsSnapshot {
  week: number;
  standings: Standing[];
}

export interface StandingReference {
  rank: number;
  teamSlug: string;
  matchRecord: string;
  gameRecord: string;
  gameDifference: number;
}

export interface StandingValidationIssue {
  teamSlug: string;
  issue:
    | "missing-team"
    | "rank-mismatch"
    | "match-record-mismatch"
    | "game-record-mismatch"
    | "net-game-win-mismatch";
  calculated: string | number | null;
  reference: string | number | null;
}

export interface JourneySeason {
  season: string;
  champion: string;
  runnerUp: string;
  fmvp: string;
}
