/**
 * Builds raster logos from public/northtrace-mark.png (your shared artwork):
 * - northtrace-mark-white.png — white strokes, transparent bg (dark theme)
 * - northtrace-mark-dark.png — near-black strokes, transparent bg (light theme)
 * - app/icon.png — white mark on #0a0a0a (browser tab)
 *
 * Run: npm run process-logo
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public/northtrace-mark.png");

const BG_CUTOFF = 26;
const MID = 88;

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

function lumToAlpha(lum) {
  if (lum <= BG_CUTOFF) return 0;
  if (lum >= MID) return 255;
  return Math.round(((lum - BG_CUTOFF) / (MID - BG_CUTOFF)) * 255);
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
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    alphas[y * width + x] = lumToAlpha(lum);
  }
}

/** Two passes gently thicken the strokes vs the original raster */
const mask = dilate(dilate(alphas, width, height), width, height);

function rgbaFromMask(maskBuf, w, h, fillR, fillG, fillB) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const a = maskBuf[i];
    buf[i * 4] = fillR;
    buf[i * 4 + 1] = fillG;
    buf[i * 4 + 2] = fillB;
    buf[i * 4 + 3] = a;
  }
  return buf;
}

const whiteRgba = rgbaFromMask(mask, width, height, 255, 255, 255);
const darkRgba = rgbaFromMask(mask, width, height, 12, 12, 12);

await sharp(whiteRgba, {
  raw: { width, height, channels: 4 },
})
  .resize(640, 640, { fit: "inside", withoutEnlargement: true })
  .png()
  .toFile(join(root, "public/northtrace-mark-white.png"));

await sharp(darkRgba, {
  raw: { width, height, channels: 4 },
})
  .resize(640, 640, { fit: "inside", withoutEnlargement: true })
  .png()
  .toFile(join(root, "public/northtrace-mark-dark.png"));

const iconMark = await sharp(whiteRgba, {
  raw: { width, height, channels: 4 },
})
  .resize(34, 34, {
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
