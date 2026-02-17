# Decisions

Decision log with rationale.

---

## Decision #16 - 2026-02-17
**Context:** Exploring whether the design system could support non-terminal aesthetics (e.g. a Valiente-style editorial site). Found that Card and Modal were tightly coupled to terminal chrome atoms.
**Decision:** Decouple generic Card and Modal from terminal chrome using a composition-via-slots pattern. Generic components accept `header`, `overlay`, and `wrapper` slot props with zero terminal imports. Terminal variants (`TerminalCard`, `TerminalModal`) are thin wrappers that inject chrome through those slots.
**Rationale:** This is the smallest change that enables non-terminal usage without restructuring the entire directory tree. Generic components work for any theme; terminal components remain convenient wrappers. No breaking changes.
**Alternatives considered:** Boolean `chrome` flag on existing components (still imports terminal atoms when unused, misleading name), full `core/effects/themes/` directory restructure (architecturally correct but premature without a second theme), render prop pattern (verbose for common cases)

## Decision #15 - 2026-02-17
**Context:** External agents have no way to discover that `docs/DESIGN-SYSTEM.md` and `docs/ARCHITECTURE.md` are the key references for building with this design system. CLAUDE.md was structured around workflow habits, not agent onboarding.
**Decision:** Add agent-facing discoverability: (1) "Building with this Design System" directive at top of CLAUDE.md, (2) README.md as universal entry point, (3) "When to Use What" task-oriented index in DESIGN-SYSTEM.md, (4) "See also" cross-references between related components, (5) merge checklist items to maintain these going forward.
**Rationale:** Agents read CLAUDE.md first but need explicit instructions to find the API reference. A task-oriented index ("Building a form? Use these.") lets agents jump to the right component without reading the entire doc. Cross-references prevent agents from missing related components. The merge checklist ensures future sessions maintain all of this.
**Alternatives considered:** Relying on agents to explore docs/ on their own (unreliable — they often start reading source files instead)

## Decision #14 - 2026-02-17
**Context:** Code review found 53 issues across the codebase — ARIA gaps, duplicated code, performance issues, and inconsistent imports.
**Decision:** Implement all 53 fixes systematically in 7 phases with automated verification (typecheck + lint + test + build) between each wave.
**Rationale:** Batch processing with verification gates catches regressions early. Parallelizing independent phases (hooks ∥ atoms, forms ∥ feedback) speeds execution without conflict risk.
**Alternatives considered:** Cherry-picking individual fixes (slower, harder to verify holistically)

## Decision #13 - 2026-02-17
**Context:** Button and IconButton duplicated variant styles and base classes. Alert and Toast duplicated variant-to-style/icon/color maps.
**Decision:** Extract shared maps into `src/lib/feedback-variants.ts` and `src/lib/button-variants.ts`. Components import from these modules.
**Rationale:** Single source of truth for variant definitions. Adding a new variant or changing a style updates all consumers. Button's unique `link` variant stays local since only Button uses it.
**Alternatives considered:** Keeping duplicated code (simpler but drift-prone), creating a generic variant system (over-engineered for two use cases)

## Decision #12 - 2026-02-17
**Context:** Six molecules duplicated an identical scanline hover effect div (15+ lines each).
**Decision:** Extract into `HoverScanline` atom with `intensity` and `speed` props.
**Rationale:** Eliminates ~90 lines of duplicated code. The atom is a server component with `aria-hidden`, following the existing atom pattern. Consumers just add `<HoverScanline />` inside a `group relative` container.
**Alternatives considered:** CSS utility class only (less flexible, can't parameterize intensity/speed)

## Decision #11 - 2026-02-17
**Context:** Select, MultiSelect, Navbar, and Modal all had duplicated click-outside + Escape key dismiss logic.
**Decision:** Create `useDismiss(ref, onDismiss, enabled)` hook combining both patterns.
**Rationale:** Eliminates ~20 lines of duplicated event listener code per component. Uses `mousedown` (not `click`) for immediate response. The `enabled` flag prevents listener attachment when unnecessary.
**Alternatives considered:** Keeping inline useEffects (more code, same bugs in each copy)

## Decision #10 - 2026-02-17
**Context:** `useParallax` called `getBoundingClientRect()` + `setState()` on every scroll frame, causing layout thrashing and unnecessary React re-renders.
**Decision:** Replace `useState(offset)` with direct DOM manipulation via `element.style.transform`. Store offset in a ref, not state.
**Rationale:** Eliminates React re-renders on scroll entirely. The rAF callback writes directly to the DOM, which is the standard approach for scroll-driven visual effects. The returned `style` is a static empty object.
**Alternatives considered:** Throttling setState (still causes re-renders, just fewer), CSS scroll-driven animations (limited browser support for parallax)

## Decision #9 - 2026-02-16
**Context:** CodeBlock needs Shiki syntax highlighting, but the Foundations tab is a client component (`"use client"` for tab state).
**Decision:** CodeBlock is a client component that highlights async via `useEffect` with a plain-text fallback during loading.
**Rationale:** Server component rendering would require restructuring the tab system or using a separate API route. Client-side Shiki with a lazy singleton highlighter is pragmatic — loads once, caches, and the fallback ensures no flash of empty content.
**Alternatives considered:** Server component with route handler (overengineered for a showcase), React 19 `use()` with Suspense (adds complexity for minimal benefit)

## Decision #8 - 2026-02-16
**Context:** Shiki syntax highlighting needs to work across all 5 themes without generating separate theme configs.
**Decision:** Use Shiki's `createCssVariablesTheme` with `--shiki-*` CSS variables mapped to design system tokens in a single `:root` block in `tokens.css`.
**Rationale:** CSS custom property resolution is lazy — `var(--shiki-token-keyword)` resolves to `var(--primary)` which resolves to whatever the active theme defines. One mapping, zero theme-switching JS.
**Alternatives considered:** Multiple Shiki themes switched via JS (duplicates theme logic), inline styles with JS theme detection (breaks the CSS-only theme system)

## Decision #7 - 2026-02-16
**Context:** Typography components needed for the design system. Could be React wrapper components or Tailwind utility classes/presets.
**Decision:** React components (Heading, Text, Caption, Code, CodeBlock) rather than Tailwind-only classes. Single Button component with variant prop rather than separate components per variant.
**Rationale:** The design system's goal is reskinning without touching structural code. Components provide the seam — change `Heading`'s styles once and every heading updates. Tailwind classes scattered through markup would require grep-and-replace on redesign. Single Button with variant prop keeps the API tight and avoids duplicating shared logic.
**Alternatives considered:** Tailwind classes only (no reskin seam), polymorphic Typography component (grab-bag API), separate button components per variant (duplication)

## Decision #6 - 2026-02-16
**Context:** Preview page was a single 640-line scroll-through showcase. Planning to add many more components (typography, buttons, navigation, modals, etc.) which would make it unmanageable.
**Decision:** Reorganize preview page into functional tabs: Foundations, Data Display, Forms, Feedback, Navigation, Effects. Group by purpose, not atomic design layer.
**Rationale:** Functional grouping matches how developers look for components — by what they need (form input, feedback UI, navigation), not by abstraction level (atom vs molecule). Scales well as the system grows. Atomic design tabs (Atoms | Molecules | Organisms) would create arbitrary buckets where users have to guess which layer a component lives on.
**Alternatives considered:** Atomic design tabs (familiar but poor UX at scale), minimal tabs + sidebar (over-engineered for current component count)

## Decision #5 - 2026-02-16
**Context:** FadeIn component was invisible on page load — CSS scroll-driven animation path caused hydration mismatches (SSR renders JS fallback, client renders CSS path) and elements already in viewport stayed at opacity:0 because their `animation-range: entry` had already passed
**Decision:** FadeIn uses IntersectionObserver + CSS transitions exclusively, not CSS scroll-driven animations. ScrollProgressBar keeps the CSS path but defers detection to useEffect.
**Rationale:** CSS scroll-driven animations are suited for continuous scroll-linked effects (progress bars) but not for one-time reveal triggers. IntersectionObserver fires reliably for both above-fold and below-fold elements, the CSS transition provides a visible fade, and there's no hydration mismatch since the component renders identically on server and client.
**Alternatives considered:** Deferring CSS path detection to useEffect in FadeIn (still lost the transition when switching render paths), removing opacity:0 from CSS and relying on animation fill (still no visible fade for above-fold elements)

## Decision #4 - 2026-02-16
**Context:** Adding scroll-driven effects (fade-in, parallax, sticky sections, scroll progress) to the design system
**Decision:** Use CSS scroll-driven animations (`animation-timeline: view()/scroll()`) as the primary engine with JS fallback via IntersectionObserver/rAF hooks (Approach C: mixed hooks + components)
**Rationale:** CSS scroll-driven animations are more performant (compositor-thread, no JS on scroll) but only ~85% browser support (Chrome/Edge, not Firefox/Safari stable). JS fallback ensures universal coverage. The mixed approach provides reusable hooks (`useScrollProgress`, `useParallax`) for custom compositions plus drop-in components (`FadeIn`, `ScrollProgressBar`, `StickySection`) for common patterns — matching the existing project pattern where `useInView` is a hook and `StatCard` is a component that consumes it.
**Alternatives considered:**
- Hook-only approach (too much boilerplate for consumers, harder to bake in CSS-first path)
- Component-only approach (less flexible for custom compositions)
- CSS-only with no JS fallback (simpler code but ~15% users get no effects)

## Decision #3 - 2026-02-16
**Context:** Adding title treatment to replace TextGradient
**Decision:** Use TextFlicker (random letter opacity drops) instead of TextGradient or TextGlow
**Rationale:** Gradient titles felt generic. A rotating glow effect (TextGlow using CSS @property + trig functions) was tried but rejected as too busy. TextFlicker provides subtle character-level animation that fits the terminal aesthetic without being distracting.
**Alternatives considered:** TextGradient (original, too generic), TextGlow (rotating text-shadow, too busy)

## Decision #2 - 2026-02-16
**Context:** Light theme accent color was green, user wanted it changed
**Decision:** Change light theme `--accent` from green `oklch(0.55 0.2 145)` to deep purple `oklch(0.45 0.23 290)` directly, rather than adding a separate `--accent-title` token
**Rationale:** Adding a second accent token would increase complexity across all 5 themes and require a new Tailwind class. Simpler to change the accent color itself since the light theme green wasn't working well.
**Alternatives considered:** Adding `--accent-title` as a separate token across all themes (rejected — unnecessary complexity)

## Decision #1 - 2026-02-13
**Context:** Initial project setup for Data Terminal Design System
**Decision:** Use Next.js 16 (latest stable) instead of Next.js 15 as originally planned
**Rationale:** The plan specified "use whatever pnpm add resolves to" for package versions. Next.js 16 is the current stable release.
**Alternatives considered:** Pinning to Next.js 15 as originally written in the plan
