# Eval: Concentric radius and spacing scale on nested cards

## Prompt
> Something looks off about this card — the image inside doesn't sit right in the container

## Context
- Platform: web
- Component: Card with `border-radius: 16px`, `padding: 12px`, inner image with `border-radius: 16px`
- Business context: SaaS dashboard, Tailwind with default scale

## Expected behavior
- [ ] Identifies the concentric radius drift: outer 16px with 12px padding needs inner radius 4px (outer = inner + padding)
- [ ] Proposes fixing either the inner radius or the padding — states both options
- [ ] Uses scale-conforming values (4px/8px/12px/16px), not arbitrary ones like 5px
- [ ] References the token/scale in use rather than hardcoding, if tokens exist
- [ ] Does NOT suggest matching the radii (16px inside 16px is the bug, not the fix)

## Pass criteria
Must apply the `outer = inner + padding` rule with correct arithmetic. Fail if it suggests making both radii equal or proposes an off-scale value.
