import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export default async function TermsPage() {
  const t = await getTranslations("terms");
  return (
    <AppShell>
      <main>
        <PageHeader title={t("title")} description={t("description")} />
        <div className="grid gap-3">
          {["fitness", "availability", "accounts", "abuse"].map((keyName) => (
            <div key={keyName} className="rounded-lg border border-border bg-card p-5 text-sm leading-6 text-card-foreground">
              {t(`sections.${keyName}`)}
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
