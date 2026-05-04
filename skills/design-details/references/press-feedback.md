# Press Feedback Reference

Exact values for press states by component type. These are starting points — adjust for context, but don't invent from scratch.

## Primary buttons

| Property | Rest | Pressed | Released |
|---|---|---|---|
| Scale | 1.0 | 0.96 | 1.0 |
| Opacity | 1.0 | 0.85 | 1.0 |
| Shadow elevation | default | 0 (flatten) | default |
| Duration (press) | — | 80ms | — |
| Duration (release) | — | — | 180ms ease-out |
| Haptic | — | light impact | — |

### Why these values
- Scale 0.96 is perceptible but doesn't feel broken. 0.9 looks like a bug. 0.98 is invisible.
- Shadow flattens on press to reinforce "pushing in." Returns on release.
- Press is faster than release. Instant acknowledgment, graceful recovery.

## Secondary / ghost buttons

| Property | Rest | Pressed | Released |
|---|---|---|---|
| Scale | 1.0 | 0.97 | 1.0 |
| Background opacity | 0 | 0.08 | 0 |
| Duration (press) | — | 60ms | — |
| Duration (release) | — | — | 200ms ease-out |
| Haptic | — | soft impact | — |

### Notes
- Ghost buttons get a subtle background fill on press instead of shadow changes.
- Lighter scale (0.97) because these are visually lighter elements.

## Cards (tappable)

| Property | Rest | Pressed | Released |
|---|---|---|---|
| Scale | 1.0 | 0.98 | 1.0 |
| Shadow elevation | md | sm (reduce) | md |
| Y offset | 0 | 1px down | 0 |
| Duration (press) | — | 100ms | — |
| Duration (release) | — | — | 250ms spring |
| Haptic | — | light impact | — |

### Notes
- Cards scale less (0.98) because they're larger — same percentage = more visible pixel movement.
- The 1px Y-offset reinforces the "press in" metaphor for elevated cards.
- Spring release on cards feels more physical than ease-out.

## Toggle switches

| Property | Off | Turning on | On |
|---|---|---|---|
| Thumb scale | 1.0 | 1.15 (stretch) | 1.0 |
| Track color | muted | — | accent |
| Duration | — | 250ms spring | — |
| Haptic | — | medium impact | — |

### Notes
- Thumb stretches slightly during slide to feel elastic.
- Single medium haptic at the commit point (when it snaps), not during drag.
- Color transition should complete before the thumb arrives — lead with color.

## Icon buttons

| Property | Rest | Pressed | Released |
|---|---|---|---|
| Scale | 1.0 | 0.85 | 1.0 |
| Opacity | 1.0 | 0.6 | 1.0 |
| Duration (press) | — | 50ms | — |
| Duration (release) | — | — | 150ms ease-out |
| Haptic | — | soft impact | — |

### Notes
- Icon buttons scale more aggressively (0.85) because they're small — need more movement to be perceptible.
- Lower opacity on press helps when icons don't have backgrounds.

## List items / rows

| Property | Rest | Pressed | Released |
|---|---|---|---|
| Background | transparent | surface-hover color | transparent |
| Scale | 1.0 | 1.0 (no scale) | 1.0 |
| Duration (press) | — | 40ms | — |
| Duration (release) | — | — | 300ms ease-out |
| Haptic | — | selection tick | — |

### Notes
- List items should NOT scale — it disrupts the list's alignment grid.
- Background highlight only. Instant on, slow fade out.
- Selection haptic (tick) not impact — these are navigational, not actional.

## FABs (Floating Action Buttons)

| Property | Rest | Pressed | Released |
|---|---|---|---|
| Scale | 1.0 | 0.92 | 1.0 |
| Shadow elevation | lg | md (reduce) | lg |
| Duration (press) | — | 100ms | — |
| Duration (release) | — | — | 300ms spring (bouncy) |
| Haptic | — | medium impact | — |

### Notes
- FABs are high-emphasis, so they get the most dramatic press state.
- Bouncy spring on release reinforces their "floating" nature.

## Universal rules

1. **Press is always faster than release.** Acknowledge instantly, recover gracefully.
2. **Scale compounds with size.** Large elements scale less (0.98), small elements scale more (0.85-0.92).
3. **Never scale text inputs.** Use border/shadow changes instead — scaling text feels wrong.
4. **Disabled elements get no press feedback.** Opacity 0.4, no animation, no haptic.
5. **Cancel on drag-out.** If the user presses and drags away, revert to rest state — don't trigger.
