import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ArchiveItem = CollectionEntry<'archive'>;

/** True while running `npm run dev`, false in `npm run build`. */
export const isDev = import.meta.env.DEV;

/**
 * Every project, ordered by `order`.
 *
 * In development, drafts are included so they can be previewed with a ribbon.
 * In a production build they are dropped and their slugs are printed once, so
 * it is obvious which projects are still waiting to be written.
 */
let draftsReported = false;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  const sorted = all.sort((a, b) => a.data.order - b.data.order);

  if (isDev) return sorted;

  const drafts = sorted.filter((project) => project.data.draft);
  if (drafts.length > 0 && !draftsReported) {
    draftsReported = true;
    console.info(
      `\n  Skipped ${drafts.length} draft project${drafts.length === 1 ? '' : 's'}: ` +
        `${drafts.map((project) => project.id).join(', ')}` +
        `\n  Set "draft: false" in the matching file in src/content/projects/ to publish.\n`
    );
  }
  return sorted.filter((project) => !project.data.draft);
}

/** The first three projects by `order` — the home page grid. */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, 3);
}

/** Archive items in the order they appear in site.json's category list, then A–Z. */
export async function getArchiveItems(): Promise<ArchiveItem[]> {
  const all = await getCollection('archive');
  return all.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/**
 * An archive item only gets its own page when its Markdown body has real text.
 * Files that contain nothing but an HTML comment stay as plain grid tiles.
 */
export function hasBody(entry: { body?: string }): boolean {
  const body = (entry.body ?? '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return body.length > 0;
}

/** Turn a category name into the slug used by the filter chips and URLs. */
export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Previous / next in `order`, wrapping around, for the case-study footer. */
export function neighbours<T>(items: T[], index: number): { prev: T; next: T } | null {
  if (items.length < 2) return null;
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];
  if (prev === undefined || next === undefined) return null;
  return { prev, next };
}
