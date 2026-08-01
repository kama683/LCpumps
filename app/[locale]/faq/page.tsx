import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getFaqItems } from "@/data/content";
import { AccordionItem } from "@/components/ui/Accordion";
import { HeroBgImage } from "@/components/ui/HeroBgImage";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PageMetadata.faq" });
  return { title: t("title"), description: t("description") };
}

export default function FaqPage() {
  const t = useTranslations();
  const items = getFaqItems();

  return (
    <>
      <section className="relative bg-gradient-to-b from-surface to-white overflow-hidden">
        <HeroBgImage variant="page" />
        <PageContainer className="relative z-10 py-14 pb-6">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: "FAQ" }]}
          />
          <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-primary mt-6">
            FAQ
          </div>
          <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] text-heading mt-2.5 leading-tight">
            {t("Faq.title")}
          </h1>
        </PageContainer>
      </section>
      <PageContainer narrow className="py-6 pb-20">
        {items.map((item) => (
          <AccordionItem key={item.question} title={item.question}>
            <p>{item.answer}</p>
          </AccordionItem>
        ))}
      </PageContainer>
    </>
  );
}
