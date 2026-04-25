import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const deckPath = join(root, "examples/labutopia-hrc-weekly.html");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(deckPath), "Missing mock deck: examples/labutopia-hrc-weekly.html");

const html = readFileSync(deckPath, "utf8");
const requiredPhrases = [
  "LabUtopia-HRC 周进展汇报",
  "本周结论",
  "贡献边界",
  "MVP 任务设计",
  "系统结构",
  "评估指标",
  "媒体页示例",
  "需要讨论的问题",
  "下周计划"
];

for (const phrase of requiredPhrases) {
  assert(html.includes(phrase), `Missing required mock content: ${phrase}`);
}

const slideCount = (html.match(/class="slide"/g) ?? []).length;
assert(slideCount >= 9, `Expected at least 9 slides, found ${slideCount}`);
assert(html.includes('href="../styles.css"'), "Mock deck should reuse parent styles.css");
assert(html.includes('src="../scripts/presentation.js"'), "Mock deck should reuse shared runtime");
assert(html.includes("../assets/scene-grounding-placeholder.svg"), "Mock deck should use local media placeholder");
assert(!html.includes("document.querySelector"), "Mock deck should not inline runtime logic");
assert(html.includes("slide-page"), "Mock deck should use auto page number markers");
assert(!html.includes("http://") && !html.includes("https://"), "Mock deck should not load remote assets");

console.log("Mock deck validation passed.");
