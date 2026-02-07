import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="font-mono text-base font-semibold text-accent transition-colors">{">"}_</span>
          <span className="font-medium text-foreground/90 transition-colors group-hover:text-foreground">
            One Backend Concept
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/archive"
            className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            Archive
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            About
          </Link>
          <a
            href="https://github.com/klipitkas/one-backend-concept"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            GitHub
          </a>
          <div className="ml-2 border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
