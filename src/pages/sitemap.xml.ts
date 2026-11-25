import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/seo';

/**
 * Sitemap built from the real page files, so it cannot drift from the routes that exist.
 * URLs use the same absolute, trailing-slash form as each page's canonical / og:url.
 * Add a route to NOINDEX below to keep it out of the sitemap (pages that set `noindex` on BaseLayout).
 */
const NOINDEX: string[] = [];

const pages = import.meta.glob('./**/*.astro');

const routes = Object.keys(pages)
  .map((file) =>
    file
      .replace(/^\.\//, '/')
      .replace(/index\.astro$/, '')
      .replace(/\.astro$/, '/'),
  )
  .filter((path) => !path.includes('[') && !NOINDEX.includes(path))
  .sort((a, b) => a.length - b.length || a.localeCompare(b));

export const GET: APIRoute = () => {
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((p) => `  <url><loc>${new URL(p, SITE_URL).href}</loc></url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
