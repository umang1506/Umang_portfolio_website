/* ============================================================
   Umang Patel – Modern Resume PDF Generator
   Generates a clean, 1-page professional resume matching the latest credentials.
   Uses jsPDF (loaded from CDN in index.html)
   ============================================================ */

function generateResumePDF() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    // Fallback if jsPDF is unavailable
    window.open('assets/pdf/resume.pdf', '_blank');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 14;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  let y = 14;

  // Colors
  const C = {
    primary:   [30, 27, 75],     // Deep indigo
    accent:    [99, 102, 241],   // Purple / indigo accent
    dark:      [24, 24, 27],     // Off-black body text
    muted:     [82, 82, 91],     // Zinc secondary
    line:      [228, 228, 231],   // Light border
    bgSoft:    [244, 244, 245]   // Light grey pill
  };

  function setRGB(arr) { doc.setTextColor(...arr); }
  function drawRGB(arr) { doc.setDrawColor(...arr); }

  function sectionHeading(title) {
    y += 2.5;
    setRGB(C.primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 1.8;
    drawRGB(C.accent);
    doc.setLineWidth(0.6);
    doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
    y += 3.5;
  }

  // ── HEADER ──────────────────────────────────────────────────
  setRGB(C.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.text('UMANG PATEL', PAGE_W / 2, y, { align: 'center' });
  y += 5.5;

  setRGB(C.accent);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('AI / ML DEVELOPER', PAGE_W / 2, y, { align: 'center' });
  y += 4.5;

  setRGB(C.muted);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const contactText = 'umangpatel2415@gmail.com  |  +91 7574885744  |  Vadodara, Gujarat  |  LinkedIn: linkedin.com/in/umang-patel  |  GitHub: github.com/umang1506';
  doc.text(contactText, PAGE_W / 2, y, { align: 'center' });
  y += 4.5;

  // ── PROFESSIONAL SUMMARY ────────────────────────────────────
  sectionHeading('Professional Summary');
  setRGB(C.dark);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const summaryText = 'Computer Engineering undergraduate building practical computer vision models, agentic AI workflows, and full-stack web tools. National Runner-Up at Smart India Hackathon and Robofest 5.0 Grand Finale Finalist. Experienced in taking machine learning pipelines from dataset collection and model training to production API deployment using Python, React, and cloud backends.';
  const summaryLines = doc.splitTextToSize(summaryText, CONTENT_W);
  doc.text(summaryLines, MARGIN, y);
  y += summaryLines.length * 3.8 + 1;

  // ── TECHNICAL SKILLS ────────────────────────────────────────
  sectionHeading('Technical Skills');
  const skills = [
    { label: 'Languages:', val: 'Python, Core Java, C, SQL' },
    { label: 'AI & Machine Learning:', val: 'TensorFlow, OpenCV, MediaPipe, LangGraph, LLM Prompt Chains' },
    { label: 'Web & Backend:', val: 'React.js, FastAPI, Node.js, Express.js, Supabase, Firebase' },
    { label: 'Tools & DevOps:', val: 'Git, Docker, n8n' },
    { label: 'Core Domains:', val: 'Computer Vision, Real-Time Pose Estimation, Workflow Automation' }
  ];

  skills.forEach(s => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.3);
    setRGB(C.primary);
    doc.text(s.label, MARGIN, y);
    const labelW = doc.getTextWidth(s.label) + 2;

    doc.setFont('helvetica', 'normal');
    setRGB(C.dark);
    doc.text(s.val, MARGIN + labelW, y);
    y += 3.7;
  });
  y += 1;

  // ── KEY PROJECTS ────────────────────────────────────────────
  sectionHeading('Key Projects');

  // Project 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  setRGB(C.primary);
  doc.text('Indian Classical Dance Form Mudra Detection Using AI (Smart India Hackathon)', MARGIN, y);
  y += 3.4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  setRGB(C.accent);
  doc.text('Tech: Python, MediaPipe, Flask, OpenCV, TensorFlow, Random Forest', MARGIN, y);
  y += 3.5;

  const proj1Bullets = [
    'Trained a Machine Learning model for mudra detection using angles between hand gestures from live camera or video uploads.',
    'Trained on a 25,000 image dataset of single and double hand Bharatanatyam mudras sourced from scholar archives.',
    'Normalized 63 coordinate values via MediaPipe and Random Forest classifier, achieving 90% accuracy with live Flask video stream.'
  ];
  proj1Bullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setRGB(C.accent);
    doc.text('•', MARGIN + 2, y);
    setRGB(C.dark);
    const lines = doc.splitTextToSize(b, CONTENT_W - 7);
    doc.text(lines, MARGIN + 6, y);
    y += lines.length * 3.4 + 0.6;
  });
  y += 1;

  // Project 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  setRGB(C.primary);
  doc.text('AI Healthcare Receptionist', MARGIN, y);
  setRGB(C.muted);
  doc.setFont('helvetica', 'bold');
  doc.text('IBM Skills Build Capstone', MARGIN + CONTENT_W, y, { align: 'right' });
  y += 3.4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  setRGB(C.accent);
  doc.text('Tech: React.js, Python, FastAPI, LangGraph, Gemini API, PostgreSQL, n8n', MARGIN, y);
  y += 3.5;

  const proj2Bullets = [
    'Built an interactive patient intake application that screens symptoms and directs patients to General or Emergency Ward (e.g. oxygen < 90%).',
    'Integrated Google Gemini API to analyze patient symptoms into diagnosed issues directly through a responsive kiosk interface.',
    'Automated intake records and emergency alert dispatches using n8n and PostgreSQL, cutting simulated patient processing time by half.'
  ];
  proj2Bullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setRGB(C.accent);
    doc.text('•', MARGIN + 2, y);
    setRGB(C.dark);
    const lines = doc.splitTextToSize(b, CONTENT_W - 7);
    doc.text(lines, MARGIN + 6, y);
    y += lines.length * 3.4 + 0.6;
  });
  y += 1;

  // Project 3
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  setRGB(C.primary);
  doc.text('Explain This – AI Document Decoder', MARGIN, y);
  setRGB(C.muted);
  doc.setFont('helvetica', 'bold');
  doc.text('Independent Project', MARGIN + CONTENT_W, y, { align: 'right' });
  y += 3.4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  setRGB(C.accent);
  doc.text('Tech: React, Vite, Node.js, Express, Gemini API, Tesseract.js, Google Cloud Run', MARGIN, y);
  y += 3.5;

  const proj3Bullets = [
    'Developed a document decoder that translates complex legal contracts, loan agreements, and medical reports into plain language.',
    'Integrated Gemini API to process scanned paperwork across English, Gujarati, and Marathi with high character accuracy.',
    'Implemented automated clause scanner to detect hidden charges and unfavorable terms; containerized and deployed on Google Cloud Run.'
  ];
  proj3Bullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setRGB(C.accent);
    doc.text('•', MARGIN + 2, y);
    setRGB(C.dark);
    const lines = doc.splitTextToSize(b, CONTENT_W - 7);
    doc.text(lines, MARGIN + 6, y);
    y += lines.length * 3.4 + 0.6;
  });
  y += 1;

  // ── INTERNSHIP EXPERIENCE ───────────────────────────────────
  sectionHeading('Internship Experience');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  setRGB(C.primary);
  doc.text('IBM Skills Build Intern – AI Automation & Intelligent Solutions', MARGIN, y);
  setRGB(C.muted);
  doc.setFont('helvetica', 'bold');
  doc.text('Jun – July 2026', MARGIN + CONTENT_W, y, { align: 'right' });
  y += 3.4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setRGB(C.accent);
  doc.text('Bharat Cares (AICTE)', MARGIN, y);
  y += 3.5;

  const internBullets = [
    'Completed intensive 45-day program focused on agentic AI workflows, API orchestration, and autonomous systems using n8n.',
    'Built and deployed a full-stack healthcare triage assistant as the capstone deliverable, connecting front-end UI to backend AI agents.'
  ];
  internBullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setRGB(C.accent);
    doc.text('•', MARGIN + 2, y);
    setRGB(C.dark);
    const lines = doc.splitTextToSize(b, CONTENT_W - 7);
    doc.text(lines, MARGIN + 6, y);
    y += lines.length * 3.4 + 0.6;
  });
  y += 1;

  // ── ACHIEVEMENTS & COMPETITIONS ─────────────────────────────
  sectionHeading('Achievements & Competitions');
  const achievements = [
    { title: 'National Runner-Up – Smart India Hackathon (SIH)', desc: 'Trained a real-time computer vision classifier with MediaPipe and TensorFlow on 25,000 images of classical dance hand mudras, reaching 90% accuracy with a live Flask video stream.' },
    { title: 'Grand Finale Finalist – Robofest 5.0', desc: 'Designed and field-tested an autonomous water surface cleaning robot equipped with conveyor belts and motor controllers to collect floating waste from lakes and reservoirs.' },
    { title: 'Odoo Hackathon Finalist', desc: 'Designed a café POS system featuring automated live tracking from chef to customer and dynamic bill payment calculations across all menu categories.' }
  ];

  achievements.forEach(a => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setRGB(C.accent);
    doc.text('•', MARGIN + 2, y);
    
    doc.setFont('helvetica', 'bold');
    setRGB(C.primary);
    doc.text(a.title, MARGIN + 6, y);
    y += 3.3;

    doc.setFont('helvetica', 'normal');
    setRGB(C.dark);
    const lines = doc.splitTextToSize(a.desc, CONTENT_W - 7);
    doc.text(lines, MARGIN + 6, y);
    y += lines.length * 3.3 + 1;
  });
  y += 1;

  // ── EDUCATION ───────────────────────────────────────────────
  sectionHeading('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  setRGB(C.primary);
  doc.text('Sardar Vallabhbhai Patel Institute of Technology (SVIT)', MARGIN, y);
  setRGB(C.accent);
  doc.text('CGPA: 9.17', MARGIN + CONTENT_W, y, { align: 'right' });
  y += 3.4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setRGB(C.dark);
  doc.text('B.E. in Computer Engineering | 2023–2027', MARGIN, y);
  y += 3.8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  setRGB(C.primary);
  doc.text('Phoenix School', MARGIN, y);
  setRGB(C.muted);
  doc.text('12th (PCM): 84 Percentile  |  10th: 98.5 Percentile', MARGIN + CONTENT_W, y, { align: 'right' });
  y += 4.5;

  // ── CERTIFICATIONS ──────────────────────────────────────────
  sectionHeading('Certifications');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  setRGB(C.dark);
  const certs = 'BITS Python Programming  |  Tops Cloud Computing  |  Green skill Python Certificate  |  Udemy C++ Certificate';
  doc.text(certs, MARGIN, y);

  // Save the PDF
  doc.save('Umang_Patel_Resume.pdf');
}
