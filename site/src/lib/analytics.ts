// ---------------------------------------------------------------------------
// Единая точка аналитики LAVANER OÜ: Google Analytics 4 + Consent Mode v2.
//
// НАСТРОЙКА: реальный Measurement ID (G-XXXXXXXXXX) задаётся переменной
// окружения VITE_GA_MEASUREMENT_ID (секрет GOOGLE_ANALYTICS_MEASUREMENT_ID).
// Пока значение пустое — GA4 не загружается, события только в debug-консоль.
// ---------------------------------------------------------------------------

import { CONTACT } from "./i18n";

export const GA_MEASUREMENT_ID =
  ((import.meta.env['VITE_GA_MEASUREMENT_ID'] as string | undefined) ??
    (import.meta.env['VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID'] as string | undefined) ??
    "").trim();

/** Домены, на которых аналитика работает в «боевом» режиме. */
const PRODUCTION_HOSTS = ["lavaner.ee", "www.lavaner.ee"];

export const CONSENT_STORAGE_KEY = "lavaner_consent_v1";

export type ConsentChoice = "granted" | "denied";

export type TrackEvent =
  | "page_view"
  | "generate_lead"
  | "form_start"
  | "form_submit_error"
  | "phone_click"
  | "email_click"
  | "quote_cta_click"
  | "booking_click"
  | "google_business_click"
  | "service_click"
  | "language_change"
  | "project_click"
  | "external_link_click"
  // легаси-имена, используемые в существующих компонентах
  | "form_submit"
  | "cta_click"
  | "lang_switch";

/** Легаси-имена → официальные события GA4 (без дублей). */
const EVENT_ALIASES: Partial<Record<TrackEvent, TrackEvent>> = {
  // A generic form_submit event is not proof a lead was received.
  // Only the successful server-side receipt sends generate_lead.
  cta_click: "quote_cta_click",
  lang_switch: "language_change",
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

function isBrowser() {
  return typeof window !== "undefined";
}

/** Debug-режим: dev-сервер или ?ga_debug=1 в адресе. */
export function isDebug() {
  if (!isBrowser()) return false;
  if (import.meta.env.DEV) return true;
  return new URLSearchParams(window.location.search).has("ga_debug");
}

/** Отправлять ли данные в GA4: есть ID и это продакшн-домен (или debug). */
export function isAnalyticsEnabled() {
  if (!isBrowser() || !GA_MEASUREMENT_ID) return false;
  if (PRODUCTION_HOSTS.includes(window.location.hostname)) return true;
  return new URLSearchParams(window.location.search).has("ga_debug");
}

function gtag(...args: unknown[]) {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function readConsent(): ConsentChoice | null {
  if (!isBrowser()) return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Применить выбор пользователя (Consent Mode v2) и сохранить его. */
export function setConsent(choice: ConsentChoice) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* localStorage недоступен — работаем только в текущей сессии */
  }
  gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (isDebug()) console.info("[analytics] consent update:", choice);
}

/**
 * Инициализация GA4: вызывается один раз при монтировании приложения.
 * Скрипт грузится асинхронно и не блокирует рендер.
 */
export function initAnalytics() {
  if (!isBrowser() || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => gtag(...args));

  const stored = readConsent();

  // Consent Mode v2: по умолчанию всё запрещено до выбора посетителя.
  gtag("consent", "default", {
    analytics_storage: stored === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  if (!isAnalyticsEnabled()) {
    if (isDebug()) {
      console.info(
        "[analytics] GA4 не активен (нет VITE_GA_MEASUREMENT_ID или не продакшн-домен). События логируются в консоль.",
      );
    }
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    // page_view отправляем вручную при SPA-навигации, чтобы не было дублей
    send_page_view: false,
    anonymize_ip: true,
    ...(isDebug() ? { debug_mode: true } : {}),
  });
}

function currentLang(): string {
  if (!isBrowser()) return "et";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  return first === "ru" || first === "en" ? first : "et";
}

/** Общие параметры для каждого события. */
function baseParams() {
  if (!isBrowser()) return {};
  return {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    language: currentLang(),
  };
}

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (!isBrowser()) return;
  const name = EVENT_ALIASES[event] ?? event;
  const payload: Record<string, unknown> = { ...baseParams(), ...params };

  // Номер телефона в событии phone_click определяется по линии (et/ru)
  if (name === "phone_click" && !payload['phone_number'] && typeof payload['line'] === "string") {
    payload['phone_number'] = payload['line'] === "et" ? CONTACT.phoneEt : CONTACT.phoneRu;
  }

  // dataLayer остаётся доступным для GTM и внешних инструментов
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });

  if (isAnalyticsEnabled()) gtag("event", name, payload);
  if (isDebug()) console.info(`[analytics] ${name}`, payload);
}

let lastPageViewPath: string | null = null;

/** page_view при SPA-переходах; повторы для одного URL не отправляются. */
export function trackPageView(path: string, title?: string) {
  if (!isBrowser()) return;
  const location = window.location.origin + path;
  if (lastPageViewPath === path) return;
  lastPageViewPath = path;

  const payload = {
    page_path: path,
    page_location: location,
    page_title: title ?? document.title,
    language: currentLang(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view", ...payload });
  if (isAnalyticsEnabled()) gtag("event", "page_view", payload);
  if (isDebug()) console.info("[analytics] page_view", payload);
}