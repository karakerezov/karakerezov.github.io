export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Recent Work', href: '/work/', key: 'work' },
  { label: 'Archive', href: '/archive/', key: 'archive' },
  { label: 'About Me', href: '/about/', key: 'about' },
  { label: 'Contact', href: '/contact/', key: 'contact' },
];

export const CONTACT_EMAIL = 'karakerezov@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/hristo-karakerezov-8a68815/';
export const BEHANCE_URL = 'https://www.behance.net/hristokaraker';
