import { createFileRoute, redirect } from "@tanstack/react-router";

/** Старый префикс /et больше не используется — 301 на корень. */
export const Route = createFileRoute("/et/")({
  beforeLoad: () => {
    throw redirect({ href: "/", statusCode: 301 });
  },
});