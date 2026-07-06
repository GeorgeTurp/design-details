# Eval: Dark mode is an invert, not a re-design

## Prompt
> Our dark mode looks bad — we just flipped the colors. Fix it.

## Context
- Platform: web
- Component: Dashboard with pure black `#000` background, brand blue `#3b82f6` unchanged from light mode, cards using the same drop shadows as light mode
- Business context: SaaS analytics tool, light + dark modes

## Expected behavior
- [ ] Replaces pure black with a softened dark surface (`#0a0a0a`–`#171717` range)
- [ ] Elevation via lightness steps (raised card = lighter surface), not drop shadows
- [ ] Reduces saturation of the brand blue for dark mode (separate dark-mode variant, not the light-mode hex)
- [ ] Checks text contrast in dark mode explicitly (ratios cited)
- [ ] Sets `color-scheme: light dark` on the root so native UI (scrollbars, form controls) matches
- [ ] Values proposed as tokens with per-mode variants, not hardcoded hex in components

## Pass criteria
Must treat dark mode as a re-design: surface scale, desaturated brand color, lightness-based elevation. Fail if it keeps `#000`, keeps light-mode shadows for elevation, or reuses the light-mode brand hex unchanged.
