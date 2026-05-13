import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/services/apiResponse";
import { getMplIdApiMeta, getMplIdTeams } from "@/services/regions/mpl-id";

export async function GET() {
  const [data, meta] = await Promise.all([getMplIdTeams(), getMplIdApiMeta()]);

  return NextResponse.json(
    createSuccessResponse(data, "MPL ID teams loaded", meta)
  );
}
