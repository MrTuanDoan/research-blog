# Self-Refine Review: Agency-Agents Approach → Applied to Tuan's Projects
**Method:** 3-Persona Self-Refine (Researcher → Creator → Middleman)
**Source:** https://github.com/msitarzewski/agency-agents + Anthropic Skills Guide
**Date:** 2026-03-10
**Model:** claude-opus-4.6

---

## 🔬 PERSONA 1: RESEARCHER — Analysis & Evaluation

### What Agency-Agents Gets Right

**1. The Personality Layer is a Real Innovation**

Most prompt engineering stops at "Act as a developer." Agency-Agents goes deeper — each agent has memory, experience, communication style, and *opinions*. The Reality Checker defaults to "NEEDS WORK" because it's been burned by premature approvals. The Whimsy Injector believes every playful element must serve a purpose.

This is significant because **personality creates consistency**. A bland "helpful assistant" prompt produces unpredictable tone. A personality-driven prompt produces recognizable, coherent output every time.

**2. The Orchestrator Pattern Solves a Real Problem**

Multi-agent coordination is the #1 unsolved problem in agentic AI. Agency-Agents' approach — `PM → Architect → [Dev ↔ QA Loop] → Integration` with max 3 retries — is crude but functional. It proves that even simple orchestration (sequential with quality gates) dramatically improves output quality vs. a single prompt.

**3. Deliverable Templates Force Concrete Output**

Every agent includes a markdown template for their output. This eliminates the "here's a general overview" problem — Claude literally has a format to fill out. The Frontend Developer doesn't just suggest optimizations; it outputs a structured implementation report with sections for Performance, Accessibility, and Bundle Optimization.

### What Agency-Agents Gets Wrong (or Incomplete)

**1. No Progressive Disclosure — Token Bomb Risk**

Each agent file is 2,000-5,000 words. Loading multiple agents simultaneously will blow through context windows. Anthropic's Skills guide explicitly recommends keeping instructions under 5,000 words with progressive disclosure (YAML frontmatter → body → references). Agency-Agents loads everything upfront.

**Risk for Tuan:** If Tuan loads 3-4 agents for a workflow, that's potentially 15,000+ tokens just in system prompt.

**2. No Negative Triggers — Overtriggering Risk**

Agent descriptions say what they do but not what they *don't* do. The Anthropic guide explicitly recommends "Do NOT use for X" patterns. Without this, the Frontend Developer might trigger when Tuan asks about CSS debugging (should be UX Architect territory).

**3. Division Structure is Static, Not Composable**

The 9-division structure mirrors a company org chart, but companies don't actually work in silos. A real workflow might need: Researcher (market intel) → Backend Architect (system design) → Growth Hacker (go-to-market) → all reviewing each other's work. Agency-Agents provides the agents but not the composition patterns beyond the Orchestrator.

**4. Missing: Self-Improvement Loop**

Agents don't learn from failures. The Reality Checker *remembers* past failures in its personality prompt, but this is hardcoded, not dynamic. There's no mechanism for an agent to update its own SKILL.md based on what worked/failed in previous sessions.

---

## 🎨 PERSONA 2: CREATOR — Redesign for Tuan's Real Use Cases

### Use Case 1: ClawNano2 Chrome Extension Development

**Current state:** Phase 1 done (capture + filter + edit & replay). Phase 2 TODO: batch replay with CSV.

**Agency-Agents approach adapted:**

```
Team composition:
├── Frontend Developer → Sidepanel UI (React + Vite)
├── Backend Architect  → Service worker architecture (MV3 constraints)
├── Security Engineer  → Request interception security audit
├── Rapid Prototyper   → CSV batch replay POC
└── Reality Checker    → Extension store readiness assessment
```

**What Tuan should actually build (skill versions):**

```yaml
# skills/clawnano2-dev/SKILL.md
name: clawnano2-development
description: Develop Chrome Extension features for ClawNano2 request interceptor. 
  Use when building MV3 extension features, sidepanel UI, service worker logic, 
  or batch replay systems. Do NOT use for general web development.
```

**Workflow:**
1. **Rapid Prototyper** builds CSV batch replay POC in 1 session
2. **Frontend Developer** implements production UI with Vite + TypeScript
3. **Backend Architect** designs service worker message passing architecture
4. **Security Engineer** audits: Can intercepted requests leak sensitive data? CSP compliance?
5. **Reality Checker** tests: Does it actually work on martini.film? Edge cases?

**Real deliverable:** Working batch replay feature with rate limiting, variable templates, and error handling.

---

### Use Case 2: 4C Intelligence Stack — 3-Persona Workflow Engine

**Current state:** MVP planned — Personal Brand Starter Kit. Three personas: Researcher, Creator, Middleman.

**Agency-Agents mapping (direct 1:1):**

| 4C Persona | Agency-Agents Equivalent | Adapted Function |
|-----------|------------------------|-----------------|
| **Researcher** | Trend Researcher + UX Researcher + Analytics Reporter | Market intel + user behavior + data analysis |
| **Creator** | Content Creator + Visual Storyteller + Brand Guardian | Content production + visual narrative + brand consistency |
| **Middleman** | Project Shepherd + Growth Hacker + Reddit Community Builder | Coordination + distribution + community engagement |

**What Tuan should actually build:**

```
4c-intelligence-stack/skills/
├── researcher/SKILL.md      # Trigger: "research X", "analyze market", "find trends"
├── creator/SKILL.md         # Trigger: "create content", "write post", "design brand"
└── middleman/SKILL.md       # Trigger: "distribute", "coordinate", "connect"
```

**Key insight from Agency-Agents:** Each persona should have:
- Identity & Memory (what they've learned from Tuan's past projects)
- Critical Rules (quality gates specific to Tuan's standards)
- Deliverable Templates (consistent output format every time)
- Communication Style (Researcher is analytical, Creator is inspirational, Middleman is pragmatic)

**Workflow for Personal Brand Starter Kit:**
1. **Researcher** → Analyze target audience (who is Tuan trying to reach?), competitive landscape (what personal brand frameworks exist?), content gap analysis
2. **Creator** → Generate brand positioning, content calendar, 5 pillar posts, visual identity brief
3. **Middleman** → Distribution plan (which platforms?), scheduling (when to post?), engagement strategy (how to build audience?)
4. **Reality Check loop** → Each deliverable reviewed by other personas before finalizing

---

### Use Case 3: Facebook Content Curation (OpenClaw)

**Current state:** Skills exist in `skills/facebook-human-browsing/`. Rules for human-like browsing behavior.

**Agency-Agents mapping:**

```
Curated team:
├── Reddit Community Builder → Adapted for Facebook group engagement rules
├── Content Creator          → Rewrite trending content as original posts
├── Trend Researcher         → Identify which posts are actually trending (not just high likes)
├── Brand Guardian           → Ensure rewritten content matches Tuan's voice
└── Reality Checker          → Verify content passes Facebook duplicate detection
```

**What Tuan should actually build:**

```yaml
# skills/facebook-content-curate/SKILL.md
name: facebook-content-curate
description: Curate and rewrite trending Facebook content for personal account. 
  Use when browsing Facebook groups, collecting trending posts, or rewriting content. 
  Do NOT use for automated posting or direct interaction without human confirmation.
```

**Workflow (enhanced from existing browsing rules):**
1. **Browse Phase** (existing rules) → Slow scroll, read high-engagement posts, read comments
2. **Collect Phase** (Trend Researcher) → Score top 3 posts by engagement-to-recency ratio
3. **Rewrite Phase** (Content Creator + Brand Guardian) → Rewrite with Tuan's voice, add commentary from best comments
4. **Quality Gate** (Reality Checker) → Does this read as original? Would Facebook flag it?
5. **Human Approval** → Tuan reviews before any posting

---

### Use Case 4: Daily RnD Workflow (OpenClaw + Claude Code)

**Current state:** Tuan uses /cot and /scaffold for analysis. GitHub auto-push.

**Agency-Agents inspiration — Build a personal RnD Agency:**

```
tuan-rnd-agents/
├── deep-thinker/SKILL.md     # /cot equivalent — deep analysis persona
├── builder/SKILL.md          # Rapid prototyper — build POCs fast
├── critic/SKILL.md           # Reality Checker — review own work honestly
├── curator/SKILL.md          # Collect, organize, distill information
└── orchestrator/SKILL.md     # Coordinate multi-step research projects
```

**Real example — analyzing a new paper/repo (like this task):**
1. **Curator** fetches and extracts content → clean data
2. **Deep Thinker** analyzes → /cot style breakdown
3. **Critic** reviews analysis → "Is this actually useful or just restating the obvious?"
4. **Builder** extracts actionable items → "What can Tuan build from this TODAY?"
5. **Orchestrator** packages → save to cot-outputs/, push to GitHub, notify Tuan

---

## 🤝 PERSONA 3: MIDDLEMAN — Strategic Recommendations & Priorities

### Verdict: Should Tuan Adopt Agency-Agents?

**Don't adopt wholesale. Cherry-pick the patterns.**

Agency-Agents is designed for Claude Code users building full-stack applications. Tuan's workflow is different — it's research + content + side projects through OpenClaw. Directly copying 61 agent files is overkill and token-wasteful.

### What to Steal (Priority Order)

#### P0 — Steal Immediately

**1. The Agent File Template**

Every agent having Identity → Mission → Rules → Deliverables → Workflow → Communication Style is excellent structure. Apply this to:
- 4C personas (Researcher, Creator, Middleman)
- Facebook content curation skill
- Any new OpenClaw skill Tuan builds

**2. The Reality Checker Pattern**

Build a "Critic" agent for self-review. Key rule: **Default to "NEEDS WORK"**. This fights Claude's sycophancy problem. Use it to review /cot outputs before pushing to GitHub.

**3. The Dev-QA Loop**

For coding projects (ClawNano2, 4C Stack), always do: `Build → Test → Fix → Re-test` with explicit quality gates. Don't ship Phase 2 features without the Reality Checker pass.

#### P1 — Build This Week

**4. Deliverable Templates for Every Skill**

Right now Tuan's skills have instructions but no output templates. Add them:
- /cot output → standardized markdown template (already partially done)
- Facebook curation → template for curated post (original + sources + commentary)
- Research → template for findings doc (summary, key insights, actionable items, sources)

**5. 4C Persona Skill Files**

Convert the 4C Intelligence Stack personas into proper OpenClaw skills with YAML frontmatter, following Anthropic's guide + Agency-Agents' agent template.

#### P2 — Build This Month

**6. Personal Orchestrator**

Build an orchestrator skill that coordinates multi-step workflows:
```
Task: "Research and write a thread about X"
Pipeline: Researcher → Deep Analysis → Creator → Thread Draft → Critic → Refinement → Push
```

This is the Agents Orchestrator adapted for Tuan's one-person operation.

### What to Skip

- **Spatial Computing Division** — Not relevant to Tuan's projects
- **Chinese Platform Specialists** — Not relevant unless expanding to Chinese market
- **Sales Data Pipeline** (extraction → consolidation → distribution) — Enterprise-specific
- **Individual marketing platform agents** — Tuan's social strategy is Facebook-focused, not multi-platform

### Token Budget Reality Check

| Approach | Est. Token Cost | Recommendation |
|----------|----------------|----------------|
| Load 1 agent per session | ~2,000 tokens | ✅ Ideal |
| Load 3 agents per workflow | ~6,000 tokens | ✅ Acceptable |
| Load full division (8 agents) | ~20,000 tokens | ⚠️ Too heavy |
| Load Orchestrator + 5 agents | ~12,000 tokens | ⚠️ Borderline |

**Rule:** Never load more than 3 agent/skill contexts simultaneously. Use progressive disclosure.

---

## 📊 Final Synthesis — Cross-Reference with Anthropic Skills Guide

| Anthropic Skills Guide Says | Agency-Agents Does | Gap/Opportunity for Tuan |
|---------------------------|-------------------|------------------------|
| Progressive disclosure (3 levels) | Loads everything upfront | Build skills with YAML stub + lazy body |
| Description must include WHAT + WHEN triggers | Has name + description but not trigger phrases | Add trigger phrases to all skills |
| Keep SKILL.md under 5,000 words | Agent files are 2-5K words each | ✅ Within limit individually |
| Use negative triggers | Missing | Add "Do NOT use for X" to descriptions |
| Composability across skills | Division structure is siloed | Build composition patterns |
| Test triggering (90% accuracy) | No testing framework | Test each skill's trigger accuracy |
| Iterate on one task first | Provides all 61 agents at once | Start with 3-5 core agents, expand |

---

## 🎯 Tuan's Action Plan

### This Session
1. ✅ Research doc written and pushed
2. ✅ Self-refine review with 3 personas completed
3. → Write thread about approach for RnD

### This Week
- [ ] Create 4C persona skills (Researcher, Creator, Middleman) using Agent template
- [ ] Add Reality Checker / Critic skill to workspace
- [ ] Add deliverable templates to existing skills
- [ ] Review facebook-human-browsing skill description (add triggers + negatives)

### This Month
- [ ] Build personal Orchestrator skill for multi-step workflows
- [ ] ClawNano2 Phase 2: Use Dev-QA loop pattern
- [ ] Test and iterate on skill triggering accuracy
