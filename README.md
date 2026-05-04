# design-details

AI-generated UI is static. Buttons don't press in. Toggles don't snap. Nothing vibrates when it should. You end up retrofitting every micro-interaction by hand, one component at a time.

This is a Claude Code skill that fixes that. Install it and Claude starts building UI that actually feels alive. Press feedback, gesture choreography, haptics, motion with intent. All there from the start.

## The problem

You ask Claude to build a button. You get a button. It works. It does nothing when you press it though. No scale, no haptic, no spring-back. Just sits there.

So you say "add a press animation." You get something. Maybe `scale(0.9)`, which is way too much. Maybe a 500ms ease-in, which feels sluggish. Maybe it works on web but you're building React Native and now you're redoing the whole thing with Reanimated.

This skill means you don't have to ask. The details show up with the right values, on the right platform.

## What you get

Press feedback tuned per component. Buttons scale to 0.96, cards to 0.98, icon buttons to 0.85 (small things need more movement to feel real). Each component type has its own values for scale, opacity, shadow, and haptic intensity.

Haptics that actually mean something. A light tap for acknowledgment, medium for commits, heavy for destructive actions. Not random buzzing.

Gestures with real physics. Swipe thresholds with rubber-banding past the edge, long-press with progressive buildup so the user knows something's happening, drag with momentum that decelerates naturally.

Motion that carries intent. Fast ease-out says "done, moving on." A bouncy spring says "this is fun." Slow ease-in-out says "pay attention to this." The skill picks the right register for the context.

Cross-platform translations so a SwiftUI `.spring(duration: 0.3, bounce: 0.2)` maps correctly to Reanimated and CSS, not just vibes.

Works with React Native (Reanimated 3 + Gesture Handler), SwiftUI, and web (CSS, Framer Motion, WAAPI).

## Install

The quickest way:

```bash
npx skills add GeorgeTurp/design-details
```

This installs all four skills (parent + React Native, SwiftUI, web) into your Claude Code skills directory. The CLI will ask which agent to target if you have multiple installed.

You can also install a single sub-skill if you only work on one platform:

```bash
npx skills add GeorgeTurp/design-details --skill design-details-react-native
```

### Manual install

If you prefer git clone, you can install globally (all projects):

```bash
git clone https://github.com/GeorgeTurp/design-details.git ~/.claude/skills/design-details
```

Or into a single project:

```bash
# From your project root
git clone https://github.com/GeorgeTurp/design-details.git .claude/skills/design-details
```

Restart Claude Code after installing. No config needed.

## How it's structured

```
skills/
├── design-details/              # Principles + reference values
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

The parent skill owns the values (scale 0.96, 150ms, light haptic). The platform sub-skills own the implementation (`withSpring`, `.spring()`, `cubic-bezier`). One set of numbers, three native implementations.

## When it kicks in

You don't invoke it. It activates on its own when you're building interactive components, creating transitions, working with gestures, or asking for polish. If you tell Claude something "feels dead" or "flat," that triggers it too.

Every detail runs through a simple filter: what is the user feeling now, what should they feel after this interaction, and what's the minimum motion that bridges those two states? If the answer is "none," it skips it.

## Why this exists

There are good Claude Code skills for web animation already, like [animate](https://github.com/anthropics/claude-code), [delight](https://github.com/anthropics/claude-code), and [emil-design-eng](https://github.com/emilkowalski/skill). But they're web-only. None of them cover React Native or SwiftUI. None of them touch haptics. Gesture orchestration, per-component press values, cross-platform spring mapping? Not there.

I built this because I'm a product designer who ships SaaS every day and got tired of adding the same press states and haptic calls to every component Claude built for me. The goal is UI that feels responsive and trustworthy, not flashy.

## License

MIT
