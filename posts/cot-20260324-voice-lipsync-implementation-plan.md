# AI Voice & Lip-Sync Functions — Summary & COT Implementation Plan

**Source:** https://youtu.be/UMwcZ0Kzb1o  
**Date:** 2026-03-24  
**Context:** Extracted functions for local skill implementation + integration with ai-influencer skill

---

## 📺 Video Summary

A platform demo showing a complete **audio-driven video character pipeline**. Key capabilities shown: voice cloning from reference audio, text-to-speech with cloned voice, lip-sync animation driven by audio, emotion control, and multi-language dubbing. The core promise: take any video character → clone their voice → make them say anything → animate their lips to match → output a new video clip.

---

## 🔧 EXTRACTED FUNCTIONS

### F1: Voice Clone
**What it does:** Extracts a voice profile from a short audio/video reference (10–30 seconds). Creates a reusable voice model.
**Input:** Reference audio or video clip (MP3/WAV/MP4)
**Output:** Voice model / voice ID (stored for reuse)
**Minimum reference:** ~10 seconds of clean speech
**Best results:** 30–60 seconds, single speaker, minimal background noise
**Local tools to replicate:** ElevenLabs Voice Clone API, Coqui TTS (XTTS-v2), OpenVoice v2

---

### F2: Text-to-Speech with Cloned Voice
**What it does:** Generates speech audio from any text using a cloned voice model
**Input:** Text script + voice model/ID
**Output:** Audio file (WAV/MP3) with the cloned voice speaking the text
**Controls:** Speed, pitch, emotion tone (neutral/excited/calm/sad)
**Local tools:** ElevenLabs TTS API, Coqui XTTS-v2, F5-TTS

---

### F3: Lip-Sync Animation (Audio → Video)
**What it does:** Takes a source video/image of a face + an audio file → animates the face's lips and facial muscles to match the audio
**Input:** Source video or image (face) + audio file
**Output:** Video with synchronized lip movement
**Quality factors:** Head pose angle (front-facing = best), lighting consistency, face resolution
**Local tools:** Wav2Lip, LatentSync, SadTalker, Hedra (API)

---

### F4: Emotion-Driven Expression Control
**What it does:** Modifies facial expression in video to match an emotional state while lip-syncing
**Input:** Audio file + emotion tag (happy/sad/angry/surprised/neutral) + source video
**Output:** Lip-synced video with matching facial expression
**Note:** Not all local tools support this — SadTalker has basic emotion control, Hedra API has richer support
**Local tools:** SadTalker (--expression_scale flag), Hedra API (emotion param)

---

### F5: Voice Style Transfer
**What it does:** Takes existing speech audio and re-renders it in a different voice style (accent, age, gender pitch-shift) while preserving the speech content
**Input:** Source audio + target voice style / reference
**Output:** Audio in new voice style
**Local tools:** OpenVoice v2 (tone color converter), RVC (Retrieval-based Voice Conversion)

---

### F6: Multi-Language Voice Dubbing
**What it does:** Translates speech from one language to another while preserving the original speaker's voice characteristics
**Input:** Source video/audio + target language
**Output:** Dubbed audio (and optionally lip-synced video) in target language with original voice
**Local tools:** SeamlessM4T (Meta, translation + TTS), Whisper (transcription) + XTTS-v2 (cross-lingual TTS)

---

### F7: Audio Enhancement / Cleanup
**What it does:** Removes background noise, normalizes levels, improves clarity of voice recordings before cloning or publishing
**Input:** Raw audio file
**Output:** Clean audio file
**Local tools:** DeepFilterNet, RNNoise, Adobe Podcast Enhance (API), ffmpeg (basic normalization)

---

### F8: Voice-to-Video Pipeline (Full Compose)
**What it does:** End-to-end: text script → cloned voice TTS → lip-sync animation → final output video
**Input:** Script text + voice reference + character image/video
**Output:** Complete talking-head video clip
**This is the INTEGRATION function** — combines F2 + F3 (+ F4 optional)

---

## 🧠 COT: Implementation Plan

### The Big Picture

We want: **AI Influencer can speak any content in their unique voice, perfectly lip-synced.**

Current ai-influencer skill covers: character design, image generation (NanoBanana), video motion (Higgsfield/Sora). It does NOT cover: voice identity, talking-head generation.

The gap to fill:

```
[Character Image] + [Voice Clone] + [Script] 
       ↓
[TTS with cloned voice] → [Audio file]
       ↓
[Lip-sync animation] → [Talking video]
       ↓
[Final: AI Influencer talks any content in their voice]
```

### Architecture Decision

**Two-tier approach:**

**Tier 1 — Cloud API (Fast, easy, best quality):**
- ElevenLabs: Voice clone + TTS (best quality, $5/mo starter)
- Hedra: Lip-sync + emotion (best talking-head quality, API available)
- Use this for: production output, client deliverables

**Tier 2 — Local/Free (No cost, more control, some quality tradeoff):**
- Coqui XTTS-v2: Voice clone + TTS (free, runs on GPU)
- Wav2Lip or LatentSync: Lip-sync (free, runs on GPU/CPU)
- Use this for: prototyping, testing, when API budget is tight

### Skills Architecture

```
skills/
├── ai-influencer/          ← EXISTS (character design + video generation)
│   └── SKILL.md
├── voice-clone/            ← NEW SKILL (F1 + F2 + F5 + F7)
│   ├── SKILL.md
│   └── scripts/
│       ├── clone-voice.py      ← ElevenLabs or XTTS-v2
│       ├── tts-generate.py     ← Generate speech from text
│       └── audio-enhance.py    ← DeepFilterNet cleanup
├── lip-sync/               ← NEW SKILL (F3 + F4 + F8)
│   ├── SKILL.md
│   └── scripts/
│       ├── lipsync.py          ← Wav2Lip / LatentSync
│       └── compose-pipeline.py ← Full end-to-end compose
└── voice-dubbing/          ← NEW SKILL (F6)
    ├── SKILL.md
    └── scripts/
        └── dub.py              ← SeamlessM4T + XTTS-v2
```

The **ai-influencer** skill gets updated with a new section: `## Voice & Talking-Head Integration` that calls voice-clone + lip-sync skills in sequence.

---

## 📋 PHASE 0: What You Need to Prepare

### 0.1 — API Keys (10 min)

| Service | Purpose | Cost | Get From |
|---------|---------|------|---------|
| **ElevenLabs** | Voice clone + TTS | Free: 10k chars/mo; Starter $5/mo: 30k chars | elevenlabs.io → Profile → API Key |
| **Hedra** | Lip-sync (talking head) | Free tier available | hedra.com → API access |
| *(Optional)* **Replicate** | Run Wav2Lip / LatentSync via cloud | Pay per run (~$0.01) | replicate.com |

Save all keys to `TOOLS.md` under `### Voice & Lip-Sync`.

### 0.2 — Local Environment (if running locally)

**Python environment:**
```powershell
# Python 3.11 (already installed at D:\Programs\Python3.11\)
& "D:\Programs\Python3.11\python.exe" -m pip install elevenlabs requests pydub
```

**For local voice clone (Coqui XTTS-v2) — needs GPU:**
```bash
pip install TTS  # Coqui TTS
# Requires: CUDA-capable GPU (4GB+ VRAM) or runs very slowly on CPU
```

**For local lip-sync (Wav2Lip):**
```bash
git clone https://github.com/Rudrabha/Wav2Lip
pip install -r requirements.txt
# Requires: CUDA GPU recommended (can run CPU but slow)
```

**Check your GPU:**
```powershell
nvidia-smi  # if NVIDIA GPU present
```

### 0.3 — Voice Reference Assets

For each AI influencer character, collect:
- [ ] **30–60 seconds of clean speech** — the reference audio for voice cloning
- [ ] Options: record yourself speaking as the character, use a TTS output as seed, or use any clean audio
- [ ] Save to: `ai-influencer/characters/[name]/voice-reference.mp3`
- [ ] Format: MP3 or WAV, 44100Hz, mono or stereo, no music/background noise

### 0.4 — Character Image/Video Assets

For lip-sync, you need a **static character face image OR short looping video**:
- [ ] **Image:** High-res front-facing character image (from NanoBanana or similar) — 512×512 minimum, 1024×1024 preferred
- [ ] **Video (better):** 2–5 second neutral expression loop (slight idle movement) — gives more natural lip-sync results
- [ ] Face must be: front-facing (±30° max), well-lit, clear of occlusions (hair over mouth = bad)
- [ ] Save to: `ai-influencer/characters/[name]/reference-face.jpg` or `.mp4`

### 0.5 — Test Script

Write a 10-second test script (30–50 words) to validate the pipeline end-to-end:
```
"Hey everyone, I'm [character name]. Today I want to talk about something 
that changed how I think about creativity. Stay with me — this is going to 
be worth your time."
```
Save to: `ai-influencer/characters/[name]/test-script.txt`

### 0.6 — Directory Structure Setup

```powershell
# Run once to scaffold
New-Item -ItemType Directory -Force -Path "D:\_Tuan_AI\_2026\_code\TuanDoan_Workspace\skills\voice-clone\scripts"
New-Item -ItemType Directory -Force -Path "D:\_Tuan_AI\_2026\_code\TuanDoan_Workspace\skills\lip-sync\scripts"
New-Item -ItemType Directory -Force -Path "D:\_Tuan_AI\_2026\_code\TuanDoan_Workspace\ai-influencer\characters"
```

---

## 🗺️ PHASES OVERVIEW (After Phase 0)

| Phase | What | Output |
|-------|------|--------|
| **0** | Prepare APIs, assets, environment | Keys, voice refs, face refs |
| **1** | Build voice-clone skill (ElevenLabs) | Script → voice audio in character's voice |
| **2** | Build lip-sync skill (Hedra API) | Audio + face → talking video |
| **3** | Build compose pipeline | Script → final talking-head video (1 command) |
| **4** | Integrate into ai-influencer skill | AI influencer can speak any content end-to-end |
| **5** | Local fallback (Coqui + Wav2Lip) | Same pipeline, no API cost |

---

## ✅ Phase 0 Checklist

```
[ ] ElevenLabs API key saved to TOOLS.md
[ ] Hedra API key saved to TOOLS.md
[ ] Python 3.11 + elevenlabs package installed
[ ] 30-60s voice reference audio collected per character
[ ] Front-facing character face image (1024x1024) ready
[ ] Test script (30-50 words) written
[ ] Directory structure created
[ ] GPU check: nvidia-smi → note VRAM (determines if local models viable)
```

Once Phase 0 is complete → say "ready for Phase 1" → I'll build voice-clone skill with working scripts.

---

*COT Output — Antigravity | 2026-03-24*
