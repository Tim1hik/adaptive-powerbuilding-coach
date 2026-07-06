# Supabase

Supabase provides Auth and PostgreSQL.

- Primary auth method: email and password.
- Any valid email provider is allowed, including Gmail, Yandex, Mail.ru, Outlook, and Proton.
- Google OAuth is optional, not required.
- Telegram login is future roadmap.
- SMS is not the primary 2FA plan; email OTP, magic link, or authenticator app are preferred later.

The service role key is server-only and must never be exposed to the browser.
