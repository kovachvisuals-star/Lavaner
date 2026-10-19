import { ArrowRight } from "lucide-react";

import { BrandText } from "@/components/site/Brand";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { MobileCta } from "@/components/site/MobileCta";
import { QuoteForm } from "@/components/site/QuoteForm";
import { SiteLink } from "@/components/site/SiteLink";
import {
  CheckList,
  CtaBand,
  FaqList,
  PageHero,
  Section,
  SectionTitle,
  StepList,
} from "@/components/site/ui-blocks";
import { track } from "@/lib/analytics";
import {
  ADVANTAGES,
  CONTACT,
  GEOGRAPHY,
  PLACEHOLDERS,
  UI,
  phoneLines,
  type Lang,
} from "@/lib/i18n";
import { PAGES, type PageContent } from "@/lib/pages-content";
import { PHOTOS } from "@/lib/photos";
import { REAL_MEDIA } from "@/lib/project-media";
import { PROJECTS, PROJECTS_UI } from "@/lib/projects";
import type { ServiceKey } from "@/lib/routes-map";
import {
  ORDERED_SERVICE_KEYS,
  PAGE_SLUGS,
  SERVICE_KEYS,
  homeUrl,
  pageUrl,
  resolveSlug,
  serviceUrl,
  type PageKey,
  type Resolved,
} from "@/lib/routes-map";
import { breadcrumbJsonLd, buildHead, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import {
  DATA_NEEDED,
  RELATED,
  SERVICE_CONTENT,
  SERVICE_PHOTO,
  STAGES,
} from "@/lib/services-content";

const PAGE_PHOTO: Record<PageKey, string> = {
  services: PHOTOS.design04,
  business: PHOTOS.b2bHandover,
  private: PHOTOS.b2cHandover,
  projects: REAL_MEDIA.vannitubaValmis,
  about: PHOTOS.hero02,
  process: PHOTOS.processQuality,
  blog: PHOTOS.design03,
  contacts: PHOTOS.b2bHandover,
  privacy: PHOTOS.detailCarpentry,
  cookies: PHOTOS.detailCarpentry,
};

const NOINDEX_PAGES: PageKey[] = ["blog"];

/** Метаданные страницы по языку и slug. */
export function slugHead(lang: Lang, slug: string) {
  const resolved = resolveSlug(lang, slug);
  if (!resolved) {
    return { meta: [{ title: "404 | LAVANER OÜ" }, { name: "robots", content: "noindex" }] };
  }

  if (resolved.type === "service") {
    const c = SERVICE_CONTENT[resolved.key][lang];
    const url = serviceUrl(lang, resolved.key);
    return buildHead({
      lang,
      resolved,
      title: c.title,
      description: c.description,
      image: SERVICE_PHOTO[resolved.key],
      jsonLd: [
        serviceJsonLd({ name: c.h1, description: c.description, url, lang, image: SERVICE_PHOTO[resolved.key] }),
        faqJsonLd(c.faq),
        breadcrumbJsonLd([
          { name: UI[lang].breadcrumbHome, url: homeUrl(lang) },
          { name: UI[lang].allServices, url: pageUrl(lang, "services") },
          { name: c.h1, url },
        ]),
      ],
    });
  }

  const c = PAGES[resolved.key][lang];
  return buildHead({
    lang,
    resolved,
    title: c.title,
    description: c.description,
    image: PAGE_PHOTO[resolved.key],
    noindex: NOINDEX_PAGES.includes(resolved.key),
    jsonLd: [
      breadcrumbJsonLd([
        { name: UI[lang].breadcrumbHome, url: homeUrl(lang) },
        { name: c.h1, url: pageUrl(lang, resolved.key) },
      ]),
    ],
  });
}

export function SlugView({ lang, resolved }: { lang: Lang; resolved: NonNullable<Resolved> }) {
  return resolved.type === "service" ? (
    <ServicePage lang={lang} serviceKey={resolved.key} />
  ) : (
    <StaticPage lang={lang} pageKey={resolved.key} />
  );
}

function ServicePage({
  lang,
  serviceKey,
}: {
  lang: Lang;
  serviceKey: (typeof SERVICE_KEYS)[number];
}) {
  const c = SERVICE_CONTENT[serviceKey][lang];
  const ui = UI[lang];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: ui.allServices, slug: PAGE_SLUGS.services[lang] },
          { name: c.h1 },
        ]}
      />
      <PageHero title={c.h1} text={c.lead} image={SERVICE_PHOTO[serviceKey]} imageAlt={c.h1} priority />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionTitle title={ui.included} />
            <CheckList items={c.includes} />

            <div className="mt-12">
              <SectionTitle title={ui.forWhom} />
              <CheckList items={c.forWhom} />
            </div>

            <div className="mt-12">
              <SectionTitle title={ui.weSolve} />
              <CheckList items={c.solves} />
            </div>
          </div>

          <div className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-foreground">{ui.formTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{ui.formText}</p>
            <div className="mt-5">
              <QuoteForm compact place={`service:${serviceKey}`} />
            </div>
          </div>
        </div>
      </Section>

      <ServiceWorkExamples lang={lang} serviceKey={serviceKey} />

      <Section muted>
        <SectionTitle title={ui.stages} />
        <StepList items={STAGES[lang]} />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle title={ui.dataNeeded} as="h3" />
            <CheckList items={DATA_NEEDED[lang]} />
          </div>
          <div>
            <SectionTitle title={ui.advantages} as="h3" />
            <CheckList items={ADVANTAGES[lang]} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle title={ui.faq} />
        <FaqList items={c.faq} />

        <div className="mt-12">
          <SectionTitle title={ui.geography} text={GEOGRAPHY[lang]} as="h3" />
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-foreground">{ui.relatedServices}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED[serviceKey].map((key) => (
              <SiteLink
                key={key}
                to={serviceUrl(lang, key)}
                onClick={() =>
                  track("service_click", {
                    service_name: key,
                    destination_url: serviceUrl(lang, key),
                    place: "related_services",
                  })
                }
                className="flex items-center justify-between rounded border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
              >
                {SERVICE_CONTENT[key][lang].h1}
                <ArrowRight className="h-4 w-4 text-accent-foreground" />
              </SiteLink>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
      <MobileCta />
    </>
  );
}

const WORK_EXAMPLES_TEXT: Record<Lang, { title: string; intro: string; seeProject: string; more: string }> = {
  et: {
    title: "Näited meie tehtud töödest",
    intro: "Tutvuge fotodega töödest, mis on seotud selle teenusega. Iga näide sisaldab tegelikku tööde kirjeldust.",
    seeProject: "Vaata objekti",
    more: "Kõik tehtud tööd",
  },
  ru: {
    title: "Примеры выполненных работ",
    intro: "Посмотрите реальные объекты, связанные с этой услугой. У каждого примера есть описание выполненных работ.",
    seeProject: "Посмотреть объект",
    more: "Все выполненные работы",
  },
  en: {
    title: "Examples of our completed work",
    intro: "Explore genuine project photos relevant to this service, with details of the work carried out.",
    seeProject: "View project",
    more: "All completed works",
  },
};

function ServiceWorkExamples({ lang, serviceKey }: { lang: Lang; serviceKey: ServiceKey }) {
  const matching = PROJECTS.filter((project) => project.services.includes(serviceKey)).slice(0, 3);
  if (!matching.length) return null;
  const t = WORK_EXAMPLES_TEXT[lang];
  return (
    <Section muted>
      <SectionTitle title={t.title} text={t.intro} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {matching.map((project) => (
          <article key={project.id} className="overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={project.cover.src}
              alt={project.cover.alt[lang]}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-foreground">{project.name[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description[lang]}</p>
              <SiteLink
                to={`${pageUrl(lang, "projects")}#${project.id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-foreground underline-offset-4 hover:underline"
              >
                {t.seeProject} <ArrowRight className="h-4 w-4" />
              </SiteLink>
            </div>
          </article>
        ))}
      </div>
      <SiteLink
        to={pageUrl(lang, "projects")}
        className="mt-6 inline-flex items-center gap-2 font-semibold text-accent-foreground hover:underline"
      >
        {t.more} <ArrowRight className="h-4 w-4" />
      </SiteLink>
    </Section>
  );
}

function StaticPage({ lang, pageKey }: { lang: Lang; pageKey: PageKey }) {
  const c: PageContent = PAGES[pageKey][lang];
  const ui = UI[lang];

  return (
    <>
      <Breadcrumbs items={[{ name: c.h1 }]} />
      <PageHero title={c.h1} text={c.lead} image={PAGE_PHOTO[pageKey]} imageAlt={c.h1} priority />

      {pageKey === "services" ? <ServicesGrid lang={lang} /> : null}

      {pageKey === "process" ? (
        <Section>
          <SectionTitle title={ui.stages} />
          <StepList items={STAGES[lang]} />
          <div className="mt-12 max-w-3xl">
            <SectionTitle title={ui.dataNeeded} as="h3" />
            <CheckList items={DATA_NEEDED[lang]} />
          </div>
        </Section>
      ) : null}

      {c.blocks.length ? (
        <Section muted={pageKey !== "services"}>
          <div className="grid gap-12 lg:grid-cols-2">
            {c.blocks.map((block) => (
              <div key={block.heading}>
                <SectionTitle title={block.heading} text={block.text} />
                {block.items ? <CheckList items={block.items} /> : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {pageKey === "projects" ? <ProjectsBlock lang={lang} /> : null}

      {pageKey === "contacts" ? <ContactsBlock lang={lang} /> : null}

      {pageKey === "about" ? (
        <Section muted>
          <SectionTitle title={ui.advantages} />
          <CheckList items={ADVANTAGES[lang]} columns />
          <div className="mt-12 max-w-3xl">
            <SectionTitle title={ui.geography} text={GEOGRAPHY[lang]} as="h3" />
          </div>
        </Section>
      ) : null}

      {pageKey === "business" || pageKey === "private" ? (
        <>
          <Section>
            <SectionTitle title={ui.stages} />
            <StepList items={STAGES[lang]} />
          </Section>
          <Section muted>
            <SectionTitle title={ui.formTitle} text={ui.formText} />
            <div className="mt-8 max-w-3xl">
              <QuoteForm place={`page:${pageKey}`} />
            </div>
          </Section>
        </>
      ) : null}

      {pageKey === "privacy" || pageKey === "cookies" || pageKey === "contacts" ? null : <CtaBand />}
      <MobileCta />
    </>
  );
}

function ServicesGrid({ lang }: { lang: Lang }) {
  const ui = UI[lang];
  return (
    <Section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ORDERED_SERVICE_KEYS.map((key) => {
          const s = SERVICE_CONTENT[key][lang];
          return (
            <SiteLink
              key={key}
              to={serviceUrl(lang, key)}
              onClick={() =>
                track("service_click", {
                  service_name: key,
                  destination_url: serviceUrl(lang, key),
                  place: "services_overview",
                })
              }
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent"
            >
              <img
                src={SERVICE_PHOTO[key]}
                alt={s.h1}
                width={640}
                height={400}
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-base font-bold text-foreground">{s.h1}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.lead}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-foreground">
                  {ui.ctaSecondary} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </SiteLink>
          );
        })}
      </div>
    </Section>
  );
}

function ContactsBlock({ lang }: { lang: Lang }) {
  const ui = UI[lang];
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionTitle title={ui.footerContacts} />
          <ul className="mt-8 space-y-4 text-sm">
            {phoneLines(lang).map((p) => (
              <li key={p.key}>
                <a
                  href={p.href}
                  onClick={() => track("phone_click", { place: "contacts", line: p.key })}
                  className="font-semibold text-foreground hover:text-accent-foreground"
                >
                  {p.number}
                </a>
                <span className="block text-xs text-muted-foreground">{p.label}</span>
              </li>
            ))}
            <li>
              <a
                href={CONTACT.emailHref}
                onClick={() => track("email_click", { place: "contacts" })}
                className="font-semibold text-foreground hover:text-accent-foreground"
              >
                {CONTACT.email}
              </a>
              <span className="block text-xs text-muted-foreground">{ui.emailLabel}</span>
            </li>
            <li>
              <span className="font-semibold text-foreground">{ui.serviceAreaValue}</span>
              <span className="block text-xs text-muted-foreground">{ui.serviceAreaLabel}</span>
            </li>
            <li>
              <a
                href={CONTACT.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("google_business_click", {
                    place: "contacts",
                    link_url: CONTACT.googleBusinessUrl,
                  })
                }
                className="font-semibold text-accent-foreground underline"
              >
                {ui.googleProfile}
              </a>
              <span className="block text-xs text-muted-foreground">Google Business Profile</span>
            </li>
            <li className="pt-2 text-xs leading-relaxed text-muted-foreground">
              {ui.companyDetails}: <BrandText>{PLACEHOLDERS.legalName}</BrandText>
              <span className="block">{ui.registryCodeLabel}: {PLACEHOLDERS.registryCode}</span>
              <span className="block"><BrandText>{ui.sinceBadge}</BrandText></span>
              <span className="block">{ui.experienceBadge}</span>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">{ui.formTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{ui.formText}</p>
          <div className="mt-6">
            <QuoteForm place="contacts" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Список выполненных объектов с реальными фото и видео. */
function ProjectsBlock({ lang }: { lang: Lang }) {
  const t = PROJECTS_UI[lang];

  if (!PROJECTS.length) {
    return (
      <Section>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{t.empty}</p>
      </Section>
    );
  }

  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <article id={p.id} key={p.id} className="scroll-mt-24 overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={p.cover.src}
              alt={p.cover.alt[lang]}
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
            {p.imageBefore && p.imageAfter ? (
              <div className="grid grid-cols-2 gap-px bg-border">
                <figure className="bg-card">
                  <img
                    src={p.imageBefore}
                    alt={`${t.before}: ${p.cover.alt[lang]}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="px-3 py-2 text-xs text-muted-foreground">{t.before}</figcaption>
                </figure>
                <figure className="bg-card">
                  <img
                    src={p.imageAfter}
                    alt={`${t.after}: ${p.cover.alt[lang]}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="px-3 py-2 text-xs text-muted-foreground">{t.after}</figcaption>
                </figure>
              </div>
            ) : null}
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground">
                <BrandText>{p.name[lang]}</BrandText>
              </h2>
              <dl className="mt-3 grid gap-1 text-sm text-muted-foreground">
                {p.location ? (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-foreground">{t.location}:</dt>
                    <dd>{p.location}</dd>
                  </div>
                ) : null}
                {p.propertyType ? (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-foreground">{t.propertyType}:</dt>
                    <dd>{p.propertyType[lang]}</dd>
                  </div>
                ) : null}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description[lang]}</p>
              <h3 className="mt-5 text-sm font-semibold text-foreground">{t.works}</h3>
              <CheckList items={p.works[lang]} />
              <div className="mt-5 flex flex-wrap gap-2" aria-label={UI[lang].relatedServices}>
                {p.services.map((key) => (
                  <SiteLink
                    key={key}
                    to={serviceUrl(lang, key)}
                    className="rounded border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent-foreground"
                  >
                    {SERVICE_CONTENT[key][lang].h1}
                  </SiteLink>
                ))}
              </div>

              {p.gallery?.length ? (
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {p.gallery.map((img) => (
                    <li key={img.src}>
                      <img
                        src={img.src}
                        alt={img.alt[lang]}
                        loading="lazy"
                        width={600}
                        height={450}
                        className="aspect-[4/3] w-full rounded-md object-cover"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}

              {p.video ? (
                <figure className="mt-6">
                  <video
                    src={p.video.src}
                    poster={p.video.poster}
                    controls
                    muted
                    playsInline
                    preload="none"
                    width={720}
                    height={1280}
                    className="max-h-[520px] w-full rounded-md bg-muted object-contain"
                  />
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    {p.video.title[lang]}
                  </figcaption>
                </figure>
              ) : null}

              {p.services.length ? (
                <>
                  <h3 className="mt-5 text-sm font-semibold text-foreground">{t.related}</h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.services.map((key) => (
                      <li key={key}>
                        <SiteLink
                          to={serviceUrl(lang, key)}
                          onClick={() =>
                            track("project_click", {
                              project_name: p.id,
                              service_name: key,
                              destination_url: serviceUrl(lang, key),
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-foreground hover:text-accent-foreground"
                        >
                          {SERVICE_CONTENT[key][lang].h1}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </SiteLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}