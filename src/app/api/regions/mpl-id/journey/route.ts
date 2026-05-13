import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/services/apiResponse";
import { getMplIdApiMeta, getMplIdJourney } from "@/services/regions/mpl-id";

export async function GET() {
  const [data, meta] = await Promise.all([getMplIdJourney(), getMplIdApiMeta()]);

  return NextResponse.json(
    createSuccessResponse(data, "MPL ID journey loaded", meta)
  );
}
