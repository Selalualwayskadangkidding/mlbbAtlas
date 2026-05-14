import type { Match, Standing, StandingStatus } from "@/types/regions";

const PLAYOFF_CUTOFF_RANK = 6;
const UPPER_BRACKET_CUTOFF_RANK = 2;

export function getRemainingMatchesForTeam(
  matches: Match[],
  teamSlug: string
): Match[] {
  return matches.filter(
    (match) =>
      match.status !== "finished" &&
      (match.teamA === teamSlug || match.teamB === teamSlug)
  );
}

export function getMaxPossibleMatchPoints(
  standing: Standing,
  matches: Match[]
): number {
  return (
    standing.matchPoints +
    getRemainingMatchesForTeam(matches, standing.teamSlug).length
  );
}

export function canStillReachPlayoffs(
  standing: Standing,
  standings: Standing[],
  matches: Match[]
): boolean {
  const playoffCutoff = standings[PLAYOFF_CUTOFF_RANK - 1]?.matchPoints ?? 0;

  return getMaxPossibleMatchPoints(standing, matches) >= playoffCutoff;
}

export function isMathematicallyEliminated(
  standing: Standing,
  standings: Standing[],
  matches: Match[]
): boolean {
  return !canStillReachPlayoffs(standing, standings, matches);
}

function countOtherTeamsThatCanReachPoints(
  standing: Standing,
  standings: Standing[],
  matches: Match[],
  points: number
): number {
  return standings.filter((otherStanding) => {
    if (otherStanding.teamSlug === standing.teamSlug) {
      return false;
    }

    return getMaxPossibleMatchPoints(otherStanding, matches) >= points;
  }).length;
}

export function canSecurePlayoffs(
  standing: Standing,
  standings: Standing[],
  matches: Match[]
): boolean {
  return (
    countOtherTeamsThatCanReachPoints(
      standing,
      standings,
      matches,
      standing.matchPoints
    ) < PLAYOFF_CUTOFF_RANK
  );
}

export function canSecureUpperBracket(
  standing: Standing,
  standings: Standing[],
  matches: Match[]
): boolean {
  return (
    countOtherTeamsThatCanReachPoints(
      standing,
      standings,
      matches,
      standing.matchPoints
    ) < UPPER_BRACKET_CUTOFF_RANK
  );
}

export function getPlayoffStatus(
  standing: Standing,
  standings: Standing[],
  matches: Match[]
): StandingStatus {
  // TODO: Replace this conservative max-points check with full scenario
  // simulation. Future logic should enumerate remaining match outcomes and
  // support mathematical elimination, clinched playoff, clinched upper bracket,
  // tie breakers, net game differential, and playoff probability percentage.
  if (isMathematicallyEliminated(standing, standings, matches)) {
    return "eliminated";
  }

  if (canSecureUpperBracket(standing, standings, matches)) {
    return "upper-bracket-secured";
  }

  if (canSecurePlayoffs(standing, standings, matches)) {
    return "playoff-secured";
  }

  return "outside-playoff-zone";
}

export function getStandingStatusColor(status: StandingStatus): string {
  const statusColors: Record<StandingStatus, string> = {
    "upper-bracket-secured": "border-blue-300 bg-blue-50 text-blue-700",
    "playoff-secured": "border-emerald-300 bg-emerald-50 text-emerald-700",
    "outside-playoff-zone": "border-slate-300 bg-slate-100 text-slate-700",
    eliminated: "border-red-300 bg-red-50 text-red-700"
  };

  return statusColors[status];
}

export function applyPlayoffStatuses(
  standings: Standing[],
  matches: Match[]
): Standing[] {
  return standings.map((standing) => ({
    ...standing,
    status: getPlayoffStatus(standing, standings, matches)
  }));
}
