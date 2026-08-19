'use client';

import { useEffect, useState } from 'react';
import type { ProjectCategoryData } from '../data/cms';
import { resolveIcon } from './icons';
import { ProjectCarousel } from './project-carousel';

export function ProjectsSection({ categories }: { categories: ProjectCategoryData[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActiveId((prev) => (prev === best.target.id ? prev : best.target.id));
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.2, 0.4] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center mb-14" role="tablist" aria-label="Project categories">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={activeId === category.id}
            aria-controls={category.id}
            onClick={() =>
              document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            className="skill-tag text-xs md:text-sm"
          >
            {category.title.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-20">
        {categories.map((category) => {
          if (category.projects.length === 0) return null;
          const CategoryIcon = resolveIcon(category.iconKey);

          return (
            <div key={category.id} id={category.id} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2.5 rounded-xl ${category.iconBg}`}>
                  <CategoryIcon className={category.iconColor} size={20} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h3>
              </div>
              <p className="text-white/65 text-sm md:text-base mb-8 ml-1">{category.subtitle}</p>

              <ProjectCarousel
                projects={category.projects}
                categoryTitle={category.title}
                iconColor={category.iconColor}
                IconComp={CategoryIcon}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
