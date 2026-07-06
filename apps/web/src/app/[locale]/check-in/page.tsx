import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { CheckInForm } from "@/components/check-in-form";
import { PageHeader } from "@/components/page-header";

export default async function CheckInPage() {
  const t = await getTranslations("checkIn");
  return <AppShell><main><PageHeader title={t("title")} description={t("description")} /><CheckInForm /></main></AppShell>;
}
