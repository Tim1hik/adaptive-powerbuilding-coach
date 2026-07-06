import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SupportPage() {
  const t = await getTranslations("support");
  return <AppShell><main className="grid gap-4 pb-20"><PageHeader title={t("title")} description={t("description")} />{["donatepay", "crypto", "telegram", "funding", "rewards", "apple"].map((keyName) => <Card key={keyName} className="rounded-lg border-white/10 bg-white/[0.04]"><CardHeader><CardTitle>{t(`sections.${keyName}.title`)}</CardTitle></CardHeader><CardContent className="text-sm text-zinc-300">{t(`sections.${keyName}.body`)}</CardContent></Card>)}</main></AppShell>;
}
