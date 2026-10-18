import { SiteLink } from "@/components/site/SiteLink";
import { Mail, MapPin, Phone } from "lucide-react";

import { Brand, BrandText } from "@/components/site/Brand";
import { Logo } from "@/components/site/Logo";
import { NAV_LABELS } from "./Header";
import { track } from "@/lib/analytics";
import { ACTIVE_SOCIALS, CONTACT, PLACEHOLDERS, UI, phoneLines } from "@/lib/i18n";
import { HOME } from "@/lib/pages-content";
import { PRIMARY_SERVICE_KEYS, pageUrl, serviceUrl } from "@/lib/routes-map";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { useLang } from "@/lib/use-lang";

const FOOTER_NAV = ["services", "business", "private", "process", "about", "projects", "blog", "contacts"] as const;

export function Footer() {
  const lang = useLang();
  const ui = UI[lang];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <Brand suffix className="text-lg font-bold tracking-[0.18em]" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70"><BrandText>{HOME[lang].description}</BrandText></p>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
            {UI[lang].serviceAreaValue}
          </p>
          <p className="mt-3 inline-block rounded border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent">
            <BrandText>{ui.sinceBadge}</BrandText>
          </p>
          <p className="mt-2 inline-block rounded border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent">
            {ui.experienceBadge}
          </p>
          {ACTIVE_SOCIALS.length ? (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {ACTIVE_SOCIALS.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={() =>
                      track(s.key === "google" ? "google_business_click" : "external_link_click", {
                        place: "footer",
                        link_url: s.url,
                        link_text: s.label,
                      })
                    }
                    className="text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-xs text-primary-foreground/50">{ui.socialPending}</p>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.14em] text-accent">
            {ui.footerServices.toUpperCase()}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {PRIMARY_SERVICE_KEYS.map((key) => (
              <li key={key}>
                <SiteLink
                  to={serviceUrl(lang, key)}
                  className="transition-colors hover:text-accent"
                >
                  {SERVICE_CONTENT[key][lang].h1}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.14em] text-accent">
            {ui.footerNav.toUpperCase()}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {FOOTER_NAV.map((key) => (
              <li key={key}>
                <SiteLink
                  to={pageUrl(lang, key)}
                  className="transition-colors hover:text-accent"
                >
                  {NAV_LABELS[key][lang]}
                </SiteLink>
              </li>
            ))}
            <li>
              <SiteLink
                to={pageUrl(lang, "privacy")}
                className="transition-colors hover:text-accent"
              >
                {NAV_LABELS.privacy[lang]}
              </SiteLink>
            </li>
            <li>
              <SiteLink
                to={pageUrl(lang, "cookies")}
                className="transition-colors hover:text-accent"
              >
                {NAV_LABELS.cookies[lang]}
              </SiteLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.14em] text-accent">
            {ui.footerContacts.toUpperCase()}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            {phoneLines(lang).map((p) => (
              <li key={p.key}>
                <a
                  href={p.href}
                  onClick={() => track("phone_click", { place: "footer", line: p.key })}
                  className="flex items-start gap-2 transition-colors hover:text-accent"
                >
                  <Phone className="mt-0.5 h-4 w-4 text-accent" />
                  <span>
                    {p.number}
                    <span className="block text-xs text-primary-foreground/50">{p.label}</span>
                  </span>
                </a>
              </li>
            ))}

            <li>
              <a
                href={CONTACT.emailHref}
                onClick={() => track("email_click", { place: "footer" })}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{ui.serviceAreaValue}</span>
            </li>
          </ul>
          <div className="mt-5 space-y-1 text-xs leading-relaxed text-primary-foreground/45">
            <p>{ui.companyDetails}: <BrandText>{PLACEHOLDERS.legalName}</BrandText></p>
            <p><BrandText>{ui.sinceBadge}</BrandText></p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/50 sm:px-6">
          © {new Date().getFullYear()} <Brand suffix />
        </div>
      </div>
    </footer>
  );
}