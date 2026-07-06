# Security

- Do not commit secrets.
- Keep Supabase service role keys server-only.
- Use row-level security for user-owned data.
- Validate input with Zod before persistence.
- Keep authentication and database clients lazily initialized where build-time evaluation is possible.
