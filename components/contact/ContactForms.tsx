"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileUp,
  Settings2,
  Table2,
  Waypoints,
} from "lucide-react";
import { AccordionDetails } from "@/components/ui/Accordion";
import { IconBox } from "@/components/ui/IconBox";
import { PumpDimensionsTable } from "@/components/contact/PumpDimensionsTable";
import { submitContactAction, type ContactFormState } from "@/components/contact/actions";
import { CONTACT_ICONS } from "@/lib/contact-icons";
import { COMPANY_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ContactCardData } from "@/lib/types";

const FIELD =
  "contact-input w-full py-3.5 px-4 border border-border-mid rounded-md text-[15px] text-body bg-white placeholder:text-subtle focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(247,6,32,0.12)] transition-[border-color,box-shadow]";

const initialState: ContactFormState = { status: "idle" };

export function ContactForms() {
  const t = useTranslations("Contact.form");
  const [techOpen, setTechOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const techPanelId = useId();
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setSelectedFiles([]);
      setTechOpen(false);
    }
  }, [state]);

  const primaryTech: [string, string, string][] = [
    ["text", "model", t("primaryFields.model")],
    ["text", "flow", t("primaryFields.flow")],
    ["text", "head", t("primaryFields.head")],
    ["text", "power", t("primaryFields.power")],
    ["text", "speed", t("primaryFields.speed")],
    ["text", "efficiency", t("primaryFields.efficiency")],
    ["text", "temperature", t("primaryFields.temperature")],
    ["text", "inlet_diameter", t("primaryFields.inletDiameter")],
    ["text", "outlet_diameter", t("primaryFields.outletDiameter")],
    ["text", "pump_material", t("primaryFields.pumpMaterial")],
  ];

  const extraTech: [string, string, string][] = [
    ["text", "motor", t("extraFields.motor")],
    ["text", "voltage", t("extraFields.voltage")],
    ["text", "protection_level", t("extraFields.protectionLevel")],
    ["text", "cooling_method", t("extraFields.coolingMethod")],
    ["text", "motor_efficiency", t("extraFields.motorEfficiency")],
    ["text", "weight", t("extraFields.weight")],
  ];

  return (
    <>
      <section className="max-w-[var(--container-content)] mx-auto px-8 -mt-6 pb-16 relative z-[1]">
        <div className="max-w-[1160px] mx-auto bg-white border border-[#f2d8db] rounded-3xl shadow-contact p-8 tablet:p-12 tablet:px-14">
          <div className="mb-9 max-w-[640px]">
            <div className="text-xs font-bold tracking-[1.4px] uppercase text-primary mb-3">
              {t("eyebrow")}
            </div>
            <h2 className="display-heading font-heading font-bold text-[clamp(24px,2.8vw,32px)] text-heading leading-tight">
              {t("title")}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted mt-3">
              {t("intro")}
            </p>
          </div>

          <form ref={formRef} action={formAction} className="space-y-0">
            <input type="hidden" name="mode" value={techOpen ? "technical" : "basic"} />
            {/* Honeypot — hidden from real visitors, only bots that fill every
                field trip it. See submitContactAction in actions.ts. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto size-px overflow-hidden"
            />
            {/* Block 1 — contacts */}
            <FormSection title={t("contactDataSection")}>
              <FormRows
                fields={[
                  ["text", "name", t("fields.name")],
                  ["text", "company", t("fields.company")],
                  ["email", "email", t("fields.email")],
                  ["tel", "phone", t("fields.phone")],
                ]}
              />
            </FormSection>

            {/* Block 2 — message */}
            <FormSection title={t("messageSection")} last={!techOpen}>
              <textarea
                className={cn(FIELD, "min-h-[180px] resize-y")}
                name="message"
                placeholder={t("messagePlaceholder")}
                rows={6}
              />
            </FormSection>

            {/* Tech CTA — visible when closed */}
            {!techOpen && (
              <div className="mt-2 mb-8 rounded-2xl border border-[#f2d8db] bg-gradient-to-br from-surface to-surface-alt p-7 tablet:p-9">
                <div className="flex flex-col tablet:flex-row tablet:items-center gap-6">
                  <IconBox icon={Settings2} size="lg" className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-xl text-heading leading-snug">
                      {t("techCta.title")}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-muted mt-2 max-w-[560px]">
                      {t("techCta.description")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTechOpen(true)}
                    aria-expanded={false}
                    aria-controls={techPanelId}
                    className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-primary font-bold text-[15px] px-6 py-3.5 rounded-sm border border-[#eac5c9] cursor-pointer transition-[background,border-color,transform] duration-200 hover:border-primary hover:bg-[#fcf4f5] hover:-translate-y-0.5"
                  >
                    {t("techCta.button")}
                    <ChevronDown className="size-4" strokeWidth={2.25} aria-hidden />
                  </button>
                </div>
              </div>
            )}

            {/* Engineering section — progressive disclosure */}
            <div
              id={techPanelId}
              className={cn(
                "grid overflow-clip transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                techOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div
                className={cn(
                  "min-h-0 min-w-0",
                  techOpen
                    ? "overflow-visible"
                    : "overflow-clip [content-visibility:hidden]"
                )}
              >
                <div className="pb-2 pt-1">
                  <div className="flex items-start justify-between gap-4 mb-7 pb-6 border-b border-[#f0e2e4]">
                    <div>
                      <div className="text-xs font-bold tracking-[1.4px] uppercase text-primary mb-2">
                        {t("engineering.eyebrow")}
                      </div>
                      <h3 className="font-heading font-bold text-[clamp(20px,2.2vw,26px)] text-heading">
                        {t("engineering.title")}
                      </h3>
                      <p className="text-[14px] text-muted mt-2 leading-relaxed">
                        {t("engineering.description")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTechOpen(false)}
                      aria-expanded={true}
                      aria-controls={techPanelId}
                      className="shrink-0 text-sm font-semibold text-muted hover:text-primary cursor-pointer bg-transparent border-none px-2 py-1"
                    >
                      {t("engineering.collapse")}
                    </button>
                  </div>

                  <FormSection title={t("primaryParams")} bordered={false}>
                    <FormRows fields={primaryTech} />
                  </FormSection>

                  <AccordionDetails title={t("extraParams")} className="mt-2 mb-8">
                    <FormRows fields={extraTech} />
                  </AccordionDetails>

                  {/* Engineering parameter table */}
                  <div className="rounded-2xl border border-[#f2d8db] bg-surface overflow-hidden">
                    <div className="px-7 pt-7 pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <IconBox icon={Table2} size="sm" />
                        <span className="text-xs font-bold tracking-[1.2px] uppercase text-primary">
                          {t("paramsTable.eyebrow")}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-lg text-heading">
                        {t("paramsTable.title")}
                      </h4>
                      <p className="text-[14px] leading-relaxed text-muted mt-2 max-w-[640px]">
                        {t("paramsTable.description")}
                      </p>
                    </div>
                    <div className="mx-7 mb-7">
                      <PumpDimensionsTable />
                    </div>
                  </div>

                  {/* Pump scheme */}
                  <div className="rounded-2xl border border-[#f2d8db] bg-surface overflow-hidden mt-5">
                    <div className="px-7 pt-7 pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <IconBox icon={Waypoints} size="sm" />
                        <span className="text-xs font-bold tracking-[1.2px] uppercase text-primary">
                          {t("scheme.eyebrow")}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-lg text-heading">
                        {t("scheme.title")}
                      </h4>
                      <p className="text-[14px] leading-relaxed text-muted mt-2 max-w-[640px]">
                        {t("scheme.description")}
                      </p>
                    </div>
                    <div className="mx-7 mb-7 rounded-xl border border-[#e8cfd2] bg-white p-4">
                      <div className="relative w-full aspect-[1920/816]">
                        <Image
                          src="/assets/plan.png"
                          alt={t("scheme.alt")}
                          fill
                          className="object-contain"
                          sizes="(min-width: 1024px) 900px, 100vw"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload */}
                  <div
                    className={cn(
                      "mt-8 rounded-2xl border-2 border-dashed border-[#ecd0d3] bg-surface px-8 py-12 text-center transition-[border-color,background,box-shadow] duration-200",
                      dragOver &&
                        "border-primary bg-[#fbeeef] shadow-[0_0_0_4px_rgba(247,6,32,0.1)]"
                    )}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const files = e.dataTransfer.files;
                      if (files.length && fileInputRef.current) {
                        fileInputRef.current.files = files;
                        setSelectedFiles(Array.from(files).map((f) => f.name));
                      }
                    }}
                  >
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white border border-[#f2d8db] text-primary mb-5 transition-transform duration-200">
                      {selectedFiles.length > 0 ? (
                        <CheckCircle2
                          className="size-7 animate-contact-fade-in text-success"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      ) : (
                        <FileUp className="size-7" strokeWidth={1.75} aria-hidden />
                      )}
                    </div>
                    <div className="font-heading font-bold text-lg text-heading">
                      {t("upload.title")}
                    </div>
                    <p className="text-[15px] text-muted mt-2">
                      {t("upload.or")}{" "}
                      <label className="text-primary font-semibold cursor-pointer hover:text-primary-dark underline-offset-2 hover:underline">
                        {t("upload.chooseFile")}
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="attachments"
                          multiple
                          className="sr-only"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.png,.jpg,.jpeg"
                          onChange={(e) =>
                            setSelectedFiles(
                              Array.from(e.target.files ?? []).map((f) => f.name)
                            )
                          }
                        />
                      </label>
                    </p>
                    <p className="text-[13px] text-subtle mt-4">
                      {t("upload.hint")}
                    </p>
                    {selectedFiles.length > 0 && (
                      <ul className="animate-contact-fade-in mt-5 flex flex-wrap justify-center gap-2">
                        {selectedFiles.map((name) => (
                          <li
                            key={name}
                            className="inline-flex items-center gap-1.5 rounded-pill bg-white border border-[#f2d8db] px-3.5 py-1.5 text-[13px] font-semibold text-body"
                          >
                            <CheckCircle2
                              className="size-3.5 shrink-0 text-success"
                              strokeWidth={2}
                              aria-hidden
                            />
                            {name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {state.status === "success" && (
              <p className="mb-4 flex items-center justify-center gap-2 rounded-md bg-[#eef8f0] px-4 py-3 text-sm font-semibold text-success">
                <CheckCircle2 className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
                {t("success")}
              </p>
            )}
            {state.status === "error" && (
              <p className="mb-4 flex items-center justify-center gap-2 rounded-md bg-[#fdeeee] px-4 py-3 text-sm font-semibold text-error">
                <AlertCircle className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
                {t(`errors.${state.errorCode ?? "unknown"}`, { detail: state.errorDetail ?? "" })}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full mt-2 bg-primary text-white font-bold text-base py-4.5 rounded-sm border-none cursor-pointer shadow-btn transition-[background,transform] duration-200 hover:bg-primary-dark hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {pending ? t("submitting") : t("submit")}
            </button>
            <p className="text-[13px] text-subtle text-center mt-4 leading-snug">
              {t("submitHint")}
            </p>
          </form>
        </div>
      </section>

      <DirectContacts />
    </>
  );
}

function DirectContacts() {
  const t = useTranslations("Contact.direct");

  return (
    <section className="max-w-[var(--container-content)] mx-auto px-8 pb-20">
      <div className="text-center max-w-[560px] mx-auto mb-9">
        <h2 className="font-heading font-bold text-[clamp(24px,2.8vw,32px)] text-heading">
          {t("title")}
        </h2>
        <p className="text-base text-muted mt-3 leading-relaxed">
          {t("description")}
        </p>
      </div>
      <div className="grid grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-4 gap-4 max-mobile:grid-cols-1">
        <ContactInfoCard
          icon="office"
          label={t("address.label")}
          html={`<strong>${COMPANY_NAME}</strong><br>${t("address.value")}`}
        />
        <ContactInfoCard
          icon="email"
          label={t("email.label")}
          html='<a href="mailto:lcpumpskz@gmail.com">lcpumpskz@gmail.com</a>'
        />
        <ContactInfoCard
          icon="phone"
          label={t("phone.label")}
          html="<strong>+7 771 778 68 77</strong>"
        />
        <ContactInfoCard
          icon="clock"
          label={t("hours.label")}
          html={`${t("hours.value")}<br><span style="font-size:13px;color:#9aa5ac">${t("hours.timezoneNote")}</span>`}
        />
      </div>
    </section>
  );
}

function FormSection({
  title,
  children,
  last,
  bordered = true,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
  bordered?: boolean;
}) {
  return (
    <div
      className={cn(
        bordered && "mb-8 pb-8 border-b border-[#f0e2e4]",
        last && "mb-6",
        !bordered && "mb-6"
      )}
    >
      <div className="font-bold text-base text-heading mb-4.5">{title}</div>
      {children}
    </div>
  );
}

function FormRows({ fields }: { fields: [string, string, string][] }) {
  const rows: [string, string, string][][] = [];
  for (let i = 0; i < fields.length; i += 2) {
    rows.push(fields.slice(i, i + 2));
  }

  return (
    <>
      {rows.map((row, index) => (
        <div
          key={index}
          className={cn(
            "grid grid-cols-1 tablet:grid-cols-2 gap-4",
            index < rows.length - 1 && "mb-4"
          )}
        >
          {row.map(([type, name, placeholder]) => (
            <input
              key={name}
              className={FIELD}
              type={type}
              name={name}
              placeholder={placeholder}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function ContactInfoCard({
  icon,
  label,
  html,
}: {
  icon: ContactCardData["icon"];
  label: string;
  html: string;
}) {
  const Icon = CONTACT_ICONS[icon];

  return (
    <div className="bg-white border border-border-light rounded-2xl p-6 min-h-[148px] flex flex-col hover:shadow-card-sm hover:-translate-y-0.5 hover:border-[#f2d8db] transition-all">
      <IconBox icon={Icon} size="sm" className="mb-4" />
      <div className="text-xs font-bold tracking-wide uppercase text-primary mb-2">
        {label}
      </div>
      <div
        className="text-[15px] leading-relaxed text-muted [&_strong]:text-heading [&_strong]:font-bold [&_a]:font-semibold"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
