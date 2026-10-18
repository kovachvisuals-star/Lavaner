import { createFileRoute, redirect } from "@tanstack/react-router";

import { LEGACY_SERVICE_SLUGS, pageUrl, serviceUrl } from "@/lib/routes-map";

/** Старые адреса услуг /services/:slug -> эстонские страницы услуг. */
export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    const key = LEGACY_SERVICE_SLUGS[params.slug];
    throw redirect({
      href: key ? serviceUrl("et", key) : pageUrl("et", "services"),
      statusCode: 301,
    });
  },
});