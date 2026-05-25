# design-details

AI-generated UI has a sameness to it. Even when the code works, the details that separate considered from generic — they're not there. You end up retrofitting each one by hand, screen by screen.

design-details is a Claude Code skill suite that puts those details in front of the work, not after it.

- **At the start of a session**, `/start` sets twelve working rules (think before coding, simplicity first, fail loud, no speculative abstractions), gathers the minimum project context, and points Claude at the right craft skills before any code is written.
- **As you build**, focused craft skills activate when you need them — layout, motion and haptics, copy and tone, typography, color and contrast, accessibility, and the analytics events you ship alongside the feature.
- **Before you ship**, `/design-details` runs a full audit: scope preamble, every relevant craft skill in order, lettered findings, and a row-by-row walkthrough.

## What you get

Two top-level entry points (`/start` and `/design-details`) plus seven focused craft skills you can invoke directly.

### Entry points

- **start** — Hit `/start` at the beginning of any coding session. Establishes the working rules, gathers the minimum project context, and routes you to the right craft skills before any code is written.
- **design-details** — The parent router. Hit `/design-details` on a finished surface for a full audit: scope preamble, every relevant craft skill run in order, lettered findings, and a row-by-row walkthrough at the end.

### Craft skills (invokable individually)

- **design-details-animation** — Press feedback tuned per component. Buttons scale to 0.96, cards to 0.98, icon buttons to 0.85. Gestures with real physics. Haptics that mean something. Motion that carries intent.
- **design-details-layout** — Spacing on a scale. Optical alignment. Concentric radius. One primary action per view. The squint test.
- **design-details-copy** — Specific labels, kind errors, useful empty states, no AI-slop loading messages, the right typographic characters.
- **design-details-typography** — Hierarchy through contrast, not just size. Tabular figures in tables. OpenType features. Curly quotes and em-dashes.
- **design-details-color** — Palette structure with scales, not just "blue". Dark mode that's re-designed, not inverted. Semantic color used semantically.
- **design-details-accessibility** — Keyboard traversal, focus rings, hit areas, reduced motion, screen reader signals. The floor before shipping.
- **design-details-analytics** — Events named as outcomes, not implementation. Properties that carry the story. Identify before track. Fire on success, not intent.

The animation sub-skill ships with three platform implementations bundled inside it. When `design-details-animation` activates, it detects the platform from your project (React Native / SwiftUI / Web) and loads the right one automatically — you don't pick. One set of values, three native implementations.

- React Native — Reanimated 3, Gesture Handler, Expo Haptics
- SwiftUI — SwiftUI springs, UIFeedbackGenerator, gesture APIs
- Web — CSS transitions, Framer Motion, Web Animations API

## Install

The quickest way:

```bash
npx skills add GeorgeTurp/design-details
```

This installs the parent skill and all sub-skills into your Claude Code skills directory. The CLI will ask which agent to target if you have multiple installed.

You can also install a single topic sub-skill if you only need one:

```bash
npx skills add GeorgeTurp/design-details --skill design-details-copy
```

Available skills:
- Entry points: `start`, `design-details`
- Craft skills: `design-details-animation`, `design-details-layout`, `design-details-copy`, `design-details-typography`, `design-details-color`, `design-details-accessibility`, `design-details-analytics`

### Update to the latest version

```bash
npx skills update GeorgeTurp/design-details
```

This pulls the latest version of all installed sub-skills. The CLI auto-detects whether you installed globally or in a project — use `-g` or `-p` to force the scope.

If you installed via `git clone` instead, just `git pull` inside the cloned directory.

### Manual install

Clone globally (all projects):

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
├── start/                            # Session opener: rules + context + skill routing
├── design-details/                   # Parent: routing, shared protocols, audit contract
├── design-details-animation/         # Motion, haptics, gestures, press feedback
│   ├── references/                   # Tuned values per component, platform mapping
│   └── platforms/                    # Auto-picked from project context
│       ├── react-native.md           # Reanimated, Gesture Handler, Expo Haptics
│       ├── swiftui.md                # SwiftUI springs, UIFeedbackGenerator
│       └── web.md                    # CSS transitions, Framer Motion, WAAPI
├── design-details-layout/            # Spacing, alignment, hierarchy
├── design-details-copy/              # Labels, errors, tone, microcopy
├── design-details-typography/        # Hierarchy, scale, OpenType, characters
├── design-details-color/             # Palette structure, contrast, dark mode
├── design-details-accessibility/     # Keyboard, focus, screen readers, reduced motion
└── design-details-analytics/         # Instrumentation as you ship
```

The parent owns the protocols (Design System Protocol, Context Gathering Protocol, audit contract, output format). Each topic sub-skill owns its domain. Platform implementations live inside the animation skill and are selected automatically based on the project — you never need to pick.

## When it kicks in

There are two ways to use it.

**At the start of a session — `/start`.** Sets the working rules, gathers the minimum project context, and points Claude at the right craft skills before any code is written. The recommended opener whenever you sit down to build or change something non-trivial.

**Mid-flight or at the end — direct invocation or auto-activation.** You don't have to invoke anything: each craft skill activates when the user names that concern ("fix the spacing", "this copy is confusing", "audit the contrast", "what should we track here?"). If the user describes something that spans multiple concerns ("polish this page"), `/design-details` runs a full audit and routes through every sub-skill that applies, with a scope preamble so nothing gets silently skipped.

## Why this exists

I'm a product designer who ships SaaS every day. I got tired of asking Claude for the same things over and over — the press states that never came, the spacing that drifted off the scale, the focus rings deleted by `outline: none`, the dark mode that was just an inverted light mode, the error copy that blamed the user, the events tracked as `button_clicked`, the self-review that never happened. So I put the working rules, the references, and the audit format into a skill suite. The details show up with the feature now, not after it.

## License

MIT
