/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const OUTPUT_RELATIVE_PATH = path.join("public", "Resume.pdf");

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
    headline:
      "AI/ML Engineer | Computer Vision | Multimodal AI | ML Systems | PyTorch · OpenCV · LLMs · Edge AI | NUST'26",
    contactLine:
      "Islamabad, Pakistan | +92 317 5434059 | ch.tahaarif2005@gmail.com | linkedin.com/in/muhammad-taha-21a163256 | github.com/mtahaarif",
    summary:
      "Computer Engineering graduate (NUST) specializing in Computer Vision, Multimodal AI, and ML Systems. Built and deployed real-time face anti-spoofing, document verification, and signature forgery detection pipelines during internship at TruID Technologies. Delivered SERENITY (Final Year Project), a local-first multimodal assistant integrating FER, SER, Whisper Tiny, RAG, quantized LLM inference, and persistent conversation memory for real-time therapeutic interaction. Built MedTraceAI for streaming clinical risk prediction with Kafka, FastAPI, Kubernetes, and Terraform. Combines strong AI modeling depth with production engineering, edge deployment, and full-stack execution.",
    skills: [
      {
        label: "Computer Vision:",
        value:
          "OpenCV, MediaPipe, Face Anti-Spoofing, Document Verification, Signature Forgery Detection, Pose Estimation, 3D Reconstruction, Hough Transform, SIFT/ORB/SURF.",
      },
      {
        label: "Deep Learning & Multimodal AI:",
        value:
          "PyTorch, TensorFlow Lite, CNN, BiLSTM, Attention, LSTM, Temporal Fusion Transformer, Whisper Tiny, Qwen2.5, RAG, FAISS, SHAP, XGBoost, LightGBM.",
      },
      {
        label: "ML Systems & Backend:",
        value:
          "FastAPI, Kafka, Kubernetes, Terraform, SQLite, SQLAlchemy, Flask, REST APIs, Git, Linux.",
      },
      {
        label: "Programming & Full-Stack:",
        value: "Python, TypeScript, C++, Java, SQL, Next.js 14, React, MySQL, JWT, Tailwind CSS.",
      },
      {
        label: "Hardware & Embedded:",
        value:
          "Raspberry Pi 5, FPGA (Xilinx), Verilog HDL, ESP32, Arduino, Digital Logic Design, Custom ISA/Processor Design.",
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
          "Engineered face anti-spoofing pipelines for liveness detection across live-user, screen replay, and paper attack scenarios.",
          "Developed texture-based document verification models to classify original versus photocopied identity cards.",
          "Designed signature forgery detection models and optimized inference latency for real-time deployment.",
          "Integrated CV pipelines into production-oriented identity-security workflows.",
        ],
      },
      {
        role: "Freelance Full-Stack Engineer",
        company: "Self-Employed",
        location: "Remote",
        start: "Jan 2026",
        end: "Present",
        bullets: [
          "Built a custom headless CMS for a dental practice and migrated a legacy platform to Next.js with real-time MySQL synchronization.",
          "Developed admin dashboard with drag-and-drop workflows, optimistic updates, and hybrid Vercel Blob + MySQL storage.",
          "Reduced content update turnaround by 90% (30+ minutes to under 2 minutes).",
          "Achieved sub-100kB initial load using SSR, caching, and AVIF/WebP optimization.",
        ],
      },
    ],
    projects: [
      {
        title: "SERENITY (Final Year Project): Smart Emotion Recognition and Neural Intervention",
        bullets: [
          "Architected multimodal interaction loop combining facial emotion recognition (TFLite), speech emotion recognition (TFLite), Whisper Tiny transcription, and quantized Qwen2.5 response generation.",
          "Implemented RAG retrieval with FAISS and persistent context memory using SQLite + SQLAlchemy for personalized, context-aware responses.",
          "Built FastAPI backend with async orchestration, timeout guards, and graceful fallbacks to stabilize real-time inference workflows.",
          "Optimized for constrained hardware and designed architecture for hybrid edge-cloud offload evolution.",
        ],
      },
      {
        title: "MedTraceAI: Real-Time Clinical Deterioration Prediction",
        bullets: [
          "Developed streaming clinical prediction platform ingesting vitals, labs, medications, and ADT events for low-latency bedside risk scoring.",
          "Implemented LSTM and Temporal Fusion Transformer with multimodal feature fusion, calibration monitoring, and SHAP explainability.",
          "Deployed production architecture with Kafka, FastAPI, Kubernetes, and Terraform plus clinician-facing operational dashboards.",
        ],
      },
      {
        title: "Full-Stack Dental Practice Platform and Custom Headless CMS",
        bullets: [
          "Architected Next.js 14 + TypeScript + MySQL platform with custom admin dashboard and real-time content operations.",
          "Implemented hybrid storage with Vercel Blob and Git-backed assets to support scalable media + content workflows.",
          "Reduced update cycle by 90% and delivered sub-100kB initial load through SSR and caching strategies.",
        ],
      },
      {
        title: "Human Pose Estimation and Classification",
        bullets: [
          "Built and compared two pipelines on MPII: MediaPipe keypoint extraction versus from-scratch classical CV using contours, skeletonization, and geometric heuristics.",
          "Engineered joint-angle features and trained SVM/Random Forest classifiers with quantitative evaluation (PCKh@0.5, skeleton completeness, symmetry).",
        ],
      },
      {
        title: "3D Environment Reconstruction from Multi-View Images",
        bullets: [
          "Developed full multi-view reconstruction pipeline using SIFT/ORB/SURF correspondences, epipolar geometry, camera pose estimation, and stereo triangulation.",
          "Generated and refined sparse/dense point clouds for robotics, AR/VR, and spatial scene understanding use cases.",
        ],
      },
      {
        title: "Real-Time Image Analysis for Self-Driving Capabilities",
        bullets: [
          "Built edge vision system on Raspberry Pi 5 for lane detection, obstacle segmentation, and directional decision output.",
          "Optimized pipeline using ROI selection, downsampling, adaptive thresholding, edge detection, and Hough transforms for real-time performance.",
        ],
      },
      {
        title: "Lung and Colon Cancer Classification",
        bullets: [
          "Developed CNN-based histopathology classifier for 5 cancer classes and achieved 98.6% validation accuracy through architectural tuning.",
        ],
      },
      {
        title: "Santander Customer Transaction Prediction",
        bullets: [
          "Built tabular ML pipeline with feature engineering and model benchmarking across Logistic Regression, Random Forest, XGBoost, and LightGBM.",
          "Applied SHAP and permutation importance for interpretable prediction analysis on high-dimensional financial data.",
        ],
      },
      {
        title: "FPGA Snake Game with Hardware-Implemented Ghost AI",
        bullets: [
          "Engineered processor-less game engine on Xilinx FPGA using Verilog HDL with VGA output at 640x480 @ 60Hz.",
          "Implemented autonomous ghost-tracking AI directly in hardware using Manhattan distance minimization logic.",
        ],
      },
      {
        title: "Custom 16-bit Harvard-Architecture Processor",
        bullets: [
          "Designed a complete 16-bit CPU in Verilog with custom ISA, control unit, ALU, datapath, and register file.",
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
      details:
        "Relevant Coursework: Data Structures, Operating Systems, Computer Networks, Computer Architecture, Digital Image Processing, DSP, AI, Machine Learning, Computer Vision, Software Engineering, Database Engineering.",
    },
    certifications: [
      "Deep Learning Specialization — DeepLearning.AI (Dec 2025)",
      "Machine Learning Specialization — Stanford Online (Jul 2025)",
      "AI for Everyone — DeepLearning.AI (Jul 2024)",
      "Introduction to Front-End Development — Meta (Oct 2023)",
      "CS50: Introduction to Programming with Python — Harvard University (Sep 2023)",
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
