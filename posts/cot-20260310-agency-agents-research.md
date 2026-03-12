# Research: msitarzewski/agency-agents — Complete Breakdown
**Source:** https://github.com/msitarzewski/agency-agents
**Date:** 2026-03-10
**Model:** claude-opus-4.6

---

## 🔍 What Is It?

**The Agency** is an open-source collection of **61 specialized AI agent personalities** organized into **9 divisions**. Created by **msitarzewski** (Mike Sitarzewski), born from a Reddit thread and months of iteration. MIT licensed.

Think of it as: **An entire virtual company org chart** — each role is a `.md` file containing identity, workflow, deliverables, and communication style for an AI to adopt.

---

## 🏗️ Architecture Overview

```
agency-agents/
├── engineering/          # 8 agents
├── design/               # 7 agents
├── marketing/            # 11 agents
├── product/              # 3 agents
├── project-management/   # 5 agents
├── testing/              # 8 agents
├── support/              # 6 agents
├── spatial-computing/    # 6 agents
├── specialized/          # 9 agents (orchestrator, data pipeline, identity/trust)
└── scripts/              # convert.sh, install.sh for multi-tool support
```

### Integration Support
- **Claude Code** (primary): Copy to `~/.claude/agents/`
- **Cursor, Aider, Windsurf, Gemini CLI, OpenCode**: Via `./scripts/convert.sh` + `./scripts/install.sh`

---

## 📋 All 9 Divisions — Explained

### 1. 💻 Engineering Division (8 agents)

The builders. Mỗi agent cover một technical domain cụ thể.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **Frontend Developer** | React/Vue/Angular, UI implementation | Performance-first (Core Web Vitals), WCAG accessibility baked in, includes code examples (virtualized table component) |
| **Backend Architect** | API design, database, microservices | Scalability patterns, infrastructure decisions, cloud architecture |
| **Mobile App Builder** | iOS/Android, React Native, Flutter | Cross-platform strategies, native vs hybrid decision framework |
| **AI Engineer** | ML models, deployment, AI integration | Data pipelines, model deployment, AI-powered feature integration |
| **DevOps Automator** | CI/CD, infrastructure automation | Pipeline development, deployment automation, monitoring setup |
| **Rapid Prototyper** | Fast POC development, MVPs | Speed-optimized, hackathon-ready, iteration-first mindset |
| **Senior Developer** | Laravel/Livewire, advanced patterns | Complex implementations, architecture decisions, mentoring perspective |
| **Security Engineer** | Threat modeling, secure code review | Security CI/CD, vulnerability assessment, security architecture patterns |

**How they work:** Each agent has:
- **Identity & Memory** section (role, personality, what they remember)
- **Core Mission** with 3-4 concrete areas of expertise
- **Critical Rules** they must follow
- **Technical Deliverables** with actual code examples
- **Workflow Process** (4-step methodology)
- **Deliverable Template** (copy-paste format for outputs)
- **Communication Style** (how they phrase things)

---

### 2. 🎨 Design Division (7 agents)

The aesthetics team — from pixel-perfect UI to brand personality.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **UI Designer** | Visual design, component libraries | Design systems, brand consistency, design token management |
| **UX Researcher** | User testing, behavior analysis | Research methodology, usability testing frameworks, insight extraction |
| **UX Architect** | Technical architecture, CSS systems | Developer-friendly foundations, design-to-code bridge |
| **Brand Guardian** | Brand identity, consistency | Brand strategy, positioning, guidelines enforcement |
| **Visual Storyteller** | Visual narratives, multimedia content | Compelling storytelling, brand narrative development |
| **Whimsy Injector** | Personality, delight, playful interactions | Micro-interactions, Easter eggs — "every playful element must serve a functional or emotional purpose" |
| **Image Prompt Engineer** | AI image generation prompts | Photography prompts for Midjourney, DALL-E, Stable Diffusion |

**Notable:** The **Whimsy Injector** is unique — it's specifically about adding delight and personality to products. "Let me add a celebration animation that reduces task completion anxiety by 40%"

---

### 3. 📢 Marketing Division (11 agents) — Largest division

Platform-specific marketing experts, including Chinese social media platforms.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **Growth Hacker** | Rapid user acquisition, viral loops | Experiment-driven, conversion optimization, growth metrics |
| **Content Creator** | Multi-platform content, editorial calendars | Content strategy, copywriting, brand storytelling |
| **Twitter Engager** | Real-time engagement, thought leadership | Twitter/LinkedIn strategy, professional social |
| **TikTok Strategist** | Viral content, algorithm optimization | Gen Z/Millennial audience, algorithm gaming |
| **Instagram Curator** | Visual storytelling, community building | Aesthetic development, visual content strategy |
| **Reddit Community Builder** | Authentic engagement, value-driven | 90/10 rule (90% value, 10% promotional), community trust building, anti-spam approach |
| **App Store Optimizer** | ASO, conversion optimization | App marketing, store optimization, discoverability |
| **Social Media Strategist** | Cross-platform strategy | Overall coordination, multi-platform campaigns |
| **Xiaohongshu Specialist** | Lifestyle content, trend-driven | Chinese social platform, Gen Z audience, aesthetic storytelling |
| **WeChat OA Manager** | Subscriber engagement | WeChat ecosystem, community building, conversion |
| **Zhihu Strategist** | Thought leadership, knowledge-driven | Q&A strategy, authority building, lead generation |

**Notable:** The Chinese platform specialists (Xiaohongshu, WeChat, Zhihu) show serious international thinking. The Reddit Community Builder is particularly well-crafted — it understands Reddit culture authentically.

---

### 4. 📊 Product Division (3 agents)

Small but focused on product strategy.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **Sprint Prioritizer** | Agile planning, feature prioritization | Resource allocation, backlog management, sprint planning |
| **Trend Researcher** | Market intelligence, competitive analysis | Multi-method research (quantitative + qualitative), 80%+ prediction accuracy target, 15+ source diversity per report |
| **Feedback Synthesizer** | User feedback analysis | Insight extraction, product priority recommendations |

**Notable:** The **Trend Researcher** has the most sophisticated methodology — includes search volume analysis, social media metrics, patent analysis, and a decision framework for when to use it.

---

### 5. 🎬 Project Management Division (5 agents)

Orchestration and coordination layer.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **Studio Producer** | High-level orchestration, portfolio management | Multi-project oversight, strategic alignment |
| **Project Shepherd** | Cross-functional coordination | End-to-end project coordination, stakeholder management |
| **Studio Operations** | Day-to-day efficiency | Operational excellence, team support, productivity |
| **Experiment Tracker** | A/B tests, hypothesis validation | Data-driven decisions, experiment management |
| **Senior Project Manager** | Realistic scoping, task conversion | Spec-to-task conversion, scope management — deliberately realistic, anti-scope-creep |

---

### 6. 🧪 Testing Division (8 agents)

Quality assurance with a skeptical, evidence-obsessed mindset.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **Evidence Collector** | Screenshot-based QA, visual proof | "I default to finding 3-5 issues and require visual proof for everything" — uses Playwright for automated screenshots |
| **Reality Checker** | Evidence-based certification | **Default to "NEEDS WORK"** — skeptical by design, stops fantasy approvals, requires overwhelming proof for production readiness |
| **Test Results Analyzer** | Test evaluation, metrics analysis | Quality insights, coverage reporting |
| **Performance Benchmarker** | Performance testing | Load testing, speed testing, performance tuning |
| **API Tester** | API validation, integration testing | Endpoint verification, integration QA |
| **Tool Evaluator** | Technology assessment | Software recommendations, tech decisions |
| **Workflow Optimizer** | Process analysis | Efficiency gains, automation opportunities |
| **Accessibility Auditor** | WCAG auditing | Screen reader testing, inclusive design verification |

**Notable:** The **Reality Checker** is the most opinionated agent in the entire collection. "No more '98/100 ratings' for basic dark themes." It's deliberately harsh — a counterweight to AI's tendency to be overly positive.

---

### 7. 🛟 Support Division (6 agents)

Business operations backbone.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **Support Responder** | Customer service, issue resolution | User experience focus, support operations |
| **Analytics Reporter** | Data analysis, dashboards | KPI tracking, business intelligence, data visualization |
| **Finance Tracker** | Financial planning, budget management | Cash flow, business performance analysis |
| **Infrastructure Maintainer** | System reliability | Performance optimization, monitoring, system operations |
| **Legal Compliance Checker** | Compliance, regulations | Regulatory requirements, risk management |
| **Executive Summary Generator** | C-suite communication | Strategic summaries, decision support — bridges technical detail to executive language |

---

### 8. 🥽 Spatial Computing Division (6 agents)

Forward-looking XR/VR/AR team.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **XR Interface Architect** | Spatial interaction design | AR/VR/XR UX, immersive design patterns |
| **macOS Spatial/Metal Engineer** | Swift, Metal, high-performance 3D | Vision Pro native apps, macOS spatial computing |
| **XR Immersive Developer** | WebXR, browser-based AR/VR | Web-based immersive experiences |
| **XR Cockpit Interaction Specialist** | Cockpit-based controls | Immersive control systems, specialized input |
| **visionOS Spatial Engineer** | Apple Vision Pro | Vision Pro apps, spatial computing experiences |
| **Terminal Integration Specialist** | Terminal integration, CLI tools | Developer tools, terminal workflows |

---

### 9. 🎯 Specialized Division (9 agents)

Cross-functional and unique roles.

| Agent | Core Function | Key Differentiator |
|-------|---------------|-------------------|
| **Agents Orchestrator** | Multi-agent coordination | **The conductor** — manages pipeline: PM → Architect → [Dev ↔ QA Loop] → Integration. Autonomous operation with quality gates. Max 3 retries per task. |
| **Data Analytics Reporter** | Business intelligence | Deep data analysis, strategic insights |
| **LSP/Index Engineer** | Language Server Protocol | Code intelligence systems, semantic indexing |
| **Sales Data Extraction Agent** | Excel monitoring | MTD/YTD/Year End metrics extraction |
| **Data Consolidation Agent** | Sales data aggregation | Territory summaries, pipeline snapshots |
| **Report Distribution Agent** | Automated report delivery | Territory-based distribution, scheduled sends |
| **Agentic Identity & Trust Architect** | Agent identity, authentication | Multi-agent identity systems, audit trails — security layer for multi-agent workflows |
| **Cultural Intelligence Strategist** | Cultural context analysis | Cross-cultural strategy, localization |
| **Developer Advocate** | Developer community | Developer relations, documentation, community building |

**Notable:** The **Agents Orchestrator** is the meta-agent — it coordinates all other agents. Its pipeline: `PM → ArchitectUX → [Dev ↔ QA Loop] → Integration` with automatic retry logic. The **Agentic Identity & Trust Architect** is forward-thinking — addresses who authenticates whom when multiple AI agents interact.

---

## 🧬 Agent File Structure (Common Pattern)

Every agent `.md` file follows this standardized template:

```markdown
---
name: Agent Name
description: One-line description
color: cyan/red/purple/etc.
tools: (optional) WebFetch, WebSearch, Read, Write, Edit
---

# Agent Name

## 🧠 Your Identity & Memory
- **Role**: What you do
- **Personality**: How you think
- **Memory**: What you remember across sessions
- **Experience**: What you've seen

## 🎯 Your Core Mission
### Area 1: [Primary capability]
### Area 2: [Secondary capability]
### Area 3: [Tertiary capability]

## 🚨 Critical Rules You Must Follow
### Rule 1
### Rule 2

## 📋 Your Technical Deliverables
[Code examples, template structures]

## 🔄 Your Workflow Process
### Step 1: [Phase]
### Step 2: [Phase]
### Step 3: [Phase]
### Step 4: [Phase]

## 📋 Your Deliverable Template
[Markdown template for outputs]

## 💭 Your Communication Style
[How to phrase responses]
```

---

## 🎯 Real-World Use Cases (from README)

### Scenario 1: Startup MVP
**Team:** Frontend Dev + Backend Architect + Growth Hacker + Rapid Prototyper + Reality Checker
**Result:** Ship faster with specialized expertise at every stage.

### Scenario 2: Marketing Campaign Launch
**Team:** Content Creator + Twitter Engager + Instagram Curator + Reddit Community Builder + Analytics Reporter
**Result:** Multi-channel coordinated campaign with platform-specific expertise.

### Scenario 3: Enterprise Feature Development
**Team:** Sr. PM + Sr. Developer + UI Designer + Experiment Tracker + Evidence Collector + Reality Checker
**Result:** Enterprise-grade delivery with quality gates and documentation.

### Scenario 4: Full Agency Product Discovery (Nexus Spatial Discovery Exercise)
**Team:** All 8 divisions in parallel
**Result:** Comprehensive, cross-functional product blueprint in a single session.

---

## 📊 Stats
- 61 specialized agents across 9 divisions
- 10,000+ lines of personality, process, and code examples
- MIT licensed
- Multi-tool support: Claude Code, Cursor, Aider, Windsurf, Gemini CLI, OpenCode

---

## 🔑 Key Architectural Insights

### 1. Personality > Prompt
Each agent has a distinct personality, not just instructions. The **Reality Checker** is skeptical. The **Whimsy Injector** is playful. The **Reddit Community Builder** is authentic-first. This personality-driven approach creates more consistent, natural outputs.

### 2. Deliverable-Focused Design
Every agent defines concrete deliverables with templates. Not "help with frontend" but "here's the exact markdown template for your frontend implementation report with sections for UI, performance, and accessibility."

### 3. The Dev-QA Loop Pattern
The Orchestrator's pipeline (`Dev → QA → Retry → Next Task`) is the most sophisticated pattern. It treats AI development like actual software development — with quality gates, retry logic, and escalation.

### 4. Org Chart as Architecture
The 9-division structure mirrors a real company. This isn't random — it maps to how real teams coordinate, making it natural to compose multi-agent workflows.

### 5. Chinese Platform Coverage
Xiaohongshu, WeChat, Zhihu specialists show serious international market awareness. Most agent collections are US/Western-centric.

### 6. Anti-Bullshit Testing
The Reality Checker explicitly fights AI's tendency to over-praise. "Default to NEEDS WORK" is a deliberately contrarian personality choice that produces better quality outcomes.
