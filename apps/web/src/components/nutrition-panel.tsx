"use client";

import { calculateCarbCyclingTargets, calculateNutritionTargets, type CarbCyclingStrategy } from "@adaptive-powerbuilding-coach/core";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { readDemoState, writeDemoState, type DemoState } from "@/lib/demo-store";

export function NutritionPanel() {
  const t = useTranslations("nutrition");
  const [state, setState] = useState<DemoState | null>(() => readDemoState());
  const [dayType, setDayType] = useState<CarbCyclingStrategy>("normal_training_day");

  function recalculate() {
    const current = readDemoState();
    if (!current.profile) return;
    const base = calculateNutritionTargets(
      { id: "demo", sex: current.profile.sex, age: current.profile.age, heightCm: current.profile.heightCm, weightKg: current.profile.weightKg },
      { activityMultiplier: 1.45 },
      current.profile.goal
    );
    const macros = calculateCarbCyclingTargets(base, dayType);
    const next = { ...current, macros };
    writeDemoState(next);
    setState(next);
  }

  const macros = state?.macros;

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {["calories", "proteinGrams", "fatGrams", "carbGrams"].map((keyName) => (
          <div key={keyName} className="rounded-lg border border-border bg-card p-4 text-card-foreground">
            <p className="text-sm text-muted-foreground">{t(`metrics.${keyName}`)}</p>
            <p className="mt-2 text-2xl font-semibold">{macros ? String(macros[keyName as keyof typeof macros]) : "0"}</p>
          </div>
        ))}
      </div>
      <label className="grid gap-1 text-sm">
        <span className="text-foreground">{t("dayType")}</span>
        <select className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" value={dayType} onChange={(event) => setDayType(event.target.value as CarbCyclingStrategy)}>
          {["heavy_training_day", "normal_training_day", "rest_day", "refeed_day"].map((value) => <option key={value} value={value}>{t(`dayTypes.${value}`)}</option>)}
        </select>
      </label>
      <p className="text-sm text-muted-foreground">{t("cycling")}</p>
      <Button onClick={recalculate}>{t("recalculate")}</Button>
      <p className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">{t("safety")}</p>
    </div>
  );
}
