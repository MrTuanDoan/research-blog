# Chain of Thought Analysis

## Task
Lên kế hoạch 90 ngày AI Survival Plan dựa trên bài viết của God of Prompt về Jack Dorsey cắt giảm 4000 nhân viên Block vì AI.

## Context
- Jack Dorsey cắt 50% nhân viên Block không phải vì business thất bại mà vì AI làm họ redundant
- Đây là lần đầu tiên CEO tech lớn nói thẳng: "AI does their job now"
- 2 nhóm người: Group 1 (dùng AI như tool) vs Group 2 (xây dựng với AI như infrastructure)
- Group 1 bị sa thải, Group 2 được giữ lại
- Cần chuyển từ Group 1 → Group 2 trong 90 ngày

## Question
Lên kế hoạch 90 ngày cụ thể cho Tuan để trở thành Group 2

---

## Step-by-Step Reasoning

### Step 1: Hiểu Sự Khác Biệt Group 1 vs Group 2

| Group 1 (Bị sa thải) | Group 2 (Được giữ) |
|---------------------|-------------------|
| Dùng ChatGPT khi bí | Xây dựng systems tự động |
| AI = Google search nhanh hơn | AI = Infrastructure |
| Tăng 20% năng suất | Tăng 5x giá trị |
| Reactive (bị động) | Proactive (chủ động) |
| Dùng AI | Xây với AI |

### Step 2: Xác Định Vị Trí Hiện Tại Của Tuan

Từ context compacted, Tuan đã:
- ✅ Tạo MCP servers (Japanese Wisdom, ElevenLabs)
- ✅ Tạo Claude Skills (hook-writer, seedance-director, scaffold-cot)
- ✅ Dùng Claude Code, OpenClaw, automation
- ✅ Xây dựng video production pipeline với AI

**Đánh giá:** Tuan đã ở **Group 2 early stage** - cần consolidate và đẩy mạnh hơn.

### Step 3: Phân Tích Bài Viết - Các Yếu Tố Chính

Bài viết đề cập:
1. **Days 1-7:** Audit + Pick AI Stack (chọn 2 tools, master chúng)
2. **Visibility:** Làm cho giá trị của bạn visible với leadership
3. **Systems thinking:** Xây automation chạy khi ngủ
4. **Documentation:** Ghi lại impact, ROI

---

## 90-Day AI Survival Plan cho Tuan

### 📅 PHASE 1: Foundation & Audit (Days 1-7)

**Mục tiêu:** Consolidate stack, audit tasks, xác định automation targets

#### Day 1-2: Pick Your AI Stack (MAX 2 categories)

**Theo bài viết - chỉ cần 2 tools:**

| Category | Tool | Use Case |
|----------|------|----------|
| **Primary Text** | Claude (Opus 4.6/Sonnet) | Marketing, writing, business analysis |
| | Claude Code | Coding (best assistant hiện tại) |
| | Gemini 3 Pro | Deep research (1M token context) |
| **Visual/Creative** | Nano Banana Pro | Images |
| | Veo 3.1 | Video |

**Recommended Stack cho Tuan:**
```
1. TEXT: Claude Code + OpenClaw (đã master)
2. VISUAL: ComfyUI + Seedance + Remotion (video pipeline)
```

#### Day 3-7: Task Audit (CRITICAL STEP)

**Ghi lại MỌI task trong tuần:**
```markdown
## Task Audit Template

| Task | Category | Time/Week | Priority |
|------|----------|-----------|----------|
| [task name] | A/B/C | [hours] | High/Med/Low |

Categories:
A = AI có thể làm 100% với đúng prompt
B = AI làm 70%, tôi finish 30%  
C = Cần human judgment/relationships/creativity
```

**Mục tiêu:** Phát hiện 40-60% công việc là Category A hoặc B → đây là automation targets.

#### Day 7: Document Current Capabilities
- Tạo file `AI-CAPABILITIES.md` trong workspace
- Liệt kê tất cả skills, MCP servers, automations đã build
- Đây là "portfolio" cho visibility

### 📅 PHASE 2: Build Your First 5 AI Systems (Days 8-30)

**Mục tiêu:** Tạo 5 "AI Systems" tiết kiệm 5-10 giờ/tuần

> **"System" = repeatable prompt/workflow xử lý Category A/B task mà không cần start from scratch**

#### How to Build 1 AI System (4 Steps)

**Step 1: Create Claude Project**
```
- Mở Claude → Create Project
- Upload examples (good past outputs)
- Write custom instructions: tone, format, what to include
```

**Step 2: Test**
```
- Feed raw data vào
- Xem output
```

**Step 3: Refine**
```
- Output đầu tiên ~70% đúng
- Adjust instructions cho đến khi ~90%
```

**Step 4: Document**
```
- Viết hướng dẫn sử dụng
- Có thể hand off cho người khác
```

#### 5 Systems Cần Build (Ví dụ cho Tuan)

| # | System | Category A/B Task | Expected Time Saved |
|---|--------|-------------------|---------------------|
| 1 | **YouTube Summarizer** | Summarize videos → structured notes | 2 hrs/week |
| 2 | **Hook Generator** | Write video hooks from content | 1 hr/week |
| 3 | **Script Critiquer** | Review/improve scripts | 1.5 hrs/week |
| 4 | **Code Documentation** | Auto-doc repos/projects | 2 hrs/week |
| 5 | **Daily Planning** | Morning planning từ calendar/tasks | 1 hr/week |

**Total: 7.5 hrs/week saved**

#### ⚡ CRITICAL: Tell Your Manager

> **Đừng âm thầm tiết kiệm thời gian. Send email:**
> 
> "I built an AI workflow that cut our [task] time from [X hours] to [Y minutes]. Here's how it works."

**Đây là cách bạn trở thành người công ty GIỮ, không phải CẮT.**

### 📅 PHASE 3: Learn Automation — n8n (Days 31-60)

**Mục tiêu:** Chuyển từ "I use AI sometimes" → "I built infrastructure"

> **AI prompts = Step 1**
> **Automation = Step 2 (cái tách biệt Group 1 vs Group 2)**

#### Recommended Tool: n8n

- Open source, powerful
- Claude Code có thể generate n8n configs từ plain English
- Self-hosted hoặc cloud

#### Real Example: Customer Feedback Automation

**Before (Manual):**
```
1. Manually read reviews
2. Categorize sentiment
3. Flag urgent issues
4. Send updates to team
```

**After (n8n + AI):**
```
New feedback → AI classifies sentiment → 
Negative → urgent Slack channel
Weekly summary auto-generates →
You review and approve

Runs 24/7 without touching it.
```

#### Build 2-3 Automations (Focus on):

| Criteria | Why |
|----------|-----|
| **Repetitive** | Happens daily/weekly |
| **Data-driven** | Not relationship-dependent |
| **Time-consuming** | Takes 30+ min each time |

#### Automation Ideas cho Tuan

| # | Automation | Trigger | Action |
|---|------------|---------|--------|
| 1 | **Content Pipeline** | New brief in folder | → Generate script → TTS → Video |
| 2 | **GitHub Digest** | Daily cron | → Summarize commits → Slack/Telegram |
| 3 | **Research Monitor** | New articles | → AI summarize → Push to knowledge base |

**Kết quả:** "Employee who uses AI" → "Employee who DEPLOYS AI"

### 📅 PHASE 4: Build Something NEW (Days 61-90)

**Mục tiêu:** Trở thành IRREPLACEABLE — không chỉ automate, mà CREATE NEW CAPABILITY

> **Không chỉ automate existing task → Tạo capability MỚI cho company/yourself**

#### What Makes This Different

| Phase 2 (Systems) | Phase 4 (New Capability) |
|-------------------|--------------------------|
| Automate existing work | Create work that didn't exist |
| Replace manual process | Add new value proposition |
| Save time | Generate revenue/opportunity |

#### Ideas by Industry

**Marketing:**
```
Custom Knowledge Assistant using Claude Projects
- Upload: brand guidelines, past campaigns, competitor analysis
- Custom instructions: query về anything
- Result: AI expert on YOUR company cho entire team
```

**Content Creation (Tuan):**
```
AI Video Production Studio
- Input: Topic/brief
- Output: Complete video (script + voice + visuals + edit)
- Capability: Produce 10x content với same resources
```

**Development:**
```
Codebase Intelligence
- Upload: entire repo documentation
- Query: "How does auth work?" / "Where is X implemented?"
- Result: Instant onboarding, faster debugging
```

#### Project Idea cho Tuan: "Soul Light AI Studio"

```
New Capability: End-to-End Story Video Production

Components:
1. Script Engine (existing: soullight-scriptwriter)
2. Hook Generator (existing: hook-writer)
3. Director System (existing: seedance-director)
4. Voice Pipeline (ElevenLabs)
5. Visual Pipeline (ComfyUI/Seedance)
6. Assembly (Remotion)

Integration:
- n8n orchestration
- One input → complete video
- Can be offered as service

This creates a NEW capability that didn't exist before.
```

---

## Weekly Tracking Template

```markdown
## Week X: [Date Range]

### Goals
- [ ] Primary goal
- [ ] Secondary goal

### Completed
- Project/task completed
- Metrics/impact

### Learnings
- What worked
- What didn't

### Next Week
- Priorities for next week
```

---

## Key Metrics to Track

| Metric | How to Measure | Target |
|--------|---------------|--------|
| Automation Time Saved | Hours/week saved by AI systems | 10+ hrs/week |
| Projects Shipped | Completed AI-powered projects | 3 in 30 days |
| Public Visibility | Posts, shares, repos | 2-3/week |
| Skills Mastered | New AI skills documented | 2-3 in 90 days |
| Impact Documentation | Case studies with metrics | 3 complete |

---

## Critical Mindset Shifts

### From → To

| Group 1 Mindset | Group 2 Mindset |
|-----------------|-----------------|
| "How can AI help me?" | "How can I build with AI?" |
| "I used ChatGPT for X" | "I built a system that does X" |
| "AI is a tool" | "AI is infrastructure" |
| "Save my job" | "Create irreplaceable value" |
| "Learn AI features" | "Solve problems with AI" |

---

## Action Items for Tuan - This Week

### Immediate (Next 48 hours)
1. [ ] Create `AI-CAPABILITIES.md` in workspace
2. [ ] List all skills, MCP servers, automations already built
3. [ ] Identify which tools to drop vs master

### This Week
4. [ ] Consolidate summarize-yt into full pipeline
5. [ ] Document hook-writer skill impact
6. [ ] Plan first "showcase project"

### This Month
7. [ ] Complete 1 end-to-end automation (video pipeline)
8. [ ] Write first LinkedIn post about AI workflow
9. [ ] Push 2 public repos with documentation

---

## Confidence Level
- Analysis accuracy: **95%** (based on actual industry trends)
- Plan feasibility for Tuan: **90%** (already has foundations)
- Timeline realistic: **85%** (aggressive but achievable)

---

## 🛡️ Skills AI CAN'T Replace (Đầu Tư Vào Đây)

Trong khi build AI skills, **double down** vào những gì AI vẫn terrible:

| Skill | Why AI Can't Do This | How to Invest |
|-------|---------------------|---------------|
| **Relationship Building** | AI viết email nhưng không build trust qua lunch | Mỗi tuần 1-2 real human connections |
| **Strategic Judgment** | AI analyze data, không decide what matters cho YOUR situation | Practice context + intuition + domain expertise |
| **Creative Vision** | AI generates content, humans decide what SHOULD exist | "We should build X" > "Build X for me" |
| **Cross-functional Leadership** | AI works in silos, humans connect departments | Navigate politics, align stakeholders, drive consensus |
| **Ethical Reasoning** | Companies cần người evaluate AI decisions are right/fair | Study AI ethics, be the "conscience" person |

> **Formula 2026-2027:**
> **5 Human Skills + AI Proficiency = The profile every company will hire**

---

## 🚨 If You Just Got Laid Off (Emergency Plan)

### Week 1: Process Emotions
- Take the emotional hit — it's real
- Don't pretend it isn't, but don't spiral
- You have a window to act

### Week 2: Start 90-Day Plan
- You now have FULL-TIME hours for this
- This is actually an ADVANTAGE
- Go deeper, faster than someone doing this nights/weekends

### Week 3-4: Build Portfolio Project
```
1. Pick a problem in your industry
2. Build an AI solution for it
3. Document it publicly
4. Post the process on X/LinkedIn

→ This becomes your PROOF OF COMPETENCE
```

### Month 2-3: Apply to AI-Native Roles
```
DON'T apply for: Same traditional role at different company
(Because that company will do the same thing Block did)

DO apply for:
- "AI Implementation" roles
- "Automation" roles
- "Prompt Engineering" roles
- "AI Operations" roles

These roles didn't exist 18 months ago.
They pay well because almost nobody is qualified yet.
```

### Counter-Intuitive Truth
> **People getting laid off from AI-driven cuts are in the BEST position to pivot:**
> - They've seen firsthand what AI disruption looks like
> - They have domain expertise
> - 90 days correctly invested → exact type of hire every company wants

**Best move:** Become the person who helps the NEXT company make the AI transition.

---

## 📊 The Real Message (Dorsey's Subtext)

> "This is happening. It's happening now. And I'd rather be honest about it than pretend it isn't."

**What Other CEOs Are Doing:**
- Reading that letter and nodding
- Won't be as blunt
- Will do "slow reduction" (death by a thousand cuts)
- Attrition, quiet restructuring
- Same result, different timeline

**Companies That Survive Will Be:**
- Leaner
- Faster
- Built around people who DEPLOY AI as infrastructure
- Not people who just USE AI as a tool

---

## 🎯 Summary: The Path Forward

```
Day 1-7:   AUDIT (Pick 2 tools, categorize tasks A/B/C)
Day 8-30:  SYSTEMS (Build 5 AI systems, save 5-10 hrs/week, TELL BOSS)
Day 31-60: AUTOMATION (n8n workflows that run 24/7)
Day 61-90: CREATE NEW (Build capability that didn't exist)

PARALLEL: Invest in human skills AI can't replace
ALWAYS: Make your value VISIBLE
```

**The person who builds something new is the LAST person who gets cut.**
**Because now the company depends on their system.**

---

## ⏰ The Urgency Factor

> "The window for this transition is open RIGHT NOW. But it won't stay open forever."

| If You Start | Result |
|--------------|--------|
| **Today** | Look back at this moment as the turning point |
| **Next 30 days** | Still ahead of most people |
| **"When things settle down"** | Bar gets higher, competition stiffer |
| **Wait** | Look back and wish you hadn't |

**Every month you wait:**
- Bar gets higher
- Competition gets stiffer
- More people become Group 2
- Group 1 becomes more dispensable

---

## 🎯 Final Action: Start TODAY

**Not tomorrow. Not "when things settle down." TODAY.**

```markdown
## Day 1 Checklist (Do This NOW)

□ Create AI-CAPABILITIES.md in workspace
□ List all AI tools you currently use
□ Pick your 2 primary tools (Text + Visual)
□ Start task audit (A/B/C categories)
□ Write down 3 tasks that are clearly Category A

Time required: 30-60 minutes
Impact: Foundation for entire 90-day transformation
```

---

## 🔑 The Bottom Line

> "The age of AI isn't coming. It's here. And the only question left is which group you'll be in."

| Group 1 | Group 2 |
|---------|---------|
| Uses AI as tool | Builds with AI as infrastructure |
| Gets 20% boost | Becomes 5x more valuable |
| First to be cut | Last to be cut |
| Replaceable | Company depends on their systems |

**Your choice. Your 90 days. Your future.**

---

*Source: God of Prompt - "The AI Layoff Survival Guide" (March 2026)*
*Analysis completed: 2026-03-02*
