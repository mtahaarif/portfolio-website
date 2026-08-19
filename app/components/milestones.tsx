'use client';

import { useEffect, useRef } from 'react';
import { clamp01, prefersReducedMotion, trackProgress, whileVisible } from '../lib/motion';
import { SectionHeading } from './section-heading';

const MILESTONES = [
  {
    title: '4 Production Platforms',
    desc: 'Architected and deployed end-to-end Next.js and React 19 applications for live US clients, with JWT-secured admin APIs, dual-database backends, and automated cache revalidation.',
  },
  {
    title: '99.8% Biometric Accuracy',
    desc: 'Engineered anti-spoofing vision models across a stratified 17,834-image corpus, reaching 99.8% validation accuracy and profiled to 31 ms or lower batch execution step times.',
  },
  {
    title: '27 Projects, Three Disciplines',
    desc: 'Machine learning and clinical AI, production full-stack platforms, and hardware down to a custom instruction set in Verilog — the full stack, literally.',
  },
  {
    title: '40GB+ Clinical Data Processed',
    desc: 'Built out-of-core Polars pipelines streaming 37.1M chart rows into an OMOP/LOINC schema to forecast ICU transfer 6 hours ahead at 0.892 AUROC.',
  },
];

/** How much of the track each milestone holds the screen for. */
const SLOT = 1 / MILESTONES.length;

export function Milestones() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = itemsRef.current.filter((el): el is HTMLDivElement => el !== null);

    // Reduced motion: show the first milestone, statically.
    if (prefersReducedMotion()) {
      items.forEach((item, i) => {
        item.style.opacity = i === 0 ? '1' : '0';
      });
      return;
    }

    return whileVisible(track, () => {
      const progress = trackProgress(track);

      for (let i = 0; i < items.length; i++) {
        // Each milestone fades in over the first 40% of its slot and out over
        // the last 40%, so exactly one is legible at a time.
        const local = (progress - i * SLOT) / SLOT;
        const opacity = clamp01(local / 0.4) * clamp01((1 - local) / 0.4);
        const item = items[i];

        item.style.opacity = opacity.toFixed(3);
        item.style.transform = `translate3d(0, 0, 0) scale(${(0.96 + opacity * 0.04).toFixed(4)})`;
        // Fully faded panels stop being paint or hit-test candidates entirely.
        item.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';
      }
    });
  }, []);

  return (
    <div ref={trackRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute top-20 md:top-32 inset-x-0 flex justify-center pointer-events-none z-20">
          <SectionHeading title="Milestones" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.16) 0%, rgba(245,158,11,0.06) 35%, transparent 68%)',
          }}
        />

        {MILESTONES.map((milestone, i) => (
          <div
            key={milestone.title}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 w-full max-w-7xl mx-auto pointer-events-none mt-8 md:mt-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <h3
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-amber-400 mb-4 md:mb-6 leading-tight"
              style={{ textShadow: '0 0 24px rgba(251,191,36,0.45)' }}
            >
              {milestone.title}
            </h3>
            <p className="text-lg md:text-2xl lg:text-3xl text-white/80 leading-relaxed max-w-4xl font-medium">
              {milestone.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
