import { Inbox } from "lucide-react";
import { RequestCard } from "@/components/admin/RequestCard";
import { listSubmissionsForAdmin } from "@/lib/repositories/submissions";

export default async function AdminRequestsPage() {
  const submissions = await listSubmissionsForAdmin();

  return (
    <div>
      <h1 className="font-heading text-[28px] font-bold text-heading">Заявки</h1>
      <p className="mt-2 text-muted">
        Все заявки, отправленные через форму на странице «Контакты».
      </p>

      {submissions.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border-mid bg-white py-16 text-center">
          <Inbox className="size-8 text-subtle" strokeWidth={1.5} aria-hidden />
          <p className="mt-3 text-muted">Пока нет ни одной заявки.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 max-tablet:grid-cols-1 tablet:grid-cols-2">
          {submissions.map((submission) => (
            <RequestCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </div>
  );
}
