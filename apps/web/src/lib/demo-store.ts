import type { MacroTargets, TrainingDayType } from "@adaptive-powerbuilding-coach/core";

export interface DemoProfile {
  displayName: string;
  age: number;
  sex: "male" | "female";
  heightCm: number;
  weightKg: number;
  bodyFat?: number;
  goal: "aggressive_cut" | "cut" | "maintenance" | "lean_bulk" | "bulk";
  averageSteps: number;
  trainingDaysPerWeek: number;
  sleepDuration: number;
  sleepQuality: number;
  bench1rm: number;
  squat1rm: number;
  deadlift1rm: number;
  overheadPress1rm: number;
  preferredLanguage: "en" | "ru";
  telegramUsername?: string;
}

export interface DemoSet {
  exerciseName: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  rpe: number;
  estimatedOneRepMaxKg?: number;
  notes?: string;
}

export interface DemoSession {
  id: string;
  date: string;
  dayType: TrainingDayType;
  notes?: string;
  sets: DemoSet[];
}

export interface DemoState {
  profile?: DemoProfile;
  macros?: MacroTargets;
  activeProgramId?: string;
  lastReadinessScore?: number;
  weightEntries: Array<{ date: string; weightKg: number }>;
  sessions: DemoSession[];
  leaderboardOptIn: boolean;
}

const key = "adaptive-powerbuilding-demo";

export function getDefaultDemoState(): DemoState {
  return {
    profile: {
      displayName: "Demo Athlete",
      age: 19,
      sex: "male",
      heightCm: 176,
      weightKg: 67,
      goal: "lean_bulk",
      averageSteps: 10000,
      trainingDaysPerWeek: 5,
      sleepDuration: 7.5,
      sleepQuality: 4,
      bench1rm: 80,
      squat1rm: 120,
      deadlift1rm: 150,
      overheadPress1rm: 50,
      preferredLanguage: "en",
      telegramUsername: "@tim1hik"
    },
    macros: {
      calories: 2683,
      proteinGrams: 121,
      fatGrams: 60,
      carbGrams: 388
    },
    activeProgramId: "ppl-ul-aesthetic-cut",
    weightEntries: [
      { date: "2026-06-30", weightKg: 66.5 },
      { date: "2026-07-01", weightKg: 66.6 },
      { date: "2026-07-02", weightKg: 66.7 },
      { date: "2026-07-03", weightKg: 66.7 },
      { date: "2026-07-04", weightKg: 66.8 },
      { date: "2026-07-05", weightKg: 66.9 },
      { date: "2026-07-06", weightKg: 67 }
    ],
    sessions: [
      {
        id: "demo-push",
        date: "2026-07-05",
        dayType: "push",
        notes: "Demo PPL x UL push session",
        sets: [
          { exerciseName: "Smith Machine Press", setNumber: 1, weightKg: 62.5, reps: 8, rpe: 8, estimatedOneRepMaxKg: 79.2 },
          { exerciseName: "Dumbbell Lateral Raise", setNumber: 2, weightKg: 10, reps: 16, rpe: 9, estimatedOneRepMaxKg: 15.3 }
        ]
      },
      {
        id: "demo-legs",
        date: "2026-07-03",
        dayType: "legs",
        notes: "Demo PPL x UL legs session",
        sets: [
          { exerciseName: "Barbell Squat", setNumber: 1, weightKg: 95, reps: 8, rpe: 8.5, estimatedOneRepMaxKg: 120.3 },
          { exerciseName: "Romanian Deadlift", setNumber: 2, weightKg: 90, reps: 10, rpe: 8, estimatedOneRepMaxKg: 120 }
        ]
      }
    ],
    leaderboardOptIn: false
  };
}

export function readDemoState(): DemoState {
  if (typeof window === "undefined") return getDefaultDemoState();
  const raw = window.localStorage.getItem(key);
  return raw ? { ...getDefaultDemoState(), ...JSON.parse(raw) } : getDefaultDemoState();
}

export function writeDemoState(state: DemoState) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

export function resetDemoState() {
  window.localStorage.removeItem(key);
}
