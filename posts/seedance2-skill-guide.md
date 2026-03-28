# /seedance2 — The Complete Prompt Engineering Skill for Seedance 2.0

*A free, open-source prompt skill built on the technical playbook by [@starks_arq](https://x.com/starks_arq) — an AI film studio that has made films for governments and billion-dollar companies.*

---

## What is /seedance2?

`/seedance2` is an OpenClaw skill — a reusable command that generates production-ready multi-shot video prompts for Seedance 2.0, structured around the complete technical playbook published by **Amir D (@starks_arq)**.

Every time you run `/seedance2`, you get a full shot-by-shot video script with camera directions, lighting pairs, audio cues, and quality suffixes — ready to paste into CapCut and generate.

**Command syntax:**
```
/seedance2 15s 10shots dramatic for [your brand/product]
/seedance2 30s 20shots comedy for [scenario]
/seedance2 60s 40shots luxury for [campaign]
```

---

## The foundation: @starks_arq's Seedance 2.0 Playbook

All credit for the technical framework goes to **Amir D (@starks_arq)**. His team spent months inside Seedance 2.0, testing every technique and documenting what actually works.

The core insights that changed how we think about AI video:

### 1. Stop thinking "video." Start thinking "shots."

Seedance maxes at 15 seconds at 720p. That's not a limitation — that's the workflow. A 60-second video is four 15-second shots, stitched in post. A real editor works the exact same way. The moment you make that mental switch, Seedance goes from a toy to a production tool.

### 2. The ONE VERB rule

Multiple action verbs confuse the model. Every single time. `"He turns"` works. `"He turns, walks forward, reaches out, and speaks"` produces garbage. One verb per shot. Non-negotiable.

### 3. The 6-block prompt structure

Every shot needs exactly these elements in natural paragraph form:

> **[Who + wardrobe + location]** [single action verb] **[camera framing + movement]** [film stock + lighting reinforcement pair] [audio/sound] **4K, Ultra HD, Rich details, Sharp clarity, Cinematic texture, Natural colors, Stable picture.**

The quality suffix goes on **every single shot**. No exceptions.

### 4. Style reinforcement pairs, not single keywords

`"Cinematic"` is the most useless word in AI video prompting. The model has seen 10 million images tagged cinematic. It means nothing specific.

What works:
- `"Kodak Vision3 500T, motivated warm lighting, shallow depth of field, lifted blacks"` → warm cinematic
- `"ARRI Alexa color science, practical light sources visible in frame, negative fill"` → high-end digital
- `"35mm film grain, warm tungsten bounce, volumetric dust particles"` → indie texture

Reinforcement pairs tell the model exactly what you want. Single keywords don't.

### 5. The reference image system

Seedance accepts up to 12 reference files (9 images + 3 video + 3 audio).

**@Image1 gets 40–50% more attention weight than any other slot.** Your most important reference always goes in slot 1.

For consistent characters: provide 3 separate face crops — front, three-quarter, profile. Never use turnaround grid sheets. The model reads each panel as a separate character and creates mosaic confusion.

For image-to-video: open the prompt with `"@Image1 as the first frame."` Then describe only action and environment. Over-describing the character in text actively erodes the reference — the model starts reconstructing the face from your words instead of from the image.

Identity lock phrase that works across every scene:
> *"Same person as @Image1. Do not alter facial proportions, eye shape, or hairstyle."*

### 6. The Chinese prompt technique

Seedance was built by ByteDance and trained heavily on Chinese-language data. Spatial relationships, fabric textures, weather descriptions, and architectural detail all resolve tighter in Mandarin because the training data is denser in those categories.

For prompts with complex physical descriptions — fabric moving under wind, rain hitting stone, light refracting through glass — write in English first, translate to Mandarin, run both versions.

5 minutes of translation regularly saves an hour of re-generation.

### 7. The viral content strategy

Seedance is fast enough to ride real-time trends. Set notifications on Polymarket. When a topic spikes, you have a window of a few hours where millions are searching and almost nobody has video yet.

```
Trend spikes → CapCut → 4–5 start frames → Seedance img2vid → stitch → post
```

You're not solving a quality problem. You're solving a supply problem. Be the only supply.

---

## The /seedance2 narrative arc

Beyond the technical blocks, `/seedance2` adds a **7-beat narrative structure** that turns a list of shots into a story:

```
[B1] WORLD SETUP    → Establish where/when/mood
[B2] NORMAL STATE   → The ordinary world before disruption
[B3] DISRUPTION     → Something breaks the normal (fast, surprising)
[B4] ESCALATION     → Tension rises, rapid cuts
[B5] PIVOT BEAT     → The unexpected turn — the rewatch trigger
[B6] RESOLUTION     → Product/message lands through action, not announcement
[B7] TAGLINE FRAME  → Brand closes. Text on screen. Hold.
```

The pivot beat is everything. Every script needs one moment so unexpected it makes someone rewatch. If the pivot is predictable, rewrite it.

Shot allocation by duration:

| Duration | Total shots | B1 | B2 | B3 | B4 | B5 | B6 | B7 |
|----------|------------|----|----|----|----|----|----|-----|
| 15s | 10 | 1 | 1 | 1 | 3 | 1 | 2 | 1 |
| 30s | 20 | 1 | 2 | 1 | 6 | 2 | 6 | 2 |
| 60s | 40 | 2 | 4 | 2 | 12 | 3 | 14 | 3 |

---

## Example output: 15s lipstick ad

**Command:** `/seedance2 15s 10shots dramatic for GH Stick lipstick`

```
[S1] A GH Stick lipstick tube in matte black with gold logo rests on white marble. A manicured hand reaches slowly into frame and uncaps it. Extreme close-up, slow dolly push-in. ARRI Alexa color science, motivated lighting, single hard shadow on marble. Soft metallic click of cap, silence. 4K, Ultra HD, Rich details, Sharp clarity, Cinematic texture, Natural colors, Stable picture.

[S2] A Vietnamese woman in her mid-20s sits at a minimal vanity, Shade 01 Nude Blush in hand. She glides the bullet slowly across the back of her hand. Medium shot tilting down to the wrist swatch, static locked-off frame. Warm amber light, glass-skin finish, ARRI Alexa color science. Soft voice: "Shade 01 — cho ngày muốn nhẹ nhàng nhất." 4K, Ultra HD, Rich details, Sharp clarity, Cinematic texture, Natural colors, Stable picture.
```

*(10 shots total, < 4000 characters)*

---

## How to use it

### With OpenClaw
Install the skill, then type:
```
/seedance2 15s 10shots dramatic for [your product]
```

### Without OpenClaw
Use the 6-block paragraph format manually. Every shot = one paragraph:
> *[Who + what + where] [ONE verb] [camera framing + ONE movement] [film stock + lighting pair] [audio] [4K, Ultra HD, Rich details, Sharp clarity, Cinematic texture, Natural colors, Stable picture.]*

---

## Access Seedance 2.0 right now

Two ways:
1. Download **CapCut**, set VPN to **Indonesia** → full Seedance 2.0 access inside the app, no waitlist
2. Direct Seedance API (apply separately)

CapCut + Indonesian VPN = immediate access. That's it.

---

## Credit

This skill would not exist without **Amir D (@starks_arq)** and his team's months of deep testing inside Seedance 2.0. The complete technical playbook is free on X:

👉 [https://x.com/starks_arq/status/2037928570257903983](https://x.com/starks_arq/status/2037928570257903983)

Follow Amir — if you're serious about AI video, his work is required reading.

The `/seedance2` skill packages his framework into a reusable command with added narrative arc structure, style modifier system, and character consistency paths.

---

*Built by Tuan Doan · [mrtuandoan-blog.vercel.app](https://mrtuandoan-blog.vercel.app)*
