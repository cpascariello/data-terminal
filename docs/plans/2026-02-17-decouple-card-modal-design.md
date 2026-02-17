# Decouple Card and Modal from Terminal Chrome

**Date:** 2026-02-17
**Status:** Approved

## Problem

`Modal` and `TerminalCard` hard-import terminal-specific atoms (`TerminalTopBar`, `CornerNotch`, `HoverScanline`). This makes them unusable without the terminal aesthetic. A generic Card and Modal should exist with zero terminal coupling, while the terminal variants remain as thin wrappers.

## Approach: Composition via wrapper

Create generic `Card` and `Modal` components with flexible slot props (`header`, `overlay`, `wrapper`). Terminal variants (`TerminalCard`, `TerminalModal`) wrap the generic components and inject terminal chrome through slots. No breaking changes to existing consumers.

## Components

### Card (new generic) — `src/molecules/card.tsx`

- Renders bordered container with hover shadow transition
- `header` slot above children (defaults to nothing)
- `overlay` slot for absolutely-positioned effects
- `wrapper` slot to wrap the entire card element
- Zero terminal imports

### TerminalCard (refactored) — `src/molecules/terminal-card.tsx`

Same public API. Internally wraps `Card`, passing TerminalTopBar as header, HoverScanline as overlay, CornerNotch as wrapper.

### Modal (refactored) — `src/molecules/modal.tsx`

- Keeps all generic behavior: portal, focus trap, dismiss, backdrop blur, body scroll lock, transitions
- When `header` is not provided, renders minimal header with close button and optional title
- Removes hard imports of `TerminalTopBar`, `CornerNotch`, `HoverScanline`

### TerminalModal (new wrapper) — `src/molecules/terminal-modal.tsx`

Wraps `Modal` and injects `TerminalTopBar`, `HoverScanline`, `CornerNotch` through slots.

## Migration

- Current `<Modal>` usages in preview pages switch to `<TerminalModal>`
- Current `<TerminalCard>` usages stay unchanged (same API)
- Barrel export (`molecules/index.ts`) exports: `Card`, `TerminalCard`, `Modal`, `TerminalModal`
