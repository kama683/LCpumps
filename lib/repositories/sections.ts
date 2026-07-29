import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { sectionTranslations, sections } from "@/lib/db/schema";
import type { AppLocale } from "@/i18n/routing";
import type { CatalogSection } from "@/lib/types";

export interface SectionOption {
  id: string;
  title: string;
}

/** RU titles, for admin selects — the admin works in Russian regardless of
 * which locale a product's other fields are being edited in. */
export async function listSectionOptions(): Promise<SectionOption[]> {
  const rows = await db
    .select({ id: sections.id, title: sectionTranslations.title })
    .from(sections)
    .innerJoin(
      sectionTranslations,
      and(eq(sectionTranslations.sectionId, sections.id), eq(sectionTranslations.locale, "ru"))
    )
    .orderBy(sectionTranslations.title);

  return rows;
}

export interface SectionDetail {
  id: string;
  projectList: string[];
  title: string;
  paragraphs: string[];
  bullets: string[] | null;
}

export async function getSectionById(id: string, locale: AppLocale = "ru"): Promise<SectionDetail | null> {
  const [row] = await db
    .select({
      id: sections.id,
      projectList: sections.projectList,
      title: sectionTranslations.title,
      paragraphs: sectionTranslations.paragraphs,
      bullets: sectionTranslations.bullets,
    })
    .from(sections)
    .innerJoin(
      sectionTranslations,
      and(eq(sectionTranslations.sectionId, sections.id), eq(sectionTranslations.locale, locale))
    )
    .where(eq(sections.id, id))
    .limit(1);

  return row ?? null;
}

/** All sections, translated to `locale`, `products` left empty — filled in
 * by mergedCatalogSections() in lib/catalog.ts, matching the old
 * catalog.json `sections[]` shape/usage. */
export async function listSectionsForCatalog(locale: AppLocale): Promise<CatalogSection[]> {
  const rows = await db
    .select({
      id: sections.id,
      projectList: sections.projectList,
      title: sectionTranslations.title,
      paragraphs: sectionTranslations.paragraphs,
      bullets: sectionTranslations.bullets,
    })
    .from(sections)
    .innerJoin(
      sectionTranslations,
      and(eq(sectionTranslations.sectionId, sections.id), eq(sectionTranslations.locale, locale))
    );

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    products: [],
    paragraphs: r.paragraphs,
    project_list: r.projectList,
    bullets: r.bullets ?? undefined,
  }));
}
