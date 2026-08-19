import Image from 'next/image';
import { ArrowRight, ChevronDown, Download, FileText, Mail, Phone } from 'lucide-react';

import { cmsDefaults } from './data/cms';
import { Github, Linkedin } from './components/brand-icons';
import { CertsStack } from './components/certs-stack';
import { ExperienceItem } from './components/experience-item';
import { Milestones } from './components/milestones';
import { Particles } from './components/particles';
import { ProjectsSection } from './components/projects-section';
import { Reveal } from './components/reveal';
import { ScrollRevealText } from './components/scroll-reveal-text';
import { SectionHeading } from './components/section-heading';
import { SiteNav } from './components/site-nav';
import { SkillsStack } from './components/skills-stack';

const RESUME_ATS = '/Muhammad_Taha_Resume_ATS.pdf';
const RESUME_DESIGN = '/Muhammad_Taha_Resume_Design.pdf';

/**
 * This page is a Server Component.
 *
 * It used to be `'use client'` end to end, and on mount it fetched
 * `/api/cms/content` — a `force-dynamic` route that returned the very same
 * `cmsDefaults` already bundled into the page. So the content was paid for
 * twice (once in the JS bundle, once over the network) and the entire tree,
 * including all three carousels and every card, re-rendered once the fetch
 * resolved. The data is static, so it is now read directly at build time and
 * only the genuinely interactive pieces ship to the browser.
 */
export default function Home() {
  const { profile, experiences, projectCategories, skillGroups, certifications } =
    cmsDefaults;

  const [firstName, ...restOfName] = profile.name.split(' ');

  const socials = [
    { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
    { href: profile.linkedIn, icon: Linkedin, label: 'LinkedIn' },
    { href: profile.github, icon: Github, label: 'GitHub' },
  ];

  return (
    <>
      <div className="bg-canvas" aria-hidden="true" />
      <Particles />

      <SiteNav />

      <main className="relative z-10 w-full">
        {/* ═══════════ HERO ═══════════ */}
        <section
          id="home"
          className="min-h-screen flex flex-col items-center relative pt-32 pb-20 px-4 w-full"
        >
          <div className="w-full flex flex-col items-center">
            {/*
              Deliberately not animated. This block contains the LCP element
              (the h1), and an entrance fade means it is `opacity: 0` — and so
              does not count as painted — until the animation delay plus
              duration have elapsed, pushing LCP back by most of a second.
            */}
            <div className="text-center mb-8">
              <p className="text-amber-300 font-medium mb-3 tracking-wide text-sm uppercase">
                {profile.positioning}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 leading-tight">
                {firstName}
                <span className="gradient-text"> {restOfName.join(' ')}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-4">{profile.title}</p>
              <p className="text-xl md:text-2xl text-white/90 leading-snug font-medium max-w-3xl mx-auto px-4">
                {profile.headline}
              </p>
            </div>

            <div className="fade-up relative shrink-0 mb-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-500/40 shadow-2xl shadow-amber-500/25 mx-auto">
                <Image
                  src="/profile.jpg"
                  alt={`${profile.name} — ${profile.title}`}
                  width={256}
                  height={256}
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover w-full h-full"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-amber-400/30"
              />
            </div>

            <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 mb-14 max-w-6xl">
              <ScrollRevealText text={profile.summary} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center w-full">
              <a
                href="#projects"
                className="btn-primary text-white text-center inline-flex items-center justify-center gap-2"
              >
                View Projects <ArrowRight size={18} />
              </a>
              <a
                href={RESUME_DESIGN}
                download
                className="btn-secondary text-white inline-flex items-center justify-center gap-2"
              >
                <Download size={18} /> Resume
              </a>
            </div>

            <div className="flex gap-4 justify-center w-full">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="social-icon"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="hint-bob absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <ChevronDown className="text-amber-200/40" size={28} />
          </div>
        </section>

        {/* ═══════════ MILESTONES ═══════════ */}
        <section id="about" className="relative w-full">
          <Milestones />
        </section>

        {/* ═══════════ EXPERIENCE ═══════════ */}
        <section id="experience" className="w-full pb-24 relative pt-12">
          <div className="container mx-auto px-6 mb-16 md:mb-32">
            <SectionHeading title="Experience" />
          </div>
          {experiences.map((experience) => (
            <ExperienceItem key={experience.title} experience={experience} />
          ))}
        </section>

        {/* ═══════════ PROJECTS ═══════════ */}
        <section id="projects" className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <SectionHeading
              title="Projects"
              subtitle="Grouped into Machine Learning & AI Systems, Full-Stack & Software Engineering, and Hardware, Embedded & Digital Design"
            />
            <ProjectsSection categories={projectCategories} />
          </div>
        </section>

        {/* ═══════════ SKILLS ═══════════ */}
        <section id="skills" className="relative pt-24 pb-12 w-full">
          <div className="container mx-auto max-w-5xl px-6 mb-16 md:mb-20 relative z-10">
            <SectionHeading
              title="Technical Stack"
              subtitle="Scroll to deal through the stack — each card lands on the one before it"
            />
          </div>
          <SkillsStack groups={skillGroups} />
        </section>

        {/* ═══════════ CERTIFICATIONS ═══════════ */}
        <section id="certifications" className="relative pt-12 pb-24 w-full">
          <div className="container mx-auto max-w-5xl px-6 mb-16 md:mb-20 relative z-10">
            <SectionHeading
              title="Certifications"
              subtitle="Formal recognitions in AI, machine learning, and software development"
            />
          </div>
          <CertsStack certifications={certifications} />
        </section>

        {/* ═══════════ RESUME ═══════════ */}
        <section
          id="resume"
          className="py-24 px-6"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}
        >
          <div className="container mx-auto max-w-3xl">
            <Reveal className="surface-card rounded-3xl p-10 text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-amber-500/8 to-transparent"
              />
              <div className="relative">
                <FileText className="mx-auto text-amber-300 mb-4" size={36} />
                <h2 className="text-3xl font-bold text-white mb-3">Resume</h2>
                <p className="text-white/65 mb-8 max-w-md mx-auto">
                  Full details on experience, projects, and technical skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={RESUME_ATS}
                    download
                    className="btn-primary text-white inline-flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Download PDF (ATS)
                  </a>
                  <a
                    href={RESUME_DESIGN}
                    download
                    className="btn-secondary text-white inline-flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Download PDF (Design)
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section
          id="contact"
          className="py-24 px-6"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}
        >
          <div className="container mx-auto max-w-3xl">
            <Reveal className="surface-card rounded-3xl p-10 md:p-12 text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-amber-500/8 to-yellow-400/6"
              />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Let&apos;s Work Together</span>
                </h2>
                <p className="text-white/70 mb-8 max-w-lg mx-auto">
                  Open to AI/ML engineering, full-stack development, and computer vision roles — wherever the hardest problem happens to live.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                  {[
                    ...socials,
                    {
                      href: `tel:${profile.phone.replace(/\s/g, '')}`,
                      icon: Phone,
                      label: 'Phone',
                    },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="social-icon"
                      aria-label={label}
                    >
                      <Icon size={22} />
                    </a>
                  ))}
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-primary text-white inline-flex items-center gap-2"
                >
                  <Mail size={18} /> Get In Touch
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-white/10">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} {profile.name}</p>
            <div className="flex gap-6">
              {['Home', 'Projects', 'Resume', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/40 hover:text-white/90 text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
