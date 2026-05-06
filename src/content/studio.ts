export type StudioInfo = {
  name: string
  shortName: string
  tagline: string
  oneLiner: string
  story: string[]
  founded: string
  location: string
  values: { title: string; body: string }[]
  socials: { label: string; href: string; icon: SocialIcon }[]
  contactEmail: string
  pressEmail: string
}

export type SocialIcon =
  | "twitter"
  | "discord"
  | "youtube"
  | "bluesky"
  | "github"
  | "instagram"

export const studio: StudioInfo = {
  name: "FatahChan Studio",
  shortName: "FatahChan",
  tagline: "Worlds in the making.",
  oneLiner:
    "An independent game studio crafting handmade worlds and quiet, strange stories.",
  story: [
    "FatahChan Studio is a small, independent team building handcrafted games where art, mood, and writing matter as much as systems.",
    "We grew out of a notebook of half-drawn cities, late-night soundtracks, and a stubborn belief that the best games leave room for silence.",
    "Our first slate of titles begins shipping soon. Expect strange protagonists, soft neon, and one or two ideas you have not played before.",
  ],
  founded: "2026",
  location: "Cairo / Remote",
  values: [
    {
      title: "Craft over scale",
      body: "Small teams. Long timelines. Every frame on screen exists for a reason.",
    },
    {
      title: "Mood is mechanic",
      body: "Music, colour, and pacing carry the same weight as code. We design feel first.",
    },
    {
      title: "Players, not metrics",
      body: "No dailies, no FOMO loops. Games you can finish, return to, and miss.",
    },
  ],
  socials: [
    { label: "Twitter", href: "https://twitter.com/fatahchan", icon: "twitter" },
    { label: "Bluesky", href: "https://bsky.app/profile/fatahchan", icon: "bluesky" },
    { label: "Discord", href: "https://discord.gg/fatahchan", icon: "discord" },
    { label: "YouTube", href: "https://youtube.com/@fatahchan", icon: "youtube" },
    { label: "GitHub", href: "https://github.com/fatahchan", icon: "github" },
  ],
  contactEmail: "hello@fatahchan.studio",
  pressEmail: "press@fatahchan.studio",
}
