'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { observeReveal } from '../lib/motion';

/**
 * Entrance animation on scroll, replacing framer-motion's `whileInView`.
 *
 * All instances share one IntersectionObserver and unobserve themselves after
 * firing once, so a revealed element costs nothing for the rest of the session.
 * The animation itself is pure CSS (see `.reveal` in globals.css).
 */
export function Reveal({
  children,
  className = '',
  delay,
  from = 'up',
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  from?: 'up' | 'left';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${from === 'left' ? 'reveal-left' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
