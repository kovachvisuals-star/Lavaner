// Контент страниц услуг на трёх языках.
// Тексты уникальны для каждой услуги; общие блоки (этапы, данные для расчёта) — по языку.

import type { Lang } from "./i18n";
import { PHOTOS } from "./photos";
import { REAL_MEDIA } from "./project-media";
import type { ServiceKey } from "./routes-map";
import { EXTRA_SERVICE_CONTENT } from "./services-content-extra";

export type Faq = { q: string; a: string };

export type ServiceContent = {
  h1: string;
  title: string;
  description: string;
  lead: string;
  forWhom: string[];
  solves: string[];
  includes: string[];
  faq: Faq[];
};

export const SERVICE_PHOTO: Record<ServiceKey, string> = {
  construction: REAL_MEDIA.eramuteEhitusTalvel,
  roof: REAL_MEDIA.eramuKatusVoodrilaud,
  facade: REAL_MEDIA.eramuValisviimistlus,
  "bathroom-renovation": REAL_MEDIA.vannitubaValmis,
  electrical: PHOTOS.processElectrical,
  plumbing: REAL_MEDIA.dusialaPlaaditood,
  "apartment-renovation": PHOTOS.b2cApartment,
  "house-renovation": REAL_MEDIA.terrassFassaad,
  "commercial-renovation": PHOTOS.b2bRetail,
  "office-renovation": PHOTOS.b2bOffice,
  reconstruction: PHOTOS.processFacade,
  "design-planning": PHOTOS.design04,
  "interior-design": PHOTOS.design01,
  finishing: REAL_MEDIA.siseviimistlusPuitvooder,
  engineering: REAL_MEDIA.mahutiPaigaldus,
  maintenance: PHOTOS.detailEngineering,
};

export const RELATED: Record<ServiceKey, ServiceKey[]> = {
  construction: ["design-planning", "engineering", "roof", "finishing"],
  roof: ["facade", "reconstruction", "house-renovation", "maintenance"],
  facade: ["roof", "reconstruction", "house-renovation", "construction"],
  "bathroom-renovation": ["plumbing", "finishing", "apartment-renovation", "electrical"],
  electrical: ["engineering", "plumbing", "apartment-renovation", "finishing"],
  plumbing: ["engineering", "electrical", "bathroom-renovation", "apartment-renovation"],
  "apartment-renovation": ["bathroom-renovation", "finishing", "electrical", "plumbing"],
  "house-renovation": ["reconstruction", "roof", "facade", "engineering"],
  "commercial-renovation": ["finishing", "engineering", "maintenance", "office-renovation"],
  "office-renovation": ["commercial-renovation", "interior-design", "engineering"],
  reconstruction: ["roof", "facade", "engineering", "construction"],
  "design-planning": ["interior-design", "construction", "reconstruction"],
  "interior-design": ["design-planning", "apartment-renovation", "finishing"],
  finishing: ["apartment-renovation", "bathroom-renovation", "interior-design"],
  engineering: ["electrical", "plumbing", "construction", "maintenance"],
  maintenance: ["commercial-renovation", "engineering", "roof"],
};

export const STAGES: Record<Lang, string[]> = {
  et: [
    "Päring ja esmane konsultatsioon",
    "Objekti ülevaatus ja mõõdistamine",
    "Lahenduse ja tööde mahu kooskõlastamine",
    "Hinnapakkumine koos etappide ja tähtaegadega",
    "Tööde teostamine ja jooksev kvaliteedikontroll",
    "Objekti üleandmine ja edasine hooldus",
  ],
  ru: [
    "Заявка и первичная консультация",
    "Осмотр объекта и замеры",
    "Согласование решения и объёма работ",
    "Коммерческое предложение с этапами и сроками",
    "Выполнение работ и текущий контроль качества",
    "Сдача объекта и дальнейшее обслуживание",
  ],
  en: [
    "Enquiry and first consultation",
    "Site visit and measurements",
    "Agreeing the solution and scope of work",
    "Written proposal with stages and timeline",
    "Execution with ongoing quality control",
    "Handover and further maintenance",
  ],
};

export const DATA_NEEDED: Record<Lang, string[]> = {
  et: [
    "Objekti tüüp ja asukoht (linn, linnaosa)",
    "Pindala ruutmeetrites ja ruumide arv",
    "Objekti praegune seisukord ja soovitud tulemus",
    "Kas on olemas joonised, plaan või kujundusprojekt",
    "Soovitud alustamise aeg ja eelarve suurusjärk",
  ],
  ru: [
    "Тип объекта и его расположение (город, район)",
    "Площадь в квадратных метрах и количество помещений",
    "Текущее состояние объекта и желаемый результат",
    "Есть ли чертежи, планировка или дизайн-проект",
    "Желаемые сроки начала и ориентир по бюджету",
  ],
  en: [
    "Property type and location (city, district)",
    "Floor area in square metres and number of rooms",
    "Current condition and the result you expect",
    "Whether drawings, a floor plan or a design project exist",
    "Preferred start date and budget range",
  ],
};

type Content = Record<ServiceKey, Record<Lang, ServiceContent>>;

const BASE_SERVICE_CONTENT = {
  construction: {
    et: {
      h1: "Eramute ehitus Tallinnas ja Harjumaal",
      title: "Eramute ehitus Tallinnas ja Harjumaal | LAVANER OÜ",
      description:
        "Eramute ehitus Tallinnas ja Harjumaal: planeerimine, ehitustööd, tööde koordineerimine ja üleandmine. Küsi LAVANER OÜ-lt hinnapakkumist.",
      lead: "Korraldame ja teostame ehitustöid äri- ja eraobjektidel: planeerime etapid, koordineerime spetsialistid ja anname valmis objekti üle kokkulepitud mahus.",
      forWhom: [
        "Ettevõtted, kes rajavad või laiendavad äripinda",
        "Eraomanikud, kes ehitavad maja või juurdeehitust",
        "Kinnisvaraomanikud, kes vajavad ühte vastutavat partnerit",
      ],
      solves: [
        "Tööde järjekorra ja ressursside planeerimine",
        "Ehitus- ja tehnotööde koordineerimine ühel objektil",
        "Kvaliteedi ja projektile vastavuse kontroll igas etapis",
      ],
      includes: [
        "Objekti ülevaatus ja tööde mahu määramine",
        "Ehitusgraafik koos etappide ja tähtaegadega",
        "Konstruktsiooni- ja üldehitustööd",
        "Tehnosüsteemide tööde koordineerimine",
        "Viimistlus ja objekti ettevalmistamine kasutuseks",
        "Üleandmine koos ülevaatusega kliendiga",
      ],
      faq: [
        {
          q: "Kas te teete ka väiksemaid ehitusobjekte?",
          a: "Jah. Hindame iga objekti eraldi ja ütleme ülevaatuse järel ausalt, kas suudame selle soovitud tähtajaks kvaliteetselt teha.",
        },
        {
          q: "Kes vastutab objektil toimuva eest?",
          a: "Igal objektil on meie poolt üks kontaktisik, kes koordineerib etappe ja hoiab klienti kursis.",
        },
        {
          q: "Kuidas kujuneb hind?",
          a: "Hind sõltub mahust, materjalidest ja tähtaegadest. Pakkumise koostame pärast ülevaatust, ilma ligikaudsete lubadusteta.",
        },
      ],
    },
    ru: {
      h1: "Строительные услуги в Эстонии",
      title: "Строительные услуги в Таллинне и Харьюмаа | LAVANER OÜ",
      description:
        "Строительство коммерческих и частных объектов от LAVANER OÜ: планирование, выполнение и сдача объекта одной ответственной командой. Запросите расчёт.",
      lead: "Организуем и выполняем строительные работы на коммерческих и частных объектах: планируем этапы, координируем специалистов и сдаём готовый объект в согласованном объёме.",
      forWhom: [
        "Компании, которые строят или расширяют коммерческий объект",
        "Частные владельцы, строящие дом или пристройку",
        "Собственники недвижимости, которым нужен один ответственный подрядчик",
      ],
      solves: [
        "Планирование последовательности работ и ресурсов",
        "Координация строительных и инженерных работ на одном объекте",
        "Контроль качества и соответствия проекту на каждом этапе",
      ],
      includes: [
        "Осмотр объекта и определение объёма работ",
        "График строительства с этапами и сроками",
        "Конструктивные и общестроительные работы",
        "Координация работ по инженерным системам",
        "Отделка и подготовка объекта к эксплуатации",
        "Сдача объекта с совместной приёмкой",
      ],
      faq: [
        {
          q: "Берётесь ли вы за небольшие объекты?",
          a: "Да. Каждый объект оцениваем отдельно и после осмотра честно говорим, сможем ли выполнить работы качественно в нужный срок.",
        },
        {
          q: "Кто отвечает за работы на объекте?",
          a: "На каждом объекте есть один наш контактный человек, который ведёт этапы и держит заказчика в курсе.",
        },
        {
          q: "Как формируется стоимость?",
          a: "Стоимость зависит от объёма, материалов и сроков. Предложение готовим после осмотра, без ориентировочных обещаний по телефону.",
        },
      ],
    },
    en: {
      h1: "Construction services in Estonia",
      title: "Construction Services in Tallinn and Harjumaa | LAVANER OÜ",
      description:
        "Construction of commercial and private properties by LAVANER OÜ: planning, execution and handover with one responsible team. Request an estimate.",
      lead: "We organise and carry out construction work on commercial and private properties: planning the stages, coordinating specialists and handing over the finished property in the agreed scope.",
      forWhom: [
        "Companies building or expanding a commercial property",
        "Private owners building a house or an extension",
        "Property owners who want a single responsible contractor",
      ],
      solves: [
        "Planning the sequence of works and resources",
        "Coordinating construction and engineering trades on one site",
        "Checking quality and compliance with the design at every stage",
      ],
      includes: [
        "Site review and definition of the scope of work",
        "Construction schedule with stages and deadlines",
        "Structural and general construction works",
        "Coordination of building services works",
        "Finishing and preparing the property for use",
        "Handover with a joint inspection",
      ],
      faq: [
        {
          q: "Do you take on smaller construction projects?",
          a: "Yes. We assess every property separately and tell you honestly after the site visit whether we can deliver it well within your timeline.",
        },
        {
          q: "Who is responsible on site?",
          a: "Every project has one contact person from our team who runs the stages and keeps the client informed.",
        },
        {
          q: "How is the price formed?",
          a: "It depends on scope, materials and schedule. We prepare the proposal after the site visit rather than guessing over the phone.",
        },
      ],
    },
  },

  "apartment-renovation": {
    et: {
      h1: "Korteri remont Tallinnas",
      title: "Korteri remont Tallinnas | LAVANER OÜ",
      description:
        "Korterite täisremont Tallinnas ja Harjumaal: lammutus, tehnosüsteemid, viimistlus ja üleandmine. Üks meeskond kogu töö vältel.",
      lead: "Teeme korteri remonti ja täisrenoveerimist Tallinnas ning Harjumaal: vajalik lammutus, elektri- ja torutööd, vannitoa remont, siseviimistlus ning üleandmine. Koostame tööde järjekorra ja hinnapakkumise konkreetse korteri põhjal.",
      forWhom: [
        "Korteriomanikud, kes soovivad täisremonti ühe partneriga",
        "Uue arenduskorteri omanikud, kes vajavad siseviimistlust",
        "Üürileandjad, kes valmistavad korterit üürituruks ette",
      ],
      solves: [
        "Erinevate tööliikide otsimine ja koordineerimine kliendi asemel",
        "Tööde järjekord nii, et etapid ei jääks üksteist ootama",
        "Materjalide valik koos kliendiga enne tööde algust",
      ],
      includes: [
        "Ettevalmistus ja vajalikud lammutustööd",
        "Elektri-, vee- ja ventilatsioonitööd",
        "Seinte, lagede ja põrandate ettevalmistus",
        "Plaatimine, värvimine ja viimistlus",
        "Sanitaartehnika ja valgustite paigaldus",
        "Lõppkoristus ja üleandmine",
      ],
      faq: [
        {
          q: "Kaua korteri remont kestab?",
          a: "Tähtaeg sõltub pindalast ja tööde mahust. Konkreetse graafiku anname pärast ülevaatust koos hinnapakkumisega.",
        },
        {
          q: "Kas saan korteris elada remondi ajal?",
          a: "Täisremondi ajal tavaliselt mitte. Osalise remondi saab sageli teha etappidena, seda arutame enne algust.",
        },
        {
          q: "Kas ostate materjalid ise?",
          a: "Saame materjalid hankida või paigaldada kliendi ostetud materjalid — lepime kokku pakkumise koostamisel.",
        },
      ],
    },
    ru: {
      h1: "Ремонт квартир в Таллинне",
      title: "Ремонт квартир в Таллинне | LAVANER OÜ",
      description:
        "Комплексный ремонт квартир в Таллинне и Харьюмаа: подготовка, инженерия, отделка и сдача под ключ. Одна команда на всех этапах.",
      lead: "Выполняем комплексный ремонт квартир в Таллинне и Харьюмаа — от подготовки и инженерных работ до чистовой отделки и сдачи убранной, готовой к заселению квартиры.",
      forWhom: [
        "Владельцы квартир, которым нужен ремонт под ключ с одним подрядчиком",
        "Собственники новостроек, которым нужна внутренняя отделка",
        "Арендодатели, готовящие квартиру к сдаче",
      ],
      solves: [
        "Поиск и координация разных бригад вместо заказчика",
        "Последовательность работ без простоев между этапами",
        "Подбор материалов совместно с заказчиком до начала работ",
      ],
      includes: [
        "Подготовка объекта и необходимый демонтаж",
        "Электрика, водоснабжение и вентиляция",
        "Подготовка стен, потолков и полов",
        "Плитка, покраска и чистовая отделка",
        "Установка сантехники и светильников",
        "Финальная уборка и сдача работ",
      ],
      faq: [
        {
          q: "Сколько длится ремонт квартиры?",
          a: "Срок зависит от площади и объёма работ. Конкретный график даём после осмотра вместе с предложением.",
        },
        {
          q: "Можно ли жить в квартире во время ремонта?",
          a: "При комплексном ремонте обычно нет. Частичный ремонт часто можно выполнить этапами — обсуждаем это до старта.",
        },
        {
          q: "Вы закупаете материалы сами?",
          a: "Можем взять закупку на себя или работать с материалами заказчика — фиксируем это при подготовке предложения.",
        },
      ],
    },
    en: {
      h1: "Apartment renovation in Tallinn",
      title: "Apartment Renovation in Tallinn | LAVANER OÜ",
      description:
        "Full apartment renovation in Tallinn and Harjumaa: preparation, building services, finishing and handover. One team through every stage.",
      lead: "We deliver full apartment renovations in Tallinn and Harjumaa — from preparation and building services to final finishes and handover of a clean, move-in ready home.",
      forWhom: [
        "Apartment owners who want a turnkey renovation with one contractor",
        "Owners of new-build flats who need interior fit-out",
        "Landlords preparing an apartment for the rental market",
      ],
      solves: [
        "Finding and coordinating the different trades on your behalf",
        "Sequencing works so stages do not wait on each other",
        "Selecting materials together with you before work starts",
      ],
      includes: [
        "Site preparation and any required strip-out",
        "Electrical, plumbing and ventilation works",
        "Preparation of walls, ceilings and floors",
        "Tiling, painting and final finishes",
        "Installation of sanitary ware and lighting",
        "Final cleaning and handover",
      ],
      faq: [
        {
          q: "How long does an apartment renovation take?",
          a: "It depends on the area and scope. We give a concrete schedule with the proposal after the site visit.",
        },
        {
          q: "Can I live in the apartment during the works?",
          a: "Usually not during a full renovation. Partial works can often be staged — we agree this before starting.",
        },
        {
          q: "Do you purchase the materials?",
          a: "We can source materials or install materials you buy yourself — we fix this when preparing the proposal.",
        },
      ],
    },
  },

  "house-renovation": {
    et: {
      h1: "Maja renoveerimine Tallinnas ja Harjumaal",
      title: "Maja renoveerimine Tallinnas ja Harjumaal | LAVANER OÜ",
      description:
        "Eramute ja ridaelamute renoveerimine Tallinnas ja Harjumaal: sise- ja välistööd, tehnosüsteemid ning viimistlus. Küsi hinnapakkumist.",
      lead: "Renoveerime eramaju, vanemaid maju ja ridaelamuid Tallinnas, Maardus ning mujal Harjumaal. Vaatame üle konstruktsioonid ja tehnosüsteemid, planeerime remondietapid ning viime sise- ja välisviimistluse ühe tööplaani alla.",
      forWhom: [
        "Majaomanikud, kes plaanivad täisremonti",
        "Vanema maja omanikud, kes soovivad seda kaasajastada",
        "Pered, kes vajavad ruumilahenduse muutmist",
      ],
      solves: [
        "Sise- ja välistööde ühendamine ühte graafikusse",
        "Tööde teostamine, kui maja on osaliselt kasutuses",
        "Vanade konstruktsioonide seisukorra arvestamine lahenduses",
      ],
      includes: [
        "Maja ülevaatus ja tööde mahu kokkuleppimine",
        "Ettevalmistus- ja lammutustööd vajalikus mahus",
        "Tehnosüsteemide uuendamine",
        "Sise- ja välisviimistlus",
        "Ruumilahenduse muudatused kokkuleppel",
        "Objekti üleandmine ja hilisem hooldus",
      ],
      faq: [
        {
          q: "Kas teete ka ainult ühe osa majast?",
          a: "Jah, töötame nii kogu majaga kui ka üksikute korruste või ruumidega.",
        },
        {
          q: "Kas arvestate maja vanust?",
          a: "Jah. Enne lahenduse kinnitamist vaatame konstruktsioonide ja süsteemide seisukorra üle.",
        },
        {
          q: "Kas saate teha ka fassaaditöid?",
          a: "Jah, välisviimistlus ja fassaadielemendid võivad kuuluda sama projekti mahtu.",
        },
      ],
    },
    ru: {
      h1: "Ремонт частных домов",
      title: "Ремонт и реновация частных домов | LAVANER OÜ",
      description:
        "Ремонт частных домов, таунхаусов и дач в Эстонии: внутренние и наружные работы, инженерия, отделка. Одна команда и понятные этапы.",
      lead: "Выполняем ремонт и реновацию частных домов, таунхаусов и дач: организуем все этапы одной командой и держим объект под контролем от начала до сдачи.",
      forWhom: [
        "Владельцы домов, планирующие комплексный ремонт",
        "Собственники старых домов, которым нужна модернизация",
        "Семьи, которым нужно изменить планировку",
      ],
      solves: [
        "Объединение внутренних и наружных работ в один график",
        "Выполнение работ, когда дом частично используется",
        "Учёт состояния существующих конструкций в решении",
      ],
      includes: [
        "Осмотр дома и согласование объёма работ",
        "Подготовительные и демонтажные работы в нужном объёме",
        "Обновление инженерных систем",
        "Внутренняя и наружная отделка",
        "Изменение планировки по согласованию",
        "Сдача объекта и дальнейшее обслуживание",
      ],
      faq: [
        {
          q: "Беретесь ли за ремонт только части дома?",
          a: "Да, работаем как с домом целиком, так и с отдельными этажами или помещениями.",
        },
        {
          q: "Учитываете ли вы возраст дома?",
          a: "Да. До утверждения решения проверяем состояние конструкций и систем.",
        },
        {
          q: "Делаете ли вы фасадные работы?",
          a: "Да, наружная отделка и элементы фасада могут входить в тот же проект.",
        },
      ],
    },
    en: {
      h1: "House renovation",
      title: "House Renovation and Refurbishment | LAVANER OÜ",
      description:
        "Renovation of private houses, townhouses and summer homes in Estonia: interior and exterior works, building services, finishes. One team, clear stages.",
      lead: "We renovate private houses, townhouses and summer homes: organising every stage with one team and keeping the site under control from start to handover.",
      forWhom: [
        "Homeowners planning a full renovation",
        "Owners of older houses who want to modernise them",
        "Families who need to change the layout",
      ],
      solves: [
        "Combining interior and exterior works into one schedule",
        "Working while the house is partly in use",
        "Taking the condition of existing structures into account",
      ],
      includes: [
        "House survey and agreement on the scope",
        "Preparation and strip-out works as required",
        "Upgrading of building services",
        "Interior and exterior finishing",
        "Layout changes where agreed",
        "Handover and later maintenance",
      ],
      faq: [
        {
          q: "Do you renovate only part of a house?",
          a: "Yes, we work on whole houses as well as individual floors or rooms.",
        },
        {
          q: "Do you account for the age of the building?",
          a: "Yes. We check the condition of structures and systems before confirming the solution.",
        },
        {
          q: "Can you also do facade works?",
          a: "Yes, exterior finishing and facade elements can be part of the same project.",
        },
      ],
    },
  },

  "commercial-renovation": {
    et: {
      h1: "Äripindade remont",
      title: "Äripindade remont Tallinnas | LAVANER OÜ",
      description:
        "Kaupluste, restoranide, hotellide ja laopindade remont Eestis. Etapiline teostus, mis arvestab teie äri töögraafikut.",
      lead: "Remondime äripindu — kauplusi, restorane, hotelle, teenindus- ja laoruume — arvestades teie töögraafikut ja võimalusel ilma tegevust täielikult peatamata.",
      forWhom: [
        "Kaupluste ja teenindusettevõtete omanikud",
        "Restoranide ja kohvikute pidajad",
        "Kinnisvaraomanikud, kes valmistavad pinda üürnikule ette",
      ],
      solves: [
        "Tööde ajastamine äritegevuse ümber",
        "Selge maht, tähtajad ja vastutus enne algust",
        "Ruumi ettevalmistamine uue üürniku või kontseptsiooni jaoks",
      ],
      includes: [
        "Pinna ülevaatus ja tööde mahu fikseerimine",
        "Etapiline graafik koos objekti kasutusega arvestades",
        "Üldehitus- ja lammutustööd vajalikus mahus",
        "Tehnosüsteemide tööd",
        "Viimistlus ja pinna ettevalmistus avamiseks",
        "Üleandmine ja edasine hooldusvõimalus",
      ],
      faq: [
        {
          q: "Kas saab töid teha õhtuti või nädalavahetusel?",
          a: "Sageli jah. Graafiku lepime kokku nii, et äritegevuse häirimine oleks võimalikult väike.",
        },
        {
          q: "Kas te teete töid ka töötavas kaupluses?",
          a: "Etapiline teostus on paljudel objektidel võimalik — hindame seda ülevaatusel.",
        },
        {
          q: "Kas pakkumine sisaldab kõiki töid?",
          a: "Pakkumine sisaldab kokkulepitud mahtu. Kõik lisatööd kooskõlastame eraldi enne teostust.",
        },
      ],
    },
    ru: {
      h1: "Ремонт коммерческих помещений",
      title: "Ремонт коммерческих помещений в Таллинне | LAVANER OÜ",
      description:
        "Ремонт магазинов, ресторанов, гостиниц и складов в Эстонии. Поэтапная реализация с учётом рабочего графика вашего бизнеса.",
      lead: "Ремонтируем коммерческие помещения — магазины, рестораны, гостиницы, сервисные и складские площади — с учётом вашего графика и, при возможности, без полной остановки работы.",
      forWhom: [
        "Владельцы магазинов и сервисных компаний",
        "Управляющие ресторанами и кафе",
        "Собственники недвижимости, готовящие помещение для арендатора",
      ],
      solves: [
        "Планирование работ вокруг рабочего графика бизнеса",
        "Чёткий объём, сроки и зона ответственности до старта",
        "Подготовка помещения под нового арендатора или концепцию",
      ],
      includes: [
        "Осмотр помещения и фиксация объёма работ",
        "Поэтапный график с учётом эксплуатации объекта",
        "Общестроительные и демонтажные работы в нужном объёме",
        "Работы по инженерным системам",
        "Отделка и подготовка помещения к открытию",
        "Сдача объекта и возможность дальнейшего обслуживания",
      ],
      faq: [
        {
          q: "Можно ли работать вечером или в выходные?",
          a: "Часто да. График согласуем так, чтобы минимально мешать работе бизнеса.",
        },
        {
          q: "Работаете ли вы в действующем магазине?",
          a: "Поэтапная реализация возможна на многих объектах — оцениваем это при осмотре.",
        },
        {
          q: "Предложение включает все работы?",
          a: "Предложение включает согласованный объём. Любые дополнительные работы согласуем отдельно до выполнения.",
        },
      ],
    },
    en: {
      h1: "Commercial property renovation",
      title: "Commercial Property Renovation in Tallinn | LAVANER OÜ",
      description:
        "Renovation of shops, restaurants, hotels and warehouses in Estonia. Staged delivery that works around your business schedule.",
      lead: "We renovate commercial premises — shops, restaurants, hotels, service and storage spaces — around your operating hours and, where possible, without a full shutdown.",
      forWhom: [
        "Owners of shops and service businesses",
        "Restaurant and cafe operators",
        "Property owners preparing a unit for a tenant",
      ],
      solves: [
        "Scheduling works around business operations",
        "Clear scope, timeline and responsibility before starting",
        "Preparing a space for a new tenant or concept",
      ],
      includes: [
        "Site review and a fixed scope of work",
        "Staged schedule that respects ongoing use",
        "General construction and strip-out as required",
        "Building services works",
        "Finishing and preparing the space for opening",
        "Handover with optional ongoing maintenance",
      ],
      faq: [
        {
          q: "Can you work evenings or weekends?",
          a: "Often yes. We agree a schedule that disrupts your business as little as possible.",
        },
        {
          q: "Can you work in an operating shop?",
          a: "Staged delivery is possible on many sites — we assess it during the site visit.",
        },
        {
          q: "Does the proposal cover everything?",
          a: "The proposal covers the agreed scope. Any additional work is approved separately before it is carried out.",
        },
      ],
    },
  },

  "office-renovation": {
    et: {
      h1: "Bürooruumide remont",
      title: "Bürooruumide remont Tallinnas | LAVANER OÜ",
      description:
        "Kontorite remont ja ümberplaneerimine Tallinnas: töökohad, koosolekuruumid, valgustus ja viimistlus. Etapid ja tähtajad kokku lepitud.",
      lead: "Remondime ja planeerime ümber bürooruume: kohandame ruumid meeskonna töökorraldusega ning teeme tööd graafikus, mis sobib ettevõtte igapäevatööga.",
      forWhom: [
        "Ettevõtted, kes kolivad uude kontorisse",
        "Tööandjad, kes uuendavad olemasolevat büroopinda",
        "Büroohoonete omanikud ja haldajad",
      ],
      solves: [
        "Ruumide kohandamine töökohtade arvu ja formaadiga",
        "Tööde tegemine töötava kontori kõrval",
        "Valgustuse, akustika ja viimistluse ühtne lahendus",
      ],
      includes: [
        "Ruumide ülevaatus ja vajaduste kaardistamine",
        "Ümberplaneerimine ja vaheseinad",
        "Elektri-, andmeside- ja ventilatsioonitööd",
        "Põrandad, laed ja seinaviimistlus",
        "Valgustuslahendus",
        "Üleandmine kokkulepitud tähtajaks",
      ],
      faq: [
        {
          q: "Kas kontor peab tööde ajaks sulgema?",
          a: "Mitte alati. Sageli teeme tööd tsoonide kaupa või väljaspool tööaega.",
        },
        {
          q: "Kas aitate ruumilahenduse planeerimisel?",
          a: "Jah, saame ette valmistada planeeringu ja kujunduslahenduse enne tööde algust.",
        },
        {
          q: "Kas paigaldate ka mööbli?",
          a: "Mööbli paigalduse saame lisada tööde mahtu, kui see on pakkumises kokku lepitud.",
        },
      ],
    },
    ru: {
      h1: "Ремонт офисов",
      title: "Ремонт офисов в Таллинне | LAVANER OÜ",
      description:
        "Ремонт и перепланировка офисов в Таллинне: рабочие места, переговорные, освещение и отделка. Согласованные этапы и сроки.",
      lead: "Ремонтируем и перепланируем офисы: адаптируем помещения под формат работы команды и ведём работы в графике, удобном для повседневной деятельности компании.",
      forWhom: [
        "Компании, переезжающие в новый офис",
        "Работодатели, обновляющие существующее помещение",
        "Владельцы и управляющие офисных зданий",
      ],
      solves: [
        "Адаптация помещений под количество и формат рабочих мест",
        "Работы рядом с действующим офисом",
        "Единое решение по освещению, акустике и отделке",
      ],
      includes: [
        "Осмотр помещений и сбор требований",
        "Перепланировка и перегородки",
        "Электрика, слаботочные сети и вентиляция",
        "Полы, потолки и отделка стен",
        "Решение по освещению",
        "Сдача в согласованный срок",
      ],
      faq: [
        {
          q: "Нужно ли закрывать офис на время работ?",
          a: "Не всегда. Часто выполняем работы зонами или вне рабочего времени.",
        },
        {
          q: "Помогаете ли с планировкой?",
          a: "Да, можем подготовить планировочное и дизайн-решение до начала работ.",
        },
        {
          q: "Устанавливаете ли мебель?",
          a: "Монтаж мебели можно включить в объём работ, если это зафиксировано в предложении.",
        },
      ],
    },
    en: {
      h1: "Office renovation",
      title: "Office Renovation in Tallinn | LAVANER OÜ",
      description:
        "Office renovation and reconfiguration in Tallinn: workstations, meeting rooms, lighting and finishes. Agreed stages and deadlines.",
      lead: "We renovate and reconfigure offices: adapting the space to how your team works and running the job on a schedule that fits your day-to-day operations.",
      forWhom: [
        "Companies moving into a new office",
        "Employers upgrading an existing workspace",
        "Owners and managers of office buildings",
      ],
      solves: [
        "Adapting space to the number and format of workstations",
        "Working alongside an operating office",
        "One coherent solution for lighting, acoustics and finishes",
      ],
      includes: [
        "Site review and mapping of requirements",
        "Reconfiguration and partition walls",
        "Electrical, data and ventilation works",
        "Floors, ceilings and wall finishes",
        "Lighting solution",
        "Handover on the agreed date",
      ],
      faq: [
        {
          q: "Does the office have to close during the works?",
          a: "Not always. We often work zone by zone or outside office hours.",
        },
        {
          q: "Can you help with the layout?",
          a: "Yes, we can prepare the layout and design solution before works begin.",
        },
        {
          q: "Do you install furniture?",
          a: "Furniture installation can be included in the scope when agreed in the proposal.",
        },
      ],
    },
  },

  reconstruction: {
    et: {
      h1: "Hoonete rekonstrueerimine",
      title: "Hoonete rekonstrueerimine ja renoveerimine | LAVANER OÜ",
      description:
        "Olemasolevate hoonete ja ruumide rekonstrueerimine Eestis: uus otstarve, uuendatud konstruktsioonid ja tehnosüsteemid.",
      lead: "Rekonstrueerime olemasolevaid hooneid ja ruume: kohandame need uue otstarbe, kaasaegsete nõuete ja uue ruumiloogika järgi.",
      forWhom: [
        "Omanikud, kes muudavad hoone kasutusotstarvet",
        "Investorid, kes valmistavad objekti üürituruks ette",
        "Vanemate hoonete omanikud, kes vajavad kaasajastamist",
      ],
      solves: [
        "Objekti praeguse seisukorra hindamine enne otsuseid",
        "Lahendus uue funktsiooni jaoks olemasolevas hoones",
        "Etapiline teostus, kui hoone jääb osaliselt kasutusse",
      ],
      includes: [
        "Objekti ülevaatus ja võimaluste hindamine",
        "Rekonstrueerimislahenduse ettevalmistus",
        "Lammutus- ja ettevalmistustööd vajalikus mahus",
        "Konstruktsiooni- ja üldehitustööd",
        "Tehnosüsteemide uuendamine",
        "Viimistlus ja objekti üleandmine",
      ],
      faq: [
        {
          q: "Kas hindate hoone seisukorda enne pakkumist?",
          a: "Jah, ülevaatus on rekonstrueerimisel kohustuslik samm enne mahu ja hinna kokkuleppimist.",
        },
        {
          q: "Kas hoone võib tööde ajal kasutuses olla?",
          a: "Sageli saab töid teha etappide või tsoonide kaupa — see selgub ülevaatusel.",
        },
        {
          q: "Kas tegelete ka dokumentatsiooniga?",
          a: "Saame ette valmistada teostuseks vajaliku projektdokumentatsiooni; ametlikud kooskõlastused lepime eraldi kokku.",
        },
      ],
    },
    ru: {
      h1: "Реконструкция зданий",
      title: "Реконструкция зданий и помещений | LAVANER OÜ",
      description:
        "Реконструкция существующих зданий и помещений в Эстонии: новое назначение, обновлённые конструкции и инженерные системы.",
      lead: "Выполняем реконструкцию существующих зданий и помещений: адаптируем их под новое назначение, современные требования и новую логику пространства.",
      forWhom: [
        "Собственники, меняющие назначение здания",
        "Инвесторы, готовящие объект к сдаче в аренду",
        "Владельцы старых зданий, которым нужна модернизация",
      ],
      solves: [
        "Оценка текущего состояния объекта до принятия решений",
        "Решение под новую функцию в существующем здании",
        "Поэтапная реализация при частичной эксплуатации",
      ],
      includes: [
        "Осмотр объекта и оценка возможностей",
        "Подготовка решения по реконструкции",
        "Демонтажные и подготовительные работы в нужном объёме",
        "Конструктивные и общестроительные работы",
        "Обновление инженерных систем",
        "Отделка и сдача объекта",
      ],
      faq: [
        {
          q: "Оцениваете ли состояние здания до предложения?",
          a: "Да, при реконструкции осмотр — обязательный шаг до согласования объёма и стоимости.",
        },
        {
          q: "Может ли здание работать во время работ?",
          a: "Часто работы можно вести этапами или по зонам — это определяется при осмотре.",
        },
        {
          q: "Занимаетесь ли документацией?",
          a: "Можем подготовить проектную документацию для реализации; официальные согласования обсуждаем отдельно.",
        },
      ],
    },
    en: {
      h1: "Building reconstruction",
      title: "Building Reconstruction and Refurbishment | LAVANER OÜ",
      description:
        "Reconstruction of existing buildings and premises in Estonia: new use, upgraded structures and building services.",
      lead: "We reconstruct existing buildings and premises, adapting them to a new purpose, current requirements and a new spatial logic.",
      forWhom: [
        "Owners changing the use of a building",
        "Investors preparing a property for the rental market",
        "Owners of older buildings that need modernising",
      ],
      solves: [
        "Assessing the current condition before decisions are made",
        "Designing for a new function inside an existing building",
        "Staged delivery while the building stays partly in use",
      ],
      includes: [
        "Site survey and feasibility assessment",
        "Preparation of the reconstruction solution",
        "Strip-out and preparation works as required",
        "Structural and general construction works",
        "Upgrading of building services",
        "Finishing and handover",
      ],
      faq: [
        {
          q: "Do you assess the building before quoting?",
          a: "Yes, for reconstruction a site survey is a required step before scope and price are agreed.",
        },
        {
          q: "Can the building stay in use during the works?",
          a: "Often work can run in stages or zones — the site visit determines this.",
        },
        {
          q: "Do you handle documentation?",
          a: "We can prepare the design documentation needed for delivery; official approvals are agreed separately.",
        },
      ],
    },
  },

  "design-planning": {
    et: {
      h1: "Projekteerimine",
      title: "Projekteerimine äri- ja eraobjektidele | LAVANER OÜ",
      description:
        "Äri- ja eraobjektide projekteerimine Eestis: lahendused, joonised ja dokumentatsioon, mille alusel tööd tegelikult teostatakse.",
      lead: "Valmistame ette äri- ja eraobjektide projektid: lahendused ja dokumentatsiooni, mille alusel saab arvutada mahud, tähtajad ja maksumuse ning tööd tegelikult teostada.",
      forWhom: [
        "Kliendid, kes alustavad ehitust või suuremat remonti",
        "Ettevõtted, kes vajavad äripinna lahendust",
        "Omanikud, kes soovivad enne tööd selget plaani",
      ],
      solves: [
        "Ideede muutmine teostatavaks lahenduseks",
        "Mahtude ja maksumuse arvutamiseks vajalik alusdokumentatsioon",
        "Lahenduste kooskõlastamine enne tööde algust",
      ],
      includes: [
        "Objekti ja lähteülesande analüüs",
        "Planeeringu- ja ruumilahendused",
        "Tehniliste lahenduste ettevalmistus",
        "Materjalide ja sõlmede kirjeldused",
        "Dokumentatsioon teostuse jaoks",
        "Projekti üleandmine ehitusmeeskonnale",
      ],
      faq: [
        {
          q: "Kas projekteerite ka siis, kui ehitab teine ettevõte?",
          a: "Jah, projekti saab tellida eraldi teenusena.",
        },
        {
          q: "Kui kaua projekteerimine võtab?",
          a: "See sõltub objekti keerukusest; tähtaja anname pärast lähteülesande läbivaatamist.",
        },
        {
          q: "Kas projekt sisaldab materjalide valikut?",
          a: "Materjalide ja lahenduste kirjeldused kuuluvad tavaliselt projekti mahtu.",
        },
      ],
    },
    ru: {
      h1: "Проектирование",
      title: "Проектирование коммерческих и частных объектов | LAVANER OÜ",
      description:
        "Проектирование объектов в Эстонии: решения, чертежи и документация, по которым работы действительно выполняются.",
      lead: "Готовим проекты коммерческих и частных объектов: решения и документацию, на основе которых считаются объёмы, сроки и стоимость, и по которым ведутся работы.",
      forWhom: [
        "Заказчики, начинающие строительство или крупный ремонт",
        "Компании, которым нужно решение для коммерческого помещения",
        "Собственники, которым нужен понятный план до старта работ",
      ],
      solves: [
        "Перевод идеи в реализуемое решение",
        "Документальная основа для расчёта объёмов и стоимости",
        "Согласование решений до начала работ",
      ],
      includes: [
        "Анализ объекта и исходного задания",
        "Планировочные и пространственные решения",
        "Подготовка технических решений",
        "Описание материалов и узлов",
        "Документация для реализации",
        "Передача проекта строительной команде",
      ],
      faq: [
        {
          q: "Проектируете ли вы, если строит другая компания?",
          a: "Да, проект можно заказать как отдельную услугу.",
        },
        {
          q: "Сколько занимает проектирование?",
          a: "Зависит от сложности объекта; срок называем после изучения исходных данных.",
        },
        {
          q: "Входит ли подбор материалов?",
          a: "Описание материалов и решений обычно входит в объём проекта.",
        },
      ],
    },
    en: {
      h1: "Design and planning",
      title: "Design and Planning for Commercial and Private Properties | LAVANER OÜ",
      description:
        "Design and planning in Estonia: solutions, drawings and documentation that the actual works are built from.",
      lead: "We prepare design and planning packages for commercial and private properties: the solutions and documentation used to calculate scope, timeline and cost — and to build from.",
      forWhom: [
        "Clients starting construction or a major renovation",
        "Companies that need a solution for a commercial space",
        "Owners who want a clear plan before work begins",
      ],
      solves: [
        "Turning an idea into a buildable solution",
        "Providing the basis for calculating scope and cost",
        "Approving decisions before works start",
      ],
      includes: [
        "Analysis of the property and the brief",
        "Layout and spatial solutions",
        "Preparation of technical solutions",
        "Descriptions of materials and details",
        "Documentation for delivery",
        "Handover of the design to the construction team",
      ],
      faq: [
        {
          q: "Can you design if another company builds?",
          a: "Yes, the design can be ordered as a standalone service.",
        },
        {
          q: "How long does design take?",
          a: "It depends on complexity; we confirm the timeline after reviewing the brief.",
        },
        {
          q: "Does it include material selection?",
          a: "Descriptions of materials and solutions are normally part of the design scope.",
        },
      ],
    },
  },

  "interior-design": {
    et: {
      h1: "Sisekujundus",
      title: "Sisekujundus Tallinnas ja Eestis | LAVANER OÜ",
      description:
        "Sisekujundus äri- ja kodupindadele: funktsionaalne planeering, materjalid ja lahendus, mille meie meeskond ka ellu viib.",
      lead: "Töötame välja funktsionaalsed ja tänapäevased sisekujunduslahendused, arvestades objekti otstarvet, kliendi soove ja eelarvet — ning viime need ka ellu.",
      forWhom: [
        "Kodu- ja korteriomanikud",
        "Äripindade omanikud ja rentnikud",
        "Kliendid, kes soovivad kujundust ja teostust ühest kohast",
      ],
      solves: [
        "Ruumi funktsionaalne planeerimine tegeliku kasutuse järgi",
        "Materjalide ja viimistluse valik eelarve piires",
        "Kujundusest teostusse ilma detailide kaotamiseta",
      ],
      includes: [
        "Objekti ja kasutusstsenaariumide analüüs",
        "Planeeringulahendus",
        "Visuaalne lahendus ja materjalivalik",
        "Valgustuse ja viimistluse kontseptsioon",
        "Kujunduse üleandmine teostusmeeskonnale",
        "Autorijärelevalve tööde ajal kokkuleppel",
      ],
      faq: [
        {
          q: "Kas kujundus on eraldi teenus?",
          a: "Jah, sisekujundust saab tellida eraldi või koos remondiga.",
        },
        {
          q: "Kas arvestate eelarvet?",
          a: "Jah, eelarve suurusjärk lepitakse kokku enne lahenduse väljatöötamist.",
        },
        {
          q: "Kas teostate kujunduse ise?",
          a: "Jah, sama ettevõtte meeskond saab kujunduse ka ellu viia.",
        },
      ],
    },
    ru: {
      h1: "Дизайн интерьера",
      title: "Дизайн интерьера в Таллинне и Эстонии | LAVANER OÜ",
      description:
        "Дизайн интерьера для коммерческих и частных объектов: функциональная планировка, материалы и решение, которое мы же и реализуем.",
      lead: "Разрабатываем функциональные и современные решения интерьера с учётом назначения объекта, пожеланий клиента и бюджета — и реализуем их своей командой.",
      forWhom: [
        "Владельцы квартир и домов",
        "Собственники и арендаторы коммерческих помещений",
        "Клиенты, которым нужны дизайн и реализация в одном месте",
      ],
      solves: [
        "Функциональная планировка под реальные сценарии использования",
        "Подбор материалов и отделки в рамках бюджета",
        "Переход от дизайна к работам без потери деталей",
      ],
      includes: [
        "Анализ объекта и сценариев использования",
        "Планировочное решение",
        "Визуальное решение и подбор материалов",
        "Концепция освещения и отделки",
        "Передача дизайна команде реализации",
        "Авторский надзор по согласованию",
      ],
      faq: [
        {
          q: "Дизайн — отдельная услуга?",
          a: "Да, дизайн интерьера можно заказать отдельно или вместе с ремонтом.",
        },
        {
          q: "Учитываете ли бюджет?",
          a: "Да, ориентир по бюджету фиксируем до разработки решения.",
        },
        {
          q: "Реализуете ли вы дизайн сами?",
          a: "Да, реализацию выполняет команда той же компании.",
        },
      ],
    },
    en: {
      h1: "Interior design",
      title: "Interior Design in Tallinn and Estonia | LAVANER OÜ",
      description:
        "Interior design for commercial and private properties: functional layouts, materials and a solution our own team also delivers.",
      lead: "We develop functional, contemporary interior solutions based on how the property is used, your preferences and the agreed budget — and we can build them too.",
      forWhom: [
        "Apartment and house owners",
        "Owners and tenants of commercial premises",
        "Clients who want design and delivery in one place",
      ],
      solves: [
        "Planning the space around real usage scenarios",
        "Selecting materials and finishes within budget",
        "Moving from design to delivery without losing detail",
      ],
      includes: [
        "Analysis of the property and usage scenarios",
        "Layout solution",
        "Visual concept and material selection",
        "Lighting and finishing concept",
        "Handover of the design to the delivery team",
        "Design supervision during works when agreed",
      ],
      faq: [
        {
          q: "Is design a standalone service?",
          a: "Yes, interior design can be ordered separately or together with the renovation.",
        },
        {
          q: "Do you work to a budget?",
          a: "Yes, we agree the budget range before developing the solution.",
        },
        {
          q: "Do you build the design yourselves?",
          a: "Yes, the same company's team can carry out the works.",
        },
      ],
    },
  },

  finishing: {
    et: {
      h1: "Siseviimistlustööd Tallinnas ja Harjumaal",
      title: "Siseviimistlustööd Tallinnas ja Harjumaal | LAVANER OÜ",
      description:
        "Siseviimistlustööd Tallinnas ja Harjumaal: seinte ja lagede viimistlus, värvimine, põrandad ning plaatimistööd. Küsi LAVANER OÜ-lt hinnapakkumist.",
      lead: "Teeme siseviimistlustöid Tallinnas, Maardus ja mujal Harjumaal korterites, eramutes ning äripindadel. Tööde hulka kuuluvad maalritööd, pahteldamine, seinte ja lagede värvimine, plaatimistööd ning põrandate paigaldus. Kirjelda objekti asukohta ja tööde mahtu – koostame hinnapakkumise pärast vajaduse korral tehtavat ülevaatust.",
      forWhom: [
        "Kliendid, kellel on ehitus- või remonditööd lõppjärgus",
        "Korteri- ja majaomanikud",
        "Äripinnad, mis vajavad värsket viimistlust",
      ],
      solves: [
        "Ühtlane kvaliteet kõigil pindadel",
        "Erinevate viimistlustööde koordineerimine",
        "Objekti ettevalmistus kasutuselevõtuks",
      ],
      includes: [
        "Seinte ja lagede ettevalmistus, krohvimine ning pahteldamine",
        "Maalritööd: kruntimine, värvimine ja dekoratiivkatted",
        "Plaatimistööd, põrandakatete paigaldus ja viimistlus",
        "Lae- ja seinalahendused",
        "Välisviimistluse tööd",
        "Kvaliteedi ülevaatus lõikude kaupa",
      ],
      faq: [
        {
          q: "Kas siseviimistlustöid saab tellida eraldi korteri täisremondist?",
          a: "Jah. Tallinnas ja Harjumaal saab tellida eraldi maalri-, pahteldus-, plaatimis- või põrandatöid. Tööde ulatuse ja hinna täpsustame pärast objekti hindamist.",
        },
        {
          q: "Kas parandate teiste tehtud vigu?",
          a: "Hindame olukorra üle kohapeal ja ütleme, mida on mõistlik parandada ja mida uuesti teha.",
        },
        {
          q: "Kas koristate objekti pärast töid?",
          a: "Jah, objekti korrastamine kuulub tööde lõpetamise juurde.",
        },
      ],
    },
    ru: {
      h1: "Отделочные работы",
      title: "Отделочные работы в Таллинне | LAVANER OÜ",
      description:
        "Внутренняя и наружная отделка в Эстонии: стены, потолки, полы, плитка, покраска и декоративные покрытия. Контроль качества по участкам.",
      lead: "Выполняем внутреннюю и наружную отделку с вниманием к деталям и результату: стены, потолки, полы, плитка, покраска и декоративные покрытия.",
      forWhom: [
        "Заказчики на финальном этапе строительства или ремонта",
        "Владельцы квартир и домов",
        "Коммерческие помещения, которым нужна свежая отделка",
      ],
      solves: [
        "Единое качество на всех поверхностях",
        "Координация разных видов отделочных работ",
        "Подготовка объекта к вводу в эксплуатацию",
      ],
      includes: [
        "Подготовка и шпаклёвка поверхностей",
        "Покраска и декоративные покрытия",
        "Плитка и напольные покрытия",
        "Решения по потолкам и стенам",
        "Наружные отделочные работы",
        "Проверка качества по участкам",
      ],
      faq: [
        {
          q: "Делаете ли только отделку?",
          a: "Да, отделочные работы можно заказать отдельно от комплексного ремонта.",
        },
        {
          q: "Исправляете ли работу других подрядчиков?",
          a: "Оцениваем ситуацию на месте и говорим, что разумно исправить, а что переделать.",
        },
        {
          q: "Убираете ли объект после работ?",
          a: "Да, приведение объекта в порядок входит в завершение работ.",
        },
      ],
    },
    en: {
      h1: "Finishing works",
      title: "Finishing Works in Tallinn | LAVANER OÜ",
      description:
        "Interior and exterior finishing in Estonia: walls, ceilings, floors, tiling, painting and decorative coatings. Quality checked section by section.",
      lead: "We carry out interior and exterior finishing with attention to detail and to the final result: walls, ceilings, floors, tiling, painting and decorative coatings.",
      forWhom: [
        "Clients at the final stage of construction or renovation",
        "Apartment and house owners",
        "Commercial spaces that need a fresh finish",
      ],
      solves: [
        "Consistent quality across all surfaces",
        "Coordination of different finishing trades",
        "Preparing the property for use",
      ],
      includes: [
        "Surface preparation and filling",
        "Painting and decorative coatings",
        "Tiling and floor coverings",
        "Ceiling and wall solutions",
        "Exterior finishing works",
        "Quality inspection section by section",
      ],
      faq: [
        {
          q: "Do you do finishing only?",
          a: "Yes, finishing works can be ordered separately from a full renovation.",
        },
        {
          q: "Do you fix other contractors' work?",
          a: "We assess the situation on site and say what is worth repairing and what should be redone.",
        },
        {
          q: "Do you clean up afterwards?",
          a: "Yes, tidying the site is part of completing the works.",
        },
      ],
    },
  },

  engineering: {
    et: {
      h1: "Tehnosüsteemide tööd",
      title: "Tehnosüsteemid: elekter, vesi, ventilatsioon | LAVANER OÜ",
      description:
        "Tehnosüsteemide tööd ehituse ja remondi koosseisus: elekter, veevarustus, kanalisatsioon, ventilatsioon ja küte.",
      lead: "Korraldame ehituse või täisremondi koosseisus vajalikud tehnosüsteemide tööd: elekter, veevarustus, kanalisatsioon, ventilatsioon ja küte — kooskõlas üldise graafikuga.",
      forWhom: [
        "Objektid, kus süsteemid vajavad uuendamist",
        "Uusehitised ja täisremondid",
        "Äripinnad, mille tehnolahendus muutub",
      ],
      solves: [
        "Tehnotööde sidumine üldehitustööde graafikuga",
        "Erialaspetsialistide koordineerimine",
        "Süsteemide lahendus vastavalt ruumi kasutusele",
      ],
      includes: [
        "Olemasolevate süsteemide ülevaatus",
        "Elektritööd ja valgustuse ettevalmistus",
        "Vee- ja kanalisatsioonitööd",
        "Ventilatsiooni ja kütte tööd",
        "Töö koordineerimine ehitusetappidega",
        "Kontroll enne viimistluse algust",
      ],
      faq: [
        {
          q: "Kas teete tehnotöid eraldi tellimusena?",
          a: "Peamiselt teeme neid ehituse või remondi koosseisus, kuid eraldi mahtu saab arutada.",
        },
        {
          q: "Kes töid teostab?",
          a: "Töid teevad vastava ala spetsialistid, keda objektil koordineerib meie projektijuht.",
        },
        {
          q: "Kas süsteeme kontrollitakse enne viimistlust?",
          a: "Jah, süsteemid kontrollitakse üle enne pindade sulgemist.",
        },
      ],
    },
    ru: {
      h1: "Инженерные работы",
      title: "Инженерные работы: электрика, вода, вентиляция | LAVANER OÜ",
      description:
        "Инженерные работы в составе строительства и ремонта: электрика, водоснабжение, канализация, вентиляция и отопление.",
      lead: "Организуем инженерные работы в составе строительства или комплексного ремонта: электрика, водоснабжение, канализация, вентиляция и отопление — в общем графике объекта.",
      forWhom: [
        "Объекты, где системы требуют обновления",
        "Новое строительство и комплексные ремонты",
        "Коммерческие помещения с изменением инженерного решения",
      ],
      solves: [
        "Согласование инженерных работ с общестроительным графиком",
        "Координация профильных специалистов",
        "Решение по системам под реальное использование помещений",
      ],
      includes: [
        "Осмотр существующих систем",
        "Электромонтажные работы и подготовка освещения",
        "Водоснабжение и канализация",
        "Вентиляция и отопление",
        "Координация с этапами строительства",
        "Проверка систем до начала отделки",
      ],
      faq: [
        {
          q: "Выполняете ли инженерные работы отдельным заказом?",
          a: "В основном они идут в составе строительства или ремонта, но отдельный объём можно обсудить.",
        },
        {
          q: "Кто выполняет работы?",
          a: "Работы выполняют профильные специалисты, координирует их наш руководитель объекта.",
        },
        {
          q: "Проверяются ли системы до отделки?",
          a: "Да, системы проверяются до закрытия поверхностей.",
        },
      ],
    },
    en: {
      h1: "Building services works",
      title: "Building Services: Electrics, Plumbing, Ventilation | LAVANER OÜ",
      description:
        "Building services within construction and renovation projects: electrics, water supply, drainage, ventilation and heating.",
      lead: "We organise the building services required within construction or a full renovation: electrics, water supply, drainage, ventilation and heating — inside the overall site schedule.",
      forWhom: [
        "Properties where systems need upgrading",
        "New builds and full renovations",
        "Commercial spaces changing their technical setup",
      ],
      solves: [
        "Aligning services works with the general construction schedule",
        "Coordinating specialist trades",
        "Designing systems around how the space is actually used",
      ],
      includes: [
        "Survey of the existing systems",
        "Electrical works and lighting preparation",
        "Water supply and drainage",
        "Ventilation and heating",
        "Coordination with construction stages",
        "Testing before finishing starts",
      ],
      faq: [
        {
          q: "Can services be ordered as a standalone job?",
          a: "They are mostly delivered within construction or renovation, but a separate scope can be discussed.",
        },
        {
          q: "Who carries out the works?",
          a: "Specialist tradespeople, coordinated on site by our project manager.",
        },
        {
          q: "Are systems tested before finishing?",
          a: "Yes, systems are checked before surfaces are closed up.",
        },
      ],
    },
  },

  maintenance: {
    et: {
      h1: "Kinnisvara hooldus",
      title: "Kinnisvara hooldus ja remont | LAVANER OÜ",
      description:
        "Äri- ja erakinnisvara tehniline ning remondihooldus Eestis: plaaniline hooldus ja rikete kiire kõrvaldamine.",
      lead: "Tagame äri- ja erakinnisvara tehnilise ning remondihoolduse ka pärast projekti lõppu: plaaniline hooldus, jooksvad tööd ja rikete kõrvaldamine.",
      forWhom: [
        "Äripindade omanikud ja haldajad",
        "Üürileandjad",
        "Eraomanikud, kes soovivad pikaajalist partnerit",
      ],
      solves: [
        "Objekti korrashoid pärast üleandmist",
        "Kiire reageerimine rikete korral",
        "Väiksemate tööde tegemine ilma uut partnerit otsimata",
      ],
      includes: [
        "Ruumide ja süsteemide plaaniline hooldus",
        "Jooksvad remonditööd",
        "Rikete kõrvaldamine objektil",
        "Viimistluse ja pindade korrashoid",
        "Hooldusgraafiku kokkuleppimine",
        "Pikaajaline objekti tugi",
      ],
      faq: [
        {
          q: "Kas hooldate objekte, mida te ei ehitanud?",
          a: "Jah. Enne hoolduse alustamist teeme objekti ülevaatuse.",
        },
        {
          q: "Kas hooldus on püsileping?",
          a: "Töötame nii graafikupõhiselt kui ka üksiktellimuste alusel.",
        },
        {
          q: "Kui kiiresti reageerite?",
          a: "Reageerimisaja lepime kokku eraldi, sõltuvalt objekti tüübist ja tööde mahust.",
        },
      ],
    },
    ru: {
      h1: "Обслуживание объектов",
      title: "Обслуживание и ремонт недвижимости | LAVANER OÜ",
      description:
        "Техническое и ремонтное обслуживание коммерческой и частной недвижимости в Эстонии: плановые работы и оперативное устранение неисправностей.",
      lead: "Обеспечиваем техническое и ремонтное обслуживание коммерческой и частной недвижимости после завершения проекта: плановые работы, текущий ремонт и устранение неисправностей.",
      forWhom: [
        "Владельцы и управляющие коммерческих помещений",
        "Арендодатели",
        "Частные собственники, которым нужен долгосрочный подрядчик",
      ],
      solves: [
        "Поддержание объекта в порядке после сдачи",
        "Быстрая реакция при неисправностях",
        "Мелкие работы без поиска нового подрядчика",
      ],
      includes: [
        "Плановое обслуживание помещений и систем",
        "Текущие ремонтные работы",
        "Устранение неисправностей на объекте",
        "Поддержание отделки и поверхностей",
        "Согласование графика обслуживания",
        "Долгосрочное сопровождение объекта",
      ],
      faq: [
        {
          q: "Обслуживаете ли объекты, которые строили не вы?",
          a: "Да. До начала обслуживания проводим осмотр объекта.",
        },
        {
          q: "Обслуживание — это постоянный договор?",
          a: "Работаем как по графику, так и по отдельным заявкам.",
        },
        {
          q: "Как быстро вы реагируете?",
          a: "Время реакции согласуем отдельно, в зависимости от типа объекта и объёма работ.",
        },
      ],
    },
    en: {
      h1: "Property maintenance",
      title: "Property Maintenance and Repairs | LAVANER OÜ",
      description:
        "Technical and repair maintenance for commercial and private property in Estonia: planned works and fast fault resolution.",
      lead: "We provide technical and repair maintenance for commercial and private property after the project is finished: planned works, ongoing repairs and fault resolution.",
      forWhom: [
        "Owners and managers of commercial premises",
        "Landlords",
        "Private owners who want a long-term partner",
      ],
      solves: [
        "Keeping the property in good condition after handover",
        "Fast response when something fails",
        "Small jobs without looking for a new contractor",
      ],
      includes: [
        "Planned maintenance of spaces and systems",
        "Ongoing repair works",
        "Fault resolution on site",
        "Upkeep of finishes and surfaces",
        "Agreed maintenance schedule",
        "Long-term support for the property",
      ],
      faq: [
        {
          q: "Do you maintain properties you did not build?",
          a: "Yes. We carry out a site survey before maintenance starts.",
        },
        {
          q: "Is maintenance a fixed contract?",
          a: "We work both on a schedule and on individual requests.",
        },
        {
          q: "How fast do you respond?",
          a: "Response time is agreed separately, depending on the property type and scope.",
        },
      ],
    },
  },
} as const;

export const SERVICE_CONTENT = {
  ...BASE_SERVICE_CONTENT,
  ...EXTRA_SERVICE_CONTENT,
} as unknown as Content;