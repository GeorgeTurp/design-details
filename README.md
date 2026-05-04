# design-details

A Claude Code skill that makes UI feel alive by default — micro-interactions, press feedback, haptics, gesture choreography, and emotional motion baked in from the start instead of retrofitted one detail at a time.

## What it does

When you ask Claude Code to build interactive UI, this skill automatically applies:

- **Press feedback** — correct scale, opacity, shadow, and haptic values per component type (buttons, cards, toggles, list items)
- **Gesture choreography** — swipe-to-action, long-press, drag-and-drop with thresholds, rubber-banding, and momentum
- **Haptic feedback** — vibration patterns mapped to interaction meaning (acknowledged, completed, warning, error)
- **Emotional motion** — timing and easing that convey intent (efficient, informative, emphatic, playful)
- **Cross-platform consistency** — the same interaction feels native on iOS, Android, and web

Works across **React Native** (Reanimated 3 + Gesture Handler), **SwiftUI**, and **Web** (CSS / Framer Motion / WAAPI).

## Install

### Global (all projects)

```bash
# Clone into your Claude Code skills directory
git clone https://github.com/GeorgeTurp/design-details.git ~/.claude/skills/design-details
```

### Project-level (single project)

```bash
# From your project root
git clone https://github.com/GeorgeTurp/design-details.git .claude/skills/design-details
```

Or add as a git submodule:

```bash
git submodule add https://github.com/GeorgeTurp/design-details.git .claude/skills/design-details
```

After installing, restart Claude Code. The skill loads automatically — no configuration needed.

## How it works

The skill has a parent/child architecture:

```
skills/
├── design-details/              # Parent — philosophy + decision framework
│   ├── SKILL.md                 # Core principles, triggers, routing logic
│   └── references/
│       ├── press-feedback.md    # Scale, shadow, ripple values by component type
│       ├── gesture.md           # Swipe, long-press, drag orchestration
│       ├── haptics.md           # Vibration patterns per platform
│       ├── motion-language.md   # Emotional registers: urgency → playfulness
│       └── platform-map.md     # Cross-platform value mapping (iOS ↔ CSS ↔ RN)
├── design-details-react-native/ # Reanimated 3 + Gesture Handler + Expo Haptics
├── design-details-swiftui/      # SwiftUI springs + UIFeedbackGenerator + gestures
└── design-details-web/          # CSS transitions + Framer Motion + View Transitions API
```

**Parent skill** decides _what_ values to use (scale 0.96, 150ms spring, light haptic).
**Platform sub-skills** decide _how_ to implement them (Reanimated `withSpring`, SwiftUI `.spring()`, CSS `cubic-bezier`).

### Activation

The skill activates automatically when you:
- Build interactive components (buttons, cards, toggles, inputs)
- Create navigation transitions or page changes
- Implement drag, swipe, or gesture interactions
- Ask for motion, polish, micro-interactions, or haptics
- Say something "feels dead", "static", or "flat"

### Decision framework

Before adding any detail, the skill asks three questions:

1. What is the user feeling right now?
2. What should they feel after this interaction?
3. What's the minimum motion that bridges those two states?

If the answer to #3 is "none," it skips it.

## What makes this different

Existing Claude Code design skills cover web animation well. This skill fills the gaps:

| Gap | Coverage |
|---|---|
| React Native / SwiftUI motion | Native platform animation idioms, not web patterns ported over |
| Haptic feedback | Full vibration vocabulary mapped to interaction meaning |
| Gesture choreography | Thresholds, rubber-banding, momentum, commit-point haptics |
| Emotional motion | How easing and timing convey urgency, confidence, playfulness |
| Press feedback by component | Exact values per element type, not one-size-fits-all |
| Cross-platform consistency | iOS spring → CSS bezier → Reanimated spring translations |

Built from the perspective of a product designer who ships SaaS — motion that feels responsive and trustworthy, not flashy.

## License

MIT
