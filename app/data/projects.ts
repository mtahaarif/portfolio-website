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
    title: "SERENITY: Multimodal AI Mental Health System",
    problem:
      "Mental health screening relies on single-modality tools that miss non-verbal cues and emotional nuance.",
    approach:
      "Built an emotion recognition platform fusing facial expression analysis, speech recognition, and LLM-based counseling. Developed CNN-BiLSTM-Attention network trained on RAVDESS, CREMA-D, and IEMOCAP speech datasets. Fine-tuned LLM on Empathetic Dialogues, CounselChat, and DIAC-WOZ.",
    result:
      "Deployed on Raspberry Pi 5 for edge inference with real-time multimodal emotion detection and empathetic AI responses.",
    tech: ["PyTorch", "CNN-BiLSTM-Attention", "LoRA", "RAG", "Optical Flow", "Raspberry Pi"],
    github: "https://github.com/mtahaarif/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-",
  },
  {
    tag: "Clinical AI",
    title: "MedTraceAI: Clinical Deterioration Prediction",
    problem:
      "Early warning signs of clinical deterioration in hospital patients are often detected too late.",
    approach:
      "Developed a real-time clinical AI system detecting early warning signs from streaming vitals, labs, and medications. Implemented LSTM and Temporal Fusion Transformer with multimodal feature fusion and SHAP explainability.",
    result:
      "Production stack with Kafka, FastAPI, Kubernetes, and Terraform; clinician-facing dashboards for actionable alerts.",
    tech: ["LSTM", "Temporal Fusion Transformer", "SHAP", "Kafka", "FastAPI", "Kubernetes", "Terraform"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Full-Stack Engineering",
    title: "Full-Stack Dental Practice Platform & Custom Headless CMS",
    problem:
      "A dental practice needed a modern web platform to replace a legacy site, with non-technical content management.",
    approach:
      "Architected Next.js 14 + TypeScript + MySQL stack with drag-and-drop interface and JWT authentication. Engineered hybrid storage combining Vercel Blob with Git-based CDN assets.",
    result:
      "90% faster content updates (30+ min → <2 min) and <100kB initial page load through SSR and aggressive caching.",
    tech: ["Next.js 14", "TypeScript", "MySQL", "JWT", "Vercel Blob", "Tailwind CSS"],
    github: "https://github.com/mtahaarif/hainescitydental",
  },
  {
    tag: "Computer Vision",
    title: "Real-Time Self-Driving Image Analysis",
    problem:
      "Autonomous navigation requires real-time visual perception on resource-constrained hardware.",
    approach:
      "Built autonomous navigation system on Raspberry Pi 5 using classical CV for lane detection and obstacle segmentation. Implemented Hough transforms, adaptive thresholding, and edge detection for real-time driving decisions.",
    result:
      "Low-latency real-time inference pipeline running on edge hardware for live autonomous navigation.",
    tech: ["OpenCV", "Hough Transform", "Edge Detection", "Raspberry Pi", "Real-Time Processing"],
    github: "https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities",
  },
  {
    tag: "3D Vision",
    title: "3D Environment Reconstruction",
    problem:
      "Converting 2D multi-view images into accurate 3D point clouds for robotics and AR/VR applications.",
    approach:
      "Developed multi-view 3D reconstruction using SIFT/ORB/SURF feature matching and epipolar geometry. Generated dense point clouds via stereo triangulation.",
    result:
      "Accurate 3D scene reconstruction enabling applications in robotics, AR/VR, and autonomous navigation.",
    tech: ["OpenCV", "SIFT", "ORB", "Epipolar Geometry", "Stereo Vision", "Point Clouds"],
    github: "https://github.com/mtahaarif",
  },
  {
    tag: "Applied ML",
    title: "Santander Transaction Prediction",
    problem:
      "Predicting rare transaction events from highly imbalanced, high-dimensional tabular data.",
    approach:
      "Built end-to-end ML pipeline with XGBoost, LightGBM, and Random Forest optimized for ROC-AUC. Applied SHAP and Permutation Feature Importance for model interpretability.",
    result:
      "Strong ROC-AUC performance with interpretable predictions on a competitive Kaggle benchmark.",
    tech: ["XGBoost", "LightGBM", "SHAP", "Scikit-learn", "Feature Engineering"],
    github: "https://github.com/mtahaarif",
  },
];

export const secondaryProjects: Project[] = [
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
];
