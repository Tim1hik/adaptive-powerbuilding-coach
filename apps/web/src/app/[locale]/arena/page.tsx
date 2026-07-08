import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ArenaPage() {
  const t = await getTranslations("arena");
  const tabs = ["powerScore", "relativeBench", "relativeSquat", "relativeDeadlift", "monthlyProgress", "consistency"];
  return <AppShell><main className="grid gap-4 pb-20"><PageHeader title={t("title")} description={t("description")} /><div className="flex flex-wrap gap-2">{tabs.map((tab) => <span key={tab} className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground">{t(`tabs.${tab}`)}</span>)}</div><Card className="rounded-lg border-border bg-card"><CardHeader><CardTitle>{t("privacyTitle")}</CardTitle></CardHeader><CardContent className="text-sm text-card-foreground">{t("privacyBody")}</CardContent></Card></main></AppShell>;
}
