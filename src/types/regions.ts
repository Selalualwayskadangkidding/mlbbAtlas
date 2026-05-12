export type StandingStatus =
  | "upper-bracket"
  | "playoff-secured"
  | "competing"
  | "eliminated";

export type MatchStatus = "finished" | "live" | "upcoming";

export type StandingViewMode = "current" | "after-selected-week";

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
  weeks: Week[];
}

export interface Team {
  id: string;
  regionSlug: string;
  name: string;
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
  week: number;
  teamASlug: string;
  teamBSlug: string;
  teamAScore: number | null;
  teamBScore: number | null;
  status: MatchStatus;
  format: "BO3";
  date: string;
  time: string;
}

export interface StandingsSnapshot {
  week: number;
  standings: Standing[];
}
