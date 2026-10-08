const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require(process.env.PPTX_SKILL_DIR + "/scripts/apply_theme.js");

const OUT = process.argv[2];
const PUB = process.argv[3];
const fs = require("fs");
async function pic(file, px = 700) { const buf = await sharp(PUB + "/" + file).resize({ width: px, withoutEnlargement: false }).png().toBuffer(); return "image/png;base64," + buf.toString("base64"); }

const THEME = {
  name: "Titan Watch",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B1F3B", lt1: "FFFFFF", dk2: "2E3466", lt2: "F3F3F7",
    accent1: "C58A00", accent2: "3B3F8C", accent3: "D64545", accent4: "2A9D8F", accent5: "6B7280", accent6: "E7E8EF",
    hlink: "3B3F8C", folHlink: "6B7280",
  },
};

async function icon(name, hex, px = 256) {
  const Comp = fa[name];
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size: px }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = "The Kaiju Lab, compressed";
  pres.author = "Capgemini FDE HVE training";
  const C = pres.SchemeColor;

  pres.defineSlideMaster({
    title: "DARK",
    background: { color: THEME.colors.dk1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.45, w: 8.8, h: 0.8, fontSize: 32, bold: true, color: C.background1, align: "left", margin: 0 }, text: "" } },
      { text: { text: "Kaiju Lab", options: { x: 0.6, y: 5.2, w: 4, h: 0.3, fontSize: 9, color: C.accent1, margin: 0 } } },
    ],
    slideNumber: { x: 9.1, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: C.accent1 },
  });
  pres.defineSlideMaster({
    title: "LIGHT",
    background: { color: THEME.colors.lt1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.4, w: 8.8, h: 0.7, fontSize: 30, bold: true, color: C.text1, align: "left", margin: 0 }, text: "" } },
      { text: { text: "Kaiju Lab", options: { x: 0.6, y: 5.2, w: 4, h: 0.3, fontSize: 9, color: C.accent5, margin: 0 } } },
    ],
    slideNumber: { x: 9.1, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: C.accent5 },
  });
  pres.defineSlideMaster({ title: "COVER", background: { color: THEME.colors.dk1 }, objects: [] });

  const ic = {
    bolt: await icon("FaBolt", THEME.colors.lt1), map: await icon("FaMapMarkedAlt", THEME.colors.lt1),
    user: await icon("FaUserShield", THEME.colors.lt1), chat: await icon("FaComments", THEME.colors.lt1),
    shield: await icon("FaShieldAlt", THEME.colors.lt1), scale: await icon("FaBalanceScale", THEME.colors.lt1),
    code: await icon("FaCode", THEME.colors.lt1), clock: await icon("FaClock", THEME.colors.lt1),
    phone: await icon("FaPhoneAlt", THEME.colors.lt1), eyeslash: await icon("FaEyeSlash", THEME.colors.lt1),
    flag: await icon("FaFlagCheckered", THEME.colors.lt1), check: await icon("FaCheck", THEME.colors.lt1),
    stadium: await icon("FaUsers", THEME.colors.lt1), bridge: await icon("FaRoad", THEME.colors.lt1),
    plane: await icon("FaPlaneArrival", THEME.colors.lt1), water: await icon("FaWater", THEME.colors.lt1),
    terminal: await icon("FaTerminal", THEME.colors.lt1), git: await icon("FaDownload", THEME.colors.lt1),
  };

  const art = { clip: await pic("Clipzilla.png"), alarm: await pic("ClipzillaAlarm.png"), guide: await pic("Clipzilla-Guide.png"), gorathos: await pic("Monster-Gorathos.webp", 320), terrakon: await pic("Monster-Terrakon.webp", 320), vespyra: await pic("Monster-Vespyra.webp", 320) };

  // helper: icon in colored circle
  function circleIcon(slide, data, x, y, d, fill, name) {
    slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: name + " circle" });
    const pad = d * 0.26;
    slide.addImage({ data, x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, objectName: name + " icon" });
  }
  function mono(slide, text, x, y, w, h, opts = {}) {
    slide.addText(text, { x, y, w, h, fontFace: "Courier New", fontSize: opts.fontSize || 13, color: opts.color || C.text1, fill: { color: opts.fill || THEME.colors.lt2 }, margin: 8, valign: "middle", isTextBox: true, objectName: opts.name || "command" });
  }

  // 1 Cover
  pres.addSection({ title: "Introduction" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Introduction" });
  s.addText("CAPGEMINI FDE  ·  HVE TRAINING", { x: 0.7, y: 1.3, w: 8, h: 0.4, fontSize: 12, bold: true, color: C.accent1, charSpacing: 3, margin: 0, isTextBox: true, objectName: "kicker" });
  s.addText("The Kaiju Lab", { x: 0.7, y: 1.7, w: 5.8, h: 1.1, fontSize: 54, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: "deck title" });
  s.addText("One hour. Three labs. One monster. Take a slice of a vibe-coded command centre toward production with the HVE method and hve-core on Claude Code.", { x: 0.7, y: 2.85, w: 5.8, h: 1.3, fontSize: 16, color: "CADCFC", margin: 0, isTextBox: true, objectName: "subtitle" });
  s.addImage({ data: art.clip, x: 6.55, y: 0.9, w: 3.3, h: 3.3, objectName: "mascot" });
  s.addText("Project Titan Watch  ·  github.com/joelcapgemini/titan-watch-lab", { x: 0.7, y: 4.8, w: 8, h: 0.35, fontSize: 11, color: C.accent1, margin: 0, isTextBox: true, objectName: "repo" });
  s.addNotes("Pitch in three minutes. Giant monsters in Puget Sound. Somebody vibe-coded a command centre. Looks fantastic, does nothing. Your job: one slice, toward production, the way we would for a client.");

  // 2 What this is
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Introduction" });
  s.addText("What we are doing", { placeholder: "title" });
  const stats = [["1", "hour"], ["3", "labs"], ["1", "role"], ["4", "scenarios"]];
  stats.forEach(([n, l], i) => {
    const x = 0.6 + i * 2.2;
    s.addText(n, { x, y: 1.25, w: 2.0, h: 1.0, fontSize: 60, bold: true, color: C.accent2, margin: 0, isTextBox: true, objectName: "stat " + l });
    s.addText(l, { x, y: 2.2, w: 2.0, h: 0.4, fontSize: 14, color: C.accent5, margin: 0, isTextBox: true, objectName: "stat label " + l });
  });
  const rows = [
    [ic.map, "A demo that looks done", "The Titan Watch command centre renders a map, a roster, a dispatch panel. None of it does anything."],
    [ic.chat, "Discovery before code", "An AI coach interviews you as the commander, then writes the requirements and the architecture."],
    [ic.shield, "Then security, ethics, a plan", "Three more agents threat-model it, assess the one AI decision in the app, and plan one feature."],
  ];
  rows.forEach(([d, h, b], i) => {
    const y = 2.85 + i * 0.75;
    circleIcon(s, d, 0.6, y, 0.52, THEME.colors.accent2, "row" + i);
    s.addText(h, { x: 1.3, y, w: 8.1, h: 0.3, fontSize: 15, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: "row head " + i });
    s.addText(b, { x: 1.3, y: y + 0.28, w: 8.1, h: 0.4, fontSize: 12, color: C.accent5, margin: 0, isTextBox: true, objectName: "row body " + i });
  });
  s.addNotes("Why monsters: nobody has domain experience, so nobody skips discovery. The method transfers, the kaiju do not.");

  // 3 The app
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Introduction" });
  s.addText("The Titan Watch command centre", { placeholder: "title" });
  // schematic
  const sx = 0.6, sy = 1.3, sw = 5.6, sh = 3.6;
  s.addShape(pres.ShapeType.roundRect, { x: sx, y: sy, w: sw, h: sh, fill: { color: THEME.colors.dk1 }, line: { color: THEME.colors.dk1 }, rectRadius: 0.08, objectName: "app frame" });
  s.addShape(pres.ShapeType.rect, { x: sx + 0.15, y: sy + 0.15, w: 1.25, h: sh - 0.3, fill: { color: THEME.colors.dk2 }, line: { color: THEME.colors.dk2 }, objectName: "roster panel" });
  s.addText("LEVIATHAN ROSTER\n\nGorathos\nVespyra\nTerrakon\nNyxmora\nSkarnyx\nMolvorak", { x: sx + 0.15, y: sy + 0.15, w: 1.25, h: sh - 0.3, fontSize: 8, color: "CADCFC", margin: 6, valign: "top", isTextBox: true, objectName: "roster text" });
  s.addShape(pres.ShapeType.rect, { x: sx + 1.5, y: sy + 0.15, w: 2.75, h: 2.3, fill: { color: "243055" }, line: { color: "243055" }, objectName: "map panel" });
  s.addText("COMMAND MAP\nPuget Sound, six tracks", { x: sx + 1.5, y: sy + 0.15, w: 2.75, h: 0.5, fontSize: 8, color: "CADCFC", margin: 6, valign: "top", isTextBox: true, objectName: "map text" });
  [[2.3, 1.0], [3.2, 1.6], [2.0, 1.9], [3.6, 0.9]].forEach(([dx, dy], i) => s.addShape(pres.ShapeType.ellipse, { x: sx + dx, y: sy + dy, w: 0.14, h: 0.14, fill: { color: THEME.colors.accent3 }, line: { color: THEME.colors.accent3 }, objectName: "kaiju marker " + i }));
  s.addShape(pres.ShapeType.rect, { x: sx + 1.6, y: sy + 0.7, w: 1.0, h: 0.6, fill: { color: THEME.colors.dk1 }, line: { color: THEME.colors.accent1, width: 0.75 }, objectName: "last stand inset" });
  s.addText("LAST STAND\ncoin flip", { x: sx + 1.6, y: sy + 0.7, w: 1.0, h: 0.6, fontSize: 7, color: C.accent1, margin: 4, valign: "middle", align: "center", isTextBox: true, objectName: "last stand text" });
  s.addShape(pres.ShapeType.rect, { x: sx + 1.5, y: sy + 2.55, w: 2.75, h: 0.9, fill: { color: THEME.colors.dk2 }, line: { color: THEME.colors.dk2 }, objectName: "dispatch panel" });
  s.addText("DISPATCH  ·  Scramble Jets  ·  Deploy Mechs  ·  Raise Barrier  ·  Evac Sector  ·  Citywide Alert", { x: sx + 1.5, y: sy + 2.55, w: 2.75, h: 0.9, fontSize: 7.5, color: "CADCFC", margin: 6, valign: "middle", isTextBox: true, objectName: "dispatch text" });
  s.addShape(pres.ShapeType.rect, { x: sx + 4.35, y: sy + 0.15, w: 1.1, h: sh - 0.3, fill: { color: THEME.colors.dk2 }, line: { color: THEME.colors.dk2 }, objectName: "feed panel" });
  s.addText("SIGNAL FEED\n\n12:04 sonar ping\n12:04 sensor 7\n12:05 report\n12:05 public\n12:06 ping", { x: sx + 4.35, y: sy + 0.15, w: 1.1, h: sh - 0.3, fontSize: 7.5, color: "CADCFC", margin: 6, valign: "top", isTextBox: true, objectName: "feed text" });
  // right column
  s.addText("Looks done. Does nothing.", { x: 6.5, y: 1.3, w: 3.0, h: 0.5, fontSize: 18, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: "app claim" });
  const appPts = ["Jets you scramble do not fly anywhere", "Mechs are a counter with no behaviour", "Click a kaiju and the map zooms instead of targeting", "Last Stand picks a city to save with a coin flip"];
  s.addText(appPts.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < appPts.length - 1, paraSpaceAfter: 6 } })), { x: 6.5, y: 1.9, w: 3.0, h: 2.2, fontSize: 12, color: C.text1, margin: 0, isTextBox: true, objectName: "app points" });
  s.addText("Vite and React, no backend, mocked feeds. MIT licensed.\namiedd.github.io/Apex-Dynamics-Response-Systems", { x: 6.5, y: 4.2, w: 3.0, h: 0.7, fontSize: 10, color: C.accent5, margin: 0, isTextBox: true, objectName: "app source" });
  s.addNotes("Open the hosted demo live here if the network allows. Click a kaiju. Click Scramble Jets. Point at the Last Stand inset: that coin flip is Lab 2's Responsible AI seed.");

  // 4 Four scenarios
  pres.addSection({ title: "Your scenario and role" });
  s = pres.addSlide({ masterName: "LIGHT", sectionTitle: "Your scenario and role" });
  s.addText("Pick one scenario", { placeholder: "title" });
  const scen = [
    ["1", art.gorathos, "Sixty-eight thousand at Lumen Field", "Gorathos  ·  11 min to the seawall", "Empty a sold-out stadium into streets that face the kaiju, or hold 68,000 people in a building never built to take a hit."],
    ["2", art.terrakon, "The bridge is floating", "Terrakon  ·  26 min to the anchor line", "Clear the I-90 span and strand Mercer Island, or keep it open and gamble 4,000 vehicles on a cable."],
    ["3", art.vespyra, "Forty aircraft on approach", "Vespyra  ·  19 min to the outer marker", "Land everything onto runways in its path, or divert forty aircraft with fuel some do not have."],
    ["4", ic.water, "The locks", "Skarnyx  ·  no clock, that is the problem", "Raise a three-city alert on a sonar log alone, or wait for something to surface and lose the lakes."],
  ];
  scen.forEach(([n, d, name, meta, choice], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 4.5, y = 1.25 + row * 1.95, w = 4.3, h = 1.8;
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: THEME.colors.lt2 }, line: { color: THEME.colors.lt2 }, rectRadius: 0.08, objectName: "card " + n });
    if (n === "4") circleIcon(s, d, x + 0.2, y + 0.2, 0.55, THEME.colors.accent2, "scen" + n); else s.addImage({ data: d, x: x + 0.15, y: y + 0.12, w: 0.68, h: 0.68, objectName: "monster " + n });
    s.addText(name, { x: x + 0.9, y: y + 0.18, w: w - 1.05, h: 0.35, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: "scen name " + n });
    s.addText(meta, { x: x + 0.9, y: y + 0.5, w: w - 1.05, h: 0.3, fontSize: 10.5, color: C.accent1, bold: true, margin: 0, isTextBox: true, objectName: "scen meta " + n });
    s.addText(choice, { x: x + 0.2, y: y + 0.88, w: w - 0.4, h: 0.85, fontSize: 11, color: C.text1, margin: 0, isTextBox: true, objectName: "scen choice " + n });
  });
  s.addNotes("Two minutes. Pick by interest, not by difficulty. Each pack is four pages: scenario, your card, run sheet. Read page one and your card, nothing else.");

  // 5 Your role
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Your scenario and role" });
  s.addText("You are the incident commander", { placeholder: "title" });
  const roleRows = [
    [ic.user, "Full authority", "Airport, police, WSDOT, Titan Watch: they all answer to you. Order anything. Nobody argues."],
    [ic.eyeslash, "No screen of your own", "You see only what the specialists report, when they report it. Nine of them have already been interviewed."],
    [ic.phone, "Three phrases", "\"I do not know.\"   \"Assume and label it.\"   \"Ask the specialist, then tell me.\""],
    [ic.flag, "Graded on", "Lives first, then property. And whether every decision was a decision, recorded, with a name on it."],
  ];
  roleRows.forEach(([d, h, b], i) => {
    const y = 1.45 + i * 0.9;
    circleIcon(s, d, 0.6, y, 0.6, THEME.colors.accent1, "role" + i);
    s.addText(h, { x: 1.45, y, w: 5.3, h: 0.32, fontSize: 17, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: "role head " + i });
    s.addText(b, { x: 1.45, y: y + 0.32, w: 5.3, h: 0.5, fontSize: 12.5, color: "CADCFC", margin: 0, isTextBox: true, objectName: "role body " + i });
  });
  s.addImage({ data: art.alarm, x: 6.9, y: 1.35, w: 3.0, h: 3.0, objectName: "mascot alarm" });
  s.addNotes("Not realistic on purpose. Easy to follow. The commander decides, the specialists act. The coach will quiz you on what the specialists said.");

  // Lab slides
  pres.addSection({ title: "The labs" });
  function labSlide(num, title, mins, command, steps, done, extra) {
    const sl = pres.addSlide({ masterName: "LIGHT", sectionTitle: "The labs" });
    sl.addText(`Lab ${num}  ·  ${title}`, { placeholder: "title" });
        mono(sl, command, 0.6, 1.25, 5.6, 0.7, { fontSize: 14, name: "lab command" });
    steps.forEach(([h, b], i) => {
      const y = 2.1 + i * 0.7;
      sl.addShape(pres.ShapeType.ellipse, { x: 0.6, y: y + 0.02, w: 0.42, h: 0.42, fill: { color: THEME.colors.accent2 }, line: { color: THEME.colors.accent2 }, objectName: "step circle " + i });
      sl.addText(String(i + 1), { x: 0.6, y: y + 0.02, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "step num " + i });
      sl.addText(h, { x: 1.15, y, w: 5.05, h: 0.28, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: "step head " + i });
      sl.addText(b, { x: 1.15, y: y + 0.27, w: 5.05, h: 0.42, fontSize: 11, color: C.accent5, margin: 0, isTextBox: true, objectName: "step body " + i });
    });
    sl.addShape(pres.ShapeType.roundRect, { x: 6.5, y: 1.25, w: 2.9, h: 3.65, fill: { color: THEME.colors.lt2 }, line: { color: THEME.colors.lt2 }, rectRadius: 0.08, objectName: "side card" });
    circleIcon(sl, ic.check, 6.7, 1.45, 0.5, THEME.colors.accent4, "done");
    sl.addText(`${mins} min`, { x: 8.4, y: 1.55, w: 0.85, h: 0.3, fontSize: 12, bold: true, color: C.accent1, align: "right", margin: 0, isTextBox: true, objectName: "lab minutes" });
    sl.addText("Done when", { x: 7.3, y: 1.5, w: 1.1, h: 0.4, fontSize: 14, bold: true, color: C.text1, margin: 0, isTextBox: true, objectName: "done head" });
    sl.addText(done, { x: 6.7, y: 2.05, w: 2.55, h: 1.1, fontSize: 11.5, color: C.text1, margin: 0, isTextBox: true, objectName: "done body" });
    if (extra) {
      sl.addText(extra[0], { x: 6.7, y: 3.25, w: 2.55, h: 0.3, fontSize: 12, bold: true, color: C.accent3, margin: 0, isTextBox: true, objectName: "extra head" });
      sl.addText(extra[1], { x: 6.7, y: 3.55, w: 2.55, h: 1.25, fontSize: 11, color: C.text1, margin: 0, isTextBox: true, objectName: "extra body" });
    }
    return sl;
  }
  let l = labSlide(1, "Discovery", 25, "/clear   then   /hve-core:dt-coach", [
    ["Pick your scenario from the coach's list", "Say: I am the incident commander. Start the interview."],
    ["Answer five questions as the commander", "From what the specialists reported. \"I do not know\" and \"assume and label it\" are good answers."],
    ["Paste run sheet step 3", "The coach restates the outcome, synthesises, writes a PRD, a diagram and an Azure overlay. 10 to 15 minutes, hands off."],
    ["Write down one question you did not expect", "That is your show-and-tell item."],
  ], "PRD, diagram and Azure overlay exist in your scenario folder under .copilot-tracking/dt/.", ["Rules", "Approve every prompt by hand. Never auto-approve. Decline the canonical deck. No commits, no pushes."]);
  l.addNotes("Checkpoints: 5 min everyone is being interviewed; 12 min synthesis running; 25 min PRD exists. Behind? Pair with a neighbour who is ahead.");

  l = labSlide(2, "Security and Responsible AI", 20, "/hve-core:security-planner\n/hve-core:rai-planner-agent", [
    ["Write three findings you predict. Paper.", "Before anyone types."],
    ["Two Claude Code windows, side by side", "Security in one, RAI in the other. Run sheet steps 5 and 6. They never read each other."],
    ["Security planner runs six phases", "10 to 20 minutes. Approve prompts. Never \"assume I confirm everything\"."],
    ["RAI planner assesses the Last Stand coin flip", "Read its two opening observations before you reply. Do not argue the risk down."],
  ], "Severity summary from the security planner compared with your paper. Go or no-go from the RAI planner.", ["Watch for", "Prompts arrive from both windows. Approve the right one. One screen? Run security first, then RAI."]);
  l.addNotes("Coffee goes while the planner runs. Over the break: which security standards has a client of yours actually named?");

  l = labSlide(3, "Research, Plan, Implement", 25, "/clear   then   /hve-core:rpi-agent", [
    ["Pick one requirement from your PRD", "One screen, one rule, one feed. Not the whole PRD."],
    ["Ask: what do you need to create an RPI plan?", "It lists six things. Paste run sheet step 9 with your six answers."],
    ["Research stops. Read it, fix the file, then /hve-core:rpi-plan", "Correct the artifact, not the chat."],
    ["Plan stops with a critique. Amend one item in the file", "A status, a requirement, a test case. Then: plan amended in the file."],
  ], "Research and plan exist. The plan carries your amendment. The critique has run.", ["Homework", "/hve-core:rpi-implement then /hve-core:rpi-review. Bring the verdict. Complete is not accepted; the review says what is missing."]);
  l.addNotes("At the plan checkpoint ask who amended rather than approved. Celebrate the amendments: that is the human gate working.");

  // 9 Close
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Close" });
  s.addText("Show-and-tell", { placeholder: "title" });
  s.addText("Three minutes per scenario, one presenter. Four items, one sentence each.", { x: 0.6, y: 1.3, w: 8.8, h: 0.4, fontSize: 14, color: "CADCFC", margin: 0, isTextBox: true, objectName: "close intro" });
  const closeItems = [[ic.chat, "One coach question you did not expect"], [ic.shield, "One Critical threat you did not predict"], [ic.code, "One plan amendment, and why"], [ic.flag, "Where the loop stopped"]];
  closeItems.forEach(([d, t], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 4.5, y = 1.95 + row * 1.35;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 4.3, h: 1.15, fill: { color: THEME.colors.dk2 }, line: { color: THEME.colors.dk2 }, rectRadius: 0.08, objectName: "close card " + i });
    circleIcon(s, d, x + 0.2, y + 0.28, 0.6, THEME.colors.accent1, "close" + i);
    s.addText(t, { x: x + 1.0, y: y + 0.2, w: 3.1, h: 0.75, fontSize: 15, bold: true, color: C.background1, valign: "middle", margin: 0, isTextBox: true, objectName: "close text " + i });
  });
  s.addImage({ data: art.guide, x: 7.6, y: 4.5, w: 1.0, h: 1.0, objectName: "mascot guide" });
  s.addText("Gaps, not compliments.", { x: 0.6, y: 4.7, w: 6.5, h: 0.4, fontSize: 16, italic: true, color: C.accent1, margin: 0, isTextBox: true, objectName: "close tagline" });
  s.addNotes("Closing questions: which finding would your team have missed? The review found zero defects and still refused acceptance; would you have shipped? What broke today, and would it break on a client machine?");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
