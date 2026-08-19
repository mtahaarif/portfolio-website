'use client';

import { useEffect, useRef } from 'react';
import type { SkillGroupData } from '../data/cms';
import { mountCardStack, stackTrackHeight } from './card-stack';
import { resolveIcon } from './icons';

/**
 * Technical stack, as a deck of cards.
 *
 * Scrolling down brings each next card up from the bottom of the viewport and
 * lands it on top of the previous one, which scales back and dims so the stack
 * stays readable behind it.
 */
export function SkillsStack({ groups }: { groups: SkillGroupData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    return mountCardStack({
      track,
      cards: cardsRef.current.filter((el): el is HTMLDivElement => el !== null),
      dots: dotsRef.current.filter((el): el is HTMLSpanElement => el !== null),
      axis: 'y',
    });
  }, [groups.length]);

  return (
    <div
      ref={trackRef}
      className="stack-track relative w-full"
      style={{ height: stackTrackHeight(groups.length) }}
    >
      <div className="stack-pin sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-6">
        <div className="stack-deck relative w-full max-w-5xl h-[76vh] md:h-[70vh]">
          {groups.map((group, index) => {
            const SkillIcon = resolveIcon(group.iconKey);

            return (
              <div
                key={group.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="stack-card surface-card rounded-3xl p-6 md:p-10 flex flex-col shadow-2xl"
                style={{
                  zIndex: index,
                  // Pre-scroll position, rendered on the server so the deck is
                  // already correct on first paint.
                  transform: index === 0 ? 'none' : 'translate3d(0, 100%, 0)',
                }}
              >
                <div className="flex items-center gap-4 mb-6 md:mb-8 border-b border-white/10 pb-6">
                  <div className={`p-3 md:p-4 rounded-2xl ${group.iconBg}`}>
                    <SkillIcon className={group.iconColor} size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex-1">
                    {group.title}
                  </h3>
                  <span className="text-amber-200/50 font-mono text-sm md:text-base tabular-nums">
                    {String(index + 1).padStart(2, '0')} / {String(groups.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2.5 md:gap-3 overflow-y-auto pr-2 custom-scrollbar flex-grow content-start">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="skill-tag text-xs md:text-sm py-2 px-4"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="stack-dots absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5"
          aria-hidden="true"
        >
          {groups.map((group, index) => (
            <span
              key={group.title}
              ref={(el) => {
                dotsRef.current[index] = el;
              }}
              className="stack-dot"
              data-on={index === 0 ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
