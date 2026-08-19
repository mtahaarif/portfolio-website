'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { CmsProject } from '../data/cms';
import { Github } from './brand-icons';
import { prefersReducedMotion } from '../lib/motion';
import type { LucideIcon } from './icons';

const CARD_WIDTH = 320;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTOPLAY_PX_PER_SEC = 42;
const RESUME_DELAY_MS = 1600;
const NUDGE_MS = 480;

/**
 * Two copies of the list is all a seamless loop ever needs: the second copy
 * covers the gap while the first scrolls out. The previous implementation
 * rendered up to four copies, which put ~70 cards (and ~70 `next/image`
 * elements) into the projects section alone.
 */
const COPIES = 2;

export function ProjectCarousel({
  projects,
  categoryTitle,
  iconColor,
  IconComp,
}: {
  projects: CmsProject[];
  categoryTitle: string;
  iconColor: string;
  IconComp: LucideIcon;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Everything the animation needs lives in refs; the component renders once.
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const hoverRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cards are a fixed 320px at every breakpoint, so one period of the loop is
  // exact arithmetic. Measuring `scrollWidth / COPIES` instead would be half a
  // gap short and jump 10px on every wrap.
  const setWidth = projects.length * CARD_STEP;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || prefersReducedMotion()) return;

    let rafId = 0;
    let lastTime = 0;
    let visible = false;

    const step = (time: number) => {
      const delta = lastTime ? time - lastTime : 0;
      lastTime = time;

      if (setWidth && !pausedRef.current && !hoverRef.current) {
        let next = offsetRef.current + (AUTOPLAY_PX_PER_SEC * delta) / 1000;
        if (next >= setWidth) next -= setWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(step);
    };

    // The loop only exists while the carousel is on screen. Three carousels
    // used to run their frame callback for the entire length of the page.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;

        if (visible) {
          lastTime = 0;
          rafId = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [setWidth]);

  /**
   * `pendingRef` holds the target of an in-flight arrow nudge.
   *
   * Without it, clicking an arrow twice in quick succession queues a second
   * transition while the first `transitionend` listener is still attached; that
   * stale listener then fires and snaps the track back to the first target.
   * Every settle reads the latest target instead, so repeated clicks compose.
   */
  const pendingRef = useRef<number | null>(null);
  const settleRef = useRef<(() => void) | null>(null);

  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track || !setWidth) return;

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    if (settleRef.current) track.removeEventListener('transitionend', settleRef.current);
    pausedRef.current = true;

    const target = (pendingRef.current ?? offsetRef.current) + direction * CARD_STEP;
    pendingRef.current = target;

    track.style.transition = `transform ${NUDGE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    track.style.transform = `translate3d(${-target}px, 0, 0)`;

    const settle = () => {
      settleRef.current = null;
      track.style.transition = '';

      // Normalise into [0, setWidth) — visually identical, since the track
      // repeats every `setWidth` pixels.
      const settled = pendingRef.current ?? offsetRef.current;
      pendingRef.current = null;

      let wrapped = settled % setWidth;
      if (wrapped < 0) wrapped += setWidth;
      offsetRef.current = wrapped;
      track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;

      resumeTimerRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, RESUME_DELAY_MS);
    };

    settleRef.current = settle;
    track.addEventListener('transitionend', settle, { once: true });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${categoryTitle} projects`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onFocusCapture={() => (hoverRef.current = true)}
      onBlurCapture={() => (hoverRef.current = false)}
    >
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label={`Scroll ${categoryTitle} projects left`}
        className="absolute left-1 md:-left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full surface-card flex items-center justify-center text-white/80 hover:text-amber-300 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="overflow-hidden px-14 md:px-16">
        <div ref={trackRef} className="flex" style={{ gap: CARD_GAP, willChange: 'transform' }}>
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            projects.map((project) => (
              <CarouselCard
                key={`${copy}-${project.title}`}
                project={project}
                isDuplicate={copy > 0}
                iconColor={iconColor}
                IconComp={IconComp}
              />
            ))
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label={`Scroll ${categoryTitle} projects right`}
        className="absolute right-1 md:-right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full surface-card flex items-center justify-center text-white/80 hover:text-amber-300 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function toProjectId(title: string): string {
  return `project-${title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')}`;
}

function CarouselCard({
  project,
  isDuplicate,
  iconColor,
  IconComp,
}: {
  project: CmsProject;
  isDuplicate: boolean;
  iconColor: string;
  IconComp: LucideIcon;
}) {
  return (
    <a
      id={isDuplicate ? undefined : toProjectId(project.title)}
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={isDuplicate || undefined}
      tabIndex={isDuplicate ? -1 : undefined}
      className="group block shrink-0 rounded-2xl overflow-hidden surface-card surface-card-hover"
      style={{ width: CARD_WIDTH }}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-white/[0.04]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="320px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComp size={36} className={`${iconColor} opacity-30`} />
          </div>
        )}

        <span className="absolute top-3 left-3 category-tag !text-[10px] !py-1">{project.tag}</span>
        {project.clientWork && (
          <span className="absolute top-3 right-3 tech-tag !text-[10px] !py-1">Client Work</span>
        )}
      </div>

      <div className="p-5">
        <h4 className="text-base font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-amber-100 transition-colors">
          {project.title}
        </h4>
        <p className="text-white/65 text-sm leading-relaxed line-clamp-3">{project.description}</p>

        <div className="flex items-center gap-1.5 mt-4 text-white/30 group-hover:text-amber-300 transition-colors">
          <Github size={13} />
          <ExternalLink size={11} />
        </div>
      </div>
    </a>
  );
}
