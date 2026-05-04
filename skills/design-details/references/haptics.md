# Haptics Reference

Vibration patterns mapped to interaction types across iOS, Android, and React Native.

## Haptic vocabulary

Every haptic has a meaning. Don't use them randomly.

| Haptic type | Meaning | When to use |
|---|---|---|
| **Light impact** | "Acknowledged" | Button press, tab switch, minor selection |
| **Medium impact** | "Something happened" | Toggle commit, threshold crossed, drag pickup |
| **Heavy impact** | "Pay attention" | Destructive action confirm, error, significant state change |
| **Soft impact** | "Gentle touch" | Ghost button press, subtle hover-equivalent on touch |
| **Rigid impact** | "Blocked / denied" | Invalid action, failed validation, drag to invalid zone |
| **Selection tick** | "Moving through items" | Picker scroll, list item selection, stepper increment |
| **Success** | "Completed" | Form submitted, payment processed, action confirmed |
| **Warning** | "Be careful" | Approaching limit, destructive action prompt |
| **Error** | "Something went wrong" | Validation failure, network error, action blocked |

## Platform mapping

### iOS (UIKit / SwiftUI)

| Haptic type | API |
|---|---|
| Light impact | `UIImpactFeedbackGenerator(style: .light)` |
| Medium impact | `UIImpactFeedbackGenerator(style: .medium)` |
| Heavy impact | `UIImpactFeedbackGenerator(style: .heavy)` |
| Soft impact | `UIImpactFeedbackGenerator(style: .soft)` |
| Rigid impact | `UIImpactFeedbackGenerator(style: .rigid)` |
| Selection tick | `UISelectionFeedbackGenerator()` |
| Success | `UINotificationFeedbackGenerator().notificationOccurred(.success)` |
| Warning | `UINotificationFeedbackGenerator().notificationOccurred(.warning)` |
| Error | `UINotificationFeedbackGenerator().notificationOccurred(.error)` |

**iOS-specific notes:**
- Call `prepare()` before triggering for zero-latency response.
- Haptic engine spins down after ~2 seconds of inactivity. Re-prepare if needed.
- Works on iPhone 7+ and some iPads. Always feature-check.

### Android

| Haptic type | API |
|---|---|
| Light impact | `HapticFeedbackConstants.KEYBOARD_TAP` or `VibrationEffect.createOneShot(10, 80)` |
| Medium impact | `HapticFeedbackConstants.CONTEXT_CLICK` or `VibrationEffect.createOneShot(20, 150)` |
| Heavy impact | `VibrationEffect.createOneShot(30, 255)` |
| Selection tick | `HapticFeedbackConstants.CLOCK_TICK` |
| Success | `VibrationEffect.createWaveform([0, 30, 50, 30], [0, 120, 0, 200], -1)` |
| Error | `VibrationEffect.createWaveform([0, 40, 30, 40], [0, 255, 0, 255], -1)` |

**Android-specific notes:**
- Haptic quality varies wildly across devices. Test on real hardware.
- Prefer `HapticFeedbackConstants` when available — they adapt to device capabilities.
- Requires `VIBRATE` permission in manifest.
- Android 11+ supports `HapticFeedbackConstants.CONFIRM` and `REJECT`.

### React Native (Expo Haptics)

| Haptic type | API |
|---|---|
| Light impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` |
| Medium impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)` |
| Heavy impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)` |
| Selection tick | `Haptics.selectionAsync()` |
| Success | `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)` |
| Warning | `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)` |
| Error | `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)` |

**React Native notes:**
- `expo-haptics` is the recommended package. Falls back gracefully on unsupported devices.
- For bare RN without Expo: `react-native-haptic-feedback` provides similar API.
- Soft and rigid impacts are iOS-only — map to light and heavy respectively on Android.

## Interaction → haptic mapping

### Navigation
| Action | Haptic |
|---|---|
| Tab switch | Light impact |
| Page transition | None (motion is sufficient) |
| Back gesture | Light impact at commit point |
| Bottom sheet snap point | Medium impact |
| Modal open | None (visual is sufficient) |
| Modal dismiss via gesture | Light impact at commit point |

### Forms
| Action | Haptic |
|---|---|
| Text field focus | None |
| Picker value change | Selection tick (each item) |
| Slider drag | Selection tick at intervals |
| Stepper increment/decrement | Selection tick |
| Toggle switch | Medium impact at commit |
| Checkbox tap | Light impact |
| Form submit success | Success notification |
| Validation error | Error notification |

### Lists and content
| Action | Haptic |
|---|---|
| Pull-to-refresh threshold | Light impact |
| Pull-to-refresh complete | Success notification |
| Swipe action threshold | Medium impact |
| Long-press trigger | Medium impact |
| Drag pickup | Medium impact |
| Drag reorder (item passes another) | Selection tick |
| Drop on valid target | Light impact |
| Drop on invalid target | Rigid impact (or error) |

### Destructive actions
| Action | Haptic |
|---|---|
| Delete confirmation appear | Warning notification |
| Delete confirmed | Heavy impact |
| Undo available | Light impact |

## Anti-patterns

1. **Don't haptic on scroll.** Scrolling is passive. Haptics are for intentional actions.
2. **Don't haptic on every frame.** During continuous gestures (drag, pinch), haptic only at thresholds.
3. **Don't double-haptic.** If a button press triggers a haptic AND the resulting action triggers another, remove the first one. One haptic per user intention.
4. **Don't forget to prepare.** On iOS, unprepared haptics have ~50ms latency. That kills the illusion.
5. **Don't ignore system settings.** Respect "reduce haptics" accessibility settings on all platforms.

## Testing

- Always test haptics on real devices. Simulators don't vibrate.
- Test with eyes closed — if you can identify the action by haptic alone, it's well-designed.
- Test in noisy environments — haptics matter most when audio cues are drowned out.
