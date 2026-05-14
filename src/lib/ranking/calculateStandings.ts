import type { Match, Standing, StandingStatus, Team } from "@/types/regions";

interface TeamStandingAccumulator {
  teamSlug: string;
  matchWins: number;
  matchLosses: number;
  gameWins: number;
  gameLosses: number;
  form: string[];
}

function createInitialAccumulator(teamSlug: string): TeamStandingAccumulator {
  return {
    teamSlug,
    matchWins: 0,
    matchLosses: 0,
    gameWins: 0,
    gameLosses: 0,
    form: []
  };
}

function getStandingStatus(rank: number, totalTeams: number): StandingStatus {
  // Ranking engine stays playoff-agnostic. Final qualification status is
  // applied by src/lib/playoffs using remaining matches and max-points checks.
  void rank;
  void totalTeams;
  return "outside-playoff-zone";
}

function formatRecord(wins: number, losses: number) {
  return `${wins} - ${losses}`;
}

export function calculateStandings(teams: Team[], matches: Match[]): Standing[] {
  const accumulators = new Map<string, TeamStandingAccumulator>();

  teams.forEach((team) => {
    accumulators.set(team.slug, createInitialAccumulator(team.slug));
  });

  matches
    .filter(
      (match) =>
        match.status === "finished" &&
        match.scoreA !== null &&
        match.scoreB !== null
    )
    .forEach((match) => {
      const teamA = accumulators.get(match.teamA);
      const teamB = accumulators.get(match.teamB);

      if (!teamA || !teamB || match.scoreA === null || match.scoreB === null) {
        return;
      }

      teamA.gameWins += match.scoreA;
      teamA.gameLosses += match.scoreB;
      teamB.gameWins += match.scoreB;
      teamB.gameLosses += match.scoreA;

      if (match.scoreA > match.scoreB) {
        teamA.matchWins += 1;
        teamB.matchLosses += 1;
        teamA.form.push("W");
        teamB.form.push("L");
      } else {
        teamB.matchWins += 1;
        teamA.matchLosses += 1;
        teamB.form.push("W");
        teamA.form.push("L");
      }
    });

  return Array.from(accumulators.values())
    .sort((a, b) => {
      const matchWinDiff = b.matchWins - a.matchWins;

      if (matchWinDiff !== 0) {
        return matchWinDiff;
      }

      const netGameDiff =
        b.gameWins - b.gameLosses - (a.gameWins - a.gameLosses);

      if (netGameDiff !== 0) {
        return netGameDiff;
      }

      return b.gameWins - a.gameWins;
    })
    .map((standing, index) => {
      const rank = index + 1;

      return {
        rank,
        teamSlug: standing.teamSlug,
        matchRecord: formatRecord(standing.matchWins, standing.matchLosses),
        gameRecord: formatRecord(standing.gameWins, standing.gameLosses),
        gameDifference: standing.gameWins - standing.gameLosses,
        matchPoints: standing.matchWins,
        form: standing.form.slice(-5),
        status: getStandingStatus(rank, teams.length)
      };
    });
}
