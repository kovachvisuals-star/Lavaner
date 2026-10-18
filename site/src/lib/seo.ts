// Построение метаданных: canonical, hreflang, Open Graph, JSON-LD.
// Все публичные адреса абсолютные и указывают на основной домен https://lavaner.ee.

import { CONTACT, HREFLANG, LANGS, DEFAULT_LANG, PLACEHOLDERS, type Lang } from "./i18n";
import { absoluteUrl, alternateUrl, homeUrl, SITE_URL, type Resolved } from "./routes-map";
import { PAUSED_ROBOTS, SITE_PAUSED } from "./site-status";

/** Изображение предпросмотра ссылок по умолчанию (логотип LAVANER). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/lavaner-logo-exact.webp`;

export type HeadInput = {
  lang: Lang;
  resolved: Resolved;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: unknown[];
};

export function buildHead({
  lang,
  resolved,
  title,
  description,
  image: _image,
  type = "website",
  noindex,
  jsonLd = [],
}: HeadInput) {
  const url = absoluteUrl(alternateUrl(lang, resolved));
  const ogImage = DEFAULT_OG_IMAGE;

  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:locale", content: HREFLANG[lang].replace("-", "_") },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (SITE_PAUSED) {
    meta.push({ name: "robots", content: PAUSED_ROBOTS });
    meta.push({ name: "googlebot", content: PAUSED_ROBOTS });
  } else {
    meta.push({ name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large" });
  }

  const links: Record<string, string>[] = [{ rel: "canonical", href: url }];
  for (const l of LANGS) {
    links.push({
      rel: "alternate",
      hrefLang: HREFLANG[l],
      href: absoluteUrl(alternateUrl(l, resolved)),
    });
  }
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: absoluteUrl(alternateUrl(DEFAULT_LANG, resolved)),
  });

  return {
    meta,
    links,
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

/** WebSite — помогает Google правильно определить название сайта. */
export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LAVANER",
    alternateName: "LAVANER OÜ",
    url: `${SITE_URL}/`,
    inLanguage: HREFLANG[lang],
    publisher: { "@type": "Organization", name: "LAVANER OÜ", url: `${SITE_URL}/` },
  };
}

/** Organization (без LocalBusiness — физический адрес не публикуется). */
export function organizationJsonLd(lang: Lang) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Organization", "GeneralContractor"],
    "@id": `${SITE_URL}/#organization`,
    name: "LAVANER OÜ",
    email: CONTACT.email,
    telephone: CONTACT.phoneEt,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: CONTACT.phoneEt,
        availableLanguage: ["et"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: CONTACT.phoneRu,
        availableLanguage: ["ru"],
      },
    ],
    url: absoluteUrl(homeUrl(lang)),
    logo: `${SITE_URL}/lavaner-logo-exact.webp`,
    image: DEFAULT_OG_IMAGE,
    areaServed: [
      { "@type": "City", name: "Tallinn" },
      { "@type": "City", name: "Maardu" },
      { "@type": "AdministrativeArea", name: "Harjumaa" },
      { "@type": "AdministrativeArea", name: "Harju maakond" },
      { "@type": "Country", name: "Estonia" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EE",
    },
    foundingDate: "2014",
    availableLanguage: ["et", "ru", "en"],
    sameAs: [CONTACT.googleBusinessUrl],
    knowsLanguage: ["et", "ru", "en"],
    slogan: "Ehitus, renoveerimine ja kinnisvara hooldus Tallinnas ning Harjumaal",
  };
  return data;
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  lang: Lang;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    url: opts.url.startsWith("http") ? opts.url : absoluteUrl(opts.url),
    provider: {
      "@type": "GeneralContractor",
      "@id": `${SITE_URL}/#organization`,
      name: "LAVANER OÜ",
      url: `${SITE_URL}/`,
      email: CONTACT.email,
    },
    areaServed: [
      { "@type": "City", name: "Tallinn" },
      { "@type": "City", name: "Maardu" },
      { "@type": "AdministrativeArea", name: "Harjumaa" },
      { "@type": "Country", name: "Estonia" },
    ],
    availableLanguage: ["et", "ru"],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}