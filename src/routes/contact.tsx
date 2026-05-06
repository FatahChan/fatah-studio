import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { RiArrowRightLine, RiMailLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { SectionHeading } from "@/components/site/section-heading";
import { studio } from "@/content/studio";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — FatahChan Studio" },
      {
        name: "description",
        content: `Get in touch with ${studio.name} — collaborations, press, and general questions.`,
      },
    ],
  }),
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        toast.error(body.error ?? "Could not send message. Please try again.");
        return;
      }

      toast.success("Message sent. We will get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="flex flex-col gap-8 md:col-span-5">
          <SectionHeading
            as="h1"
            kicker="// Contact"
            title="Say hi."
            description="Press, partnerships, freelance pitches, soundtracks, or anything else. The whole team reads this inbox."
          />

          <div className="flex flex-col gap-6 border-t border-border pt-8">
            <ContactDetail
              icon={<RiMailLine className="size-4" />}
              label="General"
              value={studio.contactEmail}
              href={`mailto:${studio.contactEmail}`}
            />
            <ContactDetail
              icon={<RiMailLine className="size-4" />}
              label="Press"
              value={studio.pressEmail}
              href={`mailto:${studio.pressEmail}`}
            />
            <ContactDetail
              icon={<span className="size-2 rounded-none bg-primary" />}
              label="Based in"
              value={studio.location}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 border border-border bg-card p-6 md:col-span-7 md:p-10"
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Your name</FieldLabel>
                <Input
                  id="name"
                  placeholder="Mei Park"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={pending}
                  autoComplete="name"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={pending}
                  autoComplete="email"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                placeholder="What is this about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={pending}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                rows={6}
                placeholder="Tell us as much or as little as you want."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={pending}
              />
              <FieldDescription>
                We aim to respond within two working days.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Button type="submit" disabled={pending} className="w-fit">
            {pending ? "Sending" : "Send message"}
            <RiArrowRightLine data-icon="inline-end" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center border border-border text-muted-foreground">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </span>
        <span className="text-sm text-foreground">{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="transition-colors hover:text-primary">
        {content}
      </a>
    );
  }
  return content;
}
