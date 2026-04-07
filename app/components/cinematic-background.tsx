'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useMemo } from 'react';

export function CinematicBackground() {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.2);

  const rayOneX = useSpring(useTransform(pointerX, [0, 1], [-24, 24]), {
    stiffness: 65,
    damping: 24,
    mass: 0.35,
  });
  const rayOneY = useSpring(useTransform(pointerY, [0, 1], [-18, 24]), {
    stiffness: 65,
    damping: 26,
    mass: 0.35,
  });

  const rayTwoX = useSpring(useTransform(pointerX, [0, 1], [16, -16]), {
    stiffness: 58,
    damping: 24,
    mass: 0.4,
  });
  const rayTwoY = useSpring(useTransform(pointerY, [0, 1], [-10, 20]), {
    stiffness: 58,
    damping: 22,
    mass: 0.4,
  });

  const dustParticles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${(index * 11.73) % 100}%`,
        top: `${(index * 17.41) % 100}%`,
        size: 1.8 + (index % 5) * 0.9,
        duration: 7 + (index % 8) * 0.9,
        delay: (index % 6) * 0.35,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        left: `${(index * 19.3 + 8) % 100}%`,
        top: `${(index * 23.7 + 10) % 100}%`,
        duration: 2.4 + (index % 4) * 0.55,
        delay: (index % 5) * 0.4,
      })),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    };

    window.addEventListener('pointermove', onPointerMove);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <div className="cinematic-background" aria-hidden="true">
      <div className="cinematic-void" />

      <motion.div className="cinematic-ray ray-primary" style={{ x: rayOneX, y: rayOneY }} />
      <motion.div className="cinematic-ray ray-secondary" style={{ x: rayTwoX, y: rayTwoY }} />

      {!prefersReducedMotion && (
        <>
          <div className="dust-field">
            {dustParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="dust-particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                animate={{
                  y: [0, -15, 8, 0],
                  opacity: [0.14, 0.48, 0.22, 0.14],
                  scale: [1, 1.25, 0.92, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          <div className="spark-field">
            {sparkles.map((spark) => (
              <motion.span
                key={spark.id}
                className="spark"
                style={{ left: spark.left, top: spark.top }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.8, 1.25, 0.8],
                }}
                transition={{
                  duration: spark.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: spark.delay,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
