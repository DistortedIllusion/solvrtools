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
      description: "The requested tool category does not exist.",
      pathname: `/tools/${category}`,
    });
  }

  return buildMetadata({
    title: categoryData.name,
    description: categoryData.description,
    pathname: `/tools/${category}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategory(category);

  if (!categoryData) {
    notFound();
  }

  const tools = getToolsByCategory(category);

  return (
    <Container className="py-16 sm:py-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: categoryData.name },
        ]}
      />

      <PageHeader
        eyebrow="Category shell"
        title={categoryData.name}
        description={categoryData.description}
      />

      <section className="mt-12">
        <SectionHeader
          title="Tools in this category"
          description="Category pages will list related tools with consistent page shells and internal links."
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
          title="Related navigation"
          description="Reusable internal linking block for nearby categories and supporting pages."
        />
        <div className="mt-6">
          <RelatedLinksSection
            links={[
              {
                label: `${categoryData.name} category landing`,
                href: `/categories/${categoryData.slug}`,
                description: "View the category page pattern with intro copy and examples.",
              },
              {
                label: "Tools index",
                href: "/tools",
                description: "Return to the main tools discovery page.",
              },
            ]}
          />
        </div>
      </section>
    </Container>
  );
}
