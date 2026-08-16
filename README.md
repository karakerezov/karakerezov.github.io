# Your portfolio website

This folder *is* your website. Everything the live site shows comes from the text
files and images in here. Change a file, publish, and the site changes.

You don't need to write code to run it. The parts you'll actually touch are plain
text and pictures.

---

## 1. What this is

A website built from your design, with your writing kept separate from the layout.
The layout is fixed and matches the design you approved. The writing and the pictures
are yours to change whenever you like.

**Where things live, in plain words:**

| Folder | What's in it |
|---|---|
| `src/content/projects/` | **Your case studies.** One text file per project. |
| `src/content/archive/` | **Your archive items.** One text file per packaging piece. |
| `src/content/about.md` | **The About page** — your story, experience, tools, career timeline. |
| `src/data/site.json` | **Everything else you can read on the site** — the menu, headings, your email, the wording on every page. |
| `src/assets/` | **Your images.** Drop picture files in here. |
| `public/fonts/` | The two typefaces. You won't need to touch these. |
| `src/components/`, `src/layouts/`, `src/pages/` | The machinery. Leave alone unless you want a layout change. |
| `dist/` | The finished website, rebuilt automatically. Never edit anything in here. |

---

## 2. Running it on your computer

You need **Node.js** installed once — get it from [nodejs.org](https://nodejs.org)
(take the "LTS" version, click through the installer).

Then open Terminal, and type these two lines. The first one is only needed the very
first time, or after you download a fresh copy:

```
npm install
npm run dev
```

You'll see a line like:

```
Local    http://localhost:4321/
```

Hold ⌘ (or Ctrl) and click that address, or paste it into your browser. That's your
site, running on your own machine — nobody else can see it.

**Leave it running while you work.** Every time you save a text file, the browser
updates by itself within a second. When you're done, click into the Terminal and
press `Ctrl + C` to stop it.

**Two things look different here than on the live site**, on purpose:

- Projects marked as drafts *do* appear, with an orange **"Draft"** ribbon along the
  bottom, so you can work on them before anyone sees them.
- Missing pictures show as grey tiles with a faint description of what belongs there.
  On the live site those tiles are silent — no text, nothing that looks broken.

---

## 3. Adding a new project

**Step 1 — copy an existing file.** Go to `src/content/projects/`, duplicate
`display-daily.md`, and rename it. The file name becomes the web address, so
`coffee-app.md` becomes `karakerezov.com/work/coffee-app`. Use lowercase letters and
hyphens, no spaces.

**Step 2 — edit the top block.** Everything between the two `---` lines is settings.
Keep the quotation marks where they already are.

| Line | What it does |
|---|---|
| `title` | The project name, shown on the card and as the page heading. |
| `titleIndex` | A longer name used **only** on the Recent Work grid. Leave as `""` to reuse `title`. |
| `subtitle` | The small grey line beside the title, e.g. "Grocery Mobile App". |
| `order` | A number. **1 comes first.** The home page shows 1, 2 and 3; the Recent Work page shows all of them in this order. |
| `cardSize` | `"large"` or `"standard"`. The `order: 1` project should be `"large"` — it gets the tall card on the left of the home page. |
| `summary` | The paragraph on the **home page** card. Keep it to two lines. |
| `summaryIndex` | The paragraph on the **Recent Work** card. Can be a little longer. |
| `tags` | The little pills on the card. Three works best. |
| `cover` | The card picture. See section 6. Leave as `""` for a grey tile. |
| `coverAlt` | A short description of the picture, for people using a screen reader. Always fill this in. |
| `cta` | The button wording, e.g. "View Case Study". |
| `protected` | `true` blurs the cover, adds a padlock badge, and turns the button into a quiet "Limited Access" link. Use it for NDA work. |
| `protectedNote` | The grey line beside that link, e.g. "Protected case study — available with password." |
| `draft` | `true` keeps it off the live site. **Set it to `false` when the project is ready.** |
| `prototypeUrl` | Paste a Figma prototype link and a "View Interactive Prototype" button appears. Leave `""` and no button is shown. |
| `role`, `timeline`, `team`, `platform` | The facts bar under the heading. Any you leave as `""` are simply left out. |
| `hero` | Leave as `"standard"`. Only Grovia uses `"custom"`, because it draws its own opening. |

**Step 3 — write the case study.** Everything *below* the second `---` is the page
itself. Write normally. A line starting with `##` becomes a section heading, `###` a
smaller one. A blank line starts a new paragraph.

**Step 4 — check it.** With `npm run dev` running, open
`http://localhost:4321/work/your-file-name`.

**How the home page reacts:** it shows the three lowest `order` numbers that aren't
drafts. If only one project is live, the grid gracefully becomes a single wide card
rather than leaving a gap — which is exactly what happens today, with Grovia alone.

---

## 4. Adding an archive item

Same idea, shorter. Duplicate a file in `src/content/archive/`.

| Line | What it does |
|---|---|
| `title` | The piece's name. |
| `category` | **Must be one of the categories listed in `src/data/site.json`.** Anything else stops the build with a message telling you the allowed list. |
| `label` | The small grey line, e.g. "Packaging Design". |
| `cover` | The tile picture. |
| `coverAlt` | Short description of the picture. |
| `client`, `year`, `deliverables` | Optional. Shown on the detail page; blank ones are left out. |
| `gallery` | A list of extra pictures for the detail page. |

**One thing worth knowing:** an archive tile only becomes clickable when you've
written something below the second `---`. Leave the body empty and it stays a plain
tile in the grid — no link leading to an empty page. Write a sentence or two and it
gets its own page automatically.

---

## 5. Changing text anywhere

Ask yourself "which page is it on?", then:

| The words you want to change | The file to open |
|---|---|
| The menu, your email, your LinkedIn, the copyright line | `src/data/site.json` |
| Home page: the big opening line, the section headings, "Let's connect." | `src/data/site.json`, under `"home"` |
| Recent Work page heading and intro | `src/data/site.json`, under `"work"` |
| Archive page heading, intro, and the category list | `src/data/site.json`, under `"archive"` |
| Contact page wording, form labels, thank-you message | `src/data/site.json`, under `"contact"` |
| The About page | `src/content/about.md` |
| A project's card text and case study | `src/content/projects/<name>.md` |
| An archive item | `src/content/archive/<name>.md` |

`site.json` looks technical but it's just labelled boxes. Change what's **inside the
quotation marks** and leave the punctuation around them exactly as it is:

```
"heroTagline": "Clarity, aesthetics and intelligent workflows shaped into digital experiences.",
```

Only the part after the colon changes. Keep the comma at the end.

---

## 6. Adding images

**Where they go:** `src/assets/`, in a folder that matches the project —
for example `src/assets/projects/coffee-app/home.png`.

**How you point at them:** in the text file, write the path starting from `assets`,
with a leading slash:

```
cover: "/projects/coffee-app/home.png"
```

That's it. The site resizes each picture, makes modern lightweight versions, and
loads them only when they scroll into view. You don't need to make small copies —
**upload the biggest, sharpest version you have.**

**Sizes and shapes:**

| Where | Best shape | Suggested width |
|---|---|---|
| Project card covers | Landscape, roughly 4:3 | 1600px |
| Archive tiles | Portrait, 4:5 | 1200px |
| App screenshots | Whatever the phone exports | as exported |
| About portrait | Portrait, 4:5 | 1400px |

Tall phone screenshots are handled for you: rather than being cropped to a strip,
they're shown whole and centred on the card's own background. Wide mockups fill the
frame edge to edge.

**Alt text matters.** Every `coverAlt` line is what a blind visitor hears in place of
the picture, and what shows if an image ever fails to load. Describe what's in it —
"Grovia home screen showing best-price offers" — not "image" or "photo".

**If a picture isn't there yet**, nothing breaks. You get a calm grey tile of exactly
the right shape, so the layout already looks the way it will once you drop the real
file in. **A broken image can never appear on this site.**

---

## 7. Publishing changes

Three lines in the Terminal:

```
git add .
git commit -m "Added the coffee app case study"
git push
```

The message in quotes is just a note to yourself about what you changed.

The live site rebuilds itself and updates **about a minute after you push.** You
don't need to do anything else — no uploading, no dragging files anywhere.

Or simply open Claude Code in this folder and say *"publish my changes"*.

Want to check it looks right before publishing? Run `npm run build`. If you've made a
typo in one of the settings lines, this is where it tells you — with the file name
and what it expected.

---

## 8. First deploy to Cloudflare Pages

Do this once. After that, section 7 is all you need.

**Put the code on GitHub first:**

1. Go to [github.com/new](https://github.com/new). Name it `portfolio`. Choose
   **Private**. Don't tick any of the "initialize with" boxes. Click
   **Create repository**.
2. GitHub then shows you a short list of commands under "…or push an existing
   repository". Copy those lines into your Terminal, from this folder.

**Then connect Cloudflare:**

3. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up — it's free.
4. In the left sidebar choose **Workers & Pages**, then **Create**, then the
   **Pages** tab, then **Connect to Git**.
5. Authorise GitHub, and pick your `portfolio` repository.
6. On the setup screen, fill in exactly:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Leave everything else as it is.
7. Click **Save and Deploy**. Give it two or three minutes. You'll get an address
   like `portfolio-a1b.pages.dev` — your site is live.

**Your own domain:**

8. In your new Pages project, open the **Custom domains** tab, click **Set up a
   custom domain**, and type `karakerezov.com`.
9. Cloudflare shows you the DNS records to add. If you bought the domain elsewhere,
   paste those records into that provider's DNS settings. If you move the domain to
   Cloudflare, it does this itself.
10. The certificate takes a few minutes. Then `https://karakerezov.com` is your site.

> If you ever change the domain, open `src/data/site.json` and change the `"url"`
> line, and change the same address in `astro.config.mjs` and `public/robots.txt`.
> Those three places tell Google and social networks where the site really lives.

---

## 9. The contact form

The form on the Contact page emails you. Static websites can't send email on their
own, so a small piece of code (`functions/api/contact.ts`) hands the message to a
service called **Resend**. Resend's free tier is far more than a portfolio needs.

**Setting it up, once:**

1. Sign up at [resend.com](https://resend.com).
2. Go to **API Keys** → **Create API Key**. Name it `portfolio`. Copy the key it
   shows you — it starts with `re_`. **You only get to see it once.**
3. In Cloudflare, open your Pages project → **Settings** → **Environment variables**
   → **Add variable**. Add these, for **Production**:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | the `re_…` key you copied |
   | `CONTACT_TO` | `karakerezov@gmail.com` |

4. Go to **Deployments**, and click **Retry deployment** on the most recent one.
   Environment variables only reach the site on a fresh build.

**Testing it:** open your live Contact page, send yourself a message, and check your
inbox. Replying to it replies straight to whoever wrote in.

**Optional, later:** by default messages arrive from Resend's shared testing address.
To send from your own domain, verify `karakerezov.com` inside Resend (it walks you
through it), then add a third variable `CONTACT_FROM` with a value like
`Portfolio <hello@karakerezov.com>`.

**What visitors see if something goes wrong** — never a silent failure:

- Message sent → a "Thank you." page.
- Something failed → the form again, with the reason at the top and your email
  address underneath.
- Key not set up yet → a page that simply hands them your email address instead.

The form is an ordinary web form. It works even if a visitor has JavaScript turned
off, and it carries a hidden trap field that silently discards automated spam.

---

## 10. Colours, fonts and dark mode

Every colour and size on the site is defined once, at the top of
`src/styles/global.css`, in the block that starts `:root {`. Change a value there and
it changes everywhere it's used — that's the point.

```
--hk-accent: #00909E;      the teal
--hk-bg: #F7F7F4;          the page background
--hk-ink: #151515;         headings and strong text
```

**If you change one, change its dark-mode partner too.** Just below the light block
is one starting `:root[data-theme='dark']`, and below that the same list again inside
`@media (prefers-color-scheme: dark)`. All three need the same value, or the colour
will look right in one mode and wrong in the other.

**Dark mode** works by itself. A visitor whose computer is set to dark sees the dark
version immediately — there's no flash of white first. The sun/moon button in the
header lets them override that, and the site remembers their choice. If you'd rather
not offer it at all, open `src/data/site.json` and set `"darkMode": false` under
`"behavior"`; the button disappears and the site stays light.

Two other switches live in the same place: `"headerAutoHide"` (the header slides away
as you scroll down and returns when you scroll up) and `"scrollReveal"` (sections
fade up as they come into view).

**Fonts** are Instrument Serif for headings and Nunito Sans for everything else. Both
files sit in `public/fonts/` and load from your own site — no request to Google, which
is faster and keeps visitors' data out of it. The Nunito files include Cyrillic, so
Bulgarian text will render properly.

---

## 11. Accessibility

The site is built to **WCAG 2.2 AA**. What that means in practice:

- Every page can be used with the keyboard alone. `Tab` moves forward, `Shift+Tab`
  back, `Enter` activates. The first `Tab` on any page offers a "Skip to main
  content" link.
- Everything you can focus shows a clear teal ring. Nothing relies on hover alone.
- The archive filters are real links to real pages, so they work with JavaScript
  switched off. With it on, they filter instantly and announce the new count
  ("2 projects") to screen readers.
- The mobile menu traps focus while open, closes with `Escape`, and returns focus to
  the button that opened it.
- Animations are switched off automatically for anyone whose system asks for reduced
  motion. All content is visible without JavaScript.
- Every image has a description. Decorative ones are explicitly marked as decorative
  so screen readers skip them.
- Tap targets are at least 44px.

### Measured contrast

Every ratio below was measured from the built site, in both colour schemes, and
checked automatically across seven pages. AA needs **4.5:1** for normal text and
**3:1** for large text and interface borders.

**Light**

| Used for | Colour | On page bg | On white card | On filled panel |
|---|---|---|---|---|
| Headings, strong text | `#151515` | 17.01:1 | 18.26:1 | 15.84:1 |
| Body text | `#6A6A65` | 5.07:1 | 5.44:1 | 4.72:1 |
| Small meta labels | `#6B6B65` | 5.00:1 | 5.36:1 | 4.65:1 |
| Accent text, links | `#00757F` | 5.08:1 | 5.45:1 | 4.73:1 |
| Accent fills, icons, dots *(not text)* | `#00909E` | 3.57:1 | 3.83:1 | 3.32:1 |

White on the filled teal button `#007C88`: **4.95:1**. Button text on near-black:
**17.01:1**.

**Dark**

| Used for | Colour | On page bg | On card | On filled panel |
|---|---|---|---|---|
| Headings, strong text | `#F2F2EE` | 16.59:1 | 15.23:1 | 13.88:1 |
| Body text | `#A8A8A2` | 7.79:1 | 7.15:1 | 6.52:1 |
| Small meta labels | `#8E8E88` | 5.65:1 | 5.19:1 | 4.73:1 |
| Accent text, links | `#34C5D2` | 8.92:1 | 8.19:1 | 7.46:1 |

### Three deliberate corrections to the original design

The design was followed exactly, apart from three colour values that could not have
passed. Each keeps the original for decoration and adds a text-safe partner, so the
site looks the same but reads properly.

1. **`#9B9B94` for small grey labels measured 2.43–2.61:1** — well under the 4.5:1
   needed. Every one of those labels now uses `#6B6B65` (5.00:1 on the page
   background). The original grey is kept for non-text decoration only.

2. **The teal `#00909E` measured 3.57:1** on the page background — fine for a dot, an
   icon or a filled shape, but not for the eyebrow labels, links, active menu items
   and filter chips it was used for. Those now use `#00757F` (5.08:1). The original
   teal is unchanged wherever it isn't text. Filled teal buttons use `#007C88` so
   white text on them reaches 4.95:1.

3. **Body grey `#6F6F6A` measured 4.38:1** on the `#EFEFEB` panels — it passed on the
   page background but not inside the filled blocks. Darkened by five units to
   `#6A6A65`, which clears 4.5:1 on all three surfaces. The difference is invisible
   side by side.

### Measured performance

Lighthouse, home page, desktop:

| | |
|---|---|
| Performance | **100** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

First Contentful Paint 0.3s · Largest Contentful Paint 0.5s · Cumulative Layout Shift
**0** · Total Blocking Time **0ms**.

Mobile scores 98 / 100 / 100 / 100 (the Grovia cover is the largest thing to load on
a throttled connection). The Grovia case study — by far the longest page — scores
100 / 100 / 100 / 100 on desktop.

The whole site ships **18KB of CSS** and **5.7KB of JavaScript**. That JavaScript is
one file doing five small jobs: the dark-mode switch, the header, the fade-ins, the
archive filters and the mobile menu. There is no tracking and no third-party code.

---

## 12. When something breaks

**"npm: command not found"** — Node.js isn't installed. Go to
[nodejs.org](https://nodejs.org), install the LTS version, close the Terminal
completely, and open a new one.

**The build stops and mentions a project or archive file.** You've mistyped something
in the settings block. The message names the file and the line. The usual culprits:

- A missing comma, or a stray one after the last item in a list.
- `category` set to something that isn't in the list in `site.json` — the error
  prints the allowed categories for you.
- `draft: "true"` with quotes. It should be `draft: true`, no quotes. Same for
  `protected`.
- `order` written as `"1"` instead of `1`.

**A picture doesn't appear** — you get a grey tile instead. Check three things: the
file really is inside `src/assets/`; the path in the text file starts with `/` and
matches the folder names exactly; and the capitalisation matches. `Home.png` and
`home.png` are different files as far as the site is concerned.

**The form isn't sending.** Work through it in this order: is `RESEND_API_KEY` set in
Cloudflare under Settings → Environment variables? Did you redeploy *after* adding it?
Does the key still exist in your Resend dashboard? If a visitor sees the page offering
your email address instead of the form, the key isn't reaching the site.

**Fonts look wrong — everything is Times or Arial.** The files in `public/fonts/` have
been moved or renamed. All ten `.woff2` files need to be there with their original
names.

**The site looks broken after you edited a colour.** You probably changed the light
value but not the two dark ones, or removed a semicolon. Every line in that block ends
with `;`.

**Nothing works and you can't see why.** Nothing is lost — everything is in Git. Run
`git status` to see what you changed, and `git checkout .` to throw away every change
since your last commit and go back to a working site.

**Still stuck?** Open Claude Code in this folder and describe what you're seeing. It
can read every file here, including the error.
