# COT: Mobile Claude Code — Termius + Tailscale + Claude Code

**Câu hỏi:** Giải thích ý tưởng này và lên plan chi tiết

**Ý tưởng gốc:**
> Combo dùng Claude Code trên Mobile: Termius + Tailscale + Claude Code
> Truy cập Claude Code trên Win, Macbook, VPS đều được vì nằm trên một hệ thống Tailscale nối với nhau qua đường ống kết nối P2P (kết nối chuyển tiếp ngang hàng) tốc độ rất cao.

---

## PHÂN TÍCH Ý TƯỞNG

### Ý tưởng là gì?

Ba công cụ kết hợp thành một hệ thống:

**Tailscale** — VPN mesh network
- Kết nối tất cả thiết bị (Win, Mac, VPS) vào một mạng riêng tư
- Mỗi thiết bị có IP cố định trong mạng Tailscale (ví dụ: 100.x.x.x)
- Kết nối P2P trực tiếp giữa các thiết bị — không đi qua server trung gian
- Tốc độ gần như LAN dù hai thiết bị ở khác châu lục
- **Miễn phí** cho cá nhân (100 thiết bị)

**Termius** — SSH client trên mobile
- App SSH/SFTP chuyên nghiệp cho iOS/Android
- Hỗ trợ: SSH tunneling, SFTP, port forwarding
- Lưu nhiều host profile, key management
- **Điểm mạnh:** UI tốt hơn mọi SSH app khác trên mobile

**Claude Code** — CLI agent chạy trong terminal
- Chạy trong terminal trên máy host (Win/Mac/VPS)
- Đọc file, viết code, chạy command, gọi API
- Không cần UI — chỉ cần terminal

**Kết hợp lại:**
```
Phone (Termius) → SSH qua Tailscale → Host machine (Win/Mac/VPS) → Claude Code đang chạy
```

Bạn ngồi trên giường, cầm điện thoại, gõ prompt vào Termius → Claude Code chạy trên máy tính mạnh ở nhà → kết quả trả về màn hình điện thoại.

---

### Tại sao điều này hay?

**1. Máy tính mạnh, màn hình nhỏ**
Claude Code chạy trên máy host — dùng toàn bộ RAM, CPU, SSD của máy đó. Điện thoại chỉ là terminal hiển thị. Không bị giới hạn phần cứng mobile.

**2. Không cần mở laptop**
Đang đi café, trên tàu, nằm trên giường → SSH vào máy nhà → Claude Code vẫn chạy đầy đủ.

**3. Session persistence**
Dùng `tmux` hoặc `screen` trên host → Claude Code session không bị ngắt khi mất kết nối. Disconnect điện thoại → reconnect sau → session vẫn còn nguyên, đang chạy.

**4. Tailscale P2P = không cần port forwarding**
Không cần mở port 22 ra internet. Không cần biết IP động. Tailscale tự lo routing. Bảo mật cao hơn exposed SSH.

**5. Multi-host**
Một ngày dùng VPS (để Claude Code chạy 24/7), hôm sau dùng MacBook (local files), tối dùng Windows — tất cả trong cùng Tailscale network, Termius lưu sẵn tất cả profiles.

---

### Limitations cần biết

- **Mobile keyboard** — gõ code/prompt trên phone keyboard vẫn chậm hơn laptop
- **Termius trả phí** nếu muốn sync cloud (basic free nhưng hạn chế)
- **Claude Code cần node/npm** — phải setup đúng trên host
- **Tailscale phải active** trên cả hai đầu — nếu host sleep/hibernate thì mất kết nối
- **VPS tốt nhất** cho always-on — máy tính cá nhân có thể tắt

---

## PLAN CHI TIẾT

### Phase 1 — Tailscale Network Setup (30 phút)

**Bước 1: Cài Tailscale trên tất cả thiết bị**
```
Windows host:  winget install Tailscale.Tailscale
MacBook:       brew install tailscale  (hoặc download .pkg)
VPS (Ubuntu):  curl -fsSL https://tailscale.com/install.sh | sh
iPhone/Android: App Store / Play Store
```

**Bước 2: Đăng nhập cùng một Tailscale account**
- Vào https://login.tailscale.com → tạo account (Google login OK)
- Mỗi thiết bị sau khi install → `tailscale up` → authorize trên web dashboard

**Bước 3: Verify network**
```bash
tailscale status
# Xem danh sách thiết bị và IP của từng cái
# Ví dụ: 
#   win-home     100.64.0.1
#   macbook      100.64.0.2
#   vps-hetzner  100.64.0.3
```

**Bước 4: Test SSH từ phone**
```
Termius → New Host → Hostname: 100.64.0.1 (IP Tailscale của Win)
Port: 22, Username: your-username, Password/Key: ...
Connect → nếu vào được = done
```

---

### Phase 2 — Host Machine Setup (45 phút)

**Cho từng máy host muốn dùng:**

**2A — Enable SSH**
```powershell
# Windows:
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'

# Mac: System Settings → General → Sharing → Remote Login → ON

# Ubuntu VPS:
sudo apt install openssh-server
sudo systemctl enable ssh
```

**2B — Install Node.js + Claude Code**
```bash
# Node (nếu chưa có):
# Windows: winget install OpenJS.NodeJS
# Mac/Linux: nvm install --lts

# Claude Code:
npm install -g @anthropic-ai/claude-code

# Verify:
claude --version
```

**2C — Install tmux (session persistence)**
```bash
# Mac/Linux:
brew install tmux  # hoặc apt install tmux

# Windows: dùng Windows Terminal + tmux via WSL, hoặc screen
```

**2D — Setup API key**
```bash
# Thêm vào ~/.bashrc hoặc ~/.zshrc:
export ANTHROPIC_API_KEY="sk-ant-..."

source ~/.bashrc
```

**2E — Tạo tmux session cho Claude Code**
```bash
# Tạo persistent session tên "claude":
tmux new-session -d -s claude

# Sau này attach vào:
tmux attach -t claude

# Trong session đó chạy:
claude
```

---

### Phase 3 — Termius Setup trên Mobile (15 phút)

**3A — Install Termius**
- iOS: App Store → "Termius SSH client"
- Android: Play Store → "Termius"

**3B — Add hosts (một lần, lưu mãi)**
```
Host 1: Windows Home
  Hostname: 100.64.x.x (Tailscale IP của Windows)
  Port: 22
  Username: tuan
  Label: 🏠 Win Home

Host 2: MacBook
  Hostname: 100.64.x.x (Tailscale IP của Mac)
  Port: 22
  Username: tuan
  Label: 💻 MacBook

Host 3: VPS (Always-on)
  Hostname: 100.64.x.x (Tailscale IP của VPS)
  Port: 22
  Username: root
  Label: ☁️ VPS
```

**3C — SSH key (optional nhưng khuyến nghị)**
```
Termius → Keychain → Generate new key → Copy public key
Paste vào ~/.ssh/authorized_keys trên từng host
→ Không cần nhập password mỗi lần
```

**3D — Snippet shortcuts trong Termius**
```
Snippet 1: "claude"  → launch claude code
Snippet 2: "tmux attach -t claude"  → resume session
Snippet 3: "tmux new-session -s claude"  → fresh session
```

---

### Phase 4 — Workflow Usage (Daily Operations)

**Kịch bản 1: Mobile vibe coding từ café**
```
1. Bật Tailscale trên iPhone (auto-connect)
2. Mở Termius → tap VPS host
3. tmux attach -t claude  (hoặc new session)
4. claude → đang ở trong Claude Code
5. Gõ prompt: "build me fal_video.py based on IMPLEMENT.md"
6. Claude Code đọc files, viết code, chạy tests
7. Disconnect khi xong café → session vẫn chạy trên VPS
```

**Kịch bản 2: Check progress từ giường**
```
1. Termius → VPS → tmux attach -t claude
2. Xem Claude Code đang làm gì
3. Add comment/instruction → Claude tiếp tục
4. Lock phone, ngủ
```

**Kịch bản 3: Chuyển sang Mac để review code**
```
1. Mở MacBook
2. SSH vào VPS: ssh user@100.64.0.3
3. hoặc: git pull changes Claude đã push
4. Review locally
```

---

### Phase 5 — Always-On VPS Setup (Optional, tốt nhất)

**Dùng Hetzner (€4.5/tháng) hoặc DigitalOcean ($6/tháng)**

```bash
# Setup VPS một lần:
sudo apt update && sudo apt upgrade -y
sudo apt install tmux git curl -y

# Install Node:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts

# Install Claude Code:
npm install -g @anthropic-ai/claude-code

# Install Tailscale:
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# Setup workspace:
git clone https://github.com/MrTuanDoan/Tuan-RnD ~/workspace
cd ~/workspace

# Start persistent tmux:
tmux new-session -d -s main
tmux send-keys -t main "cd ~/workspace && claude" Enter
```

**Kết quả:** VPS chạy Claude Code 24/7, điện thoại SSH vào bất cứ lúc nào.

---

## STACK SUMMARY

```
📱 iPhone/Android
    └── Termius (SSH client, mobile UI)
         └── Tailscale P2P tunnel (encrypted, fast)
              ├── 🖥️ Windows Home (Claude Code + local files)
              ├── 💻 MacBook (Claude Code + local projects)
              └── ☁️ VPS Hetzner (Claude Code 24/7, always-on)
                   └── tmux session (persistent across disconnects)
```

**Chi phí:**
- Tailscale: Free (cá nhân)
- Termius: Free (basic) / $10/năm (cloud sync)
- Hetzner VPS: €4.5/tháng (~$5)
- **Total: ~$5–6/tháng**

**So với alternative:**
- iPad + Apple keyboard + local IDE: $600+
- GitHub Codespaces: $18/tháng+
- Claude.ai mobile (web): Không có Claude Code

---

## KẾT LUẬN

Đây là cách rẻ nhất, mạnh nhất để có **full Claude Code trên mobile**.
Không phải mobile-optimized version — là full desktop Claude Code, 
chạy trên phần cứng mạnh, accessible từ điện thoại bất kỳ lúc nào.

The combo: Tailscale giải quyết networking, Termius giải quyết UX,
tmux giải quyết persistence. Ba cái ghép lại = mobile Claude Code hoàn chỉnh.
