import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Mail, MessageSquare, Paperclip, Settings2, User } from "lucide-react";
import { AttachmentRow } from "@/components/admin/AttachmentRow";
import { DeleteRequestButton } from "@/components/admin/DeleteRequestButton";
import { getSubmissionForAdmin, markSubmissionRead } from "@/lib/repositories/submissions";

const PRIMARY_LABELS: Record<string, string> = {
  model: "Модель",
  flow: "Расход (м³/ч)",
  head: "Напор (м)",
  power: "Мощность (кВт)",
  speed: "Частота вращения (об/мин)",
  efficiency: "КПД (%)",
  temperature: "Рабочая температура (°C)",
  inlet_diameter: "Диаметр всасывания (мм)",
  outlet_diameter: "Диаметр нагнетания (мм)",
  pump_material: "Материал насоса",
};

const EXTRA_LABELS: Record<string, string> = {
  motor: "Двигатель",
  voltage: "Напряжение (В)",
  protection_level: "Степень защиты",
  cooling_method: "Способ охлаждения",
  motor_efficiency: "КПД двигателя (%)",
  weight: "Масса (кг)",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <Icon className="size-4.5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
        <h2 className="font-heading text-base font-bold text-heading">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-subtle">{label}</div>
      <div className="mt-1 text-sm text-body">{value || "—"}</div>
    </div>
  );
}

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminRequestDetailPage({ params }: RequestDetailPageProps) {
  const { id } = await params;
  const submission = await getSubmissionForAdmin(id);
  if (!submission) notFound();

  if (submission.status === "new") {
    // Plain repository call, not the "use server" action — revalidatePath
    // can only run inside an actual Server Action invocation, not during a
    // Server Component's render. This page already reads fresh data on
    // every request, so no cache invalidation is needed here anyway.
    await markSubmissionRead(id);
  }

  const primaryEntries = Object.entries(submission.techPrimary ?? {});
  const extraEntries = Object.entries(submission.techExtra ?? {});
  const hasTech = submission.mode === "technical";

  return (
    <div>
      <Link
        href="/admin/requests"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary no-underline"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
        Назад к заявкам
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-[26px] font-bold text-heading">
          {submission.name || "Без имени"}
        </h1>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-pill-blue-bg px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            <Clock className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
            {formatDate(submission.createdAt)}
          </span>
          <DeleteRequestButton id={submission.id} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 tablet:grid-cols-2">
        <Section icon={User} title="Личные данные">
          <div className="grid grid-cols-1 gap-4 mobile:grid-cols-2">
            <Field label="Имя" value={submission.name} />
            <Field label="Компания" value={submission.company} />
          </div>
        </Section>

        <Section icon={Mail} title="Контактная информация">
          <div className="grid grid-cols-1 gap-4 mobile:grid-cols-2">
            <Field label="Email" value={submission.email} />
            <Field label="Телефон" value={submission.phone} />
          </div>
        </Section>
      </div>

      <div className="mt-5">
        <Section icon={MessageSquare} title="Сообщение">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-body">
            {submission.message || "—"}
          </p>
        </Section>
      </div>

      {hasTech && (
        <div className="mt-5">
          <Section icon={Settings2} title="Технические характеристики">
            {primaryEntries.length === 0 && extraEntries.length === 0 ? (
              <p className="text-sm text-muted">Не заполнены.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 mobile:grid-cols-2 tablet:grid-cols-3">
                {primaryEntries.map(([key, value]) => (
                  <Field key={key} label={PRIMARY_LABELS[key] ?? key} value={value} />
                ))}
                {extraEntries.map(([key, value]) => (
                  <Field key={key} label={EXTRA_LABELS[key] ?? key} value={value} />
                ))}
              </div>
            )}
          </Section>
        </div>
      )}

      <div className="mt-5">
        <Section icon={Paperclip} title={`Вложения (${submission.attachments.length})`}>
          {submission.attachments.length === 0 ? (
            <p className="text-sm text-muted">Файлы не прикреплены.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {submission.attachments.map((attachment) => (
                <AttachmentRow key={attachment.id} attachment={attachment} />
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
