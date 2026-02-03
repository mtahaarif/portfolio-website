/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const OUTPUT_RELATIVE_PATH = path.join("public", "Muhammad_Taha_Resume.pdf");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function formatDateRange(start, end) {
  if (!start && !end) return "";
  if (start && end) return `${start} – ${end}`;
  return start || end;
}

function createLayout(doc) {
  const page = { width: doc.page.width, height: doc.page.height };
  const margins = { top: 50, right: 55, bottom: 55, left: 55 };

  const content = {
    x: margins.left,
    y: margins.top,
    width: page.width - margins.left - margins.right,
    bottomY: page.height - margins.bottom,
  };

  return { page, margins, content };
}

function createWriter(doc) {
  const layout = createLayout(doc);

  const state = {
    x: layout.content.x,
    y: layout.content.y,
    width: layout.content.width,
    bottomY: layout.content.bottomY,
    lineGap: 3,
  };

  function ensureSpace(heightNeeded) {
    if (state.y + heightNeeded <= state.bottomY) return;
    doc.addPage();
    const nextLayout = createLayout(doc);
    state.x = nextLayout.content.x;
    state.y = nextLayout.content.y;
    state.width = nextLayout.content.width;
    state.bottomY = nextLayout.content.bottomY;
  }

  function moveDown(lines = 1, fontSize = 11) {
    state.y += lines * (fontSize + state.lineGap);
  }

  function drawRule(thickness = 1) {
    ensureSpace(10);
    doc
      .save()
      .moveTo(state.x, state.y)
      .lineTo(state.x + state.width, state.y)
      .lineWidth(thickness)
      .strokeColor("#111111")
      .stroke()
      .restore();
    state.y += 8;
  }

  function textBlock(text, options = {}) {
    const {
      font = "Helvetica",
      size = 11,
      color = "#111111",
      indent = 0,
      lineGap = 2,
      paragraphGap = 6,
    } = options;

    doc.font(font).fontSize(size).fillColor(color);
    ensureSpace(size + 10);

    const height = doc.heightOfString(text, {
      width: state.width - indent,
      lineGap,
    });

    ensureSpace(height + paragraphGap);
    doc.text(text, state.x + indent, state.y, {
      width: state.width - indent,
      lineGap,
    });
    state.y += height + paragraphGap;
  }

  function inlineLabelValue(label, value, options = {}) {
    const {
      labelFont = "Helvetica-Bold",
      valueFont = "Helvetica",
      size = 10.5,
      color = "#111111",
      paragraphGap = 3,
    } = options;

    const fullTextHeight = doc.heightOfString(`${label} ${value}`, {
      width: state.width,
      lineGap: 2,
    });
    ensureSpace(fullTextHeight + paragraphGap);

    doc.fillColor(color).fontSize(size);
    doc.font(labelFont).text(label, state.x, state.y, { continued: true });
    doc.font(valueFont).text(` ${value}`, { continued: false, width: state.width });

    state.y += fullTextHeight + paragraphGap;
  }

  function sectionTitle(title) {
    const size = 12.5;
    ensureSpace(size + 16);

    doc.font("Helvetica-Bold").fontSize(size).fillColor("#111111");
    doc.text(title.toUpperCase(), state.x, state.y, {
      width: state.width,
      lineGap: 1,
    });
    state.y += size + 3;
    drawRule(1);
  }

  function bullets(items, options = {}) {
    const {
      size = 10.8,
      bulletIndent = 14,
      textIndent = 26,
      color = "#111111",
      lineGap = 2,
      itemGap = 2,
    } = options;

    doc.font("Helvetica").fontSize(size).fillColor(color);

    for (const item of items) {
      if (!item || !item.trim()) continue;

      const itemHeight = doc.heightOfString(item, {
        width: state.width - textIndent,
        lineGap,
      });
      ensureSpace(itemHeight + itemGap + 8);

      // Bullet symbol
        doc.text("•", state.x + bulletIndent - 8, state.y, {
        width: 10,
        lineGap,
      });

      // Text
      doc.text(item, state.x + textIndent, state.y, {
        width: state.width - textIndent,
        lineGap,
      });

      state.y += itemHeight + itemGap;
    }

    state.y += 4;
  }

  function header({ name, headline, contactLine }) {
    // Name
    doc.font("Helvetica-Bold").fontSize(20).fillColor("#111111");
    ensureSpace(40);
    doc.text(name, state.x, state.y, { width: state.width });
    state.y += 24;

    // Headline
    if (headline) {
      doc.font("Helvetica").fontSize(12).fillColor("#111111");
      const h = doc.heightOfString(headline, { width: state.width, lineGap: 1 });
      ensureSpace(h + 6);
      doc.text(headline, state.x, state.y, { width: state.width, lineGap: 1 });
      state.y += h + 6;
    }

    // Contact line
    if (contactLine) {
      doc.font("Helvetica").fontSize(10.5).fillColor("#111111");
      const h = doc.heightOfString(contactLine, { width: state.width, lineGap: 1 });
      ensureSpace(h + 10);
      doc.text(contactLine, state.x, state.y, { width: state.width, lineGap: 1 });
      state.y += h + 8;
    }

    drawRule(1);
  }

  return {
    layout,
    state,
    ensureSpace,
    moveDown,
    drawRule,
    textBlock,
    inlineLabelValue,
    sectionTitle,
    bullets,
    header,
  };
}

function buildResumeContent() {
  return {
    name: "MUHAMMAD TAHA",
    headline: "AI Engineer | Computer Vision & Embedded Systems Specialist",
    contactLine:
      "Islamabad, Pakistan | +92 317 5434059 | ch.tahaarif2005@gmail.com | LinkedIn: [LinkedIn Profile URL]",
    summary:
      "Final-year Computer Engineering student with a comprehensive portfolio bridging Generative AI, Computer Vision, System Software, and Embedded Hardware. Demonstrated expertise in fine-tuning Large Language Models (LLMs) with RAG, designing hybrid deep neural networks for signal processing, and engineering processor-less hardware solutions on FPGA. Proven track record of delivering end-to-end complex systems, from custom digital logic design to deploying real-time AI inference pipelines.",
    skills: [
      {
        label: "Generative AI & NLP:",
        value:
          "LLMs (LLaMA-3), RAG (Retrieval-Augmented Generation), LoRA fine-tuning, LangChain, Transformers (BERT), prompt engineering, Hugging Face.",
      },
      {
        label: "Computer Vision:",
        value:
          "Micro-Expression Analysis, face anti-spoofing, optical flow, 3D-CNNs, lane detection, MediaPipe, OpenCV, Fourier transforms, YOLO.",
      },
      {
        label: "Software Engineering:",
        value:
          "C++ (Qt, SFML, console graphics), Java (Swing, multithreading), Python, OOP, data structures (Trie), algorithms, design patterns.",
      },
      {
        label: "Networking & Systems:",
        value: "IPv6 design, OSPF, VLANs, router-on-a-stick, Linux, Cisco Packet Tracer, OS scheduling.",
      },
      {
        label: "Hardware & IoT:",
        value:
          "FPGA (Verilog), ESP32, Raspberry Pi, Arduino, digital logic design, custom processor architecture, sensors (LiDAR, PIR).",
      },
      {
        label: "Signal Processing:",
        value:
          "Librosa, MFCCs, spectrogram analysis, speech emotion recognition, CNN-1D, BiLSTM.",
      },
      {
        label: "Tools & DevOps:",
        value: "Docker, Git, SQL, Flask, Xilinx Vivado, Jupyter Notebooks, VS Code.",
      },
    ],
    experience: [
      {
        role: "Computer Vision Intern",
        company: "TruID Technologies",
        location: "National Science and Technology Park (NSTP), Islamabad",
        start: "Jul 2025",
        end: "Aug 2025",
        bullets: [
          "Engineered face anti-spoofing algorithms to detect liveness and differentiate between real users and screen/paper attacks.",
          "Developed a document verification system using texture analysis to classify identity cards as physical originals vs scanned photocopies.",
          "Designed and trained signature forgery detection models to classify genuine vs forged signatures for banking applications.",
          "Optimized computer vision pipelines for real-time inference and collaborated with engineering to integrate models into the core product.",
        ],
      },
    ],
    projects: [
      {
        title: "SERENITY: Smart Emotion Recognition & Neural Intervention (Final Year Project)",
        bullets: [
          "Built a multimodal system combining micro-expression recognition (CV) and LLMs (NLP) to detect suppressed emotions and provide empathetic counseling.",
          "Fine-tuned LLaMA-3 (8B) using LoRA on psychological datasets; implemented RAG grounded in verified CBT clinical guidelines.",
          "Engineered a vision pipeline using optical flow and 3D-CNNs to detect rapid facial micro-expressions (<500ms) using SAMM and CASME II datasets.",
          "Implemented real-time prompt context updates driven by detected non-verbal cues.",
        ],
      },
      {
        title: "Robust Speech Emotion Recognition via Hybrid Deep Neural Networks",
        bullets: [
          "Designed a CNN-BiLSTM-Attention network to capture spectral (CNN) and temporal (LSTM) dynamics for speech emotion recognition.",
          "Aggregated a 50,000+ sample super-corpus from 9 datasets (RAVDESS, CREMA-D, IEMOCAP) to improve in-the-wild generalization.",
          "Achieved 78.41% test accuracy on unseen data by mitigating channel overfitting.",
        ],
      },
      {
        title: "Lung & Colon Cancer Classification (Medical AI)",
        bullets: [
          "Developed a CNN for histopathology image classification into 5 categories; achieved 98.6% validation accuracy via architectural tuning (dropout, max-pooling).",
        ],
      },
      {
        title: "Real-time Image Analysis for Self-Driving Capabilities",
        bullets: [
          "Built real-time lane detection and obstacle recognition using OpenCV (edge detection / Hough transform).",
          "Implemented decision logic to compute steering vectors based on color-coded obstacles in video streams.",
        ],
      },
      {
        title: "White Blood Cell Analysis & Classification (DIP)",
        bullets: [
          "Implemented sharpening using Fourier transforms and Butterworth high-pass filters on microscopic cell images.",
          "Extracted LBP texture features and Hough transform shape features; achieved 66% test accuracy across 5 cell types.",
        ],
      },
      {
        title: "Audio Classification using Neural Networks",
        bullets: [
          "Extracted MFCCs, ZCR, and energy features from the MUSAN dataset using Librosa.",
          "Trained an MLP (94% accuracy) to classify speech/music/noise and deployed via a Flask web interface.",
        ],
      },
      {
        title: "Comprehensive OS Scheduler & Disk Simulator",
        bullets: [
          "Built a Java application simulating CPU scheduling (Round Robin, EDF) and disk scheduling (SCAN, C-SCAN) with Gantt chart visualization.",
          "Used SwingWorker for concurrent simulation without blocking the UI.",
        ],
      },
      {
        title: "Search Engine Desktop Application (Data Structures)",
        bullets: [
          "Developed a file search engine using a Trie (prefix tree) for optimized O(L) lookups and Boolean queries (AND/OR).",
          "Built a Qt (C++) GUI to parse directories, index terms, and execute queries.",
        ],
      },
      {
        title: "IPv6 WAN Design & Inter-VLAN Routing (Computer Networks)",
        bullets: [
          "Designed a scalable IPv6 WAN in Cisco Packet Tracer and implemented router-on-a-stick for inter-VLAN routing.",
          "Configured OSPFv3 dynamic routing and VLAN segmentation across Cisco 2911 routers and 2960 switches.",
        ],
      },
      {
        title: "FPGA Implementation of Advanced Snake Game with AI",
        bullets: [
          "Implemented a processor-less game engine on Xilinx FPGA using Verilog HDL and VGA output (640x480 @ 60Hz).",
          "Built hardware " +
            "AI logic using Manhattan-distance minimization to autonomously track the player.",
        ],
      },
      {
        title: "Custom Harvard-Architecture Processor",
        bullets: [
          "Designed a 16-bit processor in Verilog, including custom ISA, control unit, datapath, and register file.",
        ],
      },
      {
        title: "Autonomous Robo Cop (Security & IoT)",
        bullets: [
          "Built an ESP32-based security vehicle integrating PIR motion sensors for intruder detection and IR sensors for automated fire extinguishing.",
        ],
      },
      {
        title: "Remote Weather Detection IoT Car",
        bullets: [
          "Built a remote-controlled rover using ESP32/Arduino and LoRaWAN to transmit temperature/humidity telemetry to a web dashboard.",
        ],
      },
    ],
    leadership: [
      {
        title: "Lead of Human Resources (HR) | COMPPEC (Computer Project Exhibition Competition)",
        dates: "Apr 2024 – May 2026",
        bullets: [
          "Managed recruitment and coordination of volunteers to ensure smooth execution of the university’s largest project exhibition.",
        ],
      },
      {
        title: "Class Representative | NUST",
        dates: "Sep 2024 – May 2026",
        bullets: [
          "Served as primary liaison between faculty and students, resolving academic concerns and coordinating class schedules.",
        ],
      },
      {
        title: "Event Management | BurRaq (NUST Debating Society)",
        dates: "Nov 2022 – Sep 2024",
        bullets: [
          "Organized debating events and declamation contests, managing logistics and participant engagement.",
        ],
      },
      {
        title: "Awards",
        dates: "",
        bullets: ["Winner: Declamation Competition, BurRaq Extempore Competition (Nov 2022)."],
      },
    ],
    education: {
      degree: "Bachelor of Computer Engineering",
      school: "National University of Sciences and Technology (NUST)",
      location: "Islamabad, Pakistan",
      start: "2022",
      end: "2026",
      details: "CGPA: 3.11/4.0",
    },
    certifications: [
      "Deep Learning Specialization (DeepLearning.AI)",
      "Machine Learning Specialization (Stanford Online)",
      "AI for Everyone (DeepLearning.AI)",
      "Meta Introduction to Front-End Development (Meta/Coursera)",
      "CS50: Introduction to Programming with Python (Harvard University)",
    ],
  };
}

function generateResumePdf(outputPath) {
  const resume = buildResumeContent();

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 50, right: 55, bottom: 55, left: 55 },
    info: {
      Title: "Muhammad Taha - Resume",
      Author: "Muhammad Taha",
    },
  });

  ensureDir(path.dirname(outputPath));
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const w = createWriter(doc);

  // Header
  w.header({
    name: resume.name,
    headline: resume.headline,
    contactLine: resume.contactLine,
  });

  // Summary
  w.sectionTitle("Professional Summary");
  w.textBlock(resume.summary, { size: 10.8, paragraphGap: 6 });

  // Skills
  w.sectionTitle("Technical Skills");
  for (const s of resume.skills) {
    w.inlineLabelValue(s.label, s.value, { size: 10.4, paragraphGap: 2 });
  }
  w.moveDown(0.2, 10);

  // Experience
  w.sectionTitle("Professional Experience");
  for (const exp of resume.experience) {
    const line1 = `${exp.role} | ${exp.company}`;
    const line2 = `${exp.location} | ${formatDateRange(exp.start, exp.end)}`;

    w.textBlock(line1, { font: "Helvetica-Bold", size: 11.2, paragraphGap: 1 });
    w.textBlock(line2, { font: "Helvetica", size: 10.2, color: "#222222", paragraphGap: 4 });
    w.bullets(exp.bullets, { size: 10.6 });
  }

  // Projects
  w.sectionTitle("Projects");
  for (const p of resume.projects) {
    w.textBlock(p.title, { font: "Helvetica-Bold", size: 11.0, paragraphGap: 2 });
    w.bullets(p.bullets, { size: 10.6 });
  }

  // Leadership
  w.sectionTitle("Leadership & Extracurricular");
  for (const l of resume.leadership) {
    const titleLine = l.dates ? `${l.title} (${l.dates})` : l.title;
    w.textBlock(titleLine, { font: "Helvetica-Bold", size: 11.0, paragraphGap: 2 });
    w.bullets(l.bullets, { size: 10.6 });
  }

  // Education
  w.sectionTitle("Education");
  w.textBlock(
    `${resume.education.degree} | ${resume.education.school} | ${resume.education.location}`,
    { font: "Helvetica-Bold", size: 11.0, paragraphGap: 1 }
  );
  w.textBlock(`${formatDateRange(resume.education.start, resume.education.end)} | ${resume.education.details}`, {
    font: "Helvetica",
    size: 10.4,
    paragraphGap: 6,
  });

  // Certifications
  w.sectionTitle("Certifications");
  w.bullets(resume.certifications, { size: 10.6 });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const outputPath = path.join(projectRoot, OUTPUT_RELATIVE_PATH);

  console.log(`Generating ATS-friendly resume PDF...`);
  console.log(`Output: ${outputPath}`);

  await generateResumePdf(outputPath);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
