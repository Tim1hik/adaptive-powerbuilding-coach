# Database

PostgreSQL is the system of record. Supabase provides Auth and hosted PostgreSQL. Drizzle ORM owns schema definitions and typed database access.

Optional Docker may be used only for local PostgreSQL development.

The schema lives in `packages/db/src/schema.ts`.

Private user data is separated from public leaderboard data. Public Arena pages must read from `leaderboard_profiles` and `leaderboard_entries`, never from `user_profiles`.

Training program templates support the default PPL x UL program with program goal, day number, day type, exercise order, muscle group, exercise name, sets, rep ranges, RPE targets, rest times, technique notes, progression notes, and rest-day flags.
