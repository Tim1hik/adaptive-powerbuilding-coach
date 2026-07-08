import { calculateSevenDayAverageWeight, calculateWeeklyWeightTrend } from "@adaptive-powerbuilding-coach/core";
import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { Link } from "@/i18n/navigation";

const weights = [
  { date: "2026-06-30", weightKg: 80.4 },
  { date: "2026-07-01", weightKg: 80.2 },
  { date: "2026-07-02", weightKg: 80.1 },
  { date: "2026-07-03", weightKg: 79.9 },
  { date: "2026-07-04", weightKg: 79.8 },
  { date: "2026-07-05", weightKg: 79.7 },
  { date: "2026-07-06", weightKg: 79.6 }
];

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const average = calculateSevenDayAverageWeight(weights);
  const trend = calculateWeeklyWeightTrend([...weights, ...weights.map((item, index) => ({ date: `2026-07-${String(index + 7).padStart(2, "0")}`, weightKg: item.weightKg - 0.4 }))]);
  return (
    <AppShell>
      <main className="grid gap-5 pb-20">
        <PageHeader title={t("title")} description={t("description")} />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {["calories", "protein", "carbs", "training", "program", "readiness", "lastWeight", "nextWorkout"].map((keyName) => (
            <MetricCard key={keyName} label={t(`metrics.${keyName}`)} value={keyName === "lastWeight" ? "79.6" : keyName === "readiness" ? "84" : keyName === "program" ? t("activeProgram") : keyName === "training" ? t("todayTraining") : keyName === "calories" ? "2270" : keyName === "protein" ? "176" : keyName === "carbs" ? "266" : t("nextWorkout")} detail={keyName === "lastWeight" ? `${t("average")}: ${average} · ${t("trend")}: ${trend}` : undefined} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3"><Link href="/check-in" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{t("quickCheckIn")}</Link><Link href="/training/diary" className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground">{t("quickLog")}</Link></div>
      </main>
    </AppShell>
  );
}
