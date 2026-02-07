import { ConceptCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getAllConcepts, getAllCategories } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse all backend concepts and system design topics",
  alternates: {
    canonical: "/archive",
  },
};

export default function ArchivePage() {
  const concepts = getAllConcepts();
  const categories = getAllCategories();

  // Group concepts by year
  const conceptsByYear = concepts.reduce(
    (acc, concept) => {
      const year = new Date(concept.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(concept);
      return acc;
    },
    {} as Record<number, typeof concepts>
  );

  const years = Object.keys(conceptsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Archive</h1>
        <p className="mt-2 text-muted">
          Browse all {concepts.length} backend concepts
        </p>

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="category">
                {category}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {concepts.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-12 text-center">
          <p className="text-muted">No concepts published yet.</p>
          <p className="mt-2 text-sm text-muted">
            Check back at 12:00 UTC for the first concept!
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <section key={year}>
              <h2 className="mb-6 border-b border-border pb-2 text-lg font-semibold">
                {year}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {conceptsByYear[year].map((concept) => (
                  <ConceptCard key={concept.slug} concept={concept} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
