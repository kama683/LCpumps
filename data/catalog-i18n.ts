import type { AppLocale } from "@/i18n/routing";

export interface ProductTranslation {
  name: string;
  description: string[];
  specs: string[];
  applications: string[];
}

type OtherLocale = Exclude<AppLocale, "ru">;

export const CATALOG_INTRO_TRANSLATIONS: Record<OtherLocale, string> = {
  en: "LCPumps is a leading pump manufacturer in China. Its products are widely used in key national sectors such as municipal management, water resources, construction, fire protection, power engineering, environmental protection, and the oil, chemical, and mining industries, as well as in medicine. Thanks to its strong technical foundation and R&D capabilities, LCPumps provides high-quality centrifugal pump solutions for enterprises and projects around the world.",
  zh: "LCPumps是中国领先的水泵制造商。其产品广泛应用于市政管理、水利、建筑、消防、电力、环保以及石油、化工、采矿等国家重点支柱领域,并涉及医疗领域。凭借深厚的技术积累和研发能力,LCPumps为全球企业和项目提供高品质的离心泵解决方案。",
  kk: "LCPumps — Қытайдағы жетекші сорғы өндірушісі. Өнім муниципалдық басқару, су шаруашылығы, құрылыс, өртке қарсы қорғаныш, электр энергетикасы, қоршаған ортаны қорғау, мұнай, химия өнеркәсібі, тау-кен өнеркәсібі және медицина сияқты ұлттық тірек салаларында кеңінен қолданылады. LCPumps қуатты техникалық жинақталған тәжірибесі мен ҒЗТКЖ мүмкіндіктерінің арқасында әлемнің түкпір-түкпіріндегі кәсіпорындар мен жобалар үшін жоғары сапалы центрифугалық сорғы шешімдерін ұсынады.",
};

interface SectionTextTranslation {
  paragraphs?: string[];
  bullets?: string[];
}

export const SECTION_TEXT_TRANSLATIONS: Record<string, Partial<Record<OtherLocale, SectionTextTranslation>>> = {
  "control-panel": {
    en: {
      paragraphs: [
        "The electrical control system is a set of electrotechnical monitoring equipment for automating pumping stations, water supply, sewage, fire protection, HVAC, and industrial process systems.",
        "The products are used in sewage systems, fire protection and water supply systems, air conditioning (HVAC), constant-pressure water supply, diesel pump units, thin-oil stations, integrated rainwater pumping stations, environmental protection equipment, and as part of low-voltage distribution equipment. Integration with third-party products (high-voltage cabinets, explosion-proof cabinets) is possible.",
      ],
    },
    zh: {
      paragraphs: [
        "电气控制系统是用于泵站、供水、排水、消防、HVAC及工业工艺流程自动化的电气监控设备综合体。",
        "产品应用于排水系统、消防及供水系统、空调(HVAC)、恒压供水、柴油泵组、稀油站、雨水一体化泵站、环保设备,以及低压配电设备。可与第三方产品(高压柜、防爆柜)集成。",
      ],
    },
    kk: {
      paragraphs: [
        "Электр жабдығын басқару жүйесі — сорғы станцияларын, сумен жабдықтау, кәріз, өрт сөндіру, HVAC және өнеркәсіптік технологиялық процестерді автоматтандыруға арналған электротехникалық бақылау жабдығының кешені.",
        "Өнім кәріз жүйелерінде, өрт сөндіру және сумен жабдықтау жүйелерінде, ауаны баптауда (HVAC), тұрақты қысыммен сумен жабдықтауда, дизельді сорғы қондырғыларында, сұйылтылған май станцияларында, жаңбыр суына арналған кешенді сорғы станцияларында, қоршаған ортаны қорғау жабдығында, сондай-ақ төмен вольтты бөлу жабдығының құрамында қолданылады. Үшінші тарап өнімдерін (жоғары вольтты шкафтар, жарылыстан қорғалған шкафтар) интеграциялау мүмкіндігі бар.",
      ],
    },
  },
  valves: {
    en: {
      paragraphs: [
        "A full spectrum of variants and a wide range of applications. Valve bodies are cast with high precision, maintaining exact geometry. Excellent tightness guarantees leak-free operation.",
      ],
      bullets: [
        "Gate valves",
        "Butterfly valves",
        "Discharge valves",
        "Pressure reducing valves",
        "Strainers",
        "Electric valves",
        "Ball valves",
        "Control valves",
        "Water control valves",
        "Check valves",
        "Drain valves",
      ],
    },
    zh: {
      paragraphs: [
        "品种齐全,应用范围广泛。阀体铸造精度高,几何形状精确。密封性优异,保证使用中无泄漏。",
      ],
      bullets: [
        "闸阀",
        "蝶阀",
        "排放阀",
        "减压阀",
        "过滤器",
        "电动阀",
        "球阀",
        "调节阀",
        "水用调节阀",
        "止回阀",
        "排水阀",
      ],
    },
    kk: {
      paragraphs: [
        "Түрлерінің толық спектрі және қолданудың кең ауқымы. Клапан корпустары дәл геометрияны сақтай отырып жоғары дәлдікпен құйылған. Пайдалану кезінде ағып кетудің болмауына кепілдік беретін үздік тығыздық.",
      ],
      bullets: [
        "Жапқыш вентильдер",
        "Дроссельдік қақпақшалар",
        "Шығыс клапандары",
        "Қысымды азайтқыш клапандар",
        "Сүзгілер",
        "Электрлік клапандар",
        "Шар крандары",
        "Реттеуші клапандар",
        "Суға арналған реттеуші клапандар",
        "Кері клапандар",
        "Ағызу клапандары",
      ],
    },
  },
};

/** Product-text translations, keyed by slug. Russian is canonical (data/catalog.json); this
 * file only needs to supply overrides for the other three locales. */
export const PRODUCT_TRANSLATIONS: Record<string, Partial<Record<OtherLocale, ProductTranslation>>> = {
  sls: {
    en: {
      name: "SLS — Single-Stage Vertical In-Line Centrifugal Pump",
      description: [
        "SLS pumps are designed for the following applications: heating systems, hot water supply, air conditioning, cooling, water supply, and industrial processes.",
        "The pumps are fitted with 2, 4, and 6-pole asynchronous electric motors with power ratings from 0.75 to 250 kW.",
        "Impellers are made of cast iron, stainless steel, or bronze.",
        "Connection dimensions Dn 20 - 350 mm",
      ],
      specs: [
        "Flow rate, Q: 1.8~1400 m³/h",
        "Head, H: 9.2~156 m",
        "Medium temperature, t: -20°C~100°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLS — 单级立式管道离心泵",
      description: [
        "SLS水泵适用于以下领域:供热系统、热水供应、空调、制冷、供水、工业流程。",
        "水泵配备2、4、6极异步电动机,功率范围0.75~250kW。",
        "叶轮采用铸铁、不锈钢或青铜制造。",
        "连接尺寸 Dn 20 - 350 mm",
      ],
      specs: ["流量,Q: 1.8~1400 m³/h", "扬程,H: 9.2~156 m", "介质温度,t: -20°C~100°C"],
      applications: [],
    },
    kk: {
      name: "SLS — Бір сатылы тік «ин-лайн» центрифугалық сорғы",
      description: [
        "SLS сорғылары мына қолданыс салаларына арналған: жылумен жабдықтау, ыстық сумен жабдықтау, ауаны баптау, суыту, сумен жабдықтау, өнеркәсіптік процестер жүйелері.",
        "Сорғылар қуаты 0,75-тен 250 кВт-қа дейінгі 2, 4 және 6 полюсті асинхронды электр қозғалтқыштарымен жабдықталады.",
        "Жұмыс дөңгелектері шойыннан, тот баспайтын болаттан немесе қоладан жасалады.",
        "Қосылу өлшемдері Dn 20 - 350 мм",
      ],
      specs: [
        "Өнімділік, Q: 1.8~1400 м³/сағ",
        "Тегеурін, H: 9.2~156 м",
        "Айдалатын орта температурасы, t: -20°C~100°C",
      ],
      applications: [],
    },
  },
  slw: {
    en: {
      name: "SLW — Single-Stage Horizontal Monoblock Centrifugal Pump",
      description: [
        "SLW pumps are designed for the following applications: heating systems, hot water supply, air conditioning, cooling, water supply, fire protection, and industrial applications.",
        "The pumps are fitted with 2, 4, and 6-pole asynchronous electric motors with power ratings from 0.75 to 400 kW.",
        "Impellers are made of cast iron, stainless steel, or bronze.",
        "Connection dimensions Dn 25 - 400 mm",
      ],
      specs: [
        "Flow rate, Q: 2.8~1400 m³/h",
        "Head, H: 9.2~156 m",
        "Medium temperature, t: -20°C~100°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLW — 单级卧式整体式离心泵",
      description: [
        "SLW水泵适用于以下领域:供热系统、热水供应、空调、制冷、供水、消防、工业应用。",
        "水泵配备2、4、6极异步电动机,功率范围0.75~400kW。",
        "叶轮采用铸铁、不锈钢或青铜制造。",
        "连接尺寸 Dn 25 - 400 mm",
      ],
      specs: ["流量,Q: 2.8~1400 m³/h", "扬程,H: 9.2~156 m", "介质温度,t: -20°C~100°C"],
      applications: [],
    },
    kk: {
      name: "SLW — Бір сатылы көлденең моноблокты центрифугалық сорғы",
      description: [
        "SLW сорғылары мына қолданыс салаларына арналған: жылумен жабдықтау, ыстық сумен жабдықтау, ауаны баптау, суыту, сумен жабдықтау, өртке қарсы қорғаныш, өнеркәсіптік қолданыс жүйелері.",
        "Сорғылар қуаты 0,75-тен 400 кВт-қа дейінгі 2, 4 және 6 полюсті асинхронды электр қозғалтқыштарымен жабдықталады.",
        "Жұмыс дөңгелектері шойыннан, тот баспайтын болаттан немесе қоладан жасалады.",
        "Қосылу өлшемдері Dn 25 - 400 мм",
      ],
      specs: [
        "Өнімділік, Q: 2.8~1400 м³/сағ",
        "Тегеурін, H: 9.2~156 м",
        "Айдалатын орта температурасы, t: -20°C~100°C",
      ],
      applications: [],
    },
  },
  ktl: {
    en: {
      name: "KTL, KTW — Single-Stage Single-Suction Circulation Pump for Air Conditioning Systems",
      description: [
        "The motor is directly coupled, with a fully coaxial shaft, giving low vibration and noise.",
        "Inlet and outlet diameters are identical.",
        "One-piece shaft bearings with a specially designed construction ensure reliable operation.",
        "The design guarantees leak-free operation, a long service life, and 50-70% savings in operating costs.",
      ],
      specs: [
        "Flow rate, Q: 50~1200 m³/h",
        "Head, H: 20~50 m",
        "Medium temperature, t: -10°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "KTL、KTW — 单级单吸空调系统循环泵",
      description: [
        "电机直连,全同轴轴系,振动与噪音低。",
        "进出口直径相同。",
        "整体轴承与专用结构设计保障可靠运行。",
        "理想设计保证水泵无泄漏、使用寿命长,并节省50-70%的运行成本。",
      ],
      specs: ["流量,Q: 50~1200 m³/h", "扬程,H: 20~50 m", "介质温度,t: -10°C~80°C"],
      applications: [],
    },
    kk: {
      name: "KTL, KTW — Ауаны баптау жүйелеріне арналған бір жақты сорылатын бір сатылы циркуляциялық сорғы",
      description: [
        "Қозғалтқыш тікелей қосылған, білігі толық қосостьті, діріл мен шу деңгейі төмен.",
        "Кіріс және шығыс диаметрлері бірдей.",
        "Тұтас біліктегі мойынтіректер мен арнайы конструкция сенімді жұмысты қамтамасыз етеді.",
        "Үздік конструкция сорғыда ағып кетуді болдырмайды, ұзақ қызмет мерзімін қамтамасыз етеді және пайдалану шығындарын 50-70%-ға үнемдейді.",
      ],
      specs: [
        "Өнімділік, Q: 50~1200 м³/сағ",
        "Тегеурін, H: 20~50 м",
        "Айдалатын орта температурасы, t: -10°C~80°C",
      ],
      applications: [],
    },
  },
  sll: {
    en: {
      name: "SLL — Large Vertical Single-Stage Single-Suction Centrifugal Pump",
      description: [
        "Thanks to advanced hydraulic design software, the pump offers excellent hydraulic performance and high reliability and stability.",
        "The pump has a vertical design with axial suction and horizontal discharge. Two mounting methods are available: single-layer and two-layer foundations. When mounted on a two-layer foundation, a drive shaft extension can be added according to the required installation height.",
        "The shaft seal is sealed with packing, is easy to install and maintain, and does not require external water flushing.",
        "Viewed from the motor side, the impeller rotates counterclockwise.",
      ],
      specs: [
        "Flow rate (Q): 2800~21600 m³/h",
        "Head, H: 17~70 m",
        "Medium temperature, t: ≤50°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLL — 大型立式单级单吸离心泵",
      description: [
        "采用先进的水力设计软件,水泵具有优异的水力性能及高可靠性与稳定性。",
        "水泵为立式结构,轴向吸入、水平排出。提供单层及双层基础两种安装方式。安装于双层基础时,可根据安装高度要求加装传动轴。",
        "轴封采用填料密封,安装维护方便,无需外部冲水。",
        "从电机侧看,叶轮逆时针旋转。",
      ],
      specs: ["流量(Q): 2800~21600 m³/h", "扬程,H: 17~70 m", "介质温度,t: ≤50°C"],
      applications: [],
    },
    kk: {
      name: "SLL — Бір жақты сорылатын ірі тік бір сатылы центрифугалық сорғы",
      description: [
        "Гидравликаны жобалаудың озық бағдарламалық қамтамасын пайдалану арқасында сорғы жоғары гидравликалық сипаттамаларға, жоғары сенімділік пен тұрақтылыққа ие.",
        "Сорғы осьтік сору және көлденең айдау арқылы тік конструкция болып табылады. Екі орнату тәсілі қарастырылған: біржалпақ және екіжалпақ іргетасқа. Екіжалпақ іргетасқа орнатқанда орнату биіктігі талаптарына сай жетек білігін қосуға болады.",
        "Біліктің тығыздауышы толтырғышпен тығыздалған, оңай орнатылады және қызмет көрсетіледі, сыртқы сумен шаюды қажет етпейді.",
        "Қозғалтқыш жағынан қарағанда жұмыс дөңгелегі сағат тіліне қарсы айналады.",
      ],
      specs: [
        "Өнімділік (Q): 2800~21600 м³/сағ",
        "Тегеурін, H: 17~70 м",
        "Айдалатын орта температурасы, t: ≤50°C",
      ],
      applications: [],
    },
  },
  slnc: {
    en: {
      name: "SLNC — Single-Stage Horizontal Cantilever Monoblock Centrifugal Pump",
      description: [
        "SLNC pumps are designed for the following applications: heating systems, air conditioning, cooling, water supply, fire protection, and industrial applications.",
        "The pumps are fitted with 2, 4, and 6-pole asynchronous electric motors with power ratings from 2.2 to 355 kW.",
        "Impellers are made of cast iron, stainless steel, or bronze. Flow rate up to 2000 m³/h, head up to 140 m. Medium temperature range from -20°C to +100°C. Connection dimensions Dn 32 - 350 mm",
      ],
      specs: [
        "Flow rate, Q: 15~2000 m³/h",
        "Head, H: 10~140 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLNC — 单级卧式悬臂整体式离心泵",
      description: [
        "SLNC水泵适用于以下领域:供热系统、空调、制冷、供水、消防、工业应用。",
        "水泵配备2、4、6极异步电动机,功率范围2.2~355kW。",
        "叶轮采用铸铁、不锈钢或青铜制造。流量最高可达2000m³/h,扬程最高140m。介质温度范围-20°C至+100°C。连接尺寸Dn 32 - 350 mm",
      ],
      specs: ["流量,Q: 15~2000 m³/h", "扬程,H: 10~140 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "SLNC — Бір сатылы көлденең консольді-моноблокты центрифугалық сорғы",
      description: [
        "SLNC сорғылары мына қолданыс салаларына арналған: жылумен жабдықтау, ауаны баптау, суыту, сумен жабдықтау, өртке қарсы қорғаныш, өнеркәсіптік қолданыс жүйелері.",
        "Сорғылар қуаты 2,2-ден 355 кВт-қа дейінгі 2, 4 және 6 полюсті асинхронды электр қозғалтқыштарымен жабдықталады.",
        "Жұмыс дөңгелектері шойыннан, тот баспайтын болаттан немесе қоладан жасалады. Шығыны 2000 м³/сағ-қа, тегеуріні 140 м-ге дейін. Айдалатын орталардың температура диапазоны -20°C-тан +100°C-қа дейін. Қосылу өлшемдері Dn 32 - 350 мм",
      ],
      specs: [
        "Өнімділік, Q: 15~2000 м³/сағ",
        "Тегеурін, H: 10~140 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  is: {
    en: {
      name: "IS — Single-Suction Centrifugal Pump",
      description: [
        "This is a highly efficient, energy-saving hydraulic model that ensures efficient and stable operation.",
        "The design is advanced, sealing is reliable, maintenance is convenient, and service life is long. Either a mechanical (face) seal or packing gland can be fitted.",
        "Simple to operate with stable performance.",
        "A back pull-out design makes maintenance simple, with no need for disassembly during servicing.",
      ],
      specs: [
        "Flow rate, Q: 3.4~1440 m³/h",
        "Head, H: 3.7~133 m",
        "Medium temperature, t: -20°C~100°C",
      ],
      applications: [],
    },
    zh: {
      name: "IS — 单吸离心泵",
      description: [
        "高效节能水力模型,确保运行高效稳定。",
        "结构先进,密封可靠,维护方便,使用寿命长。可选配机械密封(端面密封)或填料密封。",
        "操作简便,性能稳定。",
        "后开门式结构,维护简便,无需拆卸即可进行保养。",
      ],
      specs: ["流量,Q: 3.4~1440 m³/h", "扬程,H: 3.7~133 m", "介质温度,t: -20°C~100°C"],
      applications: [],
    },
    kk: {
      name: "IS — Бір жақты сорылатын центрифугалық сорғы",
      description: [
        "Бұл тиімді әрі тұрақты жұмысты қамтамасыз ететін жоғары тиімді энергия үнемдеуші гидравликалық үлгі.",
        "Конструкциясы жетілдірілген, тығыздалуы сенімді, техникалық қызмет көрсету ыңғайлы, қызмет мерзімі ұзақ. Механикалық (торцтық) тығыздауыш немесе сальник набивкасын орнату мүмкіндігі бар.",
        "Пайдалануға қарапайым және тұрақты өнімділік.",
        "Артқы есігі ашылатын конструкция, оның артықшылығы — қызмет көрсетудің қарапайымдылығы және техникалық қызмет көрсету үшін бөлшектеудің қажет еместігі.",
      ],
      specs: [
        "Өнімділік, Q: 3.4~1440 м³/сағ",
        "Тегеурін, H: 3.7~133 м",
        "Айдалатын орта температурасы, t: -20°C~100°C",
      ],
      applications: [],
    },
  },
  s: {
    en: {
      name: "S — Single-Stage Double-Suction Centrifugal Pump",
      description: [
        "The use of advanced CFD design software ensures a high-quality model for water resource conservation.",
        "Strict compliance with the international ISO9001 quality management standard guarantees high product quality.",
        "Thoughtful design and manufacturing ensure efficient and stable pump operation.",
      ],
      specs: [
        "Flow rate, Q: 133~20000 m³/h",
        "Head, H: 10~125 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "S — 单级双吸离心泵",
      description: [
        "采用先进的CFD设计软件,确保节水型号的高品质。",
        "严格遵循ISO9001国际质量管理体系标准,保证产品高品质。",
        "精心的设计与制造确保水泵高效稳定运行。",
      ],
      specs: ["流量,Q: 133~20000 m³/h", "扬程,H: 10~125 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "S — Екі жақты сорылатын бір сатылы центрифугалық сорғы",
      description: [
        "Сорғыны жобалауда озық CFD бағдарламалық қамтамасын пайдалану су ресурстарын сақтау үшін жоғары сапалы үлгіні қамтамасыз етеді.",
        "ISO9001 халықаралық сапа жүйесі стандарттарына қатаң сәйкестік өнімнің жоғары сапасына кепілдік береді.",
        "Ойластырылған дизайн мен өндіріс сорғының тиімді және тұрақты жұмысын қамтамасыз етеді.",
      ],
      specs: [
        "Өнімділік, Q: 133~20000 м³/сағ",
        "Тегеурін, H: 10~125 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  gdl: {
    en: {
      name: "GDL — Vertical Multistage Pipeline Centrifugal Pump",
      description: [
        "The model has a vertical segmented design with a stainless steel casing, so the inlet and outlet are coaxial with the same diameter, allowing installation in a pipeline like a valve.",
        "Takes up little space and is easy to install.",
        "High efficiency and energy savings, uninterrupted operation.",
        "The shaft seal is fitted with a wear-resistant mechanical seal, ensuring leak-free operation and a long service life.",
      ],
      specs: [
        "Flow rate, Q: 2~86 m³/h",
        "Head, H: 25~180 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "GDL — 立式多级管道离心泵",
      description: [
        "该型号为立式分段结构,泵壳采用不锈钢制造,进出口同轴且直径相同,可像阀门一样安装于管道中。",
        "占地面积小,安装方便。",
        "高效节能,运行不间断。",
        "轴封采用耐磨机械密封,确保无泄漏及长使用寿命。",
      ],
      specs: ["流量,Q: 2~86 m³/h", "扬程,H: 25~180 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "GDL — Тік көпсатылы құбыржелілік центрифугалық сорғы",
      description: [
        "Үлгі тот баспайтын болаттан жасалған корпусы бар тік сегменттелген конструкция болып табылады, сондықтан кіріс пен шығыс тесіктері бірдей диаметрмен қосостьті орналасқан, құбыржелісіне вентиль ретінде орнатуға болады.",
        "Аз орын алады және орнатуы қарапайым.",
        "Жоғары тиімділік пен энергия үнемдеу, үздіксіз жұмыс.",
        "Біліктің тығыздауышы тозуға төзімді механикалық тығыздауышпен жабдықталған, бұл ағып кетуді болдырмайды және ұзақ қызмет мерзімін қамтамасыз етеді.",
      ],
      specs: [
        "Өнімділік, Q: 2~86 м³/сағ",
        "Тегеурін, H: 25~180 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  slg: {
    en: {
      name: "SLG — Vertical Multistage Centrifugal Pump",
      description: [
        "SLG pumps are designed for the following applications: pressure-boosting systems, air conditioning, cooling, water supply, fire protection, boiler feed and steam condensate transfer, reverse osmosis, filtration, and industrial applications.",
        "The pumps are fitted with asynchronous electric motors with power ratings from 0.37 to 110 kW.",
        "Impellers are made of stainless steel. The pump casing can be made of cast iron or stainless steel.",
      ],
      specs: [
        "Flow rate, Q: 0.6~260 m³/h",
        "Head, H: 5.6~330 m",
        "Medium temperature, t: -15°C~105°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLG — 立式多级离心泵",
      description: [
        "SLG水泵适用于以下领域:增压系统、空调、制冷、供水、消防、锅炉给水及蒸汽冷凝水输送、反渗透、过滤、工业应用。",
        "水泵配备功率范围0.37~110kW的异步电动机。",
        "叶轮采用不锈钢制造。泵壳可采用铸铁或不锈钢制造。",
      ],
      specs: ["流量,Q: 0.6~260 m³/h", "扬程,H: 5.6~330 m", "介质温度,t: -15°C~105°C"],
      applications: [],
    },
    kk: {
      name: "SLG — Тік көпсатылы центрифугалық сорғы",
      description: [
        "SLG сорғылары мына қолданыс салаларына арналған: қысымды арттыру жүйелері, ауаны баптау, суыту, сумен жабдықтау, өртке қарсы қорғаныш, қазандықтарды қоректендіру және бу конденсатын айдау, кері осмос, сүзу, өнеркәсіптік қолданыс жүйелері.",
        "Сорғылар қуаты 0,37-ден 110 кВт-қа дейінгі асинхронды электр қозғалтқыштарымен жабдықталады.",
        "Жұмыс дөңгелектері тот баспайтын болаттан жасалады. Сорғы корпусы шойыннан немесе тот баспайтын болаттан жасалуы мүмкін.",
      ],
      specs: [
        "Өнімділік, Q: 0.6~260 м³/сағ",
        "Тегеурін, H: 5.6~330 м",
        "Айдалатын орта температурасы, t: -15°C~105°C",
      ],
      applications: [],
    },
  },
  slow: {
    en: {
      name: "SLO(W) — Single-Stage Double-Suction Split-Case Centrifugal Pump",
      description: [
        "The optimized double-suction impeller design minimizes axial thrust, offers excellent hydraulic performance, and is cast with high precision.",
        "The inner surface of the pump casing and the impeller surface are extremely smooth, with significant cavitation resistance and efficiency 2-5% higher than the S series.",
        "When the average temperature is 80-130, it can be adjusted according to site conditions.",
      ],
      specs: [
        "Flow rate, Q: 80~9000 m³/h",
        "Head, H: 22~200 m",
        "Medium temperature, t: -20°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLO(W) — 单级双吸中开式离心泵",
      description: [
        "优化设计的双吸叶轮将轴向力降至最低,具有优异的水力性能,铸造精度高。",
        "泵壳内表面及叶轮表面极为光滑,抗汽蚀能力强,效率比S系列高2-5%。",
        "当平均温度为80-130时,可根据现场条件进行调整。",
      ],
      specs: ["流量,Q: 80~9000 m³/h", "扬程,H: 22~200 m", "介质温度,t: -20°C~80°C"],
      applications: [],
    },
    kk: {
      name: "SLO(W) — Бөлінетін спираль корпусты екі жақты сорылатын бір сатылы центрифугалық сорғы",
      description: [
        "Екі жақты сорылатын жұмыс дөңгелегінің оңтайландырылған конструкциясы осьтік күшті минимумға дейін төмендетеді, жоғары гидравликалық сипаттамаларға ие және жоғары дәлдікпен құйылған.",
        "Сорғы корпусының ішкі беті мен жұмыс дөңгелегінің беті өте тегіс, кавитацияға айтарлықтай төзімділікпен және S сериясынан 2-5%-ға жоғары тиімділікпен.",
        "Орташа температура 80-130 болғанда, оны жергілікті жағдайларға сай реттеуге болады.",
      ],
      specs: [
        "Өнімділік, Q: 80~9000 м³/сағ",
        "Тегеурін, H: 22~200 м",
        "Айдалатын орта температурасы, t: -20°C~80°C",
      ],
      applications: [],
    },
  },
  slown: {
    en: {
      name: "SLOWN — High-Efficiency Double-Suction Centrifugal Pump",
      description: [
        "The model has a vertical segmented design with a stainless steel casing, so the inlet and outlet are coaxial with the same diameter, allowing installation in a pipeline like a valve.",
        "Takes up little space and is easy to install.",
        "High efficiency and energy savings, uninterrupted operation.",
        "The shaft seal is fitted with a wear-resistant mechanical seal, ensuring leak-free operation and a long service life.",
      ],
      specs: [
        "Flow rate, Q: 65~25000 m³/h",
        "Head, H: 10~270 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLOWN — 高效双吸离心泵",
      description: [
        "该型号为立式分段结构,泵壳采用不锈钢制造,进出口同轴且直径相同,可像阀门一样安装于管道中。",
        "占地面积小,安装方便。",
        "高效节能,运行不间断。",
        "轴封采用耐磨机械密封,确保无泄漏及长使用寿命。",
      ],
      specs: ["流量,Q: 65~25000 m³/h", "扬程,H: 10~270 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "SLOWN — Жоғары тиімді екі жақты сорылатын центрифугалық сорғы",
      description: [
        "Үлгі тот баспайтын болаттан жасалған корпусы бар тік сегменттелген конструкция болып табылады, сондықтан кіріс пен шығыс тесіктері бірдей диаметрмен қосостьті орналасқан, құбыржелісіне вентиль ретінде орнатуға болады.",
        "Аз орын алады және орнатуы қарапайым.",
        "Жоғары тиімділік пен энергия үнемдеу, үздіксіз жұмыс.",
        "Біліктің тығыздауышы тозуға төзімді механикалық тығыздауышпен жабдықталған, бұл ағып кетуді болдырмайды және ұзақ қызмет мерзімін қамтамасыз етеді.",
      ],
      specs: [
        "Өнімділік, Q: 65~25000 м³/сағ",
        "Тегеурін, H: 10~270 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  "slow-2stage": {
    en: {
      name: "SLOW — Two-Stage Double-Suction Split-Case Centrifugal Pump",
      description: [
        "Can meet the needs of power plants, pumping stations, and steel mills requiring high water flow and head.",
        "Smooth operation and easy maintenance.",
        "The impeller has double suction on the first stage and single suction on the second stage, improving the pump's cavitation performance and reducing shaft load.",
        "The unit uses a mechanical seal that allows leak-free operation for 8,000 hours; the packing can be made to customer requirements.",
        "Rolling bearings lubricated with grease or thin oil are used, and the bearings are easy to maintain.",
      ],
      specs: [
        "Flow rate, Q: 350~1250 m³/h",
        "Head, H: 97~240 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLOW — 两级双吸中开式离心泵",
      description: [
        "可满足电厂、泵站及钢铁厂对大流量、高扬程的需求。",
        "运行平稳,维护简便。",
        "叶轮一级为双吸、二级为单吸,改善了水泵的汽蚀性能并减轻轴的负荷。",
        "机组采用机械密封,可实现8000小时无泄漏运行,填料可按客户要求定制。",
        "采用润滑脂或稀油润滑的滚动轴承,轴承维护简便。",
      ],
      specs: ["流量,Q: 350~1250 m³/h", "扬程,H: 97~240 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "SLOW — Бөлінетін спираль корпусты екі жақты сорылатын екі сатылы центрифугалық сорғы",
      description: [
        "Судың үлкен шығыны мен тегеуріні бар электр станцияларының, сорғы станцияларының және болат зауыттарының қажеттіліктерін қанағаттандыра алады.",
        "Тегіс жұмыс және қызмет көрсетудің қарапайымдылығы.",
        "Жұмыс дөңгелегінің бірінші сатысы екі жақты, екінші сатысы бір жақты сорылады, бұл сорғының кавитациялық сипаттамаларын жақсартады және білікке түсетін жүктемені азайтады.",
        "Агрегатта механикалық тығыздауыш қолданылады, бұл 8000 сағат бойы ағып кетусіз жұмыс істеуге мүмкіндік береді, толтырғыш тапсырысшының талаптарына сай жасалуы мүмкін.",
        "Консистентті майлаумен немесе сұйылтылған маймен майланатын домалақ мойынтіректер қолданылады, мойынтіректерге қызмет көрсету қарапайым.",
      ],
      specs: [
        "Өнімділік, Q: 350~1250 м³/сағ",
        "Тегеурін, H: 97~240 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  "slow-multistage": {
    en: {
      name: "SLOW — Multistage Double-Inlet Centrifugal Pump",
      description: [
        "Can meet the needs of power plants, pumping stations, and steel mills requiring high water flow and head.",
        "Balanced axial thrust on the pump.",
        "The pump's sealing components are located on the low-pressure side, which extends the service life of the sealing material and increases the corrosion resistance of parts subject to current overloads.",
        "Combines advanced multistage pump design experience accumulated domestically and abroad.",
        "Pumped medium: water or liquid containing solid particles.",
      ],
      specs: [
        "Flow rate, Q: 288~14400 m³/h",
        "Head, H: 150~280 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLOW — 双入口多级离心泵",
      description: [
        "可满足电厂、泵站及钢铁厂对大流量、高扬程的需求。",
        "泵的轴向推力保持平衡。",
        "水泵密封件位于低压侧,延长了密封材料的使用寿命,并提高了易受过流冲击部件的耐腐蚀性。",
        "集国内外多级泵设计先进经验于一体。",
        "输送介质:水或含固体颗粒的液体。",
      ],
      specs: ["流量,Q: 288~14400 m³/h", "扬程,H: 150~280 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "SLOW — Қос кірісті көпсатылы центрифугалық сорғы",
      description: [
        "Судың үлкен шығыны мен тегеуріні бар электр станцияларының, сорғы станцияларының және болат зауыттарының қажеттіліктерін қанағаттандыра алады.",
        "Сорғының осьтік тартылысы теңгерілген.",
        "Сорғының тығыздауыш бөлшектері төмен қысым жағында орналасқан, бұл тығыздауыш материалдың қызмет мерзімін ұзартады және ток асқын жүктемелеріне ұшырайтын бөлшектердің коррозияға төзімділігін арттырады.",
        "Елде және шетелде жинақталған көпсатылы сорғыларды жобалаудың озық тәжірибесін біріктіреді.",
        "Айдалатын орта: су немесе қатты бөлшектер бар сұйықтық.",
      ],
      specs: [
        "Өнімділік, Q: 288~14400 м³/сағ",
        "Тегеурін, H: 150~280 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  dg: {
    en: {
      name: "DG — Multistage Boiler Feed Water Pump",
      description: [
        "This pump's advantage comes from advanced international technologies.",
        "High efficiency and good cavitation performance.",
        "Low vibration and noise levels, smooth operation.",
      ],
      specs: [
        "Flow rate, Q: 3.75~300 m³/h",
        "Head, H: 75~1920 m",
        "Medium temperature, t: 0°C~170°C",
      ],
      applications: [],
    },
    zh: {
      name: "DG — 多级锅炉给水泵",
      description: [
        "该泵的优势源于先进的国际技术。",
        "高效率及良好的汽蚀性能。",
        "振动与噪音低,运行平稳。",
      ],
      specs: ["流量,Q: 3.75~300 m³/h", "扬程,H: 75~1920 m", "介质温度,t: 0°C~170°C"],
      applications: [],
    },
    kk: {
      name: "DG — Қазандыққа су беруге арналған көпсатылы сорғы",
      description: [
        "Бұл сорғының артықшылығы озық халықаралық технологиялармен қамтамасыз етіледі.",
        "Жоғары тиімділік пен жақсы кавитациялық сипаттамалар.",
        "Төмен діріл мен шу деңгейі, тегіс жұмыс.",
      ],
      specs: [
        "Өнімділік, Q: 3.75~300 м³/сағ",
        "Тегеурін, H: 75~1920 м",
        "Айдалатын орта температурасы, t: 0°C~170°C",
      ],
      applications: [],
    },
  },
  sld: {
    en: {
      name: "SLD — Horizontal Multistage Centrifugal Pump",
      description: [
        "The pump's inlet is horizontal, and the outlet is vertical.",
        "Both ends of the shaft are fitted with replaceable sleeves to protect the shaft.",
        "The bearing housing has two types of bearings: rolling and sliding.",
        "The pump is driven directly by the motor through a flexible coupling.",
        "Viewed from the drive side, rotation is clockwise.",
      ],
      specs: [
        "Flow rate, Q: 6.3~1100 m³/h",
        "Head, H: 22~1153 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "SLD — 卧式多级离心泵",
      description: [
        "水泵进口水平布置,出口垂直布置。",
        "轴两端配有可更换护套以保护轴。",
        "承载部位设有滚动轴承和滑动轴承两种类型。",
        "水泵通过弹性联轴器由电机直接驱动。",
        "从驱动侧看,旋转方向为顺时针。",
      ],
      specs: ["流量,Q: 6.3~1100 m³/h", "扬程,H: 22~1153 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "SLD — Көлденең көпсатылы центрифугалық сорғы",
      description: [
        "Сорғының кіріс тесігі көлденең, ал шығыс тесігі тік орналасқан.",
        "Біліктің екі ұшы да оны қорғауға арналған ауыстырылатын төлкелермен жабдықталған.",
        "Тіреу бөлігінде домалақ мойынтіректер мен сырғанау мойынтіректерінің екі түрі бар.",
        "Сорғы серпімді муфта арқылы қозғалтқышпен тікелей іске қосылады.",
        "Жетек жағынан қарағанда айналу сағат тілі бойымен жүреді.",
      ],
      specs: [
        "Өнімділік, Q: 6.3~1100 м³/сағ",
        "Тегеурін, H: 22~1153 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  md: {
    en: {
      name: "MD — Wear-Resistant Multistage Single-Suction Mine Centrifugal Pump",
      description: [
        "Special alloyed wear-resistant cast iron is used for mine drainage.",
        "High efficiency and excellent cavitation performance.",
        "Smooth and reliable operation.",
      ],
      specs: [
        "Flow rate, Q: 25~1100 m³/h",
        "Head, H: 90~1153 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "MD — 耐磨多级单吸矿用离心泵",
      description: [
        "矿井排水采用特殊合金耐磨铸铁材料。",
        "高效率及优异的汽蚀性能。",
        "运行平稳可靠。",
      ],
      specs: ["流量,Q: 25~1100 m³/h", "扬程,H: 90~1153 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "MD — Тозуға төзімді көпсатылы бір жақты сорылатын шахталық центрифугалық сорғы",
      description: [
        "Шахталарды дренаждау үшін арнайы легирленген тозуға төзімді шойын қолданылады.",
        "Жоғары тиімділік пен тамаша кавитациялық сипаттамалар.",
        "Тегіс және сенімді жұмыс.",
      ],
      specs: [
        "Өнімділік, Q: 25~1100 м³/сағ",
        "Тегеурін, H: 90~1153 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  zhlbq: {
    en: {
      name: "Z(H)LB(Q) — Vertical Axial (Mixed) Flow Pump",
      description: [
        "A cutting-edge hydraulic model is used, with a wide range of high efficiency, stable performance, and excellent cavitation resistance.",
        "The impeller is precision investment-cast, the surface is smooth, the casting dimensional accuracy matches the design precision, and hydraulic friction is reduced.",
        "Impulse losses are significantly reduced, blade balancing is excellent, and efficiency is 3-5% higher than conventional impellers.",
      ],
      specs: ["Q: 500~200,000 m³/h", "H: 1~30.6 m", "Medium temperature, t: 0°C~50°C"],
      applications: [],
    },
    zh: {
      name: "Z(H)LB(Q) — 立式轴流(混流)泵",
      description: [
        "采用最新完善的水力模型,拥有高效运行范围广、性能稳定及优异的抗汽蚀能力。",
        "叶轮采用熔模精密铸造,表面光滑,铸造尺寸精度与设计精度一致,水力摩擦降低。",
        "冲量损失显著降低,叶片平衡性优异,效率比普通叶轮高3-5%。",
      ],
      specs: ["Q: 500~200,000 m³/h", "H: 1~30.6 m", "介质温度,t: 0°C~50°C"],
      applications: [],
    },
    kk: {
      name: "Z(H)LB(Q) — Тік осьтік (аралас) ағынды сорғы",
      description: [
        "Кең ауқымды жоғары тиімділігі, тұрақты өнімділігі және кавитацияға тамаша төзімділігі бар ең жаңа әрі жетілдірілген гидравликалық үлгі қолданылады.",
        "Жұмыс дөңгелегі балауыз үлгі бойынша дәлдікпен құйылған, беті тегіс, құю өлшемдерінің дәлдігі конструкция дәлдігіне сәйкес келеді, гидравликалық үйкеліс азайтылған.",
        "Импульс кезіндегі шығындар айтарлықтай азаяды, қалақшалардың теңгерімі тамаша, ПӘК әдеттегі жұмыс дөңгелектеріне қарағанда 3-5%-ға жоғары.",
      ],
      specs: [
        "Q: 500~200 000 м³/сағ",
        "H: 1~30.6 м",
        "Айдалатын орта температурасы, t: 0°C~50°C",
      ],
      applications: [],
    },
  },
  lpt: {
    en: {
      name: "LP(T) — Vertical Long-Shaft Drainage Pump",
      description: [
        "The pump impeller is fully submerged in the liquid, so no priming with water is needed at start-up.",
        "Wear-resistant materials are used for the impeller, expanding the pump's range of applications.",
        "The pump is equipped with a reverse-rotation protection device that effectively prevents the pump from spinning backward.",
      ],
      specs: [
        "Q: 15~20,000 m³/h",
        "H: 3~300 m",
        "Medium temperature, t: 0°C~60°C",
        "p: ≤20 bar",
      ],
      applications: [],
    },
    zh: {
      name: "LP(T) — 立式长轴排水泵",
      description: [
        "水泵叶轮完全浸没于液体中,启动时无需灌水。",
        "叶轮材料采用耐磨材料,拓宽了水泵的应用范围。",
        "水泵配备防倒转保护装置,可有效防止水泵反向旋转。",
      ],
      specs: ["Q: 15~20,000 m³/h", "H: 3~300 m", "介质温度,t: 0°C~60°C", "p: ≤20 bar"],
      applications: [],
    },
    kk: {
      name: "LP(T) — Ұзын біліктегі тік дренаждық сорғы",
      description: [
        "Сорғының жұмыс дөңгелегі толығымен сұйықтыққа батырылған, сондықтан іске қосу кезінде суды толтырудың қажеті жоқ.",
        "Жұмыс дөңгелегінің материалы ретінде тозуға төзімді материалдар қолданылады, бұл сорғының қолданылу аясын кеңейтеді.",
        "Сорғы кері айналудан қорғау құрылғысымен жабдықталған, ол сорғының кері айналуын тиімді болдырмайды.",
      ],
      specs: [
        "Q: 15~20000 м³/сағ",
        "H: 3~300 м",
        "Айдалатын орта температурасы, t: 0°C~60°C",
        "p: ≤20 бар",
      ],
      applications: [],
    },
  },
  slfz: {
    en: {
      name: "SLFZ — Sealless Self-Priming Pump with Automatic Control",
      description: [
        "With the power seal device, no wear occurs during operation, giving a service life more than 10 times longer than traditional products.",
        "Operating costs over 10 years amount to 50% of the cost of a packing seal and 70% of the cost of a mechanical seal.",
        "Self-priming performance is stable and reliable thanks to the use of an electric air control valve.",
        "The unit has low vibration and low noise levels and does not require a fixed foundation.",
        "Excellent automatic control function. Can be integrated with corresponding control systems to achieve a high degree of automation.",
      ],
      specs: [
        "Flow rate, Q: 0.75~6800 m³/h",
        "Head, H: 4~130 m",
        "Medium temperature, t: -10°C~80°C",
        "Pressure, p: ≤16 bar",
      ],
      applications: [],
    },
    zh: {
      name: "SLFZ — 无泄漏自吸式自动控制泵",
      description: [
        "采用动力密封装置,运行中无磨损,使用寿命比传统产品长10倍以上。",
        "10年运行成本仅为填料密封成本的50%及机械密封成本的70%。",
        "采用电动空气调节阀,自吸性能稳定可靠。",
        "设备振动小、噪音低,无需固定基础。",
        "自动控制功能优异,可与相应控制系统联动,实现高度自动化。",
      ],
      specs: [
        "流量,Q: 0.75~6800 m³/h",
        "扬程,H: 4~130 m",
        "介质温度,t: -10°C~80°C",
        "压力,p: ≤16 bar",
      ],
      applications: [],
    },
    kk: {
      name: "SLFZ — Автоматты басқарылатын негерметикалық өздігінен сорылатын сорғы",
      description: [
        "Күштік тығыздауыш құрылғысын қолданғанда пайдалану барысында тозу болмайды, қызмет мерзімі дәстүрлі өнімдерге қарағанда 10 еседен астам ұзақ.",
        "10 жыл ішіндегі пайдалану шығындары сальник тығыздауышы құнының 50%-ын және механикалық тығыздауыш құнының 70%-ын құрайды.",
        "Электрлік ауа реттеу клапанын қолдану арқасында өздігінен сору өнімділігі тұрақты әрі сенімді.",
        "Құрылғының дірілі мен шу деңгейі төмен, тұрақты негізді қажет етпейді.",
        "Автоматты басқарудың тамаша функциясы. Автоматтандырудың жоғары дәрежесіне қол жеткізу үшін тиісті басқару жүйелерімен үйлестірілуі мүмкін.",
      ],
      specs: [
        "Өнімділік, Q: 0.75~6800 м³/сағ",
        "Тегеурін, H: 4~130 м",
        "Айдалатын орта температурасы, t: -10°C~80°C",
        "Қысым, p: ≤16 бар",
      ],
      applications: [],
    },
  },
  ay: {
    en: {
      name: "AY — Centrifugal Petrochemical Pump",
      description: [
        "A new type of oil pump incorporating advanced foreign technologies and featuring a new design.",
        "The hydraulic section uses an energy-efficient hydraulic model to ensure high operating efficiency.",
        "Material selection is carefully considered, with the main housing made primarily of Class I and II materials.",
      ],
      specs: [
        "Flow rate, Q: 6.3~600 m³/h",
        "Head, H: 33~356 m",
        "Medium temperature, t: -45°C~400°C",
        "Pressure, p: ≤4.0 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "AY — 石油化工离心泵",
      description: [
        "采用国外先进技术、设计全新的新型油泵。",
        "水力部分采用高能效水力模型,确保运行高效。",
        "材料选择经过精心考量,主体壳体主要采用I级及II级材料制造。",
      ],
      specs: [
        "流量,Q: 6.3~600 m³/h",
        "扬程,H: 33~356 m",
        "介质温度,t: -45°C~400°C",
        "压力,p: ≤4.0 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "AY — Мұнайхимиялық центрифугалық сорғы",
      description: [
        "Шетелдік озық технологиялар енгізілген және жаңа дизайні бар май сорғысының жаңа түрі.",
        "Гидравликалық бөлігі жоғары жұмыс тиімділігін қамтамасыз ету үшін энергия үнемдеуші гидравликалық үлгіні пайдаланады.",
        "Материалдарды таңдау мұқият ойластырылған, негізгі корпус негізінен I және II класс материалдарынан тұрады.",
      ],
      specs: [
        "Өнімділік, Q: 6.3~600 м³/сағ",
        "Тегеурін, H: 33~356 м",
        "Айдалатын орта температурасы, t: -45°C~400°C",
        "Қысым, p: ≤4.0 МПа",
      ],
      applications: [],
    },
  },
  "ay-multistage": {
    en: {
      name: "AY — Multistage Centrifugal Petrochemical Pump",
      description: [
        "The current-overload-driven hydraulic sections use an efficient, energy-saving hydraulic model with high efficiency.",
        "The design uses high-quality sliding bearings and fitted thrust ball bearings, self-lubricating with thin oil, with an oil-flinger ring and water cooling.",
      ],
      specs: [
        "Flow rate, Q: 6.25~180 m³/h",
        "Head, H: 105~657 m",
        "Medium temperature, t: 0°C~300°C",
      ],
      applications: [],
    },
    zh: {
      name: "AY型 — 多级石油化工离心泵",
      description: [
        "过流部件采用高效节能水力模型,效率高。",
        "结构采用优质滑动轴承及推力球轴承,以稀油自润滑并配有甩油环及水冷却。",
      ],
      specs: ["流量,Q: 6.25~180 m³/h", "扬程,H: 105~657 m", "介质温度,t: 0°C~300°C"],
      applications: [],
    },
    kk: {
      name: "AY типті көпсатылы мұнайхимиялық центрифугалық сорғы",
      description: [
        "Ток асқын жүктемесінен жұмыс істейтін гидравликалық бөліктер жоғары ПӘК-пен тиімді энергия үнемдеуші гидравликалық үлгіні пайдаланады.",
        "Конструкцияда жоғары сапалы сырғанау мойынтіректері мен май бөлгіш сақинасы бар сұйылтылған маймен өздігінен майланатын және сумен салқындатылатын тірек шар мойынтіректері орнатылған.",
      ],
      specs: [
        "Өнімділік, Q: 6.25~180 м³/сағ",
        "Тегеурін, H: 105~657 м",
        "Айдалатын орта температурасы, t: 0°C~300°C",
      ],
      applications: [],
    },
  },
  slza: {
    en: {
      name: "SLZA — Chemical Process Pump",
      description: [
        "Developed in accordance with the API610 standard (eighth edition), the pump has a component assembly and an extended coupling.",
        "The double-volute pump casing has a large pipe diameter and a high corrosion resistance limit.",
        "A mechanical or packing seal can be selected according to various requirements.",
        "Worn parts can be replaced, and maintenance is fast and convenient.",
      ],
      specs: [
        "Flow rate, Q: 5~2400 m³/h",
        "Head, H: 14~300 m",
        "Medium temperature, t: -80°C~450°C",
        "Pressure, p: ≤4.0 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "SLZA — 化工工艺泵",
      description: [
        "按照API610标准(第八版)设计,水泵采用组件式结构及加长联轴器。",
        "双蜗壳泵壳管径大,耐腐蚀极限高。",
        "可根据不同需求选择机械密封或填料密封。",
        "磨损件可更换,维护快捷方便。",
      ],
      specs: [
        "流量,Q: 5~2400 m³/h",
        "扬程,H: 14~300 m",
        "介质温度,t: -80°C~450°C",
        "压力,p: ≤4.0 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "SLZA — Химиялық процестерге арналған сорғы",
      description: [
        "API610 стандартына сай (сегізінші басылым) әзірленген, сорғының компоненттік жинағы мен ұзартылған муфтасы бар.",
        "Қос спиральды сорғы корпусының құбыр диаметрі үлкен әрі коррозияға төзімділік шегі жоғары.",
        "Түрлі қажеттіліктерге сай механикалық немесе сальник тығыздауышын таңдауға болады.",
        "Тозған бөлшектерді ауыстыруға болады, ал техникалық қызмет көрсету жылдам әрі ыңғайлы.",
      ],
      specs: [
        "Өнімділік, Q: 5~2400 м³/сағ",
        "Тегеурін, H: 14~300 м",
        "Айдалатын орта температурасы, t: -80°C~450°C",
        "Қысым, p: ≤4.0 МПа",
      ],
      applications: [],
    },
  },
  slcz: {
    en: {
      name: "SLCZ — Standard Chemical Process Pump",
      description: [
        "The adoption of advanced technologies ensures superior quality.",
        "A uniform performance curve, low cavitation, and high efficiency.",
        "The operating range covers all characteristics of the standard IIH-series chemical pumps.",
      ],
      specs: [
        "Flow rate, Q: 5~2400 m³/h",
        "Head, H: 14~300 m",
        "Medium temperature, t: -80°C~450°C",
        "Pressure, p: ≤4.0 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "SLCZ — 标准化工工艺泵",
      description: [
        "采用先进技术,确保卓越品质。",
        "性能曲线平稳,汽蚀量低,效率高。",
        "工作范围涵盖IIH系列标准化工泵的全部特性。",
      ],
      specs: [
        "流量,Q: 5~2400 m³/h",
        "扬程,H: 14~300 m",
        "介质温度,t: -80°C~450°C",
        "压力,p: ≤4.0 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "SLCZ — Стандартты химиялық процестерге арналған сорғы",
      description: [
        "Озық технологияларды енгізу үздік сапаны қамтамасыз етті.",
        "Өнімділік қисығы біркелкі, кавитация деңгейі төмен, тиімділігі жоғары.",
        "Жұмыс сипаттамаларының диапазоны IIH сериясындағы стандартты химиялық сорғылардың барлық сипаттамаларын қамтиды.",
      ],
      specs: [
        "Өнімділік, Q: 5~2400 м³/сағ",
        "Тегеурін, H: 14~300 м",
        "Айдалатын орта температурасы, t: -80°C~450°C",
        "Қысым, p: ≤4.0 МПа",
      ],
      applications: [],
    },
  },
  ayg: {
    en: {
      name: "AYG — Vertical Pump",
      description: [
        "Meets API610 standard requirements, resistant to corrosion and high temperatures.",
        "High cavitation resistance. Low NPSH values. Compact design.",
      ],
      specs: [
        "Flow rate, Q: 3~600 m³/h",
        "Head, H: 4~120 m",
        "Medium temperature, t: -20~+150°C",
        "Pressure, p: ≤25 bar",
      ],
      applications: [],
    },
    zh: {
      name: "AYG — 立式泵",
      description: [
        "符合API610标准要求,耐腐蚀、耐高温。",
        "抗汽蚀性能高。NPSH值低。结构紧凑。",
      ],
      specs: [
        "流量,Q: 3~600 m³/h",
        "扬程,H: 4~120 m",
        "介质温度,t: -20~+150°C",
        "压力,p: ≤25 bar",
      ],
      applications: [],
    },
    kk: {
      name: "AYG — Тік сорғы",
      description: [
        "API610 стандартының талаптарына сай келеді, коррозияға және жоғары температураларға төзімді.",
        "Жоғары кавитациялық төзімділік. Төмен NPSH мәндері. Ықшам конструкция.",
      ],
      specs: [
        "Өнімділік, Q: 3~600 м³/сағ",
        "Тегеурін, H: 4~120 м",
        "Айдалатын орта температурасы, t: -20~+150°C",
        "Қысым, p: ≤25 бар",
      ],
      applications: [],
    },
  },
  ly: {
    en: {
      name: "LY — Semi-Submersible Chemical Pump",
      description: [
        "Highly efficient hydraulics, shaft seal protection, and a pump column design that makes flushing easy.",
      ],
      specs: [
        "Flow rate, Q: 2~400 m³/h",
        "Head, H: 7.5~20 m",
        "Medium temperature, t: -20°C~+125°C",
        "Pressure, p: ≤16 bar",
      ],
      applications: [],
    },
    zh: {
      name: "LY — 半浸没式化工泵",
      description: ["高效水力设计,轴封保护,泵柱结构便于冲洗。"],
      specs: [
        "流量,Q: 2~400 m³/h",
        "扬程,H: 7.5~20 m",
        "介质温度,t: -20°C~+125°C",
        "压力,p: ≤16 bar",
      ],
      applications: [],
    },
    kk: {
      name: "LY — Жартылай батырылатын химиялық сорғы",
      description: [
        "Жоғары тиімді гидравлика, білік тығыздауышын қорғау, сорғы бағанасының конструкциясы оны шаюды жеңілдетеді.",
      ],
      specs: [
        "Өнімділік, Q: 2~400 м³/сағ",
        "Тегеурін, H: 7.5~20 м",
        "Айдалатын орта температурасы, t: -20°C~+125°C",
        "Қысым, p: ≤16 бар",
      ],
      applications: [],
    },
  },
  slda: {
    en: {
      name: "SLDA — Axially Split Double-Suction Pump",
      description: [
        "A highly energy-efficient pump for heavy-duty applications.",
        "The sealing system is designed in accordance with API 682. Various seal types and piping plans are available.",
      ],
      specs: [
        "Flow rate, Q: 20~40000 m³/h",
        "Head, H(max): 100 m",
        "Medium temperature, t: -20°C~+160°C",
        "Pressure, p: ≤25 bar",
      ],
      applications: [],
    },
    zh: {
      name: "SLDA — 轴向剖分双吸泵",
      description: [
        "高能效泵,适用于重载工况。",
        "密封系统按API 682标准设计。可提供多种密封类型及管路方案。",
      ],
      specs: [
        "流量,Q: 20~40000 m³/h",
        "扬程,H(max): 100 m",
        "介质温度,t: -20°C~+160°C",
        "压力,p: ≤25 bar",
      ],
      applications: [],
    },
    kk: {
      name: "SLDA — Қос сорылатын осьтік секциялық сорғы",
      description: [
        "Ауыр пайдалану жағдайларына арналған жоғары энергия тиімді сорғы.",
        "Тығыздауыш жүйесі API 682 стандартына сай жобаланған. Тығыздауыштың түрлі түрлері мен олардың орамдалу схемалары қолжетімді.",
      ],
      specs: [
        "Өнімділік, Q: 20~40000 м³/сағ",
        "Тегеурін, H(max): 100 м",
        "Айдалатын орта температурасы, t: -20°C~+160°C",
        "Қысым, p: ≤25 бар",
      ],
      applications: [],
    },
  },
  sldc: {
    en: {
      name: "SLDC — Multistage Pump",
      description: [
        "Symmetrical impeller arrangement for axial force balancing, stable operation, high strength, and long service life. The design allows the pump to be serviced without dismantling the piping.",
      ],
      specs: [
        "Flow rate, Q: 10~1500 m³/h",
        "Head, H(max): 2000 m",
        "Medium temperature, t: -40°C~+200°C",
        "Pressure, p: ≤260 bar",
      ],
      applications: [],
    },
    zh: {
      name: "SLDC — 多级泵",
      description: [
        "叶轮对称布置以平衡轴向力,运行稳定,强度高,使用寿命长。结构设计使水泵无需拆卸管路即可进行维护。",
      ],
      specs: [
        "流量,Q: 10~1500 m³/h",
        "扬程,H(max): 2000 m",
        "介质温度,t: -40°C~+200°C",
        "压力,p: ≤260 bar",
      ],
      applications: [],
    },
    kk: {
      name: "SLDC — Көпсатылы сорғы",
      description: [
        "Осьтік күшті теңгеру үшін жұмыс дөңгелектерінің симметриялы орналасуы, тұрақты жұмыс, жоғары беріктік, ұзақ қызмет мерзімі. Конструкция сорғыға құбыржелілерін бөлшектемей-ақ қызмет көрсетуге мүмкіндік береді.",
      ],
      specs: [
        "Өнімділік, Q: 10~1500 м³/сағ",
        "Тегеурін, H(max): 2000 м",
        "Айдалатын орта температурасы, t: -40°C~+200°C",
        "Қысым, p: ≤260 бар",
      ],
      applications: [],
    },
  },
  sldtd: {
    en: {
      name: "SLDT(D) — Multistage Pump",
      description: [
        "Standard design per API 610. Mathematical hydraulic modeling minimizes hydraulic losses. To ensure the pump's safety and reliability, strength calculations were performed using the finite element method.",
      ],
      specs: [
        "Flow rate, Q: 5~1000 m³/h",
        "Head, H(max): 3000 m",
        "Medium temperature, t: -80°C~+450°C",
        "Pressure, p: ≤350 bar",
      ],
      applications: [],
    },
    zh: {
      name: "SLDT(D) — 多级泵",
      description: [
        "按照API 610标准的标准结构设计。通过水力数学建模使水力损失最小化。为保证水泵的安全性与可靠性,强度计算采用有限元方法进行。",
      ],
      specs: [
        "流量,Q: 5~1000 m³/h",
        "扬程,H(max): 3000 m",
        "介质温度,t: -80°C~+450°C",
        "压力,p: ≤350 bar",
      ],
      applications: [],
    },
    kk: {
      name: "SLDT(D) — Көпсатылы сорғы",
      description: [
        "API 610 бойынша стандартты конструкция. Гидравликалық шығындарды азайту үшін гидравликалық математикалық модельдеу. Сорғының қауіпсіздігі мен сенімділігін қамтамасыз ету үшін беріктік сипаттамаларын есептеу ақырлы элементтер әдісімен жүргізілді.",
      ],
      specs: [
        "Өнімділік, Q: 5~1000 м³/сағ",
        "Тегеурін, H(max): 3000 м",
        "Айдалатын орта температурасы, t: -80°C~+450°C",
        "Қысым, p: ≤350 бар",
      ],
      applications: [],
    },
  },
  slmc: {
    en: {
      name: "SLMC — Horizontal Multistage Pump",
      description: [
        "A drum-disk balancing design counteracts axial thrust.",
        "A reinforced support-thrust bearing extends the pump's service life.",
        "The sealing system is designed in accordance with API 682. Various seal types and piping plans are available.",
        "The first-stage design increases the unit's wear resistance.",
      ],
      specs: [
        "Flow rate, Q: 5~1000 m³/h",
        "Head, H(max): 1200 m",
        "Medium temperature, t: -80°C~+180°C",
        "p: ≤16 bar",
      ],
      applications: [],
    },
    zh: {
      name: "SLMC — 卧式多级泵",
      description: [
        "鼓盘平衡结构可平衡轴向力。",
        "加强型支撑推力轴承延长水泵使用寿命。",
        "密封系统按API 682标准设计。可提供多种密封类型及管路方案。",
        "首级设计提升了机组的耐磨性。",
      ],
      specs: [
        "流量,Q: 5~1000 m³/h",
        "扬程,H(max): 1200 m",
        "介质温度,t: -80°C~+180°C",
        "p: ≤16 bar",
      ],
      applications: [],
    },
    kk: {
      name: "SLMC — Көлденең көпсатылы сорғы",
      description: [
        "Барабан-диск конструкциясының теңгерілуі осьтік күшті теңгереді.",
        "Күшейтілген тіреу-тартылыс мойынтірегі сорғының қызмет мерзімін ұзартады.",
        "Тығыздауыш жүйесі API 682 стандартына сай жобаланған. Тығыздауыштың түрлі түрлері мен олардың орамдалу схемалары қолжетімді.",
        "Сорғының бірінші сатысының дизайны агрегаттың тозуға төзімділігін арттыруға мүмкіндік береді.",
      ],
      specs: [
        "Өнімділік, Q: 5~1000 м³/сағ",
        "Тегеурін, H(max): 1200 м",
        "Айдалатын орта температурасы, t: -80°C~+180°C",
        "p: ≤16 бар",
      ],
      applications: [],
    },
  },
  slpp: {
    en: {
      name: "SLPP — Single-Stage Centrifugal Mixed-Flow Pump",
      description: [
        "A pump with enhanced wear and corrosion resistance.",
        "Stable performance, high efficiency, a large overload zone, protection, and blockage prevention.",
      ],
      specs: [
        "Flow rate, Q: 0~7000 m³/h",
        "Head, H(max): 30 m",
        "Medium temperature, t: -20°C~+180°C",
        "p: ≤16 bar",
      ],
      applications: [],
    },
    zh: {
      name: "SLPP — 单级混流离心泵",
      description: [
        "耐磨、耐腐蚀性能增强的水泵。",
        "性能稳定,效率高,过载区间大,具有保护及防堵塞功能。",
      ],
      specs: [
        "流量,Q: 0~7000 m³/h",
        "扬程,H(max): 30 m",
        "介质温度,t: -20°C~+180°C",
        "p: ≤16 bar",
      ],
      applications: [],
    },
    kk: {
      name: "SLPP — Аралас ағынды бір сатылы центрифугалық сорғы",
      description: [
        "Тозуға және коррозияға жоғары төзімділігі бар сорғы.",
        "Тұрақты өнімділік, жоғары тиімділік, ток асқын жүктемесінің үлкен аймағы, қорғаныс, бітелуден сақтандыру.",
      ],
      specs: [
        "Өнімділік, Q: 0~7000 м³/сағ",
        "Тегеурін, H(max): 30 м",
        "Айдалатын орта температурасы, t: -20°C~+180°C",
        "p: ≤16 бар",
      ],
      applications: [],
    },
  },
  "model-626113": {
    en: {
      name: "SLZA E/F — In-Line Process Pump",
      description: [
        "Designed to the 10th edition of ANSI/API610-2004. A standard-type pump that can be fitted with a heating/insulation jacket. A highly energy-efficient pump. Increased corrosion allowance for the casing and impellers. A protective shaft sleeve isolates it from contact with the pumped medium to reduce corrosion risk. Extended unit service life. The pump design allows unit maintenance without dismantling piping or moving the electric motor.",
      ],
      specs: [
        "Flow rate, Q: 0~2600 m³/h",
        "Head, H: 0~300 m",
        "Medium temperature, t: -80°C~+450°C",
        "Pressure, p: ≤75 bar",
      ],
      applications: [],
    },
    zh: {
      name: "SLZA E/F — 管道式工艺泵",
      description: [
        "按照ANSI/API610-2004第10版设计。标准型水泵,可配备保温夹套。高能效水泵。泵壳及叶轮的耐腐蚀裕量增大。保护性轴套将其与输送介质隔离,降低腐蚀风险。机组使用寿命延长。水泵结构可在不拆卸管路及不移动电机的情况下进行机组维护。",
      ],
      specs: [
        "流量,Q: 0~2600 m³/h",
        "扬程,H: 0~300 m",
        "介质温度,t: -80°C~+450°C",
        "压力,p: ≤75 bar",
      ],
      applications: [],
    },
    kk: {
      name: "SLZA E/F — Ағынды сорғы",
      description: [
        "ANSI/API610-2004 стандартының 10-шы басылымына сай жобаланған. Жылу оқшаулағыш көйлекпен жабдықталуы мүмкін сериялық тип сорғысы. Жоғары энергия тиімді сорғы. Корпус пен жұмыс дөңгелектерінің коррозиялық қоры ұлғайтылған. Қорғаныш біліктің төлкесі коррозия қаупін азайту үшін айдалатын ортамен байланысты оқшаулайды. Агрегаттың қызмет мерзімі ұзартылған. Сорғының конструкциясы құбыржелілерін бөлшектемей және электр қозғалтқышын жылжытпай агрегатқа қызмет көрсетуге мүмкіндік береді.",
      ],
      specs: [
        "Өнімділік, Q: 0~2600 м³/сағ",
        "Тегеурін, H: 0~300 м",
        "Айдалатын орта температурасы, t: -80°C~+450°C",
        "Қысым, p: ≤75 бар",
      ],
      applications: [],
    },
  },
  tmc: {
    en: {
      name: "TMC / TTMC — Vertical Cylindrical Pump",
      description: [
        "The product is designed in accordance with ANSI/API 610-2004, 10th edition. Wear resistance, high-temperature resistance, corrosion resistance.",
      ],
      specs: [
        "Flow rate, Q: 0~800 m³/h",
        "Head, H: 0~800 m",
        "Medium temperature, t: -80°C~+180°C",
        "Pressure, p: ≤100 bar",
      ],
      applications: [],
    },
    zh: {
      name: "TMC / TTMC — 立式筒袋泵",
      description: [
        "产品按照ANSI/API 610-2004第10版设计。具有耐磨、耐高温、耐腐蚀性能。",
      ],
      specs: [
        "流量,Q: 0~800 m³/h",
        "扬程,H: 0~800 m",
        "介质温度,t: -80°C~+180°C",
        "压力,p: ≤100 bar",
      ],
      applications: [],
    },
    kk: {
      name: "TMC / TTMC — Тік цилиндрлік сорғы",
      description: [
        "Өнім ANSI/API 610-2004 стандартының 10-шы басылымына сай жобаланған. Тозуға төзімділік, жоғары температураға төзімділік, коррозияға төзімділік.",
      ],
      specs: [
        "Өнімділік, Q: 0~800 м³/сағ",
        "Тегеурін, H: 0~800 м",
        "Айдалатын орта температурасы, t: -80°C~+180°C",
        "Қысым, p: ≤100 бар",
      ],
      applications: [],
    },
  },
  xl: {
    en: {
      name: "XL — Low-Flow Chemical Pump",
      description: [
        "Pump casing with center-line support.",
        "Increased oil chamber volume with a constant-level oiler.",
        "The pump design allows maintenance without dismantling the piping.",
      ],
      specs: [
        "Flow rate, Q: 0~12.5 m³/h",
        "Head, H: 0~125 m",
        "Medium temperature, t: -80°C~+450°C",
        "Pressure, p: ≤25 bar",
      ],
      applications: [],
    },
    zh: {
      name: "XL — 小流量化工泵",
      description: [
        "泵壳采用中心支撑。",
        "增大油腔容积,配备恒位油杯。",
        "水泵结构可在不拆卸管路的情况下进行维护。",
      ],
      specs: [
        "流量,Q: 0~12.5 m³/h",
        "扬程,H: 0~125 m",
        "介质温度,t: -80°C~+450°C",
        "压力,p: ≤25 bar",
      ],
      applications: [],
    },
    kk: {
      name: "XL — Аз шығынды химиялық сорғы",
      description: [
        "Орталық тірегі бар сорғы корпусы.",
        "Тұрақты деңгейлі майлағышы бар май камерасының көлемі ұлғайтылған.",
        "Сорғының конструкциясы құбыржелілерін бөлшектемей қызмет көрсетуге мүмкіндік береді.",
      ],
      specs: [
        "Өнімділік, Q: 0~12.5 м³/сағ",
        "Тегеурін, H: 0~125 м",
        "Айдалатын орта температурасы, t: -80°C~+450°C",
        "Қысым, p: ≤25 бар",
      ],
      applications: [],
    },
  },
  wq: {
    en: {
      name: "WQ — Non-Clogging Sewage Pump",
      description: [
        "Designed for pumping both clean and rainwater as well as heavily contaminated wastewater, effluent with solid and fibrous inclusions, sludge and sediment, in municipal and industrial applications.",
        "Submersible (IP68 protection) monoblock single-stage vertical pumps are fitted with sealed asynchronous electric motors with power ratings from 0.75 to 500 kW.",
        "Single- and two-vane closed-type impellers are made of cast iron or stainless steel.",
        "'Dry' or 'wet' installation in vertical or horizontal positions is permitted.",
      ],
      specs: [
        "Flow rate, Q: 8~8000 m³/h",
        "Head, H: 5~62 m",
        "Medium temperature, t: 0°C~40°C",
      ],
      applications: [],
    },
    zh: {
      name: "WQ — 不堵塞污水泵",
      description: [
        "适用于抽送清水、雨水以及重度污染的污水、含固体及纤维杂质的污水、粪便及污泥,应用于市政及工业领域。",
        "潜水式(IP68防护等级)整体式单级立式水泵,配备功率范围0.75~500kW的密封异步电动机。",
        "单叶片及双叶片闭式叶轮采用铸铁或不锈钢制造。",
        "允许干式或湿式安装,可垂直或水平放置。",
      ],
      specs: ["流量,Q: 8~8000 m³/h", "扬程,H: 5~62 m", "介质温度,t: 0°C~40°C"],
      applications: [],
    },
    kk: {
      name: "WQ — Бітелмейтін кәріз сорғысы",
      description: [
        "Коммуналдық және өнеркәсіптік салаларда таза, жаңбыр суын, сондай-ақ қатты қалдық және талшықты қоспалары бар қатты ластанған кәріз массасын, нәжіс массасы мен тұнбаны айдауға арналған.",
        "Батырылатын (IP68 қорғаныс класы) моноблокты бір сатылы тік сорғылар қуаты 0,75-тен 500 кВт-қа дейінгі герметикалық асинхронды электр қозғалтқыштарымен жабдықталады.",
        "Жабық типті бір және екі қалақшалы жұмыс дөңгелектері шойыннан немесе тот баспайтын болаттан жасалады.",
        "Тік немесе көлденең қалыпта «құрғақ» немесе «дымқыл» орнатуға рұқсат етіледі.",
      ],
      specs: [
        "Өнімділік, Q: 8~8000 м³/сағ",
        "Тегеурін, H: 5~62 м",
        "Айдалатын орта температурасы, t: 0°C~40°C",
      ],
      applications: [],
    },
  },
  wl: {
    en: {
      name: "WL — Vertical Sewage Pump",
      description: [
        "Monoblock 'dry' vertically installed sewage pumps are designed for pumping clean water, contaminated liquids, and sewage effluent in municipal and industrial applications.",
        "Channel impellers made of cast iron or stainless steel have a large free passage and allow pumping of various liquids with a density of up to 1200 kg/m³ containing solid and fibrous objects, at temperatures up to 80°C.",
        "The pumps are fitted with IP55-rated electric motors.",
      ],
      specs: [
        "Flow rate, Q: 8~6000 m³/h",
        "Head, H: 5~62 m",
        "Medium temperature, t: 0°C~80°C",
      ],
      applications: [],
    },
    zh: {
      name: "WL — 立式污水泵",
      description: [
        "干式立式安装的整体式污水泵,适用于市政及工业领域抽送清水、污染液体及污水。",
        "铸铁或不锈钢制造的通道式叶轮具有较大的自由通道,可抽送密度高达1200kg/m³、含固体及纤维物、温度高达80°C的各类液体。",
        "水泵配备IP55防护等级的电动机。",
      ],
      specs: ["流量,Q: 8~6000 m³/h", "扬程,H: 5~62 m", "介质温度,t: 0°C~80°C"],
      applications: [],
    },
    kk: {
      name: "WL — Тік кәріз сорғысы",
      description: [
        "«Құрғақ» тік орнатылатын моноблокты кәріз сорғылары коммуналдық және өнеркәсіптік салаларда таза суды, ластанған сұйықтықтарды, кәріз ағындарын айдауға арналған.",
        "Шойыннан немесе тот баспайтын болаттан жасалған каналды жұмыс дөңгелектерінің үлкен еркін өтуі бар, олар тығыздығы 1200 кг/м³-ге дейінгі, қатты және талшықты заттары бар, температурасы 80°C-қа дейінгі әртүрлі сұйықтықтарды айдауды қамтамасыз етеді.",
        "Сорғылар IP55 қорғаныс класындағы электр қозғалтқыштарымен жабдықталады.",
      ],
      specs: [
        "Өнімділік, Q: 8~6000 м³/сағ",
        "Тегеурін, H: 5~62 м",
        "Айдалатын орта температурасы, t: 0°C~80°C",
      ],
      applications: [],
    },
  },
  wqc: {
    en: {
      name: "WQC — Submersible Sewage Pump",
      description: [
        "Designed for pumping clean and rainwater and sewage sludge with a density of up to 1050 kg/m³, in municipal and industrial applications.",
        "Submersible (IP68 protection) monoblock single-stage vertical pumps are fitted with sealed asynchronous electric motors with power ratings from 0.75 to 22 kW.",
        "Two-channel closed-type impellers are made of cast iron or stainless steel.",
        "Available installation methods: fixed submersible or mobile submersible.",
      ],
      specs: [
        "Flow rate, Q: 0-500 m³/h",
        "Head, H: 3-50 m",
        "Medium temperature, t: 0°C-40°C",
      ],
      applications: [],
    },
    zh: {
      name: "WQC — 潜水式污水泵",
      description: [
        "适用于市政及工业领域抽送清水、雨水及密度高达1050kg/m³的粪便污泥。",
        "潜水式(IP68防护等级)整体式单级立式水泵,配备功率范围0.75~22kW的密封异步电动机。",
        "双通道闭式叶轮采用铸铁或不锈钢制造。",
        "可选安装方式:固定潜水式或移动潜水式。",
      ],
      specs: ["流量,Q: 0-500 m³/h", "扬程,H: 3-50 m", "介质温度,t: 0°C-40°C"],
      applications: [],
    },
    kk: {
      name: "WQC — Батырылатын кәріз сорғысы",
      description: [
        "Коммуналдық және өнеркәсіптік салаларда таза және жаңбыр суын, тығыздығы 1050 кг/м³-ге дейінгі нәжіс массасын айдауға арналған.",
        "Батырылатын (IP68 қорғаныс класы) моноблокты бір сатылы тік сорғылар қуаты 0,75-тен 22 кВт-қа дейінгі герметикалық асинхронды электр қозғалтқыштарымен жабдықталады.",
        "Жабық типті екі каналды жұмыс дөңгелектері шойыннан немесе тот баспайтын болаттан жасалады.",
        "Қолжетімді орнату тәсілдері: батырылатын стационарлық немесе батырылатын жылжымалы.",
      ],
      specs: [
        "Өнімділік, Q: 0-500 м³/сағ",
        "Тегеурін, H: 3-50 м",
        "Айдалатын орта температурасы, t: 0°C-40°C",
      ],
      applications: [],
    },
  },
  wqx: {
    en: {
      name: "WQX — Submersible Sewage Pump with Cutting Mechanism",
      description: [
        "Designed for pumping domestic (fecal) wastewater from households, groups of residential buildings, hotels, gas stations, construction sites, and similar facilities.",
        "The pump's cutting mechanism allows sewage with shredded fibrous inclusions to be pumped through small-diameter (32-50 mm) pipelines.",
        "WQX series pumps are fitted with sealed asynchronous electric motors with power ratings from 0.75 to 7.5 kW.",
        "Available installation methods: fixed submersible or mobile submersible.",
      ],
      specs: [
        "Flow rate, Q: 5~38 m³/h",
        "Head, H: 6~35 m",
        "Medium temperature, t: 0°C~40°C",
      ],
      applications: [],
    },
    zh: {
      name: "WQX — 带切割机构的潜水污水泵",
      description: [
        "适用于抽送来自住宅、住宅群、酒店、加油站、建筑工地等场所的生活(粪便)污水。",
        "水泵配备的切割机构可将含破碎纤维杂质的污水通过32-50mm小直径管道输送。",
        "WQX系列水泵配备功率范围0.75~7.5kW的密封异步电动机。",
        "可选安装方式:固定潜水式或移动潜水式。",
      ],
      specs: ["流量,Q: 5~38 m³/h", "扬程,H: 6~35 m", "介质温度,t: 0°C~40°C"],
      applications: [],
    },
    kk: {
      name: "WQX — Кескіш механизмі бар батырылатын кәріз сорғысы",
      description: [
        "Үй шаруашылықтарынан, тұрғын үй топтарынан, қонақүйлерден, автотұрақтардан, құрылыс алаңдарынан және т.б. тұрмыстық (нәжіс) кәріз суларын айдауға арналған.",
        "Сорғыдағы кескіш механизмнің болуы ұсақталған талшықты қоспалары бар кәріз суларын кіші диаметрлі (32-50 мм) құбыржелілері арқылы айдауға мүмкіндік береді.",
        "WQX сериясындағы сорғылар қуаты 0,75-тен 7,5 кВт-қа дейінгі герметикалық асинхронды электр қозғалтқыштарымен жабдықталады.",
        "Қолжетімді орнату тәсілдері: батырылатын стационарлық немесе батырылатын жылжымалы.",
      ],
      specs: [
        "Өнімділік, Q: 5~38 м³/сағ",
        "Тегеурін, H: 6~35 м",
        "Айдалатын орта температурасы, t: 0°C~40°C",
      ],
      applications: [],
    },
  },
  zw: {
    en: {
      name: "ZW — Self-Priming Non-Clogging Sewage Pump",
      description: [
        "Designed for pumping various liquids containing solid particles and fibrous inclusions.",
        "Used at irrigation, agricultural, municipal, and construction facilities; in pulp and paper, chemical, textile, food, energy, and other industries.",
        "Self-priming pumps can pump liquid with a density of up to 1240 kg/m³, located up to 5.5 m below the pump axis, containing solid particles up to 60% of the pump's suction port diameter, at temperatures up to 80°C.",
        "The pump's wetted parts are made of cast iron or stainless steel, allowing it to pump effluent with a pH of 2-13.",
      ],
      specs: [
        "Flow rate, Q: 8~800 m³/h",
        "Head, H: 14~80 m",
        "Medium temperature, t: 0°C~60°C",
      ],
      applications: [],
    },
    zh: {
      name: "ZW — 自吸式不堵塞污水泵",
      description: [
        "适用于抽送含固体颗粒及纤维杂质的各类液体。",
        "应用于灌溉、农业及市政、建筑设施;造纸、化工、纺织、食品、能源等工业领域。",
        "自吸式水泵可抽送密度高达1240kg/m³、位于泵轴下方5.5m以内、含固体颗粒(尺寸不超过吸入口直径60%)、温度高达80°C的液体。",
        "水泵过流部件采用铸铁或不锈钢制造,可抽送pH值2-13的污水。",
      ],
      specs: ["流量,Q: 8~800 m³/h", "扬程,H: 14~80 m", "介质温度,t: 0°C~60°C"],
      applications: [],
    },
    kk: {
      name: "ZW — Өздігінен сорылатын бітелмейтін кәріз сорғысы",
      description: [
        "Қатты бөлшектер мен талшықты қоспалары бар әртүрлі сұйықтықтарды айдауға арналған.",
        "Ирригациялық, ауыл шаруашылығы және тұрғын үй-коммуналдық, құрылыс шаруашылығы объектілерінде; целлюлоза-қағаз, химия, тоқыма, тамақ, энергетика және басқа да өнеркәсіп салаларында қолданылады.",
        "Өздігінен сорылатын сорғылар тығыздығы 1240 кг/м³-ге дейінгі, сорғы осінен 5,5 м төмен орналасқан, сорғының сору тесігі диаметрінің 60%-ына дейінгі мөлшердегі қатты бөлшектері бар, температурасы 80°C-қа дейінгі сұйықтықты айдауға мүмкіндік береді.",
        "Сорғылардың өтетін бөлігі шойыннан немесе тот баспайтын болаттан жасалады, бұл рН 2-13 аралығындағы ағындыларды айдауға мүмкіндік береді.",
      ],
      specs: [
        "Өнімділік, Q: 8~800 м³/сағ",
        "Тегеурін, H: 14~80 м",
        "Айдалатын орта температурасы, t: 0°C~60°C",
      ],
      applications: [],
    },
  },
  yw: {
    en: {
      name: "YW — Submersible Sewage Pump",
      description: [
        "Designed for pumping clean and rainwater, heavily contaminated wastewater, effluent with solid and fibrous inclusions, sludge and sediment, in municipal and industrial applications.",
        "Rotation from an asynchronous electric motor (IP55 protection) located above the liquid is transmitted to the pump impeller via a shaft ranging from 0.5 to 5.5 m in length.",
        "The pump's drive shaft is housed in a sealed protective casing. This unit design ensures the motor's reliability and longevity, and reduces construction, installation, and service costs.",
      ],
      specs: [
        "Flow rate, Q: 8~2000 m³/h",
        "Head, H: 7~62 m",
        "Medium temperature, t: 0°C~50°C",
      ],
      applications: [],
    },
    zh: {
      name: "YW — 潜水式污水泵",
      description: [
        "适用于市政及工业领域抽送清水、雨水以及重度污染的污水、含固体及纤维杂质的污水、粪便及污泥。",
        "位于液面上方的异步电动机(IP55防护等级)通过长度0.5~5.5m的传动轴带动水泵叶轮旋转。",
        "水泵传动轴置于密闭保护套内。这种机组结构确保了电动机的可靠性与耐用性,并降低了土建安装及维护服务成本。",
      ],
      specs: ["流量,Q: 8~2000 m³/h", "扬程,H: 7~62 m", "介质温度,t: 0°C~50°C"],
      applications: [],
    },
    kk: {
      name: "YW — Батырылатын кәріз сорғысы",
      description: [
        "Коммуналдық және өнеркәсіптік салаларда таза, жаңбыр суын, қатты ластанған кәріз массасын, қатты және талшықты қоспалары бар ағындыларды, нәжіс массасы мен тұнбаны айдауға арналған.",
        "Сұйықтықтың үстінде орналасқан асинхронды электр қозғалтқыштан (IP 55 қорғаныс класы) сорғының жұмыс дөңгелегіне айналу ұзындығы 0,5-тен 5,5 м-ге дейінгі бір білік арқылы беріледі.",
        "Сорғының жетек білігі герметикалық қорғаныш қаптамасында орналасқан. Мұндай сорғы агрегатының конструкциясы электр қозғалтқыштың сенімділігі мен ұзақ мерзімділігін қамтамасыз етеді, құрылыс-монтаж және сервистік жұмыстардың құнын төмендетеді.",
      ],
      specs: [
        "Өнімділік, Q: 8~2000 м³/сағ",
        "Тегеурін, H: 7~62 м",
        "Айдалатын орта температурасы, t: 0°C~50°C",
      ],
      applications: [],
    },
  },
  qgls: {
    en: {
      name: "QGL(S) — Double-Sided Submersible Cross-Flow Pump",
      description: [
        "Low head losses at inlet and outlet, high efficiency of the pumping station unit.",
        "Low motor power, low operating costs.",
        "No need to install a water sump under the pump foundation; a small amount of excavation work.",
        "The small diameter of the pump pipe makes it convenient to dismantle the upper installation; there's also no need to build a production facility, and a stationary vehicle can be replaced with a truck-mounted crane.",
        "Reduced excavation volume, civil and engineering construction costs, reduced installation footprint, and savings of 30 to 40% of the total pumping station project cost.",
        "Easy to install.",
      ],
      specs: ["Q: 500~38000 m³/h", "H: 1.8~9 m"],
      applications: [],
    },
    zh: {
      name: "QGL(S) — 双面潜水贯流泵",
      description: [
        "进出口水头损失小,泵站装置效率高。",
        "电机功率小,运行成本低。",
        "无需在泵基础下设置集水坑,土方工程量小。",
        "泵管直径小,便于上部装置拆卸,亦无需建设生产厂房,固定运输设备可用汽车吊代替。",
        "减少土方工程量及土建工程费用,减小安装占地面积,节省泵站项目总成本的30%至40%。",
        "结构安装简便。",
      ],
      specs: ["Q: 500~38000 m³/h", "H: 1.8~9 m"],
      applications: [],
    },
    kk: {
      name: "QGL(S) — Көлденең ағынды екі жақты батырылатын сорғы",
      description: [
        "Кірісте және шығыста тегеурін шығыны аз, сорғы станциясы құрылғысының тиімділігі жоғары.",
        "Қозғалтқыш қуаты аз, пайдалану шығындары төмен.",
        "Сорғы іргетасының астына су жинау резервуарын (зумпфты) орнатудың қажеті жоқ, жер жұмыстарының көлемі аз.",
        "Сорғы құбырының кіші диаметрі жоғарғы қондырғыны бөлшектеуді ыңғайлы етеді, сондай-ақ өндірістік үй-жайды салудың қажеті жоқ, ал стационарлық көлік құралын автомобильді көтергішпен ауыстыруға болады.",
        "Жер жұмыстары мен азаматтық-инженерлік құрылыс шығындарының көлемін азайту, орнату алаңын кішірейту және сорғы станциясы жобасының жалпы құнынан 30-дан 40%-ға дейін үнемдеу.",
        "Конструкциясы оңай құрастырылады.",
      ],
      specs: ["Q: 500~38000 м³/сағ", "H: 1.8~9 м"],
      applications: [],
    },
  },
  qz: {
    en: {
      name: "QZ / QH — Axial-Flow and Mixed-Flow Pump",
      description: [
        "Medium to low head, high flow rate.",
        "Fitted with hermetic protection and overheat protection devices to reduce or prevent failures.",
        "Three mechanical seals reliably protect the motor and bearings.",
        "Underwater operation, low noise, long service life, meets environmental protection requirements, especially suited for large pumping stations handling rainwater and sewage.",
      ],
      specs: [
        "Q: 500~96000 m³/h",
        "H: 4~21 m",
        "Medium temperature, t: 0°C~60°C",
        "p: ≤10 bar",
      ],
      applications: [],
    },
    zh: {
      name: "QZ / QH — 轴流泵及混流泵",
      description: [
        "扬程中低,流量大。",
        "配备密封保护及过热保护装置,以减少或防止故障发生。",
        "三重机械密封可靠保护电机及轴承。",
        "水下运行,噪音低,使用寿命长,符合环保要求,尤其适用于雨水及污水的大型泵站。",
      ],
      specs: [
        "Q: 500~96000 m³/h",
        "H: 4~21 m",
        "介质温度,t: 0°C~60°C",
        "p: ≤10 bar",
      ],
      applications: [],
    },
    kk: {
      name: "QZ / QH — Осьтік және аралас ағынды сорғы",
      description: [
        "Орташа және төмен тегеурін, жоғары шығын.",
        "Ақаулықтарды азайту немесе болдырмау үшін герметикалық қорғанышпен және қызып кетуден қорғау құрылғыларымен жабдықталған.",
        "Үш механикалық тығыздауыш қозғалтқыш пен мойынтіректерді сенімді қорғайды.",
        "Су астында жұмыс істеу, төмен шу деңгейі, ұзақ қызмет мерзімі, қоршаған ортаны қорғау талаптарына сәйкестік, жаңбыр суы мен кәрізге арналған ірі сорғы станциялары үшін ерекше қолайлы.",
      ],
      specs: [
        "Q: 500~96000 м³/сағ",
        "H: 4~21 м",
        "Айдалатын орта температурасы, t: 0°C~60°C",
        "p: ≤10 бар",
      ],
      applications: [],
    },
  },
  qjb: {
    en: {
      name: "QJB — Submersible Mixer",
      description: [
        "Attractive appearance and a compact design.",
        "The motor has good sealing and high corrosion resistance.",
        "A unique bend-resistant blade design provides a strong tangential water flow and helps avoid tangling and blockage.",
      ],
      specs: [
        "p: 0.85~10 kW",
        "n: 480~980 rpm",
        "Medium temperature, t: 0°C~40°C",
        "h: ≤20 m",
      ],
      applications: [],
    },
    zh: {
      name: "QJB — 潜水搅拌机",
      description: [
        "外观美观,结构紧凑。",
        "电机密封性好,耐腐蚀性高。",
        "独特的抗弯曲叶片设计可产生强劲的切向水流,避免缠绕和堵塞。",
      ],
      specs: ["p: 0.85~10 kW", "n: 480~980 rpm", "介质温度,t: 0°C~40°C", "h: ≤20 m"],
      applications: [],
    },
    kk: {
      name: "QJB — Батырылатын араластырғыш",
      description: [
        "Тартымды сыртқы түрі және ықшам конструкциясы.",
        "Қозғалтқыш жақсы тығыздалған және жоғары коррозияға төзімді.",
        "Майысудан қорғалған қалақшалардың бірегей конструкциясы судың күшті тангенциалды ағынын қамтамасыз етеді және шатасу мен бітелуден сақтайды.",
      ],
      specs: [
        "p: 0.85~10 кВт",
        "n: 480~980 айн/мин",
        "Айдалатын орта температурасы, t: 0°C~40°C",
        "h: ≤20 м",
      ],
      applications: [],
    },
  },
  "xbd-slw2": {
    en: {
      name: "XBD-SLW(2) — Horizontal Single-Stage Fire Pump Unit",
      description: [
        "The new-generation XBD-SLW horizontal single-stage fire pump is fitted with high-efficiency YE3-series three-phase asynchronous motors. Performance and technical specifications comply with GB 6245 'Fire Pump.' The product is CCCF certified. A wide and well-considered range of sizes simplifies selection for various fire protection conditions.",
      ],
      specs: [
        "Flow range: 5~180 L/s",
        "Pressure range: 0.3~2.4 MPa",
        "Motor speed: 1480 rpm, 2960 rpm",
        "Maximum allowable inlet pressure: 0.4 MPa",
        "Inlet/outlet bore size: DN65~DN300",
        "Medium temperature: ≤80°C (clean water)",
        "Pressure, p: ≤25 bar",
        "Certification: CCCF, GB 6245",
      ],
      applications: [
        "Fixed fire protection systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone and combined fire protection / domestic (production) water supply systems",
      ],
    },
    zh: {
      name: "XBD-SLW(2) — 卧式单级消防泵组",
      description: [
        "新一代XBD-SLW卧式单级消防泵配备高效YE3系列三相异步电动机。性能及技术条件符合GB 6245《消防泵》标准。产品通过CCCF认证。规格系列宽泛合理,便于针对不同消防条件进行选型。",
      ],
      specs: [
        "流量范围: 5~180 L/s",
        "压力范围: 0.3~2.4 MPa",
        "电机转速: 1480 rpm, 2960 rpm",
        "最大允许进口压力: 0.4 MPa",
        "进出口口径: DN65~DN300",
        "介质温度: ≤80°C(清水)",
        "压力,p: ≤25 bar",
        "认证: CCCF, GB 6245",
      ],
      applications: [
        "工业及民用建筑固定消防系统",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立及联合消防/生活(生产)供水系统",
      ],
    },
    kk: {
      name: "XBD-SLW(2) — Көлденең бір сатылы өрт сорғы қондырғысы",
      description: [
        "Жаңа буын XBD-SLW көлденең бір сатылы өрт сорғысы YE3 сериялы жоғары тиімді үш фазалы асинхронды қозғалтқыштармен жабдықталады. Өнімділігі мен техникалық шарттары GB 6245 «Өрт сорғысы» стандартына сай келеді. Өнім CCCF сертификатына ие. Кең және ұтымды өлшемдер қатары түрлі өрт сөндіру жағдайларына сай таңдауды жеңілдетеді.",
      ],
      specs: [
        "Шығын диапазоны: 5~180 л/с",
        "Қысым диапазоны: 0,3~2,4 МПа",
        "Қозғалтқыш жылдамдығы: 1480 айн/мин, 2960 айн/мин",
        "Кірістегі рұқсат етілген максималды қысым: 0,4 МПа",
        "Кіріс және шығыс тесігінің калибрі: DN65~DN300",
        "Орта температурасы: ≤80°C (таза су)",
        "Қысым, p: ≤25 бар",
        "Сертификаттау: CCCF, GB 6245",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өртке қарсы қорғаныш жүйелері",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес және біріктірілген өртке қарсы және тұрмыстық (өндірістік) сумен жабдықтау жүйелері",
      ],
    },
  },
  "xbd-sls2": {
    en: {
      name: "XBD-SLS(2) — New-Generation Vertical Single-Stage Fire Pump Unit",
      description: [
        "The new-generation XBD-SLS vertical single-stage fire pump is fitted with high-efficiency YE3-series three-phase asynchronous motors. Performance and technical specifications comply with GB 6245 'Fire Pump.' The product is CCCF certified. A wide range of sizes simplifies selection for various operating conditions.",
      ],
      specs: [
        "Flow range: 5~180 L/s",
        "Pressure range: 0.3~2.4 MPa",
        "Motor speed: 1480 rpm, 2960 rpm",
        "Maximum allowable inlet pressure: 0.4 MPa",
        "Inlet/outlet bore size: DN65~DN300",
        "Medium temperature: ≤80°C (clean water)",
        "Pressure, p: ≤16 bar",
        "Certification: CCCF, GB 6245",
      ],
      applications: [
        "Fixed fire protection systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone and combined fire protection / domestic (production) water supply",
        "Water supply for buildings, municipalities, industrial and mining facilities, and boiler feed",
      ],
    },
    zh: {
      name: "XBD-SLS(2) — 新一代立式单级消防泵组",
      description: [
        "新一代XBD-SLS立式单级消防泵配备高效YE3系列三相异步电动机。性能及技术条件符合GB 6245《消防泵》标准。产品通过CCCF认证。规格系列宽泛,便于针对不同工况进行选型。",
      ],
      specs: [
        "流量范围: 5~180 L/s",
        "压力范围: 0.3~2.4 MPa",
        "电机转速: 1480 rpm, 2960 rpm",
        "最大允许进口压力: 0.4 MPa",
        "进出口口径: DN65~DN300",
        "介质温度: ≤80°C(清水)",
        "压力,p: ≤16 bar",
        "认证: CCCF, GB 6245",
      ],
      applications: [
        "工业及民用建筑固定消防系统",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立及联合消防/生活(生产)供水",
        "建筑、市政、工业及矿业设施供水,锅炉给水",
      ],
    },
    kk: {
      name: "XBD-SLS(2) — Жаңа буын тік бір сатылы өрт сорғы қондырғысы",
      description: [
        "Жаңа буын XBD-SLS тік бір сатылы өрт сорғысы YE3 сериялы жоғары тиімді үш фазалы асинхронды қозғалтқыштармен жабдықталады. Өнімділігі мен техникалық шарттары GB 6245 «Өрт сорғысы» стандартына сай келеді. Өнім CCCF сертификатына ие. Кең өлшемдер қатары түрлі пайдалану жағдайларына сай таңдауды жеңілдетеді.",
      ],
      specs: [
        "Шығын диапазоны: 5~180 л/с",
        "Қысым диапазоны: 0,3~2,4 МПа",
        "Қозғалтқыш жылдамдығы: 1480 айн/мин, 2960 айн/мин",
        "Кірістегі рұқсат етілген максималды қысым: 0,4 МПа",
        "Кіріс және шығыс тесігінің калибрі: DN65~DN300",
        "Орта температурасы: ≤80°C (таза су)",
        "Қысым, p: ≤16 бар",
        "Сертификаттау: CCCF, GB 6245",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өртке қарсы қорғаныш жүйелері",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес және біріктірілген өртке қарсы / тұрмыстық (өндірістік) сумен жабдықтау",
        "Ғимараттарды, муниципалитеттерді, өнеркәсіптік және тау-кен объектілерін сумен жабдықтау, қазандықтарды қоректендіру",
      ],
    },
  },
  "xbd-dv": {
    en: {
      name: "XBD-DV — Vertical Multistage Fire Pump Unit",
      description: [
        "The XBD-DV(2) is a new generation of electric fire pumps: a vertical multistage centrifugal pump developed to meet domestic market requirements. Compact design, small footprint, low weight, and flexible installation. Reliability and efficiency are significantly increased through a modern hydraulic model. Performance fully complies with GB 6245 'Fire Pump' and matches the advanced level of similar products in China.",
      ],
      specs: [
        "Flow range: 20 L/s ~ 60 L/s",
        "Pressure range: 0.3 MPa~2.4 MPa",
        "Motor speed: 2950 rpm",
        "Maximum allowable inlet pressure: 0.4 MPa",
        "Medium temperature: below 80°C",
        "Pressure, p: ≤27 bar",
      ],
      applications: [
        "Fixed fire suppression systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone and combined fire protection / domestic water supply",
        "Water supply for buildings, municipalities, industrial and mine facilities, and boiler feed",
      ],
    },
    zh: {
      name: "XBD-DV — 立式多级消防泵组",
      description: [
        "XBD-DV(2)是新一代电动消防泵:立式多级离心泵,依据国内市场需求研发。结构紧凑、占地小、重量轻、安装灵活。采用现代水力模型,显著提升可靠性与效率。性能完全符合GB 6245《消防泵》标准,达到国内同类产品的先进水平。",
      ],
      specs: [
        "流量范围: 20 L/s ~ 60 L/s",
        "压力范围: 0.3 MPa~2.4 MPa",
        "电机转速: 2950 rpm",
        "最大允许进口压力: 0.4 MPa",
        "介质温度: 低于80°C",
        "压力,p: ≤27 bar",
      ],
      applications: [
        "工业及民用建筑固定消防系统",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立及联合消防/生活供水",
        "建筑、市政、工业及矿区设施供水,锅炉给水",
      ],
    },
    kk: {
      name: "XBD-DV — Тік көпсатылы өрт сорғы қондырғысы",
      description: [
        "XBD-DV(2) — электрлік өрт сорғыларының жаңа буыны: ішкі нарық талаптарын ескере отырып әзірленген тік көпсатылы центрифугалық сорғы. Ықшам конструкция, аз алаң алады, салмағы жеңіл және орнату икемді. Заманауи гидравликалық үлгі есебінен сенімділік пен тиімділік айтарлықтай артты. Өнімділігі GB 6245 «Өрт сорғысы» стандартына толық сай келеді және Қытайдағы ұқсас өнімдердің озық деңгейіне сәйкес келеді.",
      ],
      specs: [
        "Шығын диапазоны: 20 л/с ~ 60 л/с",
        "Қысым диапазоны: 0,3 МПа~2,4 МПа",
        "Қозғалтқыш жылдамдығы: 2950 айн/мин",
        "Кірістегі рұқсат етілген максималды қысым: 0,4 МПа",
        "Орта температурасы: 80°C-тан төмен",
        "Қысым, p: ≤27 бар",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өрт сөндіру жүйелері",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес және біріктірілген өртке қарсы / тұрмыстық сумен жабдықтау",
        "Ғимараттарды, муниципалитеттерді, өнеркәсіптік және шахта объектілерін сумен жабдықтау, қазандықтарды қоректендіру",
      ],
    },
  },
  "xbd-dw": {
    en: {
      name: "XBD-DW — Horizontal Multistage Fire Pump Unit",
      description: [
        "The XBD-DW(2) is a new generation of electric fire pumps: a horizontal multistage centrifugal pump. Flow and head are tightly graded, saving energy and simplifying selection. The series is optimized with a modern hydraulic model; performance fully complies with GB 6245 'Fire Pump' and matches the advanced level of similar products in China.",
      ],
      specs: [
        "Flow range: 20 L/s ~ 60 L/s",
        "Pressure range: 0.3 MPa~2.6 MPa",
        "Motor speed: 2950 rpm",
        "Inlet/outlet diameters: DN100–DN150",
        "Medium temperature: below 80°C",
        "Pressure, p: ≤35 bar",
      ],
      applications: [
        "Fixed fire suppression systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone and combined fire protection / domestic water supply",
        "Water supply for buildings, municipalities, industrial and mine facilities, and boiler feed",
      ],
    },
    zh: {
      name: "XBD-DW — 卧式多级消防泵组",
      description: [
        "XBD-DW(2)是新一代电动消防泵:卧式多级离心泵。流量与扬程分级精细,节约能源并简化选型。系列采用现代水力模型优化,性能完全符合GB 6245《消防泵》标准,达到国内同类产品的先进水平。",
      ],
      specs: [
        "流量范围: 20 L/s ~ 60 L/s",
        "压力范围: 0.3 MPa~2.6 MPa",
        "电机转速: 2950 rpm",
        "进出口直径: DN100–DN150",
        "介质温度: 低于80°C",
        "压力,p: ≤35 bar",
      ],
      applications: [
        "工业及民用建筑固定消防系统",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立及联合消防/生活供水",
        "建筑、市政、工业及矿区设施供水,锅炉给水",
      ],
    },
    kk: {
      name: "XBD-DW — Көлденең көпсатылы өрт сорғы қондырғысы",
      description: [
        "XBD-DW(2) — электрлік өрт сорғыларының жаңа буыны: көлденең көпсатылы центрифугалық сорғы. Шығын мен тегеурін тығыз сыныпталған — бұл энергияны үнемдейді және таңдауды жеңілдетеді. Сериясы заманауи гидравликалық үлгімен оңтайландырылған, өнімділігі GB 6245 «Өрт сорғысы» стандартына толық сай келеді және Қытайдағы ұқсас өнімдердің озық деңгейіне сәйкес келеді.",
      ],
      specs: [
        "Шығын диапазоны: 20 л/с ~ 60 л/с",
        "Қысым диапазоны: 0,3 МПа~2,6 МПа",
        "Қозғалтқыш жылдамдығы: 2950 айн/мин",
        "Кіріс және шығыс тесігінің диаметрлері: DN100–DN150",
        "Орта температурасы: 80°C-тан төмен",
        "Қысым, p: ≤35 бар",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өрт сөндіру жүйелері",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес және біріктірілген өртке қарсы / тұрмыстық сумен жабдықтау",
        "Ғимараттарды, муниципалитеттерді, өнеркәсіптік және шахта объектілерін сумен жабдықтау, қазандықтарды қоректендіру",
      ],
    },
  },
  "xbd-gdl": {
    en: {
      name: "XBD-GDL — Vertical Multistage Fire Pump Unit",
      description: [
        "The XBD-GDL is a new generation of electric fire pumps: a vertical multistage centrifugal pipeline pump. Compact design, lightweight appearance, convenient installation, and leak-free mechanical seal. The hydraulic model is optimized, and performance complies with GB 6245 'Fire Pump.' A wide range of sizes simplifies selection for various conditions.",
      ],
      specs: [
        "Flow range: 1 ~ 45 L/s",
        "Pressure range: 0.3 MPa~1.95 MPa",
        "Motor speed: 2950 rpm",
        "Maximum allowable inlet pressure: 0.4 MPa",
        "Inlet/outlet diameters: DN25~DN150",
        "Medium temperature: below 80°C",
        "Pressure, p: ≤25 bar",
      ],
      applications: [
        "Fixed fire suppression systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone and combined fire protection / domestic water supply",
        "Water supply for buildings, municipalities, industrial and mine facilities, and boiler feed",
      ],
    },
    zh: {
      name: "XBD-GDL — 立式多级消防泵组",
      description: [
        "XBD-GDL是新一代电动消防泵:立式多级离心管道泵。结构紧凑、外形轻巧、安装方便、机械密封无泄漏。水力模型经过优化,性能符合GB 6245《消防泵》标准。规格系列宽泛,便于针对不同工况进行选型。",
      ],
      specs: [
        "流量范围: 1 ~ 45 L/s",
        "压力范围: 0.3 MPa~1.95 MPa",
        "电机转速: 2950 rpm",
        "最大允许进口压力: 0.4 MPa",
        "进出口直径: DN25~DN150",
        "介质温度: 低于80°C",
        "压力,p: ≤25 bar",
      ],
      applications: [
        "工业及民用建筑固定消防系统",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立及联合消防/生活供水",
        "建筑、市政、工业及矿区设施供水,锅炉给水",
      ],
    },
    kk: {
      name: "XBD-GDL — Тік көпсатылы өрт сорғы қондырғысы",
      description: [
        "XBD-GDL — электрлік өрт сорғыларының жаңа буыны: тік көпсатылы центрифугалық құбыржелілік сорғы. Ықшам конструкция, жеңіл сыртқы түрі, ыңғайлы орнату және механикалық тығыздауышта ағып кетудің болмауы. Гидравликалық үлгі оңтайландырылған, өнімділігі GB 6245 «Өрт сорғысы» стандартына сай келеді. Кең өлшемдер қатары түрлі жағдайларға сай таңдауды жеңілдетеді.",
      ],
      specs: [
        "Шығын диапазоны: 1 ~ 45 л/с",
        "Қысым диапазоны: 0,3 МПа~1,95 МПа",
        "Қозғалтқыш жылдамдығы: 2950 айн/мин",
        "Кірістегі рұқсат етілген максималды қысым: 0,4 МПа",
        "Кіріс және шығыс тесігінің диаметрлері: DN25~DN150",
        "Орта температурасы: 80°C-тан төмен",
        "Қысым, p: ≤25 бар",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өрт сөндіру жүйелері",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес және біріктірілген өртке қарсы / тұрмыстық сумен жабдықтау",
        "Ғимараттарды, муниципалитеттерді, өнеркәсіптік және шахта объектілерін сумен жабдықтау, қазандықтарды қоректендіру",
      ],
    },
  },
  "xbd-d": {
    en: {
      name: "XBD-D — Horizontal Multistage Fire Pump",
      description: [
        "The XBD-D electric fire pump is a horizontal multistage centrifugal pump. The series stands out for its compact design, attractive appearance, wide operating range, high reliability, and high efficiency. The hydraulic model is optimized using modern calculation methods, and performance meets GB 6245 'Fire Pump' requirements.",
      ],
      specs: [
        "Type: horizontal multistage centrifugal",
        "Flow range, Q: 5~90 L/s",
        "Pressure range, P: 0.5~3.0 MPa",
        "Standard: GB 6245 'Fire Pump'",
        "Medium temperature: −20°C~80°C",
        "Medium: clean water or mildly corrosive liquids without solid particles",
      ],
      applications: [
        "Water supply for fixed fire suppression systems: hydrants, sprinkler systems, water mist",
        "Standalone and combined fire protection and domestic (production) water supply systems",
        "Water supply and drainage for buildings, municipalities, industrial and mine facilities, boiler feed",
        "Pumping mildly corrosive liquids without solid particles, clean water, or media with similar properties (temperature below 80°C)",
      ],
    },
    zh: {
      name: "XBD-D — 卧式多级消防泵",
      description: [
        "XBD-D电动消防泵为卧式多级离心泵。系列特点为结构紧凑、外形美观、工作范围广、可靠性高、效率高。水力模型采用现代计算方法优化,性能符合GB 6245《消防泵》标准要求。",
      ],
      specs: [
        "类型: 卧式多级离心式",
        "流量范围,Q: 5~90 L/s",
        "压力范围,P: 0.5~3.0 MPa",
        "标准: GB 6245《消防泵》",
        "介质温度: −20°C~80°C",
        "介质: 清水或不含固体颗粒的弱腐蚀性液体",
      ],
      applications: [
        "固定消防系统供水:消火栓、喷淋系统、细水雾",
        "独立及联合消防与生活(生产)供水系统",
        "建筑、市政、工业及矿区设施的给排水,锅炉给水",
        "抽送不含固体颗粒的弱腐蚀性液体、清水或性质相近的介质(温度低于80°C)",
      ],
    },
    kk: {
      name: "XBD-D — Көлденең көпсатылы өрт сорғысы",
      description: [
        "XBD-D электрлік өрт сорғысы — көлденең көпсатылы центрифугалық сорғы. Сериясы ықшам конструкциясымен, тартымды сыртқы түрімен, кең жұмыс диапазонымен, жоғары сенімділігі мен жоғары тиімділігімен ерекшеленеді. Гидравликалық үлгі заманауи есептеу шешімдерін пайдалана отырып оңтайландырылған, өнімділігі GB 6245 «Өрт сорғысы» стандартының талаптарына сай келеді.",
      ],
      specs: [
        "Тип: көлденең көпсатылы центрифугалық",
        "Шығын диапазоны, Q: 5~90 л/с",
        "Қысым диапазоны, P: 0,5~3,0 МПа",
        "Стандарт: GB 6245 «Өрт сорғысы»",
        "Орта температурасы: −20°C~80°C",
        "Орта: таза су немесе қатты бөлшектері жоқ әлсіз агрессивті сұйықтықтар",
      ],
      applications: [
        "Стационарлық өрт сөндіру жүйелерін сумен жабдықтау: гидранттар, спринклерлік жүйелер, ұсақ тозаңдатылған су",
        "Дербес және біріктірілген өртке қарсы және тұрмыстық-шаруашылық (өндірістік) сумен жабдықтау жүйелері",
        "Ғимараттарды, муниципалитеттерді, өнеркәсіптік және шахта объектілерін сумен жабдықтау және суды бұру, қазандықтарды қоректендіру",
        "Қатты бөлшектері жоқ әлсіз агрессивті сұйықтықтарды, таза суды немесе ұқсас қасиеттері бар орталарды айдау (температурасы 80°C-тан төмен)",
      ],
    },
  },
  "xbd-slow": {
    en: {
      name: "XBD-SLOW — Horizontal Split-Case Double-Suction Fire Pump",
      description: [
        "A new generation of single-stage double-suction and two-stage double-suction XBD-SLOW fire pumps with a horizontal split casing. A wide and well-considered range of sizes simplifies selection for various fire protection conditions.",
        "Design variants: single-stage double-suction horizontal with a mid-port; two-stage double-suction horizontal with a mid-port.",
      ],
      specs: [
        "Flow range: 25~325 L/s",
        "Pressure range: 0.3~2.5 MPa",
        "Rotation speed: 1490 rpm, 2980 rpm",
        "Voltage: 380 V, 6 kV, 10 kV",
        "Liquid temperature: ≤80°C",
        "Ambient temperature: typically ≤40°C",
        "Maximum allowable inlet pressure: 0.4 MPa",
        "Suction and discharge diameters: DN80~DN400 mm (GB/T 17241.6 flange)",
        "Medium: clean water or mildly corrosive liquids without solid particles",
        "Pressure, p: ≤25 bar",
      ],
      applications: [
        "Water supply for fixed fire protection systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone and combined fire protection / domestic water supply",
        "Water supply for buildings, municipalities, industrial and mine facilities, boiler feed",
      ],
    },
    zh: {
      name: "XBD-SLOW — 卧式中开双吸消防泵",
      description: [
        "新一代单级双吸及两级双吸XBD-SLOW卧式中开消防泵。规格系列宽泛合理,便于针对不同消防条件进行选型。",
        "结构形式:单级双吸卧式中开;两级双吸卧式中开。",
      ],
      specs: [
        "流量范围: 25~325 L/s",
        "压力范围: 0.3~2.5 MPa",
        "转速: 1490 rpm, 2980 rpm",
        "电压: 380 V, 6 kV, 10 kV",
        "液体温度: ≤80°C",
        "环境温度: 通常≤40°C",
        "最大允许进口压力: 0.4 MPa",
        "吸入及排出直径: DN80~DN400 mm(法兰GB/T 17241.6)",
        "介质: 清水或不含固体颗粒的弱腐蚀性液体",
        "压力,p: ≤25 bar",
      ],
      applications: [
        "工业及民用建筑固定消防系统供水",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立及联合消防/生活供水",
        "建筑、市政、工业及矿区设施供水,锅炉给水",
      ],
    },
    kk: {
      name: "XBD-SLOW — Ортаңғы тесікті көлденең екі жақты сорылатын өрт сорғысы",
      description: [
        "Көлденең бөлінетін корпусты бір сатылы екі жақты сорылатын және екі сатылы екі жақты сорылатын XBD-SLOW өрт сорғыларының жаңа буыны. Кең және ұтымды өлшемдер қатары түрлі өрт сөндіру жағдайларына сай таңдауды жеңілдетеді.",
        "Конструктивтік формалар: бір сатылы екі жақты сорылатын, көлденең, ортаңғы тесікті; екі сатылы екі жақты сорылатын, көлденең, ортаңғы тесікті.",
      ],
      specs: [
        "Шығын диапазоны: 25~325 л/с",
        "Қысым диапазоны: 0,3~2,5 МПа",
        "Айналу жылдамдығы: 1490 айн/мин, 2980 айн/мин",
        "Кернеу: 380 В, 6 кВ, 10 кВ",
        "Сұйықтық температурасы: ≤80°C",
        "Қоршаған орта температурасы: әдетте ≤40°C",
        "Кірістегі рұқсат етілген максималды қысым: 0,4 МПа",
        "Сору және айдау диаметрлері: DN80~DN400 мм (GB/T 17241.6 фланеці)",
        "Орта: таза су немесе қатты бөлшектері жоқ әлсіз агрессивті сұйықтықтар",
        "Қысым, p: ≤25 бар",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өртке қарсы қорғаныш жүйелерін сумен жабдықтау",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес және біріктірілген өртке қарсы / тұрмыстық сумен жабдықтау",
        "Ғимараттарды, муниципалитеттерді, өнеркәсіптік және тау-кен объектілерін сумен жабдықтау, қазандықтарды қоректендіру",
      ],
    },
  },
  xbc: {
    en: {
      name: "XBC — Diesel Fire Pump Units",
      description: [
        "The XBC-series diesel fire pump is designed and manufactured in accordance with the international standard ISO 2858 and the national standard GB 50974-2014 'Technical Specifications for Fire Water Supply Systems and Fire Hydrants.'",
        "The series includes the XBC-IS, XBC-SLOW, and XBC-D sub-series (single-stage single-suction, single-stage double-suction, and multistage sectional) with a wide range of pressures and flow rates.",
        "Diesel engines are domestic or imported high-quality units with good starting characteristics, high overload capacity, a compact design, convenient maintenance, and a high degree of automation.",
      ],
      specs: [
        "Flow range, Q: 1~200 L/s",
        "Pressure range, P: 0.3~2.5 MPa",
        "Altitude above sea level: ≤ 1000 m",
        "Ambient temperature: +5°C ~ +40°C",
        "Relative air humidity: ≤ 90%",
        "Pumped liquid temperature: clean water at room temperature, below 80°C",
        "Standards: ISO 2858, GB 50974-2014",
        "Sub-series: XBC-IS, XBC-SLOW, XBC-D",
      ],
      applications: [
        "Fixed fire suppression systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone fire protection and combined domestic (production) water supply",
        "Water supply for buildings, municipal, industrial, and mine water supply, boiler feed",
      ],
    },
    zh: {
      name: "XBC — 柴油机消防泵组",
      description: [
        "XBC系列柴油机消防泵按照国际标准ISO 2858及国家标准GB 50974-2014《消防给水及消火栓系统技术规范》设计制造。",
        "系列包含XBC-IS、XBC-SLOW及XBC-D子系列(单级单吸、单级双吸、多级分段式),压力与流量范围广泛。",
        "柴油机为国产或进口高品质产品,具有良好的启动性能、高过载能力、结构紧凑、维护方便及高度自动化。",
      ],
      specs: [
        "流量范围,Q: 1~200 L/s",
        "压力范围,P: 0.3~2.5 MPa",
        "海拔高度: ≤ 1000 m",
        "环境温度: +5°C ~ +40°C",
        "相对空气湿度: ≤ 90%",
        "输送液体温度: 室温清水,低于80°C",
        "标准: ISO 2858, GB 50974-2014",
        "子系列: XBC-IS, XBC-SLOW, XBC-D",
      ],
      applications: [
        "工业及民用建筑固定消防系统",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立消防及联合生活(生产)供水",
        "建筑供水、市政、工业及矿区供水,锅炉给水",
      ],
    },
    kk: {
      name: "XBC — Дизельді өрт сорғы қондырғылары",
      description: [
        "XBC сериясындағы дизельді өрт сорғысы ISO 2858 халықаралық стандартына және GB 50974-2014 «Өрт сөндіру гидранттары бар сумен жабдықтау жүйелеріне арналған техникалық шарттар» ұлттық стандартына сай жобаланған және дайындалған.",
        "Сериясына кең қысым мен шығын диапазоны бар XBC-IS, XBC-SLOW және XBC-D қосалқы сериялары (бір сатылы бір жақты сорылатын, бір сатылы екі жақты сорылатын, көпсатылы секциялық) кіреді.",
        "Дизель қозғалтқыштары — жақсы іске қосу сипаттамалары, жоғары асқын жүктеме қабілеті, ықшам конструкциясы, ыңғайлы қызмет көрсетуі және автоматтандырудың жоғары дәрежесі бар отандық немесе импорттық жоғары сапалы бұйымдар.",
      ],
      specs: [
        "Шығын диапазоны, Q: 1~200 л/с",
        "Қысым диапазоны, P: 0,3~2,5 МПа",
        "Теңіз деңгейінен биіктік: ≤ 1000 м",
        "Қоршаған орта температурасы: +5°C ~ +40°C",
        "Ауаның салыстырмалы ылғалдығы: ≤ 90%",
        "Айдалатын сұйықтық температурасы: бөлме температурасындағы таза су, 80°C-тан төмен",
        "Стандарттар: ISO 2858, GB 50974-2014",
        "Қосалқы сериялар: XBC-IS, XBC-SLOW, XBC-D",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өрт сөндіру жүйелері",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес өртке қарсы және біріктірілген тұрмыстық-шаруашылық (өндірістік) сумен жабдықтау",
        "Ғимараттарды сумен жабдықтау, коммуналдық, өнеркәсіптік және шахталық сумен жабдықтау, қазандықтарды қоректендіру",
      ],
    },
  },
  "fire-stable-water": {
    en: {
      name: "Fire Protection Stable Water Supply Equipment",
      description: [
        "Stable operation and reliable performance.",
        "When pressure loss in the fire water supply pipe network is caused by ordinary leakage, the equipment can stabilize the pressure in the pipeline.",
        "The structure is compact and rational, site layout is flexible, and installation and maintenance are simple.",
      ],
      specs: [
        "Ambient t: 5°C~40°C",
        "Medium t: 4°C~70°C",
        "Adjustable flow: 1~5 L/s",
        "Working pressure: 1.6 MPa",
        "Pressure control accuracy: <±0.01 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "消防稳压供水设备",
      description: [
        "运行稳定,性能可靠。",
        "当消防给水管网因普通泄漏造成压力损失时,设备可稳定管道内压力。",
        "结构紧凑合理,场地布置灵活,安装维护简便。",
      ],
      specs: [
        "环境温度t: 5°C~40°C",
        "介质温度t: 4°C~70°C",
        "可调流量: 1~5 L/s",
        "工作压力: 1.6 MPa",
        "压力调节精度: <±0.01 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "Тұрақты сумен жабдықтауға арналған өртке қарсы жабдық",
      description: [
        "Тұрақты жұмыс және сенімді өнімділік.",
        "Өртке қарсы сумен жабдықтау құбыржелісіндегі қысымның жоғалуы әдеттегі ағып кетуден туындағанда, жабдық құбырдағы қысымды тұрақтандыра алады.",
        "Конструкциясы ықшам және ұтымды, алаңды жоспарлау еркін, орнату мен қызмет көрсету қарапайым.",
      ],
      specs: [
        "Қоршаған орта t: 5°C~40°C",
        "Айдалатын орта t: 4°C~70°C",
        "Реттелетін шығын: 1~5 л/с",
        "Жұмыс қысымы: 1.6 МПа",
        "Қысымды реттеу дәлдігі: <±0.01 МПа",
      ],
      applications: [],
    },
  },
  "xbd-c-lpt": {
    en: {
      name: "XBD/C-LP(T) — Vertical Extended-Shaft Fire Pump",
      description: [
        "The pump impeller is fully submerged in the liquid, so no priming with water is needed at start-up.",
        "Wear-resistant materials are used for the impeller, expanding the pump's range of applications.",
        "The pump is equipped with a reverse-rotation protection device that effectively prevents the pump from spinning backward.",
      ],
      specs: [
        "Flow rate, Q: 15~20000 m³/h",
        "Head, H: 3~300 m",
        "Medium temperature, t: 0°C~60°C",
        "Pressure, p: ≤20 bar",
      ],
      applications: [],
    },
    zh: {
      name: "XBD/C-LP(T) — 立式长轴消防泵",
      description: [
        "水泵叶轮完全浸没于液体中,启动时无需灌水。",
        "叶轮材料采用耐磨材料,拓宽了水泵的应用范围。",
        "水泵配备防倒转保护装置,可有效防止水泵反向旋转。",
      ],
      specs: [
        "流量,Q: 15~20000 m³/h",
        "扬程,H: 3~300 m",
        "介质温度,t: 0°C~60°C",
        "压力,p: ≤20 bar",
      ],
      applications: [],
    },
    kk: {
      name: "XBD/C-LP(T) — Ұзартылған біліктегі тік өрт сорғысы",
      description: [
        "Сорғының жұмыс дөңгелегі толығымен сұйықтыққа батырылған, сондықтан іске қосу кезінде суды толтырудың қажеті жоқ.",
        "Жұмыс дөңгелегінің материалы ретінде тозуға төзімді материалдар қолданылады, бұл сорғының қолданылу аясын кеңейтеді.",
        "Сорғы кері айналудан қорғау құрылғысымен жабдықталған, ол сорғының кері айналуын тиімді болдырмайды.",
      ],
      specs: [
        "Өнімділік, Q: 15~20000 м³/сағ",
        "Тегеурін, H: 3~300 м",
        "Айдалатын орта температурасы, t: 0°C~60°C",
        "Қысым, p: ≤20 бар",
      ],
      applications: [],
    },
  },
  "water-vfd-full": {
    en: {
      name: "Fully Variable-Frequency Water Supply Equipment",
      description: [
        "Compact design and small footprint.",
        "No need for a high-level water storage tank.",
        "Smooth operation, high efficiency, and energy savings.",
        "Pressurized water supply.",
      ],
      specs: [
        "Ambient t: 5°C~40°C",
        "Medium t: 5°C~70°C",
        "Adjustable flow: 0~5000 m³/h",
        "Working pressure: 1.6 MPa",
        "Pressure control accuracy: <±0.01 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "全变频供水设备",
      description: [
        "结构紧凑,占地面积小。",
        "无需设置高位水箱。",
        "运行平稳,效率高,节能。",
        "加压供水。",
      ],
      specs: [
        "环境温度t: 5°C~40°C",
        "介质温度t: 5°C~70°C",
        "可调流量: 0~5000 m³/h",
        "工作压力: 1.6 MPa",
        "压力调节精度: <±0.01 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "Толық реттелетін жиілікті сумен жабдықтау жабдығы",
      description: [
        "Ықшам конструкция және аз алаң алады.",
        "Жоғары деңгейлі су резервуарын қажет етпейді.",
        "Тегіс жұмыс, жоғары тиімділік және энергия үнемдеу.",
        "Қысыммен сумен жабдықтау.",
      ],
      specs: [
        "Қоршаған орта t: 5°C~40°C",
        "Айдалатын орта t: 5°C~70°C",
        "Реттелетін шығын: 0~5000 м³/сағ",
        "Жұмыс қысымы: 1.6 МПа",
        "Қысымды реттеу дәлдігі: <±0.01 МПа",
      ],
      applications: [],
    },
  },
  "water-vfd-direct": {
    en: {
      name: "Direct-Connected Water Supply Equipment with Microprocessor Frequency Conversion",
      description: [
        "An electrically integrated design, compact construction, small footprint.",
        "Stable operation and high efficiency.",
        "Suitable for outdoor installation, with an intelligent monitoring function.",
        "Easy to install, attractive appearance.",
      ],
      specs: [
        "Ambient t: 5°C~40°C",
        "Medium t: 4°C~70°C",
        "Flow rate: 1~28 m³",
        "Head: 15~80 m",
        "Power: 0.37~3 kW",
        "Pressure control accuracy: <0.01 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "微机变频直联供水设备",
      description: [
        "电气一体化设计,结构紧凑,占地面积小。",
        "运行稳定,效率高。",
        "适合户外安装,具备智能监控功能。",
        "安装简便,外观美观。",
      ],
      specs: [
        "环境温度t: 5°C~40°C",
        "介质温度t: 4°C~70°C",
        "流量: 1~28 m³",
        "扬程: 15~80 m",
        "功率: 0.37~3 kW",
        "压力调节精度: <0.01 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "Тікелей қосылуға арналған микропроцессорлық жиілік түрлендіргіші бар сумен жабдықтау жабдығы",
      description: [
        "Электрлік интеграцияланған конструкция, ықшам құрылым, аз алаң алады.",
        "Тұрақты жұмыс және жоғары тиімділік.",
        "Сыртқа орнатуға қолайлы, зияткерлік мониторинг функциясы бар.",
        "Орнатуы қарапайым, сыртқы түрі тартымды.",
      ],
      specs: [
        "Қоршаған орта t: 5°C~40°C",
        "Айдалатын орта t: 4°C~70°C",
        "Шығын: 1~28 м³",
        "Тегеурін: 15~80 м",
        "Қуат: 0.37~3 кВт",
        "Қысымды реттеу дәлдігі: <0.01 МПа",
      ],
      applications: [],
    },
  },
  zwlv: {
    en: {
      name: "ZWL(V) — Fully Variable-Frequency Digitally Integrated Pipeline Water Supply Equipment",
      description: [
        "Efficiency-separation technology is applied to improve pressure control accuracy and the efficiency of the whole machine.",
        "Integration of the frequency converter, piping, and pump; application of information technology, visualization, and full-color display control.",
      ],
      specs: [
        "Ambient t: 5°C~40°C",
        "Medium t: 4°C~70°C",
        "Relative humidity: ≤85% (at 20±5°C)",
        "Voltage: 380 V(+5%, -10%), 50 Hz",
        "Pressure range: 0~2.5 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "ZWL(V) — 全变频数字集成管网供水设备",
      description: [
        "采用效率分离技术,提升压力调节精度及整机效率。",
        "变频器、管路与水泵一体化集成;应用信息技术,全彩显示可视化控制。",
      ],
      specs: [
        "环境温度t: 5°C~40°C",
        "介质温度t: 4°C~70°C",
        "相对湿度: ≤85%(20±5°C时)",
        "电压: 380 V(+5%, -10%), 50 Hz",
        "压力范围: 0~2.5 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "ZWL(V) — Толық реттелетін жиілікті цифрлық интеграцияланған құбыржелілік сумен жабдықтау жабдығы",
      description: [
        "Қысымды реттеу дәлдігі мен бүкіл машинаның тиімділігін арттыру үшін тиімділікті бөлу технологиясы қолданылады.",
        "Жиілік түрлендіргішінің, құбыржелісінің және сорғының интеграциясы; ақпараттық технологияларды қолдану, толықтүсті дисплеймен визуализация және басқару.",
      ],
      specs: [
        "Қоршаған орта t: 5°C~40°C",
        "Айдалатын орта t: 4°C~70°C",
        "Салыстырмалы ылғалдылық: ≤85% (20±5°C кезінде)",
        "Кернеу: 380 В(+5%, -10%), 50 Гц",
        "Қысым диапазоны: 0~2.5 МПа",
      ],
      applications: [],
    },
  },
  zwl: {
    en: {
      name: "ZWL — Tank-Type Pipeline Positive-Pressure Water Supply Equipment",
      description: [
        "Using mains water pressure to provide uniform water supply reduces pump power and lowers energy consumption.",
        "A vacuum suppressor effectively prevents negative pressure in the pipe network; operation in a fully enclosed mode does not cause secondary contamination.",
        "The use of constant-flow tanks reduces the load associated with high water consumption during peak periods and ensures uninterrupted water supply.",
        "Fully automatic operation with no need for manual control; water supply is safe and stable, and pressure in the pipe network does not fluctuate.",
        "Overpressure protection to prevent pipe rupture; each pump backs up the other and operates in an automatic circulation mode.",
      ],
      specs: [
        "Ambient t: 5°C~40°C",
        "Medium t: 4°C~70°C",
        "Relative humidity: ≤85% (at 20±5°C)",
        "Voltage: 380 V(+5%, -10%), 50 Hz",
        "Flow range: 0~5000 m³/h",
        "Pressure range: 0~2.5 MPa",
        "Power: ≤110 kW",
        "Pressure control accuracy: <±0.01 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "ZWL — 罐式管网正压供水设备",
      description: [
        "利用市政给水压力实现均匀供水,可降低水泵功率,减少能耗。",
        "真空抑制器有效防止管网产生负压;全封闭运行,不会造成二次污染。",
        "采用恒流罐降低用水高峰期的高耗水负荷,保证不间断供水。",
        "全自动运行,无需人工干预;供水安全稳定,管网压力无波动。",
        "超压保护防止管道爆裂;各泵互为备用,以自动循环方式运行。",
      ],
      specs: [
        "环境温度t: 5°C~40°C",
        "介质温度t: 4°C~70°C",
        "相对湿度: ≤85%(20±5°C时)",
        "电压: 380 V(+5%, -10%), 50 Hz",
        "流量范围: 0~5000 m³/h",
        "压力范围: 0~2.5 MPa",
        "功率: ≤110 kW",
        "压力调节精度: <±0.01 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "ZWL — Құбыржелісі бойынша оң қысымды резервуарлық типті сумен жабдықтау жабдығы",
      description: [
        "Су құбыры суының қысымын пайдалану біркелкі сумен жабдықтауды қамтамасыз ете отырып, сорғы қуатын және энергия шығынын азайтуға мүмкіндік береді.",
        "Вакуумдық басу құрылғысы құбыржелісіндегі сирету қысымын тиімді болдырмайды; толық жабық режимде жұмыс екінші реттік ластануға әкелмейді.",
        "Тұрақты шығынды резервуарларды пайдалану шыңдық кезеңдердегі судың жоғары тұтынылуымен байланысты жүктемені азайтады және үздіксіз сумен жабдықтауды қамтамасыз етеді.",
        "Толығымен автоматты жұмыс, қолмен басқарудың қажеті жоқ; сумен жабдықтау қауіпсіз әрі тұрақты, құбыржелісіндегі қысым ауытқымайды.",
        "Құбырдың жарылуын болдырмау үшін артық қысымнан қорғау; әрбір сорғы екіншісіне қосалқы болып табылады және автоматты айналым режимінде жұмыс істейді.",
      ],
      specs: [
        "Қоршаған орта t: 5°C~40°C",
        "Айдалатын орта t: 4°C~70°C",
        "Салыстырмалы ылғалдылық: ≤85% (20±5°C кезінде)",
        "Кернеу: 380 В(+5%, -10%), 50 Гц",
        "Шығын диапазоны: 0~5000 м³/сағ",
        "Қысым диапазоны: 0~2.5 МПа",
        "Қуат: ≤110 кВт",
        "Қысымды реттеу дәлдігі: <±0.01 МПа",
      ],
      applications: [],
    },
  },
  "water-multi-tank-vfd": {
    en: {
      name: "Multi-Tank Variable-Frequency Water Supply Equipment",
      description: [
        "Multi-level water supply, making rational use of municipal water supply pressure.",
        "Equipped with atmospheric-pressure tanks, high-pressure tanks, ultra-high-pressure tanks, ultra-high-pressure energy storage, multistage compensation, and lower energy consumption at low flow.",
        "Fully enclosed operation, unaffected by the external environment, ensures clean and hygienic water quality.",
        "The material of the overload-protection components is food-grade, environmentally friendly, and hygienic.",
        "Full frequency conversion and automatic control; the pumps operate synchronously, providing substantial energy savings.",
      ],
      specs: [
        "Ambient t: 5°C~40°C",
        "Flow rate: 8~100 m³/h",
        "Head: 15~100 m",
        "Power: 0.37~150 kW",
        "Pressure control accuracy: <0.01 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "多罐变频供水设备",
      description: [
        "多级供水,合理利用市政供水压力。",
        "配备常压罐、高压罐、超高压罐、超高压蓄能罐、多级补偿,小流量时能耗更低。",
        "全封闭运行,不受外部环境影响,确保水质清洁卫生。",
        "过流保护部件材质为食品级、环保卫生材料。",
        "全变频自动控制,水泵同步运行,大幅节能。",
      ],
      specs: [
        "环境温度t: 5°C~40°C",
        "流量: 8~100 m³/h",
        "扬程: 15~100 m",
        "功率: 0.37~150 kW",
        "压力调节精度: <0.01 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "Жиілік түрлендіргіші бар көпрезервуарлы сумен жабдықтау жабдығы",
      description: [
        "Көпдеңгейлі сумен жабдықтау, қалалық сумен жабдықтау қысымын тиімді пайдалану.",
        "Атмосфералық қысымды резервуарлармен, жоғары қысымды резервуарлармен, аса жоғары қысымды резервуарлармен, аса жоғары қысымды энергия жинақтағыштармен, көпсатылы теңгерумен жабдықталған және аз ағын кезінде энергияны аз тұтынады.",
        "Толығымен жабық жұмыс режимі, сыртқы ортаның әсеріне ұшырамайды, судың тазалығы мен гигиенасын қамтамасыз етеді.",
        "Ток асқын жүктемесінен қорғауға арналған бөлшектердің материалы тағамдық, экологиялық таза және гигиеналық.",
        "Толық жиілікті түрлендіру және автоматты басқару, сорғы синхронды жұмыс істейді, бұл айтарлықтай энергия үнемдеуді қамтамасыз етеді.",
      ],
      specs: [
        "Қоршаған орта t: 5°C~40°C",
        "Шығын: 8~100 м³/сағ",
        "Тегеурін: 15~100 м",
        "Қуат: 0.37~150 кВт",
        "Қысымды реттеу дәлдігі: <0.01 МПа",
      ],
      applications: [],
    },
  },
  "smart-pump-room": {
    en: {
      name: "Integrated Smart Box-Type Pump Room",
      description: [
        "Suitable for domestic water supply, production, fire protection, etc., and meets outdoor installation requirements.",
        "Convenient transport, fast installation, and a high degree of integration.",
        "Attractive appearance, reliable windproof and waterproof construction.",
        "Fire protection and anti-theft protection, occupational safety.",
        "Environmentally friendly, sound and heat insulation in all weather conditions.",
        "Intelligent IoT connectivity — real-time and historical data such as equipment operating status, electrical parameters, water quality parameters, temperature and humidity, and video, along with calculations and analysis, can all be accessed and monitored from a computer or mobile phone.",
      ],
      specs: [
        "Ambient t: -20°C~60°C",
        "Medium t: 4°C~70°C",
        "Flow rate: 8~200 m³/h",
        "Head: 15~200 m",
        "Power: 0.75~200 kW",
        "Pressure control accuracy: <0.01 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "箱式智能一体化泵房",
      description: [
        "适用于生活供水、生产、消防等,满足户外安装要求。",
        "运输方便,安装快捷,集成度高。",
        "外观美观,防风防水结构可靠。",
        "消防安全与防盗保护,劳动安全保障。",
        "环保节能,全天候隔音隔热。",
        "智能物联网(IoT),设备运行状态、电气参数、水质参数、温湿度、视频图像等实时及历史数据,以及计算分析结果,均可通过电脑或手机查询,全部处于监控之下。",
      ],
      specs: [
        "环境温度t: -20°C~60°C",
        "介质温度t: 4°C~70°C",
        "流量: 8~200 m³/h",
        "扬程: 15~200 m",
        "功率: 0.75~200 kW",
        "压力调节精度: <0.01 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "Қораптық типті интеграцияланған зияткерлік сорғы залы",
      description: [
        "Тұрмыстық сумен жабдықтауға, өндіріске, өрт сөндіруге және т.б. қолайлы, сыртқа орнату талаптарына жауап береді.",
        "Тасымалдауы ыңғайлы, орнатуы жылдам, интеграциялану деңгейі жоғары.",
        "Тартымды сыртқы түрі, сенімді желден және суықтан қорғайтын конструкциясы.",
        "Өртке қарсы және ұрлықтан қорғаныш, еңбекті қорғау.",
        "Экологиялық таза, кез келген ауа-райы жағдайында дыбыс пен жылу оқшаулауы.",
        "Зияткерлік интернет заттар (IoT) — жабдықтың жұмыс күйі, электрлік параметрлер, су сапасының параметрлері, температура мен ылғалдылық, бейнесурет т.б. нақты уақыттағы және өткен кезеңдердегі деректер, сондай-ақ есептеулер мен талдау компьютерден немесе ұялы телефоннан сұралуы мүмкін, барлығы бақылауда.",
      ],
      specs: [
        "Қоршаған орта t: -20°C~60°C",
        "Айдалатын орта t: 4°C~70°C",
        "Шығын: 8~200 м³/сағ",
        "Тегеурін: 15~200 м",
        "Қуат: 0.75~200 кВт",
        "Қысымды реттеу дәлдігі: <0.01 МПа",
      ],
      applications: [],
    },
  },
  "smart-pump-station": {
    en: {
      name: "'Smart' Integrated Pumping Station",
      description: [
        "Suitable for domestic water supply, production, fire protection, etc., and meets outdoor installation requirements.",
        "Integrated water tank and pump room design, fast assembly, and a high degree of integration.",
        "Frequency-conversion water supply, multi-level tank-type water supply, and multi-level box-type water supply can be freely selected.",
        "Attractive appearance, reliable windproof, waterproof, and light-blocking construction.",
        "Clean and hygienic real-time water quality monitoring to ensure water supply safety.",
        "Environmentally friendly, sound and heat insulation, continuous silent operation around the clock.",
        "Intelligent IoT connectivity — real-time and historical data such as equipment operating status, electrical parameters, water quality parameters, temperature and humidity, and video, along with calculations and analysis, can all be accessed and monitored from a computer or mobile phone.",
      ],
      specs: [
        "Ambient t: -20°C~60°C",
        "Medium t: 4°C~70°C",
        "Flow rate: 8~200 m³/h",
        "Head: 15~200 m",
        "Power: 0.75~200 kW",
        "Pressure control accuracy: <0.01 MPa",
      ],
      applications: [],
    },
    zh: {
      name: "\"智慧\"一体化泵站",
      description: [
        "适用于生活供水、生产、消防等,满足户外安装要求。",
        "水箱与泵房一体化设计,组装快捷,集成度高。",
        "可自由选择变频供水、罐式多级供水及箱式多级供水。",
        "外观美观,防风防水防光结构可靠。",
        "水质实时监测,清洁卫生,保障供水安全。",
        "环保节能,隔音隔热,全天候持续静音运行。",
        "智能物联网(IoT),设备运行状态、电气参数、水质参数、温湿度、视频图像等实时及历史数据,以及计算分析结果,均可通过电脑或手机查询,全部处于监控之下。",
      ],
      specs: [
        "环境温度t: -20°C~60°C",
        "介质温度t: 4°C~70°C",
        "流量: 8~200 m³/h",
        "扬程: 15~200 m",
        "功率: 0.75~200 kW",
        "压力调节精度: <0.01 MPa",
      ],
      applications: [],
    },
    kk: {
      name: "«Ақылды» интеграцияланған сорғы станциясы",
      description: [
        "Тұрмыстық сумен жабдықтауға, өндіріске, өрт сөндіруге және т.б. қолайлы, сыртқа орнату талаптарына жауап береді.",
        "Су резервуары мен сорғы залының интеграцияланған конструкциясы, жылдам монтаж және жоғары интеграциялану деңгейі.",
        "Жиілік түрлендіргішімен сумен жабдықтау, резервуарлық типті көпдеңгейлі сумен жабдықтау және қораптық типті көпдеңгейлі сумен жабдықтау еркін таңдалуы мүмкін.",
        "Тартымды сыртқы түрі, сенімді желден қорғайтын, суға және жарыққа төзімді конструкциясы.",
        "Сумен жабдықтаудың қауіпсіздігін қамтамасыз ету үшін су сапасын нақты уақыт режимінде таза әрі гигиеналық мониторингтеу.",
        "Экологиялық таза, дыбыс пен жылу оқшаулауы, тәулік бойы үздіксіз үнсіз жұмыс.",
        "Зияткерлік интернет заттар (IoT) — жабдықтың жұмыс күйі, электрлік параметрлер, су сапасының параметрлері, температура мен ылғалдылық, бейнесурет т.б. нақты уақыттағы және өткен кезеңдердегі деректер, сондай-ақ есептеулер мен талдау компьютерден немесе ұялы телефоннан сұралуы мүмкін, барлығы бақылауда.",
      ],
      specs: [
        "Қоршаған орта t: -20°C~60°C",
        "Айдалатын орта t: 4°C~70°C",
        "Шығын: 8~200 м³/сағ",
        "Тегеурін: 15~200 м",
        "Қуат: 0.75~200 кВт",
        "Қысымды реттеу дәлдігі: <0.01 МПа",
      ],
      applications: [],
    },
  },
  lec: {
    en: {
      name: "LEC — Electrical Control Cabinet Series",
      description: [
        "LEC-series electrical control equipment is designed to control and protect pump, fan, and auxiliary equipment motors in water supply, sewage, fire protection, HVAC, and industrial process systems.",
        "Carefully selected high-quality components ensure a long service life. Protection functions are implemented against overload, short circuit, overcurrent, phase loss, and other fault conditions.",
        "Fire-protection-series control cabinets can be certified to CCCF. Fire pump control cabinet — GB 16806-2006 'Fire Alarm Linkage Control System.' Complete fire suppression equipment control cabinet — GB 27898-2011 'Fixed Fire Protection Water Supply Equipment.' Fire control cabinet design — GB 50974-2014 'Technical Code for Fire Water Supply Systems with Hydrants.'",
      ],
      specs: [
        "Direct start mode: up to 15 kW",
        "Star-delta start mode (Y)",
        "Auto-coupling depressurized start mode (t)",
        "Soft start mode (p)",
        "Ambient temperature: −10°C~40°C",
        "Relative humidity: 20~90%",
        "Motor power: 0.37~315 kW",
      ],
      applications: [
        "Sewage and drainage",
        "Fire protection and water supply systems",
        "Air conditioning (HVAC) systems",
        "Constant-pressure water supply",
        "Diesel pump units and integrated rainwater pumping stations",
        "Environmental protection equipment",
      ],
    },
    zh: {
      name: "LEC — 电气控制柜系列",
      description: [
        "LEC系列电气控制设备用于供水、排水、消防、HVAC及工业流程系统中水泵、风机及辅助设备电机的控制与保护。",
        "精选高品质元器件确保使用寿命长。具备过载、短路、过流、断相等故障保护功能。",
        "消防系列控制柜可通过CCCF认证。消防泵控制柜——GB 16806-2006《消防联动控制系统》。成套消防设备控制柜——GB 27898-2011《固定消防给水设备》。消防控制柜设计——GB 50974-2014《消防给水及消火栓系统技术规范》。",
      ],
      specs: [
        "直接启动方式: 最高15 kW",
        "星三角启动方式(Y)",
        "自耦减压启动方式(t)",
        "软启动方式(p)",
        "环境温度: −10°C~40°C",
        "相对湿度: 20~90%",
        "电机功率: 0.37~315 kW",
      ],
      applications: [
        "排水及污水处理",
        "消防及供水系统",
        "空调系统(HVAC)",
        "恒压供水",
        "柴油泵组及雨水一体化泵站",
        "环保设备",
      ],
    },
    kk: {
      name: "LEC — Электрлік басқару шкафтарының сериясы",
      description: [
        "LEC сериясындағы электротехникалық бақылау жабдығы сумен жабдықтау, кәріз, өрт сөндіру, HVAC жүйелерінде және өнеркәсіптік процестерде сорғылардың, желдеткіштердің және қосалқы жабдықтардың электр қозғалтқыштарын басқаруға және қорғауға арналған.",
        "Мұқият таңдалған жоғары сапалы компоненттер ұзақ қызмет мерзімін қамтамасыз етеді. Асқын жүктемеден, қысқа тұйықталудан, ток асқын жүктемесінен, фазаның үзілуінен және басқа да апаттық режимдерден қорғау функциялары іске асырылған.",
        "Өрт сериясындағы басқару шкафтары CCCF стандартына сай сертификатталуы мүмкін. Өрт сорғысын басқару шкафы — GB 16806-2006 «Өрт байланысын басқару жүйесі». Кешенді өрт сөндіру жабдығын басқару шкафы — GB 27898-2011 «Стационарлық өртке қарсы сумен жабдықтау жабдығы». Өрт басқару шкафының конструкциясы — GB 50974-2014 «Гидранттары бар өрт сөндіру сумен жабдықтау жүйелеріне арналған техникалық нормалар».",
      ],
      specs: [
        "Тікелей іске қосу режимі: 15 кВт-қа дейін",
        "«Жұлдыз-үшбұрыш» іске қосу режимі (Y)",
        "Қысымды алу арқылы автотіркеуіш іске қосу режимі (t)",
        "Жұмсақ іске қосу режимі (p)",
        "Қоршаған орта температурасы: −10°C~40°C",
        "Салыстырмалы ылғалдылық: 20~90%",
        "Қозғалтқыш қуаты: 0.37~315 кВт",
      ],
      applications: [
        "Кәріз және су бұру",
        "Өрт сөндіру және сумен жабдықтау жүйелері",
        "Ауаны баптау жүйелері (HVAC)",
        "Тұрақты қысыммен сумен жабдықтау",
        "Дизельді сорғы қондырғылары және жаңбыр суына арналған кешенді сорғы станциялары",
        "Қоршаған ортаны қорғау жабдығы",
      ],
    },
  },
  lbp: {
    en: {
      name: "LBP — Frequency-Conversion Control Cabinet Series",
      description: [
        "The LBP-series frequency-conversion control cabinet provides speed control for pumps and electric motors, energy savings, and stable operation of constant-pressure water supply systems.",
        "High-quality components from leading manufacturers such as ABB and SIEMENS are used to ensure reliability. Alarm signals, self-diagnostics, and fault assessment are provided for non-standard operating modes.",
        "At the customer's request, the cabinet can be fitted with human-machine interfaces, including touch screens.",
      ],
      specs: [
        "Frequency-conversion control mode (LBP)",
        "Ambient temperature: −10°C~40°C",
        "Relative humidity: 20~90%",
        "Adjustable flow: 0~5000 m³/h",
        "Motor power: 0.37~315 kW",
      ],
      applications: [
        "Constant-pressure water supply systems",
        "Industrial and municipal water supply",
        "HVAC systems and process applications",
        "Pumping stations with flow and pressure control",
      ],
    },
    zh: {
      name: "LBP — 变频控制柜系列",
      description: [
        "LBP系列变频控制柜为水泵及电机提供调速控制,实现恒压供水系统的节能与稳定运行。",
        "为确保可靠性,采用ABB、SIEMENS等知名厂商的高品质元器件。配备非标运行模式下的报警信号、自诊断及故障评估功能。",
        "可根据客户要求为控制柜配备人机交互界面,包括触摸屏。",
      ],
      specs: [
        "变频控制方式(LBP)",
        "环境温度: −10°C~40°C",
        "相对湿度: 20~90%",
        "可调流量: 0~5000 m³/h",
        "电机功率: 0.37~315 kW",
      ],
      applications: [
        "恒压供水系统",
        "工业及城市供水",
        "HVAC系统及工艺流程",
        "带流量及压力控制的泵站",
      ],
    },
    kk: {
      name: "LBP — Жиілік түрлендіргіші бар басқару шкафтарының сериясы",
      description: [
        "LBP сериясындағы жиілік түрлендіргіші бар басқару шкафы сорғылар мен электр қозғалтқыштарының жылдамдығын басқаруды, тұрақты қысыммен сумен жабдықтау жүйелерінің энергия үнемдеуін және тұрақты жұмысын қамтамасыз етеді.",
        "Сенімділікті қамтамасыз ету үшін ABB және SIEMENS сияқты жетекші өндірушілердің жоғары сапалы компоненттері қолданылады. Стандартты емес жұмыс режимдерінде апаттық сигналдар, өздігінен диагностикалау және ақаулықтарды бағалау қарастырылған.",
        "Тапсырысшының талабы бойынша шкаф сенсорлық экрандарды қоса алғанда адам-машина өзара әрекеттесу интерфейстерімен жабдықталуы мүмкін.",
      ],
      specs: [
        "Жиілікті түрлендіру арқылы басқару режимі (LBP)",
        "Қоршаған орта температурасы: −10°C~40°C",
        "Салыстырмалы ылғалдылық: 20~90%",
        "Реттелетін шығын: 0~5000 м³/сағ",
        "Қозғалтқыш қуаты: 0.37~315 кВт",
      ],
      applications: [
        "Тұрақты қысыммен сумен жабдықтау жүйелері",
        "Өнеркәсіптік және қалалық сумен жабдықтау",
        "HVAC жүйелері мен технологиялық процестер",
        "Шығын мен қысымды реттейтін сорғы станциялары",
      ],
    },
  },
  "hv-control-cabinet": {
    en: {
      name: "High-Voltage Electrical Control Cabinet",
      description: [
        "The high-voltage electrical control cabinet is designed for starting, protecting, and remotely controlling large pump units and process equipment at energy, water supply, and industrial facilities.",
        "The design is simple and reliable, starting is stable, and maintenance is convenient. Motor alarm and protection functions are implemented. Compact dimensions reduce infrastructure costs.",
        "High-voltage and explosion-proof cabinets from third-party suppliers can be integrated into a comprehensive control system.",
      ],
      specs: [
        "Ambient temperature: 0°C~50°C",
        "Relative humidity: <90%",
        "Altitude above sea level: <1000 m",
        "Surface incline: <5°",
        "Adjustable flow: 0~5000 m³/h",
        "Motor power: 0.37~315 kW",
      ],
      applications: [
        "Large pumping stations and water intakes",
        "Industrial and energy facilities",
        "Systems with high-voltage pump drives",
      ],
    },
    zh: {
      name: "高压电气控制柜",
      description: [
        "高压电气控制柜用于能源、供水及工业设施中大型泵组及工艺设备的启动、保护和远程控制。",
        "结构简单可靠,启动稳定,维护方便。具备电机报警及保护功能。紧凑的尺寸降低了基础设施成本。",
        "可将第三方供应商的高压柜及防爆柜集成至综合控制系统中。",
      ],
      specs: [
        "环境温度: 0°C~50°C",
        "相对湿度: <90%",
        "海拔高度: <1000 m",
        "地面倾斜度: <5°",
        "可调流量: 0~5000 m³/h",
        "电机功率: 0.37~315 kW",
      ],
      applications: [
        "大型泵站及取水口",
        "工业及能源设施",
        "带高压泵驱动的系统",
      ],
    },
    kk: {
      name: "Жоғары вольтты электрлік басқару шкафы",
      description: [
        "Жоғары вольтты электрлік басқару шкафы энергетика, сумен жабдықтау және өнеркәсіп объектілеріндегі ірі сорғы агрегаттары мен технологиялық жабдықты іске қосуға, қорғауға және қашықтан басқаруға арналған.",
        "Конструкциясы қарапайым әрі сенімді, іске қосу тұрақты, техникалық қызмет көрсету ыңғайлы. Қозғалтқышты сигналдау және қорғау функциялары іске асырылған. Ықшам көлемдер инфрақұрылым шығындарын азайтады.",
        "Үшінші тарап жеткізушілерінің жоғары вольтты және жарылыстан қорғалған шкафтарын кешенді басқару жүйесіне біріктіру мүмкіндігі бар.",
      ],
      specs: [
        "Қоршаған орта температурасы: 0°C~50°C",
        "Салыстырмалы ылғалдылық: <90%",
        "Теңіз деңгейінен биіктік: <1000 м",
        "Беткі қиябет: <5°",
        "Реттелетін шығын: 0~5000 м³/сағ",
        "Қозғалтқыш қуаты: 0.37~315 кВт",
      ],
      applications: [
        "Ірі сорғы станциялары мен су алу орындары",
        "Өнеркәсіптік және энергетикалық объектілер",
        "Сорғылардың жоғары вольтты жетегі бар жүйелер",
      ],
    },
  },
  lfb: {
    en: {
      name: "LFB — Fan Speed Frequency-Conversion Control Cabinet Series",
      description: [
        "The LFB-series fan frequency-conversion control cabinet provides energy-saving, stable control of ventilation systems within HVAC and process installations.",
        "A resonance-point bypass setting is provided, protecting the motor and fan from vibration and voltage surges. A manual control switch ensures safe, continuous equipment operation.",
        "A serial communication port allows the cabinet to be connected to a computer or network for remote monitoring and control.",
      ],
      specs: [
        "Ambient temperature: 0°C~40°C",
        "Relative humidity: <90%",
        "Altitude above sea level: <1000 m",
        "Surface incline: <5°",
      ],
      applications: [
        "Air conditioning (HVAC) systems",
        "Industrial ventilation and smoke extraction",
        "Process installations with variable-speed fan drives",
      ],
    },
    zh: {
      name: "LFB — 风机变频调速控制柜系列",
      description: [
        "LFB系列风机变频控制柜为HVAC及工艺装置中的通风系统提供节能、稳定的控制。",
        "配备越过共振点设置,保护电机及风机免受振动和电压波动影响。手动控制开关保证设备安全连续运行。",
        "串口通信可将控制柜连接至电脑或网络,实现远程监控与管理。",
      ],
      specs: [
        "环境温度: 0°C~40°C",
        "相对湿度: <90%",
        "海拔高度: <1000 m",
        "地面倾斜度: <5°",
      ],
      applications: [
        "空调系统(HVAC)",
        "工业通风及排烟",
        "带调速风机驱动的工艺装置",
      ],
    },
    kk: {
      name: "LFB — Желдеткіштің айналу жиілігін түрлендіргіші бар басқару шкафтарының сериясы",
      description: [
        "LFB сериясындағы желдеткіштің жиілік түрлендіргіші бар басқару шкафы HVAC және технологиялық қондырғылар құрамындағы желдету жүйелерінің энергия үнемдеуші әрі тұрақты басқарылуын қамтамасыз етеді.",
        "Қозғалтқыш пен желдеткішті дірілден және кернеу секірулерінен қорғайтын резонанс нүктелерінен айналып өту баптауы қарастырылған. Қолмен басқару ажыратқышы жабдықтың қауіпсіз әрі үздіксіз жұмысын қамтамасыз етеді.",
        "Тізбекті байланыс порты шкафты қашықтан бақылау және басқару үшін компьютерге немесе желіге қосуға мүмкіндік береді.",
      ],
      specs: [
        "Қоршаған орта температурасы: 0°C~40°C",
        "Салыстырмалы ылғалдылық: <90%",
        "Теңіз деңгейінен биіктік: <1000 м",
        "Беткі қиябет: <5°",
      ],
      applications: [
        "Ауаны баптау жүйелері (HVAC)",
        "Өнеркәсіптік желдету және түтінді жою",
        "Жетегі реттелетін желдеткіштер бар технологиялық қондырғылар",
      ],
    },
  },
  "lv-distribution": {
    en: {
      name: "Low-Voltage Distribution Switchgear",
      description: [
        "Low-voltage distribution switchgear is part of the electrical control system and ensures reliable power distribution for pumping stations, control cabinets, and auxiliary equipment.",
        "An automated production system combines design, manufacturing, and analysis to ensure consistent quality. Advanced automated equipment and standardized assembly lines are used.",
      ],
      specs: [
        "Ambient temperature: −10°C~40°C",
        "Relative humidity: 20~90%",
        "Power supply: 380 V, 50 Hz",
      ],
      applications: [
        "Low-voltage distribution equipment for pumping stations",
        "Integrated water supply and drainage systems",
        "Industrial and civil facilities",
      ],
    },
    zh: {
      name: "低压配电柜",
      description: [
        "低压配电柜是电气控制系统的组成部分,为泵站、控制柜及辅助设备提供可靠的电力分配。",
        "自动化生产系统将设计、制造与分析相结合,确保质量稳定。采用先进的自动化设备及标准化装配线。",
      ],
      specs: [
        "环境温度: −10°C~40°C",
        "相对湿度: 20~90%",
        "电源: 380 V, 50 Hz",
      ],
      applications: [
        "泵站低压配电设备",
        "综合给排水系统",
        "工业及民用设施",
      ],
    },
    kk: {
      name: "Төмен вольтты бөлу құрылғысы",
      description: [
        "Төмен вольтты бөлу құрылғысы электр жабдығын басқару жүйесінің құрамдас бөлігі болып табылады және сорғы станциялары, басқару шкафтары мен қосалқы жабдық үшін сенімді электр энергиясын бөлуді қамтамасыз етеді.",
        "Автоматтандырылған өндірістік жүйе тұрақты сапаны қамтамасыз ету үшін жобалауды, өндіруді және талдауды біріктіреді. Озық автоматтандырылған жабдық пен стандартталған құрастыру желілері қолданылады.",
      ],
      specs: [
        "Қоршаған орта температурасы: −10°C~40°C",
        "Салыстырмалы ылғалдылық: 20~90%",
        "Қорек көзі: 380 В, 50 Гц",
      ],
      applications: [
        "Сорғы станцияларына арналған төмен вольтты бөлу жабдығы",
        "Кешенді сумен жабдықтау және кәріз жүйелері",
        "Өнеркәсіптік және азаматтық объектілер",
      ],
    },
  },
  "wq-ii": {
    en: {
      name: "WQ(II) — Small Submersible Sewage Pump",
      description: [
        "The WQ(II)-series small submersible sewage pump is designed for pumping wastewater in municipal and industrial sectors.",
      ],
      specs: [
        "Rotation speed: 2850 rpm, 1450 rpm",
        "Voltage: 380 V",
        "Diameter: 50–150 mm",
        "Flow range: 5–200 m³/h",
        "Lift range: 5–38 m",
      ],
      applications: [
        "Municipal construction, building construction, industrial wastewater, sewage treatment, and other industrial applications.",
        "Pumping sewage, effluent, rainwater, and urban domestic wastewater containing solid particles and various fibers.",
      ],
    },
    zh: {
      name: "WQ(II) — 小型潜水污水泵",
      description: [
        "WQ(II)系列小型潜水污水泵适用于市政及工业领域的污水抽送。",
      ],
      specs: [
        "转速: 2850 rpm, 1450 rpm",
        "电压: 380 V",
        "直径: 50–150 mm",
        "流量范围: 5–200 m³/h",
        "扬程范围: 5–38 m",
      ],
      applications: [
        "市政建设、房屋建筑、工业废水、污水处理等工业场合。",
        "抽送含固体颗粒及各类纤维的污水、废水、雨水及城市生活污水。",
      ],
    },
    kk: {
      name: "WQ(II) — Кәрізге арналған кіші батырылатын сорғы",
      description: [
        "WQ(II) сериясындағы кәрізге арналған кіші батырылатын сорғы коммуналдық және өнеркәсіптік секторларда кәріз суларын айдауға арналған.",
      ],
      specs: [
        "Айналу жылдамдығы: 2850 айн/мин, 1450 айн/мин",
        "Кернеу: 380 В",
        "Диаметр: 50–150 мм",
        "Шығын диапазоны: 5–200 м³/сағ",
        "Көтеру диапазоны: 5–38 м",
      ],
      applications: [
        "Коммуналдық құрылыс, ғимарат құрылысы, өнеркәсіптік кәріз сулары, кәріз суларын тазарту және басқа да өнеркәсіптік жағдайлар.",
        "Қатты бөлшектер мен әртүрлі талшықтары бар кәріз суларын, ағындыларды, жаңбыр суын және қалалық тұрмыстық суларды айдау.",
      ],
    },
  },
  slzae: {
    en: {
      name: "SLZAE-OH2 — Chemical Pumps",
      description: [
        "SLZAE-series chemical pumps are horizontal single-stage single-suction cantilever centrifugal pumps. Designed to the API 610 standard, OH2 configuration, with a design pressure of 5.0 MPa. Suitable for pumping clean or granular, neutral or caustic media. Rotation is clockwise viewed from the drive end. Pump type — API OH2.",
      ],
      specs: [
        "Diameter: DN25–400 mm",
        "Flow rate (Q): up to 2600 m³/h",
        "Head height: up to 300 m",
        "Working pressure (P): up to 5.0 MPa",
        "Working temperature (T): −80°C ~ +450°C (depending on materials)",
        "Pump type: API OH2",
      ],
      applications: [
        "Oil refining, petrochemical, and coal industries",
        "Low-temperature engineering, chemical, paper, pulp, and sugar industries",
        "Water treatment plants, heating and air-conditioning systems at desalination plants",
        "Marine environmental engineering and offshore engineering",
      ],
    },
    zh: {
      name: "SLZAE-OH2 — 化工泵",
      description: [
        "SLZAE系列化工泵为卧式单级单吸悬臂式离心泵。按照API 610标准设计,OH2结构,设计压力5.0 MPa。适用于抽送洁净或含颗粒、中性或苛性介质。从驱动端看,旋转方向为顺时针。泵型为API OH2。",
      ],
      specs: [
        "直径: DN25–400 mm",
        "流量(Q): 最高2600 m³/h",
        "扬程高度: 最高300 m",
        "工作压力(P): 最高5.0 MPa",
        "工作温度(T): −80°C ~ +450°C(视材料而定)",
        "泵型: API OH2",
      ],
      applications: [
        "炼油、石油化工及煤炭工业",
        "低温工程、化工、造纸、制浆及制糖工业",
        "海水淡化厂的供水厂、供暖及空调系统",
        "船舶环境工程及海洋工程",
      ],
    },
    kk: {
      name: "SLZAE-OH2 — Химиялық сорғылар",
      description: [
        "SLZAE сериясындағы химиялық сорғылар — көлденең бір сатылы бір жақты сорылатын консольді центрифугалық сорғылар. Өнім API 610 стандарты бойынша, OH2 конструкциясымен, есептік қысымы 5,0 МПа болатындай әзірленген. Таза немесе түйіршікті, бейтарап немесе күйдіргіш орталарды айдауға қолайлы. Айналу — жетек жағынан қарағанда сағат тілі бойымен. Сорғы түрі — API OH2.",
      ],
      specs: [
        "Диаметр: DN25–400 мм",
        "Расход (Q): 2600 м³/сағ дейін",
        "Тегеурін биіктігі: 300 м дейін",
        "Жұмыс қысымы (P): 5,0 МПа дейін",
        "Жұмыс температурасы (T): −80°C ~ +450°C (материалдарға байланысты)",
        "Сорғы түрі: API OH2",
      ],
      applications: [
        "Мұнай өңдеу, мұнайхимия және көмір өнеркәсібі",
        "Төмен температуралы машина жасау, химия, қағаз, целлюлоза және қант өнеркәсібі",
        "Тұщыландыру зауыттарындағы сумен жабдықтау зауыттары, жылыту және баптау жүйелері",
        "Кемелердің экологиялық инженериясы және оффшорлық инженерия",
      ],
    },
  },
  slzaf: {
    en: {
      name: "SLZAF-OH2 — Cantilever Centrifugal Pump",
      description: [
        "SLZAF-series chemical pumps are horizontal single-stage single-suction cantilever centrifugal pumps. Designed to the API 610 standard, OH2 configuration, with a design pressure of 7.5 MPa. Suitable for pumping clean or granular, neutral or caustic media. Rotation is clockwise viewed from the drive end.",
        "The pump casing is centerline-supported, and the impeller is closed, allowing a small amount of solid particles. Bearings: tapered roller + angular contact. Back pull-out design with an extended diaphragm coupling — no need to move the motor or dismantle piping when replacing wear parts.",
        "Wear rings are fitted at the front and back of the impeller and on the casing cover. A mechanical seal chamber per API 682. The bearing housing has a water-cooling jacket; the pump feet can be connected to cooling water to compensate for high-temperature expansion.",
      ],
      specs: [
        "Temperature range: −80~450°C",
        "Flow range: ≤ 2000 m³/h",
        "Lift range: ≤ 290 m",
        "Design pressure: 7.5 MPa",
        "Pump type: API OH2",
      ],
      applications: [
        "Oil refining and petrochemical industry",
        "Pumping clean, granular, neutral, or caustic media",
        "High-temperature, high-pressure chemical processes",
      ],
    },
    zh: {
      name: "SLZAF-OH2 — 悬臂式离心泵",
      description: [
        "SLZAF系列化工泵为卧式单级单吸悬臂式离心泵。按照API 610标准设计,OH2结构,设计压力7.5 MPa。适用于抽送洁净或含颗粒、中性或苛性介质。从驱动端看,旋转方向为顺时针。",
        "泵壳采用中心线支撑,叶轮为闭式,允许含少量固体颗粒。轴承:圆锥滚子轴承+角接触轴承。后开门式结构配加长膜片联轴器——更换易损件时无需移动电机或拆卸管路。",
        "叶轮前后及泵壳盖上设有磨损环。机械密封腔符合API 682标准。轴承部件配有水冷夹套;泵脚可连接冷却水以补偿高温膨胀。",
      ],
      specs: [
        "温度范围: −80~450°C",
        "流量范围: ≤ 2000 m³/h",
        "扬程范围: ≤ 290 m",
        "设计压力: 7.5 MPa",
        "泵型: API OH2",
      ],
      applications: [
        "炼油及石油化工行业",
        "抽送洁净、含颗粒、中性或苛性介质",
        "高温高压化工工艺",
      ],
    },
    kk: {
      name: "SLZAF-OH2 — Консольді центрифугалық сорғы",
      description: [
        "SLZAF сериясындағы химиялық сорғылар — көлденең бір сатылы бір жақты сорылатын консольді центрифугалық сорғылар. Өнім API 610 стандарты бойынша, OH2 конструкциясымен, есептік қысымы 7,5 МПа болатындай әзірленген. Таза немесе түйіршікті, бейтарап немесе күйдіргіш орталарды айдауға қолайлы. Айналу — жетек жағынан қарағанда сағат тілі бойымен.",
        "Сорғы корпусы орталық сызық бойынша тірелген, жұмыс дөңгелегі жабық түрде — аз мөлшердегі қатты бөлшектерге рұқсат етіледі. Мойынтіректер: конустық роликті + радиалды-тірек. Ұзартылған мембраналық муфтасы бар артқы есік конструкциясы — тозған бөлшектерді ауыстырғанда қозғалтқышты жылжытудың немесе құбыржелілерін бөлшектеудің қажеті жоқ.",
        "Жұмыс дөңгелегінің алдыңғы және артқы жағында, сондай-ақ корпус қақпағында компенсациялық сақиналар бар. API 682 бойынша механикалық тығыздауыш қуысы. Мойынтірек тобында сумен салқындату көйлегі бар; жоғары температуралық ұлғаюды теңгеру үшін сорғы аяқтарын салқындатқыш суға қосуға болады.",
      ],
      specs: [
        "Температура диапазоны: −80~450°C",
        "Шығын диапазоны: ≤ 2000 м³/сағ",
        "Көтеру диапазоны: ≤ 290 м",
        "Есептік қысым: 7,5 МПа",
        "Сорғы түрі: API OH2",
      ],
      applications: [
        "Мұнай өңдеу және мұнайхимия өнеркәсібі",
        "Таза, түйіршікті, бейтарап немесе күйдіргіш орталарды айдау",
        "Жоғары температуралы және жоғары тегеурінді химиялық процестер",
      ],
    },
  },
  "xbd-w": {
    en: {
      name: "XBD-W — Horizontal Single-Stage Fire Pump",
      description: [
        "The new XBD-W-series horizontal single-stage fire pump is developed to meet market needs. Performance and technical specifications comply with the GB 6245-2006 'Fire Pump' standard. The product has been evaluated by the Fire Product Conformity Assessment Center of the Ministry of Public Security and holds the CCCF fire safety certificate.",
      ],
      specs: [
        "Flow range: 5 L/s – 90 L/s",
        "Pressure range: 0.33 MPa – 2.4 MPa",
        "Motor speed: 2960 rpm, 1480 rpm",
        "Medium temperature: ≤ 80°C (clean water)",
        "Maximum allowable inlet pressure: 0.4 MPa",
        "Inlet/outlet bore diameter: DN65–DN200",
        "Certification: CCCF, GB 6245-2006",
      ],
      applications: [
        "Water supply for fixed fire suppression systems in industrial and civil buildings",
        "Hydrant systems, sprinklers, and water mist",
        "Standalone fire protection and combined domestic (production) water supply",
        "Water supply and drainage for buildings, municipal and industrial water supply, boiler feed",
      ],
    },
    zh: {
      name: "XBD-W — 卧式单级消防泵",
      description: [
        "全新XBD-W系列卧式单级消防泵根据市场需求研发。性能及技术条件符合GB 6245-2006《消防泵》标准。产品已通过公安部消防产品合格评定中心评定,并持有CCCF消防安全认证证书。",
      ],
      specs: [
        "流量范围: 5 L/s – 90 L/s",
        "压力范围: 0.33 MPa – 2.4 MPa",
        "电机转速: 2960 rpm, 1480 rpm",
        "介质温度: ≤ 80°C(清水)",
        "最大允许进口压力: 0.4 MPa",
        "进出口口径: DN65–DN200",
        "认证: CCCF, GB 6245-2006",
      ],
      applications: [
        "工业及民用建筑固定消防系统供水",
        "消火栓系统、喷淋系统及细水雾系统",
        "独立消防及联合生活(生产)供水",
        "建筑给排水、市政及工业供水,锅炉给水",
      ],
    },
    kk: {
      name: "XBD-W — Көлденең бір сатылы өрт сорғысы",
      description: [
        "Жаңа XBD-W сериясындағы көлденең бір сатылы өрт сорғысы нарық қажеттіліктерін ескере отырып әзірленген. Өнімділігі мен техникалық шарттары GB 6245-2006 «Өрт сорғысы» стандартына сай келеді. Өнім Қоғамдық қауіпсіздік министрлігінің өрт өнімдерінің сәйкестігін бағалау орталығынан бағалаудан өтті және CCCF өрт қауіпсіздігі сертификатына ие.",
      ],
      specs: [
        "Шығын диапазоны: 5 л/с – 90 л/с",
        "Қысым диапазоны: 0,33 МПа – 2,4 МПа",
        "Қозғалтқыш жылдамдығы: 2960 айн/мин, 1480 айн/мин",
        "Орта температурасы: ≤ 80°C (таза су)",
        "Кірістегі рұқсат етілген максималды қысым: 0,4 МПа",
        "Кіріс және шығыс тесігінің диаметрі: DN65–DN200",
        "Сертификаттау: CCCF, GB 6245-2006",
      ],
      applications: [
        "Өнеркәсіптік және азаматтық ғимараттардағы стационарлық өрт сөндіру жүйелерін сумен жабдықтау",
        "Гидрант жүйелері, спринклерлер және ұсақ тозаңдатылған су",
        "Дербес өртке қарсы және біріктірілген тұрмыстық-шаруашылық (өндірістік) сумен жабдықтау",
        "Ғимараттарды сумен жабдықтау және суды бұру, коммуналдық және өнеркәсіптік сумен жабдықтау, қазандықтарды қоректендіру",
      ],
    },
  },
};
