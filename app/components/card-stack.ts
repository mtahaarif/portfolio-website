'use client';

import { clamp01, prefersReducedMotion, trackProgress, whileVisible } from '../lib/motion';

/** Fraction of the track spent animating; the tail holds the last card on screen. */
const HOLD = 0.88;
/**
 * Fraction of each card's own scroll window spent fully at rest before the next
 * card starts sliding over it.
 *
 * Without this dwell period, a card began receding the instant it became the
 * front card and kept fading for its entire time on screen — it was never
 * actually at opacity 1. Since card backgrounds aren't fully opaque, the
 * still-fading card underneath bled through as a permanent ghosted double image.
 */
const HOLD_FRACTION = 0.42;
const FADE_AMOUNT = 0.5;
const SCALE_AMOUNT = 0.06;
const TRAVEL_BACK = 4;
/** Once a card has receded this far, hide it outright so no bleed-through remains. */
const HIDE_THRESHOLD = 0.97;

/** Viewport heights of scroll per incoming card. */
export const STEP_VH = 85;

/** Track height for a stack of `count` cards, as a CSS length. */
export function stackTrackHeight(count: number): string {
  return `calc(100vh + ${Math.max(count - 1, 1) * STEP_VH}vh)`;
}

/** How much card `k` has been covered by card `k + 1`: 0 through a hold, then ramping to 1. */
function coverage(pos: number, k: number): number {
  const local = clamp01(pos - k);
  return clamp01((local - HOLD_FRACTION) / (1 - HOLD_FRACTION));
}

/**
 * Drives a deck of absolutely-positioned cards from scroll position.
 *
 * Card `i` slides in along `axis`, holds at full opacity for the first
 * `HOLD_FRACTION` of its window, then recedes — scaling down, dimming, and
 * drifting back — only once the next card actually starts covering it. All of
 * it is `transform` + `opacity` on the compositor — React renders the cards
 * once and is never involved again.
 */
export function mountCardStack({
  track,
  cards,
  dots,
  axis,
}: {
  track: HTMLElement;
  cards: HTMLElement[];
  dots: HTMLElement[];
  axis: 'x' | 'y';
}): () => void {
  const count = cards.length;
  if (count === 0) return () => {};

  if (prefersReducedMotion()) {
    for (const card of cards) {
      card.style.transform = 'none';
      card.style.opacity = '1';
      card.style.visibility = 'visible';
    }
    return () => {};
  }

  const steps = Math.max(count - 1, 1);
  let activeIndex = -1;

  return whileVisible(track, () => {
    const pos = clamp01(trackProgress(track) / HOLD) * steps;

    for (let i = 0; i < count; i++) {
      // Card 0 needs no entrance; every other card follows how far the card
      // below it has been covered, since that's the same slide that reveals it.
      const enter = i === 0 ? 1 : coverage(pos, i - 1);
      // The last card has nothing on top of it and never recedes.
      const depth = i === count - 1 ? 0 : coverage(pos, i);

      const travel = (1 - enter) * 100 - depth * TRAVEL_BACK;
      const scale = 1 - depth * SCALE_AMOUNT;

      const card = cards[i];
      card.style.transform =
        axis === 'y'
          ? `translate3d(0, ${travel.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`
          : `translate3d(${travel.toFixed(2)}%, 0, 0) scale(${scale.toFixed(4)})`;
      card.style.opacity = (1 - depth * FADE_AMOUNT).toFixed(3);
      card.style.visibility = depth >= HIDE_THRESHOLD ? 'hidden' : 'visible';
    }

    const next = Math.min(Math.floor(pos + 1e-6), count - 1);
    if (next !== activeIndex) {
      activeIndex = next;
      for (let i = 0; i < dots.length; i++) dots[i].dataset.on = String(i === next);
    }
  });
}
