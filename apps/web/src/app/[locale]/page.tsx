import { Activity, Dumbbell, Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { defaultTrainingPlans } from "@adaptive-powerbuilding-coach/core";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function HomePage() {
  const t = await getTranslations("home");
  const training = await getTranslations();
  const defaultPlan = defaultTrainingPlans[0];

  const cards = [
    { icon: Activity, title: t("cards.readiness.title"), body: t("cards.readiness.body") },
    { icon: Dumbbell, title: t("cards.training.title"), body: t("cards.training.body") },
    { icon: Trophy, title: t("cards.arena.title"), body: t("cards.arena.body") }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{t("eyebrow")}</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">{t("title")}</h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{t("subtitle")}</p>
          </div>
          <Card className="rounded-lg bg-zinc-50 shadow-sm dark:bg-zinc-950">
            <CardHeader>
              <CardDescription>{t("defaultPlan.label")}</CardDescription>
              <CardTitle className="text-2xl">{training(defaultPlan.titleKey)}</CardTitle>
              <CardDescription>{training(defaultPlan.descriptionKey)}</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {defaultPlan.days.map((day) => (
                  <li key={`${day.day}-${day.type}`} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                    {t("defaultPlan.day", { day: day.day, name: training(day.titleKey) })}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.title} className="rounded-lg">
              <CardHeader>
                <card.icon aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
