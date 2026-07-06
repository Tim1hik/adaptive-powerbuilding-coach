import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { SettingsPanel } from "@/components/settings-panel";

export default async function SettingsPage() {
  const t = await getTranslations("settings");
  return <AppShell><main><PageHeader title={t("title")} description={t("description")} /><SettingsPanel /></main></AppShell>;
}
