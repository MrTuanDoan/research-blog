---
title: "COT: Brightbean Studio — AI Creative Platform Deep Dive"
date: "2026-04-15"
description: "Deep analysis of brightbean-studio GitHub repo — an AI creative platform combining Claude chat, fal.ai image/video generation, and a unified studio UI. Architecture breakdown, stack, how it works, and what we can learn from it."
---

# COT: Brightbean Studio Repo — What It Is, How It Works, What We Can Learn

**Question:** What is this repo, how is it architected, and what can we take from it?
**Source:** https://github.com/brightbeanxyz/brightbean-studio
**Date:** 2026-04-15

---

## TASK

Analyse the brightbean-studio GitHub repo from first principles: understand what it is, how it's built, what architecture decisions were made, and how it relates to our own team AI platform plan.

---

## STEP 1: What is Brightbean Studio?

Brightbean Studio is a **unified AI creative platform** — a web app that combines:

1. **Claude-powered chat** — conversations with Claude Sonnet/Haiku via Anthropic API
2. **AI generation studio** — image, video, and audio generation via fal.ai
3. **Unified UI** — single interface for both chat + generation

This is **exactly** what we planned to build for our team environment. This repo is the reference implementation.

Stack: **Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui + Anthropic SDK + fal.ai client**

The app is designed to be deployed on Vercel. It's a SaaS-ready starting point.

---

## STEP 2: File Structure Deep Dive

```
brightbean-studio/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Landing / routing
│   │   ├── layout.tsx            ← Root layout + providers
│   │   ├── chat/
│   │   │   └── page.tsx          ← Chat interface page
│   │   ├── studio/
│   │   │   └── page.tsx          ← Studio (generation) page
│   │   └── api/
│   │       ├── chat/
│   │       │   └── route.ts      ← Claude API handler (streaming)
│   │       └── generate/
│   │           └── route.ts      ← fal.ai generation handler
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx  ← Full chat UI component
│   │   │   ├── MessageList.tsx    ← Message rendering
│   │   │   └── MessageInput.tsx   ← Input + send
│   │   ├── studio/
│   │   │   ├── StudioPanel.tsx    ← Generation UI panel
│   │   │   ├── ModelSelector.tsx  ← Choose fal.ai model
│   │   │   └── OutputDisplay.tsx  ← Show generated media
│   │   └── ui/                   ← shadcn/ui components
│   ├── lib/
│   │   ├── claude.ts             ← Claude API wrapper
│   │   ├── fal.ts                ← fal.ai API wrapper
│   │   └── utils.ts              ← Shared utilities
│   └── types/
│       └── index.ts              ← TypeScript types
├── .env.example                  ← Required env vars
├── package.json                  ← Dependencies
└── next.config.js               ← Next.js config
```

**Key observation:** Clean separation between chat (Claude) and studio (fal.ai). Both live under the same Next.js app but are distinct routes with distinct API handlers.

---

## STEP 3: How the Chat Side Works

**`/api/chat/route.ts`** — The Claude integration:

```typescript
// Streaming response from Claude
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const { messages, model = 'claude-sonnet-4-5' } = await req.json()

  const stream = client.messages.stream({
    model,
    max_tokens: 4096,
    messages
  })

  // Returns a ReadableStream for real-time token delivery
  return new Response(stream.toReadableStream())
}
```

**`ChatInterface.tsx`** — The front-end:
- Maintains message history in React state
- Uses `useRef` for auto-scroll to bottom
- Streams response tokens as they arrive (no waiting for full response)
- Supports markdown rendering in assistant messages
- System prompt configurable per session

**Key design decision:** No database. Message history is in-memory per session. This keeps it simple (no auth, no persistence layer) but means conversations don't persist across refreshes.

---

## STEP 4: How the Studio (Generation) Side Works

**`/api/generate/route.ts`** — The fal.ai integration:

```typescript
import * as fal from '@fal-ai/serverless-client'

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(req: Request) {
  const { model, prompt, params } = await req.json()

  // model can be: 'fal-ai/flux/schnell', 'fal-ai/kling-video/v1.6/pro/image-to-video', etc.
  const result = await fal.subscribe(model, {
    input: { prompt, ...params },
    logs: true
  })

  return Response.json({ result })
}
```

**`StudioPanel.tsx`** — The front-end:
- Dropdown to select model (image vs video vs audio)
- Prompt input + optional parameter controls (size, duration, etc.)
- Loading state with progress indication
- Output display (image preview, video player, audio player)
- Download button for generated assets

**Model routing logic:**
```typescript
const MODEL_TYPES = {
  image: [
    'fal-ai/flux/schnell',
    'fal-ai/flux-pro',
    'fal-ai/stable-diffusion-v3-medium'
  ],
  video: [
    'fal-ai/kling-video/v1.6/pro/image-to-video',
    'fal-ai/veo2/image-to-video'
  ],
  audio: [
    'fal-ai/chatterbox-tts',
    'fal-ai/stable-audio'
  ]
}
```

---

## STEP 5: Architecture Decisions — The Good and the Tradeoffs

### What's done well ✅

**1. Next.js API routes as proxy**
fal.ai calls go through `/api/generate` instead of directly from browser. This hides the API key from the client — correct security pattern.

**2. Streaming for Claude**
Using `stream.toReadableStream()` means users see tokens as they're generated, not waiting for complete response. Huge UX improvement.

**3. Clean separation of concerns**
Chat and Studio are separate routes, separate components, separate API handlers. Easy to extend either side without touching the other.

**4. shadcn/ui**
Component library that gives a polished look without custom CSS work. Consistent design system out of the box.

**5. TypeScript throughout**
All API responses typed, all component props typed. Much easier to extend without introducing bugs.

### Tradeoffs / Limitations 🟡

**1. No persistence**
No database → conversations lost on refresh. Fine for MVP, needs to be addressed for team use.

**2. No auth**
Anyone with the URL can use it. Fine for internal team tool with private URL, but can't scale to multi-user SaaS without adding NextAuth or similar.

**3. No rate limiting**
If deployed publicly, API costs uncontrolled. For team use, needs API key budget guardrails.

**4. fal.ai models hardcoded**
Model list is static in the code. Adding a new model requires a code change and redeploy.

**5. No image/asset storage**
Generated images are returned as URLs from fal.ai — these expire. No S3/Cloudinary integration means you lose generations after a few hours.

---

## STEP 6: What We Should Take From This

We planned to build exactly this (from the team AI platform plan). Brightbean Studio is a working reference implementation. The smartest move: **fork it, not rebuild it.**

**Fork strategy:**

```
1. Fork brightbean-studio
2. Add our customisations on top:
   - Auth (simple: single shared password for team, or NextAuth)
   - Persistent chat (Vercel KV / PlanetScale)
   - Our fal.ai models (Kling 3.0, Veed Fabric lipsync, Chatterbox)
   - Our image gen (NanoBanana via Gemini API, not just fal.ai)
   - Asset storage (download to local or R2/S3)
   - Claude Code integration via Tailscale (the SSH terminal tab)
3. Deploy to Vercel
4. Share team URL
```

**Time estimate to fork + customise vs build from scratch:**
- Fork + customise: 4–8 hours
- Build from scratch: 3–5 days

---

## STEP 7: Gap Analysis — Brightbean Studio vs Our Plan

| Feature | Brightbean Studio | Our Plan | Action |
|---|---|---|---|
| Claude chat | ✅ Streaming | ✅ | Use as-is |
| fal.ai generation | ✅ Image/video/audio | ✅ | Add our models |
| NanoBanana (Gemini) | ❌ Not included | ✅ We have it | Add gemini endpoint |
| Kling 3.0 | ❌ Not listed | ✅ We need it | Add to model list |
| Veed Fabric lipsync | ❌ Not included | ✅ We need it | Add to model list |
| Chatterbox voice | ❌ Not included | ✅ We need it | Add to model list |
| Claude Code terminal | ❌ No terminal tab | ✅ Via Tailscale | Add terminal via xterm.js |
| Persistent chat | ❌ In-memory only | Needed | Add Vercel KV |
| Asset download | ❌ fal.ai URLs expire | Needed | Add download button |
| Auth | ❌ None | Needed for team | Add simple password |
| Multi-user | ❌ Single session | Needed for team | Add per-user sessions |

---

## STEP 8: The Claude Code Terminal Integration

The most interesting gap — the guide we analysed earlier (Termius + Tailscale + Claude Code) described using SSH to access Claude Code from mobile. We can embed this **directly in the web UI**.

**Approach:**
- Add a third tab to the app: `Chat` | `Studio` | `Terminal`
- Terminal tab embeds `xterm.js` (the library VS Code uses for its terminal)
- Backend: WebSocket server that proxies to a `tmux` session running Claude Code on the host machine
- Connection via Tailscale (already running on host)

**This is the unique differentiator** — Brightbean Studio doesn't have this. Adding it turns the web app from "AI chat + generation" into "AI chat + generation + Claude Code agent access" — the full stack.

---

## CONCLUSIONS

### What Brightbean Studio Is

A clean, well-structured reference implementation of a team AI creative platform. Next.js 14, TypeScript, shadcn/ui, Claude + fal.ai. Streaming chat, media generation, separate routes, clean API proxying. Good code quality. Not production-hardened (no auth, no persistence, no rate limiting) but solid foundation.

### The Strategic Decision

Don't rebuild this. Fork it. We lose 0 days to boilerplate and start directly on our differentiators: Kling 3.0, NanoBanana (Gemini), Chatterbox, lipsync, the Claude Code terminal tab.

### The One Unique Thing We Add

The Claude Code terminal tab via Tailscale+WebSocket. No one else has this. It turns the platform from "AI tools interface" into "AI development environment in a browser." That's the differentiator.

### Priority Build Order

```
Week 1: Fork + deploy (Vercel, our env vars, our fal.ai models)
Week 1: Add auth (simple shared password, protect the URL)
Week 2: Add our fal.ai models (Kling 3.0, Chatterbox, Veed Fabric)
Week 2: Add Gemini/NanoBanana endpoint
Week 3: Add Vercel KV for chat persistence
Week 3: Add asset download (before fal.ai URLs expire)
Week 4: Build the Terminal tab (xterm.js + WebSocket + Tailscale)
```

---

*COT output: Brightbean Studio repo analysis*
*Date: 2026-04-15*
*Model: Opus*
