# Security & Privacy

This skill's entire value comes from reading things that are private — your code and
your agent session history. That only works if the boundaries are explicit.

## What the skill reads

- Your repository: source files, docs, manifests (on a bounded reading budget).
- Local agent session history, when present: `~/.claude/projects/<project>/*.jsonl`
  (Claude Code), `~/.codex/sessions/**/*.jsonl` (Codex CLI), and agent-written
  records inside the repo (progress logs, ADRs, session notes).

## What it writes

- `.interview/` inside your repo: `questions.json`, `scorecard.json`, `prep.md`, and
  `readiness-card.html`. These may quote your code and session history — if you don't
  want interview scores in version control, add `.interview/` to your `.gitignore`.

## What it never does

- **Nothing leaves your machine.** The skill is markdown plus an HTML template — it
  contains no code that phones home, no telemetry, no update checks, no network
  calls of its own. It runs entirely inside your agent, under your agent's
  permissions and your subscription.
- It never reads session history for *other* projects, and never needs credentials,
  tokens, or access to anything beyond the repo and the history locations above.
- Your interview answers exist only in your agent conversation and your local
  `.interview/` directory.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting on this repository when available;
otherwise open an issue asking for a private security contact — without including
details. Never post session-log content, code from private repos, or personal data
in public issues; redact reproductions to the minimum.
