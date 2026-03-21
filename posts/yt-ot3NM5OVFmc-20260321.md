# Claude Code Channels — Tích Hợp Telegram & Discord Với AI Agent

**Nguồn:** https://youtu.be/ot3NM5OVFmc  
**Kênh:** Nick Saraev  
**Ngày đăng:** 2026-03-20  
**Tóm tắt:** 2026-03-21

---

## 🎯 Tóm Tắt Nhanh

Anthropic vừa ra mắt **Claude Code Channels** — tính năng tích hợp Telegram và Discord trực tiếp vào Claude Code, cho phép bạn nhắn tin với AI agent như nhắn tin với bạn bè. Không cần OpenClaw, không cần server riêng — chạy ngay trên máy tính cá nhân với bảo mật cao hơn.

---

## 📱 Demo Thực Tế

**Ví dụ 1 — Telegram:**
- Nhắn tin: *"Thay người trong thumbnail này bằng tôi, đổi màu, đổi text"*
- Claude Code chạy skill thiết kế thumbnail → gửi kết quả ảnh về điện thoại qua Telegram

**Ví dụ 2 — Discord:**
- Nhắn tin: *"Scrape 100 leads nha sĩ ở California từ Apify"*
- Claude chạy skill scraping → trả về file CSV → gửi thẳng về Discord để mở trên điện thoại

---

## ⚙️ Cách Hoạt Động

```
Bạn nhắn tin qua Telegram/Discord
        ↓
Plugin channel nhận tin nhắn
        ↓
Claude Code xử lý + chạy skill trên máy tính
        ↓
Trả kết quả về Telegram/Discord
```

- Chạy **hoàn toàn local** trên máy tính của bạn
- Mọi skill/tool đã cài sẵn trong Claude Code đều dùng được
- **Sender allow list** — chỉ ID đã được phê duyệt mới gửi được lệnh, người khác bị chặn im lặng
- Lịch sử hội thoại được lưu + có lớp reasoning

---

## 🛠️ Hướng Dẫn Cài Đặt Từng Bước

---

### PHẦN 1: TELEGRAM

#### Bước 1 — Tạo Bot Telegram

1. Mở Telegram → tìm **@BotFather**
2. Nhấn **Start**
3. Gõ `/newbot`
4. Nhập tên bot (ví dụ: `MyClaudeBot`)
5. Nhập username — **bắt buộc kết thúc bằng `bot`** (ví dụ: `myclaudebot_bot`)
6. Copy **Bot Token** được cấp → lưu lại

> 💡 Xem danh sách bot đã tạo: gõ `/mybots` trong BotFather

#### Bước 2 — Mở Chat Với Bot

1. Tìm bot vừa tạo trên Telegram
2. Nhấn **Start** → cửa sổ chat mở ra
3. *(Chưa có gì xảy ra lúc này — cần cài plugin phía Claude Code trước)*

#### Bước 3 — Cài Plugin Telegram Trong Claude Code

Mở terminal trong Claude Code, chạy lệnh:

```bash
/plugin install telegram@claude-plugins-official
```

Chọn scope cài đặt: **user** (dùng cho tất cả workspace)

Sau khi cài xong, chạy:

```bash
reload-plugins
```

#### Bước 4 — Cấu Hình Bot Token

Trong Claude Code terminal, chạy:

```bash
/telegram:configure
```

Lệnh sẽ hiện màu **tím** → dán Bot Token từ Bước 1 vào → Enter

#### Bước 5 — Khởi Động Kết Nối

Thoát Claude Code (Ctrl+C hai lần), sau đó chạy:

```bash
claude --channels plugin:telegram@claude-plugins-official
```

#### Bước 6 — Test Kết Nối

Vào Telegram → nhắn tin `hey` cho bot → Claude Code phản hồi → **Kết nối thành công!** ✅

---

### PHẦN 2: DISCORD

#### Bước 1 — Tạo Discord App

1. Vào [discord.com/developers/applications](https://discord.com/developers/applications)
2. Nhấn **New Application** → đặt tên → xác nhận
3. Vào mục **Bot** (menu bên trái)
4. Kéo xuống → bật **Message Content Intent**
5. Kéo lên → nhấn **Reset Token** → xác nhận → copy **Bot Token** → lưu lại

#### Bước 2 — Cấp Quyền Bot

1. Vào mục **OAuth2** → **URL Generator**
2. Tick **bot** trong Scopes
3. Tick các quyền sau trong Bot Permissions:
   - View Channels
   - Send Messages
   - Send Messages in Threads
   - Read Messages / View Channels
   - Read Message History
   - Attach Files
   - Add Reactions
4. Copy **Generated URL** → mở trong browser → mời bot vào server Discord của bạn

> 💡 Cần có sẵn Discord server. Tạo nhanh: Discord → nút + → Create My Own → For me and my friends

#### Bước 3 — Cài Plugin Discord Trong Claude Code

```bash
/plugin install discord@claude-plugins-official
```

Chọn scope: **user**

Sau đó:

```bash
reload-plugins
```

Kiểm tra plugins đã cài:

```bash
/plugins
```

#### Bước 4 — Cấu Hình Bot Token Discord

```bash
/discord:configure
```

Lệnh hiện màu **tím** → dán Bot Token Discord → Enter

#### Bước 5 — Khởi Động Kết Nối

Thoát và chạy lại Claude Code:

```bash
claude --channels plugin:discord@claude-plugins-official
```

#### Bước 6 — Test Kết Nối

DM bot trên Discord → nhắn `hello` → Claude phản hồi → **Kết nối thành công!** ✅

---

## 🌙 Giữ Máy Tính Luôn Hoạt Động (24/7)

Vì Claude Code chạy local, máy tính phải không được ngủ:

### macOS

**Cách 1 — Terminal:**
```bash
caffeinate -t 3600    # Giữ sáng 1 giờ (3600 giây)
caffeinate -t 86400   # Giữ sáng 24 giờ
```

**Cách 2 — System Settings:**
- Settings → **Lock Screen** → "Turn display off when inactive" → **Never**
- Settings → **Battery** → Options → bật "Prevent automatic sleeping on power adapter when display is off"

### Windows

Dùng ứng dụng như **Caffeine** hoặc cài đặt Power Plan → không tắt màn hình/ngủ khi cắm điện.

---

## 🖥️ Nâng Cao: Setup Server Riêng (Mac Mini / VPS)

Để chạy 24/7 mà không ảnh hưởng máy chính:

1. Dùng **Mac Mini** (hoặc máy tính cũ) không cần màn hình
2. Sync workspace với **Syncthing** — đồng bộ 2 chiều với máy chính
3. Claude Code chạy trên máy phụ, mọi file tạo ra tự đồng bộ sang máy chính
4. Nhắn Telegram/Discord bất cứ đâu → máy phụ xử lý

> ⚠️ Lưu ý: Nếu dùng git commit trên cả 2 máy cùng lúc có thể bị conflict — xử lý thủ công.

---

## 🔒 Bảo Mật

| Tính năng | Chi tiết |
|-----------|---------|
| **Sender Allow List** | Chỉ ID đã phê duyệt mới gửi lệnh được |
| **Local execution** | Code chạy trên máy bạn, không qua server bên thứ 3 |
| **Anthropic security** | Built-in bảo vệ prompt injection + exfiltration |
| **Không cần expose port** | Khác hoàn toàn với OpenClaw chạy public |

---

## 💡 So Sánh Với OpenClaw

| | Claude Code Channels | OpenClaw |
|---|---|---|
| **Nhà phát triển** | Anthropic | Open source (bên thứ 3) |
| **Bảo mật** | Enterprise-grade | Phụ thuộc người dùng setup |
| **Cài đặt** | Plugin đơn giản | Server riêng, config phức tạp |
| **Chi phí** | Miễn phí (trong Claude Code) | Tốn phí VPS nếu dùng cloud |
| **Tính năng** | Telegram + Discord + tất cả Claude tools | Tương tự + một số extras |
| **Dữ liệu** | Nằm trong tay Anthropic | Nằm trong tay nhà phát triển khác |

> 💬 *"Hầu hết use case mà người dùng OpenClaw đang làm đều đã được cover bởi update này của Anthropic — và còn an toàn hơn, ổn định hơn."*

---

## 🔑 Tóm Tắt 3 Bước Cốt Lõi

**Telegram:**
1. Tạo bot qua BotFather → copy token
2. Cài plugin + configure token trong Claude Code
3. Chạy `claude --channels plugin:telegram@claude-plugins-official`

**Discord:**
1. Tạo app tại discord.com/developers → bật Message Content Intent → copy token
2. Cấp quyền bot → mời vào server
3. Cài plugin + configure + chạy `claude --channels plugin:discord@claude-plugins-official`

---

*Video bởi Nick Saraev | Tóm tắt: Antigravity — 2026-03-21*
