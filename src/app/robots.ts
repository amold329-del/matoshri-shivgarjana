import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://matoshreechavighnaharta.co.in";

/**
 * Static robots.txt — generated at build time (export-safe).
 *
 * Search and answer-engine crawlers are explicitly allowed. Being crawlable is
 * the actual prerequisite for appearing in AI Overviews, AI Mode, ChatGPT
 * Search, Perplexity and Claude — a page that cannot be fetched cannot be
 * cited. Listing the named agents alongside the wildcard makes that intent
 * explicit and survives any future tightening of the default rule.
 */
const ANSWER_ENGINE_AGENTS = [
  "Googlebot",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Bingbot",
  "GPTBot", // OpenAI training + ChatGPT browsing
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "CCBot", // Common Crawl — feeds many model corpora
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ANSWER_ENGINE_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
