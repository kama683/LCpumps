"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { CatalogLayout } from "@/components/catalog/CatalogLayout";
import { CatalogPanelProvider, useCatalogPanel } from "@/components/catalog/CatalogPanelContext";
import { CategoryHeroImage } from "@/components/catalog/CategoryHeroImage";
import { FloatingContactButton } from "@/components/ui/FloatingContactButton";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";
import { getCatalogIntro } from "@/lib/catalog-helpers";
import type { CatalogPanel, SearchIndexItem } from "@/lib/types";

interface CatalogPageShellProps {
  title: string;
  intro?: string;
  panels: CatalogPanel[];
  searchIndex: SearchIndexItem[];
  currentRoute: string;
  defaultPanelId: string;
  searchPlaceholder: string;
  breadcrumb: { label: string; href?: string }[];
}

function CatalogPageHeader({
  title,
  intro,
  panels,
  breadcrumb,
}: {
  title: string;
  intro: string;
  panels: CatalogPanel[];
  breadcrumb: { label: string; href?: string }[];
}) {
  const { activePanel } = useCatalogPanel();
  const activePanelData = panels.find((panel) => panel.id === activePanel);
  const firstProductSlug = activePanelData?.section.products[0]?.slug;
  const heading = activePanelData?.title ?? title;

  return (
    <PageContainer className="pt-12">
      <div className="relative w-full min-h-100 rounded-2xl overflow-hidden flex flex-col justify-center px-6 py-10 tablet:px-12">
        <CategoryHeroImage
          panelId={activePanel}
          fallbackProductSlug={firstProductSlug}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10">
          <Breadcrumb items={breadcrumb} light />
          <h1 className="display-heading font-heading font-bold text-[clamp(32px,4.2vw,44px)] text-white mt-6 leading-tight">
            {heading}
          </h1>
          <p className="text-[17px] leading-relaxed text-white/85 mt-4.5 max-w-[880px]">
            {intro}
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export function CatalogPageShell({
  title,
  intro,
  panels,
  searchIndex,
  currentRoute,
  defaultPanelId,
  searchPlaceholder,
  breadcrumb,
}: CatalogPageShellProps) {
  const locale = useLocale();
  const panelIds = useMemo(() => panels.map((panel) => panel.id), [panels]);
  const resolvedIntro = intro ?? getCatalogIntro(locale);

  return (
    <CatalogPanelProvider defaultPanelId={defaultPanelId} panelIds={panelIds}>
      <CatalogPageHeader
        title={title}
        intro={resolvedIntro}
        panels={panels}
        breadcrumb={breadcrumb}
      />
      <PageContainer className="py-10 pb-20">
        <CatalogLayout
          panels={panels}
          searchIndex={searchIndex}
          currentRoute={currentRoute}
          searchPlaceholder={searchPlaceholder}
        />
      </PageContainer>
      <FloatingContactButton />
    </CatalogPanelProvider>
  );
}
