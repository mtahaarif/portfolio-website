import { Brain, Eye, Server, Code2, Cpu } from 'lucide-react';

// Skills — prioritized for AI/CV/ML positioning
export const skillCategories = [
  {
    title: "Computer Vision",
    icon: Eye,
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
    skills: [
      "OpenCV", "YOLO", "MediaPipe", "Optical Flow",
      "Face Anti-Spoofing", "3D Reconstruction", "Image Processing",
    ],
  },
  {
    title: "AI / Deep Learning",
    icon: Brain,
    iconBg: "bg-indigo-600/20",
    iconColor: "text-indigo-400",
    skills: [
      "PyTorch", "TensorFlow", "CNNs", "BiLSTM", "Attention",
      "LLMs", "RAG", "LoRA", "LSTM", "Temporal Fusion Transformer",
      "XGBoost", "LightGBM", "SHAP",
    ],
  },
  {
    title: "ML Infrastructure",
    icon: Server,
    iconBg: "bg-emerald-600/20",
    iconColor: "text-emerald-400",
    skills: [
      "FastAPI", "Docker", "Kubernetes", "Terraform",
      "Kafka", "Git", "Linux", "CI/CD",
    ],
  },
  {
    title: "Software Engineering",
    icon: Code2,
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
    skills: [
      "Python", "TypeScript", "C++", "Java", "SQL",
      "Next.js", "React", "Node.js", "REST APIs", "MySQL", "Tailwind CSS",
    ],
  },
  {
    title: "Hardware / Embedded",
    icon: Cpu,
    iconBg: "bg-amber-600/20",
    iconColor: "text-amber-400",
    skills: [
      "FPGA (Xilinx)", "Verilog HDL", "Raspberry Pi",
      "ESP32", "Arduino", "Digital Logic Design",
    ],
  },
];
