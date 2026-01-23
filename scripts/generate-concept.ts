import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const CONCEPTS_DIR = path.join(process.cwd(), "content/concepts");

// Backend concepts to generate - this list will be cycled through
const CONCEPT_TOPICS = [
  { topic: "Rate Limiting", category: "Security", difficulty: "Intermediate" },
  { topic: "Circuit Breaker Pattern", category: "Reliability", difficulty: "Intermediate" },
  { topic: "Database Sharding", category: "Databases", difficulty: "Advanced" },
  { topic: "Message Queues", category: "Infrastructure", difficulty: "Intermediate" },
  { topic: "API Gateway", category: "Infrastructure", difficulty: "Intermediate" },
  { topic: "Database Replication", category: "Databases", difficulty: "Intermediate" },
  { topic: "CAP Theorem", category: "Distributed Systems", difficulty: "Intermediate" },
  { topic: "Event-Driven Architecture", category: "Architecture", difficulty: "Intermediate" },
  { topic: "Microservices vs Monoliths", category: "Architecture", difficulty: "Beginner" },
  { topic: "Connection Pooling", category: "Databases", difficulty: "Intermediate" },
  { topic: "Reverse Proxy", category: "Infrastructure", difficulty: "Beginner" },
  { topic: "CDN (Content Delivery Networks)", category: "Infrastructure", difficulty: "Beginner" },
  { topic: "DNS and Service Discovery", category: "Infrastructure", difficulty: "Intermediate" },
  { topic: "OAuth 2.0", category: "Security", difficulty: "Intermediate" },
  { topic: "JWT Tokens", category: "Security", difficulty: "Beginner" },
  { topic: "CORS", category: "Security", difficulty: "Beginner" },
  { topic: "SQL Injection Prevention", category: "Security", difficulty: "Beginner" },
  { topic: "HTTPS and TLS", category: "Security", difficulty: "Intermediate" },
  { topic: "Horizontal vs Vertical Scaling", category: "Scalability", difficulty: "Beginner" },
  { topic: "Auto-scaling", category: "Scalability", difficulty: "Intermediate" },
  { topic: "Stateless Architecture", category: "Scalability", difficulty: "Intermediate" },
  { topic: "Async Processing", category: "Scalability", difficulty: "Intermediate" },
  { topic: "Retry Strategies", category: "Reliability", difficulty: "Intermediate" },
  { topic: "Idempotency", category: "Reliability", difficulty: "Intermediate" },
  { topic: "Health Checks", category: "Reliability", difficulty: "Beginner" },
  { topic: "Graceful Degradation", category: "Reliability", difficulty: "Intermediate" },
  { topic: "Cache Invalidation", category: "Caching", difficulty: "Advanced" },
  { topic: "Redis Deep Dive", category: "Caching", difficulty: "Intermediate" },
  { topic: "Query Optimization", category: "Databases", difficulty: "Intermediate" },
  { topic: "ACID vs BASE", category: "Databases", difficulty: "Intermediate" },
  { topic: "SQL vs NoSQL", category: "Databases", difficulty: "Beginner" },
  { topic: "WebSockets", category: "Networking", difficulty: "Intermediate" },
  { topic: "gRPC", category: "Networking", difficulty: "Intermediate" },
  { topic: "REST API Best Practices", category: "APIs", difficulty: "Beginner" },
  { topic: "GraphQL", category: "APIs", difficulty: "Intermediate" },
  { topic: "API Versioning", category: "APIs", difficulty: "Beginner" },
  { topic: "Logging Best Practices", category: "Observability", difficulty: "Beginner" },
  { topic: "Distributed Tracing", category: "Observability", difficulty: "Intermediate" },
  { topic: "Metrics and Monitoring", category: "Observability", difficulty: "Intermediate" },
  { topic: "Containerization with Docker", category: "DevOps", difficulty: "Beginner" },
  { topic: "Kubernetes Basics", category: "DevOps", difficulty: "Intermediate" },
  { topic: "CI/CD Pipelines", category: "DevOps", difficulty: "Intermediate" },
  { topic: "Blue-Green Deployments", category: "DevOps", difficulty: "Intermediate" },
  { topic: "Feature Flags", category: "DevOps", difficulty: "Beginner" },
  { topic: "Database Migrations", category: "Databases", difficulty: "Intermediate" },
  { topic: "Consensus Algorithms (Raft/Paxos)", category: "Distributed Systems", difficulty: "Advanced" },
  { topic: "Two-Phase Commit", category: "Distributed Systems", difficulty: "Advanced" },
  { topic: "Saga Pattern", category: "Distributed Systems", difficulty: "Advanced" },
  { topic: "CQRS Pattern", category: "Architecture", difficulty: "Advanced" },
  { topic: "Event Sourcing", category: "Architecture", difficulty: "Advanced" },
];

function getExistingConcepts(): Set<string> {
  if (!fs.existsSync(CONCEPTS_DIR)) {
    fs.mkdirSync(CONCEPTS_DIR, { recursive: true });
    return new Set();
  }

  const files = fs.readdirSync(CONCEPTS_DIR);
  const topics = new Set<string>();

  for (const file of files) {
    const content = fs.readFileSync(path.join(CONCEPTS_DIR, file), "utf-8");
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    if (titleMatch) {
      topics.add(titleMatch[1].toLowerCase());
    }
  }

  return topics;
}

function selectNextTopic(): (typeof CONCEPT_TOPICS)[0] | null {
  const existing = getExistingConcepts();

  for (const concept of CONCEPT_TOPICS) {
    if (!existing.has(concept.topic.toLowerCase())) {
      return concept;
    }
  }

  return null;
}

function generateSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getTodayDate(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

async function generateConcept() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY environment variable is required");
    process.exit(1);
  }

  const topic = selectNextTopic();
  if (!topic) {
    console.log("All concepts have been generated!");
    process.exit(0);
  }

  console.log(`Generating concept: ${topic.topic}`);

  const anthropic = new Anthropic({ apiKey });

  const prompt = `You are a senior backend engineer writing an educational article about "${topic.topic}" for software engineers.

Write a comprehensive MDX article with the following structure:

1. **Overview** (2-3 paragraphs) - Brief introduction explaining what this concept is and why it matters
2. **How It Works** - Detailed explanation with diagrams described in text (use ASCII art for simple diagrams)
3. **Implementation Examples** - Code examples in relevant languages (Python, JavaScript/TypeScript, Go, or SQL as appropriate)
4. **Use Cases** - When and why to use this
5. **Common Pitfalls** - At least 3 common mistakes and how to avoid them
6. **Best Practices** - Actionable recommendations
7. **Related Concepts** - Brief mentions of related topics
8. **Further Reading** - Suggested resources (no URLs needed, just names)

Requirements:
- Write 1500-2500 words
- Include at least 3 code examples with syntax highlighting
- Be practical and actionable
- Use clear, concise language
- Target intermediate developers who want to level up

Output ONLY the MDX content starting with the frontmatter (---). Do not include any other text.

The frontmatter should be:
---
title: "${topic.topic}"
slug: "${generateSlug(topic.topic)}"
date: "${getTodayDate()}"
category: "${topic.category}"
difficulty: "${topic.difficulty}"
tags: [relevant, tags, here]
description: "A one-sentence description"
---`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    console.error("Unexpected response type");
    process.exit(1);
  }

  const mdxContent = content.text;
  const date = getTodayDate();
  const slug = generateSlug(topic.topic);
  const filename = `${date}-${slug}.mdx`;
  const filepath = path.join(CONCEPTS_DIR, filename);

  fs.writeFileSync(filepath, mdxContent);
  console.log(`Created: ${filepath}`);
}

generateConcept().catch(console.error);
