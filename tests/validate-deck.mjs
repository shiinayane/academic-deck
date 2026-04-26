import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const deckPath = join(root, "decks/labutopia-hrc-weekly.html");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(deckPath), "Missing generated deck: decks/labutopia-hrc-weekly.html");

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
  assert(html.includes(phrase), `Missing required deck content: ${phrase}`);
}

const slideCount = (html.match(/class="slide"/g) ?? []).length;
assert(slideCount >= 9, `Expected at least 9 slides, found ${slideCount}`);
assert(html.includes('href="../styles.css?v='), "Generated deck should reuse parent styles.css");
assert(html.includes('src="../scripts/presentation.js?v='), "Generated deck should reuse shared runtime");
assert(html.includes("../assets/scene-grounding-placeholder.svg"), "Generated deck should use local media placeholder");
assert(!html.includes("document.querySelector"), "Generated deck should not inline runtime logic");
assert(html.includes("slide-page"), "Generated deck should use auto page number markers");
assert(!html.includes("http://") && !html.includes("https://"), "Generated deck should not load remote assets");

console.log("Generated deck validation passed.");
