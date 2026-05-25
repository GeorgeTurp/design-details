# Cross-Platform Value Mapping

How to translate motion values between iOS (SwiftUI), CSS/Web, and React Native (Reanimated).

## Spring mapping

Springs are the universal motion primitive but every platform parameterizes them differently.

### SwiftUI → CSS → React Native

| SwiftUI | CSS equivalent | Reanimated 3 |
|---|---|---|
| `.spring(duration: 0.3, bounce: 0)` | `cubic-bezier(0.2, 0, 0, 1)` 300ms | `withSpring({ damping: 20, stiffness: 300 })` |
| `.spring(duration: 0.3, bounce: 0.2)` | `cubic-bezier(0.34, 1.2, 0.64, 1)` 350ms | `withSpring({ damping: 14, stiffness: 300 })` |
| `.spring(duration: 0.3, bounce: 0.4)` | `cubic-bezier(0.34, 1.56, 0.64, 1)` 400ms | `withSpring({ damping: 10, stiffness: 300 })` |
| `.spring(duration: 0.5, bounce: 0)` | `cubic-bezier(0.4, 0, 0.2, 1)` 500ms | `withSpring({ damping: 20, stiffness: 120 })` |
| `.spring(duration: 0.5, bounce: 0.3)` | No clean CSS equivalent — use Framer Motion | `withSpring({ damping: 12, stiffness: 180 })` |
| `.interactiveSpring()` | `cubic-bezier(0.2, 0, 0, 1)` 200ms | `withSpring({ damping: 15, stiffness: 400 })` |
| `.bouncy` | `cubic-bezier(0.34, 1.56, 0.64, 1)` 500ms | `withSpring({ damping: 8, stiffness: 250 })` |
| `.snappy` | `cubic-bezier(0.2, 0, 0, 1)` 250ms | `withSpring({ damping: 18, stiffness: 350 })` |
| `.smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` 350ms | `withSpring({ damping: 20, stiffness: 200 })` |

### Framer Motion springs (web)

When CSS cubic-bezier can't express the spring, use Framer Motion:

| Feel | Framer Motion `transition` |
|---|---|
| Snappy | `{ type: "spring", stiffness: 400, damping: 30 }` |
| Smooth | `{ type: "spring", stiffness: 200, damping: 25 }` |
| Bouncy | `{ type: "spring", stiffness: 300, damping: 15 }` |
| Elastic | `{ type: "spring", stiffness: 500, damping: 10 }` |
| Heavy | `{ type: "spring", stiffness: 150, damping: 20, mass: 2 }` |

## Duration mapping

Platforms handle duration differently. These are equivalent feels:

| Intent | CSS | SwiftUI | Reanimated |
|---|---|---|---|
| Instant feedback | `100ms` | `.animation(.easeOut(duration: 0.1))` | `withTiming(value, { duration: 100 })` |
| Quick transition | `200ms` | `.animation(.easeOut(duration: 0.2))` or `.spring(duration: 0.2)` | `withTiming(value, { duration: 200 })` |
| Standard transition | `300ms` | `.animation(.spring(duration: 0.3))` | `withSpring(value, { damping: 20 })` |
| Deliberate | `400ms` | `.animation(.spring(duration: 0.4, bounce: 0.1))` | `withSpring(value, { damping: 18, stiffness: 180 })` |
| Emphatic | `500-600ms` | `.animation(.spring(duration: 0.5, bounce: 0.2))` | `withSpring(value, { damping: 14, stiffness: 150 })` |

## Easing mapping

| Intent | CSS | SwiftUI | Reanimated |
|---|---|---|---|
| Enter (appear) | `ease-out` / `cubic-bezier(0, 0, 0.2, 1)` | `.easeOut` | `Easing.out(Easing.cubic)` |
| Exit (disappear) | `ease-in` / `cubic-bezier(0.4, 0, 1, 1)` | `.easeIn` | `Easing.in(Easing.cubic)` |
| Move (reposition) | `ease-in-out` / `cubic-bezier(0.4, 0, 0.2, 1)` | `.easeInOut` | `Easing.inOut(Easing.cubic)` |
| Snap (quick response) | `cubic-bezier(0.2, 0, 0, 1)` | `.spring(duration: 0.25)` | `withSpring({ stiffness: 400, damping: 30 })` |
| Bounce (overshoot) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `.spring(bounce: 0.4)` | `withSpring({ damping: 8, stiffness: 300 })` |

## Transform mapping

| Transform | CSS | SwiftUI | Reanimated (Animated style) |
|---|---|---|---|
| Scale | `transform: scale(0.96)` | `.scaleEffect(0.96)` | `{ transform: [{ scale: 0.96 }] }` |
| Translate Y | `transform: translateY(8px)` | `.offset(y: 8)` | `{ transform: [{ translateY: 8 }] }` |
| Opacity | `opacity: 0.5` | `.opacity(0.5)` | `{ opacity: 0.5 }` |
| Rotation | `transform: rotate(2deg)` | `.rotationEffect(.degrees(2))` | `{ transform: [{ rotate: '2deg' }] }` |
| Combined | `transform: scale(0.96) translateY(2px)` | `.scaleEffect(0.96).offset(y: 2)` | `{ transform: [{ scale: 0.96 }, { translateY: 2 }] }` |

## Accessibility mapping

| Setting | CSS | SwiftUI | React Native |
|---|---|---|---|
| Reduce motion query | `@media (prefers-reduced-motion: reduce)` | `@Environment(\.accessibilityReduceMotion)` | `AccessibilityInfo.isReduceMotionEnabled()` |
| Reduced fallback | `transition: none` or instant | `.animation(reduceMotion ? .none : .spring())` | Duration → 0, spring → timing with 0ms |

### Reduce motion strategy
Don't remove feedback — remove motion. When reduce motion is on:
- **Scale/opacity changes**: Keep, but make instant (0ms duration)
- **Slide/translate animations**: Replace with fade
- **Springs/bounces**: Replace with linear or remove
- **Haptics**: Keep (they're not motion)
- **Stagger delays**: Remove (all items appear at once)

## Platform-specific gotchas

### iOS / SwiftUI
- SwiftUI springs are resolution-independent — they settle naturally, no fixed duration needed
- `.animation()` modifier applies to all animatable properties — be specific with `.animation(.spring(), value: specificValue)`
- Haptics require `prepare()` call for instant response — budget 50ms warmup

### React Native / Reanimated
- `withSpring` runs on the UI thread — no JS bridge delay
- Combine with `Gesture` from `react-native-gesture-handler` for 60fps gesture tracking
- `useAnimatedStyle` returns must be pure — no side effects
- Haptics (`expo-haptics`) are async — fire-and-forget, don't await in animation callbacks

### Web / CSS
- CSS `transition` can't express true springs — use `cubic-bezier` approximations or Framer Motion
- `will-change: transform, opacity` for GPU acceleration — but only on animating elements
- `transform` and `opacity` are the only jank-free animatable properties
- Web Animations API (`element.animate()`) gives better control than CSS transitions for complex sequences

## Quick reference: common component translations

### Button press feedback
| Platform | Implementation |
|---|---|
| CSS | `transition: transform 80ms ease-out; &:active { transform: scale(0.96) }` |
| SwiftUI | `.scaleEffect(isPressed ? 0.96 : 1).animation(.spring(duration: 0.15), value: isPressed)` |
| Reanimated | `useAnimatedStyle(() => ({ transform: [{ scale: withSpring(pressed.value ? 0.96 : 1, { damping: 20, stiffness: 400 }) }] }))` |

### Page transition (push)
| Platform | Implementation |
|---|---|
| CSS | `transform: translateX(100%); transition: transform 300ms cubic-bezier(0.2, 0, 0, 1)` |
| SwiftUI | `.transition(.move(edge: .trailing))` with `.spring(duration: 0.35)` |
| Reanimated | Shared element transition or `withSpring(translateX, { damping: 20, stiffness: 200 })` |

### Fade-in with slide
| Platform | Implementation |
|---|---|
| CSS | `opacity: 0; transform: translateY(8px); transition: all 250ms ease-out` → remove classes |
| SwiftUI | `.transition(.opacity.combined(with: .offset(y: 8)))` |
| Reanimated | Entering: `FadeInUp.duration(250).easing(Easing.out(Easing.cubic))` |
