"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { RiMoonLine, RiSunLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        aria-label="Toggle theme"
        variant="outline"
        size="icon-sm"
        className={className}
        disabled
      >
        <RiSunLine />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      variant="outline"
      size="icon-sm"
      className={className}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <RiSunLine /> : <RiMoonLine />}
    </Button>
  )
}
