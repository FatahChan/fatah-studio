import { Link } from "@tanstack/react-router"
import { RiArrowRightUpLine } from "@remixicon/react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DevlogPost } from "@/content/devlog"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function DevlogCard({
  post,
  className,
}: {
  post: DevlogPost
  className?: string
}) {
  return (
    <Card
      className={cn(
        "hover:scale-101 py-4 group/devlog ring-0 transition-all hover:ring-1 hover:ring-primary/40 shadow-lg",
        className,
      )}
    >
      <Link
        to="/devlog/$slug"
        params={{ slug: post.slug }}
        className="flex h-full flex-col"
      >
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {formatDate(post.date)} · {post.author}
            </span>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] uppercase">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <CardTitle className="text-base leading-snug sm:text-lg">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 pb-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors group-hover/devlog:text-primary">
            Read post
            <RiArrowRightUpLine className="size-3.5" aria-hidden />
          </span>
        </CardContent>
      </Link>
    </Card>
  )
}
