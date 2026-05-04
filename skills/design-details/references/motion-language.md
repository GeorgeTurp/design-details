# Motion Language Reference

How timing, easing, and animation properties convey emotion and intent.

## The four emotional registers

Every UI motion falls into one of four emotional registers. Choose the register first, then pick values.

### 1. Efficient — "Done. Moving on."
For confirmations, dismissals, micro-feedback. The user expects this to be fast.

| Property | Value |
|---|---|
| Duration | 100-200ms |
| Easing | ease-out (fast start, gentle stop) |
| Spring | overdamped, high stiffness |
| Use for | Button feedback, toast dismiss, tab switch, checkbox, tooltip |

**The feel**: Crisp, professional, invisible. The user shouldn't notice the animation — only that the interface responded.

### 2. Informative — "Here's something new."
For reveals, transitions, state changes. The user needs to track what changed.

| Property | Value |
|---|---|
| Duration | 200-350ms |
| Easing | ease-in-out or spring (damping 0.7-0.85) |
| Spring | slightly underdamped |
| Use for | Modal open, page transition, accordion expand, dropdown, bottom sheet |

**The feel**: Smooth, clear, oriented. The user can follow the spatial relationship between states.

### 3. Emphatic — "Pay attention to this."
For warnings, important state changes, onboarding moments. You need the user's focus.

| Property | Value |
|---|---|
| Duration | 350-600ms |
| Easing | ease-in-out with slight overshoot, or spring (damping 0.5-0.7) |
| Spring | underdamped with visible settle |
| Use for | Error shake, warning banner, empty state, first-run highlight, celebration |

**The feel**: Deliberate, weighty. The animation itself carries information — "this matters."

### 4. Playful — "This is fun."
For celebrations, easter eggs, casual/social contexts. The user should smile.

| Property | Value |
|---|---|
| Duration | 300-800ms |
| Easing | spring (damping 0.3-0.5, high stiffness) |
| Spring | bouncy, visible oscillation |
| Use for | Achievement unlock, confetti, reaction emoji, like animation, onboarding mascot |

**The feel**: Energetic, surprising, joyful. Use sparingly in business software — a single playful moment in an otherwise efficient UI is delightful. A whole screen of bouncing elements is nauseating.

## Easing cheat sheet

### CSS cubic-bezier values

| Name | Value | When |
|---|---|---|
| Snap out | `cubic-bezier(0.2, 0, 0, 1)` | Quick response, gentle settle |
| Smooth move | `cubic-bezier(0.4, 0, 0.2, 1)` | General purpose transitions |
| Enter | `cubic-bezier(0, 0, 0.2, 1)` | Elements appearing (ease-out) |
| Exit | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving (ease-in) |
| Bounce settle | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot and settle |
| Emphasized | `cubic-bezier(0.2, 0, 0, 1.0)` | Material Design 3 emphasized |

### Spring parameters (physics-based)

| Feel | Damping ratio | Stiffness | Mass |
|---|---|---|---|
| Snappy | 0.85-1.0 | 300-500 | 1 |
| Smooth | 0.7-0.85 | 150-300 | 1 |
| Bouncy | 0.4-0.7 | 200-400 | 1 |
| Elastic | 0.2-0.4 | 300-600 | 1 |
| Heavy | 0.7-0.85 | 100-200 | 2-3 |

## Duration rules

### By interaction type
| Interaction | Duration | Why |
|---|---|---|
| Press feedback | 50-100ms | Must feel instant |
| Tooltip / hover | 100-150ms | Quick reveal, not distracting |
| Button state change | 150-200ms | Acknowledged but not slow |
| Dropdown / menu open | 200-250ms | Needs spatial context |
| Modal / dialog | 250-350ms | Important — needs entrance |
| Page transition | 300-400ms | Largest spatial change |
| Complex choreography | 400-600ms total | Staggered, never one long animation |
| Loading skeleton | 1000-2000ms loop | Ambient, non-blocking |

### The 400ms rule
If a single animation exceeds 400ms, it's probably blocking the user. Exceptions:
- Staggered sequences where individual items are <200ms each
- Background/ambient animations (skeleton loaders, progress)
- Intentionally emphatic moments (first-run, celebration)

## Enter vs exit asymmetry

Entrances and exits are NOT the same animation reversed.

| | Enter | Exit |
|---|---|---|
| Duration | Longer (250-350ms) | Shorter (150-200ms) |
| Easing | Ease-out (decelerate in) | Ease-in (accelerate out) |
| User attention | High (new content) | Low (leaving) |
| Motion | Larger movement | Smaller movement |

**Why**: Users need time to notice and orient to new content. Departing content should leave quickly to make room.

### Specific patterns
- **Modal enter**: Fade + scale from 0.95→1.0, 300ms ease-out
- **Modal exit**: Fade + scale from 1.0→0.95, 200ms ease-in
- **Toast enter**: Slide from edge + fade, 250ms ease-out
- **Toast exit**: Fade only (no slide), 150ms ease-in
- **List item enter**: Fade + slide-up 8px, staggered 30ms per item
- **List item exit**: Fade only, 100ms, no stagger

## Stagger patterns

When multiple elements animate, stagger prevents visual chaos.

| Pattern | Delay | Use |
|---|---|---|
| Sequential | 30-50ms per item | List items, grid cards, menu options |
| Cascade | 40-60ms, increasing delay | Dashboard widgets, hero sections |
| Grouped | 0ms within group, 80ms between groups | Related items move together |

### Rules
- **Max stagger total**: 300ms. If you have 20 items, don't stagger all of them — animate the visible viewport only.
- **Direction**: Stagger should follow reading direction (top-to-bottom, left-to-right in LTR).
- **First item is instant**: The first item in a stagger should have 0 delay — the stagger is between items, not before the first.

## Context-dependent motion

The same component may need different motion in different contexts:

| Context | Register | Example |
|---|---|---|
| Finance dashboard | Efficient | Minimal, crisp transitions. No bounce. |
| Social feed | Playful | Like animations, bouncy reactions |
| Healthcare form | Efficient/Informative | Clear state changes, no personality |
| Onboarding flow | Informative/Playful | Guided, engaging, some delight |
| Error recovery | Emphatic | Shake, pulse, clear direction |
| E-commerce checkout | Efficient | Fast, trustworthy, no distractions |

When in doubt, default to **Efficient**. It's never wrong — just sometimes underwhelming.
