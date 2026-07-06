import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { resolve } from "node:path";

const workspaceRoot = resolve(process.cwd(), "../..");

const nextConfig: NextConfig = {
  turbopack: {
    root: workspaceRoot
  },
  transpilePackages: [
    "@adaptive-powerbuilding-coach/core",
    "@adaptive-powerbuilding-coach/db",
    "@adaptive-powerbuilding-coach/shared-types"
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; frame-src https://widget.donatepay.ru; connect-src 'self' https://*.supabase.co; base-uri 'self'; frame-ancestors 'self'" }
        ]
      }
    ];
  }
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
