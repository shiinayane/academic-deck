import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const requiredFiles = [
  ".gitignore",
  "index.html",
  "package.json",
  "styles.css",
  "README.md",
  "assets/.gitkeep",
  "decks/labutopia-hrc-weekly.html",
  "scripts/presentation.js"
];

const requiredSlides = [
  "cover-summary",
  "progress-snapshot",
  "architecture-pipeline",
  "metrics-results",
  "risk-decision",
  "next-step-plan",
  "media-single-image",
  "media-video-notes",
  "media-before-after",
  "media-keyframes",
  "related-work-brief",
  "proposal-idea-pitch",
  "discussion-request",
  "appendix-backup"
];

const requiredCssTokens = [
  "--bg: #e9eef4",
  "--paper: #fbfcfe",
  "--ink: #18202a",
  "--blue: #245da8",
  "--teal: #268f89",
  "--risk: #bd4438",
  "--slide-pad-x:",
  "--cover-title-size:",
  "--body-card-size:"
];

const requiredAssets = [
  "assets/scene-grounding-placeholder.svg"
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const file of requiredFiles) {
  assert(existsSync(join(root, file)), `Missing required file: ${file}`);
}

const html = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");
const readme = readFileSync(join(root, "README.md"), "utf8");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const runtime = readFileSync(join(root, "scripts/presentation.js"), "utf8");
const deckHtml = readFileSync(join(root, "decks/labutopia-hrc-weekly.html"), "utf8");

for (const slide of requiredSlides) {
  assert(
    html.includes(`data-slide-type="${slide}"`),
    `Missing slide type: ${slide}`
  );
}

for (const token of requiredCssTokens) {
  assert(css.includes(token), `Missing CSS token: ${token}`);
}

for (const asset of requiredAssets) {
  assert(existsSync(join(root, asset)), `Missing required asset: ${asset}`);
}

assert(html.includes("<video controls preload=\"metadata\""), "Missing native video example");
assert(html.includes("assets/demo-execution.mp4"), "Missing local video asset example");
assert(html.includes("assets/scene-grounding-placeholder.svg"), "Missing local image asset example");
assert(html.includes("<title>Academic Clean Presentation Template</title>"), "Root index should be the English template");
assert(html.includes("Presentation Title"), "Root template should use neutral placeholder content");
assert(!html.includes("LabUtopia-HRC"), "Root template should not contain project-specific content");
assert(!html.includes("本周结论"), "Root template should not contain generated deck content");
assert(!html.includes("play-mark"), "Real video slides should not include a play overlay");
assert(html.includes('src="scripts/presentation.js"'), "Root template should use shared runtime script");
assert(deckHtml.includes('src="../scripts/presentation.js"'), "Generated deck should use shared runtime script");
assert(!html.includes("document.querySelector"), "Root template should not inline deck runtime code");
assert(runtime.includes("IntersectionObserver"), "Slide navigation should sync with manual scroll");
assert(runtime.includes("slide-page"), "Runtime should populate slide footer page numbers");
assert(runtime.includes("getPropertyValue(\"--scroll-safe-area\")"), "Runtime should read the CSS scroll safe area");
assert(runtime.includes("window.scrollTo"), "Runtime should use explicit safe-area scrolling");
assert(runtime.includes('behavior: "auto"'), "Runtime slide navigation should avoid smooth-scroll intermediate states");
assert(!html.includes("http://") && !html.includes("https://"), "Template should not load remote assets");
assert(css.includes("@media print"), "Missing print CSS");
assert(css.includes("@page"), "Missing explicit print page size");
assert(css.includes("@media (max-width: 900px)"), "Missing responsive CSS");
assert(css.includes("@media (min-width: 1200px)"), "Missing large-screen presentation CSS");
assert(css.includes("@media (min-width: 1900px)"), "Missing 2K presentation CSS tier");
assert(css.includes("@media (min-width: 3000px)"), "Missing 4K presentation CSS tier");
assert(css.includes("--slide-max: 1500px"), "Missing 1080p slide width token");
assert(css.includes("--slide-max: 1880px"), "Missing 2K slide width token");
assert(css.includes("--slide-max: 3000px"), "Missing 4K slide width token");
assert(css.includes("--scroll-safe-area:"), "Missing scroll safe-area token");
assert(css.includes("scroll-behavior: auto"), "Presentation navigation should use deterministic scroll behavior");
assert(css.includes("scroll-padding-top: var(--scroll-safe-area)"), "Missing document scroll safe area");
assert(css.includes("scroll-margin-top: var(--scroll-safe-area)"), "Missing slide scroll safe area");
assert(css.includes("\n.slide-frame > :nth-child(2)"), "Missing slide body vertical placement rule");
assert(css.includes(".cover-slide"), "Missing cover slide density rules");
assert(readme.includes("Academic Clean"), "README should document the visual style");
assert(readme.includes("# AcademicDeck"), "README should use the project name");
assert(readme.includes("A quiet, reusable HTML presentation template for research group meetings."), "README should include the project tagline");
assert(readme.includes("Resolution Tiers"), "README should document responsive resolution tiers");
assert(readme.includes("scripts/presentation.js"), "README should document the shared runtime");
assert(packageJson.name === "academic-deck", "package.json should use the npm-safe project name");
assert(packageJson.scripts.validate === "node tests/validate-template.mjs && node tests/validate-deck.mjs && node tests/validate-skill.mjs", "package.json should provide a combined validate script");
assert(packageJson.scripts["validate:deck"] === "node tests/validate-deck.mjs", "package.json should provide a deck validation script");

console.log("Presentation template validation passed.");
