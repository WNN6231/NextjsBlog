import fs from 'node:fs';
import path from 'node:path';

export type Photo = { src: string; width: number; height: number };

/**
 * Parse pixel dimensions from a WebP (RIFF/WEBP) Buffer.
 * Handles the three WebP chunk types: VP8 (lossy), VP8L (lossless), VP8X (extended).
 * Returns null for anything that isn't a recognizable WebP.
 */
function webpSize(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 30) return null;
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') {
    return null;
  }

  const fourcc = buf.toString('ascii', 12, 16);

  if (fourcc === 'VP8 ') {
    // Lossy: 14-bit width / height at offsets 26 / 28 (little-endian).
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }

  if (fourcc === 'VP8L') {
    // Lossless: signature byte 0x2f at offset 20, then a little-endian bit stream
    // starting at byte 21: 14 bits width-1, 14 bits height-1.
    const bits = buf.readUInt32LE(21);
    return {
      width: 1 + (bits & 0x3fff),
      height: 1 + ((bits >>> 14) & 0x3fff),
    };
  }

  if (fourcc === 'VP8X') {
    // Extended: 24-bit canvas width-1 / height-1 at offsets 24 / 27.
    return {
      width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
      height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
    };
  }

  return null;
}

/**
 * Read every `<n>.webp` at the public/ root, in numeric order, with its
 * intrinsic dimensions so the client can lay out a justified-rows gallery
 * without measuring images on load.
 *
 * Server-only — reads from the filesystem at build time.
 */
export function getPhotos(publicDir = 'public'): Photo[] {
  const abs = path.isAbsolute(publicDir)
    ? publicDir
    : path.join(process.cwd(), publicDir);

  if (!fs.existsSync(abs)) return [];

  const files = fs
    .readdirSync(abs)
    .filter((f) => /^\d+\.webp$/.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  return files.map((f) => {
    const buf = fs.readFileSync(path.join(abs, f));
    const size = webpSize(buf) ?? { width: 1, height: 1 };
    return { src: `/${f}`, width: size.width, height: size.height };
  });
}
