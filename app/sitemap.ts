import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProductSlugs } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";
import { getProjectSlugs } from "@/data/projects";

// Products are DB-backed and admin-editable at runtime — same reasoning as
// the product/project pages themselves (see their `dynamic = "force-dynamic"`
// comments): this must not run at build time, since `next build` has no live
// database connection.
export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  "/",
  "/about-us",
  "/applications",
  "/applications/water-wastewater",
  "/contact",
  "/faq",
  "/news",
  "/products",
  "/products/control",
  "/products/pumps",
  "/products/valves",
  "/products/water",
  "/projects",
  "/services",
  "/solutions",
] as const;

const ABOUT_SUBPAGE_SLUGS = ["our-company", "innovation", "history", "sustainability"];

function localizedUrls(baseUrl: string, href: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${baseUrl}${getPathname({ locale, href })}`])
  );
}

function pushEntry(entries: MetadataRoute.Sitemap, baseUrl: string, href: string) {
  entries.push({
    url: `${baseUrl}${getPathname({ locale: routing.defaultLocale, href })}`,
    alternates: { languages: localizedUrls(baseUrl, href) },
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const [productSlugs, projectSlugs] = await Promise.all([getProductSlugs(), getProjectSlugs()]);

  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    pushEntry(entries, baseUrl, route);
  }
  for (const slug of ABOUT_SUBPAGE_SLUGS) {
    pushEntry(entries, baseUrl, `/about-us/${slug}`);
  }
  for (const slug of productSlugs) {
    pushEntry(entries, baseUrl, `/products/${slug}`);
  }
  for (const slug of projectSlugs) {
    pushEntry(entries, baseUrl, `/project/${slug}`);
  }

  return entries;
}
