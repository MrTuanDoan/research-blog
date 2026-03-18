# COT: Every OpenClaw Concept Explained — Key Takeaways

**Date:** 2026-03-19
**Source:** "Every OpenClaw Concept Explained for Normal People" by Jay (Robo Nuggets)
**Video:** https://youtu.be/tFCgmeOWlA8

---

## The 20+ OpenClaw Concepts (Organized by Category)

### 🏗️ Foundation
1. **OpenClaw** — Not a chatbot. A full-time AI employee with its own computer that can browse web, manage files, and use your apps. Open source, can't be shut down or paywalled.
2. **Installation** — One-liner command via terminal. Best practice: install on a dedicated machine (old laptop, Mac Mini, or VPS like Hetzner/DigitalOcean) — treat it like giving a new employee their own workstation.
3. **Gateway** — The engine/receptionist. Runs as background process, routes messages from all your channels to the AI models underneath. Has a web interface for management.

### 🔌 Connectivity
4. **Channels** — Phone lines plugged into the gateway. Connect WhatsApp, Telegram, Discord, Slack. One brain, many ears. Message your AI like you'd message a workmate.
5. **OOTH vs API Key** — Two ways to connect AI models. OOTH = flat monthly fee (predictable). API key = pay per token (uncapped, expensive). Beginners should use OOTH. OpenAI officially allows it; Anthropic is gray area; Google is risky.

### 🧠 The Brain Files (All Plain English Markdown)
6. **Workspace** — A folder on the machine. Contains all instructions, memory, and config. No code — just text files you can read like articles.
7. **SOUL.md** — The agent's personality. Formal, casual, blunt — you define the vibe. Refined over time.
8. **IDENTITY.md** — Short file: name, emoji, avatar. The agent's business card.
9. **AGENTS.md** — The operating manual. Rules, priorities, boundaries. Most important file. Include a daily self-improvement loop.
10. **USER.md** — All about YOU. Name, timezone, preferences, communication style. Makes interactions feel personal.
11. **TOOLS.md** — Sticky notes about specific tool configs. Not official docs, just practical shortcuts.

### 💾 Memory System
12. **Daily Notes** — Work diary files named by date. Running logs of conversations, decisions, tasks.
13. **MEMORY.md** — Long-term curated brain. Key decisions, preferences, recurring facts. Never asks you twice.
14. **Context Engine** — Manages the AI's attention window. When conversations overflow, compresses older parts while preserving key info. Important: ALL core markdown files get re-injected every single message → token cost implications.

### ⏰ Automation
15. **Heartbeat** — Periodic check (default every 30 min). Agent wakes up, reads HEARTBEAT.md checklist, decides if action needed. Keep it lean — every item costs tokens every 30 min.
16. **Cron Jobs** — Precise scheduled tasks. Daily briefing at 7am, weekly security audit, etc. Heartbeat batches checks; cron handles exact timing.

### 🤖 Multi-Agent
17. **Multi-Agent** — Run multiple agents in one gateway. Each has own workspace, memory, personality, skills. Personal assistant + developer + sales agent = a team.
18. **Sub-Agents** — Agent delegates tasks to temporary helpers (like handing work to an intern). Works independently, reports back. Main agent keeps working in parallel.

### 🛠️ Extensions
19. **Skills** — Pre-written playbooks in plain English (SKILL.md). Teach agent specific tasks. Community skills on CIawHub (be careful — not all vetted). Build your own for safety.
20. **MCP Servers** — Universal power adapters. Connect to Google Calendar, GitHub, Notion, Blender, etc. Agent reaches into external tools from conversation.
21. **Plugins** — Code-level extensions (TypeScript/JavaScript). Hook into gateway internals. Can add new channels, custom tools, swap context engines. More advanced than skills.

### 🌐 Future
22. **Nodes** — Connect other devices to your OpenClaw. Smart glasses, iPad, phones. Early stage — expect more implementations as tech matures.

### 🔒 Security
23. **Permissions & Security** — Control what agent can touch via openclaw.json. Allow/deny specific tools. Set up security audit cron jobs. High stakes because agent has real computer access.

---

## Key Insights

### The Agentic Loop — Core Concept Everything Builds On
> "You give it a task and it figures out the steps on its own. It calls a tool, reads the result, decides what to do next, and keeps going until the job is done."

This is THE differentiator between a chatbot and an agent. Every other concept (memory, skills, heartbeat) exists to feed this loop.

### The Hidden Cost Trap
All core markdown files (SOUL.md, AGENTS.md, USER.md, TOOLS.md, MEMORY.md, HEARTBEAT.md) get **re-injected into every single message**. If your files total 10,000 tokens, every message costs 10,000 tokens before you even say anything. This is why OOTH (flat fee) beats API keys for most users.

### The Employee Metaphor is Perfect
- **Workspace** = their office
- **SOUL.md** = their personality
- **AGENTS.md** = their job description
- **USER.md** = knowing their boss
- **Skills** = training manuals
- **Heartbeat** = checking in proactively
- **Memory** = institutional knowledge

### Build Your Own Skills > Community Skills
Jay explicitly warns against installing unvetted community skills from ClawHub. The safer path: build your own or get from trusted sources.

### The Self-Improvement Loop
Add a daily self-improvement loop in AGENTS.md so agents reflect on what they learned and propose updates to their own core files. This is how agents get better over time without manual tuning.

---

## What This Means for Beginners

**Start simple:**
1. Install on dedicated machine (VPS if needed)
2. Use OpenAI OOTH (cheapest, officially allowed)
3. Set up 1 channel (Telegram recommended)
4. Let agent build its own core files over time
5. Add heartbeat checks gradually
6. Start with 2-3 agents max

**Avoid:**
- Massive HEARTBEAT.md lists (token drain)
- Bloated core files (re-injected every turn)
- Unvetted community skills
- API key billing without understanding costs
