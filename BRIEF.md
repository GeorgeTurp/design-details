# design-details — Skill Brief

## What this is

A publishable Claude Code skill that makes UI feel alive by default — micro-interactions, emotional motion, haptic feedback, and gesture choreography baked in from the start instead of retrofitted.

## Who's building it

George Turp — product designer, 10 years in startups/scale-ups, business-focused. Now does React Native + SwiftUI frontend for complex SaaS. This is both a daily tool and a portfolio piece to show AI presence.

## The problem

AI-generated UI is static. Basic transitions at best. Every detail has to be manually added one-by-one. Existing Claude Code design skills (animate, delight, impeccable, emil-design-eng) cover web animation but leave critical gaps.

## Gaps this skill owns

| Gap | Detail |
|---|---|
| React Native / SwiftUI motion | No existing skill covers native platform animation idioms |
| Haptic feedback | Vibration patterns (tap, success, error) — zero coverage anywhere |
| Gesture choreography | Swipe, long-press, drag-with-momentum orchestration |
| Emotional motion language | How easing/timing convey urgency, confidence, playfulness |
| Press feedback by component type | Exact scale, shadow, ripple values per element type |
| Cross-platform consistency | How iOS spring damping maps to CSS beziers to Framer Motion |

## Upstream research

Skills studied and their coverage:

- **animate** — Motion taxonomy, timing rules (100-800ms), easing, GPU accel, a11y. Lacks fine-grained micro-interactions, gesture physics, haptics, native platform patterns.
- **emil-design-eng** — Emil Kowalski's philosophy: frequency analysis, spring physics, popovers, clip-path, WAAPI. Web-only, no mobile.
- **delight** — Personality-focused: micro-moments, easter eggs, sound design. Shallow on mechanical feel and motion physics.
- **cami-design-interaction** — Animation frequency matrix, easing table, press feedback (scale 0.96), enter/exit asymmetry. Minimal on orchestration or cross-platform.
- **impeccable** — 100/300/500ms rule, stagger patterns, clip-path reveals. No mobile gesture patterns.
- **overdrive** — Cinematic motion, View Transitions API, scroll-driven animations. Assumes ambitious projects, no everyday component guidance.
- **transitions.dev** — Copy-paste CSS transition library. No philosophy or decision framework.
- **jakubkrehel/make-interfaces-feel-better** — Concentric radius, contextual icon animations, tabular numbers, interruptible animations. Checklist-style, no orchestration.

## Proposed structure

```
skills/
├── design-details/              # parent: philosophy, decision framework
│   ├── SKILL.md
│   └── references/
│       ├── press-feedback.md     # scale, shadow, ripple by component type
│       ├── gesture.md            # swipe, long-press, drag orchestration
│       ├── haptics.md            # vibration patterns per platform
│       ├── motion-language.md    # emotional motion: urgency, confidence, playfulness
│       └── platform-map.md      # cross-platform value mapping (iOS ↔ CSS ↔ RN)
├── design-details-react-native/  # Reanimated, Gesture Handler patterns
├── design-details-swiftui/       # SwiftUI springs, haptics, gesture API
└── design-details-web/           # CSS / Framer Motion / WAAPI patterns
evals/                            # test corpus
```

## Differentiator

Business-focused product designer's take on motion — not "make it fancy" but "make it feel responsive, alive, and trustworthy for SaaS users." That's a perspective nobody else is publishing.

## Inspirations

- [cami-design](https://github.com/PawlakCamille/cami-design) — parent/child architecture, context protocol, eval system
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — review format, reference organization
- [emilkowalski/skill](https://github.com/emilkowalski/skill) — animation decision framework
- [jakubkrehel/make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) — micro-detail catalog
- [transitions.dev](https://transitions.dev) — transition reference library
