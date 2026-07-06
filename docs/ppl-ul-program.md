# PPL x UL Program

Program name: PPL x UL - Aesthetic Cut.

Weekly structure:

1. Push
2. Pull
3. Legs
4. Rest
5. Upper
6. Lower
7. Rest

The program is implemented as structured data in `packages/core` through `getDefaultPplUlProgram`.

The Supabase seed is generated from the same core program and writes public template rows for `training_programs`, `training_program_days`, and `training_program_exercises`.

Progression uses double progression. When all working sets reach the top of the rep range at target RPE, increase load. Big lifts add 2.5-5 kg; isolation exercises use the smallest available increment. During a cut, RPE 10 should not be forced on every set. Heavy compound lifts usually stay at RPE 8-9, while RPE 10 is mostly reserved for the last set of safe isolation work.

## Day 1 - Push

| Muscle | Exercise | Sets x reps | RPE | Rest |
| --- | --- | --- | --- | --- |
| Chest | Smith Machine Press | 3 x 6-10 | 8-9 | 2-3 min |
| Chest | Pec Deck / Butterfly | 3 x 10-15 | 9-10 | 60-90 sec |
| Shoulders | Dumbbell Lateral Raise | 4 x 12-20 | 9-10 | 60-90 sec |
| Shoulders | Machine Shoulder Press | 3 x 8-12 | 8-9 | 2 min |
| Triceps | French Press | 3 x 8-12 | 8-9 | 90-120 sec |
| Triceps | Cable Pushdown | 3 x 10-15 | 9-10 | 60-90 sec |

## Day 2 - Pull

| Muscle | Exercise | Sets x reps | RPE | Rest |
| --- | --- | --- | --- | --- |
| Back | Pull-ups / Lat Pulldown | 3 x 6-10 | 8-9 | 2-3 min |
| Back | Chest-Supported Row | 3 x 8-12 | 8-9 | 2 min |
| Back | Neutral-Grip Pulldown | 3 x 8-12 | 9 | 90-120 sec |
| Biceps | Incline Dumbbell Curl | 3 x 8-12 | 8-9 | 90 sec |
| Biceps | Hammer Curl | 3 x 10-15 | 9-10 | 60-90 sec |
| Rear Delt | Reverse Pec Deck | 4 x 12-20 | 9-10 | 60-90 sec |

## Day 3 - Legs

| Muscle | Exercise | Sets x reps | RPE | Rest |
| --- | --- | --- | --- | --- |
| Quads | Barbell Squat | 3 x 5-8 | 8-9 | 3-4 min |
| Quads | Leg Extension | 3 x 10-15 | 9-10 | 60-90 sec |
| Hamstrings | Romanian Deadlift | 3 x 6-10 | 8-9 | 2-3 min |
| Hamstrings | Lying Leg Curl | 3 x 10-15 | 9-10 | 60-90 sec |
| Calves | Standing Calf Raise | 4 x 8-15 | 9-10 | 60-90 sec |
| Abs | Hanging Leg Raise | 3 x 10-15 | 8-9 | 60-90 sec |
| Abs | Cable Crunch | 3 x 10-15 | 9-10 | 60-90 sec |

## Day 4 - Rest

Rest, walking, 10-15k steps by recovery. Do not turn rest day into hard cardio.

## Day 5 - Upper

| Muscle | Exercise | Sets x reps | RPE | Rest |
| --- | --- | --- | --- | --- |
| Back | Lat Pulldown | 3 x 8-12 | 8-9 | 2 min |
| Back | Chest-Supported Row | 3 x 8-12 | 8-9 | 2 min |
| Chest | Incline Dumbbell Press | 3 x 8-12 | 8-9 | 2-3 min |
| Shoulders | Cable Lateral Raise | 4 x 12-20 | 9-10 | 60-90 sec |
| Biceps | Bayesian Curl | 3 x 10-15 | 9-10 | 60-90 sec |
| Triceps | Overhead Cable Extension | 3 x 10-15 | 9-10 | 60-90 sec |

## Day 6 - Lower

| Muscle | Exercise | Sets x reps | RPE | Rest |
| --- | --- | --- | --- | --- |
| Quads | Leg Press | 3 x 6-10 | 8-9 | 2-3 min |
| Quads | Bulgarian Split Squat | 3 x 8-12 | 8-9 | 2 min |
| Hamstrings | Seated Leg Curl | 4 x 8-15 | 9-10 | 60-90 sec |
| Adductors | Machine Hip Adduction | 3 x 10-15 | 9-10 | 60-90 sec |
| Calves | Seated Calf Raise | 4 x 10-20 | 9-10 | 60-90 sec |
| Abs | Cable Crunch | 4 x 10-15 | 9-10 | 60-90 sec |

## Day 7 - Rest

Rest and steps by recovery.
