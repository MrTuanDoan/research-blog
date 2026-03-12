# Agent-Browser: Hướng dẫn cài đặt + 5 Use Cases cho Content Creator & Vibecoders

**Question:** Cách cài đặt agent-browser và 5 real usecases cho content creator, vibecoders  
**Date:** 2026-02-23  
**Source:** https://github.com/vercel-labs/agent-browser

---

## Part 1: Agent-Browser là gì?

**Agent-Browser** là một CLI tool cho phép AI agents tự động điều khiển browser. Được phát triển bởi Vercel Labs, nó cung cấp:

- **Rust CLI** — Tốc độ cực nhanh (sub-millisecond parsing)
- **Headless Chromium** — Chạy browser không cần UI
- **Accessibility Tree** — AI đọc được cấu trúc trang web
- **Ref-based selectors** — Click `@e2` thay vì CSS selector phức tạp

```
┌─────────────┐      Commands       ┌─────────────────┐      CDP      ┌──────────┐
│ AI Agent    │ ==================> │ agent-browser   │ ============> │ Chromium │
│ (OpenClaw)  │                     │ (Rust CLI)      │               │ Browser  │
└─────────────┘                     └─────────────────┘               └──────────┘
```

---

## Part 2: Hướng dẫn Cài đặt

### Step 1: Cài đặt Global (Recommended)

```bash
# NPM (Windows/Mac/Linux)
npm install -g agent-browser

# Homebrew (macOS only)
brew install agent-browser
```

### Step 2: Download Chromium

```bash
agent-browser install

# Linux: cài thêm system dependencies
agent-browser install --with-deps
```

### Step 3: Verify Installation

```bash
agent-browser --version
agent-browser open example.com
agent-browser screenshot test.png
agent-browser close
```

### Step 4: Quick Start Commands

```bash
# Mở trang web
agent-browser open https://twitter.com

# Chụp ảnh accessibility tree (AI đọc được)
agent-browser snapshot

# Click element bằng ref
agent-browser click @e5

# Điền form
agent-browser fill @e3 "hello@example.com"

# Screenshot với annotations (đánh số elements)
agent-browser screenshot --annotate

# Đóng browser
agent-browser close
```

---

## Part 3: Tích hợp với OpenClaw

### Option A: Direct exec (Đơn giản)

OpenClaw có thể gọi `agent-browser` trực tiếp qua `exec`:

```bash
exec agent-browser open https://twitter.com
exec agent-browser snapshot
exec agent-browser click @e2
```

### Option B: MCP Server (Advanced)

Tạo MCP wrapper cho agent-browser:

```typescript
// agent-browser-mcp/src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const server = new McpServer({ name: "agent-browser", version: "1.0.0" });

server.tool("browser_open", "Open URL in browser", {
  url: z.string()
}, async ({ url }) => {
  const { stdout } = await execAsync(`agent-browser open "${url}"`);
  return { content: [{ type: "text", text: stdout }] };
});

server.tool("browser_snapshot", "Get accessibility tree", {}, async () => {
  const { stdout } = await execAsync("agent-browser snapshot -i -c");
  return { content: [{ type: "text", text: stdout }] };
});

server.tool("browser_click", "Click element by ref", {
  ref: z.string()
}, async ({ ref }) => {
  const { stdout } = await execAsync(`agent-browser click ${ref}`);
  return { content: [{ type: "text", text: stdout }] };
});
```

### Persistent Sessions

Giữ login state giữa các lần chạy:

```bash
# Lưu session name
agent-browser --session-name twitter open twitter.com
# Login 1 lần, sau đó state được lưu tự động

# Hoặc dùng profile directory
agent-browser --profile ~/.twitter-profile open twitter.com
```

---

## Part 4: 5 Real Use Cases cho Content Creator & Vibecoders

### Use Case 1: 🎬 Auto-Screenshot cho Tutorials

**Scenario:** Bạn làm video tutorial về web app, cần chụp nhiều screenshot với annotations.

**Workflow:**
```bash
# Mở app
agent-browser open https://your-app.com

# Screenshot với số đánh trên elements
agent-browser screenshot --annotate step1-homepage.png
# Output: [1] @e1 button "Login" [2] @e2 link "Sign Up"

# Navigate và chụp tiếp
agent-browser click @e1
agent-browser screenshot --annotate step2-login.png
```

**Benefit:** 
- Không cần manually đánh số trên Figma/Photoshop
- Consistent numbering style
- Batch process 20+ screenshots trong 1 script

**Script Example:**
```bash
#!/bin/bash
# tutorial-screenshots.sh
agent-browser open https://myapp.com
agent-browser screenshot --annotate screenshots/01-home.png
agent-browser click @e2  # Login button
agent-browser screenshot --annotate screenshots/02-login.png
agent-browser fill @e1 "demo@test.com"
agent-browser fill @e2 "password123"
agent-browser click @e3  # Submit
agent-browser wait 2000
agent-browser screenshot --annotate screenshots/03-dashboard.png
agent-browser close
```

---

### Use Case 2: 📊 Content Research Automation

**Scenario:** Research competitor content, trending topics, social media stats.

**Workflow:**
```bash
# Scrape Twitter trending
agent-browser --session-name twitter open twitter.com/explore
agent-browser snapshot -i > trends.txt

# Scrape YouTube trending
agent-browser open youtube.com/feed/trending
agent-browser snapshot -i -d 3 > youtube-trends.txt

# Scrape competitor blog
agent-browser open competitor.com/blog
agent-browser eval "Array.from(document.querySelectorAll('h2')).map(h => h.textContent)"
```

**Vibecoders Twist:** Kết hợp với AI để analyze:
```
1. agent-browser scrape data
2. Pipe vào LLM để summarize trends
3. Generate content ideas based on gaps
```

**Script:**
```bash
#!/bin/bash
# research.sh
agent-browser open https://twitter.com/explore/tabs/trending
agent-browser wait --load networkidle
agent-browser snapshot -i -c > /tmp/twitter-trends.txt

agent-browser open https://www.youtube.com/feed/trending
agent-browser wait --load networkidle  
agent-browser snapshot -i -d 4 > /tmp/youtube-trends.txt

echo "Research complete. Files saved."
```

---

### Use Case 3: 🤖 Social Media Automation (Ethical)

**Scenario:** Schedule posts, check analytics, engage with comments.

**Workflow:**
```bash
# Login với persistent profile
agent-browser --profile ~/.social-profile open twitter.com

# Check notifications
agent-browser open twitter.com/notifications
agent-browser snapshot -i > notifications.txt

# Post update (sau khi login)
agent-browser open twitter.com/compose/tweet
agent-browser fill @e1 "New video is live! 🎬 Check it out..."
agent-browser click @e2  # Post button

# Check analytics
agent-browser open twitter.com/analytics
agent-browser screenshot analytics-$(date +%Y%m%d).png
```

**Important:** Respect platform ToS. Use for:
- ✅ Scheduling your own content
- ✅ Checking your analytics
- ✅ Responding to comments
- ❌ Mass following/unfollowing
- ❌ Spam

---

### Use Case 4: 🎨 Design Asset Collection

**Scenario:** Thu thập design inspiration, color palettes, UI patterns.

**Workflow:**
```bash
# Dribbble scraping
agent-browser open https://dribbble.com/search/dashboard
agent-browser screenshot --full dribbble-dashboards.png

# Collect color palettes từ Coolors
agent-browser open https://coolors.co/palettes/trending
agent-browser snapshot > palettes.txt

# Screenshot multiple Figma community files
for url in $FIGMA_URLS; do
  agent-browser open "$url"
  agent-browser wait 3000
  agent-browser screenshot "figma-$(date +%s).png"
done
```

**Vibecoder Use:** 
- Build một library của UI patterns
- Train AI trên screenshots để suggest designs
- Auto-generate mood boards

---

### Use Case 5: 🔄 Cross-Platform Content Sync

**Scenario:** Post cùng content lên nhiều platforms.

**Workflow:**
```bash
#!/bin/bash
# cross-post.sh
CONTENT="🚀 Just launched my new course! Link in bio."
IMAGE="./promo.png"

# Twitter
agent-browser --session-name twitter open twitter.com/compose/tweet
agent-browser fill "textarea" "$CONTENT"
agent-browser upload "input[type=file]" "$IMAGE"
agent-browser click "[data-testid='tweetButton']"

# LinkedIn
agent-browser --session-name linkedin open linkedin.com
agent-browser click "[aria-label='Start a post']"
agent-browser fill ".ql-editor" "$CONTENT"
agent-browser click "button:has-text('Post')"

echo "Cross-posted to Twitter and LinkedIn!"
```

**Advanced:** Kết hợp với OpenClaw để:
1. Viết content 1 lần
2. AI adapt cho từng platform (Twitter ngắn, LinkedIn dài hơn)
3. Auto-post qua agent-browser

---

## Part 5: Tips & Best Practices

### 1. Use Persistent Sessions

```bash
# Đừng login mỗi lần
agent-browser --session-name myapp open myapp.com
# State được lưu tự động tại ~/.agent-browser/sessions/
```

### 2. Interactive Snapshot cho AI

```bash
# -i: chỉ interactive elements
# -c: compact (bỏ empty nodes)
agent-browser snapshot -i -c
```

### 3. Annotated Screenshots cho Visual AI

```bash
agent-browser screenshot --annotate
# Multimodal AI có thể "nhìn" và hiểu layout
```

### 4. Wait Properly

```bash
agent-browser wait --load networkidle  # Đợi network idle
agent-browser wait 2000                 # Đợi 2 giây
agent-browser wait --text "Welcome"     # Đợi text xuất hiện
```

### 5. Debug với Trace

```bash
agent-browser trace start
# ... do actions ...
agent-browser trace stop trace.zip
# Mở trace.zip trong Playwright Trace Viewer
```

---

## Summary

| Feature | Benefit for Creators |
|---------|---------------------|
| Annotated screenshots | Tutorial images với số tự động |
| Persistent sessions | Không cần re-login mỗi lần |
| Snapshot (accessibility tree) | AI đọc được web content |
| Batch scripting | Automate repetitive tasks |
| Cross-platform | Một script, nhiều platforms |

**Key Takeaway:** Agent-browser biến browser thành một tool mà AI có thể điều khiển. Đối với content creators và vibecoders, nó mở ra khả năng automate các tasks lặp đi lặp lại: research, screenshots, posting, analytics tracking.

---

## Quick Reference Card

```bash
# Setup
npm install -g agent-browser && agent-browser install

# Basic Flow
agent-browser open <url>
agent-browser snapshot -i -c
agent-browser click @e<n>
agent-browser fill @e<n> "text"
agent-browser screenshot [path]
agent-browser close

# Persistent Login
agent-browser --session-name <name> open <url>

# Annotated Screenshot
agent-browser screenshot --annotate output.png
```
