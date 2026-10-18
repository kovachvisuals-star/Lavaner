// Продающий контент главной страницы: позиционирование → категории услуг → доверие → работы → заявка.

import type { Lang } from "./i18n";
import type { ServiceKey } from "./routes-map";

export type SalesContent = {
  heroTitle: string;
  heroText: string;
  heroPoints: string[];
  trustHeading: string;
  trust: { title: string; text: string }[];
  servicesHeading: string;
  servicesText: string;
  services: { title: string; text: string; key: ServiceKey }[];
  designHeading: string;
  designTitle: string;
  designText: string;
  designItems: string[];
  designFlow: string[];
  designCta: string;
  b2bHeading: string;
  b2bText: string;
  b2bPoints: string[];
  b2bCta: string;
  whyHeading: string;
  why: { title: string; text: string }[];
  processHeading: string;
  processText: string;
  process: string[];
  worksHeading: string;
  worksText: string;
  works: { caption: string }[];
  companyHeading: string;
  companyNote: string;
  mapLabel: string;
  ctaServices: string;
};

export const SALES: Record<Lang, SalesContent> = {
  et: {
    heroTitle: "Ehitus, renoveerimine ja kinnisvara hooldus Tallinnas ning Harjumaal",
    heroText:
      "Ehitame ja renoveerime eramuid, teostame katuse-, fassaadi-, siseviimistlus- ja tehnosüsteemide töid ning teenindame ärikinnisvara.",
    heroPoints: [
      "Üle 12 aasta kogemust",
      "Suured objektid ja pikaajaline hooldus",
      "Selge hinnapakkumine ja tähtajad",
      "Üks partner projekteerimisest ehituseni",
    ],
    trustHeading: "Mida sa meilt saad",
    trust: [
      { title: "Üle 12 aasta kogemust", text: "Ehitus- ja renoveerimistööd alates 2014. aastast." },
      { title: "Terviklahendus", text: "Konstruktsioonidest tehnosüsteemide ja viimistluseni." },
      { title: "Selge hinnapakkumine", text: "Kirjalik pakkumine mahu, materjalide ja hinnaga." },
      { title: "Kokkulepitud tähtajad", text: "Etapid ja kuupäevad lepime kokku enne alustamist." },
      { title: "Objektijuhtimine", text: "Üks projektijuht koordineerib kõik tööd ja alltöövõtjad." },
      {
        title: "Tallinn ja Harjumaa",
        text: "Tööd Tallinnas, Harjumaal ja kokkuleppel mujal Eestis.",
      },
    ],
    servicesHeading: "Teenused",
    servicesText: "Võtame vastutuse kogu objekti eest – ehitusest kuni pikaajalise hoolduseni.",
    services: [
      {
        title: "Eramute ehitus",
        text: "Eramajade ehitus Tallinnas ja Harjumaal – vundamendist ja karbist kuni valmis objektini.",
        key: "construction",
      },
      {
        title: "Maja renoveerimine",
        text: "Vanema eramaja renoveerimine: konstruktsioonid, soojustus, tehnosüsteemid ja viimistlus.",
        key: "house-renovation",
      },
      {
        title: "Korteri remont",
        text: "Korteri täisremont Tallinnas: plaanimuudatused, torustik, elekter ja viimistlus.",
        key: "apartment-renovation",
      },
      {
        title: "Vannitoa remont",
        text: "Vannitoa remont võtmed kätte: hüdroisolatsioon, plaatimine, torustik ja sanitaartehnika.",
        key: "bathroom-renovation",
      },
      {
        title: "Siseviimistlus",
        text: "Seinad, laed, põrandad ja detailid – viimistlustööd korterites, majades ja äripindadel.",
        key: "finishing",
      },
      {
        title: "Katusetööd",
        text: "Katuse ehitus, vahetus ja remont koos soojustuse ning vihmaveesüsteemiga.",
        key: "roof",
      },
      {
        title: "Fassaaditööd",
        text: "Fassaadi soojustamine, krohvimine, vooderdamine ja välisviimistluse remont.",
        key: "facade",
      },
      {
        title: "Elektritööd",
        text: "Juhtmestik, elektrikilbid, valgustus ja ühendused korterites, majades ja äripindadel.",
        key: "electrical",
      },
      {
        title: "Sanitaartehnilised tööd",
        text: "Vee- ja kanalisatsioonitorustik, sanitaartehnika paigaldus ning küttesüsteemi tööd.",
        key: "plumbing",
      },
      {
        title: "Äripindade remont",
        text: "Büroode, kaupluste, restoranide ja ladude ehitus, rekonstrueerimine ja remont.",
        key: "commercial-renovation",
      },
      {
        title: "Projekteerimine ja disain",
        text: "Arhitektuurne projekteerimine, ehitusprojektid, sisekujundus ja tehnosüsteemide projekteerimine.",
        key: "design-planning",
      },
      {
        title: "Kinnisvara hooldus",
        text: "Ärikinnisvara pidev tehniline hooldus, remonditööd ja rikete kõrvaldamine.",
        key: "maintenance",
      },
    ],
    designHeading: "Projekteerimine ja disain",
    designTitle: "Üks partner ideest valmis objektini",
    designText:
      "Aitame korraldada projekteerimise, disaini ja ehitustööd ühtse protsessina. Teeme koostööd arhitektide, disainerite ja inseneridega, et klient saaks kogu projekti lahendada ühe usaldusväärse partneri kaudu.",
    designItems: [
      "Arhitektuurne projekteerimine",
      "Ehitusprojektid",
      "Rekonstrueerimisprojektid",
      "Sisekujundus",
      "Tehnosüsteemide projekteerimine",
      "Konsultatsioon enne ehitust",
      "Projekti koordineerimine",
      "Koostöö arhitektide, disainerite ja inseneridega",
    ],
    designFlow: ["Idee", "Projekt", "Eelarve", "Ehitus", "Viimistlus", "Valmis objekt"],
    designCta: "Räägi meile oma projektist",
    b2bHeading: "Usaldusväärne partner ärikinnisvara hoolduseks",
    b2bText:
      "Pakume ettevõtetele regulaarseid hooldus- ja remonditöid, et probleemid saaksid lahendatud kiiresti ja ühe usaldusväärse partneri kaudu.",
    b2bPoints: [
      "Hoolduslepingud ja kokkulepitud reageerimisaeg",
      "Remonditööd ja rikete kõrvaldamine",
      "Üks kontaktisik kõikide objektide jaoks",
    ],
    b2bCta: "Küsi koostööpakkumist",
    whyHeading: "Miks valida Lavaner?",
    why: [
      { title: "Üks vastutaja", text: "Projektijuht vastutab mahu, tähtaja ja kvaliteedi eest." },
      { title: "Hind ei muutu tagantjärele", text: "Lisatööd kooskõlastame alati enne teostamist." },
      { title: "Töö käib graafiku järgi", text: "Näed etappide seisu ja fotosid tööde käigust." },
      { title: "Kõik tööd ühest kohast", text: "Projekt, ehitus, tehnosüsteemid ja viimistlus." },
      { title: "Puhas objekt", text: "Pärast tööde lõpetamist jätame objekti korrastatuks ja viime ehitusjäätmed ära." },
      { title: "Üleandmine koos ülevaatusega", text: "Käime töö üle ja parandame märkused ära." },
    ],
    processHeading: "Kuidas koostöö käib",
    processText: "Kuus lihtsat sammu esimesest kõnest valmis objektini.",
    process: [
      "Võta ühendust",
      "Hindame töö mahtu",
      "Saad selge pakkumise",
      "Lepime kokku tähtaja",
      "Teostame töö",
      "Anname valmis töö üle",
    ],
    worksHeading: "Tehtud tööde näited",
    worksText: "Näited objektidest, mida iga päev teeme.",
    works: [
      { caption: "Eramaja ehitus" },
      { caption: "Fassaadi- ja soojustustööd" },
      { caption: "Siseviimistlus" },
      { caption: "Vee- ja kanalisatsioonitööd" },
      { caption: "Vannitoa renoveerimine" },
      { caption: "Terrassi ehitus" },
    ],
    companyHeading: "Ettevõtte andmed",
    companyNote: "Ametlikult registreeritud Eesti ehitusettevõte.",
    mapLabel: "Vaata Google'i kaardil",
    ctaServices: "Vaata teenuseid",
  },
  ru: {
    heroTitle: "Строительство, реновация и обслуживание недвижимости в Таллинне и Харьюмаа",
    heroText:
      "Строим и реновируем частные дома, выполняем кровельные, фасадные, отделочные работы и инженерные системы, обслуживаем коммерческую недвижимость.",
    heroPoints: [
      "Более 12 лет опыта",
      "Крупные объекты и долгосрочное обслуживание",
      "Понятное предложение и сроки",
      "Один партнёр от проектирования до стройки",
    ],
    trustHeading: "Что вы получаете",
    trust: [
      { title: "Более 12 лет опыта", text: "Строительные и реновационные работы с 2014 года." },
      { title: "Комплексное решение", text: "От конструкций до инженерии и финишной отделки." },
      { title: "Понятное предложение", text: "Письменный расчёт с объёмом, материалами и ценой." },
      { title: "Согласованные сроки", text: "Этапы и даты фиксируем до начала работ." },
      { title: "Управление объектом", text: "Один руководитель координирует работы и подрядчиков." },
      { title: "Таллинн и Харьюмаа", text: "Работаем в Таллинне, Харьюмаа и по договорённости по Эстонии." },
    ],
    servicesHeading: "Услуги",
    servicesText: "Берём ответственность за объект целиком — от строительства до постоянного обслуживания.",
    services: [
      {
        title: "Строительство частных домов",
        text: "Строительство домов в Таллинне и Харьюмаа — от фундамента и коробки до готового объекта.",
        key: "construction",
      },
      {
        title: "Реновация домов",
        text: "Реновация старого дома: конструкции, утепление, инженерные системы и отделка.",
        key: "house-renovation",
      },
      {
        title: "Ремонт квартир",
        text: "Комплексный ремонт квартиры в Таллинне: перепланировка, трубы, электрика и отделка.",
        key: "apartment-renovation",
      },
      {
        title: "Ремонт ванной комнаты",
        text: "Ремонт ванной под ключ: гидроизоляция, плитка, трубы и сантехника.",
        key: "bathroom-renovation",
      },
      {
        title: "Отделочные работы",
        text: "Стены, потолки, полы и детали — отделка квартир, домов и коммерческих помещений.",
        key: "finishing",
      },
      {
        title: "Кровельные работы",
        text: "Строительство, замена и ремонт крыши с утеплением и водосточной системой.",
        key: "roof",
      },
      {
        title: "Фасадные работы",
        text: "Утепление фасада, штукатурка, обшивка и ремонт наружной отделки.",
        key: "facade",
      },
      {
        title: "Электромонтажные работы",
        text: "Проводка, щиты, освещение и подключения в квартирах, домах и на коммерческих объектах.",
        key: "electrical",
      },
      {
        title: "Сантехнические работы",
        text: "Водопровод и канализация, установка сантехники и работы по отоплению.",
        key: "plumbing",
      },
      {
        title: "Ремонт коммерческих помещений",
        text: "Строительство, реконструкция и ремонт офисов, магазинов, ресторанов и складов.",
        key: "commercial-renovation",
      },
      {
        title: "Проектирование и дизайн",
        text: "Архитектурное проектирование, строительные проекты, дизайн интерьера и инженерные разделы.",
        key: "design-planning",
      },
      {
        title: "Обслуживание недвижимости",
        text: "Постоянное техническое обслуживание, ремонтные работы и устранение неисправностей.",
        key: "maintenance",
      },
    ],
    designHeading: "Проектирование и дизайн",
    designTitle: "Один партнёр от идеи до готового объекта",
    designText:
      "Помогаем организовать проектирование, дизайн и строительные работы как единый процесс. Работаем с архитекторами, дизайнерами и инженерами, чтобы весь проект решался через одного надёжного партнёра.",
    designItems: [
      "Архитектурное проектирование",
      "Строительные проекты",
      "Проекты реконструкции",
      "Дизайн интерьера",
      "Проектирование инженерных систем",
      "Консультация до начала строительства",
      "Координация проекта",
      "Работа с архитекторами, дизайнерами и инженерами",
    ],
    designFlow: ["Идея", "Проект", "Бюджет", "Строительство", "Отделка", "Готовый объект"],
    designCta: "Расскажите нам о своём проекте",
    b2bHeading: "Надёжный партнёр по обслуживанию коммерческой недвижимости",
    b2bText:
      "Предлагаем компаниям регулярные работы по обслуживанию и ремонту, чтобы проблемы решались быстро и через одного надёжного партнёра.",
    b2bPoints: [
      "Договоры обслуживания и согласованное время реакции",
      "Ремонтные работы и устранение неисправностей",
      "Один контактный человек по всем объектам",
    ],
    b2bCta: "Запросить предложение о сотрудничестве",
    whyHeading: "Почему выбирают Lavaner",
    why: [
      { title: "Один ответственный", text: "Руководитель проекта отвечает за объём, срок и качество." },
      { title: "Цена не растёт задним числом", text: "Дополнительные работы согласуем заранее." },
      { title: "Работа по графику", text: "Видите статус этапов и фотоотчёт по ходу работ." },
      { title: "Все работы в одном месте", text: "Проект, строительство, инженерия и отделка." },
      { title: "Чистый объект", text: "После завершения работ оставляем объект убранным и вывозим строительный мусор." },
      { title: "Сдача с осмотром", text: "Проходим объект вместе и устраняем замечания." },
    ],
    processHeading: "Как проходит сотрудничество",
    processText: "Шесть простых шагов от первого звонка до готового объекта.",
    process: [
      "Свяжитесь с нами",
      "Оцениваем объём работ",
      "Получаете понятное предложение",
      "Согласуем срок",
      "Выполняем работы",
      "Сдаём готовый объект",
    ],
    worksHeading: "Примеры выполненных работ",
    worksText: "Примеры объектов, которые мы ведём каждый день.",
    works: [
      { caption: "Строительство частного дома" },
      { caption: "Фасадные работы и утепление" },
      { caption: "Внутренняя отделка" },
      { caption: "Водоснабжение и канализация" },
      { caption: "Реновация ванной комнаты" },
      { caption: "Строительство террасы" },
    ],
    companyHeading: "Реквизиты компании",
    companyNote: "Официально зарегистрированная строительная компания Эстонии.",
    mapLabel: "Посмотреть на картах Google",
    ctaServices: "Смотреть услуги",
  },
  en: {
    heroTitle: "Construction, renovation and property maintenance in Tallinn and Harjumaa",
    heroText:
      "We build and renovate private houses, carry out roof, facade, interior finishing and building services works, and maintain commercial property.",
    heroPoints: [
      "Over 12 years of experience",
      "Large projects and long-term maintenance",
      "Clear quote and deadlines",
      "One partner from design to construction",
    ],
    trustHeading: "What you get",
    trust: [
      { title: "Over 12 years of experience", text: "Construction and renovation works since 2014." },
      { title: "Complete solution", text: "From structures to building services and finishing." },
      { title: "Clear written quote", text: "Scope, materials and price in one document." },
      { title: "Agreed deadlines", text: "Stages and dates fixed before the work starts." },
      { title: "Site management", text: "One project manager coordinates all trades and subcontractors." },
      { title: "Tallinn and Harjumaa", text: "Work in Tallinn, Harjumaa and elsewhere in Estonia by agreement." },
    ],
    servicesHeading: "Services",
    servicesText: "We take responsibility for the whole property — from construction to long-term maintenance.",
    services: [
      {
        title: "House construction",
        text: "Building private houses in Tallinn and Harjumaa — from foundation and shell to handover.",
        key: "construction",
      },
      {
        title: "House renovation",
        text: "Renovating older houses: structures, insulation, building systems and finishing.",
        key: "house-renovation",
      },
      {
        title: "Apartment renovation",
        text: "Full apartment renovation in Tallinn: layout changes, pipework, electrics and finishing.",
        key: "apartment-renovation",
      },
      {
        title: "Bathroom renovation",
        text: "Turnkey bathrooms: waterproofing, tiling, pipework and sanitary ware.",
        key: "bathroom-renovation",
      },
      {
        title: "Interior finishing",
        text: "Walls, ceilings, floors and details in apartments, houses and commercial premises.",
        key: "finishing",
      },
      {
        title: "Roofing works",
        text: "Roof construction, replacement and repair with insulation and rainwater systems.",
        key: "roof",
      },
      {
        title: "Facade works",
        text: "Facade insulation, plastering, cladding and exterior repairs.",
        key: "facade",
      },
      {
        title: "Electrical works",
        text: "Wiring, distribution boards, lighting and connections in homes and commercial premises.",
        key: "electrical",
      },
      {
        title: "Plumbing works",
        text: "Water and sewage pipework, sanitary ware installation and heating work.",
        key: "plumbing",
      },
      {
        title: "Commercial renovation",
        text: "Construction, reconstruction and renovation of offices, shops, restaurants and warehouses.",
        key: "commercial-renovation",
      },
      {
        title: "Design and planning",
        text: "Architectural design, building projects, interior design and systems design.",
        key: "design-planning",
      },
      {
        title: "Property maintenance",
        text: "Ongoing technical maintenance, repairs and fault fixing for commercial property.",
        key: "maintenance",
      },
    ],
    designHeading: "Design and planning",
    designTitle: "One partner from idea to finished property",
    designText:
      "We organise design and construction as one process. We work with architects, designers and engineers so the whole project runs through one reliable partner.",
    designItems: [
      "Architectural design",
      "Construction projects",
      "Reconstruction projects",
      "Interior design",
      "Building services design",
      "Consultation before construction",
      "Project coordination",
      "Cooperation with architects, designers and engineers",
    ],
    designFlow: ["Idea", "Design", "Budget", "Construction", "Finishing", "Finished property"],
    designCta: "Tell us about your project",
    b2bHeading: "A reliable partner for commercial property maintenance",
    b2bText:
      "We provide companies with regular maintenance and repair works so issues are solved quickly through one reliable partner.",
    b2bPoints: [
      "Maintenance agreements with agreed response times",
      "Repair works and fault fixing",
      "One contact person for all your properties",
    ],
    b2bCta: "Request a partnership offer",
    whyHeading: "Why choose Lavaner",
    why: [
      { title: "One person responsible", text: "The project manager owns scope, timeline and quality." },
      { title: "No price surprises", text: "Extra work is always agreed before it is carried out." },
      { title: "Work follows the schedule", text: "You see stage status and photos of the progress." },
      { title: "Everything from one company", text: "Design, construction, engineering and finishing." },
      { title: "Clean site", text: "After the works are finished we leave the site tidy and remove construction waste." },
      { title: "Handover with inspection", text: "We walk the property together and fix any snags." },
    ],
    processHeading: "How we work together",
    processText: "Six simple steps from the first call to a finished property.",
    process: [
      "Get in touch",
      "We assess the scope",
      "You get a clear quote",
      "We agree the deadline",
      "We carry out the work",
      "We hand over the finished job",
    ],
    worksHeading: "Examples of our work",
    worksText: "The kind of projects we deliver every day.",
    works: [
      { caption: "Private house construction" },
      { caption: "Facade and insulation works" },
      { caption: "Interior finishing" },
      { caption: "Water and sewerage works" },
      { caption: "Bathroom renovation" },
      { caption: "Terrace construction" },
    ],
    companyHeading: "Company details",
    companyNote: "Officially registered Estonian construction company.",
    mapLabel: "View on Google Maps",
    ctaServices: "See services",
  },
};