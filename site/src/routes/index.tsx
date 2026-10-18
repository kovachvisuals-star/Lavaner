import { createFileRoute } from "@tanstack/react-router";

import { HomeView, homeHead } from "@/components/site/HomeView";

/** Главная страница — эстонская версия без языкового префикса. */
export const Route = createFileRoute("/")({
  head: () => homeHead("et"),
  component: EstonianHome,
});

function EstonianHome() {
  return <HomeView lang="et" />;
}