import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptSession, SESSION_COOKIE_NAME, type SessionPayload } from "@/lib/auth/session";

/** Memoized per request. Returns null if there's no valid session — use
 * directly in Server Actions/Route Handlers where you want to return an
 * error instead of redirecting. */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return decryptSession(token);
});

/** For protected Server Components/pages: redirects to /admin/login instead
 * of returning null. proxy.ts already does an optimistic redirect before
 * this ever runs — this is the real (non-optimistic) check, per Next's
 * recommended DAL pattern (see node_modules/next/dist/docs .../authentication.md). */
export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
});
