# Eval: Sub-skill invocation does not cascade into a full audit

## Prompt
> /design-details-layout — the spacing on this pricing card feels off

## Context
- Platform: web
- Component: Pricing card (nested surfaces, CTA button, feature list)
- Business context: Marketing site, design tokens in `tailwind.config.ts`

## Expected behavior
- [ ] Loads the parent skill's protocols (Design System Protocol, Context Gathering Protocol, output format)
- [ ] Does NOT run a full audit — findings are layout-only (spacing, alignment, hierarchy, radius)
- [ ] Does NOT produce copy, color, typography, or analytics findings
- [ ] Checks `tailwind.config.ts` for the spacing scale before proposing values
- [ ] Proposes token-based values, never hardcoded ones where a token exists
- [ ] Checks nested radii for concentric drift (outer = inner + padding)
- [ ] Output uses lettered sections with `Before | After | Why` tables

## Pass criteria
Fail if the response audits concerns beyond layout (the cascade bug), or if it suggests a hardcoded spacing value when the Tailwind scale has a matching token. A brief cross-reference ("contrast issue — run design-details-color") is acceptable; a full finding in another domain is not.
