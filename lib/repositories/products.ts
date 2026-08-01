import "server-only";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { productTranslations, products, sectionTranslations, sections } from "@/lib/db/schema";
import type { AppLocale } from "@/i18n/routing";
import type { ProductDetail, ProductCategory } from "@/lib/types";

const LOCALES = ["ru", "en", "kk", "zh"] as const satisfies readonly AppLocale[];

export interface ProductTranslationInput {
  name: string;
  description: string[];
  specs: string[];
  applications: string[];
}

export type ProductTranslations = Record<AppLocale, ProductTranslationInput>;

export interface ProductInput {
  slug: string;
  code: string;
  category: ProductCategory;
  sectionId: string | null;
  image: string | null;
  stockQuantity: number;
  translations: ProductTranslations;
}

export interface AdminProductListItem {
  slug: string;
  code: string;
  name: string;
  category: ProductCategory;
  sectionId: string | null;
  image: string | null;
  stockQuantity: number;
}

/** RU name only — enough for the admin table/search; full per-locale
 * content is loaded on demand when a product is opened for editing. */
export async function listProductsForAdmin(): Promise<AdminProductListItem[]> {
  const rows = await db
    .select({
      slug: products.slug,
      code: products.code,
      category: products.category,
      sectionId: products.sectionId,
      image: products.image,
      stockQuantity: products.stockQuantity,
      name: productTranslations.name,
    })
    .from(products)
    .innerJoin(
      productTranslations,
      eq(productTranslations.productSlug, products.slug)
    )
    .where(eq(productTranslations.locale, "ru"))
    .orderBy(productTranslations.name);

  return rows;
}

export async function getProductForAdmin(slug: string): Promise<ProductInput | null> {
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) return null;

  const translationRows = await db
    .select()
    .from(productTranslations)
    .where(eq(productTranslations.productSlug, slug));

  const byLocale = new Map(translationRows.map((t) => [t.locale, t]));
  const ru = byLocale.get("ru");
  const translations = Object.fromEntries(
    LOCALES.map((locale) => {
      const t = byLocale.get(locale) ?? ru;
      return [
        locale,
        {
          name: t?.name ?? "",
          description: t?.description ?? [],
          specs: t?.specs ?? [],
          applications: t?.applications ?? [],
        },
      ];
    })
  ) as ProductTranslations;

  return {
    slug: product.slug,
    code: product.code,
    category: product.category,
    sectionId: product.sectionId,
    image: product.image,
    stockQuantity: product.stockQuantity,
    translations,
  };
}

export async function slugExists(slug: string): Promise<boolean> {
  const [row] = await db.select({ slug: products.slug }).from(products).where(eq(products.slug, slug)).limit(1);
  return Boolean(row);
}

export async function createProduct(input: ProductInput): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.insert(products).values({
      slug: input.slug,
      code: input.code,
      category: input.category,
      sectionId: input.sectionId,
      image: input.image,
      stockQuantity: input.stockQuantity,
    });

    for (const locale of LOCALES) {
      const t = input.translations[locale];
      await tx.insert(productTranslations).values({
        productSlug: input.slug,
        locale,
        name: t.name,
        description: t.description,
        specs: t.specs,
        applications: t.applications,
      });
    }
  });
}

export async function updateProduct(slug: string, input: Omit<ProductInput, "slug">): Promise<void> {
  await db.transaction(async (tx) => {
    await tx
      .update(products)
      .set({
        code: input.code,
        category: input.category,
        sectionId: input.sectionId,
        image: input.image,
        stockQuantity: input.stockQuantity,
        updatedAt: new Date(),
      })
      .where(eq(products.slug, slug));

    for (const locale of LOCALES) {
      const t = input.translations[locale];
      await tx
        .insert(productTranslations)
        .values({
          productSlug: slug,
          locale,
          name: t.name,
          description: t.description,
          specs: t.specs,
          applications: t.applications,
        })
        .onConflictDoUpdate({
          target: [productTranslations.productSlug, productTranslations.locale],
          set: { name: t.name, description: t.description, specs: t.specs, applications: t.applications },
        });
    }
  });
}

export async function deleteProduct(slug: string): Promise<void> {
  await db.delete(products).where(eq(products.slug, slug));
}

// ---- Public read path (site-facing, not admin) -----------------------
//
// Uncached raw queries — lib/catalog.ts wraps these in unstable_cache /
// revalidateTag("catalog") so the public site doesn't hit Postgres on
// every request, while admin edits still show up without a rebuild.

/** All products for one locale, shaped as the public ProductDetail type.
 * `section` stays the RU section title (an internal join/keyword-matching
 * key, see lib/catalog.ts's getProjectEquipmentProducts) — group by
 * `sectionId` instead, it's the real FK. */
export async function getAllProductsPublic(locale: AppLocale): Promise<ProductDetail[]> {
  const rows = await db
    .select({
      slug: products.slug,
      code: products.code,
      category: products.category,
      image: products.image,
      sectionId: products.sectionId,
      name: productTranslations.name,
      description: productTranslations.description,
      specs: productTranslations.specs,
      applications: productTranslations.applications,
    })
    .from(products)
    .innerJoin(
      productTranslations,
      and(eq(productTranslations.productSlug, products.slug), eq(productTranslations.locale, locale))
    );

  const ruNameRows = await db
    .select({ slug: productTranslations.productSlug, name: productTranslations.name })
    .from(productTranslations)
    .where(eq(productTranslations.locale, "ru"));
  const ruNameBySlug = new Map(ruNameRows.map((r) => [r.slug, r.name]));

  const ruSectionRows = await db
    .select({ id: sections.id, title: sectionTranslations.title })
    .from(sections)
    .innerJoin(
      sectionTranslations,
      and(eq(sectionTranslations.sectionId, sections.id), eq(sectionTranslations.locale, "ru"))
    );
  const ruSectionTitleById = new Map(ruSectionRows.map((r) => [r.id, r.title]));

  return rows.map((r) => {
    const ruName = ruNameBySlug.get(r.slug) ?? r.name;
    return {
      code: r.code,
      name: r.name,
      slug: r.slug,
      section: (r.sectionId && ruSectionTitleById.get(r.sectionId)) || "",
      sectionId: r.sectionId,
      category: r.category,
      description: r.description,
      specs: r.specs,
      applications: r.applications,
      image: r.image ?? undefined,
      hasModelCode: r.code.trim() !== ruName.trim(),
    };
  });
}

export async function listAllSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((r) => r.slug);
}
