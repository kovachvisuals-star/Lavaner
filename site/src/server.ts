import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { PAUSED_ROBOTS, PAUSED_ROBOTS_TXT, SITE_PAUSED, renderPausedPage } from "./lib/site-status";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    // Канонизация: www/http -> https://lavaner.ee, без завершающего слэша.
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    if (host === "lavaner.ee" || host === "www.lavaner.ee") {
      const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
      let path = url.pathname;
      if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, "") || "/";
      if (host !== "lavaner.ee" || proto === "http" || path !== url.pathname) {
        return Response.redirect(`https://lavaner.ee${path}${url.search}`, 301);
      }
    }
    if (SITE_PAUSED) {
      const p = url.pathname;
      const robotsHeaders = { "X-Robots-Tag": PAUSED_ROBOTS, "Cache-Control": "no-store" };
      if (p === "/robots.txt") {
        return new Response(PAUSED_ROBOTS_TXT, {
          headers: { "Content-Type": "text/plain; charset=utf-8", ...robotsHeaders },
        });
      }
      if (p === "/sitemap.xml") {
        return new Response("Not found", { status: 404, headers: robotsHeaders });
      }
      if (!/\.[a-z0-9]+$/i.test(p)) {
        // 200 (not 503) so Google actually reads and applies the noindex.
        return new Response(renderPausedPage(p), {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8", ...robotsHeaders },
        });
      }
    }
    try {
      const handler = await getServerEntry();
      let response = await handler.fetch(request, env, ctx);
      if (SITE_PAUSED) {
        response = new Response(response.body, response);
        response.headers.set("X-Robots-Tag", PAUSED_ROBOTS);
      }
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};