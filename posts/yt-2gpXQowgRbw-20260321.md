# How To Setup OpenClaw In 15 Minutes (Step-by-Step)

**Source:** https://youtu.be/2gpXQowgRbw  
**Channel:** God of Prompt  
**Published:** 2026-03-03  
**Summarized:** 2026-03-21

---

## 🎯 TL;DR

Hướng dẫn setup OpenClaw (Clawbot) an toàn trên AWS EC2 free tier — cách đúng để tránh bị tấn công. Demo thực tế: build CRM trong Notion từ dữ liệu Gmail, hoàn toàn tự động.

---

## 📋 Step-by-Step Setup

### Step 1: Tạo AWS EC2 Instance (Free)
- Vào AWS Console → EC2 → **Launch Instance**
- Đặt tên: `Clawbot V2`, OS: **Ubuntu**
- Instance type: tìm "free" → chọn loại **8GB RAM** miễn phí
- Tạo **SSH key pair** (private key để connect)
- Click **Launch Instance**

### Step 2: Connect vào Server
- Vào EC2 → click **Connect** → chọn **EC2 Instance Connect** (web SSH)
- Hoặc dùng terminal local với private key: `ssh -i key.pem ubuntu@<ip>`

### Step 3: Cài OpenClaw
- Vào **openclaw.ai** (search "clawbot", "moltclaw" đều redirect đến đây)
- Copy **one-liner install command**
- Paste vào terminal → Enter → đợi install xong

### Step 4: Onboarding
- Xác nhận hiểu rủi ro → **Yes**
- Chọn **Quick Start**
- Chọn AI provider: **OpenRouter** (hoặc OpenAI)
- Nhập **API key**
- Chọn model: **Anthropic Sonnet** (context window lớn)
- Chọn messaging platform
- Cài skills/plugins (optional — NanoBanana, Whisper, etc.)
- Nhập **Notion API key** (bắt buộc nếu dùng Notion):
  - Notion → Settings → Connections → Manage integrations → Edit → Copy Internal Integration Secret
- Enable **Session Memory**
- Truy cập dashboard qua URL được cung cấp

### Step 5: Mở Dashboard (SSH Tunnel)
- Từ local terminal: mở SSH tunnel với private key đến EC2
- Copy URL dashboard từ OpenClaw (có IP + token)
- Paste vào browser → vào OpenClaw chat

### Step 6: Customize Identity
- Mở file `identity.md` trong backend
- Edit trực tiếp (thêm paragraphs, vai trò, operating principles)
- Không bị giới hạn ô nhỏ trong UI

### Step 7: Cấp quyền Gmail (Riêng biệt!)
- **KHÔNG dùng email cá nhân** — tạo email mới (Google Workspace)
- Vào **Google Cloud Console** → Tạo project mới (vd: "Cloudbot")
- Enable **Gmail API**
- Tạo **OAuth Client ID** → Download JSON
- Copy `client_id` + `client_secret` từ JSON → paste vào OpenClaw
- OpenClaw tạo OAuth URL → mở trong browser → Sign in với email mới → Allow
- Copy redirect URL (kể cả error page) → paste lại vào OpenClaw
- Gmail giờ chỉ có quyền **read-only**, không gửi được email

---

## 💡 Key Concepts

| Concept | Chi tiết |
|---------|---------|
| **Skills** | Plugins add-on (NanoBanana, Whisper, Google Places...) |
| **Session Memory** | Lưu context giữa các phiên làm việc |
| **OAuth scoped access** | Gmail chỉ đọc, Notion chỉ 1 database |
| **SSH tunnel** | Dashboard không expose ra internet — chỉ qua tunnel |

---

## 🔒 Bảo Mật — Tại Sao AWS + SSH Tunnel?

**Vấn đề với cách setup sai:**
- Nhiều người chạy Clawbot trên **laptop cá nhân**, expose thẳng ra internet
- Server public → bị bots scan → bị "tấn công hàng nghìn lần"
- Không phải lỗi của OpenClaw — lỗi của operator

**Cách đúng (trong video):**
- Gateway **bound to localhost** → không expose ra internet
- Chỉ access được qua **private SSH key**
- Agent có máy riêng, email riêng, credentials riêng
- **Kill switch:** tắt EC2 instance là xong, laptop personal không bị ảnh hưởng

> 💬 *"Treat OpenClaw like a contractor. Don't give them your personal laptop, your master passwords, or let them run on your home network. Give them their own server, their own email."*

---

## 🏆 Demo Kết Quả

OpenClaw tự động:
1. Đọc toàn bộ email trong Gmail được cấp quyền
2. Thiết kế schema CRM trong Notion (columns: tên, email, thread summary, priority, relationship strength, revenue potential, source...)
3. Populate toàn bộ database — **không cần user làm gì**

---

## 🔑 Takeaways

1. **AWS EC2 free tier** = cách tốt nhất để isolate OpenClaw, không tốn tiền
2. **Không bao giờ** dùng email cá nhân — tạo email riêng cho agent
3. **SSH tunnel** = bảo mật tốt hơn expose port
4. Skills/APIs là optional — bắt đầu minimal, thêm dần
5. OpenClaw security incidents = **operator mistakes**, không phải lỗi phần mềm

---

*Video by Julian — God of Prompt | https://godofprompt.ai*
