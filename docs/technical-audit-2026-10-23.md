# unifygtm.com technical audit (tracking, performance, SEO/GEO) and Next.js migration flags

Date: 2026-10-23. Scope: live site `www.unifygtm.com` (all 1,711 sitemap URLs crawled), the Webflow site "Unify V2" (`69ab6e0360675acdbd1f014f`) via the Webflow API, and this repo. No UI/UX review. Field data (CrUX) and Search Console were not available to this audit, so performance numbers are lab (Lighthouse 12, Moto G4 mobile emulation, local run) and indexing conclusions come from the crawl, not from Google's index.

Raw data for every claim is in the scratchpad: `crawl.csv` (per-URL status, title, description, canonical, robots, H1 count, JSON-LD types, word count, TTFB, server), `lh/*.json` (Lighthouse), `site/*.html` (fetched pages), `wf-live-head.html` / `wf-live-footer.html` (live Webflow custom code).

---

## 1. Top fixes, ranked by impact on ranking

| # | Fix | Why it matters | Effort |
|---|-----|----------------|--------|
| 1 | **Remove the `GPTBot` / `ClaudeBot` / `CCBot` `noindex, nofollow` meta tags** from the Webflow site head (`Global-head.html:1-4`, and live). | `robots.txt` was updated to *allow* every AI crawler (`Content-Signal: search=yes, ai-input=yes`), but the per-bot meta tags still tell GPTBot, ClaudeBot and CCBot `noindex` on all 613 Webflow pages. OpenAI and Anthropic honour these tags, so ChatGPT search and Claude cannot cite the marketing pages. This directly undoes the GEO work in `llms.txt`. Vercel pages (`/insights`, `/the-jump`) do not carry them. | Minutes |
| 2 | **Stop the origin-host leak on trailing-slash URLs.** `https://www.unifygtm.com/pricing/` 301s to `https://webflow.unifygtm.com/pricing`, and the same for every path (`/blog/`, `/customers/`, `/blog/series-b/`). `webflow.unifygtm.com` serves a 200 copy of the whole site. | Webflow does its trailing-slash normalisation redirect using the site's *default* domain, which is currently `webflow.unifygtm.com` (the CloudFront origin). Any inbound link with a trailing slash sends users and crawlers off the canonical host onto a duplicate host. Fix: make `www.unifygtm.com` the default domain in Webflow hosting, or normalise trailing slashes in the CloudFront function before the request reaches Webflow, and 301 `webflow.unifygtm.com/*` to `www` at the edge (allow only CloudFront's requests through, e.g. by a shared secret header). | Hours |
| 3 | **Fix the 94 sitemap URLs that return 404.** All 85 `/university/*` courses, all 6 `/university-categories/*`, and 3 `/events/*` are in `sitemap-webflow.xml` but 404. The `/university` landing page is a Webflow draft while its CMS items are still published to the sitemap. `llms.txt` and the Organization schema also link `/university`. | Dead sitemap entries waste crawl budget and are a quality signal. Either republish University or unpublish the items and remove them from `llms.txt`. | Hour |
| 4 | **Noindex and de-sitemap the 13 rep-specific `/get-started/{name}` pages and the 4 `/thank-you/*` pages.** They have 0 words of indexable content, identical titles ("Get Started | Unify" ×13) and descriptions (×14), and are all `index` + in the sitemap. | Duplicate, thin, conversion-only pages dilute the real `/get-started`. In Webflow: set the Get Starteds collection items' sitemap flag off and add `<meta name="robots" content="noindex">` in the template head. | Hour |
| 5 | **Unhide above-the-fold text before JS.** Pricing LCP is 14.0 s mobile (render delay 13.3 s), blog post LCP 11.4 s. The LCP element is the `<h1>`, and it is hidden by `.w-mod-js:not(.w-mod-ix3) [data-animate="stagger-children"] > * { visibility: hidden !important }` until Webflow + GSAP run. Home desktop is 94 because the hero is an image, not text. | This single pattern is why Webflow pages score 51 to 65 on mobile while the Next.js pages score 99. Keep stagger animations but do not apply `visibility:hidden` to the first viewport's H1/H2, or gate the hide on `prefers-reduced-motion: no-preference` and a `.js-ready` class set by a tiny inline script after fonts load. | Hours |
| 6 | **Take the three Finsweet attribute scripts out of the pricing `<head>`** (`cmsnest`, `cmsfilter`, `selectcustom` loaded synchronously, no `defer`), and move the 44 KB inline consent script to the end of `<head>` with `defer`-style scheduling of its UI. | Render-blocking on the second most important page. The consent script is inline on every page (45 KB uncached per page view). | Hours |
| 7 | **Add per-template structured data where it is missing.** Customers (19 pages), changelog (41), product (7), solutions (8), events (13 of 17), resources (14) only carry the global `Organization` block. Blog has `BlogPosting`, explore has `Article` + `BreadcrumbList` + `Person`, insights has `WebPage` + `FAQPage`. | Case studies are the highest-intent GEO content and currently emit nothing an answer engine can parse (no `Article`/`CaseStudy`-style markup, no `dateModified`, no `BreadcrumbList`). Set via Webflow page settings or the API (`bulk_update_pages_schema_markup`). | Day |
| 8 | **Cut third-party JS on first paint.** Mobile home: 48 scripts, 1.4 MB of JS, 310 ms TBT, HubSpot alone blocks 132 ms, Clarity 293 ms main-thread, GTM container is 181 KB + a 206 KB secondary tag served first-party via `/d7hn/`. Twelve marketing vendors load for US visitors by default (opt-out model). | TBT and INP. Audit the GTM container (two tags are 390 KB), defer HubSpot until a form is on screen, sample Clarity, and reconsider whether Vector, RB2B, Clearbit, Default pixel, trkn.us and LiveIntent all need to run on every page. | Days |
| 9 | **Shorten programmatic titles.** 817 of 1,617 live pages have titles over 60 characters, 992 of them from the `/insights/headcount/{company}` template "X Headcount Insights & Observed Profile Trends | Unify". 159 descriptions exceed 160 characters. | Truncated SERP titles across the largest section of the site. Template change in the Next.js insights app. | Hour |
| 10 | **Fix H1 hygiene on hubs.** `/explore` has 101 `<h1>` tags, `/customers` 9, `/events` 15, `/careers` 5, 24 pages have none (`/become-a-partner`, get-started pages). | Card titles rendered as `<h1>` in CMS lists. Change the element to `<h2>`/`<h3>` in the collection list. | Hour |

---

## 2. Architecture as found

```
DNS: unifygtm.com / www.unifygtm.com  ->  CloudFront (18.65.x.x)
  CloudFront function: 301 apex -> www, http -> https (two hops for http://unifygtm.com)
  Behaviour /insights/*, /the-jump/*, /privacy-region, sitemap-thejump.xml -> Vercel (Next.js, x-powered-by: Next.js)
  Behaviour /d7hn/* -> Google Tag Manager (first-party GTM proxy, cache-control: private, max-age=900)
  Default behaviour -> webflow.unifygtm.com (Webflow, x-wf-region: us-east-1, served via Cloudflare)
```

Observations:

- CloudFront reports `x-cache: Miss from cloudfront` on every HTML response from both origins. The Webflow origin sends no `Cache-Control` and sets a `_cfuvid` cookie; Vercel sends `public, max-age=0, must-revalidate`. So CloudFront is a pure pass-through for HTML and adds a hop (TTFB for Webflow pages: median 0.30 s, p90 0.46 s, worst 2.9 s on cold `/explore/*` pages). Caching Webflow HTML at CloudFront for 60 to 300 s with stale-while-revalidate would remove the cold-page spikes and is safe because Webflow publishes are atomic.
- The migration pattern already exists and works: `/insights` (1,001 pages) and `/the-jump` (3 pages) are Next.js on Vercel behind the same CloudFront distribution, with `basePath` set per app (`/insights/_next/static/...`, `/the-jump/job-board/_next/...`). This is the vehicle for an incremental Webflow to Next.js migration (section 7).
- Only `strict-transport-security` is set on Webflow responses. No `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. Vercel responses add HSTS with `includeSubDomains; preload`. Add the missing headers at CloudFront (response headers policy) so both origins get them.
- Legacy Webflow sites in the workspace: `unify-2.webflow.io` and `unify-new-43f5038e09530b9-54e0540e57744.webflow.io` return 200 with **no** `Disallow` in robots.txt and no canonical. These are old copies of the marketing site that are crawlable. Unpublish them or enable "disable Webflow subdomain indexing". The other eight copies are blocked or 404.
- `webflow.unifygtm.com` itself: 200, canonical points to `www`, but is reachable by anyone and gets linked by the redirect in fix 2.

---

## 3. Indexing and crawl (1,711 sitemap URLs)

| Section | URLs | 200 | Median words | Median HTML | Schema beyond Organization | Issues |
|---|---|---|---|---|---|---|
| `/insights/headcount/*` (Vercel) | 1,001 | 1,000 | 1,086 | 195 KB | WebPage + FAQPage | 992 titles > 60 chars; 1 index page without FAQ |
| `/explore/*` (Webflow) | 424 | 424 | 2,997 | 218 KB | Article + BreadcrumbList + Person | hub `/explore` has 101 H1s; 2 missing descriptions |
| `/university/*` + categories | 91 | **0** | | | | all 404, still in sitemap and llms.txt |
| `/changelog/*` | 41 | 41 | 2,673 | 266 KB | none | no og:image on 40; no `dateModified` |
| `/blog/*` | 31 | 31 | 2,106 | 234 KB | BlogPosting | fine |
| `/customers/*` | 19 | 19 | 1,526 | 329 KB | none | heaviest HTML on site (hub 606 KB) |
| `/get-started/*` | 17 | 17 | 0 | 93 KB | none | 13 duplicate titles, 0 H1, indexable |
| `/partner/*` | 17 | 17 | 472 | 177 KB | none | 16 missing descriptions, 17 missing H1 |
| `/events/*` | 17 | 14 | 823 | 179 KB | none | 3 × 404, 5 pages with 2 H1s |
| `/resources/*` | 15 | 15 | 1,071 | 198 KB | none | 15 pages with 0/2 H1, 5 no description |
| `/thank-you/*` | 4 | 4 | 270 | 165 KB | none | should be noindex |
| product / solutions / legal / misc | ~30 | ~30 | | | none | `/products/signals` 589 KB HTML |

Other crawl facts:

- Canonicals: present on all 1,617 live pages and all self-referencing. Good.
- `lang="en"` is in the served HTML on all pages, so the `document.documentElement.setAttribute("lang","en")` script in `Global-head.html:93` is redundant.
- No `hreflang`, single locale (Webflow localization disabled). Fine.
- All images have `alt` attributes (0 missing across 1,617 pages). Homepage: 73 images, 72 lazy, only 8 with `srcset`.
- `/index.html` returns 200 (duplicate of `/`), uppercase paths 404 (fine), query strings pass through (fine).
- No RSS/Atom feed for the blog or changelog (`/feed.xml`, `/rss.xml`, `/blog/rss.xml` all 404). Feeds are a cheap GEO and freshness signal; Webflow can emit one per collection.
- `/favicon.ico` 404 (icons are declared via `<link>` so browsers are fine, but some crawlers and link previews request it).
- `/.well-known/security.txt` 404.
- Sitemap: index with two children. The Vercel sitemap (`sitemap-thejump.xml`, 1,004 URLs) has no `<lastmod>`; the Webflow one does, but 90 entries share `2026-06-24` and 90 share `2026-03-13`, i.e. they reflect template publishes, not content edits. Google ignores lastmod when it is not credible.
- Robots: Lighthouse flags `robots.txt` as invalid because of the `Content-Signal:` lines (an unknown directive to Lighthouse). Google ignores unknown directives, so this is cosmetic, but `Bytespider` is blocked while everything else is allowed. Note `User-agent: anthropic-ai` is not a real crawler token (Anthropic uses `ClaudeBot`, `Claude-User`, `Claude-SearchBot`); harmless but worth tidying.

---

## 4. SEO and GEO specifics

**What is good.** `llms.txt` is live, current and well structured (products, pricing, customer results with numbers, research, docs). Organization schema is rich (founders with `sameAs`, `knowsAbout`, funding, contact). OG/Twitter cards are complete on key pages. Explore articles have Article + Breadcrumb + Person authorship. The site is single-canonical-host (`www`), HTTPS everywhere, HSTS set. The `navigator.modelContext.provideContext` tool registration in the footer (WebMCP tools such as `compare_unify_to_competitor`) is forward-looking and harmless.

**What blocks AI visibility.**

1. The per-bot `noindex` meta tags (fix 1). This is the single biggest GEO defect: the policy in `robots.txt` says yes, the page says no, and the page wins for GPTBot/ClaudeBot/CCBot.
2. Webflow head and footer in this repo still describe the *old* policy (`robots.txt` in the repo blocks GPTBot, ClaudeBot, CCBot, Bytespider; the live file allows them). The repo is out of date with production, see section 6.
3. Case studies, the highest-intent content for "who uses X / results" prompts, have no `dateModified`, no author, no `Article`-type markup, and templated descriptions ("Discover how {name} uses Unify to power their go-to-market strategy...") that repeat on two pages verbatim.
4. The WebMCP tool list hard-codes `/comparison/{competitor}` and `/signals/{signal}` URLs, but the live site uses `/compare/*` (CMS slug `compare`) and `/products/signals`. Those tool calls will 404. Same for `/solutions/sales` and `/solutions/growth`, which are not in the sitemap.
5. The Organization `logo` points at the *old* Webflow site's asset (`cdn.prod.website-files.com/65a7e0cdd5ac0838035bd1af/...`). If the "Unify (OLD)" site is ever deleted, the logo 404s. Move it to `cdn.unifygtm.com`.
6. Live Organization JSON-LD uses `founder` while the repo uses `founders`; `founder` is the schema.org property, so production is right and the repo is wrong.
7. Insights pages: title template too long (fix 9), and the hub `/insights/headcount` is 462 KB of HTML with 621 words, 1,000 links in one list. Consider paginated or alphabetised hub pages so each company page has fewer than 100 siblings competing for link equity.

**Quick wins beyond the top 10.**

- Add `BreadcrumbList` to every CMS template (customers, blog, changelog, product, solutions) and `FAQPage` where the page already has an FAQ accordion (pricing has one).
- Emit `dateModified`/`datePublished` on blog, changelog, customers. Changelog entries are time-sensitive and currently carry no date in markup.
- Add an `Article` `author` with a `Person` that links to the `/authors-speakers` CMS (it exists in Webflow but is not published to a URL).
- Give `/changelog/*` an `og:image` (40 of 41 lack one).
- Produce an RSS feed for blog and changelog.

---

## 5. Performance

Lighthouse 12, mobile emulation, local run (median of one run each; treat as directional):

| Page | Origin | Perf | FCP | LCP | TBT | CLS | Speed Index | LCP element and cause |
|---|---|---|---|---|---|---|---|---|
| Home | Webflow | 65 | 2.8 s | 4.9 s | 310 ms | 0 | 6.4 s | hero image; load delay 0.9 s + render delay 1.9 s |
| Home (desktop) | Webflow | 94 | 0.8 s | 1.0 s | 0 | 0 | 2.0 s | |
| Pricing | Webflow | 51 | 6.2 s | 14.0 s | 320 ms | 0 | 8.0 s | `<h1>` hidden by stagger CSS until JS; 3 sync scripts in head |
| Blog post | Webflow | 52 | 5.3 s | 11.4 s | 280 ms | 0 | 8.0 s | `<h1>` hidden until JS; render delay 10.7 s |
| Insights company page | Vercel/Next | 99 | 1.3 s | 1.5 s | 120 ms | 0.04 | 1.3 s | `<h1>`, render delay 0.75 s (CSS) |

Page weight (mobile home): 2.0 MB transferred, 121 requests, 48 scripts totalling 1.4 MB, 4 fonts 209 KB, 14 images 126 KB. DOM 1,811 nodes (pricing 3,480, blog 2,389). Unused JS ~450 KB per page: Webflow runtime chunks (140 KB and 142 KB, 60 to 75% unused), GTM container 181 KB (73 KB unused), the first-party GTM tag 206 KB, PostHog 104 KB, LiveIntent 55 KB, Vector 72 KB, Swiper 34 KB (loaded on every page via `document.write` even where no slider exists).

Causes, in order:

1. **Content hidden until JS** (fix 5). The `[data-animate="stagger-children"] > * { visibility:hidden }` rule plus Webflow's `w-mod-js` class means every page's text waits for jQuery (31 KB), five Webflow chunks (~300 KB), GSAP + ScrollTrigger (~40 KB) and the custom animation code. On a slow device that is 10+ seconds.
2. **Render-blocking scripts.** Pricing: Finsweet `cmsnest`, `cmsfilter`, `selectcustom` in `<head>` without `defer` (Lighthouse estimates 1.8 s). Lighthouse also lists jQuery, the Webflow chunks and GSAP as render-blocking (1.0 to 1.5 s) on pricing and blog.
3. **Inline code per page.** The live `<head>` custom code is 45 KB (38 KB consent script + schema + styles) and the live footer is 41 KB (the consent-adapted copy of `JS/global.js` inlined, 27 KB). Roughly 86 KB of uncached JS/CSS is parsed on every page view. Externalising the consent script and global.js to a versioned, immutable URL would make them cacheable across the session.
4. **Third parties.** For US and unknown-geo visitors the consent default is allow, so on first paint the site loads GTM (two 180-200 KB payloads via `/d7hn/`), PostHog, Segment, HubSpot (104 KB, the largest main-thread blocker), Clarity (293 ms main thread), Clearbit, Vector, RB2B, Default pixel, trkn.us (IPONWEB), LiveIntent, LinkedIn, Twitter, Bing, Knock2 and the Unify tag. Fourteen vendors on a marketing page is high; several (Vector, RB2B, Clearbit, Default) overlap in function (visitor de-anonymisation).
5. **Fonts.** Webflow pages preload 4 WOFF2 files (209 KB) with `font-display:swap`. Fine. The Next.js insights app downloads **12 font files, 647 KB** per page with `font-display:swap`. That is the one real defect in the Next app; subset and limit weights (`next/font` with `subsets` and `weight` arrays).
6. **CloudFront not caching HTML** (section 2) and Webflow TTFB spikes to 1.3 to 2.9 s on cold long-tail pages.
7. **Images.** Only 8 of 73 homepage images have `srcset`; Lighthouse flags ~135 KB of oversized images on the blog post. Webflow generates responsive variants only for images uploaded through the designer with responsive enabled, not for CMS rich-text images.

Not a problem: CLS is 0 on all Webflow pages (font preloads and fixed-size hero work), the hero AVIF is preloaded with `fetchpriority=high`, Webflow assets are `immutable` and brotli-compressed, and the custom lazy-loading of Lotties and of the footer logo script is well done.

---

## 6. Tracking and consent

**Live stack (observed in page HTML and network).** GTM `GTM-5NKFVR3` (first-party via `/d7hn/`, owns GA4, LinkedIn Insight, Microsoft Ads/Clarity per the live comment), PostHog (`person_profiles: "always"`, 10% sampling of `$web_vitals`/`$dead_click`), Segment (write key in page), HubSpot, Clarity, Twitter/X pixel, LinkedIn pixel (`6129522`), Bing, Clearbit, Vector, RB2B, Default (pixel + form loader), Coframe, trkn.us conversion pixel, LiveIntent (via HubSpot), Navattic, Knock2 (`api.knock2.ai/install/unifygtm_com`, async in head, 307s on fetch), Unify's own intent tag, and `a.usbrowserspeed.com` (a browser-fingerprinting "browser test" pixel).

**Consent model (live, October 6 2026 rollout).** A custom 38 KB inline consent manager replaced OneTrust. It fetches `/privacy-region` (CloudFront geo, `x-robots-tag: noindex`), and applies: EU/EEA, UK, CH, AU and Quebec = opt-in (nothing loads until accepted); US = "privacy_controls" (opt-out, defaults analytics+marketing on, honours GPC and saved refusals); unknown geography = allow both. Google Consent Mode defaults are pushed before GTM; GTM is the consent owner for Google tags. Marketing vendors in the footer subscribe to `UnifyConsent` and only start when `ad_storage` + `ad_user_data` + `ad_personalization` are granted. This is a sound design.

**Issues.**

1. **Production loads a staging script.** The Unify intent tag is `https://tag.unifyintent.com/v1/AKUXjLHgk642jVe4ZNwfEK/script-staging.js` in both the repo (`global-footer.html:113`) and live. Point it at the production script.
2. **The repo is not what is live.** The live footer contains "Adapted from pakgem/unify v1.14.15 JS/global.js for the shared consent rollout" inlined, built by a `scripts/build.mjs` that is not in this repo and that "embeds this same function in Next.js and Webflow". The live footer no longer loads `cdn.jsdelivr.net/gh/pakgem/unify@v1.14.14/JS/global.min.js`; the repo's `global-footer.html` still does. The repo's `JS/global.js` still references OneTrust (`OptanonActiveGroups`, `C0002`/`C0004`), the repo `robots.txt` blocks AI bots, and the repo `Global-head.html` lacks the consent block. Whoever owns the consent build repo owns production now; this repo should either be retired or become the source the build reads from. Until then, `npm run deploy` here would ship a regression (OneTrust-gated loaders with no OneTrust present means Segment, Clarity, Twitter, Navattic would never fire).
3. **Public write keys in a public repo.** `github.com/pakgem/unify` is public (jsDelivr requires it). It contains the Unify tag API key (`wk_...`), PostHog project key, Clearbit key, Segment write key, GTM id. These are client-side keys by design, but PostHog and Segment write keys in a public repo invite spam ingestion; set PostHog "authorized URLs" and Segment allowed origins.
4. **`person_profiles: "always"`** in PostHog creates a person for every anonymous visitor (cost and retention exposure). Use `identified_only` unless anonymous profiles are needed.
5. **Fingerprinting pixel.** `a.usbrowserspeed.com` (`scheduleBrowserTestPixel`) is gated on marketing consent live, but it is a device-fingerprinting vendor; confirm it is disclosed in the privacy policy or remove it.
6. **Email written to a first-party cookie in plain text** (`document.cookie = "email=..."` in `JS/global.js:366`, `JS/paid.js:13`, `AI-leads.js`, `Email-Coach.js`, `SalesCallNotes.js`) with `path=/` and no `Secure`/`SameSite`. It is readable by every third-party script on the page. Use `sessionStorage` or a server-set `HttpOnly` cookie if `/get-started` needs it.
7. **Anonymous ID sprawl.** `getOrCreateAnonymousId` writes `anonymousId` cookie + `segment_anonymous_id` localStorage, PostHog has its own, Segment its own, the Unify tag its own, HubSpot `hubspotutk`. Pick one identity (PostHog or Segment) and alias the others, or attribution across tools will never reconcile.
8. **UTM propagation rewrites every internal link** (`initializeUtmTracking` appends the stored UTM string to all `<a href>` via MutationObserver). That multiplies URL variants that GA4/PostHog see and that users copy and share. Prefer first-touch storage without rewriting hrefs.
9. **GTM `noscript` iframe** is in the repo footer but absent on all 1,617 live pages; harmless (noscript pageviews are negligible) but shows drift.
10. **Lighthouse `third-party-cookies`** fails on every page: Clarity, HubSpot, LinkedIn, Bing set third-party cookies. Expected with this stack; Chrome's phase-out makes them progressively useless.
11. Consent script exits early when `location.hostname` is not `www.unifygtm.com`/`unifygtm.com`, so nothing fires on `webflow.unifygtm.com`. Good. But `hasRequiredConsent` in the live footer hard-codes `www.unifygtm.com`, which means Segment/Clarity/Twitter never fire on the apex even though apex redirects anyway. Fine today, a trap on a Next.js preview domain tomorrow.

---

## 7. Codebase findings (this repo)

- **Version pinning.** `home-footer.html:3` loads `pakgem/unify@v1.5.5/JS/home.js` while `package.json` is 1.14.15; the global footer pins `v1.14.14`. jsDelivr `@latest` is used for `nocodesupplyco/mast` (`inline-video`, `tabs`) in the Webflow project, which is an unpinned supply-chain dependency with a 7-day cache (`max-age=604800`), versus immutable one-year caching for pinned tags.
- **`global.min.js` vs `global.js`.** The minified file (13.7 KB) is checked in and built by `scripts/minify.mjs`; the live site inlines a modified copy of the unminified source instead.
- **jQuery everywhere.** 10 of 15 JS files use `$()`. Webflow ships jQuery 3.5.1 so it is "free" today; on Next.js it is a 31 KB dependency you would be adding deliberately. `global.js` `initializeForm`, `home.js`, `ROI-Calc.js`, `AI-SEO.js`, `SalesCallNotes.js`, `Email-Coach.js`, `solution-sales.js` need de-jQuerying or React rewrites.
- **Webflow runtime coupling.** `Webflow.push(...)` callbacks (nav dropdown hover code), `w--open`, `w-dropdown`, `w-tab` classes (`ai-seo.html`, `AI-SEO.js`), IX2 `data-w-id` attributes (29 on pricing), and `data-wf-page` checks (`document.documentElement.getAttribute('data-wf-page') === '69ab6e0460675acdbd1f01dc'` to detect the homepage) all break on Next.js.
- **Interactive tool pages** (`ai-seo.html` 110 KB, `Email-Coach.html` 45 KB, `salescallnotes.html` 22 KB, `AI-leads.js`) call `growth-api.unifygtm.com` / `growth-api2.unifygtm.com`, rate-limit via `localStorage` counters and `hasSubmittedEmail` flags, and gate on an email cookie. These are standalone apps embedded in Webflow; they are the easiest things to port (they already own their DOM) but the `localStorage`-based rate limiting is trivially bypassed and should move server-side on the API.
- **Dead or stray files.** `chatbot-stories.js` (837 KB) and `.txt` (652 KB) are committed; the live site loads a chatbot stories bundle from Webflow's asset CDN instead. `countup.txt` is empty. `test.html`, `.pr-body.md`. `.DS_Store` is committed (add to `.gitignore`).
- **Release tooling** (`deploy.js`, `release.js`) pushes directly to `main` with `execSync("git push https://github.com/pakgem/unify.git main")` and creates tags that jsDelivr serves. Any commit to `main` + tag is instantly production code with no CI, lint, or test step. Fine for a personal repo; not fine for the source of a company's tracking.
- `document.write` is used to inject Swiper on non-home pages (live footer). Deprecated and blocks parsing.

---

## 8. Next.js migration: flags and edge cases

The good news is that the platform has already been proven: two Next.js apps run under `www.unifygtm.com` paths today behind CloudFront. The migration can be route-by-route (strangler pattern) with zero DNS change: add a CloudFront behaviour per path prefix pointing at Vercel, keep Webflow as the default origin until nothing is left.

### 8.1 URL and redirect preservation (highest risk)

- **Inventory the 1,617 live URLs** from `crawl.csv` and make every one resolve identically (200 or deliberate 301) on day one. The crawl file is the acceptance test.
- **Export Webflow's 301 redirect table** (Site settings → Publishing → 301 redirects). It is not exposed through the API, and several old-site paths already depend on it (`/product/signals` → `/products/signals`). These rules must move to `next.config.js` `redirects()` or, better, to the CloudFront function so they work regardless of origin.
- **Trailing slashes.** Webflow strips them (301). Next.js defaults to stripping as well (`trailingSlash: false`) but redirects to the same host, which fixes bug 2 for free. Decide once and keep `/`, `/pricing`, no slash.
- **Case sensitivity.** Webflow 404s `/PRICING`. Vercel routing is case-sensitive too, but keep the behaviour explicit so no new duplicates appear.
- **`/index.html`** currently 200s; make it 301 to `/`.
- **The hostname split.** During migration, Webflow-rendered pages will link to Next.js pages and vice versa. Keep all internal links root-relative and never emit `webflow.unifygtm.com` or `*.vercel.app` in HTML (`data-wf-domain` currently leaks the origin host into every Webflow page; harmless, but a `vercel.app` URL in a canonical would not be).
- **Vercel preview deployments** must send `x-robots-tag: noindex` (Vercel does this automatically for `*.vercel.app` previews) and the production app must verify `host === 'www.unifygtm.com'` before emitting canonicals, because requests arrive via CloudFront with the origin hostname.
- **CMS slug collisions.** Webflow collections `product` (CMS, `/product/{slug}`) and the static `/products/signals` coexist; `/explore` is both a static page and a collection template path; `/university` is a draft static page plus a collection. Map each explicitly in the Next.js router (`app/product/[slug]`, `app/products/signals/page.tsx`) and test for shadowing.
- **Webflow template pages that are not published** (`/companies`, `/customer-quotes`, `/faqs`, `/news`, `/signal-vendors`, `/example-signals`, `/abstract-images`, `/event-type`, ...) are reference collections with `shouldPublish: false`. Do not create routes for them; do verify Webflow is not already serving them (quick 404 check per slug).

### 8.2 Content model

Thirty-six CMS collections (list in the Webflow API output), of which about fourteen have URLs. Reference and multi-reference fields (case study ↔ use cases ↔ customer logos ↔ quotes; events ↔ personas ↔ types; partners ↔ industries/geographies/stages/price ranges/expertise/CRM) need a headless CMS that models relations, or a flattened JSON export per build. Rich-text fields contain Webflow-specific HTML (`w-richtext-figure-type-image`, embedded `<figure>` with `data-rt-*`, YouTube via Embedly) that needs a sanitiser/transform. Webflow image URLs (`cdn.prod.website-files.com/...`) will keep working after migration but you lose the site if the Webflow plan lapses, so re-host assets on `cdn.unifygtm.com` and rewrite URLs during export.

Two Get Starteds and Insights collections exist in Webflow but Insights is also a Next.js app with its own data (1,001 pages). Decide the single source of truth per content type before export; today there are two "insights" templates.

### 8.3 Rendering and performance edge cases

- **Do not SSR-hide text.** Reproduce the stagger animations with CSS `@starting-style`/`animation` or `IntersectionObserver` that only *adds* motion, never `visibility:hidden` on initial HTML. This is how `/insights` gets a 99.
- **Fonts.** Use `next/font/local` for Saans and Feature Text with exactly the four weights used; the current insights app ships 12 font files (647 KB). Preload only the two above-the-fold faces.
- **Lotties, Plyr video, Swiper, GSAP ScrollTrigger, the "supercharge" glow effect, the footer logo drag, chatbot stories.** Each is a client-only component; wrap in `dynamic(() => import(...), { ssr: false })` and load on viewport intersection, as the Webflow custom code already does by hand.
- **Third-party script scheduling.** `next/script` with `strategy="lazyOnload"` or `"worker"` (Partytown) for the marketing stack, and the consent manager must run before GTM; the current inline consent script's "GTM loader must be removed before activation" guard will throw if `next/script` injects GTM first.
- **Scroll-driven and hover nav code** depends on `matchMedia` at module scope (`window.matchMedia("(min-width: 1024px)")` in `initializeNavigation`), which crashes during SSR. Everything in `global.js` must move into `useEffect`.
- **`data-wf-page` homepage detection** must become route-aware (`usePathname`).
- **Forms.** Webflow forms post to Webflow; the Default form loader (`import-cdn.default.com`, team 169 / form 734318) and HubSpot forms are injected client-side; `paid.js`/`get-started.js` map Webflow field IDs (`468363`, `388880`, ...) to Default form URLs. On Next.js, use Default's embed or API directly and keep the hidden UTM fields; the current UTM-to-hidden-field logic runs on `DOMContentLoaded` and will miss React-rendered forms.
- **Cookies written by client code** (`email`, `anonymousId`) are read by `/get-started`. If `/get-started` moves first, the Webflow homepage still sets them; fine. If the homepage moves first, make sure the Next.js form sets them identically or `/get-started` prefill breaks.
- **Caching.** Set `Cache-Control: public, s-maxage=300, stale-while-revalidate=86400` on marketing pages (ISR) and configure the CloudFront behaviour to honour it; today Vercel pages return `max-age=0, must-revalidate` and CloudFront misses every time. Use Vercel's `revalidateTag` from the CMS webhook.
- **Edge geo for consent.** `/privacy-region` currently comes from CloudFront headers; on Vercel use `request.geo` in middleware and keep the same JSON contract (`{country, region, source}`) so the shared consent script keeps working unmodified.
- **Sitemap.** Generate one sitemap index from Next.js with real `lastmod`, and drop Webflow's as sections move. Keep `/sitemap.xml` at the same URL throughout.
- **robots.txt and llms.txt** become Next.js route handlers; make `robots.txt` the only place AI-crawler policy lives (no per-bot meta tags), and generate `llms.txt` from the CMS so it cannot drift again.
- **Security headers** via `next.config.js` `headers()` or the CloudFront response-headers policy: CSP (nonce-based because of the inline consent script and GTM), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **404 page**: Webflow returns a 164 KB 404 with title "Not Found"; Next.js `not-found.tsx` must return HTTP 404 (not a soft 200), and the CloudFront default behaviour must pass Vercel's 404 through unchanged.
- **Webflow Enterprise reverse-proxy terms.** Webflow's terms restrict reverse-proxying on non-Enterprise plans; the current CloudFront setup already does this, so confirm the plan allows it for the duration of the migration.
- **Legacy copies.** Before launch, unpublish `unify-2.webflow.io` and the `unify-new-...` copy, and after launch, 301 `webflow.unifygtm.com/*` → `www` and remove it from the Webflow custom domains.

### 8.4 Suggested order

1. Edge fixes that need no migration (fixes 1 to 4, 6, headers, CloudFront HTML caching, legacy subdomains). One or two days, immediate ranking impact.
2. Move the consent script and `global.js` build into the Next.js monorepo as the single source; retire `npm run deploy` here.
3. Migrate leaf templates first where the win is largest and risk lowest: `/blog`, `/changelog`, `/customers`, `/explore` (424 pages, highest TTFB variance). Each gets structured data, RSS, and real `lastmod`.
4. Then `/pricing`, `/product/*`, `/solutions/*`, `/about`, `/careers` (interaction-heavy; needs the animation rewrite).
5. Home last.
6. Decommission Webflow: export redirect table into CloudFront, 301 the origin host, delete the old sites.

---

## 9. Method and limits

- Crawled every URL in `sitemap-webflow.xml` (707) and `sitemap-thejump.xml` (1,004) with a Chrome UA; recorded status, final URL, TTFB, size, title, description, canonical, robots meta, `x-robots-tag`, per-bot meta, `lang`, H1/H2 counts, JSON-LD `@type`s, word count, image/alt counts, internal link count, cache headers, origin.
- Lighthouse 12.x from the local machine (so TTFB and network are this machine's, not a datacentre); PageSpeed Insights' keyless API quota was exhausted, so no CrUX field data. Treat scores as relative between pages, not absolute.
- Read the live Webflow head/footer custom code, page list (75 pages), collection list (36), site settings via the Webflow API; the 301 redirect table is not available through the API and was not reviewed.
- Did not have Search Console, GA4/PostHog, or the Next.js source for `/insights` and `/the-jump`; the consent build repo (`scripts/build.mjs`) was not available.
- Did not run accessibility or visual review (out of scope).
