# COT: Realistic Longform AI Video Workflow + OpenClaw Skill

**Question:** Build a complete workflow and OpenClaw skill for creating realistic longform AI videos  
**Date:** 2026-02-23  
**Use Cases:** Paid ads, organic content, AI influencers

---

## 1. Workflow Analysis

### Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                 LONGFORM AI VIDEO PIPELINE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  STEP 1           STEP 2           STEP 3           STEP 4          │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐      │
│  │ STARTING │───▶│  SCRIPT  │───▶│  AUDIO   │───▶│  VIDEO   │      │
│  │  IMAGE   │    │          │    │  (TTS)   │    │          │      │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘      │
│       │               │               │               │             │
│       ▼               ▼               ▼               ▼             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐      │
│  │ Nano     │    │ Claude/  │    │ElevenLabs│    │ HeyGen   │      │
│  │ Banana   │    │ Kimi K2  │    │ MiniMax  │    │ VEED     │      │
│  │ Pro      │    │          │    │ Qwen3-TTS│    │ InfTalk  │      │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Tool Matrix

| Step | Tool | Price | Quality | Best For |
|------|------|-------|---------|----------|
| **Image** | Nano Banana Pro | ~$3/image | Excellent | Realistic portraits |
| **Script** | Claude/Kimi K2 | API costs | Excellent | Natural dialogue |
| **Audio** | ElevenLabs | $22/mo+ | Best | Pro quality |
| **Audio** | MiniMax | $5/mo | Great | Budget option |
| **Audio** | Qwen3-TTS | Free | Good | Open source |
| **Video** | HeyGen Avatar 4 | $24/mo+ | Best | All-around |
| **Video** | VEED Fabric 1.0 | Higher | Premium | High quality |
| **Video** | InfiniteTalk | Free | Decent | Open source |

---

## 2. Detailed Workflow

### Step 1: Create Starting Image

**Tool:** Nano Banana Pro (or Midjourney, DALL-E 3, Flux)

**Key Techniques:**
```json
{
  "prompt": "Professional headshot of a 30-year-old woman with natural lighting, warm skin tones, genuine smile, looking at camera, corporate office background, soft bokeh",
  "style": {
    "color_grading": "warm cinematic",
    "avoid": "grey scale, flat lighting, AI artifacts"
  },
  "quality_checks": [
    "No distorted hands/fingers",
    "Natural skin texture",
    "Consistent lighting",
    "Realistic eye reflections"
  ]
}
```

**Pro Tips:**
- Use JSON prompts for consistent color grading
- Avoid standard greyscale look (add "warm tones", "golden hour", etc.)
- Generate multiple variants, pick the best
- Upscale to 1024x1024+ for video

### Step 2: Generate Script

**Tools:** Claude Sonnet/Opus, Kimi K2

**Prompt Template:**
```markdown
Write a script for a [30-60 second] video about [TOPIC].

Requirements:
- Sound like a real person talking to a friend
- Use conversational language, not corporate speak
- Include natural pauses, filler words where appropriate
- Start with a hook that grabs attention in first 3 seconds
- End with clear CTA

Tone: [casual/professional/energetic/calm]
Audience: [target demographic]

Output format:
- Main script (what they say)
- Timing markers
- Emphasis notes for TTS
```

**Quality Checklist:**
- [ ] No robotic phrases ("I am here to help you...")
- [ ] Natural contractions (don't, can't, it's)
- [ ] Conversational rhythm
- [ ] Clear structure: Hook → Value → CTA

### Step 3: Generate Audio (TTS)

**Option A: ElevenLabs (Best Quality)**

```python
# elevenlabs_tts.py
import requests
import os

def generate_audio_elevenlabs(
    text: str,
    voice_id: str,  # Use custom voice, not presets
    output_path: str,
    stability: float = 0.5,
    similarity_boost: float = 0.75
) -> str:
    """
    Generate audio using ElevenLabs API
    
    Best practices:
    - DON'T use pre-made voices
    - Use Voice Design or Instant Voice Clone
    - Upload 10-30 second audio clip for clone
    """
    
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    
    headers = {
        "xi-api-key": os.getenv("ELEVENLABS_API_KEY"),
        "Content-Type": "application/json"
    }
    
    data = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": stability,
            "similarity_boost": similarity_boost,
            "style": 0.5,
            "use_speaker_boost": True
        }
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    with open(output_path, 'wb') as f:
        f.write(response.content)
    
    return output_path
```

**Option B: MiniMax ($5/mo, 120 minutes)**

```python
# minimax_tts.py
import requests

def generate_audio_minimax(
    text: str,
    voice_id: str = None,  # Optional: use voice clone
    output_path: str = "output.mp3"
) -> str:
    """
    MiniMax TTS - easiest to use
    
    Best practices:
    - Default output is already good
    - Voice clone works with just 10 second clip
    """
    
    url = "https://api.minimax.chat/v1/text_to_speech"
    
    headers = {
        "Authorization": f"Bearer {os.getenv('MINIMAX_API_KEY')}",
        "Content-Type": "application/json"
    }
    
    data = {
        "text": text,
        "voice_setting": {
            "voice_id": voice_id or "default_female",
            "speed": 1.0,
            "vol": 1.0,
            "pitch": 0
        }
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    with open(output_path, 'wb') as f:
        f.write(response.content)
    
    return output_path
```

**Option C: Qwen3-TTS (Open Source)**

```python
# qwen3_tts.py
# Requires local setup with GPU

from qwen_tts import QwenTTS

def generate_audio_qwen(
    text: str,
    reference_audio: str,  # 10-30 second clip
    output_path: str
) -> str:
    """
    Qwen3-TTS - solid open source alternative
    """
    
    model = QwenTTS.from_pretrained("Qwen/Qwen2-Audio-7B")
    
    audio = model.synthesize(
        text=text,
        reference_audio=reference_audio,
        temperature=0.7
    )
    
    audio.save(output_path)
    return output_path
```

### Step 4: Generate Video

**Option A: HeyGen Avatar 4 (Best All-Around)**

```python
# heygen_video.py
import requests
import time

def generate_video_heygen(
    avatar_id: str,
    audio_url: str,  # URL to audio file
    background: str = "office",
    output_path: str = "output.mp4"
) -> str:
    """
    HeyGen Avatar 4 - best all-around model
    """
    
    # Create video
    create_url = "https://api.heygen.com/v2/video/generate"
    
    headers = {
        "X-Api-Key": os.getenv("HEYGEN_API_KEY"),
        "Content-Type": "application/json"
    }
    
    data = {
        "video_inputs": [{
            "character": {
                "type": "avatar",
                "avatar_id": avatar_id
            },
            "voice": {
                "type": "audio",
                "audio_url": audio_url
            },
            "background": {
                "type": background
            }
        }],
        "dimension": {"width": 1920, "height": 1080}
    }
    
    response = requests.post(create_url, headers=headers, json=data)
    video_id = response.json()["data"]["video_id"]
    
    # Poll for completion
    status_url = f"https://api.heygen.com/v1/video_status.get?video_id={video_id}"
    
    while True:
        status = requests.get(status_url, headers=headers).json()
        if status["data"]["status"] == "completed":
            video_url = status["data"]["video_url"]
            break
        time.sleep(10)
    
    # Download video
    video_response = requests.get(video_url)
    with open(output_path, 'wb') as f:
        f.write(video_response.content)
    
    return output_path
```

**Option B: VEED Fabric 1.0 (Higher Quality)**

```python
# veed_video.py
# Similar API structure, higher cost but better quality
```

**Option C: InfiniteTalk (Open Source)**

```python
# infinitetalk_video.py
# Local setup required, decent quality
from infinite_talk import InfiniteTalk

def generate_video_infinitetalk(
    image_path: str,
    audio_path: str,
    output_path: str
) -> str:
    """
    InfiniteTalk - open source voice-to-video
    """
    
    model = InfiniteTalk.load_model()
    
    video = model.generate(
        source_image=image_path,
        driving_audio=audio_path,
        result_dir="outputs/"
    )
    
    return video.path
```

---

## 3. OpenClaw Skill: ai-video-creator

### Skill Structure

```
skills/
└── ai-video-creator/
    ├── SKILL.md
    ├── scripts/
    │   ├── image_generator.py
    │   ├── script_generator.py
    │   ├── tts_generator.py
    │   └── video_generator.py
    ├── templates/
    │   ├── script_prompts/
    │   │   ├── ad_script.md
    │   │   ├── organic_content.md
    │   │   └── ai_influencer.md
    │   └── image_prompts/
    │       ├── professional.json
    │       ├── casual.json
    │       └── lifestyle.json
    └── examples/
        └── sample_output/
```

### SKILL.md

```markdown
# AI Video Creator Skill

## Description

Create realistic longform AI videos (30s+) for paid ads, organic content, and AI influencers. Full pipeline: Starting Image → Script → Audio → Video.

## Trigger

When user requests:
- "Create AI video about [topic]"
- "Generate talking head video"
- "Make AI influencer content"
- `/ai-video [topic]`

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `topic` | ✅ | Video topic/message |
| `duration` | ❌ | Target length (default: 30-60s) |
| `style` | ❌ | casual/professional/energetic |
| `avatar_type` | ❌ | male/female/custom |
| `tts_provider` | ❌ | elevenlabs/minimax/qwen |
| `video_provider` | ❌ | heygen/veed/infinitetalk |

## Workflow

```
1. GENERATE starting image
   - Use Nano Banana Pro or DALL-E
   - Apply color grading (warm, cinematic)
   - Quality check: realistic, no artifacts

2. WRITE script
   - Use Claude/Kimi K2
   - Conversational tone
   - Hook → Value → CTA structure

3. GENERATE audio
   - Use selected TTS provider
   - Custom voice (not presets)
   - Natural pacing

4. CREATE video
   - Use selected video provider
   - Lip sync with audio
   - Background matching style

5. OUTPUT
   - Save to outputs/videos/
   - Include all assets (image, script, audio, video)
```

## Quality Gates

### Image
- [ ] No distorted features
- [ ] Natural lighting
- [ ] Warm color grading (not grey)
- [ ] 1024x1024+ resolution

### Script
- [ ] Sounds human, not robotic
- [ ] Natural contractions
- [ ] Clear hook in first 3 seconds
- [ ] Under 150 words for 60s

### Audio
- [ ] No robotic artifacts
- [ ] Natural pacing
- [ ] Clear pronunciation
- [ ] Appropriate emotion

### Video
- [ ] Accurate lip sync
- [ ] Natural head movement
- [ ] No visual glitches
- [ ] Smooth transitions

## Example Usage

```
User: Create a 45-second AI video promoting my SaaS product
      Style: professional but approachable
      Topic: How our app saves 10 hours per week

AI: Starting AI video creation pipeline...

    Step 1/4: Generating starting image...
    ✅ Image created: professional female, office background
    
    Step 2/4: Writing script...
    ✅ Script: 142 words, ~45 seconds
    
    Step 3/4: Generating audio (ElevenLabs)...
    ✅ Audio: 47 seconds, natural voice
    
    Step 4/4: Creating video (HeyGen)...
    ✅ Video: 1080p, lip-synced
    
    📁 Output: outputs/videos/2026-02-23-saas-promo/
    - starting_image.png
    - script.md
    - audio.mp3
    - video.mp4
```

## Tool Recommendations by Use Case

| Use Case | Image | Script | Audio | Video |
|----------|-------|--------|-------|-------|
| **Paid Ads** | Nano Banana | Claude | ElevenLabs | HeyGen |
| **Organic Content** | DALL-E 3 | Kimi K2 | MiniMax | HeyGen |
| **AI Influencer** | Custom | Claude | ElevenLabs Clone | VEED |
| **Budget** | Flux | Kimi K2 | Qwen3 | InfiniteTalk |

## References

- `/templates/script_prompts/` - Script templates
- `/templates/image_prompts/` - Image generation prompts
- `/examples/` - Sample outputs
```

### Main Script (ai_video_pipeline.py)

```python
#!/usr/bin/env python3
"""
AI Video Creator Pipeline
Full workflow: Image → Script → Audio → Video
"""

import os
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, Any

# Import providers (implement based on your setup)
# from providers import image, script, tts, video

class AIVideoPipeline:
    def __init__(self, output_dir: str = "outputs/videos"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def create_project_folder(self, topic: str) -> Path:
        """Create timestamped project folder"""
        date = datetime.now().strftime("%Y-%m-%d")
        slug = topic.lower().replace(" ", "-")[:30]
        folder = self.output_dir / f"{date}-{slug}"
        folder.mkdir(parents=True, exist_ok=True)
        return folder
    
    def generate_image(
        self,
        prompt: str,
        style: str = "professional",
        output_path: Path = None
    ) -> str:
        """Step 1: Generate starting image"""
        
        # Color grading additions to avoid grey scale
        style_additions = {
            "professional": "warm office lighting, soft golden hour tones, cinematic color grading",
            "casual": "natural daylight, warm skin tones, lifestyle photography style",
            "energetic": "vibrant colors, dynamic lighting, high contrast"
        }
        
        full_prompt = f"{prompt}, {style_additions.get(style, '')}, photorealistic, 8k quality"
        
        # Call your image generation API here
        # Example: Nano Banana Pro, DALL-E 3, Midjourney, etc.
        
        print(f"🖼️ Generating image with prompt: {full_prompt[:100]}...")
        
        # Placeholder - implement actual API call
        image_path = output_path or "starting_image.png"
        
        # Quality checks
        # - Check for artifacts
        # - Verify resolution
        # - Color grading validation
        
        return str(image_path)
    
    def generate_script(
        self,
        topic: str,
        duration: int = 45,
        style: str = "professional",
        template: str = None
    ) -> Dict[str, Any]:
        """Step 2: Generate script"""
        
        words_per_second = 2.5  # Average speaking pace
        target_words = int(duration * words_per_second)
        
        prompt = f"""
Write a {duration}-second video script about: {topic}

Requirements:
- Target length: ~{target_words} words
- Tone: {style}
- Sound like a real person, NOT a robot
- Use contractions (don't, can't, it's)
- Start with attention-grabbing hook (first 3 seconds)
- End with clear call-to-action

Structure:
1. HOOK (3-5 seconds): Grab attention immediately
2. PROBLEM/VALUE (20-30 seconds): Main content
3. CTA (5-10 seconds): What to do next

Output format:
```
HOOK:
[Opening line]

MAIN:
[Main content]

CTA:
[Call to action]
```

Also provide:
- Emphasis words (for TTS)
- Suggested pauses
- Emotion notes
"""
        
        print(f"📝 Generating script for: {topic}")
        
        # Call Claude or Kimi K2 API here
        # Placeholder response
        script = {
            "hook": "You know what nobody tells you about...",
            "main": "Here's the thing...",
            "cta": "Link in bio to learn more.",
            "full_text": "",
            "word_count": target_words,
            "estimated_duration": duration,
            "emphasis_words": [],
            "pauses": []
        }
        
        return script
    
    def generate_audio(
        self,
        script: str,
        provider: str = "elevenlabs",
        voice_id: str = None,
        output_path: Path = None
    ) -> str:
        """Step 3: Generate audio (TTS)"""
        
        print(f"🔊 Generating audio with {provider}...")
        
        if provider == "elevenlabs":
            # Use custom voice or voice design
            # DON'T use pre-made voices
            pass
        elif provider == "minimax":
            # Default output is already good
            # Voice clone with 10 second clip
            pass
        elif provider == "qwen":
            # Open source alternative
            pass
        
        audio_path = output_path or "audio.mp3"
        
        # Quality checks
        # - No robotic artifacts
        # - Natural pacing
        # - Clear pronunciation
        
        return str(audio_path)
    
    def generate_video(
        self,
        image_path: str,
        audio_path: str,
        provider: str = "heygen",
        avatar_id: str = None,
        output_path: Path = None
    ) -> str:
        """Step 4: Generate video"""
        
        print(f"🎬 Generating video with {provider}...")
        
        if provider == "heygen":
            # HeyGen Avatar 4 - best all around
            pass
        elif provider == "veed":
            # VEED Fabric 1.0 - higher quality, more expensive
            pass
        elif provider == "infinitetalk":
            # Open source, decent quality
            pass
        
        video_path = output_path or "video.mp4"
        
        # Quality checks
        # - Accurate lip sync
        # - Natural head movement
        # - No visual glitches
        
        return str(video_path)
    
    def run_pipeline(
        self,
        topic: str,
        duration: int = 45,
        style: str = "professional",
        avatar_type: str = "female",
        tts_provider: str = "elevenlabs",
        video_provider: str = "heygen"
    ) -> Dict[str, Any]:
        """Run full pipeline"""
        
        print(f"\n{'='*60}")
        print(f"🎬 AI VIDEO PIPELINE")
        print(f"{'='*60}")
        print(f"Topic: {topic}")
        print(f"Duration: {duration}s")
        print(f"Style: {style}")
        print(f"{'='*60}\n")
        
        # Create project folder
        project_dir = self.create_project_folder(topic)
        print(f"📁 Project folder: {project_dir}\n")
        
        result = {
            "project_dir": str(project_dir),
            "topic": topic,
            "duration": duration,
            "steps": [],
            "outputs": {}
        }
        
        try:
            # Step 1: Image
            print("Step 1/4: Generating starting image...")
            image_prompt = f"Professional {avatar_type} person, looking at camera, {style} setting"
            image_path = self.generate_image(
                prompt=image_prompt,
                style=style,
                output_path=project_dir / "starting_image.png"
            )
            result["outputs"]["image"] = image_path
            result["steps"].append("image_generated")
            print(f"✅ Image: {image_path}\n")
            
            # Step 2: Script
            print("Step 2/4: Writing script...")
            script = self.generate_script(
                topic=topic,
                duration=duration,
                style=style
            )
            script_path = project_dir / "script.md"
            with open(script_path, 'w') as f:
                f.write(f"# Script: {topic}\n\n")
                f.write(f"Duration: ~{duration}s\n")
                f.write(f"Words: {script['word_count']}\n\n")
                f.write(script['full_text'])
            result["outputs"]["script"] = str(script_path)
            result["steps"].append("script_written")
            print(f"✅ Script: {script_path}\n")
            
            # Step 3: Audio
            print("Step 3/4: Generating audio...")
            audio_path = self.generate_audio(
                script=script['full_text'],
                provider=tts_provider,
                output_path=project_dir / "audio.mp3"
            )
            result["outputs"]["audio"] = audio_path
            result["steps"].append("audio_generated")
            print(f"✅ Audio: {audio_path}\n")
            
            # Step 4: Video
            print("Step 4/4: Creating video...")
            video_path = self.generate_video(
                image_path=image_path,
                audio_path=audio_path,
                provider=video_provider,
                output_path=project_dir / "video.mp4"
            )
            result["outputs"]["video"] = video_path
            result["steps"].append("video_created")
            print(f"✅ Video: {video_path}\n")
            
            # Save metadata
            metadata_path = project_dir / "metadata.json"
            with open(metadata_path, 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"{'='*60}")
            print(f"🎉 PIPELINE COMPLETE")
            print(f"{'='*60}")
            print(f"📁 Output folder: {project_dir}")
            print(f"   - starting_image.png")
            print(f"   - script.md")
            print(f"   - audio.mp3")
            print(f"   - video.mp4")
            print(f"   - metadata.json")
            
            result["success"] = True
            
        except Exception as e:
            print(f"❌ Pipeline failed: {e}")
            result["success"] = False
            result["error"] = str(e)
        
        return result


def main():
    parser = argparse.ArgumentParser(description="AI Video Creator Pipeline")
    parser.add_argument("topic", help="Video topic")
    parser.add_argument("--duration", type=int, default=45, help="Target duration in seconds")
    parser.add_argument("--style", default="professional", choices=["professional", "casual", "energetic"])
    parser.add_argument("--avatar", default="female", choices=["male", "female"])
    parser.add_argument("--tts", default="elevenlabs", choices=["elevenlabs", "minimax", "qwen"])
    parser.add_argument("--video", default="heygen", choices=["heygen", "veed", "infinitetalk"])
    parser.add_argument("--output", default="outputs/videos", help="Output directory")
    
    args = parser.parse_args()
    
    pipeline = AIVideoPipeline(output_dir=args.output)
    
    result = pipeline.run_pipeline(
        topic=args.topic,
        duration=args.duration,
        style=args.style,
        avatar_type=args.avatar,
        tts_provider=args.tts,
        video_provider=args.video
    )
    
    return result


if __name__ == "__main__":
    main()
```

---

## 4. Summary

### Pipeline Steps

| Step | Tool | Key Point |
|------|------|-----------|
| 1. Image | Nano Banana Pro | Color grading, avoid grey scale |
| 2. Script | Claude/Kimi K2 | Sound human, not robotic |
| 3. Audio | ElevenLabs/MiniMax | Custom voice, not presets |
| 4. Video | HeyGen/VEED | Lip sync, natural movement |

### Quality Checklist

- [ ] Starting image is high quality, realistic
- [ ] Script sounds like a real person talking
- [ ] Audio has no robotic artifacts
- [ ] Video has accurate lip sync
- [ ] Color grading is warm, not grey

### Cost Estimate (per video)

| Budget | Image | Audio | Video | Total |
|--------|-------|-------|-------|-------|
| **Premium** | $3 | $0.50 | $2 | ~$5-6 |
| **Mid** | $0.50 | $0.20 | $1 | ~$2-3 |
| **Budget** | Free | Free | Free | $0 (open source) |

---

*COT Analysis complete*
