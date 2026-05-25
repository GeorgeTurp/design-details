---
name: design-details-accessibility
description: Keyboard, focus, screen readers, hit areas, reduced motion, contrast. Use when shipping a feature, before a release, or when the user mentions a11y, keyboard, focus, or screen reader.
version: 0.1.0
user-invocable: true
argument-hint: "[target]"
---

## MANDATORY PREPARATION

Invoke `design-details` — it holds the shared principles and the Context Gathering Protocol. Follow them before proceeding.

---

# design-details-accessibility

Accessibility is the floor. If a feature doesn't work with a keyboard, can't be reached by a screen reader, ignores reduced-motion, or fails contrast — it isn't shipped, no matter how nicely it animates.

## When to use this sub-skill

- Pre-release audit on any feature
- User says "a11y", "accessibility", "keyboard", "focus", "screen reader", "VoiceOver", "TalkBack"
- Adding new interactive components (modals, popovers, custom dropdowns, draggable lists)
- Routing through `design-details` for a full audit
- Designing for regulated industries (healthcare, finance, government) where accessibility is legally required

## Review dimensions

### Keyboard traversal
- Every interactive element must be reachable via Tab
- Tab order matches visual reading order — never rely on DOM order alone if positioning has reordered things
- No keyboard traps (modals included — Escape must close, focus must return)
- Skip links available on pages with heavy navigation
- Arrow keys move within a composite widget (menu, listbox, tabs), Tab moves between widgets

### Focus indicators
- Visible focus ring on every focusable element — never `outline: none` without a replacement
- Contrast against background ≥ 3:1
- 2px minimum, offset by 2px for breathing room
- Focus ring respects brand color but doesn't disappear into it (different from button's own color)
- `:focus-visible` (not `:focus`) so the ring shows for keyboard users but not on mouse click

### Hit areas
- Minimum 44×44pt iOS, 48×48dp Android, 40×40px web for any tap target
- If the visual element is smaller, expand the hit area with padding or `::before` overlay (web)
- Adjacent targets need at least 8px of separation

### Semantic structure
- One `<h1>` per page, then `<h2>` through `<h6>` in order — don't skip levels
- Landmark regions: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- Lists wrapped in `<ul>` / `<ol>`, not bare `<div>` stacks
- Buttons that look like links should still be `<button>`; links that look like buttons should still be `<a href>`. The interaction model decides, not the styling.

### Screen reader signals
- All interactive elements have an accessible name (visible label, `aria-label`, or `aria-labelledby`)
- Icons-only buttons need an `aria-label` describing the action
- Live regions (`aria-live="polite"` or `"assertive"`) for dynamic content like toasts, validation errors, and loading completions
- Status messages: use `role="status"` for non-urgent, `role="alert"` for urgent
- Form errors associate with their field via `aria-describedby`

### Reduced motion
- Honor `prefers-reduced-motion: reduce` (web) / `UIAccessibility.isReduceMotionEnabled` (iOS) / `AccessibilityInfo.isReduceMotionEnabled` (RN)
- Provide instant state changes as fallbacks — **never remove the feedback, only the motion**
- Parallax, autoplay video, and large directional motion are the priorities to disable

### Color and contrast
- Body text ≥ 4.5:1, large text ≥ 3:1, UI components ≥ 3:1 against adjacent colors
- Never rely on color alone — pair semantic color with icon or text
- Test in both light and dark mode

### Forms
- Every input has a visible label (not placeholder-only)
- Required fields marked with both visual indicator and `aria-required` or `required`
- Errors announced and placed adjacent to the field, not just at the top of the form
- Group related fields with `<fieldset>` and `<legend>`
- Autocomplete attributes on standard fields (`autocomplete="email"`, `"tel"`, `"name"`)

### Modals & overlays
- Focus moves into the modal on open
- Focus is trapped inside while open
- Escape closes
- Focus returns to the trigger element on close
- Background content has `aria-hidden="true"` or `inert` while modal is open
- Screen reader announces the modal's purpose on open

### Custom widgets
- Use native HTML before reaching for ARIA. A `<button>` beats a `<div role="button">` every time.
- If you must build custom, follow the relevant ARIA Authoring Practices pattern
- Test with VoiceOver (macOS/iOS), NVDA or JAWS (Windows), TalkBack (Android)

## Anti-patterns

- `outline: none` without a replacement focus ring
- Placeholder text as the only label
- Icon-only buttons without an accessible name
- Color as the only indicator of state
- Tab order broken by CSS positioning
- Toast messages without `aria-live`
- Modal that doesn't trap focus or close on Escape
- "Click here" links — link text should describe the destination
- Autoplay carousels, video with sound, or motion without a pause control

## Output

Findings grouped by dimension as `Before | After | Why` tables. Mark severity inline: **P0** (blocks shipping), **P1** (must fix before release), **P2** (fix soon). Follow the lettered-section format from the parent skill.

## Cross-references

- `../design-details-animation/SKILL.md` — reduced motion handling
- `../design-details-color/SKILL.md` — contrast minimums, color-blind safety
- `../design-details-copy/SKILL.md` — link text, error messages, live region content
- `../design-details-layout/SKILL.md` — hit areas, focus offset
