import { studio } from "./studio"

export type PressFact = {
  label: string
  value: string
}

export const press = {
  factsheet: [
    { label: "Studio", value: studio.name },
    { label: "Founded", value: studio.founded },
    { label: "Based in", value: studio.location },
    { label: "Size", value: "Small team, growing carefully" },
    { label: "Press contact", value: studio.pressEmail },
    { label: "Business contact", value: studio.contactEmail },
  ] as PressFact[],

  about: [
    "FatahChan Studio is an independent game studio founded in 2026.",
    "We make handcrafted, narrative-led games at the intersection of art, music and slow systems.",
    "Our slate currently includes three announced titles: Neon Lullaby, Sumi & The Last Light, and Kintsugi Knights.",
  ],

  quickFacts: [
    "Studio operates fully remote with a hub in Cairo.",
    "All current titles are single-player.",
    "Studio releases on PC first, console ports follow.",
    "Music is composed in-house and published as standalone records.",
  ],

  assets: [
    {
      title: "Studio logo pack",
      description: "SVG and PNG marks in light/dark variants.",
      href: "#",
    },
    {
      title: "Game key art",
      description: "Hi-res key art for all announced titles.",
      href: "#",
    },
    {
      title: "Screenshot pack",
      description: "Curated screenshots, no UI overlay.",
      href: "#",
    },
    {
      title: "Studio factsheet (PDF)",
      description: "One-page summary for press use.",
      href: "#",
    },
  ],
}
