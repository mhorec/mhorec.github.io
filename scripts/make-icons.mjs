// scripts/make-icons.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 86" width="512" height="512">
  <rect width="86" height="86" rx="18" fill="#fff"/>
  <rect x="7" y="7" width="72" height="72" rx="18" fill="none" stroke="#40B048" stroke-width="7"/>
  <path d="M54 17c-8 1-12 7-12 13 7 1 12-3 13-9z" fill="#40B048"/>
  <text x="43" y="57" text-anchor="middle" font-family="system-ui,Arial,sans-serif" font-size="27" font-weight="700" fill="#0880E0">MH</text>
</svg>`;
writeFileSync('public/icon.svg', mark);

const buf = Buffer.from(mark);
// sharp encodes png/jpeg/webp/avif/tiff/gif/jp2/heif - it has NO ICO encoder.
// So we ship SVG + PNG favicons, which every current browser supports.
// .ico is only needed for legacy IE, which is not a target.
for (const size of [32, 180, 192, 512]) {
  const name = size === 180 ? 'apple-touch-icon.png' : size === 32 ? 'favicon-32.png' : `icon-${size}.png`;
  await sharp(buf, { density: 400 }).resize(size, size).png().toFile(`public/${name}`);
}

// ---- Social card (1200x630, what WhatsApp / LinkedIn / X render on a share) ----
// Composites the REAL brand logo rather than a redrawn monogram, and names only
// clients the site can still evidence. An earlier version listed "Singapore ·
// Maldives" after those projects had been removed — a card that overclaims on
// every share is worse than no card.
const LOGO_W = 300;
const logo = await sharp('src/assets/brand/mhc.png')
  .resize({ width: LOGO_W })
  .toBuffer();
const logoH = Math.round((await sharp(logo).metadata()).height);

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="14" fill="#0880E0"/>
  <rect x="0" y="616" width="1200" height="14" fill="#40B048"/>

  <text x="96" y="300" font-family="Arial,Helvetica,sans-serif" font-size="66" font-weight="800"
        letter-spacing="-2" fill="#0D1B26">Software for ministries,</text>
  <text x="96" y="374" font-family="Arial,Helvetica,sans-serif" font-size="66" font-weight="800"
        letter-spacing="-2" fill="#0D1B26">schools and businesses.</text>

  <text x="96" y="438" font-family="Arial,Helvetica,sans-serif" font-size="30" fill="#5B7183">Software development &amp; IT consulting — Indonesia</text>

  <rect x="96" y="486" width="8" height="34" rx="4" fill="#40B048"/>
  <text x="122" y="513" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700"
        fill="#2E7E33">Kemenperin &#183; Kemenag &#183; PUPR &#183; SIAGA Pendis &#183; Al-Azhary</text>
</svg>`;

await sharp(Buffer.from(card))
  .composite([{ input: logo, top: 96, left: 96 }])
  .png()
  .toFile('public/social-card.png');

console.log('icons + social card written to public/');
