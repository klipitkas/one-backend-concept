import fs from "fs";
import path from "path";
import { getAllConcepts } from "../lib/content";
import { SITE_URL } from "../lib/constants";

const OUT_DIR = path.join(process.cwd(), "out");

function generateSitemap() {
  const concepts = getAllConcepts();

  const staticPages = ["", "/archive", "/about"];

  const urls = [
    ...staticPages.map((page) => ({
      loc: `${SITE_URL}${page}`,
      lastmod: new Date().toISOString().split("T")[0],
    })),
    ...concepts.map((concept) => ({
      loc: `${SITE_URL}/concepts/${concept.slug}`,
      lastmod: concept.date,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), xml, "utf-8");
  console.log(`Sitemap generated with ${urls.length} URLs`);
}

generateSitemap();
