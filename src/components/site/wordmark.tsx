import { Link } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

export function Wordmark({
  className,
  asLink = true,
}: {
  className?: string
  asLink?: boolean
}) {
  const inner = (
    <span
      className={cn(
        "font-heading inline-flex items-center gap-2 text-sm font-medium tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-block size-2 rounded-none bg-primary"
      />
      <span>
        FatahChan
        <span className="text-muted-foreground"> / studio</span>
      </span>
    </span>
  )

  if (!asLink) return inner
  return (
    <Link to="/" className="outline-none focus-visible:ring-1 focus-visible:ring-ring/50">
      {inner}
    </Link>
  )
}
