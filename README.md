# interview-my-project

**English** | [中文](README_ZH.md)

> **Vibe coding got you the project. `interview-my-project` makes it yours.**

An AI interviewer for **your** repo. It reads your codebase *and* your Claude Code
session logs, asks the questions a real staff engineer would ask about *this specific
project*, and drills you until you can defend every decision cold — before a real
interviewer does it for you.

```
🎙️  What did you try that didn't work?

    > honestly it mostly worked on the first try

🔴  Your session logs show you fought false refusals for two days and
    hand-patched the retrieval score gate to fix them. An interviewer
    will smell this gap. Let's talk about what actually happened.
```

## Why

You shipped a portfolio project with an AI agent. It works. It's on your resume.

Then the interviewer opens your repo and asks: *"Walk me through why you built it this
way."*

Every mock-interview tool tailors questions to a job description. Every AI tutor teaches
from topics. **Nothing interviews you about the code you actually shipped** — and nothing
else can see the reasoning buried in your local agent session logs: the approaches you
abandoned, the errors you fought through, the diffs you approved without reading.

This tool asks about exactly those.

## Install

One line, any agent (Claude Code, Cursor, Codex CLI, Copilot, DeepSeek, OpenCode, …):

```bash
npx skills add WarlCang/interview-my-project -g
```

Then open your agent in the repo you want to be interviewed about and paste your
first prompt:

```
Interview me about this project. Don't go easy on me.
```

### Claude Code plugin (adds /interview-me + the ingest subagent)

```
/plugin marketplace add WarlCang/interview-my-project
/plugin install interview-my-project@interview-my-project
```

Then, in any repo you want to be interviewed about:

```
/interview-me
```

Modes: `/interview-me quick` (5 questions) · `/interview-me deep` (12 + a full data-flow
trace) · `/interview-me focus auth` (drill one subsystem) · `/interview-me role pm`
(calibrate to the room — the same repo gets a different interview for a PM, design,
data, or engineering role, asked by the skeptical senior of *that* discipline).

Works in your language — English, 中文, or anything else (`/interview-me lang zh`, or
just answer in it and the interviewer follows). Same persona, same standards: the
skepticism is re-created natively, not translated.

### No `skills` CLI? Manual install

The interview is a self-contained, [Agent Skills](https://agentskills.io)-format skill
with no Claude-specific machinery: copy `skills/interview-my-project/` into your
agent's skills directory, or just point any agent at the file:

```
Read skills/interview-my-project/SKILL.md and follow it. Interview me about this repo.
```

The interview is identical on every agent. Session-log questions appear wherever
history is found — Claude Code and Codex logs are auto-discovered, and the repo's own
record (progress logs, ADRs, session notes) works on any agent; with nothing found
you get the repo-only interview.

## How it works

1. **Ingest** — scans your repo structure and key decisions, then mines your local
   `~/.claude/projects/` session transcripts for pivots, error-fix cycles, and diffs you
   approved without discussion. Everything stays on your machine.
2. **Interrogate** — builds a ranked question bank a senior interviewer would actually
   ask: architecture choices, X-over-Y tradeoffs, failure modes, scale ceilings — and
   the questions only your transcripts can produce ("why did you abandon approach X?").
3. **Drill** — a real interview in your terminal. One question at a time, follow-up
   pushes when you hand-wave, honest scoring: 🟢 solid / 🟡 shaky / 🔴 couldn't defend.
4. **Coach** — every answer gets a debrief grounded in your actual code: the verdict
   with `file:line` evidence, the model answer you *should* have given (**Say**), the
   thing that hurt you (**Avoid**), and — when the honest answer is weak because the
   project is weak — the concrete repo fix that upgrades it (**Fix**), compiled into a
   prep punch list it can implement with you. Weak questions re-queue for next session.
5. **Track** — a scorecard (`.interview/scorecard.json`) persists your readiness score
   and trend across sessions, and every session ends with a **readiness card**: a
   screenshot-ready 1200×630 summary of how you did. Sharing a brutal score is half
   the fun; watching it climb is the other half.

## What the interview feels like

It plays a *real* interviewer — specifically, the skeptical kind: the bar-raiser
who's seen a hundred AI-generated portfolio projects this year and assumes yours is
one more until you prove otherwise. It opens with "walk me through it — and tell me
something the README wouldn't," doubts your ownership out loud ("you keep saying
'we' — who's we?"), questions whether the project matters at all ("couldn't I build
this in a weekend?"), and drills into what **you** say — it never breaks character by
quoting your code at you. Land a real answer and the skepticism drops for a beat:
*"OK, that's a real answer."* That contrast is the training. But
under the hood it has read everything, and uses that as the answer key: scoring your
answers against what the code actually does, steering follow-ups toward your real weak
spots, and catching you the moment your story contradicts your own session history.

No trivia, no "what is REST." Every probe passes one test: *you can't answer it by
reading a single file for 10 seconds.*

- "Why SQLite? At what point does that decision hurt you, and what's the migration
  story?"
- "Your upstream hangs. Walk me through exactly what the user sees."
- "What was the hardest bug?" — *asked already knowing the true answer from your
  session logs. If you gloss over the thing that cost you two days, it will tell you.*

## FAQ

**Is this cheating tooling?** The opposite. Real-time interview assistance is cheating;
this makes you *actually understand your own project* so you don't need any.

**Does anything leave my machine?** No. Repo, transcripts, and scorecard are all local;
it runs inside your own agent session. The skill is markdown plus one HTML template —
no telemetry, no network calls. Full boundaries in [SECURITY.md](SECURITY.md).

**No session logs for this repo?** It still works — you get the repo-only interview,
minus the history-derived questions. Repos with agent-written progress notes or ADRs
get most of them back, on any agent.

## Roadmap

- **v1 (now)** — the skill: full interview loop, coaching cards, readiness card.
- **v2** — `npx interview-my-project`: fail-closed CLI layer — real log parsing,
  question ranking, and scorecard math as code.
- **v3** — voice mode: mock interviews are naturally spoken.

Full detail — including the **Not planned** table (what we refuse to build, and
why) — in [ROADMAP.md](ROADMAP.md). Product principles in [PRODUCT.md](PRODUCT.md).

## License

MIT
