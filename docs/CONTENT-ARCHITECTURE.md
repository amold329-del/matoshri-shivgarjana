# Content architecture: how many pages this site should have

**26 August 2026.** Written in response to a proposal to create 100+ pages to
lift crawl frequency and keyword coverage. The answer is **no**, and this is the
evidence, so the question doesn't have to be re-argued from scratch next time.

---

## 1. The decision

**Should this site have 100+ indexable pages? No.**

| Question | Answer |
|---|---|
| Ideal indexable pages **now** | **21** — which is what it has |
| Ideal in 6 months | 30–35, if the Mandal writes during the festival |
| Creatable from existing genuine content | 21. All built. |
| Requiring new content first | Everything beyond that |
| Would 100+ help? | It would actively hurt — see §4 |

## 2. What the content can actually support

Measured from `/content`, counting words of unique text per potential page:

| Source | Items | Unique text each | Verdict |
|---|---|---|---|
| `gallery.json` by year | 5 years (19/19/9/7/7 photos) | 7–19 captioned photographs | **Built** — `/gallery/<year>/` |
| `news.json` with a body | 1 of 6 | 318 words | **Built** — `/news/new-logo-unveiled/` |
| `news.json` without a body | 5 | 10–36 words | Cards on `/news/`, no page |
| `events.json` | 6 | **5–17 words** of body | **Do not create** |
| `social-activities.json` | 8 | **4–9 words** of body | **Do not create** |
| `timeline.json` | 4 milestones | **10–12 words** | **Do not create** |
| `faq.json` | 10 Q&A | 31 words average, 310 total | Keep as one page |
| `gallery.json` by category | 9 categories | 1–19 items; only 25 of 61 captions carry real text | **Not yet** |

The two proposals that sound most promising in the brief both collapse on
contact with the data:

**Per-event pages** (`/events/<slug>/`). Each event's body is 5 to 17 words. A
page would be a heading, a date and one sentence. That is the page-per-sentence
pattern, and it fails every one of the brief's own Phase 3 rules on unique
content and user value.

**Per-year historical pages** (`/ganeshotsav-2024/` and so on). `timeline.json`
holds **four** milestones — 1980, 2025, 2026, and one labelled "Future" — of
10–12 words each. There is no year-by-year written history in this project at
all. What exists is *photographs*, by year, and those already have pages. A
`/ganeshotsav-2024/` page would duplicate `/gallery/2024/` while adding nothing.

## 3. What was built instead

21 indexable pages: 15 core routes, 5 gallery years, 1 article. Plus 2 that are
deliberately `noindex` (`/sabhasad/`, `/online-donation/` — placeholders).

Both new route families are **generated from content, not hand-written**, so
growth needs data rather than code:

- `/gallery/<year>/` — add photographs for a year, its page appears at the next
  build, with its own sitemap entry and its photographs listed for Google Images.
- `/news/<slug>/` — write a `body` on a news item and it gets a page with
  `Article` schema. A one-sentence announcement gets none.

## 4. Why 100+ pages would have hurt

**It is against Google's spam policy.** Scaled content abuse, named explicitly
since March 2024, covers mass-producing pages primarily to manipulate rankings,
original or not. The exposure is a manual action against the whole domain — so
the pages that currently work would be risked for pages that never would.

**Crawl budget is already the binding constraint.** In August, Search Console
reported 8 of 15 pages as *Discovered — currently not indexed*, with
`Last crawled: N/A`. Google was rationing attention on this domain **before**
any expansion. Adding ~100 near-empty URLs spreads that ration thinner, and the
pages a devotee actually needs — the route, the timings — get crawled later.

**Page count is not the engagement lever.** A visitor searching
"परेल विसर्जन मार्ग" wants twelve street names on one page. More pages give them
more ways to land somewhere useless.

**It would require inventing facts.** Filling 100 pages means inventing history,
timings, and claims — the one thing this project has consistently refused to do,
right down to asking the committee for real end times rather than guessing them.

## 5. Also declined, with reasons

- **A sitemap index** (`sitemap-pages.xml`, `sitemap-events.xml`, …). The limit
  is 50,000 URLs per sitemap; this site has 21. Splitting adds moving parts and
  no benefit.
- **Locality variants** — `/ganpati-mandal-parel/`, `/ganpati-mandal-bhoiwada/`,
  `/ganpati-mandal-near-dadar/`. Parel-Bhoiwada is one locality and one mandal.
  These would be the same page under different names, which the brief's own
  Phase 4 rules out. The travel detail lives on `/contact/` and in the FAQ, where
  someone looking for directions actually goes.
- **`/ganeshotsav-2026/`** — `/events/` already holds the 2026 programme and the
  `Festival` schema, and is already titled "कार्यक्रम · Ganeshotsav 2026 Events,
  Parel Mumbai". A second page would split the signal.
- **`/ganpati-darshan/`** — needs official darshan timings, which do not exist in
  the project. Give me the timings and it becomes a real page.
- **FAQ topic pages** — 310 words of answers split four ways is four thin pages
  instead of one good one.
- **Per-image pages** — the brief rules this out too, correctly.

## 6. Where more pages legitimately come from

In rough order of value:

1. **A post a day during the eleven days.** Eleven real articles, published while
   search volume for "parel ganpati" is at its annual peak. This is worth more
   than a hundred templated pages, and the route already exists — write a `body`.
2. **Each year's photographs.** One new page a year, automatically.
3. **Written accounts of past festivals.** If the founding members can tell the
   story of particular years — the murti, the decoration, the year of the record
   crowd — those become genuine `/ganeshotsav/<year>/` pages. That is a real
   40-page opportunity, but it needs the committee's memory, not a template.
4. **Captions for the 36 photographs that lack them.** Not new pages, but it
   makes the five year pages substantially stronger and feeds Google Images.

## 7. What actually moves the numbers now

Unchanged from the last three audits, and none of it is page count:

1. The contact form endpoint — still `""`.
2. Reviews on the Google Business Profile.
3. Posts on that profile during the festival.
4. One local news mention with a link.
5. Cloudflare in front — closes six audit issues and the 709 KiB cache finding.
