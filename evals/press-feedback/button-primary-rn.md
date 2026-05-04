# Eval: Primary button press — React Native

## Prompt
> Build me a primary "Save" button in React Native

## Context
- Platform: react-native
- Component: Primary action button
- Business context: SaaS settings screen

## Expected behavior
- [ ] Uses Reanimated `withSpring` for press animation, not `Animated.timing`
- [ ] Scale goes to 0.96 on press (not 0.9, not 1.0)
- [ ] Press duration ~80ms, release ~180ms (press faster than release)
- [ ] Includes `expo-haptics` light impact on press
- [ ] Uses `Gesture.Tap()` from gesture handler, not `TouchableOpacity`
- [ ] Opacity reduces to ~0.85 on press
- [ ] Disabled state has opacity 0.4 and no press feedback
- [ ] Handles reduce motion (instant state change, no spring)

## Pass criteria
Must include press feedback with correct scale value and haptic. Gesture Handler preferred but Pressable acceptable. Reduce motion not required but is bonus.
