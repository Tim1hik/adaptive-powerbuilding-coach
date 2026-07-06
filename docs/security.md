# Security

The app is designed with production-oriented abuse protection and scalable deployment practices. It is not described as DDoS-proof.

## Implemented Now

- Security headers in `next.config.ts`.
- Basic path protection in `src/proxy.ts`.
- Strict public environment validation with Zod.
- Server-only env validation helper for service keys.
- API request validation with Zod.
- In-memory app-level rate limit foundation for MVP API routes.
- Safe API errors that avoid leaking internals.
- Audit log table model in `packages/db`.
- Supabase RLS policy SQL in `packages/db/drizzle/0001_rls_policies.sql`.

## Data Access

- Users can access only their own private data.
- Training program templates can be public read.
- Leaderboard must read only public opt-in rows from `leaderboard_profiles` and `leaderboard_entries`.
- Leaderboard must never expose email or private health data.
- Support funding data can be public.

## Secrets

- Do not commit secrets.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend code.
- Do not place secrets in `NEXT_PUBLIC_*` variables.

## Later With Cloudflare

Cloudflare can be added after a custom domain is configured for DDoS protection, WAF, bot protection, and edge rate limiting.
