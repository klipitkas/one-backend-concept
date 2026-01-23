import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the One Backend Concept project",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-invert mx-auto max-w-2xl">
        <h1>About One Backend Concept</h1>

        <p className="lead">
          One Backend Concept is a daily learning resource for software engineers
          who want to deepen their understanding of backend systems and architecture.
        </p>

        <h2>What We Cover</h2>
        <p>
          Every day at 12:00 UTC, we publish a new in-depth article covering a
          fundamental backend concept. Topics include:
        </p>
        <ul>
          <li>
            <strong>Infrastructure &amp; Networking</strong> — Load balancing, CDNs,
            API gateways, message queues
          </li>
          <li>
            <strong>Databases</strong> — Indexing, sharding, replication, query
            optimization
          </li>
          <li>
            <strong>Caching</strong> — Strategies, invalidation, Redis, Memcached
          </li>
          <li>
            <strong>Security</strong> — Authentication, authorization, encryption,
            OWASP
          </li>
          <li>
            <strong>Scalability</strong> — Horizontal scaling, stateless design,
            async processing
          </li>
          <li>
            <strong>Reliability</strong> — Circuit breakers, retries, chaos
            engineering
          </li>
        </ul>

        <h2>How It Works</h2>
        <p>Each concept article includes:</p>
        <ol>
          <li>A brief overview of the concept</li>
          <li>Visual diagrams to illustrate the architecture</li>
          <li>Detailed explanations with code examples</li>
          <li>Real-world use cases</li>
          <li>Common pitfalls and how to avoid them</li>
          <li>Best practices and recommendations</li>
        </ol>

        <h2>Who Is This For?</h2>
        <p>This resource is designed for:</p>
        <ul>
          <li>Software engineers preparing for system design interviews</li>
          <li>Developers transitioning to backend or full-stack roles</li>
          <li>Engineers looking to strengthen their architectural knowledge</li>
          <li>Anyone curious about how large-scale systems work</li>
        </ul>

        <h2>Stay Updated</h2>
        <p>
          Bookmark this site and visit daily, or follow us on social media for
          concept announcements. Each article is carefully crafted to be
          comprehensive yet digestible in a single sitting.
        </p>

        <hr />

        <p className="text-sm text-muted">
          Built with Next.js, Tailwind CSS, and MDX. Content generated with the
          help of AI and reviewed for accuracy.
        </p>
      </article>
    </div>
  );
}
