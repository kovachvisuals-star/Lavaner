import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "@/lib/routes-map";
import { PAUSED_ROBOTS, PAUSED_ROBOTS_TXT, SITE_PAUSED } from "@/lib/site-status";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const host = new URL(request.url).hostname.toLowerCase();
        // Keep the independent Cloudflare preview out of search results.
        // The primary domain remains crawlable and keeps its existing sitemap.
        const stagingHost = host.endsWith(".workers.dev") || host.endsWith(".pages.dev");
        const restricted = SITE_PAUSED || stagingHost;
        const body = SITE_PAUSED
          ? PAUSED_ROBOTS_TXT
          : stagingHost
            ? "User-agent: *\\nDisallow: /\\n"
            : `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
            ...(restricted ? { "X-Robots-Tag": PAUSED_ROBOTS } : {}),
          },
        });
      },
    },
  },
});