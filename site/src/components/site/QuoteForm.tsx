import { SiteLink } from "@/components/site/SiteLink";
import { useRef, useState, type FormEvent } from "react";

import { track } from "@/lib/analytics";
import { SITE_PAUSED } from "@/lib/site-status";
import { CONTACT, UI, type Lang } from "@/lib/i18n";
import { pageUrl } from "@/lib/routes-map";
import { useCurrentSlug, useLang } from "@/lib/use-lang";

const FORM: Record<
  Lang,
  {
    name: string;
    phone: string;
    email: string;
    work: string;
    workPlaceholder: string;
    consent: string;
    privacy: string;
    submit: string;
    required: string;
    success: string;
  }
> = {
  et: {
    name: "Nimi",
    phone: "Telefon",
    email: "E-post",
    work: "Millist tööd vajate?",
    workPlaceholder: "Nt korteri remont 60 m², vannitoa renoveerimine, äripinna viimistlus",
    consent: "Nõustun, et minu andmeid kasutatakse päringule vastamiseks",
    privacy: "Privaatsuspoliitika",
    submit: "Saada päring",
    required: "Palun täitke nimi ja telefon ning nõustuge andmetöötlusega.",
    success:
      "Aitäh! Päring on ette valmistatud teie e-posti programmis. Kui see ei avanenud, kirjutage info@lavaner.ee.",
  },
  ru: {
    name: "Имя",
    phone: "Телефон",
    email: "E-mail",
    work: "Какая работа вам нужна?",
    workPlaceholder: "Напр. ремонт квартиры 60 м², реновация ванной, отделка коммерческого помещения",
    consent: "Согласен на обработку данных для ответа на обращение",
    privacy: "Политика конфиденциальности",
    submit: "Отправить заявку",
    required: "Заполните имя и телефон и подтвердите согласие на обработку данных.",
    success:
      "Спасибо! Заявка подготовлена в вашей почтовой программе. Если она не открылась — напишите на info@lavaner.ee.",
  },
  en: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    work: "What work do you need?",
    workPlaceholder: "E.g. 60 m² apartment renovation, bathroom refit, commercial finishing",
    consent: "I agree to my data being used to answer this enquiry",
    privacy: "Privacy policy",
    submit: "Send enquiry",
    required: "Please fill in your name and phone and confirm the data consent.",
    success:
      "Thank you! The enquiry is prepared in your email client. If it did not open, write to info@lavaner.ee.",
  },
};

export function QuoteForm({ place = "page" }: { compact?: boolean; place?: string }) {
  const lang = useLang();
  const slug = useCurrentSlug();
  const t = FORM[lang];
  const ui = UI[lang];
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const started = useRef(false);

  /** form_start — только при первом взаимодействии с формой. */
  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_name: "quote_form", place, service_page: slug || "home" });
  }


  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (SITE_PAUSED) return; // inquiries disabled while site is paused
    const data = new FormData(e.currentTarget);
    if (data.get("company")) return; // honeypot
    if (!data.get("name") || !data.get("phone") || !data.get("consent")) {
      setError(true);
      return;
    }
    setError(false);

    const lines = [
      `${t.name}: ${data.get("name")}`,
      `${t.phone}: ${data.get("phone")}`,
      `${t.email}: ${data.get("email") || "—"}`,
      "",
      `${t.work}`,
      String(data.get("work") || "—"),
    ];
    const url = `${CONTACT.emailHref}?subject=${encodeURIComponent(
      "LAVANER — " + t.submit,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    track("email_click", {
      form_name: "quote_form",
      place,
      service_page: slug || "home",
    });
    window.location.href = url;
    setSent(true);
  }

  const field =
    "w-full rounded border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";
  const label = "mb-1.5 block text-xs font-medium text-foreground";

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      onInput={onFirstInteraction}
      className="grid gap-4 sm:grid-cols-2"
      noValidate
    >
      <div>
        <label htmlFor="qf-name" className={label}>
          {t.name} *
        </label>
        <input id="qf-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="qf-phone" className={label}>
          {t.phone} *
        </label>
        <input
          id="qf-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+372 ..."
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="qf-email" className={label}>
          {t.email}
        </label>
        <input
          id="qf-email"
          name="email"
          type="email"
          autoComplete="email"
          className={field}
          placeholder="name@example.com"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="qf-work" className={label}>
          {t.work}
        </label>
        <textarea
          id="qf-work"
          name="work"
          rows={3}
          className={field}
          placeholder={t.workPlaceholder}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="qf-company">Company</label>
        <input id="qf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" name="consent" className="mt-0.5" />
          <span>
            {t.consent} —{" "}
            <SiteLink
              to={pageUrl(lang, "privacy")}
              className="underline hover:text-accent-foreground"
            >
              {t.privacy}
            </SiteLink>
          </span>
        </label>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
        >
          {t.submit}
        </button>

        {error ? (
          <p role="alert" className="mt-3 text-xs font-medium text-destructive">
            {t.required}
          </p>
        ) : null}
        {sent ? (
          <p role="status" className="mt-3 text-xs font-medium text-foreground">
            {t.success}
          </p>
        ) : null}
        <p className="mt-3 text-xs text-muted-foreground">
          {ui.emailLabel}: {CONTACT.email} · {ui.serviceAreaValue}
        </p>
      </div>
    </form>
  );
}