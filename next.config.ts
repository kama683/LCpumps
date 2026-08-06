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
    // app/not-found.tsx defines its own <html> (it renders outside the
    // app/[locale] layout tree, for truly unmatched URLs), and in this Next
    // version a plain not-found.js in that shape doesn't get its imported
    // globals.css linked in <head> — the file compiles, the CSS chunk is
    // even reachable, it's just never referenced. global-not-found.js is
    // the documented, intended mechanism for exactly this case (see
    // node_modules/next/dist/docs/.../not-found.md).
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
