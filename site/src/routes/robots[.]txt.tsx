import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "@/lib/routes-map";
import { PAUSED_ROBOTS, PAUSED_ROBOTS_TXT, SITE_PAUSED } from "@/lib/site-status";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const body = SITE_PAUSED
          ? PAUSED_ROBOTS_TXT
          : `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            ...(SITE_PAUSED ? { "X-Robots-Tag": PAUSED_ROBOTS } : {}),
          },
        });
      },
    },
  },
});