// Реестр реальных выполненных объектов LAVANER OÜ.
//
// ВАЖНО: сюда попадают ТОЛЬКО подтверждённые объекты с реальными фото/видео.
// Адреса, даты, имена клиентов и цены не указываем, если они не подтверждены.

import type { Lang } from "./i18n";
import { REAL_MEDIA } from "./project-media";
import type { ServiceKey } from "./routes-map";

export type ProjectImage = {
  src: string;
  /** Alt на трёх языках (на сайте показываем по языку страницы). */
  alt: Record<Lang, string>;
};

export type ProjectVideo = {
  src: string;
  poster: string;
  title: Record<Lang, string>;
};

export type Project = {
  id: string;
  name: Record<Lang, string>;
  /** Населённый пункт — только если подтверждён. Иначе не указываем. */
  location?: string;
  propertyType?: Record<Lang, string>;
  works: Record<Lang, string[]>;
  description: Record<Lang, string>;
  year?: number;
  /** Обложка объекта. */
  cover: ProjectImage;
  /** Дополнительные фото галереи. */
  gallery?: ProjectImage[];
  /** Видео объекта (без автозвука). */
  video?: ProjectVideo;
  /** Пара «до/после» — только если оба кадра реально показывают одно место. */
  imageBefore?: string;
  imageAfter?: string;
  services: ServiceKey[];
};

export const PROJECTS: Project[] = [
  {
    id: "vannituba-wc-renoveerimine",
    name: {
      et: "Vannitoa ja WC renoveerimine",
      ru: "Реновация ванной комнаты и санузла",
      en: "Bathroom and WC renovation",
    },
    propertyType: { et: "Eluruum", ru: "Жилое помещение", en: "Residential" },
    works: {
      et: [
        "Vannitoa ja WC plaaditööd",
        "Dušiala ehitus lineaartrapiga",
        "Sanitaartehnika ja segistite paigaldus",
        "Valgustuse ja peeglivalgustuse paigaldus",
        "Mööbli ja nišipindade viimistlus",
      ],
      ru: [
        "Плиточные работы в ванной и санузле",
        "Душевая зона с линейным трапом",
        "Монтаж сантехники и смесителей",
        "Освещение, в том числе подсветка зеркал",
        "Монтаж мебели и отделка ниш",
      ],
      en: [
        "Tiling in the bathroom and WC",
        "Shower area with a linear drain",
        "Plumbing fixtures and mixers",
        "Lighting, including mirror lighting",
        "Cabinetry and niche finishing",
      ],
    },
    description: {
      et: "Valmis vannituba ja WC: suureformaadilised plaadid, valgustusega peeglid, nišid, dušiala lineaartrapiga ning seinale paigaldatud sanitaartehnika.",
      ru: "Готовые ванная комната и санузел: крупноформатная плитка, зеркала с подсветкой, ниши, душевая зона с линейным трапом и подвесная сантехника.",
      en: "Finished bathroom and WC: large-format tiles, illuminated mirrors, niches, a shower area with a linear drain and wall-hung sanitary ware.",
    },
    cover: {
      src: REAL_MEDIA.vannitubaValmis,
      alt: {
        et: "Renoveeritud vannituba kahe valamu ja valgustusega peeglitega",
        ru: "Отремонтированная ванная комната с двумя раковинами и зеркалами с подсветкой",
        en: "Renovated bathroom with two basins and illuminated mirrors",
      },
    },
    gallery: [
      {
        src: REAL_MEDIA.dusialaPlaaditood,
        alt: {
          et: "Valmis dušiala plaaditööde ja lineaartrapi lahendusega",
          ru: "Готовая душевая зона с плиточными работами и линейным трапом",
          en: "Finished shower area with tiling and a linear drain",
        },
      },
      {
        src: REAL_MEDIA.dusialaLineaartrapp,
        alt: {
          et: "Dušiala seinaplaadid ja põrandasse paigaldatud lineaartrapp",
          ru: "Настенная плитка душевой зоны и линейный трап в полу",
          en: "Shower wall tiling and a floor-mounted linear drain",
        },
      },
      {
        src: REAL_MEDIA.vannitoaDusinurk,
        alt: {
          et: "Vannitoa dušinurk ja puidust kõrgkapp pärast siseviimistlustöid",
          ru: "Душевой угол и высокий деревянный шкаф после отделочных работ",
          en: "Shower corner and tall wooden cabinet after finishing works",
        },
      },
      {
        src: REAL_MEDIA.wcValgustatudPeegel,
        alt: {
          et: "Renoveeritud WC valgustatud peegli ja seinale paigaldatud potiga",
          ru: "Отремонтированный санузел с подсвеченным зеркалом и подвесным унитазом",
          en: "Renovated WC with an illuminated mirror and wall-hung toilet",
        },
      },
      {
        src: REAL_MEDIA.wcKapidValamu,
        alt: {
          et: "WC valamu, puidust mööbel ja seinakapid pärast remonti",
          ru: "Раковина санузла, деревянная мебель и настенные шкафы после ремонта",
          en: "WC basin, wooden furniture and wall cabinets after renovation",
        },
      },
      {
        src: REAL_MEDIA.wcPlaaditood,
        alt: {
          et: "WC plaaditööd ja seinale paigaldatud sanitaartehnika",
          ru: "Плиточные работы в санузле и подвесная сантехника",
          en: "WC tiling and wall-hung sanitary ware",
        },
      },
    ],
    services: ["bathroom-renovation", "plumbing", "finishing", "apartment-renovation"],
  },
  {
    id: "eramute-ehitus-valisviimistlus",
    name: {
      et: "Eramute ehitus ja välisviimistlus",
      ru: "Строительство частных домов и наружная отделка",
      en: "Detached house construction and exterior finishing",
    },
    propertyType: { et: "Eramu", ru: "Частный дом", en: "Detached house" },
    works: {
      et: [
        "Eramute ehitus",
        "Katusekatte paigaldus",
        "Välisvoodri paigaldus ja välisviimistlus",
        "Vihmaveesüsteemi paigaldus",
      ],
      ru: [
        "Строительство частных домов",
        "Монтаж кровельного покрытия",
        "Монтаж наружной обшивки и отделка фасада",
        "Монтаж водосточной системы",
      ],
      en: [
        "Detached house construction",
        "Roof covering installation",
        "External cladding and facade finishing",
        "Rainwater system installation",
      ],
    },
    description: {
      et: "Kaks eramut ehitusjärgus: paigaldatud katusekivi, puidust välisvooder, vihmaveesüsteem ning käimasolevad välisviimistlustööd tellingutelt.",
      ru: "Два частных дома в процессе строительства: уложена черепица, смонтирована деревянная обшивка и водосточная система, ведутся наружные отделочные работы.",
      en: "Two detached houses under construction: roof tiles laid, wooden cladding and rainwater system installed, exterior finishing in progress.",
    },
    cover: {
      src: REAL_MEDIA.eramuteEhitusTalvel,
      alt: {
        et: "Kaks ehitusjärgus eramut, paigaldatud katus ja puidust välisvooder",
        ru: "Два строящихся частных дома с уложенной кровлей и деревянной обшивкой",
        en: "Two detached houses under construction with finished roof and wooden cladding",
      },
    },
    gallery: [
      {
        src: REAL_MEDIA.eramuValisviimistlus,
        alt: {
          et: "Eramu välisviimistlustööd tellingutelt, valmis katus ja voodrilaud",
          ru: "Наружные отделочные работы с лесов, готовая кровля и обшивка",
          en: "Exterior finishing from scaffolding, completed roof and cladding",
        },
      },
      {
        src: REAL_MEDIA.eramuKatusVoodrilaud,
        alt: {
          et: "Eramu paigaldatud katusekivi ja puidust voodrilaud",
          ru: "Уложенная черепица и деревянная обшивка частного дома",
          en: "Roof tiles and wooden cladding of a detached house",
        },
      },
      {
        src: REAL_MEDIA.eramudOues,
        alt: {
          et: "Valminud katuse ja välisvoodriga eramud ehitusplatsil",
          ru: "Дома с готовой кровлей и наружной обшивкой на участке",
          en: "Houses with completed roof and cladding on site",
        },
      },
    ],
    services: ["construction", "roof", "facade", "house-renovation"],
  },
  {
    id: "terrassi-ehitus-eramule",
    name: {
      et: "Terrassi ehitus ja välisviimistlus",
      ru: "Строительство террасы и наружная отделка",
      en: "Terrace construction and exterior finishing",
    },
    propertyType: { et: "Eramu", ru: "Частный дом", en: "Detached house" },
    works: {
      et: [
        "Puidust terrassi ehitus",
        "Terrassi alusvundamendi ja karkassi paigaldus",
        "Fassaadiplaatide ja puitvoodri paigaldus",
      ],
      ru: [
        "Строительство деревянной террасы",
        "Монтаж опор и каркаса террасы",
        "Монтаж фасадных плит и деревянной обшивки",
      ],
      en: [
        "Wooden terrace construction",
        "Terrace supports and frame installation",
        "Facade panels and timber cladding",
      ],
    },
    description: {
      et: "Kaasaegse eramu puidust terrass koos varjualusega ning tumedate fassaadiplaatide ja puitvoodri kombinatsiooniga.",
      ru: "Деревянная терраса современного частного дома с навесом, тёмными фасадными плитами и деревянной обшивкой.",
      en: "Wooden terrace of a modern detached house with a canopy, dark facade panels and timber cladding.",
    },
    cover: {
      src: REAL_MEDIA.terrassiEhitus,
      alt: {
        et: "Puidust terrassi ehitus eramule koos tumeda fassaadiga",
        ru: "Строительство деревянной террасы частного дома с тёмным фасадом",
        en: "Wooden terrace construction at a house with a dark facade",
      },
    },
    gallery: [
      {
        src: REAL_MEDIA.terrassFassaad,
        alt: {
          et: "Valmis terrass ja eramu välisviimistlus puidu ning fassaadiplaatidega",
          ru: "Готовая терраса и наружная отделка дома деревом и фасадными плитами",
          en: "Finished terrace and exterior finishing in timber and facade panels",
        },
      },
    ],
    services: ["construction", "facade", "house-renovation"],
  },
  {
    id: "eramu-ehitus-karp",
    name: {
      et: "Eramu ehitus karbini",
      ru: "Строительство частного дома до коробки",
      en: "House construction to shell stage",
    },
    propertyType: { et: "Eramu", ru: "Частный дом", en: "Detached house" },
    works: {
      et: ["Kandvate seinte laotöö", "Katusekonstruktsiooni ehitus", "Aluskatte paigaldus"],
      ru: ["Кладка несущих стен", "Устройство стропильной конструкции", "Монтаж подкровельного покрытия"],
      en: ["Load-bearing masonry", "Roof structure construction", "Underlay installation"],
    },
    description: {
      et: "Eramu ehitus karbini: laotud kandvad seinad, püstitatud katusekonstruktsioon ja paigaldatud aluskate. Objektil on LAVANER OÜ ehitusbänner.",
      ru: "Строительство дома до коробки: выложены несущие стены, установлена стропильная конструкция и подкровельное покрытие. На объекте — баннер LAVANER OÜ.",
      en: "House built to shell stage: load-bearing walls, roof structure and underlay in place. The site carries the LAVANER OÜ banner.",
    },
    cover: {
      src: REAL_MEDIA.eramuEhitusKarp,
      alt: {
        et: "Ehitusjärgus eramu katusekonstruktsiooni ja LAVANER OÜ bänneriga",
        ru: "Строящийся дом со стропильной конструкцией и баннером LAVANER OÜ",
        en: "House under construction with roof structure and LAVANER OÜ banner",
      },
    },
    services: ["construction", "roof"],
  },
  {
    id: "siseviimistlus-saun-pesuruum",
    name: {
      et: "Siseviimistlus, saun ja pesuruum",
      ru: "Внутренняя отделка, сауна и моечная",
      en: "Interior finishing, sauna and washroom",
    },
    works: {
      et: [
        "Seinte ja lae puitvoodri paigaldus",
        "Sauna siseviimistlus ja lavade ehitus",
        "Pesuruumi plaaditööd",
        "Kamina ja tellispinna viimistlus",
      ],
      ru: [
        "Монтаж деревянной обшивки стен и потолка",
        "Отделка сауны и устройство полков",
        "Плиточные работы в моечной",
        "Отделка камина и кирпичной поверхности",
      ],
      en: [
        "Timber cladding of walls and ceiling",
        "Sauna interior and benches",
        "Washroom tiling",
        "Fireplace and brick surface finishing",
      ],
    },
    description: {
      et: "Siseviimistlustööd: valge puitvooder, tellisviimistlusega kamin, plaaditud pesuruum ja valmis saun koos lavade ja valgustusega.",
      ru: "Внутренняя отделка: белая деревянная обшивка, камин с кирпичной отделкой, облицованная плиткой моечная и готовая сауна с полками и подсветкой.",
      en: "Interior finishing: white timber cladding, a brick-faced fireplace, a tiled washroom and a completed sauna with benches and lighting.",
    },
    cover: {
      src: REAL_MEDIA.siseviimistlusPuitvooder,
      alt: {
        et: "Siseviimistlustööd: valge puitvooder ja tellisviimistlusega kamin",
        ru: "Внутренняя отделка: белая деревянная обшивка и камин с кирпичной отделкой",
        en: "Interior finishing: white timber cladding and a brick-faced fireplace",
      },
    },
    video: {
      src: REAL_MEDIA.saunVideo,
      poster: REAL_MEDIA.saunVideoPoster,
      title: {
        et: "Video: valmis saun ja pesuruum",
        ru: "Видео: готовая сауна и моечная",
        en: "Video: finished sauna and washroom",
      },
    },
    services: ["finishing", "house-renovation"],
  },
  {
    id: "mahuti-paigaldus",
    name: {
      et: "Kanalisatsioonimahuti paigaldustööd",
      ru: "Монтаж канализационной ёмкости",
      en: "Sewage tank installation",
    },
    works: {
      et: ["Mahuti transport ja tõstetööd", "Välistrasside paigaldustööd"],
      ru: ["Доставка и подъём ёмкости", "Монтаж наружных трасс"],
      en: ["Tank delivery and lifting", "External pipework installation"],
    },
    description: {
      et: "Kanalisatsioonimahuti tõstetööd objektil kraanaga veoauto abil — osa vee- ja kanalisatsioonitöödest.",
      ru: "Подъём канализационной ёмкости на объекте краном-манипулятором — часть работ по водоснабжению и канализации.",
      en: "Lifting a sewage tank on site with a crane truck — part of water and sewerage works.",
    },
    cover: {
      src: REAL_MEDIA.mahutiPaigaldus,
      alt: {
        et: "Kanalisatsioonimahuti tõstmine kraanaga veoautolt objektile",
        ru: "Подъём канализационной ёмкости краном с грузовика на объект",
        en: "Sewage tank lifted from a crane truck on site",
      },
    },
    services: ["plumbing", "engineering"],
  },
];

export const PROJECTS_UI: Record<
  Lang,
  {
    location: string;
    propertyType: string;
    works: string;
    before: string;
    after: string;
    related: string;
    empty: string;
  }
> = {
  et: {
    location: "Asukoht",
    propertyType: "Objekti tüüp",
    works: "Teostatud tööd",
    before: "Enne",
    after: "Pärast",
    related: "Seotud teenused",
    empty:
      "Konkreetsete objektide fotod ja soovitajate kontaktid saadame päringu korral — avaldame ainult töid, mille oleme tegelikult teinud.",
  },
  ru: {
    location: "Расположение",
    propertyType: "Тип объекта",
    works: "Выполненные работы",
    before: "До",
    after: "После",
    related: "Связанные услуги",
    empty:
      "Фотографии конкретных объектов и контакты для рекомендаций отправляем по запросу — публикуем только реально выполненные работы.",
  },
  en: {
    location: "Location",
    propertyType: "Property type",
    works: "Work performed",
    before: "Before",
    after: "After",
    related: "Related services",
    empty:
      "Photos of specific projects and reference contacts are sent on request — we publish only work we have actually carried out.",
  },
};