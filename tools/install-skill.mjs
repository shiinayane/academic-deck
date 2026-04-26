import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { homedir } from "node:os";

const root = resolve(new URL("..", import.meta.url).pathname);
const source = join(root, "skills/academic-deck-html/SKILL.md");
const installRoot = resolve(
  process.env.ACADEMIC_DECK_SKILL_DIR ??
    join(homedir(), ".codex/skills")
);
const destination = join(installRoot, "academic-deck-html/SKILL.md");
const skill = readFileSync(source, "utf8");

if (!skill.includes("name: academic-deck-html")) {
  throw new Error("Source skill is missing the expected academic-deck-html name.");
}

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);

console.log(`Installed academic-deck-html skill to ${destination}`);
