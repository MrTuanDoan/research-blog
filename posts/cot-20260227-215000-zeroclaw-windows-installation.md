# CoT: Hướng Dẫn Cài Đặt ZeroClaw trên Windows (Chi Tiết)

**Date:** 2026-02-27 21:50
**Question:** Hướng dẫn từng bước cài đặt ZeroClaw trên Windows cho người mới

---

## TL;DR

ZeroClaw là AI assistant runtime viết bằng Rust, siêu nhẹ (<5MB RAM), khởi động nhanh (<10ms). Có 2 cách cài:
1. **Pre-built binary** (Recommended) - Download và chạy ngay
2. **Build from source** - Cần Rust toolchain

---

## 📋 Mục Lục

1. [Yêu Cầu Hệ Thống](#1-yêu-cầu-hệ-thống)
2. [Cách 1: Pre-built Binary (Khuyến nghị)](#2-cách-1-pre-built-binary-khuyến-nghị)
3. [Cách 2: Build From Source](#3-cách-2-build-from-source)
4. [Thiết Lập Ban Đầu](#4-thiết-lập-ban-đầu)
5. [Sử Dụng Cơ Bản](#5-sử-dụng-cơ-bản)
6. [Kết Nối Telegram/Discord](#6-kết-nối-telegramdiscord)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Yêu Cầu Hệ Thống

### Minimum
- Windows 10/11 (x86_64)
- 2GB RAM (cho build), 512MB (cho run)
- 1GB disk space

### Pre-built Binary
- Không cần cài thêm gì

### Build From Source
- Visual Studio Build Tools 2022
- Rust toolchain

---

## 2. Cách 1: Pre-built Binary (Khuyến Nghị)

**Dành cho:** Người mới, muốn dùng ngay, không cần build

### Bước 2.1: Download Binary

1. Truy cập: https://github.com/zeroclaw-labs/zeroclaw/releases/latest

2. Download file: `zeroclaw-x86_64-pc-windows-msvc.zip`

3. Giải nén vào thư mục, ví dụ: `C:\zeroclaw\`

### Bước 2.2: Thêm vào PATH

**Cách 1: GUI**
1. Nhấn `Win + R`, gõ `sysdm.cpl`, Enter
2. Tab **Advanced** → **Environment Variables**
3. Trong **User variables**, chọn `Path` → **Edit**
4. **New** → Thêm `C:\zeroclaw`
5. **OK** tất cả

**Cách 2: PowerShell (Admin)**
```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\zeroclaw", "User")
```

### Bước 2.3: Verify Installation

Mở **PowerShell mới** (quan trọng: phải mở mới để load PATH):

```powershell
zeroclaw --version
```

Output mong đợi:
```
zeroclaw 0.x.x
```

**→ Nhảy đến [Bước 4: Thiết Lập Ban Đầu](#4-thiết-lập-ban-đầu)**

---

## 3. Cách 2: Build From Source

**Dành cho:** Developers, muốn customize, có máy mạnh

### Bước 3.1: Cài Visual Studio Build Tools

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

Sau khi cài xong:
1. Mở **Visual Studio Installer**
2. Chọn **Modify** trên Build Tools
3. Tick ✅ **Desktop development with C++**
4. **Install**

⏱️ Thời gian: ~5-10 phút tùy internet

### Bước 3.2: Cài Rust Toolchain

```powershell
winget install Rustlang.Rustup
```

Sau khi cài, **mở PowerShell mới**:

```powershell
rustup default stable
```

### Bước 3.3: Verify Rust

```powershell
rustc --version
cargo --version
```

Output mong đợi:
```
rustc 1.xx.x (...)
cargo 1.xx.x (...)
```

### Bước 3.4: Clone và Build

```powershell
git clone https://github.com/zeroclaw-labs/zeroclaw.git
cd zeroclaw
cargo build --release --locked
```

⏱️ Thời gian build: 5-15 phút tùy máy

### Bước 3.5: Install

```powershell
cargo install --path . --force --locked
```

Binary sẽ được cài vào `~/.cargo/bin/zeroclaw.exe`

### Bước 3.6: Thêm Cargo bin vào PATH

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\.cargo\bin", "User")
```

Mở **PowerShell mới**, verify:

```powershell
zeroclaw --version
```

---

## 4. Thiết Lập Ban Đầu

### Bước 4.1: Lấy API Key

ZeroClaw cần API key từ một provider. Recommended: **OpenRouter** (nhiều model, giá rẻ)

1. Truy cập: https://openrouter.ai/
2. Đăng ký/Đăng nhập
3. Vào **Keys** → **Create Key**
4. Copy API key (bắt đầu với `sk-or-...`)

### Bước 4.2: Onboarding

**Cách nhanh (1 lệnh):**

```powershell
zeroclaw onboard --api-key "sk-or-xxx" --provider openrouter
```

**Cách interactive (wizard):**

```powershell
zeroclaw onboard --interactive
```

Wizard sẽ hỏi:
- API key
- Provider (chọn OpenRouter)
- Default model (recommend: `openrouter/auto` hoặc `anthropic/claude-3.5-sonnet`)

### Bước 4.3: Verify Setup

```powershell
zeroclaw status
zeroclaw auth status
```

Output mong đợi:
```
✅ Config: OK
✅ Provider: openrouter
✅ API Key: Valid
```

---

## 5. Sử Dụng Cơ Bản

### Chat 1 lần

```powershell
zeroclaw agent -m "Hello, ZeroClaw!"
```

### Chat Interactive

```powershell
zeroclaw agent
```

Gõ message, nhấn Enter. Gõ `exit` để thoát.

### Start Gateway (Webhook Server)

```powershell
zeroclaw gateway
```

Default: `127.0.0.1:42617`

### Start Daemon (Full Runtime)

```powershell
zeroclaw daemon
```

Daemon cần cho: Telegram, Discord, scheduled tasks

### System Diagnostics

```powershell
zeroclaw doctor
```

---

## 6. Kết Nối Telegram/Discord

### Telegram

#### Bước 1: Tạo Bot
1. Chat với @BotFather trên Telegram
2. Gửi `/newbot`
3. Đặt tên và username
4. Copy **Bot Token**

#### Bước 2: Config trong ZeroClaw

Mở file config (thường ở `~/.config/zeroclaw/config.toml` hoặc `%APPDATA%\zeroclaw\config.toml`):

```toml
[channels.telegram]
enabled = true
token = "YOUR_BOT_TOKEN"
```

#### Bước 3: Bind User ID

```powershell
zeroclaw channel bind-telegram YOUR_TELEGRAM_USER_ID
```

Lấy user ID: Chat với @userinfobot

#### Bước 4: Start Daemon

```powershell
zeroclaw daemon
```

#### Bước 5: Test

Gửi message cho bot trên Telegram!

### Discord

Similar flow - xem docs: https://github.com/zeroclaw-labs/zeroclaw/blob/main/docs/channels/discord.md

---

## 7. Troubleshooting

### Lệnh `zeroclaw` không nhận

**Nguyên nhân:** PATH chưa được load

**Fix:**
1. Đóng tất cả PowerShell/Terminal
2. Mở lại PowerShell mới
3. Thử lại `zeroclaw --version`

### Build lỗi "linker not found"

**Nguyên nhân:** Visual Studio Build Tools chưa cài đúng

**Fix:**
1. Mở Visual Studio Installer
2. Chọn Build Tools → Modify
3. Tick ✅ **Desktop development with C++**
4. Install lại

### "API key invalid"

**Fix:**
1. Kiểm tra key đúng format
2. Thử chạy lại:
```powershell
zeroclaw onboard --force --api-key "sk-xxx" --provider openrouter
```

### Check Health

```powershell
zeroclaw doctor
zeroclaw channel doctor
```

---

## 📊 Quick Reference

| Command | Mô tả |
|---------|-------|
| `zeroclaw onboard` | Setup ban đầu |
| `zeroclaw agent -m "..."` | Chat 1 lần |
| `zeroclaw agent` | Chat interactive |
| `zeroclaw daemon` | Start full runtime |
| `zeroclaw gateway` | Start webhook server |
| `zeroclaw status` | Kiểm tra status |
| `zeroclaw doctor` | Diagnostics |

---

## 🔗 Resources

- **GitHub:** https://github.com/zeroclaw-labs/zeroclaw
- **Docs:** https://github.com/zeroclaw-labs/zeroclaw/blob/main/docs/README.md
- **Releases:** https://github.com/zeroclaw-labs/zeroclaw/releases
- **Telegram Group:** https://t.me/zeroclawlabs

---

## ⚠️ Lưu Ý Bảo Mật

Theo announcement chính thức:
- **KHÔNG** trust: zeroclaw.org, zeroclaw.net, openagen/zeroclaw
- **CHỈ** dùng repo chính: https://github.com/zeroclaw-labs/zeroclaw
- **KHÔNG** tham gia fundraising/investment không chính thức

---

*Generated: 2026-02-27*
*Command: /cot*
