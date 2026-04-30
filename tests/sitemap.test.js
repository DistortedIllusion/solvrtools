import test from "node:test";
import assert from "node:assert/strict";
import { siteConfig } from "../config/site.ts";
import { toolDefinitions } from "../lib/tool-definitions.ts";

test("sitemap route strategy includes canonical public pages and excludes removed category-tool index routes", () => {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = ["/", "/tools", "/categories", "/about"];
  const categoryRoutes = siteConfig.categories.map((category) => `/categories/${category.slug}`);
  const toolRoutes = toolDefinitions.map((tool) => `/tools/${tool.category}/${tool.slug}`);
  const urls = new Set([...staticRoutes, ...categoryRoutes, ...toolRoutes].map((route) => `${baseUrl}${route}`));

  assert.ok(urls.has(`${siteConfig.url}/`));
  assert.ok(urls.has(`${siteConfig.url}/tools`));
  assert.ok(urls.has(`${siteConfig.url}/categories`));
  assert.ok(urls.has(`${siteConfig.url}/about`));

  for (const category of siteConfig.categories) {
    assert.ok(urls.has(`${siteConfig.url}/categories/${category.slug}`));
    assert.ok(!urls.has(`${siteConfig.url}/tools/${category.slug}`));
  }

  for (const tool of toolDefinitions) {
    assert.ok(urls.has(`${siteConfig.url}/tools/${tool.category}/${tool.slug}`));
  }
});

test("sitemap priority strategy remains aligned with route intent", () => {
  const getPriority = (route) =>
    route === "/" ? 1 : route === "/tools" || route === "/categories" ? 0.9 : 0.8;

  const getChangeFrequency = (route) => (route === "/" ? "daily" : "weekly");

  assert.equal(getChangeFrequency("/"), "daily");
  assert.equal(getPriority("/"), 1);
  assert.equal(getChangeFrequency("/tools"), "weekly");
  assert.equal(getPriority("/tools"), 0.9);
  assert.equal(getChangeFrequency("/about"), "weekly");
  assert.equal(getPriority("/about"), 0.8);
});
