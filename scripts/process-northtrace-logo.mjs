/**
 * Builds raster logos from public/northtrace-mark.png:
 * - northtrace-mark-white.png — full-color mark on transparent (shown on dark UI; preserves blues from source)
 * - northtrace-mark-dark.png — darkened same hue for light backgrounds
 * - app/icon.png — colored mark centered on #0a0a0a (browser tab)
 *
 * Handles dark canvases with colored strokes (e.g. blue on black), not only grey-on-black.
 *
 * Run: npm run process-logo
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public/northtrace-mark.png");

/** Ignore near-black background pixels */
const BG_CUTOFF = 18;
/** Treat strong signal as fully opaque */
const MID = 92;

function dilate(alpha, w, h) {
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let m = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            m = Math.max(m, alpha[ny * w + nx]);
          }
        }
      }
      out[y * w + x] = m;
    }
  }
  return out;
}

/** Separate logo paint from dark background using luminance + chroma */
function fgAlpha(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const signal = Math.max(lum, chroma * 2.4);
  if (signal <= BG_CUTOFF) return 0;
  if (signal >= MID) return 255;
  return Math.round(((signal - BG_CUTOFF) / (MID - BG_CUTOFF)) * 255);
}

function rgbaTinted(src, mask, w, h, channels, rgbMul) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const a = mask[i];
    const si = i * channels;
    buf[i * 4] = Math.round(Math.min(255, src[si] * rgbMul));
    buf[i * 4 + 1] = Math.round(Math.min(255, src[si + 1] * rgbMul));
    buf[i * 4 + 2] = Math.round(Math.min(255, src[si + 2] * rgbMul));
    buf[i * 4 + 3] = a;
  }
  return buf;
}

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const src = new Uint8Array(data);
const alphas = new Uint8Array(width * height);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = src[i];
    const g = src[i + 1];
    const b = src[i + 2];
    alphas[y * width + x] = fgAlpha(r, g, b);
  }
}

const mask = dilate(dilate(alphas, width, height), width, height);

const colorOnDarkUi = rgbaTinted(src, mask, width, height, channels, 1);
const colorForLightUi = rgbaTinted(src, mask, width, height, channels, 0.48);

await sharp(colorOnDarkUi, {
  raw: { width, height, channels: 4 },
})
  .resize(720, 720, { fit: "inside", withoutEnlargement: true })
  .png()
  .toFile(join(root, "public/northtrace-mark-white.png"));

await sharp(colorForLightUi, {
  raw: { width, height, channels: 4 },
})
  .resize(720, 720, { fit: "inside", withoutEnlargement: true })
  .png()
  .toFile(join(root, "public/northtrace-mark-dark.png"));

const iconMark = await sharp(colorOnDarkUi, {
  raw: { width, height, channels: 4 },
})
  .resize(36, 36, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 48,
    height: 48,
    channels: 4,
    background: { r: 10, g: 10, b: 10, alpha: 1 },
  },
})
  .composite([{ input: iconMark, gravity: "center" }])
  .png()
  .toFile(join(root, "app/icon.png"));

console.log(
  "Wrote public/northtrace-mark-white.png, public/northtrace-mark-dark.png, app/icon.png",
);
