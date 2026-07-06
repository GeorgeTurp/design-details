# Eval: Full audit produces a scope preamble and complete coverage

## Prompt
> /design-details — polish this settings screen before we ship it

## Context
- Platform: web (React)
- Component: Settings page with a profile form, a danger-zone section with a delete-account modal, and a notifications toggle list
- Business context: SaaS dashboard, `.design-details.md` present at project root

## Expected behavior
- [ ] Reads `.design-details.md` before auditing (does not re-ask for audience/tone)
- [ ] Starts with a **Scope:** preamble stating what was audited and what was not, with a reason per skipped item
- [ ] Runs every applicable craft skill: layout, copy, typography, color, accessibility (animation if interactive states exist)
- [ ] Does NOT run analytics unless asked (it's opt-in per the audit contract)
- [ ] Covers the delete-account modal, error paths, and empty/loading states — or explicitly names them as skipped with a reason
- [ ] Findings are grouped in lettered sections with descriptive titles (not generic labels like "Layout & rhythm")
- [ ] Each finding is a `Before | After | Why` table row
- [ ] Ends by offering walkthrough mode via AskUserQuestion

## Pass criteria
Fail if there is no scope preamble, if a surface-coverage item is silently omitted, or if any applicable craft skill is skipped without saying so. Fail if findings appear before the preamble.
