# SEO

## 1. The sitemap error — read this first

Your Search Console screenshot says:

```
Sitemaps  >  https://matoshreechavighnaharta.co.in/
            Sitemap can be read, but has errors
            Sitemap is HTML
            "Your Sitemap appears to be an HTML page."
            Line 1   Tag:   html
```

**The submitted sitemap URL is the homepage.** Look at the breadcrumb — it ends
in `/`, not `/sitemap.xml`. So Google fetched your homepage, found `<html>` on
line 1, and told you exactly that. "Discovered pages: 0" follows from the same
thing.

**Your sitemap is not missing.** It builds correctly, it lists all 13 URLs, and
`robots.txt` already points at it. The QA report confirmed the same thing on
14 July (N-23, Pass). Nothing in the code was broken here.

### Fix it (30 seconds)

1. Search Console → **Sitemaps**.
2. Delete the bad entry: click the row for `https://matoshreechavighnaharta.co.in/`
   → ⋮ menu → **Remove sitemap**.
3. In **Add a new sitemap**, the field is already prefixed with your domain.
   Type just:

   ```
   sitemap.xml
   ```

   Not `/`. Not the full URL. The result should read
   `https://matoshreechavighnaharta.co.in/sitemap.xml`.
4. Submit. Status should go to **Success**, Discovered pages **13**.

Check it yourself first — open `https://matoshreechavighnaharta.co.in/sitemap.xml`
in a browser. You should see XML with 13 `<loc>` entries. If you see the
homepage instead, tell me; that would be a different problem.

---

## 2. "I want the site to appear on top"

I'm not going to promise you that, because nobody can. Rankings aren't a
setting. But the honest version is better news than it sounds, because it splits
into three very different questions:

**Searches for your own name** — "मातोश्री शिवगर्जना", "Matoshree cha
Vighnaharta", "Matoshri Shivgarjana mandal". You should rank #1. Almost nothing
competes for that exact name. **Right now you rank nowhere — I searched, and the
site does not appear for its own name.** That is the whole problem, and it is
fixable.

**Local searches** — "Ganpati mandal Bhoiwada", "गणेशोत्सव मंडळ परळ". Winnable,
but the website is the *smaller* half. See Google Business Profile below.

**Generic competitive searches** — "Ganpati mandal Mumbai", "best Ganesh mandal".
You will not outrank Lalbaugcha Raja. That is decades of press coverage and
links, not a technical gap. Anyone who tells you otherwise is selling something.
Chasing this would waste your time; the first two are where your visitors are.

### Why you're invisible right now

Not a mystery, and mostly not your fault:

1. **All 13 pages told Google they were the homepage.** That's N-20 — the
   canonical bug. Google saw one page, not thirteen. Fixed in the code, but
   **not live until you deploy.**
2. **The sitemap was never actually submitted** — see above.
3. **The site is new.** Registered 2025. Indexing takes weeks, not days.

Fix 1 and 2 and the rest follows. There's no third trick.

---

## 3. What shipped in this update

**`src/lib/structured-data.ts`** — the old JSON-LD was valid but thin. Its
`address` had only locality/region/country: no street, no postal code. That's
most of what Google needs to tie you to a real place in Bhoiwada. Now:

- full `PostalAddress` (street, 400012), `telephone`, `logo`, `image`
- `areaServed`, `knowsLanguage`, `@id` so other blocks can reference it
- sourced from `content/settings.json`, so it can't drift from what `/contact/`
  renders

**Event schema on `/events/`** — the highest-value markup on this site.
Ganeshotsav searches spike for a few weeks a year, and event markup is what makes
a listing eligible for a date-stamped result instead of a plain blue link. All
four upcoming events, each with the venue address and a proper IST timestamp
(`2026-09-14T06:00:00+05:30` — a bare date reads as UTC midnight and lands on the
wrong day in India). Only upcoming events are emitted; stale event markup is
worse than none.

**`sitemap.ts`** — dropped `lastmod`, `changefreq` and `priority`. Google ignores
changefreq and priority outright, and `lastmod` was `new Date()` — build time —
so every deploy claimed all 13 pages had just changed. Google only honours
`lastmod` when it's verifiably accurate; a build-time stamp trains it to ignore
the field. Omitting it beats lying. The sitemap is now a clean list of 13
canonical URLs.

### One thing you need to fill in

`content/settings.json` → `contact.geo` is `null`. I would not guess your
coordinates — a wrong map pin is worse than no pin. To fill it:

1. Google Maps → find your building → right-click the exact spot.
2. The top item in the menu is the lat/long. Click to copy.
3. ```json
   "geo": { "lat": 19.0043, "lng": 72.8412 }
   ```

The JSON-LD picks it up automatically and omits the field while it's null.

---

## 4. What to actually do, in order

**1. Deploy.** Nothing above matters until it's live. This is the single biggest
lever — it takes Google from seeing 1 page to seeing 13.

**2. Fix the sitemap submission** (section 1).

**3. Request indexing.** Search Console → URL inspection → paste
`https://matoshreechavighnaharta.co.in/` → **Request indexing**. Do the same for
`/about/`, `/gallery/`, `/events/`, `/contact/`. It's rate-limited to about 10 a
day, so spread the rest over a couple of days.

**4. Create a Google Business Profile.** <https://business.google.com> — free.
For a physical mandal, **this outranks everything in this document**. It's what
puts you in Google Maps and in the local pack for "Ganpati mandal near me" —
which is what people in Bhoiwada actually search during Ganeshotsav. You'll need
to verify the address (postcard or phone). Use the same name, address and phone
as `settings.json`, character for character: mismatches between your site and
your profile actively hurt. Add photos from the gallery, and set festival hours.

If you do only one thing off this list, do this one.

**5. Validate the markup.** Once live:
- <https://search.google.com/test/rich-results> — paste the homepage, then
  `/events/`. Events should be detected.
- <https://validator.schema.org> — for the Organisation block.

**6. Get listed.** Ganeshotsav directories (ganpati.tv, hindupad and similar)
list Mumbai mandals every year and rank well. A link from one is worth more than
any tag on your own site — this is the part no amount of code can do for you, and
it's what actually separates you from the mandals already ranking. Ask the local
paper too; a single news mention during the festival is a real signal.

---

## 5. Expectations

- **Indexing:** days to ~2 weeks after deploy + submit.
- **Ranking #1 for your own name:** likely within weeks of being indexed.
- **Local pack for "mandal near me":** driven by the Business Profile, not this
  repo.
- **Anything competitive:** months to years, and mostly bought with real-world
  coverage, not code.

Search Console → **Pages** is where you watch it happen. "Discovered pages: 13"
in the Sitemaps panel is the first milestone; indexed pages climbing from 1 is
the one that matters.

Re-run `tools/verify.sh` after deploying — it checks canonicals on five routes,
which is the fix underneath all of this.
