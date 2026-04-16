'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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
  Code2,
  Cpu,
  Brain,
  Eye,
  Menu,
  X,
  FileText,
  ArrowRight,
  Server,
  type LucideIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Project } from './data/projects';
import {
  cmsDefaults,
  type IconKey,
  type PortfolioCMSData,
} from './data/cms';

const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Resume', 'Contact'];
const resumePath = '/Resume.pdf';

const iconByKey: Record<IconKey, LucideIcon> = {
  brain: Brain,
  code2: Code2,
  cpu: Cpu,
  eye: Eye,
  server: Server,
};

function resolveIcon(iconKey: string): LucideIcon {
  return iconByKey[iconKey as IconKey] ?? Brain;
}

function mergeCmsData(base: PortfolioCMSData, incoming: Partial<PortfolioCMSData>): PortfolioCMSData {
  return {
    profile: { ...base.profile, ...(incoming.profile ?? {}) },
    proofPoints:
      Array.isArray(incoming.proofPoints) && incoming.proofPoints.length > 0
        ? incoming.proofPoints
        : base.proofPoints,
    experiences:
      Array.isArray(incoming.experiences) && incoming.experiences.length > 0
        ? incoming.experiences
        : base.experiences,
    projectCategories:
      Array.isArray(incoming.projectCategories) && incoming.projectCategories.length > 0
        ? incoming.projectCategories
        : base.projectCategories,
    skillGroups:
      Array.isArray(incoming.skillGroups) && incoming.skillGroups.length > 0
        ? incoming.skillGroups
        : base.skillGroups,
    certifications:
      Array.isArray(incoming.certifications) && incoming.certifications.length > 0
        ? incoming.certifications
        : base.certifications,
  };
}

/* ─── Component ─── */
export default function Home() {
  const [cmsData, setCmsData] = useState<PortfolioCMSData>(cmsDefaults);
  const [cmsStatus, setCmsStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [particleStyles, setParticleStyles] = useState<
    {
      left: string;
      animationDelay: string;
      animationDuration: string;
      width: string;
      height: string;
      opacity: number;
    }[]
  >([]);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    setParticleStyles(
      Array.from({ length: 36 }, () => {
        const size = 3 + Math.random() * 7;
        return {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 16}s`,
          animationDuration: `${14 + Math.random() * 14}s`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.45 + Math.random() * 0.4,
        };
      })
    );

    const sections = navItems.map((item) => item.toLowerCase());
    const handleScroll = () => {
      const y = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadCms = async () => {
      try {
        const response = await fetch('/api/cms/content', { cache: 'no-store' });
        const payload = (await response.json()) as { ok?: boolean; content?: Partial<PortfolioCMSData> };

        if (cancelled) {
          return;
        }

        if (payload?.content) {
          setCmsData(mergeCmsData(cmsDefaults, payload.content));
        }

        setCmsStatus(payload?.ok ? 'ready' : 'fallback');
      } catch {
        if (!cancelled) {
          setCmsStatus('fallback');
        }
      }
    };

    void loadCms();

    return () => {
      cancelled = true;
    };
  }, []);

  const { profile, proofPoints, experiences, projectCategories, skillGroups, certifications: certs } = cmsData;

  return (
    <div className="liquid-bg min-h-screen relative">
      {/* Particles */}
      <div className="particles" aria-hidden="true">
        {particleStyles.map((styles, index) => (
          <div key={index} className="particle" style={styles} />
        ))}
      </div>

      <div className="relative z-10">
        {/* ─── Nav ─── */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="fixed top-0 w-full z-50 glass-card border-t-0 border-x-0"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <motion.a href="#home" className="text-2xl font-bold gradient-text" whileHover={{ scale: 1.05 }}>
              MT
            </motion.a>

            {/* Desktop */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors duration-300 relative ${
                    activeSection === item.toLowerCase() ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-500"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden px-6 pb-4"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-white/80 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </motion.nav>

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 origin-left z-[60]"
          style={{ scaleX: scrollYProgress }}
        />

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
              {/* Text column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-center lg:text-left flex-1"
              >
                <p className="text-amber-300 font-medium mb-3 tracking-wide text-sm uppercase">{profile.positioning}</p>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 leading-tight">
                  {profile.name.split(' ')[0]}
                  <span className="gradient-text"> {profile.name.split(' ').slice(1).join(' ')}</span>
                </h1>

                <h2 className="text-lg md:text-xl text-white/80 mb-3 max-w-2xl lg:max-w-none">{profile.title}</h2>

                <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl lg:max-w-none leading-snug font-medium">
                  {profile.headline}
                </p>

                <p className="text-white/70 text-base md:text-lg mb-4 max-w-2xl lg:max-w-3xl leading-relaxed">{profile.summary}</p>

                <p className="text-xs uppercase tracking-wider text-amber-300/90 mb-10">
                  {cmsStatus === 'ready'
                    ? 'Content Source: Vercel Database CMS'
                    : cmsStatus === 'loading'
                      ? 'Connecting to CMS...'
                      : 'Content Source: Local Fallback (CMS unavailable)'}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
                  <motion.a
                    href="#projects"
                    className="btn-primary text-white text-center flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Projects <ArrowRight size={18} />
                  </motion.a>
                  <motion.a
                    href={resumePath}
                    download
                    className="btn-secondary text-white flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Download size={18} /> Resume
                  </motion.a>
                </div>

                {/* Proof grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
                  {proofPoints.map((proofPoint) => (
                    <div key={proofPoint.label} className="glass-card rounded-2xl p-4 text-center">
                      <p className="text-xl font-bold gradient-text">{proofPoint.value}</p>
                      <p className="text-white/60 text-xs mt-1">{proofPoint.label}</p>
                    </div>
                  ))}
                </div>

                {/* Social row */}
                <div className="flex gap-3 mt-8 justify-center lg:justify-start">
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
                </div>
              </motion.div>

              {/* Profile picture */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative flex-shrink-0"
              >
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-amber-500/40 shadow-2xl shadow-amber-500/25">
                  <Image
                    src="/profile.jpg"
                    alt="Muhammad Taha - AI/ML Engineer"
                    width={288}
                    height={288}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute -inset-3 rounded-full border border-amber-400/30 animate-pulse" />
              </motion.div>
            </div>
          </div>

          <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="text-amber-200/40" size={28} />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════ ABOUT ═══════════════════ */}
        <section id="about" className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading title="About" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 md:p-10"
            >
              <div className="mb-7">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-3">Professional Summary</h3>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">{profile.summary}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-3">About Me</h3>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">{profile.about}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: MapPin, text: profile.location },
                  { icon: Mail, text: profile.email },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-2 text-white/60 text-sm">
                    <Icon size={14} className="text-amber-300" /> {text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════ EXPERIENCE ═══════════════════ */}
        <section id="experience" className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading title="Experience" />

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-3xl p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full" />
                  <div className="flex items-start gap-4 mb-5">
                    <div className="p-3 rounded-xl bg-amber-500/15 shrink-0">
                      <Briefcase className="text-amber-300" size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{experience.title}</h3>
                      <p className="text-amber-200 font-medium">{experience.org}</p>
                      {experience.sub && <p className="text-white/50 text-sm">{experience.sub}</p>}
                      <p className="text-white/45 text-sm">{experience.period}</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 ml-1">
                    {experience.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex gap-3 text-white/75 text-sm md:text-base">
                        <span className="text-amber-300 mt-0.5 shrink-0">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ PROJECTS ═══════════════════ */}
        <section id="projects" className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <SectionHeading
              title="Projects"
              subtitle="Complete project portfolio grouped into AI & Computer Vision, Software Engineering, and Hardware & FPGA"
            />

            <div className="space-y-12">
              {projectCategories.map((category) => {
                const CategoryIcon = resolveIcon(category.iconKey);
                return (
                  <div key={category.id}>
                    <div className="glass-card rounded-2xl p-5 mb-5">
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className={`p-2.5 rounded-xl ${category.iconBg}`}>
                          <CategoryIcon className={category.iconColor} size={20} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h3>
                      </div>
                      <p className="text-white/65 text-sm md:text-base">{category.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {category.projects.map((project, projectIndex) => (
                        <ProjectCard key={project.title} project={project} index={projectIndex} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════ SKILLS ═══════════════════ */}
        <section id="skills" className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <SectionHeading title="Technical Stack" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillGroups.map((skillGroup, index) => {
                const SkillIcon = resolveIcon(skillGroup.iconKey);
                return (
                  <motion.div
                    key={skillGroup.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="glass-card-hover rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`p-2.5 rounded-xl ${skillGroup.iconBg}`}>
                        <SkillIcon className={skillGroup.iconColor} size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{skillGroup.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <span key={skill} className="skill-tag text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certifications — compact inline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 glass-card rounded-2xl p-6"
            >
              <h3 className="text-base font-semibold text-white/80 mb-4 flex items-center gap-2">
                <Award size={16} className="text-amber-300" /> Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {certs.map((certification) => (
                  <a
                    key={certification.title}
                    href={certification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-amber-200 transition-colors flex items-center gap-1.5"
                  >
                    {certification.title} <span className="text-white/40">·</span>{' '}
                    <span className="text-white/60">{certification.issuer}</span>
                    <ExternalLink size={11} className="text-white/40" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════ RESUME CTA ═══════════════════ */}
        <section id="resume" className="py-24 px-6">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 to-transparent" />
              <div className="relative">
                <FileText className="mx-auto text-amber-300 mb-4" size={36} />
                <h2 className="text-3xl font-bold text-white mb-3">Resume</h2>
                <p className="text-white/65 mb-8 max-w-md mx-auto">Full details on experience, projects, and technical skills.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href={resumePath}
                    download
                    className="btn-primary text-white flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Download size={18} /> Download PDF
                  </motion.a>
                  <motion.a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-white flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink size={18} /> View PDF
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════ CONTACT ═══════════════════ */}
        <section id="contact" className="py-24 px-6">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-10 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 to-yellow-400/6" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Let&apos;s Work Together</span>
                </h2>
                <p className="text-white/70 mb-8 max-w-lg mx-auto">
                  Open to AI engineering roles, computer vision work, multimodal AI systems, and high-impact applied ML opportunities.
                </p>

                <div className="flex justify-center gap-4 mb-8">
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
                      whileHover={{ scale: 1.1 }}
                      aria-label={label}
                    >
                      <Icon size={22} />
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  href={`mailto:${profile.email}`}
                  className="btn-primary text-white inline-flex items-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail size={18} /> Get In Touch
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} Muhammad Taha</p>
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
      </div>
    </div>
  );
}

/* ─── Reusable components ─── */

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="text-white/55 text-center mt-3 max-w-xl mx-auto text-sm">{subtitle}</p>}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="glass-card-hover rounded-2xl p-6 group cursor-pointer block"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="category-tag">{project.tag}</span>
        <div className="flex items-center gap-1 text-white/35 group-hover:text-amber-300 transition-colors">
          <Github size={15} />
          <ExternalLink size={13} />
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-3 group-hover:text-amber-100 transition-colors leading-snug">
        {project.title}
      </h4>

      {/* Problem → Approach → Result */}
      <div className="space-y-2 mb-4 text-sm">
        <p className="text-white/65">
          <span className="text-white/85 font-medium">Problem:</span> {project.problem}
        </p>
        <p className="text-white/65">
          <span className="text-white/85 font-medium">Approach:</span> {project.approach}
        </p>
        <p className="text-white/65">
          <span className="text-emerald-300/90 font-medium">Result:</span> {project.result}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((technology) => (
          <span key={technology} className="tech-tag text-xs">
            {technology}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
