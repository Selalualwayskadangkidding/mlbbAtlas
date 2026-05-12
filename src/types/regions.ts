export type StandingStatus =
  | "upper-bracket"
  | "playoff-secured"
  | "competing"
  | "eliminated";

export type MatchStatus = "finished" | "live" | "upcoming";

export type StandingViewMode = "current" | "after-selected-week";

export interface Region {
  name: string;
  shortName: string;
  slug: string;
  season: string;
  currentWeek: string;
  stage: string;
  subtitle: string;
  logoSrc: string;
}

export interface Team {
  name: string;
  slug: string;
  logoSrc: string;
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
