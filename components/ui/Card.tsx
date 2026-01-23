import Link from "next/link";
import { Badge } from "./Badge";
import { formatDate, getDifficultyColor, cn } from "@/lib/utils";
import type { Concept } from "@/lib/content";

interface ConceptCardProps {
  concept: Concept;
  featured?: boolean;
}

export function ConceptCard({ concept, featured = false }: ConceptCardProps) {
  return (
    <Link href={`/concepts/${concept.slug}`} className="group block">
      <article
        className={cn(
          "rounded-lg border border-border bg-surface p-6 transition-all",
          "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5",
          featured && "border-accent/30"
        )}
      >
        <div className="flex items-center gap-2 text-sm text-muted">
          <time dateTime={concept.date}>{formatDate(concept.date)}</time>
          <span>·</span>
          <span>{concept.readingTime}</span>
        </div>

        <h2
          className={cn(
            "mt-2 font-semibold tracking-tight transition-colors group-hover:text-accent",
            featured ? "text-2xl" : "text-xl"
          )}
        >
          {concept.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-muted">{concept.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="category">{concept.category}</Badge>
          <Badge className={getDifficultyColor(concept.difficulty)}>
            {concept.difficulty}
          </Badge>
        </div>
      </article>
    </Link>
  );
}
