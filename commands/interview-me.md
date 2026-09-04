---
description: Mock-interview me about this repo — ingest, interrogate, drill, close the gaps
argument-hint: "[quick|deep|focus <topic>|role <position>|lang <code>]"
---

First, use the Read tool to read
`${CLAUDE_PLUGIN_ROOT}/skills/interview-my-project/SKILL.md` **in full** — every
phase, rule, and format of the interview is defined there and nowhere else. Follow
it exactly: do not improvise scoring scales, question counts, candidate controls,
or artifact formats beyond what it defines. Its "Hard rules" section is a
pre-flight checklist — verify each item before asking question 1.

Mode from `$ARGUMENTS` (default 8 questions): `quick`, `deep`, `focus <topic>`,
`role <position>` to calibrate to the target role (PM, design, data, …), or
`lang <code>` to run the interview in another language.

You may delegate Phase 1 (Ingest) to the `decision-scout` subagent to keep
transcript noise out of the interview context.
