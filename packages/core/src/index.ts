import { z } from "zod";
import type { TrainingPlan } from "@adaptive-powerbuilding-coach/shared-types";

export const readinessInputSchema = z.object({
  sleepQuality: z.number().min(1).max(5),
  soreness: z.number().min(1).max(5),
  stress: z.number().min(1).max(5),
  motivation: z.number().min(1).max(5)
});

export function calculateReadinessScore(input: z.infer<typeof readinessInputSchema>): number {
  const parsed = readinessInputSchema.parse(input);
  return Math.round(((parsed.sleepQuality + (6 - parsed.soreness) + (6 - parsed.stress) + parsed.motivation) / 20) * 100);
}

export const defaultTrainingPlans: TrainingPlan[] = [
  {
    id: "ppl-ul-default",
    titleKey: "trainingPlans.pplUl.title",
    descriptionKey: "trainingPlans.pplUl.description",
    days: [
      { day: 1, type: "push", titleKey: "trainingPlans.days.push" },
      { day: 2, type: "pull", titleKey: "trainingPlans.days.pull" },
      { day: 3, type: "legs", titleKey: "trainingPlans.days.legs" },
      { day: 4, type: "rest", titleKey: "trainingPlans.days.rest" },
      { day: 5, type: "upper", titleKey: "trainingPlans.days.upper" },
      { day: 6, type: "lower", titleKey: "trainingPlans.days.lower" },
      { day: 7, type: "rest", titleKey: "trainingPlans.days.rest" }
    ]
  }
];

export const nutritionModule = { name: "nutrition" };
export const trainingModule = { name: "training" };
export const progressModule = { name: "progress" };
export const readinessModule = { name: "readiness", calculateReadinessScore };
export const arenaModule = { name: "arena" };
