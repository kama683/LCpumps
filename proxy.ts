import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { decryptSession, SESSION_COOKIE_NAME } from "@/lib/auth/session";

const intlMiddleware = createMiddleware(routing);

/** Optimistic-only session check (cookie signature, no DB) — Next's own
 * authentication guide recommends this for Proxy even though Proxy defaults
 * to the Node.js runtime in this version and could reach Postgres directly.
 * The real check happens again in every Server Action / Route Handler via
 * lib/auth/dal.ts's verifySession()/getSession(). */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    const session = await decryptSession(request.cookies.get(SESSION_COOKIE_NAME)?.value);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const session = await decryptSession(request.cookies.get(SESSION_COOKIE_NAME)?.value);
    const isLoginPage = pathname === "/admin/login";

    if (!session && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (session && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Runs on everything except Next/Vercel internals and files with an
  // extension (static assets) — including /admin and /api/admin now, so the
  // auth check above can run there. Everything else still gets next-intl's
  // locale routing exactly as before.
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
