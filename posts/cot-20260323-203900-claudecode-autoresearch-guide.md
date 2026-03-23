# COT: Claude Code + Karpathy AutoResearch — Step-by-Step Implementation Guide

**Date:** 2026-03-23  
**Topic:** Effective/efficient use of Karpathy's Vibe Coding + Claude Code's AutoResearch pattern  
**Source:** https://youtu.be/4Cb_l2LJAW8

---

## 🧠 Chain of Thought

### What problem does this solve?

Standard AI coding = glorified autocomplete. You prompt → it suggests → you accept/reject → repeat. The human is still the research engine. The human is still reading all the code to understand what needs changing. The AI is a fast typist, not a thinking collaborator.

**The Karpathy × Claude Code insight:** The bottleneck isn't code generation speed. It's *understanding what to change, where, and why* before touching anything. Claude Code's agentic loop front-loads that understanding phase — what I'm calling AutoResearch — before any code is written.

The result: instead of 50 prompts to build a feature, you write 3 high-quality ones. The AI handles the rest.

### Two things I need to teach

**1. The mindset shift** — from "AI assistant" to "AI senior engineer with full codebase access"  
**2. The mechanics** — exactly how to structure each interaction to trigger the research loop

Let me build a complete, reproducible workflow.

---

## 📋 THE COMPLETE GUIDE

---

### PHASE 0: One-Time Setup (20 minutes)

#### 0.1 Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
# or via pip
pip install claude-code
```

Authenticate:
```bash
claude-code login
# Enter your Anthropic API key
```

Run in any project:
```bash
cd your-project
claude
```

#### 0.2 Create CLAUDE.md — The Most Important File You'll Write

`CLAUDE.md` is Claude Code's persistent brain. Put it in your project root. It gets read at the start of every session.

**Template:**

```markdown
# [PROJECT NAME] — Claude Code Context

## What This Is
[One sentence: what does this app do, for whom]

## Tech Stack
- Frontend: [Next.js 15 / React 18 / Vue / etc.]
- Backend: [Node / Python / Go / etc.]
- Database: [Postgres via Supabase / MongoDB / etc.]
- Auth: [NextAuth / Supabase Auth / Clerk / etc.]
- Styling: [Tailwind / CSS Modules / etc.]
- Deploy: [Vercel / Railway / Fly.io / etc.]

## Project Structure
/app          — pages (Next.js App Router)
/components   — reusable UI components
/lib          — utilities, db client, auth helpers
/types        — TypeScript interfaces
/public       — static assets

## Architecture Decisions
- [Decision 1 and why]
- [Decision 2 and why]

## Code Conventions
- TypeScript strict mode everywhere
- Functional components only
- Tailwind for styling — no CSS files
- Server components by default; 'use client' only when needed
- File naming: kebab-case (user-profile.tsx)
- Error handling: all async functions wrapped in try/catch

## CRITICAL RULES
- ⛔ NEVER delete existing functionality when adding new
- ⛔ NEVER modify /lib/auth.ts or /lib/db.ts without explicit permission
- ✅ ALWAYS run `npm run typecheck` after changes
- ✅ ALWAYS add loading and error states to async UI
- ✅ ALWAYS confirm plan before implementing anything > 2 files
- ✅ After each completed feature: summarize what changed

## Current Status
Working: [list features that work]
In Progress: [current work]
Known Issues: [anything broken or workaround in place]
```

**Why this is your force multiplier:** Every rule here is automatically enforced without repeating it in prompts. Every context note eliminates a research step. A good CLAUDE.md reduces your prompting by 50%.

---

### PHASE 1: The AutoResearch Pattern — Before Every Feature

This is the core mechanic. Never skip it.

**The 3-Part Pre-Implementation Prompt:**

```
## Research Task: [FEATURE NAME]

I want to add: [DESCRIPTION — 2-4 sentences, intent not implementation]

Before writing any code:
1. Map all files you'll need to read, modify, or create
2. Identify existing patterns in this codebase I should follow
3. List any third-party libraries already installed that are relevant
4. Identify what could break or conflict
5. Write your implementation plan as numbered steps

Do NOT write any code yet. Output: research summary + plan only.
```

**Wait for the plan. Read it.**

What you're looking for:
- Did it find the right files? (If not, point it to the correct ones)
- Is the approach consistent with your existing architecture?
- Any steps that sound risky? (Ask it to explain further)
- Anything missing from the plan?

**Then respond with corrections or approval:**

```
Good plan. Two adjustments:
1. For step 3 — use shadcn Dialog component instead of building custom modal
2. Skip step 5 entirely — we don't need X feature in this iteration

Confirm you understand the revised plan, then implement step by step.
After each major step, checkpoint: tell me what's done and what's next.
```

---

### PHASE 2: Autonomous Implementation With Checkpoints

Once plan is approved:

**The Checkpoint Prompt:**
```
Implement the plan. Rules:
- Stop after each numbered step and confirm before continuing
- If you hit a decision point not covered in the plan, stop and ask
- After all steps: run `npm run typecheck` and `npm run build`
- If errors: fix them before reporting done
```

This gives Claude Code autonomy to execute while keeping you in control at decision points.

**What Claude Code does autonomously during this phase:**
- Reads all referenced files in full
- Makes targeted edits (not full rewrites)
- Creates new files following your existing patterns
- Runs your verification commands
- Self-corrects TypeScript errors or failing builds
- Notes its own decisions and reasoning as it goes

**What you do:**
- Review each checkpoint summary (30 seconds each)
- Approve or redirect
- Occasionally: `git add . && git commit -m "feat: [step]"` as safety checkpoints

---

### PHASE 3: Verification & Edge Cases

After implementation:

**Self-Verification Prompt:**
```
Feature is implemented. Now:
1. Run all existing tests — fix any failures
2. Identify 5 edge cases for this feature I should manually test
3. What error states should I verify in the browser?
4. Is there anything in the implementation you're uncertain about?
```

Claude Code will:
- Run your test suite
- Fix failures iteratively
- Give you a manual testing checklist

**You:** Do the 5-minute manual spot check. Then commit.

---

### PHASE 4: Debugging With AutoResearch

When something breaks:

**The 4-Part Bug Research Prompt:**
```
## Bug Report

**Error:** [PASTE FULL ERROR — stack trace if available]

**Context:** 
- This breaks when: [user action / trigger]
- Expected: [what should happen]
- Actual: [what happens]
- When it started: [after which change, if known]

**Relevant files I think are involved:**
[/path/to/file1, /path/to/file2 — or "I don't know"]

First: research the error. Read the relevant files. Explain WHY this is happening.
Then: propose a fix. Describe the fix before implementing.
Constraint: change the minimum number of files necessary.
```

**Why this works better:**
- AI that explains the bug before fixing it catches root causes, not symptoms
- "Minimum files necessary" prevents cascade changes that break other things
- Describing the fix before implementing = one more review checkpoint

---

### PHASE 5: Refactoring Safely

For larger refactors:

```
## Refactor Task: [GOAL]

Current state: [describe what exists and why it's problematic]
Goal: [what you want instead]
Constraint: [what CANNOT change — API contract, file names, function signatures, etc.]

Research first:
- What's the full scope of this refactor?
- What files are affected?
- What tests will need updating?
- What's the risk of breaking existing functionality?

Plan: Break this into atomic steps where each step leaves the codebase in a working state.
```

**The atomic step constraint** is critical for refactors. Each step = one commit. If a later step breaks, you can revert to the last working state.

---

## 📊 The Efficiency Stack

### Time allocation (per feature)

| Phase | Time | What you're doing |
|-------|------|------------------|
| Research prompt | 3 min | Write the brief |
| Review plan | 5 min | Read, correct, approve |
| Monitor checkpoints | 10 min | Glance at progress, approve each |
| Manual testing | 5 min | Spot check in browser |
| Commit | 1 min | `git add . && git commit` |
| **Total** | **~24 min** | Per feature |

Without this pattern: 2–4 hours of back-and-forth, debugging, and "AI broke my app."

### The model cost reality

Claude Code uses Claude Sonnet/Opus for the research + reasoning phases — that's where the intelligence is.

Cost per feature with full AutoResearch loop: **$0.10–$0.40** (depending on codebase size and feature complexity).

For a full MVP (10 features): **$1–$4 total**. Not per feature. Total.

The expensive part isn't code generation. It's the research/reasoning tokens. And those are worth every cent.

---

## 💡 Advanced Patterns

### Pattern 1: The Pre-Session Brief

Start every new Claude Code session (since it has no memory between sessions) with:

```
Read CLAUDE.md first. Then tell me the current state of the project
based on what you can see in the codebase. What's implemented?
What looks in-progress? Any obvious issues?
```

This "warms up" Claude Code's context without you having to recap everything.

### Pattern 2: The Architecture Review

Periodically:
```
Review the entire codebase. From a senior engineering perspective:
- What architectural decisions are good?
- What's becoming tech debt?
- What should be refactored soon?
- What's missing that will hurt us at scale?

Don't fix anything. Just give me the honest assessment.
```

### Pattern 3: The "Why Did You Do That?" Audit

After any large implementation:
```
Walk me through the key decisions you made during implementation.
For each major decision: what alternatives did you consider and why did you choose this approach?
```

This is how you *learn* from AI-generated code rather than just accepting it.

### Pattern 4: The Feature Spec Generator

Before writing CLAUDE.md notes yourself, let Claude Code generate them:
```
Look at the [feature] I just asked you to implement.
Write the CLAUDE.md entry that would have made your job easier —
the context, constraints, and patterns you wish you'd known upfront.
```

Over time, your CLAUDE.md becomes a knowledge base of exactly what Claude Code needs to work at maximum efficiency.

---

## 🎯 The Mental Model

Think of Claude Code not as a chatbot but as a **senior developer you've just onboarded.**

A good senior dev, given a task, would:
1. Read the existing code before changing anything
2. Ask clarifying questions before starting
3. Propose their approach for sign-off
4. Implement incrementally, not in one big PR
5. Write tests for their own work
6. Explain their decisions when asked

Claude Code's AutoResearch loop is exactly this behavior — **you just need to prompt in a way that activates it.**

The Karpathy insight: "vibe coding" isn't about being lazy. It's about directing at the right level of abstraction. You think about *what* and *why*. The AI handles *how*.

---

## 🔑 Key Takeaways

1. **CLAUDE.md = your ROI multiplier.** 30 minutes writing it saves 30 hours of debugging.
2. **Research before code. Always.** The plan review is where you catch 80% of problems.
3. **Checkpoints ≠ micromanagement.** They're safety nets.
4. **Explain bugs, don't just report them.** AI that understands the root cause fixes it right the first time.
5. **Atomic refactor steps.** Each step leaves the codebase working. Commit each one.
6. **Cost is $1–4 per full feature with AutoResearch.** Pay for the reasoning tokens.
7. **The bottleneck is your ability to describe intent precisely.** That's the skill to develop.

---

*COT Output — Antigravity | 2026-03-23*
