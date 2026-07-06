# Adaptive Powerbuilding Coach

Adaptive bilingual PWA fitness web app with dynamic nutrition targets, carbohydrate cycling, readiness-based powerbuilding training adaptation, workout diary, progress tracking, Arena leaderboard, and a mobile app funding page.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, next-intl.
- Supabase Auth, PostgreSQL, Drizzle ORM.
- Zod, React Hook Form, Recharts, Vitest.
- GitHub Actions and Vercel deployment.
- PWA manifest and service worker.
- Optional Docker only for local PostgreSQL development.

## Workspace

```text
apps/web
packages/core
packages/db
packages/shared-types
docs
```

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

## Deployment

Production target: Vercel for the web app and Supabase for database/auth.

Vercel settings:

- Framework: Next.js
- Root directory: `apps/web`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm --filter @adaptive-powerbuilding-coach/web build`
- Output settings: Vercel default Next.js output

Required environment variables are listed in `.env.example` and `docs/environment-variables.md`.

## Product Decisions

- Web-only MVP.
- Installable on iPhone as a PWA through Safari -> Share -> Add to Home Screen.
- Native iOS and Android apps are future roadmap items.
- Apple Health integration is future roadmap, not part of the MVP.
- Modular monolith architecture.
- English and Russian localization from the beginning.

## Default Training Program

The built-in default program is PPL x UL: Push / Pull / Legs / Rest / Upper / Lower / Rest.

## License

MIT
