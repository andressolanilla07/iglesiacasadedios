import type { NextConfig } from "next";

import { GITHUB_PAGES_BASE_PATH } from "./modules/config/deployment";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
] as const;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPagesBuild
      ? GITHUB_PAGES_BASE_PATH
      : "",
  },
  ...(isGitHubPagesBuild
    ? {
        output: "export",
        basePath: GITHUB_PAGES_BASE_PATH,
        trailingSlash: true,
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [...securityHeaders],
            },
          ];
        },
      }),
};

export default nextConfig;
