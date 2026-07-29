import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Droplets, Waves } from "lucide-react";
import { getCompanyParagraphs } from "@/lib/catalog-helpers";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconBox } from "@/components/ui/IconBox";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";

export const metadata: Metadata = {
  title: "Водоснабжение и сточные воды",
};

export default function WaterWastewaterPage() {
  const t = useTranslations();
  const company = getCompanyParagraphs();
  const text =
    company.find((p) => /сточн|водоснабж/i.test(p)) ?? company[2] ?? "";

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white">
        <PageContainer className="py-14 pb-6">
          <Breadcrumb
            items={[
              { label: t("Common.home"), href: "/" },
              { label: t("Applications.breadcrumbLabel"), href: "/applications" },
              { label: t("Applications.waterWastewaterLink") },
            ]}
          />
          <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] text-heading mt-6 leading-tight">
            {t("Applications.waterWastewaterLink")}
          </h1>
        </PageContainer>
      </section>
      <PageContainer className="py-6 pb-20">
        <p className="text-base leading-relaxed text-muted">{text}</p>
        <div className="mt-8 flex gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <IconBox icon={Droplets} size="sm" />
            <ArrowLink href="/products/water">{t("Applications.waterEquipmentLink")}</ArrowLink>
          </div>
          <div className="flex items-center gap-3">
            <IconBox icon={Waves} size="sm" />
            <ArrowLink href="/products#wastewater">{t("Applications.wastewaterPumpsLink")}</ArrowLink>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
