'use client';

import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { enterProgress, prefersReducedMotion, whileVisible } from '../lib/motion';

/**
 * Word-by-word glow driven by scroll position.
 *
 * The old version created one framer-motion colour MotionValue per word — ~85 of
 * them for this paragraph — and each pushed an update through React on every
 * scroll frame. Now a single `--p` custom property is written to the paragraph
 * and every word interpolates its own colour in CSS via `color-mix()`.
 *
 * `--p` defaults to 1 in CSS so the text is fully legible before hydration and
 * for anyone without JavaScript; the effect below takes over on mount.
 */
export function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let last = -1;

    const update = () => {
      // Quantised so a sub-pixel scroll does not invalidate paint needlessly.
      const progress = Math.round(enterProgress(el, 0.85, 0.45) * 200) / 200;
      if (progress === last) return;
      last = progress;
      el.style.setProperty('--p', String(progress));
    };

    update();
    return whileVisible(el, update);
  }, []);

  return (
    <p
      ref={ref}
      className="glow-line relative text-center font-bold text-2xl md:text-4xl lg:text-5xl leading-snug lg:leading-tight w-full py-4"
      // `+ 3` overshoots the word count so the lit band clears the end of the
      // paragraph. At exactly `words.length` the final 2–3 words would still be
      // mid-transition when progress reaches 1 and never fully light up.
      style={{ '--n': words.length + 3 } as CSSProperties}
    >
      {words.map((word, i) => (
        // The separator is a sibling text node rather than part of the
        // inline-block, so lines still wrap at word boundaries.
        <span key={`${word}-${i}`}>
          <span className="glow-word" style={{ '--i': i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
