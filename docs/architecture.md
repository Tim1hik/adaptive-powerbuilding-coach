# Architecture

Adaptive Powerbuilding Coach is a web-only modular monolith. The deployable app lives in `apps/web`; domain logic is isolated in packages.

- `packages/core`: nutrition, training, progress, readiness, Arena, and default training plans.
- `packages/db`: Drizzle schema and lazy database client.
- `packages/shared-types`: shared TypeScript contracts.

Native iOS, Android, Apple Health integration, and microservices are future roadmap items, not MVP scope.
