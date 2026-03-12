# Everything Claude Code (ECC) — Deep Research & Function Breakdown
Nguồn: https://github.com/affaan-m/everything-claude-code
Ngày: 2026-03-08

---

## TL;DR

**Everything Claude Code (ECC)** là một "agent harness performance optimization system" — không chỉ là bộ config, mà là hệ thống hoàn chỉnh gồm skills, instincts, memory, security scanning, và continuous learning. Được xây dựng bởi @affaanmustafa qua 10+ tháng sử dụng Claude Code hàng ngày để build sản phẩm thực tế. Thắng giải hackathon Anthropic x Forum Ventures ($15K API credits). 50K+ stars, MIT licensed.

**Hoạt động với:** Claude Code, Codex (OpenAI), Cursor, OpenCode, Antigravity
**Ngôn ngữ hỗ trợ:** TypeScript, Python, Go, Java, C++, Swift
**Cài đặt:** 1 lệnh (`/plugin install`) hoặc manual copy

---

## 📐 KIẾN TRÚC TỔNG QUAN

```
everything-claude-code/
│
├── 🤖 agents/          → 16 subagents chuyên biệt
├── 🧠 skills/          → 65+ workflow definitions
├── ⚡ commands/         → 40+ slash commands
├── 📏 rules/           → Always-follow guidelines
├── 🪝 hooks/           → Event-triggered automations
├── 🔧 scripts/         → Cross-platform Node.js utilities
├── 🔌 mcp-configs/     → MCP server configurations
├── 📝 contexts/        → Dynamic system prompt injection
├── 📚 examples/        → Real-world CLAUDE.md configs
└── 🛡️ AgentShield      → Security scanner (separate tool)
```

---

## 1. 🤖 AGENTS — 16 Subagents Chuyên Biệt

Agents là các subagents có scope giới hạn, chạy trong context riêng biệt để tiết kiệm tokens của parent agent.

| Agent | File | Chức năng | Khi nào dùng |
|-------|------|----------|-------------|
| **Planner** | `planner.md` | Lập kế hoạch implementation chi tiết | Trước khi build feature mới |
| **Architect** | `architect.md` | Thiết kế hệ thống, quyết định kiến trúc | Khi cần chọn tech stack, design patterns |
| **TDD Guide** | `tdd-guide.md` | Hướng dẫn test-driven development | Viết test trước code |
| **Code Reviewer** | `code-reviewer.md` | Review chất lượng code, security | Sau khi code xong, trước merge |
| **Security Reviewer** | `security-reviewer.md` | Phân tích lỗ hổng bảo mật | Kiểm tra security trước deploy |
| **Build Error Resolver** | `build-error-resolver.md` | Fix lỗi build | Khi build fails |
| **E2E Runner** | `e2e-runner.md` | Chạy Playwright E2E tests | Test end-to-end flows |
| **Refactor Cleaner** | `refactor-cleaner.md` | Dọn dead code, cleanup | Sau sprint, trước release |
| **Doc Updater** | `doc-updater.md` | Đồng bộ documentation | Sau khi code thay đổi |
| **Go Reviewer** | `go-reviewer.md` | Review Go code | Go projects |
| **Go Build Resolver** | `go-build-resolver.md` | Fix Go build errors | Go build fails |
| **Python Reviewer** | `python-reviewer.md` | Review Python code | Python projects |
| **Database Reviewer** | `database-reviewer.md` | Review DB/Supabase queries | Database optimization |

**Cách hoạt động:**
```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and maintainability
tools: ["Read", "Grep", "Glob", "Bash"]
model: opus
---
You are a senior code reviewer...
```

Agent được delegate task từ parent → chạy trong context riêng → trả result về parent. Tiết kiệm ~50x tokens so với để parent làm hết.

---

## 2. 🧠 SKILLS — 65+ Workflow Definitions

Skills là workflow instructions — dạy AI cách làm một loại task cụ thể. Khác agents ở chỗ skills chạy *trong* parent context, không spawn riêng.

### 2.1 Coding Standards & Patterns
| Skill | Mô tả |
|-------|-------|
| `coding-standards/` | Best practices cho từng ngôn ngữ |
| `backend-patterns/` | API design, database, caching patterns |
| `frontend-patterns/` | React, Next.js patterns |
| `golang-patterns/` | Go idioms |
| `python-patterns/` | Python idioms |
| `django-patterns/` | Django models, views, forms |
| `springboot-patterns/` | Java Spring Boot |
| `postgres-patterns/` | PostgreSQL optimization |
| `jpa-patterns/` | JPA/Hibernate patterns |
| `cpp-coding-standards/` | C++ Core Guidelines |

### 2.2 Testing & Verification
| Skill | Mô tả |
|-------|-------|
| `tdd-workflow/` | Red → Green → Refactor methodology |
| `verification-loop/` | Continuous verification — AI tự verify output |
| `eval-harness/` | Checkpoint vs continuous evals, pass@k metrics |
| `e2e-testing/` | Playwright E2E, Page Object Model |
| `golang-testing/` | Go testing, TDD, benchmarks |
| `python-testing/` | pytest patterns |
| `django-tdd/` | Django TDD |
| `springboot-tdd/` | Spring Boot TDD |
| `cpp-testing/` | C++ GoogleTest, CMake/CTest |

### 2.3 Security
| Skill | Mô tả |
|-------|-------|
| `security-review/` | Security checklist |
| `security-scan/` | AgentShield integration — chạy scanner trực tiếp từ Claude Code |
| `django-security/` | Django-specific security |
| `springboot-security/` | Spring Boot security |

### 2.4 Learning & Memory
| Skill | Mô tả |
|-------|-------|
| `continuous-learning/` | Auto-extract patterns từ sessions thành skills |
| `continuous-learning-v2/` | **Instinct-based learning** — confidence scoring, import/export, evolution |
| `iterative-retrieval/` | Progressive context refinement cho subagents |
| `strategic-compact/` | Gợi ý khi nào nên compact context |

### 2.5 Business & Content *(MỚI — rất relevant cho Tuan)*
| Skill | Mô tả |
|-------|-------|
| `article-writing/` | Long-form writing giữ voice thật, không generic AI tone |
| `content-engine/` | Multi-platform social content + repurposing workflows |
| `market-research/` | Source-attributed market, competitor, investor research |
| `investor-materials/` | Pitch decks, one-pagers, memos, financial models |
| `investor-outreach/` | Personalized fundraising outreach |
| `frontend-slides/` | HTML presentation builder, PPTX conversion |

### 2.6 DevOps & Infrastructure
| Skill | Mô tả |
|-------|-------|
| `database-migrations/` | Migration patterns (Prisma, Drizzle, Django, Go) |
| `api-design/` | REST API design, pagination, error responses |
| `deployment-patterns/` | CI/CD, Docker, health checks, rollbacks |
| `docker-patterns/` | Docker Compose, networking, volumes, security |

### 2.7 Advanced AI/Code Patterns
| Skill | Mô tả |
|-------|-------|
| `cost-aware-llm-pipeline/` | LLM cost optimization, model routing, budget tracking |
| `regex-vs-llm-structured-text/` | Framework quyết định: regex vs LLM cho text parsing |
| `content-hash-cache-pattern/` | SHA-256 content hash caching cho file processing |
| `search-first/` | Research-before-coding workflow |
| `skill-stocktake/` | Audit skills + commands cho quality |
| `autonomous-loops/` | Sequential pipelines, PR loops, DAG orchestration |
| `plankton-code-quality/` | Write-time code quality enforcement |

### 2.8 Swift/Apple *(Niche)*
| Skill | Mô tả |
|-------|-------|
| `swift-actor-persistence/` | Thread-safe Swift data persistence |
| `swift-protocol-di-testing/` | Protocol-based DI cho testable Swift |
| `swift-concurrency-6-2/` | Swift 6.2 Approachable Concurrency |
| `liquid-glass-design/` | iOS 26 Liquid Glass design system |
| `foundation-models-on-device/` | Apple on-device LLM |

---

## 3. ⚡ COMMANDS — 40+ Slash Commands

Commands là quick-execution triggers — gõ `/command` trong Claude Code để kích hoạt workflow.

### Core Commands
| Command | Mô tả |
|---------|-------|
| `/plan` | Lập kế hoạch implementation cho feature |
| `/tdd` | Chạy TDD workflow |
| `/code-review` | Quality review |
| `/build-fix` | Fix build errors |
| `/refactor-clean` | Dọn dead code |
| `/e2e` | Generate E2E tests |
| `/verify` | Chạy verification loop |
| `/checkpoint` | Save verification state |

### Learning Commands
| Command | Mô tả |
|---------|-------|
| `/learn` | Extract patterns giữa session |
| `/learn-eval` | Extract, evaluate, save patterns |
| `/instinct-status` | Xem instincts đã học + confidence score |
| `/instinct-import` | Import instincts từ người khác |
| `/instinct-export` | Export instincts để share |
| `/evolve` | Cluster related instincts thành skills |
| `/skill-create` | Generate skills từ git history |

### Multi-Agent Orchestration
| Command | Mô tả |
|---------|-------|
| `/orchestrate` | Multi-agent coordination |
| `/multi-plan` | Decompose tasks cho nhiều agents |
| `/multi-execute` | Chạy orchestrated multi-agent workflows |
| `/multi-backend` | Backend multi-service orchestration |
| `/multi-frontend` | Frontend multi-service orchestration |
| `/multi-workflow` | General multi-service workflows |
| `/pm2` | PM2 service lifecycle management |

### Utility Commands
| Command | Mô tả |
|---------|-------|
| `/sessions` | Session history management |
| `/eval` | Evaluate against criteria |
| `/test-coverage` | Test coverage analysis |
| `/update-docs` | Update documentation |
| `/update-codemaps` | Update codemaps |
| `/setup-pm` | Configure package manager |
| `/go-review`, `/go-test`, `/go-build` | Go-specific |
| `/python-review` | Python code review |
| `/security-scan` | Run AgentShield |

### Harness Commands *(v1.8.0)*
| Command | Mô tả |
|---------|-------|
| `/harness-audit` | Audit harness performance |
| `/loop-start` | Start verification loop |
| `/loop-status` | Check loop status |
| `/quality-gate` | Run quality gate checks |
| `/model-route` | Smart model routing |

---

## 4. 📏 RULES — Always-Follow Guidelines

Rules là files luôn được inject vào Claude Code context. Cấu trúc modular theo ngôn ngữ:

```
rules/
├── common/           # Language-agnostic
│   ├── coding-style.md    → Immutability, file organization
│   ├── git-workflow.md    → Commit format, PR process
│   ├── testing.md         → TDD, 80% coverage requirement
│   ├── performance.md     → Model selection, context management
│   ├── patterns.md        → Design patterns, skeleton projects
│   ├── hooks.md           → Hook architecture, TodoWrite
│   ├── agents.md          → When to delegate to subagents
│   └── security.md        → Mandatory security checks
├── typescript/       # TS/JS specific rules
├── python/           # Python specific rules
└── golang/           # Go specific rules
```

**Cài đặt chọn lọc:** Chỉ install ngôn ngữ bạn dùng → tiết kiệm context.

---

## 5. 🪝 HOOKS — Event-Triggered Automations

Hooks là scripts chạy tự động khi Claude Code thực hiện tool calls. Được viết lại bằng Node.js cho cross-platform compatibility.

### Hook Types
| Hook | Trigger | Mô tả |
|------|---------|-------|
| **SessionStart** | Claude Code bắt đầu | Load context, restore memory |
| **PreToolUse** | Trước khi Claude dùng tool | Validate, warn, block |
| **PostToolUse** | Sau khi Claude dùng tool | Typecheck, lint, log |
| **Stop** | Claude Code kết thúc | Save session summary, export state |
| **PreCompact** | Trước khi compact context | Save state trước khi compress |

### Hook Scripts (scripts/hooks/)
| Script | Chức năng |
|--------|----------|
| `session-start.js` | Load context khi session bắt đầu |
| `session-end.js` | Save state khi session kết thúc |
| `pre-compact.js` | Save state trước compaction |
| `suggest-compact.js` | Gợi ý strategic compaction |
| `evaluate-session.js` | Extract patterns từ session |

### Hook Runtime Controls
```bash
# Chọn mức strictness
export ECC_HOOK_PROFILE=minimal|standard|strict

# Disable specific hooks
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"
```

### Memory Persistence Hooks
**Problem:** Claude Code mất memory mỗi session.
**Solution:** Hooks tự động save/load context qua sessions.
```
SessionStart → load memory.md + context files
Stop → save session summary → memory.md
```

---

## 6. 🔌 MCP CONFIGS — External Service Connections

Pre-configured MCP server definitions cho các dịch vụ phổ biến:

| Service | Mô tả |
|---------|-------|
| GitHub | Repo management, PR operations |
| Supabase | Database, auth, storage |
| Vercel | Deployment, environment |
| Railway | Cloud deployment |
| *Others* | Thêm tùy nhu cầu |

File: `mcp-configs/mcp-servers.json` — copy vào `~/.claude.json`

---

## 7. 📝 CONTEXTS — Dynamic System Prompt Injection

3 context modes có thể switch giữa các sessions:

| Context | File | Mô tả |
|---------|------|-------|
| **Development** | `dev.md` | Chế độ build — focus code quality |
| **Code Review** | `review.md` | Chế độ review — focus bugs, security |
| **Research** | `research.md` | Chế độ research — focus exploration |

---

## 8. 🛡️ AGENTSHIELD — Security Scanner

Built tại hackathon Anthropic. **Riêng biệt nhưng tích hợp với ECC.**

**Scan:** CLAUDE.md, settings.json, MCP configs, hooks, agents, skills
**5 categories:** Secret detection (14 patterns), permission auditing, hook injection analysis, MCP server risk profiling, agent config review

```bash
# Quick scan
npx ecc-agentshield scan

# Auto-fix safe issues
npx ecc-agentshield scan --fix

# Deep analysis — 3 Opus agents (red team / blue team / auditor)
npx ecc-agentshield scan --opus --stream
```

**Red team / Blue team architecture:**
1. **Attacker agent** — tìm exploit chains
2. **Defender agent** — đánh giá protections
3. **Auditor agent** — synthesize thành prioritized risk assessment

Output: Terminal (color-graded A–F), JSON (CI), Markdown, HTML
Exit code 2 on critical → tích hợp CI/CD build gates

**Stats:** 1282 tests, 98% coverage, 102 static analysis rules

---

## 9. 🧠 CONTINUOUS LEARNING V2 — Instinct-Based Learning

Hệ thống tự học patterns từ sessions. **Đây là tính năng unique nhất của ECC.**

### Workflow:
```
Session → /learn-eval → Extract patterns → Score confidence → Save as instinct
                                                                    ↓
Multiple instincts accumulated → /evolve → Cluster → New skill created
                                                                    ↓
/instinct-export → Share with team → /instinct-import → Team learns together
```

### Key concepts:
- **Instinct:** Một pattern đã học + confidence score (0–1)
- **Confidence scoring:** Instinct mạnh dần khi lặp lại nhiều lần
- **Evolution:** Instincts liên quan được cluster thành skills mới
- **Import/Export:** Share instincts giữa team members

---

## 10. 📚 EXAMPLES — Real-World Configurations

| Example | Tech Stack |
|---------|-----------|
| `CLAUDE.md` | General project config |
| `user-CLAUDE.md` | User-level config |
| `saas-nextjs-CLAUDE.md` | Next.js + Supabase + Stripe SaaS |
| `go-microservice-CLAUDE.md` | Go gRPC + PostgreSQL microservice |
| `django-api-CLAUDE.md` | Django REST API + Celery |
| `rust-api-CLAUDE.md` | Rust Axum + SQLx + PostgreSQL |

---

## 11. 🔬 PLANKTON — Write-Time Code Quality

Companion tool (by @alxfazio). Chạy formatters + 20+ linters trên **mỗi file edit** via PostToolUse hooks.

**3-phase architecture:**
1. Auto-format silently (40–50% issues)
2. Collect remaining violations as structured JSON
3. Delegate fixes to subprocess (Haiku/Sonnet/Opus by complexity)

Includes **config protection hooks** — prevent agents from modifying linter configs instead of fixing code.

---

## 12. 🧩 NANOCLAW V2 *(v1.8.0)*

Model routing + skill hot-load + session management:
- Model routing (Haiku/Sonnet/Opus by task)
- Skill hot-load (load skills on demand)
- Session branch/search/export/compact/metrics

---

## KEY STATS

| Metric | Value |
|--------|-------|
| Stars | 50,000+ |
| Forks | 6,000+ |
| Contributors | 30+ |
| Internal tests | 997 passing |
| Languages | 6 (TS, Python, Go, Java, C++, Swift) |
| Agents | 16 |
| Skills | 65+ |
| Commands | 40+ |
| License | MIT |
| Version | v1.8.0 (March 2026) |
| AgentShield tests | 1,282 |
| AgentShield rules | 102 |
| Platforms | Claude Code, Codex, Cursor, OpenCode, Antigravity |
