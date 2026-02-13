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
│   └── page.tsx       # Showcase/demo page
├── atoms/        # Atomic UI primitives
│   ├── blinking-cursor.tsx
│   ├── corner-notch.tsx
│   ├── dot-grid.tsx
│   ├── glow-border.tsx
│   ├── glow-line.tsx
│   ├── hud-label.tsx
│   ├── scanline-overlay.tsx
│   ├── service-tag.tsx
│   ├── status-dot.tsx
│   ├── text-gradient.tsx
│   └── index.ts       # Barrel export
├── molecules/    # Composed components
│   ├── process-card.tsx
│   ├── section.tsx
│   ├── section-heading.tsx
│   ├── stat-card.tsx
│   ├── terminal-card.tsx
│   ├── terminal-prompt.tsx
│   ├── terminal-window.tsx
│   └── index.ts       # Barrel export
├── hooks/        # Custom hooks
│   ├── use-count-up.ts
│   ├── use-in-view.ts
│   └── use-theme.ts
├── lib/          # Utilities
│   └── cn.ts          # clsx + tailwind-merge
├── providers/    # Context providers
│   └── theme-provider.tsx
├── theme/        # Design tokens and CSS
│   ├── tokens.css     # CSS custom properties per theme
│   ├── animations.css # @keyframes definitions
│   ├── utilities.css  # @layer utilities (terminal-grid, scanlines, glow)
│   └── fonts.css      # @theme inline font mapping
└── fonts/        # Local .woff2 font files
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

### Animation Strategy
**Context:** Terminal aesthetic requires animations (blink, scan, glitch) without heavy animation libraries.
**Approach:** Pure CSS `@keyframes` in `animations.css`. JavaScript-driven animations use `requestAnimationFrame` in hooks (`useCountUp`). All animations respect `prefers-reduced-motion`.
**Key files:** `src/theme/animations.css`, `src/hooks/use-count-up.ts`
**Notes:** Zero animation library dependencies — no Framer Motion, no GSAP.

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
