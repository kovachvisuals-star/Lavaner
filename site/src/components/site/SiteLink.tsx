import { Link } from "@tanstack/react-router";
import type { ComponentType, ReactNode } from "react";

import type { Lang } from "@/lib/i18n";
import {
  homeUrl,
  pageUrl,
  serviceUrl,
  type PageKey,
  type ServiceKey,
} from "@/lib/routes-map";

/**
 * Единая ссылка по всему сайту.
 * Эстонские адреса без языкового префикса (/korteri-remont-tallinn),
 * русские и английские — с префиксом (/ru/..., /en/...).
 */
const AnyLink = Link as unknown as ComponentType<Record<string, unknown>>;

export type SiteLinkProps = {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  activeProps?: Record<string, unknown>;
  "aria-label"?: string;
  title?: string;
  hrefLang?: string;
};

export function SiteLink({ to, children, ...rest }: SiteLinkProps) {
  return (
    <AnyLink to={to} {...rest}>
      {children}
    </AnyLink>
  );
}

export const hrefHome = (lang: Lang) => homeUrl(lang);
export const hrefPage = (lang: Lang, key: PageKey) => pageUrl(lang, key);
export const hrefService = (lang: Lang, key: ServiceKey) => serviceUrl(lang, key);