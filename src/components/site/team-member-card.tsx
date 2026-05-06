import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { TeamMember } from "@/content/team"

export function TeamMemberCard({
  member,
  className,
}: {
  member: TeamMember
  className?: string
}) {
  return (
    <Card className={cn("ring-0", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm">{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pb-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
        {member.links?.length ? (
          <ul className="flex flex-wrap gap-3 text-xs">
            {member.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  )
}
