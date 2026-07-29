import "dotenv/config";

import catalogJson from "../data/catalog.json";
import {
  PRODUCT_TRANSLATIONS,
  SECTION_TEXT_TRANSLATIONS,
} from "../data/catalog-i18n";
import { db } from "../lib/db/client";
import {
  products,
  productTranslations,
  sections,
  sectionTranslations,
} from "../lib/db/schema";
import type { ProductCategory } from "../lib/types";

const OTHER_LOCALES = ["en", "kk", "zh"] as const;
type OtherLocale = (typeof OTHER_LOCALES)[number];

// The raw catalog.json shape predates the DB-backed ProductDetail type (see
// lib/types.ts) — it doesn't have sectionId/hasModelCode, those are computed
// at read time by the repository layer, not stored in the source file. This
// migration script is a one-time reader of the old static shape only.
interface RawProduct {
  code: string;
  name: string;
  slug: string;
  section: string;
  category: string;
  description: string[];
  specs: string[];
  applications: string[];
  image?: string;
}

interface RawSection {
  id: string;
  title: string;
  products: { code: string; name: string; slug: string }[];
  paragraphs: string[];
  project_list: string[];
  bullets?: string[];
}

interface RawCatalogData {
  company: Record<string, string[]>;
  sections: RawSection[];
  products: Record<string, RawProduct>;
}

const data = catalogJson as unknown as RawCatalogData;

async function migrateSections(): Promise<void> {
  for (const section of data.sections) {
    await db
      .insert(sections)
      .values({
        id: section.id,
        projectList: section.project_list ?? [],
      })
      .onConflictDoUpdate({
        target: sections.id,
        set: { projectList: section.project_list ?? [] },
      });

    await db
      .insert(sectionTranslations)
      .values({
        sectionId: section.id,
        locale: "ru",
        title: section.title,
        paragraphs: section.paragraphs ?? [],
        bullets: section.bullets ?? null,
      })
      .onConflictDoUpdate({
        target: [sectionTranslations.sectionId, sectionTranslations.locale],
        set: {
          title: section.title,
          paragraphs: section.paragraphs ?? [],
          bullets: section.bullets ?? null,
        },
      });

    for (const locale of OTHER_LOCALES) {
      const overlay = SECTION_TEXT_TRANSLATIONS[section.id]?.[locale];
      const paragraphs = overlay?.paragraphs ?? section.paragraphs ?? [];
      const bullets = overlay?.bullets ?? section.bullets ?? null;
      // No dedicated section-title translation source exists today (see
      // lib/catalog.ts's mergedCatalogSections, which always uses the RU
      // title) — replicate that instead of inventing new behavior.
      await db
        .insert(sectionTranslations)
        .values({
          sectionId: section.id,
          locale,
          title: section.title,
          paragraphs,
          bullets,
        })
        .onConflictDoUpdate({
          target: [sectionTranslations.sectionId, sectionTranslations.locale],
          set: { title: section.title, paragraphs, bullets },
        });
    }
  }
}

async function migrateProducts(): Promise<{ unresolvedSections: string[]; translationGaps: string[] }> {
  const sectionTitleToId = new Map(data.sections.map((s) => [s.title, s.id]));
  const unresolvedSections: string[] = [];
  const translationGaps: string[] = [];

  for (const product of Object.values(data.products)) {
    const sectionId = product.section ? sectionTitleToId.get(product.section) ?? null : null;
    if (product.section && !sectionId) {
      unresolvedSections.push(`${product.slug} (section: "${product.section}")`);
    }

    await db
      .insert(products)
      .values({
        slug: product.slug,
        code: product.code,
        category: product.category as ProductCategory,
        sectionId,
        image: product.image ?? null,
      })
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          code: product.code,
          category: product.category as ProductCategory,
          sectionId,
          image: product.image ?? null,
        },
      });

    await db
      .insert(productTranslations)
      .values({
        productSlug: product.slug,
        locale: "ru",
        name: product.name,
        description: product.description ?? [],
        specs: product.specs ?? [],
        applications: product.applications ?? [],
      })
      .onConflictDoUpdate({
        target: [productTranslations.productSlug, productTranslations.locale],
        set: {
          name: product.name,
          description: product.description ?? [],
          specs: product.specs ?? [],
          applications: product.applications ?? [],
        },
      });

    for (const locale of OTHER_LOCALES) {
      const t = PRODUCT_TRANSLATIONS[product.slug]?.[locale as OtherLocale];
      if (!t) {
        translationGaps.push(`${product.slug} (${locale})`);
      }
      const name = t?.name ?? product.name;
      const description = t?.description ?? product.description ?? [];
      const specs = t?.specs ?? product.specs ?? [];
      const applications = t?.applications ?? product.applications ?? [];

      await db
        .insert(productTranslations)
        .values({ productSlug: product.slug, locale, name, description, specs, applications })
        .onConflictDoUpdate({
          target: [productTranslations.productSlug, productTranslations.locale],
          set: { name, description, specs, applications },
        });
    }
  }

  return { unresolvedSections, translationGaps };
}

async function main() {
  console.log(`Migrating ${data.sections.length} sections and ${Object.keys(data.products).length} products...`);

  await migrateSections();
  const { unresolvedSections, translationGaps } = await migrateProducts();

  console.log("\nDone.");
  console.log(`Sections inserted/updated: ${data.sections.length}`);
  console.log(`Products inserted/updated: ${Object.keys(data.products).length}`);

  if (unresolvedSections.length > 0) {
    console.warn(`\nWARNING: ${unresolvedSections.length} product(s) had a section that could not be resolved to a section id:`);
    for (const line of unresolvedSections) console.warn(`  - ${line}`);
  } else {
    console.log("All product sections resolved cleanly.");
  }

  if (translationGaps.length > 0) {
    console.warn(`\n${translationGaps.length} product/locale translation(s) fell back to the RU text (no override in catalog-i18n.ts):`);
    for (const line of translationGaps) console.warn(`  - ${line}`);
  } else {
    console.log("No translation gaps — every product has en/kk/zh overrides.");
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
