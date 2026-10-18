import { useRouterState } from "@tanstack/react-router";

import { DEFAULT_LANG, isLang, type Lang } from "./i18n";

/**
 * Текущий язык из URL.
 * Эстонский — без префикса (/korteri-remont-tallinn), русский и английский — /ru/..., /en/...
 */
export function useLang(): Lang {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLang(first) && first !== "et" ? first : DEFAULT_LANG;
}

/** Slug текущей страницы без языкового префикса. */
export function useCurrentSlug(): string {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLang(parts[0])) return parts[1] ?? "";
  return parts[0] ?? "";
}