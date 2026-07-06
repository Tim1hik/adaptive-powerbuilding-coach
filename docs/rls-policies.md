# RLS Policies

Row Level Security is required for private tables.

- Users can access only their own private rows.
- Public training program templates are readable by anyone.
- The leaderboard reads from `leaderboard_profiles` and `leaderboard_entries`, not from `user_profiles`.
- Leaderboard rows are visible only when the user opted in.
- Support funding data is public read.
- Service role access is server-only for administrative jobs.

Policy SQL is tracked in `packages/db/drizzle/0001_rls_policies.sql`.
