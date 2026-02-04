import { Brain, Code2, Cpu } from 'lucide-react';

export const projectCategories = [
  {
    title: "AI & Computer Vision",
    icon: Brain,
    projects: [
      {
        tag: "Multimodal AI",
        title: "SERENITY: Multimodal AI Mental Care System",
        description: "Engineered an end-to-end multimodal mental health assessment system integrating CNN-based facial expression analysis, Transformer architectures for text sentiment, and Speech Emotion Recognition using Librosa and TensorFlow. Achieved real-time inference across three modalities.",
        tech: ["TensorFlow", "CNNs", "Transformers", "Librosa", "Speech Emotion Recognition"],
        github: "https://github.com/mtahaarif/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-"
      },
      {
        tag: "Medical AI",
        title: "Lung & Colon Cancer Histopathological Classification",
        description: "Developed a CNN-based deep learning classifier for histopathological image analysis, achieving 98.6% validation accuracy on medical imaging datasets. Implemented preprocessing pipelines for microscopy data normalization.",
        tech: ["TensorFlow", "CNN", "Medical Imaging", "Image Classification"],
        github: "https://github.com/mtahaarif/Histopathological-Cancer-Classification"
      },
      {
        tag: "Computer Vision",
        title: "Real-Time Image Analysis for Self-Driving Capabilities",
        description: "Built a computer vision pipeline for autonomous navigation featuring real-time lane detection via Hough transforms, edge detection algorithms, and obstacle recognition. Optimized for low-latency inference on resource-constrained systems.",
        tech: ["OpenCV", "Hough Transform", "Edge Detection", "Real-time Processing"],
        github: "https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities"
      },
      {
        tag: "Medical Imaging",
        title: "White Blood Cell Analysis & Classification",
        description: "Implemented an image processing pipeline utilizing Fourier Transforms, Local Binary Patterns (LBP), and morphological operations for microscopic WBC classification in clinical diagnostic workflows.",
        tech: ["Fourier Transforms", "LBP", "Image Processing", "Medical Diagnostics"],
        github: "https://github.com/mtahaarif/WBC-Analysis-and-Classification"
      },
      {
        tag: "Signal Processing",
        title: "Audio Classification System",
        description: "Designed an MLP-based audio classifier achieving 94% accuracy for speech, music, and noise classification. Extracted MFCC features using Librosa and deployed inference via Flask REST API.",
        tech: ["Librosa", "MFCCs", "Flask", "MLP", "Audio Processing"],
        github: "https://github.com/mtahaarif/Audio-Classification-System"
      }
    ]
  },
  {
    title: "Software Engineering",
    icon: Code2,
    projects: [
      {
        tag: "Client Delivery",
        title: "Haines City Dental: Full-Stack Healthcare Platform",
        description: "Delivered end-to-end website migration and deployment for a healthcare client. Managed MySQL database operations, resolved PHP backend issues, configured HostGator hosting, and integrated WordPress CMS. Reduced client content update time by 90% through custom admin workflows.",
        tech: ["PHP", "MySQL", "WordPress", "HostGator", "Database Management"],
        github: "https://github.com/mtahaarif/hainescitydental"
      },
      {
        tag: "Portfolio",
        title: "Personal Portfolio Website",
        description: "Architected and deployed a performance-optimized portfolio using Next.js 14 App Router with SSR, achieving <100kB initial load. Implemented SEO best practices, structured data (JSON-LD), and CI/CD deployment on Vercel.",
        tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel", "SEO"],
        github: "https://github.com/mtahaarif/portfolio-website1"
      }
    ]
  },
  {
    title: "Embedded Systems & Hardware",
    icon: Cpu,
    projects: [
      {
        tag: "FPGA/Verilog",
        title: "Fixed-Point Digital Filter Design",
        description: "Designed and implemented a Fixed-Point FIR Filter in Verilog HDL for FPGA deployment. Validated filter coefficients and frequency response using MATLAB Fixed-Point simulations before hardware synthesis.",
        tech: ["Verilog", "FPGA", "MATLAB", "Fixed-Point Arithmetic", "Digital Filters"],
        github: "https://github.com/mtahaarif/Custom-16-Bit-Processor"
      },
      {
        tag: "Control Systems",
        title: "Electromechanical System Modeling",
        description: "Applied linear control theory to model and simulate electromechanical systems. Designed controllers using MATLAB/Simulink with stability analysis via Bode plots and root locus methods.",
        tech: ["MATLAB", "Simulink", "Control Theory", "System Modeling"],
        github: "https://github.com/mtahaarif/Smart-Car-Parking-Fare-Generator"
      }
    ]
  }
];
