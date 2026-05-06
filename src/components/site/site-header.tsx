import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { RiMenuLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { ThemeToggle } from "./theme-toggle"
import { Wordmark } from "./wordmark"

const NAV: { label: string; to: string }[] = [
  { label: "Games", to: "/games" },
  { label: "Devlog", to: "/devlog" },
  { label: "About", to: "/about" },
  { label: "Press", to: "/press" },
  { label: "Contact", to: "/contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Wordmark />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: false }}
              className="px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              activeProps={{ "data-status": "active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="outline" size="sm" render={<Link to="/games" />}>
            Wishlist
          </Button>
          <Button size="sm" render={<Link to="/contact" />}>
            Get in touch
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-sm"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <RiMenuLine />
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle>
                <Wordmark asLink={false} />
              </SheetTitle>
            </SheetHeader>
            <Separator />
            <nav className="flex flex-col gap-1 p-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Separator />
            <div className="flex flex-col gap-2 p-4">
              <ThemeToggle className="w-fit" />
              <Button
                variant="outline"
                size="sm"
                render={<Link to="/games" onClick={() => setMobileOpen(false)} />}
              >
                Wishlist
              </Button>
              <Button
                size="sm"
                render={<Link to="/contact" onClick={() => setMobileOpen(false)} />}
              >
                Get in touch
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
