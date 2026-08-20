/**
 * Audits every Event in the *built* HTML — not the source — and fails the build
 * pipeline on anything malformed.
 *
 *     node scripts/verify-event-schema.mjs        # after `next build`
 *
 * This exists because the "Missing field 'endDate'" issue was invisible to the
 * type checker and the linter: the field was simply absent from an object
 * literal, which is valid TypeScript and valid JSON. The only place the defect
 * was observable was the rendered markup, so that is what gets checked.
 *
 * Errors (exit 1):
 *   - JSON-LD that does not parse
 *   - Event missing name, startDate, location or organizer
 *   - startDate or endDate not ISO-8601 parseable
 *   - endDate not strictly after startDate
 *   - the same event name + date emitted by two different URLs, which Google
 *     may read as duplicate or conflicting events
 *
 * Warnings (exit 0, listed):
 *   - Event with no endDate. Google recommends but does not require it, and an
 *     invented end time would be worse than the warning. Each line here is an
 *     `endTime` the Mandal has not decided yet.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = "out";
const LD_RE =
  /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return full.endsWith(".html") ? [full] : [];
  });
}

const errors = [];
const warnings = [];
const seen = new Map(); // "name@date" -> url
let eventCount = 0;
let withEnd = 0;

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&");

for (const file of htmlFiles(OUT)) {
  const url = "/" + relative(OUT, file).replace(/(index)?\.html$/, "");
  // The 404 page is noindexed and never a rich result; it also exists twice on
  // disk (404.html and 404/index.html), which would self-report as duplicate.
  if (url.startsWith("/404")) continue;
  const html = readFileSync(file, "utf8");

  for (const match of html.matchAll(LD_RE)) {
    let parsed;
    try {
      parsed = JSON.parse(decode(match[1]));
    } catch (err) {
      errors.push(`${url}: JSON-LD does not parse — ${err.message}`);
      continue;
    }

    for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
      const type = node["@type"];
      const types = Array.isArray(type) ? type : [type];
      // Festival is a subtype of Event and is held to the same rules.
      if (!types.some((t) => t === "Event" || t === "Festival")) continue;

      eventCount++;
      const label = `${url} "${node.name ?? "(unnamed)"}"`;

      for (const field of ["name", "startDate", "location", "organizer"]) {
        if (!node[field]) errors.push(`${label}: missing ${field}`);
      }

      const start = Date.parse(node.startDate);
      if (node.startDate && Number.isNaN(start)) {
        errors.push(`${label}: startDate "${node.startDate}" is not ISO-8601`);
      }

      if (node.endDate === undefined) {
        warnings.push(`${label}: no endDate — end time not set in content`);
      } else {
        withEnd++;
        const end = Date.parse(node.endDate);
        if (Number.isNaN(end)) {
          errors.push(`${label}: endDate "${node.endDate}" is not ISO-8601`);
        } else if (!Number.isNaN(start) && end <= start) {
          errors.push(
            `${label}: endDate ${node.endDate} is not after startDate ${node.startDate}`,
          );
        }
      }

      // Same name and date is only a conflict when the two nodes claim to be
      // different entities. The sitewide Festival carries one @id and appears
      // on every page by design — that is a single event described repeatedly,
      // which Google merges. Two distinct @ids for one real event is the bug.
      const key = `${node.name}@${String(node.startDate).slice(0, 10)}`;
      const id = node["@id"] ?? `${url}#anonymous`;
      const prior = seen.get(key);
      if (prior && prior.id !== id) {
        errors.push(
          `duplicate event "${node.name}" — ${prior.url} emits ${prior.id}, ` +
            `${url} emits ${id}. One real event should have one @id.`,
        );
      } else if (!prior) {
        seen.set(key, { url, id });
      }
    }
  }
}

console.log(
  `event schema: ${eventCount} events across ${seen.size} unique name+date pairs, ` +
    `${withEnd} with endDate`,
);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.error(`  ERROR ${e}`);

if (errors.length) {
  console.error(`\n${errors.length} error(s) in Event structured data`);
  process.exit(1);
}
