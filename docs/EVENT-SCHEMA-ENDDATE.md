# Event structured data — `endDate` root cause and fix

**20 August 2026.** Search Console reported *Missing field 'endDate'* against 8
Events, validation failed on 20/08 after being requested on 17/08.

---

## Root cause

Event JSON-LD was assembled as an **inline object literal in two separate
route files**, with no shared builder:

| File | Events | `endDate` |
|---|---|---|
| `src/app/events/page.tsx` | 6, from `content/events.json` | key absent from the literal |
| `src/app/procession/page.tsx` | 2, from `content/procession.json` | key absent from the literal |
| `src/app/structured-data.tsx` | 1 `Festival`, sitewide | present and correct |

The two duplicated literals simply had no `endDate` key. Nothing could catch
this: an absent key is valid TypeScript, valid JSON and valid schema.org, and
the defect was observable only in the rendered HTML. The one generator that got
it right was the one that existed in a single copy.

**The procession events were worse than "data unavailable".** `content/procession.json`
has always carried the real ranges — `"7:00 PM to 9:00 PM"` and `"4:00 PM to 9:00 PM"` —
and the page displays them. The mapper interpolated that range into the
*description sentence* and then emitted a bare date-only `startDate`. The end
times existed in the content and the mapping threw them away.

So the 8 failures were two different problems wearing the same label:

- **2 events** (`/procession/`) — end times present in content, dropped in mapping. **A bug. Fixed.**
- **6 events** (`/events/`) — no end time in the content at all. **Missing data, not a bug.** See below.

Ruled out by inspection: no `undefined`/`null`/empty values, no date
mis-formatting, no client-side script rewriting the schema (the site is a static
export; all JSON-LD is in the served HTML), no third-party SEO plugin.

## The fix, centralized

**`src/lib/event-schema.ts` is new and is now the only place an Event is built.**
Both routes call `buildEvent()`. It:

- parses 12-hour clock times to ISO-8601 with the `+05:30` IST offset
- emits `endDate` **only** from a real `endTime` or `endDate` in the content — no
  fallback to `startDate`, no assumed duration, no `new Date()`
- **throws** on a malformed date, an unparseable time, or any end that is not
  strictly after its start; it runs at module scope, so a violation fails
  `next build` rather than shipping
- carries the shared organizer, address, images and free-entry offer that were
  previously copy-pasted between the two files

Content model gained optional, never-guessed fields: `EventItem.endTime`,
`ProcessionRoute.startTime` / `endTime` (the machine-readable form of the
`timeLabel` already shown on the page).

The sitewide `Festival` stays outside the builder deliberately — it is the
eleven-day umbrella event with its own `@id`, not a programme — and that
reasoning is now a comment in `src/app/structured-data.tsx` so the next person
does not "helpfully" fork a third copy.

## A duplicate the audit turned up

`विसर्जन मिरवणूक` was emitted **twice**: by `/events/` (5:00 PM) and by
`/procession/` (4:00 PM–9:00 PM). One real procession, two `@id`s, two different
start times. `EventItem.schemaRef` now lets an event declare that another page
owns its structured data; `e4` points at `/procession/#visarjan`, so the card
still renders on `/events/` while the Event node is emitted once, by the page
that holds the full route and the real time range.

**Still needs a human decision:** the two pages *display* different start times
for that procession — 5:00 PM on `/events/`, 4:00 PM on `/procession/`. That is a
content contradiction devotees will see. Tell me which is the start and I will
align them.

## Result in the shipped HTML

```json
{
  "@type": "Event",
  "@id": "https://matoshreechavighnaharta.co.in/procession/#visarjan",
  "name": "विसर्जन मिरवणूक",
  "startDate": "2026-09-25T16:00:00+05:30",
  "endDate": "2026-09-25T21:00:00+05:30",
  "isAccessibleForFree": true
}
```

`24 events across 8 unique name+date pairs, 19 with endDate` — the 24 counts the
sitewide Festival once per page.

## What is deliberately still without `endDate`

Five programmes, because the Mandal has not set a finishing time:

| Event | Start | Needs |
|---|---|---|
| केळी वितरण — आषाढी एकादशी | 2026-07-25 (no time) | start + end time |
| गणपती स्थापना | 14 Sep, 6:00 AM | end time |
| सांस्कृतिक संध्या | 17 Sep, 7:30 PM | end time |
| महाप्रसाद व सामुदायिक भोजन | 20 Sep, 8:00 AM | end time |
| ४६ वा गणेशोत्सव | 2025-09-06 | end date of the 2025 festival |

`endDate` is **recommended**, not required, by Google — these still produce valid
Event rich results. Inventing "probably about two hours" for a page devotees plan
their evening around would be worse than the warning. Add `"endTime": "9:00 PM"`
to the entry in `content/events.json` and the `endDate` appears automatically.

## Guards against regression

- `npm run test:events` — 11 unit tests over the builder (single-day, multi-day,
  timezone, midnight/noon, missing end, date-only, end-before-start,
  end-equals-start, malformed date, malformed time, required fields, distinct
  `@id`s). Node's built-in test runner and TypeScript stripping; **no new
  dependency**.
- `npm run verify:events` — parses every JSON-LD block in `out/` and fails on a
  missing required field, an unparseable date, an `endDate` not after its
  `startDate`, or one real event emitted under two `@id`s. It reports
  end-time gaps as warnings, so the five above stay visible without blocking.
- Both wired into `.github/workflows/deploy.yml`: tests before the build,
  verifier against the built HTML after it. A regression cannot deploy.

## Validation performed

```
npm run test:events    11 pass, 0 fail
tsc --noEmit           clean
eslint                 clean
next build             26/26 pages, export OK
npm run verify:events   exit 0 — 0 errors, 5 end-time gaps listed
SEO audit              still 1 finding (/404/ has no canonical, correct)
```

Rendered HTML inspected directly for `/events/`, `/procession/` and the sitewide
Festival — not just the source.

**Not done here:** Google's Rich Results Test needs a browser and the live URL,
so run it yourself once deployed.

## Search Console, after deploying

1. Push, and confirm the Actions run is green — the two new checks run there now.
2. Rich Results Test on `https://matoshreechavighnaharta.co.in/procession/` and
   `/events/` — expect Events with `startDate` and, on procession, `endDate`.
3. Search Console → Events → *Missing field 'endDate'* → **Start new validation**.

Expect it to sit at *Validation started* for days, sometimes a couple of weeks —
Google has to recrawl each URL. Do not re-trigger it in the meantime; that resets
the queue. The `/events/` items will keep reporting the warning until end times
are added, and that is the correct outcome, not a failure.
