# Scroll Effects Design

## Overview

Add scroll-driven effects to the data terminal design system as reusable primitives, then demonstrate them on the showcase page. CSS scroll-driven animations where supported, JS fallback via IntersectionObserver/rAF.

## Architecture: Mixed hooks + components (Approach C)

Hooks for custom use, components for common patterns. Components detect CSS scroll-driven animation support internally and fall back to hooks.

## New Files

### Hooks

**`src/hooks/use-scroll-progress.ts`**
Returns 0..1 value for scroll progress through an element or the page.
```ts
function useScrollProgress(options?: {
  target?: RefObject<HTMLElement>;
  offset?: [string, string]; // default ["start end", "end start"]
}): number;
```
Implementation: rAF-throttled scroll event listener. Reduced motion: returns 1.

**`src/hooks/use-parallax.ts`**
Returns style object with transform based on scroll position.
```ts
function useParallax(options?: {
  speed?: number; // default 0.5
  direction?: "vertical" | "horizontal";
}): { ref: RefObject<HTMLElement>; style: CSSProperties };
```
Implementation: rAF-throttled scroll listener. Displacement = `(elementCenter - viewportCenter) * (1 - speed)`. Reduced motion: returns zero transform.

### Utility

**`src/lib/supports-scroll-timeline.ts`**
```ts
export const supportsScrollTimeline =
  typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");
```

### Components

**`src/atoms/fade-in.tsx`**
Wraps children, fades in on scroll entry.

| Prop | Type | Default |
|------|------|---------|
| direction | "up" \| "down" \| "left" \| "right" \| "none" | "up" |
| distance | number | 20 |
| delay | number | 0 |
| duration | number | 0.6 |
| once | boolean | true |

CSS-first: `animation-timeline: view()` with `scroll-fade-in` keyframes.
JS fallback: `useInView` toggles class triggering CSS transition.
Reduced motion: children visible immediately.

**`src/atoms/scroll-progress-bar.tsx`**
Bar that fills based on scroll progress.

| Prop | Type | Default |
|------|------|---------|
| target | RefObject<HTMLElement> | undefined (whole page) |
| position | "inline" \| "fixed" | "inline" |
| showLabel | boolean | false |
| glow | boolean | true |

CSS-first: `animation-timeline: scroll()` animates scaleX.
JS fallback: `useScrollProgress` sets scaleX via inline style.
Reduced motion: still fills (functional), no glow pulse.

**`src/molecules/sticky-section.tsx`**
Pins a frame while scrolling through steps.

| Prop | Type | Default |
|------|------|---------|
| steps | number | required |
| stepHeight | string | "100vh" |
| children | (state: { progress: number; activeStep: number }) => ReactNode | required |

Outer div: height = steps * stepHeight. Inner div: sticky top-0 height 100vh. Uses `useScrollProgress` for progress/activeStep derivation.
Reduced motion: still works (sticky is functional), content switches instantly.

## CSS Additions

**`src/theme/animations.css`** — new keyframes:
- `scroll-fade-in` (opacity 0→1 + translate)
- `scroll-progress-fill` (scaleX 0→1)

**`src/theme/utilities.css`** — new classes:
- `.scroll-fade-in-up/down/left/right`
- `.scroll-progress`

All with `prefers-reduced-motion` guards.

## Showcase Integration

1. Wrap `<Section>` content blocks with `<FadeIn>` for reveal-on-scroll
2. Apply `useParallax` to decorative DataStream/DotGrid backgrounds
3. Add sticky section demo with TerminalCard cycling through steps
4. Add fixed `<ScrollProgressBar>` at page top + inline one in sticky demo

## Support Detection

```ts
export const supportsScrollTimeline =
  typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");
```

Cached at module level, used by FadeIn and ScrollProgressBar internally.
