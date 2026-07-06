import { NextResponse } from "next/server";
import { publicEnv } from "@/lib/env";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "adaptive-powerbuilding-coach-web",
    version: "0.1.0",
    supabaseConfigured: Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_URL && publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    timestamp: new Date().toISOString()
  });
}
