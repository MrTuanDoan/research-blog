# COT: DNA Analysis — Miko's Seedance 2.0 Full Guide
# Question: What is the core DNA of Miko's Seedance 2.0 system, and what are the highest-leverage principles to extract?
# Date: 2026-04-12 | Model: Opus
# Source: Miko @Mho_23 — Seedance 2.0 Full Step-By-Step Guide + Advanced Techniques

---

## STEP 1: What is the actual DNA of this guide?

Strip away the platform specifics. What is the underlying mechanic?

**Surface level:** How to use Seedance 2.0 on Higgsfield with omni-reference inputs.

**DNA level:** A **multi-input orchestration system** where every asset (image, video, audio) becomes a specific creative instruction, combined with timestamp-precision prompting and infinite extension chaining.

The core insight: **Stop prompting, start directing.** Every input file = a reference for something specific. You're not hoping the model interprets your text — you're giving it a film brief with attached assets and timestamp-by-timestamp shot direction.

---

## STEP 2: What are the structural innovations vs. what we already know?

### What's NEW in Miko's guide (vs. Knox + Amir):

**1. Omni-reference @ system (Higgsfield-specific)**
- Files get labeled @Image1, @Image2, @Video1, @Audio1
- Each is referenced directly in prompt for a specific purpose
- Not just "start frame" — each asset plays a different role simultaneously
- Example: @Image1 = character, @Image2 = product appearance, @Audio1 = voice ID

**2. Voice ID reference method**
- Find a real person's video with the voice quality you want
- Extract audio → upload to Higgsfield as @Audio1
- Prompt: "use this audio as voice ID reference. do not make her say the words in the audio, just use it as a voice ID."
- Result: Copies the voice character/tone, generates your custom dialogue in that voice
- This is more realistic than generated audio from scratch

**3. Timestamp method (precision prompting)**
- Break every video into 4–5 second chunks
- Specify: dialogue + exact visuals for each chunk
- Structure: `"0-4 seconds: [action]. dialogue: '[exact words]'. visuals: [exact physical description]"`
- The model follows to the literal last sentence

**4. Extension workflow (not stitching)**
- Generate first 15 seconds
- Upload back as @Video1
- Prompt: "extend this video. keep the voice the same as the original clip."
- Model maintains: same character, same voice, same environment
- Chain 3 extensions = 45–60 second video
- NOT stitching random clips → extending the SAME video

**5. Canva character limit bypass**
- Seedance has 2000 char limit per prompt
- Write full detailed prompt as text in a Canva image
- Upload to Higgsfield as reference
- Prompt: "transcribe this image and use the movements described here"
- Effectively unlimited prompt length

**6. ByteDance-trained editing intelligence**
- Seedance trained by TikTok makers — already knows short-form pacing
- Adds cuts, transitions, movement without being asked
- You can specify: "jump cut at X moment", "zoom in when product revealed"
- 95% of editing done by model — post-production = arrange clips + captions only

**7. JSON prompts for starting images**
- Find real TikTok content in your niche
- Screenshot a frame → put in Claude/Gemini → ask for JSON prompt to recreate
- Adjust character details (different clothes, background)
- Starting frames already match what performs in that niche

---

## STEP 3: Compare to our existing stack

| Miko's System | Our Status | Gap |
|---|---|---|
| @ reference system (Higgsfield) | ❌ Not using Higgsfield | 🔴 Need to access Higgsfield |
| Voice ID reference method | ❌ Using ElevenLabs/Chatterbox only | 🟡 Major quality upgrade available |
| Timestamp method | ⚠️ We have segment chaining, not timestamps | 🔴 Different level of precision |
| Extension workflow | ⚠️ We chain via last frame — similar but less seamless | 🟡 Higgsfield native extension is better |
| Canva bypass | ❌ Not using | 🟡 Simple hack for long prompts |
| JSON prompts for starting images | ⚠️ We use direct prompts — not JSON method | 🟡 Quality improvement |
| ByteDance editing intelligence | ❌ We use Remotion for assembly | 🟡 Could reduce post-production work |
| TikTok reference → JSON workflow | ❌ Not formalized | 🟡 Content-market fit shortcut |

**Biggest gap: Higgsfield omni-reference system.** This is the unlocking mechanism. Without it, Seedance 2.0's multi-input capability is inaccessible.

---

## STEP 4: What are the core principles to extract?

### Principle 1: Every asset plays a specific role
Don't just have a "start frame." Have:
- @Image1 = character/scene (starting frame)
- @Image2 = product appearance reference
- @Audio1 = voice ID reference
- @Video1 = previous clip to extend

Each asset = one specific creative instruction. Not a general reference pool.

### Principle 2: Timestamp precision = literal execution
The model executes what you write literally. This is a feature, not a limitation.
Structure: `"{start}–{end} seconds: {section name}. dialogue: '{exact words}'. visuals: {exact physical actions + object details}"`

Don't leave anything to interpretation. Ambiguity = random generation.

### Principle 3: Voice ID > voice generation
Real human voice extracted → uploaded as reference → more realistic than anything generated.
The model replicates vocal character/tone without copying the words.

### Principle 4: Extend, don't restart
Every new clip should extend an existing one, not be generated fresh.
Extension preserves: character, voice, environment, visual style.
3 extensions × 15 seconds = 45-second video with full continuity.

### Principle 5: TikTok reference → JSON → starting frame
Find what already performs in your niche → screenshot best frame → ask AI for JSON recreation prompt → adjust for your character.
This shortcuts market research into starting frame quality.

### Principle 6: Trust the model's editing intelligence
Don't micromanage cuts and transitions unless you have a specific vision.
Seedance was trained by TikTok — it knows native short-form editing.
Only specify edits when you want something different from the default.

### Principle 7: Canva bypass for prompt length
Any time you're hitting the 2000 char limit: Canva image → upload → "transcribe and follow this."
Effectively unlimited prompt depth.

---

## STEP 5: What is the complete mental model?

**Old model (most AI video users):**
Text prompt → generate → hope → stitch → edit

**Miko's model (actual directing):**
```
ASSETS: character image + product image + voice reference + previous clip
    ↓
@ SYSTEM: assign each asset a specific role
    ↓
TIMESTAMP BRIEF: break into 4–5s chunks, specify dialogue + visuals for each
    ↓
GENERATE: model executes literally, adds native editing
    ↓
EXTEND: use output as @Video1 → extend → maintain continuity
    ↓
POST: arrange 3–5 clips + captions = done
```

The shift: from "prompting" (hoping the model interprets well) to "directing" (giving it a shot list with attached assets).

---

## STEP 6: Integration with existing skills

### What to upgrade immediately:
1. **All video prompts** → add timestamp structure (0-4s, 5-12s, etc.)
2. **Voice pipeline** → add Voice ID reference method alongside Chatterbox
3. **ad-creative JSON output** → add `timestamps` array to config schema
4. **Starting image generation** → add TikTok reference → JSON workflow
5. **Knox RUNBOOK** → add Higgsfield as primary Seedance platform
6. **Canva bypass** → add to RUNBOOK as standard for long prompts

### New to build:
1. **Higgsfield omni-reference workflow** (new section in RUNBOOK)
2. **Voice ID extractor** — ffmpeg command to extract audio from reference video
3. **Timestamp prompt generator** — given script + duration → outputs timestamped prompt
4. **Extension chain tracker** — track @Video references across a campaign

---

## CONCLUSIONS

### The 7 DNA Principles

| # | Principle | Leverage | Where to Apply |
|---|---|---|---|
| 1 | Every asset plays a specific role (@system) | 🔴 Highest | All Higgsfield workflows |
| 2 | Timestamp precision = literal execution | 🔴 Highest | All video prompt templates |
| 3 | Voice ID > voice generation | 🔴 High | Voice pipeline |
| 4 | Extend, don't restart | 🟡 High | RUNBOOK extension workflow |
| 5 | TikTok reference → JSON → starting frame | 🟡 High | Image generation workflow |
| 6 | Trust model's editing intelligence | 🟡 Medium | Prompt writing guidelines |
| 7 | Canva bypass for prompt length | 🟢 Utility | Long prompt situations |

### Biggest unlock: Higgsfield access
The entire @ reference system requires Higgsfield. It's available globally, no waitlist.
This should be the primary Seedance 2.0 platform, not fal.ai for Seedance specifically.

### The meta-shift
Knox taught us: config → MP4 via code pipeline
Amir taught us: iterate cheap, let data pick
Miko teaches us: direct precisely, extend seamlessly, use real references not generated ones

Combined: **a system that generates fast (Amir), directs precisely (Miko), and assembles automatically (Knox).**
