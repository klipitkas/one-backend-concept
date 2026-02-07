# One Backend Concept

A daily learning resource for software engineers who want to deepen their understanding of backend systems and architecture. Every day, a new in-depth article covers a fundamental backend concept.

**Live site:** [klipitkas.github.io/one-backend-concept](https://klipitkas.github.io/one-backend-concept)

## Topics Covered

- **Infrastructure & Networking** — Load balancing, DNS, reverse proxies, WebSockets
- **Databases** — Indexing, sharding, replication, transactions
- **Caching** — Strategies, invalidation patterns
- **Security** — API authentication, authorization
- **Scalability** — Horizontal vs vertical scaling, connection pooling
- **Reliability** — Circuit breakers, event-driven architecture
- **APIs** — REST vs GraphQL, rate limiting
- **DevOps** — Containerization, message queues

## Tech Stack

- [Next.js 16](https://nextjs.org/) with static export
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- MDX content with [gray-matter](https://github.com/jonschlinkert/gray-matter) frontmatter parsing
- Syntax highlighting via [Refractor](https://github.com/wooorm/refractor)
- Deployed to [GitHub Pages](https://pages.github.com/)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (generates static site in out/)
npm run build
```

## Adding a New Concept

Create an MDX file in `content/concepts/` with the naming convention `YYYY-MM-DD-slug.mdx`:

```mdx
---
title: "Your Concept Title"
slug: "YYYY-MM-DD-your-concept-title"
date: "YYYY-MM-DD"
category: "Category Name"
difficulty: "Beginner" # or "Intermediate" or "Advanced"
tags: ["Tag1", "Tag2"]
description: "A brief description of the concept"
---

## Section Heading

Your content here...
```

## Project Structure

```
content/concepts/     # MDX articles
app/                  # Next.js app router pages
  concepts/[slug]/    # Dynamic concept pages
  archive/            # Archive listing page
  about/              # About page
components/           # React components
lib/                  # Utilities, content loading, constants
scripts/              # Build scripts (sitemap generation)
public/               # Static assets
```

## License

MIT
