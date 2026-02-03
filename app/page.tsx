'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, 
  ChevronDown, Award, Briefcase, GraduationCap, Code2, Cpu, Brain,
  Wrench, Menu, X, FileText, User
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Resume', 'Contact'];

  return (
    <div className="liquid-bg min-h-screen relative">
      {/* Animated Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 w-full z-50 glass-card border-t-0 border-x-0"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.a
              href="#home"
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              MT
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.toLowerCase()
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
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
        </div>
      </motion.nav>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section with Profile Photo */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Profile Photo - Mobile */}
              <div className="lg:hidden mb-8 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-xl opacity-50" />
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 glass-card">
                    <img 
                      src="/profile.jpg" 
                      alt="Muhammad Taha" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-blue-400 font-medium mb-4"
              >
                 Welcome to my portfolio
              </motion.p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Muhammad
                <span className="gradient-text"> Taha</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-white/80 mb-6">
                AI Engineer & Computer Vision Specialist
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl">
                Final-year Computer Engineering student with expertise in Generative AI, 
                Computer Vision, and Embedded Systems. Building intelligent systems from 
                neural networks to custom FPGA processors.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.a
                  href="#contact"
                  className="btn-primary text-white text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="#resume"
                  className="btn-secondary text-white flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText size={20} />
                  View Resume
                </motion.a>
                <motion.a
                  href="/Muhammad_Taha_Resume.pdf"
                  download
                  className="btn-secondary text-white flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  Download CV
                </motion.a>
              </div>

              <div className="flex gap-4">
                <motion.a
                  href="mailto:ch.tahaarif2005@gmail.com"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  title="Email"
                >
                  <Mail size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/muhammad-taha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="https://github.com/muhammad-taha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  title="GitHub"
                >
                  <Github size={20} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-full blur-3xl" />
              <div className="glass-card rounded-3xl p-8 relative float-animation">
                {/* Profile Photo - Desktop */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-lg opacity-50" />
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                      <img 
                        src="/profile.jpg" 
                        alt="Muhammad Taha" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <h3 className="text-4xl font-bold gradient-text">3.11</h3>
                    <p className="text-white/60 text-sm">CGPA / 4.0</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <h3 className="text-4xl font-bold gradient-text">15+</h3>
                    <p className="text-white/60 text-sm">Projects</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <h3 className="text-4xl font-bold gradient-text">5</h3>
                    <p className="text-white/60 text-sm">Certifications</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <h3 className="text-4xl font-bold gradient-text">2</h3>
                    <p className="text-white/60 text-sm">Work Experience</p>
                  </div>
                </div>
                <div className="mt-6 glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="text-blue-400" size={24} />
                    <h4 className="text-white font-semibold">NUST</h4>
                  </div>
                  <p className="text-white/60 text-sm">B.E. Computer Engineering</p>
                  <p className="text-white/40 text-xs">2022 - 2026</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-white/40" size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="section-subtitle">Get to know more about my journey</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Professional Summary</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Final-year Computer Engineering student with a comprehensive portfolio bridging 
                <span className="text-blue-400 font-medium"> Generative AI</span>, 
                <span className="text-blue-300 font-medium"> Computer Vision</span>, 
                <span className="text-blue-400 font-medium"> System Software</span>, and 
                <span className="text-green-400 font-medium"> Embedded Hardware</span>.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                Demonstrated expertise in fine-tuning Large Language Models (LLMs) with RAG, 
                designing hybrid deep neural networks for signal processing, and engineering 
                processor-less hardware solutions on FPGA.
              </p>
              <p className="text-white/70 leading-relaxed">
                Proven track record of delivering end-to-end complex systems, from custom 
                digital logic design to deploying real-time AI inference pipelines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-600/20">
                  <MapPin className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-white/60">Islamabad, Pakistan</p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-400/20">
                  <Phone className="text-blue-300" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-white/60">+92 317 5434059</p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Mail className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-white/60">ch.tahaarif2005@gmail.com</p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-500/20">
                  <GraduationCap className="text-green-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Education</h4>
                  <p className="text-white/60">NUST - B.E. Computer Engineering (2022-2026)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              <span className="gradient-text">Technical Skills</span>
            </h2>
            <p className="section-subtitle">Technologies and tools I work with</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover rounded-3xl p-6 glow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl ${category.iconBg}`}>
                    <category.icon className={category.iconColor} size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              <span className="gradient-text">Experience & Leadership</span>
            </h2>
            <p className="section-subtitle">My professional journey and leadership roles</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Professional Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-transparent rounded-bl-full" />
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-600/20">
                  <Briefcase className="text-blue-400" size={24} />
                </div>
                <div>
                  <span className="category-tag">Professional</span>
                  <h3 className="text-2xl font-bold text-white mt-2">Computer Vision Intern</h3>
                  <p className="text-blue-400 font-medium">TruID Technologies</p>
                  <p className="text-white/50 text-sm">National Science and Technology Park (NSTP), Islamabad</p>
                  <p className="text-white/40 text-sm">July 2025 – August 2025</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Engineered robust Face Anti-Spoofing algorithms to detect liveness and differentiate between real users and screen/paper attacks',
                  'Developed Document Verification system using texture analysis to classify identity cards as physical originals vs. scanned photocopies',
                  'Designed and trained Signature Forgery Detection models for banking applications',
                  'Optimized computer vision pipelines for real-time inference in production systems'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/70">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Leadership Roles */}
            <div className="grid md:grid-cols-2 gap-6">
              {leadershipRoles.map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-hover rounded-2xl p-6"
                >
                  <span className="category-tag">{role.type}</span>
                  <h4 className="text-lg font-bold text-white mt-3">{role.title}</h4>
                  <p className="text-blue-400 text-sm">{role.organization}</p>
                  <p className="text-white/40 text-xs mb-3">{role.period}</p>
                  <p className="text-white/60 text-sm">{role.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="section-subtitle">A showcase of my technical work - Click on any project to view on GitHub</p>
          </motion.div>

          {/* Featured Project */}
          <motion.a
            href="https://github.com/muhammad-taha/SERENITY"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 mb-12 relative overflow-hidden block group cursor-pointer hover:border-blue-600/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-blue-400/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="category-tag">🏆 Final Year Project</span>
                <div className="flex items-center gap-2 text-white/50 group-hover:text-blue-400 transition-colors">
                  <Github size={20} />
                  <span className="text-sm">View on GitHub</span>
                  <ExternalLink size={16} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                SERENITY: Smart Emotion Recognition & Neural Intervention
              </h3>
              <p className="text-white/70 mb-6 max-w-3xl">
                Multimodal system combining Micro-Expression Recognition (Computer Vision) and LLMs (NLP) 
                to detect suppressed emotions and provide empathetic counseling.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  'Fine-tuned Tiny LLaMA (1B) using LoRA on psychological datasets',
                  'Implemented RAG for grounded AI responses in CBT guidelines',
                  'Engineered vision system using Optical Flow and 3D-CNNs',
                  'Dynamic prompt injection from real-time non-verbal cues'
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-white/70">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['LLaMA-3', 'RAG', 'LoRA', '3D-CNN', 'Optical Flow', 'SAMM Dataset'].map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </motion.a>

          {/* Project Categories */}
          {projectCategories.map((category) => (
            <div key={category.title} className="mb-12">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
              >
                <category.icon className="text-blue-400" size={28} />
                {category.title}
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.projects.map((project, i) => (
                  <motion.a
                    key={project.title}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card-hover rounded-2xl p-6 group cursor-pointer block"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="category-tag">{project.tag}</span>
                      <div className="flex items-center gap-1 text-white/30 group-hover:text-blue-400 transition-colors">
                        <Github size={16} />
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-white/60 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag text-xs">{tech}</span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              <span className="gradient-text">Certifications</span>
            </h2>
            <p className="section-subtitle">Professional credentials and achievements - Click to verify</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, i) => (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover rounded-2xl p-6 text-center glow group cursor-pointer block"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="text-blue-400" size={32} />
                </div>
                <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">{cert.title}</h4>
                <p className="text-blue-400 text-sm mb-2">{cert.issuer}</p>
                <div className="flex items-center justify-center gap-1 text-white/40 text-xs group-hover:text-blue-400 transition-colors">
                  <ExternalLink size={12} />
                  <span>View Certificate</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              <span className="gradient-text">Resume</span>
            </h2>
            <p className="section-subtitle">My professional resume at a glance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Resume Preview Card */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Column - Photo & Contact */}
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600/30 mb-4">
                      <img src="/profile.jpg" alt="Muhammad Taha" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Muhammad Taha</h3>
                    <p className="text-blue-400 text-sm">AI Engineer</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Mail size={16} className="text-blue-400" />
                      <span>ch.tahaarif2005@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Phone size={16} className="text-blue-400" />
                      <span>+92 317 5434059</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <MapPin size={16} className="text-blue-400" />
                      <span>Islamabad, Pakistan</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Linkedin size={16} className="text-blue-400" />
                      <a href="https://linkedin.com/in/muhammad-taha" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn Profile</a>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Github size={16} className="text-blue-400" />
                      <a href="https://github.com/muhammad-taha" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub Profile</a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Summary */}
                <div className="md:w-2/3">
                  <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Briefcase size={18} className="text-blue-400" />
                    Professional Summary
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Final-year Computer Engineering student with a comprehensive portfolio bridging Generative AI, 
                    Computer Vision, System Software, and Embedded Hardware. Demonstrated expertise in fine-tuning 
                    Large Language Models (LLMs) with RAG, designing hybrid deep neural networks for signal processing, 
                    and engineering processor-less hardware solutions on FPGA.
                  </p>

                  <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <GraduationCap size={18} className="text-blue-400" />
                    Education
                  </h4>
                  <div className="mb-6">
                    <p className="text-white font-medium">B.E. Computer Engineering</p>
                    <p className="text-blue-400 text-sm">National University of Sciences and Technology (NUST)</p>
                    <p className="text-white/50 text-xs">2022 - 2026 | CGPA: 3.11/4.0</p>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Award size={18} className="text-blue-400" />
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['LLaMA-3', 'RAG', 'OpenCV', 'TensorFlow', 'PyTorch', 'Python', 'C++', 'FPGA', 'Docker'].map((skill) => (
                      <span key={skill} className="skill-tag text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center gap-4">
              <motion.a
                href="/Muhammad_Taha_Resume.pdf"
                download
                className="btn-primary text-white flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Download Full Resume (PDF)
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 max-w-3xl mx-auto text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/5" />
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">
                <span className="gradient-text">Let&apos;s Connect</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                I&apos;m always open to discussing new projects, opportunities in AI/ML, 
                and innovative collaborations. Feel free to reach out!
              </p>
              
              <div className="flex justify-center gap-4 mb-8">
                <motion.a
                  href="mailto:ch.tahaarif2005@gmail.com"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  title="Email"
                >
                  <Mail size={24} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/muhammad-taha-21a163256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  title="LinkedIn"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="https://github.com/mtahaarif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  title="GitHub"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="tel:+923175434059"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  title="Phone"
                >
                  <Phone size={24} />
                </motion.a>
              </div>

              <motion.a
                href="mailto:ch.tahaarif2005@gmail.com"
                className="btn-primary text-white inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Me a Message
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Muhammad Taha. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Home', 'About', 'Projects', 'Resume', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/40 hover:text-white text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Data
const skillCategories = [
  {
    title: "Full-Stack Web Development",
    icon: Code2,
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
    skills: ["Next.js 14 App Router", "React", "TypeScript", "Node.js", "Tailwind CSS", "Server Components", "REST APIs", "Vercel"]
  },
  {
    title: "Backend & Database",
    icon: Code2,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    skills: ["MySQL", "Relational Database Design", "Serverless Functions", "JWT Authentication", "API Development", "SQL Optimization", "Middleware"]
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
    skills: ["TensorFlow", "PyTorch", "LLaMA-3", "RAG", "LangChain", "Transformers", "BERT", "Prompt Engineering"]
  },
  {
    title: "Computer Vision & Deep Learning",
    icon: Cpu,
    iconBg: "bg-blue-400/20",
    iconColor: "text-blue-300",
    skills: ["OpenCV", "YOLO", "CNN", "RNN", "LSTM", "Optical Flow", "MediaPipe", "Image Processing"]
  },
  {
    title: "Programming Languages",
    icon: Code2,
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL", "Verilog", "MATLAB"]
  },
  {
    title: "Hardware & IoT",
    icon: Cpu,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    skills: ["FPGA", "ESP32", "Raspberry Pi", "Arduino", "Verilog HDL", "Digital Logic", "Sensors"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    skills: ["Docker", "Git", "Linux", "Vercel", "Vercel Blob", "CI/CD Pipelines", "Flask", "Qt"]
  }
];

const leadershipRoles = [
  {
    type: "Professional",
    title: "Freelance Full-Stack Engineer",
    organization: "Self-Employed",
    period: "Jan 2026 – Present",
    description: "Specializing in modernizing legacy web systems for small businesses. Recently architected and deployed a custom Headless CMS and patient engagement platform for a dental practice, migrating from a static legacy codebase to a dynamic Next.js architecture. Focus areas: relational database design, serverless authentication, and building intuitive admin interfaces for non-technical users."
  },
  {
    type: "Leadership",
    title: "Lead of Human Resources (HR)",
    organization: "COMPPEC - Computer Project Exhibition",
    period: "Apr 2024 – May 2026",
    description: "Managed recruitment and coordination of volunteers for the largest project exhibition at the university."
  },
  {
    type: "Leadership",
    title: "Class Representative",
    organization: "NUST",
    period: "Sep 2024 – May 2026",
    description: "Primary liaison between faculty and students, resolving academic concerns and organizing schedules."
  },
  {
    type: "Extracurricular",
    title: "Event Management",
    organization: "BurRaq - NUST Debating Society",
    period: "Nov 2022 – Sep 2024",
    description: "Organized large-scale debating events and declamation contests."
  },
  {
    type: "Award",
    title: "Winner - Declamation Competition",
    organization: "Burraq Extempore Competition",
    period: "Nov 2022",
    description: "First place in university-wide public speaking competition."
  }
];

const projectCategories = [
  {
    title: "AI & Computer Vision",
    icon: Brain,
    projects: [
      {
        tag: "Deep Learning",
        title: "Speech Emotion Recognition",
        description: "Hybrid CNN-BiLSTM-Attention network achieving 78.41% accuracy on 50K+ audio samples from 9 datasets.",
        tech: ["CNN", "BiLSTM", "Librosa", "RAVDESS"],
        github: "https://github.com/mtahaarif/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-"
      },
      {
        tag: "Medical AI",
        title: "Cancer Classification",
        description: "CNN-based histopathological image classifier achieving 98.6% validation accuracy.",
        tech: ["CNN", "TensorFlow", "Image Processing"],
        github: "https://github.com/mtahaarif/Histopathological-Cancer-Classification"
      },
      {
        tag: "Computer Vision",
        title: "Self-Driving Vision System",
        description: "Real-time lane detection and obstacle recognition for autonomous navigation.",
        tech: ["OpenCV", "Hough Transform", "Edge Detection"],
        github: "https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities"
      },
      {
        tag: "Image Processing",
        title: "WBC Analysis & Classification",
        description: "Pipeline using Fourier Transforms and LBP for microscopic cell classification.",
        tech: ["Fourier", "LBP", "Hough Transform"],
        github: "https://github.com/mtahaarif/WBC-Analysis-and-Classification"
      },
      {
        tag: "Signal Processing",
        title: "Audio Classification System",
        description: "MLP-based classifier (94% accuracy) for speech, music, and noise deployed via Flask.",
        tech: ["Librosa", "MFCCs", "Flask", "MLP"],
        github: "https://github.com/mtahaarif/Audio-Classification-System"
      }
    ]
  },
  {
    title: "Software Engineering",
    icon: Code2,
    projects: [
      {
        tag: "Full Stack Development",
        title: "Full-Stack Dental Practice Platform & Custom Headless CMS",
        description: "Architected a bespoke CMS solving the challenge of managing dynamic content on a serverless platform with legacy database constraints. Built custom Admin Dashboard with drag-and-drop interface, optimistic UI updates, and real-time MySQL synchronization. Engineered hybrid storage system combining Vercel Blob for uploads with Git-based CDN assets. Reduced content update time by 90% (from 30+ min manual edits to <2 min). Achieved <100kB initial load with SSR, AVIF/WebP optimization, and aggressive caching.",
        tech: ["Next.js 14", "TypeScript", "MySQL", "Tailwind CSS", "Vercel Blob", "JWT Auth"],
        github: "https://github.com/mtahaarif/hainescitydental"
      },
      {
        tag: "Systems",
        title: "OS Scheduler Simulator",
        description: "Full-stack Java application simulating CPU and Disk scheduling with dynamic Gantt Charts.",
        tech: ["Java", "Swing", "Multithreading"],
        github: "https://github.com/mtahaarif/Comprehensive-OS-Scheduler-Disk-Simulator"
      },
      {
        tag: "Gaming",
        title: "Gameboy Multi-Game Launcher",
        description: "C++ game launcher with SFML graphics, featuring Tetris and Flappy Bird with custom physics.",
        tech: ["C++", "SFML", "Console Graphics"],
        github: "https://github.com/mtahaarif/-Gameboy-Multi-Game-Launcher"
      },
      {
        tag: "Data Structures",
        title: "Search Engine Application",
        description: "High-performance file search using Trie with O(L) complexity and Qt GUI.",
        tech: ["C++", "Qt", "Trie"],
        github: "https://github.com/mtahaarif/Search-Engine-Desktop-Application"
      },
      {
        tag: "OOP",
        title: "Airport Traffic Simulation",
        description: "Complex ground traffic modeling using Java OOP with interactive Swing GUI.",
        tech: ["Java", "Swing", "OOP"],
        github: "https://github.com/mtahaarif/Object-Oriented-Airport-Traffic-Simulation"
      },
      {
        tag: "Networking",
        title: "IPv6 WAN Design",
        description: "Scalable IPv6 WAN with Router-on-a-Stick, OSPFv3, and VLAN segmentation.",
        tech: ["Cisco", "OSPFv3", "VLANs"],
        github: "https://github.com/mtahaarif/IPv6-WAN-Design"
      },
      {
        tag: "Database",
        title: "Industrial DBMS",
        description: "Normalized SQL database with EER diagram and Python GUI for CRUD operations.",
        tech: ["SQL", "Python", "EER"],
        github: "https://github.com/mtahaarif/Industrial-Database-Management-System"
      }
    ]
  },
  {
    title: "Hardware & FPGA",
    icon: Cpu,
    projects: [
      {
        tag: "FPGA",
        title: "Snake Game with Hardware AI",
        description: "Processor-less game engine on Xilinx FPGA with VGA output and Manhattan distance AI.",
        tech: ["Verilog", "FPGA", "VGA"],
        github: "https://github.com/mtahaarif/FPGA-Implementation-of-Advanced-Snake-Game-with-AI"
      },
      {
        tag: "Architecture",
        title: "Custom 16-bit Processor",
        description: "Harvard-Architecture processor with custom ISA, Control Unit, and Datapath.",
        tech: ["Verilog", "ISA", "Digital Design"],
        github: "https://github.com/mtahaarif/Custom-16-Bit-Processor"
      },
      {
        tag: "Digital Logic",
        title: "Smart Parking Fare System",
        description: "Application-specific controller with custom ALU and Ripple Counters.",
        tech: ["Digital Logic", "ALU", "Counters"],
        github: "https://github.com/mtahaarif/Smart-Car-Parking-Fare-Generator"
      },
      {
        tag: "IoT",
        title: "Autonomous Robo Cop",
        description: "Security vehicle with ESP32, PIR sensors, and automated fire extinguishing.",
        tech: ["ESP32", "PIR", "IR Sensors"],
        github: "https://github.com/mtahaarif/Autonomous-Robo-Cop"
      },
      {
        tag: "IoT",
        title: "Weather Detection Rover",
        description: "Remote-controlled rover with LoRa WAN for long-range telemetry.",
        tech: ["ESP32", "Arduino", "LoRa"],
        github: "https://github.com/mtahaarif/Remote-Weather-Detection-IoT-Car"
      }
    ]
  }
];

const certifications = [
  { 
    title: "Deep Learning Specialization", 
    issuer: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/specialization/108CJVFYUFG4"
  },
  { 
    title: "Machine Learning Specialization", 
    issuer: "Stanford Online",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/CCNSYYU42C28"
  },
  { 
    title: "CS50: Python Programming", 
    issuer: "Harvard University",
    link: "https://certificates.cs50.io/a31f82a1-78d3-417d-9b38-7b58af74cd4c.pdf?size=letter"
  },
  { 
    title: "Introduction to Front-End Development", 
    issuer: "Meta / Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/5W3GG5G4JVNY"
  },
  { 
    title: "AI for Everyone", 
    issuer: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/verify/DQRNLTNU8F3D"
  }
];
