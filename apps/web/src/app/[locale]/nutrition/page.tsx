import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { NutritionPanel } from "@/components/nutrition-panel";
import { PageHeader } from "@/components/page-header";

export default async function NutritionPage() {
  const t = await getTranslations("nutrition");
  return <AppShell><main><PageHeader title={t("title")} description={t("description")} /><NutritionPanel /></main></AppShell>;
}
