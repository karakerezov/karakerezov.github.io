# Case study template

The approved structure for a case study on this site. Eleven sections, in this
order. Reference implementation: **`src/content/projects/grovia.mdx`** — every
block below appears there with real values.

Write the copy against `CONTENT_RULES.md`. Style anything new against
`DESIGN_SYSTEM_REQUIREMENTS.md`.

---

## Two ways to build one

| | Plain `.md` | `.mdx` |
|---|---|---|
| Frontmatter | `hero: "standard"` | `hero: "custom"` |
| Opening | Built for you from frontmatter | You draw it with `<Hero>` |
| Body | Markdown headings and paragraphs | Composed from `casestudy/` components |
| Styled by | `.hk-cs-body.is-prose` in `src/pages/work/[slug].astro` | The components themselves |
| Use when | The story is mostly words | The story needs screens, maps and panels |

Start in `.md`. Rename to `.mdx` when a section genuinely needs a component —
renaming is the whole migration, the frontmatter is identical.

**In `.md`, sections 1 and 2 are automatic and 11 is automatic. Do not hand-write
them.** In `.mdx`, you own 1 and 2; 11 is still automatic.

---

## 1. Hero

Establishes what this is, in about four seconds.

**`.md`** — generated from frontmatter: `subtitle` badge → `title` → `summaryIndex`
lead → `<MetaBar>` from `role` / `timeline` / `team` / `platform`. Blank fields are
omitted. **Never retype the title in the body.**

**`.mdx`** — `<Hero>`:

```mdx
<Hero
  eyebrow="Mobile Grocery App · UX/UI Case Study"
  title="Grovia"
  promise="A smoother way to shop for everyday groceries."
  intro="One or two sentences: what it is, who it's for, what changed."
  meta={[
    { label: 'Role', value: 'UX/UI Designer' },
    { label: 'Platform', value: 'iOS & Android' },
  ]}
  exploreLabel="Explore the case study"
  screens={[{ src: '/projects/name/home.png', alt: 'Home screen' }]}
/>
```

`promise` is one line, no full stop implied by the design — a claim about the
outcome, not a tagline. `prototypeUrl` renders the prototype button; leave it out
and no button appears.

---

## 2. Project preview

One wide, calm image before the reading starts. The cover, at full width, in a
`.hk-card` with a `--hk-surface-alt` well.

**`.md`** — automatic, from `cover` / `coverAlt`.
**`.mdx`** — `<Section space="sm" top="24px">` wrapping a `<SplitMedia>` or a
media well of your own.

Missing image = a placeholder of the right shape. Ship the section anyway.

---

## 3. Overview

What the product is, who it serves, what the engagement was. Three to five
sentences. No problem framing yet — that is section 4.

```mdx
<Section>
  <AtAGlance
    heading="At a glance"
    body="Two or three sentences of context."
    items={[
      { label: 'Context', body: 'A concept project, self-initiated.' },
      { label: 'Scope', body: 'Research, IA, wireframes, UI, prototype.' },
      { label: 'Duration', body: 'Six weeks, part time.' },
    ]}
  />
</Section>
```

`.md`: `## Overview` and two paragraphs.

**Be honest about scope here.** "A concept project" is a perfectly good sentence,
and it sets the reader's expectations correctly for everything that follows.

---

## 4. Challenge

The problem, stated once, sharply. Then the question the project set out to
answer.

```mdx
<Section>
  <ProblemStatement
    parts={['Shoppers know what they want,', 'but the interface makes them hunt for it.']}
    emphasis={['hunt for it']}
    question="How might a grocery app make a repeat order feel like one decision?"
  />
</Section>
```

Supporting evidence — `<Persona>`, `<JourneyMap>`, `<Findings>` — belongs here or
in Process, not before the problem is named.

`.md`: `## The challenge`, two paragraphs, and a `>` blockquote for the question.

**Rules:** state the user's problem, not the client's business goal. One problem —
a case study with four problems has none. No invented statistics.

---

## 5. My role

Short and unambiguous. What you did, what you didn't, who else was involved.

Frontmatter `role` / `team` / `timeline` / `platform` already renders in the
`<MetaBar>`. This section is for nuance the bar can't hold:

```mdx
<Section space="sm">
  <SectionHead
    heading="My role"
    body="I led UX and UI end to end — research, information architecture, wireframes, visual design and the prototype. Development was out of scope."
  />
  <PillRow items={['Research', 'IA', 'Wireframes', 'UI Design', 'Prototype']} />
</Section>
```

**Say what you did not do.** "Development was out of scope" costs nothing and
buys the reader's trust for the rest of the page.

---

## 6. Process

The longest section, and the one that earns the case study. Show the work in the
order it happened.

Chapter it with `<ChapterHead>` / `<ChapterIntro>`, then use the block that fits
each step:

| Step | Component |
|---|---|
| Users | `<Persona>` — eyebrow, name, role, quote, facts, image |
| Current experience | `<JourneyMap>` — stages with action / thinking / friction / opportunity |
| Structure | `<IaMap>` — root, primary nav, grouped screens |
| Flows | `<FlowChain>` — a labelled sequence of steps |
| Principles | `<PrincipleTrio>` — three, with image and body |
| Early sketches | `<Wireframes>` — frames with captions, plus a compare pair |
| Testing setup | `<TaskPanel>` — heading, body, task list |
| What you learned | `<Findings>` — tag, title, participant quote, insight, response |
| What changed | `<BeforeAfter>` — before/after rows |
| Visual language | `<VisualDirection>` — swatches, buttons, typeface, cards |

Use three or four, not all ten. Each needs a sentence of narration around it —
a diagram alone explains nothing.

`.md`: `## Process` with `###` sub-headings per step.

**Rules:** real numbers or none. `<Findings>` quotes must be things someone
actually said. If a step was skipped, skip the block — an empty component looks
worse than an absent one.

---

## 7. Accessibility

There is no dedicated component; this section is composed from existing blocks.
That is intentional — accessibility is described in the same voice as the rest of
the work, not fenced into a compliance box.

```mdx
<Section>
  <SectionHead
    heading="Accessibility"
    body="Decisions made so the interface works for people using a screen reader, a keyboard, or a phone in bright sunlight."
  />
  <CardGrid
    cols={3}
    items={[
      { title: 'Contrast', body: 'Every text pairing measured at 4.5:1 or better in both schemes.' },
      { title: 'Targets', body: 'Nothing tappable smaller than 44px.' },
      { title: 'Motion', body: 'Every transition respects reduced-motion.' },
    ]}
  />
</Section>
```

`<SystemPanel heading body items note>` works equally well for a denser list.

**What belongs here:** contrast decisions and measured ratios, target sizes,
focus and keyboard order, screen-reader labelling, motion sensitivity, and any
place where an accessibility requirement changed the visual design. That last one
is the most interesting thing you can write in this section.

**Do not** claim "WCAG AA compliant" without measurements. Name the specific
decisions instead. This site's own approach is documented in `README.md` §11 —
three colour values were corrected rather than shipped — and that is the model:
say what failed, say what you changed.

---

## 8. Key screens

The finished interface. Four to eight screens, captioned, grouped by task.

```mdx
<Section>
  <SectionHead heading="Key screens" />
  <ScreenGrid
    cols={3}
    items={[
      { image: '/projects/name/home.png', alt: 'Home screen with best-price offers', caption: 'Home' },
      { image: '/projects/name/cart.png', alt: 'Basket with three items', caption: 'Basket' },
      { image: '/projects/name/done.png', alt: 'Order confirmation', caption: 'Confirmation' },
    ]}
  />
</Section>
```

`cols` 2 / 3 / 4. `variant="step"` adds an accent step label for a numbered flow.
`<Feature>` gives one screen a full-width moment with heading, body and optional
quote — use it for the single most important screen, once.

Captions name the screen ("Basket"). Alt text describes it ("Basket with three
items and the delivery estimate"). They are different jobs; don't duplicate.

Tall phone screenshots are shown whole on their own background, never cropped to
a strip. Upload the largest export you have — see `CONTENT-EDITING-GUIDE.md` §3.

---

## 9. Design decisions

Three to five choices, each with the reasoning. This is the section that
separates a case study from a gallery.

```mdx
<Section>
  <SectionHead heading="Design decisions" />
  <CardGrid
    cols={2}
    items={[
      { n: '01', title: 'One primary action per screen', body: 'Testing showed two equal buttons stalled people at checkout.' },
      { n: '02', title: 'Prices before images', body: 'Price was the first thing every participant looked for.' },
    ]}
  />
</Section>
```

Each decision: **what you chose, what you rejected, why.** A decision without a
rejected alternative is a description, not a decision.

Include one that was a trade-off — something you gave up. It is the most credible
paragraph on the page.

---

## 10. Outcome / learnings

What resulted, and what you would do differently. Honest, not triumphant.

```mdx
<Section>
  <Reflection
    heading="Looking back"
    body="What worked, what didn't, and what I'd approach differently next time."
    screens={[{ image: '/projects/name/final.png', alt: 'Final home screen' }]}
  />
</Section>
```

Outcome first (shipped? tested? concept?), then two or three sentences of
reflection.

**Rules:** if it was never built, say so — "a concept project" is not a
confession. No invented metrics; "40% increase in engagement" on an unbuilt app
is the fastest way to lose a reader. Name one thing you would change. "Nothing"
is not an answer.

---

## 11. Next project navigation

**Automatic. Never write this section.**

`src/layouts/CaseStudy.astro` renders `<ProjectNav>` below every case study, with
previous / next derived from `order` in `src/lib/content.ts` and a "Back to Recent
Work" link. A `<ContactCta>` band follows it.

Adding your own navigation produces two sets of links. If the order is wrong,
fix `order:` in the frontmatter — not the layout.

---

## Checklist before publishing

- [ ] Frontmatter complete; `draft: false`; `order` doesn't collide
- [ ] `summary` two lines, `summaryIndex` written and different
- [ ] Exactly three `tags`
- [ ] Every image in `src/assets/`, every path starting `/`
- [ ] Every `alt` describes the image; no "screenshot of…"
- [ ] Sections in the order above; none hand-duplicated from the layout
- [ ] Accessibility section names specific decisions, not a compliance claim
- [ ] Every design decision states its rejected alternative
- [ ] Outcome says honestly whether it shipped
- [ ] Read against `CONTENT_RULES.md` §4 — no banned words
- [ ] `npm run build` passes
- [ ] Read on a phone at 375px before calling it done
