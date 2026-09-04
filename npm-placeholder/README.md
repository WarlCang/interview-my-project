# interview-my-project

> **Vibe coding got you the project. `interview-my-project` makes it yours.**

An AI interviewer for **your** repo. It reads your codebase and your agent session
logs, then runs a mock technical interview about that specific project — until you
can defend every decision cold.

**The standalone CLI ships in v2.** Today, the interview runs as an agent skill in
Claude Code, Cursor, Codex CLI, Copilot, and more:

```bash
npx skills add WarlCang/interview-my-project -g
```

Then, in the repo you want to be interviewed about, tell your agent:

```
Interview me about this project. Don't go easy on me.
```

Full docs, demo, and 中文说明: https://github.com/WarlCang/interview-my-project
