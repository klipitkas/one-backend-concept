"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  highlightedHtml?: string;
}

export function CodeBlock({ children, language, filename, highlightedHtml }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-border bg-surface">
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-2">
          <span className="font-mono text-xs text-muted">
            {filename || language}
          </span>
        </div>
      )}

      <div className="relative">
        <button
          onClick={handleCopy}
          className={cn(
            "absolute right-2 top-2 rounded-md border border-border bg-background/80 px-2 py-1",
            "text-xs text-muted opacity-0 transition-all hover:text-foreground",
            "group-hover:opacity-100 focus:opacity-100"
          )}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        {highlightedHtml ? (
          <div
            className="overflow-x-auto p-4 font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="overflow-x-auto p-4 font-mono text-sm">
            <code>{children}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
