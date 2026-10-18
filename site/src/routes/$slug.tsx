import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { SlugView, slugHead } from "@/components/site/SlugView";
import {
  ET_LEGACY_SLUGS,
  LEGACY_REDIRECTS,
  resolveSlug,
} from "@/lib/routes-map";

/** Эстонские страницы без языкового префикса: /korteri-remont-tallinn и т.д. */
export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const legacy = LEGACY_REDIRECTS[`/${params.slug}`] ?? ET_LEGACY_SLUGS[params.slug];
    if (legacy) throw redirect({ href: legacy, statusCode: 301 });

    const resolved = resolveSlug("et", params.slug);
    if (!resolved) throw notFound();
    return { resolved };
  },
  head: ({ params }) => slugHead("et", params.slug),
  component: EstonianSlug,
});

function EstonianSlug() {
  const { resolved } = Route.useLoaderData();
  return <SlugView lang="et" resolved={resolved} />;
}