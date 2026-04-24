import { siteConfig, type ToolDefinition } from "@/config/site";
import { toolDefinitions } from "@/lib/tool-definitions";

export function getCategories() {
  return siteConfig.categories;
}

export function getFeaturedTools(): ToolDefinition[] {
  return siteConfig.featuredTools.filter((tool) => tool.featured);
}

export function getAllTools(): ToolDefinition[] {
  const configuredBySlug = new Map(siteConfig.featuredTools.map((tool) => [tool.slug, tool]));

  return toolDefinitions.map((tool) => ({
    slug: tool.slug,
    category: tool.category,
    name: tool.title,
    summary: tool.description,
    popular: configuredBySlug.get(tool.slug)?.popular,
    featured: configuredBySlug.get(tool.slug)?.featured ?? true,
  }));
}

export function getPopularTools(): ToolDefinition[] {
  const popular = siteConfig.featuredTools.filter((tool) => tool.popular);
  return popular.length > 0 ? popular : getFeaturedTools();
}

export function getCategory(slug: string) {
  return siteConfig.categories.find((category) => category.slug === slug);
}

export function getTool(categorySlug: string, toolSlug: string) {
  return siteConfig.featuredTools.find(
    (tool) => tool.category === categorySlug && tool.slug === toolSlug,
  );
}

export function getToolsByCategory(categorySlug: string): ToolDefinition[] {
  const configuredBySlug = new Map(siteConfig.featuredTools.map((tool) => [tool.slug, tool]));

  return toolDefinitions
    .filter((tool) => tool.category === categorySlug)
    .map((tool) => ({
      slug: tool.slug,
      category: tool.category,
      name: tool.title,
      summary: tool.description,
      popular: configuredBySlug.get(tool.slug)?.popular,
      featured: configuredBySlug.get(tool.slug)?.featured ?? true,
    }));
}

export function getRelatedTools(categorySlug: string, currentSlug: string): ToolDefinition[] {
  return getToolsByCategory(categorySlug).filter((tool) => tool.slug !== currentSlug);
}
