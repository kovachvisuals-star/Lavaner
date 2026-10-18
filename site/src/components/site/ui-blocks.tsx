import { SiteLink } from "@/components/site/SiteLink";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";

import { BrandText } from "@/components/site/Brand";
import { track } from "@/lib/analytics";
import { UI, phoneLines } from "@/lib/i18n";
import { pageUrl } from "@/lib/routes-map";
import { useLang } from "@/lib/use-lang";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  muted,
  id,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", muted && "bg-muted", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  text,
  center,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-foreground/70">{eyebrow}</p>
      ) : null}
      <Tag className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        <BrandText>{title}</BrandText>
      </Tag>
      {text ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          <BrandText>{text}</BrandText>
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  title,
  text,
  image,
  imageAlt = "",
  priority,
  children,
}: {
  title: string;
  text: string;
  image: string;
  imageAlt?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <img
        src={image}
        alt={imageAlt}
        aria-hidden={imageAlt ? undefined : "true"}
        width={1920}
        height={1080}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          <BrandText>{title}</BrandText>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
          <BrandText>{text}</BrandText>
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function CtaBand({ title, text }: { title?: string; text?: string }) {
  const lang = useLang();
  const ui = UI[lang];

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title ?? ui.formTitle}</h2>
          <p className="mt-3 text-primary-foreground/75">{text ?? ui.formText}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SiteLink
            to={pageUrl(lang, "contacts")}
            onClick={() =>
              track("quote_cta_click", { place: "cta_band", button_text: ui.ctaPrimary })
            }
            className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {ui.ctaPrimary} <ArrowRight className="h-4 w-4" />
          </SiteLink>
          {phoneLines(lang).map((p) => (
            <a
              key={p.key}
              href={p.href}
              onClick={() => track("phone_click", { place: "cta_band", line: p.key })}
              className="inline-flex flex-col rounded border border-white/25 px-6 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {p.number}
              <span className="text-[11px] font-normal text-primary-foreground/60">{p.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, columns }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={cn("mt-8 grid gap-4", columns && "sm:grid-cols-2")}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
            <Check className="h-3.5 w-3.5 text-accent-foreground" />
          </span>
          <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function StepList({ items }: { items: string[] }) {
  return (
    <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item} className="rounded-lg border border-border bg-card p-5">
          <span className="text-xs font-bold tracking-[0.2em] text-accent-foreground/70">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{item}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
            {item.q}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}