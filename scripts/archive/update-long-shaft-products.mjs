import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, "../data/catalog.json");
const data = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

const SECTION = "ВЕРТИКАЛЬНЫЙ НАСОС С ДЛИННЫМ ВАЛОМ";
const WASTEWATER_SECTION = "ПОГРУЖНОЙ НАСОС ДЛЯ СТОЧНЫХ ВОД";
const IMAGE_BASE = "/assets/catalog/vertical-long-shaft";

const LONG_SHAFT_PRODUCTS = {
  lpt: {
    code: "LP(T)",
    name: "ВЕРТИКАЛЬНЫЙ ДРЕНАЖНЫЙ НАСОС С ДЛИННЫМ ВАЛОМ LP(T)",
    image: `${IMAGE_BASE}/LP-T-_1675843651_WNo_800d450.jpg`,
    description: [
      "Вертикальный дренажный насос с длинной осью LP(T) в основном используется для перекачивания сточных вод или канализационных вод, не являющихся коррозионными, с температурой ниже 60 ℃ и содержанием взвешенных веществ (без волокон и абразивных частиц) менее 150 мг/л.",
      "Вертикальный дренажный насос с длинной осью типа LP(T) создан на основе вертикального дренажного насоса с длинной осью типа LP с добавлением защитного рукава вала. Смазочная вода вводится в корпус. Он может перекачивать сточные воды или стоки с температурой ниже 60 ℃ и содержащие определенные твердые частицы (например, железные опилки, мелкий песок, пылевидный уголь и т. д.).",
      "Двигатель приводит в движение рабочее колесо, работающее под жидкостью, через вал. После того как жидкость получает энергию через рабочее колесо, она меняет направление через направляющий аппарат, течет вертикально вверх по каналу между трубами стояка, проходит через седло выхода воды и выбрасывается горизонтально.",
    ],
    applications: [
      "Коммунальное строительство",
      "Металлургическая и горнодобывающая промышленность",
      "Химическая промышленность и бумажное производство",
      "Водопроводная вода и электростанции",
      "Проекты по охране водных ресурсов сельскохозяйственных угодий",
    ],
    specs: [
      "Диапазон расхода: 8–60000 м³/ч",
      "Диапазон подъема: 3–150 м",
      "Мощность: 1,5 кВт–3600 кВт",
      "Температура среды: ниже 60 ℃",
      "Взвешенные вещества: менее 150 мг/л (без волокон и абразивных частиц)",
    ],
  },
};

const SECTION_ORDER = ["lpt"];

const sectionProducts = SECTION_ORDER.map((slug) => {
  const product = LONG_SHAFT_PRODUCTS[slug];
  return { code: product.code, name: product.name, slug };
});

for (const [slug, product] of Object.entries(LONG_SHAFT_PRODUCTS)) {
  const existing = data.products[slug];
  data.products[slug] = {
    ...(existing ?? {}),
    code: product.code,
    name: product.name,
    slug,
    section: SECTION,
    category: "pumps",
    description: product.description,
    specs: product.specs,
    applications: product.applications,
    image: product.image,
  };
}

const longSection = data.sections.find((s) => s.title === SECTION);
if (longSection) {
  longSection.products = sectionProducts;
}

const wastewaterSection = data.sections.find((s) => s.title === WASTEWATER_SECTION);
if (wastewaterSection) {
  wastewaterSection.products = (wastewaterSection.products ?? []).filter(
    (p) => !SECTION_ORDER.includes(p.slug)
  );
}

fs.writeFileSync(catalogPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(
  "Updated long-shaft products:",
  sectionProducts.map((p) => p.slug).join(", ")
);
