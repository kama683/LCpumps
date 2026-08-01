import "server-only";
import { headers } from "next/headers";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function cleanupExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * In-memory fixed-window rate limiter shared by the public contact form and
 * the admin login form. Resets on redeploy/restart — this app runs as a
 * single Node process behind Caddy, so no Redis/external store is needed at
 * this traffic scale. Returns false once `limit` calls for `key` have been
 * made within `windowMs`.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 5000) cleanupExpired(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

/** Best-effort client IP from the reverse proxy's forwarded headers (Caddy
 * sets X-Forwarded-For by default). Falls back to a constant so requests
 * without the header still share one rate-limit bucket instead of bypassing
 * the limit entirely. */
export async function getClientIp(): Promise<string> {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headerStore.get("x-real-ip") ?? "unknown";
}
