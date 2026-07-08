import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <AppShell>
      <main className="grid gap-6 pb-20">
        <section className="rounded-2xl border border-border bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.24),transparent_34%),var(--background)] p-6 text-foreground sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-200">{t("eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/onboarding" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{t("actions.start")}</Link>
            <Link href="/training/ppl-ul" className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground">{t("actions.program")}</Link>
            <Link href="/support" className="rounded-lg border border-cyan-300/30 px-4 py-2 text-sm font-medium text-cyan-100">{t("actions.install")}</Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t("installInstructions")}</p>
        </section>
        <div className="grid gap-4 md:grid-cols-3">
          {["readiness", "training", "arena"].map((keyName) => (
            <Card key={keyName} className="rounded-lg border-border bg-card">
              <CardHeader>
                <CardTitle>{t(`cards.${keyName}.title`)}</CardTitle>
                <CardDescription>{t(`cards.${keyName}.body`)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-lg border-border bg-card">
            <CardHeader>
              <CardTitle>{t("how.title")}</CardTitle>
              <CardDescription>{t("how.body")}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-lg border-cyan-300/20 bg-cyan-300/10">
            <CardHeader>
              <CardTitle>{t("demo.title")}</CardTitle>
              <CardDescription>{t("demo.body")}</CardDescription>
              <Link href="/dashboard" className="mt-3 w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{t("actions.demo")}</Link>
            </CardHeader>
          </Card>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          {["ppl", "pwa", "support"].map((keyName) => (
            <Card key={keyName} className="rounded-lg border-border bg-card">
              <CardHeader>
                <CardTitle>{t(`teasers.${keyName}.title`)}</CardTitle>
                <CardDescription>{t(`teasers.${keyName}.body`)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
