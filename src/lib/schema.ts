import site from '../data/site.json';

/**
 * Structured data. Search engines read these blocks to understand who the site
 * belongs to and what each page contains. Nothing here is visible on the page.
 */

type Json = Record<string, unknown>;

const abs = (path: string): string => new URL(path, site.url).href;

/** Profiles that prove this is the same person elsewhere on the web. */
const sameAs = [site.linkedin, site.behance].filter(Boolean);

export function personSchema(): Json {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    image: abs(site.logo),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function webSiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: `${site.name} — ${site.role}`,
    url: site.url,
    inLanguage: site.locale,
    description: site.description,
    publisher: { '@id': `${site.url}/#person` },
  };
}

export function creativeWorkSchema(work: {
  name: string;
  description: string;
  path: string;
  image?: string | undefined;
  keywords?: string[];
  genre?: string;
}): Json {
  return {
    '@type': 'CreativeWork',
    '@id': `${abs(work.path)}#work`,
    name: work.name,
    description: work.description,
    url: abs(work.path),
    ...(work.image ? { image: abs(work.image) } : {}),
    ...(work.keywords && work.keywords.length > 0 ? { keywords: work.keywords.join(', ') } : {}),
    ...(work.genre ? { genre: work.genre } : {}),
    author: { '@id': `${site.url}/#person` },
    creator: { '@id': `${site.url}/#person` },
    isPartOf: { '@id': `${site.url}/#website` },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function contactPageSchema(): Json {
  return {
    '@type': 'ContactPage',
    '@id': `${site.url}/contact#page`,
    name: site.contact.heading,
    description: site.contact.description,
    url: abs('/contact'),
    mainEntity: { '@id': `${site.url}/#person` },
  };
}

/** Wrap a set of nodes into one @graph document. */
export function graph(nodes: Json[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
