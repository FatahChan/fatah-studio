import { createFileRoute, Link } from "@tanstack/react-router";
import { RiArrowRightLine, RiArrowRightUpLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/site/section-heading";
import { GameCard } from "@/components/site/game-card";
import { DevlogCard } from "@/components/site/devlog-card";
import { NewsletterForm } from "@/components/site/newsletter-form";
import {
  games,
  getFeaturedGame,
  STATUS_LABEL,
  type Game,
} from "@/content/games";
import { getLatestDevlog } from "@/content/devlog";
import { studio } from "@/content/studio";

export const Route = createFileRoute("/")({
  component: Home,
  headers: () => ({
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  }),
});

function Home() {
  const featured = getFeaturedGame();
  const otherGames = games.filter((g) => g.slug !== featured.slug).slice(0, 2);
  const latestDevlog = getLatestDevlog(2);

  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      <Hero featured={featured} />
      <FeaturedGameSection game={featured} />
      <GamesPreview items={[featured, ...otherGames]} />
      <StudioBlurb />
      <LatestDevlogSection posts={latestDevlog} />
      <NewsletterBand />
    </div>
  );
}

function Hero({ featured }: { featured: Game }) {
  return (
    <section className="relative -mt-14 overflow-hidden border-b border-border pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 50% at 80% 0%, color-mix(in oklch, var(--primary) 35%, transparent) 0%, transparent 70%), radial-gradient(50% 50% at 0% 80%, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 md:px-8 md:py-28 lg:py-36">
        <div className="flex items-center gap-3">
          <span className="size-2 animate-pulse rounded-none bg-primary" />
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // {studio.name} — EST. {studio.founded}
          </span>
        </div>

        <h1 className="font-heading max-w-5xl text-4xl leading-[1.02] font-medium text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Worlds in
          <br />
          the <span className="text-primary">making</span>.
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {studio.oneLiner} Three games in production, one studio that takes
          its time.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" render={<Link to="/games" />}>
            See our games
            <RiArrowRightLine data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" render={<Link to="/devlog" />}>
            Read the devlog
          </Button>
        </div>

        <Separator className="mt-8 max-w-xl" />

        <div className="grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
          <Stat label="Founded" value={studio.founded} />
          <Stat label="Team" value="Small & focused" />
          <Stat label="Based in" value={studio.location} />
          <Stat
            label="Now playing"
            value={featured.title}
            href="/games/$slug"
            slug={featured.slug}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  href,
  slug,
}: {
  label: string
  value: string
  href?: string
  slug?: string
}) {
  const content = (
    <>
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="font-heading text-sm font-medium text-foreground">
        {value}
      </span>
    </>
  );

  if (href === "/games/$slug" && slug) {
    return (
      <Link
        to="/games/$slug"
        params={{ slug }}
        className="flex flex-col gap-2 transition-colors hover:text-primary"
      >
        {content}
      </Link>
    );
  }
  return <div className="flex flex-col gap-2">{content}</div>;
}

function FeaturedGameSection({ game }: { game: Game }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="flex flex-col gap-6 md:col-span-5">
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // 01 — Featured
          </span>
          <h2 className="font-heading text-3xl leading-tight font-medium text-balance sm:text-4xl md:text-5xl">
            {game.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {game.synopsis}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase">
              {STATUS_LABEL[game.status]}
            </Badge>
            <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase">
              {game.releaseWindow}
            </Badge>
            <Badge variant="outline" className="text-[10px] tracking-[0.15em] uppercase">
              {game.genre}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button render={<Link to="/games/$slug" params={{ slug: game.slug }} />}>
              Game page
              <RiArrowRightUpLine data-icon="inline-end" />
            </Button>
            <Button variant="outline" render={<Link to="/devlog" />}>
              Latest devlog
            </Button>
          </div>
        </div>

        <div className="md:col-span-7">
          <AspectRatio
            ratio={16 / 10}
            className="relative overflow-hidden border border-border"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(80% 80% at 30% 20%, ${game.accent.from}, transparent 60%), linear-gradient(160deg, ${game.accent.from}, ${game.accent.to})`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 4px)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-foreground sm:p-10">
              <div className="flex items-center justify-between">
                {game.codename && (
                  <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                    {game.codename}
                  </span>
                )}
                <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  {game.releaseWindow}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <p className="max-w-md text-sm text-muted-foreground sm:text-base">
                  {game.tagline}
                </p>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}

function GamesPreview({ items }: { items: Game[] }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          kicker="// 02 — Slate"
          title="Three games in flight"
          description="A neon detective story, a wordless ink-and-paper climb, and a tactical roguelike about gilded armour. None of them rushed."
        />
        <Button variant="outline" render={<Link to="/games" />}>
          All games
          <RiArrowRightLine data-icon="inline-end" />
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}

function StudioBlurb() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-12 md:gap-12 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 md:col-span-5">
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // 03 — Studio
          </span>
          <h2 className="font-heading text-3xl leading-tight font-medium text-balance sm:text-4xl md:text-5xl">
            We make games
            <br />
            the <span className="text-primary">old way</span>.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {studio.story[0]}
          </p>
          <Button variant="outline" render={<Link to="/about" />} className="w-fit">
            About the studio
            <RiArrowRightUpLine data-icon="inline-end" />
          </Button>
        </div>

        <ul className="grid gap-4 md:col-span-7 md:grid-cols-1">
          {studio.values.map((value, index) => (
            <li
              key={value.title}
              className="grid gap-3 border-t border-border py-6 md:grid-cols-[auto_1fr] md:gap-8"
            >
              <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase md:w-24">
                0{index + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-medium sm:text-xl">
                  {value.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {value.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LatestDevlogSection({ posts }: { posts: ReturnType<typeof getLatestDevlog> }) {
  if (!posts.length) return null;
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          kicker="// 04 — Devlog"
          title="From the workbench"
          description="Long-form notes from the team — art, code, music, and the strange decisions in between."
        />
        <Button variant="outline" render={<Link to="/devlog" />}>
          All posts
          <RiArrowRightLine data-icon="inline-end" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <DevlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

function NewsletterBand() {
  return (
    <section className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-12 md:gap-12 md:px-8 md:py-24">
        <div className="flex flex-col gap-4 md:col-span-6">
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // 05 — Stay in the loop
          </span>
          <h2 className="font-heading text-3xl leading-tight font-medium text-balance sm:text-4xl">
            One letter, every month.
            <br />
            <span className="text-muted-foreground">No spam, no roadmap.</span>
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-4 md:col-span-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Get the studio newsletter — early devlogs, art drops, soundtrack
            previews, and the occasional invitation to a private playtest.
          </p>
          <NewsletterForm />
          <p className="text-[11px] text-muted-foreground">
            We keep your email to ourselves. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
