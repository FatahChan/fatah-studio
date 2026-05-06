import { Link } from "@tanstack/react-router"

import { Separator } from "@/components/ui/separator"
import { studio } from "@/content/studio"

import { Wordmark } from "./wordmark"
import { NewsletterForm } from "./newsletter-form"
import { SocialIcon } from "./social-icon"

const FOOTER_NAV: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Studio",
    links: [
      { label: "Games", to: "/games" },
      { label: "Devlog", to: "/devlog" },
      { label: "About", to: "/about" },
      { label: "Press", to: "/press" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Press kit", to: "/press" },
      { label: "Newsletter", to: "/devlog" },
      { label: "Playground", to: "/playground" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:gap-8 md:px-8">
        <div className="flex flex-col gap-6 md:col-span-5">
          <Wordmark />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {studio.oneLiner}
          </p>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Subscribe to the devlog
            </span>
            <NewsletterForm />
          </div>
        </div>

        {FOOTER_NAV.map((group) => (
          <div key={group.heading} className="flex flex-col gap-3 md:col-span-2">
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {group.heading}
            </span>
            <ul className="flex flex-col gap-2">
              {group.links.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-xs text-foreground/80 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3 md:col-span-3">
          <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Elsewhere
          </span>
          <ul className="flex flex-wrap gap-2">
            {studio.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <SocialIcon kind={social.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${studio.contactEmail}`}
            className="mt-2 text-xs text-foreground/80 transition-colors hover:text-primary"
          >
            {studio.contactEmail}
          </a>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-[10px] tracking-[0.2em] text-muted-foreground uppercase md:flex-row md:items-center md:px-8">
        <span>
          {`\u00A9 ${new Date().getFullYear()}`} {studio.name}. All rights reserved.
        </span>
        <span>
          Made in {studio.location}
          <span aria-hidden> ·</span> Built on TanStack Start
        </span>
      </div>
    </footer>
  )
}
