import { MPL_ID_REGION_SLUG } from "@/data/mpl-id/region";
import type { Match } from "@/types/regions";

export const MPL_ID_SEASON_17_ID = "mpl-id-s17";

interface FinishedResultSeed {
  winner: string;
  loser: string;
  score: "2-0" | "2-1";
}

const finishedResultSeeds: FinishedResultSeed[] = [
  { winner: "geek-fam", loser: "bigetron-vitality", score: "2-0" },
  { winner: "bigetron-vitality", loser: "evos", score: "2-1" },
  { winner: "team-liquid-id", loser: "rrq-hoshi", score: "2-0" },
  { winner: "bigetron-vitality", loser: "geek-fam", score: "2-1" },
  { winner: "onic", loser: "team-liquid-id", score: "2-0" },
  { winner: "onic", loser: "rrq-hoshi", score: "2-0" },
  { winner: "dewa-united", loser: "alter-ego", score: "2-0" },
  { winner: "navi", loser: "alter-ego", score: "2-1" },
  { winner: "onic", loser: "evos", score: "2-0" },
  { winner: "dewa-united", loser: "onic", score: "2-1" },
  { winner: "navi", loser: "alter-ego", score: "2-1" },
  { winner: "bigetron-vitality", loser: "dewa-united", score: "2-1" },
  { winner: "dewa-united", loser: "geek-fam", score: "2-0" },
  { winner: "alter-ego", loser: "rrq-hoshi", score: "2-1" },
  { winner: "geek-fam", loser: "rrq-hoshi", score: "2-0" },
  { winner: "dewa-united", loser: "rrq-hoshi", score: "2-0" },
  { winner: "alter-ego", loser: "rrq-hoshi", score: "2-1" },
  { winner: "team-liquid-id", loser: "evos", score: "2-0" },
  { winner: "evos", loser: "team-liquid-id", score: "2-0" },
  { winner: "geek-fam", loser: "dewa-united", score: "2-0" },
  { winner: "dewa-united", loser: "team-liquid-id", score: "2-0" },
  { winner: "alter-ego", loser: "geek-fam", score: "2-1" },
  { winner: "dewa-united", loser: "navi", score: "2-1" },
  { winner: "evos", loser: "navi", score: "2-0" },
  { winner: "bigetron-vitality", loser: "team-liquid-id", score: "2-1" },
  { winner: "bigetron-vitality", loser: "rrq-hoshi", score: "2-0" },
  { winner: "geek-fam", loser: "navi", score: "2-1" },
  { winner: "evos", loser: "navi", score: "2-0" },
  { winner: "onic", loser: "bigetron-vitality", score: "2-0" },
  { winner: "team-liquid-id", loser: "evos", score: "2-0" },
  { winner: "navi", loser: "rrq-hoshi", score: "2-0" },
  { winner: "onic", loser: "team-liquid-id", score: "2-0" },
  { winner: "alter-ego", loser: "navi", score: "2-1" },
  { winner: "team-liquid-id", loser: "dewa-united", score: "2-1" },
  { winner: "alter-ego", loser: "navi", score: "2-1" },
  { winner: "alter-ego", loser: "evos", score: "2-1" },
  { winner: "onic", loser: "rrq-hoshi", score: "2-0" },
  { winner: "geek-fam", loser: "bigetron-vitality", score: "2-1" },
  { winner: "onic", loser: "bigetron-vitality", score: "2-0" },
  { winner: "team-liquid-id", loser: "geek-fam", score: "2-1" },
  { winner: "alter-ego", loser: "onic", score: "2-1" },
  { winner: "bigetron-vitality", loser: "navi", score: "2-1" },
  { winner: "evos", loser: "rrq-hoshi", score: "2-0" },
  { winner: "onic", loser: "team-liquid-id", score: "2-0" },
  { winner: "evos", loser: "bigetron-vitality", score: "2-0" },
  { winner: "team-liquid-id", loser: "alter-ego", score: "2-1" },
  { winner: "rrq-hoshi", loser: "alter-ego", score: "2-0" },
  { winner: "navi", loser: "evos", score: "2-0" },
  { winner: "team-liquid-id", loser: "dewa-united", score: "2-1" },
  { winner: "dewa-united", loser: "geek-fam", score: "2-0" },
  { winner: "evos", loser: "geek-fam", score: "2-0" },
  { winner: "onic", loser: "navi", score: "2-0" },
  { winner: "dewa-united", loser: "geek-fam", score: "2-0" },
  { winner: "geek-fam", loser: "navi", score: "2-0" },
  { winner: "evos", loser: "rrq-hoshi", score: "2-1" },
  { winner: "onic", loser: "bigetron-vitality", score: "2-1" }
];

const upcomingMatches: Match[] = [
  {
    id: "mpl-id-s17-w8-m1",
    seasonId: MPL_ID_SEASON_17_ID,
    regionSlug: MPL_ID_REGION_SLUG,
    week: 8,
    date: "Saturday, 17 May",
    time: "15:00",
    teamA: "onic",
    teamB: "dewa-united",
    scoreA: null,
    scoreB: null,
    status: "upcoming",
    format: "BO3",
    verifiedDataStatus: "placeholder"
  },
  {
    id: "mpl-id-s17-w8-m2",
    seasonId: MPL_ID_SEASON_17_ID,
    regionSlug: MPL_ID_REGION_SLUG,
    week: 8,
    date: "Saturday, 17 May",
    time: "18:15",
    teamA: "evos",
    teamB: "alter-ego",
    scoreA: null,
    scoreB: null,
    status: "upcoming",
    format: "BO3",
    verifiedDataStatus: "placeholder"
  },
  {
    id: "mpl-id-s17-w8-m3",
    seasonId: MPL_ID_SEASON_17_ID,
    regionSlug: MPL_ID_REGION_SLUG,
    week: 8,
    date: "Sunday, 18 May",
    time: "16:00",
    teamA: "team-liquid-id",
    teamB: "geek-fam",
    scoreA: null,
    scoreB: null,
    status: "upcoming",
    format: "BO3",
    verifiedDataStatus: "placeholder"
  }
];

function getSeedDate(index: number) {
  const week = Math.floor(index / 7) + 1;
  const day = index % 7;
  const dayName = day < 2 ? "Friday" : day < 5 ? "Saturday" : "Sunday";

  return {
    week,
    date: `${dayName}, Week ${week}`,
    time: ["15:00", "18:15", "20:30"][day % 3]
  };
}

function createFinishedMatch(seed: FinishedResultSeed, index: number): Match {
  const schedule = getSeedDate(index);
  const [scoreA, scoreB] = seed.score.split("-").map(Number);

  return {
    id: `mpl-id-s17-finished-${index + 1}`,
    seasonId: MPL_ID_SEASON_17_ID,
    regionSlug: MPL_ID_REGION_SLUG,
    week: schedule.week,
    date: schedule.date,
    time: schedule.time,
    teamA: seed.winner,
    teamB: seed.loser,
    scoreA,
    scoreB,
    status: "finished",
    format: "BO3",
    verifiedDataStatus: "partial"
  };
}

// TODO: Future admin panel should update matches, not standings directly.
// Standings remain derived from match results; manual standings override should be emergency-only.
export const mplIdSeason17Matches: Match[] = [
  ...finishedResultSeeds.map(createFinishedMatch),
  ...upcomingMatches
];
