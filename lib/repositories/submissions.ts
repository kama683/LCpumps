import "server-only";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { contactSubmissions, submissionAttachments } from "@/lib/db/schema";

export interface NewSubmissionInput {
  mode: "basic" | "technical";
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  techPrimary: Record<string, string> | null;
  techExtra: Record<string, string> | null;
}

export interface NewAttachmentInput {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
}

export async function createSubmission(
  input: NewSubmissionInput,
  attachments: NewAttachmentInput[]
): Promise<string> {
  return db.transaction(async (tx) => {
    const [row] = await tx
      .insert(contactSubmissions)
      .values({
        mode: input.mode,
        name: input.name,
        company: input.company,
        email: input.email,
        phone: input.phone,
        message: input.message,
        techPrimary: input.techPrimary,
        techExtra: input.techExtra,
      })
      .returning({ id: contactSubmissions.id });

    for (const a of attachments) {
      await tx.insert(submissionAttachments).values({ submissionId: row.id, ...a });
    }

    return row.id;
  });
}

export interface SubmissionListItem {
  id: string;
  createdAt: string;
  mode: "basic" | "technical";
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "read";
  attachmentCount: number;
}

export async function listSubmissionsForAdmin(): Promise<SubmissionListItem[]> {
  const submissions = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));

  const counts = await db
    .select({ submissionId: submissionAttachments.submissionId, count: sql<number>`count(*)::int` })
    .from(submissionAttachments)
    .groupBy(submissionAttachments.submissionId);
  const countBySubmission = new Map(counts.map((c) => [c.submissionId, c.count]));

  return submissions.map((s) => ({
    id: s.id,
    createdAt: s.createdAt.toISOString(),
    mode: s.mode,
    name: s.name,
    company: s.company,
    email: s.email,
    phone: s.phone,
    status: s.status,
    attachmentCount: countBySubmission.get(s.id) ?? 0,
  }));
}

export interface SubmissionAttachmentItem {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface SubmissionDetail {
  id: string;
  createdAt: string;
  mode: "basic" | "technical";
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  techPrimary: Record<string, string> | null;
  techExtra: Record<string, string> | null;
  status: "new" | "read";
  attachments: SubmissionAttachmentItem[];
}

export async function getSubmissionForAdmin(id: string): Promise<SubmissionDetail | null> {
  const [row] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id)).limit(1);
  if (!row) return null;

  const attachments = await db
    .select({
      id: submissionAttachments.id,
      fileName: submissionAttachments.fileName,
      mimeType: submissionAttachments.mimeType,
      sizeBytes: submissionAttachments.sizeBytes,
    })
    .from(submissionAttachments)
    .where(eq(submissionAttachments.submissionId, id));

  return {
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    mode: row.mode,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    message: row.message,
    techPrimary: row.techPrimary ?? null,
    techExtra: row.techExtra ?? null,
    status: row.status,
    attachments,
  };
}

export async function markSubmissionRead(id: string): Promise<void> {
  await db.update(contactSubmissions).set({ status: "read" }).where(eq(contactSubmissions.id, id));
}

/** Deletes the submission row (cascades to attachment rows via FK) and
 * returns the storage paths so the caller can also delete the actual
 * files from disk. */
export async function deleteSubmission(id: string): Promise<string[]> {
  const attachments = await db
    .select({ storagePath: submissionAttachments.storagePath })
    .from(submissionAttachments)
    .where(eq(submissionAttachments.submissionId, id));

  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));

  return attachments.map((a) => a.storagePath);
}

export interface AttachmentForDownload {
  fileName: string;
  mimeType: string;
  storagePath: string;
}

export async function getAttachmentForDownload(id: string): Promise<AttachmentForDownload | null> {
  const [row] = await db
    .select({
      fileName: submissionAttachments.fileName,
      mimeType: submissionAttachments.mimeType,
      storagePath: submissionAttachments.storagePath,
    })
    .from(submissionAttachments)
    .where(eq(submissionAttachments.id, id))
    .limit(1);

  return row ?? null;
}
