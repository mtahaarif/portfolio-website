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
      "Most mental health assistants rely only on text and miss emotional cues from voice and facial signals.",
    approach:
      "I built a local-first assistant that combines FER, SER, Whisper Tiny, FAISS retrieval, and a quantized Qwen2.5 model. I also added SQLite memory, timeouts, and fallback logic for stable real-time sessions.",
    result:
      "Delivered end-to-end multimodal inference on constrained hardware, with an architecture ready for hybrid edge-cloud deployment.",
    tech: ["FastAPI", "TensorFlow Lite", "Whisper Tiny", "Qwen2.5", "RAG", "FAISS", "SQLite", "SQLAlchemy", "Raspberry Pi 5"],
    github: "https://github.com/mtahaarif/Smart-Emotion-Recognition-and-Neural-Intervention-Technology-SERENITY-",
  },
  {
    tag: "Clinical AI",
    title: "MedTraceAI: Clinical Deterioration Prediction",
    problem:
      "Early deterioration signals are spread across vitals, labs, medications, and ADT events, which makes rapid intervention hard.",
    approach:
      "Built temporal pipelines with LSTM and Temporal Fusion Transformer, enforced patient-time correctness, and added explainability with calibration and SHAP.",
    result:
      "Enabled low-latency bedside risk scoring with clinician-facing views and production infrastructure on Kafka, FastAPI, Kubernetes, and Terraform.",
    tech: ["LSTM", "Temporal Fusion Transformer", "SHAP", "Kafka", "FastAPI", "Kubernetes", "Terraform"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Full-Stack Engineering",
    title: "Full-Stack Dental Practice Platform & Custom Headless CMS",
    problem:
      "A dental practice needed a modern website and a CMS that non-technical staff could use confidently.",
    approach:
      "Built a Next.js 14 + TypeScript + MySQL platform with JWT auth, drag-and-drop editing, optimistic UI updates, and hybrid asset storage.",
    result:
      "Cut content update time by 90% (30+ minutes to under 2 minutes) and achieved a sub-100kB initial load with SSR, caching, and image optimization.",
    tech: ["Next.js 14", "TypeScript", "MySQL", "JWT", "Vercel Blob", "Tailwind CSS"],
    github: "https://github.com/mtahaarif/hainescitydental",
  },
  {
    tag: "Computer Vision",
    title: "Human Pose Estimation and Classification",
    problem:
      "Pose estimation systems need reliable evaluation across both ML and classical CV approaches.",
    approach:
      "Built two MPII pipelines: one with MediaPipe keypoints and one classical CV pipeline using contours, skeletonization, and geometry-based heuristics.",
    result:
      "Benchmarked both pipelines with PCKh@0.5, skeleton completeness, symmetry, and angle plausibility metrics.",
    tech: ["OpenCV", "MediaPipe", "SVM", "Random Forest", "Feature Engineering"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "3D Vision",
    title: "3D Environment Reconstruction",
    problem:
      "Recovering 3D structure from 2D views depends on robust correspondences and camera geometry.",
    approach:
      "Implemented SIFT/ORB/SURF matching, epipolar geometry, pose recovery, stereo triangulation, and point-cloud refinement.",
    result:
      "Generated dense and sparse reconstructions suitable for robotics, AR/VR, and autonomous navigation workflows.",
    tech: ["OpenCV", "SIFT", "ORB", "Epipolar Geometry", "Stereo Vision", "Point Clouds"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Edge CV",
    title: "Real-Time Image Analysis for Self-Driving Capabilities",
    problem:
      "Resource-constrained autonomous systems still need robust lane and obstacle perception in real time.",
    approach:
      "Built a classical CV pipeline on Raspberry Pi 5 using ROI selection, downsampling, adaptive thresholding, edge detection, and Hough transforms.",
    result:
      "Generated real-time driving commands (stop, move, left, right, forward, backward) and tracked FPS stability under changing conditions.",
    tech: ["OpenCV", "Raspberry Pi 5", "Hough Transform", "Adaptive Thresholding", "Real-Time Processing"],
    github: "https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities",
  },
];

export const secondaryProjects: Project[] = [
  {
    tag: "Medical AI",
    title: "Lung and Colon Cancer Histopathology Classification",
    problem: "Histopathology review is time-consuming and benefits from consistent image-level classification support.",
    approach:
      "Built and tuned a CNN classifier for five histopathology classes, iterating on dropout, pooling, and network depth.",
    result: "Achieved 98.6% validation accuracy on the target classification benchmark.",
    tech: ["CNN", "PyTorch", "Medical Imaging", "Deep Learning"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Applied ML",
    title: "Santander Customer Transaction Prediction",
    problem: "High-dimensional tabular prediction needs strong generalization and clear feature-level interpretation.",
    approach:
      "Built an end-to-end tabular workflow with feature engineering, cross-validation, and model comparison across Logistic Regression, Random Forest, XGBoost, and LightGBM.",
    result: "Produced competitive ROC-AUC performance with SHAP and permutation-based explainability.",
    tech: ["XGBoost", "LightGBM", "SHAP", "Scikit-learn", "Feature Engineering"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "FPGA / Hardware AI",
    title: "FPGA Snake Game with Hardware AI",
    problem: "Implementing a real-time game engine without a software processor.",
    approach:
      "Designed a processor-less game engine on Xilinx FPGA with Verilog HDL, VGA output, and Ghost AI using Manhattan distance heuristics.",
    result: "Fully functional hardware-only game running at 60 fps VGA output.",
    tech: ["Verilog HDL", "FPGA", "VGA", "Digital Logic"],
    github: "https://github.com/mtahaarif/FPGA-Implementation-of-Advanced-Snake-Game-with-AI",
  },
  {
    tag: "Hardware Architecture",
    title: "Custom 16-bit Harvard-Architecture Processor",
    problem: "Understanding processor design from the ground up.",
    approach:
      "Designed a 16-bit processor in Verilog with a custom ISA, control unit, datapath, and register file.",
    result: "Working processor executing custom assembly instructions in simulation and synthesis.",
    tech: ["Verilog HDL", "ISA Design", "Digital Logic", "FPGA"],
    github: "https://github.com/mtahaarif/Custom-16-Bit-Processor",
  },
  {
    tag: "Systems Programming",
    title: "Comprehensive OS Scheduler and Disk Simulator",
    problem: "Scheduling trade-offs are easier to understand with live simulation of CPU and disk algorithms.",
    approach:
      "Built a Java simulator for Round Robin, EDF, SCAN, and C-SCAN using SwingWorker concurrency and visual Gantt timelines.",
    result: "Delivered an interactive analysis tool for algorithm behavior without UI blocking.",
    tech: ["Java", "SwingWorker", "Concurrency", "Scheduling Algorithms"],
    github: "https://github.com/mtahaarif",
  },
];
