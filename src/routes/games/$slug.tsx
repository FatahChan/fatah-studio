import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RiArrowLeftLine, RiArrowRightUpLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { GameCard } from "@/components/site/game-card";
import { getGameBySlug, games, STATUS_LABEL } from "@/content/games";

export const Route = createFileRoute("/games/$slug")({
  component: GameDetail,
  loader: ({ params }) => {
    const game = getGameBySlug(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.game.title} — FatahChan Studio`,
          },
          { name: "description", content: loaderData.game.tagline },
        ]
      : [],
  }),
  notFoundComponent: GameNotFound,
});

function GameDetail() {
  const { game } = Route.useLoaderData();
  const others = games.filter((g) => g.slug !== game.slug);

  return (
    <article className="flex flex-col gap-20 sm:gap-24">
      <header className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(70% 60% at 80% 0%, ${game.accent.from}, transparent 60%), linear-gradient(180deg, ${game.accent.from}, ${game.accent.to})`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 4px)",
          }}
        />

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 text-foreground md:px-8 md:py-28 lg:py-36">
          <Link
            to="/games"
            className="inline-flex w-fit items-center gap-2 text-[10px] tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <RiArrowLeftLine className="size-3" /> All games
          </Link>

          {game.codename && (
            <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              {game.codename}
            </span>
          )}

          <h1
            className="font-heading max-w-4xl text-4xl leading-[1.05] font-medium text-balance text-foreground sm:text-6xl md:text-7xl"
            style={{ viewTransitionName: `game-title-${game.slug}` }}
          >
            {game.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {game.tagline}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-white/40 bg-black/20 text-[10px] tracking-[0.15em] text-foreground uppercase backdrop-blur-sm"
            >
              {STATUS_LABEL[game.status]}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/40 bg-black/20 text-[10px] tracking-[0.15em] text-foreground uppercase backdrop-blur-sm"
            >
              {game.releaseWindow}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/40 bg-black/20 text-[10px] tracking-[0.15em] text-foreground uppercase backdrop-blur-sm"
            >
              {game.genre}
            </Badge>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="flex flex-col gap-6 md:col-span-7">
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // Synopsis
          </span>
          <p className="text-base leading-relaxed text-foreground sm:text-lg">
            {game.synopsis}
          </p>
        </div>
        <aside className="flex flex-col gap-4 border-l border-border pl-6 md:col-span-5 md:pl-10">
          <Detail label="Status" value={STATUS_LABEL[game.status]} />
          <Detail label="Release window" value={game.releaseWindow} />
          <Detail label="Genre" value={game.genre} />
          <Detail label="Players" value={game.players} />
          <Detail
            label="Platforms"
            value={game.platforms.join(", ")}
          />
          {game.links?.steam && (
            <div className="flex flex-col gap-3 pt-4">
              <Button render={<a href={game.links.steam} target="_blank" rel="noreferrer noopener" />}>
                Wishlist on Steam
                <RiArrowRightUpLine data-icon="inline-end" />
              </Button>
              <Button variant="outline" render={<Link to="/press" />}>
                Press kit
              </Button>
            </div>
          )}
        </aside>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          // Pillars
        </span>
        <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-3">
          {game.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-3 bg-background p-6 md:p-8"
            >
              <h3 className="font-heading text-lg font-medium">
                {pillar.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          // Screens
        </span>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <AspectRatio
              key={i}
              ratio={16 / 10}
              className="relative overflow-hidden border border-border"
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(60% 60% at ${20 + i * 15}% ${20 + i * 10}%, ${game.accent.from}, transparent 70%), linear-gradient(${120 + i * 30}deg, ${game.accent.from}, ${game.accent.to})`,
                }}
              />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  Screen 0{i + 1}
                </span>
              </div>
            </AspectRatio>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Placeholder screens. Real captures coming closer to release.
        </p>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          // Also from the studio
        </span>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
            <GameCard key={other.slug} game={other} />
          ))}
        </div>
      </section>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}

function GameNotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-32 text-center md:px-8">
      <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
        // 404
      </span>
      <h1 className="font-heading text-3xl font-medium text-balance sm:text-4xl">
        That game does not exist yet.
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        We may not have announced it. Or you may be lost. Or both.
      </p>
      <Button render={<Link to="/games" />}>Back to all games</Button>
    </div>
  );
}
