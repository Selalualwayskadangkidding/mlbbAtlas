import type { Standing, StandingStatus } from "@/types/regions";

interface SnapshotSeed {
  rank: number;
  teamSlug: string;
  matchWins: number;
  matchLosses: number;
  gameWins: number;
  gameLosses: number;
}

function getSnapshotStatus(rank: number): StandingStatus {
  if (rank <= 2) {
    return "upper-bracket";
  }

  if (rank <= 6) {
    return "playoff-secured";
  }

  return "eliminated";
}

function formatRecord(wins: number, losses: number) {
  return `${wins} - ${losses}`;
}

function createSnapshotStanding(seed: SnapshotSeed): Standing {
  return {
    rank: seed.rank,
    teamSlug: seed.teamSlug,
    matchRecord: formatRecord(seed.matchWins, seed.matchLosses),
    gameRecord: formatRecord(seed.gameWins, seed.gameLosses),
    gameDifference: seed.gameWins - seed.gameLosses,
    matchPoints: seed.matchWins,
    form: [],
    status: getSnapshotStatus(seed.rank)
  };
}

function createSnapshot(week: number, seeds: SnapshotSeed[]) {
  return {
    week,
    standings: seeds.map(createSnapshotStanding)
  };
}

// Verified weekly standings snapshots from MPL ID Season 17 public table captures.
// These snapshots are for display/validation only while full match-level history is incomplete.
// Simulator standings must remain derived from match results and simulated match results.
export const mplIdSeason17VerifiedStandingsSnapshots = [
  createSnapshot(1, [
    { rank: 1, teamSlug: "onic", matchWins: 2, matchLosses: 0, gameWins: 4, gameLosses: 0 },
    { rank: 2, teamSlug: "team-liquid-id", matchWins: 2, matchLosses: 0, gameWins: 4, gameLosses: 1 },
    { rank: 3, teamSlug: "dewa-united", matchWins: 1, matchLosses: 0, gameWins: 2, gameLosses: 0 },
    { rank: 4, teamSlug: "navi", matchWins: 1, matchLosses: 1, gameWins: 3, gameLosses: 2 },
    { rank: 5, teamSlug: "evos", matchWins: 1, matchLosses: 1, gameWins: 2, gameLosses: 2 },
    { rank: 6, teamSlug: "bigetron-vitality", matchWins: 1, matchLosses: 1, gameWins: 2, gameLosses: 3 },
    { rank: 7, teamSlug: "geek-fam", matchWins: 0, matchLosses: 1, gameWins: 0, gameLosses: 2 },
    { rank: 8, teamSlug: "alter-ego", matchWins: 0, matchLosses: 2, gameWins: 1, gameLosses: 4 },
    { rank: 9, teamSlug: "rrq-hoshi", matchWins: 0, matchLosses: 2, gameWins: 0, gameLosses: 4 }
  ]),
  createSnapshot(2, [
    { rank: 1, teamSlug: "team-liquid-id", matchWins: 4, matchLosses: 0, gameWins: 8, gameLosses: 2 },
    { rank: 2, teamSlug: "onic", matchWins: 3, matchLosses: 0, gameWins: 6, gameLosses: 0 },
    { rank: 3, teamSlug: "dewa-united", matchWins: 2, matchLosses: 1, gameWins: 5, gameLosses: 2 },
    { rank: 4, teamSlug: "alter-ego", matchWins: 2, matchLosses: 2, gameWins: 5, gameLosses: 6 },
    { rank: 5, teamSlug: "bigetron-vitality", matchWins: 2, matchLosses: 2, gameWins: 4, gameLosses: 6 },
    { rank: 6, teamSlug: "evos", matchWins: 1, matchLosses: 3, gameWins: 4, gameLosses: 6 },
    { rank: 7, teamSlug: "navi", matchWins: 1, matchLosses: 3, gameWins: 4, gameLosses: 6 },
    { rank: 8, teamSlug: "geek-fam", matchWins: 1, matchLosses: 2, gameWins: 2, gameLosses: 4 },
    { rank: 9, teamSlug: "rrq-hoshi", matchWins: 0, matchLosses: 3, gameWins: 0, gameLosses: 6 }
  ]),
  createSnapshot(3, [
    { rank: 1, teamSlug: "onic", matchWins: 4, matchLosses: 1, gameWins: 9, gameLosses: 3 },
    { rank: 2, teamSlug: "team-liquid-id", matchWins: 4, matchLosses: 1, gameWins: 8, gameLosses: 4 },
    { rank: 3, teamSlug: "dewa-united", matchWins: 3, matchLosses: 2, gameWins: 8, gameLosses: 4 },
    { rank: 4, teamSlug: "geek-fam", matchWins: 3, matchLosses: 2, gameWins: 6, gameLosses: 5 },
    { rank: 5, teamSlug: "bigetron-vitality", matchWins: 3, matchLosses: 3, gameWins: 7, gameLosses: 9 },
    { rank: 6, teamSlug: "alter-ego", matchWins: 3, matchLosses: 3, gameWins: 7, gameLosses: 9 },
    { rank: 7, teamSlug: "evos", matchWins: 2, matchLosses: 3, gameWins: 6, gameLosses: 6 },
    { rank: 8, teamSlug: "navi", matchWins: 2, matchLosses: 4, gameWins: 6, gameLosses: 9 },
    { rank: 9, teamSlug: "rrq-hoshi", matchWins: 0, matchLosses: 5, gameWins: 2, gameLosses: 10 }
  ]),
  createSnapshot(4, [
    { rank: 1, teamSlug: "onic", matchWins: 6, matchLosses: 1, gameWins: 13, gameLosses: 3 },
    { rank: 2, teamSlug: "bigetron-vitality", matchWins: 5, matchLosses: 3, gameWins: 11, gameLosses: 11 },
    { rank: 3, teamSlug: "evos", matchWins: 4, matchLosses: 3, gameWins: 10, gameLosses: 6 },
    { rank: 4, teamSlug: "dewa-united", matchWins: 4, matchLosses: 3, gameWins: 10, gameLosses: 6 },
    { rank: 5, teamSlug: "team-liquid-id", matchWins: 4, matchLosses: 3, gameWins: 9, gameLosses: 8 },
    { rank: 6, teamSlug: "alter-ego", matchWins: 4, matchLosses: 3, gameWins: 9, gameLosses: 10 },
    { rank: 7, teamSlug: "geek-fam", matchWins: 3, matchLosses: 4, gameWins: 7, gameLosses: 9 },
    { rank: 8, teamSlug: "navi", matchWins: 2, matchLosses: 5, gameWins: 6, gameLosses: 11 },
    { rank: 9, teamSlug: "rrq-hoshi", matchWins: 0, matchLosses: 7, gameWins: 3, gameLosses: 14 }
  ]),
  createSnapshot(5, [
    { rank: 1, teamSlug: "onic", matchWins: 7, matchLosses: 2, gameWins: 16, gameLosses: 5 },
    { rank: 2, teamSlug: "dewa-united", matchWins: 6, matchLosses: 3, gameWins: 14, gameLosses: 6 },
    { rank: 3, teamSlug: "bigetron-vitality", matchWins: 6, matchLosses: 3, gameWins: 13, gameLosses: 11 },
    { rank: 4, teamSlug: "team-liquid-id", matchWins: 5, matchLosses: 4, gameWins: 11, gameLosses: 11 },
    { rank: 5, teamSlug: "alter-ego", matchWins: 5, matchLosses: 4, gameWins: 12, gameLosses: 13 },
    { rank: 6, teamSlug: "evos", matchWins: 4, matchLosses: 5, gameWins: 10, gameLosses: 10 },
    { rank: 7, teamSlug: "geek-fam", matchWins: 4, matchLosses: 5, gameWins: 9, gameLosses: 12 },
    { rank: 8, teamSlug: "navi", matchWins: 3, matchLosses: 6, gameWins: 9, gameLosses: 13 },
    { rank: 9, teamSlug: "rrq-hoshi", matchWins: 0, matchLosses: 8, gameWins: 3, gameLosses: 16 }
  ]),
  createSnapshot(6, [
    { rank: 1, teamSlug: "onic", matchWins: 9, matchLosses: 2, gameWins: 20, gameLosses: 5 },
    { rank: 2, teamSlug: "dewa-united", matchWins: 7, matchLosses: 3, gameWins: 16, gameLosses: 7 },
    { rank: 3, teamSlug: "bigetron-vitality", matchWins: 6, matchLosses: 4, gameWins: 13, gameLosses: 13 },
    { rank: 4, teamSlug: "team-liquid-id", matchWins: 6, matchLosses: 5, gameWins: 13, gameLosses: 14 },
    { rank: 5, teamSlug: "alter-ego", matchWins: 6, matchLosses: 5, gameWins: 15, gameLosses: 16 },
    { rank: 6, teamSlug: "evos", matchWins: 5, matchLosses: 6, gameWins: 12, gameLosses: 13 },
    { rank: 7, teamSlug: "geek-fam", matchWins: 5, matchLosses: 6, gameWins: 12, gameLosses: 14 },
    { rank: 8, teamSlug: "navi", matchWins: 3, matchLosses: 8, gameWins: 11, gameLosses: 17 },
    { rank: 9, teamSlug: "rrq-hoshi", matchWins: 1, matchLosses: 9, gameWins: 5, gameLosses: 18 }
  ]),
  createSnapshot(7, [
    { rank: 1, teamSlug: "onic", matchWins: 10, matchLosses: 2, gameWins: 22, gameLosses: 5 },
    { rank: 2, teamSlug: "dewa-united", matchWins: 8, matchLosses: 4, gameWins: 19, gameLosses: 10 },
    { rank: 3, teamSlug: "evos", matchWins: 7, matchLosses: 6, gameWins: 16, gameLosses: 13 },
    { rank: 4, teamSlug: "alter-ego", matchWins: 7, matchLosses: 5, gameWins: 17, gameLosses: 17 },
    { rank: 5, teamSlug: "team-liquid-id", matchWins: 7, matchLosses: 6, gameWins: 15, gameLosses: 16 },
    { rank: 6, teamSlug: "geek-fam", matchWins: 6, matchLosses: 7, gameWins: 15, gameLosses: 16 },
    { rank: 7, teamSlug: "bigetron-vitality", matchWins: 6, matchLosses: 6, gameWins: 14, gameLosses: 17 },
    { rank: 8, teamSlug: "navi", matchWins: 4, matchLosses: 9, gameWins: 13, gameLosses: 20 },
    { rank: 9, teamSlug: "rrq-hoshi", matchWins: 1, matchLosses: 11, gameWins: 5, gameLosses: 22 }
  ])
];

