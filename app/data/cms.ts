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
  date: string;
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

const GH = 'https://github.com/mtahaarif';

const aiAndComputerVisionProjects: Project[] = [
  {
    tag: 'Clinical AI',
    title: 'MedTraceAI: Clinical Deterioration Prediction',
    problem:
      'Standard bedside early-warning scores like NEWS2 are temporally blind — they score a single snapshot with fixed thresholds, reaching only 0.72–0.78 AUROC and firing too late to prevent an ICU transfer.',
    approach:
      'Built an out-of-core pipeline in Polars over 40GB+ of MIMIC-IV / MIMIC-IV-ED, normalising 37M+ chart rows into OMOP-standardised event triplets keyed on LOINC concept IDs so the representation is hospital-agnostic and variable-length. Trained a dual-branch model — 192-feature XGBoost alongside a custom Clinical Event Transformer (CETv3) with focal loss and OneCycleLR — tuned across a 300-trial Optuna search and combined in an isotonic-calibrated stacking ensemble.',
    result:
      'AUROC 0.892, PR-AUC 0.667, Brier 0.051 on a chronologically held-out cohort of 19,248 ED visits — roughly +0.11 to +0.17 AUROC over published NEWS2 — predicting ICU transfer 6 hours ahead using only data from 18–6h before the event. TreeExplainer SHAP throughout for clinical auditability.',
    tech: ['Polars', 'XGBoost', 'PyTorch', 'Transformers', 'Optuna', 'SHAP', 'MIMIC-IV', 'OMOP'],
    github: `${GH}/MedTraceAI-Real-Time-Clinical-Deterioration-Prediction-with-Temporal-EHR-Modeling`,
  },
  {
    tag: 'Multimodal AI',
    title: 'SERENITY: Multimodal Mental-Health AI System',
    problem:
      'Digital mental-health tools fail on one of two axes: free-form chatbots offer empathy with no clinical structure, while form-heavy trackers offer structure with no engagement — and neither is auditable.',
    approach:
      'Architected a privacy-first edge–cloud split: Whisper STT, INT8/NF4-quantised ResNet-18 facial emotion and CNN-BiLSTM speech emotion models run locally on a Raspberry Pi 5, while generation streams over SSE to a Qwen 2.5 backend on AWS EC2. A deterministic FSM router — not the LLM — computes therapeutic framework, lock, and risk level before any prompt is built, backed by a FAISS RAG index over CBT/DBT manuals. Every subsystem has an independent fallback path.',
    result:
      '93% FER and 80.6% SER accuracy in a 3.86 MB deployed footprint under 28% peak CPU, with 8–12s end-to-end latency. Ships a React/Vite clinician dashboard with longitudinal PHQ-9 / GAD-7 / PCL-5 tracking, automated SBAR handoff export, and an SOS escalation toolkit.',
    tech: ['FastAPI', 'PyTorch', 'TFLite', 'FAISS', 'Qwen 2.5', 'React (Vite)', 'AWS EC2', 'Raspberry Pi 5'],
    github: `${GH}/Smart-Emotion-Recognition-and-Neural-Intervention-Technology-SERENITY-`,
  },
  {
    tag: 'Biometrics Security',
    title: 'Biometric Anti-Spoofing & Document Fraud Detection',
    problem:
      'KYC onboarding pipelines need to reject presentation attacks, digitally tampered ID documents, and forged signatures before an identity is ever trusted.',
    approach:
      'Built four MobileNetV2-backed vision models covering the full verification flow. Applied CLAHE histogram equalisation and Gaussian unsharp masking to surface the micro-textures that separate a live capture from a screen recapture. For tamper localisation, engineered a Feature Pyramid Network with Convolutional Block Attention (CBAM) fusing four feature scales. Signature verification uses a Siamese triplet network with custom hard-negative mining over L2-normalised 256-d embeddings.',
    result:
      '98.9% face liveness (7,330 test samples), 99.5% hand liveness (3,567 samples), 93.8% tamper detection against a 1:5 class imbalance (0.97 precision on genuine documents), and 92.7% signature verification across 5,000 pairs — all profiled to ≤31 ms batch step times for production deployment.',
    tech: ['TensorFlow', 'MobileNetV2', 'FPN + CBAM', 'Triplet Loss', 'CLAHE', 'OpenCV', 'EER / ROC'],
    github: `${GH}/Biometrics-Anti-Spoofing-Identity-Signature-Verification`,
  },
  {
    tag: '3D Vision',
    title: '3D Environment Reconstruction from Multi-View Images',
    problem:
      'Turning a set of 2D photographs into geometrically consistent, photorealistic 3D scenes requires solving correspondence, pose, and depth from scratch rather than calling an off-the-shelf reconstruction tool.',
    approach:
      'Implemented the full classical pipeline by hand on the DTU benchmark: SIFT extraction, FLANN matching with Lowe ratio filtering, RANSAC geometric verification, and two-view triangulation into a sparse cloud. Densified it with hand-written plane-sweep Multi-View Stereo — per-pixel depth hypotheses scored by illumination-invariant NCC across neighbouring views with multi-view confirmation — then used that cloud to initialise a 3D Gaussian Splatting model trained in PyTorch.',
    result:
      'Densified to 130,000+ points and converged to ~25 dB PSNR with an optimised 3DGS densification loop (clone, split, prune), producing photorealistic novel-view synthesis from calibrated multi-view input.',
    tech: ['OpenCV', 'PyTorch', 'SIFT', 'FLANN + RANSAC', 'Plane-Sweep MVS', 'NCC', '3D Gaussian Splatting', 'Open3D'],
    github: `${GH}/3D-Environment-Reconstruction-from-Multi-View-Image`,
  },
  {
    tag: 'Speech AI',
    title: 'Robust Speech Emotion Recognition',
    problem:
      'Speech emotion models trained on a single corpus overfit to one recording setup, actor pool, and accent — then collapse on real-world audio.',
    approach:
      'Aggregated 46,273 utterances across nine separate public corpora spanning acted, elicited, and naturalistic speech, normalising every labelling scheme into a shared 7-class taxonomy. Trained a hybrid CNN → bidirectional LSTM → multi-head attention network on the combined super-corpus, then exported to TensorFlow Lite with dynamic-range quantisation.',
    result:
      '80.61% test accuracy across 7 emotion classes, with the quantised 3.86 MB TFLite build holding 80.56% — a 0.05% loss for on-device inference. This model is the speech branch now running inside SERENITY.',
    tech: ['TensorFlow', 'Keras', 'CNN-BiLSTM', 'Multi-Head Attention', 'Librosa', 'TFLite', 'Edge AI'],
    github: `${GH}/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-`,
  },
  {
    tag: 'Tabular ML',
    title: 'Santander Customer Transaction Prediction',
    problem:
      'Predicting a rare transaction event from 200 anonymised features across 200,000 customers, with a 10% positive class and almost no feature interaction to exploit.',
    approach:
      'Benchmarked six model families head-to-head, then ran an exhaustive top-k gain-importance sweep across all 200 variables to select 180. Tuned the LightGBM champion with Optuna Bayesian search and optimised the decision threshold to 0.6744 against the precision/recall curve rather than the naive 0.5. Interpreted with SHAP and permutation importance.',
    result:
      '0.89693 public / 0.89412 private leaderboard ROC-AUC against an 0.8597 logistic-regression baseline, with every artifact — model, scaler, feature list, reproducibility manifest — persisted for a clean rerun.',
    tech: ['LightGBM', 'XGBoost', 'Optuna', 'SHAP', 'Scikit-learn', 'Feature Selection'],
    github: `${GH}/Santander-Customer-Transaction-Prediction`,
  },
  {
    tag: 'Pose Analytics',
    title: 'Human Pose Estimation & Classification',
    problem:
      'Deep-learning pose estimators are treated as a black box — it is rarely shown where they actually beat a classical pipeline, or where detection rate diverges from localisation accuracy.',
    approach:
      'Ran a three-way comparative study on the MPII dataset: MediaPipe landmarks mapped down to the 16 MPII joints, a from-scratch contour and skeletonisation pipeline, and a downstream activity classifier built on 53 scale-invariant features from both keypoint sources.',
    result:
      'Quantified the gap using PCKh@0.5 alongside skeleton completeness, symmetry, and anatomical plausibility — demonstrating that a high detection rate does not imply accurate localisation, which is precisely why PCKh is the correct primary metric.',
    tech: ['MediaPipe', 'OpenCV', 'Scikit-learn', 'SVM', 'Random Forest', 'PCKh', 'MPII'],
    github: `${GH}/Human-Pose-Estimation-and-Classification`,
  },
  {
    tag: 'Medical Imaging',
    title: 'White Blood Cell Analysis & Classification',
    problem:
      'Classifying five white blood cell subtypes from microscopy without deep learning, where the discriminative signal lives in nucleus shape and texture rather than learned features.',
    approach:
      'Built the entire pipeline from classical primitives: Butterworth high-pass filtering, histogram equalisation, global thresholding, and a custom 8-connectivity connected-component analysis to isolate the nucleus — then fused Local Binary Pattern texture, Histogram of Oriented Gradients, and nucleus geometry into a single feature vector for an SVM classifier.',
    result:
      'An end-to-end interpretable 5-class classifier where every feature has a stated physical meaning, evaluated with per-class precision, recall, F1, and confusion matrices on a held-out test set.',
    tech: ['OpenCV', 'NumPy', 'Scikit-learn', 'LBP', 'HOG', 'SVM', 'Connected Components'],
    github: `${GH}/White-Blood-Cell-Analysis-Classification`,
  },
  {
    tag: 'Audio Intelligence',
    title: 'Audio Classification: Speech, Music & Noise',
    problem:
      'Automated acoustic monitoring needs to separate speech, music, and environmental noise from short clips without a heavyweight model.',
    approach:
      'Combined classical DSP preprocessing with 17 hand-engineered acoustic features — MFCCs, pitch, zero-crossing rate, RMS, and short-time energy extracted via Librosa — feeding a compact TensorFlow/Keras MLP. Shipped a command-line inference path that takes a single .wav and returns class probabilities.',
    result:
      'A working three-class classifier over a 3,100-clip feature dataset, with a reusable feature-extraction module that turns any directory of audio into a training-ready CSV.',
    tech: ['TensorFlow', 'Keras', 'Librosa', 'SciPy', 'MFCC', 'DSP'],
    github: `${GH}/Audio-Classification-System`,
  },
  {
    tag: 'Autonomous Vision',
    title: 'Real-Time Lane & Obstacle Perception',
    problem:
      'Prototyping the perception and decision layer of a driving assistant using only deterministic classical vision, with no learned model in the loop.',
    approach:
      'Built a frame-by-frame OpenCV/NumPy pipeline performing Canny edge extraction for lane region highlighting, contour-based obstacle detection, and a rule-based directional planner that steers a simulated agent through the detected free space.',
    result:
      'A live annotated video pipeline rendering the drivable lane overlay, obstacle boxes, and agent position in real time — an interpretable baseline that makes the case for where learned perception becomes necessary.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Canny', 'Contour Detection', 'Rule-Based Planning'],
    github: `${GH}/Real-Time-Image-Analysis-for-Self-Driving-Capabilities`,
  },
  {
    tag: 'Biomedical DSP',
    title: 'ECG Denoising with Classical & Adaptive Filtering',
    problem:
      'Removing powerline interference, baseline wander, and EMG noise from real ECG recordings without distorting the QRS morphology that carries the diagnosis.',
    approach:
      'Implemented and benchmarked three strategies in MATLAB on MIT-BIH records: a cascaded Butterworth notch / high-pass / low-pass IIR chain, an LMS adaptive filter, and a normalised NLMS variant whose step size self-adjusts to input energy.',
    result:
      'Quantified each method by SNR improvement and RMSE alongside time-domain, FFT, and spectrogram comparisons, with NLMS delivering the best noise suppression while preserving P-QRS-T structure.',
    tech: ['MATLAB', 'DSP', 'Butterworth IIR', 'LMS / NLMS', 'Spectrogram Analysis', 'MIT-BIH'],
    github: `${GH}/ECG-Signal-Denoising-using-Classical-and-Adaptive-Filtering`,
  },
];

const softwareEngineeringProjects: Project[] = [
  {
    tag: 'Production Platform',
    title: 'Dental Practice Platform & Custom Headless CMS',
    problem:
      'A live dental practice was locked into a legacy site where every content change required a developer, and staff had no way to publish news, team, or service updates themselves.',
    approach:
      'Architected a bespoke headless CMS on Next.js 14 and TypeScript with a dual-database backend — Prisma over PostgreSQL for structured doctor records alongside MySQL for editorial content — plus JWT-secured admin APIs, hybrid Vercel Blob storage for media, ISR revalidation, and SMTP appointment routing. Wrote the migration scripts that moved all legacy content across.',
    result:
      'Cut content update turnaround by 90% — from 30+ minutes to under 2 — while holding sub-100kB initial loads through SSR and aggressive caching. Running in production for a paying practice.',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'MySQL', 'JWT', 'Vercel Blob', 'ISR'],
    github: `${GH}/hainescitydental`,
  },
  {
    tag: 'Client Delivery',
    title: 'Benevolence Home Services',
    problem:
      'A home-care and staffing agency needed a fast, accessible, search-visible site across nine distinct service lines without taking on the cost and latency of a hosted CMS.',
    approach:
      'Built a Next.js 16 / React 19 application on a custom TypeScript "Zero-CMS" local data engine, using generateStaticParams to pre-render every service and blog route at build time. Layered on an automated JSON-LD schema strategy and a custom content parser that renders legacy markup without unsafe DOM injection.',
    result:
      'A fully static, zero-database-latency site spanning nine service pages, a slug-routed blog, careers, and service-area coverage — with secure serverless contact and scheduling flows via Resend and Google Sheets.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'JSON-LD', 'Resend', 'Serverless APIs'],
    github: `${GH}/Benevolence-Home-Services`,
  },
  {
    tag: 'Client Delivery',
    title: 'Glorious Home Care Assistance',
    problem:
      'A Bay Area home-care provider needed per-service and per-city landing pages at scale, without hand-maintaining dozens of near-duplicate routes.',
    approach:
      'Modelled the entire offering as a typed content layer, then drove it through two dynamic routes — services/[service] and locations/[city] — so every service and service-area page generates from structured data. Built a reusable icon system, locations directory, and reviews carousel on top of the same model.',
    result:
      'A programmatic-SEO site where adding a new city or service is a data edit rather than a new page, backed by a conversion-oriented referral-partner and request-care flow.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Programmatic SEO', 'Dynamic Routing'],
    github: `${GH}/Glorious-Home-Care-Assistance-`,
  },
  {
    tag: 'Client Delivery',
    title: 'A&T Nexus: B2B Digital Transformation Platform',
    problem:
      'A consulting and operations-support business needed a marketing site that communicated a complex B2B service offering without reading as another templated agency page.',
    approach:
      'Built a responsive Next.js / React 19 platform using Framer Motion for cinematic scroll storytelling and a custom reveal-on-scroll hook, decomposed into reusable section components. Engineered validated serverless API routes wiring contact and newsletter submissions into Resend and WhatsApp lead-capture workflows.',
    result:
      'A lightweight, SEO-ready site meeting strict WCAG accessibility requirements, with automated lead capture replacing manual follow-up.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'Framer Motion', 'Resend', 'WCAG', 'Serverless APIs'],
    github: `${GH}/A-T-Nexus-`,
  },
  {
    tag: 'Data Structures',
    title: 'Search Engine Desktop Application',
    problem:
      'Searching a local corpus of text documents needs real prefix and boolean retrieval, not the substring filename matching the OS provides.',
    approach:
      'Implemented a hand-written Trie index from scratch in C++17 — no external search library — supporting boolean AND/OR and prefix queries, wrapped in a Qt Widgets interface with paginated results, contextual snippets, and a full-document reading view.',
    result:
      'A responsive desktop search tool over a local document corpus, built to make the index structure itself the visible engineering artifact.',
    tech: ['C++17', 'Qt Widgets', 'Trie', 'Boolean Retrieval', 'Data Structures'],
    github: `${GH}/Search-Engine-Desktop-Application`,
  },
  {
    tag: 'Systems Simulation',
    title: 'OS CPU & Disk Scheduling Simulator',
    problem:
      'Scheduling algorithms are hard to reason about from pseudocode alone — the trade-offs only become legible when you can watch the timeline.',
    approach:
      'Built a Java Swing simulator covering classic CPU scheduling, real-time scheduling, and disk head scheduling in one tool, with live Gantt charts, progress bars, and XY plots rendering execution as it happens.',
    result:
      'An interactive teaching tool spanning three algorithm families across 13 classes, letting turnaround, waiting time, and seek distance be compared directly across policies.',
    tech: ['Java', 'Swing', 'Scheduling Algorithms', 'Real-Time Systems', 'Data Visualisation'],
    github: `${GH}/OS-CPU-Disk-Scheduling-Simulator`,
  },
  {
    tag: 'Database Engineering',
    title: 'Industrial Database Management System',
    problem:
      'A wire and cable manufacturer tracked employees, factories, suppliers, materials, and six distinct production processes across disconnected records with no consistent schema.',
    approach:
      'Designed a normalised relational schema from an EER model, using a supertype/subtype category structure to represent production processes and material types, then exposed it through a Flask application with form-driven CRUD and specialised combined views that join each parent table to its subtype children.',
    result:
      'A working operations system that lets non-technical staff manage manufacturing records without writing SQL, with the subtype hierarchy preserved end to end.',
    tech: ['Flask', 'Python', 'SQL Server', 'EER Modelling', 'Normalisation', 'Jinja2'],
    github: `${GH}/Industrial-Database-Management-System`,
  },
  {
    tag: 'OOP Design',
    title: 'Airport Surface Traffic Control Simulation',
    problem:
      'Modelling aircraft ground movement — gates, taxiways, runways, and the conflicts between them — demands a domain model that stays maintainable as rules accumulate.',
    approach:
      'Built a task-driven simulation engine across 14 Java classes, separating the airport ground network graph, shortest-path routing, an aircraft scheduler with a custom priority comparator, and a discrete task execution engine, using inheritance where the domain genuinely called for it.',
    result:
      'A modular ASTC simulation where new aircraft behaviours or routing rules extend the existing hierarchy rather than modifying it.',
    tech: ['Java', 'OOP Design', 'Graph Algorithms', 'Priority Queues', 'Discrete Simulation'],
    github: `${GH}/Object-Oriented-Java-Airport-Traffic-Simulation`,
  },
  {
    tag: 'Network Engineering',
    title: 'IPv6 WAN Design & OSPFv3 Routing',
    problem:
      'IPv4 exhaustion forces new WAN designs onto IPv6, which changes addressing, neighbour discovery, and the routing protocol itself.',
    approach:
      'Designed and configured a pure-IPv6 wide-area network in Cisco Packet Tracer with no IPv4 on any interface, using OSPFv3 for dynamic route propagation across multiple routers and sites.',
    result:
      'Verified end-to-end reachability between all end devices over IPv6 only, documented with full topology, per-router configuration, and ping verification.',
    tech: ['IPv6', 'OSPFv3', 'Cisco Packet Tracer', 'WAN Design', 'Dynamic Routing'],
    github: `${GH}/IPv6-WAN-Design-Inter-OSPFv3-Routing`,
  },
  {
    tag: 'Systems Programming',
    title: 'Multi-Game Launcher & Management System',
    problem:
      'Building several real-time games behind one launcher in C++ means handling rendering, input, physics, and persistence without an engine.',
    approach:
      'Developed an SFML-based graphical launcher fronting four modules — Tic-Tac-Toe, Flappy Bird, Tetris, and a file-persisted shop management system — driving the ASCII games through direct Windows console buffer manipulation for flicker-free rendering.',
    result:
      'A single integrated platform combining custom Tetris rotation logic, Flappy Bird physics, and inheritance-based persistence for the management module.',
    tech: ['C++', 'SFML', 'Win32 Console API', 'Game Physics', 'File I/O', 'OOP'],
    github: `${GH}/C-Multi-Game-Launcher-Management-System-`,
  },
];

const hardwareAndFpgaProjects: Project[] = [
  {
    tag: 'FPGA Design',
    title: 'FPGA Snake Game with Hardware AI',
    problem:
      'Implementing a complete real-time game with no CPU, no instruction memory, and no software anywhere — every rule has to exist as synchronous logic.',
    approach:
      'Designed a processor-less Verilog game engine driving VGA directly at 640×480@60Hz, with BRAM-backed snake body memory, LFSR-based apple and bomb spawning, finite-state game control, and an autonomous Ghost AI hunter implemented as a Manhattan-distance pursuit FSM in hardware.',
    result:
      'A fully hardware-driven game with advanced mechanics — bombs, poison apples, level progression, and shed-skin obstacles — where the opponent AI is combinational and sequential logic rather than code.',
    tech: ['Verilog HDL', 'Xilinx FPGA', 'VGA Timing', 'FSM Design', 'BRAM', 'LFSR'],
    github: `${GH}/FPGA-Implementation-of-Advanced-Snake-Game-with-AI`,
  },
  {
    tag: 'Processor Design',
    title: 'Custom 16-Bit Harvard Processor',
    problem:
      'Understanding computer architecture properly means designing the instruction set itself, not reimplementing a textbook MIPS datapath.',
    approach:
      'Built a 16-bit Harvard-architecture processor in Verilog with an original MIPS-inspired ISA spanning R, I, and J instruction formats, an 8-register file, a combined ALU/register datapath, ROM instruction memory, an 8-bit program counter, and a status register enabling condition-flag-driven conditional execution.',
    result:
      'A working custom-ISA processor executing hand-assembled programs in simulation, with branching and flag-driven conditional execution verified against the instruction specification.',
    tech: ['Verilog HDL', 'Harvard Architecture', 'ISA Design', 'ALU', 'Control Unit', 'Datapath'],
    github: `${GH}/Custom-16-Bit-Harvard-Processor-in-Verilog-HDL`,
  },
  {
    tag: 'Autonomous Robotics',
    title: 'Autonomous Security & Fire-Safety Robot',
    problem:
      'Small facilities need affordable autonomous patrol that can detect both intrusion and fire hazards, and act rather than merely log.',
    approach:
      'Designed an ESP32-based mobile security unit fusing PIR motion sensing for intruder detection with IR flame sensing for fire response, paired with a Wi-Fi remote-controlled companion car for manual override and inspection.',
    result:
      'A working autonomous patrol rover with alert-driven behaviour, documented end to end with bill of materials, wiring, and system architecture.',
    tech: ['ESP32', 'Embedded C++', 'PIR Sensors', 'IR Flame Sensing', 'Motor Control', 'Wi-Fi'],
    github: `${GH}/Autonomous-ESP32-Security-Fire-Safety-Robot`,
  },
  {
    tag: 'IoT Systems',
    title: 'Remote Weather Detection IoT Car',
    problem:
      'Wi-Fi-tethered mobile sensing stops working exactly where remote environmental monitoring becomes useful — past the edge of the network.',
    approach:
      'Built a Wi-Fi access-point-hosted robotic car with a browser control panel and live ESP32-CAM feed, then deliberately decoupled telemetry onto an independent LoRa 433 MHz link so DHT22 temperature/humidity and BH1750 light readings reach a separate base station far beyond Wi-Fi range.',
    result:
      'A mobile weather station where control and telemetry fail independently — driving range is bounded by Wi-Fi, but data keeps arriving over LoRa well past it.',
    tech: ['ESP32-CAM', 'Arduino', 'LoRa 433MHz', 'DHT22', 'BH1750', 'L298N', 'IoT'],
    github: `${GH}/Remote-Weather-Detection-IoT-Car`,
  },
  {
    tag: 'Digital Logic',
    title: 'Smart Car Parking Fare Generator',
    problem:
      'Flat parking fees are inequitable, and metering duration accurately without a microcontroller means building the timing and arithmetic from discrete logic.',
    approach:
      'Engineered a pure IC-level digital system — proximity detection, 555-based asynchronous timing, ripple counters clocking 5-minute intervals, a priority encoder and multiplexer selecting the applicable rate band, and an arithmetic unit driving BCD-to-7-segment fare display.',
    result:
      'A deterministic hardware fare calculator tying charge directly to parked duration, built and demonstrated in hardware with no processor in the design.',
    tech: ['Digital Logic', '555 Timer', 'Ripple Counters', 'Priority Encoder', 'BCD / 7-Segment', 'Proteus'],
    github: `${GH}/Digital-Logic-Smart-Car-Parking-Fare-Generator`,
  },
];

export const cmsDefaults: PortfolioCMSData = {
  profile: {
    name: 'Muhammad Taha',
    title: 'Full Stack AI Engineer | Computer Vision · Multimodal AI · Edge Deployment · Production Web',
    positioning: 'Computer Vision · Multimodal AI · ML Systems · Edge AI · Full-Stack',
    headline: 'Full Stack AI Engineer shipping models from research notebook to production edge device',
    summary:
      'Full Stack AI Engineer and Computer Engineer specialising in end-to-end AI deployment — from neural model optimisation to production web architecture. I build edge-quantised vision models, calibrated clinical prediction systems, RAG reasoning engines, and the low-latency applications that serve them. Recent work spans a 0.892-AUROC ICU deterioration predictor over 40GB of MIMIC-IV, a multimodal mental-health platform running on a Raspberry Pi 5, and a production biometric anti-spoofing suite deployed during an industry internship.',
    about:
      'I care about the distance between a model that works in a notebook and a system somebody can actually depend on — calibration, fallback paths, quantisation budgets, and honest evaluation. My work runs across clinical AI, edge-first multimodal systems, production web platforms for real clients, and hardware down to custom processors in Verilog. I report what fails alongside what works, because a result you cannot trust is not a result.',
    email: 'ch.tahaarif2005@gmail.com',
    phone: '+92 317 5434059',
    location: 'Islamabad, Pakistan',
    linkedIn: 'https://linkedin.com/in/muhammadtaha',
    github: GH,
  },
  proofPoints: [
    { value: '0.892', label: 'AUROC · Clinical Deterioration' },
    { value: '3.86 MB', label: 'Edge Model Footprint' },
    { value: '28', label: 'Projects Shipped' },
    { value: '4', label: 'Production Client Platforms' },
  ],
  experiences: [
    {
      title: 'Full Stack Engineer',
      org: 'A&T Nexus Solutions LLC',
      sub: 'Remote',
      period: 'Aug 2025 – Present',
      bullets: [
        'Engineered a Next.js 16 / React 19 application on a custom TypeScript "Zero-CMS" local data engine with serverless APIs, eliminating database latency entirely from the request path',
        'Architected a dual-database headless CMS on Next.js 14, Prisma, PostgreSQL, and Vercel Blob for a healthcare client, reducing content update time by 90%',
        'Built a responsive React 19 B2B platform with Framer Motion scroll storytelling, automated Resend/WhatsApp lead capture, and strict WCAG accessibility compliance',
        'Delivered four production client platforms end to end — architecture, implementation, SEO schema, and deployment',
      ],
    },
    {
      title: 'Computer Vision Engineer Intern',
      org: 'TruID Technologies PVT. LTD.',
      sub: 'National Science & Technology Park (NSTP), Islamabad',
      period: 'Jul 2025 – Aug 2025',
      bullets: [
        'Fine-tuned MobileNetV2 CNNs for presentation attack detection, reaching 98.9% face liveness across 7,330 test samples and 99.5% hand liveness across 3,567, using CLAHE equalisation and Gaussian unsharp masking to isolate image micro-textures',
        'Engineered an FPN + CBAM architecture with spatial and channel attention for pixel-level ID tamper detection, overcoming a 1:5 class imbalance to hit 93.8% test accuracy at 0.97 precision on genuine documents',
        'Architected a Siamese triplet network with custom hard-negative mining over L2-normalised 256-d MobileNetV2 embeddings, achieving 92.7% signature forgery verification across 5,000 pairs',
        'Profiled all four vision models to ≤31 ms batch execution step times for scalable production deployment',
      ],
    },
  ],
  projectCategories: [
    {
      id: 'ai-computer-vision',
      title: 'AI & Computer Vision',
      subtitle: 'Clinical prediction, multimodal systems, 3D vision, and edge-deployed deep learning',
      iconKey: 'brain',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      projects: aiAndComputerVisionProjects,
    },
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      subtitle: 'Production client platforms, full-stack architecture, algorithms, databases, and networks',
      iconKey: 'code2',
      iconBg: 'bg-cyan-600/20',
      iconColor: 'text-cyan-400',
      projects: softwareEngineeringProjects,
    },
    {
      id: 'hardware-fpga',
      title: 'Hardware & FPGA',
      subtitle: 'Processor design, hardware FSMs, embedded autonomy, and digital logic',
      iconKey: 'cpu',
      iconBg: 'bg-emerald-600/20',
      iconColor: 'text-emerald-400',
      projects: hardwareAndFpgaProjects,
    },
  ],
  skillGroups: [
    {
      title: 'Vision, Audio & Edge AI',
      iconKey: 'eye',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      skills: ['OpenCV', 'YOLOv8', 'MediaPipe', 'ResNet / MobileNet', '3D Gaussian Splatting', 'Librosa', 'Whisper', 'TFLite (INT8/NF4)', 'ONNX', 'Raspberry Pi 5'],
    },
    {
      title: 'Deep Learning, LLMs & MLOps',
      iconKey: 'brain',
      iconBg: 'bg-indigo-600/20',
      iconColor: 'text-indigo-400',
      skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Transformers', 'LLMs (Qwen, Ollama)', 'RAG (FAISS)', 'LoRA Fine-Tuning', 'XGBoost', 'LightGBM', 'Optuna', 'SHAP', 'Polars'],
    },
    {
      title: 'Backend, APIs & Cloud',
      iconKey: 'server',
      iconBg: 'bg-emerald-600/20',
      iconColor: 'text-emerald-400',
      skills: ['FastAPI', 'Flask', 'Node.js', 'REST APIs', 'SSE Token Streaming', 'PostgreSQL', 'MySQL', 'Prisma', 'AWS EC2', 'Vercel'],
    },
    {
      title: 'Frontend & Languages',
      iconKey: 'code2',
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-400',
      skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'SQL', 'MATLAB', 'Next.js 16', 'React 19', 'Tailwind CSS', 'Framer Motion', 'WCAG'],
    },
    {
      title: 'Hardware & Embedded',
      iconKey: 'cpu',
      iconBg: 'bg-amber-600/20',
      iconColor: 'text-amber-400',
      skills: ['Verilog HDL', 'FPGA (Xilinx)', 'ISA Design', 'ESP32', 'Arduino', 'LoRa', 'Digital Logic', 'Bash / Linux', 'Git'],
    },
  ],
  certifications: [
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI',
      date: 'Dec 2025',
      link: 'https://www.coursera.org/account/accomplishments/specialization/108CJVFYUFG4',
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'DeepLearning.AI',
      date: 'Jul 2025',
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/CCNSYYU42C28',
    },
    {
      title: 'AI for Everyone',
      issuer: 'DeepLearning.AI',
      date: 'Jun 2024',
      link: 'https://www.coursera.org/account/accomplishments/verify/DQRNLTNU8F3D',
    },
    {
      title: 'Introduction to Front-End Development',
      issuer: 'Meta',
      date: 'Oct 2023',
      link: 'https://www.coursera.org/account/accomplishments/verify/5W3GG5G4JVNY',
    },
    {
      title: 'CS50P: Programming with Python',
      issuer: "Harvard University",
      date: 'Sep 2023',
      link: 'https://certificates.cs50.io/a31f82a1-78d3-417d-9b38-7b58af74cd4c.pdf?size=letter',
    },
  ],
};
