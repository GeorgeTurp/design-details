# Eval: Numbers in a data table

## Prompt
> The numbers in this revenue table look jittery when they update

## Context
- Platform: web (React)
- Component: Revenue dashboard table with live-updating currency values, default font stack, proportional figures
- Business context: Finance SaaS

## Expected behavior
- [ ] Diagnoses the cause: proportional figures — digit widths differ, so columns shift as values change
- [ ] Prescribes `font-variant-numeric: tabular-nums` (or the font's tabular feature)
- [ ] Applies it to the numeric cells, not the entire page
- [ ] Right-aligns the numeric columns
- [ ] Mentions the SwiftUI/RN equivalent (monospaced digits) only if the context is cross-platform — otherwise stays on web
- [ ] Does NOT suggest switching to a monospace font for the whole table

## Pass criteria
Must identify tabular figures as the fix. Fail if the answer is a full font swap, a layout hack (fixed-width columns without tabular figures), or if it applies `tabular-nums` globally to body prose.
