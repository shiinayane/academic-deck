import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const skillPath = join(root, "skills/academic-deck-html/SKILL.md");
const skillRoot = join(root, "skills/academic-deck-html");
const installerPath = join(root, "tools/install-skill.mjs");
const templateFiles = [
  "templates/index.html",
  "templates/styles.css",
  "templates/scripts/presentation.js",
  "templates/assets/scene-grounding-placeholder.svg"
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(skillPath), "Missing distributed skill: skills/academic-deck-html/SKILL.md");
assert(existsSync(installerPath), "Missing skill installer: tools/install-skill.mjs");
for (const file of templateFiles) {
  assert(existsSync(join(skillRoot, file)), `Missing skill template file: ${file}`);
}

const skill = readFileSync(skillPath, "utf8");
const installer = readFileSync(installerPath, "utf8");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const readme = readFileSync(join(root, "README.md"), "utf8");

assert(skill.includes("name: academic-deck-html"), "Skill frontmatter should use academic-deck-html");
assert(skill.includes("description: Use when"), "Skill frontmatter should describe trigger conditions");
assert(skill.includes("decks/*.html"), "Skill should direct generated HTML decks to decks/");
assert(skill.includes("templates/index.html"), "Skill should document bundled template files");
assert(skill.includes("npm run validate"), "Skill should require repository validation");
assert(!skill.includes("/Volumes/Data/Project"), "Distributed skill should not contain local absolute project paths");
assert(!skill.includes("superpowers"), "Distributed skill should not depend on the superpowers namespace");
assert(!skill.includes("examples/*.html"), "Distributed skill should not use old examples/ deck semantics");

assert(installer.includes(".codex/skills"), "Installer should default to a peer Codex skills directory");
assert(installer.includes("ACADEMIC_DECK_SKILL_DIR"), "Installer should allow overriding the install directory");
assert(installer.includes("cpSync"), "Installer should copy the complete skill directory");
assert(!installer.includes(".codex/superpowers"), "Installer should not default to superpowers skills");
assert(packageJson.scripts["install:skill"] === "node tools/install-skill.mjs", "package.json should provide install:skill");
assert(packageJson.scripts["validate:skill"] === "node tests/validate-skill.mjs", "package.json should provide validate:skill");
assert(packageJson.scripts.validate.includes("node tests/validate-skill.mjs"), "Combined validate script should include skill validation");
assert(readme.includes("npm run install:skill"), "README should document skill installation");
assert(readme.includes("~/.codex/skills"), "README should document the peer skill install location");
assert(readme.includes("bundled templates"), "README should document self-contained skill templates");
assert(readme.includes("One-Line Codex Install"), "README should document one-line Codex installation");
assert(
  readme.includes("Read https://github.com/shiinayane/academic-deck, then install the academic-deck-html skill from that repository into ~/.codex/skills by following its README instructions."),
  "README should include the exact English URL-based Codex install prompt"
);
assert(!readme.includes("请在当前 AcademicDeck 仓库运行"), "README should not use the old local Chinese install prompt");

console.log("Skill validation passed.");
