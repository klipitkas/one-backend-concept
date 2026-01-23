import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "category" | "difficulty";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "border-border bg-surface text-muted",
        variant === "category" && "border-accent/20 bg-accent/10 text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
