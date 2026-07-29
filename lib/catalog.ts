import { unstable_cache } from "next/cache";
import { CATALOG_NAV, CATEGORY_ANCHORS } from "@/lib/site";
import * as productsRepo from "@/lib/repositories/products";
import * as sectionsRepo from "@/lib/repositories/sections";
import type {
  CatalogPanel,
  CatalogSection,
  ProductCategory,
  ProductDetail,
  SearchIndexItem,
} from "@/lib/types";

// Pure/sync helpers live in lib/catalog-helpers.ts (no DB import) so Client
// Components can import them without pulling `pg` into the browser bundle.
// Re-exported here for Server Components that already import from
// "@/lib/catalog" — this file is server-only from this point on.
import { getCatalogIntro } from "@/lib/catalog-helpers";
export { getCompanyParagraphs, getCatalogIntro, parseSpecRow, hasModelCode } from "@/lib/catalog-helpers";

// ---- Cached DB reads ---------------------------------------------------
//
// Data Cache entries tagged "catalog", invalidated by revalidateTag from
// every product/section Server Action. Rendering itself is still dynamic
// (see `export const dynamic = "force-dynamic"` on the pages that use
// these) — caching here only avoids a Postgres round-trip on every
// request, it doesn't make the route static.

const getCachedProducts = unstable_cache(
  async (locale: string) => productsRepo.getAllProductsPublic(locale as never),
  ["catalog-products"],
  { tags: ["catalog"] }
);

const getCachedSections = unstable_cache(
  async (locale: string) => sectionsRepo.listSectionsForCatalog(locale as never),
  ["catalog-sections"],
  { tags: ["catalog"] }
);

export async function getAllProducts(locale: string = "ru"): Promise<ProductDetail[]> {
  return getCachedProducts(locale);
}

export async function getProductBySlug(
  slug: string,
  locale: string = "ru"
): Promise<ProductDetail | undefined> {
  const products = await getCachedProducts(locale);
  return products.find((p) => p.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  return productsRepo.listAllSlugs();
}

export async function getProductsBySlugs(slugs: string[], locale: string = "ru"): Promise<ProductDetail[]> {
  const products = await getCachedProducts(locale);
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return slugs.map((slug) => bySlug.get(slug)).filter((p): p is ProductDetail => Boolean(p));
}

export async function getWaterProducts(locale: string = "ru"): Promise<ProductDetail[]> {
  const products = await getCachedProducts(locale);
  return products.filter((p) => p.category === "water");
}

export async function getProjectEquipmentProducts(
  equipmentType: "building" | "industrial",
  limit = 3,
  locale: string = "ru"
): Promise<ProductDetail[]> {
  // Matched against `section`/`code`, which stay RU-canonical regardless of
  // locale (see lib/repositories/products.ts), so this works the same
  // regardless of display locale.
  const products = await getCachedProducts(locale);

  const matched =
    equipmentType === "building"
      ? products.filter(
          (p) =>
            p.section.includes("пожар") ||
            p.section.includes("ПОЖАРНЫЙ") ||
            p.code.toUpperCase().startsWith("XBD")
        )
      : products.filter(
          (p) =>
            p.category === "pumps" &&
            (p.section.includes("ЦЕНТРОБЕЖНЫЙ") || p.section.includes("ОДНОСТОРОННИМ"))
        );

  return matched.slice(0, limit);
}

/** Groups products into their CATALOG_NAV sections (by the real `sectionId`
 * FK) plus a fallback grouping by category (CATEGORY_ANCHORS) — mirrors the
 * pre-DB version's two grouping passes, minus the free-text section-title
 * matching that real foreign keys make unnecessary now. */
function mergedCatalogSections(
  products: ProductDetail[],
  sections: CatalogSection[]
): Record<string, CatalogSection> {
  const merged: Record<string, CatalogSection> = {};
  const navIds = new Set(CATALOG_NAV.map((n) => n.id));

  for (const section of sections) {
    if (!navIds.has(section.id)) continue;
    merged[section.id] = {
      id: section.id,
      title: section.title,
      products: [],
      paragraphs: section.paragraphs ?? [],
      project_list: section.project_list ?? [],
      bullets: section.bullets,
    };
  }

  for (const p of products) {
    if (!p.sectionId || !merged[p.sectionId]) continue;
    merged[p.sectionId].products.push({
      code: p.code,
      name: p.name,
      slug: p.slug,
      hasModelCode: p.hasModelCode,
    });
  }

  for (const [cat, anchorId] of Object.entries(CATEGORY_ANCHORS)) {
    if (!merged[anchorId]) {
      merged[anchorId] = {
        id: anchorId,
        title: CATALOG_NAV.find((n) => n.id === anchorId)?.title ?? anchorId,
        products: [],
        paragraphs: [],
        project_list: [],
      };
    }
    const seen = new Set(merged[anchorId].products.map((x) => x.slug));
    for (const p of products) {
      if (p.category === cat && !seen.has(p.slug)) {
        merged[anchorId].products.push({
          code: p.code,
          name: p.name,
          slug: p.slug,
          hasModelCode: p.hasModelCode,
        });
        seen.add(p.slug);
      }
    }
  }

  return merged;
}

export async function buildCatalogPanels(
  categoryFilter: ProductCategory | null,
  locale: string = "ru"
): Promise<CatalogPanel[]> {
  const [products, sections] = await Promise.all([getCachedProducts(locale), getCachedSections(locale)]);
  const merged = mergedCatalogSections(products, sections);

  const navItems = categoryFilter
    ? CATALOG_NAV.filter((n) => n.category === categoryFilter)
    : CATALOG_NAV.filter((n) => n.category === "pumps");

  return navItems.map((nav) => ({
    ...nav,
    section: merged[nav.id] ?? {
      id: nav.id,
      title: nav.title,
      products: [],
      paragraphs: [],
      project_list: [],
    },
  }));
}

export async function getSearchIndex(
  categoryFilter: ProductCategory | null,
  locale: string = "ru"
): Promise<SearchIndexItem[]> {
  let products = await getCachedProducts(locale);
  products = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products.filter((p) => p.category === "pumps");

  return products.map((p) => ({ code: p.code, name: p.name, slug: p.slug, hasModelCode: p.hasModelCode }));
}

export async function getCategoryIntro(category: ProductCategory, locale: string = "ru"): Promise<string> {
  const [products, sections] = await Promise.all([getCachedProducts(locale), getCachedSections(locale)]);
  const merged = mergedCatalogSections(products, sections);
  const anchor = CATEGORY_ANCHORS[category];
  if (anchor && merged[anchor]?.paragraphs.length) {
    return merged[anchor].paragraphs.join(" ");
  }
  return getCatalogIntro(locale);
}
