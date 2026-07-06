# Training Programs

The built-in default training program is PPL x UL - Aesthetic Cut.

## Weekly Structure

1. Push
2. Pull
3. Legs
4. Rest
5. Upper
6. Lower
7. Rest

The program is implemented in `packages/core` as structured data and must be selectable/default in the app.

The database seed in `packages/db/src/seed-default-ppl-ul.ts` mirrors the same 7-day template without depending on a real user.

## Day Exercise Counts

- Push: 6 exercises.
- Pull: 6 exercises.
- Legs: 7 exercises.
- Rest: recovery walking only.
- Upper: 6 exercises.
- Lower: 6 exercises.
- Rest: recovery walking only.
