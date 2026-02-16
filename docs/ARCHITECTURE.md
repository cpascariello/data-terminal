# Architecture

Technical patterns and decisions.

---

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Database | None |
| Deployment | Vercel / static export |

---

## Project Structure

```
src/
├── app/          # Next.js App Router pages
│   ├── globals.css    # Tailwind imports + @theme inline mapping
│   ├── layout.tsx     # Root layout with font loading + ThemeProvider
│   ├── page.tsx       # Showcase/demo page
│   ├── scroll-effects-demo.tsx  # Client component for StickySection demo
│   └── theme-switcher.tsx
├── atoms/        # Atomic UI primitives
│   ├── badge.tsx
│   ├── blinking-cursor.tsx
│   ├── fade-in.tsx
│   ├── scroll-progress-bar.tsx
│   ├── corner-notch.tsx
│   ├── data-stream.tsx
│   ├── dot-grid.tsx
│   ├── glitch-text.tsx
│   ├── glow-border.tsx
│   ├── glow-line.tsx
│   ├── hud-label.tsx
│   ├── progress-bar.tsx
│   ├── scanline-overlay.tsx
│   ├── service-tag.tsx
│   ├── status-dot.tsx
│   ├── terminal-top-bar.tsx
│   ├── text-flicker.tsx
│   ├── typewriter-text.tsx
│   └── index.ts       # Barrel export
├── molecules/    # Composed components
│   ├── alert.tsx
│   ├── command-input.tsx
│   ├── data-table.tsx
│   ├── process-card.tsx
│   ├── section.tsx
│   ├── section-heading.tsx
│   ├── stat-card.tsx
│   ├── sticky-section.tsx
│   ├── terminal-card.tsx
│   ├── terminal-prompt.tsx
│   ├── checkbox.tsx
│   ├── multi-select.tsx
│   ├── radio-group.tsx
│   ├── search-input.tsx
│   ├── select.tsx
│   ├── textarea.tsx
│   ├── terminal-tabs.tsx
│   ├── terminal-window.tsx
│   ├── toggle.tsx
│   └── index.ts       # Barrel export
├── hooks/        # Custom hooks
│   ├── use-count-up.ts
│   ├── use-in-view.ts
│   ├── use-parallax.ts
│   ├── use-scroll-progress.ts
│   └── use-theme.ts
├── lib/          # Utilities
│   ├── cn.ts          # clsx + tailwind-merge
│   └── supports-scroll-timeline.ts  # CSS scroll-timeline feature detection
├── providers/    # Context providers
│   └── theme-provider.tsx
├── theme/        # Design tokens and CSS
│   ├── tokens.css     # CSS custom properties per theme
│   ├── animations.css # @keyframes definitions
│   ├── utilities.css  # @layer utilities (terminal-grid, scanlines, glow)
│   └── fonts.css      # @theme inline font mapping
└── fonts/        # Local font files (placeholder for Rigid Square .woff2)
```

---

## Patterns

### Theme System
**Context:** Multi-theme support without JavaScript runtime overhead.
**Approach:** CSS custom properties defined in `tokens.css`, toggled via `.theme-{name}` class on `<html>`. Each theme redefines the same set of tokens. Components reference `var(--token-name)` only — never hardcoded colors.
**Key files:** `src/theme/tokens.css`, `src/providers/theme-provider.tsx`
**Notes:** To add a new theme: (1) Add a `.theme-{name}` block in `tokens.css` redefining all tokens. (2) Add the name to the `THEMES` array in `theme-provider.tsx`.

### Atom/Molecule Composition
**Context:** Consistent visual language across all terminal-aesthetic components.
**Approach:** Atoms are CSS-only or near-CSS-only primitives (BlinkingCursor, DotGrid, GlowLine). Molecules compose atoms with layout and behavior (TerminalCard wraps CornerNotch + ServiceTag + scanline). All components accept `className` for composition.
**Key files:** `src/atoms/`, `src/molecules/`
**Notes:** Every component uses the `cn()` utility for class merging. Atoms never import other atoms. Molecules may import atoms and hooks.

### CSS Compatibility
**Context:** Glow effects and overlays need accent/foreground colors at varying opacities per theme.
**Approach:** Explicit pre-resolved color tokens per theme (`--accent-glow`, `--accent-scan`, `--foreground-dot`, etc.) in `tokens.css`. Components use `var(--accent-glow)` instead of relative color syntax like `oklch(from var(--accent) l c h / ...)`. This ensures compatibility with all browsers that support `oklch()` (Chrome 111+, Safari 15.4+, Firefox 113+) without requiring relative color syntax support.
**Key files:** `src/theme/tokens.css` (derived tokens section in each theme block)
**Notes:** When adding a new theme, remember to define all derived tokens (`--accent-glow`, `--accent-glow-intense`, `--accent-glow-inset`, `--accent-glow-line`, `--accent-hover-shadow`, `--accent-scan`, `--accent-scan-subtle`, `--foreground-dot`, `--foreground-scanline`).

### Form Components
**Context:** Reusable form controls with terminal aesthetic that work out of the box.
**Approach:** Each form component is a molecule that wraps native HTML elements (checkbox, radio, button, textarea) for free accessibility and keyboard support. All use an uncontrolled-by-default state model — internal `useState` manages state, with optional controlled mode via `value`/`onChange` props. An optional `label` prop renders a `HudLabel` above the control. Styling follows the same border/focus pattern as `CommandInput`: `border-border`, `bg-foreground/[0.02]`, `border-border-hover` on focus/hover.
**Key files:** `src/molecules/checkbox.tsx`, `src/molecules/radio-group.tsx`, `src/molecules/toggle.tsx`, `src/molecules/select.tsx`, `src/molecules/multi-select.tsx`, `src/molecules/search-input.tsx`, `src/molecules/textarea.tsx`
**Notes:** Select and MultiSelect use custom dropdown panels (not native `<select>`) for consistent styling across browsers. Both close on outside click and Escape key.

### Animation Strategy
**Context:** Terminal aesthetic requires animations (blink, scan, glitch) without heavy animation libraries.
**Approach:** Pure CSS `@keyframes` in `animations.css`. JavaScript-driven animations use `requestAnimationFrame` in hooks (`useCountUp`) or `setTimeout` for character-level text effects (`TextFlicker`, `GlitchText`, `TypewriterText`). All animations respect `prefers-reduced-motion`.
**Key files:** `src/theme/animations.css`, `src/theme/utilities.css`, `src/hooks/use-count-up.ts`
**Notes:** Zero animation library dependencies — no Framer Motion, no GSAP. CSS keyframes include `reveal-up`, `glitch-in`, `pulse-ring`, `data-stream-scroll`, `progress-sweep`. Utility classes `.animate-reveal`, `.animate-glitch-in`, `.pulse-ring` are available in `utilities.css`.

### Scroll Effects
**Context:** Scroll-driven effects (fade-in, parallax, sticky sections, scroll progress) for the design system.
**Approach:** Two layers — JS hooks for custom compositions and drop-in components for common patterns. `FadeIn` uses IntersectionObserver + CSS transitions (not CSS scroll-driven animations, which caused hydration mismatches). `ScrollProgressBar` uses CSS `animation-timeline: scroll()` where supported, with JS fallback via `useScrollProgress`. `StickySection` uses `position: sticky` with scroll progress tracking via a render prop. `useParallax` provides rAF-throttled parallax displacement.
**Key files:** `src/atoms/fade-in.tsx`, `src/atoms/scroll-progress-bar.tsx`, `src/molecules/sticky-section.tsx`, `src/hooks/use-scroll-progress.ts`, `src/hooks/use-parallax.ts`, `src/lib/supports-scroll-timeline.ts`
**Notes:** CSS scroll-driven animation utilities (`scroll-fade-in`, `scroll-progress`) remain available in `utilities.css` for direct use. The `supportsScrollTimeline()` function is lazy-cached and SSR-safe. Components that use it defer detection to `useEffect` to avoid hydration mismatches.

---

## Recipes

### Adding a New Theme
1. Open `src/theme/tokens.css`
2. Add a `.theme-{name}` block redefining all CSS custom properties
3. Open `src/providers/theme-provider.tsx`
4. Add the theme name to the `THEMES` array

### Adding a New Atom
1. Create `src/atoms/{name}.tsx`
2. Accept `className` prop, use `cn()` for merging
3. Export from `src/atoms/index.ts`
4. Update `CLAUDE.md` component inventory

### Adding a New Molecule
1. Create `src/molecules/{name}.tsx`
2. Import atoms from `@/atoms` as needed
3. Export from `src/molecules/index.ts`
4. Update `CLAUDE.md` component inventory
