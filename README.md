# Adaptive Powerbuilding Coach

Adaptive Powerbuilding Coach is a bilingual web-only PWA fitness app for adaptive nutrition, readiness-based powerbuilding, workout logging, progress tracking, and an opt-in Arena leaderboard.

This is a pet/portfolio project built as a production-style modular monolith.

## Screenshots

Screenshots are not committed yet.

- `docs/assets/dashboard-placeholder.png` - dashboard placeholder.
- `docs/assets/ppl-ul-placeholder.png` - PPL x UL program placeholder.
- `docs/assets/support-placeholder.png` - support page placeholder.

## Features

- English and Russian localization from the beginning.
- iPhone-friendly PWA install flow.
- Adaptive nutrition targets and carb cycling.
- Readiness check-ins before training.
- Readiness-based training adaptation.
- Workout diary with sets, reps, weight, RPE, notes, e1RM, and PR support.
- Default PPL x UL - Aesthetic Cut program.
- Body weight progress and training charts.
- Arena leaderboard architecture with opt-in public display names only.
- Support page with DonatePay, crypto wallets, Telegram, and mobile app funding.
- Demo mode with localStorage fallback when Supabase is not configured.

## Demo Mode

Demo mode seeds a 19-year-old male athlete:

- 176 cm, 67 kg.
- Goal: lean bulk.
- Bench 1RM 80 kg, squat 1RM 120 kg, deadlift 1RM 150 kg, overhead press 50 kg.
- Average steps 10000, sleep 7.5 hours.
- Selected program: PPL x UL - Aesthetic Cut.
- Sample PPL x UL workouts and body weight progress.

## Tech Stack

- Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui.
- next-intl for RU/EN localization.
- Supabase Auth and PostgreSQL.
- Drizzle ORM.
- Zod, React Hook Form, Recharts, Vitest.
- GitHub Actions and Vercel deployment.

## Architecture

```text
apps/web                 Next.js PWA
packages/core            Fitness algorithms and default training plans
packages/db              Drizzle schema, Supabase-compatible database model, seeds
packages/shared-types    Shared TypeScript contracts
docs                     Product, security, deployment, and roadmap docs
```

The project uses a modular monolith, not microservices.

## PWA Support

The app includes a manifest, iPhone icons, service worker, offline fallback, and install copy.

Install on iPhone:

```text
Open Safari -> Share -> Add to Home Screen
```

Apple Health is not available directly in the web PWA. Manual input is the MVP data source. Native iOS plus Apple Health integration is future roadmap.

## Deployment

Production target:

- Web app: Vercel.
- Database/auth: Supabase.
- Optional Cloudflare later for WAF, bot protection, DDoS protection, and edge rate limiting.

Vercel settings:

- Framework: Next.js.
- Root directory: `apps/web`.
- Install command: `pnpm install --frozen-lockfile`.
- Build command: `pnpm --filter @adaptive-powerbuilding-coach/web build`.
- Output: Vercel default Next.js output.

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

## Safety

The app provides fitness and nutrition planning support, not medical advice. Users should consult a qualified professional before changing training, diet, or supplementation, especially with injuries or health conditions.

## Roadmap

- Complete Supabase-backed persistence.
- Expand adaptive nutrition and training rules.
- Improve Arena privacy-preserving rankings.
- Add native iOS and Android apps later.
- Add Apple Health integration later.
- Keep some mobile features secret until the official mobile development announcement.

## License

MIT
