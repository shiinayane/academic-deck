import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let pptxgen;

try {
  pptxgen = require("pptxgenjs");
} catch {
  pptxgen = require(
    "/Users/shiinayane/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs/dist/pptxgen.cjs.js"
  );
}

const pptx = new pptxgen();
pptx.author = "AcademicDeck";
pptx.company = "LabUtopia";
pptx.subject = "Reusable AcademicDeck Keynote-compatible theme source";
pptx.title = "AcademicDeck Keynote Theme";
pptx.lang = "en-US";
pptx.layout = "LAYOUT_WIDE";
pptx.theme = {
  headFontFace: "Helvetica Neue",
  bodyFontFace: "Helvetica Neue",
  lang: "en-US"
};
pptx.defineLayout({ name: "ACADEMIC_WIDE", width: 13.333, height: 7.5 });
pptx.layout = "ACADEMIC_WIDE";
pptx.margin = 0;

const C = {
  bg: "E9EEF4",
  paper: "FBFCFE",
  panel: "FFFFFF",
  ink: "18202A",
  muted: "596675",
  quiet: "7A8492",
  line: "D9E1EA",
  lineStrong: "C7D2DF",
  blue: "245DA8",
  teal: "268F89",
  blueSoft: "E8F0FB",
  tealSoft: "E7F4F2",
  success: "2F855A",
  warning: "AA741E",
  risk: "BD4438",
  warningSoft: "FFF7E8",
  riskSoft: "FFF2F1"
};

const S = {
  w: 13.333,
  h: 7.5,
  x: 0.42,
  y: 0.34,
  sw: 12.49,
  sh: 6.84,
  padX: 0.45,
  footerY: 6.78
};

function addSlide(type, title) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pptx.ShapeType.roundRect, {
    x: S.x,
    y: S.y,
    w: S.sw,
    h: S.sh,
    rectRadius: 0.05,
    fill: { color: C.paper },
    line: { color: C.lineStrong, width: 1 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: S.x,
    y: S.y,
    w: S.sw * 0.55,
    h: 0.035,
    fill: { color: C.blue },
    line: { color: C.blue, transparency: 100 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: S.x + S.sw * 0.55,
    y: S.y,
    w: S.sw * 0.45,
    h: 0.035,
    fill: { color: C.teal },
    line: { color: C.teal, transparency: 100 }
  });
  slide.addText(type, {
    x: S.x + S.padX,
    y: S.y + 0.38,
    w: 2.8,
    h: 0.26,
    fontFace: "Helvetica Neue",
    fontSize: 11,
    bold: true,
    color: C.blue,
    margin: 0.03,
    fill: { color: C.blueSoft },
    fit: "shrink",
    breakLine: false,
    align: "center",
    valign: "mid",
    radius: 0.11
  });
  slide.addText(title, {
    x: S.x + S.sw - 2.9,
    y: S.y + 0.4,
    w: 2.45,
    h: 0.22,
    fontFace: "Helvetica Neue",
    fontSize: 10,
    color: C.quiet,
    align: "right",
    margin: 0
  });
  addFooter(slide, "AcademicDeck Theme");
  return slide;
}

function addFooter(slide, label = "Footer label", page = "00 / 00") {
  slide.addShape(pptx.ShapeType.line, {
    x: S.x + S.padX,
    y: S.footerY - 0.16,
    w: S.sw - S.padX * 2,
    h: 0,
    line: { color: C.line, width: 1 }
  });
  slide.addText(label, {
    x: S.x + S.padX,
    y: S.footerY,
    w: 4.2,
    h: 0.24,
    fontFace: "Helvetica Neue",
    fontSize: 9.5,
    color: C.quiet,
    margin: 0
  });
  slide.addText(page, {
    x: S.x + S.sw - S.padX - 1.0,
    y: S.footerY,
    w: 1.0,
    h: 0.24,
    fontFace: "Helvetica Neue",
    fontSize: 9.5,
    color: C.quiet,
    margin: 0,
    align: "right"
  });
}

function title(slide, text, y = 1.32, w = 7.2, size = 31) {
  slide.addText(text, {
    x: S.x + S.padX,
    y,
    w,
    h: 0.9,
    fontFace: "Helvetica Neue",
    fontSize: size,
    bold: true,
    color: C.ink,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
}

function subtitle(slide, text, y = 2.2, w = 8.4) {
  slide.addText(text, {
    x: S.x + S.padX,
    y,
    w,
    h: 0.55,
    fontFace: "Helvetica Neue",
    fontSize: 16,
    bold: true,
    color: C.muted,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
}

function card(slide, x, y, w, h, head, body, color = C.teal) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.04,
    fill: { color: C.panel },
    line: { color: C.line, width: 1 }
  });
  slide.addText(head, {
    x: x + 0.16,
    y: y + 0.14,
    w: w - 0.32,
    h: 0.25,
    fontFace: "Helvetica Neue",
    fontSize: 13,
    bold: true,
    color,
    margin: 0
  });
  slide.addText(body, {
    x: x + 0.16,
    y: y + 0.52,
    w: w - 0.32,
    h: h - 0.62,
    fontFace: "Helvetica Neue",
    fontSize: 10.5,
    color: C.ink,
    breakLine: false,
    fit: "shrink",
    margin: 0
  });
}

function row(slide, x, y, w, label, body) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.52,
    rectRadius: 0.035,
    fill: { color: C.paper },
    line: { color: C.line, width: 1 }
  });
  slide.addText(label, {
    x: x + 0.16,
    y: y + 0.16,
    w: 0.86,
    h: 0.18,
    fontFace: "Helvetica Neue",
    fontSize: 10.5,
    bold: true,
    color: C.ink,
    margin: 0
  });
  slide.addText(body, {
    x: x + 1.15,
    y: y + 0.16,
    w: w - 1.32,
    h: 0.18,
    fontFace: "Helvetica Neue",
    fontSize: 10.5,
    color: C.ink,
    margin: 0,
    fit: "shrink"
  });
}

function addPlaceholders(slide, x, y, w, h, label = "Media placeholder") {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.04,
    fill: { color: "F3F6FA" },
    line: { color: C.lineStrong, width: 1 }
  });
  slide.addText(label, {
    x,
    y: y + h / 2 - 0.16,
    w,
    h: 0.32,
    fontFace: "Helvetica Neue",
    fontSize: 13,
    bold: true,
    color: C.quiet,
    align: "center",
    margin: 0
  });
}

// 1. Cover
{
  const slide = addSlide("Weekly Progress", "Group Meeting");
  title(slide, "LabUtopia-HRC Progress Report", 2.6, 9.5, 38);
  subtitle(slide, "Reusable Keynote theme source for quiet academic presentations", 3.36, 8.8);
  card(slide, 0.87, 4.18, 3.65, 0.78, "Done", "Direction, task framing, and reusable template", C.teal);
  card(slide, 4.63, 4.18, 3.65, 0.78, "Now", "Schema, scene grounding, media explanation", C.teal);
  card(slide, 8.39, 4.18, 3.65, 0.78, "Next", "Experiments, evaluator, and report loop", C.teal);
}

// 2. Section divider
{
  const slide = addSlide("Section", "Research framing");
  title(slide, "01", 1.65, 1.4, 56);
  slide.addText("Research Framing", {
    x: 2.25,
    y: 1.86,
    w: 7.3,
    h: 0.6,
    fontFace: "Helvetica Neue",
    fontSize: 32,
    bold: true,
    color: C.ink,
    margin: 0
  });
  slide.addText("Use this layout when the talk turns to a new argument, experiment block, or decision area.", {
    x: 2.25,
    y: 2.55,
    w: 7.6,
    h: 0.55,
    fontFace: "Helvetica Neue",
    fontSize: 15,
    bold: true,
    color: C.muted,
    margin: 0
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 2.25,
    y: 3.45,
    w: 8.4,
    h: 0,
    line: { color: C.lineStrong, width: 1.2 }
  });
}

// 3. Summary decision
{
  const slide = addSlide("Summary", "Decision view");
  title(slide, "This week: preserve the system boundary, prove the closed loop", 1.2, 6.4, 28);
  subtitle(slide, "A decision slide should land the meeting before the details start.", 2.25, 6.2);
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.87,
    y: 3.05,
    w: 6.2,
    h: 0.96,
    fill: { color: C.blueSoft },
    line: { color: C.blueSoft, transparency: 100 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.87,
    y: 3.05,
    w: 0.04,
    h: 0.96,
    fill: { color: C.blue },
    line: { color: C.blue, transparency: 100 }
  });
  slide.addText("Main takeaway", {
    x: 1.05,
    y: 3.28,
    w: 2.2,
    h: 0.22,
    fontFace: "Helvetica Neue",
    fontSize: 13,
    bold: true,
    color: C.ink,
    margin: 0
  });
  slide.addText("Bind benchmark, execution framework, baselines, and failure analysis before expanding scope.", {
    x: 1.05,
    y: 3.6,
    w: 5.55,
    h: 0.24,
    fontFace: "Helvetica Neue",
    fontSize: 11,
    color: C.ink,
    margin: 0,
    fit: "shrink"
  });
  row(slide, 7.45, 1.75, 4.45, "Keep", "language command, safety refusal, execution monitoring");
  row(slide, 7.45, 2.52, 4.45, "Pause", "real robot deployment, full chemistry experiment design");
  row(slide, 7.45, 3.29, 4.45, "Focus", "schema, scene graph, evaluator, logs");
  row(slide, 7.45, 4.06, 4.45, "Output", "simulation-only MVP and reproducible report");
}

// 4. Title body
{
  const slide = addSlide("Title + Body", "Explanation");
  title(slide, "Slide title states the claim, not the topic", 1.15, 8.6, 30);
  subtitle(slide, "Use the body area for three compact points or a small evidence object.", 2.0, 8.2);
  card(slide, 0.87, 3.0, 3.7, 1.15, "Point 1", "Short explanation with enough context for live presentation.", C.blue);
  card(slide, 4.82, 3.0, 3.7, 1.15, "Point 2", "Keep the layout calm and the hierarchy obvious.", C.teal);
  card(slide, 8.77, 3.0, 3.7, 1.15, "Point 3", "Split the slide if text starts to become documentation.", C.success);
}

// 5. Two column
{
  const slide = addSlide("Two Column", "Comparison");
  title(slide, "Use two columns when the reasoning has two independent tracks", 1.1, 9.2, 28);
  card(slide, 0.87, 2.22, 5.65, 2.68, "Current substrate", "Task hierarchy\nController interface\nLanguage and remote inference path\nReusable logs", C.blue);
  card(slide, 6.82, 2.22, 5.65, 2.68, "Missing proof", "Instruction schema\nScene grounding\nEvaluator contract\nFailure taxonomy", C.teal);
}

// 6. Media focus
{
  const slide = addSlide("Media Focus", "Image / video");
  title(slide, "Media slides reserve a stable visual region", 1.05, 7.2, 27);
  addPlaceholders(slide, 0.87, 2.05, 7.15, 3.92, "Drop image or video here");
  row(slide, 8.35, 2.05, 3.9, "00:12", "Instruction enters the execution loop");
  row(slide, 8.35, 2.82, 3.9, "00:28", "Scene state changes after action");
  row(slide, 8.35, 3.59, 3.9, "00:44", "Evaluator captures success/failure");
  row(slide, 8.35, 4.36, 3.9, "Note", "Keep annotations readable at presentation size");
}

// 7. Metrics
{
  const slide = addSlide("Metrics", "Results");
  title(slide, "Metrics should make one result legible from the back row", 1.05, 8.9, 27);
  card(slide, 0.87, 2.18, 3.65, 1.28, "Episodes", "50-100\nprototype target", C.blue);
  card(slide, 4.82, 2.18, 3.65, 1.28, "Success", "tracked by\nevaluator", C.success);
  card(slide, 8.77, 2.18, 3.65, 1.28, "Failures", "categorized by\nroot cause", C.risk);
  slide.addShape(pptx.ShapeType.line, {
    x: 1.05,
    y: 4.4,
    w: 10.8,
    h: 0,
    line: { color: C.lineStrong, width: 1 }
  });
  slide.addText("Replace these cards with a native Keynote chart when the relationship is chartable.", {
    x: 1.05,
    y: 4.72,
    w: 8.8,
    h: 0.3,
    fontFace: "Helvetica Neue",
    fontSize: 12,
    color: C.muted,
    margin: 0
  });
}

// 8. Timeline
{
  const slide = addSlide("Timeline", "Plan");
  title(slide, "Plan slides show sequence and decision gates", 1.08, 8.2, 28);
  const items = [
    ["Week 1", "Schema and task split"],
    ["Week 2", "Prototype episodes"],
    ["Week 3", "Evaluator skeleton"],
    ["Week 4", "Failure analysis report"]
  ];
  items.forEach(([head, body], i) => {
    const x = 0.95 + i * 3.0;
    slide.addShape(pptx.ShapeType.ellipse, {
      x,
      y: 3.0,
      w: 0.28,
      h: 0.28,
      fill: { color: i < 2 ? C.blue : C.teal },
      line: { color: i < 2 ? C.blue : C.teal }
    });
    if (i < items.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: x + 0.28,
        y: 3.14,
        w: 2.68,
        h: 0,
        line: { color: C.lineStrong, width: 1.4 }
      });
    }
    slide.addText(head, {
      x: x - 0.1,
      y: 3.52,
      w: 1.2,
      h: 0.24,
      fontFace: "Helvetica Neue",
      fontSize: 12,
      bold: true,
      color: C.ink,
      margin: 0
    });
    slide.addText(body, {
      x: x - 0.1,
      y: 3.9,
      w: 2.2,
      h: 0.48,
      fontFace: "Helvetica Neue",
      fontSize: 10.8,
      color: C.muted,
      margin: 0,
      fit: "shrink"
    });
  });
}

// 9. Appendix
{
  const slide = addSlide("Appendix", "Backup");
  title(slide, "Appendix pages can be denser, but still need structure", 1.02, 8.8, 26);
  row(slide, 0.87, 2.0, 11.4, "Asset", "Keep local images and videos next to the deck source");
  row(slide, 0.87, 2.78, 11.4, "Export", "Use Keynote theme source as the editable reusable file");
  row(slide, 0.87, 3.56, 11.4, "Rule", "If text becomes a memo, move it to speaker notes or split the slide");
  row(slide, 0.87, 4.34, 11.4, "Check", "Preview at target projector/browser resolution before presenting");
}

await pptx.writeFile({ fileName: "themes/AcademicDeck-Keynote-Theme.pptx" });
