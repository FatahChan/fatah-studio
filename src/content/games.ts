export type GameStatus = "announced" | "in-development" | "released"

export type Platform =
  | "PC"
  | "Steam"
  | "Mac"
  | "Linux"
  | "PlayStation 5"
  | "Xbox Series X|S"
  | "Nintendo Switch"
  | "iOS"
  | "Android"

export type Game = {
  slug: string
  title: string
  codename?: string
  tagline: string
  status: GameStatus
  releaseWindow: string
  genre: string
  players: string
  platforms: Platform[]
  synopsis: string
  pillars: { title: string; body: string }[]
  featured: boolean
  /** OKLCH-friendly accent color or gradient stops, used for hero gradients. */
  accent: {
    from: string
    to: string
  }
  links?: {
    steam?: string
    site?: string
    presskit?: string
  }
}

export const games: Game[] = [
  {
    slug: "neon-lullaby",
    title: "Neon Lullaby",
    codename: "PRJ-LULU",
    tagline: "A quiet detective story in a city that never powers down.",
    status: "in-development",
    releaseWindow: "2027",
    genre: "Narrative Action-RPG",
    players: "Single-player",
    platforms: ["PC", "Steam", "Mac", "PlayStation 5", "Nintendo Switch"],
    synopsis:
      "Neon Lullaby follows Mei, a former dream-courier turned reluctant investigator, as she walks the rain-soaked alleys of a city stitched together from forgotten code. Trace memories, brew tea, fight only when you must, and decide which lullabies are worth keeping alive.",
    pillars: [
      {
        title: "Slow combat, sharp choices",
        body: "Every encounter is short, deliberate, and reversible — until it isn't.",
      },
      {
        title: "A city that listens",
        body: "Neighborhoods change with the songs you play and the people you remember.",
      },
      {
        title: "Hand-drawn after-dark",
        body: "Every frame inked over photographic plates. No two streets look the same.",
      },
    ],
    featured: true,
    accent: {
      from: "oklch(0.46 0.24 277)",
      to: "oklch(0.32 0.18 320)",
    },
    links: {
      steam: "https://store.steampowered.com",
      presskit: "/press",
    },
  },
  {
    slug: "sumi-and-the-last-light",
    title: "Sumi & The Last Light",
    codename: "PRJ-INK",
    tagline:
      "A wordless climb through a fading world, painted one brushstroke at a time.",
    status: "announced",
    releaseWindow: "TBA",
    genre: "Atmospheric Platformer",
    players: "Single-player",
    platforms: ["PC", "Steam", "Mac", "Linux", "Nintendo Switch", "iOS"],
    synopsis:
      "Sumi is the last keeper of an ink-and-paper sun. Travel across collapsing scrolls, mend torn pages with your brush, and decide which memories of the world are worth carrying to the next story.",
    pillars: [
      {
        title: "Brush as verb",
        body: "Painting, jumping, and remembering share the same gesture.",
      },
      {
        title: "Wordless storytelling",
        body: "No dialogue, no UI prompts. The world teaches itself through colour.",
      },
      {
        title: "Live ink",
        body: "Every line you draw persists across runs, until the paper wears thin.",
      },
    ],
    featured: false,
    accent: {
      from: "oklch(0.78 0.13 84)",
      to: "oklch(0.46 0.18 32)",
    },
  },
  {
    slug: "kintsugi-knights",
    title: "Kintsugi Knights",
    codename: "PRJ-GOLD",
    tagline:
      "A tactical roguelike about broken things made beautiful again — with swords.",
    status: "in-development",
    releaseWindow: "Late 2027",
    genre: "Tactical Roguelike",
    players: "Single-player, async co-op planned",
    platforms: ["PC", "Steam", "Mac", "Linux"],
    synopsis:
      "Centuries after a war that shattered the celestial pottery, fragments of the gods awaken inside borrowed armour. Lead a party of cracked vessels through procedural shrines, repair them with gold, and face the fault-lines you forged in earlier runs.",
    pillars: [
      {
        title: "Scars, not stats",
        body: "Damage shapes future runs more than upgrades do.",
      },
      {
        title: "Slow tactics, fast turns",
        body: "Five-minute battles. Hours of consequences.",
      },
      {
        title: "Repair as art",
        body: "Every successful run leaves a piece of you behind, gilded.",
      },
    ],
    featured: false,
    accent: {
      from: "oklch(0.72 0.16 60)",
      to: "oklch(0.34 0.12 280)",
    },
  },
]

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug)
}

export function getFeaturedGame(): Game {
  return games.find((g) => g.featured) ?? games[0]
}

export const STATUS_LABEL: Record<GameStatus, string> = {
  announced: "Announced",
  "in-development": "In Development",
  released: "Released",
}
