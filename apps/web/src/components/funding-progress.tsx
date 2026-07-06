import { getTranslations } from "next-intl/server";
import { publicEnv } from "@/lib/env";

const goalAmount = 100;
const currentRaised = Number(publicEnv.NEXT_PUBLIC_MOBILE_FUND_RAISED_USD ?? "0");
const donorCount = publicEnv.NEXT_PUBLIC_MOBILE_FUND_DONOR_COUNT;

export async function FundingProgress() {
  const t = await getTranslations("support");
  const progress = Math.max(0, Math.min(100, (currentRaised / goalAmount) * 100));

  return (
    <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-cyan-100">{t("fund.current")}</p>
          <p className="text-3xl font-semibold text-white">{t("fund.amount", { amount: currentRaised })}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-cyan-100">{t("fund.goal")}</p>
          <p className="text-2xl font-semibold text-white">{t("fund.amount", { amount: goalAmount })}</p>
        </div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-900">
        <div className="h-full rounded-full bg-cyan-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 grid gap-1 text-sm text-cyan-100">
        <p>{donorCount ? t("fund.donorCount", { count: Number(donorCount) }) : t("fund.donorCountUnavailable")}</p>
        <p>{t("fund.start")}</p>
        <p>{t("fund.reward")}</p>
      </div>
    </div>
  );
}
