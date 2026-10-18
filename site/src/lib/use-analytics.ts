import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { trackPageView } from "./analytics";

/**
 * page_view при SPA-навигации TanStack Router.
 * UTM-параметры сохраняются: отправляем path + search как есть.
 */
export function useAnalyticsPageViews() {
  const path = useRouterState({ select: (s) => s.location.pathname + s.location.searchStr });

  useEffect(() => {
    // небольшая задержка: заголовок страницы успевает обновиться
    const id = window.setTimeout(() => trackPageView(path), 300);
    return () => window.clearTimeout(id);
  }, [path]);
}