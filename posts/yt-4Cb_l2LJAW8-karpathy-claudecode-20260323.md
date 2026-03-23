# Vibe Coding With Claude Code & Karpathy's AutoResearch Pattern

**Source:** https://youtu.be/4Cb_l2LJAW8  
**Concept:** Andrej Karpathy's "Vibe Coding" + Claude Code Agentic AutoResearch  
**Summarized:** 2026-03-23

---

## 🎯 TL;DR

Andrej Karpathy coined "vibe coding" — but the real power isn't just describing what you want. It's pairing that intent with **Claude Code's agentic research loop**: before writing a single line, Claude Code autonomously reads your entire codebase, researches the problem space, plans its approach, then implements. You don't prompt line-by-line — you **brief it like a senior engineer and let it run**.

---

## 🔬 The Core Concept: AutoResearch Before AutoCode

Most AI coding tools: you describe → AI writes code → you review → repeat.

**The Karpathy/Claude Code approach:**

```
You describe intent (high-level)
  ↓
Claude Code reads ENTIRE codebase (context gathering)
  ↓
Claude Code researches: what exists, what's missing, what conflicts
  ↓
Claude Code produces a PLAN (shows its reasoning)
  ↓
You approve or redirect
  ↓
Claude Code implements autonomously
  ↓
Claude Code self-checks: runs tests, fixes errors, re-runs
  ↓
Done — or loops back if issues found
```

The "Auto" in AutoResearch = Claude Code does the research phase **without you prompting for it**. This is what separates it from a chatbot code helper.

---

## 🧠 Karpathy's Vibe Coding Philosophy

> "You fully give in to the vibes. You don't actually read the code. You just describe what you want. You trust the AI."

But Karpathy's definition has a **critical nuance** most people miss:

- **Giving in to vibes** = not micromanaging syntax and implementation details
- **Not** = abandoning engineering judgment
- You still decide *what* to build and *review* the output
- You let AI decide *how* — and trust it to get there

The skill shifts from **writing code** → **directing AI with precision**.

---

## ⚙️ Claude Code's Agentic Loop

Claude Code (Anthropic's terminal-based coding agent) differs from Cursor/Copilot because:

| Feature | Copilot/Cursor | Claude Code |
|---------|---------------|-------------|
| Context | Current file | Entire codebase |
| Mode | Autocomplete/chat | Autonomous agent |
| Research | You provide | Self-directed |
| Execution | Suggests | Executes (with permission) |
| Self-correction | No | Yes (runs tests, fixes errors) |
| Memory | Per-session | Via CLAUDE.md project docs |

**The agentic loop:**
1. **Read** — Claude Code maps your entire project structure
2. **Research** — Finds relevant files, understands patterns, identifies dependencies
3. **Plan** — Generates an explicit step-by-step plan before touching code
4. **Implement** — Executes plan, making file edits autonomously
5. **Verify** — Runs tests, checks output, self-corrects if needed

---

## 📋 How to Use This Effectively

### Step 1: Create CLAUDE.md (Project Brain)

In your project root, create `CLAUDE.md`:
```markdown
# Project Context

## What This Is
[1-sentence description]

## Architecture
[Key technical decisions: stack, patterns, conventions]

## Rules
- Never modify [critical files] without asking
- Always run [test command] after changes
- File naming: [convention]
- [Other project-specific rules]

## Current State
[What's working, what's in progress, known issues]
```

This is Claude Code's persistent memory. It reads this first on every session.

### Step 2: Brief Like a Senior Engineer

Bad prompt: "Add user authentication"

Good prompt:
```
Add email/password authentication.
- Use Supabase Auth (already configured in /lib/supabase.ts)
- Add login and signup pages at /auth/login and /auth/signup
- Protect all /dashboard routes — redirect to login if not authenticated
- Use the existing Button and Input components from /components/ui/
- Don't modify the existing layout.tsx
```

The difference: **constraints and context**, not just intent.

### Step 3: Let It Research First

Before asking Claude Code to implement, ask it to research:
```
Before making any changes, read the codebase and tell me:
1. What existing auth-related code exists?
2. What would need to change to add [feature]?
3. What could break?
4. What's your implementation plan?

Don't write any code yet.
```

This forces the AutoResearch phase explicitly. Review its plan. Correct it. *Then* say "go ahead."

### Step 4: Autonomous Execution With Checkpoints

Once you approve the plan:
```
Implement the plan. After completing each major step, 
stop and tell me what you did and what's next before continuing.
```

This gives you checkpoints without micromanaging every line.

### Step 5: Self-Verification Loop

After implementation:
```
Run the existing tests. If any fail, fix them.
Then check: does the new feature work end-to-end?
What edge cases should I manually test?
```

Claude Code will run your test suite, identify failures, fix them, re-run — autonomously.

---

## 💡 The AutoResearch Pattern (Advanced)

For complex features, use a 3-phase structure:

**Phase 1: Research Brief**
```
Research task: I want to add [FEATURE].
Read the codebase. Identify:
- All files that will be affected
- Existing patterns I should follow
- Third-party libraries already installed that I could use
- Potential conflicts or breaking changes
Output: A research summary and implementation plan.
```

**Phase 2: Plan Review**
You review the plan. Add constraints:
```
Good plan. Two adjustments:
1. Use X instead of Y for [reason]
2. Don't touch /lib/auth.ts — that's stable code
Confirm understanding and proceed.
```

**Phase 3: Autonomous Implementation**
```
Implement the revised plan. Run tests after each file change.
If you encounter a decision point, make the best technical choice and note it.
```

---

## 🔑 Key Insights

1. **AutoResearch = context before code.** The research phase is what separates good agentic coding from chaos.

2. **CLAUDE.md is your force multiplier.** Every senior rule you put in there saves 10 debugging sessions.

3. **"Vibe" means trust the direction, not trust the output blindly.** Review plans. Don't review every line of code.

4. **Claude Code's memory spans your entire codebase** — not just the current file. Use this: reference files by path, it will find them.

5. **The bottleneck is no longer code generation speed — it's your ability to describe intent clearly.**

6. **Autonomous ≠ unattended.** Keep checkpoints. Especially for anything touching auth, payments, or data deletion.

---

## ⚡ Quick Reference: Best Prompts

| Situation | Prompt Structure |
|-----------|-----------------|
| Starting new feature | Research first, no code yet → plan → approve → implement |
| Bug fix | Describe symptom + share full error → ask for hypothesis first → fix |
| Refactor | Describe goal + constraints (what can't change) → step-by-step plan |
| Adding tests | "Write tests for [component]. Cover happy path, edge cases, error states." |
| Code review | "Review this file. What could break? What could be improved? Don't change anything yet." |

---

*Concept: Andrej Karpathy "Vibe Coding" × Claude Code Agentic AutoResearch*
