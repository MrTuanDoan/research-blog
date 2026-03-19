# COT: Implementation Plan — OpenClaw Voice Message In / Voice Message Out

**Date:** 2026-03-19
**Question:** How to implement OpenClaw to receive a voice message and reply with a voice message?

---

## Step 1: Decompose the Problem

Two distinct pipelines:

```
INBOUND:  Voice message (audio) → Transcribe → Text → Claude → Response text
OUTBOUND: Response text → TTS → Audio file → Send as voice note
```

They are independent but must be chained. Both are supported natively by OpenClaw — this is a configuration + wiring task, not a custom development task.

---

## Step 2: Understand What Already Exists

### Inbound Voice (STT — Speech to Text)
OpenClaw receives audio files from channels (Telegram, WhatsApp, etc.). The question is whether it auto-transcribes or passes the raw audio to the model.

**What OpenClaw has:**
- `openai-whisper` skill — local Whisper CLI for STT, no API key needed
- OpenAI API can also transcribe via Whisper API (needs `OPENAI_API_KEY`)
- Telegram sends voice notes as `.ogg` (Opus codec) files

**What we need to check:**
- Does OpenClaw auto-transcribe inbound voice on Telegram?
- If not, does the model receive the audio file path and can call Whisper?

### Outbound Voice (TTS — Text to Speech)
**Fully built-in.** OpenClaw's TTS system supports:
- ElevenLabs (best quality, needs API key)
- OpenAI TTS (good quality, needs `OPENAI_API_KEY`)
- Edge TTS (free, no API key, uses Microsoft neural voices)

**Killer config found:**
```json
{ "messages": { "tts": { "auto": "inbound" } } }
```
→ OpenClaw automatically replies with audio ONLY when the inbound message was a voice note. This is exactly what we want.

---

## Step 3: Architecture Decision

### Option A: Full Native (OpenClaw built-ins only)
```
Telegram voice → OpenClaw gateway → [inbound audio → model sees audio path]
                                 → Claude transcribes or routes to Whisper skill
                                 → Claude replies text
                                 → TTS auto fires (auto: "inbound")
                                 → Telegram voice note reply ✅
```
**Effort:** Config only + Whisper skill setup
**Risk:** Unclear if gateway auto-handles inbound audio transcription

### Option B: Manual Whisper Integration (Explicit STT)
```
Telegram voice → OpenClaw gateway → agents.md rule: "if voice message received"
                                 → exec whisper on audio file path
                                 → text back to Claude
                                 → Claude replies text  
                                 → TTS auto fires (auto: "inbound")
                                 → Telegram voice note reply ✅
```
**Effort:** AGENTS.md rule + whisper CLI call
**Risk:** Requires knowing the inbound file path convention

### Decision: Option A first (2-step rollout)
1. Enable `auto: "inbound"` TTS → outbound voice works immediately
2. Test if inbound voice already transcribes automatically
3. If not → add Whisper rule to AGENTS.md

---

## Step 4: Implementation Plan (Step by Step)

### Phase 1: Outbound Voice Reply (30 minutes)

**Step 1: Configure TTS in openclaw.json**

Minimal config (uses Edge TTS free — no API key):
```json
{
  "messages": {
    "tts": {
      "auto": "inbound",
      "provider": "edge",
      "edge": {
        "enabled": true,
        "voice": "en-US-MichelleNeural",
        "lang": "en-US",
        "outputFormat": "audio-24khz-48kbitrate-mono-mp3"
      }
    }
  }
}
```

Or with OpenAI TTS (better quality, needs key):
```json
{
  "messages": {
    "tts": {
      "auto": "inbound",
      "provider": "openai",
      "openai": {
        "apiKey": "YOUR_OPENAI_API_KEY",
        "model": "gpt-4o-mini-tts",
        "voice": "alloy"
      }
    }
  }
}
```

**Step 2: Test**
Send a voice note to OpenClaw via Telegram → check if reply comes back as a voice bubble.

---

### Phase 2: Inbound Voice Transcription (1-2 hours)

**Step 3: Check if auto-transcription works**
Ask OpenClaw agent: "What did the voice message say?" after sending a voice note.

If yes → done. If no → proceed:

**Step 4: Add Whisper rule to AGENTS.md**

Add this rule to AGENTS.md:
```markdown
## Voice Message Handling

When you receive a message with an audio file attachment:
1. The file will be available at a local path (usually in ~/.openclaw/media/inbound/)
2. Run: `whisper {file_path} --model medium --output_format txt --output_dir /tmp/`
3. Read the .txt output file to get the transcription
4. Respond to the transcribed text as if it were a normal message
5. Do NOT mention that you transcribed it — just answer naturally
```

**Step 5: Install Whisper (if not installed)**
```bash
pip install openai-whisper
# or on Mac:
brew install openai-whisper
```

Test: `whisper --help`

---

### Phase 3: Vietnamese Voice Support (Optional, 30 min)

Since Tuan likely sends Vietnamese voice notes:

**Update Whisper command to specify language:**
```bash
whisper {file_path} --model medium --language vi --output_format txt --output_dir /tmp/
```

**Update Edge TTS voice to Vietnamese (if replying in Vietnamese):**
```json
{
  "edge": {
    "voice": "vi-VN-HoaiMyNeural",
    "lang": "vi-VN"
  }
}
```

Available Vietnamese voices:
- `vi-VN-HoaiMyNeural` (female, natural)
- `vi-VN-NamMinhNeural` (male)

---

## Step 5: Full Flow Summary

```
📱 Tuan sends voice note (Telegram)
        ↓
🌐 OpenClaw Gateway receives .ogg file
        ↓
🎙️ Whisper CLI transcribes audio → text
        ↓
🧠 Claude reads text → thinks → generates reply
        ↓
🔊 TTS (Edge/OpenAI) converts reply text → audio
        ↓
📱 Telegram receives voice note bubble (round)
```

---

## Step 6: Prioritized Action List

| Priority | Task | Time | Tool |
|----------|------|------|------|
| 1 | Add `auto: "inbound"` TTS config to openclaw.json | 5 min | Edit file |
| 2 | Test with a voice message → does reply come as audio? | 5 min | Telegram |
| 3 | Test if transcription auto-works | 5 min | Telegram |
| 4 | If not: add Whisper rule to AGENTS.md | 15 min | Edit file |
| 5 | Install Whisper if needed | 10 min | pip/brew |
| 6 | Vietnamese voice config (optional) | 10 min | Edit file |

**Total: ~1 hour for full two-way voice.**

---

## Key Insight

The outbound voice is essentially FREE and already built — just needs one config change (`auto: "inbound"`). The inbound voice transcription might already work natively. The entire system could be working in 10 minutes for the basic case.

The only uncertain part is whether OpenClaw's gateway automatically handles `.ogg` voice note transcription inbound. If yes, this is purely configuration. If no, Whisper fills that gap.

---

## Next Step: Ask OpenClaw to implement this

Tell your agent:
> "Read my COT at `cot-outputs/cot-20260319-voice-message-implementation.md` and implement Phase 1 and Phase 2."
