# Animation implementation — SwiftUI

Implementation patterns for making SwiftUI UI feel alive using native springs, haptic feedback generators, and gesture APIs.

This file is loaded by `design-details-animation` when the target is SwiftUI. Values come from `../references/` (press-feedback, gesture, haptics, motion-language, platform-map). This file covers *how* to implement in SwiftUI.

## Press feedback pattern

The foundational interactive button style.

```swift
struct AliveButtonStyle: ButtonStyle {
    let feedbackStyle: UIImpactFeedbackGenerator.FeedbackStyle

    init(feedbackStyle: UIImpactFeedbackGenerator.FeedbackStyle = .light) {
        self.feedbackStyle = feedbackStyle
    }

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.96 : 1.0)
            .opacity(configuration.isPressed ? 0.85 : 1.0)
            .animation(.spring(duration: 0.15, bounce: 0), value: configuration.isPressed)
            .sensoryFeedback(.impact(flexibility: .solid, intensity: 0.6), trigger: configuration.isPressed)
    }
}

// Usage
Button("Save") { save() }
    .buttonStyle(AliveButtonStyle())
```

### Variant: Ghost button
```swift
struct GhostButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .background(
                RoundedRectangle(cornerRadius: 8)
                    .fill(Color.primary.opacity(configuration.isPressed ? 0.08 : 0))
            )
            .animation(.spring(duration: 0.12, bounce: 0), value: configuration.isPressed)
            .sensoryFeedback(.impact(flexibility: .soft, intensity: 0.4), trigger: configuration.isPressed)
    }
}
```

### Variant: Card press
```swift
struct PressableCard<Content: View>: View {
    let action: () -> Void
    @ViewBuilder let content: () -> Content
    @State private var isPressed = false

    var body: some View {
        content()
            .scaleEffect(isPressed ? 0.98 : 1.0)
            .shadow(radius: isPressed ? 2 : 8, y: isPressed ? 1 : 4)
            .offset(y: isPressed ? 1 : 0)
            .animation(.spring(duration: 0.2, bounce: 0.1), value: isPressed)
            .simultaneousGesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { _ in isPressed = true }
                    .onEnded { value in
                        isPressed = false
                        // Cancel on drag-out: only fire if the touch stayed put
                        let t = value.translation
                        if abs(t.width) < 10 && abs(t.height) < 10 {
                            action()
                        }
                    }
            )
            .sensoryFeedback(.impact(flexibility: .solid, intensity: 0.5), trigger: isPressed)
    }
}
```

## Haptic patterns

### Using sensoryFeedback (iOS 17+)
```swift
// Preferred API — declarative, tied to state changes
.sensoryFeedback(.impact(weight: .light), trigger: someValue)
.sensoryFeedback(.selection, trigger: pickerValue)
.sensoryFeedback(.success, trigger: isComplete)
.sensoryFeedback(.warning, trigger: showWarning)
.sensoryFeedback(.error, trigger: hasError)
```

### Using UIFeedbackGenerator (pre-iOS 17 or imperative)
```swift
class HapticManager {
    static let shared = HapticManager()

    private var impactLight = UIImpactFeedbackGenerator(style: .light)
    private var impactMedium = UIImpactFeedbackGenerator(style: .medium)
    private var impactHeavy = UIImpactFeedbackGenerator(style: .heavy)
    private var selection = UISelectionFeedbackGenerator()
    private var notification = UINotificationFeedbackGenerator()

    func prepare(_ type: FeedbackType) {
        switch type {
        case .light: impactLight.prepare()
        case .medium: impactMedium.prepare()
        case .heavy: impactHeavy.prepare()
        case .selection: selection.prepare()
        case .notification: notification.prepare()
        }
    }

    func fire(_ type: FeedbackType) {
        switch type {
        case .light: impactLight.impactOccurred()
        case .medium: impactMedium.impactOccurred()
        case .heavy: impactHeavy.impactOccurred()
        case .selection: selection.selectionChanged()
        case .notification(let kind): notification.notificationOccurred(kind)
        }
    }
}
```

**Critical**: Call `prepare()` ~50ms before you expect the haptic to fire. In gesture handlers, prepare on drag start, fire at threshold.

## Gesture patterns

### Swipe-to-delete with threshold haptic
```swift
struct SwipeableRow<Content: View>: View {
    let onDelete: () -> Void
    @ViewBuilder let content: () -> Content

    @State private var offset: CGFloat = 0
    @State private var hasPassedThreshold = false
    private let threshold: CGFloat = 120

    var body: some View {
        content()
            .offset(x: offset)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        let raw = value.translation.width
                        if raw < 0 {
                            // Rubber-band past threshold
                            if abs(raw) > threshold {
                                let overshoot = abs(raw) - threshold
                                offset = -(threshold + overshoot * 0.3)
                            } else {
                                offset = raw
                            }

                            // Haptic at threshold crossing
                            if abs(raw) > threshold && !hasPassedThreshold {
                                hasPassedThreshold = true
                                UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                            } else if abs(raw) < threshold {
                                hasPassedThreshold = false
                            }
                        }
                    }
                    .onEnded { value in
                        if abs(value.translation.width) > threshold {
                            withAnimation(.spring(duration: 0.25)) {
                                offset = -UIScreen.main.bounds.width
                            }
                            UINotificationFeedbackGenerator().notificationOccurred(.success)
                            onDelete()
                        } else {
                            withAnimation(.spring(duration: 0.3, bounce: 0.2)) {
                                offset = 0
                            }
                        }
                        hasPassedThreshold = false
                    }
            )
    }
}
```

### Long-press to drag
```swift
struct DraggableItem: View {
    @State private var isLifted = false
    @State private var dragOffset = CGSize.zero

    var body: some View {
        content
            .scaleEffect(isLifted ? 1.05 : 1.0)
            .shadow(radius: isLifted ? 12 : 4)
            .offset(dragOffset)
            .animation(.spring(duration: 0.3, bounce: 0.15), value: isLifted)
            .gesture(
                LongPressGesture(minimumDuration: 0.5)
                    .sequenced(before: DragGesture())
                    .onChanged { value in
                        switch value {
                        case .first(true):
                            isLifted = true
                            UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                        case .second(true, let drag):
                            dragOffset = drag?.translation ?? .zero
                        default: break
                        }
                    }
                    .onEnded { _ in
                        withAnimation(.spring(duration: 0.3, bounce: 0.1)) {
                            isLifted = false
                            dragOffset = .zero
                        }
                    }
            )
    }
}
```

## Transitions

### Enter/exit with asymmetry
```swift
// Entering: slower, with spring
// Exiting: faster, no bounce
struct AsymmetricSlide: ViewModifier {
    let isPresented: Bool

    func body(content: Content) -> some View {
        content
            .opacity(isPresented ? 1 : 0)
            .offset(y: isPresented ? 0 : 8)
            .animation(
                isPresented
                    ? .spring(duration: 0.3, bounce: 0.15)
                    : .easeIn(duration: 0.15),
                value: isPresented
            )
    }
}
```

### Staggered list appearance
```swift
ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
    ItemRow(item: item)
        .opacity(appeared ? 1 : 0)
        .offset(y: appeared ? 0 : 8)
        .animation(
            .spring(duration: 0.3, bounce: 0.1)
            .delay(Double(index) * 0.03),  // 30ms stagger
            value: appeared
        )
}
```

### Page transitions (NavigationStack)
```swift
NavigationStack {
    // ...
}
.navigationTransition(.slide) // iOS 18+

// Custom matched geometry for shared elements
@Namespace private var namespace

// Source
Image(item.image)
    .matchedGeometryEffect(id: item.id, in: namespace)

// Destination
Image(item.image)
    .matchedGeometryEffect(id: item.id, in: namespace)
```

## Toggle with stretch
```swift
struct AliveToggle: View {
    @Binding var isOn: Bool
    @State private var isStretching = false

    var body: some View {
        Capsule()
            .fill(isOn ? Color.accentColor : Color.gray.opacity(0.3)) // color leads the thumb
            .frame(width: 51, height: 31)
            .overlay(alignment: isOn ? .trailing : .leading) {
                Capsule()
                    .fill(.white)
                    // Widening along the travel axis mid-slide = the elastic stretch (~1.15x)
                    .frame(width: isStretching ? 31 : 27, height: 27)
                    .padding(2)
            }
            .animation(.spring(duration: 0.25, bounce: 0.2), value: isOn)
            .animation(.spring(duration: 0.12, bounce: 0), value: isStretching)
            .onTapGesture {
                isOn.toggle()
                isStretching = true
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                    isStretching = false
                }
            }
            .sensoryFeedback(.impact(weight: .medium), trigger: isOn)
    }
}
```

## Reduce motion

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// Apply conditionally
.animation(reduceMotion ? .none : .spring(duration: 0.3), value: state)

// Or use a helper
extension Animation {
    static func alive(_ animation: Animation, reduceMotion: Bool) -> Animation {
        reduceMotion ? .none : animation
    }
}
```

When reduce motion is on:
- `.animation(.none)` — state changes are instant, feedback still visible
- Keep `.sensoryFeedback` — haptics are not visual motion
- Replace `.transition(.slide)` with `.transition(.opacity)`
- Remove stagger delays

## Common gotchas

1. **`.animation()` scope**: Place `.animation()` AFTER the properties it should animate, and always use the `value:` parameter to be explicit about what triggers it.
2. **Haptic preparation**: `UIImpactFeedbackGenerator` has ~50ms spin-up. Call `prepare()` on gesture start or view appear.
3. **`@Namespace` lifetime**: Must be owned by a parent view that's alive for the entire transition.
4. **`withAnimation` vs `.animation()`**: Use `withAnimation` for imperative state changes (button taps). Use `.animation()` for reactive/continuous changes (gestures, bindings).
5. **Gesture priority**: Use `.highPriorityGesture()` when a child gesture should override parent's scroll. Use `.simultaneousGesture()` when both should fire.
