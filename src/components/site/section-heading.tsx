import { cn } from "@/lib/utils"

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: {
  kicker?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
  as?: "h1" | "h2"
}) {
  const Title = as
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {kicker && (
        <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          {kicker}
        </span>
      )}
      <Title
        className={cn(
          "font-heading font-medium text-balance text-foreground",
          as === "h1"
            ? "text-3xl leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl"
            : "text-2xl leading-tight sm:text-3xl md:text-4xl",
        )}
      >
        {title}
      </Title>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
