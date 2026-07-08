import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    DIRECT_URL: Boolean(process.env.DIRECT_URL)
  };

  return NextResponse.json({
    ok: true,
    service: "adaptive-powerbuilding-coach-web",
    version: "0.1.0",
    supabaseConfigured: env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    databaseConfigured: env.DATABASE_URL,
    diagnostics: {
      env
    },
    timestamp: new Date().toISOString()
  }, {
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
