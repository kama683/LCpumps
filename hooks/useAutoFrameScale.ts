import { useEffect, useState, type RefObject } from "react";

const SAMPLE_SIZE = 48;
const NEAR_WHITE_THRESHOLD = 245;
const TARGET_AREA_FRACTION = 0.42;
const HARD_MAX_SCALE = 1.6;
/** Leaves a small margin so the scaled-up content can never touch the
 * container edge and get clipped by `overflow-hidden`. */
const SAFE_EDGE_MARGIN = 0.94;

function parseAspectRatio(value: string): number {
  const [w, h] = value.split("/").map(Number);
  if (!w || !h) return 4 / 3;
  return w / h;
}

/** Some catalog photos are letterboxed hard by `object-contain` — a tall,
 * narrow shot (e.g. a long-shaft pump) forced into a wide 4:3 card ends up
 * occupying only a sliver of the frame even though nothing is "wrong" with
 * the source file itself. This samples the loaded image onto a small
 * offscreen canvas, finds the bounding box of non-near-white pixels, and
 * works out — accounting for the actual image aspect ratio vs. the card's —
 * how much of the rendered card area the product actually covers. Only
 * genuinely small renders get scaled up, and the scale is capped so the
 * content can never grow past the card edge. Any failure just leaves the
 * image at its natural size. */
export function useAutoFrameScale(
  imgRef: RefObject<HTMLImageElement | null>,
  enabled: boolean,
  aspectRatio: string
) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!enabled) return;
    const img = imgRef.current;
    if (!img) return;

    function analyze() {
      try {
        if (!img || !img.naturalWidth || !img.naturalHeight) return;
        const canvas = document.createElement("canvas");
        canvas.width = SAMPLE_SIZE;
        canvas.height = SAMPLE_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

        let minX = SAMPLE_SIZE;
        let minY = SAMPLE_SIZE;
        let maxX = 0;
        let maxY = 0;
        let found = false;

        for (let y = 0; y < SAMPLE_SIZE; y++) {
          for (let x = 0; x < SAMPLE_SIZE; x++) {
            const i = (y * SAMPLE_SIZE + x) * 4;
            const a = data[i + 3];
            if (a < 16) continue;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if (r > NEAR_WHITE_THRESHOLD && g > NEAR_WHITE_THRESHOLD && b > NEAR_WHITE_THRESHOLD) continue;
            found = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
        if (!found) return;

        // Bounding box as a fraction of the *source image*.
        const boxW = (maxX - minX + 1) / SAMPLE_SIZE;
        const boxH = (maxY - minY + 1) / SAMPLE_SIZE;

        // How object-contain actually renders this image inside the card.
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const containerAspect = parseAspectRatio(aspectRatio);
        let renderedW: number;
        let renderedH: number;
        if (imgAspect >= containerAspect) {
          renderedW = containerAspect;
          renderedH = containerAspect / imgAspect;
        } else {
          renderedH = 1;
          renderedW = imgAspect;
        }

        // Content box in card-relative units (card width = containerAspect, height = 1).
        const contentWFrac = (boxW * renderedW) / containerAspect;
        const contentHFrac = boxH * renderedH;
        const areaFraction = contentWFrac * contentHFrac;
        if (areaFraction <= 0 || areaFraction >= TARGET_AREA_FRACTION) return;

        const wanted = Math.sqrt(TARGET_AREA_FRACTION / areaFraction);
        const safeMax = SAFE_EDGE_MARGIN / Math.max(contentWFrac, contentHFrac);
        const factor = Math.min(wanted, safeMax, HARD_MAX_SCALE);
        if (factor > 1.05) setScale(factor);
      } catch {
        // Canvas sampling failed for any reason — leave the image untouched.
      }
    }

    if (img.complete) analyze();
    else img.addEventListener("load", analyze, { once: true });
    return () => img.removeEventListener("load", analyze);
  }, [enabled, imgRef, aspectRatio]);

  return scale;
}
