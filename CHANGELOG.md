# Changelog

Notable changes to the site. Newest first.

The version numbers follow [semantic versioning](https://semver.org): the middle
number goes up when something is added, the last one when something is fixed.

## 1.0.0 — 2026-07-31

First release. The design was built as an Astro site with all content in editable
text files.

### Pages

- Home, with the hero, the Recent Work grid, the About preview, the Archive preview
  and the contact band.
- Recent Work index.
- Grovia case study — the full long-form study, all 30 sections.
- Generic case-study layout for the remaining projects.
- Archive index with category filters, plus a page per category.
- Archive detail pages, generated for any item that has a written description.
- About, Contact, and a 404 page.
- Contact form result pages: thank-you, error, and one for when the mail service
  isn't connected yet.

### Content

- Six projects and twelve archive items moved into editable Markdown files, with
  schemas that stop the build on a typo rather than shipping a broken page.
- All site-wide wording moved into `src/data/site.json`.
- Five of the six projects are marked `draft: true`. They appear while working
  locally with a "Draft" ribbon and are excluded from the published site, with the
  skipped slugs listed at the end of each build.

### Design and behaviour

- All colours, type sizes, spacing, radii and motion values taken from the design
  tokens; no hardcoded values in components.
- Dark mode, applied before first paint so there is no flash of the wrong theme,
  with a header toggle that remembers the visitor's choice.
- Header blur and auto-hide on scroll, scroll-reveal sections, mobile navigation
  drawer, and a case-study image lightbox — one 5.7KB script for all of it.
- Images processed at build time into responsive modern formats; missing images
  render as neutral placeholder tiles rather than broken images.

### Accessibility

Built to WCAG 2.2 AA and verified: contrast measured across seven pages in both
colour schemes, a keyboard-only pass, and a check that the site remains usable with
JavaScript switched off.

Three colour values from the original design were corrected because they could not
meet the contrast minimum as text. In each case the original is kept for decoration
and a text-safe partner added — see "Three deliberate corrections" in the README.

- `#9B9B94` small labels (2.43:1) → `#6B6B65` (5.00:1)
- `#00909E` accent text (3.57:1) → `#00757F` (5.08:1); filled buttons use `#007C88`
- `#6F6F6A` body text on filled panels (4.38:1) → `#6A6A65` (4.72:1)

### Measured

- Lighthouse home page, desktop: 100 / 100 / 100 / 100. Mobile: 98 / 100 / 100 / 100.
- Grovia case study, desktop: 100 / 100 / 100 / 100.
- 18KB CSS, 5.7KB JavaScript, no third-party requests.

### Deployment

- Static output for Cloudflare Pages.
- Contact form handled by a Cloudflare Pages Function that forwards through Resend,
  with a honeypot for spam and a graceful fall back to email if the key is missing.
- Sitemap, `robots.txt`, per-page canonical URLs, Open Graph and Twitter cards, and
  structured data for the person, the site, each project and each archive item.
