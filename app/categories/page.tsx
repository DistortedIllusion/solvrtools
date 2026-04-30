import Link from "next/link";
import { CategoryCard, Container, PageHeader, SectionHeader } from "@/components/ui";
import { getCategories } from "@/lib/tools";
import { buildMetadata } from "@/seo/metadata";

export const metadata = buildMetadata({
  title: "Categories",
  description: "Browse SolvrTools categories for finance, time, conversions, text, home projects, and other everyday tasks.",
  pathname: "/categories",
});

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Categories"
        title="Browse tool categories"
        description="Explore grouped calculators and utilities for finance, time, conversions, text, home projects, and other everyday tasks."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            href={`/categories/${category.slug}`}
            title={category.name}
            description={category.description}
          />
        ))}
      </div>

      <section className="mt-14">
        <SectionHeader
          title="Popular areas to explore"
          description="Each category groups related tools so you can move quickly from a broad topic to the exact calculator or utility you need."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.slug} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">{category.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{category.description}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
                {category.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
              <Link
                href={`/categories/${category.slug}`}
                className="mt-5 inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
              >
View category
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
