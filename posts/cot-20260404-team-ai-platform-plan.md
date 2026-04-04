# Team AI Platform — Build Plan
# Internal tool: Chat + AI Gen (image/video/audio) cho team dùng chung
# Date: 2026-04-04

---

## 🎯 Vision

Một web app nội bộ cho team với 3 tính năng cốt lõi:

1. **Chat** — kết nối Claude Code đang chạy trên server/máy cá nhân qua Tailscale
2. **AI Gen** — tạo image, video, audio qua API (fal.ai, WaveSpeed, và các provider khác)
3. **UI** — đơn giản, hiện đại, dùng được trên mọi thiết bị

Không phải SaaS. Không phải public. Tool nội bộ cho team — deploy Vercel (frontend) + server riêng (Claude Code backend).

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  TEAM MEMBERS                        │
│         Browser / Mobile / Termius                   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────┐
│              VERCEL (Frontend)                        │
│         Next.js 15 + Tailwind + shadcn/ui            │
│                                                       │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│   │  /chat      │  │  /gen       │  │  /history   │ │
│   │ Claude Code │  │ Image/Video │  │ Past gens   │ │
│   │ interface   │  │ Audio gen   │  │ & chats     │ │
│   └──────┬──────┘  └──────┬──────┘  └─────────────┘ │
└──────────┼────────────────┼────────────────────────┘
           │ API calls       │ API calls
    ┌──────▼──────┐   ┌──────▼──────────────────────┐
    │  BACKEND    │   │     AI GEN PROVIDERS         │
    │  (Express   │   │                              │
    │   on VPS/   │   │  fal.ai    — image/video     │
    │   local)    │   │  WaveSpeed — image/video     │
    │             │   │  Replicate — various         │
    │  Tailscale  │   │  ElevenLabs— audio/voice     │
    │  → Claude   │   │  Suno      — music           │
    │    Code     │   └──────────────────────────────┘
    └─────────────┘
```

---

## 💰 API Providers — Bảng So Sánh Giá

### Image Generation

| Provider | Model | Giá | Output/$1 | Ghi chú |
|---|---|---|---|---|
| **WaveSpeed** | Nano Banana Pro | $0.14/image | 7 images | Tốt nhất cho character |
| **WaveSpeed** | Seedream V4.5 | $0.04/image | 25 images | Cân bằng chất/giá |
| **WaveSpeed** | Flux Dev Ultra Fast | $0.005/image | 200 images | Rẻ nhất, nhanh |
| **WaveSpeed** | FLUX.2 Pro | $0.055/image | 18 images | High quality |
| **WaveSpeed** | Midjourney | $0.08/image | 12 images | Stylized |
| **Replicate** | FLUX 1.1 Pro | $0.04/image | 25 images | Tương đương |
| **Replicate** | FLUX Dev | $0.025/image | 40 images | Open source |
| **Replicate** | Ideogram V3 | $0.09/image | 11 images | Text in image tốt |
| **fal.ai** | Nano Banana 2 | ~$0.10/image | 10 images | Fastest NanoBanana |

### Video Generation

| Provider | Model | Giá | Output/$1 | Ghi chú |
|---|---|---|---|---|
| **WaveSpeed** | Kling O3 | $0.15/sec | 6.6s | Premium quality |
| **WaveSpeed** | Veo 3.1 | $0.12/sec | 8.3s | Google, cinematic |
| **WaveSpeed** | Seedance 2.0 | $0.10/sec | 10s | ByteDance, beat-sync |
| **WaveSpeed** | Wan 2.6 | $0.08/sec | 12.5s | Budget video |
| **WaveSpeed** | Hailuo Minimax | $0.01/sec | 100s | Siêu rẻ |
| **fal.ai** | Kling 3.0 Pro | ~$0.10/sec | 10s | Lipsync tốt |
| **fal.ai** | Veed Fabric | ~$0.05/lipsync | — | Lipsync chuyên dụng |

### Audio / Voice

| Provider | Model | Giá | Ghi chú |
|---|---|---|---|
| **fal.ai** | Chatterbox TTS | ~$0.01/min | Voice clone 10s sample |
| **fal.ai** | Whisper | ~$0.006/min | Transcription |
| **ElevenLabs** | Voice Clone | $5–22/mo | Monthly plan, high quality |
| **Suno** | Music Gen | $8–24/mo | Background music |

### 🏆 Khuyến nghị cho team

| Use case | Provider | Lý do |
|---|---|---|
| Quick prototypes / mood board | WaveSpeed Flux Dev Ultra Fast ($0.005) | Rẻ nhất, nhanh |
| Final quality images | WaveSpeed Nano Banana Pro ($0.14) | Tốt nhất cho người thật |
| Short video clips (ads) | WaveSpeed Hailuo Minimax ($0.01/s) | Rẻ để test |
| Final quality video | WaveSpeed Kling O3 ($0.15/s) | Premium |
| Voice over | fal.ai Chatterbox | One-time clone |
| Background music | Suno | Monthly plan |

---

## 📁 Tech Stack

```
Frontend:   Next.js 15 (App Router) + TypeScript
Styling:    Tailwind CSS + shadcn/ui
Icons:      Lucide React
Deploy:     Vercel
Auth:       NextAuth.js (simple email/password hoặc invite-only)

Backend:    Express.js (Node) — chạy trên VPS/local
Transport:  Tailscale P2P (Chat → Claude Code)
AI APIs:    fal.ai SDK + WaveSpeed API + ElevenLabs SDK

Storage:    Vercel Blob hoặc Cloudflare R2 (lưu generated files)
Database:   Vercel KV (Redis) hoặc Supabase free tier (history)
```

---

## 🗺️ Phase Plan

### Phase 1 — Skeleton (3–4 ngày)

**Setup:**
```
npx create-next-app@latest team-ai-platform --typescript --tailwind --app
cd team-ai-platform
npx shadcn@latest init
```

**Tạo layout cơ bản:**
- Sidebar navigation: Chat / Generate / History
- Top bar: user avatar, model selector
- Main content area

**Pages:**
- `/` → redirect to `/chat`
- `/chat` → Chat interface (placeholder, chưa kết nối)
- `/gen` → Generation tabs (image/video/audio)
- `/history` → Grid of past generations

**Deliverable:** Vercel deploy, team có thể xem UI skeleton

---

### Phase 2 — Chat Feature (3–4 ngày)

**Backend (Express trên VPS/local):**
```javascript
// server.js
const express = require('express')
const { spawn } = require('child_process')
const app = express()

// WebSocket endpoint: /ws/chat
// Nhận message từ frontend
// Spawn claude code process (hoặc pipe vào running session)
// Stream output trả về frontend via SSE/WebSocket
```

**Tailscale integration:**
- Backend chạy trên host trong Tailscale network
- Frontend (Vercel) gọi qua env var: `CLAUDE_BACKEND_URL=http://100.64.0.x:3001`
- Hoặc dùng Tailscale Funnel để expose ra internet an toàn

**Frontend `/chat`:**
- Message input + send button
- Streaming response hiển thị real-time (SSE)
- Code blocks với syntax highlight
- Copy button per message
- Clear conversation

**Deliverable:** Team chat với Claude Code từ browser

---

### Phase 3 — AI Gen Feature (4–5 ngày)

**`/gen` page với 3 tabs:**

**Tab 1: Image**
```
- Prompt input (textarea)
- Provider selector dropdown: WaveSpeed / fal.ai / Replicate
- Model selector (auto-filter by provider)
- Size selector: 1:1 / 16:9 / 9:16
- Generate button → loading state → result image
- Download button + copy URL
- Cost estimate shown before generate
```

**Tab 2: Video**
```
- Text prompt hoặc upload start frame image
- Provider: WaveSpeed / fal.ai
- Model: Kling / Veo / Seedance / Hailuo
- Duration: 5s / 10s
- Generate → progress bar → video player
- Cost estimate (rõ ràng: "~$1.50 for 10s Kling")
```

**Tab 3: Audio**
```
- TTS: type script → generate voice
  - Voice selector (ElevenLabs voices)
- Voice Clone: upload sample → clone → generate
  - fal.ai Chatterbox
- Music: prompt → generate
  - Suno API (nếu có)
```

**API Routes (Next.js):**
```
POST /api/gen/image  → WaveSpeed/fal.ai/Replicate
POST /api/gen/video  → WaveSpeed/fal.ai
POST /api/gen/audio  → ElevenLabs/fal.ai Chatterbox
```

**Deliverable:** Full AI gen từ browser, multi-provider

---

### Phase 4 — History + UX Polish (2–3 ngày)

**`/history` page:**
- Grid view: tất cả generations của team
- Filter: image / video / audio / all
- Filter: by date, by model, by user
- Each card: thumbnail, model used, cost, prompt, download
- Delete button

**UX polish:**
- Dark mode (default) + light mode toggle
- Toast notifications (success/error)
- Loading skeletons (không bị nhảy layout)
- Mobile responsive
- Keyboard shortcuts: `Cmd+Enter` to generate/send
- Cost tracker: "Team spent $X this month" in sidebar

**Deliverable:** Production-ready, team có thể dùng hàng ngày

---

### Phase 5 — Auth + Team Management (2 ngày)

**Simple auth:**
- NextAuth.js với credentials provider
- Invite-only: admin tạo user accounts
- No public signup
- Session timeout: 7 ngày

**Team settings page:**
- Add/remove members
- API key management (stored server-side, không expose ra client)
- Usage stats per member

**Deliverable:** Secure, chỉ team mới vào được

---

## 📐 UI Design Principles

**Color scheme:** Dark mode default
```
Background:   #0A0A0A (near black)
Surface:      #141414
Border:       #262626
Primary:      #7C3AED (purple — AI feel)
Text:         #FAFAFA
Muted:        #71717A
```

**Component style:** shadcn/ui defaults với custom dark theme
- Card-based layout
- Generous padding
- Subtle hover states
- No decorative animations (performance first)

**Chat UI inspiration:** Claude.ai / ChatGPT
**Gen UI inspiration:** Midjourney Discord / Kling web

---

## 📊 Estimated Costs (Monthly, 5-person team)

| Item | Cost |
|---|---|
| Vercel (hosting) | Free (Hobby) → $20/mo (Pro nếu cần) |
| VPS for Claude Code backend | $5–9/mo (Hetzner) |
| Tailscale | Free |
| AI API credits | $50–200/mo (depends on usage) |
| Supabase / Vercel KV | Free tier |
| **Total** | **~$55–230/mo** |

---

## 🗂️ Folder Structure

```
team-ai-platform/
  app/
    (auth)/
      login/page.tsx
    (app)/
      layout.tsx          ← Sidebar + topbar
      chat/page.tsx
      gen/page.tsx
      history/page.tsx
      settings/page.tsx
    api/
      gen/
        image/route.ts
        video/route.ts
        audio/route.ts
      chat/
        stream/route.ts   ← SSE stream to Claude backend
  components/
    chat/
      MessageList.tsx
      MessageInput.tsx
      CodeBlock.tsx
    gen/
      ImageTab.tsx
      VideoTab.tsx
      AudioTab.tsx
      ProviderSelector.tsx
      CostEstimate.tsx
    shared/
      Sidebar.tsx
      TopBar.tsx
      MediaCard.tsx
  lib/
    providers/
      wavespeed.ts
      falai.ts
      replicate.ts
      elevenlabs.ts
    claude-backend.ts     ← Tailscale → Claude Code connection
  .env.local              ← All API keys (never committed)
  PLAN.md                 ← This file
```

---

## ✅ Execution Checklist

### Week 1
- [ ] `npx create-next-app team-ai-platform`
- [ ] shadcn/ui init + dark theme
- [ ] Sidebar + layout shell
- [ ] Deploy to Vercel (skeleton)
- [ ] Backend Express server setup on VPS
- [ ] Tailscale connect: VPS ↔ dev machine
- [ ] `/chat` basic UI + SSE streaming from Claude backend

### Week 2
- [ ] `/gen` → Image tab with WaveSpeed + fal.ai
- [ ] `/gen` → Video tab
- [ ] `/gen` → Audio tab (ElevenLabs + Chatterbox)
- [ ] Cost estimate component
- [ ] `/history` page + Vercel KV storage

### Week 3
- [ ] NextAuth + invite-only auth
- [ ] Mobile responsive polish
- [ ] Error handling + toast notifications
- [ ] Dark/light mode
- [ ] Team settings page
- [ ] Usage stats dashboard

---

## 🚀 Getting Started (First Command)

```bash
npx create-next-app@latest team-ai-platform \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd team-ai-platform
npx shadcn@latest init
npx shadcn@latest add button input textarea card tabs badge toast sidebar
```

---

*Plan created: 2026-04-04*
*Stack: Next.js 15 + Tailwind + shadcn/ui + Vercel + Express backend*
*Estimated build time: 2–3 weeks (solo) / 1 week (2 devs)*
