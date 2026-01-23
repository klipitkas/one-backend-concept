export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Beginner":
      return "bg-green/10 text-green border-green/20";
    case "Intermediate":
      return "bg-yellow/10 text-yellow border-yellow/20";
    case "Advanced":
      return "bg-red/10 text-red border-red/20";
    default:
      return "bg-surface text-muted border-border";
  }
}
