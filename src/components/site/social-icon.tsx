import {
  RiTwitterXLine,
  RiDiscordLine,
  RiYoutubeLine,
  RiGithubLine,
  RiInstagramLine,
} from "@remixicon/react"

import type { SocialIcon as SocialIconKind } from "@/content/studio"

export function SocialIcon({
  kind,
  className,
}: {
  kind: SocialIconKind
  className?: string
}) {
  switch (kind) {
    case "twitter":
      return <RiTwitterXLine className={className} aria-hidden />
    case "discord":
      return <RiDiscordLine className={className} aria-hidden />
    case "youtube":
      return <RiYoutubeLine className={className} aria-hidden />
    case "github":
      return <RiGithubLine className={className} aria-hidden />
    case "instagram":
      return <RiInstagramLine className={className} aria-hidden />
    case "bluesky":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={className}
          fill="currentColor"
        >
          <path d="M5.6 4.5C8.45 6.6 11.5 10.85 12 13.05c.5-2.2 3.55-6.45 6.4-8.55 2.05-1.5 5.4-2.65 5.4 1.15 0 .76-.43 6.36-.69 7.27-.88 3.18-4.15 4-7.05 3.5 5.07.84 6.36 3.66 3.57 6.48-5.3 5.36-7.62-1.34-8.22-3.06-.11-.32-.16-.46-.16-.34 0-.12-.05.02-.16.34-.6 1.72-2.92 8.42-8.22 3.06-2.79-2.82-1.5-5.64 3.57-6.48-2.9.5-6.17-.32-7.05-3.5C-.13 11.91-.56 6.31-.56 5.55c0-3.8 3.35-2.65 5.4-1.15Z" />
        </svg>
      )
    default:
      return null
  }
}
