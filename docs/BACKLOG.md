# Backlog

Parking lot for scope creep and deferred ideas.

---

### 2026-02-16 - FAQ accordion / dropdown
**Source:** Identified during tabbed preview page design
**Description:** Collapsible content sections for FAQ-style layouts. Add to Feedback tab.
**Priority:** Medium

### 2026-02-16 - Navigation components
**Source:** Identified during tabbed preview page design
**Description:** Navbar, sidebar, breadcrumbs, footer, pagination. Will populate the Navigation tab.
**Priority:** Medium

### 2026-02-16 - Modal / dialog
**Source:** Identified during tabbed preview page design
**Description:** Modal overlay with backdrop, close button, focus trap. Add to Feedback tab.
**Priority:** Medium

### 2026-02-16 - Toast notifications
**Source:** Identified during tabbed preview page design
**Description:** Auto-dismissing notification toasts with variants (success/error/info/warning). Add to Feedback tab.
**Priority:** Medium

### 2026-02-16 - Tooltips
**Source:** Identified during tabbed preview page design
**Description:** Hover/focus tooltips with positioning (top/bottom/left/right). Add to Feedback tab.
**Priority:** Low

### 2026-02-16 - Loading skeletons
**Source:** Identified during tabbed preview page design
**Description:** Skeleton placeholder components for loading states. Add to Feedback tab.
**Priority:** Low

### 2026-02-16 - Color palette / token reference
**Source:** Identified during tabbed preview page design
**Description:** Visual display of all theme tokens with swatches. Add to Foundations tab.
**Priority:** Low

### 2026-02-16 - Icons showcase
**Source:** Identified during tabbed preview page design
**Description:** Icon system and visual reference of available icons. Add to Foundations tab.
**Priority:** Low

### 2026-02-16 - Scroll effects: review suggestions not yet applied
**Source:** Code review of feature/scroll-effects branch
**Description:** The frontend expert review found 5 nice-to-have suggestions that weren't implemented:
- S1: Extract CSS variable helper in FadeIn (the nested ternary at lines 63-69 is dense)
- S2: Use `satisfies` instead of `Record<string, string>` for `directionClasses` in FadeIn
- S3: Memoize parallax style object in `useParallax` with `useMemo`
- S4: Rename `ScrollEffectsDemo` to `StickySectionDemo` (or make it demo all 3 scroll effects)
- S5: Listen for live `prefers-reduced-motion` changes in hooks (currently a one-time snapshot, consistent with existing `useCountUp`)
**Priority:** Low

### 2026-02-16 - Parallax not yet demonstrated on showcase page
**Source:** Identified during scroll effects implementation
**Description:** The `useParallax` hook is implemented but not yet used on the showcase page. Plan was to apply it to `DataStream` and `DotGrid` decorative elements so backgrounds drift at a different rate than content. This requires a client component wrapper since `useParallax` is a hook and the showcase page is a server component.
**Priority:** Medium

### 2026-02-13 - Add oxlint for linting
**Source:** Identified during initial implementation — Next.js 16 removed `next lint`
**Description:** Install oxlint and oxfmt, add `pnpm lint` and `pnpm format` scripts. Enable typescript, import, unicorn plugins per global standards.
**Priority:** Medium

---

## Completed

### 2026-02-16 - Typography components
**Completed:** 2026-02-16
**Delivered:** Heading (4-level scale), Text (4 variants), Caption, Code (inline), CodeBlock (Shiki syntax highlighting)

### 2026-02-16 - Button components
**Completed:** 2026-02-16
**Delivered:** Button (5 variants, 3 sizes, icon support), IconButton (4 variants, 3 sizes)
