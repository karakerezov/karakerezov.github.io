/**
 * Builds the 1200x630 Open Graph / social preview images in public/og/.
 * Every image is a cover-crop of a real original already used on the site
 * (no generated or stock imagery). Not part of `npm run build`; re-run manually
 * with `node scripts/generate-og-images.mjs` if an original changes, and bump the
 * version suffix in the output names (and src/data/seo.ts) so platforms re-fetch.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const W = 1200;
const H = 630;
const BG = '#F7F7F4';

// [output name, original under public/, horizontal focal point 0–1]
const jobs = [
  ['grovia-v1', '/hero/grovia-hero-new.png', 0.46],
  ['display-daily-v1', '/assets/display-daily-hero.png', 0.5],
  ['elfy-tours-v1', '/media/drive/1ywcPTPjkUlWHL0sIWqMsaHNzboF-AgFo.png', 0.5],
  ['ahat-v1', '/media/drive/1vmk3z9OhJmGmyOoWWCk_bRNJms4wxRsv.png', 0.5],
  ['denito-v1', '/media/drive/1UvjgSqMDN_or-6WQIhTNNOPqgWhUKYkp.png', 0.5],
  ['karmela-v1', '/media/drive/1fpUyBGCSTsa-vbIi2DnL5cP7Tw_jn_60.png', 0.5],
  ['keri-v1', '/media/drive/1BtvkVSMuWhrpud-e9yafP-T5WyKgsyil.png', 0.5],
  ['sherry-v1', '/media/drive/1bduldySt_vuMRg0JPsOUfWCniJp1BrWn.png', 0.5],
  ['victoria-v1', '/media/drive/1xXqAOCGaBJp9tpULYbspMHMWn3TMT0Ea.png', 0.5],
  ['portfolio-v1', '/media/drive/1aRw1o_QBIOVIZAOTUEPDc9bf2HaMVnAd.png', 0.5],
];

await mkdir('public/og', { recursive: true });

for (const [name, src, focalX] of jobs) {
  const input = 'public' + src;
  const { width, height } = await sharp(input).metadata();
  const scale = Math.max(W / width, H / height);
  const rw = Math.round(width * scale);
  const rh = Math.round(height * scale);
  const left = Math.max(0, Math.min(rw - W, Math.round(rw * focalX - W / 2)));
  const top = Math.round((rh - H) / 2);
  await sharp(input)
    .flatten({ background: BG })
    .resize(rw, rh)
    .extract({ left, top, width: W, height: H })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`public/og/${name}.jpg`);
  console.log(`public/og/${name}.jpg  <-  ${src}`);
}
