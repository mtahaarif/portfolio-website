import { Brain, Code2, Cpu } from 'lucide-react';

export const projectCategories = [
  {
    title: "AI & Computer Vision",
    icon: Brain,
    projects: [
      {
        tag: "Deep Learning",
        title: "Speech Emotion Recognition",
        description: "Hybrid CNN-BiLSTM-Attention network achieving 78.41% accuracy on 50K+ audio samples from 9 datasets.",
        tech: ["CNN", "BiLSTM", "Librosa", "RAVDESS"],
        github: "https://github.com/mtahaarif/Robust-Speech-Emotion-Recognition-via-Hybrid-Deep-Neural-Networks-"
      },
      {
        tag: "Medical AI",
        title: "Histopathological Cancer Classification",
        description: "CNN-based histopathological image classifier achieving 98.6% validation accuracy for cancer detection.",
        tech: ["CNN", "TensorFlow", "Image Processing", "Medical Imaging"],
        github: "https://github.com/mtahaarif/Histopathological-Cancer-Classification"
      },
      {
        tag: "Computer Vision",
        title: "Self-Driving Vision System",
        description: "Real-time lane detection and obstacle recognition for autonomous navigation using computer vision.",
        tech: ["OpenCV", "Hough Transform", "Edge Detection", "Real-time Processing"],
        github: "https://github.com/mtahaarif/Real-Time-Image-Analysis-for-Self-Driving-Capabilities"
      },
      {
        tag: "Image Processing",
        title: "WBC Analysis & Classification",
        description: "Pipeline using Fourier Transforms and LBP for microscopic white blood cell classification.",
        tech: ["Fourier", "LBP", "Hough Transform", "Microscopy"],
        github: "https://github.com/mtahaarif/WBC-Analysis-and-Classification"
      },
      {
        tag: "Signal Processing",
        title: "Audio Classification System",
        description: "MLP-based classifier (94% accuracy) for speech, music, and noise deployed via Flask API.",
        tech: ["Librosa", "MFCCs", "Flask", "MLP"],
        github: "https://github.com/mtahaarif/Audio-Classification-System"
      }
    ]
  },
  {
    title: "Full-Stack Development",
    icon: Code2,
    projects: [
      {
        tag: "Full Stack Development",
        title: "Full-Stack Dental Practice Platform & Custom Headless CMS",
        description: "Architected a bespoke CMS solving the challenge of managing dynamic content on a serverless platform with legacy database constraints. Built custom Admin Dashboard with drag-and-drop interface, optimistic UI updates, and real-time MySQL synchronization. Engineered hybrid storage system combining Vercel Blob for uploads with Git-based CDN assets. Reduced content update time by 90% (from 30+ min manual edits to <2 min). Achieved <100kB initial load with SSR, AVIF/WebP optimization, and aggressive caching.",
        tech: ["Next.js 14", "TypeScript", "MySQL", "Tailwind CSS", "Vercel Blob", "JWT Auth"],
        github: "https://github.com/mtahaarif/hainescitydental"
      },
      {
        tag: "Systems Programming",
        title: "OS Scheduler Simulator",
        description: "Full-stack Java application simulating CPU and Disk scheduling algorithms with dynamic Gantt Charts.",
        tech: ["Java", "Swing", "Multithreading", "Algorithms"],
        github: "https://github.com/mtahaarif/Comprehensive-OS-Scheduler-Disk-Simulator"
      },
      {
        tag: "Game Development",
        title: "Gameboy Multi-Game Launcher",
        description: "C++ game launcher with SFML graphics, featuring Tetris and Flappy Bird with custom physics engine.",
        tech: ["C++", "SFML", "Game Physics", "Graphics"],
        github: "https://github.com/mtahaarif/-Gameboy-Multi-Game-Launcher"
      },
      {
        tag: "Data Structures",
        title: "Search Engine Application",
        description: "High-performance desktop file search using Trie data structure with O(L) complexity and Qt GUI.",
        tech: ["C++", "Qt", "Trie", "Algorithms"],
        github: "https://github.com/mtahaarif/Search-Engine-Desktop-Application"
      },
      {
        tag: "Object-Oriented Design",
        title: "Airport Traffic Simulation",
        description: "Complex ground traffic modeling using Java OOP principles with interactive Swing GUI.",
        tech: ["Java", "Swing", "OOP", "Simulation"],
        github: "https://github.com/mtahaarif/Object-Oriented-Airport-Traffic-Simulation"
      },
      {
        tag: "Networking",
        title: "IPv6 WAN Design",
        description: "Scalable IPv6 WAN architecture with Router-on-a-Stick, OSPFv3, and VLAN segmentation.",
        tech: ["Cisco", "OSPFv3", "VLANs", "Network Design"],
        github: "https://github.com/mtahaarif/IPv6-WAN-Design"
      },
      {
        tag: "Database Design",
        title: "Industrial Database Management System",
        description: "Normalized SQL database with EER diagram and Python GUI for comprehensive CRUD operations.",
        tech: ["SQL", "Python", "EER Modeling", "Database Design"],
        github: "https://github.com/mtahaarif/Industrial-Database-Management-System"
      }
    ]
  },
  {
    title: "Hardware & FPGA",
    icon: Cpu,
    projects: [
      {
        tag: "FPGA Development",
        title: "Snake Game with Hardware AI",
        description: "Processor-less game engine on Xilinx FPGA with VGA output and Manhattan distance-based AI opponent.",
        tech: ["Verilog", "FPGA", "VGA", "Digital Design"],
        github: "https://github.com/mtahaarif/FPGA-Implementation-of-Advanced-Snake-Game-with-AI"
      },
      {
        tag: "Computer Architecture",
        title: "Custom 16-bit Processor",
        description: "Harvard-Architecture processor with custom ISA, Control Unit, ALU, and complete Datapath.",
        tech: ["Verilog", "ISA Design", "Digital Design", "Computer Architecture"],
        github: "https://github.com/mtahaarif/Custom-16-Bit-Processor"
      },
      {
        tag: "Digital Logic",
        title: "Smart Parking Fare System",
        description: "Application-specific controller with custom ALU, Ripple Counters, and fare calculation logic.",
        tech: ["Digital Logic", "ALU", "Counters", "ASIC"],
        github: "https://github.com/mtahaarif/Smart-Car-Parking-Fare-Generator"
      },
      {
        tag: "IoT & Robotics",
        title: "Autonomous Robo Cop",
        description: "Security surveillance vehicle with ESP32, PIR motion sensors, and automated fire extinguishing.",
        tech: ["ESP32", "PIR", "IR Sensors", "Robotics"],
        github: "https://github.com/mtahaarif/Autonomous-Robo-Cop"
      },
      {
        tag: "IoT & Telemetry",
        title: "Weather Detection Rover",
        description: "Remote-controlled rover with LoRa WAN for long-range environmental telemetry transmission.",
        tech: ["ESP32", "Arduino", "LoRa", "Telemetry"],
        github: "https://github.com/mtahaarif/Remote-Weather-Detection-IoT-Car"
      }
    ]
  }
];
