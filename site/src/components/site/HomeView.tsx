import { ArrowRight, Check, Phone } from "lucide-react";

import { BrandText } from "@/components/site/Brand";
import { MobileCta } from "@/components/site/MobileCta";
import { QuoteForm } from "@/components/site/QuoteForm";
import { SiteLink } from "@/components/site/SiteLink";
import { CtaBand, PageHero, Section, SectionTitle } from "@/components/site/ui-blocks";
import { track } from "@/lib/analytics";
import { CONTACT, PLACEHOLDERS, UI, primaryPhone, type Lang } from "@/lib/i18n";
import { HOME } from "@/lib/pages-content";
import { PHOTOS } from "@/lib/photos";
import { REAL_MEDIA } from "@/lib/project-media";
import { homeUrl, pageUrl, serviceUrl } from "@/lib/routes-map";
import { SALES } from "@/lib/sales-content";
import { breadcrumbJsonLd, buildHead, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/** Метаданные главной страницы языковой версии. */
export function homeHead(lang: Lang) {
  const c = HOME[lang];
  return buildHead({
    lang,
    resolved: null,
    title: c.title,
    description: c.description,
    image: PHOTOS.hero01,
    jsonLd: [
      websiteJsonLd(lang),
      organizationJsonLd(lang),
      breadcrumbJsonLd([{ name: UI[lang].breadcrumbHome, url: homeUrl(lang) }]),
    ],
  });
}

/** Реальные фото объектов для блока портфолио (порядок совпадает с подписями SALES.works). */
const WORK_MEDIA: { src: string; alt: Record<Lang, string> }[] = [
  {
    src: REAL_MEDIA.eramuteEhitusTalvel,
    alt: {
      et: "Ehitusjärgus eramud paigaldatud katuse ja puidust välisvoodriga",
      ru: "Строящиеся частные дома с готовой кровлей и деревянной обшивкой",
      en: "Detached houses under construction with roof and wooden cladding",
    },
  },
  {
    src: REAL_MEDIA.eramuValisviimistlus,
    alt: {
      et: "Eramu välisviimistlustööd tellingutelt",
      ru: "Наружные отделочные работы частного дома с лесов",
      en: "Exterior finishing works from scaffolding",
    },
  },
  {
    src: REAL_MEDIA.siseviimistlusPuitvooder,
    alt: {
      et: "Siseviimistlus: valge puitvooder ja tellisviimistlusega kamin",
      ru: "Внутренняя отделка: белая деревянная обшивка и камин с кирпичной отделкой",
      en: "Interior finishing: white timber cladding and a brick-faced fireplace",
    },
  },
  {
    src: REAL_MEDIA.mahutiPaigaldus,
    alt: {
      et: "Kanalisatsioonimahuti tõstetööd objektil",
      ru: "Подъём канализационной ёмкости на объекте",
      en: "Lifting a sewage tank on site",
    },
  },
  {
    src: REAL_MEDIA.vannitubaValmis,
    alt: {
      et: "Renoveeritud vannituba kahe valamu ja valgustusega peeglitega",
      ru: "Отремонтированная ванная комната с двумя раковинами и зеркалами с подсветкой",
      en: "Renovated bathroom with two basins and illuminated mirrors",
    },
  },
  {
    src: REAL_MEDIA.terrassiEhitus,
    alt: {
      et: "Puidust terrassi ehitus eramule",
      ru: "Строительство деревянной террасы для частного дома",
      en: "Wooden terrace construction at a detached house",
    },
  },
];

export function HomeView({ lang }: { lang: Lang }) {
  const s = SALES[lang];
  const ui = UI[lang];
  const phone = primaryPhone(lang);

  const QuoteLink = ({ place, label }: { place: string; label?: string }) => (
    <SiteLink
      to={pageUrl(lang, "contacts")}
      onClick={() => track("cta_click", { place })}
      className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
    >
      {label ?? ui.ctaFreeQuote} <ArrowRight className="h-4 w-4" />
    </SiteLink>
  );

  return (
    <>
      <PageHero title={s.heroTitle} text={s.heroText} image={PHOTOS.hero01} imageAlt={s.heroTitle} priority>
        <div className="flex flex-wrap gap-3">
          <SiteLink
            to={pageUrl(lang, "contacts")}
            onClick={() => track("quote_cta_click", { place: "hero", button_text: ui.ctaQuote })}
            className="inline-flex items-center gap-2 rounded bg-accent px-7 py-3.5 text-base font-bold text-accent-foreground"
          >
            {ui.ctaQuote} <ArrowRight className="h-4 w-4" />
          </SiteLink>
          <SiteLink
            to={pageUrl(lang, "services")}
            onClick={() => track("service_click", { service_name: "services_overview", destination_url: pageUrl(lang, "services"), place: "hero" })}
            className="inline-flex items-center gap-2 rounded border border-white/30 px-7 py-3.5 text-base font-bold hover:border-accent hover:text-accent"
          >
            {s.ctaServices} <ArrowRight className="h-4 w-4" />
          </SiteLink>
          <a
            href={phone.href}
            onClick={() => track("phone_click", { place: "hero", line: phone.key })}
            className="inline-flex items-center gap-2 rounded border border-white/30 px-7 py-3.5 text-base font-bold hover:border-accent hover:text-accent"
          >
            <Phone className="h-4 w-4" />
            {ui.call} {phone.number}
          </a>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
          {s.heroPoints.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-primary-foreground/85">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              {p}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Аргументы доверия */}
      <Section>
        <SectionTitle title={s.trustHeading} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.trust.map((t) => (
            <div key={t.title} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="h-3.5 w-3.5 text-accent-foreground" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Категории услуг */}
      <Section muted>
        <SectionTitle title={s.servicesHeading} text={s.servicesText} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.services.map((item) => (
            <SiteLink
              key={item.key}
              to={serviceUrl(lang, item.key)}
              onClick={() =>
                track("service_click", {
                  service_name: item.key,
                  destination_url: serviceUrl(lang, item.key),
                  place: "home_services",
                })
              }
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-foreground">
                {ui.ctaSecondary} <ArrowRight className="h-4 w-4" />
              </span>
            </SiteLink>
          ))}
        </div>
        <div className="mt-8">
          <QuoteLink place="services" />
        </div>
      </Section>

      {/* Проектирование и дизайн */}
      <Section>
        <SectionTitle title={s.designHeading} text={s.designTitle} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.designText}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {s.designItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <ol className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-semibold text-accent-foreground">
              {s.designFlow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5">{step}</span>
                  {i < s.designFlow.length - 1 ? (
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <QuoteLink place="design" label={s.designCta} />
            </div>
          </div>
          <img
            src={PHOTOS.design04}
            alt={s.designHeading}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-64 w-full rounded-lg border border-border object-cover lg:h-full"
          />
        </div>
      </Section>

      {/* Блок для бизнес-клиентов */}
      <Section>
        <div className="grid gap-8 rounded-lg border border-border bg-card p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{s.b2bHeading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.b2bText}</p>
            <ul className="mt-6 space-y-2">
              {s.b2bPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <QuoteLink place="b2b_maintenance" label={s.b2bCta} />
            </div>
          </div>
          <img
            src={PHOTOS.b2bOffice}
            alt={s.b2bHeading}
            width={800}
            height={560}
            loading="lazy"
            decoding="async"
            className="h-56 w-full rounded-lg object-cover lg:h-full"
          />
        </div>
      </Section>

      {/* Miks valida Lavaner */}
      <Section>
        <SectionTitle title={s.whyHeading} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.why.map((w, i) => (
            <div key={w.title} className="rounded-lg border border-border bg-card p-5">
              <span className="text-xs font-bold tracking-[0.2em] text-accent-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-bold text-foreground">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <QuoteLink place="why" />
        </div>
      </Section>

      {/* Процесс */}
      <Section muted>
        <SectionTitle title={s.processHeading} text={s.processText} />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.process.map((step, i) => (
            <li key={step} className="rounded-lg border border-border bg-card p-5">
              <span className="text-xs font-bold tracking-[0.2em] text-accent-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <QuoteLink place="process" />
        </div>
      </Section>

      {/* Портфолио */}
      <Section>
        <SectionTitle title={s.worksHeading} text={s.worksText} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.works.map((w, i) => (
            <figure key={w.caption} className="overflow-hidden rounded-lg border border-border">
              <img
                src={WORK_MEDIA[i]?.src ?? WORK_MEDIA[0].src}
                alt={(WORK_MEDIA[i] ?? WORK_MEDIA[0]).alt[lang]}
                width={800}
                height={560}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover"
              />
              <figcaption className="bg-card px-4 py-3 text-sm font-semibold text-foreground">
                {w.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8">
          <QuoteLink place="works" />
        </div>
      </Section>

      {/* Доверие: реквизиты */}
      <Section muted>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground">{s.companyHeading}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{s.companyNote}</p>
            <dl className="mt-5 space-y-2 text-sm text-foreground">
              <div>
                <dt className="inline text-muted-foreground">Ettevõte: </dt>
                <dd className="inline font-semibold"><BrandText>{PLACEHOLDERS.legalName}</BrandText></dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">{ui.serviceAreaLabel}: </dt>
                <dd className="inline font-semibold">{ui.serviceAreaValue}</dd>
              </div>
            </dl>
            <p className="mt-4 inline-block rounded border border-accent/50 bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent-foreground">
              <BrandText>{ui.sinceBadge}</BrandText>
            </p>
            <p className="mt-2 inline-block rounded border border-accent/50 bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent-foreground">
              {ui.experienceBadge}
            </p>
            <p className="mt-4 text-sm">
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("google_business_click", { place: "home_company", link_url: CONTACT.mapsUrl })
                }
                className="font-semibold text-accent-foreground underline"
              >
                {s.mapLabel}
              </a>
            </p>
          </div>

          <div id="quote" className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground">{ui.ctaFreeQuote}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{ui.formText}</p>
            <div className="mt-6">
              <QuoteForm place="home" />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand />
      <MobileCta />
    </>
  );
}