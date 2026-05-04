# Evals

Test corpus for the design-details skill. Each eval is a prompt + expected behavior.

## Structure

```
evals/
├── press-feedback/       # Button, card, toggle press states
├── gesture/              # Swipe, drag, long-press scenarios
├── haptics/              # Haptic pattern selection
├── motion-language/      # Timing and easing choices
├── cross-platform/       # Same component, different platforms
└── accessibility/        # Reduce motion compliance
```

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

Evals are manual for now. Feed the prompt to Claude Code with the skill installed and check the output against expected behavior.
