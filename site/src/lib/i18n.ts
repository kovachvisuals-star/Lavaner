// Языковая конфигурация и общие данные компании LAVANER.
// Единая точка правки: контакты, плейсхолдеры, интерфейсные строки.

export const LANGS = ["et", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "et"; // x-default

export const HREFLANG: Record<Lang, string> = {
  et: "et-EE",
  ru: "ru-EE",
  en: "en-EE",
};

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

// ---------------------------------------------------------------------------
// Контакты и плейсхолдеры (реальные данные заполняются владельцем)
// ---------------------------------------------------------------------------

export const CONTACT = {
  email: "info@lavaner.ee",
  emailHref: "mailto:info@lavaner.ee",
  phoneRu: "+372 5662 9887",
  phoneRuHref: "tel:+37256629887",
  phoneEt: "+372 5809 7574",
  phoneEtHref: "tel:+37258097574",
  serviceArea: "Tallinn, Maardu, Viimsi ja Harjumaa",
  /** Реальный профиль компании в Google (передан владельцем). */
  googleBusinessUrl:
    "https://www.google.com/search?q=LAVANER+O%C3%9C&stick=H4sIAAAAAAAA_-NgU1I1qDBJMjU2NAAC89Sk1JRUQyuDCvPERLOktCQTw8Q0szQzI5NFrNw-jmGOfq5BCv6H5wAAAS8zojcAAAA",
  mapsUrl:
    "https://www.google.com/search?q=LAVANER+O%C3%9C&stick=H4sIAAAAAAAA_-NgU1I1qDBJMjU2NAAC89Sk1JRUQyuDCvPERLOktCQTw8Q0szQzI5NFrNw-jmGOfq5BCv6H5wAAAS8zojcAAAA",
};

export type PhoneLine = { number: string; href: string; label: string; key: "et" | "ru" };

/** Подписи к номерам на языке интерфейса. */
const PHONE_LABELS: Record<Lang, { et: string; ru: string }> = {
  et: { et: "Eesti keel", ru: "Русский" },
  ru: { et: "Eesti keel", ru: "Русский" },
  en: { et: "Estonian", ru: "Russian" },
};

/** Оба контактных номера с подписями для текущего языка. */
export function phoneLines(lang: Lang): PhoneLine[] {
  const labels = PHONE_LABELS[lang];
  const et: PhoneLine = {
    number: CONTACT.phoneEt,
    href: CONTACT.phoneEtHref,
    label: labels.et,
    key: "et",
  };
  const ru: PhoneLine = {
    number: CONTACT.phoneRu,
    href: CONTACT.phoneRuHref,
    label: labels.ru,
    key: "ru",
  };
  return lang === "et" ? [et, ru] : [ru, et];
}

/** Основной номер для кнопки звонка: /et — эстонский, иначе русскоязычный. */
export function primaryPhone(lang: Lang): PhoneLine {
  return phoneLines(lang)[0]!;
}


/** Реальные данные компании. */
export const PLACEHOLDERS = {
  legalName: "LAVANER OÜ",
  registryCode: "12642198",
  openingHours: "[OPENING_HOURS]",
  websiteDomain: "lavaner.ee",
  logoUrl: "[LOGO_URL]",
};

export type SocialKey = "linkedin" | "facebook" | "instagram" | "google";

export const SOCIALS: { key: SocialKey; label: string; url: string }[] = [
  { key: "linkedin", label: "LinkedIn", url: "[LINKEDIN_COMPANY_URL]" },
  { key: "facebook", label: "Facebook", url: "[FACEBOOK_PAGE_URL]" },
  { key: "instagram", label: "Instagram", url: "[INSTAGRAM_PROFILE_URL]" },
  {
    key: "google",
    label: "Google Business Profile",
    url: "https://www.google.com/search?q=LAVANER+O%C3%9C&stick=H4sIAAAAAAAA_-NgU1I1qDBJMjU2NAAC89Sk1JRUQyuDCvPERLOktCQTw8Q0szQzI5NFrNw-jmGOfq5BCv6H5wAAAS8zojcAAAA",
  },
];

/** Плейсхолдер ещё не заменён реальным значением. */
export function isPlaceholder(value: string) {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}

export const ACTIVE_SOCIALS = SOCIALS.filter((s) => !isPlaceholder(s.url));

// ---------------------------------------------------------------------------
// Интерфейсные строки
// ---------------------------------------------------------------------------

type UIStrings = {
  langName: string;
  skipToContent: string;
  menu: string;
  closeMenu: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaEstimate: string;
  ctaQuote: string;
  ctaFreeQuote: string;
  call: string;
  phoneNoteRu: string;
  phoneNoteEt: string;
  emailLabel: string;
  serviceAreaLabel: string;
  serviceAreaValue: string;
  sinceBadge: string;
  breadcrumbHome: string;
  allServices: string;
  relatedServices: string;
  forWhom: string;
  weSolve: string;
  included: string;
  stages: string;
  dataNeeded: string;
  advantages: string;
  geography: string;
  faq: string;
  formTitle: string;
  formText: string;
  footerAbout: string;
  footerServices: string;
  footerNav: string;
  footerContacts: string;
  footerLegal: string;
  socialPending: string;
  companyDetails: string;
  registryCodeLabel: string;
  experienceBadge: string;
  inPreparation: string;
  googleProfile: string;
  worksIntro: string;
  contactHeading: string;
  processHeading: string;
};

export const UI: Record<Lang, UIStrings> = {
  et: {
    langName: "Eesti",
    skipToContent: "Liigu sisu juurde",
    menu: "Ava menüü",
    closeMenu: "Sulge menüü",
    ctaPrimary: "Küsi projekti hinnapakkumist",
    ctaSecondary: "Aruta meiega oma projekti",
    ctaEstimate: "Küsi projekti hinnapakkumist",
    ctaQuote: "Küsi hinnapakkumist",
    ctaFreeQuote: "Küsi tasuta hinnapakkumist",
    call: "Helista",
    phoneNoteRu: "Vene keeles",
    phoneNoteEt: "Eesti keeles",
    emailLabel: "E-post",
    serviceAreaLabel: "Teeninduspiirkond",
    serviceAreaValue: "Tallinn, Maardu, Viimsi ja Harjumaa",
    sinceBadge: "Tegutseme alates 2014. aastast",
    breadcrumbHome: "Avaleht",
    allServices: "Kõik teenused",
    relatedServices: "Seotud teenused",
    forWhom: "Kellele teenus on mõeldud",
    weSolve: "Milliseid ülesandeid lahendame",
    included: "Mida teenus sisaldab",
    stages: "Töö etapid",
    dataNeeded: "Mida on hinnapakkumiseks vaja",
    advantages: "Miks valida meid",
    geography: "Tööpiirkond",
    faq: "Korduma kippuvad küsimused",
    formTitle: "Küsi hinnapakkumist",
    formText: "Kirjeldage objekti — vaatame üle ja koostame etapid, tähtajad ja eelarve.",
    footerAbout: "Ettevõttest",
    footerServices: "Teenused",
    footerNav: "Navigatsioon",
    footerContacts: "Kontakt",
    footerLegal: "Ettevõtte andmed",
    socialPending: "Sotsiaalmeedia lingid lisatakse peagi.",
    companyDetails: "Ettevõtte andmed",
    registryCodeLabel: "Registrikood",
    experienceBadge: "Üle 12 aasta kogemust ehitus- ja viimistlustöödes",
    inPreparation: "Ettevalmistamisel",
    googleProfile: "Vaata meid Google'is",
    worksIntro: "Näited töödest, mida teeme",
    contactHeading: "Kontaktandmed",
    processHeading: "Kuidas koostöö käib",
  },
  ru: {
    langName: "Русский",
    skipToContent: "Перейти к содержимому",
    menu: "Открыть меню",
    closeMenu: "Закрыть меню",
    ctaPrimary: "Получить расчёт проекта",
    ctaSecondary: "Обсудить проект",
    ctaEstimate: "Получить расчёт проекта",
    ctaQuote: "Запросить предложение",
    ctaFreeQuote: "Получить бесплатный расчёт",
    call: "Позвонить",
    phoneNoteRu: "Русский",
    phoneNoteEt: "Эстонский",
    emailLabel: "E-mail",
    serviceAreaLabel: "Зона обслуживания",
    serviceAreaValue: "Таллинн, Маарду, Виймси и Харьюмаа",
    sinceBadge: "Работаем с 2014 года",
    breadcrumbHome: "Главная",
    allServices: "Все услуги",
    relatedServices: "Связанные услуги",
    forWhom: "Для кого эта услуга",
    weSolve: "Какие задачи мы решаем",
    included: "Что входит в услугу",
    stages: "Этапы работы",
    dataNeeded: "Какие данные нужны для расчёта",
    advantages: "Почему выбирают нас",
    geography: "География работ",
    faq: "Частые вопросы",
    formTitle: "Получить расчёт проекта",
    formText: "Опишите объект — осмотрим, согласуем объём и подготовим этапы, сроки и стоимость.",
    footerAbout: "О компании",
    footerServices: "Услуги",
    footerNav: "Навигация",
    footerContacts: "Контакты",
    footerLegal: "Реквизиты",
    socialPending: "Ссылки на социальные сети будут добавлены.",
    companyDetails: "Реквизиты компании",
    registryCodeLabel: "Регистрационный код",
    experienceBadge: "Более 12 лет опыта в строительных и отделочных работах",
    inPreparation: "В подготовке",
    googleProfile: "Смотрите нас в Google",
    worksIntro: "Примеры работ, которые мы выполняем",
    contactHeading: "Контактные данные",
    processHeading: "Как строится работа",
  },
  en: {
    langName: "English",
    skipToContent: "Skip to content",
    menu: "Open menu",
    closeMenu: "Close menu",
    ctaPrimary: "Request a project estimate",
    ctaSecondary: "Discuss your project",
    ctaEstimate: "Request a project estimate",
    ctaQuote: "Request a quote",
    ctaFreeQuote: "Get a free quote",
    call: "Call",
    phoneNoteRu: "Russian",
    phoneNoteEt: "Estonian",
    emailLabel: "Email",
    serviceAreaLabel: "Service area",
    serviceAreaValue: "Tallinn, Maardu, Viimsi and Harjumaa",
    sinceBadge: "We have been operating since 2014",
    breadcrumbHome: "Home",
    allServices: "All services",
    relatedServices: "Related services",
    forWhom: "Who this service is for",
    weSolve: "What we take care of",
    included: "What the service includes",
    stages: "How we work",
    dataNeeded: "What we need for an estimate",
    advantages: "Why choose us",
    geography: "Where we work",
    faq: "Frequently asked questions",
    formTitle: "Request a project estimate",
    formText: "Describe the property — we review it and prepare stages, timeline and budget.",
    footerAbout: "About",
    footerServices: "Services",
    footerNav: "Navigation",
    footerContacts: "Contact",
    footerLegal: "Company details",
    socialPending: "Social media links will be added.",
    companyDetails: "Company details",
    registryCodeLabel: "Registry code",
    experienceBadge: "Over 12 years of experience in construction and finishing works",
    inPreparation: "In preparation",
    googleProfile: "See us on Google",
    worksIntro: "Examples of the work we do",
    contactHeading: "Contact details",
    processHeading: "How we work together",
  },
};

/** Подтверждаемые преимущества — без выдуманной статистики. */
export const ADVANTAGES: Record<Lang, string[]> = {
  et: [
    "Üks vastutav projektijuht kogu objekti vältel",
    "Eelnev ülevaatus ja tööde kooskõlastamine enne algust",
    "Läbipaistvad etapid ja arusaadav suhtlus",
    "Tööde käigu fotodokumenteerimine",
    "Projekteerimine ja teostus ühes ettevõttes",
    "Töötame nii era- kui äriklientidega",
    "Valmis objekti üleandmine kliendile",
  ],
  ru: [
    "Один ответственный за проект на всём объекте",
    "Предварительная оценка и согласование работ до старта",
    "Прозрачные этапы и понятная коммуникация",
    "Фотофиксация процесса работ",
    "Проектирование и выполнение работ в одной компании",
    "Работаем с бизнесом и частными клиентами",
    "Сдача готового объекта заказчику",
  ],
  en: [
    "One responsible project manager for the whole site",
    "Site review and scope agreed before work starts",
    "Transparent stages and clear communication",
    "Photo documentation of the work process",
    "Design and execution under one roof",
    "We work with both business and private clients",
    "Handover of the completed property",
  ],
};

export const GEOGRAPHY: Record<Lang, string> = {
  et: "Tallinn, Maardu, Viimsi ja Harjumaa. Objekti asukoha täpsustame enne ülevaatust.",
  ru: "Таллинн, Маарду, Виймси и Харьюмаа. Точное расположение объекта уточняем перед осмотром.",
  en: "Tallinn, Maardu, Viimsi and Harjumaa. We confirm the exact location before the site visit.",
};