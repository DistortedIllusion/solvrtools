import { siteConfig, type ToolDefinition } from "@/config/site";
import { toolDefinitions } from "@/lib/tool-definitions";

const curatedToolConfigBySlug = new Map(siteConfig.featuredTools.map((tool) => [tool.slug, tool]));

function mapToolDefinitionToSiteTool(
  tool: (typeof toolDefinitions)[number],
): ToolDefinition {
  const curated = curatedToolConfigBySlug.get(tool.slug);

  return {
    slug: tool.slug,
    category: tool.category,
    name: tool.title,
    summary: tool.description,
    popular: curated?.popular,
    featured: curated?.featured ?? true,
  };
}

export function getCategories() {
  return siteConfig.categories;
}

export function getFeaturedTools(): ToolDefinition[] {
  return siteConfig.featuredTools.filter((tool) => tool.featured);
}

export function getAllTools(): ToolDefinition[] {
  return toolDefinitions.map(mapToolDefinitionToSiteTool);
}

export function getPopularTools(): ToolDefinition[] {
  const popular = siteConfig.featuredTools.filter((tool) => tool.popular);
  return popular.length > 0 ? popular : getFeaturedTools();
}

export function getCategory(slug: string) {
  return siteConfig.categories.find((category) => category.slug === slug);
}

export function getTool(categorySlug: string, toolSlug: string): ToolDefinition | undefined {
  const tool = toolDefinitions.find(
    (item) => item.category === categorySlug && item.slug === toolSlug,
  );

  return tool ? mapToolDefinitionToSiteTool(tool) : undefined;
}

export function getToolsByCategory(categorySlug: string): ToolDefinition[] {
  return toolDefinitions
    .filter((tool) => tool.category === categorySlug)
    .map(mapToolDefinitionToSiteTool);
}

export function getRelatedTools(categorySlug: string, currentSlug: string): ToolDefinition[] {
  return getToolsByCategory(categorySlug).filter((tool) => tool.slug !== currentSlug);
}
