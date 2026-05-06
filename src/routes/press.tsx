import { createFileRoute } from "@tanstack/react-router";
import { RiDownloadLine, RiMailLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/site/section-heading";
import { studio } from "@/content/studio";
import { press } from "@/content/press";

export const Route = createFileRoute("/press")({
  component: Press,
  head: () => ({
    meta: [
      { title: "Press — FatahChan Studio" },
      {
        name: "description",
        content: `Press kit and media resources for ${studio.name}.`,
      },
    ],
  }),
});

function Press() {
  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:px-8 md:py-28">
          <SectionHeading
            as="h1"
            kicker="// Press"
            title="Press kit."
            description="Everything you need to write about FatahChan Studio. If something is missing, ask — we will send it within a day."
          />
          <div className="flex flex-wrap gap-3">
            <Button>
              <RiDownloadLine data-icon="inline-start" />
              Download full kit (zip)
            </Button>
            <Button
              variant="outline"
              render={<a href={`mailto:${studio.pressEmail}`} />}
            >
              <RiMailLine data-icon="inline-start" />
              {studio.pressEmail}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="md:col-span-7">
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // 01 — Studio details
          </span>
          <Accordion defaultValue={["about"]} className="mt-4">
            <AccordionItem value="about">
              <AccordionTrigger>About FatahChan Studio</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  {press.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quick-facts">
              <AccordionTrigger>Quick facts</AccordionTrigger>
              <AccordionContent>
                <ul className="flex list-disc flex-col gap-2 pl-5">
                  {press.quickFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contact">
              <AccordionTrigger>Press contact</AccordionTrigger>
              <AccordionContent>
                <p>
                  Press inquiries:{" "}
                  <a href={`mailto:${studio.pressEmail}`}>{studio.pressEmail}</a>
                </p>
                <p>
                  General:{" "}
                  <a href={`mailto:${studio.contactEmail}`}>
                    {studio.contactEmail}
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <aside className="md:col-span-5">
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // 02 — Factsheet
          </span>
          <dl className="mt-4 flex flex-col gap-px border border-border bg-border">
            {press.factsheet.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[120px_1fr] gap-4 bg-background px-4 py-3"
              >
                <dt className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {row.label}
                </dt>
                <dd className="text-xs text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <SectionHeading
          kicker="// 03 — Assets"
          title="Download anything you need."
          description="High-resolution logos, key art, screenshots, and a one-page factsheet. All assets are licensed for editorial use."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {press.assets.map((asset) => (
            <Card key={asset.title}>
              <CardHeader>
                <CardTitle>{asset.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pb-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {asset.description}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  render={<a href={asset.href} />}
                  className="w-fit"
                >
                  <RiDownloadLine data-icon="inline-start" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
