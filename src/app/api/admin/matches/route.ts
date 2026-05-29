import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/services/apiResponse";
import { getAdminMatches } from "@/services/admin/matches";

export async function GET() {
  const data = await getAdminMatches();

  return NextResponse.json(
    createSuccessResponse(data, "Admin matches loaded")
  );
}
