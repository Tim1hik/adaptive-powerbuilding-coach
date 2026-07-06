import { getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { CryptoWalletCard } from "@/components/crypto-wallet-card";
import { FundingProgress } from "@/components/funding-progress";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env";

export default async function SupportPage() {
  const t = await getTranslations("support");
  const donatePayUrl = publicEnv.NEXT_PUBLIC_DONATEPAY_URL;
  const telegramUsername = publicEnv.NEXT_PUBLIC_TELEGRAM_USERNAME || "@tim1hik";
  const wallets = [
    { network: "BTC", address: publicEnv.NEXT_PUBLIC_CRYPTO_BTC_ADDRESS },
    { network: "ETH", address: publicEnv.NEXT_PUBLIC_CRYPTO_ETH_ADDRESS },
    { network: "USDT TRC20", address: publicEnv.NEXT_PUBLIC_CRYPTO_USDT_TRC20_ADDRESS }
  ];

  return (
    <AppShell>
      <main className="grid gap-5 pb-20">
        <PageHeader title={t("title")} description={t("description")} />
        <Card className="rounded-lg border-white/10 bg-white/[0.04]">
          <CardHeader>
            <CardTitle>{t("project.title")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm leading-6 text-zinc-300">
            <p>{t("project.body")}</p>
            <a className="w-fit rounded-lg border border-cyan-300/30 px-3 py-2 text-cyan-100" href="https://t.me/tim1hik" target="_blank" rel="noreferrer">
              {telegramUsername}
            </a>
          </CardContent>
        </Card>
        <FundingProgress />
        <Card className="rounded-lg border-white/10 bg-white/[0.04]">
          <CardHeader>
            <CardTitle>{t("donatepay.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {donatePayUrl ? (
              <iframe title={t("donatepay.title")} src={donatePayUrl} className="h-[220px] w-full max-w-[520px] rounded-lg border-0" />
            ) : (
              <p className="text-sm text-zinc-300">{t("donatepay.comingSoon")}</p>
            )}
          </CardContent>
        </Card>
        <section className="grid gap-3 md:grid-cols-3">
          {wallets.map((wallet) => (
            <CryptoWalletCard key={wallet.network} network={wallet.network} address={wallet.address} />
          ))}
        </section>
        {["teaser", "free", "premium", "secret"].map((keyName) => (
          <Card key={keyName} className="rounded-lg border-white/10 bg-white/[0.04]">
            <CardHeader>
              <CardTitle>{t(`${keyName}.title`)}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-zinc-300">
              {keyName === "free" || keyName === "premium" || keyName === "teaser" ? (
                <ul className="grid gap-2">
                  {["one", "two", "three", "four", "five", "six", "seven"].map((item) => {
                    const value = t(`${keyName}.items.${item}`);
                    return value ? <li key={item}>{value}</li> : null;
                  })}
                </ul>
              ) : (
                <p>{t(`${keyName}.body`)}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </main>
    </AppShell>
  );
}
