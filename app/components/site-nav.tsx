'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { onScrollFrame, clamp01 } from '../lib/motion';

const NAV_ITEMS = [
  'Home',
  'About',
  'Experience',
  'Projects',
  'Skills',
  'Certifications',
  'Resume',
  'Contact',
] as const;

export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const progressRef = useRef<HTMLDivElement>(null);

  // Reading progress bar. Written straight to the element's transform in the
  // shared scroll loop — no React state, so scrolling never re-renders the nav.
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    return onScrollFrame(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;
      bar.style.transform = `scaleX(${progress})`;
    });
  }, []);

  // Scroll-spy. Only fires setState when the winning section actually changes.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.toLowerCase())).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActiveSection((prev) => (prev === best.target.id ? prev : best.target.id));
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className="nav-drop fixed top-0 inset-x-0 z-50 glass-card border-x-0 border-t-0"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold gradient-text">
            MT
          </a>

          <ul className="hidden lg:flex gap-6">
            {NAV_ITEMS.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 inset-x-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <ul className="lg:hidden px-6 pb-4">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-white/80 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-0.5 z-[60] origin-left bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600"
        style={{ transform: 'scaleX(0)' }}
      />
    </>
  );
}
