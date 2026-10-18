import { useEffect, useState } from "react";

import { SiteLink } from "@/components/site/SiteLink";
import { initAnalytics, readConsent, setConsent } from "@/lib/analytics";
import type { Lang } from "@/lib/i18n";
import { pageUrl } from "@/lib/routes-map";
import { useLang } from "@/lib/use-lang";

const T: Record<Lang, { text: string; accept: string; decline: string; link: string }> = {
  et: {
    text: "Kasutame statistika küpsiseid, et mõista, milliseid lehti külastatakse. Statistika lülitub sisse ainult teie nõusolekul.",
    accept: "Nõustun",
    decline: "Ainult vajalikud",
    link: "Küpsiste poliitika",
  },
  ru: {
    text: "Мы используем статистические cookies, чтобы понимать, какие страницы посещают. Статистика включается только с вашего согласия.",
    accept: "Согласен",
    decline: "Только необходимые",
    link: "Политика cookies",
  },
  en: {
    text: "We use analytics cookies to understand which pages are visited. Analytics is enabled only with your consent.",
    accept: "Accept",
    decline: "Only necessary",
    link: "Cookie policy",
  },
};

/** Баннер согласия (Consent Mode v2). Показывается, пока выбор не сделан. */
export function CookieConsent() {
  const lang = useLang();
  const t = T[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initAnalytics();
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (choice: "granted" | "denied") => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t.link}
      className="fixed inset-x-0 bottom-16 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-card p-4 shadow-lg lg:bottom-4"
    >
      <p className="text-xs leading-relaxed text-muted-foreground">
        {t.text}{" "}
        <SiteLink to={pageUrl(lang, "cookies")} className="underline hover:text-accent-foreground">
          {t.link}
        </SiteLink>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded border border-border px-4 py-2 text-xs font-semibold text-foreground"
        >
          {t.decline}
        </button>
      </div>
    </div>
  );
}