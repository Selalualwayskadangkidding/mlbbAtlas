import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/services/apiResponse";
import { getMplIdApiMeta, getMplIdSchedule } from "@/services/regions/mpl-id";

export async function GET() {
  const [data, meta] = await Promise.all([getMplIdSchedule(), getMplIdApiMeta()]);

  return NextResponse.json(
    createSuccessResponse(data, "MPL ID schedule loaded", meta)
  );
}
