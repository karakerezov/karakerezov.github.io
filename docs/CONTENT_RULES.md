# Content rules

How this site is written. Applies to every user-facing string — `site.json`,
project files, archive files, `about.md`, alt text, button labels, error messages.

The voice already exists. Before writing anything new, read the neighbouring
lines in `src/data/site.json` and match them.

---

## 1. The voice in one line

**A designer explaining their work to another designer over coffee.** Calm,
specific, personal, unhurried. Nothing to prove.

Five qualities, in priority order:

1. **English only.** No other language in any user-facing string.
2. **Minimal.** If a sentence survives losing four words, lose them.
3. **Friendly.** Written by a person, to a person.
4. **Designerly.** Concrete about craft, quiet about achievement.
5. **Personal but professional.** First person, present tense, no oversharing.

---

## 2. Mechanics

- **First person, singular.** "I designed", "my focus". Not "we", not the
  third-person "Hristo believes".
- **Present tense** for what is true now; past tense for what was done.
- **Sentence case** everywhere — headings, buttons, labels. Never Title Case,
  never ALL CAPS in the copy itself (eyebrow styling handles that in CSS).
- **Full stops on standalone lines.** "Let's connect." — the site does this.
- **Typographic punctuation:** curly quotes `'` `"`, em dash `—` with spaces,
  ellipsis `…`. `site.json` already uses these; match it.
- **No exclamation marks.** Not one.
- **No emoji.** Anywhere.
- **Numbers:** spell out one to nine in prose, use numerals for measurements,
  years, percentages and participant counts.
- **British-leaning spelling** ("colour", "centred", "organised") — the existing
  copy uses it. Be consistent within a file.

---

## 3. Length

| Where | Limit |
|---|---|
| Hero lines | Two short lines. They are set at up to 88px — every word shows |
| `summary` (home card) | **Two lines.** One sentence, occasionally two |
| `summaryIndex` (work card) | One or two sentences |
| Section lead (`workLead`, `archiveBody`) | One sentence, up to about 30 words |
| Case-study paragraph | Two to four sentences. Then a break |
| Card body | One sentence |
| Button label | One to four words |
| `coverAlt` | One clause describing what is visible |

Long paragraphs are held to `--hk-prose-max: 680px` for a reason. If your
paragraph fills six lines, it is two paragraphs.

---

## 4. Never write this

### Sales language

> ✗ "Let's build something amazing together!"
> ✗ "I'm passionate about crafting delightful experiences."
> ✗ "Transforming ideas into stunning digital solutions."
> ✗ "Available for hire — let's talk!"

The site states availability once, plainly, in `site.json`:
*"Open to UX/UI, product design and AI experience design opportunities."*
That is the entire sales pitch. It is enough.

Banned outright: *amazing, stunning, delightful, seamless, cutting-edge,
game-changing, world-class, passionate, leverage, synergy, unlock, elevate,
supercharge, best-in-class, next-level, robust, holistic.*

### Portfolio clichés

> ✗ "I don't just make things look pretty — I solve problems."
> ✗ "Design is not how it looks, it's how it works."
> ✗ "Empathising with users to uncover pain points."
> ✗ "Wearing many hats in a fast-paced environment."
> ✗ "This project taught me the importance of user research."
> ✗ "Diving deep into the user's journey."

Also avoid: *pain points, low-hanging fruit, north star, single source of truth
(as a boast), 10x, wireframe wizardry, pixel-perfect,* and any sentence that
opens with "In today's fast-paced digital world".

### Fake process theatre

Do not describe a step you did not take. No invented participant counts, no
"we ran a two-week discovery sprint" if you sketched for an afternoon. A small
honest process reads better than a large invented one — and it is the only kind
that survives being asked about in an interview.

### Filler openers

> ✗ "In this project, I was tasked with…"
> ✗ "The goal of this case study is to…"
> ✗ "Without further ado, let's dive in."

Start with the substance. The reader knows they are on a case study.

---

## 5. Write this instead

| Instead of | Write |
|---|---|
| "Leveraged user insights to drive engagement" | "Talked to six people who shop online weekly" |
| "Crafted a seamless, intuitive experience" | "Reduced checkout from five steps to three" |
| "Passionate about clean, minimal design" | "I like interfaces that don't ask for attention" |
| "Utilised industry-standard methodologies" | "Card sorting, then a clickable prototype" |
| "This solution empowered users to…" | "People could now find a repeat order in one tap" |

The pattern: **replace the adjective with the fact.** Specific detail is the only
thing that makes a portfolio believable, and it is also shorter.

---

## 6. Tone by surface

**Hero** — a considered statement, not a slogan. The current one earns its size:
*"The best interfaces rarely ask for attention. They simply make sense."*

**Project cards** — what it is and who it's for. No adjectives about quality.
*"A mobile grocery experience focused on simple product discovery, clear shopping
flows and everyday usability."*

**Case studies** — narrative, honest, specific. Say what was hard. Say what you'd
change. See `CASE_STUDY_TEMPLATE.md`.

**About** — the actual career, in order, without reframing a graphic-design
background as a strategic masterplan. The current copy is the benchmark:
*"For many years, my work was shaped by graphic design, branding, packaging and
printed communication."*

**Contact** — direct and low-pressure. *"Feel free to reach out."*

**Errors and empty states** — plain, blameless, with a way forward.
*"Something went wrong. Please try again or contact me by email."*
Never "Oops!", never a cartoon apology.

**Buttons** — verb or destination, sentence case, no punctuation:
"View case study", "Explore archive", "Send message". Never "Click here",
"Learn more", "Read on".

**Alt text** — describe what is in the frame, for someone who cannot see it.
*"Grovia home screen showing best-price offers"* — not "screenshot", not "image
of app", and not a repeat of the caption directly above it. Empty `alt=""` only
when the image genuinely carries no information.

---

## 7. Bulgarian, and other languages

The site is English-only. The Nunito Sans files include Cyrillic so Bulgarian
*renders* correctly if it ever appears in a client name or a package label — but
no interface copy, heading or body text is written in anything but English.

---

## 8. Before you commit a string

1. Read it aloud. Stumble = rewrite.
2. Cut the first sentence. Still makes sense? Leave it cut.
3. Find the adjectives. Can any be replaced with a fact? Do it.
4. Check it against §4. Any banned word = rewrite.
5. Does it sound like the line above it in the same file? It must.
6. Would you say it out loud to a designer you respect? If not, it's marketing.
