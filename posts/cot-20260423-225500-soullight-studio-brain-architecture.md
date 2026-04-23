---
title: "SOUL LIGHT STUDIO — Brand Lock + Brain Architecture (Feed-to-Learn System)"
date: "2026-04-23"
description: "Final brand lock for Soul Light Studio (AI couple filmmaking). Full architecture for the feed-to-learn creative brain: how ingested images/videos/prompts get analysed, what's extracted, and how it shapes all future generation. Includes content pillars, avatar workflow, and Day 1 execution plan."
---

# SOUL LIGHT STUDIO — Brand Lock + Brain Architecture

**Date:** 2026-04-23 · **Owner:** Tuan · **Mode:** Opus

---

## THE BRAND IS ALREADY REAL

Soul Light isn't a new brand — it has history:
- Feb 2026: `cot-20260223-soullight-3month-action-plan.md` — team of 2 (you + wife), emotional content, connection-focused, built for Australia
- Original niche: "Tình Bạn Tuổi Trưởng Thành" (Friendship in Adulthood), evergreen, emotional, viral-prone
- Original message: **"kết nối, lan tỏa"** — connect and radiate

**What changed:** The delivery mechanism. Same soul, now with AI filmmaking as the engine.

**New positioning:** Soul Light Studio is an AI film studio built by a couple — making emotional, cinematic short films and couple-moment content using AI avatars. The original heart (connection, human emotion, adult life) + the new superpower (AI generation at scale).

This is actually *better* than starting fresh. The brand has a soul already. Now it has a studio.

---

## LOCKED: SOUL LIGHT STUDIO

### Identity
- **Name:** Soul Light Studio
- **Tagline:** *"Filmed by AI. Felt by humans."*
- **Alternative tagline:** *"Two people. Two avatars. One story at a time."*
- **Core emotion:** Warmth, intimacy, wonder — never cold, never tech-bro
- **Voice:** Poetic + grounded. Never dry tutorial, never hype. Feels like a letter from someone who gets it.

### Content Pillars (3)

**Pillar 1 — Cinematic Shorts (the product)**
- 30-60s AI-generated narrative shorts
- Mix: entertainment scenes, couple moments, trending concepts
- Style: cinematic grade, consistent look, emotional core
- Formats: single avatar (him or her), couple (both), ensemble
- Frequency: 3x/week

**Pillar 2 — "How We Made This" (the education)**
- BTS of each cinematic short
- Show the prompt, the model, the iteration
- "This took 47 attempts. Here's what we learned."
- Frequency: 2x/week

**Pillar 3 — Couple Moments (the heart)**
- AI avatar couple content — slice-of-life, emotional, relatable
- "Him vs her" POV content
- Trending audio + couple aesthetic
- This is the viral lottery pillar — short, emotional, shareable
- Frequency: 2x/week

### Avatar Roles
- **Him (Tuan's avatar):** The Director. Calm authority, visionary, slightly serious. The one who explains systems, gives takes, drives the narrative.
- **Her (Wife's avatar):** The Soul. Warmth, emotional intelligence, aesthetic instincts. She brings the feeling. Her reactions make the content human.
- **Together:** A creative partnership — complementary, not competitive. Their dynamic IS the content.

---

## THE BRAIN: FEED-TO-LEARN ARCHITECTURE

This is the most important section. You asked:
> *"What about the idea of building the brain by feeding images/videos/prompts → analyse and extract what good for our project?"*

This is exactly right. And it's more powerful than most people build. Here's the full design:

---

### What the Brain Is

Think of it as a **living taste model** — a system that:
1. **Ingests** anything you feed it (images, videos, prompts, references, finished works)
2. **Analyses** each piece across multiple dimensions
3. **Extracts** what's relevant to Soul Light Studio's goals
4. **Builds** a structured taste profile that gets richer over time
5. **Applies** that profile to every generation — filtering, scoring, guiding

The brain doesn't just store. It *learns what you like* and uses that to make better outputs.

---

### Ingest Layer — What You Feed It

| Input type | How you feed it | What it is |
|---|---|---|
| **Images** | Drop in `brain/inbox/images/` or Telegram forward | Reference images, inspiration, screenshots, competitor content |
| **Videos** | Drop in `brain/inbox/videos/` or Telegram forward | Reference clips, viral shorts, filmmaking inspiration |
| **Prompts** | Telegram message or web UI paste | Text prompts that worked well, prompt fragments, style descriptors |
| **Finished works** | Auto-ingested from `brain/outputs/` | Your own generated content — the brain learns from its own successes |
| **Metrics** | Auto-pulled nightly | Views, likes, comments per post — brain learns which outputs performed |
| **Links** | Telegram forward URL | Articles, viral posts, creator content you want to study |
| **Notes** | Chat with me here | "I love the lighting in this" / "avoid this style" — verbal taste signals |

---

### Analysis Layer — What Gets Extracted

For every ingested piece, the brain runs an **extraction pipeline**:

#### For Images:
```
VISUAL ANALYSIS
├── Composition: rule of thirds / centered / dynamic / flat
├── Lighting: golden hour / dramatic / soft / harsh / neon / natural
├── Color palette: dominant colors, temperature (warm/cool), saturation level
├── Mood: melancholic / joyful / tense / peaceful / mysterious / romantic
├── Subject: solo / couple / crowd / landscape / abstract / product
├── Style: cinematic / editorial / candid / stylized / realistic / surreal
├── Camera feel: tight close-up / wide establishing / mid-shot / POV
└── RELEVANCE SCORE: 0-100 for Soul Light Studio
```

#### For Videos:
```
VIDEO ANALYSIS
├── Pacing: fast cut / slow burn / rhythmic / chaotic / steady
├── Narrative arc: linear / fragmented / emotional peak / twist
├── Hook type: visual / audio / text / action / emotion
├── First 3 seconds: what makes you stop scrolling
├── Audio: music + tone + pacing match
├── Engagement prediction: why this would/wouldn't go viral
├── Production style: raw/authentic / polished / cinematic / UGC
└── RELEVANCE SCORE: 0-100 for Soul Light Studio
```

#### For Prompts:
```
PROMPT ANALYSIS
├── Style descriptors extracted: "golden hour", "handheld", "intimate"
├── Model compatibility: Seedance / Kling / Veo / NanoBanana
├── Strength score: how specific / evocative / actionable is this prompt
├── Reusability: can this be templated for Soul Light content
└── Tags: #visual-style / #camera-movement / #mood / #subject
```

#### For Finished Works (your outputs):
```
PERFORMANCE ANALYSIS (once metrics are in)
├── Views, likes, comments, shares
├── Watch time / completion rate (if available)
├── Platform: which platform performed best
├── Hook effectiveness: did people stop at first 3 seconds
├── What worked: extract the specific elements that drove performance
└── Update taste profile: reinforce the winning patterns
```

---

### Taste Profile — What Gets Built

Everything extracted flows into a single evolving `taste-profile.json`:

```json
{
  "soul_light_studio": {
    "version": "1.0",
    "last_updated": "2026-04-23",

    "visual_style": {
      "lighting": ["golden hour", "soft diffused", "warm backlight", "neon accent"],
      "color_palette": ["warm amber", "deep teal", "soft white", "muted earth"],
      "composition": ["intimate close-up", "couple in frame", "wide emotional establishing"],
      "avoid": ["harsh flash", "clinical white", "cold blue corporate"]
    },

    "mood_spectrum": {
      "target": ["warmth", "longing", "quiet joy", "wonder", "intimacy"],
      "avoid": ["cold", "aggressive", "shock-value", "empty hype"]
    },

    "narrative_style": {
      "pacing": "slow burn with emotional peak in final 10 seconds",
      "hook_type": "visual — something beautiful or unexpected in first 2 seconds",
      "arc": "ordinary moment → unexpected depth → feeling that lingers",
      "avoid": ["pure action without emotion", "meme formats", "cringe relatable"]
    },

    "couple_dynamic": {
      "him": "calm presence, steady gaze, understated strength",
      "her": "expressive, warm, the one who notices the small things",
      "together": "complementary — his stillness + her warmth = chemistry",
      "content_types": ["parallel moments", "his POV vs her POV", "small gesture reveals", "shared wonder"]
    },

    "prompt_vocabulary": {
      "lighting": ["golden hour diffused", "soft rim light", "warm practical lights"],
      "camera": ["handheld intimate", "slow push-in", "wide to close progression"],
      "mood": ["bittersweet", "quietly beautiful", "understated emotion"],
      "quality": ["cinematic grain", "film look", "35mm aesthetic"]
    },

    "top_performing_patterns": [],
    "avoid_list": [],

    "inspiration_sources": {
      "visual": [],
      "narrative": [],
      "audio": []
    }
  }
}
```

This file is:
- **Auto-updated** every time you ingest something and rate it 🔥 love
- **Manually editable** via web UI (you can override anything)
- **Referenced by all generation skills** — every Seedance prompt, every NanoBanana image, every caption is filtered through this profile

---

### The Scoring Pass — How It Applies to Generation

Every output before it reaches you goes through a **taste-match scorer**:

```
INPUT: Generated image / video prompt / caption
↓
TASTE SCORER checks:
  ✓ Lighting matches Soul Light visual style?
  ✓ Mood aligns with target spectrum?
  ✓ Narrative arc follows Soul Light pattern?
  ✓ Couple dynamic correct (if both avatars)?
  ✓ Prompt vocabulary used?
  ✓ Nothing on avoid list?
↓
SCORE: 0-100
  ≥ 80 → Show to Tuan
  60-79 → Show with "weak" flag + specific notes on what's off
  < 60 → Regenerate automatically (up to 3 attempts)
↓
OUTPUT: Scored result with reasoning
```

This means you never see garbage. You only review work that already meets the bar.

---

### What "Good for Our Project" Means (extracted automatically)

When something is ingested, the brain doesn't just store it. It asks:

> *"What specifically makes this good for Soul Light Studio?"*

Extracted signals:
- **Visual pattern:** "The warm backlight + slow push-in creates instant intimacy — use this in couple moments content"
- **Hook pattern:** "The first frame shows a hand reaching — people stop for that. Add to hook vocabulary."
- **Narrative pattern:** "The twist comes at 0:47 — just before audience would have dropped off. Timing note saved."
- **Prompt fragment:** "The phrase 'dust particles in golden light' consistently produces cinematic quality — add to vocabulary"
- **Avoid signal:** "Anything with high-saturation green looks synthetic on Seedance 2.0 — add to avoid list"

These extractions accumulate. After 6 months of feeding the brain, it has a deeply specific understanding of what Soul Light Studio's aesthetic is — better than you could articulate verbally.

---

## BRAIN BUILD PLAN (Week by Week)

### Week 1 — Scaffold + Ingest
- `brain/` repo created
- Telegram bot: forward anything → tagged + stored
- Folder watcher: drop in `brain/inbox/` → auto-ingest
- Basic web UI: view everything ingested, react (🔥/😐/❌)
- Manually write `taste-profile.json` v1 — just your instincts, no AI yet
- Goal: 200+ items ingested and reacted to

### Week 2-3 — Analysis Pipeline
- Image analyser: Claude Vision on every ingested image → extract visual signals
- Video analyser: frame extract (ffmpeg) → analyse key frames → extract narrative/hook signals
- Prompt analyser: tag and score every ingested prompt
- Extraction writes to `brain/extractions/YYYY-MM-DD-{source}.json`
- Auto-update `taste-profile.json` from highest-rated extractions

### Week 4-5 — Generation Integration
- All existing skills (ai-influencer, cinematic-prompt-engine, seedance, ugc-seedance2) read from `taste-profile.json` before generating
- Taste-match scorer built and active
- Web UI: side-by-side "taste profile says X" vs "generated output" comparison

### Week 6+ — Production Loop
- Brain ingests your own outputs + their metrics
- Weekly taste-profile review (Friday): what performed → reinforce, what flopped → adjust
- The brain gets smarter every week automatically

---

## CONTENT TYPES — CONCRETE EXAMPLES

### Pillar 1: Cinematic Shorts

**Type A — Entertainment Narrative (him, her, or both)**
- A 45s story with emotional arc
- Examples: "She finds an old photo" / "He watches her sleep in the car, thinking" / "They almost missed the flight — but didn't"
- Seedance + voice + music + caption
- Couple avatar usage: either or both depending on story

**Type B — Trending/Viral Concept**
- Latch onto trending audio, visual style, or concept
- AI-generate the Soul Light version
- Examples: trending dance trend → AI avatars do it in cinematic style / trending sound → our couple version
- Fast to produce: 1-2 hrs from trend spotted to posted

**Type C — "Impossible Scene"**
- Content that physically couldn't be filmed by a real couple
- Examples: "Two people floating in zero gravity" / "Walking through a painting" / "Their first meeting, but it's 1920s Paris"
- This is where AI flex is the content itself

### Pillar 3: Couple Moments

**Type A — His POV vs Her POV**
- Same moment, two perspectives
- Him avatar: "I was thinking about the project"
- Her avatar: "He was just staring at the sunset. I knew he needed this."
- Caption: "Same moment. Different universe." → massive engagement

**Type B — Small Gesture Reveals**
- 15-30s, one simple moment with unexpected depth
- "He booked the trip without telling her" / "She left coffee on his desk with a note"
- No dialogue needed — music + visuals + caption

**Type C — Trending Couple Format**
- AI Couple + trending audio (e.g., "husband and wife" trend currently viral)
- Fast repurpose of viral couple formats using our avatars

---

## DAY 1 EXECUTION PLAN

**Right now (today):**

1. **Send me your avatar reference images** — share the file paths or forward to Telegram
   - I'll analyse both and write the locked reference descriptors
   - These become permanent in `brain/avatar-refs/`

2. **Pick your first content piece** — I'll generate it immediately:
   - Option A: A 45s couple moment — "the quiet morning before everything gets busy"
   - Option B: A trending concept — grab the AI couple trend (6.1M views/week right now)
   - Option C: An impossible scene — "them, walking through a painting that keeps changing"

3. **Write `taste-profile.json` v1** — takes 20 min:
   - I'll ask you 10 questions about your aesthetic instincts
   - I compile the answers into the taste profile
   - This becomes the brain's first "soul"

4. **Set up the `brain/` repo scaffold** — takes 1 hour:
   - Create the folder structure
   - Set up Telegram ingest (basic version, node.js)
   - First 50 reference items ingested

---

## META — WHY FEEDING THE BRAIN IS THE REAL MOAT

Most creators use AI as a vending machine: put in a prompt, get out content.

What you're building is different: a system that *learns your aesthetic over time* — so every month, the outputs get more "Soul Light" and less "generic AI." After 6 months of feeding, the brain will produce things that *feel* like you without you having to describe your style to it each time.

This is the compounding advantage:
- Month 1: Brain has 200 examples → outputs are 60% on-brand
- Month 3: Brain has 800 examples + performance data → outputs are 80% on-brand
- Month 6: Brain has 2,000+ examples + taste model reinforced by what performed → outputs are 95% on-brand

And nobody can copy that. They can copy your tools. They can't copy 6 months of your taste, your aesthetic, your story — baked into a system that makes it for you at scale.

**That's Soul Light Studio's real product.** The films are what people see. The brain is what makes them possible.

— 🌌
