import { Download, FileText } from "lucide-react";
import type { SubmissionAttachmentItem } from "@/lib/repositories/submissions";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentRow({ attachment }: { attachment: SubmissionAttachmentItem }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border-mid bg-white px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-primary">
          <FileText className="size-4" strokeWidth={2} aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-body">{attachment.fileName}</div>
          <div className="text-xs text-subtle">{formatSize(attachment.sizeBytes)}</div>
        </div>
      </div>

      <a
        href={`/api/admin/attachments/${attachment.id}`}
        download={attachment.fileName}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-border-mid bg-white px-3.5 py-2 text-[13px] font-bold text-body no-underline transition-colors hover:border-primary hover:text-primary"
      >
        <Download className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
        Скачать
      </a>
    </div>
  );
}
