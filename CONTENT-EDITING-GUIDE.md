# Content editing guide

For editing your own site. No coding required.

This is the practical companion to `README.md`. It answers five questions:
add a project, replace an image, edit text, add a section, publish.

---

## 0. Before anything — start the preview

Open Terminal (or PowerShell) in this folder and type:

```
npm install     ← only the first time
npm run dev
```

You'll see `Local  http://localhost:4321/`. Open it in your browser.

**Leave it running while you work.** Save a file, the browser updates in about a
second. Press `Ctrl + C` in the Terminal when you're done.

Two things look different here than on the live site, deliberately:

- Draft projects **do** appear, with an orange "Draft" ribbon.
- Missing images show as grey tiles with a faint description of what belongs there.

---

## 1. The map — which folder holds what

| You want to change | Open |
|---|---|
| A case study | `src/content/projects/<name>.md` |
| An archive piece | `src/content/archive/<name>.md` |
| The About page | `src/content/about.md` |
| Menu, headings, taglines, button labels, your email | `src/data/site.json` |
| Images | `src/assets/` |
| Colours, fonts, sizes | `src/styles/global.css` |
| Header / footer structure | `src/components/Header.astro`, `Footer.astro` |
| Page arrangement | `src/pages/` |

**Two folders to leave alone:** `dist/` (the built site — rebuilt automatically,
edits there are erased) and `astro-handoff/` (the original build package, kept
for reference only; nothing in it affects the live site).

---

## 2. Add a new project

### Step 1 — copy an existing file

Go to `src/content/projects/`. Duplicate **`display-daily.md`** and rename it.

**The file name becomes the web address.** `coffee-app.md` → `karakerezov.com/work/coffee-app`.
Lowercase letters and hyphens only. No spaces, no capitals.

### Step 2 — fill in the settings block

Everything between the two `---` lines at the top. Keep the quotation marks and
the colons exactly where they are; change only what's inside the quotes.

```yaml
---
title: "Coffee App"
titleIndex: ""
subtitle: "Mobile Ordering Experience"
order: 3
cardSize: "standard"
summary: "Two lines maximum — this is the home page card."
summaryIndex: "Can be a little longer — this is the Recent Work page card."
tags:
  - "UX/UI Design"
  - "Mobile App"
  - "Product Design"
cover: "/projects/coffee-app/home.png"
coverAlt: "Coffee app — ordering screen and menu"
cta: "View Case Study"
protected: false
draft: true
hero: "standard"
prototypeUrl: ""
role: "UX/UI Designer"
timeline: "2026"
team: ""
platform: "iOS & Android"
---
```

| Field | What it does |
|---|---|
| `title` | Project name — on the card and as the page heading |
| `titleIndex` | A longer name used **only** on the Recent Work grid. `""` reuses `title` |
| `subtitle` | The small line beside the title |
| `order` | **1 comes first.** The home page shows the three lowest non-draft numbers |
| `cardSize` | `"large"` (tall left card) or `"standard"`. Your `order: 1` project should be `"large"` |
| `summary` | The paragraph on the **home page** card — keep it to two lines |
| `summaryIndex` | The paragraph on the **Recent Work** card |
| `tags` | The pills on the card. Three works best. At least one is required |
| `cover` / `coverAlt` | See section 3. `cover: ""` gives a grey tile |
| `cta` | Button wording |
| `protected` | `true` blurs the cover, adds a padlock and a quiet "Limited Access" link — for NDA work |
| `protectedNote` | The grey line beside that link |
| `draft` | `true` keeps it off the live site. **Set to `false` when it's ready** |
| `hero` | Leave as `"standard"` — see below |
| `prototypeUrl` | Paste a Figma prototype link and a button appears. `""` = no button |
| `role`, `timeline`, `team`, `platform` | The facts bar under the heading. Blank ones are simply left out |
| `description` | Optional. Custom text for Google and social previews |

**About `hero: "standard"`** — the opening of the page (badge, big title, lead
paragraph, facts bar, cover image) is **built for you** from the fields above.
Don't retype the title in the body. `"custom"` means the file draws its own
opening; only Grovia does that.

### Step 3 — write the case study

Everything **below** the second `---`. Write normally:

```markdown
## The problem

Two or three paragraphs. A blank line starts a new paragraph.

### A smaller heading

- A bullet list
- Another point

> A quote or a key insight sits in a soft teal panel.
```

`##` = section heading, `###` = smaller heading, `**bold**`, `[link text](https://…)`.
That's the whole vocabulary you need.

### Step 4 — check it

With `npm run dev` running, open `http://localhost:4321/work/coffee-app`.

### Step 5 — publish it

Change `draft: true` to `draft: false`, then follow section 6.

**How the home page reacts:** it shows the three lowest `order` numbers that
aren't drafts. If only one project is live, the grid becomes a single wide card
rather than leaving a gap — which is exactly what happens today, with Grovia alone.

---

## 2b. Add an archive piece

Same idea, much shorter. Duplicate any file in `src/content/archive/`.

```yaml
---
title: "Honey Jar Label"
category: "Sweets"
label: "Label Design"
cover: "/archive/honey-jar-label.jpg"
coverAlt: "Honey jar label — packaging shot"
client: ""
year: "2019"
deliverables: "Label Design"
gallery:
  - "/archive/honey-jar-detail.jpg"
---
```

**`category` must be one of the categories in `src/data/site.json`** (under
`"archive"` → `"categories"`). Anything else stops the build with a message
listing the allowed ones.

**One thing worth knowing:** an archive tile only becomes **clickable** when
you've written something below the second `---`. Leave the body empty and it
stays a plain tile in the grid — no link to an empty page. Write a sentence or
two and it gets its own detail page automatically.

---

## 3. Replace or add an image

### Where images go

**`src/assets/`**, in a folder per project:

```
src/assets/
└── projects/
    ├── grovia/
    │   ├── home.png
    │   ├── login.png
    │   └── favorites.png
    └── coffee-app/          ← make this folder yourself
        └── home.png
```

### How you point at them

In the text file, write the path **starting after `assets`, with a leading slash**:

```yaml
cover: "/projects/coffee-app/home.png"
```

That means `src/assets/projects/coffee-app/home.png`. Nothing else to do.

> ⚠️ **Not `public/`.** A stale comment in one of the archive files mentions
> `public/archive/…` — ignore it. Images referenced from content files must be in
> `src/assets/`, or they'll silently render as a grey tile. `public/` is only for
> the logo, the favicon and the fonts.

### To replace an image

Two ways, both fine:

- **Same name:** overwrite the file in `src/assets/`, keeping the exact filename.
  Nothing else changes.
- **New name:** drop the new file in and update the `cover:` line to match.

### Sizes — upload the biggest version you have

The site resizes every picture, makes modern lightweight versions, and loads them
only when they scroll into view. **You never need to make small copies.**

| Where | Best shape | Suggested width |
|---|---|---|
| Project card covers | Landscape, roughly 4:3 | 1600px |
| Archive tiles | Portrait, 4:5 | 1200px |
| App screenshots | Whatever the phone exports | as exported |
| About portrait | Portrait, 4:5 | 1400px |

Accepted formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`, `.gif`.

### Alt text is not optional

Every `coverAlt` is what a blind visitor hears in place of the picture. Describe
what's in it — *"Grovia home screen showing best-price offers"* — not "image" or
"screenshot".

### If a picture isn't there yet

Nothing breaks. You get a calm grey tile of exactly the right shape, so the
layout already looks the way it will once you drop the real file in.
**A broken image can never appear on this site.**

Capitalisation counts: `Home.png` and `home.png` are different files.

---

## 4. Edit text anywhere

Ask "which page is it on?", then:

| The words you want to change | The file |
|---|---|
| Menu items, your email, LinkedIn, copyright | `src/data/site.json` (top level) |
| Home page — big opening line, section headings, "Let's connect." | `src/data/site.json` → `"home"` |
| Recent Work page heading and intro | `src/data/site.json` → `"work"` |
| Archive page heading, intro, category list | `src/data/site.json` → `"archive"` |
| Contact page wording, form labels, error messages | `src/data/site.json` → `"contact"` |
| 404 page | `src/data/site.json` → `"notFound"` |
| The About page | `src/content/about.md` |
| A project's card text and case study | `src/content/projects/<name>.md` |
| An archive piece | `src/content/archive/<name>.md` |

### Editing `site.json` safely

It looks technical, but it's just labelled boxes. **Change what's inside the
quotation marks. Leave every comma, colon and bracket exactly as it is.**

```json
"heroTagline": "Clarity, aesthetics and intelligent workflows shaped into digital experiences.",
```

Only the part after the colon changes. The comma at the end stays.

Useful spots in `site.json`:

- **`"nav"`** (line ~18) — the menu. Each entry has a `label` and an `href`.
- **`"home"`** (line ~36) — every word on the home page: `heroLine1`, `heroLine2`,
  `heroTagline`, `workHeading`, `aboutBody`, `archiveBody`, `contactHeading`.
- **`"behavior"`** (near the bottom) — three on/off switches:
  `"darkMode"` (the sun/moon button), `"headerAutoHide"` (header slides away as
  you scroll down), `"scrollReveal"` (sections fade up). Set any to `false` to
  turn it off. No quotes around `true`/`false`.
- **`"linkedin"` / `"behance"`** — set to `""` and the link disappears from the
  footer entirely.

### Editing the About page

`src/content/about.md`. The top block holds three lists:

```yaml
experience:
  - {"title":"UX/UI Design","body":"Interfaces, user flows, wireframes…"}
tools:
  - "Figma"
  - "Adobe Photoshop"
timeline:
  - {"period":"2025 — Now","role":"UX/UI Designer · Generic Soft","current":true}
```

To add a line, copy an existing one, keep the indentation identical, and change
the words inside the quotes. Only **one** timeline entry should have
`"current":true`. The paragraphs below the `---` are your story — write freely.

---

## 5. Add a new section

Two different things go by this name.

### 5a. A new section inside a case study — easy

Just write another `##` heading in the project file. Nothing else needed:

```markdown
## Usability testing

Five participants, two rounds, one week apart.

### What we changed

- Bigger tap target on the basket
- Clearer price comparison
```

Headings, paragraphs, lists and quotes are all styled to match the site
automatically. This works in any `.md` project file.

### 5b. A richer section, using the ready-made blocks

`src/components/casestudy/` holds around 30 designed blocks — personas, journey
maps, screen grids, before/after comparisons, wireframes, findings panels.

**To use them, the file must end in `.mdx`, not `.md`** (Grovia is the example).
If you rename `coffee-app.md` to `coffee-app.mdx`, add the imports at the top of
the body, and set `hero: "custom"` if you want to draw your own opening.

A minimal example:

```mdx
import Section from '../../components/casestudy/Section.astro';
import SectionHead from '../../components/casestudy/SectionHead.astro';
import ScreenGrid from '../../components/casestudy/ScreenGrid.astro';

<Section>
  <SectionHead
    heading="Ordering flow"
    body="Three steps from open to confirmation."
  />
  <ScreenGrid
    cols={3}
    items={[
      { image: '/projects/coffee-app/menu.png', alt: 'Menu screen', caption: 'Browse' },
      { image: '/projects/coffee-app/cart.png', alt: 'Cart screen', caption: 'Review' },
      { image: '/projects/coffee-app/done.png', alt: 'Confirmation', caption: 'Confirm' },
    ]}
  />
</Section>
```

**The reliable way to do this:** open `src/content/projects/grovia.mdx`, find a
block that looks like what you want, copy it whole, and change the text and image
paths. Every block used on the site is in there with real values.

### 5c. A new section on the home page — needs one code edit

This is the only task in this guide that touches an `.astro` file. It's still
copy-and-paste.

**Step 1** — put your words in `src/data/site.json`, inside the `"home"` block:

```json
"servicesHeading": "How I work",
"servicesBody": "Research, structure, interface, handoff.",
```

**Step 2** — open `src/pages/index.astro`. Between lines 27 and 104 you'll see the
sections in page order: hero → work → about → archive → contact. Copy an existing
`<section>` block, paste it where you want it, and point it at your new keys:

```astro
<section id="services" class="hk-about" aria-labelledby="services-heading" data-hk-reveal>
  <div class="hk-about-card hk-card">
    <div class="hk-about-copy">
      <h2 class="hk-h2" id="services-heading">{site.home.servicesHeading}</h2>
      <p class="hk-prose">{site.home.servicesBody}</p>
    </div>
  </div>
</section>
```

Three rules: the `id` and `aria-labelledby` must be unique on the page and match
each other; keep `data-hk-reveal` so it fades in like the others; reuse the
existing `class` names rather than inventing new ones — that's what keeps the
spacing and typography consistent.

**To reorder sections,** cut and paste whole `<section>` blocks. **To remove one,**
delete it. To hide it temporarily, wrap it in `{false && ( … )}`.

---

## 6. Update the live site

### Check it first

```
npm run build
```

This is your safety net. It validates every settings block and **stops with the
file name and the exact problem** if something's mistyped. If it finishes without
errors, the site is sound.

### Publish

> **Not set up on this computer yet.** Git isn't installed here and this folder
> isn't connected to GitHub, so the commands below won't work until that one-time
> setup is done — see **README.md, section 8**. It takes about ten minutes: install
> Git from [git-scm.com](https://git-scm.com), create a private GitHub repository,
> and connect it to Cloudflare Pages.

Once that's done, publishing is three lines:

```
git add .
git commit -m "Added the coffee app case study"
git push
```

The message in quotes is just a note to yourself. The live site rebuilds itself
and updates **about a minute after you push.** No uploading, no dragging files.

Or open Claude Code in this folder and say *"publish my changes"*.

---

## 7. When something goes wrong

**The build stops and names a project file.** Something in the settings block is
mistyped. The usual culprits:

- `draft: "true"` with quotes → should be `draft: true`, no quotes. Same for `protected`.
- `order: "1"` with quotes → should be `order: 1`.
- A missing comma, or a stray comma after the last item in a list.
- `category` set to something not in `site.json` — the error prints the allowed list.
- `tags` left empty — at least one tag is required.

**A picture shows as a grey tile.** Check three things: the file really is inside
`src/assets/`; the path in the text file starts with `/` and matches the folder
names exactly; the capitalisation matches.

**The site looks broken after a colour change.** In `src/styles/global.css` each
colour exists in **three** places — the light block at `:root {`, the dark block
at `:root[data-theme='dark']`, and a copy inside `@media (prefers-color-scheme: dark)`.
Change all three, and check every line still ends with `;`.

**A new project doesn't appear on the live site.** It's still `draft: true`.

**A project appears in the wrong place.** Check `order`. Lower numbers come first,
and only the three lowest non-draft numbers reach the home page.

**`npm: command not found`.** Node.js isn't installed. Get the LTS version from
[nodejs.org](https://nodejs.org), close the Terminal completely, open a new one.

**Nothing works and you can't see why.** Once Git is set up, `git checkout .`
throws away every change since your last commit and returns you to a working site.
Until then, keep a copy of the folder before large edits.

**Still stuck?** Open Claude Code in this folder and describe what you're seeing.
It can read every file here, including the error message.
