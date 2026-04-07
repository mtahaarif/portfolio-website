'use client';

import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  ChevronDown,
  Award,
  Briefcase,
  Menu,
  X,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  profile,
  seoKeywords,
  experienceRoles,
  featuredProjects,
  secondaryProjects,
  skillCategories,
  certifications,
} from './data';
import {
  linkedinHeadline,
  topSkills,
  specializationRanking,
} from './data/career-fit';
import type { Project } from './data/projects';

const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Resume', 'Contact'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSecondary, setShowSecondary] = useState(false);
  const [particleStyles, setParticleStyles] = useState<
    { left: string; animationDelay: string; animationDuration: string }[]
  >([]);

  const shouldReduceMotion = useReducedMotion();

  const topKeywords = useMemo(() => seoKeywords.slice(0, 12), []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -60% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setParticleStyles([]);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 16;

    setParticleStyles(
      Array.from({ length: particleCount }, () => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 14}s`,
        animationDuration: `${16 + Math.random() * 8}s`,
      }))
    );
  }, [shouldReduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="liquid-bg min-h-screen relative text-white">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <div className="mesh-overlay" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />

        <div className="particles" aria-hidden="true">
          {particleStyles.map((style, idx) => (
            <div key={idx} className="particle" style={style} />
          ))}
        </div>

        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="fixed top-0 w-full z-50 nav-shell"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-5 md:px-6 py-4 flex justify-between items-center">
            <motion.a href="#home" className="text-xl md:text-2xl font-bold gradient-text" whileHover={{ scale: 1.04 }}>
              MT
            </motion.a>

            <div className="hidden md:flex gap-7">
              {navItems.map((item) => {
                const sectionId = item.toLowerCase();
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item}
                    href={`#${sectionId}`}
                    className={`relative text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden px-5 pb-4"
            >
              <div className="surface-card rounded-2xl p-3">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.nav>

        <main id="main-content">
          <section id="home" className="section-shell min-h-screen flex items-center relative pt-20">
            <div className="container mx-auto max-w-7xl px-5 md:px-6">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
                <motion.div variants={stagger} initial="hidden" animate="show" className="text-center lg:text-left">
                  <motion.p variants={fadeUp} className="text-amber-300/90 font-semibold text-xs md:text-sm tracking-[0.14em] uppercase mb-3">
                    {profile.title}
                  </motion.p>

                  <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
                    {profile.name.split(' ')[0]}
                    <span className="gradient-text"> {profile.name.split(' ').slice(1).join(' ')}</span>
                  </motion.h1>

                  <motion.p variants={fadeUp} className="text-white/80 text-lg md:text-xl mt-5 max-w-3xl mx-auto lg:mx-0">
                    {profile.headline}
                  </motion.p>

                  <motion.p variants={fadeUp} className="text-white/60 text-base md:text-lg mt-6 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                    {profile.summary}
                  </motion.p>

                  <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 mt-7 justify-center lg:justify-start">
                    {profile.highlights.map((highlight) => (
                      <span key={highlight} className="insight-chip">
                        {highlight}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3.5 mt-8 justify-center lg:justify-start">
                    <motion.a
                      href="#projects"
                      className="btn-primary text-white inline-flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Projects <ArrowRight size={18} />
                    </motion.a>
                    <motion.a
                      href="/Resume.pdf"
                      download
                      className="btn-secondary text-white inline-flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download size={18} /> Download Resume
                    </motion.a>
                    <motion.a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-white inline-flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={18} /> GitHub
                    </motion.a>
                  </motion.div>

                  <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-9 max-w-3xl mx-auto lg:mx-0">
                    {profile.stats.map((stat) => (
                      <div key={stat.label} className="surface-card rounded-2xl p-4 text-center">
                        <p className="text-lg md:text-xl font-bold gradient-text">{stat.value}</p>
                        <p className="text-white/50 text-xs mt-1.5">{stat.label}</p>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex gap-3 mt-8 justify-center lg:justify-start">
                    {[
                      { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
                      { href: profile.linkedIn, icon: Linkedin, label: 'LinkedIn' },
                      { href: profile.github, icon: Github, label: 'GitHub' },
                    ].map(({ href, icon: Icon, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="social-icon"
                        whileHover={{ scale: 1.1 }}
                        aria-label={label}
                      >
                        <Icon size={20} />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.18 }}
                  className="relative mx-auto"
                >
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(2,6,23,0.55)]">
                    <Image
                      src="/profile.jpg"
                      alt="Muhammad Taha - AI/ML Engineer"
                      fill
                      priority
                      sizes="(max-width: 768px) 256px, 320px"
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute -left-6 top-6 surface-card rounded-xl px-3 py-2 text-xs text-white/80">
                    Computer Vision
                  </div>
                  <div className="absolute -right-6 bottom-8 surface-card rounded-xl px-3 py-2 text-xs text-white/80">
                    Multimodal AI
                  </div>
                </motion.div>
              </div>
            </div>

            {!shouldReduceMotion && (
              <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.9, repeat: Infinity }}>
                  <ChevronDown className="text-white/35" size={30} />
                </motion.div>
              </motion.div>
            )}
          </section>

          <section id="about" className="section-shell">
            <div className="container mx-auto max-w-7xl px-5 md:px-6">
              <SectionHeading
                title="Strategic Profile"
                subtitle="Career-fit analysis, evidence-backed strengths, and recruiter-facing positioning"
              />

              <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-7">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={stagger}
                  className="surface-card rounded-3xl p-6 md:p-8"
                >
                  <motion.p variants={fadeUp} className="text-white/75 leading-relaxed text-base md:text-lg mb-5">
                    {profile.summary}
                  </motion.p>

                  <motion.p variants={fadeUp} className="text-white/70 leading-relaxed text-sm md:text-base mb-5">
                    Recommended LinkedIn headline for search and recruiter relevance:
                    <span className="block mt-2 text-white font-medium">{linkedinHeadline}</span>
                  </motion.p>

                  <motion.p variants={fadeUp} className="text-white/70 leading-relaxed text-sm md:text-base mb-6">
                    Degree foundation includes:
                    <span className="text-white/90"> {profile.education.degree}</span> at{' '}
                    <span className="text-white/90">{profile.education.institution}</span>.
                  </motion.p>

                  <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
                    {profile.education.relevantCoursework.map((course) => (
                      <span key={course} className="tech-tag">
                        {course}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-4">
                    {[
                      { icon: MapPin, text: profile.location },
                      { icon: Mail, text: profile.email },
                    ].map(({ icon: Icon, text }) => (
                      <span key={text} className="flex items-center gap-2 text-white/55 text-sm">
                        <Icon size={14} className="text-amber-300" /> {text}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="surface-card rounded-3xl p-6"
                  >
                    <h3 className="text-white font-semibold mb-4">Top 5 Skills From Project Evidence</h3>
                    <div className="space-y-3.5">
                      {topSkills.map((skill) => (
                        <div key={skill.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
                          <p className="text-amber-300 text-sm font-semibold">{skill.name}</p>
                          <p className="text-white/65 text-sm mt-1">{skill.evidence}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="surface-card rounded-3xl p-6"
                  >
                    <h3 className="text-white font-semibold mb-4">Specialization Ranking (Best to Worst Fit)</h3>
                    <ol className="space-y-3">
                      {specializationRanking.map((item, idx) => (
                        <li key={item.field} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
                          <p className="text-white text-sm font-semibold">
                            {idx + 1}. {item.field}{' '}
                            <span className="text-emerald-300/90 font-medium">({item.fitScore}/10)</span>
                          </p>
                          <p className="text-white/60 text-sm mt-1">{item.reason}</p>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section id="experience" className="section-shell">
            <div className="container mx-auto max-w-6xl px-5 md:px-6">
              <SectionHeading title="Experience" subtitle="Hands-on implementation with measurable project and production outcomes" />

              <div className="space-y-5">
                {experienceRoles.map((exp, idx) => (
                  <motion.article
                    key={exp.title}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.08 }}
                    className="surface-card rounded-3xl p-6 md:p-7"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-300/30 shrink-0">
                          <Briefcase className="text-amber-300" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white">{exp.title}</h3>
                          <p className="text-amber-300 font-medium">{exp.organization}</p>
                          {exp.subtitle && <p className="text-white/45 text-sm">{exp.subtitle}</p>}
                        </div>
                      </div>
                      <p className="text-white/45 text-sm">{exp.period}</p>
                    </div>

                    <ul className="space-y-2.5">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-white/72 text-sm md:text-base">
                          <span className="text-amber-300 mt-0.5 shrink-0">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="section-shell">
            <div className="container mx-auto max-w-7xl px-5 md:px-6">
              <SectionHeading
                title="Featured Projects"
                subtitle="Problem-first, results-focused projects aligned to computer vision, multimodal AI, and ML systems engineering"
              />

              <div className="grid lg:grid-cols-2 gap-5 md:gap-6 mb-8">
                {featuredProjects.map((project, idx) => (
                  <ProjectCard key={project.title} project={project} index={idx} />
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowSecondary((value) => !value)}
                  className="btn-secondary text-white/85 text-sm inline-flex items-center gap-2"
                >
                  {showSecondary ? 'Hide Additional Projects' : 'View Additional Projects'}
                  <ChevronDown size={16} className={`transition-transform ${showSecondary ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {showSecondary && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid lg:grid-cols-2 gap-5 md:gap-6 mt-6"
                >
                  {secondaryProjects.map((project, idx) => (
                    <ProjectCard key={project.title} project={project} index={idx} />
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          <section id="skills" className="section-shell">
            <div className="container mx-auto max-w-7xl px-5 md:px-6">
              <SectionHeading title="Technical Stack" subtitle="Specialized toolchain mapped to your core delivery track" />

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {skillCategories.map((category, idx) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.05 }}
                    className="surface-card-hover rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${category.iconBg}`}>
                        <category.icon className={category.iconColor} size={18} />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white">{category.title}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span key={skill} className="skill-tag text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mt-6 surface-card rounded-2xl p-5"
              >
                <h3 className="text-base font-semibold text-white/80 mb-3.5 flex items-center gap-2">
                  <Award size={16} className="text-amber-300" /> Certifications
                </h3>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((certification) => (
                    <a
                      key={certification.title}
                      href={certification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/65 hover:text-amber-200 transition-colors flex items-center gap-1.5"
                    >
                      {certification.title}
                      <span className="text-white/25">·</span>
                      <span className="text-white/40">{certification.issuer}</span>
                      <ExternalLink size={11} className="text-white/30" />
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mt-5 surface-card rounded-2xl p-5"
              >
                <h3 className="text-base font-semibold text-white/80 mb-3">ATS / SEO Core Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {topKeywords.map((keyword) => (
                    <span key={keyword} className="tech-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section id="resume" className="section-shell">
            <div className="container mx-auto max-w-4xl px-5 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="surface-card rounded-3xl p-8 md:p-10 text-center"
              >
                <FileText className="mx-auto text-amber-300 mb-4" size={36} />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">ATS-Optimized Resume</h2>
                <p className="text-white/60 mb-7 max-w-xl mx-auto text-sm md:text-base">
                  Download the polished version aligned with your Computer Vision and Multimodal AI specialization stream.
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                  <motion.a
                    href="/Resume.pdf"
                    download
                    className="btn-primary text-white inline-flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={18} /> Download PDF
                  </motion.a>
                  <motion.a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-white inline-flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink size={18} /> View PDF
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="contact" className="section-shell pt-8">
            <div className="container mx-auto max-w-4xl px-5 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="surface-card rounded-3xl p-8 md:p-10 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  <span className="gradient-text">Let&apos;s Build Something High Impact</span>
                </h2>
                <p className="text-white/60 mb-8 max-w-2xl mx-auto text-sm md:text-base">
                  Open to AI/ML Engineering, Computer Vision, and Multimodal AI opportunities where real-time systems, model quality, and product impact matter.
                </p>

                <div className="flex justify-center flex-wrap gap-4 mb-8">
                  {[
                    { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
                    { href: profile.linkedIn, icon: Linkedin, label: 'LinkedIn' },
                    { href: profile.github, icon: Github, label: 'GitHub' },
                    { href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: Phone, label: 'Phone' },
                  ].map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="social-icon"
                      whileHover={{ scale: 1.08 }}
                      aria-label={label}
                    >
                      <Icon size={21} />
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  href={`mailto:${profile.email}`}
                  className="btn-primary text-white inline-flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={18} /> Start a Conversation
                </motion.a>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="py-8 px-5 md:px-6 border-t border-white/10 mt-6">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/35 text-sm">© {new Date().getFullYear()} {profile.name}</p>
            <div className="flex gap-6">
              {['Home', 'Projects', 'Resume', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/35 hover:text-white/70 text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="mb-10 md:mb-12"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-white/55 text-center mt-3 max-w-2xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="surface-card-hover rounded-3xl p-5 md:p-6 block"
      aria-label={`Open project: ${project.title}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="category-tag">{project.tag}</span>
        <div className="flex items-center gap-1 text-white/25 group-hover:text-amber-300 transition-colors">
          <Github size={15} />
          <ExternalLink size={13} />
        </div>
      </div>

      <h4 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">{project.title}</h4>

      <div className="space-y-2.5 mb-4 text-sm">
        <p className="text-white/62">
          <span className="text-white/85 font-medium">Problem:</span> {project.problem}
        </p>
        <p className="text-white/62">
          <span className="text-white/85 font-medium">Approach:</span> {project.approach}
        </p>
        <p className="text-white/62">
          <span className="text-emerald-300/90 font-medium">Result:</span> {project.result}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span key={tech} className="tech-tag text-xs">
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
