---
name: design-details-react-native
description: |
  React Native motion, haptics, and gestures using Reanimated 3 + Gesture Handler + Expo Haptics.
  Triggers when building interactive React Native components with press feedback, swipe actions,
  drag, or haptic patterns.
version: 0.1.0
---

# design-details-react-native

Implementation patterns for making React Native UI feel alive using Reanimated 3, Gesture Handler 2, and Expo Haptics.

This sub-skill is part of **design-details**. Consult the parent skill's references for values (press-feedback.md, gesture.md, haptics.md, motion-language.md, platform-map.md). This file covers _how_ to implement, the parent covers _what_ values to use.

## Core dependencies

```
react-native-reanimated (v3+)
react-native-gesture-handler (v2+)
expo-haptics
```

## Press feedback pattern

The foundational pattern. Every tappable element needs this.

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

function PressableButton({ onPress, children, style }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.96, { damping: 20, stiffness: 400 });
      opacity.value = withSpring(0.85, { damping: 20, stiffness: 400 });
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      opacity.value = withSpring(1, { damping: 15, stiffness: 300 });
    })
    .onEnd(() => {
      if (onPress) runOnJS(onPress)();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
```

### Key implementation details
- `onBegin` fires on touch down (instant feedback). `onEnd` fires on successful tap.
- `onFinalize` fires on both success AND cancel (always return to rest).
- Spring on press is stiffer (400) than release (300) — press is snappy, release is smooth.
- Haptics fire in `onBegin` via `runOnJS` — they're UI thread safe but must be called from JS.

## Swipe-to-action pattern

```tsx
function SwipeableRow({ children, onDelete, onArchive }) {
  const translateX = useSharedValue(0);
  const threshold = SCREEN_WIDTH * 0.35;

  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // 10px dead zone prevents accidental swipe
    .onUpdate((e) => {
      // Rubber-band past threshold
      if (Math.abs(e.translationX) > threshold) {
        const overshoot = Math.abs(e.translationX) - threshold;
        const direction = e.translationX > 0 ? 1 : -1;
        translateX.value = direction * (threshold + overshoot * 0.3);
      } else {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      if (e.translationX > threshold) {
        translateX.value = withSpring(SCREEN_WIDTH, { damping: 20 });
        runOnJS(Haptics.notificationAsync)(
          Haptics.NotificationFeedbackType.Success
        );
        runOnJS(onArchive)();
      } else if (e.translationX < -threshold) {
        translateX.value = withSpring(-SCREEN_WIDTH, { damping: 20 });
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
        runOnJS(onDelete)();
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 300 });
      }
    });

  // Haptic at threshold crossing
  useAnimatedReaction(
    () => Math.abs(translateX.value) > threshold,
    (crossed, prev) => {
      if (crossed && !prev) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  );
}
```

## Long-press with drag

```tsx
function DraggableItem({ children }) {
  const scale = useSharedValue(1);
  const shadow = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isLifted = useSharedValue(false);

  const longPress = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      isLifted.value = true;
      scale.value = withSpring(1.05, { damping: 12 });
      shadow.value = withSpring(1, { damping: 15 });
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
    });

  const drag = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, manager) => {
      if (isLifted.value) manager.activate();
    })
    .onUpdate((e) => {
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateY.value = withSpring(0, { damping: 15 });
      scale.value = withSpring(1, { damping: 15 });
      shadow.value = withSpring(0, { damping: 15 });
      isLifted.value = false;
    });

  const composed = Gesture.Simultaneous(longPress, drag);
}
```

## Shared element transitions

For navigation transitions that connect elements across screens:

```tsx
import Animated, { SharedTransition } from 'react-native-reanimated';

// On source screen
<Animated.Image
  sharedTransitionTag="hero-image"
  source={image}
/>

// On destination screen
<Animated.Image
  sharedTransitionTag="hero-image"
  source={image}
/>
```

Use `SharedTransition.custom()` to control the spring:
```tsx
SharedTransition.custom((values) => {
  'worklet';
  return {
    transform: [
      { translateX: withSpring(values.targetTransformX, { damping: 18 }) },
      { translateY: withSpring(values.targetTransformY, { damping: 18 }) },
      { scale: withSpring(values.targetScale, { damping: 15 }) },
    ],
    width: withSpring(values.targetWidth, { damping: 18 }),
    height: withSpring(values.targetHeight, { damping: 18 }),
  };
});
```

## Entering / exiting animations

```tsx
import { FadeInUp, FadeOut, Layout } from 'react-native-reanimated';

// Staggered list items
{items.map((item, i) => (
  <Animated.View
    key={item.id}
    entering={FadeInUp.delay(i * 30).springify().damping(18)}
    exiting={FadeOut.duration(100)}
    layout={Layout.springify().damping(15)}
  >
    {/* content */}
  </Animated.View>
))}
```

### Enter/exit rules (React Native)
- **Entering**: Use `FadeInUp` (8px slide + fade) with spring. Stagger 30ms.
- **Exiting**: Use `FadeOut` only (no slide). 100ms. No stagger.
- **Layout**: Always add `Layout` animation when items can reorder — prevents jumps.
- **Max stagger**: Cap at 300ms total. For long lists, only stagger visible items.

## Reduce motion support

```tsx
import { AccessibilityInfo } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

function AnimatedComponent() {
  const reduceMotion = useReducedMotion();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: reduceMotion
        ? (pressed.value ? 0.96 : 1) // instant, no animation
        : withSpring(pressed.value ? 0.96 : 1, { damping: 20 })
    }],
  }));
}
```

When reduce motion is on:
- Keep scale/opacity changes but make them instant (no `withSpring`/`withTiming`)
- Remove slide/translate animations, replace with opacity
- Keep haptics (they're tactile, not visual)
- Remove stagger delays

## Common gotchas

1. **`runOnJS` for haptics**: Haptics APIs are JS-side. Always wrap with `runOnJS` when calling from worklets.
2. **Shared value initialization**: Create `useSharedValue` at component top level, never inside callbacks.
3. **Gesture conflicts**: Use `Gesture.Exclusive()` for priority (first wins) or `Gesture.Simultaneous()` for co-activation. Pan vs scroll needs `activeOffsetX/Y` dead zones.
4. **Rerender kills animation**: `useAnimatedStyle` runs on UI thread — React rerenders don't interrupt animations. But recreating shared values does. Memoize properly.
5. **Android shadow**: `elevation` on Android, `shadowX/Y/Radius` on iOS. Handle per-platform or use a shadow library.
