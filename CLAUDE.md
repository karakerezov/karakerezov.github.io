# CLAUDE.md

Portfolio site for Hristo Karakerezov. Astro 5, static output, no UI framework.

## Read before you edit

Do not start work until you have read the doc that covers the change.

| Touching | Read first |
|---|---|
| Any CSS, colour, spacing, component or layout | `docs/DESIGN_SYSTEM_REQUIREMENTS.md` |
| Any user-facing copy, in any file | `docs/CONTENT_RULES.md` |
| Any case study, new or existing | `docs/CASE_STUDY_TEMPLATE.md` |
| Adding projects, images, publishing | `CONTENT-EDITING-GUIDE.md` |

`src/styles/global.css` and `src/data/site.json` are the source of truth.
The docs describe them; where they disagree, the code wins — fix the doc.

## Rules

1. **No raw values.** Every colour, size, radius, gap and transition is a
   `--hk-*` custom property from `src/styles/global.css`. Never write a hex code,
   a px font-size or a bespoke transition into a component.
2. **Change a colour in three places** — `:root`, `:root[data-theme='dark']`, and
   the `@media (prefers-color-scheme: dark)` copy — or don't change it.
3. **Copy lives in content, not in components.** User-facing strings go in
   `src/data/site.json` or `src/content/`. A hardcoded string in an `.astro` file
   is a bug.
4. **Reuse before you build.** Check `src/components/casestudy/` — around 30
   blocks already exist. A new component needs a reason no existing one fits.
5. **Accessibility is not negotiable.** WCAG 2.2 AA is met and measured
   (see `README.md` §11). Use `--hk-accent-text` / `--hk-ink-3-text` for text,
   never `--hk-accent` / `--hk-ink-3`. Keep 44px tap targets, visible focus
   rings, real alt text, and working keyboard paths.
6. **Never edit `dist/`** — it is generated. **Never edit `astro-handoff/`** — it
   is the archived build package and does not affect the site.
7. **Ask before restructuring.** Renaming a content file changes its public URL.
   Reordering `order:` values changes the home page. Both need confirmation.

## Verify

Run `npm run build` (`astro check && astro build`) after any change. It validates
every frontmatter block and fails with the file and the reason. Do not report a
change as done without it. `npm run dev` for visual checks — drafts and image
placeholders are visible there and not on the live site.

## Scope

Do what was asked. Do not redesign, "improve" copy, refactor working components,
or add dependencies as a side effect of an unrelated request.
