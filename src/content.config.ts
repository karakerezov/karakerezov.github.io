import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import site from './data/site.json';

/**
 * Frontmatter schemas. If a field is misspelled or has the wrong type,
 * the build stops with a readable error instead of shipping a broken page.
 *
 * Fields that are allowed to be left blank accept an empty string or an
 * omitted value, so a half-filled file still previews in `npm run dev`.
 */

/** `gallery:` with nothing after it parses as null — treat that as an empty list. */
const stringList = z
  .array(z.string())
  .nullish()
  .transform((value) => value ?? []);

/** A blank line in the editor should mean "no value", not a validation error. */
const optionalText = z
  .string()
  .nullish()
  .transform((value) => value ?? '');

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** Longer title used on the Recent Work grid, when it differs from `title`. */
    titleIndex: optionalText,
    subtitle: z.string(),
    /** Ascending. Drives the order on the home page and the work index. */
    order: z.number().int().positive(),
    /** `large` gets the tall left-hand slot on the home grid; `standard` the right column. */
    cardSize: z.enum(['large', 'standard']),
    summary: z.string(),
    summaryIndex: z.string(),
    tags: z.array(z.string()).min(1),
    /** Empty string renders a neutral placeholder tile instead of a broken image. */
    cover: optionalText,
    coverAlt: z.string(),
    cta: z.string(),
    /** Blurred cover, a "Protected" badge and a plain link instead of a button. */
    protected: z.boolean().default(false),
    protectedNote: optionalText,
    protectedBadge: optionalText,
    /** True hides the project from `npm run build` but still shows it in `npm run dev`. */
    draft: z.boolean().default(false),
    /**
     * `standard` gives the page the ready-made case-study opening built from
     * the fields below. `custom` means the file draws its own, as Grovia does.
     */
    hero: z.enum(['standard', 'custom']).default('standard'),
    /** Empty string hides the "View Interactive Prototype" button. */
    prototypeUrl: optionalText,
    role: optionalText,
    timeline: optionalText,
    team: optionalText,
    platform: optionalText,
    /** Optional per-page SEO overrides. */
    description: optionalText,
  }),
});

/** Categories come from site.json so the chips and the content can never drift apart. */
const archiveCategories = site.archive.categories.filter((name) => name !== 'All');

const archive = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(archiveCategories as [string, ...string[]], {
      errorMap: () => ({
        message: `category must be one of: ${archiveCategories.join(', ')} (see src/data/site.json)`,
      }),
    }),
    label: z.string(),
    cover: optionalText,
    coverAlt: z.string(),
    client: optionalText,
    year: optionalText,
    deliverables: optionalText,
    gallery: stringList,
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    lead: z.string(),
    portrait: optionalText,
    portraitAlt: z.string(),
    experience: z.array(z.object({ title: z.string(), body: z.string() })),
    tools: z.array(z.string()),
    timeline: z.array(
      z.object({
        period: z.string(),
        role: z.string(),
        current: z.boolean().default(false),
      })
    ),
  }),
});

export const collections = { projects, archive, about };
