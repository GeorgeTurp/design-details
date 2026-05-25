---
name: design-details-layout
description: Spacing, alignment, hierarchy, rhythm, sizing, concentric radius. Use when a layout feels crowded, unbalanced, monotonous, or just doesn't sit right.
version: 0.1.0
user-invocable: true
argument-hint: "[target]"
---

## MANDATORY PREPARATION

Invoke `design-details` — it holds the shared principles, the Context Gathering Protocol, and the Design System Protocol. Follow both before proceeding.

---

# design-details-layout

Compose layouts that feel intentional: clear hierarchy, consistent spacing, optical alignment, harmonious proportions.

## When to use this sub-skill

- "Something feels off" about spacing or alignment
- Grids feel monotonous or misaligned
- Visual hierarchy is unclear (no primary action, competing elements)
- Elements don't snap to a scale — random 13px gaps, mixed units
- Nested rounded surfaces look wrong (concentric radius drift)
- Need to bring a feature back in line with the design system

## Preparation

1. Identify the spacing scale in use (Tailwind default, custom tokens, RN/SwiftUI theme).
2. Identify the typographic scale and line-height conventions.
3. Note the grid / breakpoints.
4. Audit at the actual viewport(s) the product targets — don't review desktop if the product is mobile-first.

## Review dimensions

Work through these systematically. For each, use the `Before | After | Why` table format from the parent skill.

### Spacing & rhythm
- All gaps use the scale — no arbitrary values (`gap: 13px` is a smell)
- Consistent rhythm between repeated elements (cards, list rows, form fields)
- Negative space is intentional, not leftover
- Vertical rhythm holds across sections — gaps between H2 and body should match across the page

### Alignment
- Pixel-perfect to grid
- **Optical alignment over geometric** where visual weight differs (icons, play triangles, asymmetric shapes, type with descenders)
- Elements on the same axis share a baseline
- Text and icons in the same row align by cap-height or x-height, not bounding box

### Sizing & proportions
- Components sized to their role in the hierarchy
- Touch targets ≥ 44×44pt (iOS) / 48×48dp (Android) / 40×40px (web minimum)
- Line length capped at 65–75ch for body text
- Density should match content type: data-dense UIs need tight spacing, content-heavy views need more air. Don't apply the same scale to both.

### Hierarchy
- **One primary action per view.** If there are two, one is actually secondary.
- Typographic hierarchy uses contrast, not just size (weight, color, spacing, position)
- Scannable: a user should see the most important element first
- **Squint test**: blur your eyes — can you still identify the primary element, secondary, and clear groupings? If not, hierarchy isn't working.

### Concentric radius
- Outer radius = inner radius + padding
- Mismatched nested radii is the #1 "feels off" tell — a 12px outer card with an 8px inner card and 8px padding looks wrong; either match the inner to 4px or change the padding to 4px

### Composition
- Don't default to card grids for everything — spacing and alignment create visual grouping naturally
- Use cards only when content is truly distinct and actionable
- **Never nest cards inside cards** — use spacing and dividers for hierarchy within
- Vary card sizes or mix cards with non-card content to break monotonous repetition

### Responsive consistency
- Spacing, alignment, and hierarchy hold across breakpoints
- No awkward mid-breakpoint states (test at 600px, 900px, not just the named breakpoints)
- Container queries beat viewport queries when a component appears in multiple contexts

## Output

Findings grouped by dimension, each as a `Before | After | Why` table. Omit dimensions that had no issues. Follow the lettered-section format from the parent skill.

## NEVER

- Suggest a hardcoded value when a token exists
- Recommend tight spacing for content-heavy reading views
- Default to "make everything a card"
- Mix arbitrary radii in a nested composition

## Cross-references

- `../design-details-typography/SKILL.md` — vertical rhythm and line-height live here
- `../design-details-accessibility/SKILL.md` — hit areas, focus rings
- `../design-details-color/SKILL.md` — when hierarchy is failing because contrast is, not size
