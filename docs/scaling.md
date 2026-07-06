# Scaling

The app is designed with production-oriented abuse protection and scalable deployment practices.

## Current Deployment Assumption

- Vercel handles infrastructure-level scaling for the Next.js app.
- Supabase handles managed PostgreSQL and Auth scaling within plan limits.
- Static assets and safe public pages can be cached.
- Private user data must not be publicly cached.

## Later Infrastructure

Cloudflare should be added later with a custom domain for:

- DDoS protection.
- WAF.
- Bot protection.
- Edge rate limiting.

The app should not claim to be impossible to DDoS.
