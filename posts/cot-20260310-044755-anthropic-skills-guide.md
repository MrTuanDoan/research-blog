# /cot — The Complete Guide to Building Skills for Claude (Anthropic)
**Source:** https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf
**Date:** 2026-03-10
**Model:** claude-opus-4.6

---

## Task
Deep analysis of Anthropic's official Skills guide — rút ra insights, patterns và actionable takeaways.

## Context
Official guide từ Anthropic (33 trang), published ~Jan 2026. Covers fundamentals → distribution của Claude Skills (Agent Skills standard).

---

## [STEP 1] — Core Mental Model

**Skill = folder + SKILL.md**. Đó là toàn bộ.

Structure:
```
your-skill-name/
├── SKILL.md              # Required
├── scripts/              # Optional - executable code
├── references/           # Optional - docs loaded as needed
└── assets/               # Optional - templates, etc.
```

Anthropic đang nói rằng *knowledge/workflow* có thể package được, portable, reusable — không cần explain lại trong mỗi conversation.

---

## [STEP 2] — Progressive Disclosure Architecture (Most Important)

Ba tầng:
1. **YAML frontmatter** → luôn load vào system prompt (lightweight, ≤1024 chars)
2. **SKILL.md body** → load khi Claude thấy relevant
3. **references/ files** → chỉ load khi cần

**Insight:** Architecture này tương tự lazy loading trong frontend. Token budget = CPU time. YAML frontmatter là "stub" — đủ để Claude biết *khi nào* dùng skill mà không waste tokens.

---

## [STEP 3] — The Description Field là Critical Path

```yaml
description: [WHAT it does] + [WHEN to use it (trigger phrases)]
```

Bad:  `description: Helps with projects.`
Good: `description: Manages Linear project workflows. Use when user mentions "sprint", "Linear tasks", "create tickets".`

**Insight:** Description là *classifier*. Claude dùng nó để decide whether to load the skill. Viết như writing a routing rule — specific, trigger-oriented, includes user-natural phrases.

Character limit: 1024 max.
Negative triggers: Add "Do NOT use for X (use Y skill instead)" to prevent overtriggering.

---

## [STEP 4] — MCP + Skills = Power Combo

| MCP | Skills |
|-----|--------|
| What Claude can access | How Claude should use it |
| Kitchen equipment | Recipes |
| Tool access | Workflow knowledge |

Without Skills → MCP users không biết làm gì với connection.
Without MCP → Skills chỉ dùng Claude's built-in capabilities.
Both → Real "AI-powered workflow".

**Strategic insight:** Nếu build MCP server, LUÔN bundle một Skill đi kèm. Competitive advantage.

---

## [STEP 5] — 5 Workflow Patterns

### Pattern 1: Sequential Orchestration
- Multi-step workflow theo thứ tự cố định
- Use: onboarding, setup, deployment
- Key: explicit step ordering + dependencies + validation gates + rollback

### Pattern 2: Multi-MCP Coordination
- Workflow span nhiều services
- Example: Figma → Drive → Linear → Slack (design-to-dev handoff)
- Key: clear phase separation + data passing between MCPs + centralized error handling

### Pattern 3: Iterative Refinement
- Output quality improves với iteration
- Use: report generation, document creation
- Key: validation scripts + explicit quality criteria + know when to stop

### Pattern 4: Context-Aware Tool Selection
- Same outcome, different tools depending on context
- Example: Smart file storage (large → cloud, docs → Notion, code → GitHub)
- Key: clear decision criteria + fallback options + transparency

### Pattern 5: Domain-Specific Intelligence
- Embed specialized knowledge beyond tool access
- Example: financial compliance checks before payment processing
- Key: domain expertise in logic + compliance before action + comprehensive audit trail

---

## [STEP 6] — Testing Framework

Three layers:
1. **Triggering tests**: Skill có load đúng lúc? Target: 90% on relevant queries
2. **Functional tests**: Output có đúng? Validate inputs/outputs/API calls
3. **Performance comparison**: Token count, API calls, user friction vs. baseline

**Pro tip:** Iterate on *one* hard task first, find winning approach, then extract to skill. Leverage in-context learning before generalizing.

---

## [STEP 7] — Technical Rules (Easy to Miss)

- `SKILL.md` — exact case, no variations
- Folder name: kebab-case only (no spaces, no caps, no underscores)
- No `README.md` inside skill folder (README goes at repo level only)
- No XML tags `< >` in frontmatter (security restriction)
- No `claude` or `anthropic` in skill name (reserved)
- Keep SKILL.md under 5,000 words
- `allowed-tools` field: restrict what tools skill can use
- `compatibility` field: specify environment requirements

---

## [STEP 8] — Distribution

Current model (Jan 2026):
- Individual: Upload zip to Claude.ai Settings > Capabilities > Skills
- Org-level: Admin deploys workspace-wide (shipped Dec 18, 2025)
- API: `/v1/skills` endpoint + `container.skills` parameter in Messages API
- Requires Code Execution Tool beta for API usage

Open standard → skills should work across AI platforms (not just Claude).

---

## Actionable Takeaways cho Tuan

### ClawNano2
Nếu expose Chrome extension như MCP → build Skill đi kèm:
```yaml
name: clawnano2-request-capture
description: Capture, filter, and replay HTTP requests using ClawNano2. 
  Use when user wants to intercept network traffic, save API requests, 
  batch replay with CSV, or set up request templates.
```

### 4C Intelligence Stack
Package các persona thành Skills:
- `researcher` skill: trigger on "research X", "find sources", "deep dive"
- `creator` skill: trigger on "create content", "write post", "draft"
- `middleman` skill: trigger on "negotiate", "facilitate", "coordinate"
→ Thay vì hardcode vào system prompt, modular + reusable

### Facebook Management Skill
Review lại `skills/facebook-human-browsing/` description field:
- Thêm specific trigger phrases: "browse Facebook", "curate Facebook content", "find trending posts"
- Thêm negative trigger: "Do NOT use for posting or direct interaction"

### OpenClaw Skills hiện có
- Add `compatibility` field to all skills
- Review description fields → ensure WHAT + WHEN both present
- Check SKILL.md sizes → keep under 5,000 words
- Consider `allowed-tools` restrictions for security

---

## Summary

Skills là Anthropic's bet rằng *packaged expertise* sẽ trở thành currency của AI ecosystem. Giống như npm packages cho code, Skills packages cho workflows. Ai build tốt nhất, distribute rộng nhất, refine nhanh nhất sẽ win.

Key formula: **Tight description + Clear steps + Error handling + Validation = Reliable skill**
