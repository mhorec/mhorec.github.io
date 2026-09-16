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

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fff"/>
  <rect x="0" y="0" width="1200" height="10" fill="#0880E0"/>
  <g transform="translate(96,150)">
    <rect x="0" y="0" width="110" height="110" rx="26" fill="none" stroke="#40B048" stroke-width="9"/>
    <path d="M78 12c-10 2-16 9-15 17 9 1 16-5 17-12z" fill="#40B048"/>
    <text x="55" y="76" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" font-weight="700" fill="#0880E0">MH</text>
  </g>
  <text x="96" y="340" font-family="Arial,sans-serif" font-size="62" font-weight="700" fill="#0D1B26">Media Hore Creation</text>
  <text x="96" y="404" font-family="Arial,sans-serif" font-size="31" fill="#5B7183">Software development &amp; IT consulting — Depok, Indonesia</text>
  <text x="96" y="470" font-family="Arial,sans-serif" font-size="25" font-weight="600" fill="#40B048">Kemenperin · Kemenag · PUPR · Singapore · Maldives</text>
</svg>`;
await sharp(Buffer.from(card)).png().toFile('public/social-card.png');
console.log('icons + social card written to public/');
