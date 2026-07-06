import { getDefaultPplUlProgram } from "@adaptive-powerbuilding-coach/core";
import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function PplUlPage() {
  const t = await getTranslations("pplUl");
  const program = getDefaultPplUlProgram();
  return (
    <AppShell>
      <main className="grid gap-5 pb-20">
        <PageHeader title={t("title")} description={t("description")} />
        <div className="flex flex-wrap gap-2">{program.days.map((day) => <span key={day.day} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">{t(`days.${day.type}`)}</span>)}</div>
        <div className="flex flex-wrap gap-3"><Button>{t("useProgram")}</Button><Link href="/check-in" className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white">{t("startCheckIn")}</Link></div>
        <div className="grid gap-4">
          {program.days.map((day) => (
            <Card key={day.day} className="rounded-lg border-white/10 bg-white/[0.04]">
              <CardHeader><CardTitle>{t("dayTitle", { day: day.day, name: t(`days.${day.type}`) })}</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                {day.exercises.length ? (
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="text-zinc-400"><tr>{["muscle", "exercise", "sets", "rpe", "rest", "notes"].map((keyName) => <th key={keyName} className="p-2">{t(`columns.${keyName}`)}</th>)}</tr></thead>
                    <tbody>{day.exercises.map((exercise) => <tr key={exercise.id} className="border-t border-white/10"><td className="p-2">{t(`muscles.${exercise.muscleGroup}`)}</td><td className="p-2">{exercise.exerciseName}</td><td className="p-2">{t("setsValue", { sets: exercise.sets, min: exercise.minReps, max: exercise.maxReps })}</td><td className="p-2">{exercise.targetRpeMin}-{exercise.targetRpeMax}</td><td className="p-2">{t("restValue", { min: exercise.restSecondsMin, max: exercise.restSecondsMax })}</td><td className="p-2">{exercise.techniqueNotes.map((note) => t(`notes.${note}`)).join(" · ")}</td></tr>)}</tbody>
                  </table>
                ) : <p className="text-sm text-zinc-300">{day.notes?.map((note) => t(`restNotes.${note}`)).join(" ")}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="rounded-lg border-white/10 bg-white/[0.04]"><CardHeader><CardTitle>{t("progression")}</CardTitle></CardHeader><CardContent><ul className="grid gap-2 text-sm text-zinc-300">{program.progressionRules.map((rule) => <li key={rule}>{t(`rules.${rule}`)}</li>)}</ul></CardContent></Card>
      </main>
    </AppShell>
  );
}
