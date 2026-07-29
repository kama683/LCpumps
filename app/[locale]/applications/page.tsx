import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import {
  Building2,
  Factory,
  FolderKanban,
  Layers,
} from "lucide-react";
import { getApplicationsCards } from "@/data/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconBox } from "@/components/ui/IconBox";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";
import { getCompanyParagraphs } from "@/lib/catalog-helpers";

export const metadata: Metadata = {
  title: "Применения",
};

export default function ApplicationsPage() {
  const t = useTranslations();
  const cards = getApplicationsCards();
  const intro = getCompanyParagraphs()[2] ?? "";
  const cardIcons = [Layers, Building2, Factory, FolderKanban] as const;

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white">
        <PageContainer className="py-14 pb-6">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: t("Applications.breadcrumbLabel") }]}
          />
          <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-primary mt-6">
            {t("Applications.breadcrumbLabel")}
          </div>
          <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] text-heading mt-2.5 leading-tight">
            {t("Applications.title")}
          </h1>
          <p className="text-base leading-relaxed text-muted mt-5 max-w-[880px]">
            {intro}
          </p>
        </PageContainer>
      </section>
      <PageContainer className="py-8 pb-20">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div key={card.title} className="card border border-border rounded-xl p-7">
              <IconBox
                icon={cardIcons[index] ?? Layers}
                size="sm"
                className="mb-4"
              />
              <h3 className="font-heading font-bold text-xl text-body">
                {card.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-light mt-3">
                {card.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ArrowLink href="/applications/water-wastewater">
            {t("Applications.waterWastewaterLink")}
          </ArrowLink>
        </div>
      </PageContainer>
    </>
  );
}
