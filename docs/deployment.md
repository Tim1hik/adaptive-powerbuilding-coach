# Deployment

Production target:

- Web app: Vercel.
- Database/auth: Supabase.
- Optional edge protection later: Cloudflare.

Vercel MCP is for deployment inspection and troubleshooting only. It is not a runtime dependency.

## Vercel Project Settings

- Framework: Next.js.
- Root directory: `apps/web`.
- Install command: `pnpm install --frozen-lockfile`.
- Build command: `pnpm --filter @adaptive-powerbuilding-coach/web build`.
- Output settings: use Vercel default Next.js output.

The app imports workspace packages from `packages/core`, `packages/db`, and `packages/shared-types`; keep the root `pnpm-lock.yaml` committed.

## Health

Health endpoint:

```text
/api/health
```

The endpoint returns public deployment status only and does not expose secrets.

## CI

GitHub Actions runs:

- install dependencies
- lint
- typecheck
- tests
- build web app

## Required Environment Variables

```bash
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_DONATEPAY_URL=
NEXT_PUBLIC_CRYPTO_BTC_ADDRESS=
NEXT_PUBLIC_CRYPTO_ETH_ADDRESS=
NEXT_PUBLIC_CRYPTO_USDT_TRC20_ADDRESS=
NEXT_PUBLIC_TELEGRAM_USERNAME=
```

Do not expose `DATABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` to the browser.
