import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Headphones } from "lucide-react";
import { getCompanyParagraphs } from "@/lib/catalog-helpers";
import { Button } from "@/components/ui/Button";
import { HeroBgImage } from "@/components/ui/HeroBgImage";
import { IconBox } from "@/components/ui/IconBox";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PageMetadata.services" });
  return { title: t("title"), description: t("description") };
}

export default function ServicesPage() {
  const t = useTranslations();
  const servicePara =
    getCompanyParagraphs().find((p) => /филиалов/i.test(p)) ?? "";

  return (
    <>
      <section className="relative bg-gradient-to-b from-surface to-white overflow-hidden">
        <HeroBgImage variant="page" />
        <PageContainer className="relative z-10 py-14 pb-6">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: t("Services.label") }]}
          />
          <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-primary mt-6">
            {t("Services.label")}
          </div>
          <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] text-heading mt-2.5 leading-tight">
            {t("Services.title")}
          </h1>
        </PageContainer>
      </section>
      <PageContainer className="py-6 pb-20">
        <IconBox icon={Headphones} size="md" className="mb-6" />
        <p className="text-base leading-relaxed text-muted max-w-[720px]">{servicePara}</p>
        <Button href="/contact" className="mt-6" arrow>
          {t("Services.button")}
        </Button>
      </PageContainer>
    </>
  );
}
