import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieConsent } from "@/components/site/CookieConsent";
import { useAnalyticsPageViews } from "@/lib/use-analytics";
import { DEFAULT_LANG, UI, isLang, type Lang } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <title>404 | LAVANER OÜ</title>
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Lehte ei leitud · Страница не найдена · Page not found
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            <span className="notranslate" translate="no">LAVANER OÜ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(
      error instanceof Error ? error : new Error(String(error)),
      { boundary: "tanstack_root_error_component" },
    );
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/** Код подтверждения Google Search Console: задать VITE_GOOGLE_SITE_VERIFICATION. */
const GSC_VERIFICATION = import.meta.env['VITE_GOOGLE_SITE_VERIFICATION'] as string | undefined;

/** Действующая верификация Search Console — не удалять. */
const GSC_TOKEN = "0wC7xXbsPgK5w6noOo2waTcV96GHKq9sSpBpt2-F9nA";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "LAVANER OÜ" },
      { name: "apple-mobile-web-app-title", content: "LAVANER" },
      { name: "application-name", content: "LAVANER" },
      { property: "og:site_name", content: "LAVANER OÜ" },
      { name: "theme-color", content: "#0F1A24" },
      { name: "google-site-verification", content: GSC_TOKEN },
      ...(GSC_VERIFICATION && GSC_VERIFICATION !== GSC_TOKEN
        ? [{ name: "google-site-verification", content: GSC_VERIFICATION }]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/icon-192.png", sizes: "192x192" },
      { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
      { rel: "icon", type: "image/png", href: "/favicon-48x48.png", sizes: "48x48" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function useCurrentLang(): Lang {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLang(first) && first !== "et" ? first : DEFAULT_LANG;
}

function RootShell({ children }: { children: ReactNode }) {
  const lang = useCurrentLang();
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const lang = useCurrentLang();
  useAnalyticsPageViews();


  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
        >
          {UI[lang].skipToContent}
        </a>
        <Header />
        <main id="main" className="flex-1 pb-14 lg:pb-0">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </QueryClientProvider>
  );
}