'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink,
  ChevronDown, Award, Briefcase, Code2, Cpu, Brain, Eye,
  Menu, X, FileText, ArrowRight, Server, type LucideIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Project } from './data/projects';

/* ─── Data ─── */
const profile = {
  name: 'Muhammad Taha',
  title: 'AI/ML Engineer | Computer Vision | Multimodal AI | ML Systems | PyTorch · OpenCV · LLMs · Edge AI',
  positioning: 'Computer Vision · Multimodal AI · ML Systems · Edge AI',
  headline:
    'AI/ML Engineer building production-grade computer vision and multimodal ML systems',
  summary:
    'AI/ML Engineer with hands-on experience delivering real-time computer vision, multimodal AI, and end-to-end ML systems from research to deployment. Specialized in biometric anti-spoofing, clinical risk modeling, edge inference, explainable machine learning, and production APIs. Proven ability to design reliable pipelines across PyTorch, OpenCV, FastAPI, and cloud-native infrastructure for measurable business and operational impact.',
  about:
    'I combine strong software engineering fundamentals with AI systems thinking to build practical, high-impact products. My work spans clinical AI platforms, edge-first multimodal assistants, enterprise web systems, and hardware-aware deployments on FPGA, Raspberry Pi, and ESP32. I focus on interpretable models, robust data pipelines, and maintainable architectures that teams can ship, monitor, and scale.',
  email: 'ch.tahaarif2005@gmail.com',
  phone: '+92 317 5434059',
  location: 'Islamabad, Pakistan',
  linkedIn: 'https://linkedin.com/in/muhammad-taha-21a163256',
  github: 'https://github.com/mtahaarif',
};

const proofPoints = [
  { value: '21+', label: 'Projects Delivered' },
  { value: 'Clinical + Edge', label: 'AI Deployments' },
  { value: 'CV Intern', label: 'TruID Technologies' },
  { value: 'PyTorch/OpenCV', label: 'Production Stack' },
];

const experiences = [
  {
    title: 'Computer Vision Intern',
    org: 'TruID Technologies',
    sub: 'National Science & Technology Park (NSTP), Islamabad',
    period: 'Jul 2025 – Aug 2025',
    bullets: [
      'Developed face liveness and anti-spoofing models to classify real users vs. presentation attacks in biometric flows',
      'Engineered document authenticity pipelines to detect tampered, scanned, and photocopied ID cards',
      'Built hand spoofing and signature forgery classification models for fraud detection use cases',
      'Trained and optimized computer vision models with GPU-accelerated workflows for production-ready inference',
    ],
  },
  {
    title: 'Freelance Full-Stack Engineer',
    org: 'Self-Employed',
    sub: null,
    period: 'Jan 2026 – Present',
    bullets: [
      'Architected a custom headless CMS and admin dashboard for healthcare operations on a serverless stack',
      'Implemented drag-and-drop publishing, optimistic updates, JWT auth, and real-time MySQL synchronization',
      'Reduced content cycle time by 90% (30+ min to under 2 min) and sustained sub-100kB initial loads with SSR optimization',
    ],
  },
];

const aiAndComputerVisionProjects: Project[] = [
  {
    tag: 'Clinical AI',
    title: 'MedTraceAI: Real-Time Clinical Deterioration Prediction',
    problem: 'Clinical deterioration indicators are often fragmented across EHR streams, delaying escalation and intervention.',
    approach: 'Built a multimodal temporal modeling platform over vitals, labs, medications, ADT events, and optional clinical notes with strict patient-time correctness. Compared tabular baselines against LSTM and Temporal Fusion Transformer while adding explainability and audit tracing.',
    result: 'Delivered low-latency bedside risk scoring with calibration, missingness, and drift monitoring across units using Kafka, FastAPI, Kubernetes, and Terraform.',
    tech: ['PyTorch', 'LSTM', 'Temporal Fusion Transformer', 'SHAP', 'Kafka', 'FastAPI', 'Kubernetes', 'Terraform'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Multimodal AI',
    title: 'SERENITY: Smart Emotion Recognition & Neural Intervention',
    problem: 'Mental health workflows need affordable, continuous, and context-aware support beyond periodic single-modality assessments.',
    approach: 'Developed a Raspberry Pi 5 platform combining speech emotion recognition, facial emotion recognition via TFLite, clinical screening workflows (PHQ-9, GAD-7, PCL-5), and empathetic LLM dialogue. Built FastAPI + React architecture with NDJSON streaming, SQLite WAL, and XNNPACK acceleration.',
    result: 'Enabled real-time multimodal distress monitoring with clinician oversight dashboards and persistent edge deployment through Nginx and systemd.',
    tech: ['FastAPI', 'React (Vite)', 'TFLite', 'LLMs', 'SQLite WAL', 'NDJSON', 'Raspberry Pi 5', 'XNNPACK'],
    github: 'https://github.com/mtahaarif/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-',
  },
  {
    tag: '3D Vision',
    title: '3D Environment Reconstruction from Multi-View Images',
    problem: 'Robotics and AR/VR applications require geometrically consistent 3D scene understanding from 2D observations.',
    approach: 'Implemented feature detection and matching (SIFT, ORB, SURF), estimated fundamental/essential matrices, recovered camera pose, and performed stereo triangulation for sparse and dense point cloud generation.',
    result: 'Produced calibrated and refined 3D reconstructions suitable for spatial mapping, navigation, and scene analysis tasks.',
    tech: ['OpenCV', 'SIFT', 'ORB', 'SURF', 'Epipolar Geometry', 'Stereo Triangulation', 'Point Clouds'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Pose Analytics',
    title: 'Human Pose Estimation and Classification',
    problem: 'Reliable pose classification needs robust keypoint extraction across modern deep-learning and classical CV pipelines.',
    approach: 'Designed two pipelines on MPII: MediaPipe-based keypoint extraction and a from-scratch contour/skeletonization pipeline. Engineered angle-based and structural features and trained SVM/Random Forest classifiers for activity labels.',
    result: 'Delivered quantitative comparison using PCKh@0.5, skeleton completeness, symmetry metrics, and anatomical plausibility scores.',
    tech: ['MediaPipe', 'OpenCV', 'SVM', 'Random Forest', 'Feature Engineering', 'MPII Dataset'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Autonomous Vision',
    title: 'Real-Time Image Analysis for Self-Driving Capabilities',
    problem: 'Resource-constrained autonomous systems need dependable lane and obstacle perception without heavy deep learning stacks.',
    approach: 'Built a frame-by-frame classical CV pipeline in OpenCV/NumPy for lane highlighting, HSV obstacle segmentation, and rule-based directional planning on Raspberry Pi 5 with Pi Camera.',
    result: 'Achieved real-time lane-obstacle awareness and movement decision support using deterministic on-device processing.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Canny', 'Morphological Ops', 'HSV Segmentation', 'Raspberry Pi 5'],
    github: 'https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities',
  },
  {
    tag: 'Audio Intelligence',
    title: 'Audio Classification Using Neural Networks',
    problem: 'Automated acoustic monitoring requires robust classification across speech, music, and environmental noise.',
    approach: 'Combined DSP preprocessing (MATLAB filtering and normalization) with Librosa feature extraction (MFCC, ZCR, RMS, pitch) and a TensorFlow/Keras MLP classifier.',
    result: 'Reached 98.85% training accuracy and 94.35% test accuracy, then deployed inference and spectrogram visualization through a Flask web interface.',
    tech: ['TensorFlow', 'Keras', 'Librosa', 'MATLAB', 'Flask', 'DSP', 'MUSAN Dataset'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Medical Imaging',
    title: 'Lung & Colon Cancer Histopathology Classification',
    problem: 'Histopathological diagnosis support requires high-precision image classification across multiple tissue classes.',
    approach: 'Designed and tuned a CNN architecture with dropout and max-pooling regularization for 5-class cancer tissue categorization.',
    result: 'Achieved 98.6% validation accuracy with stable convergence and reproducible training performance.',
    tech: ['PyTorch', 'CNN', 'Medical Imaging', 'Data Augmentation', 'Classification'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Medical Imaging',
    title: 'White Blood Cell Analysis & Classification (DIP)',
    problem: 'WBC subtype identification requires robust nucleus extraction and discriminative handcrafted features under noisy microscopy data.',
    approach: 'Implemented a notebook pipeline with Butterworth high-pass filtering, histogram equalization, custom connected-component analysis, and feature fusion using LBP/HOG plus nucleus geometry.',
    result: 'Produced an end-to-end 5-class WBC classifier with interpretable feature engineering and 66% test accuracy.',
    tech: ['OpenCV', 'NumPy', 'LBP', 'HOG', 'Connected Components', 'Feature Engineering'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Tabular ML',
    title: 'Santander Customer Transaction Prediction',
    problem: 'Rare-event transaction prediction in high-dimensional anonymized financial data demands robust validation and model explainability.',
    approach: 'Built a full ML pipeline with logistic regression baseline, Random Forest/XGBoost/LightGBM experiments, cross-validation, and hyperparameter tuning for ROC-AUC optimization.',
    result: 'Delivered competitive leaderboard-ready models with SHAP and permutation feature importance for post-hoc interpretability.',
    tech: ['Scikit-learn', 'XGBoost', 'LightGBM', 'SHAP', 'ROC-AUC', 'Feature Selection'],
    github: 'https://github.com/mtahaarif',
  },
];

const softwareEngineeringProjects: Project[] = [
  {
    tag: 'Full-Stack Platform',
    title: 'Dental Practice Platform & Custom Headless CMS',
    problem: 'Legacy content workflows on a serverless site created high update latency and poor scalability for non-technical staff.',
    approach: 'Architected a bespoke CMS with drag-and-drop administration, optimistic UI updates, real-time MySQL sync, and hybrid Vercel Blob + Git CDN asset strategy.',
    result: 'Reduced content update turnaround by 90% and sustained high-performance SSR delivery under a sub-100kB initial load target.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'MySQL', 'JWT', 'Vercel Blob', 'SSR'],
    github: 'https://github.com/mtahaarif/hainescitydental',
  },
  {
    tag: 'Desktop Search',
    title: 'Search Engine Desktop Application (Data Structures)',
    problem: 'Large local text repositories need fast indexing and boolean retrieval beyond basic filename search.',
    approach: 'Implemented a custom indexing engine using Trie structures, document metadata objects, and graph-linked document relationships. Added boolean query support, ranking by term frequency, and result caching.',
    result: 'Delivered fast local document retrieval with a Qt-based desktop interface for practical search navigation.',
    tech: ['C++', 'Qt Creator', 'Trie', 'Graph Data Structures', 'Boolean Retrieval'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Systems Programming',
    title: '"Gameboy" Multi-Game Launcher',
    problem: 'Real-time mini-games required responsive rendering and deterministic game mechanics in a low-level C++ environment.',
    approach: 'Developed an SFML-based launcher with console buffer manipulation, custom Tetris rotation logic, and Flappy Bird physics simulation.',
    result: 'Created a performant multi-game platform demonstrating algorithmic control, rendering optimization, and gameplay state management.',
    tech: ['C++', 'SFML', 'Console Buffer', 'Game Physics', 'Matrix Algorithms'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Concurrency',
    title: 'Comprehensive OS Scheduler & Disk Simulator',
    problem: 'Teaching and analyzing scheduling algorithms is difficult without interactive execution and timeline visualization.',
    approach: 'Built a Java simulator for Round Robin and EDF CPU scheduling plus SCAN/C-SCAN disk scheduling. Used SwingWorker-based multithreading to keep UI responsive during concurrent simulations.',
    result: 'Produced a full-stack educational simulator with dynamic Gantt chart visualization and deterministic scheduling comparison.',
    tech: ['Java', 'Swing', 'SwingWorker', 'Concurrency', 'Scheduling Algorithms'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Database Engineering',
    title: 'Industrial Database Management System',
    problem: 'Manufacturing operations at scale require structured data governance, auditable workflows, and maintainable schema design.',
    approach: 'Designed an EER-based data model with subtype hierarchies for production lines and materials, then implemented SQL-backed CRUD workflows through an admin dashboard.',
    result: 'Delivered a scalable database system for operations, maintenance, and production management with secure administrative access.',
    tech: ['SQL', 'Database Design', 'EER Modeling', 'CRUD Systems', 'Admin Dashboards'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'OOP Simulation',
    title: 'Object-Oriented Airport Traffic Simulation',
    problem: 'Procedural simulation models increase maintenance cost and limit extensibility in airport surface traffic control studies.',
    approach: 'Implemented a task-driven, message-based simulation engine in OOP style with airplane, network, clock, and shortest-path abstractions using priority-queue scheduling.',
    result: 'Improved modularity and maintainability while accurately modeling airport surface traffic task execution and routing behavior.',
    tech: ['Object-Oriented Design', 'Simulation', 'Priority Queues', 'Path Planning', 'Java/C++'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Network Engineering',
    title: 'IPv6 WAN Design & Inter-VLAN Routing',
    problem: 'Enterprise-scale network labs require segmented, routable, and future-ready architectures for secure communication.',
    approach: 'Designed an IPv6 WAN in Cisco Packet Tracer using Router-on-a-Stick for inter-VLAN routing and OSPFv3 for dynamic route propagation across routers and switches.',
    result: 'Delivered a scalable topology with effective traffic segmentation and standards-aligned IPv6 routing operations.',
    tech: ['IPv6', 'OSPFv3', 'Cisco Packet Tracer', 'Inter-VLAN Routing', 'Router-on-a-Stick'],
    github: 'https://github.com/mtahaarif',
  },
];

const hardwareAndFpgaProjects: Project[] = [
  {
    tag: 'FPGA Gaming',
    title: 'FPGA Implementation of Advanced Snake Game with AI',
    problem: 'Building a real-time interactive game without a CPU requires deterministic hardware control and parallel execution.',
    approach: 'Implemented a processor-less Verilog game engine with VGA timing (640x480@60Hz), BRAM-backed snake memory, LFSR-based randomness, finite-state control, and Manhattan-distance ghost AI.',
    result: 'Delivered a fully hardware-driven game with advanced mechanics including bombs, poison apples, and shed-skin obstacle generation.',
    tech: ['Verilog HDL', 'FPGA', 'BRAM', 'VGA', 'FSM', 'LFSR'],
    github: 'https://github.com/mtahaarif/FPGA-Implementation-of-Advanced-Snake-Game-with-AI',
  },
  {
    tag: 'IoT Robotics',
    title: 'Remote Weather Detection IoT Car',
    problem: 'Traditional weather stations are static and expensive for targeted environmental data collection in remote zones.',
    approach: 'Integrated Arduino, ESP32-CAM, DHT22/BH1750 sensors, LoRa telemetry, and motor control for remote vehicle navigation plus wireless weather packet transmission.',
    result: 'Created a mobile IoT station capable of real-time environmental monitoring and web-based remote control.',
    tech: ['ESP32-CAM', 'Arduino', 'LoRa', 'DHT22', 'BH1750', 'L298N', 'IoT'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Security IoT',
    title: 'Autonomous Robo Cop (Security & IoT)',
    problem: 'Security patrol units need affordable autonomous sensing for intrusion and hazard response in constrained settings.',
    approach: 'Designed an ESP32-based mobile security unit integrating PIR motion sensing for intruder alerts and IR-based fire-response automation.',
    result: 'Delivered a proof-of-concept autonomous security rover with integrated sensing and alert-driven behavior.',
    tech: ['ESP32', 'PIR Sensors', 'IR Sensors', 'Embedded Control', 'IoT'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Digital Logic',
    title: 'Smart Car Parking Fare Generator',
    problem: 'Fixed parking fees create billing inequity and require automation for accurate time-based fare calculation.',
    approach: 'Engineered a digital logic pipeline with proximity sensing, asynchronous timing, ripple counters, ALU-style computation, and BCD-to-7-segment display conversion.',
    result: 'Implemented deterministic hardware fare computation tied directly to parking duration intervals and configurable rates.',
    tech: ['Digital Logic', '555 Timer', '7493 Counters', 'ALU Design', 'BCD Display', 'Verilog'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Processor Design',
    title: 'Custom 16-bit Instruction Set Processor',
    problem: 'Understanding computer architecture requires end-to-end implementation of datapath, control logic, and instruction semantics.',
    approach: 'Built a Harvard-architecture 16-bit processor with register file, ALU, dedicated instruction/data memories, and conditional instruction support based on status flags.',
    result: 'Delivered a functioning custom ISA processor in Verilog with simulation, branching logic, and flag-driven execution support.',
    tech: ['Verilog HDL', 'Harvard Architecture', 'ALU', 'Control Unit', 'ISA Design', 'FPGA'],
    github: 'https://github.com/mtahaarif/Custom-16-Bit-Processor',
  },
];

interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  projects: Project[];
}

const projectCategories: ProjectCategory[] = [
  {
    id: 'ai-computer-vision',
    title: 'AI & Computer Vision',
    subtitle: 'Clinical AI, multimodal modeling, deep learning, and real-time vision systems',
    icon: Brain,
    iconBg: 'bg-blue-600/20',
    iconColor: 'text-blue-400',
    projects: aiAndComputerVisionProjects,
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    subtitle: 'Full-stack products, algorithms, concurrency, simulation, databases, and networks',
    icon: Code2,
    iconBg: 'bg-cyan-600/20',
    iconColor: 'text-cyan-400',
    projects: softwareEngineeringProjects,
  },
  {
    id: 'hardware-fpga',
    title: 'Hardware & FPGA',
    subtitle: 'Embedded systems, digital logic, processor design, and hardware acceleration',
    icon: Cpu,
    iconBg: 'bg-emerald-600/20',
    iconColor: 'text-emerald-400',
    projects: hardwareAndFpgaProjects,
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

              <h2 className="text-lg md:text-xl text-white/80 mb-3 max-w-2xl lg:max-w-none">
                {profile.title}
              </h2>

              <p className="text-xl md:text-2xl text-white/85 mb-6 max-w-2xl lg:max-w-none leading-snug font-medium">
                {profile.headline}
              </p>

              <p className="text-white/55 text-base md:text-lg mb-10 max-w-2xl lg:max-w-3xl leading-relaxed">
                {profile.summary}
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
                  href="/Resume.pdf"
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
                  alt="Muhammad Taha - AI/ML Engineer"
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
            <div className="mb-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3">
                Professional Summary
              </h3>
              <p className="text-white/75 leading-relaxed text-base md:text-lg">
                {profile.summary}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3">
                About Me
              </h3>
              <p className="text-white/75 leading-relaxed text-base md:text-lg">
                {profile.about}
              </p>
            </div>

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
          <SectionHeading
            title="Projects"
            subtitle="Complete project portfolio grouped into AI & Computer Vision, Software Engineering, and Hardware & FPGA"
          />

          <div className="space-y-12">
            {projectCategories.map((category) => (
              <div key={category.id}>
                <div className="glass-card rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`p-2.5 rounded-xl ${category.iconBg}`}>
                      <category.icon className={category.iconColor} size={20} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h3>
                  </div>
                  <p className="text-white/55 text-sm md:text-base">{category.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
                  href="/Resume.pdf"
                  download
                  className="btn-primary text-white flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={18} /> Download PDF
                </motion.a>
                <motion.a
                  href="/Resume.pdf"
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
