# Design system requirements

The visual system as it is built. Source of truth: **`src/styles/global.css`**
(640 lines, three parts: fonts → tokens → primitives → breakpoints).

**The rule that governs everything below:** components reference custom
properties. No component contains a hex code, a raw px font-size, or its own
transition timing. If you need a value that doesn't exist as a token, add the
token — don't inline the value.

---

## 1. Colour

Defined three times: `:root` (light, line 92), `:root[data-theme='dark']`
(line 187), and `@media (prefers-color-scheme: dark)` → `:root:not([data-theme='light'])`
(line 227). **All three must carry the same value or the colour breaks in one mode.**

### Surfaces

| Token | Light | Dark | Use |
|---|---|---|---|
| `--hk-bg` | `#f7f7f4` | `#121312` | Page background |
| `--hk-surface` | `#ffffff` | `#1b1c1b` | Cards, form fields |
| `--hk-surface-alt` | `#efefeb` | `#232423` | Filled panels, media wells |
| `--hk-dark-well` | `#1e1f1e` | `#0e0f0e` | The one deliberately dark block |

### Text

| Token | Light | Dark | Use |
|---|---|---|---|
| `--hk-ink` | `#151515` | `#f2f2ee` | Headings, strong text |
| `--hk-ink-2` | `#6a6a65` | `#a8a8a2` | Body text |
| `--hk-ink-3` | `#9b9b94` | `#8a8a84` | **Decoration only — fails AA as text** |
| `--hk-ink-3-text` | `#6b6b65` | `#8e8e88` | Small meta labels. Use this for text |
| `--hk-on-ink` | `#f7f7f4` | `#121312` | Text on a solid ink button |

### Accent

| Token | Light | Dark | Use |
|---|---|---|---|
| `--hk-accent` | `#00909e` | `#34c5d2` | Fills, borders, dots, icons, focus ring. **Not small text** |
| `--hk-accent-text` | `#00757f` | `#34c5d2` | Links, eyebrows, active nav, chips |
| `--hk-accent-strong` | `#007c88` | `#34c5d2` | Accent as a background behind white text |
| `--hk-accent-strong-hover` | `#00646e` | `#6fdbe6` | Hover for the above |
| `--hk-accent-hover` | `#007c88` | `#6fdbe6` | Hover for accent text |
| `--hk-on-accent` | `#ffffff` | `#121312` | Text sitting on accent |
| `--hk-accent-soft` | 8% teal | 12% teal | Tinted panels, focus glow |
| `--hk-accent-line` | 24% teal | 32% teal | Accent hairlines |

> **The accent split is a WCAG correction, not a style choice.** `#00909e`
> measures 3.57:1 on the page background — fine for a dot or an icon, failing for
> text. Every text use goes to `--hk-accent-text` (5.08:1). The same applies to
> `--hk-ink-3` → `--hk-ink-3-text`. See `README.md` §11 for the measured table.
> Do not "simplify" these pairs back into one token.

### Lines, tints, shadows

`--hk-hairline` (8%) card borders · `--hk-hairline-2` (12%) inputs, pills ·
`--hk-hairline-3` (18%) ghost buttons · `--hk-hover-tint` (4%) hover fills ·
`--hk-veil` image overlay · `--hk-badge` badge background ·
`--hk-card-shadow` card hover · `--hk-tile-shadow` archive tile ·
`--hk-drop-sm/md/lg` free-standing screenshots ·
`--hk-media-filter` (`none` light, `brightness(0.92) contrast(1.02)` dark) ·
`--hk-error` / `--hk-error-soft` form validation ·
`--hk-wire-border` / `-2` wireframe strokes.

---

## 2. Typography

Two families, loaded locally from `public/fonts/` — ten `.woff2` files, no CDN,
Cyrillic included in Nunito.

- `--hk-font-display` — **Instrument Serif**, weight 400 only. Headings.
- `--hk-font-body` — **Nunito Sans**, weights 400/500/600/700. Everything else.

### Scale

| Token | Value | Applied by |
|---|---|---|
| `--hk-h1-home` | `clamp(48px, 6.1vw, 88px)` | `.hk-h1-home` — home hero only |
| `--hk-h1-page` | `clamp(48px, 5.2vw, 80px)` | `.hk-h1-page` — page and case-study titles |
| `--hk-h1-case` | `clamp(56px, 6vw, 96px)` | Custom case-study heroes |
| `--hk-h2` | `48px` (40 ≤1200, 34 ≤600) | `.hk-h2` — section headings |
| `--hk-h2-cta` | `clamp(40px, 4vw, 56px)` | Contact band |
| `--hk-h2-lg` | `clamp(44px, 4.6vw, 64px)` | Chapter openings |
| `--hk-h3` | `28px` | Card titles |
| `--hk-h3-sm` | `22px` | Nested headings |
| `--hk-h4` | `40px` | Large numerals |
| `--hk-lead` | `22px` (19 ≤600) | `.hk-lead` — intro paragraphs |
| `--hk-body` | `18px` (17 ≤600) | `.hk-prose`, body |
| `--hk-body-sm` / `-xs` | `15px` / `14px` | Dense text |
| `--hk-meta` | `15px` | Buttons, nav links |
| `--hk-meta-sm` | `13px` | Eyebrows, pills, meta |

### Rules

- Display type: weight **400**, `letter-spacing: -0.02em` (`-0.03em` for h1),
  `line-height` 0.95–1.05. Serif is never bolded.
- Body: `line-height: 1.55`, `text-wrap: pretty`. Headings that wrap use
  `text-wrap: balance`.
- Eyebrows (`.hk-eyebrow`, `.hk-eyebrow-accent`): 13px, 600, uppercase,
  `letter-spacing: 0.06em`, `line-height: 1`.
- Measure: `--hk-content-max: 760px` for headings and section copy,
  `--hk-prose-max: 680px` for long paragraphs. **Never let body text run the
  full shell width.**
- Form inputs are **16px** — deliberately, so iOS does not zoom on focus.

---

## 3. Layout and spacing

| Token | Value | Meaning |
|---|---|---|
| `--hk-shell-max` | `1440px` | Content column ceiling |
| `--hk-shell-pad` | `64px` (40 / 28 / 20) | Side padding, via `.hk-shell` |
| `--hk-header-h` | `76px` | Fixed header height |
| `--hk-page-top` | `200px` (140 ≤900) | Space above a page title |
| `--hk-section-pad` | `80px` (56 ≤900) | Vertical rhythm between sections |
| `--hk-gap` | `32px` (24 ≤900) | Grid and flex gap |
| `--hk-gap-sm` | `24px` | Tighter gap |
| `--hk-card-pad-lg` / `-md` | `32px` / `28px` | Card padding |

Every page wraps its content in `.hk-shell`. Case-study sections use
`<Section space="sm|md|lg">` → 96 / 112 / 128px bottom padding, capped at 72px
below 900px.

Spacing outside the tokens is set in whole steps — 8, 12, 16, 20, 24, 28, 32, 48,
56, 64. No arbitrary values like 17px or 43px.

---

## 4. Radius

| Token | Value | Use |
|---|---|---|
| `--hk-r-card` | `48px` (36 ≤900, 28 ≤600) | Large cards |
| `--hk-r-media` | `32px` (24 ≤900) | Image wells, small cards |
| `--hk-r-card-sm` | `24px` | Nested cards |
| `--hk-r-field` | `28px` | Inputs and textareas |
| `--hk-r-pill` | `999px` | Buttons, pills, icon buttons |

The generous radius is the signature of this design. Do not reduce it, and do not
introduce a fourth card radius.

---

## 5. Buttons

Base `.hk-btn`: inline-flex, `gap: 8px`, 15px/600, `line-height: 1`, pill radius,
`padding: 14px 24px`, **`min-height: 44px`**, `transition: var(--hk-t-btn)`.

| Class | Idle | Hover |
|---|---|---|
| `.hk-btn-solid` | `--hk-ink` fill, `--hk-on-ink` text | Fill → `--hk-accent-strong` |
| `.hk-btn-accent` | `--hk-accent-strong` fill, white text, `16px 28px` | → `--hk-accent-strong-hover` |
| `.hk-btn-ghost` | Transparent, `--hk-hairline-3` border | `--hk-hover-tint` fill |
| `.hk-link` | Text + arrow, `--hk-ink`, 44px min-height | → `--hk-accent-text` |

Arrows are a separate `<span aria-hidden="true">→</span>`, never part of the label
string. `.hk-btn-solid` is the primary action; one per view.

---

## 6. Cards

- `.hk-card` — `--hk-surface` background, 1px `--hk-hairline` border,
  `--hk-r-card` radius.
- `.hk-card-sm` — same, `--hk-r-media` radius.
- `.hk-media` — a well: `--hk-r-media`, `overflow: hidden`,
  `--hk-surface-alt` background. Images inside are `object-fit: cover` with
  `--hk-media-filter`.
- `.hk-screen` — a free-standing phone screenshot: keeps its own shape, gets
  `--hk-drop-md`, never cropped.

**Hover:** `transform: var(--hk-lift)` (`translateY(-4px)`) plus
`--hk-card-shadow`, over `--hk-t-card`. Images inside zoom with
`--hk-zoom` (`scale(1.025)`) over `--hk-t-media`. Both are disabled under
`prefers-reduced-motion`.

Cards are `<article>` with `aria-labelledby` pointing at their own title.
Never nest an interactive card inside another link.

---

## 7. Tags and pills

`.hk-pill` — 13px/600, `--hk-ink-2` text, 1px `--hk-hairline-2` border,
`--hk-pill-fill` background, pill radius, `padding: 8px 14px`.
`.hk-pill-lg` widens to `10px 18px`. `.hk-pill-row` is the flex wrapper,
`gap: 8px`, list-style stripped.

Tags are `<li>` inside a `<ul class="hk-pill-row">` — a list semantically, because
that is what it is. **Three tags per project card.** They are labels, not links.

The case-study `<PillRow variant="dot|plain|outline">` is the in-page variant.

---

## 8. Forms

- `.hk-input` — 16px, `--hk-surface` background, 1px `--hk-hairline-2`,
  `--hk-r-field` radius, `padding: 18px 22px`, 44px min-height.
- Focus: `--hk-accent` border **plus** a 4px `--hk-accent-soft` glow, **plus**
  the standard `:focus-visible` outline. The glow alone is not a focus indicator.
- `:user-invalid` turns the border `--hk-error` — after the field is touched,
  never before.
- `.hk-textarea` — 160px min-height, `resize: vertical`.
- Every field: a real `<label for>`, plus a `.hk-hint` wired with
  `aria-describedby`. Placeholders are examples, never labels.
- The form posts to `functions/api/contact.ts` and works with JavaScript off.
  A hidden `.hk-honeypot` field discards bots. Error copy lives in
  `site.json` → `contact`.

---

## 9. Header behaviour

Fixed, `z-index: 50`, transparent over the page, `--hk-header-h` tall.
Driven by `src/scripts/theme.ts` and two flags in `site.json` → `behavior`.

| State | Trigger | Effect |
|---|---|---|
| `.is-scrolled` | `scrollY > 8` | `--hk-header-scrolled` background (82% opaque) + `blur(12px)` + hairline bottom border |
| `.is-hidden` | Scrolling **down** past 140px, after a 180ms delay | `translateY(-100%)` |
| — | Scrolling up, any amount | Returns immediately |
| — | `focusin` anywhere in the header | Always returns — a keyboard user is never left chasing it |

Auto-hide requires `"headerAutoHide": true` **and** no reduced-motion preference.
Transition: `--hk-t-header`.

**Nav:** `.hk-nav-link` 15px/600, 44px min-height, `aria-current="page"` on the
active section (matching `/work` and anything under it), coloured
`--hk-accent-text`.

**Below 900px** the nav is replaced by a 44px pill toggle opening a full-screen
`.hk-drawer`: display-serif links at 40px, focus trapped while open, `Escape`
closes, focus returns to the toggle.

**Scheme toggle** renders only when `"darkMode": true`. Choice is stored in
`localStorage` under `hk-theme` and applied by a blocking inline script in
`Base.astro` — there is no flash of the wrong theme, and any change must preserve
that.

---

## 10. Motion

| Token | Value |
|---|---|
| `--hk-t-card` | `transform .35s ease, box-shadow .35s ease` |
| `--hk-t-media` | `transform .5s ease` |
| `--hk-t-link` | `color .2s ease` |
| `--hk-t-btn` | `background/border/color .25s ease` |
| `--hk-t-header` | `.45s cubic-bezier(.22,.61,.36,1)` + background/border/blur `.35s` |
| `--hk-lift` | `translateY(-4px)` |
| `--hk-zoom` | `scale(1.025)` |

**Scroll reveal:** add `data-hk-reveal` to a section. `theme.ts` arms it, an
IntersectionObserver at `threshold: 0.08` adds `.is-visible`, and it fades from
`opacity 0 / translateY(20px)` over `0.8s ease`. It is **opt-in and inert** —
with JavaScript off or motion reduced, content is simply visible. Never animate
content that must be readable immediately.

**`prefers-reduced-motion: reduce`** globally clamps animation and transition to
`0.01ms` and disables smooth scrolling. Card lift and header auto-hide check it
individually. Any new motion must degrade the same way.

Nothing loops, autoplays, parallaxes or moves without user intent.

---

## 11. Responsive

Three breakpoints, mobile-*last* — the desktop values are the defaults and each
query overrides tokens rather than rewriting components.

| Query | Token changes |
|---|---|
| `≤1200px` | `--hk-shell-pad: 40px`, `--hk-h2: 40px` |
| `≤900px` | `--hk-shell-pad: 28px`, `--hk-r-card: 36px`, `--hk-r-media: 24px`, `--hk-page-top: 140px`, `--hk-gap: 24px`, `--hk-section-pad: 56px` |
| `≤600px` | `--hk-shell-pad: 20px`, `--hk-h2: 34px`, `--hk-lead: 19px`, `--hk-body: 17px`, `--hk-r-card: 28px` |

**900px is the structural breakpoint** — used in 62 places. At that width: nav →
drawer, multi-column grids → single column, fixed media heights → `aspect-ratio`,
the About image moves above the copy (`order: -1`).

1200px is the intermediate grid step (4-up → 2-up). 600px is the final collapse
(2-up → 1-up).

Add a new breakpoint only if none of the three works. Prefer `minmax()`,
`clamp()` and `auto-fit` over another query.

---

## 12. Accessibility floor

Non-negotiable, and already measured across seven pages in both schemes
(`README.md` §11):

- **Contrast:** 4.5:1 normal text, 3:1 large text and UI borders. Use the
  `-text` token variants.
- **Focus:** `2px solid var(--hk-accent)`, `outline-offset: 3px`, on every
  focusable element. Never `outline: none`.
- **Tap targets:** 44px minimum. Buttons, nav links and icon buttons all carry
  an explicit `min-height`.
- **Skip link** first in the tab order on every page.
- **Images:** every one goes through `Media.astro` or `Screen.astro`. Missing
  files render a placeholder of the right shape — a broken image cannot ship.
  Real alt text; `alt=""` only for genuine decoration.
- **JavaScript off:** every page reads and every link works. Archive filters are
  real links to real pages.
- **Budget:** 18KB CSS, 5.7KB JS, no third-party code, no tracking. Lighthouse
  100/100/100/100 on desktop. A change that adds a runtime dependency needs a
  conversation first.
