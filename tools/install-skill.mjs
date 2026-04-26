import { cpSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { homedir } from "node:os";

const root = resolve(new URL("..", import.meta.url).pathname);
const source = join(root, "skills/academic-deck-html");
const installRoot = resolve(
  process.env.ACADEMIC_DECK_SKILL_DIR ??
    join(homedir(), ".codex/skills")
);
const destination = join(installRoot, "academic-deck-html");
const skill = readFileSync(join(source, "SKILL.md"), "utf8");

if (!skill.includes("name: academic-deck-html")) {
  throw new Error("Source skill is missing the expected academic-deck-html name.");
}

mkdirSync(installRoot, { recursive: true });
rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });

console.log(`Installed academic-deck-html skill to ${destination}`);
