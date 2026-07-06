# Evals

Test corpus for the design-details skill suite. Each eval is a prompt + expected behavior.

## Structure

```
evals/
├── routing/              # Parent router behavior: audit contract, cascade rules, init flow
├── layout/               # Spacing scale, concentric radius, hierarchy
├── copy/                 # Error messages, empty states, CTAs
├── typography/           # Tabular figures, hierarchy, typographic characters
├── color/                # Dark mode, contrast, semantic color
├── analytics/            # Event naming, properties, firing logic
├── accessibility/        # Reduce motion, focus, keyboard
├── press-feedback/       # Button, card, toggle press states
├── cross-platform/       # Same component, different platforms
├── gesture/              # Swipe, drag, long-press scenarios
├── haptics/              # Haptic pattern selection
└── motion-language/      # Timing and easing choices
```

The last five categories exercise `design-details-animation` and its references. `routing/` exercises the parent skill's contracts — these catch structural regressions (a sub-skill cascading into a full audit, a missing scope preamble) that per-domain evals can't.

## Eval format

Each `.md` file in a category folder is one eval:

```markdown
# Eval: [name]

## Prompt
> [The user prompt that triggers the skill]

## Context
- Platform: [web | react-native | swiftui]
- Component: [what's being built]
- Business context: [SaaS dashboard | social app | healthcare | etc.]

## Expected behavior
- [ ] [Specific detail that should be present]
- [ ] [Value or pattern that should be used]
- [ ] [Thing that should NOT be present]

## Pass criteria
[What makes this eval pass or fail]
```

## Running evals

Evals are manual for now. Feed the prompt to Claude Code with the skill installed and check the output against expected behavior. The `skill-creator` skill's eval runner can automate this — each file's Expected behavior list maps directly to graded assertions.
