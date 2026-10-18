import { createFileRoute } from "@tanstack/react-router";

import { HREFLANG, LANGS } from "@/lib/i18n";
import { PAUSED_ROBOTS, SITE_PAUSED } from "@/lib/site-status";
import {
  PAGE_KEYS,
  SERVICE_KEYS,
  SITE_URL,
  alternateUrl,
  homeUrl,
  pageUrl,
  serviceUrl,
} from "@/lib/routes-map";

/** Страницы, которые не индексируются. */
const EXCLUDED = new Set(["blog"]);

function buildSitemap(origin: string) {
  type Entry = { loc: string; alternates: { lang: string; href: string }[]; priority: string };
  const entries: Entry[] = [];

  for (const lang of LANGS) {
    entries.push({
      loc: `${origin}${homeUrl(lang)}`,
      alternates: LANGS.map((l) => ({ lang: HREFLANG[l], href: `${origin}${homeUrl(l)}` })),
      priority: lang === "et" ? "1.0" : "0.9",
    });
  }

  for (const key of SERVICE_KEYS) {
    for (const lang of LANGS) {
      entries.push({
        loc: `${origin}${serviceUrl(lang, key)}`,
        alternates: LANGS.map((l) => ({
          lang: HREFLANG[l],
          href: `${origin}${alternateUrl(l, { type: "service", key })}`,
        })),
        priority: "0.9",
      });
    }
  }

  for (const key of PAGE_KEYS) {
    if (EXCLUDED.has(key)) continue;
    for (const lang of LANGS) {
      entries.push({
        loc: `${origin}${pageUrl(lang, key)}`,
        alternates: LANGS.map((l) => ({
          lang: HREFLANG[l],
          href: `${origin}${alternateUrl(l, { type: "page", key })}`,
        })),
        priority: key === "privacy" || key === "cookies" ? "0.2" : "0.7",
      });
    }
  }

  const body = entries
    .map(
      (e) => `  <url>
    <loc>${e.loc}</loc>
${e.alternates
  .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
  .join("\n")}
    <priority>${e.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        if (SITE_PAUSED) {
          return new Response("Not found", { status: 404, headers: { "X-Robots-Tag": PAUSED_ROBOTS } });
        }
        return new Response(buildSitemap(SITE_URL), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});