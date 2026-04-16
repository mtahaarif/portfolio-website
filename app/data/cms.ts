import type { Project } from './projects';

export type IconKey = 'brain' | 'code2' | 'cpu' | 'eye' | 'server';

export interface ProfileData {
  name: string;
  title: string;
  positioning: string;
  headline: string;
  summary: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
}

export interface ProofPoint {
  value: string;
  label: string;
}

export interface ExperienceData {
  title: string;
  org: string;
  sub: string | null;
  period: string;
  bullets: string[];
}

export interface ProjectCategoryData {
  id: string;
  title: string;
  subtitle: string;
  iconKey: IconKey;
  iconBg: string;
  iconColor: string;
  projects: Project[];
}

export interface SkillGroupData {
  title: string;
  iconKey: IconKey;
  iconBg: string;
  iconColor: string;
  skills: string[];
}

export interface CertificationData {
  title: string;
  issuer: string;
  link: string;
}

export interface PortfolioCMSData {
  profile: ProfileData;
  proofPoints: ProofPoint[];
  experiences: ExperienceData[];
  projectCategories: ProjectCategoryData[];
  skillGroups: SkillGroupData[];
  certifications: CertificationData[];
}

const aiAndComputerVisionProjects: Project[] = [
  {
    tag: 'Clinical AI',
    title: 'MedTraceAI: Real-Time Clinical Deterioration Prediction',
    problem: 'Clinical deterioration indicators are often fragmented across EHR streams, delaying escalation and intervention.',
    approach:
      'Built a multimodal temporal modeling platform over vitals, labs, medications, ADT events, and optional clinical notes with strict patient-time correctness. Compared tabular baselines against LSTM and Temporal Fusion Transformer while adding explainability and audit tracing.',
    result:
      'Delivered low-latency bedside risk scoring with calibration, missingness, and drift monitoring across units using Kafka, FastAPI, Kubernetes, and Terraform.',
    tech: ['PyTorch', 'LSTM', 'Temporal Fusion Transformer', 'SHAP', 'Kafka', 'FastAPI', 'Kubernetes', 'Terraform'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Multimodal AI',
    title: 'SERENITY: Smart Emotion Recognition & Neural Intervention',
    problem:
      'Mental health workflows need affordable, continuous, and context-aware support beyond periodic single-modality assessments.',
    approach:
      'Developed a Raspberry Pi 5 platform combining speech emotion recognition, facial emotion recognition via TFLite, clinical screening workflows (PHQ-9, GAD-7, PCL-5), and empathetic LLM dialogue. Built FastAPI + React architecture with NDJSON streaming, SQLite WAL, and XNNPACK acceleration.',
    result:
      'Enabled real-time multimodal distress monitoring with clinician oversight dashboards and persistent edge deployment through Nginx and systemd.',
    tech: ['FastAPI', 'React (Vite)', 'TFLite', 'LLMs', 'SQLite WAL', 'NDJSON', 'Raspberry Pi 5', 'XNNPACK'],
    github: 'https://github.com/mtahaarif/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-',
  },
  {
    tag: '3D Vision',
    title: '3D Environment Reconstruction from Multi-View Images',
    problem:
      'Robotics and AR/VR applications require geometrically consistent 3D scene understanding from 2D observations.',
    approach:
      'Implemented feature detection and matching (SIFT, ORB, SURF), estimated fundamental/essential matrices, recovered camera pose, and performed stereo triangulation for sparse and dense point cloud generation.',
    result:
      'Produced calibrated and refined 3D reconstructions suitable for spatial mapping, navigation, and scene analysis tasks.',
    tech: ['OpenCV', 'SIFT', 'ORB', 'SURF', 'Epipolar Geometry', 'Stereo Triangulation', 'Point Clouds'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Pose Analytics',
    title: 'Human Pose Estimation and Classification',
    problem:
      'Reliable pose classification needs robust keypoint extraction across modern deep-learning and classical CV pipelines.',
    approach:
      'Designed two pipelines on MPII: MediaPipe-based keypoint extraction and a from-scratch contour/skeletonization pipeline. Engineered angle-based and structural features and trained SVM/Random Forest classifiers for activity labels.',
    result:
      'Delivered quantitative comparison using PCKh@0.5, skeleton completeness, symmetry metrics, and anatomical plausibility scores.',
    tech: ['MediaPipe', 'OpenCV', 'SVM', 'Random Forest', 'Feature Engineering', 'MPII Dataset'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Autonomous Vision',
    title: 'Real-Time Image Analysis for Self-Driving Capabilities',
    problem:
      'Resource-constrained autonomous systems need dependable lane and obstacle perception without heavy deep learning stacks.',
    approach:
      'Built a frame-by-frame classical CV pipeline in OpenCV/NumPy for lane highlighting, HSV obstacle segmentation, and rule-based directional planning on Raspberry Pi 5 with Pi Camera.',
    result:
      'Achieved real-time lane-obstacle awareness and movement decision support using deterministic on-device processing.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Canny', 'Morphological Ops', 'HSV Segmentation', 'Raspberry Pi 5'],
    github: 'https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities',
  },
  {
    tag: 'Audio Intelligence',
    title: 'Audio Classification Using Neural Networks',
    problem: 'Automated acoustic monitoring requires robust classification across speech, music, and environmental noise.',
    approach:
      'Combined DSP preprocessing (MATLAB filtering and normalization) with Librosa feature extraction (MFCC, ZCR, RMS, pitch) and a TensorFlow/Keras MLP classifier.',
    result:
      'Reached 98.85% training accuracy and 94.35% test accuracy, then deployed inference and spectrogram visualization through a Flask web interface.',
    tech: ['TensorFlow', 'Keras', 'Librosa', 'MATLAB', 'Flask', 'DSP', 'MUSAN Dataset'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Medical Imaging',
    title: 'Lung & Colon Cancer Histopathology Classification',
    problem: 'Histopathological diagnosis support requires high-precision image classification across multiple tissue classes.',
    approach:
      'Designed and tuned a CNN architecture with dropout and max-pooling regularization for 5-class cancer tissue categorization.',
    result: 'Achieved 98.6% validation accuracy with stable convergence and reproducible training performance.',
    tech: ['PyTorch', 'CNN', 'Medical Imaging', 'Data Augmentation', 'Classification'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Medical Imaging',
    title: 'White Blood Cell Analysis & Classification (DIP)',
    problem:
      'WBC subtype identification requires robust nucleus extraction and discriminative handcrafted features under noisy microscopy data.',
    approach:
      'Implemented a notebook pipeline with Butterworth high-pass filtering, histogram equalization, custom connected-component analysis, and feature fusion using LBP/HOG plus nucleus geometry.',
    result: 'Produced an end-to-end 5-class WBC classifier with interpretable feature engineering and 66% test accuracy.',
    tech: ['OpenCV', 'NumPy', 'LBP', 'HOG', 'Connected Components', 'Feature Engineering'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Tabular ML',
    title: 'Santander Customer Transaction Prediction',
    problem:
      'Rare-event transaction prediction in high-dimensional anonymized financial data demands robust validation and model explainability.',
    approach:
      'Built a full ML pipeline with logistic regression baseline, Random Forest/XGBoost/LightGBM experiments, cross-validation, and hyperparameter tuning for ROC-AUC optimization.',
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
    approach:
      'Architected a bespoke CMS with drag-and-drop administration, optimistic UI updates, real-time MySQL sync, and hybrid Vercel Blob + Git CDN asset strategy.',
    result:
      'Reduced content update turnaround by 90% and sustained high-performance SSR delivery under a sub-100kB initial load target.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'MySQL', 'JWT', 'Vercel Blob', 'SSR'],
    github: 'https://github.com/mtahaarif/hainescitydental',
  },
  {
    tag: 'Desktop Search',
    title: 'Search Engine Desktop Application (Data Structures)',
    problem: 'Large local text repositories need fast indexing and boolean retrieval beyond basic filename search.',
    approach:
      'Implemented a custom indexing engine using Trie structures, document metadata objects, and graph-linked document relationships. Added boolean query support, ranking by term frequency, and result caching.',
    result: 'Delivered fast local document retrieval with a Qt-based desktop interface for practical search navigation.',
    tech: ['C++', 'Qt Creator', 'Trie', 'Graph Data Structures', 'Boolean Retrieval'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Systems Programming',
    title: '"Gameboy" Multi-Game Launcher',
    problem: 'Real-time mini-games required responsive rendering and deterministic game mechanics in a low-level C++ environment.',
    approach:
      'Developed an SFML-based launcher with console buffer manipulation, custom Tetris rotation logic, and Flappy Bird physics simulation.',
    result: 'Created a performant multi-game platform demonstrating algorithmic control, rendering optimization, and gameplay state management.',
    tech: ['C++', 'SFML', 'Console Buffer', 'Game Physics', 'Matrix Algorithms'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Concurrency',
    title: 'Comprehensive OS Scheduler & Disk Simulator',
    problem: 'Teaching and analyzing scheduling algorithms is difficult without interactive execution and timeline visualization.',
    approach:
      'Built a Java simulator for Round Robin and EDF CPU scheduling plus SCAN/C-SCAN disk scheduling. Used SwingWorker-based multithreading to keep UI responsive during concurrent simulations.',
    result: 'Produced a full-stack educational simulator with dynamic Gantt chart visualization and deterministic scheduling comparison.',
    tech: ['Java', 'Swing', 'SwingWorker', 'Concurrency', 'Scheduling Algorithms'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Database Engineering',
    title: 'Industrial Database Management System',
    problem: 'Manufacturing operations at scale require structured data governance, auditable workflows, and maintainable schema design.',
    approach:
      'Designed an EER-based data model with subtype hierarchies for production lines and materials, then implemented SQL-backed CRUD workflows through an admin dashboard.',
    result:
      'Delivered a scalable database system for operations, maintenance, and production management with secure administrative access.',
    tech: ['SQL', 'Database Design', 'EER Modeling', 'CRUD Systems', 'Admin Dashboards'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'OOP Simulation',
    title: 'Object-Oriented Airport Traffic Simulation',
    problem: 'Procedural simulation models increase maintenance cost and limit extensibility in airport surface traffic control studies.',
    approach:
      'Implemented a task-driven, message-based simulation engine in OOP style with airplane, network, clock, and shortest-path abstractions using priority-queue scheduling.',
    result:
      'Improved modularity and maintainability while accurately modeling airport surface traffic task execution and routing behavior.',
    tech: ['Object-Oriented Design', 'Simulation', 'Priority Queues', 'Path Planning', 'Java/C++'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Network Engineering',
    title: 'IPv6 WAN Design & Inter-VLAN Routing',
    problem: 'Enterprise-scale network labs require segmented, routable, and future-ready architectures for secure communication.',
    approach:
      'Designed an IPv6 WAN in Cisco Packet Tracer using Router-on-a-Stick for inter-VLAN routing and OSPFv3 for dynamic route propagation across routers and switches.',
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
    approach:
      'Implemented a processor-less Verilog game engine with VGA timing (640x480@60Hz), BRAM-backed snake memory, LFSR-based randomness, finite-state control, and Manhattan-distance ghost AI.',
    result: 'Delivered a fully hardware-driven game with advanced mechanics including bombs, poison apples, and shed-skin obstacle generation.',
    tech: ['Verilog HDL', 'FPGA', 'BRAM', 'VGA', 'FSM', 'LFSR'],
    github: 'https://github.com/mtahaarif/FPGA-Implementation-of-Advanced-Snake-Game-with-AI',
  },
  {
    tag: 'IoT Robotics',
    title: 'Remote Weather Detection IoT Car',
    problem: 'Traditional weather stations are static and expensive for targeted environmental data collection in remote zones.',
    approach:
      'Integrated Arduino, ESP32-CAM, DHT22/BH1750 sensors, LoRa telemetry, and motor control for remote vehicle navigation plus wireless weather packet transmission.',
    result: 'Created a mobile IoT station capable of real-time environmental monitoring and web-based remote control.',
    tech: ['ESP32-CAM', 'Arduino', 'LoRa', 'DHT22', 'BH1750', 'L298N', 'IoT'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Security IoT',
    title: 'Autonomous Robo Cop (Security & IoT)',
    problem: 'Security patrol units need affordable autonomous sensing for intrusion and hazard response in constrained settings.',
    approach:
      'Designed an ESP32-based mobile security unit integrating PIR motion sensing for intruder alerts and IR-based fire-response automation.',
    result: 'Delivered a proof-of-concept autonomous security rover with integrated sensing and alert-driven behavior.',
    tech: ['ESP32', 'PIR Sensors', 'IR Sensors', 'Embedded Control', 'IoT'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Digital Logic',
    title: 'Smart Car Parking Fare Generator',
    problem: 'Fixed parking fees create billing inequity and require automation for accurate time-based fare calculation.',
    approach:
      'Engineered a digital logic pipeline with proximity sensing, asynchronous timing, ripple counters, ALU-style computation, and BCD-to-7-segment display conversion.',
    result: 'Implemented deterministic hardware fare computation tied directly to parking duration intervals and configurable rates.',
    tech: ['Digital Logic', '555 Timer', '7493 Counters', 'ALU Design', 'BCD Display', 'Verilog'],
    github: 'https://github.com/mtahaarif',
  },
  {
    tag: 'Processor Design',
    title: 'Custom 16-bit Instruction Set Processor',
    problem: 'Understanding computer architecture requires end-to-end implementation of datapath, control logic, and instruction semantics.',
    approach:
      'Built a Harvard-architecture 16-bit processor with register file, ALU, dedicated instruction/data memories, and conditional instruction support based on status flags.',
    result: 'Delivered a functioning custom ISA processor in Verilog with simulation, branching logic, and flag-driven execution support.',
    tech: ['Verilog HDL', 'Harvard Architecture', 'ALU', 'Control Unit', 'ISA Design', 'FPGA'],
    github: 'https://github.com/mtahaarif/Custom-16-Bit-Processor',
  },
];

export const cmsDefaults: PortfolioCMSData = {
  profile: {
    name: 'Muhammad Taha',
    title: 'AI/ML Engineer | Computer Vision | Multimodal AI | ML Systems | PyTorch · OpenCV · LLMs · Edge AI',
    positioning: 'Computer Vision · Multimodal AI · ML Systems · Edge AI',
    headline: 'AI/ML Engineer building production-grade computer vision and multimodal ML systems',
    summary:
      'AI/ML Engineer with hands-on experience delivering real-time computer vision, multimodal AI, and end-to-end ML systems from research to deployment. Specialized in biometric anti-spoofing, clinical risk modeling, edge inference, explainable machine learning, and production APIs. Proven ability to design reliable pipelines across PyTorch, OpenCV, FastAPI, and cloud-native infrastructure for measurable business and operational impact.',
    about:
      'I combine strong software engineering fundamentals with AI systems thinking to build practical, high-impact products. My work spans clinical AI platforms, edge-first multimodal assistants, enterprise web systems, and hardware-aware deployments on FPGA, Raspberry Pi, and ESP32. I focus on interpretable models, robust data pipelines, and maintainable architectures that teams can ship, monitor, and scale.',
    email: 'ch.tahaarif2005@gmail.com',
    phone: '+92 317 5434059',
    location: 'Islamabad, Pakistan',
    linkedIn: 'https://linkedin.com/in/muhammad-taha-21a163256',
    github: 'https://github.com/mtahaarif',
  },
  proofPoints: [
    { value: '21+', label: 'Projects Delivered' },
    { value: 'Clinical + Edge', label: 'AI Deployments' },
    { value: 'CV Intern', label: 'TruID Technologies' },
    { value: 'PyTorch/OpenCV', label: 'Production Stack' },
  ],
  experiences: [
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
  ],
  projectCategories: [
    {
      id: 'ai-computer-vision',
      title: 'AI & Computer Vision',
      subtitle: 'Clinical AI, multimodal modeling, deep learning, and real-time vision systems',
      iconKey: 'brain',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      projects: aiAndComputerVisionProjects,
    },
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      subtitle: 'Full-stack products, algorithms, concurrency, simulation, databases, and networks',
      iconKey: 'code2',
      iconBg: 'bg-cyan-600/20',
      iconColor: 'text-cyan-400',
      projects: softwareEngineeringProjects,
    },
    {
      id: 'hardware-fpga',
      title: 'Hardware & FPGA',
      subtitle: 'Embedded systems, digital logic, processor design, and hardware acceleration',
      iconKey: 'cpu',
      iconBg: 'bg-emerald-600/20',
      iconColor: 'text-emerald-400',
      projects: hardwareAndFpgaProjects,
    },
  ],
  skillGroups: [
    {
      title: 'Computer Vision',
      iconKey: 'eye',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      skills: ['OpenCV', 'YOLO', 'MediaPipe', 'Optical Flow', 'Face Anti-Spoofing', '3D Reconstruction', 'Image Processing'],
    },
    {
      title: 'AI / Deep Learning',
      iconKey: 'brain',
      iconBg: 'bg-indigo-600/20',
      iconColor: 'text-indigo-400',
      skills: ['PyTorch', 'TensorFlow', 'CNNs', 'BiLSTM', 'Attention', 'LLMs', 'RAG', 'LoRA', 'LSTM', 'Temporal Fusion Transformer', 'XGBoost', 'LightGBM', 'SHAP'],
    },
    {
      title: 'ML Infrastructure',
      iconKey: 'server',
      iconBg: 'bg-emerald-600/20',
      iconColor: 'text-emerald-400',
      skills: ['FastAPI', 'Docker', 'Kubernetes', 'Terraform', 'Kafka', 'Git', 'Linux', 'CI/CD'],
    },
    {
      title: 'Software Engineering',
      iconKey: 'code2',
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-400',
      skills: ['Python', 'TypeScript', 'C++', 'Java', 'SQL', 'Next.js', 'React', 'Node.js', 'REST APIs', 'MySQL'],
    },
    {
      title: 'Hardware / Embedded',
      iconKey: 'cpu',
      iconBg: 'bg-amber-600/20',
      iconColor: 'text-amber-400',
      skills: ['FPGA (Xilinx)', 'Verilog HDL', 'Raspberry Pi', 'ESP32', 'Arduino', 'Digital Logic'],
    },
  ],
  certifications: [
    { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', link: 'https://www.coursera.org/account/accomplishments/specialization/108CJVFYUFG4' },
    { title: 'Machine Learning Specialization', issuer: 'Stanford Online', link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/CCNSYYU42C28' },
    { title: 'CS50: Programming with Python', issuer: 'Harvard University', link: 'https://certificates.cs50.io/a31f82a1-78d3-417d-9b38-7b58af74cd4c.pdf?size=letter' },
  ],
};
