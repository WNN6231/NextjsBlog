'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { InView } from '../components/core/in-view';
import type { Photo } from '@/lib/photos';

type RowItem = { index: number; photo: Photo };
type Row = { items: RowItem[]; height: number };

const GAP = 16; // px between photos / rows
const TARGET_ROW_HEIGHT = 240; // px; tune for denser/taller rows

/**
 * Greedy "justified rows" (Flickr / Unsplash) layout.
 *
 * Photos keep their original aspect ratio (no crop) and are grouped into rows
 * that are scaled to fill the container width exactly, so there are no internal
 * gaps. Items flow strictly left-to-right, top-to-bottom. The last row is left
 * at the target height — it may not fill the width, leaving a small trailing
 * gap (unavoidable without cropping).
 */
function layoutRows(photos: Photo[], width: number, target: number, gap: number): Row[] {
  const rows: Row[] = [];
  let current: RowItem[] = [];
  let aspectSum = 0;

  const finalize = (height: number) => {
    rows.push({ items: current, height });
    current = [];
    aspectSum = 0;
  };

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const aspect = photo.width / photo.height;

    current.push({ index: i, photo });
    aspectSum += aspect;

    const n = current.length;
    const rowWidthAtTarget = target * aspectSum + gap * (n - 1);

    // A single photo wider than the container at target height: render it
    // alone, filling the width (height becomes < target).
    if (n === 1 && target * aspect >= width) {
      finalize(width / aspect);
      continue;
    }

    if (rowWidthAtTarget >= width) {
      // Scale the row down just enough to fill the width exactly.
      finalize((width - gap * (n - 1)) / aspectSum);
    }
  }

  // Trailing row: keep the target height (may leave space on the right).
  if (current.length) finalize(target);

  return rows;
}

// useLayoutEffect warns during SSR; use a no-op on the server.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function PhotoWall({ photos }: { photos: Photo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rows = useMemo(
    () => (width ? layoutRows(photos, width, TARGET_ROW_HEIGHT, GAP) : []),
    [photos, width],
  );

  return (
    <InView
      viewOptions={{ once: true, margin: '0px 0px -200px 0px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      <div ref={containerRef} className='px-4'>
        {width === null ? (
          /* SSR / pre-measure fallback: ordered, no-crop grid (transient). */
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
            {photos.map((p, i) => (
              <img
                key={i}
                src={p.src}
                alt={`Photos_${i}`}
                loading='lazy'
                className='h-auto w-full rounded-xl'
              />
            ))}
          </div>
        ) : (
          rows.map((row, ri) => (
            <div
              key={ri}
              className='flex'
              style={{ gap: GAP, marginBottom: GAP }}
            >
              {row.items.map(({ index, photo }) => {
                const w = row.height * (photo.width / photo.height);
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    style={{ width: w, height: row.height }}
                  >
                    <img
                      src={photo.src}
                      alt={`Photos_${index}`}
                      loading='lazy'
                      className='h-full w-full rounded-xl object-cover transition-transform duration-500 hover:scale-[1.02]'
                    />
                  </motion.div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </InView>
  );
}
