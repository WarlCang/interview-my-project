#!/usr/bin/env node
// Repo invariant checks — run locally with `node scripts/check.mjs`; CI runs the same.
// Zero dependencies; Node 18+.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const failures = [];
const ok = (m) => console.log(`  ok  ${m}`);
const fail = (m) => {
  failures.push(m);
  console.error(`FAIL  ${m}`);
};
const read = (p) => readFileSync(p, "utf8");

// ── 1. JSON validity ─────────────────────────────────────────────────────────
for (const f of [".claude-plugin/plugin.json", ".claude-plugin/marketplace.json"]) {
  try {
    JSON.parse(read(f));
    ok(`${f} is valid JSON`);
  } catch (e) {
    fail(`${f}: invalid JSON — ${e.message}`);
  }
}

// ── 2. SKILL.md frontmatter ──────────────────────────────────────────────────
const skillPath = "skills/interview-my-project/SKILL.md";
const skill = read(skillPath);
const fm = skill.match(/^---\n([\s\S]*?)\n---/);
let skillVersion = null;
if (!fm) {
  fail(`${skillPath}: missing frontmatter`);
} else {
  const fmText = fm[1];
  const name = fmText.match(/^name:\s*(.+)$/m);
  const desc = fmText.match(/^description:\s*(.+)$/m);
  const ver = fmText.match(/^\s*version:\s*"?(\d+\.\d+\.\d+)"?/m);
  if (!name) fail(`${skillPath}: frontmatter missing name`);
  else if (name[1].trim().length > 64) fail(`${skillPath}: name exceeds 64 chars`);
  else ok(`frontmatter name present (${name[1].trim()})`);
  if (!desc) fail(`${skillPath}: frontmatter missing description`);
  else if (desc[1].trim().length > 1024)
    fail(`${skillPath}: description exceeds 1024 chars (${desc[1].trim().length})`);
  else ok(`frontmatter description length ${desc[1].trim().length} <= 1024`);
  if (!ver) fail(`${skillPath}: frontmatter missing metadata.version`);
  else {
    skillVersion = ver[1];
    ok(`frontmatter metadata.version ${skillVersion}`);
  }
}

// ── 3. Version sync: SKILL.md == plugin.json == newest CHANGELOG entry ───────
const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
const clMatch = read("CHANGELOG.md").match(/^## \[(\d+\.\d+\.\d+)\]/m);
if (skillVersion && plugin.version !== skillVersion)
  fail(`version mismatch: SKILL.md ${skillVersion} vs plugin.json ${plugin.version}`);
else ok(`SKILL.md and plugin.json agree on ${plugin.version}`);
if (skillVersion && clMatch && clMatch[1] !== skillVersion)
  fail(`version mismatch: newest CHANGELOG entry ${clMatch[1]} vs SKILL.md ${skillVersion}`);
else if (clMatch) ok(`CHANGELOG newest entry matches (${clMatch[1]})`);
else fail("CHANGELOG.md: no versioned entry found");

// ── 4. Card template placeholders ⇆ SKILL.md documentation ───────────────────
const tpl = read("skills/interview-my-project/assets/card-template.html");
const phIn = (s) => new Set([...s.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]));
const tplPh = phIn(tpl);
const skillPh = phIn(skill);
skillPh.delete("PLACEHOLDER"); // the generic word used in prose
for (const p of tplPh)
  if (!skillPh.has(p)) fail(`card template uses {{${p}}} but SKILL.md never documents it`);
for (const p of skillPh)
  if (!tplPh.has(p)) fail(`SKILL.md documents {{${p}}} but the card template doesn't contain it`);
if (tplPh.size && [...tplPh].every((p) => skillPh.has(p)))
  ok(`card template placeholders (${tplPh.size}) all documented in SKILL.md, and vice versa`);

// ── 5. README parity (EN ⇆ ZH) ───────────────────────────────────────────────
const en = read("README.md");
const zh = read("README_ZH.md");
if (!en.includes("README_ZH.md")) fail("README.md missing link to README_ZH.md");
if (!zh.includes("README.md")) fail("README_ZH.md missing link to README.md");
for (const must of [
  "npx skills add WarlCang/interview-my-project",
  "SECURITY.md",
  "ROADMAP.md",
  "PRODUCT.md",
  "CONTRIBUTING.md",
]) {
  if (!en.includes(must)) fail(`README.md missing "${must}"`);
  if (!zh.includes(must)) fail(`README_ZH.md missing "${must}"`);
}
ok("README EN/ZH cross-linked and both carry install line + doc links");

// ── 6. Relative markdown links resolve ───────────────────────────────────────
const mdFiles = [];
const walk = (dir) => {
  for (const e of readdirSync(dir)) {
    if ([".git", "node_modules", ".interview"].includes(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith(".md")) mdFiles.push(p);
  }
};
walk(".");
let links = 0;
for (const f of mdFiles) {
  for (const m of read(f).matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    links++;
    const path = resolve(dirname(f), target.split("#")[0]);
    if (!existsSync(path)) fail(`${f}: broken relative link → ${target}`);
  }
}
ok(`${links} relative links checked across ${mdFiles.length} markdown files`);

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(
  failures.length
    ? `\n${failures.length} check(s) FAILED`
    : "\nAll checks passed"
);
process.exit(failures.length ? 1 : 0);
