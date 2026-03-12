# Story-Team Pipeline Analysis & Optimization

**Date:** 2026-02-23  
**Purpose:** Phân tích API calls trong toàn bộ pipeline và đề xuất tối ưu

---

## 📊 Current Pipeline Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    STORY CREATION PIPELINE                        │
│                                                                   │
│  Phase 1: BRIEF → Phase 2: WRITE → Phase 3: REVIEW → Phase 4: REVISE → Phase 5: OUTPUT
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📈 API Calls Analysis (Current State)

### Phase 1: Brief Creation
| Step | Tool | Purpose | Calls |
|------|------|---------|-------|
| - | - | User provides brief | 0 |
| **Subtotal** | | | **0** |

### Phase 2: Story Writing (Draft)
| Step | Tool | Purpose | Calls |
|------|------|---------|-------|
| 1 | read | brand.md | 1 |
| 2 | read | audience.md | 1 |
| 3 | read | storytelling-framework.md | 1 |
| 4 | read | story-writer SKILL.md | 1 |
| 5 | read | example stories (optional) | 0-2 |
| 6 | exec | mkdir + Get-Date | 1 |
| 7 | write | draft.md | 1 |
| 8 | exec | git commit + push | 1 |
| **Subtotal** | | | **7-9** |

### Phase 3: Review (Original - 3 separate reviews)
| Step | Tool | Purpose | Calls |
|------|------|---------|-------|
| 1 | read | reader-reviewer SKILL.md | 1 |
| 2 | read | critic-reviewer SKILL.md | 1 |
| 3 | read | audio-reviewer SKILL.md | 1 |
| 4 | read | draft.md | 1 |
| 5 | write | reader-review.md | 1 |
| 6 | write | critic-review.md | 1 |
| 7 | write | audio-review.md | 1 |
| 8 | exec | git commit + push | 1 |
| **Subtotal** | | | **8** |

### Phase 4: Revision
| Step | Tool | Purpose | Calls |
|------|------|---------|-------|
| 1 | read | draft.md | 1 |
| 2 | read | reviews (3 files or 1) | 1-3 |
| 3 | read | story-writer SKILL.md | 1 |
| 4 | write | final.md | 1 |
| 5 | exec | git commit + push | 1 |
| **Subtotal** | | | **5-7** |

### Phase 5: Output/Publish
| Step | Tool | Purpose | Calls |
|------|------|---------|-------|
| - | - | (Already saved in Phase 4) | 0 |
| **Subtotal** | | | **0** |

---

## 📊 Total API Calls Summary (Current)

| Phase | Min | Max | Avg |
|-------|-----|-----|-----|
| Phase 1: Brief | 0 | 0 | 0 |
| Phase 2: Write | 7 | 9 | 8 |
| Phase 3: Review | 8 | 8 | 8 |
| Phase 4: Revise | 5 | 7 | 6 |
| Phase 5: Output | 0 | 0 | 0 |
| **TOTAL** | **20** | **24** | **22** |

---

## 🔍 Inefficiency Analysis

### 1. Redundant Context Reads
**Problem:** Mỗi phase đọc lại context files (brand.md, framework.md, etc.)

| File | Read in Phase 2 | Read in Phase 3 | Read in Phase 4 | Total |
|------|-----------------|-----------------|-----------------|-------|
| brand.md | ✅ | (implicit) | ✅ | 2x |
| framework.md | ✅ | (implicit) | ✅ | 2x |
| story-writer SKILL.md | ✅ | - | ✅ | 2x |
| reviewer SKILLs | - | ✅✅✅ | - | 3x |

**Waste:** ~5-6 redundant reads

### 2. Sequential Writes
**Problem:** Viết 3 review files riêng lẻ thay vì 1 consolidated file

**Waste:** 2 extra write calls

### 3. Multiple Git Commits
**Problem:** Mỗi phase có 1 git commit riêng

| Phase | Git Commits |
|-------|-------------|
| Phase 2 | 1 |
| Phase 3 | 1 |
| Phase 4 | 1 |
| **Total** | 3 |

**Could be:** 1 commit cuối cùng (hoặc 2 nếu cần checkpoint)

### 4. Non-Parallel Reads
**Problem:** Đọc files tuần tự thay vì parallel

---

## 🚀 Optimization Strategies

### Strategy 1: Context Caching (Session-Level)

**Concept:** Đọc tất cả context 1 lần đầu session, cache trong memory.

**Implementation:**
```markdown
## Session Init (1 time)
Parallel read:
- brand.md
- audience.md  
- storytelling-framework.md
- story-writer SKILL.md
- reader-reviewer SKILL.md
- critic-reviewer SKILL.md
- audio-reviewer SKILL.md

→ 7 reads (parallel) = 1 round
→ Cache in context for entire session
```

**Savings:** 
- Phase 2: -4 reads
- Phase 3: -3 reads
- Phase 4: -2 reads
- **Total: -9 reads**

### Strategy 2: Consolidated Files

**Concept:** Gộp nhiều files nhỏ thành 1 file lớn.

| Before | After |
|--------|-------|
| reader-review.md | reviews.md (combined) |
| critic-review.md | ↑ |
| audio-review.md | ↑ |

**Already implemented!** ✅ (Giải pháp 3 từ trước)

**Savings:** -2 writes

### Strategy 3: Batch Git Commits

**Concept:** Chỉ commit 1-2 lần cho toàn bộ pipeline.

| Before | After |
|--------|-------|
| Commit after draft | Skip |
| Commit after review | Skip |
| Commit after final | ✅ Final commit |

**Savings:** -2 exec calls

### Strategy 4: Parallel Operations

**Concept:** Gộp các read/write độc lập vào 1 round.

```
Round 1: Parallel read [context files] ← Session init
Round 2: Write draft.md
Round 3: Write reviews.md
Round 4: Write final.md + git commit
```

### Strategy 5: Single-File Context Bundle

**Concept:** Tạo 1 file `context-bundle.md` chứa tất cả context.

```markdown
# context-bundle.md

## Brand Voice
[content from brand.md]

## Audience
[content from audience.md]

## Framework
[content from storytelling-framework.md]

## Skills
### Story Writer
[content]
### Reader Reviewer
[content]
### Critic Reviewer
[content]
### Audio Reviewer
[content]
```

**Savings:** 7 reads → 1 read

---

## 📊 Optimized Pipeline

### New Phase Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                 OPTIMIZED STORY PIPELINE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────┐                                             │
│  │ SESSION INIT   │  Read context-bundle.md (1 read)            │
│  └───────┬────────┘                                             │
│          │ Cached in context                                    │
│          ▼                                                      │
│  ┌────────────────┐                                             │
│  │ WRITE DRAFT    │  Write draft.md (1 write)                   │
│  └───────┬────────┘                                             │
│          │                                                      │
│          ▼                                                      │
│  ┌────────────────┐                                             │
│  │ REVIEW         │  Read draft + Write reviews.md (2 calls)    │
│  └───────┬────────┘                                             │
│          │                                                      │
│          ▼                                                      │
│  ┌────────────────┐                                             │
│  │ REVISE & SAVE  │  Read draft+reviews + Write final.md        │
│  │                │  + Git commit (3 calls)                     │
│  └────────────────┘                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Optimized API Calls

| Phase | Tool | Purpose | Calls |
|-------|------|---------|-------|
| **Init** | read | context-bundle.md | 1 |
| **Write** | write | draft.md | 1 |
| **Review** | read | draft.md | 1 |
| **Review** | write | reviews.md | 1 |
| **Revise** | read | draft.md + reviews.md | 2* |
| **Revise** | write | final.md | 1 |
| **Commit** | exec | git add + commit + push | 1 |
| **TOTAL** | | | **8** |

*Can be parallel read = 1 round

### Comparison

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total API Calls | 22 | 8 | **63.6% reduction** |
| Read calls | 14 | 4 | **71.4% reduction** |
| Write calls | 5 | 3 | **40% reduction** |
| Exec calls | 3 | 1 | **66.7% reduction** |

---

## 📁 Implementation: context-bundle.md

**Location:** `story-team/context-bundle.md`

**Content structure:**
```markdown
# Story Team Context Bundle

> This file consolidates all context needed for story creation.
> Read once per session, use throughout.

---

## 1. Brand Voice

[Full content from brand.md]

---

## 2. Target Audience

[Full content from audience.md]

---

## 3. Storytelling Framework

[Full content from storytelling-framework.md]

---

## 4. Story Writer Skill

[Full content from story-writer/SKILL.md]

---

## 5. Reader Reviewer Skill

[Full content from reader-reviewer/SKILL.md]

---

## 6. Critic Reviewer Skill

[Full content from critic-reviewer/SKILL.md]

---

## 7. Audio Reviewer Skill

[Full content from audio-reviewer/SKILL.md]

---

*Last updated: YYYY-MM-DD*
```

---

## 📝 Updated Workflows

### Workflow: Full Pipeline (8 API calls)

```markdown
### Story Creation (OPTIMIZED: 8 API calls)

**Phase 0: Session Init** (1 call - can skip if cached)
1. read context-bundle.md

**Phase 1: Write Draft** (1 call)
2. write draft.md

**Phase 2: Review** (2 calls)
3. read draft.md
4. write reviews.md (consolidated)

**Phase 3: Revise & Save** (3-4 calls)
5. read draft.md + reviews.md (parallel = 1 round, 2 calls)
6. write final.md
7. exec: git add . && git commit && git push
```

### Workflow: Review Only (3 API calls)

```markdown
### Review Story (OPTIMIZED: 3 API calls)

1. read draft.md
2. write reviews.md
3. exec git push
```

### Workflow: Write Only (2 API calls)

```markdown
### Write Draft (OPTIMIZED: 2 API calls)

1. write draft.md
2. exec git push (optional, can batch later)
```

---

## 🔧 Action Items

1. **[DONE]** Consolidated reviews.md format
2. **[TODO]** Create context-bundle.md
3. **[TODO]** Update AGENTS.md with optimized workflows
4. **[TODO]** Add session init to HEARTBEAT.md (pre-load context)

---

## Summary

| Optimization | Savings | Status |
|--------------|---------|--------|
| Consolidated reviews | -2 writes | ✅ Done |
| Context bundle | -6 reads | 📋 Todo |
| Batch git commits | -2 exec | 📋 Todo |
| Parallel reads | -0 (latency only) | 📋 Todo |
| **Total Potential** | **63.6%** | |

**Before:** 22 API calls for full pipeline  
**After:** 8 API calls for full pipeline

---

*Analysis by Story-Team Pipeline Optimizer*
