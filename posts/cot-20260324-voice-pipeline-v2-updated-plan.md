# COT: AI Influencer Voice Pipeline — Updated Implementation Plan

**Date:** 2026-03-24  
**Status:** Planning v2 — Tool stack confirmed, skills designed, interaction flow mapped

---

## 🔧 Tool Stack (Confirmed)

| Layer | Tool | Role |
|-------|------|------|
| Voice Design | ElevenLabs Voice Design API | Create voice from text description → 3 variants → user picks |
| Text-to-Speech | ElevenLabs TTS API | Convert script to audio using confirmed voice |
| Emotion in Speech | ElevenLabs Emotion Prompting | SSML-style tags + prompt engineering for emotional delivery |
| Lip-Sync Option A | Hedra API | Talking-head: audio + face image → video |
| Lip-Sync Option B | LTX Video 2.3 | Audio-conditioned video generation → richer motion |

---

## ⚔️ Hedra vs LTX Video 2.3 — Comparison

### Hedra
- **Type:** Dedicated talking-head API
- **Input:** Face image (or short video) + audio file
- **Output:** Lip-synced talking-head video
- **Strength:** Extremely accurate lip sync, face stays consistent, purpose-built for this use case
- **Weakness:** Motion is minimal — head barely moves, feels like an avatar rather than a real person; limited expression range
- **API:** Yes — REST API, async job-based
- **Cost:** Free tier available; paid per minute of generated video
- **Best for:** Clean, consistent AI influencer talking-heads; social media face-cam style

### LTX Video 2.3
- **Type:** General-purpose video generation model with audio conditioning
- **Input:** Text prompt + reference image/video + audio track
- **Output:** Full video conditioned on both visual AND audio cues
- **Strength:** Full body motion, environment movement, dynamic camera, much more "alive" feel; audio drives the entire scene not just lips
- **Weakness:** Less precise lip accuracy than Hedra; more variable output; requires prompt engineering; slower generation
- **API:** Via Replicate or fal.ai (open model weights also available)
- **Cost:** ~$0.05–0.15 per run on Replicate
- **Best for:** Dynamic scenes where character moves, gestures, walks; cinematic style content

### Recommendation: Use Both (Different Use Cases)

| Use Case | Tool |
|----------|------|
| Face-cam content, interviews, commentary | **Hedra** — accurate lips, consistent identity |
| Dynamic scenes, storytelling, full motion | **LTX 2.3** — cinematic, alive, expressive |
| Quick TikTok/Reels talking-head | **Hedra** |
| Narrative video, B-roll with character | **LTX 2.3** |

---

## 🏗️ SKILLS ARCHITECTURE (Updated)

```
skills/
├── ai-influencer/              ← EXISTS — character design + visual
│   └── SKILL.md                ← ADD: voice + lipsync integration section
│
├── voice-design/               ← NEW SKILL
│   ├── SKILL.md
│   └── scripts/
│       ├── design-voice.py     ← ElevenLabs Voice Design API → 3 variants
│       ├── preview-voices.py   ← Generate preview audio for each variant
│       └── confirm-voice.py    ← Save confirmed voice_id to character profile
│
├── tts-emotion/                ← NEW SKILL
│   ├── SKILL.md
│   └── scripts/
│       ├── generate-speech.py  ← ElevenLabs TTS with emotion prompting
│       └── emotion-prompts.md  ← Library of proven emotion prompt patterns
│
├── lip-sync/                   ← NEW SKILL
│   ├── SKILL.md
│   └── scripts/
│       ├── hedra-lipsync.py    ← Hedra API: face + audio → talking video
│       └── ltx-lipsync.py      ← LTX 2.3 via Replicate: audio-conditioned video
│
└── ai-influencer-voice/        ← NEW SKILL (orchestrator — ties everything together)
    └── SKILL.md                ← Calls voice-design + tts-emotion + lip-sync in sequence
```

---

## 🔄 FULL INTERACTION FLOW

### Flow 1: Voice Design (One-time per character)

```
User: "Design a voice for [character name]"
  ↓
AI reads character profile (from ai-influencer skill)
  ↓
AI writes 3 voice description prompts based on character personality
  ↓
ElevenLabs Voice Design API → generates 3 voice variants
  ↓
For each variant: generate 10-second preview audio ("Hello, I'm [name]...")
  ↓
Send to Telegram: 3 audio files + brief description of each voice
  ↓
Wait for user reply: "1", "2", or "3" (or "none — try again")
  ↓
User picks → confirm voice_id saved to character profile
  ↓
Character profile now has: visual identity + voice identity ✅
```

### Flow 2: Content Generation (Per video)

```
User provides: script / topic + character name + emotion
  ↓
[tts-emotion skill]: 
  Script → emotion prompt engineering → ElevenLabs TTS → audio.mp3
  ↓
[lip-sync skill]:
  User choice: "talking-head" → Hedra | "dynamic scene" → LTX 2.3
  Audio + character face/video → lip-synced video
  ↓
Final video sent to Telegram
```

---

## 📋 PHASE 0: Preparation Checklist (Updated)

### 0.1 — API Keys
```
[ ] ElevenLabs API key
    → elevenlabs.io → My Account → API Keys → Create
    → Save to TOOLS.md under ### ElevenLabs

[ ] Hedra API key
    → hedra.com → sign up → API section
    → Save to TOOLS.md under ### Hedra

[ ] Replicate API token (for LTX 2.3)
    → replicate.com → Account → API Tokens
    → Save to TOOLS.md under ### Replicate
```

### 0.2 — Python Dependencies
```powershell
& "D:\Programs\Python3.11\python.exe" -m pip install `
    elevenlabs `
    requests `
    pydub `
    replicate `
    python-dotenv
```

### 0.3 — Character Profile Structure

For each AI influencer character, create:
```
ai-influencer/characters/[character-name]/
├── profile.json           ← identity, personality, voice_id (filled after voice design)
├── reference-face.jpg     ← 1024x1024, front-facing, clean background
├── reference-face.mp4     ← optional: 2-5s idle loop (better lip-sync results)
├── voice-design-prompt.md ← 3 voice description attempts
└── voice-preview/
    ├── variant-1.mp3
    ├── variant-2.mp3
    └── variant-3.mp3
```

**profile.json template:**
```json
{
  "name": "Character Name",
  "age_range": "mid-20s",
  "personality": ["energetic", "witty", "direct"],
  "content_niche": "tech / lifestyle / finance",
  "voice_id": null,
  "voice_description": null,
  "face_image": "reference-face.jpg",
  "face_video": null
}
```

### 0.4 — ElevenLabs Voice Design Understanding

ElevenLabs Voice Design works like this:
```
POST /v1/voice-generation/generate-voice
{
  "text": "A 25-year-old American woman with a warm, 
           confident voice. Slightly husky. Speaks with 
           natural pacing and occasional enthusiasm.",
  "gender": "female",
  "age": "young",
  "accent": "american",
  "accent_strength": 0.8
}
→ Returns: audio bytes (preview of generated voice)
→ Then: POST /v1/voice-generation/create-voice to save it
→ Returns: voice_id (use for all future TTS)
```

Generate 3 variants by calling with slightly different descriptions.

### 0.5 — ElevenLabs Emotion Prompting Understanding

ElevenLabs doesn't use SSML for emotions — it uses **text prompt engineering**:

```python
# Instead of:
"Here is your product demo."

# Use:
"[excited, upbeat, like you just discovered something amazing] 
Here is your product demo."

# Or wrap with emotion context:
"*speaking with warm enthusiasm, like talking to a close friend* 
Here is your product demo."
```

The `emotion-prompts.md` library will hold proven patterns per emotion type.

### 0.6 — Telegram Bot Setup

The voice preview → Telegram → wait for decision flow requires:
```
[ ] OpenClaw Telegram bot already configured (✅ already set up)
[ ] Confirm: can send audio files via message tool (action=send + buffer/media)
[ ] Test: send a small MP3 to yourself via message tool
```

### 0.7 — Character Face Assets

Requirements for lip-sync:
```
For Hedra:
[ ] Front-facing portrait, ±30° max angle
[ ] Clean or simple background (no busy patterns)
[ ] Face clearly visible, no hair over mouth
[ ] Min 512×512, recommended 1024×1024
[ ] Format: JPG or PNG

For LTX 2.3:
[ ] Can use same image OR a short video loop (2-5 seconds)
[ ] Video gives more natural motion baseline
[ ] Face should be neutral expression (LTX adds motion on top)
```

---

## 📐 SKILLS DESIGN BRIEFS

### Skill 1: `voice-design`

**Purpose:** Create a unique voice for an AI influencer character using ElevenLabs Voice Design  
**Input:** Character profile (name, personality, age, niche)  
**Process:**
1. Read character profile
2. Generate 3 voice description prompts (each emphasizing different aspect of character)
3. Call ElevenLabs Voice Design API × 3
4. Generate 10s preview audio for each ("Hi, I'm [name]. Let me tell you about...")
5. Send 3 audio previews + descriptions to Telegram
6. Wait for user reply (1/2/3 or "retry")
7. If retry → regenerate with modified prompts
8. On confirmation → call create-voice API → save voice_id to profile.json

**Output:** voice_id saved to character profile

---

### Skill 2: `tts-emotion`

**Purpose:** Generate speech audio from script with specific emotional delivery  
**Input:** Script text + character name + emotion tag  
**Emotion tags:** excited | warm | sad | urgent | mysterious | playful | authoritative | conversational  
**Process:**
1. Load voice_id from character profile
2. Apply emotion prompt wrapper from emotion-prompts.md library
3. Call ElevenLabs TTS API
4. Return audio file (WAV/MP3)

**Key feature:** Emotion prompts are a growing library — every good result gets saved back

---

### Skill 3: `lip-sync`

**Purpose:** Animate character face to match audio  
**Input:** Audio file + character name + mode (talking-head | dynamic)  
**Process:**
- **talking-head mode (Hedra):** POST to Hedra API → poll until complete → download video
- **dynamic mode (LTX 2.3):** POST to Replicate fal.ai → poll → download video  
**Output:** MP4 video file

---

### Skill 4: `ai-influencer-voice` (Orchestrator)

**Purpose:** End-to-end: character + script + emotion → final talking video  
**Input:** Character name + script + emotion + output_mode  
**Process:** Calls voice-design (if no voice_id) → tts-emotion → lip-sync → delivers video  
**Output:** Final MP4 + sends to Telegram

---

## 🗓️ PHASES (Updated)

| Phase | Skill | Key Deliverable |
|-------|-------|----------------|
| **0** | Prep | APIs, assets, deps, directory structure |
| **1** | `voice-design` | Voice Design API → 3 previews → Telegram → user picks |
| **2** | `tts-emotion` | Script + emotion → ElevenLabs TTS → audio |
| **3** | `lip-sync` | Hedra: face + audio → talking video |
| **4** | `lip-sync` | LTX 2.3: audio-conditioned dynamic video |
| **5** | `ai-influencer-voice` | Full pipeline in one command |
| **6** | Integration | Update `ai-influencer` skill to call this pipeline |

---

*COT v2 — Antigravity | 2026-03-24*
