export type Locale = "en" | "ru";

export type TrainingDomain =
  | "nutrition"
  | "training"
  | "progress"
  | "readiness"
  | "arena";

export type TrainingDayType = "push" | "pull" | "legs" | "rest" | "upper" | "lower";

export interface TrainingPlanDay {
  day: number;
  type: TrainingDayType;
  titleKey: string;
}

export interface TrainingPlan {
  id: string;
  titleKey: string;
  descriptionKey: string;
  days: TrainingPlanDay[];
}
