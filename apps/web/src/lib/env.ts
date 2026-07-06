import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  NEXT_PUBLIC_DONATEPAY_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_CRYPTO_BTC_ADDRESS: z.string().optional(),
  NEXT_PUBLIC_CRYPTO_ETH_ADDRESS: z.string().optional(),
  NEXT_PUBLIC_CRYPTO_USDT_TRC20_ADDRESS: z.string().optional(),
  NEXT_PUBLIC_TELEGRAM_USERNAME: z.string().optional(),
  NEXT_PUBLIC_MOBILE_FUND_RAISED_USD: z.string().optional(),
  NEXT_PUBLIC_MOBILE_FUND_DONOR_COUNT: z.string().optional()
});

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional()
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_DONATEPAY_URL: process.env.NEXT_PUBLIC_DONATEPAY_URL,
  NEXT_PUBLIC_CRYPTO_BTC_ADDRESS: process.env.NEXT_PUBLIC_CRYPTO_BTC_ADDRESS,
  NEXT_PUBLIC_CRYPTO_ETH_ADDRESS: process.env.NEXT_PUBLIC_CRYPTO_ETH_ADDRESS,
  NEXT_PUBLIC_CRYPTO_USDT_TRC20_ADDRESS: process.env.NEXT_PUBLIC_CRYPTO_USDT_TRC20_ADDRESS,
  NEXT_PUBLIC_TELEGRAM_USERNAME: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME,
  NEXT_PUBLIC_MOBILE_FUND_RAISED_USD: process.env.NEXT_PUBLIC_MOBILE_FUND_RAISED_USD,
  NEXT_PUBLIC_MOBILE_FUND_DONOR_COUNT: process.env.NEXT_PUBLIC_MOBILE_FUND_DONOR_COUNT
});

export function getServerEnv() {
  return serverEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
  });
}
