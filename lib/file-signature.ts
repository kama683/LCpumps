function bytesMatch(buffer: Buffer, offset: number, bytes: number[]): boolean {
  if (buffer.length < offset + bytes.length) return false;
  return bytes.every((byte, i) => buffer[offset + i] === byte);
}

const SIGNATURES: Record<string, (buffer: Buffer) => boolean> = {
  ".jpg": (buf) => bytesMatch(buf, 0, [0xff, 0xd8, 0xff]),
  ".jpeg": (buf) => bytesMatch(buf, 0, [0xff, 0xd8, 0xff]),
  ".png": (buf) => bytesMatch(buf, 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  ".webp": (buf) => bytesMatch(buf, 0, [0x52, 0x49, 0x46, 0x46]) && bytesMatch(buf, 8, [0x57, 0x45, 0x42, 0x50]),
  ".pdf": (buf) => bytesMatch(buf, 0, [0x25, 0x50, 0x44, 0x46]),
  // OLE2 compound file — legacy .doc/.xls share this container format.
  ".doc": (buf) => bytesMatch(buf, 0, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
  ".xls": (buf) => bytesMatch(buf, 0, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
  // OOXML — .docx/.xlsx are ZIP archives.
  ".docx": (buf) => bytesMatch(buf, 0, [0x50, 0x4b, 0x03, 0x04]),
  ".xlsx": (buf) => bytesMatch(buf, 0, [0x50, 0x4b, 0x03, 0x04]),
};

/** Best-effort magic-byte check, layered on top of the extension/MIME
 * allowlist already enforced at each call site. Extensions with no entry
 * here (e.g. .dwg — AutoCAD's version-tagged header varies too much across
 * releases to pin down safely) are treated as unverifiable and pass through
 * rather than risk rejecting a legitimate file. */
export function matchesFileSignature(buffer: Buffer, extension: string): boolean {
  const check = SIGNATURES[extension.toLowerCase()];
  if (!check) return true;
  return check(buffer);
}
