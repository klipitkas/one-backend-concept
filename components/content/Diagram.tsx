"use client";

import { useEffect, useRef } from "react";

interface DiagramProps {
  children: string;
  caption?: string;
}

export function Diagram({ children, caption }: DiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          background: "#292524",
          primaryColor: "#f59e0b",
          primaryTextColor: "#fafaf9",
          primaryBorderColor: "#44403c",
          lineColor: "#a8a29e",
          secondaryColor: "#44403c",
          tertiaryColor: "#1c1917",
        },
      });

      try {
        const { svg } = await mermaid.render("mermaid-diagram", children);
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        containerRef.current.innerHTML = `<pre class="text-red-500">Diagram rendering failed</pre>`;
      }
    };

    renderDiagram();
  }, [children]);

  return (
    <figure className="my-8">
      <div
        ref={containerRef}
        className="flex justify-center overflow-x-auto rounded-lg border border-border bg-surface p-4"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
