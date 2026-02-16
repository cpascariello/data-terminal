# New Components and Micro Animations

## Atoms

### TypewriterText
- Props: `children: string`, `speed?: number` (ms/char, default 50), `delay?: number` (ms before start, default 0), `onComplete?: () => void`
- `useEffect` interval reveals characters one by one. Reuses `BlinkingCursor` at the trailing edge, stays blinking after completion.
- Reduced motion: renders full text immediately.

### GlitchText
- Props: `children: string`, `className?: string`
- Same architecture as TextFlicker. Random 1-3 characters periodically swap to a symbol from `$%#@&!0` with `translate(-2px)` offset, snaps back after ~60ms. Interval: 800ms-2s.
- Reduced motion: static text.

### ProgressBar
- Props: `value?: number` (0-100), `indeterminate?: boolean`, `className?: string`
- Segmented block fill aesthetic (`[████████░░░░]`) rendered with divs. Accent glow on filled portion.
- Indeterminate: bright segment sweeps back and forth via CSS animation.
- Reduced motion: indeterminate shows static half-fill.

### Badge
- Props: `children: ReactNode`, `variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'`, `className?: string`
- Small pill: monospace, uppercase, tight padding, border + subtle background from variant token.
- `info` maps to `accent`, `neutral` maps to `muted`.

### DataStream
- Props: `columns?: number` (default 3), `speed?: 'slow' | 'normal' | 'fast'`, `className?: string`
- Renders columns of random hex characters scrolling downward at ~15-20% opacity.
- CSS `translateY` animation with staggered column timing. Characters refresh via JS interval.
- Background decoration for Section or cards.
- Reduced motion: static random characters.

## Molecules

### Alert
- Props: `children: ReactNode`, `variant?: 'success' | 'warning' | 'error' | 'info'`, `dismissible?: boolean`, `onDismiss?: () => void`, `className?: string`
- Left accent border (4px, variant color), Lucide icon, message, optional dismiss X.
- Background: variant color at ~5% opacity. Hover scanline effect.

### TerminalTabs
- Props: `tabs: { label: string; content: ReactNode }[]`, `defaultIndex?: number`, `className?: string`
- Tabs styled like mini TerminalTopBar tabs with dots + label. Active tab gets accent bottom glow.
- Tab switch triggers glitch-in animation on content. Uncontrolled (internal state).

### DataTable
- Props: `columns: { key: string; label: string; sortable?: boolean }[]`, `rows: Record<string, ReactNode>[]`, `className?: string`
- Monospace throughout. HudLabel-style header. Border-separated rows.
- Sortable columns cycle asc/desc/none. Row hover scanline sweep.

### CommandInput
- Props: `prefix?: string` (default `>`), `placeholder?: string`, `onSubmit?: (value: string) => void`, `className?: string`
- Transparent input, no browser chrome, monospace, accent text.
- Static prefix span. BlinkingCursor on focus (native caret hidden). Enter fires onSubmit and clears.

## Micro Animations

### reveal-up
- Keyframe: `opacity: 0; translateY(12px)` to `opacity: 1; translateY(0)`. 0.4s ease-out.
- Utility class `.animate-reveal`. Pairs with `useInView`.

### glitch-in
- Keyframe: ~150ms, 3 frames — horizontal clip offset + red/cyan text-shadow channel split, resolves clean.
- Utility class `.animate-glitch-in`. Used on content swaps (TerminalTabs).
- `animation-fill-mode: both`.

### pulse-ring
- Keyframe: ring scales 1 to 2.5, opacity 0.6 to 0. 1.5s repeating.
- `::after` pseudo on `.pulse-ring`. Accent-colored border, same border-radius as source.

### data-stream (vertical scroll)
- Keyframe for column scroll animation used by the DataStream component.
