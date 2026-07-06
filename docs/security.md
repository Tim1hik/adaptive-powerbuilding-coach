# Security

- Do not commit secrets.
- Keep Supabase service role keys server-only.
- Use row-level security for user-owned data.
- Validate input with Zod before persistence.
- Keep authentication and database clients lazily initialized where build-time evaluation is possible.
- Email and password is the main MVP auth method; OAuth providers are optional.
- Do not expose email or private health data through leaderboard queries.
- Use separate public leaderboard tables with opt-in controls.
