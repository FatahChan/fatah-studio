export type TeamMember = {
  name: string
  role: string
  bio: string
  initials: string
  links?: { label: string; href: string }[]
}

export const team: TeamMember[] = [
  {
    name: "Ahmad Fathallah",
    role: "Founder · Creative Director",
    initials: "AF",
    bio: "Writes the design docs, breaks the design docs, then writes them again. Previously shipped narrative tools at two indie studios.",
    links: [
      { label: "Twitter", href: "https://twitter.com/fatahchan" },
      { label: "Site", href: "https://fatahchan.studio" },
    ],
  },
  {
    name: "Yuki Tanabe",
    role: "Lead Programmer",
    initials: "YT",
    bio: "Twenty years of writing engines that nobody noticed, which is the highest compliment in this craft.",
  },
  {
    name: "Mei Park",
    role: "Art Director",
    initials: "MP",
    bio: "Painter first, illustrator second, technical artist when the deadline insists.",
    links: [{ label: "Portfolio", href: "https://example.com" }],
  },
  {
    name: "Salim Roux",
    role: "Composer · Sound Design",
    initials: "SR",
    bio: "Records cassette loops in places you would never think to record, then makes them feel inevitable in-game.",
  },
]
