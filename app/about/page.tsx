import { Container, PageHeader, SurfaceCard } from "@/components/ui";
import { buildMetadata } from "@/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn what SolvrTools offers and how it helps with everyday calculations and practical decisions.",
});

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="About"
        title="Why SolvrTools exists"
        description="SolvrTools helps people make everyday calculations faster, clearer, and easier to trust, from loan payments and time differences to home project estimates."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <SurfaceCard>
          <h2 className="text-xl font-semibold text-white">What SolvrTools prioritizes</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Clear results, easy-to-use inputs, readable explanations, and practical tools that help you make decisions with confidence.
          </p>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-semibold text-white">What comes next</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            More calculators, better launch polish, stronger SEO coverage, and continued expansion into high-value everyday tools.
          </p>
        </SurfaceCard>
      </div>
    </Container>
  );
}
