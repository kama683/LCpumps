import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PumpsCatalogPage } from "@/components/catalog/CatalogPage";

// Catalog data is DB-backed and admin-editable at runtime.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CategoryPage" });
  return { title: t("allPumpsTitle") };
}

export default function ProductsPage() {
  return <PumpsCatalogPage />;
}
