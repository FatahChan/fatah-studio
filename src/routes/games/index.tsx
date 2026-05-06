import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { GameCard } from "@/components/site/game-card";
import { games, type GameStatus } from "@/content/games";
import { cn } from "@/lib/utils";

const filterSchema = z.object({
  status: z
    .enum(["all", "announced", "in-development", "released"])
    .optional(),
});

export const Route = createFileRoute("/games/")({
  component: GamesIndex,
  validateSearch: filterSchema,
  head: () => ({
    meta: [
      { title: "Games — FatahChan Studio" },
      {
        name: "description",
        content: "All upcoming and current games from FatahChan Studio.",
      },
    ],
  }),
});

const FILTERS: { id: "all" | GameStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-development", label: "In Development" },
  { id: "announced", label: "Announced" },
  { id: "released", label: "Released" },
];

function GamesIndex() {
  const { status = "all" } = Route.useSearch();
  const filtered = useMemo(() => {
    if (status === "all") return games;
    return games.filter((g) => g.status === status);
  }, [status]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <SectionHeading
        as="h1"
        kicker="// Games"
        title="The slate."
        description="Three handcrafted titles, each at a different point in development. We will share more as they are ready to be seen."
      />

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {FILTERS.map((filter) => {
          const active = status === filter.id;
          return (
            <Button
              key={filter.id}
              size="sm"
              variant={active ? "default" : "outline"}
              render={
                <Link
                  to="/games"
                  search={{ status: filter.id }}
                  className={cn(active && "pointer-events-auto")}
                />
              }
            >
              {filter.label}
            </Button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Nothing in this category yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
