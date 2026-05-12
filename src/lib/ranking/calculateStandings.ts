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
  if (rank <= 2) {
    return "upper-bracket";
  }

  if (rank <= 4) {
    return "playoff-secured";
  }

  if (rank >= totalTeams - 1) {
    return "eliminated";
  }

  return "competing";
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
        match.teamAScore !== null &&
        match.teamBScore !== null
    )
    .forEach((match) => {
      const teamA = accumulators.get(match.teamASlug);
      const teamB = accumulators.get(match.teamBSlug);

      if (!teamA || !teamB || match.teamAScore === null || match.teamBScore === null) {
        return;
      }

      teamA.gameWins += match.teamAScore;
      teamA.gameLosses += match.teamBScore;
      teamB.gameWins += match.teamBScore;
      teamB.gameLosses += match.teamAScore;

      if (match.teamAScore > match.teamBScore) {
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
