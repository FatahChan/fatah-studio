export type DevlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  /** Markdown-ish paragraphs. Each item is rendered as a paragraph. */
  body: string[]
}

export const devlog: DevlogPost[] = [
  {
    slug: "hello-world",
    title: "Hello, world. We are FatahChan Studio.",
    excerpt:
      "A short note on why we started the studio, what we are building, and the year ahead.",
    date: "2026-04-12",
    author: "The Studio",
    tags: ["studio", "announcement"],
    body: [
      "For the last two years we have been quietly working on a notebook full of ideas. Today we are putting a name to them: FatahChan Studio.",
      "We are a small team that loves long-form games. The kind you finish in three weekends and remember for a decade. We are obsessed with mood, music, and characters that look like they have been somewhere before you found them.",
      "Over the next twelve months we will share three projects in slow, honest updates. No hype trailers, no roadmaps full of NFTs, no daily login bonuses. Just games made the way we wanted to play them when we were younger.",
      "Thank you for reading the very first one of these. There will be many more.",
    ],
  },
  {
    slug: "neon-lullaby-first-look",
    title: "Devlog 01 — Painting Neon Lullaby's first district",
    excerpt:
      "How we built a single rainy alley for our debut title, and what it taught us about pacing.",
    date: "2026-04-26",
    author: "Mei (Art Director)",
    tags: ["neon-lullaby", "art"],
    body: [
      "Neon Lullaby's first district, Sango-ku, took six months. That sounds absurd until you realise it is the lens we will use to build the rest of the city.",
      "Every storefront is composed of three layers — a photographed plate, an inked overlay, and a thin sheet of city-noise that drifts on its own clock. When the player slows down, the city does too. When they run, the layers fall out of sync.",
      "We went into this project assuming combat would be the loudest thing on screen. We were wrong. The loudest thing is the rain. Once we understood that, the rest of the design started solving itself.",
      "Our next post will be about our composer's approach to writing music for a city that is, technically, also a memory.",
    ],
  },
  {
    slug: "tools-of-a-tiny-team",
    title: "Tools of a tiny team",
    excerpt:
      "An honest list of what we use to build games as a small distributed studio.",
    date: "2026-05-04",
    author: "Yuki (Lead Programmer)",
    tags: ["studio", "engineering"],
    body: [
      "There is no secret stack. We use the same tools you have probably tried, with one or two opinions about how to glue them together.",
      "Our engine layer is intentionally boring. The interesting decisions live in our content pipeline: we treat every asset as a script. Every painting, every line of dialogue, every footstep is a small piece of code that other systems can ask questions of.",
      "It is slower up front. It also means a single artist with a notebook can change the personality of an entire chapter without bothering an engineer.",
      "Future posts in this series will go deeper into one tool at a time. Probably starting with how we manage music cues, because that one almost broke us.",
    ],
  },
]

export function getDevlogBySlug(slug: string): DevlogPost | undefined {
  return devlog.find((p) => p.slug === slug)
}

export function getLatestDevlog(limit = 2): DevlogPost[] {
  return [...devlog]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit)
}

export function getAllDevlog(): DevlogPost[] {
  return [...devlog].sort((a, b) => (a.date < b.date ? 1 : -1))
}
