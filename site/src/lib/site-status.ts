// Site pause switch. Set SITE_PAUSED = false to restore the full site and SEO.
// While paused, every page returns a localized "temporarily unavailable" page
// with noindex,nofollow (HTML meta + X-Robots-Tag) and the sitemap is withdrawn.

export const SITE_PAUSED = false;

export const PAUSED_ROBOTS = "noindex, nofollow";

type L = "et" | "ru" | "en";

const TEXT: Record<L, { title: string; body: string }> = {
  et: { title: "Veebileht on ajutiselt suletud", body: "LAVANER OÜ veebileht on ajutiselt kättesaamatu. Täname kannatlikkuse eest." },
  ru: { title: "Сайт временно недоступен", body: "Сайт LAVANER OÜ временно недоступен. Спасибо за понимание." },
  en: { title: "Website temporarily unavailable", body: "The LAVANER OÜ website is temporarily unavailable. Thank you for your patience." },
};

export function pausedLang(pathname: string): L {
  const first = pathname.split("/").filter(Boolean)[0];
  return first === "ru" || first === "en" ? first : "et";
}

export function renderPausedPage(pathname: string): string {
  const lang = pausedLang(pathname);
  const t = TEXT[lang];
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="${PAUSED_ROBOTS}">
<meta name="googlebot" content="${PAUSED_ROBOTS}">
<title>${t.title} | LAVANER OÜ</title>
<link rel="icon" href="/favicon.ico">
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;background:#0F1A24;color:#F3F5F7;text-align:center;padding:24px}main{max-width:480px}img{width:96px;height:auto;background:#fff;border-radius:8px;padding:8px}h1{font-size:1.5rem;margin:24px 0 12px}p{opacity:.8;line-height:1.5}</style>
</head><body><main>
<img src="/lavaner-logo-exact.webp" alt="LAVANER OÜ">
<h1>${t.title}</h1><p>${t.body}</p>
</main></body></html>`;
}

/** Robots.txt while paused: crawling allowed so engines can read noindex; no Sitemap line. */
export const PAUSED_ROBOTS_TXT = "User-agent: *\nAllow: /\n";