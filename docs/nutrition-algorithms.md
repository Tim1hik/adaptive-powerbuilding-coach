# Nutrition Algorithms

Core nutrition logic lives in `packages/core`.

- BMR uses Mifflin-St Jeor.
- TDEE is BMR multiplied by the selected activity multiplier.
- Goal calories use fixed MVP multipliers for aggressive cut, cut, maintenance, lean bulk, and bulk.
- Protein targets stay in the requested ranges by goal.
- Fat never goes below 0.6 g/kg.
- Carbs receive remaining calories after protein and fats.

Carb cycling supports heavy training day, normal training day, rest day, and refeed day. Weekly weight trend can adjust calories when the current trend does not match the selected goal.
