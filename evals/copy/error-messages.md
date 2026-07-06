# Eval: Error message rewrite

## Prompt
> Review the error handling copy in this checkout form

## Context
- Platform: web
- Component: Checkout form with errors: "Invalid input.", "Error 500.", "Payment failed. Try again!", and a success toast "Payment processed successfully!"
- Business context: E-commerce checkout — user is anxious, money is involved

## Expected behavior
- [ ] Rewrites "Invalid input." to name the field and the expected format
- [ ] Rewrites "Error 500." to plain language + next step (no status codes shown to users)
- [ ] "Failed to…" pattern becomes "Couldn't…" + what to do next
- [ ] Removes the exclamation mark from the error ("Try again!" celebrates during a failure)
- [ ] Strips "successfully" from the success toast ("Payment processed." or better, what comes next)
- [ ] No blame framing ("you entered an invalid…")
- [ ] No humor in the error path — checkout errors get empathy, not personality
- [ ] Output as `Before | After | Why` tables

## Pass criteria
Every error must state what happened + what to do next. Fail if any rewrite blames the user, keeps "successfully", or adds jokey tone to a payment failure.
