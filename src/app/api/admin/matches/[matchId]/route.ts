import { NextResponse } from "next/server";

import {
  createErrorResponse,
  createSuccessResponse
} from "@/services/apiResponse";
import { updateAdminMatch } from "@/services/admin/matches";
import type { MatchStatus, VerifiedDataStatus } from "@/types/regions";

interface RouteContext {
  params: {
    matchId: string;
  };
}

interface UpdateMatchRequestBody {
  scoreA: number | null;
  scoreB: number | null;
  status: MatchStatus;
  verifiedDataStatus: VerifiedDataStatus;
}

const validStatuses: MatchStatus[] = ["upcoming", "live", "finished"];
const validDataStatuses: VerifiedDataStatus[] = [
  "verified",
  "partial",
  "placeholder"
];

function isValidBody(body: UpdateMatchRequestBody) {
  return (
    (typeof body.scoreA === "number" || body.scoreA === null) &&
    (typeof body.scoreB === "number" || body.scoreB === null) &&
    validStatuses.includes(body.status) &&
    validDataStatuses.includes(body.verifiedDataStatus)
  );
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const body = (await request.json()) as UpdateMatchRequestBody;

    if (!isValidBody(body)) {
      return NextResponse.json(
        createErrorResponse("Invalid match update payload"),
        { status: 400 }
      );
    }

    const data = await updateAdminMatch(context.params.matchId, body);

    return NextResponse.json(
      createSuccessResponse(data, "Match result saved")
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update match.";
    const status = message.includes("Persistence is not configured") ? 503 : 500;

    return NextResponse.json(createErrorResponse(message), { status });
  }
}
