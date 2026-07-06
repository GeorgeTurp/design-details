---
name: design-details
description: |
  Design router for UI quality work. Routes to focused sub-skills for animation, layout, copy, typography, color, accessibility, and analytics instrumentation.
  Triggers on "review this UI", "polish this", "audit this screen", or when the user names a specific design concern that maps to a sub-skill.
version: 0.3.0
user-invocable: true
argument-hint: "[init|design-details-animation|design-details-layout|design-details-copy|design-details-typography|design-details-color|design-details-accessibility|design-details-analytics]"
---

# design-details

The details are the product. Spacing, motion, copy, color, type, focus order, and the events you instrument — each one is small on its own, and together they decide whether the UI feels considered or generic.

This is the parent skill. It holds the shared protocols every sub-skill depends on, and it routes work to the right focused mode. Each sub-skill is also invokable on its own when the user already knows what they need.

---

## Design System Protocol

**Before suggesting any value — spacing, color, type size, radius, shadow, easing, duration — check for existing tokens, CSS variables, or component conventions in the codebase.**

Scan for:
- CSS custom properties (`--color-*`, `--space-*`, `--text-*`, `--radius-*`, `--ease-*`, `--duration-*`)
- Tailwind config (`tailwind.config.js/ts`) for custom tokens
- Design token files (`tokens.json`, `theme.ts`, etc.)
- SwiftUI / RN theme objects (`Theme.swift`, `theme.ts`, design system packages)
- Existing component patterns — how are buttons, cards, inputs, modals already built?

**Rule: propose adjustments using the existing system. Never override — suggest.** If a token exists for something, use it. If a value doesn't exist in the system, note the gap and propose adding it to the design system rather than hardcoding.

This applies to every sub-skill below.

---

## Context Gathering Protocol

Design work without context produces generic output. Before any audit or change, confirm you have this minimum:

- **Target audience**: who uses this product, in what context?
- **Use cases**: what jobs are they trying to get done?
- **Brand personality / tone**: how should the interface feel?
- **Platform constraint**: web, iOS, Android, React Native, or mixed? (Animation work especially needs this — never guess.)

**Gathering order:**
1. Check current instructions for a **Design Context** section — if present, proceed.
2. Check `.design-details.md` (see Init Flow below) or `CLAUDE.md` at the project root — if present and sufficient, proceed.
3. Otherwise ask the user directly for the items above. Do **not** infer audience, use cases, or tone from the codebase — code tells you what was built, not who it's for.
4. **After the user answers, offer to save the answers to `.design-details.md`** so this interview never happens twice on the same project. If they accept, write the file using the Init Flow template.

**If context is missing, stop and ask — do not run the audit.** A review without context produces generic findings that waste time and miss what actually matters. One focused question upfront beats a skewed audit.

Exception: in a non-interactive run (CI, background session — nobody can answer), don't block. State your assumptions explicitly in the scope preamble and proceed.

---

## Init Flow — `/design-details init`

When invoked with the `init` argument, do not audit anything. The job is to create (or update) `.design-details.md` at the project root — the durable home for design context, so the interview happens once per project instead of once per session.

1. **Check for an existing `.design-details.md`.** If present, show its contents and ask what to update — don't restart the interview from scratch.
2. **Detect before asking.** Scan the codebase for everything detectable and pre-fill it: platform (per the animation skill's detection table), design tokens and where they live, existing component conventions, analytics tool and event naming pattern. Never ask the user something the repo already answers.
3. **Ask only the human questions**, in one batched `AskUserQuestion` round: target audience, use cases (jobs to be done), brand personality / tone. Include your detected values in the summary so the user can correct them.
4. **Write the file** using the template below, then show what was saved.

### `.design-details.md` template

```markdown
# Design Context

<!-- Read by the design-details skill suite before any audit or design work.
     Edit freely. Regenerate or update with /design-details init. -->

- **Product**: [one sentence — what it is and what it does]
- **Target audience**: [who uses it, in what context]
- **Use cases**: [the jobs users are trying to get done]
- **Brand personality / tone**: [how the interface should feel]
- **Platforms**: [web | iOS | Android | React Native | mixed — and which is primary]
- **Design system**: [where tokens live, key conventions, component library]
- **Analytics**: [tool in use + event naming convention, or "none"]

## Notes
[anything else the skills should honor: locked decisions, non-goals,
accessibility requirements beyond the baseline, viewport priorities]
```

Keep it under a page — this file is loaded before every audit, so it should stay cheap to read. Facts that live in the codebase (token values, component lists) belong in the codebase; this file records what the code can't say.

---

## Sub-Skills

Each sub-skill is invokable on its own. Use this table to decide which to load.

| Sub-skill | When to use | Read |
| --- | --- | --- |
| **design-details-animation** | Motion, press feedback, haptics, gestures, micro-interactions, transitions, anything that should "feel alive". Auto-detects platform (React Native / SwiftUI / Web) from project context. | `../design-details-animation/SKILL.md` |
| **design-details-layout** | Spacing, alignment, sizing, visual hierarchy, rhythm, concentric radius, grid | `../design-details-layout/SKILL.md` |
| **design-details-copy** | Microcopy, labels, error messages, empty states, CTAs, tone, voice | `../design-details-copy/SKILL.md` |
| **design-details-typography** | Font choice, hierarchy, weight, sizing, line-height, readability, typographic characters | `../design-details-typography/SKILL.md` |
| **design-details-color** | Palettes, contrast, dark mode, semantic color, accessible color pairings | `../design-details-color/SKILL.md` |
| **design-details-accessibility** | Keyboard traversal, focus, screen readers, hit areas, motion preferences, reduced data | `../design-details-accessibility/SKILL.md` |
| **design-details-analytics** | Instrumentation: what to track, how to name events and properties, when to add tracking as you ship UI | `../design-details-analytics/SKILL.md` |

If the user names one concern, invoke that sub-skill. If they describe something that spans multiple ("polish this page", "review this screen"), run a full audit (see below).

---

## Full Audit Contract

When invoked as `design-details` with no specific sub-skill, the expectation is a **complete audit**, not a highlight reel. Partial coverage is the failure mode to avoid.

**Exception — loaded as preparation:** when a sub-skill's MANDATORY PREPARATION block loads this file, apply the protocols above (Design System, Context Gathering) and the output format below, then return to the sub-skill. Do **not** start a full audit — the user asked for one concern, not all of them.

### 1. Run every sub-skill that applies to the target

For a typical UI screen: layout, animation, copy, typography, color, accessibility. Skip a sub-skill only if the target genuinely has nothing for it to look at, and say so out loud.

Analytics is an opt-in pass: run it when the user asks for instrumentation review, when they mention tracking, or when they're shipping a flow that needs events.

### 2. Surface coverage

Each of these must be either audited or explicitly acknowledged as skipped (with a reason).

- Desktop at rest
- Narrow viewport / mobile (or the smallest target platform)
- Modals, popovers, and overlays present on the page
- Error and failure paths (what the user sees when a mutation fails)
- Empty states (zero items, no data yet)
- Loading and pending states
- Keyboard-only traversal (tab order, focus rings, reachability)
- Reduced-motion behavior (for animation reviews)
- Screen reader signals for dynamic content (live regions, aria states)

### 3. Scope preamble (before findings)

Start every full audit with a short paragraph stating what was audited and what was not, before any findings. No silent omissions. Format:

> **Scope:** Audited [list]. Did not audit [list] because [reason per item].

Example:

> **Scope:** Audited desktop at rest, keyboard traversal, the two modals on the page, empty and error states, and the animation reduced-motion path. Did not audit narrow viewport (page is marketed as desktop-only per CLAUDE.md) or screen reader behavior (would need VoiceOver, not inferrable from code).

The preamble is a commitment device: it forces the audit to be deliberate about coverage, and gives the user a place to push back before reading the findings.

---

## Core Principles

These apply across every sub-skill. Keep them in mind whether you are tuning a spring, picking a type scale, or naming an event.

1. **The user feeling drives the detail.** Before adding anything, ask: what is the user feeling now, what should they feel after this, and what's the minimum change that bridges those two states? If the answer is "none," skip it.
2. **Unseen details compound.** Most details users never consciously notice — that is the point. Aggregate invisible correctness is what people *feel*.
3. **Intent over intensity.** Bold maximalism and refined minimalism both work. What fails is the timid generic middle.
4. **Platform feel is non-negotiable.** iOS expects springs. Android expects emphasized easing. Web expects CSS transitions that don't jank. Never impose one platform's idioms on another.
5. **Reversibility.** Prefer reversible changes. A subtle refinement that works beats a bold swing that misses.
6. **Accessibility is the floor, not the ceiling.** Honor reduced motion, focus rings, hit areas, contrast. The skill never ships a recommendation that breaks these.

---

## Review Output Format

Present findings grouped into lettered sections. Each section clusters related issues under a descriptive title. One row per change, numbered within its section.

### Structure

```
## A — [title describing what was found]
| # | Before | After | Why |
|---|--------|-------|-----|
| A1 | ... | ... | ... |
| A2 | ... | ... | ... |

## B — [title describing what was found]
| # | Before | After | Why |
|---|--------|-------|-----|
| B1 | ... | ... | ... |
```

### Section titles

The letter is fixed (A, B, C…) for addressing. The title is generated from what you actually found — never a generic category label.

- ✓ `## A — Concentric radius drift`
- ✓ `## B — Missing press feedback on card rows`
- ✓ `## C — Vague confirmation copy`
- ✗ `## A — Layout & rhythm` — too generic, tells the user nothing

Use only sections that have findings. Omit empty sections entirely.

### Closing

End every review by proactively offering walkthrough mode with an `AskUserQuestion` call. Phrase it naturally based on what the review found — vary the wording so it stays human. Examples (not templates to copy verbatim):

- "Want to go through these one at a time, or take the list as it is?"
- "Happy to walk row by row if that's easier. Or leave it with you to pick?"
- "There's a lot here. Want me to help you triage, one decision at a time?"

Options should be: **Walk through** / **Take the list** (plus any contextual third option if it fits).

### Walkthrough mode

When the user chooses to walk through, or when intent is clear from their wording (wanting to decide item by item, asking for help deciding, one at a time), use `AskUserQuestion` per item.

Options per item: **Apply** / **Decline** / **Discuss** / **Stop**

- `Discuss` = user pushes back or proposes a variant; respond, then re-ask the same item.
- Before starting a new section, if its items are closely related, offer `Apply all in [section]` as a single batch question — don't force row-by-row when a batch is obvious.
- On `Stop`, summarize what was applied, declined, and what's still open. Example: `Done: A1 and A2. Declined A3. Stopped with B1–B4 still open.`

### Inline code

If an item requires a code snippet, include it inside the After cell. Never break out of the table format to show code separately.

---

## Meta

- **Version**: see frontmatter. Bump on any substantive change to protocols, sub-skill routing, or output format.
- **Adding a sub-skill**: each new sub-skill must follow the pattern in `design-details-layout/SKILL.md`: frontmatter with `user-invocable: true`, a MANDATORY PREPARATION block that invokes this parent, and a clear When-to-Use list. Add a row to the Sub-Skills table above.
