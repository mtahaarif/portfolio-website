// Curated project data — AI-first, recruiter-optimized

export interface Project {
  tag: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  github: string;
}

export const featuredProjects: Project[] = [
  {
    tag: "Multimodal AI",
    title: "SERENITY (FYP): Smart Emotion Recognition and Neural Intervention",
    problem:
      "Most conversational mental health tools ignore multimodal emotional cues, reducing context quality and response relevance.",
    approach:
      "Built a local-first multimodal assistant using FER (TFLite), SER (TFLite), Whisper Tiny transcription, RAG retrieval (FAISS), and a quantized Qwen2.5-1.5B model with emotion-aware prompting. Added SQLite + SQLAlchemy conversation memory, timeout guards, and fallback handling for reliable real-time sessions.",
    result:
      "Delivered end-to-end multimodal inference with therapist-style responses on constrained hardware, with architecture ready for hybrid edge-cloud offload.",
    tech: ["FastAPI", "TensorFlow Lite", "Whisper Tiny", "Qwen2.5", "RAG", "FAISS", "SQLite", "SQLAlchemy", "Raspberry Pi 5"],
    github: "https://github.com/mtahaarif/Smart-Emotion-Recognition-and-Neural-Intervention-Technology-SERENITY-",
  },
  {
    tag: "Clinical AI",
    title: "MedTraceAI: Clinical Deterioration Prediction",
    problem:
      "Clinical deterioration signals are distributed across streaming vitals, labs, medications, and ADT events, making early intervention difficult.",
    approach:
      "Built multimodal temporal modeling pipelines with LSTM and Temporal Fusion Transformer, strict patient-time correctness, and explainability through calibration and SHAP-based analysis.",
    result:
      "Enabled low-latency bedside risk scoring with clinician-facing dashboards and production infrastructure using Kafka, FastAPI, Kubernetes, and Terraform.",
    tech: ["LSTM", "Temporal Fusion Transformer", "SHAP", "Kafka", "FastAPI", "Kubernetes", "Terraform"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Full-Stack Engineering",
    title: "Full-Stack Dental Practice Platform & Custom Headless CMS",
    problem:
      "A dental practice needed a modern web platform to replace a legacy site, with non-technical content management.",
    approach:
      "Architected Next.js 14 + TypeScript + MySQL with JWT auth, drag-and-drop admin workflows, optimistic UI updates, and hybrid storage using Vercel Blob plus Git-backed assets.",
    result:
      "Reduced content update turnaround by 90% (30+ minutes to under 2 minutes) and achieved sub-100kB initial load via SSR, caching, and AVIF/WebP optimization.",
    tech: ["Next.js 14", "TypeScript", "MySQL", "JWT", "Vercel Blob", "Tailwind CSS"],
    github: "https://github.com/mtahaarif/hainescitydental",
  },
  {
    tag: "Computer Vision",
    title: "Human Pose Estimation and Classification",
    problem:
      "Pose understanding needs robust evaluation across both learned and classical pipelines under strict anatomical constraints.",
    approach:
      "Built two pipelines on MPII: MediaPipe keypoint extraction and a from-scratch classical CV pipeline using contours, skeletonization, and geometric heuristics. Trained classifiers using joint-angle features.",
    result:
      "Delivered comparative benchmarking with PCKh@0.5, skeleton completeness, symmetry scoring, and angle plausibility analysis.",
    tech: ["OpenCV", "MediaPipe", "SVM", "Random Forest", "Feature Engineering"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "3D Vision",
    title: "3D Environment Reconstruction",
    problem:
      "Recovering 3D structure from 2D multi-view inputs requires accurate feature correspondences and camera geometry estimation.",
    approach:
      "Implemented feature matching (SIFT/ORB/SURF), epipolar geometry, camera pose recovery, stereo triangulation, and point-cloud refinement.",
    result:
      "Generated dense and sparse reconstructions suitable for robotics, AR/VR, autonomous navigation, and spatial mapping tasks.",
    tech: ["OpenCV", "SIFT", "ORB", "Epipolar Geometry", "Stereo Vision", "Point Clouds"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Edge CV",
    title: "Real-Time Image Analysis for Self-Driving Capabilities",
    problem:
      "Resource-constrained autonomous driving stacks need robust lane and obstacle understanding with real-time control feedback.",
    approach:
      "Built a classical CV pipeline on Raspberry Pi 5 using ROI selection, downsampling, adaptive thresholding, edge detection, and Hough transforms for lane/obstacle perception.",
    result:
      "Delivered real-time driving command generation (stop, move, left, right, forward, backward) with FPS and robustness tracking under changing conditions.",
    tech: ["OpenCV", "Raspberry Pi 5", "Hough Transform", "Adaptive Thresholding", "Real-Time Processing"],
    github: "https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities",
  },
];

export const secondaryProjects: Project[] = [
  {
    tag: "Medical AI",
    title: "Lung and Colon Cancer Histopathology Classification",
    problem: "Histopathological diagnosis workflows are time-consuming and require consistent image-level classification support.",
    approach:
      "Built a CNN image classifier for 5 histopathology classes with systematic tuning of dropout, max-pooling, and architecture depth.",
    result: "Achieved 98.6% validation accuracy on the target classification benchmark.",
    tech: ["CNN", "PyTorch", "Medical Imaging", "Deep Learning"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Applied ML",
    title: "Santander Customer Transaction Prediction",
    problem: "High-dimensional tabular prediction requires strong generalization with transparent feature contribution analysis.",
    approach:
      "Built end-to-end tabular ML workflow with feature engineering, cross-validation, and model comparison across Logistic Regression, Random Forest, XGBoost, and LightGBM.",
    result: "Produced competitive ROC-AUC performance with SHAP and permutation-based explainability.",
    tech: ["XGBoost", "LightGBM", "SHAP", "Scikit-learn", "Feature Engineering"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "FPGA / Hardware AI",
    title: "FPGA Snake Game with Hardware AI",
    problem: "Implementing a real-time game engine without a software processor.",
    approach:
      "Designed processor-less game engine on Xilinx FPGA with Verilog HDL, VGA output, and Ghost AI using Manhattan distance heuristics.",
    result: "Fully functional hardware-only game running at 60 fps VGA output.",
    tech: ["Verilog HDL", "FPGA", "VGA", "Digital Logic"],
    github: "https://github.com/mtahaarif/FPGA-Implementation-of-Advanced-Snake-Game-with-AI",
  },
  {
    tag: "Hardware Architecture",
    title: "Custom 16-bit Harvard-Architecture Processor",
    problem: "Understanding processor design from the ground up.",
    approach:
      "Designed a 16-bit processor in Verilog with custom ISA, Control Unit, Datapath, and Register File.",
    result: "Working processor executing custom assembly instructions in simulation and synthesis.",
    tech: ["Verilog HDL", "ISA Design", "Digital Logic", "FPGA"],
    github: "https://github.com/mtahaarif/Custom-16-Bit-Processor",
  },
  {
    tag: "Systems Programming",
    title: "Comprehensive OS Scheduler and Disk Simulator",
    problem: "Understanding scheduling trade-offs requires live simulation of concurrent CPU and disk algorithms.",
    approach:
      "Built Java simulation for Round Robin, EDF, SCAN, and C-SCAN with concurrent execution using SwingWorker and visual Gantt timeline outputs.",
    result: "Delivered an interactive analysis tool for algorithm behavior without UI blocking.",
    tech: ["Java", "SwingWorker", "Concurrency", "Scheduling Algorithms"],
    github: "https://github.com/mtahaarif",
  },
];
