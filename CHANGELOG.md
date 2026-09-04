# Changelog

All notable changes are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/). The skill's version lives in
`skills/interview-my-project/SKILL.md` (`metadata.version`) and
`.claude-plugin/plugin.json`; they move together.

## [0.2.2] — 2026-09-04

### Added
- Feedback loop: the debrief's first-session close invites interview-quality
  feedback once; a dedicated issue form captures the verdict that matters
  ("real interviewer or quiz generator?"), what was off, and what a real
  interviewer would have asked instead.
- Contribution surface: CONTRIBUTING.md with product contracts, PR template
  with a contract checklist, bug-report and showcase issue forms, private
  security-report contact link.
- CI pipeline: `scripts/check.mjs` (version sync across SKILL.md / plugin.json /
  CHANGELOG, frontmatter limits, card-template placeholder parity, EN/ZH README
  parity, relative-link integrity) on Node 18 + 22; advisory skills-CLI
  discovery check; Conventional Commits PR-title gate.

## [0.2.1] — 2026-09-04

### Added
- Per-question result tracking in `questions.json` (`status` lifecycle,
  `times_asked`, `best_score`) — readiness is now computed from records, not
  estimated.
- Git history as a universal session-history source: bounded `git log --stat`
  mining keeps history-derived questions alive on any agent, with or without
  transcripts.
- Candidate pushback rule: disputed claims are verified on the spot, wrong claims
  conceded plainly, and a successful defense scores 🟢 — never protect a wrong claim.
- Early-exit close-out: `stop` still runs the debrief, scorecard (marked partial),
  and readiness card.
- Returning candidates get fresh probes on work added since the last session.
- Interview controls (`stop`/`skip`/`score`) disclosed once at the open; rambling
  answers may be cut off like a real interviewer would.
- One-time offer to gitignore `.interview/`; `prep.md` format spec; question count
  scales to what the project supports instead of padding.

### Fixed
- Taxonomy heading rendered as body text; modes list relocated to its own section
  and now includes `lang <code>`.

## [0.2.0] — 2026-09-04

### Added
- Skeptical bar-raiser persona: doubts ownership and project value by default; every
  jab earned by evidence; skepticism drops on solid answers.
- Say / Avoid / Fix coaching cards after every answer, grounded in the actual code
  and session history; Fix items compile into `.interview/prep.md`.
- Calibration: the interview adapts to what the project is and the target role
  (`role <position>` — engineering, PM, design, data, or anything else).
- Multilingual interviews (`lang <code>` or mirroring) with a language-invariant
  quality bar; persona re-created natively per language.
- Shareable readiness card (1200×630) generated at debrief from a shipped template.
- Cross-agent capability contract: core needs only read + write + converse;
  shell, subagents, and session logs are progressive enhancements with fallbacks.
- Evidence-integrity contract: citations only from files actually read, quotes
  verbatim or absent, honest "can't verify" over confident bluffs.
- Ingest reading budget; `schema_version` field in `.interview/*.json` artifacts.
- Bilingual README (EN / 中文), PRODUCT.md, ROADMAP.md with a public
  "Not planned" table, SECURITY.md.

### Changed
- Interviewer is realistic, not omniscient: opens with the walkthrough, drills into
  what the candidate says; deep repo/log knowledge is the hidden answer key —
  `file:line` citations appear in scoring and coaching, never in questions.
- Question bank restructured as a probe map with natural entry paths.

## [0.1.0] — 2026-09-04

### Added
- Initial release: `interview-my-project` skill (full ingest → interrogate → drill →
  debrief → track loop), `/interview-me` command, and `decision-scout` ingest agent
  for Claude Code; installable as a plugin or via `npx skills add`.
