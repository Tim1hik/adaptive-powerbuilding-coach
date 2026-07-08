"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { calculateNutritionTargets } from "@adaptive-powerbuilding-coach/core";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { readDemoState, writeDemoState, type DemoProfile } from "@/lib/demo-store";

const schema = z.object({
  displayName: z.string().min(2),
  age: z.coerce.number().min(13).max(100),
  sex: z.enum(["male", "female"]),
  heightCm: z.coerce.number().min(100).max(240),
  weightKg: z.coerce.number().min(30).max(300),
  bodyFat: z.coerce.number().optional(),
  goal: z.enum(["aggressive_cut", "cut", "maintenance", "lean_bulk", "bulk"]),
  averageSteps: z.coerce.number().min(0),
  trainingDaysPerWeek: z.coerce.number().min(1).max(7),
  sleepDuration: z.coerce.number().min(0).max(14),
  sleepQuality: z.coerce.number().min(1).max(5),
  bench1rm: z.coerce.number().min(0),
  squat1rm: z.coerce.number().min(0),
  deadlift1rm: z.coerce.number().min(0),
  overheadPress1rm: z.coerce.number().min(0),
  preferredLanguage: z.enum(["en", "ru"])
});

type FormInput = z.input<typeof schema>;
type Values = z.output<typeof schema>;

const fields = ["displayName", "age", "heightCm", "weightKg", "bodyFat", "averageSteps", "trainingDaysPerWeek", "sleepDuration", "sleepQuality", "bench1rm", "squat1rm", "deadlift1rm", "overheadPress1rm"] as const;

export function OnboardingForm() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const form = useForm<FormInput, unknown, Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: "",
      age: 30,
      sex: "male",
      heightCm: 180,
      weightKg: 80,
      goal: "cut",
      averageSteps: 8000,
      trainingDaysPerWeek: 5,
      sleepDuration: 7.5,
      sleepQuality: 4,
      bench1rm: 100,
      squat1rm: 140,
      deadlift1rm: 180,
      overheadPress1rm: 60,
      preferredLanguage: "en"
    }
  });

  function submit(values: Values) {
    const profile: DemoProfile = values;
    const macros = calculateNutritionTargets(
      { id: "demo", sex: profile.sex, age: profile.age, heightCm: profile.heightCm, weightKg: profile.weightKg },
      { activityMultiplier: 1.45, averageSteps: profile.averageSteps, trainingDaysPerWeek: profile.trainingDaysPerWeek },
      profile.goal
    );
    writeDemoState({ ...readDemoState(), profile, macros, activeProgramId: "ppl-ul-aesthetic-cut" });
    router.push("/dashboard");
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field} className="grid gap-1 text-sm">
            <span className="text-foreground">{t(`fields.${field}`)}</span>
            <input className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" {...form.register(field)} />
          </label>
        ))}
        <label className="grid gap-1 text-sm">
          <span className="text-foreground">{t("fields.sex")}</span>
          <select className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" {...form.register("sex")}>
            <option value="male">{t("options.male")}</option>
            <option value="female">{t("options.female")}</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-foreground">{t("fields.goal")}</span>
          <select className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" {...form.register("goal")}>
            {["aggressive_cut", "cut", "maintenance", "lean_bulk", "bulk"].map((goal) => (
              <option key={goal} value={goal}>{t(`goals.${goal}`)}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-foreground">{t("fields.preferredLanguage")}</span>
          <select className="rounded-lg border border-border bg-input/40 px-3 py-2 text-foreground" {...form.register("preferredLanguage")}>
            <option value="en">{t("options.english")}</option>
            <option value="ru">{t("options.russian")}</option>
          </select>
        </label>
      </div>
      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-100">{t("offer")}</div>
      <Button type="submit">{t("submit")}</Button>
    </form>
  );
}
