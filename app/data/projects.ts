// Project types and derived views.
//
// app/data/cms.ts is the single source of truth for project content. This file
// owns the shared `Project` shape and exposes convenience slices derived from
// it, so a project is never described in two places that can drift apart.
//
// cms.ts imports `Project` from here with `import type`, which is erased at
// compile time — there is no runtime import cycle.

import { cmsDefaults } from './cms';

export interface Project {
  tag: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  github: string;
}

const byId = (id: string): Project[] =>
  cmsDefaults.projectCategories.find((category) => category.id === id)?.projects ?? [];

export const aiProjects = byId('ai-computer-vision');
export const softwareProjects = byId('software-engineering');
export const hardwareProjects = byId('hardware-fpga');

export const allProjects: Project[] = [...aiProjects, ...softwareProjects, ...hardwareProjects];

/** Headline work — leads with clinical AI, multimodal edge, and biometrics. */
export const featuredProjects: Project[] = [
  ...aiProjects.slice(0, 5),
  softwareProjects[0],
].filter(Boolean);

/** Hardware and systems work shown behind the "show all" toggle. */
export const secondaryProjects: Project[] = hardwareProjects.slice(0, 2);
