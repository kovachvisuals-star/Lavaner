import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { SlugView, slugHead } from "@/components/site/SlugView";
import { REMOVED_SLUGS, resolveSlug, serviceUrl } from "@/lib/routes-map";

export const Route = createFileRoute("/en/$slug")({
  loader: ({ params }) => {
    const moved = REMOVED_SLUGS.en?.[params.slug];
    if (moved) throw redirect({ href: serviceUrl("en", moved), statusCode: 301 });

    const resolved = resolveSlug("en", params.slug);
    if (!resolved) throw notFound();
    return { resolved };
  },
  head: ({ params }) => slugHead("en", params.slug),
  component: EnglishSlug,
});

function EnglishSlug() {
  const { resolved } = Route.useLoaderData();
  return <SlugView lang="en" resolved={resolved} />;
}