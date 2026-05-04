# Eval: Reduce motion compliance — Web

## Prompt
> Add a modal with enter/exit animation to this React app

## Context
- Platform: web (React + Framer Motion)
- Component: Confirmation modal
- Business context: SaaS dashboard

## Expected behavior
- [ ] Modal has enter animation (scale 0.95→1 + fade, ~300ms spring)
- [ ] Modal has exit animation (scale 1→0.95 + fade, ~200ms ease-in)
- [ ] Exit is faster than enter (asymmetric)
- [ ] Respects `prefers-reduced-motion`: removes scale/slide, keeps opacity
- [ ] Framer Motion `MotionConfig` or per-component reduced motion handling
- [ ] Overlay dims background with opacity transition
- [ ] Does NOT use `animation: none` blanket — keeps opacity changes

## Pass criteria
Must have both the animation AND the reduce motion fallback. Blanket `* { animation: none }` is a fail — must be targeted.
