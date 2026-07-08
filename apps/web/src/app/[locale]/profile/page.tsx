import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export default async function ProfilePage() {
  const t = await getTranslations("profile");
  return <AppShell><main><PageHeader title={t("title")} description={t("description")} /><div className="rounded-lg border border-border bg-card p-5 text-card-foreground">{t("body")}</div></main></AppShell>;
}
