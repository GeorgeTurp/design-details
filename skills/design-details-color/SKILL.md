---
name: design-details-color
description: Palettes, contrast, dark mode, semantic color, accessible color pairings. Use when colors feel arbitrary, contrast fails, or dark mode is broken.
version: 0.1.0
user-invocable: true
argument-hint: "[target]"
---

## MANDATORY PREPARATION

Invoke `design-details` — it holds the shared principles, the Context Gathering Protocol, and the Design System Protocol. Follow both before proceeding.

---

# design-details-color

Color is the loudest signal in a UI — it carries brand, state, mood, and meaning before anyone reads a word. Treat it as a system, not a decoration.

## When to use this sub-skill

- Palette feels arbitrary, dull, or off-brand
- Contrast fails WCAG checks
- Dark mode is a quick invert and looks broken
- Semantic colors (success, warning, error) are inconsistent across components
- Accent color is overused — everything is "primary"
- Hover/focus/disabled states don't follow a system

## Preparation

1. Identify the palette tokens (`--color-*` or theme objects)
2. Check whether colors are defined in OKLCH/HSL (good — tuneable) or hex/RGB (harder to manipulate systematically)
3. Note whether the product has light, dark, or both modes
4. Check accessibility contrast in both modes against tokens for primary text, secondary text, and interactive elements

## Review dimensions

### Palette structure
A working palette has these roles, each with a scale:
- **Neutral / gray** — backgrounds, surfaces, borders, body text. 9–12 steps.
- **Brand / primary** — actions, links, focus rings. 9–12 steps.
- **Semantic** — success, warning, error, info. Each with 3–5 steps minimum (border, bg, text).
- **Optional accents** — for special surfaces, illustrations, data viz.

If the palette has only "blue", "gray", "red" without scales, that's the first thing to fix.

### Contrast
- **Body text on background**: ≥ 4.5:1 (WCAG AA), ≥ 7:1 (AAA)
- **Large text (18pt+ regular, 14pt+ bold)**: ≥ 3:1 (AA), ≥ 4.5:1 (AAA)
- **Interactive UI elements and focus indicators**: ≥ 3:1 against adjacent colors
- Check borders against their background — `border: 1px solid #eee` on white fails this and is invisible to many users

### Semantic color usage
- **Red** for destructive actions and errors only — never for "remove" if remove is non-destructive (use neutral)
- **Green** for confirmed success states, not for "go" buttons
- **Yellow / amber** for warnings, not for primary actions
- **Blue** is the safe default for interactive elements unless the brand color is appropriate

### Dark mode
- Don't invert. Re-design.
- Surfaces in dark mode use elevation through lightness, not shadow — a "raised" card is a step lighter than its background, not a darker one with a shadow
- Pure black `#000` backgrounds are too harsh; use `#0a0a0a` to `#171717`
- Reduce saturation in dark mode — colors that read as "vibrant" on white look neon on black
- Test brand colors specifically — most need a separate dark-mode variant

### Accent restraint
- One accent per surface, max two for a whole product
- If everything is accented, nothing is

### State colors
Every interactive element needs a system for:
- Default
- Hover (subtle lift in lightness, ~5%)
- Active / pressed (subtle drop in lightness, or stronger saturation)
- Focus (visible ring, ≥ 3:1 contrast against everything around it)
- Disabled (reduced opacity AND reduced saturation, not just opacity)

### Color blindness
- Don't rely on color alone for state — pair red/green with icons or text
- ~8% of men have some form of color vision deficiency; check critical paths with a simulator

### Native browser UI
- Set `color-scheme: light dark` on the root so scrollbars, form controls, and selection highlights match
- Customize selection color (`::selection`) when the default clashes with brand

## Anti-patterns

- Hex codes in components (`#3b82f6`) instead of tokens
- Pure black or pure white in production UI (too high contrast, eye strain)
- Inverting light mode for dark mode without re-tuning saturation
- Using semantic colors for non-semantic purposes (green CTA when the action isn't success-related)
- Focus ring that's the same color as the brand button (no contrast against the button itself)
- More than one "primary" call to action on a screen

## Output

Findings as `Before | After | Why` tables, grouped by dimension. Include contrast ratios where relevant. Follow the lettered-section format from the parent skill.

## Cross-references

- `../design-details-typography/SKILL.md` — text color choices live at the intersection
- `../design-details-accessibility/SKILL.md` — focus rings, contrast minimums, color-blind safety
- `../design-details-layout/SKILL.md` — borders and dividers depend on the neutral scale
