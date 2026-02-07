import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-muted">
        This concept doesn&apos;t exist yet.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-accent transition-colors hover:text-accent/80"
      >
        &larr; Back to all concepts
      </Link>
    </div>
  );
}
