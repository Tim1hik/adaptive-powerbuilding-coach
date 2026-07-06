"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { resetDemoState } from "@/lib/demo-store";

export function SettingsPanel() {
  const t = useTranslations("settings");
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {["language", "units", "theme", "privacy", "leaderboardOptIn", "telegramUsername", "activeProgram", "dataExport", "deleteAccount"].map((keyName) => (
        <div key={keyName} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <h2 className="font-semibold">{t(`items.${keyName}.title`)}</h2>
          <p className="mt-1 text-sm text-zinc-400">{t(`items.${keyName}.body`)}</p>
        </div>
      ))}
      <Button variant="destructive" onClick={() => resetDemoState()}>{t("resetDemo")}</Button>
    </div>
  );
}
