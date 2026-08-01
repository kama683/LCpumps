import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, "../data/catalog.json");
const data = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

const SECTION = "ОСЕВОЙ ИЛИ ДИАГОНАЛЬНЫЙ НАСОС";
const WASTEWATER_SECTION = "ПОГРУЖНОЙ НАСОС ДЛЯ СТОЧНЫХ ВОД";
const PARKED_SECTION = "ПРОЧИЕ НАСОСЫ";
const IMAGE_BASE = "/assets/catalog/axial-mixed-flow";

const AXIAL_PRODUCTS = {
  zhlbq: {
    code: "Z(H)LB",
    name: "ВЕРТИКАЛЬНЫЙ ОСЕВОЙ (СМЕШАННЫЙ) НАСОС СЕРИИ Z(H)LB",
    image: `${IMAGE_BASE}/Z-H-LB_1677374615_WNo_800d450.jpg`,
    description: [
      "Насос Z(H)LB — одноступенчатый вертикальный полурегулируемый осевой (смешанный) насос. Жидкость течет вдоль оси насоса. Насос имеет низкий напор и большую производительность, подходит для перекачивания чистой воды или других жидкостей, сходных с водой по физическим и химическим свойствам. Максимальная температура перекачиваемой жидкости составляет 50 °C.",
    ],
    applications: [
      "Крупномасштабные проекты водоснабжения и водоотведения",
      "Перекачка воды из городских рек, борьба с наводнениями и осушение",
      "Крупномасштабное орошение сельскохозяйственных угодий и охрана водных ресурсов",
      "Промышленные тепловые электростанции — оборотная вода",
      "Городское водоснабжение, подъем уровня воды в доках",
    ],
    specs: [
      "Диапазон расхода: 800–200 000 м³/ч",
      "Диапазон подъема: 1–30,6 м",
      "Мощность: 18,5–7000 кВт",
      "Напряжение: ≥355 кВт — 6 кВ, 10 кВ",
      "Частота: 50 Гц",
      "Температура жидкости: ≤50 °C",
    ],
  },
  qz: {
    code: "QZ(H)",
    name: "ВЕРТИКАЛЬНЫЙ ОСЕВОЙ (СМЕШАННЫЙ) НАСОС QZ(H)",
    image: `${IMAGE_BASE}/QZ-QH_1675844509_WNo_800d450.jpg`,
    description: [
      "Погружной осевой насос QZ и погружной смешанный насос QH компании LCPumps представляют собой новое поколение осевых и смешанных насосов. Они основаны на передовых технологиях аналогичной продукции в стране и за рубежом в сочетании с многолетним опытом проектирования компании и специально разработаны для случаев большого расхода и низкого подъема.",
      "Гидравлические модели достигли лидирующего уровня в Китае. По сравнению со старыми моделями расход увеличен на 20–30%, эффективность — на 3–5%, стойкость к кавитации отличная. Подъем погружного осевого насоса QZ обычно составляет менее 10 м, погружного смешанного насоса QH — менее 20 м. Продукт является лучшей заменой традиционного осевого и смешанного насоса.",
      "Машина и насос объединены: компактная конструкция и высокая надежность. Двойное или тройное механическое уплотнение обеспечивает герметичность. Весь насос погружается в воду с хорошими условиями охлаждения. Класс изоляции F, степень защиты IP68, многофункциональная защита и сигнализация.",
      "Установка по валу упрощает обслуживание. Гражданское строительство и конструкция насосной станции существенно упрощаются, затраты на строительство снижаются примерно на 30–40% от общей стоимости. Возможна комплектация шкафом управления. Низкий уровень шума и длительный срок службы.",
    ],
    applications: [
      "Промышленные и сельскохозяйственные системы транспортировки воды",
      "Городское водоснабжение",
      "Небольшие проекты по сбросу сточных вод и перекачке воды",
    ],
    specs: [
      "Диапазон расхода: 0–25 м³/ч",
      "Диапазон подъема: 0–30 м",
      "Мощность: 18,5–7000 кВт",
      "Напряжение: ≤355 кВт — 380 В или 660 В; ≥355 кВт — 380 В, 660 В, 6 кВ и 10 кВ",
      "Частота: 50 Гц",
      "Длина кабеля: 10 м",
      "Класс изоляции: F",
      "Степень защиты: IP68",
      "Температура среды: не выше 50 ℃ (чистая вода, жидкости, похожие на чистую воду, или мягкие сточные воды)",
    ],
  },
};

const SECTION_ORDER = ["zhlbq", "qz"];

const sectionProducts = SECTION_ORDER.map((slug) => {
  const product = AXIAL_PRODUCTS[slug];
  return { code: product.code, name: product.name, slug };
});

for (const [slug, product] of Object.entries(AXIAL_PRODUCTS)) {
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

const migrated = new Set(SECTION_ORDER);
for (const [slug, product] of Object.entries(data.products)) {
  if (product.section !== SECTION || migrated.has(slug)) continue;
  product.section = PARKED_SECTION;
}

const axialSection = data.sections.find((s) => s.title === SECTION);
if (axialSection) {
  axialSection.products = sectionProducts;
}

const wastewaterSection = data.sections.find((s) => s.title === WASTEWATER_SECTION);
if (wastewaterSection) {
  wastewaterSection.products = (wastewaterSection.products ?? []).filter(
    (p) => !SECTION_ORDER.includes(p.slug)
  );
}

fs.writeFileSync(catalogPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(
  "Updated axial/mixed-flow products:",
  sectionProducts.map((p) => p.slug).join(", ")
);
