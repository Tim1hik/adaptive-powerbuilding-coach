"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { resetDemoState } from "@/lib/demo-store";

export function SettingsPanel() {
  const t = useTranslations("settings");
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {["language", "units", "theme", "privacy", "leaderboardOptIn", "telegramUsername", "activeProgram", "dataExport", "deleteAccount"].map((keyName) => (
        <div key={keyName} className="rounded-lg border border-border bg-card p-4 text-card-foreground">
          <h2 className="font-semibold text-card-foreground">{t(`items.${keyName}.title`)}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t(`items.${keyName}.body`)}</p>
        </div>
      ))}
      <Button variant="destructive" onClick={() => resetDemoState()}>{t("resetDemo")}</Button>
    </div>
  );
}
