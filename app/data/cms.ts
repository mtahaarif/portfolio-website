// Single source of truth for every piece of portfolio content.
//
// The shapes below used to be split across data/projects.ts, data/skills.ts,
// data/profile.ts and data/certifications.ts, none of which anything imported.
// They are gone; this file is the only content module left.

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

export interface ExperienceData {
  title: string;
  org: string;
  sub: string | null;
  period: string;
  bullets: string[];
}

export interface CmsProject {
  tag: string;
  title: string;
  description: string;
  github: string;
  /** Path under /public. Rendered as-is — do not prefix it at runtime. */
  image?: string;
  /** Paid client delivery at A&T Nexus Solutions LLC, as opposed to personal work. */
  clientWork?: boolean;
  problem?: string;
  approach?: string;
  result?: string;
  tech?: string[];
}

export interface ProjectCategoryData {
  id: string;
  title: string;
  subtitle: string;
  iconKey: IconKey;
  iconBg: string;
  iconColor: string;
  projects: CmsProject[];
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
  image?: string; 
}

export interface PortfolioCMSData {
  profile: ProfileData;
  experiences: ExperienceData[];
  projectCategories: ProjectCategoryData[];
  skillGroups: SkillGroupData[];
  certifications: CertificationData[];
}

const GH = 'https://github.com/mtahaarif';

/* ─────────────────────────────────────────────────────────────────────────
   MACHINE LEARNING & AI SYSTEMS
   ───────────────────────────────────────────────────────────────────────── */
const machineLearningProjects: CmsProject[] = [
  {
    tag: 'Clinical AI',
    title: 'MedTraceAI: Clinical Deterioration Prediction',
    image: '/medtraceai.png',
    description:
      'Out-of-core Polars pipeline over 40GB+ of MIMIC-IV forecasts ICU transfer 6 hours ahead at 0.892 AUROC, up to +0.17 over published NEWS2.',
    problem:
      'NEWS2 and MEWS bedside scores are temporally blind — a single snapshot against fixed thresholds, 0.72–0.78 published AUROC, firing too late to prevent an ICU transfer.',
    approach:
      'Out-of-core Polars LazyFrame pipeline with predicate pushdown over 40GB+ of MIMIC-IV, streaming 37.1M chart rows and 546,028 admissions into OMOP-standardised event triplets keyed on LOINC concept IDs — hospital-agnostic, no site-specific item codes, no padding artifacts. Dual-branch model: 192 engineered features (NEWS2, shock index, MAP, BUN:creatinine, threshold-crossing counts) alongside a custom Clinical Event Transformer with focal loss, label smoothing, and OneCycleLR, fused by an isotonic-calibrated stacking ensemble on population-aligned out-of-fold predictions. 300-trial Optuna search, 5-fold OOF.',
    result:
      '0.892 AUROC, 0.667 PR-AUC, 0.051 Brier on a chronologically held-out cohort of 19,248 ED visits — +0.11 to +0.17 over published NEWS2 — predicting ICU transfer 6 hours ahead from data 18–6h before the event. TreeExplainer SHAP gives a top-5 feature audit trail per prediction. eICU-CRD zero-shot generalisation is implemented and currently failing at 0.625; root cause diagnosed.',
    tech: ['Polars', 'XGBoost', 'PyTorch', 'Transformers', 'Optuna', 'SHAP', 'MIMIC-IV', 'OMOP'],
    github: `${GH}/MedTraceAI-Real-Time-Clinical-Deterioration-Prediction-with-Temporal-EHR-Modeling`,
  },
  {
    tag: 'Multimodal Edge AI',
    title: 'SERENITY: Multimodal Mental-Health AI System',
    image: '/serenity.png',
    description:
      'A privacy-first mental-health platform running quantised FER/SER/STT on a Raspberry Pi 5, gated by a deterministic clinical safety router.',
    problem:
      'Digital mental-health tools fail on one of two axes: free-form chatbots offer empathy with no clinical structure, form-heavy trackers offer structure with no engagement. Neither is auditable.',
    approach:
      'Privacy-first edge–cloud split. Whisper STT and all biometric perception run locally on a Raspberry Pi 5 — raw audio and video never leave the device — with only lightweight metadata streaming to an EC2-hosted quantised LLM over SSE via a pooled async client with sticky failover and a circuit breaker. Tokens buffer to word boundaries before each SSE frame so downstream TTS never receives partial words. A rule-based router computes risk scores and cognitive-distortion flags with compiled regex, independent of the LLM, and locks generation into CBT, DBT, ACT, or Supportive through a backend-enforced phase state machine. Retrieval runs sparse TF-IDF cosine over 180-word sentence chunks with 30-word overlap carry-back.',
    result:
      'INT8/NF4-quantised ResNet-18 facial emotion at 93.0% and CNN-BiLSTM-Attention speech emotion at 80.6%, exported to a 3.86 MB TFLite build running with XNNPACK acceleration at 785 MB RAM and 27.5% peak CPU, 8–12s end-to-end. Six-page React 18 clinician dashboard with PHQ-9/GAD-7/PCL-5 tracking, SBAR handoff export with deterministic fallback, C-SSRS triage, and geolocated SOS.',
    tech: ['FastAPI', 'PyTorch', 'TensorFlow', 'TFLite', 'TF-IDF Retrieval', 'SSE', 'React 18', 'AWS EC2', 'Raspberry Pi 5'],
    github: `${GH}/Smart-Emotion-Recognition-and-Neural-Intervention-Technology-SERENITY-`,
  },
  {
    tag: 'Biometrics Security',
    title: 'Biometric Anti-Spoofing & Document Fraud Detection',
    image: '/anti-spoofing.png',
    description:
      'Four MobileNetV2-backed models for KYC — liveness, ID tamper, and signature verification — reaching up to 99.8% validation accuracy.',
    problem:
      'KYC onboarding must reject presentation attacks, digitally tampered ID documents, and forged signatures before an identity is ever trusted.',
    approach:
      'Four MobileNetV2-backed models covering the full verification flow, trained on Kaggle Tesla P100. Liveness uses 2-stage transfer learning across face, hand, and card presentations, with per-channel CLAHE and 3-pass unsharp masking surfacing the micro-textures that separate a live capture from a screen recapture. Tamper localisation uses a Feature Pyramid Network with Convolutional Block Attention, fusing four pyramid levels top-down into 256 channels; LAB-space CLAHE contrast-limits the L channel only to preserve colour fidelity before an edge-sharpening kernel emphasises splice artifacts. Signature verification uses a custom hard-negative triplet generator with margin-based Triplet Loss over L2-normalised 256-d embeddings.',
    result:
      '99.8% best validation accuracy on screen-replay detection across a stratified 17,834-image corpus after 45 epochs; 93.8% tamper detection against a 1:5 class imbalance at 0.97 precision on genuine documents; 92.7% signature verification across 5,000 pairs, evaluated by EER and ROC-AUC. All four profiled to ≤31 ms batch execution step times.',
    tech: ['TensorFlow', 'MobileNetV2', 'FPN + CBAM', 'Triplet Loss', 'CLAHE', 'OpenCV', 'EER / ROC'],
    github: `${GH}/Biometrics-Anti-Spoofing-Identity-Signature-Verification`,
  },
  {
    tag: '3D Vision',
    title: '3D Environment Reconstruction from Multi-View Images',
    image: '/3d-reconstruction.png',
    description:
      'A hand-built SfM and plane-sweep MVS pipeline initialising a 3D Gaussian Splatting model, reconstructing scenes at ~25 dB PSNR.',
    problem:
      'Turning 2D photographs into geometrically consistent, photorealistic 3D scenes means solving correspondence, pose, and depth by hand rather than calling an off-the-shelf reconstruction tool.',
    approach:
      'Six-stage pipeline over 49 of 64 pre-calibrated views of DTU scan1. Parsed the calibration files, decomposing projection matrices into K, R, t, then SIFT extraction, FLANN matching with Lowe ratio filtering, RANSAC epipolar verification, and two-view DLT triangulation into a 30,500-point sparse cloud. Densified with hand-written plane-sweep Multi-View Stereo evaluating 96 depth hypotheses per pixel at stride 4, each scored by illumination-invariant NCC across neighbouring views with multi-view confirmation. That cloud initialises a 3D Gaussian Splatting model trained in PyTorch with the gsplat CUDA rasterizer.',
    result:
      '166,303 raw MVS points cleaned to 130,029 via DTU ObsMask observability filtering, statistical outlier removal (k=20), and a 15 mm radius filter — 21.8% noise rejected. 15,000 3DGS iterations with adaptive clone/split/prune converge to ~70k–130k Gaussians at ~25 dB PSNR and 0.04 combined L1+SSIM loss.',
    tech: ['OpenCV', 'PyTorch', 'gsplat', 'SIFT', 'FLANN + RANSAC', 'Plane-Sweep MVS', '3D Gaussian Splatting', 'Open3D'],
    github: `${GH}/3D-Environment-Reconstruction-from-Multi-View-Image`,
  },
  {
    tag: 'Speech AI',
    title: 'Robust Speech Emotion Recognition via Hybrid Deep Neural Networks',
    image: '/speech-emotion.png',
    description:
      'Engineered a robust SER pipeline utilizing a TensorFlow hybrid network (1D-CNNs, Stacked BiLSTMs, Multi-Head Attention), achieving 80.6% test accuracy and quantized to a deployable 3.86 MB TFLite format.',
    problem:
      'Single-corpus SER models tend to overfit to specific recording setups, actors, and accents, collapsing on real-world audio. Minority emotion classes (like fear or disgust) easily drown out due to majority class bias (happy, neutral).',
    approach:
      'Aggregated 46,273 utterances across 9 public datasets (RAVDESS, IEMOCAP, CREMA-D, TESS, SAVEE, JL Corpus, ESD, EmoV-DB, ASVP-ESD) and normalized labels into a shared 7-class taxonomy. Balanced the training set to 53,487 samples via stochastic audio augmentation (noise injection, time stretch, pitch shift). Extracted 40-band MFCCs, ZCR, and RMS energy via an advanced Librosa pipeline, feeding a 1D-CNN → stacked BiLSTM → Multi-Head Attention network.',
    result:
      'Achieved an 80.61% final test accuracy on unseen data across 7 classes. Optimized the Keras model for resource-constrained edge deployment by stripping optimizer bloat (~29MB reduction) and applying dynamic-range quantization with Select TF Ops. The result is a lightweight 3.86 MB TFLite export running at 80.56% accuracy (only a 0.05pp drop).',
    tech: ['TensorFlow', 'Keras', 'CNN-BiLSTM', 'Multi-Head Attention', 'Librosa', 'TFLite', 'Data Augmentation'],
    github: `${GH}/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-`,
  },
  {
    tag: 'Pose Analytics',
    title: 'Human Pose Estimation & Activity Classification',
    image: '/pose-estimation.png',
    description:
      'A three-way comparison of MediaPipe against a from-scratch classical pipeline, feeding a 397-class downstream activity classifier.',
    problem:
      'Pose estimators are treated as black boxes. It is rarely shown where a pretrained model actually beats a classical pipeline, or where detection rate diverges from localisation accuracy.',
    approach:
      'A three-way comparative study on MPII rather than a single model. MediaPipe Pose Landmarker (pose_landmarker_full, float16) benchmarked against ground truth, its 33 landmarks mapped down to the 16-joint MPII skeleton with derived joints — pelvis, thorax, upper neck — computed as midpoints of paired landmarks. Against it, a from-scratch OpenCV pipeline using HSV skin-region detection, Haar-cascade face detection, and fixed anthropometric heuristics estimating the same joints. Downstream, a 53-dimensional scale- and translation-invariant descriptor from 17,372 MPII annotation rows feeding Random Forest and SVM classifiers over 397 activity classes.',
    result:
      '0.5858 PCKh@0.5 for the deep pipeline, quantified alongside detection rate, visibility, skeleton completeness, anatomical symmetry, and joint-angle plausibility with per-joint breakdowns — showing that a high detection rate does not imply accurate localisation. The comparative tasks run on a 100-image subset, so results are illustrative rather than definitive benchmarks.',
    tech: ['MediaPipe', 'OpenCV', 'Scikit-learn', 'SVM', 'Random Forest', 'PCKh', 'MPII'],
    github: `${GH}/Human-Pose-Estimation-and-Classification`,
  },
  {
    tag: 'Tabular ML',
    title: 'Santander Customer Transaction Prediction',
    image: '/santander.png',
    description:
      'A LightGBM pipeline over 200 anonymised features with Optuna tuning and threshold calibration, reaching 0.897 public ROC-AUC.',
    problem:
      'Predicting a rare transaction event from 200 anonymised, orthogonal features across 200,000 customers, with a ~10% positive class and almost no feature interaction to exploit.',
    approach:
      'Benchmarked six model families head-to-head, including deep neural baselines and XGBoost, before settling on LightGBM. Ran an exhaustive top-k gain-importance sweep across all 200 variables to prune to 180 without introducing noise, tuned with Optuna Bayesian search under 5-fold stratified cross-validation, and calibrated the operating threshold to 0.6744 against the precision/recall curve rather than the naive 0.5.',
    result:
      '0.89693 public / 0.89412 private leaderboard ROC-AUC against an 0.8597 logistic-regression baseline, at ~56% precision to cut false-positive operational cost. SHAP waterfall and summary plots plus permutation importance for interpretability, with model, scaler, feature list, and manifest persisted across six notebooks for a clean rerun.',
    tech: ['LightGBM', 'XGBoost', 'Optuna', 'SHAP', 'Scikit-learn', 'Feature Selection'],
    github: `${GH}/Santander-Customer-Transaction-Prediction`,
  },
  {
    tag: 'Medical Imaging',
    title: 'White Blood Cell Analysis & Classification',
    image: '/wbc-analysis.png',
    description:
      'A fully classical pipeline — Butterworth filtering, connected-component analysis, LBP/HOG features — classifying 5 WBC subtypes.',
    problem:
      'Classifying five white blood cell subtypes from peripheral blood microscopy without deep learning, where the discriminative signal lives in nucleus shape and texture rather than learned features.',
    approach:
      'Built entirely from classical primitives. Frequency-domain sharpening via a Butterworth high-pass filter through Fourier transforms, re-blended and histogram-equalised across 575×575 grayscale samples. Global thresholding and morphological closing, then a custom 8-connectivity connected-component analysis written from scratch to isolate the nucleus as the largest coherent region. Three descriptor families fused into one vector: shape metrics (area, perimeter, circularity), Local Binary Pattern texture, and Histogram of Oriented Gradients structure.',
    result:
      '66% test accuracy across 5 subtypes from an SVM on the fused vector, reported with per-class precision, recall, F1, and confusion matrices — an interpretable baseline where every feature dimension has a stated physical meaning, and a clear case for where learned features become necessary.',
    tech: ['OpenCV', 'NumPy', 'Scikit-learn', 'LBP', 'HOG', 'SVM', 'Connected Components'],
    github: `${GH}/White-Blood-Cell-Analysis-Classification`,
  },
  {
    tag: 'Audio Intelligence',
    title: 'Audio Classification: Speech, Music & Noise',
    image: '/audio-classification.png',
    description:
      'A 17-dimensional MFCC feature pipeline feeding a compact MLP, reaching 94.35% test accuracy across speech, music, and noise.',
    problem:
      'Automated acoustic monitoring needs to separate speech, music, and environmental noise from short clips without a heavyweight model.',
    approach:
      'MATLAB preprocessing applies class-specific filters — a 500–6000 Hz band-pass isolating the speech formant range, a 12,000 Hz low-pass preserving musical harmonics — with every signal normalised to mono. A reusable Python/Librosa module then turns raw audio into a 17-dimensional vector (13 MFCCs plus ZCR, RMS energy, pitch), and any audio directory into a training-ready CSV, so the dataset is regenerable rather than a one-off artifact. A compact TensorFlow/Keras MLP with ReLU and Dropout does the classification.',
    result:
      '98.85% training and 94.35% test accuracy across three classes on ~2,000 MUSAN samples with an 80/20 split, shipped behind a Flask app that accepts .wav uploads and returns class probabilities alongside real-time spectrogram analysis.',
    tech: ['TensorFlow', 'Keras', 'Librosa', 'MATLAB', 'MFCC', 'Flask', 'DSP'],
    github: `${GH}/Audio-Classification-System`,
  },
  {
    tag: 'Autonomous Vision',
    title: 'Real-Time Lane & Obstacle Perception',
    image: '/lane-perception.png',
    description:
      'A deterministic OpenCV pipeline for lane and obstacle detection — zero learned models, built as an interpretable driving-assistant baseline.',
    problem:
      'Prototyping the perception and decision layer of a driving assistant using only deterministic classical vision, with no learned model anywhere in the loop.',
    approach:
      'A frame-by-frame OpenCV/NumPy pipeline. Canny edge extraction with morphological closing bridges broken lane markings, and connected component analysis highlights the drivable region rather than fitting isolated lines. HSV colour segmentation isolates hazards with area-based contour filtering at a 150 px minimum rejecting noise. A rule-based directional planner evaluates immediate free-space availability and selects forward, right, left, or backward motion.',
    result:
      'A live annotated video pipeline rendering the drivable lane overlay, obstacle boxes, and agent position in real time, with thresholds exposed as tunable configuration — a lightweight interpretable baseline that makes the case for where learned perception becomes necessary.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Canny', 'Contour Detection', 'Rule-Based Planning'],
    github: `${GH}/Real-Time-Image-Analysis-for-Self-Driving-Capabilities`,
  },
  {
    tag: 'Biomedical DSP',
    title: 'ECG Denoising with Classical & Adaptive Filtering',
    image: '/ecg-denoising.png',
    description:
      'Benchmarks classical IIR filtering against LMS/NLMS adaptive filters to strip powerline, baseline, and EMG noise from real ECG signals.',
    problem:
      'Removing powerline interference, baseline wander, and EMG artifacts from real ECG recordings without distorting the P-QRS-T morphology that carries the diagnosis.',
    approach:
      'Loads real MIT-BIH records and synthetically corrupts them with 60 Hz powerline interference, sub-1 Hz baseline wander, and non-stationary EMG noise so ground truth is available for comparison. Benchmarks three strategies in MATLAB: a cascaded zero-phase IIR Butterworth chain — band-stop notch (59–61 Hz, order 4), high-pass (0.5 Hz, order 4), low-pass (40 Hz, order 4) applied via filtfilt — against a 128-tap LMS adaptive filter and a normalised NLMS variant whose step size self-adjusts to input energy.',
    result:
      'Each method quantified by SNR improvement and RMSE alongside time-domain overlays, FFT magnitude spectra, and short-time Fourier spectrograms, with NLMS delivering the best suppression of non-stationary artifacts while preserving clinical morphology.',
    tech: ['MATLAB', 'DSP', 'Butterworth IIR', 'LMS / NLMS', 'Spectrogram Analysis', 'MIT-BIH'],
    github: `${GH}/ECG-Signal-Denoising-using-Classical-and-Adaptive-Filtering`,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   FULL-STACK & SOFTWARE ENGINEERING
   ───────────────────────────────────────────────────────────────────────── */
const fullStackProjects: CmsProject[] = [
  {
    tag: 'Production Platform',
    title: 'Haines City Dental: Practice Platform & Headless CMS',
    image: '/haines-city-dental.png',
    description:
      'A dual-database headless CMS for a live dental practice, cutting content update time 90% and running in production for 140+ commits.',
    problem:
      'A live dental practice was locked into a legacy WordPress site where every content change required a developer, and staff could not publish news, team, or service updates themselves.',
    approach:
      'Bespoke headless CMS on Next.js 14 with a dual-database backend — Prisma over PostgreSQL for structured doctor records alongside a lazily-initialised MySQL pool for editorial content. Admin dashboard with HTML5 drag-and-drop reordering persisted through dedicated endpoints, protected by edge middleware, httpOnly JWT cookies, a client-side auth guard, and 15-minute inactivity auto-logout tracked across seven interaction event types. Direct-to-Vercel-Blob uploads through an auth-brokered token route, with automated cache revalidation after every write. Wrote 15+ Node.js migration scripts covering HTML extraction, image de-duplication, WebP conversion, and orphaned-asset validation over an SSH-tunnelled MySQL link.',
    result:
      'Content update turnaround cut 90% — 30+ minutes to under 2 — while holding sub-100kB initial loads through SSR. Public routes retry three times with exponential backoff (1s, 2s, capped at 5s); SMTP workflows fall back to a prefilled mailto payload when unconfigured. 140 commits, running in production for a paying practice.',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'MySQL', 'JWT', 'Vercel Blob', 'ISR'],
    github: `${GH}/hainescitydental`,
    clientWork: true,
  },
  {
    tag: 'Client Delivery',
    title: 'Glorious Home Care: Multi-Region Care Platform',
    image: '/glorious-home-care.png',
    description:
      'A 34-page programmatic-SEO platform generating service and city pages at build time from one strongly-typed content layer.',
    problem:
      'A Bay Area home-care provider needed per-service and per-city landing pages at scale, without hand-maintaining dozens of near-duplicate routes.',
    approach:
      'Modelled the entire offering as a strongly-typed local content layer with exported interfaces per content shape, then drove it through three dynamic routes — services/[service], locations/[city], resources/[article] — so 9 service pages, 6+ city pages, and 10+ resource articles all generate at build time from structured data. Hardened delivery with a strict Content-Security-Policy including object-src none and frame-ancestors none, X-Frame-Options DENY, MIME-sniff protection, and upgrade-insecure-requests.',
    result:
      'A 34-page programmatic-SEO platform where adding a city or service is a data edit rather than a new page, with no database round-trips in the request path. Per-route metadata, canonical URLs, and Open Graph tags across 10 Northern California counties, plus an IntersectionObserver scroll-spy directory and requestAnimationFrame marquee. 27 commits.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'Programmatic SEO', 'Resend'],
    github: `${GH}/Glorious-Home-Care-Assistance-`,
    clientWork: true,
  },
  {
    tag: 'Client Delivery',
    title: 'Benevolence Home Services: Zero-CMS Platform',
    image: '/benevolence.png',
    description:
      'A zero-database-round-trip Next.js platform statically serving 8+ service pages behind a hardened serverless contact pipeline.',
    problem:
      'A nurse-led home-care and staffing agency serving five Chicagoland counties needed a fast, accessible, search-visible site across eight service lines without the cost and latency of a hosted CMS.',
    approach:
      'A "Zero-CMS" local data engine serving all content from strongly-typed TypeScript arrays, with generateStaticParams pre-rendering every service route and a slug-routed blog at build time. A custom content parser styles legacy blog markup without heavy markdown libraries or unsafe DOM injection. The serverless contact API integrates Resend and a Google Sheets CRM sink authenticated by service-account JWT, layered with a hidden honeypot field that silently succeeds on bot fill, HTML-entity escaping, per-field length caps, and graceful degradation when Sheets is unreachable.',
    result:
      'A fully static, zero-round-trip site spanning eight service pages, a blog, careers, and service-area coverage, with automated JSON-LD schema, XML sitemap, PWA manifest, and a full security header set. Calendly, PayPal, and JotForm workflows wired in. 64 commits.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'JSON-LD', 'Resend', 'Google Sheets API'],
    github: `${GH}/Benevolence-Home-Services`,
    clientWork: true,
  },
  {
    tag: 'Client Delivery',
    title: 'A&T Nexus: B2B Digital Transformation Platform',
    image: '/at-nexus.png',
    description:
      'A Framer Motion and Three.js marketing platform for a B2B operations-support business, built around a persuasive comparison grid.',
    problem:
      'A consulting and operations-support business needed a site communicating a complex B2B offering — digital transformation, SME enablement, home health care operations — without reading as another templated agency page.',
    approach:
      'Five-page App Router application decomposed into reusable section components, with navigation labels, mission cards, value cards, and affiliation logos centralised in a single source of truth. Framer Motion scroll storytelling driven by scroll-linked transforms and opacity, a custom reveal-on-scroll hook, @react-three/fiber 3D scenes, a stacked-card coverage layout, and an in-house versus outsourced comparison grid as the persuasive conversion element.',
    result:
      'A lightweight, SEO-ready platform meeting strict WCAG requirements with reduced-motion support throughout, backed by validated serverless contact and newsletter routes wiring Resend, FormSubmit, and WhatsApp lead capture in place of manual follow-up. 62 commits.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Framer Motion', '@react-three/fiber', 'Resend', 'WCAG'],
    github: `${GH}/A-T-Nexus-`,
    clientWork: true,
  },
  {
    tag: 'Data Structures',
    title: 'Search Engine Desktop Application',
    image: '/search-engine.png',
    description:
      'A hand-written Trie inverted index in C++17 powering boolean and prefix search inside a native Qt desktop application.',
    problem:
      'Searching a local corpus of text documents needs real prefix and Boolean retrieval, not the substring filename matching the OS provides.',
    approach:
      'A hand-written Trie inverted index in C++17 with no external search library. Words insert character by character; each node stores an unordered_map<int, DocInfo> recording which documents contain the prefix and at what frequency, so lookups run in O(L) on term length rather than scanning every document. Boolean AND/OR parses from literal tokens, defaulting to union; prefix matching walks to the query node then recursively collects the subtree. Whole query strings cache in an unordered_map so repeats skip the trie walk entirely.',
    result:
      'A responsive Qt Widgets desktop tool with results paginated five at a time up to nine pages, contextual snippets, and a full-document reading view — with relevance ranked by descending term frequency read directly off the trie node.',
    tech: ['C++17', 'Qt Widgets', 'Trie', 'Boolean Retrieval', 'Query Caching', 'Data Structures'],
    github: `${GH}/Search-Engine-Desktop-Application`,
  },
  {
    tag: 'Systems Simulation',
    title: 'OS CPU & Disk Scheduling Simulator',
    image: '/os-simulator.png',
    description:
      'A Java Swing tool visualising CPU, real-time, and disk scheduling algorithms with live Gantt charts and XY plots.',
    problem:
      'Scheduling algorithms are hard to reason about from pseudocode alone — the trade-offs only become legible when you can watch the timeline.',
    approach:
      'A Java Swing simulator covering three algorithm families in one tool: CPU scheduling (FCFS, SJF, Priority, Round Robin), real-time scheduling (Rate Monotonic, Earliest Deadline First), and disk head scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK). Per-process input forms adapt their fields to the selected algorithm. Simulation logic runs off the Event Dispatch Thread via SwingWorker at one tick per simulated time unit so the interface stays responsive during animation.',
    result:
      'An interactive tool across 13 classes with a sortable results table, colour-coded Gantt chart, live per-process progress bars, and a JFreeChart XY line chart tracing disk head movement across cylinders — letting turnaround, waiting time, and seek distance be compared directly across policies.',
    tech: ['Java', 'Swing', 'SwingWorker', 'JFreeChart', 'Scheduling Algorithms', 'Real-Time Systems'],
    github: `${GH}/OS-CPU-Disk-Scheduling-Simulator`,
  },
  {
    tag: 'OOP Design',
    title: 'Airport Surface Traffic Control Simulation',
    image: '/airport-traffic.png',
    description:
      "A task-driven Java simulation routing aircraft across a weighted network graph with Dijkstra's algorithm and priority queues.",
    problem:
      'Modelling aircraft ground movement — gates, taxiways, runways, and the conflicts between them — demands a domain model that stays maintainable as rules accumulate.',
    approach:
      'A task-driven engine across 14 Java classes. Rather than entities calling one another directly, every action — an aircraft requesting to land, a controller opening a runway, a plane told to hold — becomes a discrete Task carrying an identifier, priority, and time mark. A central TaskEngine collects, orders, branches, dispatches, and pends tasks through a custom priority comparator with two-level identifier branching. Dijkstra over a 6-node weighted ground network computes travel paths, arrival schedules, and traversal costs.',
    result:
      'A modular simulation managing 4 runways, 12 taxiways, and 24 gates with pending-task delay logic resolving real-time holding and contention, where new aircraft behaviours extend the existing hierarchy rather than modifying it. Threaded GUI global clock with ANSI-colourised terminal narration.',
    tech: ['Java', 'OOP Design', 'Dijkstra', 'Priority Queues', 'Multithreading', 'Discrete Simulation'],
    github: `${GH}/Object-Oriented-Java-Airport-Traffic-Simulation`,
  },
  {
    tag: 'Database Engineering',
    title: 'Industrial Database Management System',
    image: '/industrial-dbms.png',
    description:
      "A schema-driven Flask application that auto-generates CRUD forms directly from SQL Server's live INFORMATION_SCHEMA.",
    problem:
      'A wire and cable manufacturer tracked employees, factories, suppliers, materials, and six distinct production processes across disconnected records with no consistent schema.',
    approach:
      'Designed a normalised relational schema from an Enhanced Entity-Relationship model, using supertype/subtype category structures to represent both production processes and material types so the hierarchy is preserved end to end rather than flattened. Rather than hardcoding queries per table, the Flask application introspects SQL Server INFORMATION_SCHEMA at runtime to auto-generate data-entry forms, execute inner joins, and enable runtime table creation.',
    result:
      'A session-gated operations system where schema changes propagate to the UI automatically, with combined views joining each parent table to its subtype children and a generic table viewer supporting column-based search — letting non-technical staff manage manufacturing records without writing SQL.',
    tech: ['Flask', 'Python', 'SQL Server', 'pyodbc', 'EER Modelling', 'Normalisation', 'Jinja2'],
    github: `${GH}/Industrial-Database-Management-System`,
  },
  {
    tag: 'Network Engineering',
    title: 'IPv6 WAN Design & OSPFv3 Routing',
    image: '/ipv6-wan.jpg',
    description:
      'A pure-IPv6 wide-area network configured end-to-end in Cisco Packet Tracer with OSPFv3 dynamic routing.',
    problem:
      'IPv4 exhaustion forces new WAN designs onto IPv6, which changes addressing, neighbour discovery, and the routing protocol itself — not merely the address length.',
    approach:
      'Designed and configured a pure-IPv6 wide-area network on Cisco 2811 ISRs and 2950-24 switches with no IPv4 on any interface anywhere, connecting distinct /64 LAN subnets across sites via a point-to-point serial link. Configured OSPFv3 through IOS CLI for dynamic route propagation, resolving the IPv6-specific constraint that OSPFv3 still requires a 32-bit router-ID by injecting them manually, and enabling global IPv6 unicast forwarding.',
    result:
      'End-to-end full-mesh reachability verified between all end devices at 0% packet loss using ICMPv6 echo and continuous TTL hop-count monitoring, documented with full topology, per-router running configuration, and ping verification across every site pair.',
    tech: ['IPv6', 'OSPFv3', 'Cisco IOS', 'Packet Tracer', 'WAN Design', 'Dynamic Routing'],
    github: `${GH}/IPv6-WAN-Design-Inter-OSPFv3-Routing`,
  },
  {
    tag: 'Systems Programming',
    title: 'Multi-Game Launcher & Management System',
    image: '/game-launcher.png',
    description:
      'An SFML launcher driving flicker-free 20 FPS console games through direct Win32 console buffer manipulation.',
    problem:
      'Building several real-time games behind one launcher in C++ means handling rendering, input, physics, and persistence with no engine underneath.',
    approach:
      'An SFML graphical launcher fronting four modules, with fallback to low-level Windows Console execution for the terminal games. Tetris and Flappy Bird bypass stdout entirely, driving native Win32 Console APIs — CreateConsoleScreenBuffer, WriteConsoleOutputCharacter — to write directly to a back buffer, which cout-based redraw cannot do. Frame pacing via this_thread::sleep_for and non-blocking GetAsyncKeyState polling keep input from stalling the render loop.',
    result:
      'Flicker-free 20 FPS console rendering, a custom index-remapping algorithm for real-time Tetromino rotation, and an embedded shop management module using multiple and virtual inheritance over a flat-file fstream database persisting employees, inventory, and profit margins across sessions.',
    tech: ['C++', 'SFML', 'Win32 Console API', 'Game Physics', 'File I/O', 'OOP'],
    github: `${GH}/C-Multi-Game-Launcher-Management-System-`,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   HARDWARE, EMBEDDED & DIGITAL DESIGN
   ───────────────────────────────────────────────────────────────────────── */
const hardwareProjects: CmsProject[] = [
  {
    tag: 'FPGA Design',
    title: 'FPGA Snake Game with Hardware AI',
    image: '/fpga-snake.png',
    description:
      'A processor-less Verilog game engine driving VGA directly, with a hardware-logic Ghost AI hunting by Manhattan distance.',
    problem:
      'Implementing a complete real-time game with no CPU, no instruction memory, and no software anywhere — every rule has to exist as synchronous logic.',
    approach:
      'A processor-less Verilog engine driving VGA at 640×480@60Hz, deriving a 25 MHz pixel clock from the 100 MHz master clock. A procedural video pipeline maps the screen into a 32×24 grid of 20×20 pixel tiles, and a purely combinational bitmap font engine renders scores and text with no external font ROM. A 25 MHz finite state machine manages game state, collision detection, and hardware-level button debouncing, while a dual-port BRAM circular queue gives O(1) snake body tracking and a 16-bit LFSR drives pseudo-random apple and bomb placement.',
    result:
      'A fully hardware-driven game with multi-tier difficulty scaling, bombs, poison apples, and persistent shed-skin obstacles — including an autonomous Ghost hunter implemented entirely in combinational and sequential logic, pursuing the player by greedy Manhattan-distance minimisation on an independent tracking tick.',
    tech: ['Verilog HDL', 'Xilinx FPGA', 'VGA Timing', 'FSM Design', 'BRAM', 'LFSR'],
    github: `${GH}/FPGA-Implementation-of-Advanced-Snake-Game-with-AI`,
  },
  {
    tag: 'Processor Design',
    title: 'Custom 16-Bit Harvard Processor',
    image: '/harvard-processor.png',
    description:
      'A from-scratch 16-bit Harvard-architecture processor in Verilog with an original 15-opcode instruction set.',
    problem:
      'Understanding computer architecture properly means designing the instruction set itself, not reimplementing a textbook MIPS datapath.',
    approach:
      'A 16-bit Harvard-architecture CPU in Verilog isolating ROM instruction memory from RAM data memory, sequenced by an 8-bit program counter. An original MIPS-inspired ISA spans 15 opcodes across R, I, and J formats. A unified datapath integrates a 16-bit ALU, an 8-word general-purpose register file, and specialised Hi, Lo, and PC registers, driven by a control unit that decodes opcode and format into datapath control signals.',
    result:
      'A working custom-ISA processor validated in Icarus Verilog against a hand-assembled 17-instruction program exercising arithmetic loops, bitwise shifts, and memory I/O — with a status register tracking Zero, Negative, and Overflow flags to enable flag-gated conditional arithmetic and branching beyond the base specification.',
    tech: ['Verilog HDL', 'Harvard Architecture', 'ISA Design', 'ALU', 'Control Unit', 'Icarus Verilog'],
    github: `${GH}/Custom-16-Bit-Harvard-Processor-in-Verilog-HDL`,
  },
  {
    tag: 'Autonomous Robotics',
    title: 'Autonomous Security & Fire-Safety Robot',
    image: '/security-robot.png',
    description:
      'A dual-microcontroller patrol rover that autonomously detects intrusion and fire hazards and actuates suppression.',
    problem:
      'Small facilities need affordable autonomous patrol that can detect both intrusion and fire hazards and act on them, rather than merely logging events.',
    approach:
      'A dual-microcontroller design on a 4WD chassis: an ESP32 handles real-time threat response and actuation while a separate ESP32-CAM provides remote mobility and a live feed, keeping perception and control on independent controllers. A PIR motion sensor, MQ2 smoke sensor, and three IR flame sensors trigger a 5V relay-driven servo and water pump. A custom Wi-Fi-hosted web interface maps directional input to an L298N dual H-bridge for differential steering under PWM regulation.',
    result:
      'A working patrol rover closing the loop from detection to physical suppression, documented end to end with bill of materials, wiring, and architecture. Resolved PWM signal instability and camera-module power brownouts by reworking power distribution — failures that only surface once the system runs on battery under load.',
    tech: ['ESP32', 'ESP32-CAM', 'Embedded C++', 'PIR / MQ2 / IR Flame', 'L298N', 'Wi-Fi'],
    github: `${GH}/Autonomous-ESP32-Security-Fire-Safety-Robot`,
  },
  {
    tag: 'IoT Systems',
    title: 'Remote Weather Detection IoT Car',
    image: '/iot-car.png',
    description:
      'A mobile weather station splitting Wi-Fi vehicle control from an independent LoRa 433MHz telemetry link.',
    problem:
      'Wi-Fi-tethered mobile sensing stops working exactly where remote environmental monitoring becomes useful — past the edge of the network.',
    approach:
      'Deliberately decoupled the two data paths. High-bandwidth vehicle control and video run over a Wi-Fi access point hosted directly on the ESP32-CAM, which serves its own browser control panel and live OV2640 feed with no internet dependency. Low-bandwidth telemetry runs over an independent LoRa 433 MHz link, with DHT22 temperature/humidity on a single-wire protocol and BH1750 lux over I2C, interfaced to a mobile Arduino UNO and broadcast to a fixed base station over SPI-driven transceivers.',
    result:
      'A mobile weather station where control and telemetry fail independently — driving range is bounded by Wi-Fi, but sensor data keeps arriving over LoRa well past it. Differential-drive steering maps touch and joystick input to an L298N dual H-bridge under PWM duty-cycle regulation.',
    tech: ['ESP32-CAM', 'Arduino', 'LoRa 433MHz', 'DHT22', 'BH1750', 'WebSockets', 'L298N'],
    github: `${GH}/Remote-Weather-Detection-IoT-Car`,
  },
  {
    tag: 'Digital Logic',
    title: 'Smart Car Parking Fare Generator',
    image: '/parking-fare.png',
    description:
      'A microcontroller-free fare calculator built entirely from discrete digital logic — timers, counters, and a custom ALU.',
    problem:
      'Flat parking fees are inequitable, and metering duration accurately without a microcontroller means building the timing and arithmetic entirely from discrete logic.',
    approach:
      'A pure IC-level system with no processor anywhere in the design. A 555 timer at 0.0166 Hz drives 7493 asynchronous ripple counters tracking occupancy in 5-minute intervals, gated by continuous E18-D80NK infrared proximity sensing. A priority encoder and multiplexer chain classifies accumulated duration into three fare tiers combinationally as the counters advance, feeding a custom IC-level arithmetic unit built from 4×4 and 8×4 multipliers alongside an 8-bit adder.',
    result:
      'A deterministic hardware fare calculator tying charge directly to parked duration, with BCD-to-7-segment decoding driving the display. The 8×4 multiplier was formally verified through Verilog testbenches before assembly; the full multi-stage datapath was modelled in Proteus, then built and demonstrated on physical breadboard hardware.',
    tech: ['Digital Logic', '555 Timer', 'Ripple Counters', 'Priority Encoder', 'BCD / 7-Segment', 'Proteus'],
    github: `${GH}/Digital-Logic-Smart-Car-Parking-Fare-Generator`,
  },
];

export const cmsDefaults: PortfolioCMSData = {
  profile: {
    name: 'Muhammad Taha',
    title: 'Full-Stack AI Engineer',
    positioning: 'FULL-STACK · MACHINE LEARNING · COMPUTER VISION · EDGE DEPLOYMENT · PRODUCTION SYSTEMS',
    headline: 'Models that survive the trip from notebook to production hardware',
    summary:
      'Full Stack AI Engineer and Computer Engineer specialising in end-to-end AI deployment, bridging complex neural model optimisation with scalable web architectures. Proven expertise in engineering edge-quantised vision models, calibrated clinical prediction systems, and retrieval-grounded reasoning pipelines, seamlessly integrated into low-latency applications. Recent milestones include delivering a 0.892-AUROC ICU deterioration predictor processing 40GB of MIMIC-IV data, architecting a multimodal mental-health edge platform for Raspberry Pi 5, and deploying a production-grade biometric anti-spoofing suite for enterprise verification.',
    about:
      'The model is rarely the hard part. The hard part is the 40GB that will not fit in memory, the calibration curve that quietly lies, the quantisation budget on a board with no GPU, and the fallback path for the moment the cloud is unreachable. I work across that whole distance — clinical prediction over real EHR data, edge-first multimodal systems running on a Raspberry Pi, production platforms serving paying clients, and hardware down to a custom ISA in Verilog. I publish what fails next to what works, because a result you cannot reproduce is not a result.',
    email: 'ch.tahaarif2005@gmail.com',
    phone: '+92 317 5434059',
    location: 'Islamabad, Pakistan',
    linkedIn: 'https://www.linkedin.com/in/muhammad-taha-21a163256/',
    github: GH,
  },
  experiences: [
    {
      title: 'Full-Stack Engineer',
      org: 'A&T Nexus Solutions LLC',
      sub: 'Remote',
      period: 'Aug 2025 – Present',
      bullets: [
        'Sole engineer across four production Next.js platforms for US healthcare, home-care, and B2B consulting clients — owning architecture, deployment, and post-launch maintenance across 290+ commits',
        'Engineered JWT-secured admin APIs over Prisma/PostgreSQL alongside pooled MySQL, with direct-to-Vercel-Blob upload brokering and automated cache revalidation, plus Resend, SMTP/Nodemailer, Google Sheets CRM, WhatsApp, and Calendly integrations',
        'Standardised hardened defaults across client sites — strict Content-Security-Policy, X-Frame-Options, MIME-sniff protection, honeypot fields, HTML-entity escaping, and WCAG-compliant reduced-motion interfaces',
        'Authored 15+ Node.js migration and asset-optimisation scripts porting a legacy WordPress practice site into Next.js — HTML extraction, image de-duplication, WebP conversion, and orphaned-asset validation over an SSH-tunnelled remote MySQL link',
        'Built React 19 / TypeScript interfaces with @react-three/fiber 3D scenes, scroll-driven Framer Motion storytelling, IntersectionObserver scroll-spy, and exponential-backoff client fetching',
      ],
    },
    {
      title: 'Computer Vision Engineer Intern',
      org: 'TruID Technologies PVT. LTD.',
      sub: 'National Science & Technology Park (NSTP), Islamabad',
      period: 'Jul 2025 – Sep 2025',
      bullets: [
        'Built four MobileNetV2-backed vision models covering an end-to-end KYC identity-verification flow, trained in TensorFlow/Keras on Tesla P100 and profiled to ≤31 ms batch execution step times',
        'Engineered a cross-domain screen-replay detector via 2-stage transfer learning across face, hand, and card presentations, applying per-channel CLAHE and 3-pass unsharp masking over a stratified 17,834-image corpus for 99.8% validation accuracy after 45 epochs',
        'Architected a Feature Pyramid Network with Convolutional Block Attention fusing four pyramid levels into 256 channels, using LAB-space CLAHE on the L channel only to preserve colour fidelity — overcoming a 1:5 class imbalance for 93.8% test accuracy at 0.97 precision on genuine documents',
        'Designed a deep metric learning signature verifier with a custom hard-negative triplet generator over L2-normalised 256-d embeddings, reaching 92.7% accuracy across 5,000 pairs under EER and ROC-AUC evaluation',
      ],
    },
  ],
  projectCategories: [
    {
      id: 'machine-learning-ai-systems',
      title: 'Machine Learning & AI Systems',
      subtitle: 'Clinical prediction, multimodal edge systems, 3D vision, and applied deep learning',
      iconKey: 'brain',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      projects: machineLearningProjects,
    },
    {
      id: 'full-stack-software-engineering',
      title: 'Full-Stack & Software Engineering',
      subtitle: 'Production client platforms, systems programming, algorithms, databases, and networks',
      iconKey: 'code2',
      iconBg: 'bg-cyan-600/20',
      iconColor: 'text-cyan-400',
      projects: fullStackProjects,
    },
    {
      id: 'hardware-embedded-digital-design',
      title: 'Hardware, Embedded & Digital Design',
      subtitle: 'Processor architecture, hardware FSMs, embedded autonomy, and discrete logic',
      iconKey: 'cpu',
      iconBg: 'bg-emerald-600/20',
      iconColor: 'text-emerald-400',
      projects: hardwareProjects,
    },
  ],
  skillGroups: [
    {
      title: 'Frontend & Languages',
      iconKey: 'code2',
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-400',
      // Added: C++17 (Search Engine, Multi-Game Launcher — 'C++' alone undersold
      // the standard used), Qt Widgets, Java Swing. These are real desktop UI
      // work (Search Engine, OS Simulator, Airport ASTC) that had no home before.
      skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'SQL', 'MATLAB', 'Next.js 16', 'React 19', 'Tailwind CSS', 'Framer Motion', 'Qt Widgets', 'Java Swing', 'WCAG','SFML'],
    },
    {
      title: 'Backend, APIs & Cloud',
      iconKey: 'server',
      iconBg: 'bg-emerald-600/20',
      iconColor: 'text-emerald-400',
      // Added: Prisma was already there; added JWT Auth (dental CMS,
      // Benevolence), SQL Server / pyodbc (Industrial DBMS — a real backend
      // with zero prior representation), and Resend (3 client platforms).
      skills: ['FastAPI', 'Flask', 'Node.js', 'REST APIs', 'Server-Sent Events', 'JWT Auth', 'PostgreSQL', 'MySQL', 'SQL Server / pyodbc', 'Prisma', 'Resend', 'AWS EC2', 'Vercel'],
    },
    {
      title: 'Deep Learning, LLMs & MLOps',
      iconKey: 'brain',
      iconBg: 'bg-indigo-600/20',
      iconColor: 'text-indigo-400',
      // Removed: Ollama (SERENITY's cloud server calls a llama.cpp /completion
      // endpoint and Transformers AutoModelForCausalLM — not Ollama) and LoRA
      // Fine-Tuning (PeftModel.from_pretrained exists only as optional adapter
      // LOADING behind an env var; no fine-tuning run is committed anywhere).
      // Added: Scikit-learn — used in 6 repos and was missing entirely, the
      // single biggest gap in the original list. Also NumPy, Pandas, SciPy
      // (9 / 4 / 3 repos respectively) and RAG's actual mechanism.
      skills: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'NumPy', 'Pandas', 'SciPy', 'Hugging Face Transformers','LLMs (Qwen, Ollama)','LoRA Fine-Tuning', 'RAG (TF-IDF Retrieval)', 'XGBoost', 'LightGBM', 'Optuna', 'SHAP', 'Polars'],
    },
    {
      title: 'Vision, Audio & Edge AI',
      iconKey: 'eye',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      // Removed: YOLOv8 (zero occurrences in any README or notebook; SERENITY's
      // committed FER pipeline is ResNet-18 only) and ONNX (no export path, no
      // runtime, no mention anywhere in the 37 repos).
      // Added: gsplat + Open3D (3D Reconstruction), CLAHE / Unsharp Masking and
      // FPN + CBAM (Biometrics — real, named techniques that had no chip),
      // XNNPACK (the actual Pi 5 delegate SERENITY uses, not a generic mention).
      skills: ['OpenCV', 'Librosa','Whisper', 'ResNet / MobileNet', 'CLAHE / Unsharp Masking', 'FPN + CBAM','MediaPipe', '3D Gaussian Splatting', 'gsplat', 'Open3D', 'TFLite (INT8/NF4)', 'XNNPACK', 'Raspberry Pi 5'],
    },
    {
      title: 'Hardware & Embedded',
      iconKey: 'cpu',
      iconBg: 'bg-amber-600/20',
      iconColor: 'text-amber-400',
      // Added: Icarus Verilog (the actual simulator used to verify the 16-bit
      // CPU), VGA / FSM / BRAM (the specific techniques the FPGA Snake game
      // demonstrates — 'FPGA (Xilinx)' alone didn't say what was built),
      // Cisco IOS / Packet Tracer (IPv6 WAN project — real networking work
      // that had zero representation), Digital Logic / Proteus (Parking Fare
      // Generator's IC-level ALU work).
      skills: ['Verilog HDL', 'Icarus Verilog', 'FPGA (Xilinx)', 'ISA Design', 'VGA / FSM / BRAM', 'ESP32', 'Arduino', 'LoRa 433MHz', 'Cisco IOS / Packet Tracer', 'Digital Logic / Proteus', 'Bash / Linux', 'Git'],
    },
  ],
  /**
   * Every certificate card reserves a dedicated image panel. `image` is left
   * unset because none of the files it used to point at exist in /public —
   * '/certs/dl.png', '/certs/ml.png', '/ai_everyone.png', '/frontend.png' and
   * '/cs50p.png' were all 404s, so all five cards rendered a broken image.
   *
   * To use real certificate scans: drop the files into public/certs/ and set
   * `image` to the path below. Until then the panel renders a styled issuer
   * placeholder at exactly the same size, so nothing shifts when you add them.
   */
  certifications: [
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI',
      date: 'Dec 2025',
      link: 'https://www.coursera.org/account/accomplishments/specialization/108CJVFYUFG4',
      image: '/deep-learning-specialization.png',
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'DeepLearning.AI',
      date: 'Jul 2025',
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/CCNSYYU42C28',
      image: '/machine-learning-specialization.png',
    },
    {
      title: 'AI for Everyone',
      issuer: 'DeepLearning.AI',
      date: 'Jun 2024',
      link: 'https://www.coursera.org/account/accomplishments/verify/DQRNLTNU8F3D',
      image: '/ai-everyone.png',
    },
    {
      title: 'Introduction to Front-End Development',
      issuer: 'Meta',
      date: 'Oct 2023',
      link: 'https://www.coursera.org/account/accomplishments/verify/5W3GG5G4JVNY',
      image: '/frontend.png',
    },
    {
      title: 'CS50P: Programming with Python',
      issuer: 'Harvard University',
      date: 'Sep 2023',
      link: 'https://certificates.cs50.io/a31f82a1-78d3-417d-9b38-7b58af74cd4c.pdf?size=letter',
      image: '/cs50p.png',
    },
  ],
};