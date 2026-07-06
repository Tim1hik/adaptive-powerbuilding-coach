export type Sex = "male" | "female";
export type NutritionGoal = "cut" | "aggressive_cut" | "maintenance" | "lean_bulk" | "bulk";
export type TrainingDayType = "push" | "pull" | "legs" | "rest" | "upper" | "lower";
export type CarbCyclingStrategy = "heavy_training_day" | "normal_training_day" | "rest_day" | "refeed_day";
export type PainArea = "none" | "shoulder" | "low_back" | "knee" | "elbow" | "hip" | "other";
export type PainSeverity = "none" | "mild" | "moderate" | "strong";
export type AdaptationDecision = "keep_plan" | "keep_plan_no_pr" | "reduce_load_or_sets" | "light_technique" | "block_heavy_sets";
export type ProgressTrend = "losing" | "stable" | "gaining";
export type LeaderboardCategory = "power" | "consistency" | "progress";
export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "triceps"
  | "biceps"
  | "rear_delt"
  | "quads"
  | "hamstrings"
  | "calves"
  | "abs"
  | "adductors";
export type ExerciseCategory = "compound" | "isolation" | "bodyweight" | "rest";

export interface UserProfile {
  id: string;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
}

export interface ActivityData {
  activityMultiplier: number;
  averageSteps?: number;
  trainingDaysPerWeek?: number;
}

export interface MacroTargets {
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  category: ExerciseCategory;
}

export interface TrainingSet {
  reps: number;
  weightKg: number;
  rpe?: number;
}

export interface TrainingSession {
  date: string;
  dayType: TrainingDayType;
  exercises: Array<{
    exercise: Exercise;
    sets: TrainingSet[];
    notes?: string;
  }>;
}

export interface ReadinessCheckIn {
  sleepQuality: number;
  sleepDurationHours: number;
  energy: number;
  stress: number;
  motivation: number;
  soreness: number;
  painArea: PainArea;
  painSeverity: PainSeverity;
  desireToTrainHeavy: boolean;
}

export interface WeightEntry {
  date: string;
  weightKg: number;
}

export interface SleepEntry {
  date: string;
  durationHours: number;
  quality: number;
}

export interface WorkoutDiaryEntry {
  sessionDate: string;
  trainingDayType: TrainingDayType;
  selectedExercise: Exercise;
  sets: TrainingSet[];
  notes?: string;
  estimatedOneRepMaxKg?: number;
  isPersonalRecord?: boolean;
}

export interface PersonalRecord {
  exerciseId: string;
  oneRepMaxKg: number;
  date: string;
}

export interface LeaderboardEntry {
  userId: string;
  category: LeaderboardCategory;
  score: number;
  bodyweightKg?: number;
  benchKg?: number;
  squatKg?: number;
  deadliftKg?: number;
  pullUpKg?: number;
}

export interface TrainingProgramExercise {
  id: string;
  muscleGroup: MuscleGroup;
  exerciseName: string;
  category: ExerciseCategory;
  sets: number;
  minReps: number;
  maxReps: number;
  targetRpeMin: number;
  targetRpeMax: number;
  restSecondsMin: number;
  restSecondsMax: number;
  techniqueNotes: string[];
}

export interface TrainingProgramDay {
  day: number;
  type: TrainingDayType;
  titleKey: string;
  exercises: TrainingProgramExercise[];
  notes?: string[];
}

export interface TrainingProgram {
  id: string;
  name: string;
  titleKey: string;
  descriptionKey: string;
  progressionRules: string[];
  days: TrainingProgramDay[];
}

export interface TrainingAdaptation {
  decision: AdaptationDecision;
  readinessScore: number;
  loadMultiplier: number;
  removeSets: number;
  allowHeavyTopSet: boolean;
  allowPrSuggestion: boolean;
  notes: string[];
}

const goalCalorieMultipliers: Record<NutritionGoal, number> = {
  aggressive_cut: 0.75,
  cut: 0.85,
  maintenance: 1,
  lean_bulk: 1.08,
  bulk: 1.15
};

const proteinByGoal: Record<NutritionGoal, number> = {
  aggressive_cut: 2.4,
  cut: 2.2,
  maintenance: 2,
  lean_bulk: 1.8,
  bulk: 1.8
};

const fatByGoal: Record<NutritionGoal, number> = {
  aggressive_cut: 0.6,
  cut: 0.7,
  maintenance: 0.8,
  lean_bulk: 0.9,
  bulk: 1
};

export function calculateBMR(profile: UserProfile): number {
  const base = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age;
  return Math.round(profile.sex === "male" ? base + 5 : base - 161);
}

export function calculateTDEE(profile: UserProfile, activity: ActivityData): number {
  return Math.round(calculateBMR(profile) * activity.activityMultiplier);
}

export function calculateNutritionTargets(profile: UserProfile, activity: ActivityData, goal: NutritionGoal): MacroTargets {
  const calories = Math.round(calculateTDEE(profile, activity) * goalCalorieMultipliers[goal]);
  const proteinGrams = Math.round(profile.weightKg * proteinByGoal[goal]);
  const fatGrams = Math.max(Math.round(profile.weightKg * fatByGoal[goal]), Math.round(profile.weightKg * 0.6));
  const carbGrams = Math.max(0, Math.round((calories - proteinGrams * 4 - fatGrams * 9) / 4));

  return { calories, proteinGrams, fatGrams, carbGrams };
}

export function calculateCarbCyclingTargets(base: MacroTargets, strategy: CarbCyclingStrategy): MacroTargets {
  const carbMultiplier: Record<CarbCyclingStrategy, number> = {
    heavy_training_day: 1.2,
    normal_training_day: 1,
    rest_day: 0.75,
    refeed_day: 1.45
  };
  const carbGrams = Math.round(base.carbGrams * carbMultiplier[strategy]);
  const calories = Math.round(base.proteinGrams * 4 + base.fatGrams * 9 + carbGrams * 4);
  return { ...base, calories, carbGrams };
}

export function adjustTargetsByWeeklyWeightTrend(targets: MacroTargets, goal: NutritionGoal, weeklyTrendKg: number): MacroTargets {
  let adjustment = 0;
  if ((goal === "cut" || goal === "aggressive_cut") && weeklyTrendKg >= -0.1) adjustment = -150;
  if ((goal === "lean_bulk" || goal === "bulk") && weeklyTrendKg < 0.1) adjustment = 150;
  if (goal === "maintenance" && Math.abs(weeklyTrendKg) > 0.25) adjustment = weeklyTrendKg > 0 ? -100 : 100;

  const calories = targets.calories + adjustment;
  const carbGrams = Math.max(0, Math.round((calories - targets.proteinGrams * 4 - targets.fatGrams * 9) / 4));
  return { ...targets, calories, carbGrams };
}

export function calculateReadinessScore(checkIn: ReadinessCheckIn): number {
  const sleepDurationScore = Math.min(5, Math.max(1, checkIn.sleepDurationHours / 1.6));
  const positive = checkIn.sleepQuality + sleepDurationScore + checkIn.energy + checkIn.motivation;
  const inverse = (6 - checkIn.stress) + (6 - checkIn.soreness);
  const painPenalty = checkIn.painSeverity === "strong" ? 25 : checkIn.painSeverity === "moderate" ? 12 : checkIn.painSeverity === "mild" ? 5 : 0;
  return Math.max(0, Math.min(100, Math.round(((positive + inverse) / 30) * 100 - painPenalty)));
}

export function adaptTrainingSession(checkIn: ReadinessCheckIn, dayType: TrainingDayType): TrainingAdaptation {
  const readinessScore = calculateReadinessScore(checkIn);
  const notes: string[] = [];
  let decision: AdaptationDecision = "keep_plan";
  let loadMultiplier = 1;
  let removeSets = 0;
  let allowHeavyTopSet = readinessScore >= 85 && checkIn.desireToTrainHeavy;
  let allowPrSuggestion = readinessScore >= 85;

  if (readinessScore < 50) {
    decision = "light_technique";
    loadMultiplier = 0.75;
    removeSets = 2;
    allowHeavyTopSet = false;
    allowPrSuggestion = false;
  } else if (readinessScore < 70) {
    decision = "reduce_load_or_sets";
    loadMultiplier = 0.9;
    removeSets = 1;
    allowHeavyTopSet = false;
    allowPrSuggestion = false;
  } else if (readinessScore < 85) {
    decision = "keep_plan_no_pr";
    allowHeavyTopSet = false;
    allowPrSuggestion = false;
  }

  if (checkIn.painSeverity === "strong") {
    decision = "block_heavy_sets";
    loadMultiplier = Math.min(loadMultiplier, 0.8);
    allowHeavyTopSet = false;
    allowPrSuggestion = false;
    notes.push("block_heavy_sets_for_pain");
  }
  if (checkIn.painArea === "shoulder" && (dayType === "push" || dayType === "upper")) notes.push("reduce_or_replace_heavy_pressing");
  if (checkIn.painArea === "low_back" && (dayType === "legs" || dayType === "lower")) notes.push("reduce_or_replace_squat_deadlift");
  if (checkIn.painArea === "knee" && (dayType === "legs" || dayType === "lower")) notes.push("reduce_squat_intensity_or_substitute");

  return { decision, readinessScore, loadMultiplier, removeSets, allowHeavyTopSet, allowPrSuggestion, notes };
}

export function estimateOneRepMax(weightKg: number, reps: number): number {
  if (reps <= 1) return weightKg;
  return Math.round(weightKg * (1 + reps / 30) * 10) / 10;
}

export function roundToPlateIncrement(weightKg: number, incrementKg = 2.5): number {
  return Math.round(weightKg / incrementKg) * incrementKg;
}

export function calculateTrainingWeights(oneRepMaxKg: number, percentages: number[], incrementKg = 2.5): number[] {
  return percentages.map((percentage) => roundToPlateIncrement(oneRepMaxKg * percentage, incrementKg));
}

export function calculateSevenDayAverageWeight(entries: WeightEntry[]): number | null {
  const lastSeven = [...entries].sort((a, b) => a.date.localeCompare(b.date)).slice(-7);
  if (lastSeven.length === 0) return null;
  return Math.round((lastSeven.reduce((sum, entry) => sum + entry.weightKg, 0) / lastSeven.length) * 100) / 100;
}

export function calculateWeeklyWeightTrend(entries: WeightEntry[]): number {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const previous = calculateSevenDayAverageWeight(sorted.slice(-14, -7));
  const current = calculateSevenDayAverageWeight(sorted.slice(-7));
  if (previous === null || current === null) return 0;
  return Math.round((current - previous) * 100) / 100;
}

export function calculatePowerScore(input: { bodyweightKg: number; benchKg?: number; squatKg?: number; deadliftKg?: number; pullUpKg?: number }): number {
  const total = (input.benchKg ?? 0) + (input.squatKg ?? 0) + (input.deadliftKg ?? 0) + (input.pullUpKg ?? 0);
  return Math.round((total / input.bodyweightKg) * 100);
}

export function calculateConsistencyScore(workoutDates: string[], periodDays = 30): number {
  const uniqueDays = new Set(workoutDates).size;
  return Math.min(100, Math.round((uniqueDays / periodDays) * 100));
}

export function calculateMonthlyProgressScore(input: { powerScoreChange: number; weightTrendAlignment: number; consistencyScore: number }): number {
  return Math.max(0, Math.min(100, Math.round(input.powerScoreChange * 3 + input.weightTrendAlignment * 30 + input.consistencyScore * 0.5)));
}

export function detectPotentialOverreaching(checkIns: ReadinessCheckIn[]): boolean {
  if (checkIns.length < 3) return false;
  const recent = checkIns.slice(-3);
  return recent.every((checkIn) => calculateReadinessScore(checkIn) < 55);
}

export function generateTrainingDayRecommendation(checkIn: ReadinessCheckIn, dayType: TrainingDayType): string {
  return adaptTrainingSession(checkIn, dayType).decision;
}

export function detectPersonalRecord(entry: WorkoutDiaryEntry, records: PersonalRecord[]): PersonalRecord | null {
  const bestSet = entry.sets.reduce<TrainingSet | null>((best, set) => (!best || estimateOneRepMax(set.weightKg, set.reps) > estimateOneRepMax(best.weightKg, best.reps) ? set : best), null);
  if (!bestSet) return null;
  const estimated = estimateOneRepMax(bestSet.weightKg, bestSet.reps);
  const previous = records.find((record) => record.exerciseId === entry.selectedExercise.id);
  return !previous || estimated > previous.oneRepMaxKg
    ? { exerciseId: entry.selectedExercise.id, oneRepMaxKg: estimated, date: entry.sessionDate }
    : null;
}

const notes = ["controlled_eccentric", "full_range_of_motion", "avoid_ego_lifting", "do_not_chase_load_through_pain"];

function exercise(
  id: string,
  muscleGroup: MuscleGroup,
  exerciseName: string,
  category: ExerciseCategory,
  sets: number,
  minReps: number,
  maxReps: number,
  targetRpeMin: number,
  targetRpeMax: number,
  restSecondsMin: number,
  restSecondsMax: number,
  techniqueNotes = notes
): TrainingProgramExercise {
  return { id, muscleGroup, exerciseName, category, sets, minReps, maxReps, targetRpeMin, targetRpeMax, restSecondsMin, restSecondsMax, techniqueNotes };
}

export function getDefaultPplUlProgram(): TrainingProgram {
  return {
    id: "ppl-ul-aesthetic-cut",
    name: "PPL × UL — Aesthetic Cut",
    titleKey: "trainingPlans.pplUl.title",
    descriptionKey: "trainingPlans.pplUl.description",
    progressionRules: [
      "double_progression",
      "increase_load_when_top_reps_all_sets_at_target_rpe",
      "big_lifts_add_2_5_to_5_kg",
      "isolation_add_smallest_increment",
      "cut_do_not_force_rpe_10_every_set",
      "compound_lifts_usually_rpe_8_to_9",
      "rpe_10_only_last_safe_isolation_set"
    ],
    days: [
      {
        day: 1,
        type: "push",
        titleKey: "trainingPlans.days.push",
        exercises: [
          exercise("smith-machine-press", "chest", "Smith Machine Press", "compound", 3, 6, 10, 8, 9, 120, 180, [...notes, "maintain_stable_scapula"]),
          exercise("pec-deck-butterfly", "chest", "Pec Deck / Butterfly", "isolation", 3, 10, 15, 9, 10, 60, 90),
          exercise("dumbbell-lateral-raise", "shoulders", "Dumbbell Lateral Raise", "isolation", 4, 12, 20, 9, 10, 60, 90),
          exercise("machine-shoulder-press", "shoulders", "Machine Shoulder Press", "compound", 3, 8, 12, 8, 9, 120, 120, [...notes, "maintain_stable_scapula"]),
          exercise("french-press", "triceps", "French Press", "isolation", 3, 8, 12, 8, 9, 90, 120),
          exercise("cable-pushdown", "triceps", "Cable Pushdown", "isolation", 3, 10, 15, 9, 10, 60, 90)
        ]
      },
      {
        day: 2,
        type: "pull",
        titleKey: "trainingPlans.days.pull",
        exercises: [
          exercise("pull-ups-lat-pulldown", "back", "Pull-ups / Lat Pulldown", "bodyweight", 3, 6, 10, 8, 9, 120, 180),
          exercise("chest-supported-row", "back", "Chest-Supported Row", "compound", 3, 8, 12, 8, 9, 120, 120),
          exercise("neutral-grip-pulldown", "back", "Neutral-Grip Pulldown", "compound", 3, 8, 12, 9, 9, 90, 120),
          exercise("incline-dumbbell-curl", "biceps", "Incline Dumbbell Curl", "isolation", 3, 8, 12, 8, 9, 90, 90),
          exercise("hammer-curl", "biceps", "Hammer Curl", "isolation", 3, 10, 15, 9, 10, 60, 90),
          exercise("reverse-pec-deck", "rear_delt", "Reverse Pec Deck", "isolation", 4, 12, 20, 9, 10, 60, 90)
        ]
      },
      {
        day: 3,
        type: "legs",
        titleKey: "trainingPlans.days.legs",
        exercises: [
          exercise("barbell-squat", "quads", "Barbell Squat", "compound", 3, 5, 8, 8, 9, 180, 240),
          exercise("leg-extension", "quads", "Leg Extension", "isolation", 3, 10, 15, 9, 10, 60, 90),
          exercise("romanian-deadlift", "hamstrings", "Romanian Deadlift", "compound", 3, 6, 10, 8, 9, 120, 180),
          exercise("lying-leg-curl", "hamstrings", "Lying Leg Curl", "isolation", 3, 10, 15, 9, 10, 60, 90),
          exercise("standing-calf-raise", "calves", "Standing Calf Raise", "isolation", 4, 8, 15, 9, 10, 60, 90),
          exercise("hanging-leg-raise", "abs", "Hanging Leg Raise", "bodyweight", 3, 10, 15, 8, 9, 60, 90),
          exercise("cable-crunch", "abs", "Cable Crunch", "isolation", 3, 10, 15, 9, 10, 60, 90)
        ]
      },
      { day: 4, type: "rest", titleKey: "trainingPlans.days.rest", exercises: [], notes: ["rest_walking_10_to_15k_steps_by_recovery", "do_not_turn_rest_day_into_hard_cardio"] },
      {
        day: 5,
        type: "upper",
        titleKey: "trainingPlans.days.upper",
        exercises: [
          exercise("lat-pulldown", "back", "Lat Pulldown", "compound", 3, 8, 12, 8, 9, 120, 120),
          exercise("upper-chest-supported-row", "back", "Chest-Supported Row", "compound", 3, 8, 12, 8, 9, 120, 120),
          exercise("incline-dumbbell-press", "chest", "Incline Dumbbell Press", "compound", 3, 8, 12, 8, 9, 120, 180),
          exercise("cable-lateral-raise", "shoulders", "Cable Lateral Raise", "isolation", 4, 12, 20, 9, 10, 60, 90),
          exercise("bayesian-curl", "biceps", "Bayesian Curl", "isolation", 3, 10, 15, 9, 10, 60, 90),
          exercise("overhead-cable-extension", "triceps", "Overhead Cable Extension", "isolation", 3, 10, 15, 9, 10, 60, 90)
        ]
      },
      {
        day: 6,
        type: "lower",
        titleKey: "trainingPlans.days.lower",
        exercises: [
          exercise("leg-press", "quads", "Leg Press", "compound", 3, 6, 10, 8, 9, 120, 180),
          exercise("bulgarian-split-squat", "quads", "Bulgarian Split Squat", "compound", 3, 8, 12, 8, 9, 120, 120),
          exercise("seated-leg-curl", "hamstrings", "Seated Leg Curl", "isolation", 4, 8, 15, 9, 10, 60, 90),
          exercise("machine-hip-adduction", "adductors", "Machine Hip Adduction", "isolation", 3, 10, 15, 9, 10, 60, 90),
          exercise("seated-calf-raise", "calves", "Seated Calf Raise", "isolation", 4, 10, 20, 9, 10, 60, 90),
          exercise("lower-cable-crunch", "abs", "Cable Crunch", "isolation", 4, 10, 15, 9, 10, 60, 90)
        ]
      },
      { day: 7, type: "rest", titleKey: "trainingPlans.days.rest", exercises: [], notes: ["rest_and_steps_by_recovery"] }
    ]
  };
}

export function adaptPplUlProgramByReadiness(checkIn: ReadinessCheckIn, day: TrainingProgramDay): TrainingProgramDay {
  const adaptation = adaptTrainingSession(checkIn, day.type);
  if (day.type === "rest") return day;
  const adaptedExercises = day.exercises.map((item) => ({
    ...item,
    sets: Math.max(1, item.sets - adaptation.removeSets),
    targetRpeMax: adaptation.allowPrSuggestion ? item.targetRpeMax : Math.min(item.targetRpeMax, 9)
  }));
  return { ...day, exercises: adaptedExercises, notes: [...(day.notes ?? []), adaptation.decision, ...adaptation.notes] };
}

export const defaultTrainingPlans = [getDefaultPplUlProgram()];
export const nutritionModule = { name: "nutrition" };
export const trainingModule = { name: "training", getDefaultPplUlProgram };
export const progressModule = { name: "progress" };
export const readinessModule = { name: "readiness", calculateReadinessScore };
export const arenaModule = { name: "arena" };
