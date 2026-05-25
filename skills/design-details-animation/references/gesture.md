# Gesture Choreography Reference

Orchestration patterns for swipe, long-press, drag, and multi-gesture interactions.

## Swipe actions (list items)

### Reveal pattern (e.g., swipe-to-delete, swipe-to-archive)

| Phase | Behavior | Duration |
|---|---|---|
| Drag start | Item follows finger 1:1 up to threshold | — |
| Approaching threshold | Action icon scales from 0.8→1.0, color intensifies | continuous |
| Threshold crossed | Snap haptic + icon bounces to 1.1 then 1.0 | 150ms spring |
| Released past threshold | Item slides out, action executes | 250ms ease-out |
| Released before threshold | Item springs back to origin | 300ms spring |

### Key details
- **Threshold**: 35-40% of item width for primary action, 65%+ for destructive.
- **Rubber-banding**: Past the action zone, drag should feel heavier (0.3x finger movement).
- **Haptic at threshold**: Single medium impact. This is the "commit point" signal.
- **Destructive actions**: Require the longer swipe. Red background reveals progressively.
- **Cancel affordance**: Tapping anywhere else while action is revealed should dismiss it.

### Multi-action swipe
- Leading swipe: primary action (archive, mark read)
- Trailing swipe: secondary/destructive action (delete, flag)
- Short swipe reveals action buttons; full swipe executes primary
- Actions should be visually distinct (color + icon, never text alone)

## Long-press

### Timing thresholds
| Duration | Interpretation | Feedback |
|---|---|---|
| 0-150ms | Tap (ignore for long-press) | — |
| 150-500ms | Building toward long-press | Progressive scale to 0.96 + subtle opacity |
| 500ms | Long-press triggers | Medium haptic + context menu / drag lift |
| 500ms+ held | Sustained hold | Element "floats" at elevated state |

### Context menu reveal
1. Element begins subtle scale-down at 150ms (user knows something is happening)
2. At 500ms: medium haptic fires, element snaps to lifted state (scale 1.02, shadow increase)
3. Context menu appears with staggered fade-in (each item 30ms delay)
4. Background dims to 0.4 opacity over 200ms

### Drag initiation from long-press
1. Same 150-500ms buildup
2. At 500ms: element lifts (scale 1.05, shadow lg, opacity 0.9)
3. Placeholder appears in original position (ghost or gap)
4. Element follows finger with slight offset (center-bottom of element above finger)
5. Other elements animate to make room (200ms spring)

## Drag and drop

### Pickup
| Property | Value |
|---|---|
| Scale | 1.05 |
| Shadow | elevated (lg) |
| Opacity | 0.9 |
| Rotation | subtle tilt toward drag direction (±2°) |
| Haptic | medium impact on lift |

### During drag
- **Velocity tracking**: Element should feel like it has slight mass — lag finger by 1-2 frames at high speed.
- **Drop target highlighting**: Valid targets brighten/scale (1.02) as dragged item hovers over them. 100ms transition.
- **Invalid zones**: Element opacity drops further (0.6) when over non-droppable areas.
- **Reorder lists**: Items move out of the way with 200ms spring animation. Gap appears smoothly.
- **Edge scrolling**: When dragging near container edges, auto-scroll begins after 200ms hover. Speed increases with proximity to edge.

### Drop
| Scenario | Animation | Haptic |
|---|---|---|
| Valid drop | Spring to target position, 250ms | Success (light impact) |
| Invalid / cancel | Spring back to origin, 300ms | Error (rigid impact) |
| Reorder | Items settle into new positions, 200ms stagger | Selection tick |

### Key rules
- **Always provide a cancel.** Dragging back to origin or lifting off-target should revert.
- **Show destination preview.** Before drop, show where the item will land.
- **Respect scroll containers.** Drag should work across scrollable boundaries.

## Pinch-to-zoom

| Phase | Behavior |
|---|---|
| Gesture start | Content scales from pinch center point |
| During | 1:1 with finger distance. Min scale: 0.5x. Max: 3x. |
| Overshoot | Rubber-band past limits (0.5x multiplier on movement) |
| Release past limits | Spring back to nearest valid scale, 300ms |
| Release within limits | Momentum-based settle, decelerate over 200ms |
| Double-tap | Toggle between 1x and 2x, 300ms spring |

## Pull-to-refresh

| Phase | Behavior | Haptic |
|---|---|---|
| Pull start | Spinner begins rotating, follows finger | — |
| Threshold (60-80px) | Spinner icon morphs to "ready" state | Light impact |
| Release past threshold | Content holds down, spinner animates | — |
| Refresh complete | Content slides back up, 250ms spring | Success notification |
| Release before threshold | Content springs back, 200ms | — |

### Details
- Spinner rotation should accelerate with pull distance, not be constant.
- Past threshold, the pull should rubber-band (0.4x finger movement).
- The "ready" state should be visually distinct — color change, icon change, or both.

## Orchestration rules

1. **One gesture owns the axis.** If horizontal swipe is active, vertical scroll is locked (and vice versa). Decide within the first 10px of movement.
2. **Gestures are interruptible.** A new gesture should be able to take over smoothly — no animation should block input.
3. **Momentum is real.** When a gesture releases, the element should continue in the direction of movement and decelerate naturally. Abrupt stops feel broken.
4. **Thresholds need feedback.** Every commit threshold should be signaled before the user reaches it (visual) and confirmed when they cross it (haptic).
5. **Cancel is always available.** Every gesture should be reversible until the commit point.
