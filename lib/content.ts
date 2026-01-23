import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content/concepts");

export interface ConceptFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  description: string;
}

export interface Concept extends ConceptFrontmatter {
  content: string;
  readingTime: string;
  filename: string;
}

function getSlugFromFilename(filename: string): string {
  // Remove .mdx extension and return the full filename as slug
  // e.g., "2026-01-23-load-balancing.mdx" -> "2026-01-23-load-balancing"
  return filename.replace(/\.mdx$/, "");
}

export function getAllConcepts(): Concept[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"));

  const concepts = files.map((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = getSlugFromFilename(file);

    return {
      ...(data as ConceptFrontmatter),
      slug, // Override slug from frontmatter with filename-based slug
      content,
      readingTime: readingTime(content).text,
      filename: file,
    };
  });

  return concepts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getConceptBySlug(slug: string): Concept | null {
  const concepts = getAllConcepts();
  return concepts.find((concept) => concept.slug === slug) || null;
}

export function getConceptSlugs(): string[] {
  return getAllConcepts().map((concept) => concept.slug);
}

export function getRecentConcepts(count: number = 5): Concept[] {
  return getAllConcepts().slice(0, count);
}

export function getConceptsByCategory(category: string): Concept[] {
  return getAllConcepts().filter((concept) => concept.category === category);
}

export function getAllCategories(): string[] {
  const concepts = getAllConcepts();
  const categories = new Set(concepts.map((concept) => concept.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const concepts = getAllConcepts();
  const tags = new Set(concepts.flatMap((concept) => concept.tags));
  return Array.from(tags).sort();
}
