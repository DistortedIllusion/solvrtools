import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  Container,
  PageHeader,
  RelatedLinksSection,
  SectionHeader,
  ToolCard,
} from "@/components/ui";
import { getCategories, getCategory, getToolsByCategory } from "@/lib/tools";
import { buildMetadata } from "@/seo/metadata";

export async function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategory(category);

  if (!categoryData) {
    return buildMetadata({
      title: "Category Not Found",
      description: "The requested category does not exist.",
      pathname: `/categories/${category}`,
    });
  }

  return buildMetadata({
    title: `${categoryData.name} Tools`,
    description: categoryData.description,
    pathname: `/categories/${category}`,
  });
}

export default async function CategoryLandingPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategory(category);

  if (!categoryData) {
    notFound();
  }

  const tools = getToolsByCategory(categoryData.slug);

  return (
    <Container className="py-16 sm:py-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: categoryData.name },
        ]}
      />

      <PageHeader
        eyebrow="Category"
        title={`${categoryData.name} tools`}
        description={categoryData.description}
      />

      <section className="mt-12">
        <SectionHeader
          title="Tools in this category"
          description={`Explore ${categoryData.name.toLowerCase()} calculators and utilities designed to help with common tasks and decisions.`}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              category={categoryData.name}
              title={tool.name}
              summary={tool.summary}
            />
          ))}
        </div>
      </section>


      <section className="mt-14">
        <SectionHeader
          title="Keep exploring"
          description="Browse more categories or jump to the full tools directory to find exactly what you need."
        />
        <div className="mt-6">
          <RelatedLinksSection
            links={[
              {
                label: "All categories",
                href: "/categories",
                description: "Browse the complete category structure.",
              },
              {
                label: "All tools",
                href: "/tools",
                description: "See all current tool pages grouped in one place.",
              },
            ]}
          />
        </div>
      </section>
    </Container>
  );
}
