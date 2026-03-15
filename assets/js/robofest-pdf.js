
/* ============================================================
   Robofest 5.0 – Water Trash Collector Robot
   Technical Specification PDF Generator
   Uses jsPDF (loaded from CDN in index.html)
   ============================================================ */

function generateRobofestPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 18;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  let y = 0;

  // ── Colour palette ──────────────────────────────────────────
  const C = {
    primary:   [22, 163, 74],   // green
    dark:      [15, 23, 42],    // near-black
    mid:       [51, 65, 85],
    light:     [100, 116, 139],
    bg:        [240, 253, 244], // mint tint
    white:     [255, 255, 255],
    accent:    [5, 150, 105],
  };

  // ── Helpers ──────────────────────────────────────────────────
  function checkPage(need = 10) {
    if (y + need > PAGE_H - 20) {
      doc.addPage();
      y = MARGIN;
    }
  }

  function setRGB(arr) { doc.setTextColor(...arr); }
  function fillRGB(arr) { doc.setFillColor(...arr); }
  function drawRGB(arr) { doc.setDrawColor(...arr); }

  function heading1(text) {
    checkPage(20);
    fillRGB(C.primary);
    doc.roundedRect(MARGIN, y, CONTENT_W, 12, 2, 2, 'F');
    setRGB(C.white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(text, MARGIN + 5, y + 8.5);
    y += 16;
  }

  function heading2(text) {
    checkPage(14);
    setRGB(C.primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(text, MARGIN, y);
    drawRGB(C.primary);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y + 2, MARGIN + CONTENT_W, y + 2);
    y += 7;
  }

  function heading3(text) {
    checkPage(10);
    setRGB(C.accent);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(text, MARGIN + 3, y);
    y += 6;
  }

  function body(text, indent = 0) {
    checkPage(7);
    setRGB(C.dark);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(text, CONTENT_W - indent - 2);
    doc.text(lines, MARGIN + indent, y);
    y += lines.length * 4.8 + 1;
  }

  function bullet(text, indent = 4) {
    checkPage(7);
    setRGB(C.primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('•', MARGIN + indent, y);
    setRGB(C.dark);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, CONTENT_W - indent - 6);
    doc.text(lines, MARGIN + indent + 5, y);
    y += lines.length * 4.8 + 1;
  }

  function spacer(h = 4) { y += h; }

  function tableRow(cols, widths, isHeader = false) {
    checkPage(9);
    const rowH = 8;
    fillRGB(isHeader ? C.primary : (tableRow._alt ? [248, 250, 252] : C.white));
    tableRow._alt = !tableRow._alt;
    drawRGB([203, 213, 225]);
    doc.setLineWidth(0.2);

    let x = MARGIN;
    widths.forEach((w, i) => {
      doc.rect(x, y, w, rowH, isHeader ? 'FD' : 'FD');
      setRGB(isHeader ? C.white : C.dark);
      doc.setFont('helvetica', isHeader ? 'bold' : 'normal');
      doc.setFontSize(8.5);
      const txt = doc.splitTextToSize(cols[i] || '', w - 3);
      doc.text(txt, x + 2, y + 5.5);
      x += w;
    });
    y += rowH;
  }
  tableRow._alt = false;

  function pageFooter(num) {
    const total = doc.internal.getNumberOfPages();
    doc.setPage(num);
    fillRGB([248, 250, 252]);
    doc.rect(0, PAGE_H - 12, PAGE_W, 12, 'F');
    drawRGB(C.primary);
    doc.setLineWidth(0.5);
    doc.line(0, PAGE_H - 12, PAGE_W, PAGE_H - 12);
    setRGB(C.light);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Sardar Vallabhbhai Patel Institute of Technology | Robofest 5.0 – Water Trash Collector Robot', MARGIN, PAGE_H - 6);
    doc.text(`Page ${num} of ${total}`, PAGE_W - MARGIN, PAGE_H - 6, { align: 'right' });
  }

  // ══════════════════════════════════════════════════════════════
  // COVER PAGE
  // ══════════════════════════════════════════════════════════════
  fillRGB(C.dark);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  // Green accent bar
  fillRGB(C.primary);
  doc.rect(0, 0, 6, PAGE_H, 'F');
  doc.rect(0, PAGE_H - 6, PAGE_W, 6, 'F');

  // Institute name
  setRGB(C.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Sardar Vallabhbhai Patel Institute of Technology', PAGE_W / 2, 28, { align: 'center' });

  setRGB(C.primary);
  doc.setFontSize(8);
  doc.text('Ideation Document — Robofest 5.0', PAGE_W / 2, 36, { align: 'center' });

  // Title block
  fillRGB([30, 41, 59]);
  doc.roundedRect(18, 55, PAGE_W - 36, 55, 4, 4, 'F');
  drawRGB(C.primary);
  doc.setLineWidth(0.8);
  doc.roundedRect(18, 55, PAGE_W - 36, 55, 4, 4, 'D');

  setRGB(C.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('ROBOFEST 5.0 PROJECT', PAGE_W / 2, 68, { align: 'center' });

  setRGB(C.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.text('Surface Water Trash', PAGE_W / 2, 82, { align: 'center' });
  doc.text('Collector Robot', PAGE_W / 2, 93, { align: 'center' });

  setRGB(C.primary);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Technical Specification & Ideation Document', PAGE_W / 2, 103, { align: 'center' });

  // Status badges
  const badges = [
    { label: 'STATUS', val: 'Grand Finale Finalist' },
    { label: 'COMPETITION', val: 'Robofest 5.0' },
    { label: 'PATENT', val: 'Application Pending' },
  ];
  let bx = 20;
  badges.forEach(b => {
    const bw = 54;
    fillRGB(C.primary);
    doc.roundedRect(bx, 122, bw, 16, 2, 2, 'F');
    setRGB(C.white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(b.label, bx + bw / 2, 128, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(b.val, bx + bw / 2, 134, { align: 'center' });
    bx += bw + 4;
  });

  // Project info table
  const infoRows = [
    ['Project Type', 'Application-based Surface Water Trash-Collecting Robot'],
    ['Institution', 'SVIT – Sardar Vallabhbhai Patel Institute of Technology, Vasad'],
    ['Team Lead', 'Umang Patel'],
    ['Competition', 'Robofest 5.0 – Grand Finale Finalist (Top 13 Teams in India)'],
    ['Patent', 'Application Pending – Water Surface Cleaning Robot'],
    ['Technologies', 'Robotics · IoT · Raspberry Pi · Embedded Systems · Solar'],
    ['Date', 'March 2025'],
  ];
  let iy = 148;
  infoRows.forEach(([k, v]) => {
    setRGB(C.primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(k + ':', 24, iy);
    setRGB([180, 210, 190]);
    doc.setFont('helvetica', 'normal');
    doc.text(v, 70, iy);
    iy += 7;
  });

  setRGB([100, 116, 139]);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.text('Generated by Umang Patel Portfolio | umangpatel2415@gmail.com', PAGE_W / 2, PAGE_H - 16, { align: 'center' });

  // ══════════════════════════════════════════════════════════════
  // PAGE 2 – TABLE OF CONTENTS
  // ══════════════════════════════════════════════════════════════
  doc.addPage();
  y = MARGIN;

  fillRGB(C.bg);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  setRGB(C.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Table of Contents', MARGIN, y + 8);
  y += 16;

  drawRGB(C.primary);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
  y += 6;

  const toc = [
    ['1', 'Type of Robot', '3'],
    ['2', 'Robot Assembly Design', '3'],
    ['3', 'Components to be Used', '4'],
    ['3.1', 'List of Structure Components', '4'],
    ['3.2', 'List of Motion Components', '4'],
    ['3.3', 'List of Electronics Components', '5'],
    ['3.4', 'List of Other Accessories', '5'],
    ['4', 'Methodology of Making Robot', '6'],
    ['4.1', 'Technical Specification', '6'],
    ['4.2', 'Methodology', '6'],
    ['5', 'Literature Review', '7'],
    ['5.1', 'Introduction', '7'],
    ['5.2', 'Surface Water Robots in Environmental Cleanup', '7'],
    ['5.3', 'Future Prospects', '7'],
    ['5.4', 'Conclusion', '8'],
    ['6', 'Application in Societal Context', '8'],
    ['7', 'Robot Size – Proof of Concept (Small Version)', '9'],
    ['8', 'Robot Size – Prototype (Actual Version)', '9'],
    ['9', 'Timeline for Robot Making', '9'],
    ['10', 'Mind Map & Workflows', '10'],
    ['11', 'Bibliography', '10'],
  ];

  toc.forEach(([num, title, page]) => {
    checkPage(8);
    const isMain = num.length <= 1;
    setRGB(isMain ? C.dark : C.mid);
    doc.setFont('helvetica', isMain ? 'bold' : 'normal');
    doc.setFontSize(isMain ? 9.5 : 8.5);
    const indent = isMain ? 0 : 8;
    doc.text(`${num}.  ${title}`, MARGIN + indent, y);
    setRGB(C.light);
    doc.setFontSize(8);
    doc.text(page, PAGE_W - MARGIN, y, { align: 'right' });
    // dotted line
    drawRGB([200, 200, 200]);
    doc.setLineWidth(0.1);
    doc.setLineDash([1, 2]);
    const titleW = doc.getTextWidth(`${num}.  ${title}`) + indent;
    doc.line(MARGIN + titleW + 3, y - 1, PAGE_W - MARGIN - 6, y - 1);
    doc.setLineDash([]);
    y += isMain ? 7 : 5.5;
  });

  // ══════════════════════════════════════════════════════════════
  // PAGE 3+ – CONTENT
  // ══════════════════════════════════════════════════════════════
  doc.addPage();
  fillRGB(C.white);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  y = MARGIN;

  // ─── Section 1 ───────────────────────────────────────────────
  heading1('1. Type of Robot: Application-Based Surface Water Trash-Collecting Robot');
  bullet('Application-based robot is a mechanical and electrical vehicle that floats on water and collects trash.');
  bullet('Inspired by real-world initiatives like the Ocean Cleanup Project and local river-cleaning campaigns.');
  bullet('Combines robotics, IoT, and renewable energy (solar panels) to solve real-life environmental problems.');
  bullet('Reflects motivation to use engineering for sustainable development and contribute towards Swachh Bharat Abhiyan (Clean India Mission) and global efforts to reduce water pollution.');
  spacer();

  // ─── Section 2 ───────────────────────────────────────────────
  heading1('2. Robot Assembly Design (Proposed Diagram)');
  body('The robot is designed as a catamaran-style floating vehicle equipped with:');
  bullet('Waterproof floating base (HDPE/Plastic Pontoon)');
  bullet('Aluminum/SS corrosion-resistant frame');
  bullet('Front-mounted conveyor belt mechanism for trash collection');
  bullet('Onboard electronics housed in waterproof enclosure');
  bullet('Solar panel (optional) and rechargeable Li-ion battery pack');
  bullet('DC waterproof motors with paddle wheels/propellers for propulsion');
  spacer();

  // ─── Section 3 ───────────────────────────────────────────────
  heading1('3. Components to be Used');

  heading2('3.1 List of Structure Components');
  tableRow(['Component Name', 'Qty'], [130, 44], true);
  [
    ['Waterproof Floating Base (HDPE/Plastic Pontoon)', '2'],
    ['Aluminum / SS Frame (Lightweight corrosion-resistant)', '1'],
    ['DC Waterproof Motors (Propulsion)', '2'],
    ['Motor Mount Bracket (Anti-corrosion)', '2'],
    ['Collection Basket / Net (Plastic Mesh)', '1'],
    ['Conveyor Belt (Rubber/Plastic for trash lifting)', '1'],
    ['Waterproof Servo Motor (for conveyor)', '2'],
    ['Solar Panel (optional for charging)', '1'],
    ['Rechargeable Li-ion Battery Pack', '1'],
    ['Waterproof Electronics Box (for controller & wiring)', '1'],
    ['Arduino / Raspberry Pi Controller', '1'],
    ['Wi-Fi / Bluetooth Module (app control)', '1'],
    ['Ultrasonic / IR Sensors (obstacle detection)', '2'],
    ['Camera Module (for monitoring via app)', '1'],
    ['Wheels / Paddles for Propulsion', '2'],
  ].forEach(r => tableRow(r, [130, 44]));
  spacer();

  checkPage(30);
  heading2('3.2 List of Motion Components');
  tableRow(['Component Name', 'Qty'], [130, 44], true);
  [
    ['Waterproof DC Motors (Propulsion)', '2'],
    ['Servo Motors (Conveyor / Collector Control)', '2'],
    ['Motor Driver Module (L298N or Dual H-Bridge)', '1'],
    ['Ultrasonic Sensors (for obstacle detection)', '2'],
    ['Conveyor Belt Assembly (Plastic/Rubber)', '1'],
    ['Paddle Wheels / Propeller Blades', '2'],
    ['Bearings (for smooth rotation of shafts)', '4'],
    ['Sprockets & Chain (for conveyor motion)', '2'],
    ['Hinges (for adjustable trash basket mount)', '2'],
  ].forEach(r => tableRow(r, [130, 44]));
  spacer();

  checkPage(30);
  heading2('3.3 List of Electronics Components');
  tableRow(['Component Name', 'Qty'], [130, 44], true);
  [
    ['Raspberry Pi 4 (Single-board computer for control + AI vision)', '1'],
    ['Motor Driver Module (L298N Dual H-Bridge)', '2'],
    ['NEO-6M GPS Module (for navigation & tracking)', '1'],
    ['Raspberry Pi Camera Module (5MP/8MP for trash detection)', '1'],
    ['Ultrasonic Sensors (for obstacle detection)', '2'],
    ['Breadboard (for testing and prototyping)', '1'],
    ['Round Rocker Switch (for power ON/OFF)', '1'],
    ['12V Rechargeable Battery Pack (for power supply)', '1'],
    ['Voltage Regulator Module (buck converter 12V → 5V)', '1'],
    ['Waterproof Enclosure Box (for electronics safety)', '1'],
  ].forEach(r => tableRow(r, [130, 44]));
  spacer();

  checkPage(25);
  heading2('3.4 List of Other Accessories');
  tableRow(['Accessory Name', 'Qty'], [130, 44], true);
  [
    ['Hot Glue Sticks (for fixing light parts)', '2'],
    ['Bison Plastic Glue / Epoxy (for strong bonding)', '2'],
    ['Super Glue (for small and quick fixes)', '2'],
    ['Spray Paints (for finishing & anti-rust coating)', '2'],
    ['Waterproof Tape (for sealing joints and wires)', '1 roll'],
    ['Cable Ties (for managing wires neatly)', '1 pack'],
    ['Rubber Sealant / Silicone (for waterproofing electronics)', '1'],
    ['Sandpaper (for smoothing cut surfaces)', '1'],
    ['Safety Gloves & Goggles (for safe assembly work)', '1 set'],
  ].forEach(r => tableRow(r, [130, 44]));
  spacer();

  // ─── Section 4 ───────────────────────────────────────────────
  heading1('4. Methodology of Making Robot');

  heading2('4.1 Technical Specification');
  const techSpecs = [
    ['Battery Powered', 'Operates using a rechargeable battery pack for portability.'],
    ['Floating Mechanism', 'Equipped with lightweight floating base to move on water surface.'],
    ['Propulsion System', 'DC motors with propellers/paddle wheels for forward, backward, left, and right movement.'],
    ['Waste Collection', 'Front-mounted collector with mesh/net to capture floating plastic and debris.'],
    ['Ultrasonic Sensors', 'For obstacle detection and smooth navigation on water.'],
    ['GPS Module', 'For location tracking and guided movement.'],
    ['Camera Module', 'To monitor cleaning process in real-time.'],
    ['Waste Storage', 'Collects and stores waste until disposal.'],
    ['Control System', 'Raspberry Pi-based central controller with motor driver modules.'],
  ];
  tableRow._alt = false;
  tableRow(['Feature', 'Description'], [55, 119], true);
  techSpecs.forEach(r => tableRow(r, [55, 119]));
  spacer();

  heading2('4.2 Methodology');
  const stages = [
    ['Stage 1 – Design Overview', [
      'The robot floats on river surface while collecting plastic and floating waste.',
      'Uses a conveyor belt mechanism / scoop system to capture waste and deposit it into storage bin.',
      'Powered by motors and guided with sensors for stable movement in flowing water.',
      'Eco-friendly, lightweight, and resistant to water and corrosion.',
    ]],
    ['Stage 2 – Mounting and Design Considerations', [
      'Robustness: All components waterproofed and securely mounted to resist water currents.',
      'Ease of Maintenance: Detachable storage bins for easy removal of collected waste.',
      'Material Choice: Non-corrosive metals and plastics for long life in water environments.',
      'Stability: Catamaran-style floating base to maintain balance in moving water.',
    ]],
    ['Stage 3 – Fabrication', [
      'Construct floating body with lightweight waterproof material.',
      'Assemble conveyor/scooping mechanism with gears and motor system.',
      'Install storage container for collected waste.',
      'Integrate solar panel or battery system for sustainable power.',
    ]],
    ['Stage 4 – Integration', [
      'Connect propulsion motors, conveyor belt, and storage mechanism.',
      'Integrate water sensors, ultrasonic sensors, and microcontroller.',
      'Test for waterproof sealing and proper electrical connections.',
    ]],
    ['Stage 5 – Programming', [
      'Develop software for autonomous navigation and waste collection.',
      'Implement obstacle avoidance algorithms (rocks, boats, floating logs).',
      'Control conveyor belt activation only when waste is detected to save power.',
    ]],
    ['Stage 6 – Testing & Calibration', [
      'Perform trials in small water bodies (pools, tanks) to test movement and waste collection.',
      'Calibrate sensors for detecting plastic bottles, bags, and floating debris.',
      'Adjust conveyor speed and motor torque for maximum efficiency.',
    ]],
    ['Stage 7 – Field Testing', [
      'Deploy robot in real rivers/lakes to test under actual environmental conditions.',
      'Observe performance in currents, waves, and varying waste densities.',
    ]],
  ];

  stages.forEach(([title, points]) => {
    heading3(title);
    points.forEach(p => bullet(p));
    spacer(2);
  });

  // ─── Section 5 ───────────────────────────────────────────────
  heading1('5. Literature Review');

  heading2('5.1 Introduction');
  body('Surface-water trash-collecting robots are emerging as an innovative solution to address water pollution in rivers, lakes, and coastal areas. These autonomous or semi-autonomous systems are designed to navigate on the water\'s surface, detect floating waste, and collect it for proper disposal. Their design integrates mechanical collection mechanisms, buoyant platforms, and advanced navigation systems, making them highly effective for environmental cleanup.');
  spacer();

  heading2('5.2 Surface-Water Trash Collecting Robots in Environmental Cleanup Operations');
  heading3('5.2.1 Mobility and Water Surface Adaptation');
  bullet('Buoyancy and Stability: Catamaran-style hulls or multi-floatation pontoons ensure stable operation in mild currents or choppy surfaces (Patel et al., 2021).');
  bullet('Propulsion Systems: Electric motor-driven propellers or paddle wheels enable precise maneuvering; some models integrate GPS-based station-keeping (Nguyen & Rao, 2022).');
  bullet('Environment Interaction: Ultrasonic rangefinders, cameras, and LiDAR detect floating debris and avoid obstacles like boats, vegetation, and piers.');
  spacer(2);

  heading3('5.2.2 Waste Collection Mechanisms');
  bullet('Conveyor Belt Systems: Front-mounted conveyor belts scoop up debris and deposit it into onboard bins (Singh et al., 2020).');
  bullet('Skimming and Netting: Skimmer blades or fine-mesh nets capture micro-plastics and small debris.');
  bullet('Sorting Capability: AI-based vision systems distinguish organic matter from synthetic waste (Khan & Al-Mutairi, 2023).');
  spacer(2);

  heading3('5.2.3 Real-World Applications and Successes');
  bullet('Urban Waterways: Projects in Amsterdam and Mumbai remove several tons of waste annually, reducing clogging in drainage systems (Roberts et al., 2022).');
  bullet('Wildlife Protection: Removing plastic waste helps protect aquatic species from ingestion hazards and entanglement.');
  bullet('Community Engagement: Real-time data dashboards inform local authorities and the public about waste collection volumes and water quality metrics.');
  spacer();

  heading2('5.3 Future Prospects');
  bullet('AI-Powered Navigation: Machine learning algorithms to optimize cleaning routes based on waste density patterns.');
  bullet('Renewable Energy Integration: Solar panel arrays for continuous, emission-free operation.');
  bullet('Autonomous Swarm Systems: Multiple smaller robots working collaboratively to cover large water surfaces.');
  bullet('Modular Attachments: Interchangeable tools for specific tasks such as oil spill skimmers or aquatic plant removal.');
  spacer();

  heading2('5.4 Conclusion');
  body('The evolution of surface-water trash-collecting robots is revolutionizing aquatic waste management. Their combination of stability, intelligent navigation, and efficient waste removal has proven effective in both controlled trials and real-world applications. Continued advancements in AI, renewable energy, and modular design will expand their capabilities, making them indispensable tools for combating global water pollution.');
  spacer();

  // ─── Section 6 ───────────────────────────────────────────────
  heading1('6. Application of the Proposed Robot in a Societal Context');
  const society = [
    ['Environmental Protection', 'Continuously removes floating plastics and debris from rivers, lakes, and harbors. Prevents ingestion of plastics by marine life, curbs waterborne diseases, and maintains aquatic habitats.'],
    ['Public Health Improvement', 'Clean water bodies reduce breeding grounds for disease-carrying mosquitoes and lower risk of waterborne illnesses such as cholera and dysentery.'],
    ['Sustainable Waste Management', 'Front-mounted conveyor system and onboard bins enable systematic collection and segregation of waste for recycling or proper disposal.'],
    ['Operational Safety & Cost Efficiency', 'Replaces hazardous manual cleanup in polluted waters. Reduces risks to human workers while lowering long-term operational costs.'],
    ['Community Engagement & Awareness', 'Real-time monitoring systems and data-sharing platforms display collection volumes and water quality data to authorities and the public.'],
  ];
  tableRow._alt = false;
  tableRow(['Benefit Area', 'Description'], [55, 119], true);
  society.forEach(r => tableRow(r, [55, 119]));
  body('Supports UN Sustainable Development Goals: Clean Water (SDG 6), Life Below Water (SDG 14), and Sustainable Cities (SDG 11).');
  spacer();

  // ─── Section 7 ───────────────────────────────────────────────
  heading1('7. Size of Robot – Proof of Concept (Small Version)');
  tableRow._alt = false;
  tableRow(['Dimension', 'Value'], [80, 94], true);
  tableRow(['Length', '120 cm'], [80, 94]);
  tableRow(['Width', '20 cm'], [80, 94]);
  tableRow(['Height', '23 cm'], [80, 94]);
  spacer();

  heading1('8. Size of Robot – Prototype (Actual Version)');
  tableRow._alt = false;
  tableRow(['Dimension', 'Value'], [80, 94], true);
  tableRow(['Length', '3.0 m'], [80, 94]);
  tableRow(['Width', '1.5 m'], [80, 94]);
  tableRow(['Height', '1.5 m'], [80, 94]);
  spacer();

  // ─── Section 9 ───────────────────────────────────────────────
  heading1('9. Timeline for Robot Making with Milestones');
  tableRow._alt = false;
  tableRow(['Activity', 'Duration'], [130, 44], true);
  [
    ['Project Initiation (Define objectives, roles, scope, initial research)', '15 days'],
    ['Requirement Gathering (Technical specs, test location identification)', '10 days'],
    ['Proof of Concept (Design, develop, iterate prototype)', '60 days'],
    ['Prototype Testing (Deploy & analyze in controlled water bodies)', '10 days'],
    ['Iterative Improvement (Enhance mechanism, optimize navigation)', '30 days'],
    ['Full-Scale Deployment (Test in real-world polluted water bodies)', '60 days'],
    ['Evaluation and Optimization (Performance assessment & final optimization)', '30 days'],
    ['Buffer Time', '15 days'],
    ['Total Tentative Time', '230 days'],
  ].forEach(r => tableRow(r, [130, 44]));
  spacer();

  // ─── Section 10 ──────────────────────────────────────────────
  heading1('10. Mind Map – Core Systems');

  heading3('Core System');
  bullet('Solar Panel for Power: Harnessing sunlight to generate electricity and charge onboard batteries for clean, autonomous operation.');
  bullet('Autonomous Navigation (AI, Sensors, Cameras): GPS + AI software + optical sensors for plotting course, avoiding obstacles, and smart decision-making.');
  bullet('Trash Collection Compartment: Collection area (basket/bin) to gather and store waste during operation.');
  bullet('Propeller Mechanism: Electric propeller provides propulsion and steering, mounted at rear for efficient thrust.');
  bullet('Onboard Camera for Monitoring: Records real-time data, tracks trash, and provides live video for remote monitoring.');
  spacer(2);

  heading3('Navigation Unit');
  bullet('GPS Module: Tracks the boat\'s position on water.');
  bullet('Camera Sensors: Detect debris, obstacles, and water conditions.');
  bullet('Obstacle Detection System: AI and sensor fusion for safe obstacle avoidance.');
  spacer(2);

  heading3('Cleaning Unit');
  bullet('Trash Container/Bin: Stores collected waste.');
  bullet('Conveyor Mechanism: Moves waste from front of boat into the bin.');
  spacer(2);

  heading3('Power Unit');
  bullet('Solar Panel as main renewable energy source.');
  bullet('Rechargeable 12V battery pack as backup/primary power supply.');
  spacer();

  // ─── Section 11 ──────────────────────────────────────────────
  heading1('11. Bibliography & References');

  heading2('Research References');
  const refs = [
    'Patel, R., Mehta, S., & Rao, K. (2021). Stability optimization in catamaran-style aquatic robots. Journal of Environmental Robotics, 14(3), 112–124.',
    'Nguyen, L., & Rao, P. (2022). GPS-guided navigation for autonomous water-cleaning robots. International Journal of Marine Engineering, 28(2), 88–96.',
    'Singh, A., Banerjee, P., & Shah, V. (2020). Conveyor-based waste retrieval systems in aquatic environments. Waste Management Technology Review, 9(1), 45–57.',
    'Khan, M., & Al-Mutairi, Y. (2023). AI vision for selective aquatic waste collection. Journal of Intelligent Robotic Systems, 35(4), 225–239.',
    'Roberts, D., Verma, S., & Lo, J. (2022). Urban deployment of water-cleaning autonomous vehicles. Sustainable Cities Journal, 19(2), 67–80.',
  ];
  refs.forEach((r, i) => {
    checkPage(8);
    body(`[${i + 1}]  ${r}`, 4);
  });
  spacer();

  heading2('Research Links');
  const links = [
    'https://www.roboticsbusinessreview.com/',
    'https://spectrum.ieee.org/',
    'https://www.roboticstrends.com/',
    'https://journals.sagepub.com/home/arx',
    'https://link.springer.com/journal/10514',
    'https://onlinelibrary.wiley.com/journal/15564967',
  ];
  links.forEach(l => bullet(l, 4));

  // ── Footers on all pages ──────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    pageFooter(i);
  }

  // Save
  doc.save('Robofest5_Water_Trash_Collector_Specification.pdf');
}
