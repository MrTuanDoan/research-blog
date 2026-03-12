# Chain of Thought Analysis

## Task
Create a Claude Code Skill specifically for writing HOOKS from provided content

## Context
Based on Callaway's "4 Hook Mistakes" framework:
- Hooks need: Topic Clarity + On-Target Curiosity
- 4 Mistakes: Delay, Confusion, Irrelevance, Disinterest
- Key technique: Contrast (Stated vs Implied)

## Question
How to structure a Claude Skill that takes any content and generates effective hooks?

---

## Step-by-Step Reasoning

### Step 1: Define Skill Purpose
- **Input:** Any content (article, video idea, product, topic)
- **Output:** Multiple hook variations following Callaway's framework
- **Use Case:** Content creators writing hooks for social media videos

### Step 2: Identify Core Components

From the video framework:
1. **Topic Clarity** — What the video is about (first sentence)
2. **Contrast** — A vs B (stated or implied)
3. **You/Your Language** — Targeted to viewer, not "I/my"
4. **Pain Point** — Agitate a problem they have
5. **Curiosity Loop** — Open a question they need answered

### Step 3: Design Skill Structure

```
hook-writer/
├── SKILL.md          # Main instructions
├── templates/
│   ├── hook-types.md     # Different hook formats
│   └── contrast-guide.md # How to create contrast
├── examples/
│   └── good-bad-hooks.md # Before/after examples
└── outputs/
    └── (generated hooks go here)
```

### Step 4: Define Hook Generation Process

```
1. EXTRACT from input:
   - Core topic
   - Target audience
   - Main pain point
   - Key value/solution
   - Contrarian angle (what's different)

2. GENERATE hooks using:
   - The 4-part formula: Clarity + Relevance + Contrast + Curiosity
   - Multiple formats (direct, question, contrast, story)
   - You/Your language check

3. VALIDATE against checklist:
   - Topic clear in first 1-2 seconds? ✅
   - No vague pronouns? ✅
   - You/Your focused? ✅
   - Pain point addressed? ✅
   - Contrast present? ✅
   - Curiosity loop opened? ✅
```

### Step 5: Hook Types to Generate

1. **Direct Statement Hook** — Bold claim + contrast
2. **Question Hook** — Targeted question + implied contrast  
3. **If-Then Hook** — "If you [pain point], then [solution]"
4. **Contrast Hook** — Explicit A vs B
5. **Story Tease Hook** — Setup + mystery

---

## Confidence Level
- Framework accuracy: **95%** (directly from video)
- Skill structure: **90%** (follows OpenClaw conventions)
- Hook quality depends on user input: **80%**
