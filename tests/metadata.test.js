import test from "node:test";
import assert from "node:assert/strict";
import { siteConfig } from "../config/site.ts";

test("site metadata strategy uses route-specific canonical and Open Graph paths", () => {
  const title = "Length Converter";
  const description = "Convert common length units quickly.";
  const pathname = "/tools/conversions/length-converter";
  const fullTitle = `${title} | ${siteConfig.name}`;
  const metadata = {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pathname,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };

  assert.equal(metadata.title, "Length Converter | SolvrTools");
  assert.equal(metadata.description, "Convert common length units quickly.");
  assert.equal(metadata.metadataBase.toString(), `${siteConfig.url}/`);
  assert.equal(metadata.alternates.canonical, "/tools/conversions/length-converter");
  assert.equal(metadata.openGraph.url, "/tools/conversions/length-converter");
  assert.equal(metadata.openGraph.title, "Length Converter | SolvrTools");
  assert.equal(metadata.openGraph.siteName, siteConfig.name);
  assert.equal(metadata.twitter.card, "summary_large_image");
  assert.equal(metadata.twitter.title, "Length Converter | SolvrTools");
});
