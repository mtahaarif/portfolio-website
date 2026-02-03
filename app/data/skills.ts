import { Brain, Code2, Cpu, Wrench } from 'lucide-react';

export const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
    skills: ["TensorFlow", "PyTorch", "LLaMA-3", "RAG", "LangChain", "Transformers", "BERT", "Prompt Engineering", "Hugging Face", "Keras"]
  },
  {
    title: "Computer Vision & Deep Learning",
    icon: Cpu,
    iconBg: "bg-blue-400/20",
    iconColor: "text-blue-300",
    skills: ["OpenCV", "YOLO", "CNN", "RNN", "LSTM", "BiLSTM", "Optical Flow", "MediaPipe", "Image Processing", "Face Detection"]
  },
  {
    title: "Full-Stack Web Development",
    icon: Code2,
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
    skills: ["Next.js 14 App Router", "React", "TypeScript", "Node.js", "Tailwind CSS", "Server Components", "REST APIs", "Vercel"]
  },
  {
    title: "Backend & Database",
    icon: Code2,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    skills: ["MySQL", "Relational Database Design", "Serverless Functions", "JWT Authentication", "API Development", "SQL Optimization", "Middleware"]
  },
  {
    title: "Programming Languages",
    icon: Code2,
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL", "Verilog", "MATLAB"]
  },
  {
    title: "Hardware & Embedded Systems",
    icon: Cpu,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    skills: ["FPGA", "ESP32", "Raspberry Pi", "Arduino", "Verilog HDL", "Digital Logic Design", "Sensors", "IoT"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    skills: ["Docker", "Git", "GitHub", "Linux", "Vercel", "CI/CD Pipelines", "Flask", "Qt", "VS Code"]
  }
];
