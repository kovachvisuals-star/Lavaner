import { SiteLink } from "@/components/site/SiteLink";
import { MessageSquare, Phone } from "lucide-react";

import { track } from "@/lib/analytics";
import { UI, primaryPhone } from "@/lib/i18n";
import { pageUrl } from "@/lib/routes-map";
import { useLang } from "@/lib/use-lang";

/** Постоянная панель действий на мобильных: звонок и заявка. */
export function MobileCta() {
  const lang = useLang();
  const ui = UI[lang];
  const phone = primaryPhone(lang);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background p-2 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] lg:hidden">
      <a
        href={phone.href}
        onClick={() => track("phone_click", { place: "mobile_bar", line: phone.key })}
        className="flex flex-col items-center justify-center rounded border border-primary/25 bg-primary py-2.5 text-sm font-bold text-primary-foreground"
      >
        <span className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-accent" />
          {ui.call}
        </span>
        <span className="text-[11px] font-normal text-primary-foreground/60">{phone.label}</span>
      </a>
      <SiteLink
        to={pageUrl(lang, "contacts")}
        onClick={() => track("quote_cta_click", { place: "mobile_bar", button_text: ui.ctaQuote })}
        className="flex items-center justify-center gap-2 rounded bg-accent py-2.5 text-center text-sm font-bold text-accent-foreground"
      >
        <MessageSquare className="h-4 w-4" />
        {ui.ctaQuote}
      </SiteLink>
    </div>
  );
}