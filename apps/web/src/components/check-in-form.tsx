"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { adaptPplUlProgramByReadiness, calculateReadinessScore, getDefaultPplUlProgram } from "@adaptive-powerbuilding-coach/core";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { readDemoState, writeDemoState } from "@/lib/demo-store";

const schema = z.object({
  sleepQuality: z.coerce.number().min(1).max(5),
  sleepDurationHours: z.coerce.number().min(0).max(14),
  energy: z.coerce.number().min(1).max(5),
  stress: z.coerce.number().min(1).max(5),
  motivation: z.coerce.number().min(1).max(5),
  soreness: z.coerce.number().min(1).max(5),
  painArea: z.enum(["none", "shoulder", "low_back", "knee", "elbow", "hip", "other"]),
  painSeverity: z.enum(["none", "mild", "moderate", "strong"]),
  desireToTrainHeavy: z.boolean()
});

type FormInput = z.input<typeof schema>;
type Values = z.output<typeof schema>;

export function CheckInForm() {
  const t = useTranslations("checkIn");
  const [result, setResult] = useState<{ score: number; notes: string[] } | null>(null);
  const form = useForm<FormInput, unknown, Values>({
    resolver: zodResolver(schema),
    defaultValues: { sleepQuality: 4, sleepDurationHours: 7.5, energy: 4, stress: 2, motivation: 4, soreness: 2, painArea: "none", painSeverity: "none", desireToTrainHeavy: false }
  });

  function submit(values: Values) {
    const score = calculateReadinessScore(values);
    const day = getDefaultPplUlProgram().days[0];
    const adapted = adaptPplUlProgramByReadiness(values, day);
    writeDemoState({ ...readDemoState(), lastReadinessScore: score });
    setResult({ score, notes: adapted.notes ?? [] });
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={form.handleSubmit(submit)} className="grid gap-3 md:grid-cols-2">
        {["sleepQuality", "sleepDurationHours", "energy", "stress", "motivation", "soreness"].map((field) => (
          <label key={field} className="grid gap-1 text-sm">
            <span className="text-zinc-300">{t(`fields.${field}`)}</span>
            <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" {...form.register(field as keyof Values)} />
          </label>
        ))}
        <label className="grid gap-1 text-sm">
          <span className="text-zinc-300">{t("fields.painArea")}</span>
          <select className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white" {...form.register("painArea")}>
            {["none", "shoulder", "low_back", "knee", "elbow", "hip", "other"].map((value) => <option key={value} value={value}>{t(`painArea.${value}`)}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-zinc-300">{t("fields.painSeverity")}</span>
          <select className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white" {...form.register("painSeverity")}>
            {["none", "mild", "moderate", "strong"].map((value) => <option key={value} value={value}>{t(`painSeverity.${value}`)}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300 md:col-span-2">
          <input type="checkbox" {...form.register("desireToTrainHeavy")} />
          {t("fields.desireToTrainHeavy")}
        </label>
        <Button type="submit" className="md:col-span-2">{t("submit")}</Button>
      </form>
      {result ? (
        <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
          <div className="text-3xl font-semibold">{result.score}</div>
          <p className="mt-2 text-sm text-cyan-100">{t("recommendation")}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">{result.notes.map((note) => <li key={note}>{t(`notes.${note}`)}</li>)}</ul>
          <p className="mt-3 text-sm text-zinc-400">{t("safety")}</p>
        </div>
      ) : null}
    </div>
  );
}
