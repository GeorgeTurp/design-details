---
name: design-details-web
description: |
  This skill should be used when implementing micro-interactions, press feedback, hover states,
  gesture choreography, or motion on the web. Triggers when the user is working with CSS
  transitions, Framer Motion, Web Animations API, or building interactive web components
  that need to feel alive.
version: 0.1.0
---

# design-details-web

Implementation patterns for making web UI feel alive using CSS transitions, Framer Motion, and the Web Animations API.

This sub-skill is part of **design-details**. Consult the parent skill's references for values. This file covers _how_ to implement on the web.

## Press feedback pattern

### CSS-only (no JS framework needed)
```css
.button {
  transition: transform 80ms ease-out, opacity 80ms ease-out, box-shadow 80ms ease-out;
  will-change: transform;
}

.button:active {
  transform: scale(0.96);
  opacity: 0.85;
  box-shadow: none; /* flatten shadow on press */
}

/* Release is slower than press */
.button:not(:active) {
  transition-duration: 180ms;
}

.button:disabled {
  opacity: 0.4;
  pointer-events: none;
}
```

### Framer Motion (React)
```tsx
import { motion } from 'framer-motion';

function Button({ onClick, children }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96, opacity: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
```

### Variant: Ghost button
```css
.ghost-button {
  background: transparent;
  transition: transform 60ms ease-out, background-color 60ms ease-out;
}
.ghost-button:active {
  transform: scale(0.97);
  background-color: rgba(0, 0, 0, 0.08);
}
.ghost-button:not(:active) {
  transition-duration: 200ms;
}
```

### Variant: Card press
```css
.card-pressable {
  transition: transform 100ms ease-out, box-shadow 100ms ease-out;
  cursor: pointer;
}
.card-pressable:active {
  transform: scale(0.98) translateY(1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); /* reduced from resting */
}
.card-pressable:not(:active) {
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 250ms ease-out;
}
```

## Hover states

Web has hover — mobile doesn't. Use it to preview interaction.

```css
/* Hover is a preview of the press */
.button:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

/* Touch devices: no hover */
@media (hover: none) {
  .button:hover {
    transform: none;
    box-shadow: inherit;
  }
}
```

### Hover + press compound (Framer Motion)
```tsx
<motion.div
  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
/>
```

## Enter / exit animations

### CSS — fade + slide-up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.enter {
  animation: fadeInUp 250ms cubic-bezier(0, 0, 0.2, 1) both;
}

/* Stagger with custom property */
.enter:nth-child(1) { animation-delay: 0ms; }
.enter:nth-child(2) { animation-delay: 30ms; }
.enter:nth-child(3) { animation-delay: 60ms; }
/* ... or use style="--i: N" with calc(var(--i) * 30ms) */
```

### Exit — fade only, faster
```css
@keyframes fadeOut {
  to { opacity: 0; }
}
.exit {
  animation: fadeOut 150ms cubic-bezier(0.4, 0, 1, 1) both;
}
```

### Framer Motion — AnimatePresence
```tsx
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="popLayout">
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }} // No y movement on exit
      transition={{
        enter: { type: 'spring', stiffness: 300, damping: 25, delay: i * 0.03 },
        exit: { duration: 0.1 },
      }}
    />
  ))}
</AnimatePresence>
```

## Modal / dialog transitions

### CSS
```css
.modal-overlay {
  opacity: 0;
  transition: opacity 200ms ease-out;
}
.modal-overlay.open { opacity: 1; }

.modal-content {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 300ms ease-out, transform 300ms cubic-bezier(0.34, 1.2, 0.64, 1);
}
.modal-content.open {
  opacity: 1;
  transform: scale(1);
}

/* Exit is faster */
.modal-overlay.closing { transition-duration: 150ms; }
.modal-content.closing {
  transform: scale(0.95);
  opacity: 0;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
}
```

### Framer Motion
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{
    enter: { type: 'spring', stiffness: 300, damping: 25 },
    exit: { duration: 0.15 },
  }}
/>
```

## Page transitions (View Transitions API)

```tsx
// Modern browsers — View Transitions API
function navigateTo(url: string) {
  if (!document.startViewTransition) {
    window.location.href = url;
    return;
  }

  document.startViewTransition(() => {
    // Update the DOM
    updateContent(url);
  });
}
```

```css
/* Default crossfade is fine for most cases */
::view-transition-old(root) {
  animation: fadeOut 150ms ease-in;
}
::view-transition-new(root) {
  animation: fadeInUp 250ms ease-out;
}

/* Shared element transitions */
.hero-image {
  view-transition-name: hero;
}
::view-transition-group(hero) {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
}
```

## Drag interactions

### Framer Motion drag
```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragElastic={0.3} // Rubber-band factor
  whileDrag={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
  onDragEnd={(_, info) => {
    if (Math.abs(info.offset.x) > threshold) {
      // Commit action
    }
  }}
/>
```

### Sortable list with layout animation
```tsx
<Reorder.Group values={items} onReorder={setItems} axis="y">
  {items.map((item) => (
    <Reorder.Item
      key={item.id}
      value={item}
      whileDrag={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  ))}
</Reorder.Group>
```

## Scroll-triggered animations

### Intersection Observer (vanilla)
```tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('enter');
        observer.unobserve(entry.target); // Animate once
      }
    });
  },
  { threshold: 0.1 }
);
```

### Framer Motion — whileInView
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
/>
```

### Scroll-driven animations (CSS)
```css
@keyframes parallax {
  from { transform: translateY(0); }
  to { transform: translateY(-50px); }
}

.parallax-element {
  animation: parallax linear;
  animation-timeline: scroll();
  animation-range: 0% 100%;
}
```

## Reduce motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Better: targeted reduction */
@media (prefers-reduced-motion: reduce) {
  .enter { animation: none; opacity: 1; transform: none; }
  .modal-content { transition-duration: 0ms; }
  /* Keep opacity/color changes — just remove movement */
}
```

### Framer Motion
```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 25,
    // Framer Motion automatically respects prefers-reduced-motion
    // but you can be explicit:
  }}
/>

// Or globally:
<MotionConfig reducedMotion="user"> {/* respects OS setting */}
  <App />
</MotionConfig>
```

## Performance rules

1. **Only animate `transform` and `opacity`.** Everything else triggers layout/paint.
2. **`will-change` sparingly.** Only on elements that are about to animate. Remove after.
3. **GPU layers**: `transform: translateZ(0)` or `will-change: transform` promotes to GPU. Don't promote everything — each layer costs memory.
4. **Avoid animating during scroll.** Use `scroll-timeline` (CSS) or throttle to rAF.
5. **Test at 4x CPU throttle.** If it's smooth there, it's smooth everywhere.

## Common gotchas

1. **`:active` on mobile Safari**: Needs a `touchstart` event listener on `<body>` to work. Or use `-webkit-tap-highlight-color: transparent` and handle press states in JS.
2. **`transition` on initial render**: CSS transitions fire on page load if the element has a different initial state. Use `animation` instead, or add a `no-transition` class that's removed after first paint.
3. **Exit animations need the element alive**: CSS can't animate removal. Use Framer Motion's `AnimatePresence`, the View Transitions API, or manually delay `display: none`.
4. **`pointer-events: none` during animation**: Prevent double-clicks by disabling interaction during exit animations.
5. **Mobile hover sticky**: `:hover` persists after tap on mobile. Use `@media (hover: hover)` to scope hover styles to devices with real hover.
