import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { NextResponse } from "next/server";
import { Readable } from "node:stream";
import { getSession } from "@/lib/auth/dal";
import { getAttachmentForDownload } from "@/lib/repositories/submissions";
import { privateStorage } from "@/lib/storage";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  // proxy.ts already gates all of /api/admin/*, this is the real check.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const attachment = await getAttachmentForDownload(id);
  if (!attachment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const absolutePath = privateStorage.resolveAbsolutePath(attachment.storagePath);
  let size: number;
  try {
    size = (await stat(absolutePath)).size;
  } catch {
    return NextResponse.json({ error: "File missing on disk" }, { status: 404 });
  }

  const stream = Readable.toWeb(createReadStream(absolutePath)) as ReadableStream;
  const encodedName = encodeURIComponent(attachment.fileName);

  return new NextResponse(stream, {
    headers: {
      "Content-Type": attachment.mimeType,
      "Content-Length": String(size),
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedName}`,
    },
  });
}
