# ECC Getting Started Guide — Full Installation for Tuan's 3 Personas
Ngày: 2026-03-09
Base: cot-20260308-ecc-personas-approach.md

---

## PREREQUISITES — CÀI TRƯỚC KHI BẮT ĐẦU

### 1. Claude Code CLI
```bash
# Install
npm install -g @anthropic-ai/claude-code

# Verify
claude --version
# Cần: v2.1.0 hoặc mới hơn

# Login
claude login
```

### 2. Node.js (v18+)
```bash
node --version
# Nếu chưa có: https://nodejs.org
```

### 3. Git
```bash
git --version
# Nếu chưa có: https://git-scm.com
```

### 4. Anthropic API Key
- Vào: https://console.anthropic.com
- Tạo API key
- Set environment variable:
```bash
# macOS/Linux
export ANTHROPIC_API_KEY="sk-ant-..."

# Windows PowerShell
$env:ANTHROPIC_API_KEY="sk-ant-..."

# Permanent (add to ~/.zshrc or ~/.bashrc)
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
```

---

## STEP 1 — CLONE ECC REPO

```bash
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code
```

---

## STEP 2 — INSTALL ECC PLUGIN (Recommended)

Trong Claude Code session, chạy:

```
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code
```

Verify install:
```
/plugin list everything-claude-code@everything-claude-code
```

Bạn sẽ thấy: 16 agents, 65+ skills, 40+ commands available.

---

## STEP 3 — INSTALL RULES (Bắt buộc — plugin không tự install)

Rules là "always-follow guidelines" — được inject vào mọi session tự động.

```bash
# Từ folder everything-claude-code đã clone:

# Option A: User-level (áp dụng cho TẤT CẢ projects)
mkdir -p ~/.claude/rules

# Common rules (language-agnostic) — LUÔN cần
cp -r rules/common/* ~/.claude/rules/

# Language rules — chọn theo stack của bạn
cp -r rules/typescript/* ~/.claude/rules/    # nếu dùng TypeScript/JS
cp -r rules/python/* ~/.claude/rules/        # nếu dùng Python
cp -r rules/golang/* ~/.claude/rules/        # nếu dùng Go

# Option B: Project-level (chỉ áp dụng cho project hiện tại)
mkdir -p .claude/rules
cp -r rules/common/* .claude/rules/
cp -r rules/typescript/* .claude/rules/
```

**Hoặc dùng installer script (recommended — handles merge conflicts):**
```bash
chmod +x install.sh
./install.sh typescript          # TypeScript stack
./install.sh python              # Python stack
./install.sh typescript python   # Cả hai
```

---

## STEP 4 — INSTALL SKILLS THEO PERSONA

Skills là workflow instructions. Không cần install tất cả — chỉ install những gì bạn dùng.

### Tạo skills directory:
```bash
mkdir -p ~/.claude/skills
```

---

### 🔴 PRIORITY SKILLS (Tất cả 3 personas — install ngay)

```bash
# Từ folder everything-claude-code:

cp -r skills/search-first ~/.claude/skills/
cp -r skills/market-research ~/.claude/skills/
cp -r skills/content-engine ~/.claude/skills/
cp -r skills/continuous-learning-v2 ~/.claude/skills/
```

---

### 🔬 R&D RESEARCHER — Additional Skills

```bash
cp -r skills/eval-harness ~/.claude/skills/
cp -r skills/verification-loop ~/.claude/skills/
cp -r skills/iterative-retrieval ~/.claude/skills/
cp -r skills/cost-aware-llm-pipeline ~/.claude/skills/
```

---

### 🎬 CONTENT CREATOR — Additional Skills

```bash
cp -r skills/article-writing ~/.claude/skills/
cp -r skills/continuous-learning ~/.claude/skills/
cp -r skills/frontend-slides ~/.claude/skills/
cp -r skills/investor-materials ~/.claude/skills/
```

---

### 🤝 BUSINESS MIDDLEMAN — Additional Skills

```bash
cp -r skills/investor-materials ~/.claude/skills/
cp -r skills/investor-outreach ~/.claude/skills/
cp -r skills/cost-aware-llm-pipeline ~/.claude/skills/
```

---

## STEP 5 — INSTALL AGENTS

```bash
mkdir -p ~/.claude/agents

# Foundation agents (tất cả personas)
cp agents/planner.md ~/.claude/agents/
cp agents/architect.md ~/.claude/agents/
cp agents/code-reviewer.md ~/.claude/agents/

# R&D specific
cp agents/security-reviewer.md ~/.claude/agents/

# Content specific
cp agents/doc-updater.md ~/.claude/agents/

# General utility
cp agents/build-error-resolver.md ~/.claude/agents/
cp agents/refactor-cleaner.md ~/.claude/agents/
```

---

## STEP 6 — SETUP HOOKS (Memory Persistence)

Hooks tự động save/load context qua sessions — critical cho workflow liên tục.

### Copy hooks config:
```bash
# View hooks
cat hooks/hooks.json

# Merge vào settings.json của bạn
# File: ~/.claude/settings.json
```

Nếu `~/.claude/settings.json` chưa có, tạo mới:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [{
          "type": "command",
          "command": "node ~/.claude/plugins/everything-claude-code/scripts/hooks/session-start.js"
        }]
      }
    ],
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "node ~/.claude/plugins/everything-claude-code/scripts/hooks/session-end.js"
        }]
      }
    ]
  }
}
```

> ⚠️ Nếu install qua plugin (Step 2), hooks tự load từ `hooks/hooks.json` — không cần config thủ công.

---

## STEP 7 — CONFIGURE MCP SERVERS (Optional)

MCPs connect Claude Code với external services (GitHub, Supabase, Vercel...).

```bash
# View available MCPs
cat mcp-configs/mcp-servers.json

# Copy vào ~/.claude.json và điền API keys
# Thay tất cả YOUR_*_HERE bằng actual keys của bạn
```

**Minimal MCP cho Tuan (start với cái này):**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN_HERE"
      }
    }
  }
}
```

---

## STEP 8 — INSTALL AGENTSHIELD (Optional nhưng recommended)

```bash
# Quick scan — không cần install
npx ecc-agentshield scan

# Hoặc install global
npm install -g ecc-agentshield

# Scan Claude Code config
agentshield scan

# Auto-fix safe issues
agentshield scan --fix
```

---

## STEP 9 — SETUP HOOK RUNTIME CONTROLS

```bash
# Thêm vào ~/.zshrc hoặc ~/.bashrc

# Hook strictness (start với standard)
export ECC_HOOK_PROFILE=standard

# Disable specific hooks nếu cần (comma-separated)
# export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder"
```

---

## STEP 10 — VERIFY INSTALLATION

Mở một project folder, chạy Claude Code:
```bash
cd your-project
claude
```

Trong Claude Code, test:
```
# Check plugin
/plugin list everything-claude-code@everything-claude-code

# Test một command
/plan "test installation"

# Check instincts (continuous learning)
/instinct-status

# Test search-first
/everything-claude-code:search-first
```

Nếu thấy responses từ các commands → installation thành công ✅

---

## FULL FILE STRUCTURE SAU KHI INSTALL

```
~/.claude/
├── settings.json          ← hooks config
├── rules/                 ← always-follow guidelines
│   ├── coding-style.md
│   ├── git-workflow.md
│   ├── testing.md
│   ├── performance.md
│   ├── patterns.md
│   ├── hooks.md
│   ├── agents.md
│   ├── security.md
│   └── [typescript/python/golang rules]
├── agents/                ← subagents
│   ├── planner.md
│   ├── architect.md
│   ├── code-reviewer.md
│   └── ...
├── skills/                ← workflow definitions
│   ├── search-first/
│   ├── market-research/
│   ├── content-engine/
│   ├── continuous-learning-v2/
│   └── [persona-specific skills]
└── plugins/
    └── everything-claude-code/   ← plugin files (auto-managed)
```

---

## QUICK REFERENCE — COMMANDS BY PERSONA

### 🔬 R&D Researcher
```
/plan              → Plan a research project
/search-first      → Research before building
/verify            → Verify AI output cross-sources
/learn-eval        → Extract patterns from this session
/instinct-status   → See what AI has learned about you
/evolve            → Turn instincts into reusable skills
```

### 🎬 Content Creator
```
/skill-create      → Generate skills from your git history
/learn-eval        → Extract writing patterns
/instinct-export   → Export your writing style instincts
/update-docs       → Sync documentation after changes
```

### 🤝 Business Middleman
```
/plan              → Plan client deliverables
/security-scan     → Audit AI configs for clients
/code-review       → Review proposed solutions
/eval              → Evaluate against criteria
```

### All Personas
```
/instinct-status   → Current learned instincts + confidence
/instinct-import   → Import instincts from teammates
/instinct-export   → Share your instincts
/sessions          → Session history
```

---

## TROUBLESHOOTING

### Plugin không load commands
```bash
# Check Claude Code version
claude --version  # cần v2.1.0+

# Reinstall plugin
/plugin uninstall everything-claude-code@everything-claude-code
/plugin install everything-claude-code@everything-claude-code
```

### Hooks không chạy
```bash
# Check hook profile
echo $ECC_HOOK_PROFILE

# Reset về default
export ECC_HOOK_PROFILE=standard

# Check disabled hooks
echo $ECC_DISABLED_HOOKS
```

### "Duplicate hooks file detected" error
```bash
# Đây là known issue — hooks được auto-load bởi Claude Code v2.1+
# KHÔNG thêm "hooks" field vào plugin.json
# Chỉ cần reinstall plugin
```

### Rules không được apply
```bash
# Check rules location
ls ~/.claude/rules/

# Nếu dùng project-level rules, check
ls .claude/rules/
```

---

## COST EXPECTATIONS

| Scenario | Estimated Cost |
|----------|---------------|
| Light use (5–10 sessions/week) | ~$5–15/month |
| Medium use (daily sessions) | ~$30–60/month |
| Heavy R&D sessions (Opus heavy) | ~$1–3/session |
| Market research session | ~$0.50–1.00 |
| Quick command (/plan, /code-review) | ~$0.05–0.20 |

> 💡 Tip: Dùng `/model-route` để tự động route tasks sang model phù hợp — tiết kiệm cost mà không giảm quality.

---

## NEXT STEPS AFTER INSTALL

**Week 1 — Foundation**
- [ ] Chạy `/instinct-status` → xem baseline
- [ ] Test `search-first` với 1 real research task
- [ ] Test `market-research` với 1 topic bạn đang cần
- [ ] Test `content-engine` với 1 raw idea

**Week 2–3 — Learn**
- [ ] Sau mỗi session → chạy `/learn-eval`
- [ ] Check `/instinct-status` weekly → xem confidence scores tăng
- [ ] Khi có 5+ instincts → `/evolve` để cluster thành skill

**Week 4+ — Compound**
- [ ] `/instinct-export` → backup và share với team
- [ ] `/skill-create` → generate skills từ git history của project
- [ ] AgentShield scan monthly → audit security posture
