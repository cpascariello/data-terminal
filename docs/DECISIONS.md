# Decisions

Decision log with rationale.

---

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
