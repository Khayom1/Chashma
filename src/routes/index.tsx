import { createFileRoute } from "@tanstack/react-router";
import { ChashmaGame } from "@/game/ChashmaGame";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ChashmaGame />;
}
