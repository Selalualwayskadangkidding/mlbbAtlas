import type {
  Standing,
  StandingReference,
  StandingValidationIssue
} from "@/types/regions";

export function validateStandingsAgainstReference(
  calculatedStandings: Standing[],
  referenceStandings: StandingReference[]
): StandingValidationIssue[] {
  return referenceStandings.flatMap((reference) => {
    const calculated = calculatedStandings.find(
      (standing) => standing.teamSlug === reference.teamSlug
    );

    if (!calculated) {
      return [
        {
          teamSlug: reference.teamSlug,
          issue: "missing-team",
          calculated: null,
          reference: reference.teamSlug
        }
      ];
    }

    const issues: StandingValidationIssue[] = [];

    if (calculated.rank !== reference.rank) {
      issues.push({
        teamSlug: reference.teamSlug,
        issue: "rank-mismatch",
        calculated: calculated.rank,
        reference: reference.rank
      });
    }

    if (calculated.matchRecord !== reference.matchRecord) {
      issues.push({
        teamSlug: reference.teamSlug,
        issue: "match-record-mismatch",
        calculated: calculated.matchRecord,
        reference: reference.matchRecord
      });
    }

    if (calculated.gameRecord !== reference.gameRecord) {
      issues.push({
        teamSlug: reference.teamSlug,
        issue: "game-record-mismatch",
        calculated: calculated.gameRecord,
        reference: reference.gameRecord
      });
    }

    if (calculated.gameDifference !== reference.gameDifference) {
      issues.push({
        teamSlug: reference.teamSlug,
        issue: "net-game-win-mismatch",
        calculated: calculated.gameDifference,
        reference: reference.gameDifference
      });
    }

    return issues;
  });
}
