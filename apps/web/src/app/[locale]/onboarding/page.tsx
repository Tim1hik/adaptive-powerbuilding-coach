import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { OnboardingForm } from "@/components/onboarding-form";
import { PageHeader } from "@/components/page-header";

export default async function OnboardingPage() {
  const t = await getTranslations("onboarding");
  return <AppShell><main><PageHeader title={t("title")} description={t("description")} /><OnboardingForm /></main></AppShell>;
}
