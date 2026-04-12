---
title: "Which MCP Servers to Install for Our Stack"
date: "2026-04-11"
description: "Priority analysis of 15 MCP servers. Context7, Memory, Sequential Thinking, and GitHub are Tier 1 for our Knox pipeline and Seedance workflow."
---

# COT: Which MCP Servers Should We Install?
**Question:** Given our stack (Knox pipeline, Seedance Prompt Lab, Claude Code, fal.ai scripts, Next.js), which of the 15 MCP servers covered in the video should we actually install â€” and why?
**Date:** 2026-04-11 | Model: Opus
**Source video:** https://youtu.be/KjEFy5wjFQg

---

## Context: Our Stack

- **Primary build:** Knox AI ads pipeline â€” fal.ai scripts (Kling, Chatterbox, Veed Fabric, Whisper), Remotion assembly
- **Secondary:** Seedance Prompt Lab (Next.js 16), research workflows (/cot, /last30days), AI influencer skill
- **Repos:** TuanDoan_Workspace, ClawNano2, seedance-prompt-lab, research-blog
- **Already have:** web_search (Brave built-in), Firecrawl CLI, browser control (OpenClaw), Twitter/X MCP (RapidAPI)

---

## Step-by-Step Reasoning

### Step 1: What problem does each MCP actually solve?

MCP servers aren't features â€” they're **capability gaps filled**. The question isn't "is this useful in general" but "does this fix a pain point we already have?"

| MCP | Pain point it fixes |
|---|---|
| Context7 | Claude hallucinates stale API syntax (fal-client, Remotion, Next.js) |
| Memory | Project decisions evaporate each session restart |
| Sequential Thinking | Claude jumps to coding before thinking, goes wrong direction |
| GitHub | Can't browse repos without copy-pasting code into chat |
| Exa | Brave Search misses conceptually related content |
| PostgreSQL | No way to query analytics DB mid-session |
| Firecrawl MCP | CLI works but breaks session flow for mid-task scraping |
| Slack/Linear/Notion | Not in our stack |
| Puppeteer | OpenClaw browser already covers this |
| Perplexity | Redundant with Brave + Firecrawl |

### Step 2: Stack against our real work

**Building fal.ai scripts** (`fal_video.py`, `fal_voice.py`, etc.):
- Context7 â†’ prevents wrong `fal_client.subscribe()` syntax
- Sequential Thinking â†’ plans the full script structure before writing
- Memory â†’ remembers "Veed Fabric: always 720p", "Kling: max 10s"
- GitHub â†’ can check existing scripts in repo without context switching

**Seedance Prompt Lab (Next.js):**
- Context7 â†’ correct Next.js 16 App Router syntax, Tailwind v4 API
- Memory â†’ remembers component decisions, API design choices
- PostgreSQL â†’ when Phase 5 analytics lands

**/last30days research:**
- Exa â†’ semantic search finds conceptually related content Brave misses
- (Firecrawl MCP â†’ scrape mid-session without CLI context switch)

**Daily workflow:**
- Memory â†’ accumulates project knowledge compound over time
- GitHub â†’ autonomous PR, issue creation, code review

### Step 3: Priority matrix

Score each on: Impact Ã— Immediacy

| MCP | Impact | Immediacy | Score | Verdict |
|---|---|---|---|---|
| Context7 | ðŸ”´ High â€” fixes existing bug | ðŸ”´ Now | 9/10 | Install today |
| Memory | ðŸ”´ High â€” compounds forever | ðŸ”´ Now (earlier = better) | 9/10 | Install today |
| Sequential Thinking | ðŸŸ¡ Medium â€” quality improvement | ðŸ”´ Now | 7/10 | Install today |
| GitHub | ðŸŸ¡ Medium â€” workflow smoother | ðŸŸ¡ Soon | 7/10 | Install this week |
| Exa | ðŸŸ¡ Medium â€” research upgrade | ðŸŸ¡ After API key | 5/10 | Install when ready |
| PostgreSQL | ðŸŸ¡ Medium â€” analytics | ðŸŸ¢ Phase 5 only | 4/10 | Install when Phase 5 starts |
| Firecrawl MCP | ðŸŸ¢ Low â€” CLI already works | ðŸŸ¢ Low urgency | 3/10 | Skip for now |
| Rest | âŒ Not in our stack | âŒ | 0/10 | Skip |

### Step 4: The single biggest unlock

**Context7 is the most underrated MCP on the list.**

Here's why: every time Claude writes code against fal-client, Next.js App Router, or Remotion â€” there's a non-trivial chance the API it uses is 6â€“18 months stale. This causes:
- Code that looks right but throws runtime errors
- Subtle bugs from deprecated method signatures
- Time wasted debugging "why doesn't this work" when the answer is just "wrong API version"

Context7 solves this by injecting the current, correct documentation at the moment Claude needs it. It's not additive â€” it's **corrective**. It makes every other coding task higher quality.

**Memory is the compound interest play.**

Every session currently starts from zero. The Memory MCP changes the fundamental character of Claude Code from "smart but forgetful assistant" to "assistant that gets better the more you work with it." Every project quirk, every decision made, every constraint discovered â€” stored and available. The earlier you install it, the more value it accumulates.

### Step 5: What about the ones we already have?

- **Brave Search** â†’ already in OpenClaw natively. Don't install Brave MCP (redundant).
- **Firecrawl CLI** â†’ already working. MCP version adds convenience but not capability. Skip until CLI causes friction.
- **Browser control** â†’ OpenClaw handles this. Don't install Puppeteer/Playwright.
- **Twitter/X** â†’ RapidAPI MCP already in `~/.claude.json`. Don't add again.

---

## Conclusions

### Install Order

```
Day 1 (30 minutes):
  1. Context7          â€” fixes hallucinated API calls, immediate quality lift
  2. Memory            â€” start accumulating project knowledge now
  3. Sequential Thinking â€” better planning before every coding session

This week:
  4. GitHub            â€” autonomous repo ops, PR workflow

When ready:
  5. Exa               â€” after getting Exa API key, upgrade /last30days
  6. PostgreSQL        â€” when Seedance Prompt Lab Phase 5 starts
```

### Install Commands

```bash
# Add to ~/.claude.json under "mcpServers"

# Context7 â€” always-current library docs
"context7": {
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp"]
}

# Sequential Thinking â€” structured reasoning before acting
"sequential-thinking": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
}

# Memory â€” persistent knowledge across sessions
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
}

# GitHub â€” repo operations, PR automation
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
  }
}
```

### Bottom Line

**4 MCPs give 90% of the value for our stack.** Everything else is either redundant with tools we already have or relevant to a stack we don't use. Context7 + Memory are the two that change the fundamental quality of every session. Install those first, today, before the next coding session.

The mental model: MCPs are multipliers on Claude Code's existing capability. Install the ones that fix real pain points in your actual workflow. Skip the ones that look impressive but solve problems you don't have.

