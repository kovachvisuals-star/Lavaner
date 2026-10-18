import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { SlugView, slugHead } from "@/components/site/SlugView";
import { REMOVED_SLUGS, resolveSlug, serviceUrl } from "@/lib/routes-map";

export const Route = createFileRoute("/ru/$slug")({
  loader: ({ params }) => {
    const moved = REMOVED_SLUGS.ru?.[params.slug];
    if (moved) throw redirect({ href: serviceUrl("ru", moved), statusCode: 301 });

    const resolved = resolveSlug("ru", params.slug);
    if (!resolved) throw notFound();
    return { resolved };
  },
  head: ({ params }) => slugHead("ru", params.slug),
  component: RussianSlug,
});

function RussianSlug() {
  const { resolved } = Route.useLoaderData();
  return <SlugView lang="ru" resolved={resolved} />;
}