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
- `CLAUDE.md` -- update the Current Features list if user-facing behavior changed
- `docs/DECISIONS.md` -- log any key decisions made during the feature
- `docs/BACKLOG.md` -- move completed items to Completed section, add any deferred ideas

**Checklist before merge:**
1. ARCHITECTURE.md updated?
2. CLAUDE.md features updated?
3. DECISIONS.md has implementation decisions?
4. BACKLOG.md item moved to Completed?

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
pnpm lint       # Lint
```

### Key Directories

```
src/
├── app/          # Pages/routes (Next.js App Router)
├── atoms/        # Atomic UI primitives (BlinkingCursor, StatusDot, etc.)
├── molecules/    # Composed components (TerminalCard, Section, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Utilities (cn)
├── providers/    # Context providers (ThemeProvider)
├── theme/        # CSS tokens, animations, utilities, fonts
└── fonts/        # Local font files (.woff2)
```

### Current Features

- Multi-theme system (dark, light, contrast, warm, cool)
- CSS custom property tokens with OKLCH colors
- Terminal animations (blink, glitch, scan, data-flow)
- Reduced-motion support
- Theme persistence via localStorage

### Component Inventory

> Update this list when adding, removing, or renaming components.

#### Atoms (`src/atoms/`)
(populated as components are created)

#### Molecules (`src/molecules/`)
(populated as components are created)

#### Hooks (`src/hooks/`)
(populated as hooks are created)

#### Providers (`src/providers/`)
(populated as providers are created)
