---
name: design-details-typography
description: Font choice, hierarchy, sizing, weight, line-height, readability, typographic characters. Use when text feels flat, hard to read, or untuned.
version: 0.1.0
user-invocable: true
argument-hint: "[target]"
---

## MANDATORY PREPARATION

Invoke `design-details` — it holds the shared principles, the Context Gathering Protocol, and the Design System Protocol. Follow both before proceeding.

---

# design-details-typography

Type carries half the personality of an interface. Tune the scale, the weights, the rhythm, and the small typographic details that separate considered work from default.

## When to use this sub-skill

- Hierarchy is unclear because everything looks the same weight or size
- Long blocks of text are hard to scan
- Numbers don't align in tables (tabular figures missing)
- Fonts feel generic, mismatched, or too many in use
- Body text looks loose or cramped
- Quotes and dashes are straight ASCII instead of typographic forms

## Preparation

1. Identify the type scale in use (Tailwind default, modular scale, custom tokens)
2. Note the font stack — system, custom, variable font?
3. Check whether OpenType features are enabled (`font-feature-settings`, `font-variant-numeric`)
4. Identify the line-height conventions per text role

## Review dimensions

### Hierarchy through contrast
Hierarchy comes from contrast across multiple axes, not just size. Tune at least two of:
- **Size** — but capped; once differences exceed 2× they read as decorative
- **Weight** — 400 vs 600 reads stronger than 14px vs 16px in many cases
- **Color** — primary text vs muted at 60–70% opacity for secondary
- **Tracking** — slightly tighter for display, slightly looser for all-caps small text
- **Position** — labels above values, not beside, for scanability

### Scale
- Use a defined scale (1.125, 1.2, 1.25, golden, etc.) — never one-off values
- 5–7 sizes is enough for most products. More creates inconsistency.
- Display sizes need their own line-height, not the body line-height

### Line-height
- Body: 1.4–1.6
- Display / headings: 1.1–1.25
- Buttons / single-line UI: 1.0–1.2
- Tighter as size goes up; looser as size goes down

### Line length
- 65–75 characters per line for body text
- Tighter (45–65) for narrow columns and captions
- Wider sets need bigger line-height to remain readable

### Tabular figures
- Numbers in tables, dashboards, and any vertical alignment of digits **must** use tabular figures (`font-variant-numeric: tabular-nums` on web, monospaced digits in SwiftUI/RN)
- Without them, columns jitter as values change

### OpenType features to enable when available
- `font-feature-settings: "ss01", "cv01"` — stylistic alternates that often improve specific glyphs (single-story `a`, straight `l`)
- `font-variant-numeric: tabular-nums` for data
- `font-variant-numeric: oldstyle-nums` for body prose in serif faces (less shouty than lining figures)
- `font-feature-settings: "kern"` is usually on by default but worth verifying

### Typographic characters
Replace ASCII fallbacks with the correct character:
- Straight quotes `'` `"` → curly `'` `"`
- Hyphen used as range → en-dash `–` (e.g. `Mon – Fri`, `2020–2024`)
- Double-hyphen `--` → em-dash `—`
- Three dots `...` → ellipsis `…`
- Multiplication sign in dimensions → `×` not `x`
- Non-breaking space between number and unit (`24 px` → `24 px`) to prevent ugly wraps

### Font pairing
- One typeface is the safest move. Two is the maximum unless you have a strong reason.
- If pairing, contrast in form (serif + sans, geometric + humanist) — never two similar sans-serifs
- Use weights of a single family before introducing a second family

### Readability
- Minimum body size: 16px web, 17pt iOS, 14sp Android
- Avoid pure black on pure white for long reading — use `#111` or `#1a1a1a` for less retina strain
- Ensure sufficient contrast (see design-details-color and design-details-accessibility)

## Anti-patterns

- All-caps body text (legal/disclosure copy in caps is harder to read, not more serious)
- Using `font-weight: bold` and `font-weight: 700` interchangeably without checking which weight the font actually ships
- Italic for emphasis in UI labels — use weight instead
- More than three text colors per surface (primary, secondary, accent — that's it)
- Mixing two sans-serifs in the same surface

## Output

Findings as `Before | After | Why` tables, grouped by dimension. Follow the lettered-section format from the parent skill.

## Cross-references

- `../design-details-layout/SKILL.md` — vertical rhythm depends on line-height
- `../design-details-color/SKILL.md` — text color and contrast
- `../design-details-accessibility/SKILL.md` — minimum sizes, contrast ratios
- `../design-details-copy/SKILL.md` — typographic characters in copy (curly quotes, ellipsis, em-dash)
