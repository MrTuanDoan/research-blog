# COT Analysis: Two-Repo AI Workflow
**Date:** 2026-03-12
**Source:** https://youtube.com/shorts/ci6sd6e0-Q0
**Title:** Vietnamese YouTube Short — AI vibe coding workflow với 2 repo riêng biệt

---

## 📺 VIDEO SUMMARY (Translated from Vietnamese)

### Core Idea: Split into 2 Repos Instead of 1

Someone shared a workflow: instead of doing everything in one single repo, split into **two separate repos**:

**Repo 1 — "Brain" Repo (Ideas & Product Decisions)**
- Brainstorm, feature ideas
- PRDs / feature specs
- Competitor research
- Design files
- Marketing content
- Everything non-code

> "Đây là nơi giống như bộ não của project" → "This is the brain of the project"

**Repo 2 — "Code" Repo (Implementation Only)**
- Writing code
- Reviewing feedback
- Building features
- Pure execution

---

### The Workflow Loop
1. **Ideate with AI** → generate idea
2. **Write a clear spec** → describe exactly how the feature should work
3. **AI codes from spec** → Repo 2 gets the implementation
4. **Test & debug** → verify no errors
5. **Ship to production** → deploy for real users
6. **Create content** → share/market the feature

The author mentions using **Blackbox AI** as their daily coding tool.

---

## 🧠 COT ANALYSIS: Should I Adopt This Two-Repo Approach?

### Task
Evaluate the two-repo workflow and plan whether/how to adopt it in my projects (ClawNano2, 4C Intelligence Stack, ECC, etc.)

---

### Step 1: DECOMPOSE — What Problem Does This Solve?

The two-repo split solves a real problem: **context contamination**.

When everything lives in one repo, AI coding agents (Claude Code, Cursor, etc.) see ALL files when generating context — including old specs, brainstorm notes, outdated designs, marketing copy. This noise dilutes the agent's focus.

By splitting:
- **Brain repo:** Rich context for ideation (Claude can browse specs, competitor research, past decisions)
- **Code repo:** Clean, pure codebase context for implementation (no distraction)

This is essentially the same principle as the token optimization video: **give the AI only what it needs for the current task.**

---

### Step 2: KNOWN vs UNKNOWN

**What I know:**
- My current setup: everything in one workspace (`TuanDoan_Workspace`) + project-specific repos (ClawNano2, etc.)
- Claude Code reads ALL files in the working directory for context
- Noise in context = degraded output quality + wasted tokens
- I already have a partial separation: `MEMORY.md` + daily notes (brain) vs actual code repos (code)

**What I don't know:**
- How much context noise is actually hurting my Claude Code sessions right now
- Whether Blackbox AI (mentioned in video) handles this differently than Claude Code
- Whether the spec-first workflow would slow me down in early-stage exploration

---

### Step 3: DEPENDENCIES — What Must Be True First?

To make this work well, I need:
1. A clear **spec writing discipline** (before coding, write the PRD)
2. A reliable way to **pass specs from Brain repo → Code repo** (manual copy? shared reference? symlink?)
3. AI tools that respect the repo boundary (don't auto-load sibling repos)

The hardest dependency: **spec writing discipline**. If I skip the spec and go straight to "just vibe code it," the two-repo system collapses.

---

### Step 4: SOLVE — Evaluate Each Project

#### ClawNano2 (Chrome Extension)
- **Current:** Code repo only, no dedicated idea/spec space
- **Phase 2 TODO:** Batch replay, variable templates, rate limiter
- **Fit:** GOOD. Phase 2 features are complex enough to benefit from clear specs
- **Action:** Create a `ClawNano2-brain/` or use a Notion/Obsidian page for specs, keep code repo clean

#### 4C Intelligence Stack
- **Current:** Both `4c-intelligence-stack/` docs AND code sketches in workspace
- **Fit:** PERFECT. This project already has a "brain" nature (personas, workflows, deliverables) that shouldn't mix with Next.js code
- **Action:** Separate `4c-brain/` (specs, persona docs, research) from `4c-code/` (actual Next.js app)

#### ECC (Everything Claude Code)
- **Current:** Research notes in workspace, skills installed separately
- **Fit:** MODERATE. ECC is more of a meta-tooling project — less feature-driven
- **Action:** Keep as-is but create cleaner skill docs folder

#### OpenClaw Workspace (this workspace)
- **Current:** MEMORY.md, skills, COT outputs, notes — all in one place
- **Fit:** This IS the brain repo essentially
- **Action:** Keep workspace as pure "brain" — never put actual runnable project code here

---

### Step 5: VERIFY — Does This Answer the Original Question?

Should I adopt this? **Yes, with a pragmatic twist.**

The full two-Git-repo setup has overhead (maintaining 2 repos, cross-referencing). A lighter version works better for solo developers:

**My Adapted Version:**
- **Brain:** `TuanDoan_Workspace/` (already exists — notes, specs, COT, memory) ✅
- **Code:** Project-specific repos (ClawNano2, future 4C-app, etc.) ✅
- **Key discipline:** Write a spec file BEFORE opening Claude Code on a feature
- **Bridge:** Copy/paste or reference spec URL when starting Claude Code session

The key missing piece is **spec-first discipline**. I tend to jump straight to implementation. Adding a "write the spec first" step before each Claude Code session is the real behavior change needed.

---

## 🎯 ACTION PLAN

### Immediate
1. **Adopt spec-first rule:** Before any new feature in Claude Code, write a 1-page spec in workspace first
   - Template: Problem → Desired behavior → Edge cases → Out of scope
   - Save to: `TuanDoan_Workspace/specs/YYYY-MM-DD-feature-name.md`

2. **Formalize brain/code boundary:**
   - Brain = `TuanDoan_Workspace/` (no runnable app code here)
   - Code = Project repos (ClawNano2/, future 4C-app/, etc.)

### Short-term (Next 2 Weeks)
3. **Create `specs/` folder** in workspace for all upcoming features
4. **For ClawNano2 Phase 2:** Write specs for batch replay + variable templates before coding
5. **For 4C Stack:** Document all persona workflows + deliverable specs before starting Next.js work

### Ongoing
6. **Workflow loop to internalize:**
   > Idea (Brain/AI) → Write spec → Open Code repo → Claude Code implements → Test → Ship → Content

---

## 🔑 KEY INSIGHTS

1. **Two repos = give AI only what it needs** — same principle as token optimization: clean context = better output
2. **The real innovation is spec-first** — the repo split is just infrastructure for the discipline
3. **I already have the structure** — workspace = brain, project repos = code. Just need to use it intentionally
4. **Spec writing unlocks async AI work** — good spec means I can hand off to sub-agent and not babysit it
5. **Content last** — the workflow ends with content creation, which maps to my 4C "Creator" persona

---

*Output saved: cot-outputs/cot-20260312-080300-two-repo-ai-workflow.md*
