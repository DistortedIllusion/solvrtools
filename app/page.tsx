import Link from "next/link";
import {
  Container,
  PageHeader,
  SearchBar,
  SectionHeader,
  ToolCard,
} from "@/components/ui";
import { getPopularTools } from "@/lib/tools";
import { buildMetadata } from "@/seo/metadata";

export const metadata = buildMetadata({
  title: "Utility Tools and Calculators",
  description:
    "Fast, free online calculators and practical tools for finance, time, conversions, text, home projects, and everyday problem-solving.",
  pathname: "/",
});

export default function Home() {
  const popularTools = getPopularTools();

  return (
    <>
      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-16 shadow-2xl shadow-cyan-950/20 sm:px-10">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
              <PageHeader
                title="SolvrTools"
                description="Fast, free calculators and tools for everyday problems."
                centered
                actions={
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      href="/tools"
                      className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Explore tools
                    </Link>
                    <Link
                      href="/categories"
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                    >
                      Browse categories
                    </Link>
                  </div>
                }
              />
              <SearchBar />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <SectionHeader
            title="Most popular tools"
            description="Start with some of the most useful calculators and everyday tools people reach for most often."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {popularTools.map((tool) => (
              <ToolCard
                key={`${tool.category}-${tool.slug}`}
                href={`/tools/${tool.category}/${tool.slug}`}
                category={tool.category}
                title={tool.name}
                summary={tool.summary}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
