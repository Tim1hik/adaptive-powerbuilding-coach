import { calculateReadinessScore } from "@adaptive-powerbuilding-coach/core";
import { NextResponse, type NextRequest } from "next/server";
import { checkInPayloadSchema, parseJsonBody, rateLimitResponse, safeApiError } from "@/lib/api";

export async function POST(request: NextRequest) {
  const limited = rateLimitResponse(request, "check-in", 20, 60_000);
  if (limited) return limited;

  try {
    const { data, error } = await parseJsonBody(request, checkInPayloadSchema);
    if (error || !data) return NextResponse.json({ error: "invalid_payload" }, { status: 400 });

    return NextResponse.json({ readinessScore: calculateReadinessScore(data) });
  } catch {
    return safeApiError();
  }
}
