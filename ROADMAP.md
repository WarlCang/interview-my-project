# Roadmap

## Now — v1: the skill

- [x] Full interview loop as one self-contained, agent-agnostic skill
  (ingest → interrogate → drill → coach → track)
- [x] Skeptical bar-raiser persona; evidence-earned pressure
- [x] Session-log mining (Claude Code primary, Codex best-effort)
- [x] Say / Avoid / Fix coaching cards grounded in the actual code
- [x] Multilingual interviews, language-invariant quality bar
- [x] Shareable readiness card
- [ ] Dogfood across more real repos; tighten the question bar

## Next — v2: the CLI (`npx interview-my-project`)

The moat layer: what a markdown skill can't hold becomes real, fail-closed code —
session-log parsing, question ranking, scorecard math, readiness trends. The CLI
bundles the skill and drives the user's own agent subscription. Still $0 infra.

- Deterministic log parser with receipts (which decisions, from which lines)
- Scorecard/readiness computed by code, not by the model
- Ordinary-model floor: benchmark that cheap models still produce grounded questions
- First-class Cursor / Codex / other-agent session-log support

## Later — v3

- Voice mode (local STT/TTS) — mock interviews are naturally spoken
- Showcase gallery: user-submitted readiness cards and transcripts (with consent)

## Not planned

| Idea | Status | Why |
|---|---|---|
| Real-time interview assistance | ❌ Never | That's cheating tooling. Building it would betray the product's entire purpose: making you actually understand your own project. |
| Web app / hosted service | ❌ Declined | Violates zero-per-user-cost, and your session logs are local — a hosted version can't reach the data that makes this work, but would love to store it. |
| Spaced-repetition science | ❌ Declined (v1) | Simple re-queue of weak questions delivers most of the value at none of the complexity. Revisit only if longitudinal data says otherwise. |
| Generic behavioral prep | ❌ Never | Crowded graveyard; our only edge is "interview me about THIS repo." |
| Question banks / static content | ❌ Never | The moment questions aren't generated from your code and logs, this is a quiz app. |
| Score inflation / encouragement mode | ❌ Never | A flattering interviewer fails you in the real one. The roast is the feature. |

## Naming history (for the record)

Rejected: defend-your-repo, grill (unclear) · skillissue (meme-strong, doesn't explain
the product) · vibecheck, vibeproof (squatted) · finalboss, lockin, ranked (opaque).
Chosen: **interview-my-project** — self-explanatory beats clever.
