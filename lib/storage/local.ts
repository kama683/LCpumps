import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export interface SavedFile {
  /** Relative path within this storage root — what gets persisted to the DB. */
  path: string;
  /** Public URL, or null for private storage (never directly servable). */
  url: string | null;
}

export interface LocalStorageOptions {
  baseDir: string;
  /** URL prefix for files under this root, or null if private (no direct URL). */
  baseUrl: string | null;
}

/** The only storage implementation for now (STORAGE_DRIVER=local). Kept
 * behind lib/storage.ts's plain save/delete/resolve interface so an
 * S3-compatible driver later is a drop-in, not a call-site rewrite. */
export class LocalStorage {
  constructor(private readonly opts: LocalStorageOptions) {}

  async save(buffer: Buffer, subdir: string, filename: string): Promise<SavedFile> {
    const dir = path.join(this.opts.baseDir, subdir);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buffer);

    const relPath = [subdir, filename].join("/");
    return {
      path: relPath,
      url: this.opts.baseUrl ? `${this.opts.baseUrl}/${relPath}` : null,
    };
  }

  async delete(relPath: string): Promise<void> {
    try {
      await unlink(path.join(this.opts.baseDir, relPath));
    } catch {
      // Already gone — fine, delete is idempotent.
    }
  }

  resolveAbsolutePath(relPath: string): string {
    return path.join(this.opts.baseDir, relPath);
  }
}
