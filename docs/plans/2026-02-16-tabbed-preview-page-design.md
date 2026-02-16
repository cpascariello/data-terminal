# Tabbed Preview Page Design

Reorganize the single-scroll preview page into functional tabs.

## Problem

The preview page is a single ~640-line scroll-through showcase. Adding typography, buttons, navigation, modals, and other planned components would make it unmanageable. Components need to be organized by purpose so developers can find what they need.

## Design

### Page Structure

```
┌─────────────────────────────────────┐
│  DATA_TERMINAL          [theme ▾]   │  ← sticky header (unchanged)
├─────────────────────────────────────┤
│  Foundations │ Data │ Forms │ ...    │  ← tab bar (new, also sticky)
├─────────────────────────────────────┤
│                                     │
│  [scrollable content for active tab]│
│                                     │
└─────────────────────────────────────┘
```

### Tab Bar

- Sticky below the header
- Active tab: accent underline + glow (terminal aesthetic)
- URL hash sync (`#foundations`, `#data-display`, etc.) for linkability
- Client-side state only, no router
- Separate component from the `TerminalTabs` molecule (page chrome, not content)

### File Structure

```
src/app/
├── page.tsx              ← slim shell (~40 lines): header + tab bar + active tab
├── theme-switcher.tsx    ← unchanged
├── tabs/
│   ├── foundations.tsx
│   ├── data-display.tsx
│   ├── forms.tsx
│   ├── feedback.tsx
│   ├── navigation.tsx
│   └── effects.tsx
└── scroll-effects-demo.tsx  ← unchanged, imported by effects tab
```

### Tab Content Mapping

**Foundations** — Building blocks and visual language.
- BlinkingCursor (3 variants), StatusDot, HudLabel, ServiceTag
- TextFlicker, GlitchText
- GlowLine, GlowBorder, CornerNotch
- Badge (5 variants), TerminalTopBar (2 variants)
- DotGrid, ScanlineOverlay (background overlays)
- Future: typography scale, buttons, icons, color palette

**Data Display** — Showing information.
- TerminalCard, TerminalWindow, TerminalPrompt
- DataTable (sortable)
- StatCard (4 animated counters)
- ProcessCard (6 process entries)
- TerminalTabs (as content demo)
- Future: code blocks, key-value lists, timelines

**Forms** — User input.
- CommandInput
- Checkbox, RadioGroup, Toggle
- Select, MultiSelect
- SearchInput, Textarea
- Future: buttons (submit/reset context), file upload, date picker, validation patterns

**Feedback** — System responses and overlays.
- Alert (4 variants)
- ProgressBar (determinate + indeterminate)
- DataStream (as loading indicator)
- Future: modal, toasts, tooltips, FAQ accordion, loading skeletons, empty states

**Navigation** — Page structure and wayfinding.
- "Coming soon" placeholder initially
- Future: navbar, sidebar, breadcrumbs, footer, pagination

**Effects** — Animations and scroll-driven behavior.
- FadeIn (directional demos)
- ScrollProgressBar
- StickySection (scroll-through demo)
- TypewriterText
- Parallax (useParallax demo)
- Future: hover effects showcase, transition patterns

### Empty Tab Handling

Tabs with no content yet (Navigation) show a centered placeholder: `HudLabel` with "COMING SOON" text + `BlinkingCursor`.

### What Changes

- `page.tsx` shrinks from ~640 to ~40 lines
- Content is moved as-is into tab files (no component rewrites)
- `ScrollProgressBar` moves into each tab's content area
- Bottom CTA section removed (showcase chrome, not a component demo)
- Sticky header gains the tab bar below it

### What Stays the Same

- All component demos, props, and animations
- Theme switcher behavior
- FadeIn staggered reveal within each tab
- Responsive grid layouts
