---
title: "COT: Claude Code + Cursor — The AI Agent Tool Builder's Complete Setup"
date: "2026-04-15"
description: "Deep analysis and setup guide for combining Claude Code and Cursor AI into a unified development environment for building AI agent tools. From environment setup to production deployment."
---

# COT: Claude Code + Cursor — The AI Agent Tool Builder's Complete Setup

**Question:** How do I set up and use the Claude Code + Cursor workflow described in this guide, and what does it mean for how we build?
**Source:** https://docs.google.com/document/d/14pgor4yBD_AMR5VKl5Rt5pi_XtZmKDu5LtOHz8TXtRI/
**Date:** 2026-04-15

---

## TASK

Analyse the full guide covering Claude Code + Cursor AI setup for building AI agent tools. Extract the architecture, setup steps, key principles, and how to actually apply this in our workspace.

---

## STEP-BY-STEP REASONING

### Step 1: What is this guide actually about?

This isn't a "how to use Claude Code" guide. It's a **complete development environment blueprint** for people who build AI-powered tools and agents. It combines two AI coding tools:

- **Claude Code** — CLI agent that reads your project, runs commands, writes code autonomously
- **Cursor AI** — VS Code fork with AI deeply integrated into the editor (inline edit, chat, tab completion)

The thesis: these two tools serve different purposes and are **complementary, not competing**. Use both.

**Claude Code for:** Architecture decisions, multi-file refactors, running complex tasks autonomously, understanding entire codebases
**Cursor for:** Fast inline edits, tab completion while typing, visual file navigation, quick single-file changes

---

### Step 2: The Environment Setup Architecture

The guide prescribes a layered setup:

```
Layer 1: Core Tools
├── Claude Code (CLI) — npm install -g @anthropic-ai/claude-code
├── Cursor AI (Editor) — cursor.com/download
├── Node.js + npm — runtime
└── Git — version control

Layer 2: Configuration
├── claude.md — project-level instructions for Claude Code
├── .cursorrules — project-level instructions for Cursor
├── .claude/skills/ — reusable workflow templates
└── .env — API keys

Layer 3: MCP Servers (Model Context Protocol)
├── GitHub MCP — repo operations, PR creation
├── Filesystem MCP — enhanced file operations
├── Brave Search MCP — web search from within Claude
└── Custom MCPs — project-specific integrations

Layer 4: Project Structure
├── Monorepo or focused project folder
├── Skills folder for repeatable workflows
├── Tests alongside source
└── Documentation as code
```

---

### Step 3: Key Setup Steps (Practical)

**3A — Install Core Tools**

```bash
# Claude Code
npm install -g @anthropic-ai/claude-code

# Verify
claude --version

# Cursor — download from cursor.com
# Open project folder in Cursor as your editor
```

**3B — Claude Code Configuration (`claude.md`)**

This file lives in your project root. It tells Claude Code how to behave in this specific project. Key sections:

```markdown
# Project Context
- What this project does
- Tech stack
- Key files and their roles

# Code Standards
- Language/framework conventions
- Testing requirements
- Error handling patterns

# Deployment
- How to deploy
- Environment variables needed
- CI/CD pipeline

# Rules
- Don't delete test files
- Always run tests before committing
- Use TypeScript strict mode
```

**3C — Cursor Configuration (`.cursorrules`)**

Similar purpose but for the Cursor editor:

```markdown
You are an expert in [tech stack].
When editing code:
- Follow existing patterns in the codebase
- Add types for all new functions
- Write tests for new features
- Use project's existing error handling patterns
```

**3D — MCP Server Setup**

MCPs extend what Claude Code can do. Add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-brave-search"],
      "env": { "BRAVE_API_KEY": "..." }
    }
  }
}
```

---

### Step 4: The Dual-Tool Workflow

The guide's most important insight is **when to use which tool**:

| Task | Use Claude Code | Use Cursor |
|---|---|---|
| Understand a new codebase | ✅ reads all files, builds mental model | |
| Architecture decisions | ✅ sees full picture | |
| Multi-file refactor | ✅ autonomous, makes all changes | |
| Quick inline fix | | ✅ Cmd+K, edit in place |
| Tab completion while typing | | ✅ real-time suggestions |
| Write a new feature from scratch | ✅ plan → build → test cycle | |
| Debug a specific function | | ✅ select code → ask |
| Run tests + fix failures | ✅ runs terminal, reads output, fixes | |
| Create PR with description | ✅ via GitHub MCP | |
| Visual file browsing | | ✅ file tree, search |

**The workflow rhythm:**

```
1. Start session → Claude Code for planning + architecture
2. Claude Code builds the feature autonomously
3. Switch to Cursor for fine-tuning, inline edits, visual review
4. Back to Claude Code for testing + PR creation
5. Cursor for quick fixes from code review feedback
```

---

### Step 5: Skills System — The Force Multiplier

The guide emphasises **skills** as the core productivity multiplier. A skill is a markdown file that teaches Claude Code a repeatable workflow.

**Skill anatomy:**

```markdown
# Skill: [Name]

## Trigger
When user says: "create component", "new feature", "build endpoint"

## Steps
1. Check existing patterns in the codebase
2. Create file with correct naming convention
3. Implement with proper types and error handling
4. Write unit tests
5. Update relevant index files
6. Run tests to verify

## Rules
- Follow project's component naming convention
- Always include TypeScript types
- Tests must cover happy path + error cases
```

**Key skill categories for AI agent builders:**

| Skill | Purpose |
|---|---|
| `create-tool` | Scaffold a new AI agent tool with proper structure |
| `api-integration` | Connect to a new external API (fal.ai, OpenAI, etc.) |
| `test-and-verify` | Run tests, check outputs, fix failures autonomously |
| `deploy` | Build → test → push → deploy pipeline |
| `refactor` | Identify patterns → extract → simplify |
| `security-review` | Scan for vulnerabilities in AI tool code |

---

### Step 6: Building AI Agent Tools Specifically

The guide targets a specific use case: building tools that AI agents use. This means:

**Tool structure pattern:**

```
my-agent-tool/
├── src/
│   ├── index.ts          ← main entry, exports the tool
│   ├── schema.ts         ← input/output JSON schema
│   ├── handler.ts        ← core logic
│   └── utils/            ← helpers
├── tests/
│   ├── handler.test.ts
│   └── fixtures/
├── claude.md             ← Claude Code instructions
├── .cursorrules          ← Cursor instructions
├── package.json
└── tsconfig.json
```

**Key principles for AI tool code:**

1. **Strict input validation** — agents send unpredictable inputs
2. **Clear error messages** — agents need to understand what went wrong
3. **Idempotent operations** — agents may retry; running twice shouldn't break things
4. **JSON in, JSON out** — agents speak JSON; keep interfaces clean
5. **Timeouts on everything** — external API calls must have timeouts
6. **Logging** — when debugging agent behavior, tool logs are your only window

---

### Step 7: The Development Loop

The guide describes an iterative loop:

```
DEFINE → BUILD → TEST → REFINE → DEPLOY

1. DEFINE: Write claude.md + skill for the tool you're building
2. BUILD: Claude Code creates the implementation
3. TEST: Claude Code runs tests, iterates on failures
4. REFINE: Cursor for fine-tuning, edge cases, code review
5. DEPLOY: Claude Code pushes + creates PR via GitHub MCP
```

This loop typically takes 15–45 minutes per tool. Compare to manual coding: 2–4 hours.

---

### Step 8: What does this mean for our workspace?

**Current state:**
- We use Claude Code via OpenClaw (built-in)
- We have skills (ai-influencer, ad-creative, seedance, etc.)
- We have MCP servers configured (~/.claude.json)
- We don't actively use Cursor

**What the guide adds to our setup:**

| Gap | Action |
|---|---|
| No `.cursorrules` in projects | Create one per project (ai-influencer, research-blog, etc.) |
| No dual-tool workflow | Start using Cursor for inline edits + visual review |
| Skills could be stronger | Add `create-tool`, `test-and-verify`, `deploy` skills |
| No strict tool structure | Adopt the `src/schema/handler` pattern for fal.ai scripts |
| claude.md per project | We use AGENTS.md globally — add project-specific claude.md files |

**Specific improvements for Knox pipeline:**

```
skills/ai-influencer/
├── claude.md              ← NEW: project-specific Claude Code instructions
├── .cursorrules           ← NEW: Cursor instructions for this project
├── src/
│   ├── fal_video.ts       ← Migrate Python → TypeScript (matches Claude Code ecosystem)
│   ├── fal_voice.ts
│   ├── fal_lipsync.ts
│   ├── fal_captions.ts
│   └── schemas/           ← Input/output schemas per script
├── tests/
│   ├── fal_video.test.ts
│   └── fixtures/
└── .claude/
    └── skills/
        ├── create-ad.md   ← Existing: ad-creative skill
        ├── generate-video.md  ← NEW: video gen workflow
        └── verify-output.md   ← NEW: check generated assets
```

---

### Step 9: Setup Checklist for Our Workspace

Concrete next steps to apply this guide:

**Immediate (15 min):**
- [ ] Install Cursor if not already: `cursor.com/download`
- [ ] Create `.cursorrules` for main workspace
- [ ] Verify Claude Code MCP servers: `claude mcp list`

**This week (2 hrs):**
- [ ] Create project-level `claude.md` for ai-influencer project
- [ ] Create `test-and-verify` skill for the Knox pipeline scripts
- [ ] Try the dual-tool workflow: Claude Code for a new feature → Cursor for refinement

**This month:**
- [ ] Migrate fal.ai scripts to TypeScript (Claude Code ecosystem alignment)
- [ ] Add JSON schemas for all tool inputs/outputs
- [ ] Build `deploy` skill for Vercel deployments (so no more 404 headaches)

---

## CONCLUSIONS

### The Guide's Core Insight

Claude Code and Cursor aren't alternatives — they're **two halves of a complete AI development environment**:
- Claude Code = your **architect and builder** (autonomous, multi-file, terminal access)
- Cursor = your **editor and polisher** (inline, visual, real-time)

Using only one is like having a power drill but no screwdriver. They solve different granularities of the same problem.

### The 5 Key Principles

1. **Configure first, code later** — `claude.md` + `.cursorrules` + skills = the system that makes everything else 10x
2. **Skills are executable playbooks** — write once, call forever, consistent quality
3. **MCPs extend the brain** — GitHub, search, filesystem MCPs turn Claude Code from a code writer into a full developer
4. **Structure your tools like products** — schema + handler + tests, JSON in/JSON out, idempotent, with timeouts
5. **The dual-tool loop** — Claude Code for building, Cursor for polishing, Claude Code for shipping

### What Changes for Us

We're already 70% there. The missing 30%:
- Add Cursor to the workflow for inline editing
- Project-specific `claude.md` files (not just global AGENTS.md)
- Stricter tool structure (schema/handler pattern) for fal.ai scripts
- A `verify-output` skill that checks generated assets before delivery
- A `deploy` skill that handles Vercel correctly every time

---

*COT output: Claude Code + Cursor AI development environment setup*
*Date: 2026-04-15*
*Model: Opus*
