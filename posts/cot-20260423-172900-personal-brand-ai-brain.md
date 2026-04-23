---
title: "Personal AI Creative Brain — Build-It-Right Roadmap (No SaaS)"
date: "2026-04-23"
description: "Chain-of-thought analysis for building a personal creative co-pilot that learns Tuan's taste, generates cross-platform AI content (images/videos/captions), and grows a 100K-follower brand across social platforms. 6 hrs/day, build-it-right timeline."
---

# /COT — Personal AI Creative Brain

**Date:** 2026-04-23 · **Owner:** Tuan · **Mode:** Opus · **Variant:** Interpretation C — personal-only, no SaaS

---

## [TASK]
Design and roadmap a personal AI creative system that:
1. Ingests Tuan's taste inputs (images, prompts, videos, ideas) via Telegram + files + OpenClaw chat + web UI
2. Learns his aesthetic/voice over time
3. Generates AI images, video prompts (Seedance/Kling/Veo), captions, scripts, hooks, content ideas, critiques, calendars, trend research, and cross-platform repurposing
4. Powers consistent posting → 100K followers on most social platforms → 2 viral videos/month
5. Monetization via platform payouts, views, inbound deals, Skool community

## [CONTEXT]
- **Builder:** Tuan (Đoàn Quốc Tuấn), Sydney, strong TS/Next.js, already deep on ai-influencer + Seedance + Kling + Higgsfield pipelines, has workspace full of skills (ad-creative, cinematic-prompt-engine, higgsfield-workflow, ugc-seedance2, prism-viral-hook-generator, last30days, ai-influencer, etc.)
- **Effort:** 6 hrs/day = ~42 hrs/week. Serious capacity.
- **Philosophy:** Build it right, not fast.
- **Existing assets:** Tuan-RnD repo, research-blog, Vercel, Google Places, Apify, ElevenLabs, LTX, fal.ai (implied), Claude Code, MCP servers (Context7, sequential-thinking, memory, GitHub).
- **No SaaS, no auth, no Stripe, no paying users.** Private tool. Personal brand is the output.

## [QUESTION]
What's the opportunity, what's the potential ceiling, and what's the step-by-step implementation + roadmap to go from zero to a working personal AI creative brain that credibly reaches 100K/platform and 2 viral videos/month?

---

## 1. OPPORTUNITY ANALYSIS

### Why this is a real opportunity (not hype)

**Macro tailwinds (2026):**
- AI-native creators now outperform traditional ones on reach/cost. MrBeast's studio is 300+ people; a solo AI creator with the right stack can ship comparable output volume.
- Platforms (TikTok, YouTube Shorts, Reels, X) explicitly reward *consistent posting at high quality*. The bottleneck for 99% of creators is **ideation + production speed**, not distribution.
- Seedance 2.0, Kling 3.0, Veo 3.1, NanoBanana (Gemini image) are all production-ready. The winning layer in 2026 is NOT the model — it's the **taste-filtered orchestration layer on top**.
- Personal brands with an AI angle are *themselves* viral content. Building in public = free distribution.

**Micro advantages Tuan already has:**
- 20+ production skills already built (ai-influencer, seedance, ad-creative, prism hooks, last30days, frame-extractor, neon-sign, etc.). Most people starting this project would need 3 months just to reach where Tuan's skill library already is.
- OpenClaw gives him persistent memory, cron, multi-session, TTS, browser automation, node orchestration — stuff other creators duct-tape with n8n/Zapier.
- Bilingual (VN + EN) = two audience pools, lower competition in VN, higher CPM in EN.
- Already publishes to research-blog (built distribution muscle + personal writing voice exists).

**The asymmetric bet:**
Most "AI creators" are just wrapping one model and spamming. Tuan's edge is a **taste-aware orchestrator** that combines: (a) his curated reference library, (b) trend research (/last30days), (c) multi-model generation (image + video + voice + captions), (d) cross-platform repurposing, (e) self-critique against his taste profile. That's a moat.

### Opportunity score: **9/10**
Rare combo of: existing tooling + existing skill + clear distribution playbook + 6hrs/day + no-SaaS focus (no distraction from user support, billing, churn). The one thing missing is *proof of consistent on-camera output/persona*, which we'll design for in Phase 1.

---

## 2. POTENTIAL CEILING (honest)

### Realistic 12-month outcomes given 6 hrs/day + this stack

| Outcome | P(achieve) | Conditions |
|---|---|---|
| 10K followers on 1 platform | 85% | Consistent daily posting + 1 solid niche |
| 100K on 1 platform | 35% | Requires 1 breakout viral + sustained quality for 9+ months |
| 100K across "most" platforms | 10-15% | Brutal; usually requires different content per platform + 12-18 months minimum |
| 2 viral videos/month (>500K views) | 25% sustained | Viral is a distribution of outcomes; can be engineered to ~1/month with volume + hook testing |
| $5K/month monetization | 60% | Platform payout + 1-2 inbound deals + Skool at $30/mo × 150 members |
| $20K+/month | 20% | Needs brand deals + maybe a paid product/course (Skool scaled) |

**Honest take:** "100K on most platforms in year 1" is aspirational. More realistic = "100K on 1 primary + 20-40K on 2 secondaries by month 12." The brain you build is still worth it even if followers come slower — you'll out-produce 99% of humans.

### What actually predicts 100K (from studying creators):
1. **Niche clarity** — one sentence people can repeat
2. **Posting cadence** — 1+/day primary, 3-5/week secondary
3. **Hook discipline** — 80% of success is first 3 seconds
4. **Visual consistency** — recognizable style within 1 second
5. **Iteration on data** — kill what doesn't work fast
6. **One breakout** — triggers algorithm trust

Your brain needs to optimize for all 6.

---

## 3. SYSTEM ARCHITECTURE — The "Brain"

Think of it as a **4-layer stack**:

### Layer 1 — INGESTION ("feed the brain")
- Telegram bot (forward anything → tagged + stored)
- Folder watcher (drop files into `~/brain/inbox/` → auto-ingest)
- Web UI (Next.js, local only) for paste/upload + browsing taste library
- OpenClaw chat (just talk to me; I save structured notes)
- Auto-scraper cron: daily pull from your saved X/IG/TikTok favorites

**Output:** Unified `brain-db` (Postgres local or Supabase, but *only for your data, no auth*) with: source, type, tags, embedding, your reaction (love/meh/kill), notes.

### Layer 2 — MEMORY & TASTE MODEL
- **Vector DB** (pgvector or Qdrant) of everything ingested
- **Taste profile** — structured JSON that captures:
  - Visual style vocabulary (lighting, color, composition, subjects)
  - Voice/tone (vocabulary, pacing, sentence length, humor type)
  - Topical obsessions (ranked)
  - Anti-patterns (things you hate)
- **Updated automatically** every N ingestions by a "taste-extractor" agent
- **Viewable & editable** in the web UI — you can override

### Layer 3 — GENERATION ("the hands")
Orchestrator agent with tool-access to:
- **Image:** NanoBanana / Gemini 3.1 Flash Image / SDXL LoRA (later, trained on your curated set)
- **Video prompts:** Seedance 2.0, Kling 3.0, Veo 3.1 (via higgsfield-workflow + ugc-seedance2 + cinematic-prompt-engine skills already installed)
- **Voice:** ElevenLabs + Chatterbox clone (already in ai-influencer skill)
- **Captions/scripts/hooks:** Claude/Opus with prism-viral-hook-generator + ad-creative skills
- **Research:** last30days skill (6-platform trend research)
- **Assembly:** Remotion + Whisper captions + Veed Fabric lipsync (already mapped)

All generations are **filtered through the taste profile** via a "taste-match" scoring pass before output.

### Layer 4 — STRATEGY ("the frontal lobe")
- **Content calendar agent** — weekly plan per platform
- **Idea queue** — 50+ ideas always ranked, pulled from trends + your taste
- **Critique agent** — before you post, it scores the output against your taste profile and top-5 competitor content
- **Post-mortem agent** — after you post, it ingests metrics and updates what works
- **Monetization agent** — tracks inbound DMs (via Telegram forward), Skool funnel, deal pipeline

### Glue: OpenClaw + sub-agents + cron
No new infra. Everything runs as OpenClaw skills + scheduled sub-agents. Telegram = control plane. Web UI = dashboard. Files = source of truth.

---

## 4. NICHE & PERSONA (the decision that determines 80% of success)

Before any code, decide:

**A. Niche hypothesis (pick 1, test for 6 weeks, pivot if dead):**
- "AI filmmaking for solo creators — building the future of one-person studios"
- "Vietnamese × AI storytelling — kiếm hiệp meets Seedance"
- "The AI creator's workshop — public R&D of a 100K personal brand"
- "AI × personal branding frameworks — meta-content about building the brain itself"
- "AI ad creative breakdowns — studying what makes ads go viral"

The last one (**"building in public — here's my AI brain"**) is probably the winning Phase 1 niche because:
- The brain itself is the content
- You're already doing it
- Meta-AI content has insane engagement in 2026
- It funnels perfectly to Skool ("learn the system")
- Low content cost (every build session = 3 posts)

**B. Persona:**
- On-camera? (Your face + voice) — highest trust, slowest to scale
- AI-avatar? (ai-influencer skill, cloned voice) — fast, lower trust ceiling, 100K realistic
- Faceless? (screen recordings, b-roll, voiceover) — fast, great for tech niche
- Hybrid: AI-avatar primary + occasional face reveals for trust spikes — **recommended**

**C. Platform priority (don't spread thin):**
- **Primary (daily):** YouTube Shorts + TikTok (algorithm discovery, viral lottery)
- **Secondary (3-5/wk):** X/Twitter (distribution + inbound deals), Instagram Reels (repurpose)
- **Tertiary (weekly):** LinkedIn (B2B deals), blog (SEO + depth)
- **Skool:** monetization layer, launched month 4-5

---

## 5. IMPLEMENTATION — PHASED ROADMAP

### PHASE 0 — FOUNDATION (Week 1–2) · "Decide + Scaffold"

**Week 1 — Decisions (no code):**
- [ ] Lock niche hypothesis (use /cot to test 3 candidates against your actual interests + 30-day trend data via last30days skill)
- [ ] Lock persona (AI-avatar hybrid recommended)
- [ ] Lock 2 primary + 2 secondary platforms
- [ ] Lock "1-sentence brand statement" — print it, stick it on monitor
- [ ] Build reference library seed: 200 pieces of content you love across platforms. Tag them.

**Week 2 — Scaffold:**
- [ ] `brain/` repo structure (monorepo):
  ```
  brain/
  ├── ingest/        # Telegram bot, folder watcher, scrapers
  ├── memory/        # pgvector, taste-profile.json
  ├── generate/      # wrappers around existing skills
  ├── strategy/      # calendar, critic, post-mortem agents
  ├── ui/            # Next.js local dashboard
  ├── data/          # your corpus (gitignored)
  └── cron/          # scheduled OpenClaw sub-agents
  ```
- [ ] Postgres + pgvector local (Docker)
- [ ] Telegram bot skeleton (node-telegram-bot-api, listens to your DMs only)
- [ ] Baseline ingest: forward → OCR/transcribe → embed → store
- [ ] Web UI boilerplate (Next.js 15, shadcn, reads from brain-db)

**Milestone:** Forward any image/video/link to Telegram → shows up in web UI with auto-tags + embedding. Nothing generates yet.

---

### PHASE 1 — TASTE MODEL (Week 3–5) · "Teach the brain"

**Week 3:**
- [ ] Taste-extractor agent: runs on every ingest, extracts visual/voice features, appends to `taste-profile.json`
- [ ] Manual curation UI: 3-button reaction (🔥 love / 😐 meh / ❌ kill) on every item → RLHF-style weight
- [ ] Ingest your existing workspace: cot-outputs, saved notes, research-blog posts, already-made videos

**Week 4:**
- [ ] Similarity search UI: "show me 20 pieces similar to this hook" / "show me all my saved kiếm hiệp refs"
- [ ] Taste-profile dashboard: readable summary of your aesthetic + tone, editable
- [ ] Integrate with existing skills: ai-influencer / seedance skills pull from taste profile automatically

**Week 5:**
- [ ] First generation test: image + video prompt + caption, all taste-filtered
- [ ] Taste-match scorer: 0-100 score before output is shown to you
- [ ] Kill-switch: anything <60 match = regenerate

**Milestone:** You can say "make me a kiếm hiệp short about [topic]" and get an output that *feels like you*, not generic.

---

### PHASE 2 — PRODUCTION LOOP (Week 6–9) · "Ship content daily"

**Week 6:**
- [ ] Idea queue agent (cron, daily): 20 new ideas/day from trends (last30days) × taste profile → ranked
- [ ] Calendar agent: Monday posts weekly plan for 2 primary platforms
- [ ] Daily production pipeline (cron 8am):
  - Pick top idea
  - Generate 3 variants (image + video prompt + caption)
  - Critique agent scores against taste + top-5 competitor content
  - Top variant queued for your review at 9am

**Week 7:**
- [ ] Cross-platform repurposer: 1 long idea → YT Short + TikTok + Reel + X post + LinkedIn (platform-specific formatting)
- [ ] Hook A/B system: every post generates 5 hooks, you pick 1, brain learns which style wins

**Week 8:**
- [ ] Auto-post integration (Buffer/Metricool/manual for safety first)
- [ ] Metrics ingestion: pull views/likes/comments nightly via platform APIs → brain-db
- [ ] Post-mortem agent: weekly report, what worked, what didn't, taste-profile adjustments

**Week 9:**
- [ ] First 30-day content sprint: ship daily on primary, 4x/week secondary
- [ ] Measure. Adjust. Do NOT optimize too early — need data.

**Milestone:** You're posting daily, reviewing in 30 min/day max, rest of the 6hrs goes to building + creating higher-effort pieces.

---

### PHASE 3 — VIRAL ENGINEERING (Week 10–16) · "Hunt for the breakout"

- [ ] **Viral-style SDXL LoRA:** train on your top-50 performing outputs + your aesthetic refs. Gives you a recognizable look in <1 sec.
- [ ] **Chain-shot video system:** use higgsfield + cinematic-prompt-engine to produce 30-60s multi-shot narrative pieces 1x/week (the high-effort shot at virality)
- [ ] **Trend-lock system:** the moment last30days flags a rising trend in your niche → idea queue auto-bumps + you get a Telegram alert
- [ ] **"Big swing" day:** every Friday, one high-production piece that costs 4-6 hrs of effort, designed to be the viral candidate
- [ ] **Cross-post timing optimizer:** posts at platform-specific algorithm windows
- [ ] **Engagement bot (ethical):** surface your best commenters for personal reply; respond in first 30min post-publish (huge algo signal)

**Milestone:** At least 1 viral-candidate piece/week. Goal: 1 hits (>500K views) by end of Phase 3.

---

### PHASE 4 — MONETIZATION + COMMUNITY (Week 17–24) · "Stack the revenue"

- [ ] **Skool community launch** (month 5): $30-50/mo, "behind-the-scenes of my AI brain + monthly teardown"
- [ ] **Inbound deal pipeline:** Telegram forward from brand DMs → deal-tracker agent scores + drafts reply
- [ ] **Platform payouts:** YT Partner Program (need 1K subs + 4K watch hrs), TikTok Creativity Program, X Creator Program — enable the moment eligible
- [ ] **Digital product (month 6):** "The AI Brain Blueprint" — sell the *meta* product (how you built the system). Skool-hosted. $297 one-time or bundled with subscription.
- [ ] **Newsletter:** weekly digest, cross-post from research-blog, ConvertKit or Beehiiv

**Milestone:** $3-5K/month recurring by month 6. Multiple streams, not dependent on one.

---

### PHASE 5 — COMPOUND (Month 7–12) · "Let the brain do the work"

- [ ] Brain is now mostly autonomous; your time shifts to: on-camera moments, strategy, inbound deal closure, Skool community
- [ ] Weekly brain-review: what the brain got wrong, retrain
- [ ] Experiment lab: 1 new format/month (live streams? podcast? long-form YT?)
- [ ] Hire first human: editor or VA (NOT a ghostwriter — you stay the voice)
- [ ] Evaluate: at month 9, if trajectory is <30K on primary platform, do a hard pivot (niche, format, or both). Don't sunk-cost.

**Milestone (month 12):** 50-100K primary platform, 20-40K each on 2 secondaries, $5-15K/mo revenue, brain is a legit asset.

---

## 6. WEEK-BY-WEEK BUILD SCHEDULE (first 90 days, concrete)

| Week | Focus | Ship-list |
|---|---|---|
| 1 | Decide niche/persona/platforms | Brand statement, 200-item ref library, trend report via /last30days |
| 2 | Repo + Telegram ingest + DB | Forward anything → stored + embedded |
| 3 | Taste-extractor + reaction UI | Taste profile v1, 500+ items curated |
| 4 | Search + integrate skills | Query the brain, skills pull from taste |
| 5 | First taste-filtered generation | 1 complete image+video+caption on-brand |
| 6 | Idea queue + calendar | 20 ideas/day, weekly plan Monday |
| 7 | Cross-platform repurposer + hook A/B | 1 idea → 5 formats |
| 8 | Auto-post + metrics ingest | Daily posts running |
| 9 | First 30-day sprint starts | Posting daily |
| 10 | SDXL LoRA training on top outputs | Recognizable visual style locked |
| 11 | Chain-shot video system | First 30-60s cinematic piece |
| 12 | Viral-hunt infra | Weekly big swing |
| 13 | Ingest competitor content en masse | Brain knows the landscape |
| 14 | Critique agent v2 | Auto-kills bad outputs |
| 15 | Engagement + timing optimizer | Post timing automated |
| 16 | Retrospective + pivot gate | Keep going or adjust niche |
| 17-20 | Skool prep + launch | Community live |
| 21-24 | Monetization stack + platform payouts | First $ flowing |

---

## 7. RISKS & MITIGATIONS

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Niche doesn't land | 50% | High | Month-3 pivot gate, hard data-based decision |
| Burnout from 6hrs/day × 12 months | 60% | Very high | Built-in off-days, the brain IS the hedge — it keeps posting when you don't |
| Platform algo change kills one channel | 80% (will happen) | Medium | Multi-platform by design; email list = owned audience |
| AI model deprecation (Seedance v2 dies) | 40% | Medium | Abstraction layer over models; easy swap |
| Taste profile drifts / gets mid | 40% | Medium | Monthly manual taste review + curation session |
| Brand deal inbound slow | 70% first 6mo | Low (not primary) | Don't count on it for revenue until month 9+ |
| Copyright/trademark issues on ingested refs | 30% | Medium-high | Never republish raw; always taste-transformed; keep private until proven legally safe |
| Over-engineering the brain, under-posting | 80% | Very high | **Rule: ship 1 post/day from Week 6 onwards no matter how broken the brain is.** |

**The single biggest risk: building the brain becomes the procrastination hobby instead of posting content.** Phase 2 forces posting discipline from week 6 even with a janky brain.

---

## 8. COST ESTIMATE (monthly, steady-state)

| Item | Cost/mo |
|---|---|
| Anthropic API (Opus + Sonnet heavy use) | $150-300 |
| fal.ai (Kling/Seedance/Veo) | $100-250 |
| NanoBanana / Gemini image | $30-80 |
| ElevenLabs | $22-99 (rotate 2 keys) |
| Vercel (blog, maybe web UI) | $0-20 |
| Postgres/Qdrant (local Docker) | $0 |
| Domain + misc | $10 |
| Skool (if you launch community) | $99 |
| Buffer/Metricool (scheduler) | $15-30 |
| **Total** | **$325-900/month** |

Early months ~$300, scales with volume. Revenue should eclipse by month 5-6.

---

## 9. DECISION & IMMEDIATE NEXT STEPS

**Decision:** Go. Opportunity is asymmetric (low downside given existing tooling, high upside). Biggest watch-out is building-over-shipping.

**Next 7 days:**
1. **Today:** Pick niche hypothesis (I can help — run `/cot` on 3 candidates with last30days data).
2. **Day 2-3:** Build 200-item seed reference library. Manual. No code yet.
3. **Day 4:** Brand statement + platform priorities locked.
4. **Day 5-7:** Scaffold the `brain/` repo + Telegram ingest MVP. Just ingest, no generate.

**First code line this week is for ingestion, not generation.** The brain needs food before it thinks.

---

## 10. META — Why this is worth 12 months of 6hrs/day

Even if you miss 100K on 3 platforms, what you'll have:
- A proprietary taste-aware AI creative system that's a ~6-month ahead moat
- A personal brand of any size (even 20K is valuable)
- A saleable asset (the brain itself, or the frameworks as course)
- Cross-domain R&D muscle that compounds into everything else
- The option, later, to turn it into SaaS (you said no SaaS *now* — that option remains open post month 12)

**The brain is worth building even if the brand grows slow. The brand is worth growing even if the brain stays simple. Doing both in parallel is the asymmetric bet.**

— 🌌
