# CoT: Seedance Director Workflow & SKILL

**Date:** 2026-02-27 09:25
**Question:** Build workflow from Seedance 2.0 approach, create example, then automate with SKILL

## Task
Transform story ideas into Seedance 2.0 video prompts using world-class director methodology

## Context
- Seedance 2.0 = AI video generation needing "shot lists" not captions
- Time-segmented (0-5s, 5-10s, 10-15s)
- Requires: specific actions, authentic dialogue, technical specs
- "Authentic, not scripted" energy is essential

## Reasoning

### Step 1: Understand Seedance Requirements
- Wants shot lists, not descriptions
- Mid-action starts (no "Hey guys!")
- Specific hand/object choreography
- Natural exits (trails off, cuts mid-thought)
- Technical specs: lighting, audio, camera

### Step 2: Design 3-Phase Pipeline
```
INPUT → STORYBOARD → SHOTLIST → SEEDANCE PROMPTS
```

### Step 3: Apply Contrarian Frame
What would lazy version look like?
- Generic descriptions
- No time segments
- Vague camera notes
- Perfect intro/outro

Engineer away from each pattern.

### Step 4: Create Complete Example
"Morning Coffee Ritual" — full workflow demonstration

## Output Structure

```
seedance-director/
├── SKILL.md              # Orchestrator (triggers, workflow, anti-patterns)
├── inputs/
│   └── story-brief.md    # Template for user input
├── process/
│   ├── storyboard.md     # Phase 1 output
│   └── shotlist.md       # Phase 2 output
├── outputs/
│   └── seedance-prompts.md
├── templates/
│   ├── director-lens.md  # Phase 1 framework
│   ├── shot-template.md  # Phase 2 structure
│   └── seedance-format.md # Phase 3 format + specs library
└── examples/
    └── coffee-ritual.md  # Complete worked example
```

## Key Frameworks Created

### Director's Lens (5 Questions)
1. What's the FEELING? (one per video)
2. What's the SCROLL-STOPPER? (first 1.5s)
3. What's the SCREENSHOT MOMENT?
4. What makes this feel REAL?
5. How does it END? (natural, not concluded)

### Priority Stack
1. Authentic > Beautiful
2. Specific > General
3. Mid-moment > Beginning
4. Casual > Polished
5. Action > Description

### Anti-Patterns (NEVER)
- ❌ "She demonstrates..." → Write actual choreography
- ❌ "Professional lighting" → Describe light source
- ❌ Clean intro/outro → Mid-action entry, natural cut exit
- ❌ Perfect everything → Add one imperfection

## Verification Gate
- [ ] Starts mid-sentence
- [ ] Dialogue uses contractions
- [ ] Hands + objects specified
- [ ] Each segment = ONE action
- [ ] Technical specs are SPECIFIC
- [ ] Natural ending (no CTA)

## Summary
Complete Seedance Director system: 3-phase workflow with templates, worked example, and SKILL.md for automation. Encodes world-class director thinking, not just prompt formatting.
