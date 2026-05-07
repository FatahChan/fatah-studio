import { Link } from "@tanstack/react-router"
import { RiArrowRightUpLine } from "@remixicon/react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import { STATUS_LABEL, type Game } from "@/content/games"

export function GameCard({ game, className }: { game: Game; className?: string }) {
  return (
    <Card
      className={cn(
        "hover:scale-101 group/game relative ring-0 transition-all hover:ring-1 hover:ring-primary/40 shadow-lg",
        className,
      )}
    >
      <Link
        to="/games/$slug"
        params={{ slug: game.slug }}
        className="flex h-full flex-col gap-4"
      >
        <AspectRatio
          ratio={4 / 5}
          className="relative w-full overflow-hidden border-b border-border"
        >
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover/game:scale-[1.03]"
            style={{
              background: `radial-gradient(120% 80% at 20% 0%, ${game.accent.from}, transparent 60%), linear-gradient(180deg, ${game.accent.from}, ${game.accent.to})`,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 4px)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              {game.codename && (
                <span className="font-heading text-[10px] tracking-[0.25em] text-muted uppercase">
                  {game.codename}
                </span>
              )}
              <Badge
                variant="outline"
                className="border-muted-foreground bg-muted text-[10px] tracking-[0.15em] text-foreground uppercase backdrop-blur-sm"
              >
                {STATUS_LABEL[game.status]}
              </Badge>
            </div>
            <h3
              className="font-heading text-2xl leading-tight font-medium text-primary-foreground sm:text-3xl"
              style={{ viewTransitionName: `game-title-${game.slug}` }}
            >
              {game.title}
            </h3>
          </div>
        </AspectRatio>

        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {game.genre}
            </span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {game.releaseWindow}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 pb-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {game.tagline}
          </p>
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors group-hover/game:text-primary">
            View game
            <RiArrowRightUpLine className="size-3.5" aria-hidden />
          </span>
        </CardContent>
      </Link>
    </Card>
  )
}
