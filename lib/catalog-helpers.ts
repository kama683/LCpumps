import catalogJson from "@/data/catalog.json";
import { CATALOG_INTRO_TRANSLATIONS } from "@/data/catalog-i18n";
import { CATALOG_INTRO } from "@/lib/site";

/** Pure, client-safe catalog helpers — no DB/repository imports here.
 * lib/catalog.ts re-exports these for Server Components, but Client
 * Components must import straight from this file: importing anything from
 * lib/catalog.ts pulls in lib/db/client.ts's `pg` (Node-only, uses
 * net/tls) into the browser bundle and crashes it. */

const company = (catalogJson as { company: Record<string, string[]> }).company;

export function getCompanyParagraphs(locale: string = "ru"): string[] {
  return company[locale] ?? company.ru;
}

export function getCatalogIntro(locale: string = "ru"): string {
  return CATALOG_INTRO_TRANSLATIONS[locale as "en" | "kk" | "zh"] ?? CATALOG_INTRO;
}

export function parseSpecRow(spec: string): { key: string; value: string } {
  if (spec.includes(":")) {
    const [key, ...rest] = spec.split(":");
    return { key: key.trim(), value: rest.join(":").trim() };
  }
  return { key: spec, value: "" };
}

/** hasModelCode is precomputed at the data layer (see
 * lib/repositories/products.ts's getAllProductsPublic) — this just reads
 * the field, kept as a function so call sites didn't need to change. */
export function hasModelCode(product: { hasModelCode?: boolean }): boolean {
  return product.hasModelCode ?? true;
}
