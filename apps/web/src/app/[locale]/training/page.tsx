import { getDefaultPplUlProgram } from "@adaptive-powerbuilding-coach/core";
import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function TrainingPage() {
  const t = await getTranslations("training");
  const program = getDefaultPplUlProgram();
  return (
    <AppShell><main className="grid gap-4 pb-20"><PageHeader title={t("title")} description={t("description")} />
      <Link href="/training/ppl-ul" className="w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{t("openProgram")}</Link>
      <div className="grid gap-3 md:grid-cols-2">{program.days.map((day) => <Card key={day.day} className="rounded-lg border-border bg-card"><CardHeader><CardTitle>{t(`days.${day.type}`)}</CardTitle></CardHeader><CardContent className="grid gap-2 text-sm text-card-foreground">{day.exercises.slice(0, 4).map((exercise) => <div key={exercise.id}>{t("exerciseLine", { name: exercise.exerciseName, sets: exercise.sets, min: exercise.minReps, max: exercise.maxReps, rpeMin: exercise.targetRpeMin, rpeMax: exercise.targetRpeMax })}</div>)}</CardContent></Card>)}</div>
    </main></AppShell>
  );
}
