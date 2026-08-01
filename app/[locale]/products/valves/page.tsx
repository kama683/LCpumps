import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CategoryCatalogPage } from "@/components/catalog/CatalogPage";

// Catalog data is DB-backed and admin-editable at runtime.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CategoryPage" });
  return { title: t("valvesTitle") };
}

export default async function ProductsValvesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CategoryPage" });
  return (
    <CategoryCatalogPage
      category="valves"
      title={t("allPumpsTitle")}
      route="/products/valves"
      defaultPanelId="valves"
    />
  );
}
