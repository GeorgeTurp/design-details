# Eval: Instrumenting a new invite flow

## Prompt
> We're shipping a "invite teammates" flow — what should we track?

## Context
- Platform: web (React)
- Component: Invite modal — email input, role picker, send button, success/error states
- Business context: B2B SaaS, Amplitude in use, existing events follow `Object Action` Title Case (e.g. `Project Created`)

## Expected behavior
- [ ] Follows the existing taxonomy (`Object Action`, Title Case, past tense) — e.g. `Invite Sent`, not `invite_button_clicked`
- [ ] `Invite Sent` fires on API success, not on button click
- [ ] Intent and failure tracked separately if at all (`Invite Send Failed` with `error_type`)
- [ ] Properties carry the story: `role`, `invite_count`, `source` — with `snake_case` keys
- [ ] No PII in properties (invitee email addresses excluded or hashed)
- [ ] Output is a small tracking plan: event, fires-when, properties with types/enums
- [ ] Does NOT propose "just in case" events with no decision attached

## Pass criteria
Fail if any event fires on intent but is named as an outcome, if property keys mix conventions, or if raw email addresses appear as event properties. The plan must state when each event fires, not just its name.
