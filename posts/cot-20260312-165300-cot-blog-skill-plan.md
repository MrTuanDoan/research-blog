# COT Plan: Skill — Auto-publish COT outputs to Vercel Blog
**Date:** 2026-03-12
**Task:** Design a skill that takes COT markdown files and publishes them as a public blog on Vercel

---

## 🧩 DECOMPOSE

**What we want:**
Every time tao chạy `/cot` hoặc `/scaffold`, output tự động (hoặc on-demand) được publish lên một trang blog trên Vercel. Người khác có thể đọc tại `https://tuan-notes.vercel.app` (ví dụ).

**Parts cần giải quyết:**
1. **Blog infrastructure** — trang web đọc markdown và render thành blog
2. **Data source** — nơi chứa markdown files (đã có: GitHub repo `Tuan-RnD`)
3. **Trigger mechanism** — khi nào publish? Auto sau mỗi COT? On-demand command?
4. **The skill itself** — skill file trong OpenClaw dạy AI làm các bước trên
5. **Deployment pipeline** — Vercel CI/CD từ GitHub push

---

## 📊 KNOWN / UNKNOWN

**Known:**
- COT outputs đang được save vào `cot-outputs/*.md` và push lên GitHub `MrTuanDoan/Tuan-RnD`
- Vercel có thể deploy từ GitHub repo tự động khi có push
- Next.js hoặc Astro đều đọc được markdown natively
- Tao đã có `AGENTS.md` rules cho `/cot` command
- Skills trong OpenClaw là SKILL.md files

**Unknown:**
- Tech stack ưa thích cho blog (Next.js vs Astro vs 11ty vs plain MDX)
- Domain đã có chưa (vercel.app subdomain free là được)
- Metadata format trong COT files (frontmatter? hoặc parse từ content?)
- Muốn public hay private blog?

**Assumptions (sẽ dùng):**
- Tech: **Next.js 15** (tao đã quen, dùng trong 4C stack)
- Source: Đọc markdown từ cùng repo `Tuan-RnD` hoặc tách repo riêng
- Domain: `tuan-cot.vercel.app` (free)
- Auto-deploy: Khi push lên GitHub → Vercel tự build lại
- Metadata: Parse từ H1 + bold date trong file (không cần thêm frontmatter)

---

## 🔗 DEPENDENCIES

```
1. Blog repo phải tồn tại trước
   ↓
2. Vercel project phải được connect với blog repo
   ↓
3. COT files phải có metadata parseable (date, title, source)
   ↓
4. Skill file biết: save COT → git push → Vercel auto-deploy
   ↓
5. (Optional) Skill cũng có thể trigger Vercel deploy hook manually
```

---

## 🏗️ SOLVE: Architecture Decision

### Option A: Blog trong cùng Tuan-RnD repo
```
Tuan-RnD/
├── cot-outputs/          ← markdown files (đã có)
├── scaffold-cot/outputs/ ← markdown files (đã có)
├── blog/                 ← Next.js app mới
│   ├── app/
│   ├── pages/
│   └── package.json
└── ...
```
- ✅ 1 repo, đơn giản
- ❌ Vercel deploy cả repo to host blog, hơi lạ
- ❌ Blog code lẫn với research notes

### Option B: Blog repo riêng, pull từ Tuan-RnD qua GitHub API
```
Tuan-RnD/          ← data source (markdown)
tuan-blog/         ← Next.js blog (repo riêng)
  → Fetches markdown from Tuan-RnD via GitHub raw content API
  → Renders as blog
  → Deployed on Vercel
```
- ✅ Separation of concerns
- ✅ Blog repo clean, chỉ có UI code
- ✅ Data updates (git push to Tuan-RnD) → Vercel webhook rebuild blog
- ❌ Thêm GitHub API calls (nhưng free tier đủ)

### Option C: Blog là static site, copy markdown khi build
```
cot-outputs/ → copy vào blog/content/ → Vercel build → static HTML
```
- ✅ Đơn giản nhất
- ✅ Zero API calls at runtime
- ❌ Cần push 2 repos hoặc monorepo setup

**→ Chọn Option B** (blog repo riêng + GitHub API). Clean nhất, scale tốt nhất.

---

## 🛠️ TECHNICAL DESIGN

### Blog Stack
- **Framework:** Next.js 15 App Router
- **Styling:** Tailwind CSS + Typography plugin (for markdown rendering)
- **Markdown rendering:** `react-markdown` + `remark-gfm` + `rehype-highlight`
- **Data fetching:** GitHub REST API (fetch raw markdown từ Tuan-RnD)
- **Deployment:** Vercel (free tier)

### Data Flow
```
1. Agent runs /cot
2. Saves to cot-outputs/cot-YYYYMMDD-HHMMSS-topic.md
3. Git commit + push to Tuan-RnD
4. Vercel deploy hook fires (webhook on push)
5. Blog rebuilds → new post appears at /posts/topic
```

### Blog URL Structure
```
tuan-cot.vercel.app/
tuan-cot.vercel.app/posts/                    ← all posts
tuan-cot.vercel.app/posts/antigravity-concepts
tuan-cot.vercel.app/posts/two-repo-ai-workflow
tuan-cot.vercel.app/posts/claude-code-token-optimization
```

### Metadata Parsing (from existing COT format)
```markdown
# COT Deep Dive: Antigravity...     ← title = everything after "COT: " or "COT Deep Dive: "
**Date:** 2026-03-12                ← date
**Source:** https://youtu.be/...    ← source URL (optional)
**Title:** "..."                    ← video title (optional)
```

Parse với regex — không cần thêm YAML frontmatter vào existing files.

### Slug Generation
From filename: `cot-20260312-134700-antigravity-concepts.md`
→ Slug: `antigravity-concepts`
→ Extract: date=`2026-03-12`, topic=`antigravity-concepts`

---

## 📝 THE SKILL FILE DESIGN

Skill này sẽ có 2 modes:

### Mode 1: Auto (mặc định sau mỗi /cot)
Sau khi save + push COT file, skill đảm bảo Vercel webhook được trigger.

### Mode 2: Manual (`/publish-cot`)
User gọi `/publish-cot` để force rebuild blog bất kỳ lúc nào.

### SKILL.md Structure
```markdown
# Skill: COT Blog Publisher

## When to use
- After every /cot or /scaffold output is saved and pushed
- When user types /publish-cot
- When user asks "publish my notes" or "update the blog"

## Steps
1. Verify COT file exists and was just saved
2. Confirm git push succeeded (check output)
3. Trigger Vercel deploy hook via HTTP POST
4. Report: blog URL where post will appear

## Deploy Hook
POST https://api.vercel.com/v1/integrations/deploy/[HOOK_ID]

## Blog URL
https://tuan-cot.vercel.app/posts/[slug]

## Slug derivation
From filename: cot-YYYYMMDD-HHMMSS-{topic}.md → slug = {topic}
```

---

## 🗺️ IMPLEMENTATION ROADMAP

### Phase 1: Build the Blog (1-2 hours)
**Use coding-agent (Claude Code) to scaffold:**

```
Task for Claude Code:
"Build a Next.js 15 blog that:
1. Fetches markdown files from GitHub repo MrTuanDoan/Tuan-RnD, 
   folder cot-outputs/
2. Parses metadata from file content (title from H1, date from 
   **Date:** line, source from **Source:** line)
3. Renders each as a blog post with Tailwind Typography
4. Index page shows all posts sorted by date
5. Slug = filename topic part (after timestamp)
6. Deploy-ready for Vercel"
```

### Phase 2: Connect Vercel (30 min)
1. Create new GitHub repo `tuan-blog`
2. Push blog code
3. Connect to Vercel → auto-deploy
4. Get Vercel deploy hook URL
5. Save hook URL to workspace/TOOLS.md

### Phase 3: Write the Skill (20 min)
Create `skills/cot-blog-publisher/SKILL.md` in workspace.

### Phase 4: Update /cot workflow (10 min)
Add to AGENTS.md `/cot` command: after git push, trigger blog skill.

---

## ✅ VERIFY

Does this plan answer the question? **Yes.**

The skill will:
1. Auto-trigger after every `/cot` output
2. Use existing GitHub push (already happening)
3. Vercel webhook rebuilds blog automatically
4. Zero extra manual steps for the user

**Estimated total time:** 2-3 hours to implement fully
**Ongoing cost:** Free (Vercel free tier + GitHub free)
**Ongoing effort:** Zero (fully automatic after setup)

---

## 🎯 NEXT STEPS (ordered)

1. **Now:** Spawn coding-agent to build Next.js blog → `tuan-blog` repo
2. **After blog built:** Deploy to Vercel, get webhook URL
3. **After deploy:** Create skill file + update AGENTS.md
4. **Test:** Run `/cot test` → verify post appears on blog

---

## 💡 BONUS IDEAS (post-MVP)

- **Tags/categories:** COT vs Scaffold vs Notes
- **Search:** Simple client-side search with Fuse.js
- **RSS feed:** Auto-generated for subscribers
- **OG images:** Auto-generate with Vercel OG image API
- **Vietnamese toggle:** Since some COTs are in Vietnamese
- **Dark mode:** Already a theme, why not

---

*Output saved: cot-outputs/cot-20260312-165300-cot-blog-skill-plan.md*
