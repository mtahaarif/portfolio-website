import type { CSSProperties } from 'react';

/**
 * Ambient particles, rendered on the server.
 *
 * This used to be a client component that generated `Math.random()` styles in a
 * `useEffect` — meaning it shipped JS, forced a second render pass, and painted
 * nothing until after hydration. A small deterministic PRNG gives the same
 * scattered look with identical server and client output, so it is now static
 * markup driven entirely by CSS. Reduced-motion users get `display: none`.
 */
const COUNT = 16;

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(0x5eed);

const particles: CSSProperties[] = Array.from({ length: COUNT }, () => {
  const size = 3 + random() * 6;
  return {
    left: `${(random() * 100).toFixed(2)}%`,
    width: `${size.toFixed(1)}px`,
    height: `${size.toFixed(1)}px`,
    animationDelay: `${(random() * 18).toFixed(1)}s`,
    animationDuration: `${(16 + random() * 14).toFixed(1)}s`,
    opacity: Number((0.4 + random() * 0.4).toFixed(2)),
    boxShadow: '0 0 10px rgba(251, 191, 36, 0.7)',
  };
});

export function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {particles.map((style, i) => (
        <span key={i} className="particle" style={style} />
      ))}
    </div>
  );
}
