// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// The live address of the site. Canonical URLs, the sitemap and social-share
// images are all built from this. Change it here if the domain ever changes.
const SITE = 'https://karakerezov.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap({
      // The 404 and the contact form's result pages are marked noindex —
      // keep them out of the sitemap too.
      filter: (page) =>
        !['/404', '/contact/thank-you', '/contact/error', '/contact/unavailable'].some((path) =>
          page.includes(path)
        ),
    }),
  ],
  image: {
    // Every <Image> is processed at build time; no remote hosts are used.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
