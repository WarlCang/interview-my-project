# Contributing

Thanks for helping make interview-my-project the interviewer nobody wants to face
unprepared. The product is one skill file plus thin agent wrappers — which means
most contributions are *judgment about interviews*, not code. Quality bar over
feature count, always.

## Choose the right path

- **The interview felt off** — fake questions, unfair scores, useless coaching, a
  hallucinated citation? → [interview quality feedback](.github/ISSUE_TEMPLATE/interview-feedback.yml).
  **This is the feedback that matters most.** The project's entire bar is "real
  interviewer, not quiz generator" — only users can tell us where it misses.
- **Found a bug** (broken artifact, bad degradation on your agent)?
  → [bug report form](.github/ISSUE_TEMPLATE/bug-report.yml).
- **Got grilled and want to show it off** (readiness card, brutal transcript moment)?
  → [showcase form](.github/ISSUE_TEMPLATE/showcase.yml).
- **Security or privacy concern?** → [SECURITY.md](SECURITY.md). Never post
  session-log content publicly.
- **Want to change product behavior** (taxonomy, persona, scoring, artifacts,
  install path)? Open an issue first and agree on the user value and non-goals —
  [ROADMAP.md](ROADMAP.md) lists what we've already declined, with reasons.

Typo fixes and doc corrections need no prior issue.

## Product contracts (PRs must not break these)

1. **The one-test**: every question must be unanswerable by reading a single file
   for 10 seconds. The anti-pattern kill list in SKILL.md is not negotiable.
2. **Evidence integrity**: verdicts cite only what was actually read; quotes are
   verbatim or absent; wrong claims get conceded, never defended.
3. **Cross-agent core**: the skill must run with only *read files + write files +
   converse*. Anything else needs an explicit fallback in the capability table.
4. **Honest scoring**: no encouragement mode, no score inflation. Ever.
5. **Bilingual docs**: user-facing README changes land in `README.md` and
   `README_ZH.md` together — the ZH version is a native mirror, not a translation.
6. **Versions move together**: behavior changes bump `metadata.version` in SKILL.md
   and `.claude-plugin/plugin.json`, with a CHANGELOG.md entry.

## Before opening a PR

```bash
node scripts/check.mjs   # the same checks CI runs
```

Use a Conventional Commits title (`feat(interview): …`, `fix(coaching): …`) — CI
checks it. The PR template asks what changes, what deliberately doesn't, and for
evidence: for interview-behavior changes, that means a short (redacted) transcript
excerpt showing the new behavior on a real repo.

Never include secrets, tokens, private-repo code, or unredacted session-log content
in issues, PRs, fixtures, or screenshots.
