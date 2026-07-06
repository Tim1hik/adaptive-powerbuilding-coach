# PWA

The MVP is installable from Safari on iPhone.

English install path:

Open Safari -> Share -> Add to Home Screen.

Russian install path:

Открой Safari -> Поделиться -> На экран «Домой».

The web app includes:

- `manifest.webmanifest`
- standalone display mode
- 192x192 and 512x512 icons
- maskable icon
- apple-touch-icon
- service worker for safe static assets
- simple offline fallback page

The service worker must not aggressively cache private user data. It caches only safe static assets and a simple offline page.

## Limitations

- Apple Health is not available directly in the web PWA.
- Manual input is the MVP data source.
- Native iOS plus Apple Health integration is future roadmap.
