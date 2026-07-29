import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Docker: a lean .next/standalone build with only the files node server.js
  // actually needs — no full node_modules copy. See Dockerfile.
  output: "standalone",
  experimental: {
    serverActions: {
      // Default is 1MB — too small for contact-form attachments (drawings,
      // spec sheets). See node_modules/next/dist/docs/.../serverActions.md.
      bodySizeLimit: "50mb",
    },
  },
};

export default withNextIntl(nextConfig);
