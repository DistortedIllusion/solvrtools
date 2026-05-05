import test from "node:test";
import assert from "node:assert/strict";
import { siteConfig } from "../config/site.ts";
import { toolDefinitions } from "../lib/tool-definitions.ts";

test("canonical tool catalog contains all current tool definitions", () => {
  assert.equal(toolDefinitions.length, 18);

  for (const tool of toolDefinitions) {
    assert.ok(tool.slug);
    assert.ok(tool.category);
    assert.ok(tool.title);
    assert.ok(tool.description);
  }
});

test("each category has at least one tool in the canonical catalog", () => {
  for (const category of siteConfig.categories) {
    assert.ok(
      toolDefinitions.some((tool) => tool.category === category.slug),
      `Expected at least one tool for category ${category.slug}`,
    );
  }
});

test("curated homepage tools all exist in the canonical tool catalog", () => {
  for (const curatedTool of siteConfig.featuredTools) {
    const match = toolDefinitions.find(
      (tool) => tool.slug === curatedTool.slug && tool.category === curatedTool.category,
    );

    assert.ok(match, `Expected curated tool ${curatedTool.category}/${curatedTool.slug} to exist`);
  }
});

test("featured and popular curated tools remain valid subsets of the canonical catalog", () => {
  const featuredTools = siteConfig.featuredTools.filter((tool) => tool.featured);
  const popularTools = siteConfig.featuredTools.filter((tool) => tool.popular);

  assert.ok(featuredTools.length > 0);
  assert.ok(popularTools.length > 0);

  for (const tool of [...featuredTools, ...popularTools]) {
    assert.ok(
      toolDefinitions.some((definition) => definition.slug === tool.slug && definition.category === tool.category),
    );
  }
});
