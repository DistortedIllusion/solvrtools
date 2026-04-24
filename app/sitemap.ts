import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { toolDefinitions } from "@/lib/tool-definitions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const staticRoutes = ["/", "/tools", "/categories", "/about"];
  const categoryRoutes = siteConfig.categories.map((category) => `/categories/${category.slug}`);
  const toolRoutes = toolDefinitions.map((tool) => `/tools/${tool.category}/${tool.slug}`);

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route === "/tools" || route === "/categories" ? 0.9 : 0.8,
  }));
}
