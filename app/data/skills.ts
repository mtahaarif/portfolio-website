import { Brain, Code2, Cpu, Wrench } from 'lucide-react';

// Skill Categories - Strict Context (Documented Skills Only)
export const skillCategories = [
  // Tier 1: AI Engineering (Primary)
  {
    title: "AI & Machine Learning",
    icon: Brain,
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
    skills: ["TensorFlow", "Keras", "CNNs", "Transformers", "Multimodal AI", "Speech Emotion Recognition", "Librosa", "Feature Extraction"]
  },
  {
    title: "Computer Vision & Medical AI",
    icon: Cpu,
    iconBg: "bg-blue-400/20",
    iconColor: "text-blue-300",
    skills: ["Image Classification", "Medical Imaging", "Histopathology", "Self-Driving Vision", "WBC Analysis", "Cancer Classification", "Data Augmentation"]
  },
  
  // Tier 2: Software Engineering
  {
    title: "Full-Stack Development",
    icon: Code2,
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
    skills: ["PHP", "MySQL", "WordPress", "Next.js 14", "TypeScript", "React", "Tailwind CSS", "Flask"]
  },
  {
    title: "Deployment & DevOps",
    icon: Wrench,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    skills: ["Vercel", "HostGator", "cPanel", "Git", "GitHub", "CI/CD", "REST APIs", "Domain Management"]
  },
  
  // Tier 3: Embedded & Hardware
  {
    title: "Embedded & Hardware",
    icon: Cpu,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    skills: ["Verilog HDL", "FPGA", "Fixed-Point Filters", "IIR Filters", "Digital Logic Design", "Hardware Simulation"]
  },
  {
    title: "Control & Simulation",
    icon: Wrench,
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    skills: ["MATLAB", "Simulink", "Control Systems", "PID Tuning", "Stability Analysis", "System Modeling"]
  }
];
