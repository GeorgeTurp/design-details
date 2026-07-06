# Eval: Focus rings and keyboard traversal on a modal

## Prompt
> Add a confirmation modal for deleting a workspace — make sure it's accessible

## Context
- Platform: web (React)
- Component: Destructive confirmation modal, triggered from a settings page. Global stylesheet contains `*:focus { outline: none; }`
- Business context: SaaS admin settings

## Expected behavior
- [ ] Flags the global `outline: none` and replaces it with a visible `:focus-visible` ring (≥ 3:1 contrast, ~2px, offset)
- [ ] Focus moves into the modal on open and is trapped while open
- [ ] Escape closes; focus returns to the trigger element on close
- [ ] Background gets `inert` or `aria-hidden="true"` while the modal is open
- [ ] Destructive button label matches the action ("Delete workspace", not "OK" / "Yes")
- [ ] Modal purpose announced (labelled dialog role)
- [ ] Uses native/semantic elements (`<button>`, `<dialog>` or ARIA dialog pattern) — no `div role="button"` where a button works

## Pass criteria
Fail if `outline: none` survives without a replacement, if focus is not trapped and returned, or if Escape doesn't close. The focus ring must use `:focus-visible`, not bare `:focus`.
