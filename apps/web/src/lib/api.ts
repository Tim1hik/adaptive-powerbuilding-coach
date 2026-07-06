import { NextResponse, type NextRequest } from "next/server";
import { z, type ZodSchema } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

export function getRequestIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function parseJsonBody<T>(request: NextRequest, schema: ZodSchema<T>) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  return parsed.success ? { data: parsed.data, error: null } : { data: null, error: parsed.error };
}

export function rateLimitResponse(request: NextRequest, scope: string, limit: number, windowMs: number) {
  const result = checkRateLimit(`${scope}:${getRequestIp(request)}`, limit, windowMs);
  if (result.allowed) return null;
  return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(Math.ceil((result.resetAt - Date.now()) / 1000)) } });
}

export function safeApiError() {
  return NextResponse.json({ error: "request_failed" }, { status: 500 });
}

export const checkInPayloadSchema = z.object({
  sleepQuality: z.number().min(1).max(5),
  sleepDurationHours: z.number().min(0).max(14),
  energy: z.number().min(1).max(5),
  stress: z.number().min(1).max(5),
  motivation: z.number().min(1).max(5),
  soreness: z.number().min(1).max(5),
  painArea: z.enum(["none", "shoulder", "low_back", "knee", "elbow", "hip", "other"]),
  painSeverity: z.enum(["none", "mild", "moderate", "strong"]),
  desireToTrainHeavy: z.boolean()
});
