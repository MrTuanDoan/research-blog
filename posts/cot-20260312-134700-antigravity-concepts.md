# COT Deep Dive: Antigravity — Every Concept Explained with Simple Examples
**Date:** 2026-03-12
**Source:** https://youtu.be/QrqMAAOFpIQ
**Title:** "This is every anti-gravity concept explained for normal people"

---

## 📺 VIDEO SUMMARY + DEEP EXPLANATION

Antigravity là một **AI-powered IDE** (môi trường phát triển tích hợp) do Google tạo ra. Không phải chatbot — nó là agent có thể đọc/viết file, chạy lệnh, browse web, và build sản phẩm thực sự chỉ bằng lời nói.

---

## 🧩 ALL 20+ CONCEPTS — EXPLAINED WITH EXAMPLES

---

### Concept 1: What is Antigravity?

**Nguyên lý:** Nâng cấp từ "chatbot chỉ nói" lên "agent có tay có chân" — có thể tạo file, build website, cài packages, chạy automation.

**Simple Example:**
```
ChatGPT:  "Here's how you install Node.js: npm install..."
          → Bạn phải tự chạy lệnh

Antigravity: *tự mở terminal, gõ npm install, báo cáo kết quả*
             → Nó làm thay bạn
```

**Analogy:** Phone support (ChatGPT) vs. kỹ thuật viên đến tận nhà (Antigravity).

---

### Concept 2: The IDE (Integrated Development Environment)

**Nguyên lý:** Antigravity không chạy trong terminal đen trắng khó hiểu. Nó có giao diện visual đầy đủ.

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  LEFT: File Explorer  │  MIDDLE: Preview  │  RIGHT: Chat │
│                       │                  │              │
│  📁 my-project/       │  [live website]  │ You: "Make   │
│    index.html         │                  │  header blue"│
│    style.css          │                  │              │
│    app.js             │                  │ AI: "Done ✅" │
└─────────────────────────────────────────────────────┘
```

**Key rule:** Bạn KHÔNG touch code. Bạn chỉ nói chuyện với AI ở panel phải. AI làm phần còn lại.

---

### Concept 3: Tool Use ("Hands")

**Nguyên lý:** Antigravity có "tay" — các built-in tools để tương tác với máy tính và internet.

| Tool | Làm được gì | Simple Example |
|------|-------------|----------------|
| Read files | Đọc nội dung file | "Đọc README.md và tóm tắt cho tôi" |
| Write/Edit files | Sửa code | "Thêm dark mode vào index.css" |
| Run terminal | Chạy lệnh | "Cài express package" |
| Browse web | Click, fill form, scrape | "Kiểm tra tất cả link trên trang" |
| Generate images | Tạo ảnh (Imagen model) | "Tạo banner cho website này" |

**Analogy:** Chatbot = thư ký chỉ gõ email. Antigravity = trợ lý có thể lái xe, nấu ăn, gọi điện.

---

### Concept 4: Visual Artifacts

**Nguyên lý:** Khi AI build website/dashboard, nó render live ngay trong IDE — bạn thấy trang thật, click được.

**Example:**
```
You: "Build me a landing page for a coffee shop"

Antigravity: *builds HTML/CSS/JS*
             → Opens live preview in middle panel
             → You can click buttons, scroll, test it

You: "Make it light mode instead of dark"
Antigravity: *edits CSS live*
             → Preview updates instantly
```

Không cần mở browser riêng. Không cần chạy local server. Mọi thứ trong IDE.

---

### Concept 5: Multimodal Support

**Nguyên lý:** AI hiểu cả text lẫn ảnh. Screenshot → paste vào chat → AI thấy và hiểu.

**Two use cases:**

**A. Debug bằng ảnh:**
```
❌ Old way: "There's a bug, the button is misaligned, it's 
            about 20px to the left when it should be centered..."
            
✅ New way: [screenshot] + "Fix this"
            → AI thấy ngay vấn đề
```

**B. Copy design từ ảnh:**
```
You: [screenshot của website đẹp] + "Build mine like this"
Antigravity: Gets you ~60-70% of the way there
```

**Limitation:** AI có thể nhầm. Ví dụ trong video: paste ảnh hair salon nhưng AI generate ảnh nail salon. Vẫn cần kiểm tra và refine.

---

### Concept 6: Browser Agent

**Nguyên lý:** AI có browser riêng, có thể tự lướt web, click link, fill form, scrape data.

**Example — Auto QA testing:**
```
You: "Go through my website and make sure all buttons work"

Antigravity:
→ Opens built-in browser
→ Clicks every button autonomously
→ Reports: "Button X on page Y is broken (404 error)"

You're just watching, not driving.
```

**Practical uses:**
- Scrape competitor pricing
- Research across 3 sites trong 1 conversation
- Auto-fill forms
- Test your own website's UX

---

### Concept 7: Permissions System

**Nguyên lý:** Mặc định AI hỏi permission trước khi làm gì quan trọng. Có thể tắt để chạy tự động.

**Three levels:**
```
Level 1 (default): Ask every time
  → AI: "Run this command? [Approve] [Reject]"
  → Annoying but safe

Level 2 (Settings): Always proceed
  → Settings > Auto execution > Always proceed

Level 3 (Global rule): safe_to_auto_run = true
  → Add to global rules: "Set safe to auto run 
    to true for all commands except [dangerous ones]"
  → AI almost never asks again
```

**Analogy:** Cấp Level 3 cho AI giống cấp chìa khóa nhà cho thợ tin cậy — họ tự làm việc, không cần bạn ngồi trông.

---

### Concept 8: agent.md

**Nguyên lý:** File text đặt trong project folder. AI đọc file này **trước mỗi conversation**. Đây là "instruction manual" của bạn cho AI.

**Template đơn giản:**
```markdown
# agent.md — My Coffee Shop Website Project

## Project Overview
Building a landing page for "The Daily Grind" coffee shop.
Target audience: 25-40 professionals in Sydney CBD.

## Tech Stack
- HTML, CSS (no frameworks)
- Vanilla JavaScript
- No backend needed

## Rules
- Always use #3B2F2F (coffee brown) as primary color
- Images must be high-quality food photography style
- Mobile-first responsive design
- Never use Lorem Ipsum — write real placeholder text

## Current Status
Phase 1: Landing page done
Phase 2: Online ordering form — IN PROGRESS
```

**Key insight:** File này được inject vào mọi chat → AI luôn nhớ context mà không cần bạn giải thích lại.

---

### Concept 9: Global User Rules

**Nguyên lý:** Nếu agent.md là rules cho 1 project, thì Global User Rules là rules áp dụng cho MỌI project.

**Where:** Settings > Customizations > Rules

**Example global rules:**
```
- Always set safe_to_auto_run to true except for rm -rf, 
  DROP TABLE, or any irreversible deletion commands
- Reply concisely. No filler phrases like "Certainly!"
- When estimating cost, always mention token count
- Explain technical decisions briefly when making them
- Always create a backup before editing existing files
```

**Analogy:** 
- agent.md = job description for a specific role
- Global rules = company-wide HR policy

---

### Concept 10: Skills

**Nguyên lý:** Pre-written playbooks cho specific tasks. Khi AI nhận task match skill, nó load playbook đó trước khi bắt đầu.

**Structure:**
```
agent/
  skills/
    cold-outreach.md     ← skill cho cold email
    site-redesign.md     ← skill cho redesign website
    chrome-extension.md  ← skill cho build extensions
```

**cold-outreach.md example:**
```markdown
# Skill: Cold Outreach Email

## When to use this skill
When asked to write outreach emails, DMs, or sales messages.

## Rules
- Never start with "I hope this email finds you well"
- Lead with their problem, not your solution
- 3 sentences max for the hook
- Include 1 specific observation about their business
- CTA must be a simple yes/no question

## Template
[Their pain point] → [Your unique insight] → [Soft CTA]
```

**Usage:** Bạn nói "Write cold outreach to this startup" → AI tự detect skill phù hợp, load nó, follow playbook.

---

### Concept 11: Workflows

**Nguyên lý:** Repeatable step-by-step recipes cho complex processes. Checklist mà AI follow y chang mỗi lần.

**Difference từ Skills:**
- Skills = "how to approach this type of task"
- Workflows = "do these exact steps in this order"

**Example — Site Audit Workflow:**
```markdown
# Workflow: Site Quality Check

## Steps
1. Load the website URL provided
2. Check all navigation links (none should 404)
3. Test all forms — submit with dummy data
4. Check mobile responsiveness (simulate 375px width)
5. Run Lighthouse audit → report score
6. Check all images load properly
7. Verify meta tags and OG tags exist
8. Generate report: [PASS ✅ / FAIL ❌] per category
```

**Invoke:** Gõ `\site-quality-check` hoặc đơn giản nói "Run the site quality check workflow"

---

### Concept 12: Context Window

**Nguyên lý:** AI's short-term memory. Mọi thứ trong conversation đều nằm trên "whiteboard" có giới hạn. Khi đầy → "context rot" → output kém.

**Visualization:**
```
[Message 1] [Response 1] [File read] [Message 2] [Response 2]...
                        ←────────── Context Window ──────────→
                                    (fixed size)

When full: Old stuff falls off the edge → AI "forgets"
```

**Size reference:**
- Gemini 1.5 Pro: 1 million tokens ≈ length of the Christian Bible
- Claude Sonnet 4: 200k tokens ≈ War and Peace

**Context rot symptoms:**
- AI contradicts itself
- Forgets earlier instructions
- Starts making silly mistakes
- Repeats itself

**Fix:** Start new conversation / use /compact

---

### Concept 13: Conversation Histories

**Nguyên lý:** AI's medium-term memory. Summaries của 11 most recent conversations được auto-inject vào mỗi chat mới.

**What gets saved per conversation:**
```json
{
  "id": "conv_abc123",
  "title": "Coffee Shop Landing Page",
  "created": "2026-03-10",
  "last_modified": "2026-03-11",
  "summary": "Built responsive landing page for The Daily Grind. 
              Used #3B2F2F color scheme. Mobile-first. 
              Phase 2 (order form) pending."
}
```

**Effect:** Khi bạn mở chat mới ngày hôm sau, AI đã biết bạn đang làm gì hôm qua mà không cần giải thích lại.

**Limitation:** Chỉ 11 conversations gần nhất. Xa hơn → rơi vào long-term memory (KIS).

---

### Concept 14: Knowledge Items (KIS — Long-term Memory)

**Nguyên lý:** AI's long-term memory. Một sub-agent chạy ngầm đọc conversations và extract knowledge quan trọng → lưu thành structured documents.

**What gets extracted:**
- Patterns bạn thích
- Solutions đã tìm được
- Technical details về project
- Preferences của bạn

**Example KIS entry:**
```
Knowledge Item: User Preferences — Code Style
Last accessed: 2026-03-11
Summary: User prefers vanilla JS over frameworks for simple sites.
         Always wants mobile-first. Uses coffee brown (#3B2F2F) 
         for primary brand color. Dislikes Lorem Ipsum.
Linked artifacts: /projects/coffee-shop/style.css
```

**Analogy:** 
- Context window = RAM (fast, temporary)
- Conversation history = recent browser tabs
- Knowledge items = notes you wrote down to never forget

---

### Concept 15: The 5-Layer Memory System

**Nguyên lý:** Antigravity dùng 5 lớp memory cùng lúc, pre-injected vào mỗi conversation theo thứ tự:

```
Layer 1 (Most Permanent):  Knowledge Items (KIS)
         ↓                 Long-term distilled facts
Layer 2:                   Conversation History Summaries
         ↓                 Last 11 sessions
Layer 3:                   Global User Rules
         ↓                 Your always-on preferences
Layer 4:                   Workflows & Skills
         ↓                 Task-specific playbooks
Layer 5 (Most Temporary):  Artifacts
                           Current conversation files
```

**Simple mental model:**
```
KIS          = Your brain's long-term memory
Conv History = What you did last week
User Rules   = Your personal values/principles
Workflows    = Your SOPs at work
Artifacts    = What's on your desk right now
```

**Why this matters:** AI không cần bạn re-explain mọi thứ mỗi lần. Các layer thấp hơn (permanent) carry context tự động.

---

### Concept 16: Model Variety

**Nguyên lý:** Antigravity không bị lock vào Gemini. Nó như xe có thể đổi engine trong lúc chạy.

**Available models:**
- Gemini 2.5 Pro (default — Google's best)
- Claude Sonnet 4 / Opus 4 (Anthropic)
- OpenAI models (GPT-4o, etc.)
- Open source models

**When to switch:**
```
Task: Complex reasoning, system architecture → Gemini 2.5 Pro / Claude Opus
Task: Writing code, simple bugs → Claude Sonnet / Gemini Flash
Task: Fast, cheap, simple → Gemini Flash
Task: Creative writing → Claude (generally better at prose)
```

**Even crazier:** Bạn có thể install Claude Code và OpenAI Codex VÀO TRONG Antigravity như extensions. Dùng competitor tools từ trong IDE của Google.

---

### Concept 17: MCP Servers (Model Context Protocol)

**Nguyên lý:** Power adapters kết nối AI agent với external tools (Notion, Airtable, YouTube, v.v.)

**Simple Example:**
```
Without MCP:
You: "Add this task to Notion"
AI: "I can't access Notion directly, here's a URL..."

With Notion MCP installed:
You: "Add this task to Notion"
AI: *actually creates the Notion page*
```

**How to find/add:**
Settings > Additional options > MCP Servers > Manage MCP Servers

**Author uses:** Notebook LM MCP (download artifacts/slides directly from LM into workspace)

---

### Concept 18: Planning Mode

**Nguyên lý:** Bật Planning Mode → AI tạo implementation plan TRƯỚC khi code. Bạn review và comment trước khi AI bắt tay làm.

**Workflow:**
```
1. Enable Planning Mode (dropdown → Planning)
2. Give task: "Add dark mode to the site"
3. AI creates plan:
   └── Step 1: Add CSS variables for color scheme
   └── Step 2: Create toggle button in header
   └── Step 3: Save preference to localStorage
   └── Step 4: Apply on page load
4. You review → add comment: "Step 2: put toggle top-right corner"
5. Click Submit → AI executes with your feedback baked in
```

**When to use:** Complex features, anything with risk of breaking things, multi-file changes.

---

### Concept 19: Agent Manager

**Nguyên lý:** Run nhiều AI agent conversations song song. Như quản lý một small team.

**Use case:**
```
Agent 1: Building the front-end
Agent 2: Writing tests  
Agent 3: Doing research on competitor features
Agent 4: Writing documentation

You: Monitor all from one dashboard
```

**Access:** Click "Open Agent Manager" → see all workspaces + conversations.

---

### Concept 20: Workspaces

**Nguyên lý:** Mỗi project có workspace riêng, với file riêng, agent.md riêng, skills riêng.

**Structure:**
```
Antigravity Workspaces/
├── coffee-shop-website/
│   ├── agent.md        ← coffee shop specific rules
│   ├── agent/skills/   ← skills for this project
│   └── [all project files]
│
├── client-b-ecommerce/
│   ├── agent.md        ← ecommerce specific rules
│   └── [all project files]
│
└── personal-automation/
    ├── agent.md        ← automation specific rules
    └── [all project files]
```

**Key:** Files live on your LOCAL device. Right-click > "Reveal in File Explorer" để thấy.

---

### Concept 21: Extensions Marketplace

**Nguyên lý:** Như VS Code extensions. Cài thêm themes, language support, formatters, debuggers.

**Popular ones:**
- Color themes (author dùng dark + orange theme)
- Claude Code extension (install Claude Code inside Antigravity)
- OpenAI Codex extension
- Language-specific formatters

**Access:** Extensions tab → search → install

---

## 🧠 COT ANALYSIS: Should I Use Antigravity? How Does It Fit My Stack?

### Step 1: What Is This Really?

Antigravity = Google's answer to Cursor/Claude Code. An IDE where the AI is the primary actor, not just an assistant.

**Key differentiators vs. my current setup (Claude Code + OpenClaw):**

| Feature | Antigravity | Claude Code (my current) |
|---------|-------------|--------------------------|
| IDE | Visual, full GUI | Terminal-based |
| Memory layers | 5 (KIS + history + rules + skills + artifacts) | CLAUDE.md + context |
| Browser agent | Built-in | Via MCP |
| Skills system | Native | Via SKILL.md (OpenClaw) |
| Multi-model | Native switch | Via session_status |
| Agent manager | Built-in multi-agent | Via sessions_spawn |
| MCP | Native | Via ~/.claude.json |

---

### Step 2: KNOWN vs UNKNOWN

**Known:**
- I currently use Claude Code as primary coding agent
- OpenClaw has its own skills/memory system (MEMORY.md, SKILL.md, etc.)
- My workflow: workspace (brain) + project repos (code) — matches two-repo principle

**Unknown:**
- Antigravity's actual quality vs. Claude Code in practice
- Whether Google's Gemini is better than Claude for my specific tasks (TypeScript, Next.js, Chrome Extensions)
- Pricing comparison

**Question:** Is Antigravity "Antigravity" the IDE → could this be "Project IDX" by Google rebranded? Or a third-party tool? The name is unusual. Video says "made by Google" and mentions Imagen for image gen. Possibly **Google Project IDX** or **Firebase Studio** rebranded.

---

### Step 3: What Would I Actually Adopt?

**Things I'd steal from Antigravity's design:**

1. **5-Layer Memory System** → Already have this partially:
   - Layer 1 (KIS) ≈ MEMORY.md ✅
   - Layer 2 (Conv history) ≈ memory/YYYY-MM-DD.md ✅
   - Layer 3 (User rules) ≈ SOUL.md + AGENTS.md ✅
   - Layer 4 (Skills/Workflows) ≈ skills/ folder ✅
   - Layer 5 (Artifacts) ≈ workspace files ✅
   → **My OpenClaw setup already mirrors this!** Just need to be more intentional.

2. **Planning Mode** → Before complex Claude Code sessions, ask AI to output a plan first, review, then execute. Can simulate this with a prompt: "Before coding, give me your step-by-step plan."

3. **Skills per project** → Already doing with SKILL.md. Can sharpen by writing more specific skill files for ClawNano2 and 4C stack.

4. **agent.md concept** → EXACTLY what CLAUDE.md / AGENTS.md already does in my setup ✅

5. **Separate workspace per project** → Confirms the two-repo approach from previous video.

---

### Step 4: SOLVE — My Action Plan

**Should I switch to Antigravity?**
→ **No (for now).** Claude Code + OpenClaw is more powerful for my use case. Claude models outperform Gemini for TypeScript/Next.js work in my experience. OpenClaw's channel integration (Telegram) is unique.

**What should I borrow?**

| Concept | How I implement in my stack |
|---------|-----------------------------|
| Planning Mode | Add rule to AGENTS.md: "For complex tasks, output plan first" |
| agent.md per project | Create CLAUDE.md in ClawNano2 and 4C project repos |
| Skills per project | Create project-specific SKILL.md files |
| 5-layer memory | Formalize my 5 layers consciously |
| Global rules | Sharpen SOUL.md + AGENTS.md rules |

---

### Step 5: VERIFY

This analysis answers: what is Antigravity, how does it work, and how should I respond to it.

**Bottom line:**
- Antigravity is powerful but my Claude Code + OpenClaw setup already has equivalent features
- The real value is in the concepts, not the specific tool
- Key gaps to close: Planning Mode discipline, project-specific CLAUDE.md files
- Antigravity's 5-layer memory is a beautiful mental model I should consciously map to my own system

---

## 🎯 IMMEDIATE ACTIONS

1. **Add Planning Mode rule** to AGENTS.md: Before any complex Claude Code task, ask for plan first
2. **Create `CLAUDE.md`** in ClawNano2 repo with project-specific rules
3. **Create `CLAUDE.md`** in 4C stack repo when ready to code
4. **Map my 5-layer memory** explicitly → document in MEMORY.md
5. **Investigate Antigravity** — could be Firebase Studio, worth testing once

---

*Output saved: cot-outputs/cot-20260312-134700-antigravity-concepts.md*
