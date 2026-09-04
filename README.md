# interview-my-project

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

### Claude Code (full experience)

```
/plugin marketplace add WarlCang/interview-my-project
/plugin install interview-my-project@interview-my-project
```

Then, in any repo you want to be interviewed about:

```
/interview-me
```

Modes: `/interview-me quick` (5 questions) · `/interview-me deep` (12 + a full data-flow
trace) · `/interview-me focus auth` (drill one subsystem).

### Any other agent (Cursor, Codex, Copilot, OpenCode, Amp, Goose, …)

The interview is a self-contained, [Agent Skills](https://agentskills.io)-format skill —
one markdown file, no Claude-specific machinery. Two ways to use it:

1. **If your agent supports skills:** copy `skills/interview-my-project/` into your
   agent's skills directory (e.g. `.cursor/skills/`, `~/.config/opencode/skills/` —
   wherever your tool loads skills from), then ask: *"interview me about this project."*
2. **If it doesn't:** just point your agent at the file:

   ```
   Read skills/interview-my-project/SKILL.md and follow it. Interview me about this repo.
   ```

You'll get the same interview. The transcript-derived questions work best with Claude
Code session logs (Codex CLI logs are supported best-effort); without logs you get the
repo-only interview.

## How it works

1. **Ingest** — scans your repo structure and key decisions, then mines your local
   `~/.claude/projects/` session transcripts for pivots, error-fix cycles, and diffs you
   approved without discussion. Everything stays on your machine.
2. **Interrogate** — builds a ranked question bank a senior interviewer would actually
   ask: architecture choices, X-over-Y tradeoffs, failure modes, scale ceilings — and
   the questions only your transcripts can produce ("why did you abandon approach X?").
3. **Drill** — a real interview in your terminal. One question at a time, follow-up
   pushes when you hand-wave, honest scoring: 🟢 solid / 🟡 shaky / 🔴 couldn't defend.
4. **Close the gap** — every weak answer gets a focused explainer built from your actual
   code and transcript, shaped like the answer you *should* have given. Then it's
   re-queued for next session.
5. **Track** — a scorecard (`.interview/scorecard.json`) persists your readiness score
   and trend across sessions. Watch it climb until you're ready.

## What the interview feels like

It plays a *real* interviewer: opens with "walk me through this project," then drills
into what **you** say — it never breaks character by quoting your code at you. But
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
it runs on your own Claude Code session.

**No Claude Code session logs for this repo?** It still works — you get the repo-only
interview, minus the transcript-derived questions.

## Roadmap

- **v1 (now)** — Claude Code plugin: `/interview-me`, full loop, scorecard.
- **v2** — `npx interview-my-project`: standalone CLI, richer log parsing, readiness
  trends, polished interview UX.
- **v3** — voice mode: mock interviews are naturally spoken.

## License

MIT
