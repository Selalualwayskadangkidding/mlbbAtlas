import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/services/apiResponse";
import { getMplIdApiMeta, getMplIdRegion } from "@/services/regions/mpl-id";

export async function GET() {
  const [data, meta] = await Promise.all([getMplIdRegion(), getMplIdApiMeta()]);

  return NextResponse.json(
    createSuccessResponse(data, "MPL ID region data loaded", meta)
  );
}
