# Eval: Toggle switch — cross-platform

## Prompt
> I need a custom toggle switch. I'm building for both iOS (SwiftUI) and React Native.

## Context
- Platform: swiftui + react-native
- Component: Toggle switch
- Business context: App settings

## Expected behavior
- [ ] Both implementations use spring animation (not linear/ease)
- [ ] Thumb stretches slightly (scale 1.1-1.15) during transition
- [ ] Color transition leads the thumb movement
- [ ] Haptic fires at commit point (medium impact), not during drag
- [ ] SwiftUI uses `.sensoryFeedback` or `UIImpactFeedbackGenerator`
- [ ] React Native uses `expo-haptics` medium impact
- [ ] Spring duration ~250ms with slight bounce
- [ ] Values are consistent across both platforms per platform-map.md

## Pass criteria
Both platforms must have the same feel despite different APIs. Spring, haptic at commit, and thumb stretch are required.
