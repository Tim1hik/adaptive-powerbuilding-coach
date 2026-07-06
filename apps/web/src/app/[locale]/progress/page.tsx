import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { ProgressCharts } from "@/components/progress-charts";

export default async function ProgressPage() {
  const t = await getTranslations("progress");
  return <AppShell><main className="grid gap-4 pb-20"><PageHeader title={t("title")} description={t("description")} /><div className="grid gap-3 sm:grid-cols-4">{["average", "trend", "e1rm", "consistency"].map((keyName) => <MetricCard key={keyName} label={t(`metrics.${keyName}`)} value={t(`values.${keyName}`)} />)}</div><ProgressCharts /></main></AppShell>;
}
