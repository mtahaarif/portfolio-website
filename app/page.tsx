'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink,
  ChevronDown, Award, Briefcase, Code2, Cpu, Brain, Eye,
  Menu, X, FileText, ArrowRight, Server,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Project } from './data/projects';

/* ─── Data ─── */
const profile = {
  name: 'Muhammad Taha',
  title: 'AI Engineer',
  positioning: 'Computer Vision · Multimodal AI · ML Systems · Embedded AI',
  headline:
    'Building real-time computer vision, multimodal AI, and production ML systems',
  summary:
    'AI Engineer specializing in computer vision, multimodal deep learning, and production ML systems. Deployed face anti-spoofing, document verification, and signature forgery detection models at a biometrics company. Built real-time emotion recognition with CNN-BiLSTM-Attention and LLM-based counseling optimized for edge devices.',
  email: 'ch.tahaarif2005@gmail.com',
  phone: '+92 317 5434059',
  location: 'Islamabad, Pakistan',
  linkedIn: 'https://linkedin.com/in/muhammad-taha-21a163256',
  github: 'https://github.com/mtahaarif',
};

const proofPoints = [
  { value: 'CV Intern', label: 'TruID Technologies' },
  { value: '15+', label: 'Projects Built' },
  { value: 'Real-Time', label: 'AI Systems' },
  { value: 'Edge AI', label: 'Deployment' },
];

const experiences = [
  {
    title: 'Computer Vision Intern',
    org: 'TruID Technologies',
    sub: 'National Science & Technology Park (NSTP), Islamabad',
    period: 'Jul 2025 – Aug 2025',
    bullets: [
      'Engineered Face Anti-Spoofing algorithms detecting liveness and differentiating real users from screen/paper attacks',
      'Developed Document Verification system using texture analysis to classify original vs. photocopied identity cards',
      'Designed Signature Forgery Detection models for banking applications',
      'Optimized CV pipelines for real-time production inference',
    ],
  },
  {
    title: 'Freelance Full-Stack Engineer',
    org: 'Self-Employed',
    sub: null,
    period: 'Jan 2026 – Present',
    bullets: [
      'Built custom Headless CMS for dental practice; migrated legacy codebase to Next.js with real-time MySQL sync',
      'Developed Admin Dashboard with drag-and-drop UI, optimistic updates, and hybrid Vercel Blob storage',
      'Reduced content update time by 90% (30+ min to <2 min); achieved <100kB initial load via SSR and AVIF optimization',
    ],
  },
];

const featuredProjects: Project[] = [
  {
    tag: 'Multimodal AI',
    title: 'SERENITY: Multimodal AI Mental Health System',
    problem: 'Mental health screening relies on single-modality tools that miss non-verbal cues and emotional nuance.',
    approach: 'Built emotion recognition platform fusing facial expression analysis, speech recognition, and LLM-based counseling. CNN-BiLSTM-Attention network trained on RAVDESS, CREMA-D, and IEMOCAP. Fine-tuned LLM on Empathetic Dialogues, CounselChat, and DIAC-WOZ.',
    result: 'Deployed on Raspberry Pi 5 for edge inference with real-time multimodal emotion detection and empathetic AI responses.',
    tech: ['PyTorch', 'CNN-BiLSTM-Attention', 'LoRA', 'RAG', 'Optical Flow', 'Raspberry Pi'],
    github: 'https://github.com/mtahaarif/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-',
  },
  {
    tag: 'Clinical AI',
    title: 'MedTraceAI: Clinical Deterioration Prediction',
    problem: 'Early warning signs of clinical deterioration in hospital patients are often detected too late.',
    approach: 'Real-time clinical AI detecting early warning signs from streaming vitals, labs, and medications. LSTM and Temporal Fusion Transformer with multimodal feature fusion and SHAP explainability.',
    result: 'Production stack with Kafka, FastAPI, Kubernetes, and Terraform; clinician-facing dashboards for actionable alerts.',
    tech: ['LSTM', 'Temporal Fusion Transformer', 'SHAP', 'Kafka', 'FastAPI', 'Kubernetes'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Full-Stack Engineering',
    title: 'Full-Stack Dental Platform & Custom Headless CMS',
    problem: 'A dental practice needed a modern web platform to replace a legacy site, with non-technical content management.',
    approach: 'Architected Next.js 14 + TypeScript + MySQL stack with drag-and-drop interface and JWT auth. Hybrid storage combining Vercel Blob with Git-based CDN assets.',
    result: '90% faster content updates (30+ min → <2 min) and <100kB initial page load through SSR and aggressive caching.',
    tech: ['Next.js 14', 'TypeScript', 'MySQL', 'JWT', 'Vercel Blob', 'Tailwind CSS'],
    github: 'https://github.com/mtahaarif/hainescitydental',
  },
  {
    tag: 'Computer Vision',
    title: 'Real-Time Self-Driving Image Analysis',
    problem: 'Autonomous navigation requires real-time visual perception on resource-constrained hardware.',
    approach: 'Built autonomous navigation on Raspberry Pi 5 using classical CV for lane detection and obstacle segmentation. Hough transforms, adaptive thresholding, and edge detection.',
    result: 'Low-latency real-time inference pipeline running on edge hardware for autonomous navigation.',
    tech: ['OpenCV', 'Hough Transform', 'Edge Detection', 'Raspberry Pi', 'Real-Time'],
    github: 'https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities',
  },
  {
    tag: '3D Vision',
    title: '3D Environment Reconstruction',
    problem: 'Converting 2D multi-view images into accurate 3D point clouds for robotics and AR/VR.',
    approach: 'Multi-view 3D reconstruction using SIFT/ORB/SURF matching and epipolar geometry. Dense point clouds via stereo triangulation.',
    result: 'Accurate 3D scene reconstruction for robotics, AR/VR, and autonomous navigation applications.',
    tech: ['OpenCV', 'SIFT', 'ORB', 'Epipolar Geometry', 'Stereo Vision'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Applied ML',
    title: 'Santander Transaction Prediction',
    problem: 'Predicting rare transaction events from highly imbalanced, high-dimensional tabular data.',
    approach: 'End-to-end ML pipeline with XGBoost, LightGBM, and Random Forest optimized for ROC-AUC. SHAP and Permutation Feature Importance for interpretability.',
    result: 'Strong ROC-AUC performance with interpretable predictions on a competitive Kaggle benchmark.',
    tech: ['XGBoost', 'LightGBM', 'SHAP', 'Scikit-learn', 'Feature Engineering'],
    github: 'https://github.com/mtahaarif',
  },
];

const secondaryProjects: Project[] = [
  {
    tag: 'FPGA / Hardware AI',
    title: 'FPGA Snake Game with Hardware AI',
    problem: 'Implementing a real-time game engine without a software processor.',
    approach: 'Processor-less game engine on Xilinx FPGA with Verilog HDL, VGA output, and Ghost AI using Manhattan distance.',
    result: 'Fully functional hardware-only game at 60 fps VGA output.',
    tech: ['Verilog HDL', 'FPGA', 'VGA', 'Digital Logic'],
    github: 'https://github.com/mtahaarif/FPGA-Implementation-of-Advanced-Snake-Game-with-AI',
  },
  {
    tag: 'Hardware Architecture',
    title: 'Custom 16-bit Harvard-Architecture Processor',
    problem: 'Understanding processor design from the ground up.',
    approach: '16-bit processor in Verilog with custom ISA, Control Unit, Datapath, and Register File.',
    result: 'Working processor executing custom assembly instructions in simulation and synthesis.',
    tech: ['Verilog HDL', 'ISA Design', 'Digital Logic', 'FPGA'],
    github: 'https://github.com/mtahaarif/Custom-16-Bit-Processor',
  },
];

const skillGroups = [
  {
    title: 'Computer Vision',
    icon: Eye,
    iconBg: 'bg-blue-600/20',
    iconColor: 'text-blue-400',
    skills: ['OpenCV', 'YOLO', 'MediaPipe', 'Optical Flow', 'Face Anti-Spoofing', '3D Reconstruction', 'Image Processing'],
  },
  {
    title: 'AI / Deep Learning',
    icon: Brain,
    iconBg: 'bg-indigo-600/20',
    iconColor: 'text-indigo-400',
    skills: ['PyTorch', 'TensorFlow', 'CNNs', 'BiLSTM', 'Attention', 'LLMs', 'RAG', 'LoRA', 'LSTM', 'Temporal Fusion Transformer', 'XGBoost', 'LightGBM', 'SHAP'],
  },
  {
    title: 'ML Infrastructure',
    icon: Server,
    iconBg: 'bg-emerald-600/20',
    iconColor: 'text-emerald-400',
    skills: ['FastAPI', 'Docker', 'Kubernetes', 'Terraform', 'Kafka', 'Git', 'Linux', 'CI/CD'],
  },
  {
    title: 'Software Engineering',
    icon: Code2,
    iconBg: 'bg-purple-600/20',
    iconColor: 'text-purple-400',
    skills: ['Python', 'TypeScript', 'C++', 'Java', 'SQL', 'Next.js', 'React', 'Node.js', 'REST APIs', 'MySQL'],
  },
  {
    title: 'Hardware / Embedded',
    icon: Cpu,
    iconBg: 'bg-amber-600/20',
    iconColor: 'text-amber-400',
    skills: ['FPGA (Xilinx)', 'Verilog HDL', 'Raspberry Pi', 'ESP32', 'Arduino', 'Digital Logic'],
  },
];

const certs = [
  { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', link: 'https://www.coursera.org/account/accomplishments/specialization/108CJVFYUFG4' },
  { title: 'Machine Learning Specialization', issuer: 'Stanford Online', link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/CCNSYYU42C28' },
  { title: 'CS50: Programming with Python', issuer: 'Harvard University', link: 'https://certificates.cs50.io/a31f82a1-78d3-417d-9b38-7b58af74cd4c.pdf?size=letter' },
];

const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Resume', 'Contact'];

/* ─── Component ─── */
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSecondary, setShowSecondary] = useState(false);
  const [particleStyles, setParticleStyles] = useState<
    { left: string; animationDelay: string; animationDuration: string }[]
  >([]);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    setParticleStyles(
      Array.from({ length: 15 }, () => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
      }))
    );

    const sections = navItems.map((n) => n.toLowerCase());
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

  return (
    <div className="liquid-bg min-h-screen relative">
      {/* Particles */}
      <div className="particles" aria-hidden="true">
        {particleStyles.map((s, i) => (
          <div key={i} className="particle" style={s} />
        ))}
      </div>

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
                  activeSection === item.toLowerCase() ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400"
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
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 origin-left z-[60]"
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
              <p className="text-amber-400 font-medium mb-3 tracking-wide text-sm uppercase">
                {profile.positioning}
              </p>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 leading-tight">
                {profile.name.split(' ')[0]}
                <span className="gradient-text"> {profile.name.split(' ').slice(1).join(' ')}</span>
              </h1>

              <h2 className="text-xl md:text-2xl text-white/80 mb-6 max-w-2xl lg:max-w-none">
                {profile.headline}
              </h2>

              <p className="text-white/55 text-base md:text-lg mb-10 max-w-2xl lg:max-w-3xl leading-relaxed">
                Experience includes <strong className="text-white/90">face anti-spoofing</strong>,{' '}
                <strong className="text-white/90">document verification</strong>, and{' '}
                <strong className="text-white/90">production CV pipelines</strong> at TruID Technologies.
                Built multimodal emotion recognition systems deployed on edge devices.
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
                  href="/Muhammad_Taha_Resume.pdf"
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
                {proofPoints.map((p) => (
                  <div key={p.label} className="glass-card rounded-2xl p-4 text-center">
                    <p className="text-xl font-bold gradient-text">{p.value}</p>
                    <p className="text-white/50 text-xs mt-1">{p.label}</p>
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
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/10">
                <Image
                  src="/profile.jpg"
                  alt="Muhammad Taha - AI Engineer"
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -inset-3 rounded-full border border-amber-500/10 animate-pulse" />
            </motion.div>
          </div>
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="text-white/30" size={28} />
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
            <p className="text-white/75 leading-relaxed text-base md:text-lg mb-5">
              I build <span className="text-blue-400 font-medium">computer vision systems</span>,{' '}
              <span className="text-blue-400 font-medium">multimodal AI products</span>, and{' '}
              <span className="text-blue-400 font-medium">production-minded ML pipelines</span>.
              At <span className="text-white font-medium">TruID Technologies</span>, I engineered
              face anti-spoofing, document verification, and signature forgery detection models
              deployed in real-time biometrics pipelines.
            </p>
            <p className="text-white/75 leading-relaxed text-base md:text-lg mb-5">
              My flagship project, <span className="text-white font-medium">SERENITY</span>,
              fuses facial expression analysis, speech emotion recognition, and LLM-based
              counseling — running on a Raspberry Pi 5 for edge inference. I also architected
              <span className="text-white font-medium"> MedTraceAI</span>, a clinical deterioration
              prediction system with Kafka streaming, Temporal Fusion Transformers, and
              Kubernetes-based deployment.
            </p>
            <p className="text-white/75 leading-relaxed text-base md:text-lg">
              Beyond AI, I deliver full-stack applications and have hands-on experience with
              FPGA design, custom processor architectures, and embedded systems — giving me
              an end-to-end systems perspective from silicon to inference.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: MapPin, text: profile.location },
                { icon: Mail, text: profile.email },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 text-white/50 text-sm">
                  <Icon size={14} className="text-blue-400" /> {text}
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
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full" />
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-blue-600/20 shrink-0">
                    <Briefcase className="text-blue-400" size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{exp.title}</h3>
                    <p className="text-blue-400 font-medium">{exp.org}</p>
                    {exp.sub && <p className="text-white/40 text-sm">{exp.sub}</p>}
                    <p className="text-white/35 text-sm">{exp.period}</p>
                  </div>
                </div>
                <ul className="space-y-2.5 ml-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-white/70 text-sm md:text-base">
                      <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                      <span>{b}</span>
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
          <SectionHeading title="Featured Projects" subtitle="Curated work demonstrating depth in AI, computer vision, and systems engineering" />

          {/* Featured grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          {/* Secondary toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowSecondary(!showSecondary)}
              className="btn-secondary text-white/80 text-sm inline-flex items-center gap-2"
            >
              {showSecondary ? 'Hide' : 'More Projects'}
              <ChevronDown size={16} className={`transition-transform ${showSecondary ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showSecondary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid md:grid-cols-2 gap-6 mt-8"
            >
              {secondaryProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════ SKILLS ═══════════════════ */}
      <section id="skills" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionHeading title="Technical Stack" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card-hover rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${cat.iconBg}`}>
                    <cat.icon className={cat.iconColor} size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s} className="skill-tag text-xs">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications — compact inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 glass-card rounded-2xl p-6"
          >
            <h3 className="text-base font-semibold text-white/70 mb-4 flex items-center gap-2">
              <Award size={16} className="text-blue-400" /> Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              {certs.map((c) => (
                <a
                  key={c.title}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  {c.title} <span className="text-white/30">·</span> <span className="text-white/40">{c.issuer}</span>
                  <ExternalLink size={11} className="text-white/30" />
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent" />
            <div className="relative">
              <FileText className="mx-auto text-blue-400 mb-4" size={36} />
              <h2 className="text-3xl font-bold text-white mb-3">Resume</h2>
              <p className="text-white/55 mb-8 max-w-md mx-auto">
                Full details on experience, projects, and technical skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/Muhammad_Taha_Resume.pdf"
                  download
                  className="btn-primary text-white flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={18} /> Download PDF
                </motion.a>
                <motion.a
                  href="/Muhammad_Taha_Resume.pdf"
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Let&apos;s Work Together</span>
              </h2>
              <p className="text-white/55 mb-8 max-w-lg mx-auto">
                Open to AI engineering roles, computer vision work, multimodal AI systems,
                and high-impact applied ML opportunities.
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
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Muhammad Taha</p>
          <div className="flex gap-6">
            {['Home', 'Projects', 'Resume', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/30 hover:text-white/70 text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
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
      {subtitle && <p className="text-white/50 text-center mt-3 max-w-xl mx-auto text-sm">{subtitle}</p>}
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
        <div className="flex items-center gap-1 text-white/25 group-hover:text-blue-400 transition-colors">
          <Github size={15} />
          <ExternalLink size={13} />
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
        {project.title}
      </h4>

      {/* Problem → Approach → Result */}
      <div className="space-y-2 mb-4 text-sm">
        <p className="text-white/50">
          <span className="text-white/70 font-medium">Problem:</span> {project.problem}
        </p>
        <p className="text-white/50">
          <span className="text-white/70 font-medium">Approach:</span> {project.approach}
        </p>
        <p className="text-white/50">
          <span className="text-emerald-400/80 font-medium">Result:</span> {project.result}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag text-xs">{t}</span>
        ))}
      </div>
    </motion.a>
  );
}
