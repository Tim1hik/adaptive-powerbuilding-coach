# Technical Decisions

- Modular monolith: one deployable web app with shared domain packages.
- Next.js App Router for the PWA frontend.
- `next-intl` from the beginning for English and Russian.
- Supabase Auth and PostgreSQL for production persistence.
- Drizzle ORM for typed schema ownership.
- LocalStorage demo mode when Supabase is not configured.
- PPL x UL - Aesthetic Cut is a first-class built-in training plan.
- Vercel is the web deployment target.
- Cloudflare is a later option for WAF, bot protection, and edge rate limiting.
