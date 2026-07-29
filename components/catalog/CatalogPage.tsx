import { getLocale, getTranslations } from "next-intl/server";
import { CatalogPageShell } from "@/components/catalog/CatalogPageShell";
import {
  buildCatalogPanels,
  getSearchIndex,
} from "@/lib/catalog";
import type { ProductCategory } from "@/lib/types";

interface CatalogPageConfig {
  title: string;
  metadataTitle: string;
  categoryFilter: ProductCategory | null;
  route: string;
  defaultPanelId: string;
  searchPlaceholder: string;
  breadcrumb: { label: string; href?: string }[];
}

async function CatalogPageView({
  config,
}: {
  config: CatalogPageConfig;
}) {
  const locale = await getLocale();
  const [panels, searchIndex] = await Promise.all([
    buildCatalogPanels(config.categoryFilter, locale),
    getSearchIndex(config.categoryFilter, locale),
  ]);
  const defaultPanelId =
    panels.find((p) => p.id === config.defaultPanelId)?.id ??
    panels[0]?.id ??
    "wastewater-submersible";

  return (
    <CatalogPageShell
      title={config.title}
      panels={panels}
      searchIndex={searchIndex}
      currentRoute={config.route}
      defaultPanelId={defaultPanelId}
      searchPlaceholder={config.searchPlaceholder}
      breadcrumb={config.breadcrumb}
    />
  );
}

export async function PumpsCatalogPage() {
  const t = await getTranslations();

  return (
    <CatalogPageView
      config={{
        title: t("CategoryPage.allPumpsTitle"),
        metadataTitle: t("CategoryPage.allPumpsTitle"),
        categoryFilter: null,
        route: "/products",
        defaultPanelId: "wastewater-submersible",
        searchPlaceholder: t("CategoryPage.searchPlaceholderAll"),
        breadcrumb: [
          { label: t("Common.home"), href: "/" },
          { label: t("Common.products") },
        ],
      }}
    />
  );
}

export async function CategoryCatalogPage({
  category,
  title,
  route,
  defaultPanelId,
}: {
  category: ProductCategory;
  title: string;
  route: string;
  defaultPanelId: string;
}) {
  const t = await getTranslations();

  return (
    <CatalogPageView
      config={{
        title,
        metadataTitle: title,
        categoryFilter: category,
        route,
        defaultPanelId,
        searchPlaceholder: t("CategoryPage.searchPlaceholderCategory"),
        breadcrumb: [
          { label: t("Common.home"), href: "/" },
          { label: t("Common.products"), href: "/products" },
          { label: title },
        ],
      }}
    />
  );
}
