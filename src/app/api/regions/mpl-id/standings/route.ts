import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/services/apiResponse";
import { getMplIdApiMeta, getMplIdStandings } from "@/services/regions/mpl-id";

export async function GET() {
  const [data, meta] = await Promise.all([
    getMplIdStandings(),
    getMplIdApiMeta()
  ]);

  return NextResponse.json(
    createSuccessResponse(data, "MPL ID standings loaded", meta)
  );
}
