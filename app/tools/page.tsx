import Link from "next/link";
import { Container, PageHeader, SectionHeader, ToolCard } from "@/components/ui";
import { getAllTools, getCategories } from "@/lib/tools";
import { buildMetadata } from "@/seo/metadata";

export const metadata = buildMetadata({
  title: "All Tools",
  description: "Browse calculators and utilities for finance, time, conversions, text, home projects, and everyday tasks.",
});

export default function ToolsPage() {
  const categories = getCategories();
  const tools = getAllTools();

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        title="All tools"
        description="Browse calculators and utilities for finance, time, conversions, text, home projects, and everyday tasks."
      />

      <section className="mt-12">
        <SectionHeader
          title="Browse by category"
          description="Jump into finance, time, conversions, text, home, and other everyday tool categories."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader
          title="All tools"
          description="Explore every currently available calculator and utility in SolvrTools."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={`${tool.category}-${tool.slug}`}
              href={`/tools/${tool.category}/${tool.slug}`}
              category={tool.category}
              title={tool.name}
              summary={tool.summary}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
