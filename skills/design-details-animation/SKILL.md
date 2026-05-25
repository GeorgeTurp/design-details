---
name: design-details-animation
description: |
  Make UI feel alive: press feedback, haptics, gestures, emotional motion.
  Triggers on "add micro-interactions", "make it feel responsive", "add haptics",
  "choreograph gestures", "make it feel native", or when building interactive components.
version: 0.2.0
user-invocable: true
argument-hint: "[target]"
---

## MANDATORY PREPARATION

Invoke `design-details` — it holds the shared design principles, the Context Gathering Protocol, and the Design System Protocol. Follow both before proceeding.

---

# design-details-animation

Make UI feel alive by default. Every interactive element should respond to touch, every transition should carry intent, and every platform should feel native.

This is not about decoration. Motion and feedback exist to build trust — to tell users "this worked", "this is dangerous", "you're in control." Business software that feels alive converts better, reduces support tickets, and makes complex workflows survivable.

## Decision framework

Before adding any interaction detail, answer three questions:

1. **What is the user feeling right now?** (confused, confident, anxious, bored)
2. **What should they feel after this interaction?** (reassured, warned, delighted, oriented)
3. **What's the minimum motion that bridges those two states?**

If the answer to #3 is "none," skip it. Over-animation is worse than none.

## Core principles

### Feedback is not optional
Every tappable element needs a press state. Every destructive action needs friction. Every success needs confirmation. The absence of feedback is a bug.

### Motion carries meaning
- **Fast ease-out (150–200ms)**: "Done. Moving on." — confirmations, dismissals
- **Medium spring (250–350ms)**: "Here's something new" — reveals, transitions
- **Slow ease-in-out (400–600ms)**: "Pay attention to this" — warnings, onboarding
- **Bouncy spring (300–500ms, underdamped)**: "This is fun / casual" — celebrations, playful UI

### Platform feel is non-negotiable
iOS users expect springs. Android users expect emphasized easing. Web users expect CSS transitions that don't jank. Never impose one platform's idioms on another.

### Haptics complete the loop
Touch feedback without haptics is like a button with no click. On platforms that support it, pair visual feedback with appropriate vibration patterns.

## When this skill activates

### Automatic triggers
- Building any interactive component (buttons, cards, toggles, inputs)
- Creating navigation transitions or page changes
- Implementing drag, swipe, or gesture interactions
- Adding loading states, success/error feedback, or confirmations

### Explicit triggers
- User asks for motion, animation, micro-interactions, or polish
- User says something "feels dead", "static", or "flat"
- User wants haptic feedback or gesture choreography

---

## How to apply details

### Step 1 — Detect the platform

Determine the target platform from project context. **Do not ask the user unless detection is genuinely ambiguous.** Use these signals:

| Signal | Platform |
| --- | --- |
| `package.json` contains `react-native`, `expo`, or `@react-native/*` | React Native |
| `Package.swift`, `*.xcodeproj`, `*.xcworkspace`, or `.swift` files at root | SwiftUI |
| `package.json` with `react`/`vue`/`svelte` + no react-native; or HTML/CSS in repo | Web |
| Mixed monorepo (e.g. `apps/web` + `apps/mobile`) | Use the directory currently being edited to disambiguate |
| Ambiguous — no clear signal | **Ask the user.** Don't guess. |

Then load the matching platform file:
- React Native → `platforms/react-native.md`
- SwiftUI → `platforms/swiftui.md`
- Web → `platforms/web.md`

### Step 2 — Identify the component type and load the relevant reference

- **Buttons, cards, toggles, inputs** → `references/press-feedback.md`
- **Swipe, drag, long-press** → `references/gesture.md`
- **Success, error, warning feedback** → `references/haptics.md`
- **Transitions, reveals, page changes** → `references/motion-language.md`
- **Cross-platform value translation** → `references/platform-map.md`

### Step 3 — Apply the detail

Use the reference values, don't invent. The references contain tested values for scale, opacity, shadow, timing, and haptic patterns. Deviate only with justification.

### Step 4 — Respect accessibility

- Honor `prefers-reduced-motion` (web) / `UIAccessibility.isReduceMotionEnabled` (iOS) / `AccessibilityInfo.isReduceMotionEnabled` (RN)
- Provide instant state changes as fallbacks — **never remove the feedback, only the motion**
- Haptics should be optional and respect system settings

## What NOT to do

- Don't animate everything. Static content should stay static.
- Don't add spring physics to data tables or dense information layouts.
- Don't use bouncy animations in finance, healthcare, or serious workflow contexts unless explicitly asked.
- Don't add haptics to scroll or passive viewing — only to intentional interactions.
- Don't exceed 400ms for any interaction that blocks user flow.

## Files in this skill

### References (values)
Detailed values and patterns per domain. Load on demand based on the component type.

- **`references/press-feedback.md`** — Scale, shadow, opacity, and ripple values by component type
- **`references/gesture.md`** — Swipe, long-press, drag-with-momentum orchestration
- **`references/haptics.md`** — Vibration patterns per platform and interaction type
- **`references/motion-language.md`** — How easing and timing convey emotion
- **`references/platform-map.md`** — Cross-platform value mapping (iOS ↔ CSS ↔ React Native)

### Platforms (implementation)
The right one is picked by Step 1 above. Do not load all three.

- **`platforms/react-native.md`** — Reanimated 3, Gesture Handler, Expo Haptics
- **`platforms/swiftui.md`** — SwiftUI `.animation()`, `UIImpactFeedbackGenerator`, gesture APIs
- **`platforms/web.md`** — CSS transitions, Framer Motion, Web Animations API
