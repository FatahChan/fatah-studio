import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/site/section-heading";
import { DevlogCard } from "@/components/site/devlog-card";
import { getAllDevlog } from "@/content/devlog";

export const Route = createFileRoute("/devlog/")({
  component: DevlogIndex,
  head: () => ({
    meta: [
      { title: "Devlog — FatahChan Studio" },
      {
        name: "description",
        content:
          "Long-form notes from the FatahChan Studio team — art, code, music, and the strange decisions in between.",
      },
    ],
  }),
});

function DevlogIndex() {
  const posts = getAllDevlog();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <SectionHeading
        as="h1"
        kicker="// Devlog"
        title="From the workbench."
        description="Long-form posts about the games we are building. We update slowly, but we update honestly."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <DevlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
