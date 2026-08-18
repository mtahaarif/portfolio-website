import { Brain, Eye, Server, Code2, Cpu } from 'lucide-react';

// Skills — mirrors app/data/cms.ts skillGroups. Every entry is backed by a
// shipped project or professional role; nothing aspirational.
export const skillCategories = [
  {
    title: "Vision, Audio & Edge AI",
    icon: Eye,
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
    skills: [
      "OpenCV", "YOLOv8", "MediaPipe", "ResNet / MobileNet",
      "3D Gaussian Splatting", "Librosa", "Whisper",
      "TFLite (INT8/NF4)", "ONNX", "Raspberry Pi 5",
    ],
  },
  {
    title: "Deep Learning, LLMs & MLOps",
    icon: Brain,
    iconBg: "bg-indigo-600/20",
    iconColor: "text-indigo-400",
    skills: [
      "PyTorch", "TensorFlow", "Hugging Face", "Transformers",
      "LLMs (Qwen, Ollama)", "RAG (FAISS)", "LoRA Fine-Tuning",
      "XGBoost", "LightGBM", "Optuna", "SHAP", "Polars",
    ],
  },
  {
    title: "Backend, APIs & Cloud",
    icon: Server,
    iconBg: "bg-emerald-600/20",
    iconColor: "text-emerald-400",
    skills: [
      "FastAPI", "Flask", "Node.js", "REST APIs",
      "SSE Token Streaming", "PostgreSQL", "MySQL",
      "Prisma", "AWS EC2", "Vercel",
    ],
  },
  {
    title: "Frontend & Languages",
    icon: Code2,
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
    skills: [
      "Python", "TypeScript", "JavaScript", "C++", "Java", "SQL", "MATLAB",
      "Next.js 16", "React 19", "Tailwind CSS", "Framer Motion", "WCAG",
    ],
  },
  {
    title: "Hardware & Embedded",
    icon: Cpu,
    iconBg: "bg-amber-600/20",
    iconColor: "text-amber-400",
    skills: [
      "Verilog HDL", "FPGA (Xilinx)", "ISA Design",
      "ESP32", "Arduino", "LoRa", "Digital Logic",
      "Bash / Linux", "Git",
    ],
  },
];
