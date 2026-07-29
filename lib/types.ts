export interface CatalogProductRef {
  code: string;
  name: string;
  slug: string;
  /** Precomputed at the data layer (code !== canonical RU name) — see
   * hasModelCode() in lib/catalog.ts, which just reads this field. */
  hasModelCode: boolean;
}

export interface CatalogSection {
  id: string;
  title: string;
  products: CatalogProductRef[];
  paragraphs: string[];
  project_list: string[];
  bullets?: string[];
}

export interface ProductDetail {
  code: string;
  name: string;
  slug: string;
  /** RU section title — an internal join/keyword-matching key (see
   * getProjectEquipmentProducts), never translated, never displayed
   * directly. Use `sectionId` for grouping instead. */
  section: string;
  sectionId: string | null;
  category: ProductCategory;
  description: string[];
  specs: string[];
  applications: string[];
  image?: string;
  hasModelCode: boolean;
}

export type ProductCategory = "pumps" | "valves" | "control" | "water";

export interface CatalogNavItem {
  id: string;
  title: string;
  label: string;
  category: ProductCategory;
  page: string;
}

export interface CatalogPanel extends CatalogNavItem {
  section: CatalogSection;
}

export interface CatalogData {
  company: Record<string, string[]>;
  sections: CatalogSection[];
  products: Record<string, ProductDetail>;
}

export interface ProjectFeatured {
  slug: string;
  name: string;
  industry: string;
  location: string;
  image: string;
  equipmentSlugs: string[];
  equipmentType: "building" | "industrial";
  features: string;
  tasks: string;
  equipment: string;
  benefits: string;
  description: string;
  short: string;
}

export interface ProjectIndustry {
  id: string;
  title: string;
  intro: string;
  items: string[];
}

export interface ProjectsData {
  featured: ProjectFeatured[];
  industries: ProjectIndustry[];
  compact: string[];
  heroIntro: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AboutSubpage {
  slug: string;
  paragraphs: string[];
}

export interface ContactCardData {
  label: string;
  html: string;
  icon: "office" | "email" | "phone" | "clock" | "sales" | "support";
}

export interface SearchIndexItem {
  code: string;
  name: string;
  slug: string;
  hasModelCode: boolean;
}
