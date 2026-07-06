# Eval: Init flow detects what it can and writes .design-details.md

## Prompt
> /design-details init

## Context
- Platform: react-native (Expo app, `package.json` has `expo` + `react-native`, theme tokens in `src/theme.ts`, PostHog SDK installed)
- Component: n/a — project setup
- Business context: No `.design-details.md` exists yet

## Expected behavior
- [ ] Does NOT run an audit
- [ ] Detects platform (React Native), token location (`src/theme.ts`), and analytics tool (PostHog) from the codebase without asking
- [ ] Asks the user only the human questions — target audience, use cases, brand personality/tone — in one batched round
- [ ] Does NOT ask the user anything the repo already answers (e.g. "what platform is this?")
- [ ] Writes `.design-details.md` at the project root following the template (Product, Target audience, Use cases, Tone, Platforms, Design system, Analytics, Notes)
- [ ] Detected values appear in the file alongside the user's answers
- [ ] Shows the user what was saved
- [ ] File stays under a page

## Pass criteria
Fail if it asks about platform/tokens/analytics tool (all detectable), skips the interview and invents audience/tone from the code, or doesn't write the file. If a `.design-details.md` already exists, it must show the current contents and ask what to update instead of restarting.
