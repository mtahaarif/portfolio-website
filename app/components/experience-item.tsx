import type { ExperienceData } from '../data/cms';
import { Reveal } from './reveal';

/**
 * Server-rendered apart from the `<Reveal>` wrappers, which are the only part
 * that needs the client. The whole section used to be framer-motion components
 * inside a `'use client'` page, so every bullet shipped as JS.
 */
export function ExperienceItem({ experience }: { experience: ExperienceData }) {
  return (
    <article className="relative flex flex-col md:flex-row w-full max-w-[100rem] mx-auto mb-32 md:mb-64 px-4 md:px-10">
      <div className="sticky top-16 md:top-0 z-30 md:z-20 w-[calc(100%+2rem)] -mx-4 md:mx-0 px-4 md:px-0 md:w-1/2 flex flex-col justify-start md:justify-center md:h-screen pt-6 pb-6 md:pt-0 md:pb-0 bg-black/50 md:bg-transparent border-b border-white/5 md:border-none">
        <Reveal from="left" className="flex flex-col pr-0 md:pr-16">
          <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tighter">
            {experience.title}
          </h3>
          <p className="text-xl md:text-3xl lg:text-5xl text-amber-400 font-bold mb-6 leading-tight tracking-tight">
            {experience.org}
          </p>
          {experience.sub && (
            <p className="text-base md:text-xl lg:text-2xl text-white/70 mb-8 leading-snug font-medium">
              {experience.sub}
            </p>
          )}
          <p className="text-base md:text-xl font-mono text-amber-200/80 uppercase tracking-widest mt-2 md:mt-6">
            {experience.period}
          </p>
        </Reveal>
      </div>

      <div className="w-full md:w-1/2 flex flex-col z-10 pt-10 md:pt-0 relative">
        {experience.bullets.length > 1 && (
          <div
            aria-hidden="true"
            className="absolute left-7 md:left-10 top-[8vh] bottom-[8vh] w-[3px] -translate-x-1/2 z-0 rounded-full bg-gradient-to-b from-amber-500/80 via-amber-500/20 to-amber-500/80"
          />
        )}

        <ol className="contents">
          {experience.bullets.map((bullet, index) => (
            <li
              key={bullet.slice(0, 60)}
              className="min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center py-8 md:py-0 relative"
            >
              <Reveal className="flex gap-6 md:gap-12 items-start relative z-10">
                <span className="shrink-0 w-14 md:w-20 flex justify-center mt-1 md:mt-2">
                  <span
                    className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono text-amber-400"
                    style={{ textShadow: '0 0 20px rgba(251,191,36,0.4)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <p className="text-lg md:text-2xl lg:text-3xl text-white/95 leading-relaxed font-medium tracking-tight">
                  {bullet}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
