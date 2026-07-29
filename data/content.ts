import { getCompanyParagraphs } from "@/lib/catalog-helpers";
import type { AppLocale } from "@/i18n/routing";
import type { AboutSubpage, FaqItem } from "@/lib/types";

/** Finds paragraph indices in the canonical Russian source, so keyword matching
 * stays correct regardless of which locale's translated text is displayed. */
function findCompanyIndices(predicate: (p: string) => boolean): number[] {
  const ru = getCompanyParagraphs("ru");
  return ru.reduce<number[]>((acc, p, i) => (predicate(p) ? [...acc, i] : acc), []);
}

function findCompanyIndex(predicate: (p: string) => boolean): number {
  return getCompanyParagraphs("ru").findIndex(predicate);
}

const STATS: Record<AppLocale, { value: string; label: string }[]> = {
  ru: [
    { value: "5", label: "промышленных парков" },
    { value: "550 000 м²", label: "производственных площадей" },
    { value: "2000+", label: "комплектов оборудования" },
    { value: "30+", label: "филиалов по Китаю" },
  ],
  kk: [
    { value: "5", label: "индустриялық парк" },
    { value: "550 000 м²", label: "өндірістік алаң" },
    { value: "2000+", label: "жабдық жинағы" },
    { value: "30+", label: "Қытай бойынша филиал" },
  ],
  en: [
    { value: "5", label: "industrial parks" },
    { value: "550,000 m²", label: "of production space" },
    { value: "2,000+", label: "sets of equipment" },
    { value: "30+", label: "branches across China" },
  ],
  zh: [
    { value: "5", label: "工业园区" },
    { value: "550,000 m²", label: "生产面积" },
    { value: "2,000+", label: "台（套）设备" },
    { value: "30+", label: "中国分支机构" },
  ],
};

export function getAboutStats(locale: AppLocale) {
  return STATS[locale] ?? STATS.ru;
}

export const aboutSubsidiaries = [
  "LCPumps Pump Manufacturing",
  "LCPumps Motor",
  "LCPumps Valve",
  "LCPumps Logistics",
  "LCPumps General Equipment Engineering",
  "Shanghai Ametek Industrial Equipment",
  "LCPumps Suzhou",
];

const EQUIPMENT: Record<AppLocale, string[]> = {
  ru: [
    "Крупный испытательный центр",
    "Трёхкоординатные измерительные машины",
    "Приборы для измерения динамического и статического равновесия",
    "Лазерные приборы быстрого прототипирования",
    "Многофункциональные дробеструйные машины",
    "Аппараты для аргонодуговой сварки",
    "Крупногабаритные вертикальные токарные станки",
  ],
  kk: [
    "Ірі сынақ орталығы",
    "Үш координаталы өлшеу машиналары",
    "Динамикалық және статикалық теңгерімді өлшеу аспаптары",
    "Жылдам лазерлік прототиптеу қондырғылары",
    "Көпфункциялы дробьатқыш машиналар",
    "Аргондоғалық дәнекерлеу аппараттары",
    "Ірі тік токарь станоктары",
  ],
  en: [
    "Large testing center",
    "Three-coordinate measuring machines",
    "Dynamic and static balance measuring instruments",
    "Rapid laser prototyping equipment",
    "Multifunctional shot-blasting machines",
    "Argon arc welding equipment",
    "Large vertical lathes",
  ],
  zh: [
    "大型检测中心",
    "三坐标测量机",
    "动静平衡测试仪",
    "激光快速成型设备",
    "多功能抛丸机",
    "氩弧焊设备",
    "大型立式车床",
  ],
};

export function getAboutEquipment(locale: AppLocale) {
  return EQUIPMENT[locale] ?? EQUIPMENT.ru;
}

export const aboutCertifications = [
  "ISO 09001",
  "ISO 14001",
  "OHSAS 18001",
  "CCC",
  "CQC",
  "CE",
  "MA",
  "SMA",
];

const AWARDS: Record<AppLocale, string[]> = {
  ru: [
    "Инновационное предприятие",
    "Известная торговая марка",
    "Известная торговая марка Шанхая",
    "Известный бренд Китая",
    "Первое национальное предприятие по производству энергосберегающих насосов",
    "Шанхайское высокотехнологичное предприятие",
    "50 лучших частных производственных предприятий Шанхая",
    "100 лучших промышленных предприятий Шанхая",
    "Десять лучших национальных брендов водной отрасли Китая",
  ],
  kk: [
    "Инновациялық кәсіпорын",
    "Танымал сауда белгісі",
    "Шанхайдың танымал сауда белгісі",
    "Қытайдың танымал бренді",
    "Энергия үнемдейтін сорғы өндіру бойынша бірінші ұлттық кәсіпорын",
    "Шанхайдың жоғары технологиялық кәсіпорны",
    "Шанхайдың үздік 50 жеке өндірістік кәсіпорны",
    "Шанхайдың үздік 100 өнеркәсіптік кәсіпорны",
    "Қытайдың су саласындағы үздік он ұлттық бренді",
  ],
  en: [
    "Innovative Enterprise",
    "Well-Known Trademark",
    "Well-Known Trademark of Shanghai",
    "Well-Known Brand of China",
    "First National Enterprise for Energy-Saving Pump Manufacturing",
    "Shanghai High-Tech Enterprise",
    "Top 50 Private Manufacturing Enterprises of Shanghai",
    "Top 100 Industrial Enterprises of Shanghai",
    "Top Ten National Brands of China's Water Industry",
  ],
  zh: [
    "创新型企业",
    "知名商标",
    "上海市著名商标",
    "中国知名品牌",
    "首批国家级节能水泵生产企业",
    "上海市高新技术企业",
    "上海市50强民营制造企业",
    "上海市100强工业企业",
    "中国水行业十大民族品牌",
  ],
};

export function getAboutAwards(locale: AppLocale) {
  return AWARDS[locale] ?? AWARDS.ru;
}

export const aboutClients = [
  { name: "General Motors", logo: "/assets/clients/general-motors.svg" },
  { name: "Bayer", logo: "/assets/clients/bayer.svg" },
  { name: "Siemens", logo: "/assets/clients/siemens.svg" },
  { name: "Volkswagen", logo: "/assets/clients/volkswagen.svg" },
  { name: "Coca-Cola", logo: "/assets/clients/coca-cola.svg" },
];

export function getAboutSubpages(locale: AppLocale): AboutSubpage[] {
  const company = getCompanyParagraphs(locale);
  const innovationIdx = findCompanyIndices((p) =>
    /инновац|патент|технолог/i.test(p)
  ).slice(0, 3);
  const sustainabilityIdx = findCompanyIndices((p) =>
    /окружающ|водн/i.test(p)
  ).slice(0, 3);

  return [
    { slug: "our-company", paragraphs: company.slice(0, 4) },
    { slug: "innovation", paragraphs: innovationIdx.map((i) => company[i]) },
    { slug: "history", paragraphs: company.slice(0, 2) },
    {
      slug: "sustainability",
      paragraphs: sustainabilityIdx.map((i) => company[i]),
    },
  ];
}

const GENERIC_ABOUT_MESSAGE: Record<AppLocale, string> = {
  ru: "Информация о LCPumps доступна в разделе О компании.",
  kk: "LCPumps туралы ақпаратты «Компания туралы» бөлімінен алуға болады.",
  en: "Information about LCPumps is available in the About Us section.",
  zh: "有关LCPumps的信息，请查看“关于我们”板块。",
};

export function getGenericAboutMessage(locale: AppLocale) {
  return GENERIC_ABOUT_MESSAGE[locale] ?? GENERIC_ABOUT_MESSAGE.ru;
}

export function getFaqItems(locale: string = "ru"): FaqItem[] {
  const company = getCompanyParagraphs(locale);
  const certIdx = findCompanyIndex((p) => /ISO|сертификац/i.test(p));
  const serviceIdx = findCompanyIndex((p) => /филиалов/i.test(p));

  return [
    {
      question: "Какие категории продукции выпускает LCPumps?",
      answer:
        "Насосы, трубопроводная арматура, электрические шкафы управления и оборудование для водоснабжения.",
    },
    {
      question: "В каких отраслях применяется продукция?",
      answer: company[2] ?? "",
    },
    {
      question: "Какие сертификаты имеет компания?",
      answer: certIdx >= 0 ? company[certIdx] ?? "" : "",
    },
    {
      question: "Есть ли сервисная сеть?",
      answer: serviceIdx >= 0 ? company[serviceIdx] ?? "" : "",
    },
  ].filter((item) => item.answer);
}

export function getApplicationsCards(locale: string = "ru") {
  const company = getCompanyParagraphs(locale);
  const buildingIdx = findCompanyIndex((p) => /строительств/i.test(p));
  const industrialIdx = findCompanyIndex((p) => /промышленн/i.test(p));

  return [
    { title: "Отрасли применения", text: company[2] ?? "" },
    {
      title: "Строительство зданий",
      text: (buildingIdx >= 0 ? company[buildingIdx] : company[2]) ?? "",
    },
    {
      title: "Промышленные и горнодобывающие предприятия",
      text: (industrialIdx >= 0 ? company[industrialIdx] : company[2]) ?? "",
    },
    { title: "Проекты", text: company[7] ?? "" },
  ];
}
