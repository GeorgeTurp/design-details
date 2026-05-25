---
name: design-details-copy
description: Microcopy, labels, errors, empty states, CTAs, tone. Use when text reads awkwardly, leaves users guessing what to do, or feels off-brand.
version: 0.1.0
user-invocable: true
argument-hint: "[target]"
---

## MANDATORY PREPARATION

Invoke `design-details` — it holds the shared principles and the Context Gathering Protocol. Follow them before proceeding.

For this sub-skill you also need:

- **Voice / tone**: how does the product speak? (formal, friendly, sharp, playful, neutral)
- **Audience literacy**: technical users? consumers? mixed?
- **User's mental state in context**: stressed during errors? confident during success? anxious during payment? Copy should match the emotional register of the moment.

---

# design-details-copy

Improve the words users read. Clearer labels, kinder errors, useful empty states, a tone that matches the brand.

## When to use this sub-skill

- Labels are ambiguous or jargon-heavy
- Error messages blame the user or say nothing actionable
- Empty states are blank or unhelpful
- CTAs don't tell the user what happens next
- Tone drifts across the product
- User says "this text is confusing" or "this doesn't sound like us"

## Review dimensions

### Clarity
- Every label tells the user what will happen, in their words
- No jargon unless the audience uses it naturally
- One idea per sentence
- Prefer active voice: "We uploaded your file" not "Your file has been uploaded"

### Actionability (especially errors)
- Error messages say: what happened, why, what to do next
- Avoid blame ("you entered an invalid…") — state the fact ("email format not recognized")
- Offer a next step when one exists

### Empty states
- Explain what this space is for
- Show a primary action to fill it
- Never leave a blank region

### CTAs
- Verb-first, concrete ("Save changes", not "OK")
- Match the outcome ("Delete permanently" not "Delete" for irreversible actions)
- Primary action is distinct from secondary in weight and wording

### Tone consistency
- The product speaks with one voice across surfaces
- Adjust intensity by context: transactional moments stay neutral, celebratory moments can be warmer
- Match emotional register to user state — don't celebrate during an error path

### Forms & confirmations
- Instructions go **before** the field, not after
- Show format in an example, not as the sole placeholder (placeholders disappear when the user types)
- Confirmation dialogs: state the specific action + consequence ("Delete 'Project Alpha'? This can't be undone.") — never "Are you sure?"
- Destructive button labels match the action ("Delete project" not "Yes" or "OK")

### Loading & success states
- Loading copy should set expectations: what's happening + how long ("Analyzing your data… usually 30–60 seconds")
- Never leave "Loading…" for long operations — give context
- Success messages confirm what happened + what comes next ("Settings saved. Changes take effect immediately.")
- **Strip "successfully"** — it adds nothing. "Saved." not "Saved successfully." "Voice updated." not "Voice updated successfully."

### ⚠️ AI slop loading copy

Never write generic loading messages like:
- "Herding pixels…"
- "Teaching robots to dance…"
- "Counting backwards from infinity…"
- "Consulting the magic 8-ball…"

These are instantly recognizable as machine-generated. Write messages specific to what your product **actually does**.

### Microcopy hygiene
- Sentence case in UI (not Title Case) unless the brand specifies otherwise
- Oxford comma: follow house style; be consistent
- No trailing punctuation on buttons or labels
- No exclamation marks in success or status messages — "Saved." not "Saved!" Reserve `!` for genuine milestones
- Numerals for UI quantities (`1, 2, 3` not `one, two, three`)
- Use real typographic characters: curly quotes (`'` `"`), em-dashes (`—`), ellipsis (`…`)

## Patterns

### Error messages
| Avoid | Prefer |
| --- | --- |
| "Something went wrong." | "We couldn't save your changes. Try again, or refresh the page." |
| "Invalid input." | "Email needs an `@` and a domain." |
| "Error 500." | "Our server had a hiccup. We've been notified — try again in a moment." |
| "Failed to save." | "Couldn't save — try again in a moment." |
| "Failed to remove user." | "Couldn't remove this member — try again in a moment." |

**Pattern:** "Failed to…" → "Couldn't…" + next step. Shorter, warmer, always followed by what to do.

### Empty states
| Avoid | Prefer |
| --- | --- |
| "No results." | "Nothing matches *"[query]"*. Try broader terms or clear filters." |
| "No items yet." | "Start by adding your first [item]. [+ button]" |

### CTAs
| Avoid | Prefer |
| --- | --- |
| "Submit" | "Send message" / "Create account" / "Pay $49" |
| "Cancel" + "OK" on destructive modal | "Keep [item]" + "Delete permanently" |

## The 6 principles

Every piece of copy should pass this checklist:

1. **Specific** — "Enter email" not "Enter value"
2. **Concise** — cut every word that doesn't add meaning (but never sacrifice clarity for brevity)
3. **Active** — "Save changes" not "Changes will be saved"
4. **Human** — "Oops, something went wrong" not "System error encountered"
5. **Helpful** — tell users what to do, not just what happened
6. **Consistent** — pick one term per concept and never vary it (don't alternate "workspace" / "project" for variety)

## NEVER

- Use jargon without explanation
- Blame the user ("You made an error" → "This field is required")
- Be vague ("Something went wrong" without explanation or next step)
- Use passive voice when active is possible
- Use placeholder text as the only label — it disappears when the user types
- Vary terminology across the product for stylistic variety — consistency beats cleverness
- Write AI-slop loading messages (see ⚠️ section above)
- Use humor during errors — be empathetic instead
- Assume technical knowledge

## Output

Findings as `Before | After | Why` tables, grouped by dimension. Cite the specific file and component when possible. Follow the lettered-section format from the parent skill.

## Cross-references

- `../design-details-typography/SKILL.md` — typographic characters (ellipsis, curly quotes, non-breaking spaces)
- `../design-details-accessibility/SKILL.md` — screen reader announcements, live regions
