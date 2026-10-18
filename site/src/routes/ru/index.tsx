import { createFileRoute } from "@tanstack/react-router";

import { HomeView, homeHead } from "@/components/site/HomeView";

export const Route = createFileRoute("/ru/")({
  head: () => homeHead("ru"),
  component: RussianHome,
});

function RussianHome() {
  return <HomeView lang="ru" />;
}