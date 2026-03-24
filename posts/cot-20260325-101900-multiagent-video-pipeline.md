# COT: Multi-Agent Video Pipeline — Architecture & Optimal Prompt Strategy
**Date:** 2026-03-25 10:19 (Sydney)
**Slug:** cot-20260325-101900-multiagent-video-pipeline
**Question:** What is the optimal architecture and prompt strategy for orchestrating a multi-agent video production workflow on OpenClaw?

---

## INPUT: The Shared Workflow

Tuan's system:
```
User says: "làm 10 short video con chó"
→ OpenClaw spins up 10 parallel pipelines
→ Each pipeline: Director → Producer → QA → Engineer
→ All decisions via LLM
→ Stack: Claude CLI (Max plan), Veo3 Ultra, Veogent CLI, DigitalOcean VPS
→ Meta-principle: build skill → OpenClaw builds the tool → OpenClaw uses the tool
```

---

## STEP 1: WHAT KIND OF PROBLEM IS THIS?

**Surface question:** How to prompt a multi-agent video system?

**Deeper question:** There are actually THREE separate problems here:

1. **Prompt design problem** — What prompt activates the Director into a structured plan?
2. **Architecture problem** — How do agents hand off work without losing context?
3. **Meta-system problem** — How do you build a system that improves itself over time?

All three need solving. Most people only solve #1 and wonder why the system breaks.

---

## STEP 2: ANATOMY OF THE WORKFLOW

### The 4 agents and what they actually OWN:

```
DIRECTOR
  Owns: creative vision + pipeline coordination + conflict resolution
  Does NOT own: generation, evaluation, assembly
  Key behavior: decomposes ONE request → N distinct concepts
  Output artifact: production-plan.json

PRODUCER
  Owns: image generation + video generation + self-review
  Does NOT own: concept decisions, quality evaluation
  Key behavior: executes one concept through image→video pipeline
  Output artifact: raw-video-{id}.mp4

QA
  Owns: quality evaluation against known failure rules
  Does NOT own: fixing, regenerating, deciding how to fix
  Key behavior: report exactly what failed + severity — nothing more
  Output artifact: qa-report-{id}.json

ENGINEER
  Owns: selection + assembly of best segments
  Does NOT own: generation, evaluation
  Key behavior: LLM-scores each 3s segment → selects top → assembles
  Output artifact: final-cut-{id}.mp4
```

### The 4 control loops:

```
LOOP A (happy path):  Producer → QA → PASS → Engineer → done
LOOP B (fix):         Producer → QA → FAIL → Producer regenerate → QA
LOOP C (escalate):    Producer hit retry limit → Director replan → Producer
LOOP D (boss):        Director hit replan limit → human decision via Telegram
```

### Why most multi-agent systems break:

1. **No role isolation** → Producer starts making QA decisions
2. **No retry limits** → infinite loops
3. **No structured handoff artifacts** → agent B doesn't know what agent A decided
4. **Serial execution** → 10 pipelines take 10x longer than necessary
5. **No memory across retries** → Producer makes the same mistake 3x in a row

---

## STEP 3: THE OPTIMAL PROMPT — WHY "PLAN MODE" IS THE KEY

The meta-insight: **the first prompt determines everything that follows.**

If the Director prompt says "make dog videos," the LLM invents the workflow.
If the Director prompt says "output a JSON plan that encodes 10 parallel production contracts," the workflow is locked in before any generation happens.

### What Plan Mode must achieve:
1. Produce a machine-readable artifact (production-plan.json)
2. Guarantee diversity across N concepts (no duplicates in tone × setting)
3. Pre-load QA context per concept (which rules to watch — reduces QA compute)
4. Enable direct translation to `sessions_spawn()` calls (parallelism)
5. Encode identity anchors in every image_prompt (prevents #1 failure: subject drift)

### The Optimal Director Prompt:

```
You are the Director in a multi-agent video production system on OpenClaw.

REQUEST: "{user_request}"

MODE: PLAN ONLY — do not generate images or videos.

OUTPUT: A single valid JSON object. No prose before or after.

SCHEMA:
{
  "request_id": "string",
  "total_pipelines": integer,
  "parallel_execution": true,
  "pipelines": [
    {
      "id": "video-01",
      "concept": "one-sentence description of what happens",
      "emotional_tone": "joyful|playful|heartwarming|dramatic|calm|funny|curious",
      "setting": "location + time of day + weather if relevant",
      "subject_anchor": {
        "species": "dog",
        "breed": "explicit breed name — no generic 'dog'",
        "coat": "color + texture + markings",
        "distinguishing_mark": "one unique feature (e.g. 'white patch on left ear')"
      },
      "image_prompt": "full prompt for base reference image generation",
      "video_prompt": "full Veo3 prompt with: [camera] [subject] [action] [environment] [mood]",
      "duration_s": 15-30,
      "qa_focus_rules": ["R01", "R02"],
      "director_notes": "anything Producer should know"
    }
  ],
  "shared_assets": [],
  "director_intent": "overall creative vision for the set"
}

DIVERSITY CONSTRAINTS:
- No two pipelines may share the same emotional_tone + setting combination
- At minimum: 5 distinct emotional tones, 4 distinct setting types
- At minimum: 3 distinct dog breeds
- At minimum: 2 unexpected/unusual dog-human interaction concepts

SUBJECT ANCHOR RULES (critical — prevents subject drift):
- Every image_prompt must start with: "[breed], [coat_color], [distinguishing_mark]"
- Every video_prompt must reference the same anchor in the first sentence
- Consistency between image_prompt and video_prompt is mandatory

VIDEO PROMPT STRUCTURE (mandatory format for every video_prompt):
  Camera: [movement] starting on [framing]
  Subject: [subject_anchor repeated]
  Action: [beat 1] → [beat 2] → [beat 3]
  Environment: [location], [lighting], [atmosphere]
  Mood: [emotional quality of the motion]

QA PRELOAD: For each pipeline, assign qa_focus_rules based on concept risk:
  - Fast action / motion → R02 (limb anomalies), R06 (motion blur)
  - Close-up face → R07 (face/eye anomalies)
  - Multiple subjects → R08 (subject duplication)
  - Dynamic environment → R04 (background continuity)
  - All animal subjects → R01 (identity drift) mandatory
```

---

## STEP 4: THE PRODUCER PROMPT (executes one pipeline)

```
You are the Producer in a multi-agent video pipeline on OpenClaw.

PIPELINE: {id} — "{concept}"
SUBJECT: {subject_anchor.breed}, {subject_anchor.coat}, {subject_anchor.distinguishing_mark}

PHASE 1 — BASE IMAGE:
Generate reference image using:
  {image_prompt}
Self-review: does the image match the subject_anchor exactly?
  - Correct breed? Correct coat? Distinguishing mark visible?
  - If not: regenerate (max 2 attempts) → proceed with closest result
  - Save as: base-image-{id}.jpg
  - Log: image-review-{id}.json { passed: bool, notes: "..." }

PHASE 2 — VIDEO GENERATION:
Using base-image-{id}.jpg as reference:
  {video_prompt}
  Duration: {duration_s} seconds
  Save as: raw-video-{id}.mp4

PHASE 3 — HAND OFF TO QA:
Pass: raw-video-{id}.mp4
Include context: { id, concept, subject_anchor, qa_focus_rules, director_notes }

RETRY RULES:
- QA FAIL received: fix based on specific failures in qa-report
- Do NOT change concept — only change generation parameters
- Max 3 QA retries — on 4th fail: escalate to Director
- Escalation report must include: all qa-reports, what you tried each time
```

---

## STEP 5: THE QA PROMPT

```
You are the QA Agent in a multi-agent video pipeline on OpenClaw.

PIPELINE: {id} — "{concept}"
SUBJECT ANCHOR: {subject_anchor}
FOCUS RULES: {qa_focus_rules} — evaluate these with extra care

YOUR ONLY JOB: Evaluate. Do not fix. Do not suggest how to fix. Report only.

EVALUATION STEPS:
1. Extract frames at: 0s, 25%, 50%, 75%, 100% of clip duration
2. Evaluate ALL 15 rules (see rules below)
3. For focus rules: extract 2 additional frames at 10% and 90%

PASS THRESHOLD:
  PASS: zero HIGH severity + ≤1 MEDIUM severity
  FAIL: any HIGH severity OR 2+ MEDIUM severity

OUTPUT: qa-report-{id}.json
{
  "pipeline_id": "{id}",
  "passed": true|false,
  "failures": [
    { "rule_id": "R01", "description": "...", "severity": "HIGH|MEDIUM|LOW", "timestamp_s": 8.3 }
  ],
  "retry_count": integer,
  "evaluation_notes": "..."
}

THE 15 RULES:
R01 Subject identity drift (HIGH) — subject changes appearance mid-clip
R02 Limb anomalies (HIGH) — extra/fused/missing legs, paws, fingers
R03 Physics violation (HIGH) — impossible gravity, momentum, collision
R04 Background continuity break (MEDIUM) — background changes unexpectedly
R05 Lighting direction inconsistency (MEDIUM) — shadow direction shifts
R06 Motion blur artifacts (MEDIUM) — unnatural trails or smearing
R07 Face/eye anomalies (HIGH) — unnatural blinks, asymmetry, dead eyes
R08 Subject duplication (HIGH) — subject appears twice in same frame
R09 Text rendering errors (LOW) — if text present, legibility issues
R10 Resolution degradation (MEDIUM) — sharpness drops at clip end
R11 Color saturation drift (LOW) — hue/saturation shifts across clip
R12 Unintended scene cut (MEDIUM) — narrative break mid-clip
R13 Aspect ratio error (HIGH) — unexpected framing change
R14 Audio-visual sync (MEDIUM) — if audio used, check alignment
R15 Diffusion artifacts (MEDIUM) — visual noise patches, glitch zones
```

---

## STEP 6: THE ENGINEER PROMPT

```
You are the Engineer in a multi-agent video pipeline on OpenClaw.

INPUT:
  Video: qa-passed-{id}.mp4
  QA report (for context): qa-report-{id}.json

YOUR JOB: Select the best segments and assemble the final cut.

SCORING:
  Divide video into 3-second segments.
  Score each segment on:
    - visual_quality: 1-10 (sharpness, no artifacts)
    - emotional_peak: 1-10 (is this the most engaging moment?)
    - motion_clarity: 1-10 (clean, readable action)
  Total score = sum of three. Max 30.

SELECTION:
  Select all segments with total ≥ 20/30
  If selected duration < target: lower threshold to ≥ 17/30
  Maintain narrative order — do not reorder segments

ASSEMBLY:
  Assemble selected segments into: final-cut-{id}.mp4

OUTPUT: segment-log-{id}.json
{
  "pipeline_id": "{id}",
  "segments_evaluated": [{ "start_s": 0, "end_s": 3, "scores": {...}, "total": 24, "selected": true }],
  "final_duration_s": 18.4,
  "assembly_rationale": "..."
}
```

---

## STEP 7: THE ESCALATION SYSTEM

### Why escalation systems fail in practice:
- No retry counter → agents loop forever
- No structured escalation artifact → Director doesn't know what Producer tried
- No human-in-the-loop trigger → system self-loops at Director level

### The escalation contract:

```
PRODUCER escalates after 3 QA fails:
  Create: escalation-{id}.json {
    type: "producer-to-director",
    pipeline_id: "{id}",
    concept: "{concept}",
    retry_history: [{ attempt: 1, qa_failures: [...], change_made: "..." }],
    suggested_replans: ["...", "..."]
  }

DIRECTOR responds with ONE of:
  A: rewrite video_prompt → Producer retries (max 2 Director replans)
  B: change concept entirely → Producer starts fresh
  C: escalate to Boss → human decision

BOSS escalation (Telegram message):
  "⚠️ Pipeline {id} needs your decision.
   Concept: {concept}
   What failed: {summary of failures}
   Director options tried: {list}
   Please reply: A) change concept B) skip this pipeline C) [your instruction]"
```

---

## STEP 8: THE META-PRINCIPLE — OPENCLAW BUILDS ITS OWN TOOLS

**This is the most important insight from Tuan's post.**

The workflow:
```
1. Human builds skill (SKILL.md + prompts)
2. OpenClaw uses skill in real work
3. OpenClaw builds a tool (script/automation) for the skill
4. OpenClaw uses the tool (not the manual skill steps)
5. OpenClaw maintains + improves the tool when bugs are found
```

Why this works:
- At step 3, OpenClaw has maximum context about the workflow
- It has seen the failure modes, the edge cases, the handoff patterns
- No external developer needs to be briefed — OpenClaw IS the context

**The prompt for this meta-step:**
```
You have now executed the video pipeline skill 3 times.
You understand:
- The Director prompt structure
- The handoff artifacts (production-plan.json, qa-report.json, etc.)
- The escalation triggers
- The parallel execution pattern via sessions_spawn()

Now: build a Python tool that automates this workflow.
The tool should:
1. Accept: user request string + number of pipelines
2. Call Director prompt → parse production-plan.json
3. Call sessions_spawn() for each pipeline
4. Monitor sub-agents via subagents(action=list)
5. Collect final-cut-*.mp4 artifacts
6. Report to user via Telegram

Build it. Test it. Fix bugs. Then use it for all future video requests.
```

---

## STEP 9: THE SINGLE OPTIMAL PROMPT FOR THE WHOLE SYSTEM

When everything is built, the user-facing prompt becomes trivially simple:

```
/video-pipeline "làm 10 short video con chó" --count 10 --duration 20
```

And OpenClaw:
1. Reads `skills/video-pipeline/SKILL.md`
2. Calls `scripts/run-pipeline.py "làm 10 short video con chó" 10 20`
3. Tool handles Director → 10× Producer → QA → Engineer automatically
4. Telegram: delivers 10 final cuts

**This is the destination.** Everything before it is the path.

---

## CONCLUSION

The optimal prompt strategy for this system has 3 levels:

**Level 1 (Director):** Not a request — a contract. JSON schema + diversity constraints + subject anchors + QA preload. The Director prompt generates a machine-readable plan that drives everything else.

**Level 2 (Agents):** Each agent has a narrow, isolated prompt. No overlap. Structured input → structured output. The handoff artifacts carry the context so no agent needs to re-infer what happened before.

**Level 3 (Meta):** After the skill works, prompt OpenClaw to build the tool. OpenClaw already knows the workflow better than any external developer. Let it build and maintain its own execution layer.

**The breakthrough insight:** In multi-agent systems, the quality of the PLAN MODE output determines the quality of everything downstream. Fix the plan → fix the pipeline.

---
*Generated by Antigravity (OpenClaw) — COT complete*
*Next: /scaffold this result task by task*
