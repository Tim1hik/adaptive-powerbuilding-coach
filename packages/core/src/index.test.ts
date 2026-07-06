import { describe, expect, it } from "vitest";
import {
  adaptPplUlProgramByReadiness,
  adaptTrainingSession,
  adjustTargetsByWeeklyWeightTrend,
  calculateBMR,
  calculateCarbCyclingTargets,
  calculateConsistencyScore,
  calculateMonthlyProgressScore,
  calculateNutritionTargets,
  calculatePowerScore,
  calculateReadinessScore,
  calculateSevenDayAverageWeight,
  calculateTDEE,
  calculateTrainingWeights,
  calculateWeeklyWeightTrend,
  detectPersonalRecord,
  getDefaultPplUlProgram,
  roundToPlateIncrement,
  type ReadinessCheckIn,
  type UserProfile,
  type WorkoutDiaryEntry
} from "./index";

const profile: UserProfile = {
  id: "user-1",
  sex: "male",
  age: 30,
  heightCm: 180,
  weightKg: 80
};

const ready: ReadinessCheckIn = {
  sleepQuality: 5,
  sleepDurationHours: 8,
  energy: 5,
  stress: 1,
  motivation: 5,
  soreness: 1,
  painArea: "none",
  painSeverity: "none",
  desireToTrainHeavy: true
};

describe("nutrition algorithms", () => {
  it("calculates Mifflin-St Jeor BMR", () => {
    expect(calculateBMR(profile)).toBe(1780);
  });

  it("calculates TDEE", () => {
    expect(calculateTDEE(profile, { activityMultiplier: 1.5 })).toBe(2670);
  });

  it("calculates macro targets", () => {
    expect(calculateNutritionTargets(profile, { activityMultiplier: 1.5 }, "cut")).toEqual({
      calories: 2270,
      proteinGrams: 176,
      fatGrams: 56,
      carbGrams: 266
    });
  });

  it("calculates carb cycling targets", () => {
    const base = { calories: 2000, proteinGrams: 160, fatGrams: 70, carbGrams: 183 };
    expect(calculateCarbCyclingTargets(base, "heavy_training_day").carbGrams).toBe(220);
    expect(calculateCarbCyclingTargets(base, "rest_day").carbGrams).toBe(137);
  });

  it("adjusts weekly trend targets", () => {
    const adjusted = adjustTargetsByWeeklyWeightTrend({ calories: 2200, proteinGrams: 170, fatGrams: 60, carbGrams: 245 }, "cut", 0);
    expect(adjusted.calories).toBe(2050);
  });
});

describe("readiness and training adaptation", () => {
  it("calculates readiness score", () => {
    expect(calculateReadinessScore(ready)).toBe(100);
  });

  it("adapts for pain", () => {
    const decision = adaptTrainingSession({ ...ready, painArea: "shoulder", painSeverity: "strong" }, "push");
    expect(decision.decision).toBe("block_heavy_sets");
    expect(decision.allowHeavyTopSet).toBe(false);
    expect(decision.notes).toContain("reduce_or_replace_heavy_pressing");
  });

  it("adapts PPL x UL by readiness", () => {
    const program = getDefaultPplUlProgram();
    const adapted = adaptPplUlProgramByReadiness({ ...ready, sleepQuality: 2, energy: 2, motivation: 2, soreness: 4 }, program.days[0]);
    expect(adapted.notes).toContain("reduce_load_or_sets");
    expect(adapted.exercises[0].sets).toBe(2);
  });
});

describe("training calculations", () => {
  it("rounds to 2.5 kg plate increment", () => {
    expect(roundToPlateIncrement(101.2, 2.5)).toBe(100);
  });

  it("calculates training weights from 1RM", () => {
    expect(calculateTrainingWeights(100, [0.7, 0.8, 0.925])).toEqual([70, 80, 92.5]);
  });

  it("detects personal records", () => {
    const entry: WorkoutDiaryEntry = {
      sessionDate: "2026-07-06",
      trainingDayType: "push",
      selectedExercise: { id: "bench", name: "Bench Press", muscleGroup: "chest", category: "compound" },
      sets: [{ reps: 5, weightKg: 100 }]
    };
    expect(detectPersonalRecord(entry, [{ exerciseId: "bench", oneRepMaxKg: 110, date: "2026-06-01" }])).toMatchObject({
      exerciseId: "bench"
    });
  });
});

describe("progress and Arena", () => {
  const weights = Array.from({ length: 14 }, (_, index) => ({
    date: `2026-07-${String(index + 1).padStart(2, "0")}`,
    weightKg: index < 7 ? 80 : 79
  }));

  it("calculates 7-day average weight", () => {
    expect(calculateSevenDayAverageWeight(weights)).toBe(79);
  });

  it("calculates weekly weight trend", () => {
    expect(calculateWeeklyWeightTrend(weights)).toBe(-1);
  });

  it("calculates Power Score", () => {
    expect(calculatePowerScore({ bodyweightKg: 80, benchKg: 100, squatKg: 140, deadliftKg: 180 })).toBe(525);
  });

  it("calculates Consistency Score", () => {
    expect(calculateConsistencyScore(["2026-07-01", "2026-07-02", "2026-07-02"], 10)).toBe(20);
  });

  it("calculates Progress Score", () => {
    expect(calculateMonthlyProgressScore({ powerScoreChange: 5, weightTrendAlignment: 1, consistencyScore: 80 })).toBe(85);
  });
});

describe("default PPL x UL program", () => {
  it("has correct structure", () => {
    const program = getDefaultPplUlProgram();
    expect(program.name).toBe("PPL × UL — Aesthetic Cut");
    expect(program.days.map((day) => day.type)).toEqual(["push", "pull", "legs", "rest", "upper", "lower", "rest"]);
  });

  it("has 7 days", () => {
    expect(getDefaultPplUlProgram().days).toHaveLength(7);
  });

  it("has correct rest days", () => {
    const restDays = getDefaultPplUlProgram().days.filter((day) => day.type === "rest").map((day) => day.day);
    expect(restDays).toEqual([4, 7]);
  });

  it("has correct exercise count per day", () => {
    expect(getDefaultPplUlProgram().days.map((day) => day.exercises.length)).toEqual([6, 6, 7, 0, 6, 6, 0]);
  });
});
