import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  return (
    <AppShell>
      <main>
        <PageHeader title={t("title")} description={t("description")} />
        <div className="grid gap-3">
          {["privateData", "leaderboard", "serviceRole", "cache"].map((keyName) => (
            <div key={keyName} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-zinc-300">
              {t(`sections.${keyName}`)}
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
