import { CategoryCard, Container, PageHeader } from "@/components/ui";
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

    </Container>
  );
}
