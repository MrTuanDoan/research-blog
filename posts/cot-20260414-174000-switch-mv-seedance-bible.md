# COT: Jessica SWITCH MV — Seedance 2.0 Production Bible Analysis
**Source:** Switch MV Prompt Bible.pdf (Ray Ambler Films / AIKO Creative Solutions)
**Date:** 2026-04-14
**Model:** Opus

---

## TASK

Deeply analyze the SWITCH MV Production Bible — a full AI music video production guide using Seedance 2.0 — and extract:
1. The core system and philosophy
2. The highest-leverage techniques
3. How it integrates with our existing ai-influencer + Knox pipeline
4. What's new vs what we already know
5. Actionable next steps

---

## STEP-BY-STEP REASONING

### Step 1: What is this document actually?

This is a complete production bible for a real AI music video — "Switch" by Jessica — produced by Ray Ambler Films using Seedance 2.0 as the primary AI video engine, supplemented by Kling, Vidu, Haiper, and a post-production pipeline.

It's not a theoretical guide. It's a working production document — the actual prompts used, the actual workflow, the actual problems encountered and solved. This is the closest thing to a battle-tested Seedance 2.0 field manual that exists.

**Key specs:**
- 22 pages of production documentation
- 15 scene prompts (fully written, production-ready)
- Multi-model strategy (Seedance primary + Kling/Vidu/Haiper as fallbacks)
- Full post-production pipeline (DaVinci Resolve + CapCut + ElevenLabs)
- Custom character DNA system for visual consistency
- Lighting continuity system across scenes
- Motion control methodology

---

### Step 2: What is the core innovation — the Character DNA System?

The most important concept in the entire document is **Character DNA** — a standardized identity description that gets injected into every single prompt.

**Jessica's Character DNA:**
```
Asian female, approximately 25-30 years old, medium-length straight black hair 
with subtle highlights, warm honey-brown eyes, high cheekbones and soft facial 
features, porcelain complexion with natural flush, slim athletic build, 
approximately 5'6" height, expressive hands, natural graceful movements
```

**Why this is the breakthrough:**
Without consistent character DNA, AI generates a different-looking person every shot. The Character DNA is the solution to the identity drift problem — the same anchoring technique Knox and NanoBanana use, but systematized into a transferable formula.

Every prompt in the bible starts with this exact DNA block, then adds:
- Outfit description
- Setting/environment
- Action/motion
- Camera angle
- Lighting specification
- Mood/atmosphere
- Technical parameters

**This is a template, not just a technique.**

---

### Step 3: The Prompt Architecture

The bible reveals a 9-layer prompt architecture for every shot:

```
Layer 1: CHARACTER DNA       → Who she is (locked, never changes)
Layer 2: OUTFIT              → What she's wearing (scene-specific)
Layer 3: ENVIRONMENT         → Where (scene-specific)
Layer 4: ACTION/MOTION       → What she's doing (shot-specific)
Layer 5: CAMERA              → Angle, movement, focal length
Layer 6: LIGHTING            → Type, direction, quality, color temp
Layer 7: MOOD/ATMOSPHERE     → Emotional tone
Layer 8: TECHNICAL           → Style, quality, render quality
Layer 9: SEEDANCE PARAMS     → Resolution, duration, motion intensity
```

**Real example from the document (Scene 1 — Opening):**
```
Asian female, approximately 25-30 years old, medium-length straight black hair 
with subtle highlights, warm honey-brown eyes, high cheekbones and soft facial 
features, porcelain complexion with natural flush, slim athletic build | 
wearing a flowing white chiffon dress with delicate floral embroidery, bare feet | 
standing in an ethereal white studio space with soft diffused lighting, 
floating white fabric pieces | slowly turning and reaching upward with both 
hands, fabric flowing around her in slow motion | camera circles slowly around 
her at medium distance, slight upward angle | soft omnidirectional white light, 
no harsh shadows, ethereal glow | dreamlike and transcendent, pure emotion | 
cinematic 4K, high detail, professional music video quality | 
Seedance 2.0 high-fidelity mode
```

**The pipe `|` separator is NOT standard Seedance syntax.** This is their organizational convention for human readability — they likely convert to natural prose or use it as a structure guide when submitting.

---

### Step 4: Multi-Model Strategy

The bible doesn't treat Seedance 2.0 as the only tool. It uses a deliberate multi-model hierarchy:

**Seedance 2.0** — Primary engine
- Best for: complex choreography, fabric/fluid dynamics, multiple body-part coordination
- Used for: 80% of shots, especially dancing scenes and emotional close-ups

**Kling 2.0** — Secondary engine  
- Best for: realistic human movement, cinematic quality, face consistency
- Used for: dialogue-heavy shots, static character moments, when Seedance drifts

**Vidu** — Specialist
- Best for: artistic/stylized aesthetics, abstract sequences
- Used for: dream sequences, color-graded artistic shots

**Haiper** — Backup
- Best for: quick iterations, abstract visual effects
- Used for: background elements, abstract B-roll

**The insight:** No single AI video model is best at everything. Professional production means knowing which model handles which shot type and routing accordingly.

---

### Step 5: Lighting as a Character

One of the most sophisticated elements of the bible is how lighting is treated — not as an afterthought but as a scene-defining variable that must be:
1. Specified precisely in every prompt
2. Kept consistent within a scene
3. Transitioned deliberately between scenes

**Lighting vocabulary used:**
- "Soft omnidirectional white light, no harsh shadows, ethereal glow"
- "Warm golden hour sunlight, 3/4 backlit, soft fill from front"
- "Blue neon glow from below, dramatic side lighting, deep shadows"
- "Overcast natural daylight, even soft light, no direct sun"
- "Studio three-point lighting, key light 45° right, soft fill left"

**The lesson:** Lighting specification is not decoration. It's identity. Consistent lighting = consistent character appearance across shots.

---

### Step 6: Motion Intensity as a Prompt Parameter

Seedance 2.0 accepts a `motion_intensity` parameter that the bible explicitly uses:

- `low (0.2-0.3)` — subtle movements, gentle swaying, emotional close-ups
- `medium (0.4-0.6)` — natural movement, standard scenes
- `high (0.7-0.8)` — energetic dance, action sequences
- `maximum (0.9-1.0)` — intense choreography, climactic moments

**This is a dial, not a binary.** Most people set motion and hope for the best. The bible treats it as a precise technical parameter matched to narrative purpose.

---

### Step 7: Scene Structure — 15 Scenes, 3 Acts

The MV follows a deliberate three-act structure:

**Act 1 — Emergence (Scenes 1-4):** Ethereal studio, dreamlike awakening, white palette
**Act 2 — Transformation (Scenes 5-10):** Urban environments, neon, energy, switching between worlds
**Act 3 — Integration (Scenes 11-15):** Resolution, power, synthesis of both worlds

Each scene has:
- Seed number for reproducibility
- Duration (3-8 seconds per shot)
- Motion intensity value
- Post-production notes

**The seed system** is critical: when you get a good generation, save the seed. You can re-run with the same seed for variations or regenerate near-identical frames for cutaways.

---

### Step 8: Post-Production Pipeline

The bible's post-production section reveals the full assembly pipeline:

```
Seedance 2.0 generations (.mp4, 3-8s clips)
    ↓
DaVinci Resolve — Color grading + scene assembly
    ↓  
CapCut — Quick edits, captions, social format export
    ↓
ElevenLabs — Voice/narration elements (where needed)
    ↓
Final delivery: 16:9 YouTube + 9:16 Shorts/Reels versions
```

**Notable:** No Remotion in this pipeline. They're using DaVinci → CapCut for manual assembly. This is where our Knox pipeline (Remotion) would be a significant upgrade — automated assembly vs manual.

---

### Step 9: Quality Control Protocol

The bible includes a generation quality scoring system:

**Accept criteria (use the clip):**
- Character DNA maintained ≥ 80% accuracy
- Motion smooth, no jitter
- Lighting matches specification
- Facial expression matches emotional direction
- No visible artifacts

**Regenerate criteria:**
- Identity drift (different face/build)
- Motion artifacts (flickering limbs, distortion)
- Wrong lighting (contradicts scene spec)
- Wrong mood (flat affect when emotion required)

**The 3-generation rule:** If a prompt fails 3 times to hit accept criteria, modify the prompt before trying again. Don't keep running the same broken prompt.

---

### Step 10: What's New vs What We Already Know

**Already in our stack:**
- Character identity lock (we have Character Bible system)
- AVOID section for image generation
- Multi-model routing (fal.ai gives us Kling + others)
- Motion specification in prompts
- Post-production assembly (Remotion > their DaVinci/CapCut)

**New from this bible:**

1. **Character DNA as a portable template** — they have a specific formula for extracting identity into a reusable, insertable text block. We have the concept but not the formula.

2. **9-layer prompt architecture** — systematic, ordered, pipe-separated. More structured than our current ad prompts.

3. **Motion intensity as an explicit numeric parameter** — we need to add this to our Kling/Seedance prompts.

4. **Seed number tracking** — save seeds from successful generations for reproducibility. We don't currently do this.

5. **Lighting as identity** — our prompts mention lighting but don't systematize it as a continuity mechanism.

6. **Multi-model routing matrix** — their explicit "use Seedance for X, Kling for Y, Vidu for Z" routing logic is more sophisticated than our current approach.

7. **3-act narrative structure for MV** — applicable to any branded content series.

8. **The 3-generation rule** — fail 3 times = change prompt, not retry.

---

## SYNTHESIS: What This Changes

### For AI Influencer / UGC Ads (Knox pipeline)

The Character DNA system directly upgrades our NanoBanana + Kling workflow:

**Current flow:**
- Generate character image with description
- Use description in Kling prompt (inconsistent)

**Upgraded flow (post-bible):**
- Extract Character DNA once at project start
- Inject DNA block into every Kling prompt as Layer 1
- Add Lighting Continuity spec as Layer 6
- Add motion_intensity parameter as Layer 9
- Track seeds from good generations

This alone makes every ad more consistent with less iteration.

### For the Knox Pipeline Specifically

The bible validates the Knox pipeline architecture but adds:

1. **Seedance 2.0 as a primary alternative to Kling 3.0** — for complex choreography and music-synced content, Seedance may outperform Kling
2. **The 9-layer prompt as the config schema** — maps to our `ad-config.json` but more structured
3. **Seed tracking as a data field** — add `"seed": null` to our config schema, populate when we find winning generations

### For Music Video / Long-Form Content

The bible proves a full AI music video is producible with current tools. The pipeline is:
- Seedance 2.0 (primary) + Kling (secondary) + Vidu (artistic)
- 15 scenes × 3-8s = ~60-80 seconds of content
- Character DNA for consistency
- DaVinci → CapCut assembly (or Remotion for automated)

This is a direct expansion of our capability surface beyond 30s UGC ads.

---

## CONCLUSIONS

### The 5 Key Takeaways

**1. Character DNA is a formula, not a concept.**
Don't describe your character vaguely. Extract a specific 50-word DNA block — age, hair, eyes, skin, build, height, distinctive features. Lock it. Inject it at Layer 1 of every prompt. This is what makes the character the same person across 15 shots.

**2. Prompt architecture is 9 layers, in order.**
Character DNA → Outfit → Environment → Action → Camera → Lighting → Mood → Technical → Parameters. Structure is not optional — it's how the model receives signal vs noise.

**3. Motion intensity is a dial.**
Match it to narrative purpose: 0.2 for emotional close-up, 0.7 for dance, 0.9 for climax. Don't leave it at default.

**4. Save seeds from winning generations.**
Seeds are the reproducibility mechanism. A good seed + same prompt = near-identical results. Build a seed library per character.

**5. Multi-model is professional standard.**
Seedance for complex motion + choreography. Kling for facial consistency and dialogue. Vidu for artistic/stylized. Route deliberately, not randomly.

### Immediate Actions for Our Stack

| Action | File to Update | Time |
|---|---|---|
| Add Character DNA formula to SKILL.md | `skills/ai-influencer/SKILL.md` | 30 min |
| Upgrade prompt format to 9-layer architecture | `skills/ai-influencer/ad-creative/SKILL.md` | 45 min |
| Add motion_intensity field to ad-config.json schema | `skills/ai-influencer/IMPLEMENT.md` | 15 min |
| Add seed tracking field to config schema | `skills/ai-influencer/IMPLEMENT.md` | 10 min |
| Add Seedance 2.0 to multi-model routing table | `skills/ai-influencer/SKILL.md` | 20 min |
| Create Character DNA extraction prompt template | `skills/ai-influencer/character-bible/` | 30 min |

### The Biggest Unlock

The Character DNA system, combined with our existing Knox pipeline + Remotion assembly, enables something the bible's team doesn't have: **fully automated consistent character video at scale**.

They produce one MV manually over days/weeks. We're building the system to produce 6 ads in hours with the same character consistency they achieve across 15 manually crafted scenes.

The bible is proof the quality bar is achievable. Our pipeline is how you hit it at scale.

---

*COT output: Switch MV Prompt Bible — Seedance 2.0 production analysis*
*Date: 2026-04-14*
*Model: Opus*
