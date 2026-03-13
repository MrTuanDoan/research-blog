# Agentic Workflows Mastery: Structure Breakdown + Learning Plan for Tuan
**Date:** 2026-03-13
**Source:** https://youtu.be/MxyRjL7NG18
**Title:** "Complete Agentic Workflows Course — DO Framework, Sub-Agents, Self-Annealing"

---

## 📺 VIDEO SUMMARY — FULL STRUCTURE

This is the final module of a full agentic workflows course. The instructor covers 5 major topics:

1. MCP (Model Context Protocol) — when NOT to use it
2. System prompts (agents.md) — how to build them right
3. Building workflows from SOPs or scratch
4. Self-annealing — self-fixing AI loops
5. Sub-agents — parallel AI workers with scoped permissions

---

## 🧩 ALL CONCEPTS BROKEN DOWN

---

### Concept 1: MCP — When to Avoid It

**The problem:** MCP tools eat context window even when not used.
- Left-click MCP server = ~3,300 tokens just sitting in your prompt
- Gmail MCP = tokens gone, every single call
- 8.2% of context window = MCP tools sitting idle

**Rule:** Only use MCP if:
- It's hyper-standardized (your whole team uses it)
- One-click convenience is worth the token cost
- You're building it to share with a group

**For solo builders:** Skip most MCPs. Use Claude Code's native tools or write execution scripts instead.

**Simple Example:**
```
❌ Gmail MCP: Always loaded, burns 2000+ tokens per session
✅ execution/send_email.py: Only loaded when called, zero baseline cost
```

---

### Concept 2: System Prompt (agents.md / CLAUDE.md) — The Core

**Principle: Everything begins and ends with your system prompt.**

It's not just instructions — it's a **supercharged prompt** injected every turn, covering all edge cases, your framework, your thinking, your autonomy expectations.

**4 things every system prompt MUST include:**

**A. Explain the framework (with rationale)**
Don't just say "use DO framework." Explain WHY. LLMs perform better when they have buy-in.
```
"You are an LLM with limited ability to complete complex tasks without structure.
That's why I'm using the DO (Directive Orchestration Execution) framework.
Here's how it works: [explanation]
By using this, you significantly reduce error rates because [rationale]"
```

**B. Self-annealing instructions**
Tell the agent to fix its own errors before coming to you.
```
"If you encounter an error:
1. Reason about what went wrong
2. Attempt a fix
3. Update the relevant directive/script so you don't repeat this mistake
4. Only come to me if you've tried 3 times and still can't solve it"
```

**C. Autonomy settings**
Define the agent as a co-worker, not a tool.
```
"Your goal is to run autonomously without me.
Test each system independently.
Identify mistakes on your own.
Loop until it works.
Come to me ONLY if you are 100% certain you cannot solve this without human input."
```

**D. Living document instruction**
```
"Directives and execution scripts are living documents.
If you find an error or constraint, update them immediately."
```

---

### Concept 3: The DO Framework (Directive Orchestration Execution)

**Structure:**
```
workspace/
├── directives/          ← "what to do" (human-readable SOPs for AI)
│   ├── lead_gen.md
│   └── email_campaign.md
├── executions/          ← "how to do it" (Python/JS scripts)
│   ├── scrape_leads.py
│   ├── enrich_emails.py
│   └── push_to_sheets.py
└── tmp/                 ← temporary files, cleaned up after use
```

**Directives** = human-readable documents explaining goals, steps, inputs, outputs, edge cases
**Executions** = scripts that actually run the workflow
**Orchestrator** = the AI agent that reads directives → calls execution scripts → self-anneals when broken

**Analogy:** Directives = recipe. Executions = kitchen equipment. Orchestrator = chef.

---

### Concept 4: Building Workflows — Two Paths

**Path A: You have SOPs**
```
1. Drag existing SOP into workspace
2. Say: "I uploaded a file. Turn it into a directive and build execution scripts."
3. Agent converts SOP → directive + scripts
4. Test with REAL data (not agent-generated test data)
```

Why SOPs work perfectly: they already contain goals, steps, inputs, outputs, edge cases. The agent just translates into a more token-efficient format.

**Bonus effect:** Ambiguous SOPs get clarified. The agent asks questions a human would assume. Your documentation becomes better.

**Path B: No documentation**
```
1. Write bullet points in plain conversational language
   "I want to scrape B2B leads from LinkedIn. 
    Verify 80% match my target market. 
    Enrich missing emails. 
    Push to Google Sheets. 
    Send me the link."
2. Back-and-forth with agent to narrow the build path
3. Agent builds directive + scripts
4. Test → self-anneal → optimize
```

**Key insight:** Narrow the path BEFORE building. 5 minutes of conversation upfront saves 15 minutes of rebuilding wrong approach.

---

### Concept 5: Self-Annealing

**What it is:** The agent automatically fixes its own errors without needing you.

**The loop:**
```
Error detected
    ↓
Agent reasons: "Why did this fail?"
    ↓
Agent attempts fix
    ↓
Agent updates directive/execution script (so it doesn't repeat)
    ↓
Agent retries
    ↓
If 3 failures → escalate to human
```

**Why it matters:** Every error is a feature, not a bug. It reveals weak points in your flow. After self-annealing, the system is more resilient than before the error.

**Example from video:** Vain API call failed mid-run. Agent detected error, modified the API call format, retried successfully. Zero human intervention.

---

### Concept 6: Test with Real Data (Critical Mistake to Avoid)

**The trap:** Agent builds workflow → generates its own test data → tests against that data → "all passing!"

**Why this fails:** The agent generated both the script AND the test data. They're compatible by definition. It's not a real test.

**Rule:** Always test with real external data the agent has never seen.

```
❌ Agent: "I'll create test_leads.csv and run against it"
✅ You: "Here's a real LinkedIn URL. Run the full pipeline against it now."
```

---

### Concept 7: Parallelization

**What it is:** Run multiple tasks simultaneously instead of sequentially.

**Sequential (slow):**
```
Step A (20 min) → Step B (20 min) → Step C (20 min) = 60 min total
```

**Parallel (fast):**
```
Step A ─┐
Step B ─┤→ Combine → Done = 20 min total
Step C ─┘
```

**In practice:** Parent agent spins up 3 sub-agents for A, B, C simultaneously. Waits for all 3. Combines results. Proceeds.

**Bonus:** Each sub-agent has small context (only what it needs). Parent context stays clean.

---

### Concept 8: Sub-Agents

**What they are:** Specialized agents with NO context from the parent except what's explicitly given. Fresh eyes every time.

**Key rule:** Sub-agents can be spawned by parent agents. Sub-agents CANNOT spawn more sub-agents. (Prevents exponential runaway spawning.)

**Two must-have sub-agents:**

**A. Reviewer Sub-Agent**
- Purpose: Review execution scripts with fresh eyes (no bias from building them)
- Access: Read-only on execution scripts + directives
- Called after: Every new script is built
- Output: List of efficiency/quality issues → fed back to main agent to fix

```markdown
# Reviewer Sub-Agent Directive
You are a code reviewer with NO context about how this was built.
Read the execution script. Evaluate purely on quality:
- Is there error handling?
- Are there efficiency issues?
- Is it readable and well-documented?
- Are there security concerns?
Be ruthlessly honest. Report findings to parent agent.
```

**B. Document Sub-Agent**
- Purpose: Keep directives in sync with execution scripts after self-annealing updates
- Access: Read on executions, Write on directives
- Called after: Any script is modified
- Fixes: "The script changed but directive wasn't updated" problem

```markdown
# Document Sub-Agent Directive
Read all execution scripts.
Compare against corresponding directives.
Update directives to accurately reflect current script behavior.
You cannot modify execution scripts — only directives.
```

**Analogy for both:**
- Main agent = biased author who just wrote the essay
- Reviewer = fresh reader with no prior knowledge
- Document = editor keeping the manual current

---

### Concept 9: Least Privilege (Security Pattern)

**Rule:** Give each agent only the tools/permissions it needs for its specific job.

```
Main Agent:     Read + Write (directives + executions)
Reviewer:       Read only (executions + directives)
Document:       Read (executions) + Write (directives only)
```

**Analogy:** Don't give your intern write access to the production database. Give them read access. If they want to make changes, they ask.

---

## 🧠 TUAN'S LEARNING PLAN — MASTER THIS SKILL

### Week-by-Week Breakdown

---

### 📅 Week 1: Foundation — System Prompt Mastery

**Goal:** Build a bulletproof agents.md / CLAUDE.md for every project

**Study:**
- Re-read AGENTS.md in TuanDoan_Workspace critically
- Watch: DO framework system prompt examples (from video)
- Research: Claude Code's built-in sub-agent patterns (.claude/commands/)

**Build:**
- Sharpen AGENTS.md with the 4 mandatory elements:
  1. Framework explanation WITH rationale
  2. Self-annealing instructions (3 attempts before escalating)
  3. Autonomy settings (co-worker, not tool)
  4. Living document rule
- Create `CLAUDE.md` in ClawNano2 repo with project-specific rules

**Practice task:**
```
Voice dump a feature idea into Claude Code in plain language.
Back-and-forth to narrow approach.
Let agent build. Test with REAL data.
```

**Success metric:** Claude Code completes a task end-to-end with 0 questions to you

---

### 📅 Week 2: DO Framework — Build Your First Workflow

**Goal:** Convert an existing process into a DO workflow

**Pick one:**
- ClawNano2 Phase 2 batch replay feature
- 4C Researcher data ingestion pipeline
- Any repetitive task you do manually right now

**Steps:**
1. Write SOPs for the task (even rough bullet points)
2. Drag into Claude Code workspace
3. Let agent convert to directive + execution scripts
4. Test with REAL external data
5. Fix errors → observe self-annealing

**Folder structure to set up:**
```
[project]/
├── directives/
├── executions/
└── tmp/
```

**Practice:** Run the workflow twice — once guided, once from fresh Claude Code instance (cold start)

**Success metric:** Workflow runs cold-start without you explaining anything

---

### 📅 Week 3: Self-Annealing — Build Resilient Workflows

**Goal:** Engineer workflows that fix themselves

**Study:**
- Add explicit self-annealing loop to CLAUDE.md:
  ```
  On error: reason → fix → update script → retry (max 3x) → escalate
  ```
- Set up error logging in tmp/ folder
- Practice intentionally breaking a workflow → watch self-anneal

**Key habit to build:**
Every time an agent self-anneals → review what it learned → confirm directive was updated → commit the improvement

**Success metric:** Workflow breaks → agent fixes itself → you only hear about it in the summary log, not the moment it happens

---

### 📅 Week 4: Sub-Agents — Reviewer + Document

**Goal:** Create both sub-agents in Claude Code format

**Step 1: Reviewer Sub-Agent**
```
Tell Claude Code:
"Create a reviewer sub-agent that reviews execution scripts 
with completely fresh context. It should:
- Have read-only access to executions and directives
- Evaluate for efficiency, error handling, readability
- Report issues to the main agent for fixing
Set it up as a proper .claude/commands/ sub-agent."
```

**Step 2: Document Sub-Agent**
```
"Create a document sub-agent whose job is keeping directives 
in sync with execution scripts after any changes.
Read access to executions, write access to directives only.
Call it automatically after any script is modified."
```

**Test both:** Run reviewer on an existing execution script. See what it finds.

**Success metric:** Reviewer catches a real issue you missed. Document keeps directives current without you touching them.

---

### 📅 Week 5-6: Parallelization + Real Projects

**Goal:** Apply everything to ClawNano2 Phase 2 or 4C Stack

**Parallel pattern for 4C Intelligence Stack:**
```
Parent Agent
├── Sub-Agent A: Research (scrape sources, summarize)
├── Sub-Agent B: Format (convert to content formats)
└── Sub-Agent C: Distribute (push to blog, Twitter, etc.)
→ All run in parallel → parent combines → done
```

**Practice:** Design one workflow where parallelization gives a 3x+ speedup

**Success metric:** One complete end-to-end agentic workflow running in production for a real use case

---

### 📅 Week 7-8: Optimization + Teaching

**Goal:** Own the skill deeply enough to teach it

**Optimization tasks:**
- Serial → parallel: find one workflow using serial requests → batch them (10x speedup possible)
- Token audit: measure context usage per workflow → reduce
- Cold start test: reset Claude Code completely → does workflow run from scratch?

**Teaching as mastery:**
Write a COT note explaining DO framework in your own words. If you can explain it simply, you've internalized it.

---

## 📊 SKILLS MAP — What You're Actually Learning

| Skill | Level After Course | Tuan's Current Level |
|-------|-------------------|---------------------|
| System prompt design | Advanced | Intermediate (good AGENTS.md) |
| Workflow from SOP | Advanced | Beginner |
| Self-annealing | Advanced | Not yet implemented |
| Sub-agents | Advanced | Familiar (sessions_spawn in OpenClaw) |
| Parallelization | Advanced | Beginner |
| Token optimization | Intermediate | Intermediate |
| Testing with real data | Advanced | Needs discipline |

**Biggest gap:** Self-annealing + DO workflow structure. Tuan builds ad-hoc. This course teaches systematic.

---

## 🎯 PRIORITY ACTIONS (This Week)

1. **Update CLAUDE.md / AGENTS.md** with self-annealing instructions + autonomy framing
2. **Create DO folder structure** in ClawNano2: `/directives/`, `/executions/`, `/tmp/`
3. **Write first directive** for ClawNano2 Phase 2 batch replay feature
4. **Test cold start**: open fresh Claude Code session, see if it can run workflow without explanation

---

## 🔑 KEY INSIGHTS

1. **System prompt is the moat** — not the code, not the tools. The prompt defines everything.

2. **SOPs → directives is trivial** — if you have documented processes, you're 50% done already. Tuan's COT workflow IS an SOP. Convert it.

3. **Test with real data, always** — agent-generated test data is confirmation bias in code form.

4. **Self-annealing > error handling** — instead of anticipating every error, teach the agent to recover from any error. More resilient by definition.

5. **Sub-agents = fresh eyes** — bias is the enemy of quality. Reviewer sub-agent solves the "author reviewing own essay" problem that affects every AI-built system.

6. **Least privilege** — this is as much about discipline as security. Keeping agents scoped = cleaner architecture = more predictable behavior.

7. **Parallelization is a free win** — most workflows are sequential out of habit, not necessity. Almost always can be parallelized.

---

*Output saved: cot-outputs/cot-20260313-191100-agentic-workflows-learning-plan.md*
