---
name: start
description: |
  Session-start skill. Establishes the working rules, gathers the minimum project context, and points the agent at the right craft skills before any code is written.
  Invoke at the very beginning of a coding session — before scaffolding, before fixes, before features.
version: 0.2.0
user-invocable: true
argument-hint: "[short description of what you want to build or fix]"
---

# start

A new coding session is the cheapest moment to set the bar. The first ten minutes decide whether the next two hours produce something considered or something generic.

This skill runs three things in order:

1. **Establish the working rules** — twelve behavioural guidelines that bias toward caution, simplicity, and surfacing uncertainty.
2. **Gather the minimum project context** — without it, every other skill produces generic output.
3. **Route to the right craft skills** — design, composition, copy, motion, accessibility, analytics.

Do all three before writing any code. The cost of pausing is ten minutes. The cost of skipping is rework.

---

## Step 1 — Establish the working rules

These rules apply for the rest of the session unless the user explicitly relaxes one. They bias toward caution over speed. For trivial tasks, use judgment — but default to the rule.

### Rule 1 — Think before coding
Don't assume. Don't hide confusion. Surface tradeoffs.
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### Rule 2 — Simplicity first
Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: *"Would a senior engineer say this is overcomplicated?"* If yes, simplify.

### Rule 3 — Surgical changes
Touch only what you must. Match the codebase, even if you disagree.
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style and conventions. If the codebase uses snake_case and you'd prefer camelCase: snake_case.
- Disagreement is a separate conversation. Inside the codebase, conformance > taste.
- If you notice unrelated dead code, mention it — don't delete it.

The test: every changed line should trace directly to the user's request.

### Rule 4 — Goal-driven execution with checkpoints
Define success criteria. Loop until verified. Checkpoint as you go.

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state the plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

After each significant step: summarize what was done, what's verified, what's left. Don't continue from a state you can't describe back.

### Rule 5 — Reserve LLM calls for judgment
If the user asks for an LLM call inside the product, push back if deterministic code would do the job.

- Use the model for: classification, drafting, summarization, extraction from unstructured text.
- Do **not** use the model for: routing, retries, status-code handling, deterministic transforms.

If a status code already answers the question, plain code answers the question.

### Rule 6 — Surface conflicts, don't average them
If two existing patterns in the codebase contradict, don't blend them. Pick one (the more recent / more tested), explain why, and flag the other for cleanup. "Average" code that satisfies both rules is the worst code.

### Rule 7 — Read before you write
Before adding code to a file, read its exports, the immediate caller, and any obvious shared utilities. If you don't understand why existing code is structured the way it is, ask before adding to it. *"Looks orthogonal to me"* is the most dangerous phrase in a codebase.

### Rule 8 — Tests verify intent, not just behavior
Every test must encode **why** the behavior matters, not just **what** it does.
- If the test still passes after you delete the function body, the test is wrong.
- If you can't write a test that would fail when business logic changes, the function is wrong.

### Rule 9 — Ask once, then proceed
Ask clarifying questions at the start of a task, not in the middle. Once you've started executing, prefer to proceed and report what you did over re-asking. If you hit a genuine fork that wasn't visible at the start, stop and ask — but don't ladder small questions one at a time.

### Rule 10 — Fail loud
If you can't be sure something worked, say so explicitly.
- "Migration completed" is wrong if 30 records were skipped silently.
- "Tests pass" is wrong if you skipped any.
- "Feature works" is wrong if you didn't verify the edge case the user asked about.

Default to surfacing uncertainty, not hiding it.

### Rule 11 — Self-audit before declaring done
After a substantial chunk of work — a feature, a refactor, a multi-step task — stop and switch roles. You are no longer the engineer who wrote it; you are an independent reviewer who has never seen this code.

1. Re-read every relevant `.md` file in scope (root `CLAUDE.md`, nested `CLAUDE.md`, design docs, README sections the work touches). Don't trust memory of the rules — read them fresh.
2. Walk your own diff against those rules, one rule at a time. Where did you violate them? Where did you take a shortcut?
3. For each non-trivial decision, ask: was this the best solution, or just the first one that worked?
4. Surface findings before saying "done." Include rule violations, shortcuts, rejected alternatives.

The bar is not *"I followed the rules"* — it's *"an independent reviewer reading the diff cold would not flag anything I haven't already flagged myself."*

### Rule 12 — `useMemo` / `useCallback` are not free
**Default to no memoization. Add it only when you can name what it saves.**

`useMemo` and `useCallback` cost their own work (dependency comparison + closure allocation). Wrapping cheap computations makes the code *slower*, not faster, and adds noise to every diff.

Only reach for them when **one** of these is true:
1. The wrapped value is a **dependency of another hook** (`useEffect`, `useMemo`, `useCallback`) where referential stability matters.
2. The value/function is **passed to a `React.memo`'d child** where a new reference would cause unnecessary re-renders or effect re-runs.
3. The computation is **genuinely expensive** — sorting/filtering thousands of items, parsing large blobs, heavy math.

If none apply: write the plain expression. React's re-render is cheaper than the memoization machinery.

**The test:** before adding `useMemo`/`useCallback`, finish this sentence out loud — *"I'm memoizing this because otherwise ___ would re-run / re-render / be slow."* If the blank doesn't have a concrete answer pointing to one of the three cases above, delete the hook.

---

## Step 2 — Gather the minimum project context

Skills produce generic output without context. Before any work, confirm:

- **What** is being built or changed? (one sentence)
- **Why** — what does the user actually want to accomplish? (the goal behind the request)
- **Who** is this for? (audience, role, technical literacy)
- **Where** — what platform, framework, codebase conventions?
- **What's already there** — existing design system, tokens, components, patterns to match

**Gathering order:**
1. Check `.design-details.md` at the project root — the durable design context file (audience, use cases, tone, platforms, design system). If present, most of the "Who" and "Where" questions are already answered.
2. Check `CLAUDE.md` at the repo root (and any nested `CLAUDE.md` in the target directory).
3. Check for `DESIGN.md`, `STYLE.md`, `docs.md` in the directory you'll touch.
4. Read the immediate caller and any obvious shared utilities (per Rule 7).
5. If anything from the five questions above is still unknown, **ask before coding**. One focused round of questions upfront beats five rounds mid-implementation.
6. If the user answered design-context questions (audience, use cases, tone), **offer to save them to `.design-details.md`** — the template and interview live in `../design-details/SKILL.md` (Init Flow). Once saved, no future session has to re-ask.

Stop here if context is missing. Don't compensate with assumptions.

---

## Step 3 — Route to the right craft skills

This is the skill inventory. Don't run them all — invoke based on what the work actually needs.

### Building a UI from scratch or scaffolding a new surface
1. **frontend-design** — establishes a distinctive aesthetic direction. Commit to a tone (refined minimal, editorial, brutalist, etc.) before writing CSS. Avoid generic AI defaults.
2. **design-details** (and its sub-skills) — once a draft exists, this is where it goes from "works" to "considered." Run the parts that apply:
   - **design-details-layout** — spacing, alignment, hierarchy, concentric radius
   - **design-details-typography** — hierarchy, scale, OpenType, real typographic characters
   - **design-details-color** — palette structure, contrast, dark mode
   - **design-details-animation** — press feedback, motion, haptics, gestures (auto-picks platform: web / SwiftUI / React Native)
   - **design-details-copy** — labels, errors, empty states, tone
   - **design-details-accessibility** — keyboard, focus, screen readers, reduced motion
3. **design-details-analytics** — before shipping the surface, instrument the events that will tell you whether it worked.

### Building or refactoring a React component API
- **vercel-composition-patterns** — when designing reusable component APIs. Use it whenever boolean-prop proliferation appears (`isOpen`, `isLoading`, `hasError`, `withIcon`…), when building a component library, or when a component has more than ~5 props that don't compose. Covers compound components, render props, context providers, and the React 19 API changes that affect each.

### Reviewing or polishing an existing surface
- Run **design-details** as a full audit. It produces a scope preamble, lettered findings, and offers a row-by-row walkthrough.

### Before declaring done
- Self-audit per Rule 11.
- Re-read every `CLAUDE.md` in scope.
- Walk the diff against the rules above.

---

## What "great from the start" actually looks like

The agent should leave the session having produced work that an independent reviewer reading the diff cold would describe as:

- **Intentional** — every decision traces to either the user's request or a documented convention. No drive-by refactors. No speculative abstractions.
- **Considered** — spacing on a scale, typographic hierarchy via contrast, copy that helps the user, motion that carries intent, focus rings that pass contrast.
- **Honest** — every claim of "done", "tested", "works" matches what was actually verified. Failures surfaced loud.
- **Native to the codebase** — matches existing conventions whether the agent agreed with them or not.

If the work doesn't meet that bar, the agent should say so before saying "done."

---

## What NOT to do

- Don't invoke every skill at the start. Pick the ones the work actually needs.
- Don't paste these rules back to the user — they're guidance for the agent, not session preamble.
- Don't skip context-gathering because the request "seems clear." Clarity at the level of the prompt almost never matches the codebase's reality.
- Don't ladder small questions one at a time. Batch them up at the start (Rule 9).
- Don't claim "done" without the self-audit (Rule 11).

---

## Cross-references

- `../design-details/SKILL.md` — full design audit router
- `../design-details-layout/SKILL.md`, `-copy/`, `-typography/`, `-color/`, `-animation/`, `-accessibility/`, `-analytics/` — focused craft modes
- `frontend-design` (global) — bold aesthetic direction for new UI
- `vercel-composition-patterns` (global) — React component API design
