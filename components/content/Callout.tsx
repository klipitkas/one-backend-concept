import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    container: "border-sky-500/30 bg-sky-500/5",
    icon: "text-sky-400",
    title: "text-sky-400",
  },
  warning: {
    container: "border-amber-500/30 bg-amber-500/5",
    icon: "text-amber-400",
    title: "text-amber-400",
  },
  tip: {
    container: "border-emerald-500/30 bg-emerald-500/5",
    icon: "text-emerald-400",
    title: "text-emerald-400",
  },
  danger: {
    container: "border-rose-500/30 bg-rose-500/5",
    icon: "text-rose-400",
    title: "text-rose-400",
  },
};

const icons = {
  info: "ℹ",
  warning: "⚠",
  tip: "💡",
  danger: "⛔",
};

const defaultTitles = {
  info: "Info",
  warning: "Warning",
  tip: "Tip",
  danger: "Danger",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = calloutStyles[type];
  const displayTitle = title || defaultTitles[type];

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        styles.container
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("text-lg", styles.icon)}>{icons[type]}</span>
        <span className={cn("font-semibold", styles.title)}>{displayTitle}</span>
      </div>
      <div className="mt-2 text-sm text-foreground/80">{children}</div>
    </div>
  );
}
