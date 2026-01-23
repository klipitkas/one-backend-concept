# One Backend Concept - Project Plan

## Overview

A blog-style educational platform that publishes one backend engineering concept or system design component daily at 12:00 UTC. Each post provides comprehensive coverage including overviews, diagrams, code examples, usage patterns, and common pitfalls.

---

## Technology Stack

### Frontend Framework: **Next.js 14+ (App Router)**

**Rationale:**
- Static Site Generation (SSG) for optimal performance and SEO
- Built-in MDX support for rich content with code highlighting
- Incremental Static Regeneration (ISR) for daily content updates
- Excellent developer experience with TypeScript support
- File-based routing simplifies blog post structure

### Styling: **Tailwind CSS + Typography Plugin**

**Rationale:**
- Rapid UI development with utility classes
- `@tailwindcss/typography` provides beautiful prose styling out of the box
- Easy dark mode implementation
- Highly customizable for clean, minimal design

### Code Highlighting: **Shiki**

**Rationale:**
- VS Code-quality syntax highlighting
- Supports 100+ languages
- Works at build time (no client-side JS)
- Beautiful themes (we'll use a monospace-friendly one)

### Typography: **JetBrains Mono / Fira Code**

**Rationale:**
- Industry-standard monospace fonts for code
- Ligature support for better code readability
- Free and open source

### Content Format: **MDX**

**Rationale:**
- Markdown with JSX components
- Supports custom diagram components
- Easy to write and maintain
- Can embed interactive examples

### Diagrams: **Mermaid.js**

**Rationale:**
- Text-based diagram generation
- Supports flowcharts, sequence diagrams, ER diagrams
- Perfect for system design illustrations
- Easy to version control

### Content Generation: **GitHub Actions + AI (Claude API)**

**Rationale:**
- Scheduled cron job at 12:00 UTC daily
- Claude API for high-quality technical content generation
- Automatic PR creation for content review (optional)
- Direct commit to main for fully automated publishing

### Deployment: **Vercel**

**Rationale:**
- Native Next.js support
- Automatic deployments on git push
- Edge network for fast global delivery
- Free tier sufficient for this project

### Database (Optional): **None initially**

**Rationale:**
- Content stored as MDX files in git
- No need for database complexity
- Easy to migrate later if needed (e.g., for comments, analytics)

---

## Project Structure

```
one-backend-concept/
├── app/
│   ├── layout.tsx              # Root layout with fonts, theme
│   ├── page.tsx                # Homepage (latest posts)
│   ├── concepts/
│   │   └── [slug]/
│   │       └── page.tsx        # Individual concept page
│   ├── archive/
│   │   └── page.tsx            # All concepts archive
│   └── about/
│       └── page.tsx            # About the project
├── components/
│   ├── ui/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── content/
│   │   ├── CodeBlock.tsx       # Syntax highlighted code
│   │   ├── Diagram.tsx         # Mermaid diagram wrapper
│   │   ├── Callout.tsx         # Tips, warnings, info boxes
│   │   └── TableOfContents.tsx
│   └── layout/
│       ├── Container.tsx
│       └── Sidebar.tsx
├── content/
│   └── concepts/
│       ├── 2024-01-01-load-balancing.mdx
│       ├── 2024-01-02-caching-strategies.mdx
│       └── ...
├── lib/
│   ├── mdx.ts                  # MDX processing utilities
│   ├── content.ts              # Content fetching/sorting
│   └── utils.ts                # General utilities
├── scripts/
│   └── generate-concept.ts     # Daily content generation script
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── .github/
│   └── workflows/
│       └── daily-concept.yml   # GitHub Action for daily generation
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Content Schema

Each concept MDX file will have the following frontmatter:

```yaml
---
title: "Load Balancing"
slug: "load-balancing"
date: "2024-01-15"
category: "Infrastructure"
difficulty: "Intermediate"
tags: ["distributed-systems", "scalability", "networking"]
description: "Understanding how load balancers distribute traffic across servers"
readingTime: 8
---
```

### Content Sections (Template)

1. **Overview** - Brief 2-3 paragraph introduction
2. **Visual Diagram** - Mermaid diagram showing the concept
3. **How It Works** - Detailed explanation with code examples
4. **Use Cases** - When to use this concept
5. **Implementation Examples** - Code in multiple languages
6. **Pitfalls & Caveats** - Common mistakes and gotchas
7. **Best Practices** - Recommended approaches
8. **Related Concepts** - Links to related topics
9. **Further Reading** - External resources

---

## Design Specifications

### Color Palette (Dark Theme Primary)

```
Background:     #0a0a0a (near black)
Surface:        #171717 (card backgrounds)
Border:         #262626 (subtle borders)
Text Primary:   #fafafa (headings)
Text Secondary: #a1a1aa (body text)
Accent:         #3b82f6 (blue for links/highlights)
Code BG:        #1e1e1e (VS Code dark)
```

### Typography Scale

```
Font Family (Prose): Inter or system-ui
Font Family (Code):  JetBrains Mono

Heading 1: 2.5rem / 700 weight
Heading 2: 2rem / 600 weight
Heading 3: 1.5rem / 600 weight
Body:      1.125rem / 400 weight / 1.75 line-height
Code:      0.9rem / 400 weight
```

### Layout

- Max content width: 768px (readable line length)
- Responsive padding: 1rem (mobile) to 2rem (desktop)
- Card-based design for concept previews
- Sticky table of contents on desktop (sidebar)

---

## Implementation Phases

### Phase 1: Foundation (MVP) ✅ COMPLETED
- [x] Initialize Next.js project with TypeScript
- [x] Configure Tailwind CSS v4 with custom theme
- [x] Set up MDX processing with Shiki syntax highlighting
- [x] Create base layout components (Header, Footer, Card, Badge)
- [x] Implement homepage with concept list
- [x] Create individual concept page template with navigation
- [x] Add 3 sample concepts (Load Balancing, Database Indexing, Caching Strategies)

### Phase 2: Content Components ✅ COMPLETED
- [x] Build CodeBlock component with copy button
- [x] Integrate Mermaid.js for diagrams
- [x] Create Callout component (tip, warning, info, danger)
- [x] Add Table of Contents generation (sticky sidebar)
- [x] Implement concept navigation (prev/next)
- [x] Archive page with year grouping

### Phase 3: Automation ✅ COMPLETED
- [x] Create content generation script using Claude API
- [x] Define concept topics list (50+ topics)
- [x] Set up GitHub Action for daily generation at 12:00 UTC

### Phase 4: Polish
- [ ] Add dark/light mode toggle
- [ ] Implement search functionality
- [ ] Add RSS feed
- [ ] SEO optimization (meta tags, OpenGraph)
- [ ] Performance optimization
- [ ] Analytics integration (optional)

---

## Concept Topics (Initial List)

### Infrastructure & Networking
1. Load Balancing
2. Reverse Proxy
3. CDN (Content Delivery Networks)
4. DNS and Service Discovery
5. API Gateway
6. Message Queues
7. Event-Driven Architecture
8. Microservices vs Monoliths

### Databases
9. Database Indexing
10. Database Sharding
11. Database Replication
12. CAP Theorem
13. ACID vs BASE
14. SQL vs NoSQL
15. Connection Pooling
16. Query Optimization

### Caching
17. Caching Strategies (Write-through, Write-back)
18. Cache Invalidation
19. Redis Deep Dive
20. Memcached vs Redis
21. CDN Caching
22. Browser Caching

### Security
23. Authentication vs Authorization
24. OAuth 2.0
25. JWT Tokens
26. Rate Limiting
27. CORS
28. SQL Injection Prevention
29. HTTPS/TLS

### Scalability
30. Horizontal vs Vertical Scaling
31. Auto-scaling
32. Stateless Architecture
33. Database Connection Pooling
34. Async Processing

### Reliability
35. Circuit Breaker Pattern
36. Retry Strategies
37. Idempotency
38. Health Checks
39. Graceful Degradation
40. Chaos Engineering

... (100+ more topics to be defined)

---

## Daily Generation Workflow

```
┌─────────────────────────────────────────────────────────┐
│                  GitHub Actions                          │
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │  Cron Job   │───▶│  Select     │───▶│  Generate   │  │
│  │  12:00 UTC  │    │  Topic      │    │  Content    │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│                                               │          │
│                     ┌─────────────┐           │          │
│                     │  Commit &   │◀──────────┘          │
│                     │  Push       │                      │
│                     └─────────────┘                      │
│                            │                             │
└────────────────────────────│─────────────────────────────┘
                             │
                             ▼
                     ┌─────────────┐
                     │   Vercel    │
                     │  Auto-deploy│
                     └─────────────┘
```

---

## Environment Variables

```env
# Required for content generation
ANTHROPIC_API_KEY=sk-ant-...

# Optional
NEXT_PUBLIC_SITE_URL=https://onebackendconcept.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Success Metrics

1. **Content Quality**: Each concept should be comprehensive (1500-3000 words)
2. **Consistency**: Daily publication without gaps
3. **Engagement**: Time on page, scroll depth (via analytics)
4. **SEO**: Organic traffic growth over time
5. **Accessibility**: Lighthouse score > 90

---

## Future Enhancements (Post-MVP)

- Newsletter subscription
- Comments system (using GitHub Discussions or Giscus)
- Interactive code playgrounds
- Concept quizzes
- Progress tracking for logged-in users
- Community contributions (PRs for corrections)
- Podcast/audio versions of concepts
