---
name: design-details-analytics
description: Instrumentation as you ship UI. What to track, how to name events and properties, and where to place tracking so the data is usable later. Use when adding a feature, designing a flow, or asked to review tracking.
version: 0.1.0
user-invocable: true
argument-hint: "[target]"
---

## MANDATORY PREPARATION

Invoke `design-details` — it holds the shared principles and the Context Gathering Protocol. Follow them before proceeding.

For this sub-skill you also need:

- **Analytics tool in use**: Amplitude, Mixpanel, Segment, PostHog, Heap, custom? Naming conventions and capabilities differ.
- **Existing taxonomy**: is there a tracking plan, event dictionary, or naming convention already in use? Check the codebase for existing event names and follow the pattern.
- **What decisions the data needs to support**: are we measuring activation, conversion, retention, feature engagement, or quality? The question shapes what to instrument.

---

# design-details-analytics

Instrumentation is a design detail. Events that are vague, inconsistent, or missing are invisible at ship time and impossible to fix later. Ship the right events with the right properties the first time.

## When to use this sub-skill

- Shipping a new flow, feature, or surface
- Adding a CTA or conversion point
- User asks "what should we track for this?"
- Reviewing an existing flow's instrumentation before a launch decision
- A tracking plan is being designed alongside the feature

## Core principles

### Track outcomes, not implementation
Events should describe what the user did from their perspective, not what your code did.

| Avoid | Prefer |
| --- | --- |
| `button_clicked` | `Project Created` |
| `api_called` | `Subscription Started` |
| `modal_opened` | `Upgrade Prompt Viewed` |

The user didn't click a button — they completed a goal. Name the event by the goal.

### Name events as past-tense actions
The convention that works across most tools:
- **`Object Action`** — e.g. `Project Created`, `Invite Sent`, `Plan Upgraded`
- Title Case, two-to-four words
- Past tense — the event fired because something happened
- One verb per event — `Signup Started` and `Signup Completed` are two events, not one

### Properties carry the story
The event tells you *what* happened. The properties tell you *what about it* mattered.

For every event, ask:
- **Who** — handled by user identity, but consider role/plan/segment as properties
- **What** — object type, object id, count
- **Where** — surface, source page, entry point (`source: "billing"` vs `source: "settings"`)
- **How** — method, variant, experiment bucket
- **Why** (sometimes) — reason for cancellation, type of error

### Funnels need consistent properties
A funnel breaks the moment property names diverge. If `Signup Started` has `method: "email"` but `Signup Completed` has `signup_method: "email"`, you can't follow the user across them. Pick one name per concept and reuse it.

### Don't track what you can't act on
If you can't name a decision the event will inform, don't ship it. Every event has cost: schema maintenance, dashboard drift, query overhead. "Just in case" data is the slowest poison.

### Page views are not enough
A page view tells you a user arrived. It does not tell you whether they got value. Instrument the moment of value — the upload finishing, the file generating, the message sending. That's the metric leadership actually cares about.

## When to fire which event

### Identify before track
For logged-in users, call `identify` (or your tool's equivalent) before the first event, with stable user properties (id, plan, role, signup date, org id). Otherwise events land on anonymous IDs and you lose them at signup.

### Fire on success, not intent
- ❌ `Project Created` fires when the user clicks Create
- ✓ `Project Created` fires after the API confirms creation

Track intent separately if it matters (`Create Project Attempted`, `Create Project Failed`) — but don't conflate intent with success.

### Errors are events too
- `[Action] Failed` events with `error_type`, `error_message`, `error_code`
- Lets you measure reliability without leaving the analytics tool

## Property hygiene

### Naming
- `snake_case` for property keys (most tools' convention)
- Consistent units in the name (`duration_ms`, not `duration` ambiguously)
- Booleans named affirmatively (`is_paid` not `not_free`)
- Currency as a number in cents/minor units (`amount_cents`), with a separate `currency` property

### Values
- Enums use a small fixed vocabulary — don't let `plan: "Pro"` and `plan: "pro"` coexist
- Don't log PII unless explicitly required and approved (no emails, phone numbers, free-text in event properties)
- Truncate free-text properties to a reasonable length, or move them to a feedback table instead

### Volume
- Each event should be sampled at a rate that lets you answer questions confidently
- High-volume events (scroll, hover, mouse move) usually shouldn't be tracked individually — aggregate client-side and fire summary events

## Common flows: what to instrument

### Signup / activation
- `Signup Started` (method, source)
- `Signup Completed` (method, source, time_to_complete_seconds)
- `Onboarding Step Viewed` (step_name, step_index)
- `Onboarding Completed` (steps_completed, time_to_complete_seconds)
- `Activation Event` — the moment of first value, named for the product (`First Project Created`, `First Message Sent`)

### Conversion
- `Upgrade Prompt Viewed` (variant, source)
- `Plan Selected` (plan_name, billing_period, source)
- `Subscription Started` (plan_name, billing_period, amount_cents, currency)
- `Subscription Cancelled` (plan_name, reason, days_active)

### Feature engagement
- `[Feature] Used` for the headline action of the feature
- `[Feature] Viewed` only if there's a real distinction between viewing and using
- Sub-actions named explicitly (`Document Shared`, `Document Exported`, `Document Duplicated`)

### Errors
- `[Action] Failed` with `error_type`, `error_message`, `error_code`
- Form submission failures with the field that failed validation

## When you have an analytics MCP available

If the project is connected to a tool like Amplitude (or another analytics MCP), do not invent event names. Pull the existing taxonomy first (events, properties, naming convention) and propose new events that fit it. The fastest way to break a dashboard is to ship an event that doesn't follow the project's convention.

## Anti-patterns

- Generic event names (`Clicked`, `Page Viewed`, `Action Performed`)
- Mixing tenses (`Project Create` + `Project Created`)
- Properties named after UI elements (`button_color: "blue"`)
- Tracking every hover, scroll, and mouse move individually
- Free-text fields with no enum — `plan` taking 200 distinct casings
- PII in event properties
- Firing events before identifying the user
- "Just in case" events with no associated decision or dashboard

## Output

When auditing an existing flow, produce findings as `Before | After | Why` tables, grouped into:

- **A — Event names** (missing, vague, or inconsistent)
- **B — Properties** (missing context, wrong names, PII risk)
- **C — Firing logic** (intent vs success, identify timing, error tracking)
- **D — Coverage gaps** (events the flow needs but doesn't have)

When designing instrumentation for a new feature, produce a small tracking plan:

```
Event: Project Created
Fires when: API confirms project created (not on click)
Properties:
  - project_id (string)
  - template_used (string, enum: blank|from_template|imported)
  - source (string, enum: dashboard|onboarding|sidebar)
  - workspace_id (string)
```

## Cross-references

- `../design-details-copy/SKILL.md` — error messages users see (the human side of the events you track)
- `../design-details-accessibility/SKILL.md` — ensure tracking code doesn't block screen reader announcements or focus management
