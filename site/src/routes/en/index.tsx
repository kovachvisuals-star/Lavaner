import { createFileRoute } from "@tanstack/react-router";

import { HomeView, homeHead } from "@/components/site/HomeView";

export const Route = createFileRoute("/en/")({
  head: () => homeHead("en"),
  component: EnglishHome,
});

function EnglishHome() {
  return <HomeView lang="en" />;
}