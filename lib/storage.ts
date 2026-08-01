import "server-only";
import path from "node:path";
import { LocalStorage } from "@/lib/storage/local";

const driver = process.env.STORAGE_DRIVER ?? "local";
if (driver !== "local") {
  throw new Error(`Unsupported STORAGE_DRIVER: "${driver}" (only "local" is implemented)`);
}

/** Public: product images, served directly by Next's static file handling.
 * The `turbopackIgnore` comment stops the build's output-file-tracer from
 * treating this env-derived path as a dynamic require and conservatively
 * bundling the whole project into the standalone output. */
export const publicStorage = new LocalStorage({
  baseDir: path.resolve(/* turbopackIgnore: true */ process.env.UPLOADS_PUBLIC_DIR ?? "./public/uploads"),
  baseUrl: "/uploads",
});

/** Private: contact-form attachments, never served directly — only through
 * the auth-gated app/api/admin/attachments/[id]/route.ts streaming handler. */
export const privateStorage = new LocalStorage({
  baseDir: path.resolve(/* turbopackIgnore: true */ process.env.UPLOADS_PRIVATE_DIR ?? "./data/uploads"),
  baseUrl: null,
});
