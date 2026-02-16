# Decisions

Decision log with rationale.

---

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
