# design-details

AI-generated UI is static. Buttons don't press in. Toggles don't snap. Nothing vibrates when it should. Every micro-interaction has to be retrofitted by hand, one component at a time.

This is a Claude Code skill that fixes that. Install it, and Claude starts giving you UI that actually feels alive — press feedback, gesture choreography, haptics, emotional motion — all baked in from the jump.

## The problem

You ask Claude to build a button. You get a button. It works. It does nothing when you press it. No scale, no haptic, no spring-back. It just... sits there.

So you say "add a press animation." You get something. Maybe `scale(0.9)` — way too much. Maybe a 500ms ease-in — sluggish. Maybe it works on web but you're building React Native and now you need to redo it with Reanimated.

This skill means you don't have to ask. The details just show up, with the right values, on the right platform.

## What you get

- **Press feedback** that's tuned per component — buttons scale to 0.96, cards to 0.98, icon buttons to 0.85 (small things need more movement to feel real)
- **Haptics** that mean something — light tap for acknowledgment, medium for commits, heavy for destructive actions, not just random buzzing
- **Gestures** with physics — swipe thresholds with rubber-banding, long-press with progressive buildup, drag with momentum
- **Motion that carries intent** — fast ease-out for "done, moving on", bouncy spring for "this is fun", slow ease-in-out for "pay attention"
- **Cross-platform translations** — so a SwiftUI `.spring(duration: 0.3, bounce: 0.2)` maps correctly to Reanimated and CSS, not just vibes

Works with **React Native** (Reanimated 3 + Gesture Handler), **SwiftUI**, and **Web** (CSS / Framer Motion / WAAPI).

## Install

### For all your projects

```bash
git clone https://github.com/GeorgeTurp/design-details.git ~/.claude/skills/design-details
```

### For a single project

```bash
# From your project root
git clone https://github.com/GeorgeTurp/design-details.git .claude/skills/design-details
```

Or as a submodule if you want it versioned with your repo:

```bash
git submodule add https://github.com/GeorgeTurp/design-details.git .claude/skills/design-details
```

Restart Claude Code after installing. That's it — no config, no setup. It just works.

## How it's structured

```
skills/
├── design-details/              # The brain — principles + reference values
│   ├── SKILL.md                 # Decision framework, when to activate
│   └── references/
│       ├── press-feedback.md    # Exact scale/shadow/haptic per component type
│       ├── gesture.md           # Swipe, long-press, drag patterns
│       ├── haptics.md           # What each vibration means, per platform
│       ├── motion-language.md   # Timing that conveys emotion
│       └── platform-map.md     # iOS ↔ CSS ↔ React Native translations
├── design-details-react-native/ # Reanimated, Gesture Handler, Expo Haptics
├── design-details-swiftui/      # SwiftUI springs, UIFeedbackGenerator
└── design-details-web/          # CSS transitions, Framer Motion, WAAPI
```

The parent skill owns the _values_ (scale 0.96, 150ms, light haptic). The platform sub-skills own the _implementation_ (`withSpring`, `.spring()`, `cubic-bezier`). One source of truth, three native implementations.

## When it kicks in

You don't need to invoke it. It activates automatically when you're:

- Building anything interactive — buttons, cards, toggles, inputs
- Creating transitions or navigation
- Working with gestures — swipe, drag, long-press
- Asking for polish, motion, or micro-interactions
- Saying something "feels dead" or "flat"

Behind the scenes, every detail runs through a simple filter:

1. What is the user feeling right now?
2. What should they feel after this interaction?
3. What's the minimum motion that gets them there?

If the answer is "none" — it skips it. No gratuitous animation.

## Why this exists

There are great Claude Code skills for web animation already — [animate](https://github.com/anthropics/claude-code), [delight](https://github.com/anthropics/claude-code), [emil-design-eng](https://github.com/emilkowalski/skill). But they leave real gaps:

- **No React Native or SwiftUI patterns** — just web
- **No haptics at all** — zero coverage anywhere
- **No gesture orchestration** — thresholds, rubber-banding, momentum
- **No per-component press values** — one-size-fits-all doesn't cut it
- **No cross-platform mapping** — how does an iOS spring become a CSS bezier?

This skill fills those gaps. It's built from the perspective of a product designer who ships SaaS every day — the goal is UI that feels responsive and trustworthy, not flashy.

## License

MIT
