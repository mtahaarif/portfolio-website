'use client';

/**
 * A single rAF-coalesced scroll loop shared by every scroll-driven section.
 *
 * The page previously ran four independent `useScroll` instances plus ~100
 * `useTransform` motion values, each pushing state through React on every
 * frame. Everything here writes to `element.style` directly instead: React
 * renders the markup once and never re-renders while you scroll.
 */

type Frame = () => void;

const frames = new Set<Frame>();
let scheduled = false;

function flush() {
  scheduled = false;
  for (const frame of frames) frame();
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(flush);
}

/** Register a per-frame callback driven by scroll/resize. Returns an unsubscribe. */
export function onScrollFrame(frame: Frame): () => void {
  if (frames.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }
  frames.add(frame);
  schedule();

  return () => {
    frames.delete(frame);
    if (frames.size === 0) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    }
  };
}

export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;

export const clamp01 = (value: number) => clamp(value, 0, 1);

/**
 * Progress through a pinned scroll track: 0 while the track's top sits at the
 * top of the viewport, 1 once its bottom reaches the bottom of the viewport.
 */
export function trackProgress(track: HTMLElement): number {
  const rect = track.getBoundingClientRect();
  const distance = rect.height - window.innerHeight;
  if (distance <= 0) return 0;
  return clamp01(-rect.top / distance);
}

/**
 * Progress of an element crossing the viewport, used for reading-paced effects.
 * 0 when its top is `start` down the viewport, 1 when its bottom reaches `end`.
 */
export function enterProgress(el: HTMLElement, start = 0.85, end = 0.4): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const from = vh * start;
  const to = vh * end - rect.height;
  const distance = from - to;
  if (distance <= 0) return rect.top <= from ? 1 : 0;
  return clamp01((from - rect.top) / distance);
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * One IntersectionObserver shared by every `<Reveal>` on the page, instead of
 * one per element. Elements unobserve themselves after revealing once.
 */
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver(): IntersectionObserver {
  revealObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
  );
  return revealObserver;
}

export function observeReveal(el: Element): () => void {
  const observer = getRevealObserver();
  observer.observe(el);
  return () => observer.unobserve(el);
}

/**
 * Gate a per-frame callback on visibility so off-screen sections cost nothing.
 * `margin` keeps the section warm slightly before it scrolls into view.
 */
export function whileVisible(
  el: HTMLElement,
  frame: Frame,
  margin = '25% 0px 25% 0px'
): () => void {
  let visible = false;
  let unsubscribe: (() => void) | null = null;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;

      if (visible) {
        unsubscribe = onScrollFrame(frame);
      } else {
        unsubscribe?.();
        unsubscribe = null;
      }
    },
    { rootMargin: margin }
  );

  observer.observe(el);

  return () => {
    observer.disconnect();
    unsubscribe?.();
  };
}
