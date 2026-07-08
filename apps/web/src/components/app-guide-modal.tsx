"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const guideDismissedKey = "adaptive-powerbuilding-coach:guide-dismissed";
const openGuideEvent = "adaptive-powerbuilding-coach:open-guide";

export function openAppGuide() {
  window.dispatchEvent(new Event(openGuideEvent));
}

export function AppGuideModal() {
  const t = useTranslations("appGuide");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (window.localStorage.getItem(guideDismissedKey) !== "true") {
      setOpen(true);
    }

    function handleOpenGuide() {
      setDontShowAgain(false);
      setOpen(true);
    }

    window.addEventListener(openGuideEvent, handleOpenGuide);
    return () => window.removeEventListener(openGuideEvent, handleOpenGuide);
  }, []);

  function dismiss(remember = dontShowAgain) {
    if (remember) {
      window.localStorage.setItem(guideDismissedKey, "true");
    }
    setOpen(false);
  }

  if (!mounted || !open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-background/70 p-3 backdrop-blur-sm sm:items-center sm:justify-center">
      <section className="max-h-[92vh] w-full overflow-y-auto rounded-xl border border-border bg-card p-5 text-card-foreground shadow-2xl sm:max-w-2xl sm:p-6">
        <div className="grid gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-card-foreground">{t("title")}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("intro")}</p>
          </div>
          <ol className="grid gap-2 text-sm leading-6">
            {["profile", "program", "checkIn", "diary", "progress", "arena"].map((step, index) => (
              <li key={step} className="flex gap-3 rounded-lg border border-border bg-muted/40 p-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{index + 1}</span>
                <span>{t(`steps.${step}`)}</span>
              </li>
            ))}
          </ol>
          <p className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">{t("safety")}</p>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={dontShowAgain} onChange={(event) => setDontShowAgain(event.target.checked)} />
            {t("dontShowAgain")}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link href="/onboarding" onClick={() => dismiss(true)} className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/80">
              {t("actions.startSetup")}
            </Link>
            <Link href="/training/ppl-ul" onClick={() => dismiss(true)} className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted">
              {t("actions.openPplUl")}
            </Link>
            <Button type="button" variant="ghost" onClick={() => dismiss()}>
              {t("actions.close")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
