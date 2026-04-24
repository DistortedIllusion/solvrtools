import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { ToolLayoutWrapper } from "@/components/tools/tool-client";
import { toolDefinitions, getToolDefinition } from "@/lib/tool-definitions";
import { buildMetadata } from "@/seo/metadata";

export async function generateStaticParams() {
  return toolDefinitions.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const tool = getToolDefinition(category, slug);

  if (!tool) {
    return buildMetadata({
      title: "Tool Not Found",
      description: "The requested tool page does not exist.",
    });
  }

  return buildMetadata({
    title: tool.title,
    description: tool.description,
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const tool = getToolDefinition(category, slug);

  if (!tool) {
    notFound();
  }

  const related = tool.relatedTools
    .map((relatedSlug) => toolDefinitions.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({
      label: item.title,
      href: `/tools/${item.category}/${item.slug}`,
      description: item.description,
    }));

  return (
    <Container className="py-16 sm:py-20">
      <ToolLayoutWrapper definition={tool} related={related} />
    </Container>
  );
}
