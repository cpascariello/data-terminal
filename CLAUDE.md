# Working Habits

Persistent habits for maintaining project memory across sessions.

---

## Quick Start

**Sync up:** Say "sync up" or "catch me up" to restore context at session start.

---

## Three Habits

### 1. Decision Logging

Log decisions to `docs/DECISIONS.md` when these phrases appear:
- "decided" / "let's go with" / "rejected"
- "choosing X because" / "not doing X because"
- "actually, let's" / "changed my mind"

Before proposing anything, check if it contradicts a past decision. If conflict found:
> This would contradict Decision #N (summary). Override?

**Format:**
```
## Decision #[N] - [Date]
**Context:** [What we were working on]
**Decision:** [What was decided]
**Rationale:** [Why - this is the important part]
**Alternatives considered:** [If any were discussed]
```

### 2. Scope Drift Detection

**This is an active interrupt, not a passive log.**

When the conversation drifts from the stated task:
1. Stop and say: "This is drifting from [original task]. Add to backlog and refocus, or pivot?"
2. If backlog: log to `docs/BACKLOG.md` and return to the original task
3. If pivot: continue, but note the scope change

**Triggers to watch for:**
- "Would it be useful to add X?" (when X wasn't part of original request)
- "We could also do Y" (when Y is unrelated to core ask)
- "While we're at it, let's add Z"
- Any work that extends beyond what was asked

**Do NOT flag** clarifying questions about the core feature or technical approaches to achieve the original goal.

**Backlog format:**
```
### [Date] - [Short title]
**Source:** Identified while working on [context]
**Description:** [What needs to be done]
**Priority:** Low/Medium/High
```

### 3. Git Discipline

**Branching:**
- Brainstorm and plan on main
- When dev starts, create feature branch from main before any file edits
- Branch naming: `feature/[plan-name]`

**Before merging:** Update ALL docs before squash merging to main.
- `docs/ARCHITECTURE.md` -- add/update patterns for any new architectural decisions, new files, or changed structure
- `docs/DESIGN-SYSTEM.md` -- add/update API reference (props, usage examples) for any new or changed components
- `CLAUDE.md` -- update the Current Features list and Component Inventory if user-facing behavior changed
- `docs/DECISIONS.md` -- log any key decisions made during the feature
- `docs/BACKLOG.md` -- move completed items to Completed section, add any deferred ideas

**Checklist before merge:**
1. ARCHITECTURE.md updated?
2. DESIGN-SYSTEM.md has entries for new/changed components?
3. CLAUDE.md features and inventory updated?
4. DECISIONS.md has implementation decisions?
5. BACKLOG.md item moved to Completed?

**During development:** Track intent, not metrics.

- **Scope drift:** "This started as [X] but now includes [Y]. Commit [X] first?"
- **Feature complete:** When user says "done" or "that's it" -> squash merge to main
- **Pre-break:** When user says "break", "later", "tomorrow" -> "Push before you go?"

**Completion:** Squash merge keeps main history clean (one commit per feature).

Never interrupt based on file count or commit count.

---

## Context Recovery

On "sync up" or "catch me up":

1. Read `docs/DECISIONS.md`, `docs/BACKLOG.md`, `docs/ARCHITECTURE.md`
2. Check git status (branch, uncommitted changes, unpushed commits)
3. Check recent git log for context
4. Summarize:
   - Last decision logged
   - Open backlog items
   - Any blockers
   - Git status
5. State readiness

---

## Docs

| File | Purpose |
|------|---------|
| `docs/DECISIONS.md` | Decision log with rationale |
| `docs/BACKLOG.md` | Parking lot for scope creep and deferred ideas |
| `docs/ARCHITECTURE.md` | Technical patterns, component structure, and recipes |
| `docs/DESIGN-SYSTEM.md` | API reference with usage examples and prop tables |
| `docs/plans/` | Design and implementation plans (read-only reference) |

---

## Skill Integration

Skills (superpowers) are tools, not separate processes. Use them naturally:

- **Brainstorming:** Use for non-trivial design work. Flag scope creep during brainstorming.
- **Planning:** Use `writing-plans` or `EnterPlanMode` for multi-file changes, new features, unclear requirements.
- **Implementation:** Use `subagent-driven-development` or `executing-plans` for complex implementations.
- **Debugging state/sync bugs:** Before writing any fix, trace the full data flow (write -> store -> fetch -> parse -> render). Identify all integration points that need coordinated changes. Don't patch one step without understanding the chain.
- **Post-implementation:** Run build/lint verification, handle git workflow, update ARCHITECTURE.md and DECISIONS.md if new patterns or decisions emerged.

---

## Project: Data Terminal Design System

A cyberpunk terminal aesthetic design system extracted into standalone React + Tailwind components.

### Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** None
- **Deployment:** Vercel (static export compatible)

### Commands

```bash
pnpm dev        # Dev server (Turbopack)
pnpm build      # Production build
pnpm typecheck  # Type check
pnpm lint       # Lint with oxlint
```

### Key Directories

```
src/
├── app/          # Pages/routes (Next.js App Router)
│   └── tabs/     # Preview page tab content (foundations, data-display, forms, feedback, navigation, effects)
├── atoms/        # Atomic UI primitives (BlinkingCursor, StatusDot, etc.)
├── molecules/    # Composed components (TerminalCard, Section, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Utilities (cn)
├── types/        # Shared TypeScript types (NavItem)
├── providers/    # Context providers (ThemeProvider, ToastProvider)
├── theme/        # CSS tokens, animations, utilities, fonts
└── fonts/        # Local font files (.woff2)
```

### Current Features

- Multi-theme system (dark, light, contrast, warm, cool)
- CSS custom property tokens with OKLCH colors
- Terminal animations (blink, glitch, scan, data-flow)
- Scroll effects (fade-in, parallax, sticky sections, scroll progress)
- Typography system (Heading, Text, Caption, Code, CodeBlock with Shiki syntax highlighting)
- Button system (5 variants, 3 sizes, icon support, IconButton)
- Feedback components (Accordion, Modal, Toast notifications, Tooltip, Skeleton)
- Linting with oxlint (typescript, import, unicorn plugins)
- Reduced-motion support (live listener for preference changes)
- Theme persistence via localStorage
- Tabbed preview page (Foundations, Data Display, Forms, Feedback, Navigation, Effects) with hash-based routing

### Component Inventory

> Update this list when adding, removing, or renaming components.

#### Atoms (`src/atoms/`)
- `Badge` — small pill with 5 variants (success/warning/error/info/neutral), monospace uppercase
- `BlinkingCursor` — animated cursor with block, line, underscore variants
- `Caption` — small monospace uppercase annotation text (font-display)
- `Code` — inline code span with accent color and subtle background (font-mono)
- `CornerNotch` — container with clipped top-right corner
- `DataStream` — columns of scrolling random hex characters, configurable speed and column count
- `DotGrid` — decorative dot grid background overlay
- `GlitchText` — text with random characters swapping to symbols at intervals
- `GlowBorder` — container with glowing border (normal/intense)
- `GlowLine` — horizontal divider with glow effect
- `Heading` — semantic h1-h4 with 4-level type scale (font-heading)
- `HudLabel` — small uppercase tracking label
- `ProgressBar` — determinate (percentage) and indeterminate (sweeping) progress bar with glow
- `ScanlineOverlay` — CRT scanline effect overlay
- `ServiceTag` — bracketed service identifier `[TAG]`
- `StatusDot` — pulsing status indicator dot
- `TerminalTopBar` — window chrome bar with dots, optional tag/label, configurable dot position
- `Text` — body text with body/large/small/muted variants (font-sans)
- `TextFlicker` — accent-colored text with random letter opacity flicker effect
- `Skeleton` — loading placeholder with scan animation, 4 variants (text/heading/circle/card), multi-line support (server component)
- `FadeIn` — scroll-triggered fade-in with configurable direction, distance, delay, and duration (IntersectionObserver + CSS transitions)
- `ScrollProgressBar` — horizontal scroll progress indicator, CSS scroll-timeline with JS fallback, inline or fixed position
- `TypewriterText` — character-by-character text reveal with BlinkingCursor

#### Molecules (`src/molecules/`)
- `Accordion` — collapsible content sections with CSS grid height transition, chevron rotation, single/multi mode, left accent border
- `Alert` — left-border alert with icon per variant (info/success/warning/error), optional dismiss
- `Button` — action button with 5 variants (primary/secondary/ghost/link/danger), 3 sizes, optional left/right icons, renders as button or anchor
- `Checkbox` — styled native checkbox with accent glow, Check icon, optional inline label via children
- `CodeBlock` — multi-line code with Shiki syntax highlighting, TerminalTopBar, line numbers, copy button, CSS-variables theme
- `CommandInput` — terminal-styled text input with prefix and BlinkingCursor
- `DataTable` — monospaced sortable data table with HudLabel headers
- `IconButton` — square icon-only button with 4 variants (primary/secondary/ghost/danger), 3 sizes, required aria-label
- `Modal` — portal-rendered dialog with focus trap, TerminalTopBar + CornerNotch chrome, backdrop blur, 3 sizes (sm/md/lg)
- `MultiSelect` — dropdown with checkboxes for multiple selections, Badge chips for selected items
- `Navbar` — horizontal top bar with logo, nav items with compact dropdowns (via `children`) and full-width mega dropdowns (via `mega` with heading, description, links, optional featured items with images), actions slot; hover/click dropdowns, uncontrolled/controlled active state
- `ProcessCard` — card styled like a terminal process entry with PID, icon, hover scanline
- `RadioGroup` — fieldset of native radio inputs with circular accent dot indicator, vertical layout
- `SearchInput` — search icon prefix, BlinkingCursor, clear button, debounced onSearch callback
- `Sidebar` — vertical nav with collapsible icon rail, header with logo, two-level items with group expand, tooltips and flyouts when collapsed
- `Section` — layout section wrapper with spacing, dot grid, scanlines, glow border
- `SectionHeading` — heading with optional blinking cursor, subtitle, and configurable heading level (h1-h4)
- `Select` — custom dropdown with button trigger, chevron icon, positioned overlay panel
- `StatCard` — animated count-up statistic with label (uses useInView + useCountUp)
- `StickySection` — sticky scroll-through section with render prop providing progress and activeStep
- `Textarea` — multi-line terminal-styled input with autoResize option
- `TerminalCard` — card with terminal chrome, service tag, corner notch, hover scanline
- `TerminalPrompt` — CTA terminal prompt with blinking cursor
- `TerminalTabs` — tabbed content with dot indicators, accent glow, glitch-in animation
- `ToastContainer` — portal-rendered toast stack (bottom-right), slide-in/out animation, progress bar countdown, max 5
- `Toggle` — sliding switch with pill-shaped track, round thumb with accent glow
- `Tooltip` — hover/focus tooltip with 4 positions, CSS arrow, configurable delay, accent glow
- `TerminalWindow` — terminal window with command and output lines

#### Hooks (`src/hooks/`)
- `useCountUp` — rAF-based number animation with easing and reduced-motion support
- `useInView` — IntersectionObserver hook for scroll-triggered effects
- `useParallax` — rAF-throttled parallax displacement hook returning ref + style
- `useScrollProgress` — scroll progress (0–1) for page or target element, rAF-throttled
- `useTheme` — ThemeContext consumer hook

#### Providers (`src/providers/`)
- `ThemeProvider` — theme context with localStorage persistence and class toggling
- `ToastProvider` — toast context with addToast/removeToast, useToast hook, max 5 toasts
