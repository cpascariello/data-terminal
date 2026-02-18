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
│   ├── page.tsx       # Tab shell: header + tab bar + active tab
│   ├── sticky-section-demo.tsx  # Client component for StickySection demo
│   ├── theme-switcher.tsx
│   └── tabs/          # Preview page tab content
│       ├── foundations.tsx    # Atoms showcase
│       ├── data-display.tsx  # Terminal cards, stats, processes, tables
│       ├── forms.tsx         # Form controls and inputs
│       ├── feedback.tsx      # Alerts, progress, data stream
│       ├── navigation.tsx    # Navbar and Sidebar demos
│       ├── effects.tsx       # Scroll effects, fade-in, typewriter
│       └── index.ts          # Barrel export
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
│   ├── hover-scanline.tsx
│   ├── hud-label.tsx
│   ├── progress-bar.tsx
│   ├── scanline-overlay.tsx
│   ├── service-tag.tsx
│   ├── skeleton.tsx
│   ├── status-dot.tsx
│   ├── terminal-top-bar.tsx
│   ├── text-flicker.tsx
│   ├── typewriter-text.tsx
│   └── index.ts       # Barrel export
├── types/        # Shared TypeScript types
│   └── nav.ts         # NavItem type + isItemActive utility
├── molecules/    # Composed components
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── code-block.tsx
│   ├── command-input.tsx
│   ├── data-table.tsx
│   ├── icon-button.tsx
│   ├── modal.tsx
│   ├── multi-select.tsx
│   ├── navbar.tsx
│   ├── process-card.tsx
│   ├── radio-group.tsx
│   ├── search-input.tsx
│   ├── section.tsx
│   ├── section-heading.tsx
│   ├── select.tsx
│   ├── sidebar.tsx
│   ├── stat-card.tsx
│   ├── sticky-section.tsx
│   ├── terminal-card.tsx
│   ├── terminal-modal.tsx
│   ├── terminal-prompt.tsx
│   ├── terminal-tabs.tsx
│   ├── terminal-window.tsx
│   ├── textarea.tsx
│   ├── toast.tsx
│   ├── toggle.tsx
│   ├── tooltip.tsx
│   └── index.ts       # Barrel export
├── hooks/        # Custom hooks
│   ├── use-count-up.ts
│   ├── use-in-view.ts
│   ├── use-parallax.ts
│   ├── use-dismiss.ts
│   ├── use-scroll-progress.ts
│   └── use-theme.ts
├── lib/          # Utilities
│   ├── cn.ts          # clsx + tailwind-merge
│   ├── feedback-variants.ts # Shared feedback variant maps
│   ├── button-variants.ts   # Shared button variant styles
│   ├── highlighter.ts # Shiki singleton with CSS-variables theme
│   └── supports-scroll-timeline.ts  # CSS scroll-timeline feature detection
├── providers/    # Context providers
│   ├── theme-provider.tsx
│   └── toast-provider.tsx
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

### Typography System
**Context:** Consistent type scale across the design system with reskinning capability.
**Approach:** Four atomic components map to semantic HTML elements with design-system fonts: `Heading` (h1-h4, font-heading), `Text` (p/span, font-sans), `Caption` (span, font-display), `Code` (code, font-mono). `CodeBlock` molecule composes TerminalTopBar + Shiki CSS-variables theme + copy button for multi-line syntax-highlighted code. Shiki token colors map to theme tokens via `--shiki-*` CSS variables defined once in `:root` of `tokens.css`, inheriting theme automatically through the cascade.
**Key files:** `src/atoms/heading.tsx`, `src/atoms/text.tsx`, `src/atoms/caption.tsx`, `src/atoms/code.tsx`, `src/molecules/code-block.tsx`, `src/lib/highlighter.ts`, `src/theme/tokens.css` (Shiki mappings at end of file)
**Notes:** `SectionHeading` remains a separate molecule for section titles with cursor/subtitle. The Shiki highlighter is a lazy singleton (`src/lib/highlighter.ts`) that loads once and caches. CodeBlock is a client component — Shiki highlights async via `useEffect` with a plain-text fallback during loading.

### Buttons
**Context:** Action triggers with terminal aesthetic and variant/size system.
**Approach:** Single `Button` molecule with `variant` prop (primary/secondary/ghost/link/danger) and `size` prop (sm/md/lg). Uses `font-display` uppercase tracking like Badge/HudLabel. Supports optional `iconLeft`/`iconRight` props. Renders `<button>` by default, `<a>` via `as="a"` prop. `IconButton` is a separate molecule for square, icon-only actions with required `aria-label`.
**Key files:** `src/molecules/button.tsx`, `src/molecules/icon-button.tsx`
**Notes:** Link variant strips padding for inline text use. Danger variant exists for destructive actions.

### Feedback Components
**Context:** User feedback patterns — alerts, toasts, modals, accordions, tooltips, skeletons.
**Approach:** Each component follows the design system's variant pattern with `Record<Variant, string>` maps for styling. Toast uses a Provider/Context pattern (`ToastProvider` + `useToast` hook) with portal rendering via `createPortal`. Modal uses portal + `useFocusTrap` custom hook for Tab cycling and focus restore. Accordion uses CSS grid trick (`grid-template-rows: 0fr → 1fr`) for smooth height transitions. Tooltip uses absolute positioning with CSS border triangles for arrows. Skeleton is a server component with inline `@keyframes` for the scan animation.
**Key files:** `src/molecules/accordion.tsx`, `src/molecules/modal.tsx`, `src/molecules/toast.tsx`, `src/molecules/tooltip.tsx`, `src/atoms/skeleton.tsx`, `src/providers/toast-provider.tsx`
**Notes:** Toast system requires both `ToastProvider` and `ToastContainer` in the layout. Modal locks body scroll via `overflow-hidden` on `<body>`. Tooltip delay prevents flicker on quick mouse movements.

### Shared Variant Maps
**Context:** Alert and Toast shared identical variant-to-style, variant-to-icon, and variant-to-color mappings. Button and IconButton shared variant styles and base classes.
**Approach:** Extract shared maps into `src/lib/feedback-variants.ts` and `src/lib/button-variants.ts`. Components import from these modules instead of defining locally.
**Key files:** `src/lib/feedback-variants.ts`, `src/lib/button-variants.ts`
**Notes:** When adding a new feedback variant, update `feedback-variants.ts` — Alert and Toast pick it up automatically. When adding a new button variant shared between Button and IconButton, update `button-variants.ts`. Button's unique `link` variant stays in `button.tsx`.

### Dismiss Pattern
**Context:** Select, MultiSelect, Navbar, and Modal all needed click-outside and Escape key dismissal with duplicated event listener code.
**Approach:** `useDismiss(ref, onDismiss, enabled)` hook combines `mousedown` listener for click-outside detection and `keydown` listener for Escape. The `enabled` flag prevents attaching listeners when the dropdown/modal is closed.
**Key files:** `src/hooks/use-dismiss.ts`
**Notes:** Uses `mousedown` (not `click`) for immediate response. Checks `e.target instanceof Node` before `contains()`. For Modal, it handles both backdrop clicks (target is outside panel) and Escape — replacing the separate `handleBackdropClick` and `handleEscape` patterns.

### HoverScanline Atom
**Context:** Six molecules (Alert, Toast, Modal, Accordion, ProcessCard, TerminalCard) duplicated an identical scanline hover effect div.
**Approach:** Extract into `HoverScanline` atom with `intensity` ("normal" = `--accent-scan`, "subtle" = `--accent-scan-subtle`) and `speed` props. Server component. `aria-hidden="true"`.
**Key files:** `src/atoms/hover-scanline.tsx`
**Notes:** Parent must have `group` and `relative` classes. For named groups (e.g., Accordion's `group/item`), pass the appropriate `className` override for the hover trigger.

### Generic/Terminal Composition
**Context:** Card and Modal were tightly coupled to terminal-specific atoms (TerminalTopBar, CornerNotch, HoverScanline), making them unusable without the terminal aesthetic.
**Approach:** Generic components (`Card`, `Modal`) accept `header`, `overlay`, and `wrapper` slot props with zero terminal imports. Terminal variants (`TerminalCard`, `TerminalModal`) are thin wrappers that inject terminal atoms through those slots. This pattern allows the same structural components to be themed differently.
**Key files:** `src/molecules/card.tsx`, `src/molecules/terminal-card.tsx`, `src/molecules/modal.tsx`, `src/molecules/terminal-modal.tsx`
**Notes:** When creating new chrome-bearing components, follow the same pattern: generic base with slots, terminal wrapper that fills them. The generic component should never import from `@dt/atoms/terminal-*`, `@dt/atoms/corner-notch`, or `@dt/atoms/hover-scanline`.

### ARIA Widget Patterns
**Context:** Custom widgets (Select, MultiSelect, Navbar, TerminalTabs, Accordion, Tooltip, DataTable, Modal) needed proper ARIA roles and keyboard navigation for accessibility.
**Approach:** Each widget implements the relevant WAI-ARIA pattern:
- **Listbox** (Select, MultiSelect): `aria-haspopup="listbox"`, `aria-expanded`, `role="listbox"`, `role="option"`, `aria-selected`, arrow key navigation
- **Menu** (Navbar dropdowns): `role="menu"`, `role="menuitem"`, `aria-haspopup="menu"`, arrow key navigation
- **Tablist** (TerminalTabs): `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`, roving tabindex, arrow keys
- **Accordion**: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`
- **Dialog** (Modal): `role="dialog"` + `aria-modal="true"` on panel (not backdrop), `aria-label`
- **Tooltip**: `role="tooltip"`, `id`, `aria-describedby` via cloneElement
- **Table** (DataTable): Sortable headers in `<button>`, `aria-sort`
**Key files:** Listed component files
**Notes:** All form inputs use `aria-labelledby` to connect HudLabel to the input via `useId()`. Label text is wrapped in `<span id={labelId}>` inside HudLabel.

### Performance: Scroll Hooks
**Context:** `useParallax` caused layout thrashing (getBoundingClientRect + setState per frame). `useScrollProgress` re-rendered 60x/sec for target elements.
**Approach:** `useParallax` writes directly to `element.style.transform` instead of setState — no React re-renders on scroll. `useScrollProgress` compares against a `lastProgress` ref and only calls setState when the change exceeds 0.005.
**Key files:** `src/hooks/use-parallax.ts`, `src/hooks/use-scroll-progress.ts`
**Notes:** `useParallax` returns a static empty style object; the actual transform is applied via direct DOM manipulation in the rAF callback.

### Navigation
**Context:** Horizontal and vertical navigation components with two-level hierarchy and mega dropdown support.
**Approach:** Two independent molecules sharing a `NavItem` type from `src/types/nav.ts`. `Navbar` renders a sticky horizontal bar with two dropdown modes: compact (via `children`) and mega (via `mega`). Mega dropdowns span the full navbar width with a two-column layout (left: heading + links/description, right: optional featured items with images). Positioning uses `static` on the trigger container and `relative` on the `<nav>` so the mega panel anchors to the navbar. Hover handlers are passed to the mega panel to maintain the hover zone across the gap. `Sidebar` renders a vertical panel (`w-72` expanded, `w-14` collapsed) that collapses to an icon rail with per-item tooltips. Collapsed parent groups flatten their children into individual icon items. The collapse toggle sits in the header (top-right) using `PanelLeftClose`/`PanelLeftOpen` icons. `defaultOpen` initializes all groups as expanded. Both use uncontrolled-default/controlled-override state for active item tracking. Dropdowns use hover with delayed enter/leave timers plus click toggle and Escape/outside-click dismiss.
**Key files:** `src/molecules/navbar.tsx`, `src/molecules/sidebar.tsx`, `src/types/nav.ts`
**Notes:** `NavItem.icon` is required for Sidebar (collapsed rail), optional for Navbar. Sidebar collapse state is independently controllable via `collapsed`/`onCollapsedChange`. Sidebar header height is fixed at `h-11` to align with external navbars. Mega dropdowns require the parent container to not have `overflow-hidden` since the panel is absolutely positioned. `isItemActive` checks both `children` and `mega.links` for active state propagation.

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
4. Add usage example and prop table to `docs/DESIGN-SYSTEM.md`
5. Update `CLAUDE.md` component inventory

### Adding a New Molecule
1. Create `src/molecules/{name}.tsx`
2. Import atoms from `@dt/atoms` as needed
3. Export from `src/molecules/index.ts`
4. Add usage example and prop table to `docs/DESIGN-SYSTEM.md`
5. Update `CLAUDE.md` component inventory

### Accessibility Checklist for New Components
1. **Interactive elements:** Use `<button>` for actions, `<a>` for navigation. Never use `<div>` with click handlers.
2. **Labels:** Connect labels to inputs via `aria-labelledby` with `useId()`. Use `aria-label` for icon-only buttons.
3. **ARIA roles:** Custom widgets must implement the appropriate WAI-ARIA pattern (listbox, menu, tablist, dialog, etc.).
4. **Keyboard:** All interactive elements must be keyboard-accessible. Custom widgets need arrow key navigation.
5. **Decorative elements:** Use `aria-hidden="true"` on decorative elements (scanlines, cursors, dot grids).
6. **Disabled links:** `<a>` with `aria-disabled` must also prevent default on click.
7. **Focus management:** Modals need focus trap. Dropdowns should return focus on close.

### Preview Page Tabs
**Context:** Components organized by function for a hybrid showcase/docs experience.
**Approach:** `page.tsx` is a slim shell (~100 lines) with a sticky header, tab bar, and `useState` + hash sync. Each tab is a self-contained file in `src/app/tabs/` rendering its own sections with `FadeIn`, `GlowLine`, and `Section` wrappers.
**Key files:** `src/app/page.tsx`, `src/app/tabs/`
**Tab mapping:**
| Tab | Content |
|-----|---------|
| Foundations | Atomic primitives, typography, buttons, color tokens, icons |
| Data Display | Terminal cards, stats, processes, tables, tabs, prompt |
| Forms | Command input, checkboxes, radios, toggles, selects, textarea |
| Feedback | Alerts, toasts, modal, accordion, tooltips, skeleton, progress, data stream |
| Navigation | Navbar (horizontal with dropdowns), Sidebar (expanded + collapsed demos) |
| Effects | Scroll progress, fade-in directions, typewriter, parallax, sticky sections |

**Notes:** To add a component demo, add it to the appropriate tab file. Tabs with no content show a "coming soon" placeholder. Tab state syncs with URL hash (`#foundations`, `#data-display`, etc.) for direct linking.
