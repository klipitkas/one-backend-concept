import { ConceptCard } from "@/components/ui/Card";
import { getAllConcepts, getRecentConcepts } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  const recentConcepts = getRecentConcepts(5);
  const allConcepts = getAllConcepts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          One Backend Concept
        </h1>
        <p className="mt-4 text-lg text-muted">
          Learn one backend engineering concept every day at 12:00 UTC.
          <br />
          Deep dives into system design, databases, caching, and more.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {allConcepts.length} concepts published
          </span>
        </div>
      </section>

      {/* Featured/Latest Concept */}
      {recentConcepts[0] && (
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
            Latest Concept
          </h2>
          <ConceptCard concept={recentConcepts[0]} featured />
        </section>
      )}

      {/* Recent Concepts */}
      {recentConcepts.length > 1 && (
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
            Recent Concepts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {recentConcepts.slice(1).map((concept) => (
              <ConceptCard key={concept.slug} concept={concept} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="rounded-lg border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold">
          Ready to master backend engineering?
        </h2>
        <p className="mt-2 text-muted">
          Browse all concepts or bookmark this page for your daily learning.
        </p>
        <div className="mt-6">
          <Link
            href="/archive"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent/90"
          >
            Browse All Concepts
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
