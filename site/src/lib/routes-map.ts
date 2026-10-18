// Карта человекопонятных URL для всех языковых версий.
// Эстонская версия — без языкового префикса (основной рынок), ru/en — с префиксом.
// Slug'и не менять без 301-редиректа.

import type { Lang } from "./i18n";

export type ServiceKey =
  | "construction"
  | "apartment-renovation"
  | "house-renovation"
  | "bathroom-renovation"
  | "commercial-renovation"
  | "office-renovation"
  | "reconstruction"
  | "design-planning"
  | "interior-design"
  | "finishing"
  | "engineering"
  | "electrical"
  | "plumbing"
  | "roof"
  | "facade"
  | "maintenance";

export const SERVICE_SLUGS: Record<ServiceKey, Record<Lang, string>> = {
  construction: { et: "eramute-ehitus", ru: "stroitelstvo-chastnyh-domov", en: "house-construction" },
  "apartment-renovation": {
    et: "korteri-remont-tallinn",
    ru: "remont-kvartir-tallinn",
    en: "apartment-renovation-tallinn",
  },
  "house-renovation": { et: "maja-renoveerimine", ru: "renovatsiya-domov", en: "house-renovation" },
  "bathroom-renovation": {
    et: "vannitoa-remont",
    ru: "remont-vannoy-komnaty",
    en: "bathroom-renovation",
  },
  "commercial-renovation": {
    et: "aripindade-remont",
    ru: "remont-kommercheskih-pomescheniy",
    en: "commercial-renovation",
  },
  "office-renovation": { et: "buroo-remont", ru: "remont-ofisov", en: "office-renovation" },
  reconstruction: { et: "renoveerimine", ru: "rekonstruktsiya", en: "reconstruction" },
  "design-planning": {
    et: "projekteerimine",
    ru: "proektirovanie",
    en: "design-and-planning",
  },
  "interior-design": { et: "sisekujundus", ru: "dizayn-interera", en: "interior-design" },
  finishing: { et: "siseviimistlus", ru: "otdelochnye-raboty", en: "finishing-works" },
  engineering: { et: "tehnosusteemid", ru: "inzhenernye-raboty", en: "engineering-works" },
  electrical: { et: "elektritood", ru: "elektromontazhnye-raboty", en: "electrical-works" },
  plumbing: {
    et: "sanitaartehnilised-tood",
    ru: "santehnicheskie-raboty",
    en: "plumbing-works",
  },
  roof: { et: "katustood", ru: "krovelnye-raboty", en: "roofing-works" },
  facade: { et: "fassaaditood", ru: "fasadnye-raboty", en: "facade-works" },
  maintenance: { et: "kinnisvara-hooldus", ru: "obsluzhivanie-obektov", en: "property-maintenance" },
};

export const SERVICE_KEYS = Object.keys(SERVICE_SLUGS) as ServiceKey[];

/** Главные категории услуг в маркетинговом приоритете (главная, меню, футер, каталог). */
export const PRIMARY_SERVICE_KEYS: ServiceKey[] = [
  "construction",
  "house-renovation",
  "apartment-renovation",
  "bathroom-renovation",
  "finishing",
  "roof",
  "facade",
  "electrical",
  "plumbing",
  "commercial-renovation",
  "design-planning",
  "maintenance",
];

/** Полный список: сначала главные категории, затем уточняющие страницы. */
export const ORDERED_SERVICE_KEYS: ServiceKey[] = [
  ...PRIMARY_SERVICE_KEYS,
  ...SERVICE_KEYS.filter((k) => !PRIMARY_SERVICE_KEYS.includes(k)),
];

export type PageKey =
  | "services"
  | "business"
  | "private"
  | "projects"
  | "about"
  | "process"
  | "blog"
  | "contacts"
  | "privacy"
  | "cookies";

export const PAGE_SLUGS: Record<PageKey, Record<Lang, string>> = {
  services: { et: "teenused", ru: "uslugi", en: "services" },
  business: { et: "ariklientidele", ru: "dlya-biznesa", en: "business-clients" },
  private: { et: "eraklientidele", ru: "dlya-chastnyh-klientov", en: "private-clients" },
  projects: { et: "tehtud-tood", ru: "vypolnennye-raboty", en: "completed-works" },
  about: { et: "meist", ru: "o-kompanii", en: "about" },
  process: { et: "tooprotsess", ru: "protsess-raboty", en: "process" },
  blog: { et: "blogi", ru: "blog", en: "blog" },
  contacts: { et: "kontakt", ru: "kontakty", en: "contact" },
  privacy: { et: "privaatsuspoliitika", ru: "politika-konfidentsialnosti", en: "privacy-policy" },
  cookies: { et: "kupsised", ru: "politika-cookies", en: "cookie-policy" },
};

export const PAGE_KEYS = Object.keys(PAGE_SLUGS) as PageKey[];

/** Префикс языка: эстонская версия живёт в корне сайта. */
export function langPrefix(lang: Lang) {
  return lang === "et" ? "" : `/${lang}`;
}

/** URL страницы: /{slug} для et, /{lang}/{slug} для остальных. */
export function pageUrl(lang: Lang, key: PageKey) {
  return `${langPrefix(lang)}/${PAGE_SLUGS[key][lang]}`;
}

export function serviceUrl(lang: Lang, key: ServiceKey) {
  return `${langPrefix(lang)}/${SERVICE_SLUGS[key][lang]}`;
}

export function homeUrl(lang: Lang) {
  return lang === "et" ? "/" : `/${lang}`;
}

/** Основной публичный домен сайта. Используется в canonical, hreflang, sitemap, JSON-LD. */
export const SITE_URL = "https://lavaner.ee";

/** Абсолютный публичный адрес для относительного пути. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export type Resolved =
  | { type: "service"; key: ServiceKey }
  | { type: "page"; key: PageKey }
  | null;

/** Определяет, какой странице соответствует slug в данной языковой версии. */
export function resolveSlug(lang: Lang, slug: string): Resolved {
  const svc = SERVICE_KEYS.find((k) => SERVICE_SLUGS[k][lang] === slug);
  if (svc) return { type: "service", key: svc };
  const page = PAGE_KEYS.find((k) => PAGE_SLUGS[k][lang] === slug);
  if (page) return { type: "page", key: page };
  return null;
}

/** Тот же документ на другом языке — для hreflang и переключателя языков. */
export function alternateUrl(target: Lang, resolved: Resolved) {
  if (!resolved) return homeUrl(target);
  return resolved.type === "service"
    ? serviceUrl(target, resolved.key)
    : pageUrl(target, resolved.key);
}

/** Старые URL первой версии сайта -> новый адрес (301). */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/services": pageUrl("et", "services"),
  "/business": pageUrl("et", "business"),
  "/private": pageUrl("et", "private"),
  "/about-us": pageUrl("et", "about"),
  "/contacts": pageUrl("et", "contacts"),
};

/**
 * Старые эстонские адреса с префиксом /et -> новый адрес без префикса.
 * Ключ — slug после /et/, значение — конечный путь.
 */
export const ET_LEGACY_SLUGS: Record<string, string> = {
  ehitus: "/eramute-ehitus",
  "eramaja-remont": "/maja-renoveerimine",
  "katuse-ja-fassaaditood": "/katustood",
  projektid: "/tehtud-tood",
};

/** Куда вести старый адрес /et/{slug}. */
export function etLegacyTarget(slug: string) {
  return ET_LEGACY_SLUGS[slug] ?? `/${slug}`;
}

/** Старые slug'и услуг первой версии /services/:slug -> новые ключи услуг. */
export const LEGACY_SERVICE_SLUGS: Record<string, ServiceKey> = {
  "interior-design": "interior-design",
  "design-engineering": "design-planning",
  construction: "construction",
  renovation: "apartment-renovation",
  reconstruction: "reconstruction",
  "commercial-renovation": "commercial-renovation",
  "home-renovation": "house-renovation",
  finishing: "finishing",
  "engineering-systems": "engineering",
  maintenance: "maintenance",
};

/** Удалённые slug'и внутри /ru и /en -> актуальные ключи услуг. */
export const REMOVED_SLUGS: Partial<Record<Lang, Record<string, ServiceKey>>> = {
  ru: { "krovlya-i-fasady": "roof" },
  en: { "roof-and-facade-works": "roof" },
};