/**
 * Turns an image path written in a Markdown file into a real image that Astro
 * can resize and convert.
 *
 * Images live in `src/assets/`. A frontmatter line like
 *
 *     cover: "/projects/grovia/home.png"
 *
 * refers to `src/assets/projects/grovia/home.png`. Writing the leading slash
 * keeps the content files readable and independent of where the folder sits.
 *
 * If the file is missing, this returns undefined and the component renders a
 * neutral placeholder tile instead — a broken image is never shipped.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true }
);

export function resolveImage(path: string | undefined | null): ImageMetadata | undefined {
  if (!path) return undefined;
  const key = `/src/assets/${path.replace(/^\/+/, '')}`;
  return files[key]?.default;
}

/** Every image path the content references but that has no file yet. */
export function missingImages(paths: (string | undefined | null)[]): string[] {
  return paths.filter((path): path is string => Boolean(path) && !resolveImage(path));
}
