# COT: Cấu Trúc Khóa Học Claude Code (Tiếng Việt)
Nguồn: https://youtu.be/QoQBzR1NIqI
Ngày: 2026-03-08

---

## KHÓA HỌC: "CLAUDE CODE TỪ ZERO ĐẾN PRO"
### Làm chủ AI Coding Agent để tăng năng suất gấp 10x

---

## TỔNG QUAN KHÓA HỌC

**Đối tượng:** Người mới chưa biết lập trình, freelancer, agency owner, product builder
**Thời lượng:** ~12–15 giờ học (lý thuyết + thực hành)
**Công cụ:** Claude Code, VS Code / Antigravity, Terminal
**Kết quả:** Học viên build được web app, automation tool, và hệ thống agent tự động

---

## MODULE 1: KHỞI ĐẦU — CÀI ĐẶT & LÀM QUEN
*Thời lượng: ~1.5 giờ | Nguồn video: 0:00 – 29:00*

### Bài 1.1 — Claude Code là gì và tại sao nó thay đổi mọi thứ
- Claude Code không chỉ là chatbot — nó chạy trực tiếp trên máy tính bạn
- Khác biệt: chỉnh file, viết script, tổ chức folder, build app — tất cả bằng ngôn ngữ tự nhiên
- Use case thực tế: Nick dùng để quản lý business $4M/năm lợi nhuận
- **Mindset quan trọng:** Bạn không cần biết code — bạn cần biết *hướng dẫn*

### Bài 1.2 — Cài đặt Claude Code (từng bước)
- Đăng ký tài khoản Anthropic, chọn gói Pro ($17/tháng)
- Cài đặt qua terminal: lệnh `curl` (Mac/Linux) hoặc Windows CMD
- Xác thực tài khoản: `\login`
- Khởi động lần đầu: gõ `claude` trong terminal
- **Bài tập:** Cài đặt xong, gõ "Xin chào, bạn là ai?" — quan sát phản hồi

### Bài 1.3 — Hiểu giao diện Claude Code
- Terminal vs GUI: khác biệt và khi nào dùng cái nào
- Đọc status line: model, plan, working directory, context %, token count
- **Tokens là gì?** ≈ từ ngữ — 1 token ≈ 1 từ tiếng Anh
- Context window: 0–100% — tại sao quan trọng
- Các chế độ hiển thị (bypass, ask, plan) — giới thiệu sơ qua

### Bài 1.4 — IDE: Môi trường làm việc của bạn
- IDE = File Explorer + Text Editor + AI Chat Widget trong 1
- **VS Code:** OG, ổn định, extensible — cài Claude Code extension từ Anthropic
- **Antigravity (Cursor):** VS Code 2.0, modern hơn, AI-first — recommended cho course này
- Cài đặt Antigravity + kết nối Claude Code
- **Bài tập:** Mở một folder dự án, thử hỏi Claude "Folder này có gì?"

---

## MODULE 2: NÃO CỦA WORKSPACE — FILE CLAUDE.MD
*Thời lượng: ~2 giờ | Nguồn video: 29:00 – 1:10:00*

### Bài 2.1 — CLAUDE.md là gì và tại sao nó cực kỳ quan trọng
- CLAUDE.md = prompt được inject tự động vào đầu *mỗi* conversation
- **Analogy con tàu:** Bạn không thể lái tàu từng giây — bạn cần set đúng hướng từ đầu
- Góc lệch nhỏ ở đầu = lạc hướng hàng nghìn km sau này
- Steerability: thu hẹp không gian các lựa chọn AI có thể đi

### Bài 2.2 — Tạo CLAUDE.md đầu tiên
- Dùng lệnh `\init` để tự động generate từ codebase hiện có
- Cấu trúc tối ưu: bullet points, short headings, high information density
- Primacy bias: thông tin quan trọng nhất → để **ĐẦU FILE**
- **Template cơ bản:**
  - Project description (1–2 câu)
  - Tech stack
  - Quy tắc quan trọng (không được xóa file X, luôn dùng thư viện Y...)
  - Workflow mặc định

### Bài 2.3 — Best Practices & Anti-patterns
| ✅ NÊN LÀM | ❌ TRÁNH |
|------------|---------|
| Dùng bullet points ngắn gọn | Dump cả tài liệu API vào |
| Để rules quan trọng lên đầu | Viết quá dài (>500 dòng) |
| Dùng `\init` cho project mới | Voice dump thô vào CLAUDE.md |
| Cập nhật khi AI lặp lại lỗi | Viết rules mơ hồ như "be smart" |
| Treat như living code | Để outdated mãi không review |

### Bài 2.4 — Ba cấp CLAUDE.md (Global / Local / Enterprise)
- **Global** (`~/.claude/CLAUDE.md`): áp dụng cho mọi workspace
- **Local** (`.claude/CLAUDE.md` trong project): cho project cụ thể
- **Enterprise**: dành cho team lớn (không cần quan tâm lúc mới học)
- **Khi nào dùng Global?** Rules chung: tên bạn, preferred stack, coding style
- **Bài tập:** Tạo Global CLAUDE.md với 5 rules cá nhân của bạn

### Bài 2.5 — Auto Memory: Claude nhớ bạn qua mọi session
- `memory.md` được inject tự động — khác với CLAUDE.md
- Cách dùng: "Remember that my timezone is Vietnam/Ho_Chi_Minh"
- Claude sẽ ghi vào memory.md → session sau tự biết
- **Bài tập:** Dạy Claude 3 thông tin về bạn, kiểm tra session mới

---

## MODULE 3: BUILD THỰC TẾ — XÂY WEB APP TỪ ĐẦU
*Thời lượng: ~2.5 giờ | Nguồn video: 1:10:00 – 2:20:00*

### Bài 3.1 — Triết lý build: Task → Do → Verify Loop
- **Sai lầm phổ biến nhất:** Task → Do → Task → Do (không verify)
- **Đúng:** Task → Do → **Verify** → Task → Do → Verify
- AI không one-shot hoàn hảo, nhưng nó *cực kỳ nhanh* trong vòng lặp
- 5 phút AI ≈ 5 tiếng human cho cùng kết quả chất lượng
- Verification tools: screenshot loop, automated tests, manual review

### Bài 3.2 — 3 Cách Design Website với Claude Code
**Cách 1: Screenshot → Inspect → Replicate Loop** *(Recommended)*
- Chụp full-page screenshot (Chrome DevTools → Capture full size screenshot)
- Resize xuống <5MB (dùng ilovimage.com)
- Paste vào Claude Code + copy CSS styles → để Claude replicate
- Claude sẽ tự screenshot → so sánh → cải tiến nhiều lần

**Cách 2: Voice Transcript Dump**
- Nói nhanh hơn gõ 2.5–3x (200 từ/phút vs 60 từ/phút)
- Dùng voice transcription tool (Mac: giữ FN key)
- Dump toàn bộ mô tả website bằng giọng nói → Claude build

**Cách 3: Component Libraries**
- 21st.dev, shadcn/ui — copy prompt từ component đẹp
- Paste vào Claude Code: "Cài component này vào hero section"

### Bài 3.3 — Build Website Thực Tế (Demo Live)
- Lấy inspiration từ godly.website
- Screenshot full page → resize → paste + CSS styles
- Claude tạo HTML → screenshot → compare → iterate
- Customize content bằng voice dump
- Mobile optimization: "Make sure this is mobile responsive"
- **Bài tập:** Build landing page portfolio cá nhân trong <30 phút

### Bài 3.4 — Parallel Development: Build Nhiều Phiên Bản Cùng Lúc
- Mở 2–3 Antigravity tabs → chạy Claude song song
- Mỗi tab build 1 variant khác nhau
- So sánh kết quả → chọn cái tốt nhất
- Nguyên tắc: Claude không được ngồi chờ >10–20% thời gian
- Cap: 3–4 tabs song song là tối ưu cho hầu hết người

### Bài 3.5 — Deploy lên Internet
- Netlify, Vercel, Modal — tổng quan
- Deploy Netlify: kéo thả folder → live trong <2 phút
- Custom domain
- **Bài tập:** Deploy website từ bài 3.3 lên Netlify với custom domain

---

## MODULE 4: .CLAUDE DIRECTORY — ADVANCED CONFIGURATION
*Thời lượng: ~2 giờ | Nguồn video: 2:20:00 – 3:10:00*

### Bài 4.1 — .claude Directory là gì?
- Hidden folder (dấu `.` = ẩn trong file explorer)
- Chứa 10–15 advanced features unlock thêm sức mạnh cho Claude Code
- Cấu trúc đầy đủ:
  ```
  .claude/
  ├── CLAUDE.md
  ├── CLAUDE.local.md      (git-ignored, private)
  ├── settings.json        (permissions + hooks)
  ├── settings.local.json  (local overrides)
  ├── rules/               (split rules files)
  ├── agents/              (sub-agent definitions)
  └── skills/              (custom skill files)
  ```

### Bài 4.2 — Rules: Tách CLAUDE.md Thành Modular Files
- Thay vì 1 file lớn → nhiều file nhỏ có mục đích rõ ràng
- Ví dụ: `workflow.md`, `design-rules.md`, `tech-defaults.md`, `security.md`
- Lợi ích: dễ update từng phần, dễ share trong team, dễ thấy outdated rules
- **Lệnh:** "Split CLAUDE.md into component rules using the Claude code rule specification"
- **Bài tập:** Tách CLAUDE.md cá nhân thành 3 rules files

### Bài 4.3 — Permission Modes: 4 Chế Độ Hoạt Động
| Mode | Mô tả | Dùng khi |
|------|-------|---------|
| **Ask Before Edits** | Hỏi trước mọi thay đổi | Code base quan trọng, risk cao |
| **Edit Automatically** | Auto-edit files có sẵn, hỏi khi tạo file mới | Balanced, safe |
| **Plan Mode** | Chỉ research + plan, không action | Trước khi build phức tạp |
| **Bypass Permissions** | Làm tất cả không hỏi | Power users, workflow nhanh |

- Cách bật Bypass Permissions: Extensions → Claude Code Settings → "Allow dangerously skip permissions"
- **Rủi ro thực tế:** Case xóa hết hard drive (sudo rm -rf) — hiếm nhưng có thể xảy ra
- Best practice: Dùng git backup thường xuyên khi dùng bypass

---

## MODULE 5: PLAN MODE — BUILD PHỨC TẠP KHÔNG FAIL
*Thời lượng: ~2 giờ | Nguồn video: 3:10:00 – 4:00:00*

### Bài 5.1 — Tại Sao Plan Mode Thay Đổi Mọi Thứ
- **Không plan:** Build (15 phút) → Test → Fail → Rebuild (15 phút) → Total: 35+ phút
- **Có plan:** Plan (5 phút) → Build (5–15 phút) → Total: 10–20 phút
- "A minute of planning saves 10 minutes of building"
- Plan mode = read-only: research web, đọc files, reason → tạo kế hoạch → present cho bạn review

### Bài 5.2 — Quy Trình Plan Mode Thực Tế
1. Switch sang Plan Mode (Shift+Tab)
2. Describe project: "Tôi muốn build X với Y tech stack, có các tính năng Z"
3. Claude research → tạo detailed plan → present
4. Review plan → approve hoặc điều chỉnh
5. Switch sang Bypass/Edit Auto → "Go ahead"
6. Claude execute plan
7. Verify results

### Bài 5.3 — Build Full-Stack App với Plan Mode (Demo Live)
- Build một web app thực tế (form + database + backend)
- Xem Claude tạo plan chi tiết với tech choices
- Thực hành approve/reject/modify plan
- Execute và verify
- **Bài tập:** Build một tool nhỏ bạn thực sự cần dùng (timer, note app, calculator...)

---

## MODULE 6: AGENTS & SKILLS — TỰ ĐỘNG HÓA CÔNG VIỆC
*Thời lượng: ~2.5 giờ | Nguồn video: 4:00:00 – 5:00:00*

### Bài 6.1 — Sub-Agents: Chia Việc Cho Đội AI
- Parent agent = "sếp" → Child agent = "nhân viên chuyên biệt"
- Mỗi sub-agent có context window riêng biệt → tiết kiệm token của parent
- **3 loại sub-agent quan trọng nhất:**

**1. Research Agent**
- Dùng Sonnet/Haiku (rẻ hơn)
- Chạy hàng chục nghìn tokens research
- Chỉ trả về summary 2K tokens cho parent
- Cost savings: 50x so với để parent research

**2. Reviewer Agent**
- Không có context → nhìn code bằng "mắt mới"
- Phát hiện vấn đề mà parent agent bị bias không thấy
- "Code review" tự động

**3. QA/Testing Agent**
- Chạy automated tests
- Verify kết quả build
- Report lại cho parent

### Bài 6.2 — Tạo Sub-Agent File (.claude/agents/)
- Cấu trúc file agent:
  ```markdown
  ---
  name: research-agent
  description: Researches topics and returns summaries
  model: claude-sonnet-4-5
  tools: [web_search, read_file]
  max_turns: 20
  ---
  # Research Agent
  You are a research specialist...
  ```
- **Bài tập:** Tạo research agent cho lĩnh vực bạn hay làm việc

### Bài 6.3 — Skills: Đóng Gói Workflow Thành 1 Lệnh
- Skills = tập instructions → dạy parent agent làm 1 workflow phức tạp
- Khác agent: skill chạy *trong* parent context, không spawn context mới
- **Ví dụ skill thực tế của Nick:**
  - `shop-amazon.md` — tự động search & compare sản phẩm Amazon
  - `upwork-scrape-apply.md` — scrape job và tự apply
  - `send-welcome-email.md` — gửi email chào client mới
  - `build-deliverable.md` — tự động tạo deliverable cho client

### Bài 6.4 — Tạo Skill Từ Workflow Của Bạn
Quy trình 4 bước:
1. **Làm workflow thủ công** 1–2 lần, note lại từng bước
2. **Mô tả cho Claude:** "Tôi muốn tạo skill làm X, Y, Z theo thứ tự này..."
3. **Claude viết skill file** → test với fresh Claude instance
4. **Iterate:** Fix lỗi, tăng accuracy từ 70% → 90% → 99%
- **Bài tập:** Chọn 1 task bạn làm lặp đi lặp lại → tạo skill tự động hóa nó

### Bài 6.5 — Slash Commands & Built-in Tools
Các slash commands quan trọng:
- `\init` — tạo CLAUDE.md từ codebase
- `\permissions` — quản lý permissions
- `\login` / `\logout`
- `\clear` — clear conversation
- `\model` — đổi model
- `\compact` — compress context
- **Bài tập:** Chạy `\init` trên một project cũ của bạn

---

## MODULE 7: MCP — KẾT NỐI CLAUDE VỚI MỌI DỊCH VỤ
*Thời lượng: ~1.5 giờ | Nguồn video: 5:00:00 – 5:45:00*

### Bài 7.1 — Model Context Protocol (MCP) là gì?
- MCP = chuẩn kết nối để Claude Code tích hợp với external services
- Không có API? Không sao — Chrome DevTools MCP giải quyết điều đó
- **Use cases thực tế:**
  - Email manager tự động
  - Bookkeeper tự động
  - Lead scraper từ LinkedIn/Google Maps
  - Amazon shopper (như demo của Nick)

### Bài 7.2 — Cài Đặt & Cấu Hình MCP
- File `.claude/mcp.json`
- MCP servers phổ biến: Brave Search, Gmail, Notion, GitHub, Postgres
- Chrome DevTools MCP: collect data từ bất kỳ website không có API
- **Bài tập:** Cài 1 MCP server liên quan đến công việc bạn

### Bài 7.3 — Build 3 Automation Tools Thực Tế
**Tool 1: Email Manager**
- Connect Gmail qua MCP
- Tự động phân loại, draft reply, summarize inbox
- Skill: "Mỗi sáng tóm tắt 5 email quan trọng nhất"

**Tool 2: Lead Scraper**
- Chrome DevTools MCP → scrape LinkedIn/Google Maps
- Extract: tên, email, website, phone
- Export ra Google Sheets/CSV

**Tool 3: Content Researcher**
- Kết hợp Web Search MCP + Research Agent
- Input: topic → Output: 10 key insights + draft outline

---

## MODULE 8: HOOKS — TỰ ĐỘNG HOÁ THEO SỰ KIỆN
*Thời lượng: ~1 giờ | Nguồn video: 5:45:00 – 6:20:00*

### Bài 8.1 — Hooks là gì?
- Custom scripts chạy tự động **trước hoặc sau** mỗi tool call của Claude
- Định nghĩa trong `.claude/settings.json`
- **Ví dụ thực tế của Nick:** Chime sound khi Claude hoàn thành task
  - Mỗi window có chime khác nhau → biết window nào cần attention

### Bài 8.2 — Các Loại Hooks
- **PreToolUse:** Chạy trước khi Claude dùng tool
- **PostToolUse:** Chạy sau khi Claude dùng tool
- **Notification hook:** Alert khi có sự kiện cụ thể

### Bài 8.3 — Xây Dựng Hooks Thực Tế
- Hook: Auto-commit git sau mỗi lần Claude edit file
- Hook: Log tất cả tool calls ra file
- Hook: Notify Telegram khi task hoàn thành
- **Bài tập:** Tạo 1 notification hook cho workflow của bạn

---

## MODULE 9: CONTEXT MANAGEMENT — QUẢN LÝ HIỆU QUẢ
*Thời lượng: ~1 giờ | Nguồn video: 6:20:00 – 6:55:00*

### Bài 9.1 — Tại Sao Context Management Là Bottleneck #1
- Context = toàn bộ conversation history hiện tại
- Context dài → chất lượng output giảm (negative correlation)
- Context dài → tốn nhiều token hơn
- **Context rot:** Khi context đầy rác → Claude bắt đầu hallucinate

### Bài 9.2 — Chiến Lược Quản Lý Context
| Chiến lược | Khi dùng |
|-----------|---------|
| `\compact` | Context >70%, compress history |
| Spawn sub-agent | Research/testing task nặng |
| CLAUDE.md summary | Thay vì để Claude đọc lại files |
| Git worktrees | Parallel sessions không share context |
| Start fresh session | Khi chuyển sang task hoàn toàn khác |

### Bài 9.3 — Xây Dựng Prompts High-ROI
- Prompts ngắn gọn nhưng precise > prompts dài dòng
- Cung cấp context đủ, không dư
- Tham chiếu files cụ thể thay vì để Claude tự scan
- **Primacy + Recency bias:** Important info → đầu và cuối prompt

---

## MODULE 10: GIT WORKTREES & PARALLEL SESSIONS
*Thời lượng: ~45 phút | Nguồn video: 6:55:00 – 7:25:00*

### Bài 10.1 — Git Worktrees là gì và tại sao dùng?
- Cho phép chạy nhiều Claude sessions song song trên cùng 1 repo
- Mỗi session có context riêng biệt
- Không có vấn đề conflict như Claude Bot / OpenClaude
- **Use case:** Build feature A + feature B + bugfix C cùng lúc

### Bài 10.2 — Setup Git Worktrees
```bash
git worktree add ../project-feature-a feature-a
git worktree add ../project-feature-b feature-b
```
- Mỗi worktree = 1 folder riêng → 1 Antigravity window riêng → 1 Claude session riêng
- **Bài tập:** Tạo 2 worktrees, build 2 features song song

---

## MODULE 11: SCALING & DEPLOYMENT — ĐƯA LÊN PRODUCTION
*Thời lượng: ~1 giờ | Nguồn video: 7:25:00 – 8:00:00*

### Bài 11.1 — Từ Local → Production
- **Netlify:** Deploy static sites/web apps — kéo thả là xong
- **Vercel:** Deploy Next.js, React apps — auto CI/CD từ GitHub
- **Modal:** Deploy Python automation scripts, webhooks, serverless functions
- **GitHub Actions:** Tự động run Claude Code tasks khi push code

### Bài 11.2 — Chạy Automation Tự Động Trên Cloud
- Modal webhooks: trigger automation từ email/form/schedule
- GitHub Actions + Claude Code: auto-review PRs, auto-update docs
- Claude Code on Web: chạy không cần local machine
- **Use case thực tế:**
  - Mỗi đêm: scrape leads → format → gửi email tóm tắt
  - Mỗi ngày Thứ 2: generate content plan tuần mới
  - Mỗi khi có PR: auto code review + suggest improvements

### Bài 11.3 — Case Study: Build & Deploy Complete Automation System
- Build từ đầu: 1 automation tool thực tế
- Deploy lên Modal với webhook trigger
- Test end-to-end
- **Final Project:** Deploy 1 tool automation giải quyết problem thực tế của bạn

---

## BONUS: ADVANCED TIPS & MENTAL MODELS

### B.1 — Cách Nick Thực Sự Dùng Claude Code Mỗi Ngày
- Morning: Check memory, context refresh
- Build mode: Plan → Build → Verify loop
- Parallel windows với chime hooks
- Weekly: CLAUDE.md maintenance & pruning

### B.2 — Tìm Tips Mới Nhất Ở Đâu?
- Twitter/X → Search "Claude.md best practices last month"
- Dùng Grok: "Compile the last month of high ROI Claude.md configurations"
- Claude Code power users để follow

### B.3 — 80/20 Setup: Cái Bạn Thực Sự Cần
- ✅ Global CLAUDE.md (5–10 rules cá nhân)
- ✅ Per-project CLAUDE.md với `\init`
- ✅ 1–3 skills cho workflow lặp lại
- ✅ Research sub-agent
- ✅ Plan Mode habit
- ❌ Không cần setup hết tất cả mọi thứ ngay từ đầu

---

## LỘ TRÌNH HỌC ĐỀ XUẤT

### Tuần 1: Foundation
- Module 1 + 2 + 3.1–3.3
- **Milestone:** Build & deploy landing page

### Tuần 2: Power User
- Module 3.4–3.5 + 4 + 5
- **Milestone:** Build full-stack app với Plan Mode

### Tuần 3: Automation
- Module 6 + 7
- **Milestone:** 1 automation tool đang chạy production

### Tuần 4: Mastery
- Module 8 + 9 + 10 + 11
- **Milestone:** Complete automation system deployed

---

## KẾT QUẢ SAU KHÓA HỌC

Học viên sẽ có khả năng:
1. Build web app từ idea → deployed trong <1 giờ
2. Tạo automation tools thay thế virtual assistant
3. Chạy parallel AI agents để tăng throughput
4. Design hệ thống Claude.md + Skills cho team
5. Deploy automations lên production chạy 24/7
6. Tiết kiệm 10–20+ giờ/tuần công việc lặp lại
