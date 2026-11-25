import { LINKEDIN_URL } from './nav';

export const SITE_URL = 'https://karakerezov.com';
export const SITE_NAME = 'Hristo Karakerezov';
export const SITE_LOCALE = 'en_US';
export const OWNER_NAME = 'Hristo Karakerezov';
export const OWNER_JOB_TITLE = 'UX/UI & AI Experience Designer';
export const OWNER_SAME_AS = [LINKEDIN_URL];

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/**
 * Social preview images — 1200x630 crops of the real project originals, built by
 * scripts/generate-og-images.mjs. Names are versioned; bump the suffix when an image changes.
 */
export const OG_IMAGES = {
  portfolio: {
    path: '/og/portfolio-v1.jpg',
    alt: 'Selected design work by Hristo Karakerezov: Display Daily interface mockups and AHAT packaging',
  },
  grovia: {
    path: '/og/grovia-v1.jpg',
    alt: 'Grovia grocery app shown on two smartphones against a green background with floating leaves and cherries',
  },
  'display-daily': {
    path: '/og/display-daily-v1.jpg',
    alt: 'Display Daily digital press platform shown on a laptop, tablet and phone',
  },
  'elfy-tours': {
    path: '/og/elfy-tours-v1.jpg',
    alt: 'Elfy Tours travel website shown on a laptop and phone over travel destination photography',
  },
  ahat: {
    path: '/og/ahat-v1.jpg',
    alt: 'AHAT range of nuts, seeds and dried fruit packaging on a store shelf',
  },
  denito: {
    path: '/og/denito-v1.jpg',
    alt: 'DENITO fresh salad and sauce packaging with fresh vegetables',
  },
  karmela: {
    path: '/og/karmela-v1.jpg',
    alt: 'Karmela Breakfast biscuit packaging with wheat and biscuits',
  },
  keri: {
    path: '/og/keri-v1.jpg',
    alt: 'KERI cream and processed cheese tubs with bread and herbs',
  },
  sherry: {
    path: '/og/sherry-v1.jpg',
    alt: 'Sherry ice cream tub with raspberries and scoops of ice cream',
  },
  victoria: {
    path: '/og/victoria-v1.jpg',
    alt: 'Victoria Ice Tea bottles in lemon, peach and forest fruit flavours with splashing tea',
  },
} as const;

export type OgImageKey = keyof typeof OG_IMAGES;

export interface Crumb {
  name: string;
  path: string;
}

/** What kind of page this is — drives the Open Graph type and the structured data emitted. */
export type PageKind = 'home' | 'about' | 'page' | 'project';
