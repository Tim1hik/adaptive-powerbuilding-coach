import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { AuthForm } from "@/components/auth-form";
import { PageHeader } from "@/components/page-header";

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUpPage");
  return <AppShell><main className="max-w-xl"><PageHeader title={t("title")} description={t("description")} /><AuthForm mode="signUp" /></main></AppShell>;
}
