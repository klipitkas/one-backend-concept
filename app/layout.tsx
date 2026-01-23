import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "One Backend Concept",
    template: "%s | One Backend Concept",
  },
  description:
    "Learn one backend engineering concept every day. Deep dives into system design, databases, caching, and more.",
  keywords: [
    "backend",
    "engineering",
    "system design",
    "software engineering",
    "distributed systems",
  ],
};

// Script to prevent theme flash - runs before React hydration
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'light') {
        document.documentElement.classList.add('light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
