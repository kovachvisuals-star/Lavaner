import { useLocation } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { Brand } from "@/components/site/Brand";
import { Logo } from "@/components/site/Logo";
import { track } from "@/lib/analytics";
import { LANGS, UI, phoneLines, type Lang } from "@/lib/i18n";
import { SiteLink } from "@/components/site/SiteLink";
import { alternateUrl, homeUrl, pageUrl, resolveSlug, type PageKey } from "@/lib/routes-map";
import { useLang } from "@/lib/use-lang";
import { cn } from "@/lib/utils";

const NAV_KEYS: PageKey[] = ["services", "business", "private", "process", "about", "contacts"];

const NAV_LABELS: Record<PageKey, Record<Lang, string>> = {
  services: { et: "Teenused", ru: "Услуги", en: "Services" },
  business: { et: "Äriklientidele", ru: "Для бизнеса", en: "For business" },
  private: { et: "Eraklientidele", ru: "Частным клиентам", en: "For private clients" },
  projects: { et: "Projektid", ru: "Проекты", en: "Projects" },
  about: { et: "Meist", ru: "О компании", en: "About" },
  process: { et: "Tööprotsess", ru: "Процесс работы", en: "Process" },
  blog: { et: "Blogi", ru: "Блог", en: "Blog" },
  contacts: { et: "Kontakt", ru: "Контакты", en: "Contact" },
  privacy: { et: "Privaatsus", ru: "Конфиденциальность", en: "Privacy" },
  cookies: { et: "Küpsised", ru: "Cookies", en: "Cookies" },
};

export { NAV_LABELS };

export function Header() {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const ui = UI[lang];
  const location = useLocation();

  const parts = location.pathname.split("/").filter(Boolean);
  const currentSlug = (parts[0] === "ru" || parts[0] === "en" ? parts[1] : parts[0]) ?? "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <SiteLink
          to={homeUrl(lang)}
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="flex flex-col leading-tight">
            <Brand className="text-lg font-bold tracking-[0.18em]" />
            <span className="text-[10px] tracking-[0.22em] text-primary-foreground/60">
              OÜ · EHITUS · REMONT
            </span>
          </span>
        </SiteLink>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="LAVANER">
          {NAV_KEYS.map((key) => (
            <SiteLink
              key={key}
              to={pageUrl(lang, key)}
              className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {NAV_LABELS[key][lang]}
            </SiteLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitcher currentSlug={currentSlug} />
          <div className="flex flex-col gap-1">
            {phoneLines(lang).map((p) => (
              <a
                key={p.key}
                href={p.href}
                onClick={() => track("phone_click", { place: "header", line: p.key })}
                className="flex items-center justify-end gap-2 leading-tight"
              >
                <Phone className="h-3.5 w-3.5 text-accent" />
                <span className="text-sm font-semibold">{p.number}</span>
                <span className="text-[11px] text-primary-foreground/60">{p.label}</span>
              </a>
            ))}
          </div>
          <SiteLink
            to={pageUrl(lang, "contacts")}
            onClick={() => track("quote_cta_click", { place: "header", button_text: ui.ctaPrimary })}
            className="rounded bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {ui.ctaPrimary}
          </SiteLink>
        </div>


        <div className="flex items-center gap-3 lg:hidden">
          <LangSwitcher currentSlug={currentSlug} />
          <button
            type="button"
            aria-label={open ? ui.closeMenu : ui.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={cn("border-t border-white/10 lg:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {NAV_KEYS.map((key) => (
            <SiteLink
              key={key}
              to={pageUrl(lang, key)}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-sm font-medium text-primary-foreground/85"
              activeProps={{ className: "text-accent" }}
            >
              {NAV_LABELS[key][lang]}
            </SiteLink>
          ))}
          {phoneLines(lang).map((p) => (
            <a
              key={p.key}
              href={p.href}
              onClick={() => track("phone_click", { place: "mobile_menu", line: p.key })}
              className="py-3 text-sm font-semibold text-accent"
            >
              {p.number} — {p.label}
            </a>
          ))}

        </nav>
      </div>
    </header>
  );
}

function LangSwitcher({ currentSlug }: { currentSlug: string }) {
  const lang = useLang();

  return (
    <div className="flex items-center gap-1" aria-label="Language">
      {LANGS.map((l) => {
        const slug = slugForLang(currentSlug, lang, l);
        const className = cn(
          "rounded px-2 py-1 text-xs font-semibold uppercase transition-colors",
          l === lang ? "bg-accent text-accent-foreground" : "text-primary-foreground/70 hover:text-accent",
        );
        return slug ? (
          <SiteLink
            key={l}
            to={`/${l}/${slug}`}
            hrefLang={l}
            className={className}
            onClick={() => track("language_change", { from_language: lang, to_language: l })}
          >
            {l}
          </SiteLink>
        ) : (
          <SiteLink
            key={l}
            to={homeUrl(l)}
            hrefLang={l}
            className={className}
            onClick={() => track("language_change", { from_language: lang, to_language: l })}
          >
            {l}
          </SiteLink>
        );
      })}
    </div>
  );
}

/** Тот же документ на другом языке: находим ключ по текущему slug. */
function slugForLang(currentSlug: string, from: Lang, to: Lang): string | null {
  if (!currentSlug) return null;
  const resolved = resolveSlug(from, currentSlug);
  if (!resolved) return null;
  return alternateUrl(to, resolved).split("/")[2] ?? null;
}