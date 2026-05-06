import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RiArrowLeftLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DevlogCard } from "@/components/site/devlog-card";
import { getDevlogBySlug, getAllDevlog } from "@/content/devlog";

export const Route = createFileRoute("/devlog/$slug")({
  component: DevlogDetail,
  loader: ({ params }) => {
    const post = getDevlogBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — FatahChan Studio` },
          { name: "description", content: loaderData.post.excerpt },
        ]
      : [],
  }),
  notFoundComponent: PostNotFound,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DevlogDetail() {
  const { post } = Route.useLoaderData();
  const all = getAllDevlog();
  const others = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="flex flex-col gap-16 sm:gap-20">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 md:px-8 md:py-24">
          <Link
            to="/devlog"
            className="inline-flex w-fit items-center gap-2 text-[10px] tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <RiArrowLeftLine className="size-3" /> All devlogs
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {formatDate(post.date)} · {post.author}
            </span>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] uppercase">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <h1 className="font-heading text-3xl leading-tight font-medium text-balance sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {post.excerpt}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
        <div className="prose prose-sm sm:prose dark:prose-invert prose-headings:font-heading prose-p:text-foreground/90 max-w-none">
          {post.body.map((paragraph, idx) => (
            <p key={idx} className="text-sm leading-[1.8] text-foreground/85 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <Separator className="mx-auto max-w-3xl" />

      {others.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
          <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            // Keep reading
          </span>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {others.map((other) => (
              <DevlogCard key={other.slug} post={other} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function PostNotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-32 text-center md:px-8">
      <span className="font-heading text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
        // 404
      </span>
      <h1 className="font-heading text-3xl font-medium text-balance sm:text-4xl">
        That post does not exist.
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        It may have been moved, or never published. Browse the full devlog
        instead.
      </p>
      <Button render={<Link to="/devlog" />}>Back to devlog</Button>
    </div>
  );
}
