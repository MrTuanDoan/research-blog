# COT: Systematic Vibe Coding — Step-by-Step Implementation Guide

**Date:** 2026-03-23  
**Topic:** How to effectively vibe code entire apps with AI  
**Source:** https://youtu.be/4Cb_l2LJAW8 (AI Jason — Prompt Engineering)

---

## 🧠 Chain of Thought

### What makes this approach different?

Most people vibe code like this: open Cursor → type "build me an app" → get messy code → fight with AI for hours → give up or get a barely-working prototype.

The systematic approach flips this. You spend **more time upfront preparing** (spec, rules, architecture) and **less time debugging**. The net result: faster shipping, cleaner code, less frustration.

The key insight: **AI is a brilliant junior dev with amnesia.** It can write excellent code *if you give it the right context every time.* Without context, it guesses — and guesses compound into architectural chaos.

---

## 📋 Step-by-Step Guide

### Phase 0: Environment Setup (One-Time, 15 min)

**Tools needed:**
| Tool | Purpose | Cost |
|------|---------|------|
| **Cursor IDE** | AI-powered code editor | Free tier or $20/mo Pro |
| **Claude Sonnet** (API) | Complex logic, architecture | Pay per token |
| **Deepseek V3/R1** (API) | Bulk coding, UI, CRUD | ~1/30 Claude's cost |
| **Git** | Version control (your safety net) | Free |
| **Vercel** | Deployment | Free tier |
| **Supabase** | Database | Free tier |

**Setup Cursor with dual models:**
1. Settings → Models → Add Claude Sonnet (API key)
2. Settings → Models → Add Deepseek V3 (API key from platform.deepseek.com)
3. Default to Deepseek. Switch to Claude for complex tasks.

---

### Phase 1: Ideation → Project Spec (30-60 min)

Before opening your IDE, write a **complete project spec**.

**Step 1.1: Define the core problem**
```
"This app helps [WHO] do [WHAT] because [WHY existing solutions fail]."
```
Example: "This app helps freelancers track invoices because spreadsheets are messy and Quickbooks is overkill."

**Step 1.2: Write User Stories (5-8 for MVP)**
```
As a freelancer, I want to create an invoice in 30 seconds so I can bill clients quickly.
As a freelancer, I want to see unpaid invoices at a glance so I know who owes me.
As a freelancer, I want to send an invoice link via email so clients can pay easily.
```

**Step 1.3: Choose Tech Stack (don't overthink)**

For 90% of apps, use:
```
Frontend: Next.js 15 + App Router + TypeScript
Styling: Tailwind CSS + shadcn/ui
Database: Supabase (Postgres + Auth + Storage)
Deploy: Vercel
```
Why: AI (Claude/Deepseek) writes the best code for this stack. Massive training data. Fewer hallucinations.

**Step 1.4: Define MVP Features (maximum 5)**
```markdown
## MVP Features
1. [ ] User auth (sign up, login, logout)
2. [ ] Create invoice (client name, items, amount, date)
3. [ ] Dashboard (list invoices, filter by status)
4. [ ] Invoice PDF generation
5. [ ] Send invoice link via email
```

**Step 1.5: Save as `PROJECT_SPEC.md` in project root**

---

### Phase 2: Rules File (15 min)

Create `.cursorrules` (or `.claude` / `AGENTS.md` for Claude Code):

```markdown
# Project Rules

## Stack
- Next.js 15, App Router, TypeScript strict mode
- Tailwind CSS + shadcn/ui for all UI components
- Supabase for auth + database + storage
- Use server components by default

## Code Style
- Functional components only, no classes
- Use TypeScript interfaces, not types (for consistency)
- File naming: kebab-case (invoice-form.tsx)
- Component naming: PascalCase (InvoiceForm)
- One component per file

## Architecture
- /app — pages and API routes
- /components — reusable UI components
- /lib — utilities, database client, helpers
- /types — TypeScript interfaces

## Critical Rules
- ⚠️ NEVER delete existing functionality when adding new features
- ⚠️ ALWAYS add loading and error states to async operations
- ⚠️ ALWAYS make UI mobile-responsive (mobile-first)
- ⚠️ ALWAYS handle form validation before submission
- ⚠️ After each feature, tell me to test and commit

## Database
- Use Supabase client from /lib/supabase.ts
- RLS (Row Level Security) enabled on all tables
- Use TypeScript types generated from Supabase schema
```

**Why these rules matter:**
- "NEVER delete existing functionality" → prevents the #1 AI mistake (breaking things while fixing things)
- "After each feature, tell me to test and commit" → forces incremental development
- Stack-specific rules → fewer hallucinated imports and wrong API usage

---

### Phase 3: Scaffolding (20 min)

Open Cursor. First prompt:

```
Read PROJECT_SPEC.md and .cursorrules.
Generate the complete project structure:
- All folders with placeholder files
- package.json with correct dependencies
- Supabase schema SQL for the database tables
- TypeScript interfaces for all data models
- Basic layout.tsx with navigation

Do NOT implement any features yet. Just the skeleton.
```

**After AI generates:**
1. Run `npm install`
2. Run `npm run dev` — verify it starts
3. `git init && git add . && git commit -m "scaffold"`

---

### Phase 4: Feature Implementation (Bulk of the work)

**THE GOLDEN RULE: One feature at a time.**

For each feature from your MVP list:

```
# Prompt template:
Implement feature: [FEATURE NAME]

User story: [COPY FROM SPEC]

Requirements:
- [specific requirement 1]
- [specific requirement 2]
- [UI behavior]

Remember to follow .cursorrules. Make it mobile-responsive.
Don't break any existing functionality.
```

**After EACH feature:**
1. `npm run dev` — test manually
2. Check: Does existing stuff still work?
3. `git add . && git commit -m "feat: [description]"`

**Model switching strategy:**
| Task | Model | Why |
|------|-------|-----|
| Database schema design | Claude | Architecture decisions matter |
| Complex API logic (auth, permissions) | Claude | Security-sensitive |
| UI components (forms, lists, cards) | Deepseek | Routine, saves 30x cost |
| Styling and layout | Deepseek | Pure UI work |
| Bug fixing with complex context | Claude | Better at reasoning through existing code |
| Adding CRUD endpoints | Deepseek | Template-like work |

---

### Phase 5: Debugging (When Things Break)

**The 4-part bug report prompt:**
```
## Error
[PASTE FULL ERROR MESSAGE]

## Expected
[What should happen]

## Actual
[What actually happens]

## Context
[PASTE THE FULL FILE — not just the relevant line]

First explain what went wrong. Then propose a fix.
Do NOT modify any other files unless absolutely necessary.
```

**Common trap:** AI fixes bug A but introduces bug B. That's why you commit after each feature — you can always `git diff` or `git stash` to see exactly what changed.

---

### Phase 6: Polish & Ship (1-2 hours)

After all MVP features work:

**UI Polish prompt:**
```
Review the entire app UI and improve it:
- Add proper spacing and padding
- Add loading spinners for async operations
- Add empty states ("No invoices yet")
- Add hover/focus states on interactive elements
- Add transitions/animations where tasteful
- Ensure consistent typography
- Verify mobile responsive on all pages
```

**Edge Cases prompt:**
```
Review the app for edge cases:
- What happens with empty form submissions?
- What about extremely long text inputs?
- What if the network request fails?
- What if the user isn't authenticated?
Add proper validation and error handling for all cases.
```

**Deploy:**
```bash
# If using Vercel:
vercel --prod

# Or just push to GitHub and connect to Vercel
git push origin main
# Vercel auto-deploys
```

---

## 📊 Time Budget (Realistic)

| Phase | Time | % of Total |
|-------|------|-----------|
| Spec + Planning | 45 min | 30% |
| Rules + Setup | 15 min | 8% |
| Scaffolding | 20 min | 10% |
| Feature Implementation (5 features) | 60 min | 30% |
| Debugging | 20 min | 10% |
| Polish + Deploy | 20 min | 12% |
| **Total** | **~3 hours** | 100% |

For a simple CRUD app with auth, you can go from zero to deployed in **3 hours**.

---

## 💡 Advanced Tips

### 1. The Documentation Trick
After building, ask AI:
```
Generate complete documentation for this project:
- README.md with setup instructions
- API documentation for all endpoints
- Component storybook descriptions
```
This forces AI to review its own code and often catches inconsistencies.

### 2. The "Teach Me" Prompt
When you don't understand what AI wrote:
```
Explain this file line by line. What does each part do?
Why did you choose this approach over alternatives?
```
This is how you actually learn to code through vibe coding.

### 3. The Checkpoint System
Every 30 minutes or after each major feature:
```bash
git add . && git commit -m "checkpoint: [what works right now]"
git tag "working-v1"  # tag known good states
```
If AI breaks everything: `git checkout working-v1`

### 4. The Deepseek Cost Hack
- Use Deepseek for 80% of coding (UI, CRUD, styling)
- Switch to Claude only for: architecture decisions, complex business logic, security-sensitive code, debugging multi-file issues
- **Real cost:** ~$0.50–$2.00 per full app (Deepseek) vs $15–$30 (Claude only)

---

## 🔑 Key Takeaways

1. **Spec > Prompt** — the better your spec, the less you prompt
2. **Rules file = persistent AI brain** — without it, AI forgets everything between conversations
3. **One feature at a time + git commit after each** — non-negotiable
4. **Deepseek for bulk, Claude for brains** — 80/20 split saves massive money
5. **AI is a junior dev with amnesia** — treat it accordingly (clear specs, review output, never trust blindly)
6. **3 hours from zero to deployed MVP** — realistic with this system
7. **Don't fight AI's strengths** — use Next.js + TypeScript + Tailwind (AI's best stack)

---

*COT Output — Antigravity | 2026-03-23*
