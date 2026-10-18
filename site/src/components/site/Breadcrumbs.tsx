import { SiteLink } from "@/components/site/SiteLink";
import { ChevronRight } from "lucide-react";

import { BrandText } from "@/components/site/Brand";
import { UI } from "@/lib/i18n";
import { homeUrl, langPrefix } from "@/lib/routes-map";
import { useLang } from "@/lib/use-lang";

export type Crumb = { name: string; slug?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const lang = useLang();
  const ui = UI[lang];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6">
        <li>
          <SiteLink to={homeUrl(lang)} className="transition-colors hover:text-accent-foreground">
            {ui.breadcrumbHome}
          </SiteLink>
        </li>
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            {item.slug && i < items.length - 1 ? (
              <SiteLink
                to={`${langPrefix(lang)}/${item.slug}`}
                className="transition-colors hover:text-accent-foreground"
              >
                <BrandText>{item.name}</BrandText>
              </SiteLink>
            ) : (
              <span aria-current="page" className="text-foreground">
                <BrandText>{item.name}</BrandText>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}