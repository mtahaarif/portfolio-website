'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import type { CertificationData } from '../data/cms';
import { mountCardStack, stackTrackHeight } from './card-stack';

/**
 * Certifications, as a deck dealt from the right.
 *
 * Scrolling down slides each next certificate in from the right edge and lands
 * it on top of the previous one. Every card reserves the same image panel, so
 * adding a real certificate scan later changes nothing about the layout.
 */
export function CertsStack({ certifications }: { certifications: CertificationData[] }) {
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
      axis: 'x',
    });
  }, [certifications.length]);

  return (
    <div
      ref={trackRef}
      className="stack-track relative w-full"
      style={{ height: stackTrackHeight(certifications.length) }}
    >
      <div className="stack-pin sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-6">
        <div className="stack-deck relative w-full max-w-6xl h-[74vh] md:h-[60vh]">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="stack-card surface-card rounded-3xl p-5 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 shadow-2xl"
              style={{
                zIndex: index,
                transform: index === 0 ? 'none' : 'translate3d(100%, 0, 0)',
              }}
            >
              <CertMedia cert={cert} />

              <div className="flex flex-col justify-between flex-grow min-w-0 text-center md:text-left py-1">
                <div>
                  <p className="text-amber-200/50 font-mono text-xs tracking-widest uppercase mb-3">
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(certifications.length).padStart(2, '0')}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-amber-300 text-sm md:text-base font-medium">{cert.issuer}</p>
                  <p className="text-amber-200/60 font-mono text-xs md:text-sm mt-3 tracking-wider uppercase">
                    {cert.date}
                  </p>
                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-white w-full md:w-auto md:self-start inline-flex items-center justify-center gap-2 mt-6"
                >
                  View Certificate <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          className="stack-dots absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5"
          aria-hidden="true"
        >
          {certifications.map((cert, index) => (
            <span
              key={cert.title}
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

/**
 * The image panel. Always occupies the same box, whether or not a scan exists,
 * so the card never reflows when `image` is filled in later.
 */
function CertMedia({ cert }: { cert: CertificationData }) {
  return (
    <div className="w-full md:w-2/5 h-36 md:h-full relative rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-gradient-to-br from-amber-500/10 to-white/[0.02]">
      {cert.image ? (
        <Image
          src={cert.image}
          alt={`${cert.title} certificate`}
          fill
          sizes="(max-width: 768px) 92vw, 40vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <Award size={40} className="text-amber-300/70" />
          <p className="text-amber-100/80 text-sm font-semibold leading-tight">{cert.issuer}</p>
          <p className="text-white/35 text-[11px] font-mono uppercase tracking-widest">
            {cert.date}
          </p>
        </div>
      )}
    </div>
  );
}
