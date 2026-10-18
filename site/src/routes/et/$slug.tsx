import { createFileRoute, redirect } from "@tanstack/react-router";

import { etLegacyTarget } from "@/lib/routes-map";

/** Старые эстонские адреса /et/{slug} -> адрес без префикса. */
export const Route = createFileRoute("/et/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: etLegacyTarget(params.slug), statusCode: 301 });
  },
});