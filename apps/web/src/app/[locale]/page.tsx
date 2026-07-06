import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <AppShell>
      <main className="grid gap-6 pb-20">
        <section className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.24),transparent_34%),#09090b] p-6 sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-200">{t("eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">{t("subtitle")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/onboarding" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{t("actions.start")}</Link>
            <Link href="/training/ppl-ul" className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white">{t("actions.program")}</Link>
          </div>
        </section>
        <div className="grid gap-4 md:grid-cols-3">
          {["readiness", "training", "arena"].map((keyName) => (
            <Card key={keyName} className="rounded-lg border-white/10 bg-white/[0.04]">
              <CardHeader>
                <CardTitle>{t(`cards.${keyName}.title`)}</CardTitle>
                <CardDescription>{t(`cards.${keyName}.body`)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
