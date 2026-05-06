import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { RiArrowRightLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function NewsletterForm({
  className,
  variant = "stacked",
}: {
  className?: string
  variant?: "stacked" | "inline"
}) {
  const [email, setEmail] = useState("")
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return

    setPending(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string
        }
        toast.error(body.error ?? "Could not subscribe. Please try again.")
        return
      }

      toast.success("You're on the list. See you in the next devlog.")
      setEmail("")
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full gap-2",
        variant === "stacked" ? "flex-col sm:flex-row" : "flex-row",
        className,
      )}
    >
      <Input
        type="email"
        required
        placeholder="you@studio.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={pending}
        className="flex-1"
        aria-label="Email"
      />
      <Button type="submit" disabled={pending} size="default">
        {pending ? "Subscribing" : "Subscribe"}
        <RiArrowRightLine data-icon="inline-end" />
      </Button>
    </form>
  )
}
