import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { DiaryForm } from "@/components/diary-form";
import { PageHeader } from "@/components/page-header";

export default async function DiaryPage() {
  const t = await getTranslations("diary");
  return <AppShell><main><PageHeader title={t("title")} description={t("description")} /><DiaryForm /></main></AppShell>;
}
