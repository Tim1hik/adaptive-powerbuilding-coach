"use client";

import { estimateOneRepMax, getDefaultPplUlProgram, type TrainingDayType } from "@adaptive-powerbuilding-coach/core";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { readDemoState, writeDemoState, type DemoSession } from "@/lib/demo-store";

const exerciseNameToId: Record<string, string> = {
  "Smith Machine Press": "smith-machine-press",
  "Dumbbell Lateral Raise": "dumbbell-lateral-raise",
  "Barbell Squat": "barbell-squat",
  "Romanian Deadlift": "romanian-deadlift"
};

export function DiaryForm() {
  const t = useTranslations("diary");
  const program = getDefaultPplUlProgram();
  const [dayType, setDayType] = useState<TrainingDayType>("push");
  const [exerciseName, setExerciseName] = useState(program.days[0].exercises[0].exerciseName);
  const [weightKg, setWeightKg] = useState(100);
  const [reps, setReps] = useState(5);
  const [rpe, setRpe] = useState(8);
  const [notes, setNotes] = useState("");
  const [sessions, setSessions] = useState<DemoSession[]>(() => readDemoState().sessions);
  const day = useMemo(() => program.days.find((item) => item.type === dayType) ?? program.days[0], [dayType, program.days]);

  function complete() {
    const current = readDemoState();
    const session: DemoSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      dayType,
      notes,
      sets: [{ exerciseName, setNumber: 1, weightKg, reps, rpe, estimatedOneRepMaxKg: estimateOneRepMax(weightKg, reps), notes }]
    };
    const next = { ...current, sessions: [session, ...current.sessions] };
    writeDemoState(next);
    setSessions(next.sessions);
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="text-foreground">{t("programDay")}</span>
          <select className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" value={dayType} onChange={(event) => setDayType(event.target.value as TrainingDayType)}>
            {program.days.filter((item) => item.type !== "rest").map((item) => <option key={item.day} value={item.type}>{t(`days.${item.type}`)}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-foreground">{t("exercise")}</span>
          <select className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" value={exerciseName} onChange={(event) => setExerciseName(event.target.value)}>
            {day.exercises.map((exercise) => <option key={exercise.id} value={exercise.exerciseName}>{t(`exercises.${exercise.id}`)}</option>)}
          </select>
        </label>
        {["weightKg", "reps", "rpe"].map((field) => (
          <label key={field} className="grid gap-1 text-sm">
            <span className="text-foreground">{t(field)}</span>
            <input className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" value={field === "weightKg" ? weightKg : field === "reps" ? reps : rpe} onChange={(event) => (field === "weightKg" ? setWeightKg(Number(event.target.value)) : field === "reps" ? setReps(Number(event.target.value)) : setRpe(Number(event.target.value)))} />
          </label>
        ))}
        <label className="grid gap-1 text-sm md:col-span-2">
          <span className="text-foreground">{t("notes")}</span>
          <textarea className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" value={notes} onChange={(event) => setNotes(event.target.value)} />
        </label>
      </div>
      <Button onClick={complete}>{t("complete")}</Button>
      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">{t("previous")}</h2>
        {sessions.slice(0, 4).map((session) => (
          <div key={session.id} className="rounded-lg border border-border bg-card p-3 text-sm text-card-foreground">
            {session.date} · {t(`days.${session.dayType}`)} · {t(`exercises.${exerciseNameToId[session.sets[0]?.exerciseName ?? ""] ?? "unknown"}`)} · {session.sets[0]?.estimatedOneRepMaxKg} {t("e1rm")}
          </div>
        ))}
      </div>
    </div>
  );
}
