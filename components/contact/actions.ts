"use server";

import { randomUUID } from "node:crypto";
import { createSubmission, type NewAttachmentInput } from "@/lib/repositories/submissions";
import { privateStorage } from "@/lib/storage";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { matchesFileSignature } from "@/lib/file-signature";

const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx", ".xls", ".xlsx", ".dwg", ".png", ".jpg", ".jpeg"]);
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_TOTAL_SIZE = 40 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fixed-window per-IP cap: real customers submit this form once in a while,
// not repeatedly, so this only needs to stop scripted flooding.
const RATE_LIMIT_MAX_SUBMISSIONS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const PRIMARY_TECH_KEYS = [
  "model",
  "flow",
  "head",
  "power",
  "speed",
  "efficiency",
  "temperature",
  "inlet_diameter",
  "outlet_diameter",
  "pump_material",
];

const EXTRA_TECH_KEYS = ["motor", "voltage", "protection_level", "cooling_method", "motor_efficiency", "weight"];

export interface ContactFormState {
  status: "idle" | "success" | "error";
  errorCode?:
    | "missingFields"
    | "invalidEmail"
    | "invalidFileType"
    | "fileTooLarge"
    | "totalSizeExceeded"
    | "rateLimited"
    | "unknown";
  errorDetail?: string;
}

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx === -1 ? "" : filename.slice(idx).toLowerCase();
}

function collectTechFields(formData: FormData, keys: string[]): Record<string, string> {
  const entries = keys
    .map((key) => [key, String(formData.get(key) ?? "").trim()] as const)
    .filter(([, value]) => value.length > 0);
  return Object.fromEntries(entries);
}

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: a real visitor never sees or fills this field (hidden via CSS
  // in ContactForms.tsx). Bots that fill every input trip it — pretend
  // success without persisting anything so they don't retry with a fix.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { status: "success" };
  }

  const ip = await getClientIp();
  if (!checkRateLimit(`contact:${ip}`, RATE_LIMIT_MAX_SUBMISSIONS, RATE_LIMIT_WINDOW_MS)) {
    return { status: "error", errorCode: "rateLimited" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const mode = String(formData.get("mode") ?? "basic") === "technical" ? "technical" : "basic";

  if (!name || !email) {
    return { status: "error", errorCode: "missingFields" };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", errorCode: "invalidEmail" };
  }

  const techPrimary = mode === "technical" ? collectTechFields(formData, PRIMARY_TECH_KEYS) : null;
  const techExtra = mode === "technical" ? collectTechFields(formData, EXTRA_TECH_KEYS) : null;

  const files = formData.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);

  const fileBuffers = new Map<File, Buffer>();
  let totalSize = 0;
  for (const file of files) {
    totalSize += file.size;
    const extension = getExtension(file.name);
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return { status: "error", errorCode: "invalidFileType", errorDetail: file.name };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { status: "error", errorCode: "fileTooLarge", errorDetail: file.name };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!matchesFileSignature(buffer, extension)) {
      return { status: "error", errorCode: "invalidFileType", errorDetail: file.name };
    }
    fileBuffers.set(file, buffer);
  }
  if (totalSize > MAX_TOTAL_SIZE) {
    return { status: "error", errorCode: "totalSizeExceeded" };
  }

  try {
    const attachmentInputs: NewAttachmentInput[] = [];
    for (const file of files) {
      const buffer = fileBuffers.get(file)!;
      const storageName = `${randomUUID()}${getExtension(file.name)}`;
      const saved = await privateStorage.save(buffer, "attachments", storageName);
      attachmentInputs.push({
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: file.size,
        storagePath: saved.path,
      });
    }

    await createSubmission(
      {
        mode,
        name,
        company,
        email,
        phone,
        message,
        techPrimary: techPrimary && Object.keys(techPrimary).length > 0 ? techPrimary : null,
        techExtra: techExtra && Object.keys(techExtra).length > 0 ? techExtra : null,
      },
      attachmentInputs
    );

    return { status: "success" };
  } catch (err) {
    console.error("submitContactAction failed:", err);
    return { status: "error", errorCode: "unknown" };
  }
}
