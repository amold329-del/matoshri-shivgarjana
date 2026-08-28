# SEO Phase 2 — verification and remaining gaps

**28 August 2026.** Brief: verify the previous implementation rather than trust
it, fix only genuine problems, then address what is stopping this Mandal from
becoming a recognised Google entity for Ganpati + Parel + Bhoiwada.

**Outcome: no code changes.** Everything checked passes. The remaining gaps are
all off-site, and none of them can be closed from a repository.

---

## 1. What was verified, and how

Built the site and inspected the generated HTML — not the source. 24 pages.

| Check | Result |
|---|---|
| Homepage title | `मातोश्रीचा विघ्नहर्ता · मातोश्री शिवगर्जना मंडळ, परेल मुंबई` (59 chars) |
| Canonical / robots | `https://matoshreechavighnaharta.co.in/` · `index, follow` |
| H1 | `मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.)` — one per page, no level jumps |
| Open Graph | title, url, image, type, site_name, locale — all present on all pages |
| Twitter | card, title, description, image — all present |
| Sitemap | 21 URLs, all HTTPS, 0 duplicates, 0 pointing at a missing page, 0 noindex URLs listed, 0 indexable pages omitted |
| robots.txt | no blanket `Disallow: /`, Googlebot allowed, `Sitemap:` line present |
| JSON-LD | 0 invalid blocks. `NGO+PlaceOfWorship` 24, `WebSite` 24, `Festival` 24, `BreadcrumbList` 22, `Event` 7, `FAQPage` 1, `Article` 1 |
| **Event `endDate`** | **31 Event/Festival nodes, 0 missing `endDate`** |
| Images | 141 `<img>`, 0 without `alt`, 0 without `width`+`height` |
| Orphans / duplicates / cannibalisation | none |

### Entity consistency (Phase 7)

Counted across every built page:

```
Latin name      Matoshree Shivgarjana 258 · Matoshreecha Vighnaharta 96
                Matoshri (old spelling)   0
Marathi         मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ 533 · मंडळ 177
Email           matoshreeshivgarjanasarvajanik@gmail.com 104 · "[at]" 0
Address         Jerbai Wadia Road 110 · जेरबाई वाडिया रोड 44
Postcode        400012 135 · ४०००१२ 5
Registration    F0087088(GBR) 28
```

One spelling each. No stragglers.

## 2. Two observations, deliberately not "fixed"

**Phone written two ways.** `+91-77383-37412` in the schema (48×) and
`+91 77383 37412` in display copy (25×). Google normalises phone numbers, and
both are valid international format, so this is cosmetic — churning 73
occurrences for it would be change for its own sake. Noted in case you want the
Business Profile to match one form exactly.

**Registration number.** The site says `F0087088(GBR)` consistently. A brief you
sent on 17 August wrote `F -0087088(GBR)`. Whichever the certificate says should
win, because that is the document a Business Profile reviewer compares against.
**Still unresolved.**

## 3. What could not be verified from here

Stated plainly, because a claim without evidence is worse than a gap:

- **The live site.** No web access from this environment. Local correctness is
  not deployment — see §4 for how to check it yourself in two minutes.
- **Google Search Console.** No access. No indexing status, no clicks,
  impressions, CTR or position, no manual-action check.
- **Google Search results / competitors.** No searches were run. Nothing here
  claims what ranks for "ganpati mandal parel".
- **Google Maps / the Business Profile.** Cannot be inspected. The profile went
  live on 18 August by your account, and the site now links to it
  (`maps.app.goo.gl/KFZazg6y5e3QAbKu5` in `hasMap` and `sameAs`), but its
  contents, categories and pin are unverified from here.
- **Existing citations and backlinks.** Cannot be searched for, so the citation
  table in the brief cannot be filled with real rows. Inventing them would be
  worse than leaving it empty.

## 4. Verify production yourself — two minutes

Open `view-source:https://matoshreechavighnaharta.co.in/` and search for:

| String | Confirms |
|---|---|
| `परेल-भोईवाडा, मुंबई ४०००१२` | the hero location line deployed |
| `गणेशोत्सव २०२६ · १४ ते २५ सप्टेंबर` | the festival dates above the fold |
| `<link rel="stylesheet"` → **0 hits** | the inlined-CSS performance fix deployed |
| `[at]` → **0 hits** | the corrupted email fix deployed |

Then `view-source:.../events/` and search `endDate` — if absent, the structured
data fix has not shipped and Search Console validation will fail again.

Then `.../gallery/2025/` should load. If it 404s, the new routes are not live.

## 5. The actual bottleneck

Unchanged from the 27 August audit, and worth restating because everything in
this brief points at it:

**No external authority → Google rations crawl → pages go unindexed → nothing
can rank.** On 17 August, 8 of 15 pages showed `Last crawled: N/A` — never
fetched at all. Technical SEO is not the constraint: canonicals, schema,
sitemap, `endDate`, alt text, internal links and Core Web Vitals diagnostics are
all clean.

The second constraint is **English content**. The served HTML is Marathi, so
half the target queries — "ganpati mandal parel", "ganeshotsav parel" — have
nothing to match. That is the `/en` routing work, scheduled for October.

Neither is fixable with more pages or more schema.

## 6. Google Business Profile — the checklist

The profile exists. What matters now is filling it out.

```
[x] Listing exists (live on Maps, 18 Aug 2026)
[x] Website field → https://matoshreechavighnaharta.co.in/
[ ] Verified badge showing (not just visible on Maps)
[ ] Name exactly: Matoshree Shivgarjana Sarvajanik Ganeshotsav Mandal
    — no "Best", no "Parel Mumbai" appended. Name stuffing is the most
      common cause of suspension.
[ ] Primary category: Religious organization
[ ] Secondary: Non-profit organization
[ ] Address character-for-character identical to the site footer
[ ] Map pin dropped on the Matoshree S.R.A. building, not the road
[ ] Phone +91 77383 37412
[ ] Description (750 chars) — the drafted text is in the 21 Aug chat
[ ] Logo as profile photo (brand/logo-master.png)
[ ] Cover photo (public/hero-idol.jpg)
[ ] A dozen photographs from public/gallery/
[ ] Special Hours for 13–25 September once darshan timings are set
[ ] Two or three committee members added as Owners/Managers
[ ] Genuine reviews from devotees — never solicited with payment
[ ] Respond to every review
[ ] A Post each day of the festival
```

## 7. Citations, backlinks and PR — the honest version

I could not search the web, so this is a list of *opportunity types* to pursue,
not verified URLs. Do not treat any of it as a confirmed listing.

**Citations worth pursuing** — Mumbai Ganeshotsav directories that list mandals
by area, Parel/Bhoiwada community pages, BMC or local ward festival listings.
Whatever you use, the name, address and phone must match the site exactly; an
inconsistent citation is worth less than none.

**Backlinks, in order of value.** One local Marathi news piece linking to the
site outweighs everything else on this list. Then: neighbouring mandals, the
housing society, sponsors with websites, and cultural organisations. Not: paid
directories, link exchanges, comment posting.

**PR angles that are factually supported** — the 47th year; the new logo
unveiled on 14 August; the run-up to the 2029 golden jubilee; the year-round
social work (blood donation, medical camps, education support, tree plantation);
the procession route through Bhoiwada to Shivaji Park. Every one of these is
already documented on the site, so a journalist can verify it.

## 8. Keyword tracking

Set up in Search Console once, then read monthly. Track impressions, clicks, CTR
and average position for three groups:

- **Brand** — matoshree shivgarjana · matoshreecha vighnaharta · मातोश्री शिवगर्जना
- **Local** — गणेश मंडळ परेल · भोईवाडा गणपती · ganpati mandal parel · ganeshotsav parel
- **Seasonal** — गणेशोत्सव २०२६ परेल · परेल विसर्जन मार्ग · ganeshotsav 2026 parel

Expect the Marathi local terms to move first; they have content behind them. The
English ones should not be expected to move before `/en` exists.

## 9. 30-day plan

**Week 1 — confirm and submit.** Verify production (§4). Resubmit the sitemap
(21 URLs). Request indexing for `/procession/`, `/faq/`, `/registration/`,
`/advertisements/`. Restart the Events validation. Complete the Business Profile
(§6). **Set the contact form endpoint.**

**Week 2 — during the festival.** A Business Profile Post every day. A news post
on the site each day — each one with a `body` becomes a real page at
`/news/<slug>/`. Photograph everything; those become the 2026 gallery.

**Week 3 — press and citations.** Approach local Marathi outlets with the 47th
year and the new logo. Submit to two or three genuine Ganeshotsav directories.
Ask devotees for reviews, in person, with a printed QR.

**Week 4 — read the numbers.** First Search Console comparison. Check whether the
eight previously uncrawled pages now show impressions. Re-run PageSpeed. Then
plan the `/en` routes for October.
