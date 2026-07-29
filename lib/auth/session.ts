import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE_NAME = "lcpumps_admin_session";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

const secret = process.env.ADMIN_SESSION_SECRET;
if (!secret) {
  throw new Error("ADMIN_SESSION_SECRET is not set");
}
const encodedKey = new TextEncoder().encode(secret);

export interface SessionPayload {
  userId: string;
  username: string;
}

/** Signs a stateless HS256 session token. No DB-backed revocation — see the
 * admin-panel plan's auth trade-off note: logout only clears the cookie,
 * a leaked token stays valid until it expires. Acceptable for a single
 * admin account; deliberate simplicity, not a runtime limitation. */
export async function encryptSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/** Pure — safe to call from proxy.ts (no `next/headers` dependency) as well
 * as from Server Components/Actions via the DAL in lib/auth/dal.ts. */
export async function decryptSession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
    if (typeof payload.userId !== "string" || typeof payload.username !== "string") return null;
    return { userId: payload.userId, username: payload.username };
  } catch {
    return null;
  }
}

export async function createSession(userId: string, username: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await encryptSession({ userId, username });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
