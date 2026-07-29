"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteSubmissionAction } from "@/app/admin/(protected)/requests/actions";

export function DeleteRequestButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("Удалить заявку? Это необратимо.")) return;
    startTransition(async () => {
      const result = await deleteSubmissionAction(id);
      if (!result.error) router.push("/admin/requests");
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm border border-border-mid bg-white px-3.5 py-2 text-[13px] font-bold text-muted transition-colors hover:border-error hover:text-error disabled:cursor-default disabled:opacity-60"
    >
      <Trash2 className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
      {pending ? "Удаление…" : "Удалить заявку"}
    </button>
  );
}
