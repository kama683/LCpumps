import { ASSETS } from "@/lib/assets";
import { CATALOG_NAV } from "@/lib/site";

const SUBMERSIBLE_SEWAGE_BASE = "/assets/catalog/submersible-sewage";
const END_SUCTION_BASE = "/assets/catalog/end-suction-centrifugal";
const DOUBLE_SUCTION_BASE = "/assets/catalog/double-suction-split-case";
const LONG_SHAFT_BASE = "/assets/catalog/vertical-long-shaft";
const AXIAL_MIXED_BASE = "/assets/catalog/axial-mixed-flow";
const OIL_CHEMICAL_BASE = "/assets/catalog/oil-chemical-pump";
const CONTROL_PANEL_BASE = "/assets/catalog/electric-control-panel";
const FIRE_PUMP_BASE = "/assets/catalog/fire-extinguishing-pump";
const MODULAR_SOLUTIONS_BASE = "/assets/catalog/modular-solutions";
const CATALOG_ROOT_BASE = "/assets/catalog";

/** Product slug → catalog image path. */
export const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = {
  lpt: `${LONG_SHAFT_BASE}/LP-T-_1675843651_WNo_800d450.jpg`,
  qz: `${AXIAL_MIXED_BASE}/QZ-QH_1675844509_WNo_800d450.jpg`,
  yw: `${SUBMERSIBLE_SEWAGE_BASE}/1675924789021_1675925578_WNo_252d408.png`,
  zhlbq: `${AXIAL_MIXED_BASE}/Z-H-LB_1677374615_WNo_800d450.jpg`,
  wqx: `${SUBMERSIBLE_SEWAGE_BASE}/WQX_1675841251_WNo_800d450.jpg`,
  "wq-ii": `${SUBMERSIBLE_SEWAGE_BASE}/WQ-II-_1675840944_WNo_800d450.jpg`,
  wl: `${SUBMERSIBLE_SEWAGE_BASE}/WL_1675840886_WNo_800d450.jpg`,
  wqc: `${SUBMERSIBLE_SEWAGE_BASE}/WQC-2-_1675840434_WNo_800d450.jpg`,
  wq: `${SUBMERSIBLE_SEWAGE_BASE}/WQ_1675840180_WNo_800d450.jpg`,
  slnc: `${END_SUCTION_BASE}/SLNC_1677545320_WNo_800d450.jpg`,
  sls: `${END_SUCTION_BASE}/SLS_1677545468_WNo_800d450.jpg`,
  slw: `${END_SUCTION_BASE}/SLW-2-_1677544915_WNo_800d450.jpg`,
  gdl: `${END_SUCTION_BASE}/GDL_1675848229_WNo_800d450.jpg`,
  dg: `${END_SUCTION_BASE}/DG_1675848201_WNo_800d450.jpg`,
  sld: `${END_SUCTION_BASE}/SLD-2-_1675848148_WNo_800d450.jpg`,
  md: `${END_SUCTION_BASE}/MD_1675848056_WNo_800d450.jpg`,
  slg: `${END_SUCTION_BASE}/SLG-2-_1675847980_WNo_800d450.jpg`,
  slown: `${DOUBLE_SUCTION_BASE}/SLOWN.jpeg`,
  slow: `${DOUBLE_SUCTION_BASE}/SLO-SLOW.jpg`,
  "slow-2stage": `${DOUBLE_SUCTION_BASE}/SLOW.jpg`,
  "slow-multistage": `${CATALOG_ROOT_BASE}/SLOW.png`,
  slda: `${OIL_CHEMICAL_BASE}/SLDA-BB1_1677374780_WNo_800d450.jpg`,
  ly: `${OIL_CHEMICAL_BASE}/LY-VS1.png`,
  ayg: `${OIL_CHEMICAL_BASE}/AYG-OH3.png`,
  xl: `${OIL_CHEMICAL_BASE}/XL-_1677456564_WNo_800d450.jpg`,
  slzae: `${OIL_CHEMICAL_BASE}/SLZAE_1677374970_WNo_800d450.jpg`,
  slzaf: `${OIL_CHEMICAL_BASE}/SLZA-5-_1675845630_WNo_800d450.jpg`,
  slza: `${OIL_CHEMICAL_BASE}/SLZA-2-_1675845529_WNo_800d450.jpg`,
  slcz: `${OIL_CHEMICAL_BASE}/SLCZ_1677375071_WNo_800d450.jpg`,
  slmc: `${OIL_CHEMICAL_BASE}/SLMC-BB4_1677375226_WNo_800d450.jpg`,
  ay: `${OIL_CHEMICAL_BASE}/AY.png`,
  "ay-multistage": `${OIL_CHEMICAL_BASE}/AY.png`,
  sldc: `${OIL_CHEMICAL_BASE}/SLDC.png`,
  sldtd: `${OIL_CHEMICAL_BASE}/${encodeURIComponent("SLDT(D).png")}`,
  slfz: `${OIL_CHEMICAL_BASE}/SLFZ.png`,
  slpp: `${OIL_CHEMICAL_BASE}/SLPP.png`,
  "model-626113": `${OIL_CHEMICAL_BASE}/${encodeURIComponent("SLZA E F.png")}`,
  tmc: `${OIL_CHEMICAL_BASE}/${encodeURIComponent("TMC TTMC.png")}`,
  lec: `${CONTROL_PANEL_BASE}/LEC.png`,
  lbp: `${CONTROL_PANEL_BASE}/LBP.png`,
  "hv-control-cabinet": `${CONTROL_PANEL_BASE}/${encodeURIComponent("ВЫОКОВОЛЬТНЫЙ ЭЛЕКТРИЧКСКИЙ ШКАФ УПРАВЛЕНИЯ.png")}`,
  lfb: `${CONTROL_PANEL_BASE}/LFB.png`,
  "lv-distribution": `${CONTROL_PANEL_BASE}/${encodeURIComponent("РАСПРЕДЕЛИТЕЛЬНОЕ УСТРОЙСТВО НИЗКОГО НАПРЯЖЕНИЯ.png")}`,
  "xbd-d": `${FIRE_PUMP_BASE}/image_1677374308_WNo_800d450.jpg`,
  "xbd-dv": `${FIRE_PUMP_BASE}/XBD-DV-2-_1677374063_WNo_800d450.jpg`,
  "xbd-dw": `${FIRE_PUMP_BASE}/XBD-DW-2-_1677374116_WNo_800d450.jpg`,
  "xbd-w": `${FIRE_PUMP_BASE}/SBD-SLW_1677461586_WNo_800d450.jpg`,
  "xbd-slw2": `${FIRE_PUMP_BASE}/XBD-SLW_1675842059_WNo_800d450.jpg`,
  "xbd-sls2": `${FIRE_PUMP_BASE}/XBD-SLS_1675841926_WNo_800d450.jpg`,
  "xbd-slow": `${FIRE_PUMP_BASE}/XBD-SLOW_1675841622_WNo_800d450.jpg`,
  "xbd-gdl": `${FIRE_PUMP_BASE}/XBD-GDL_1675841533_WNo_800d450.jpg`,
  xbc: `${FIRE_PUMP_BASE}/XBC.png`,
  "xbd-c-lpt": `${FIRE_PUMP_BASE}/${encodeURIComponent("XBD C-LP(T).png")}`,
  "fire-stable-water": `${FIRE_PUMP_BASE}/${encodeURIComponent("ПРОТИВОПОЖАРНОЕ ОБОРУДОВАНИЕ ДЛЯ СТАБИЛЬНОГО ВОДОСНАБЖЕНИЯ.png")}`,
  "smart-pump-station": `${MODULAR_SOLUTIONS_BASE}/LCZH_1677805732617_WNo_400d225.jpg`,
  "smart-pump-room": `${MODULAR_SOLUTIONS_BASE}/LCZF.png`,
  zwlv: `${MODULAR_SOLUTIONS_BASE}/ZWL-V-_1675845725_WNo_800d450.jpg`,
  "water-vfd-full": `${MODULAR_SOLUTIONS_BASE}/${encodeURIComponent("ОБОРУДОВАНИЕ ДЛЯ ВОДОСНАБЖЕНИЯ С ПОЛНОСТЬЮ РЕГУЛИРУЕМОЙ ЧАСТОТОЙ.png")}`,
  "water-vfd-direct": `${MODULAR_SOLUTIONS_BASE}/${encodeURIComponent("ОБОРУДОВАНИЕ ВОДОСНАБЖЕНИЯ С МИКРОПРОЦЕССОРНЫМ ПРЕОБРАЗОВАНИЕМ ЧАСТОТЫ ДЛЯ ПРЯМОГО ПОДКЛЮЧЕНИЯ.png")}`,
  zwl: `${MODULAR_SOLUTIONS_BASE}/ZWL.png`,
  "water-multi-tank-vfd": `${MODULAR_SOLUTIONS_BASE}/${encodeURIComponent("МНОГОРЕЗЕРВУАРНОЕ ОБОРУДОВАНИЕ ДЛЯ ПОДАЧИ ВОДЫ С ЧАСТОТНЫМ ПРЕОБРАЗОВАТЕЛЕМ.png")}`,
  ktl: `${CATALOG_ROOT_BASE}/${encodeURIComponent("KTL, KTW.png")}`,
  is: `${CATALOG_ROOT_BASE}/IS.png`,
  s: `${CATALOG_ROOT_BASE}/S.png`,
  sll: `${CATALOG_ROOT_BASE}/SLL.png`,
  qgls: `${CATALOG_ROOT_BASE}/QGLS.png`,
  qjb: `${CATALOG_ROOT_BASE}/QJB.png`,
  zw: `${CATALOG_ROOT_BASE}/ZW.png`,
};

/** Dedicated category hero banners that exist in public/assets. */
export const CATEGORY_PANEL_HERO_IMAGES: Record<string, string> = {
  "wastewater-submersible": `${SUBMERSIBLE_SEWAGE_BASE}/category-hero.png`,
  "single-suction-centrifugal": `${END_SUCTION_BASE}/End-suction-Centrifugal-Pump_1732707241_WNo_4167d4167.png`,
  "double-suction-split-case": `${DOUBLE_SUCTION_BASE}/Double-Suction-Split-Case-Water-Pump_1732707241_WNo_4167d4167.png`,
  petrochemical: `${OIL_CHEMICAL_BASE}/Petroleum-Chemical-Pump_1732707241_WNo_4167d4167.png`,
  "control-panel": `${CONTROL_PANEL_BASE}/Electrical-Control-Panel_1732707241_WNo_4167d4167.png`,
  "fire-pump": `${FIRE_PUMP_BASE}/Fire-fighting-Pump_1732707241_WNo_4167d4167.png`,
  "water-supply-complete": `${MODULAR_SOLUTIONS_BASE}/Compelete-Water-Supply-Equipment_1732707240_WNo_4167d4167.png`,
};

export function getCategoryPanelHeroImage(
  panelId: string,
  fallbackProductSlug?: string
): string {
  if (CATEGORY_PANEL_HERO_IMAGES[panelId]) {
    return CATEGORY_PANEL_HERO_IMAGES[panelId];
  }

  if (fallbackProductSlug) {
    return getProductImageSrc({ slug: fallbackProductSlug });
  }

  return ASSETS.pump.src;
}

export function getCategoryPanelHeroAlt(panelId: string): string {
  return CATALOG_NAV.find((item) => item.id === panelId)?.label ?? "Каталог";
}

export function getProductImageSrc(
  product: { slug: string; image?: string | null }
): string {
  return (
    product.image ??
    PRODUCT_IMAGE_BY_SLUG[product.slug] ??
    ASSETS.pump.src
  );
}
