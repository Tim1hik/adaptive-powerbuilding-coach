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
    activeProgramId: "ppl-ul-aesthetic-cut",
    weightEntries: [
      { date: "2026-06-30", weightKg: 80.4 },
      { date: "2026-07-01", weightKg: 80.2 },
      { date: "2026-07-02", weightKg: 80.1 },
      { date: "2026-07-03", weightKg: 79.9 },
      { date: "2026-07-04", weightKg: 79.8 },
      { date: "2026-07-05", weightKg: 79.7 },
      { date: "2026-07-06", weightKg: 79.6 }
    ],
    sessions: [],
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
