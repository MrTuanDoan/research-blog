# COT: Feynman Learning Coach → OpenClaw Skill Design

**Date:** 2026-03-17
**Question:** How to transform the Feynman Learning Coach prompt into a reusable OpenClaw/Claude skill?

---

## Step 1: Decompose the Feynman Technique into Skill Components

The original prompt has 5 core mechanics:

1. **Assess** — Ask topic + level → establish baseline
2. **Simplify** — Explain using 12-year-old language + analogies
3. **Gap Analysis** — Identify confusion points, ask targeted questions
4. **Iterative Refinement** — 2-3 cycles of re-explain → refine → deepen
5. **Mastery Test** — User teaches back, applies to new scenarios, produces "teaching note"

### What's skill-worthy vs what's just prompting?

| Component | Skill-worthy? | Why |
|-----------|--------------|-----|
| Assess baseline | Yes | Structured intake prevents skipping |
| Simplify with analogies | Partially | Claude already does this, but constraints (12-year-old test, no jargon) need enforcement |
| Gap Analysis | Yes | Specific questioning patterns are procedural knowledge |
| Iterative Refinement | Yes | The cycle structure is the core value — without it, Claude gives one explanation and stops |
| Mastery Test | Yes | Most users never test their understanding — forcing this is the skill's unique value |

### Key insight: The skill's real value is the **iterative cycle enforcement**

Without the skill, Claude gives one good explanation and moves on. The Feynman method's power is the iteration — explaining, finding gaps, re-explaining. The skill must enforce this loop.

---

## Step 2: Skill Architecture Decision

**Option A:** Single SKILL.md with full workflow
- Pros: Simple, one file
- Cons: Could get long with examples

**Option B:** SKILL.md + references for different domains
- Pros: Modular
- Cons: Overkill — this skill is domain-agnostic

**Decision: Option A** — The Feynman technique is domain-agnostic. One lean SKILL.md with clear phase instructions. No scripts needed (it's conversational). No assets needed.

---

## Step 3: Trigger Design

When should this skill activate?
- User says "explain X using Feynman method"
- User says "teach me X like I'm 12"
- User says "help me really understand X"
- User says "Feynman technique for X"
- User says "break down X simply"
- `/feynman <topic>`

**Description must cover:** learning, teaching, Feynman technique, simplification, deep understanding, iterative explanation, mastery testing.

---

## Step 4: Differentiation from Generic Claude

What does this skill add that Claude doesn't do by default?

1. **Forced iteration** — Claude typically gives one answer. Skill enforces 2-3 refinement rounds.
2. **Structured phases** — Not freeform chat. Each phase has entry/exit criteria.
3. **Mastery validation** — User must demonstrate understanding before skill considers task complete.
4. **Analogy-first constraint** — Every explanation starts with analogy, not definition.
5. **Gap hunting** — Active questioning to find what user *thinks* they know but don't.

---

## Step 5: Output Format

The skill should produce a final "Teaching Note" artifact:
```
## Teaching Note: [Topic]
**Analogy:** Think of [concept] like [analogy]...
**Key Insight:** [one sentence core understanding]
**Common Trap:** [misconception to avoid]
**Memory Anchor:** [visual/phrase for retention]
**12-Year-Old Test:** [can you explain this to a kid? summary]
```

---

## Step 6: Integration with Writing Skills

After mastery is achieved, the deep understanding can feed into:
- X.com thread writing (concise, punchy, hook-driven)
- Blog post (longer form, structured)
- Teaching content

**For X.com article about "AI Agentic Era":**
- Use Feynman skill to build deep understanding first
- Then use a writing skill (hook-writing exists in workspace!) to craft the X post
- The hook-writing skill at `skills/hook-writing/` is perfect for X.com content

---

## Conclusion

Build `feynman-learning-coach` skill with:
- Single SKILL.md, no bundled resources
- 5 phases: Assess → Simplify → Gap Hunt → Refine (x2-3) → Mastery Test
- Final artifact: Teaching Note
- Trigger on: Feynman, deep learning, teach-me-like-12, simplify concepts
- Then chain with hook-writing skill for X.com output
