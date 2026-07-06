# Rate Limiting

The MVP includes an in-memory app-level rate limit helper for server routes. This is useful as a foundation but should be replaced or backed by Redis, Upstash, Vercel KV, or Cloudflare rate limiting for multi-region production.

## Protected Areas

- Auth-sensitive endpoints.
- Readiness check-in submissions.
- Workout logs.
- Leaderboard requests.
- Support/contact endpoints.

## Current Implementation

- `apps/web/src/lib/rate-limit.ts`
- `apps/web/src/lib/api.ts`
- `apps/web/src/app/api/check-in/route.ts`

## Later

Use Cloudflare for edge rate limiting, WAF rules, bot protection, and DDoS mitigation. Do not cache private user data publicly.
