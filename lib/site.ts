import type { CatalogNavItem } from "@/lib/types";

export const BRAND = "LCPumps";
export const COMPANY_NAME = "LCPumps";

/** Canonical public origin, derived from the same DOMAIN env var Caddy uses
 * for its certificate (see .env.example) — used by sitemap.ts/robots.ts. */
export function getSiteUrl(): string {
  const domain = process.env.DOMAIN;
  if (!domain || domain === "example.com") return "https://lcpumps.com";
  return `https://${domain}`;
}

export { LOGO_PATH } from "@/lib/assets";

export const CATALOG_INTRO =
  "LCPumps — ведущий производитель насосов в Китае. Продукция широко используется в таких национальных опорных областях, как муниципальное управление, водное хозяйство, строительство, противопожарная защита, электроэнергетика, охрана окружающей среды, нефтяная, химическая промышленность, горнодобывающая промышленность и медицина. LCPumps предоставляет высококачественные решения в области центробежных насосов для предприятий и проектов по всему миру благодаря своему мощному техническому накоплению и возможностям НИОКР.";

// labelKey refers to the "Nav" message namespace (see messages/*.json).
export const MAIN_NAV = [
  { href: "/", labelKey: "home" },
  { href: "/about-us", labelKey: "aboutUs" },
  { href: "/products", labelKey: "catalog" },
  { href: "/projects", labelKey: "projects" },
  { href: "/contact", labelKey: "contacts" },
] as const;

export type MainNavHref = (typeof MAIN_NAV)[number]["href"];

export const CATALOG_NAV: CatalogNavItem[] = [
  {
    id: "wastewater-submersible",
    title: "Насосы, смесители и оборудование для сточной воды",
    label: "Насосы, смесители и оборудование для сточной воды",
    category: "pumps",
    page: "/products",
  },
  {
    id: "single-suction-centrifugal",
    title: "Общепромышленное применение и строительство",
    label: "Общепромышленное применение и строительство",
    category: "pumps",
    page: "/products",
  },
  {
    id: "double-suction-split-case",
    title: "Промышленное применение и сельское хозяйство",
    label: "Промышленное применение и сельское хозяйство",
    category: "pumps",
    page: "/products",
  },
  {
    id: "petrochemical",
    title: "Нефтяная и химическая промышленность, API610",
    label: "Нефтяная и химическая промышленность, API610",
    category: "pumps",
    page: "/products",
  },
  {
    id: "control-panel",
    title: "Электрические шкафы управления",
    label: "Электрические шкафы управления",
    category: "pumps",
    page: "/products",
  },
  {
    id: "fire-pump",
    title: "Пожарное насосное оборудование по стандарту FM / UL",
    label: "Пожарное насосное оборудование по стандарту FM / UL",
    category: "pumps",
    page: "/products",
  },
  {
    id: "water-supply-complete",
    title: "Модульные решения",
    label: "Модульные решения",
    category: "water",
    page: "/products/water",
  },
  {
    id: "valves",
    title: "Трубопроводная арматура",
    label: "Трубопроводная арматура",
    category: "valves",
    page: "/products/valves",
  },
];

export const MAIN_CATEGORIES = [
  { id: "pumps" as const, title: "Насосы", slug: "pumps", route: "/products" },
  { id: "valves" as const, title: "Трубопроводная арматура", slug: "valves", route: "/products/valves" },
  { id: "water" as const, title: "Оборудование для водоснабжения", slug: "water", route: "/products/water" },
];

// Values are CatalogNavItem/CatalogSection ids (language-neutral), not display text.
export const CATEGORY_ANCHORS: Record<string, string> = {
  water: "water-supply-complete",
  valves: "valves",
};

const HOME_STATS: Record<string, { value: string; label: string }[]> = {
  ru: [
    { value: "5", label: "промышленных парков" },
    { value: "550 000", label: "м² производственных площадей" },
    { value: "2000+", label: "комплектов оборудования" },
    { value: "30+", label: "филиалов" },
    { value: "1800+", label: "специалистов продаж и сервиса" },
  ],
  kk: [
    { value: "5", label: "индустриялық парк" },
    { value: "550 000", label: "м² өндірістік алаң" },
    { value: "2000+", label: "жабдық жинағы" },
    { value: "30+", label: "филиал" },
    { value: "1800+", label: "сату және сервис маманы" },
  ],
  en: [
    { value: "5", label: "industrial parks" },
    { value: "550,000", label: "m² of production space" },
    { value: "2,000+", label: "sets of equipment" },
    { value: "30+", label: "branches" },
    { value: "1,800+", label: "sales and service specialists" },
  ],
  zh: [
    { value: "5", label: "工业园区" },
    { value: "550,000", label: "m² 生产面积" },
    { value: "2,000+", label: "台（套）设备" },
    { value: "30+", label: "分支机构" },
    { value: "1,800+", label: "销售与服务专家" },
  ],
};

export function getHomeStats(locale: string) {
  return HOME_STATS[locale] ?? HOME_STATS.ru;
}

export const HOME_FEATURED_PRODUCTS = ["sls", "slw", "gdl", "slg", "wq", "wqc"];

export const RESERVED_PRODUCT_SLUGS = new Set(["pumps", "valves", "control", "water"]);
