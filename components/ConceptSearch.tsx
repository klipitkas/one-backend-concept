"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getDifficultyColor } from "@/lib/utils";

interface SearchableConcept {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  difficulty: string;
  tags: string[];
  readingTime: string;
}

export function ConceptSearch({
  concepts,
}: {
  concepts: SearchableConcept[];
}) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();

  const results = trimmed
    ? concepts.filter((c) => {
        return (
          c.title.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed) ||
          c.category.toLowerCase().includes(trimmed) ||
          c.tags.some((t) => t.toLowerCase().includes(trimmed))
        );
      })
    : [];

  return (
    <div className="mb-12">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts by title, tag, or category..."
          className="w-full rounded-lg border border-border bg-surface py-3 pl-11 pr-4 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {trimmed && (
        <div className="mt-4">
          <p className="mb-3 text-sm text-muted">
            {results.length} {results.length === 1 ? "result" : "results"} for
            &ldquo;{query.trim()}&rdquo;
          </p>
          {results.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {results.map((concept) => (
                <Link
                  key={concept.slug}
                  href={`/concepts/${concept.slug}`}
                  className="group block"
                >
                  <article className="rounded-lg border border-border bg-surface p-5 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <time dateTime={concept.date}>
                        {formatDate(concept.date)}
                      </time>
                      <span>·</span>
                      <span>{concept.readingTime}</span>
                    </div>
                    <h3 className="mt-1.5 font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {concept.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                      {concept.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge variant="category">{concept.category}</Badge>
                      <Badge
                        className={getDifficultyColor(concept.difficulty)}
                      >
                        {concept.difficulty}
                      </Badge>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
