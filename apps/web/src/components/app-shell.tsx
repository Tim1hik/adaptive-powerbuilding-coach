import { Dumbbell } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AppGuideModal } from "@/components/app-guide-modal";

const navKeys = ["dashboard", "nutrition", "training", "checkIn", "progress", "arena", "support", "settings"] as const;
const hrefs = ["/dashboard", "/nutrition", "/training", "/check-in", "/progress", "/arena", "/support", "/settings"] as const;

export async function AppShell({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("nav");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Dumbbell className="h-5 w-5 text-cyan-300" />
            <span>{t("brand")}</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {navKeys.map((keyName, index) => (
              <Link key={keyName} href={hrefs[index]} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                {t(keyName)}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="grid gap-1">
            {navKeys.map((keyName, index) => (
              <Link key={keyName} href={hrefs[index]} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                {t(keyName)}
              </Link>
            ))}
          </nav>
        </aside>
        {children}
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/95 p-2 lg:hidden">
        {navKeys.slice(0, 5).map((keyName, index) => (
          <Link key={keyName} href={hrefs[index]} className="rounded-md px-1 py-2 text-center text-xs text-muted-foreground">
            {t(keyName)}
          </Link>
        ))}
      </nav>
      <AppGuideModal />
    </div>
  );
}
