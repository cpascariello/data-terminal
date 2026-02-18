# Backlog

Parking lot for scope creep and deferred ideas.

---

## Open Items

### 2026-02-17 - Add `linkComponent` prop to Sidebar and Navbar
**Source:** Identified during aleph-cloud-console integration
**Description:** Sidebar and Navbar render native `<a>` tags for items with `href`. In Next.js App Router, this causes full page reloads instead of client-side navigation. A `linkComponent` prop (accepting a component like Next's `<Link>`) would let consumers provide their own anchor implementation. Current workaround in consumers: intercept clicks on a parent `<div>` and call `router.push()`.
**Priority:** High

### 2026-02-17 - Avoid duplicate @types/react when consumed as source
**Source:** Identified during aleph-cloud-console typecheck
**Description:** When data-terminal is symlinked into a consumer and imported as source (via `transpilePackages`), tsc resolves `@types/react` from both locations, causing `Ref` type incompatibilities in `button.tsx`. Fix options: (1) publish data-terminal with pre-built declarations, (2) add TypeScript project references with `composite: true`, (3) document that consumers must deduplicate via pnpm overrides.
**Priority:** Medium

### 2026-02-17 - CodeBlock uses `code` prop instead of `children`
**Source:** Identified during aleph-cloud-console Phase 5 integration
**Description:** `CodeBlock` requires `<CodeBlock code={content} />` instead of the idiomatic React pattern `<CodeBlock>{content}</CodeBlock>`. Every other React component that renders string content uses `children`. This causes type errors during integration (`Property 'children' does not exist on type CodeBlockProps`). Consider accepting both `code` and `children` (with `code` taking precedence), or switching to `children` only.
**Priority:** Low

### 2026-02-17 - TerminalCard children have no padding
**Source:** Identified during aleph-cloud-console Phase 3 integration
**Description:** The card header row (`[TAG] Label`) is padded but the children slot is flush to the edges. Every consumer needs to add their own `p-4` wrapper. Should either provide content padding by default or document that children are unstyled.
**Priority:** Medium

### 2026-02-17 - CommandInput is uncontrolled-only
**Source:** Identified during aleph-cloud-console Phase 3 integration
**Description:** `CommandInput` has no `value`/`onChange` support, only `onSubmit`. Can't be used in forms, search-as-you-type, or any controlled context. Consumers fall back to `SearchInput` instead. Either add controlled mode or document the `SearchInput` alternative prominently.
**Priority:** Medium

### 2026-02-17 - TerminalModal uses `open` instead of `isOpen`
**Source:** Identified during aleph-cloud-console Phase 3 integration
**Description:** Matches native `<dialog>` API but breaks from React conventions (Radix, Chakra, Headless UI use `isOpen`). Caused type errors during integration. Consider aliasing both or documenting the convention.
**Priority:** Low

### 2026-02-17 - Textarea onChange deviates from React convention
**Source:** Identified during aleph-cloud-console Phase 3 integration
**Description:** `Textarea` onChange receives a `string` instead of a `ChangeEvent`. Consistent with `SearchInput` but surprising vs standard React inputs. Should be documented clearly.
**Priority:** Low

### 2026-02-17 - Button/IconButton relationship not discoverable
**Source:** Identified during aleph-cloud-console Phase 3 integration
**Description:** `Button` requires `children` — icon-only use needs the separate `IconButton` component. Good for accessibility but the relationship isn't discoverable. A JSDoc comment or TypeScript error message pointing to `IconButton` would help.
**Priority:** Low

---

## Completed

### 2026-02-18 - Use unique internal path prefix to avoid consumer conflicts
**Completed:** 2026-02-18
**Delivered:** Renamed all @/ imports to @dt/ prefix. Updated tsconfig paths and vitest alias.

### 2026-02-17 - Code Review Fixes (53 items across 7 phases)
**Completed:** 2026-02-17
**Delivered:** Shared variant maps (feedback-variants.ts, button-variants.ts), useDismiss hook, HoverScanline atom, comprehensive ARIA patterns (listbox, menu, tablist, accordion, dialog, tooltip, table), scroll performance fixes (useParallax direct DOM, useScrollProgress threshold), forwardRef on Button/IconButton, discriminated union ProgressBar props, StatusDot variant enum, all props interfaces exported, vitest setup with tests, tsconfig strictness, dependency pinning

### 2026-02-16 - Typography components
**Completed:** 2026-02-16
**Delivered:** Heading (4-level scale), Text (4 variants), Caption, Code (inline), CodeBlock (Shiki syntax highlighting)

### 2026-02-16 - Button components
**Completed:** 2026-02-16
**Delivered:** Button (5 variants, 3 sizes, icon support), IconButton (4 variants, 3 sizes)

### 2026-02-16 - Navigation components
**Completed:** 2026-02-16
**Delivered:** Navbar (horizontal, dropdown menus, hover/click), Sidebar (vertical, collapsible icon rail, tooltips, flyouts)

### 2026-02-16 - FAQ accordion
**Completed:** 2026-02-16
**Delivered:** Accordion molecule with CSS grid height transition, chevron rotation, single/multi mode

### 2026-02-16 - Modal / dialog
**Completed:** 2026-02-16
**Delivered:** Modal molecule with portal, focus trap, TerminalTopBar + CornerNotch chrome, 3 sizes

### 2026-02-16 - Toast notifications
**Completed:** 2026-02-16
**Delivered:** Toast system (ToastProvider + ToastContainer + useToast hook), 4 variants, auto-dismiss with progress bar

### 2026-02-16 - Tooltips
**Completed:** 2026-02-16
**Delivered:** Tooltip molecule with 4 positions, CSS arrow, hover delay, focus accessibility

### 2026-02-16 - Loading skeletons
**Completed:** 2026-02-16
**Delivered:** Skeleton atom (server component), 4 variants (text/heading/circle/card), scan animation

### 2026-02-16 - Color palette / token reference
**Completed:** 2026-02-16
**Delivered:** Color token swatches (core, semantic, foreground pairings) in Foundations tab

### 2026-02-16 - Icons showcase
**Completed:** 2026-02-16
**Delivered:** Lucide icon grid (system + action icons) in Foundations tab

### 2026-02-16 - Scroll effects cleanup
**Completed:** 2026-02-16
**Delivered:** All 5 review suggestions applied (satisfies, buildFadeStyle, useMemo, rename, live reduced-motion listeners)

### 2026-02-16 - Parallax demo
**Completed:** 2026-02-16
**Delivered:** Parallax demo section in Effects tab showing 3 speed levels with useParallax hook

### 2026-02-16 - oxlint setup
**Completed:** 2026-02-16
**Delivered:** oxlint 1.48.0 with typescript/import/unicorn plugins, `pnpm lint` script, 0 warnings
