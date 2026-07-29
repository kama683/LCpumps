import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForms } from "@/components/contact/ContactForms";
import { AccordionItem } from "@/components/ui/Accordion";
import { HeroBgImage } from "@/components/ui/HeroBgImage";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";
import { getFaqItems } from "@/data/content";

export const metadata: Metadata = {
  title: "Контакты",
};

export default function ContactPage() {
  const t = useTranslations();
  const faqItems = getFaqItems().slice(0, 3);

  return (
    <>
      <section className="relative bg-surface overflow-hidden border-b border-[#f7eeef]">
        <HeroBgImage variant="contact" />
        <PageContainer className="relative z-10 py-10 pb-24">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: t("Nav.contacts") }]}
          />
          <div className="max-w-[640px] mt-6">
            <div className="inline-block text-xs font-bold tracking-[1.4px] uppercase text-primary bg-white border border-[#f7e3e5] px-4.5 py-2.5 rounded-pill mb-6">
              {t("Nav.contacts")}
            </div>
            <h1 className="font-heading font-bold text-[clamp(36px,4.5vw,52px)] text-heading leading-tight">
              {t("ContactPage.title")}
            </h1>
            <div className="inline-flex items-center gap-2 rounded-pill bg-primary px-4.5 py-2.5 mt-5 text-sm font-bold text-white shadow-btn">
              <Clock className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
              {t("ContactPage.responseTime")}
            </div>
            <p className="text-lg leading-relaxed text-muted mt-5">
              {t("ContactPage.intro")}
            </p>
          </div>
        </PageContainer>
      </section>

      <ContactForms />

      <PageContainer narrow className="pb-24">
        <h2 className="font-heading font-bold text-[clamp(26px,3vw,34px)] text-heading text-center mb-3">
          {t("Faq.title")}
        </h2>
        <p className="text-center text-base text-muted mb-9">
          {t("ContactPage.faqIntro")}
        </p>
        <div className="contact-faq">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} title={item.question}>
              <p>{item.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
