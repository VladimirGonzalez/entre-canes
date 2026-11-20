import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Crawlers de buscadores con IA. "*" ya los permite, pero los nombramos
// para que quede explícito que queremos aparecer en sus respuestas
// (ChatGPT, Claude, Perplexity, Gemini, Copilot, Apple Intelligence).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
