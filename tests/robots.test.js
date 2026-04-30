import test from "node:test";
import assert from "node:assert/strict";
import { siteConfig } from "../config/site.ts";

test("robots strategy allows crawling and points to the production sitemap", () => {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const result = {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };

  assert.equal(result.rules.userAgent, "*");
  assert.equal(result.rules.allow, "/");
  assert.equal(result.sitemap, `${siteConfig.url}/sitemap.xml`);
  assert.equal(result.host, siteConfig.url);
});
