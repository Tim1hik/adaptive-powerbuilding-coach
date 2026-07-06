import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@adaptive-powerbuilding-coach/core",
    "@adaptive-powerbuilding-coach/db",
    "@adaptive-powerbuilding-coach/shared-types"
  ]
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
