# Contributing

## Development

- Use pnpm from the repository root.
- Keep the app web-only until native mobile work is explicitly planned.
- Keep user-facing text in locale files.
- Preserve English and Russian localization for every visible feature.
- Keep the modular monolith structure: `apps/web` plus domain packages.

## Quality

- Run `pnpm lint`, `pnpm typecheck`, and `pnpm test` before opening a pull request.
- Do not commit secrets or production environment files.
- Prefer small, focused changes with docs updated when decisions change.
