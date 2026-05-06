import { createFileRoute, Link } from "@tanstack/react-router";
import { RiArrowRightUpLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/site/section-heading";
import { TeamMemberCard } from "@/components/site/team-member-card";
import { studio } from "@/content/studio";
import { team } from "@/content/team";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — FatahChan Studio" },
      {
        name: "description",
        content: studio.oneLiner,
      },
    ],
  }),
});

function About() {
  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:px-8 md:py-28 lg:py-36">
          <SectionHeading
            as="h1"
            kicker="// About"
            title="A small studio, in no rush."
            description={studio.oneLiner}
          />
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex flex-col gap-5">
                {studio.story.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm leading-[1.8] text-foreground/85 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <aside className="flex flex-col gap-3 border-l border-border pl-6 md:col-span-5 md:pl-10">
              <Detail label="Founded" value={studio.founded} />
              <Detail label="Based in" value={studio.location} />
              <Detail label="Team size" value="Small. Growing carefully." />
              <Detail label="Focus" value="Narrative-led indie games" />
              <div className="pt-4">
                <Button variant="outline" render={<Link to="/contact" />}>
                  Get in touch
                  <RiArrowRightUpLine data-icon="inline-end" />
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <SectionHeading
          kicker="// 02 — Values"
          title="What we believe."
          description="Three principles we keep coming back to. They shape what we build, and what we refuse to build."
        />
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {studio.values.map((value, index) => (
            <div
              key={value.title}
              className="flex flex-col gap-4 bg-background p-6 md:p-8"
            >
              <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                0{index + 1}
              </span>
              <h3 className="font-heading text-lg font-medium sm:text-xl">
                {value.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <SectionHeading
          kicker="// 03 — Team"
          title="The crew."
          description="Four people, distributed across cities, all stubborn about the same things."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}
