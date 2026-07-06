"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const nextLocale = locale === "en" ? "ru" : "en";

  return (
    <Button variant="outline" size="sm" onClick={() => router.replace(pathname, { locale: nextLocale })} aria-label={t("language")}>
      {nextLocale.toUpperCase()}
    </Button>
  );
}
