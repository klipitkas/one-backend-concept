// Use refractor with all languages pre-loaded
import { refractor } from "refractor/all";
import { toHtml } from "hast-util-to-html";

const LANG_MAP: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  dockerfile: "docker",
  yml: "yaml",
  haproxy: "ini",
  conf: "ini",
  config: "ini",
  nginx: "nginx",
  redis: "bash",
  text: "bash",
  plaintext: "bash",
  "": "bash",
};

export function highlightCode(code: string, lang: string): string {
  const normalizedLang = lang?.toLowerCase() || "bash";
  const mappedLang = LANG_MAP[normalizedLang] || normalizedLang;

  try {
    if (refractor.registered(mappedLang)) {
      const tree = refractor.highlight(code, mappedLang);
      const html = toHtml(tree);
      return `<pre class="language-${mappedLang}"><code class="language-${mappedLang}">${html}</code></pre>`;
    }
  } catch {
    // Fall through to plain text
  }

  // Fallback to plain text
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<pre class="language-text"><code class="language-text">${escaped}</code></pre>`;
}
