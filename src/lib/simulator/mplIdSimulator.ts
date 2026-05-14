import { calculateStandings } from "@/lib/ranking";
import type { Match, Standing, Team } from "@/types/regions";

export type SimulatedResultOption =
  | "team-a-2-0"
  | "team-a-2-1"
  | "team-b-2-1"
  | "team-b-2-0";

export type RankMovementDirection = "up" | "down" | "same";

export interface RankMovement {
  direction: RankMovementDirection;
  delta: number;
}

export interface SimulatedMatchResult {
  matchId: string;
  result: SimulatedResultOption;
}

const SIMULATED_SCORES: Record<
  SimulatedResultOption,
  Pick<Match, "scoreA" | "scoreB">
> = {
  "team-a-2-0": { scoreA: 2, scoreB: 0 },
  "team-a-2-1": { scoreA: 2, scoreB: 1 },
  "team-b-2-1": { scoreA: 1, scoreB: 2 },
  "team-b-2-0": { scoreA: 0, scoreB: 2 }
};

export function getUpcomingMatches(matches: Match[]): Match[] {
  return matches.filter((match) => match.status === "upcoming");
}

export function applySimulatedResult(
  matches: Match[],
  matchId: string,
  result: SimulatedResultOption
): Match[] {
  const score = SIMULATED_SCORES[result];

  return matches.map((match) => {
    if (match.id !== matchId) {
      return { ...match };
    }

    return {
      ...match,
      scoreA: score.scoreA,
      scoreB: score.scoreB,
      status: "finished",
      isSimulated: true
    };
  });
}

export function applySimulatedResults(
  matches: Match[],
  results: SimulatedMatchResult[]
): Match[] {
  const resultsByMatchId = new Map(
    results.map((result) => [result.matchId, result.result])
  );

  return matches.map((match) => {
    const result = resultsByMatchId.get(match.id);

    if (!result) {
      return { ...match };
    }

    const score = SIMULATED_SCORES[result];

    return {
      ...match,
      scoreA: score.scoreA,
      scoreB: score.scoreB,
      status: "finished",
      isSimulated: true
    };
  });
}

export function calculateSimulatedStandings(
  teams: Team[],
  matches: Match[],
  results: SimulatedMatchResult[]
): Standing[] {
  return calculateStandings(teams, applySimulatedResults(matches, results));
}

export function calculateRankMovement(
  originalStandings: Standing[],
  simulatedStandings: Standing[]
): Record<string, RankMovement> {
  const originalRanks = new Map(
    originalStandings.map((standing) => [standing.teamSlug, standing.rank])
  );

  return simulatedStandings.reduce<Record<string, RankMovement>>(
    (movements, standing) => {
      const originalRank = originalRanks.get(standing.teamSlug) ?? standing.rank;
      const delta = originalRank - standing.rank;

      return {
        ...movements,
        [standing.teamSlug]: {
          delta,
          direction: delta > 0 ? "up" : delta < 0 ? "down" : "same"
        }
      };
    },
    {}
  );
}
