import { TableOfContents } from '@/components/content/TableOfContents';
import { JsonLd } from '@/components/JsonLd';
import { Badge } from '@/components/ui/Badge';
import {
  getAllConcepts,
  getConceptBySlug,
  getConceptSlugs,
} from '@/lib/content';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { highlightCode } from '@/lib/prism';
import { formatDate, getDifficultyColor } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getConceptSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    return { title: 'Not Found' };
  }

  return {
    title: concept.title,
    description: concept.description,
    keywords: concept.tags,
    openGraph: {
      type: 'article',
      title: concept.title,
      description: concept.description,
      publishedTime: concept.date,
      tags: concept.tags,
    },
    twitter: {
      card: 'summary',
      title: concept.title,
      description: concept.description,
    },
    alternates: {
      canonical: `/concepts/${slug}`,
    },
  };
}

function processInlineFormatting(text: string): string {
  // Handle inline code
  let processed = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Handle bold
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Handle italic
  processed = processed.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return processed;
}

// MDX-to-HTML converter with code highlighting
async function renderContent(content: string): Promise<string> {
  const lines = content.split('\n');
  const blocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      const codeLang = line.slice(3).trim();
      let codeContent = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeContent += lines[i] + '\n';
        i++;
      }
      i++; // skip closing ```
      const highlighted = await highlightCode(codeContent.trim(), codeLang);
      blocks.push(`<div class="code-block not-prose my-6">
        ${codeLang ? `<div class="code-lang">${codeLang}</div>` : ''}
        <div class="overflow-x-auto">${highlighted}</div>
      </div>`);
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      const text = line.slice(3);
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      blocks.push(`<h2 id="${id}">${processInlineFormatting(text)}</h2>`);
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      const text = line.slice(4);
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      blocks.push(`<h3 id="${id}">${processInlineFormatting(text)}</h3>`);
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        let tableHtml = '<table>';
        const headerCells = tableLines[0].split('|').filter((c) => c.trim() !== '');
        tableHtml += '<thead><tr>';
        for (const cell of headerCells) {
          tableHtml += `<th>${processInlineFormatting(cell.trim())}</th>`;
        }
        tableHtml += '</tr></thead><tbody>';
        // Skip header and separator rows
        for (let r = 2; r < tableLines.length; r++) {
          const cells = tableLines[r].split('|').filter((c) => c.trim() !== '');
          tableHtml += '<tr>';
          for (const cell of cells) {
            tableHtml += `<td>${processInlineFormatting(cell.trim())}</td>`;
          }
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table>';
        blocks.push(tableHtml);
      }
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      let listHtml = '<ul>';
      while (i < lines.length && lines[i].startsWith('- ')) {
        listHtml += `<li>${processInlineFormatting(lines[i].slice(2))}</li>`;
        i++;
      }
      listHtml += '</ul>';
      blocks.push(listHtml);
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      let listHtml = '<ol>';
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        const text = lines[i].replace(/^\d+\.\s*/, '');
        listHtml += `<li>${processInlineFormatting(text)}</li>`;
        i++;
      }
      listHtml += '</ol>';
      blocks.push(listHtml);
      continue;
    }

    // Empty line - skip
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph - collect consecutive non-empty, non-special lines
    let paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('- ') &&
      !lines[i].match(/^\d+\.\s/)
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      const paragraphText = paragraphLines.join(' ');
      blocks.push(`<p>${processInlineFormatting(paragraphText)}</p>`);
    }
  }

  return blocks.join('\n');
}

export default async function ConceptPage({ params }: PageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  const allConcepts = getAllConcepts();
  const currentIndex = allConcepts.findIndex((c) => c.slug === slug);
  const prevConcept =
    currentIndex < allConcepts.length - 1
      ? allConcepts[currentIndex + 1]
      : null;
  const nextConcept = currentIndex > 0 ? allConcepts[currentIndex - 1] : null;

  const renderedContent = await renderContent(concept.content);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: concept.title,
          description: concept.description,
          datePublished: concept.date,
          keywords: concept.tags.join(', '),
          url: `${SITE_URL}/concepts/${slug}`,
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
        }}
      />
      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
        <div>
          {/* Header */}
          <header>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <time dateTime={concept.date}>{formatDate(concept.date)}</time>
              <span>·</span>
              <span>{concept.readingTime}</span>
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              {concept.title}
            </h1>

            <p className="mt-4 text-lg text-muted">{concept.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="category">{concept.category}</Badge>
              <Badge className={getDifficultyColor(concept.difficulty)}>
                {concept.difficulty}
              </Badge>
              {concept.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </header>

          {/* Content */}
          <article
            className="prose prose-invert mt-12 max-w-none"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />

          {/* Navigation */}
          <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {prevConcept ? (
              <Link
                href={`/concepts/${prevConcept.slug}`}
                className="group rounded-lg border border-border p-4 transition-colors hover:border-accent/50"
              >
                <span className="text-sm text-muted">Previous</span>
                <span className="mt-1 block font-medium transition-colors group-hover:text-accent">
                  {prevConcept.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextConcept && (
              <Link
                href={`/concepts/${nextConcept.slug}`}
                className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-accent/50"
              >
                <span className="text-sm text-muted">Next</span>
                <span className="mt-1 block font-medium transition-colors group-hover:text-accent">
                  {nextConcept.title}
                </span>
              </Link>
            )}
          </nav>
        </div>

        {/* Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  );
}
