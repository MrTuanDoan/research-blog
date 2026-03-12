# Chain of Thought: Build a "Writing Style DNA" Skill for Claude Code

**Date:** 2026-03-06
**Topic:** Forensic writing style analysis + voice cloning system
**Source:** Robin Delta @heyrobinai prompt framework

---

## Task
Analyze the "Forensic Style Analyst" prompt framework and determine the best architecture for turning it into a reusable Claude Code skill.

## Context
Robin Delta shared a 3-step system:
1. Paste 500+ words of target writer's style
2. Claude analyzes as a "forensic style analyst" — measures sentence rhythm, comma density, vocabulary complexity, verbal tics → outputs "Style DNA"
3. Claude writes 300 words on a new topic matching exact metrics + side-by-side accuracy comparison

The core insight: **"Style is data"** — not vibes, not adjectives. Measurable patterns.

## Question
How should this be architected as a Claude Code skill? What are the components, edge cases, and best design decisions?

---

## Step-by-Step Reasoning

### Step 1: What Makes This Work (The Core Mechanism)

The prompt works because it forces Claude to:
1. **Measure** (not describe) — quantitative metrics, not qualitative impressions
2. **Separate analysis from generation** — Style DNA first, then writing
3. **Verify accuracy** — side-by-side comparison with percentages

Most "write like X" prompts fail because they ask Claude to *describe* style. This asks Claude to *measure* style. That's the key difference.

**Metrics that matter:**
| Metric | Why It's Powerful |
|--------|------------------|
| Average sentence length (words) | Captures rhythm and pacing |
| Short sentence ratio (<8 words) | Captures punch/staccato effect |
| Comma density (per 100 words) | Reveals complex vs. simple structures |
| Vocabulary complexity | Academic vs. street-level register |
| Hedging language frequency | Confidence vs. uncertainty markers |
| Tone markers | Formal, casual, ironic, earnest |
| Verbal tics / signature phrases | The unconscious fingerprints |
| Paragraph length | Visual rhythm, breathing room |

---

### Step 2: What This Skill Needs to Do

**Core use cases:**
1. **Clone a writer** (ghost-writing, matching client voice)
2. **Analyze your own style** (understand your own DNA)
3. **Match a publication's voice** (guest posts)
4. **Learn from multiple writers** (clone 5, develop range)
5. **Style consistency checker** (does this new piece match your existing DNA?)

**Inputs:**
- Source text (500+ words minimum, more = better)
- Target topic to write about
- Optional: output length (default 300 words)
- Optional: compare two writing samples (drift detection)

**Outputs:**
- Style DNA report (all metrics)
- New content in cloned style
- Accuracy comparison (side-by-side percentages)
- Optional: Style drift alert if accuracy < 80%

---

### Step 3: Architecture Decision — Single Command vs. Multi-Step

**Option A: Single giant prompt**
- Pros: Simple, one command
- Cons: Black box, can't iterate on just the DNA or just the writing

**Option B: Three separate commands**
- `/style-analyze` → generates Style DNA only
- `/style-write` → writes new content using saved DNA
- `/style-compare` → compares two pieces for drift

**Option C: Guided workflow (Recommended)**
- One skill that runs all 3 steps sequentially
- Saves Style DNA to a `.md` file in the vault
- Can be recalled in future sessions
- Supports "style library" — save multiple writer profiles

**Decision: Option C** — guided workflow with file persistence. This is the only option that compounds over time (library of saved writer profiles).

---

### Step 4: The Style Library Concept

This is what elevates the skill from a prompt to an *infrastructure*:

```
vault/style-library/
├── robin-delta.md          ← Style DNA profile
├── paul-graham.md          ← Style DNA profile  
├── morgan-housel.md        ← Style DNA profile
├── my-own-voice.md         ← Your own analyzed style
└── client-john-smith.md    ← Ghost-writing client profile
```

When you need to write in a style: `"write in [[paul-graham]] style about [topic]"`
Claude reads the saved DNA → writes to spec → no re-analysis needed.

This is the compounding value. Analyze once. Use forever.

---

### Step 5: Edge Cases & Assumptions

| Assumption | Validity | Impact |
|------------|----------|--------|
| 500+ words = sufficient sample | Mostly true | Medium — shorter samples = less accurate |
| Metrics are universal across languages | False | Medium — English-centric metrics |
| Claude accurately measures comma density | Likely yes | High — verifiable |
| Accuracy % is mathematically precise | Partially | Medium — Claude estimates, not exact count |

**Known limitations:**
- Voice includes emotional register (harder to quantify)
- Some writers' signatures are *what* they write about, not *how*
- 300 words may not be enough to fully demonstrate style
- Accuracy comparison is Claude's self-assessment (could be generous)

---

### Step 6: What to Build

**Skill components:**
1. `SKILL.md` — trigger description + workflow instructions
2. `templates/style-dna-template.md` — the forensic analysis format
3. `templates/style-profile.md` — saved writer profile format
4. `examples/paul-graham-sample.md` — example output

**Core workflow:**
```
1. User: "Analyze [writer/paste text]"
2. Skill: Run forensic analysis → output Style DNA
3. Skill: Save to vault/style-library/[name].md
4. User: "Write about [topic] in [writer] style"
5. Skill: Load profile → generate content → accuracy report
```

---

## Conclusion

### Key Insight
This isn't just a prompt. It's a **style measurement infrastructure**. The skill's value compound through a library of saved writer profiles.

### Recommended Skill Name
`writing-style-dna` or `style-forensics`

### What Makes It Unique vs. Just Running the Prompt
1. Saves Style DNA profiles to Obsidian vault (persistent)
2. Builds a style library you can reference anytime
3. Supports accuracy drift detection over time
4. Works as a learning tool (clone 5 → understand mechanics)

### Success Criteria
- Skill fires when user says "analyze this writing style" or "write like [person]"
- Style DNA is saved to vault in structured format
- Accuracy comparison is always included in output
- Style library builds over time without manual maintenance

### Confidence Level
- Core approach works: **95%**
- File persistence adds real value: **90%**
- Style library concept is compelling: **85%**
- Accuracy % is genuinely useful: **75%** (self-assessment caveat)
