"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    ).map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: element.tagName === "H2" ? 2 : 3,
    }));

    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    elements.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block">
      <div className="sticky top-24">
        <h4 className="mb-4 text-sm font-semibold">On this page</h4>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block text-muted transition-colors hover:text-foreground",
                  heading.level === 3 && "pl-4",
                  activeId === heading.id && "text-accent"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
