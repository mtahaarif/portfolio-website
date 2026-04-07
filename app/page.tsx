'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { ContactForm } from './components/contact-form';
import { CinematicBackground } from './components/cinematic-background';
import { TypewriterSubheadline } from './components/typewriter-subheadline';

const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

const heroSubheadlines = ["AI/ML Engineer | Computer Vision | Edge AI | NUST '26"];

const aboutCopy =
  'Computer Vision and Machine Learning Engineer specializing in multimodal AI systems, edge computing, and production ML pipelines. I bridge the gap between applied CV research and scalable cloud architectures, deploying quantized LLMs and deep learning models to resource-constrained hardware.';

const experiences = [
  {
    role: 'Computer Vision Engineer (Intern)',
    company: 'TruID Technologies',
    period: 'Jul 2025 - Aug 2025',
    details:
      'Engineered production face anti-spoofing systems for liveness detection and texture-based document verification.',
  },
  {
    role: 'Freelance Software Engineer',
    company: 'Independent',
    period: 'Jan 2026 - Present',
    details:
      'Architected a high-concurrency headless CMS using Next.js, TypeScript, and MySQL, reducing content update times by 90%.',
  },
];

const projects = [
  {
    title: 'SERENITY (Multimodal Edge AI)',
    summary:
      'Probabilistically fused facial and speech signals to drive a quantized local LLM for mental health dialogue on Raspberry Pi 5.',
    tech: ['Python', 'OpenCV', 'TFLite', 'Qwen', 'FastAPI'],
    span: 'lg:col-span-3 lg:row-span-2',
  },
  {
    title: 'MedTraceAI',
    summary:
      'Built a real-time clinical deterioration prediction platform using Temporal Fusion Transformers and Kafka streaming pipelines.',
    tech: ['PyTorch', 'Kafka', 'Kubernetes', 'SHAP'],
    span: 'lg:col-span-3',
  },
  {
    title: '3D Scene Reconstruction',
    summary:
      'Implemented a multi-view stereo pipeline using epipolar geometry to generate dense 3D point clouds from image sequences.',
    tech: ['OpenCV', 'SIFT/ORB', 'C++'],
    span: 'lg:col-span-3',
  },
];

const skills = [
  {
    category: 'Computer Vision',
    items: ['OpenCV', 'MediaPipe', 'Face Anti-Spoofing', '3D Reconstruction', 'Epipolar Geometry'],
  },
  {
    category: 'Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'Multimodal ML', 'LLMs', 'RAG', 'Whisper', 'XNNPACK'],
  },
  {
    category: 'MLOps & Cloud',
    items: ['AWS', 'Kafka', 'Kubernetes', 'Docker', 'FastAPI', 'CI/CD'],
  },
  {
    category: 'Hardware',
    items: ['Raspberry Pi 5', 'Edge AI', 'FPGA', 'Verilog'],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (topEntry) {
          setActiveSection(topEntry.target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <CinematicBackground />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 nav-glass" aria-label="Primary header">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#home" className="logo-mark" aria-label="Go to homepage section">
            MT
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const active = activeSection === id;
              return (
                <a key={item} href={`#${id}`} className={`nav-link ${active ? 'active' : ''}`}>
                  {item}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            className="md:hidden icon-button"
            aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-5 mb-4 rounded-2xl border border-white/10 bg-slate-950/90 p-3 backdrop-blur md:hidden"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="relative overflow-hidden">
        <section id="home" className="section-shell pt-20">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.article
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.08,
                  },
                },
              }}
              className="space-y-5"
            >
              <motion.p variants={fadeInUp} className="hero-kicker">
                AI/ML + Computer Vision Portfolio
              </motion.p>

              <motion.h1 variants={fadeInUp} className="hero-title" id="hero-title">
                Muhammad Taha
              </motion.h1>

              <motion.div variants={fadeInUp}>
                <TypewriterSubheadline phrases={heroSubheadlines} className="hero-typewriter" />
              </motion.div>

              <motion.p variants={fadeInUp} className="hero-summary">
                Building production-grade perception systems, multimodal intelligence workflows, and low-latency ML infrastructure from edge devices to cloud-native orchestration.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <a href="#projects" className="cta-primary" aria-label="View featured projects">
                  View Projects <ArrowRight size={16} />
                </a>
                <a
                  href="/Resume.pdf"
                  download
                  className="cta-secondary"
                  aria-label="Download Resume ATS Optimized"
                >
                  <Download size={16} /> Download Resume (ATS Optimized)
                </a>
              </motion.div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="profile-card"
              aria-label="Profile overview"
            >
              <Image
                src="/profile.jpg"
                alt="Portrait of Muhammad Taha"
                width={520}
                height={520}
                sizes="(max-width: 1024px) 100vw, 460px"
                priority
                className="h-auto w-full rounded-2xl object-cover"
              />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <p className="metric-chip">CV + Biometrics</p>
                <p className="metric-chip">Multimodal AI</p>
                <p className="metric-chip">Edge Inference</p>
                <p className="metric-chip">Cloud ML Systems</p>
              </div>
            </motion.article>
          </div>
        </section>

        <section id="about" className="section-shell" aria-labelledby="about-title">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="panel"
            >
              <h2 id="about-title" className="section-title">
                About Me
              </h2>
              <p className="section-copy">{aboutCopy}</p>
            </motion.article>
          </div>
        </section>

        <section id="experience" className="section-shell" aria-labelledby="experience-title">
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
            <h2 id="experience-title" className="section-title mb-8">
              Experience
            </h2>
            <ol className="timeline-list" aria-label="Professional timeline">
              {experiences.map((experience) => (
                <li key={experience.role} className="timeline-item">
                  <span className="timeline-dot" aria-hidden="true" />
                  <article className="panel">
                    <header className="mb-3">
                      <h3 className="text-xl font-semibold text-slate-100">{experience.role}</h3>
                      <p className="text-amber-200/90">{experience.company}</p>
                      <p className="text-sm text-slate-400">{experience.period}</p>
                    </header>
                    <p className="text-slate-300 leading-relaxed">{experience.details}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="projects" className="section-shell" aria-labelledby="projects-title">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
            <h2 id="projects-title" className="section-title mb-8">
              Featured Projects
            </h2>
            <div className="grid auto-rows-[minmax(240px,auto)] gap-5 lg:grid-cols-6">
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                  transition={{ duration: 0.25 }}
                  className={`project-card group ${project.span}`}
                  tabIndex={0}
                  aria-label={`${project.title} project card`}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-copy">{project.summary}</p>

                  <div className="project-stack" aria-label={`Tech stack for ${project.title}`}>
                    <p className="project-stack-title">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="skill-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell" aria-labelledby="skills-title">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
            <h2 id="skills-title" className="section-title mb-8">
              Skills
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {skills.map((group) => (
                <article key={group.category} className="panel" aria-label={`${group.category} skills`}>
                  <h3 className="mb-4 text-lg font-semibold text-slate-100">{group.category}</h3>
                  <ul className="flex flex-wrap gap-2" aria-label={`${group.category} tag cloud`}>
                    {group.items.map((item) => (
                      <li key={item}>
                        <span className="skill-pill">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell pb-20" aria-labelledby="contact-title">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="panel">
              <h2 id="contact-title" className="section-title mb-4">
                Contact
              </h2>
              <p className="section-copy mb-6">
                Open to AI/ML Engineering and Computer Vision roles. Reach out for collaborations, interviews, or product-focused consulting work.
              </p>
              <div className="space-y-3 text-slate-300">
                <p className="inline-flex items-center gap-2">
                  <Mail size={16} aria-hidden="true" /> ch.tahaarif2005@gmail.com
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                  <a
                    className="link-pill"
                    href="https://github.com/mtahaarif"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GitHub profile"
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    className="link-pill"
                    href="https://linkedin.com/in/muhammad-taha-21a163256"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn profile"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>
              </div>
            </article>

            <article className="panel">
              <h3 className="mb-4 text-lg font-semibold text-slate-100">Send a Message</h3>
              <ContactForm />
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-400 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Muhammad Taha</p>
          <p>Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.</p>
        </div>
      </footer>
    </>
  );
}
