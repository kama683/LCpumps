import Link from "next/link";
import { Building2, Mail, Paperclip, Phone } from "lucide-react";
import type { SubmissionListItem } from "@/lib/repositories/submissions";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function RequestCard({ submission }: { submission: SubmissionListItem }) {
  return (
    <Link
      href={`/admin/requests/${submission.id}`}
      className="group relative block rounded-2xl border border-border bg-white p-5 no-underline transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#f2d8db] hover:shadow-card-sm"
    >
      {submission.status === "new" && (
        <span
          className="absolute right-4 top-4 size-2.5 rounded-full bg-primary"
          aria-hidden
        />
      )}

      <div className="flex items-start justify-between gap-3 pr-6">
        <div className="min-w-0">
          <div className="truncate font-heading text-base font-bold text-heading">
            {submission.name || "—"}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-muted">
            <Building2 className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
            {submission.company || "—"}
          </div>
        </div>
        <span className="shrink-0 rounded-pill bg-surface-alt px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
          {submission.mode === "technical" ? "Техническая" : "Обычная"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Mail className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {submission.email || "—"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Phone className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {submission.phone || "—"}
        </span>
        {submission.attachmentCount > 0 && (
          <span className="inline-flex items-center gap-1.5">
            <Paperclip className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
            {submission.attachmentCount}
          </span>
        )}
      </div>

      <div className="mt-3 text-[12px] text-subtle">{formatDate(submission.createdAt)}</div>
    </Link>
  );
}
