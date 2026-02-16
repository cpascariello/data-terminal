# Typography & Button Components Design

## Typography

### Heading (atom)

Renders `h1`–`h4` with `font-heading`.

| Level | Element | Size | Weight | Tracking |
|-------|---------|------|--------|----------|
| 1 | `h1` | `text-4xl md:text-5xl` | bold | tight |
| 2 | `h2` | `text-3xl md:text-4xl` | bold | tight |
| 3 | `h3` | `text-2xl md:text-3xl` | semibold | tight |
| 4 | `h4` | `text-xl md:text-2xl` | semibold | normal |

Props: `level` (1-4), `children`, `className`. Color: `text-foreground`.

Lower-level primitive than `SectionHeading` — `SectionHeading` stays as-is for section titles with cursor/subtitle.

### Text (atom)

Body text using `font-sans`.

| Variant | Size | Color |
|---------|------|-------|
| `body` (default) | `text-base` | `text-foreground/80` |
| `large` | `text-lg` | `text-foreground/80` |
| `small` | `text-sm` | `text-foreground/60` |
| `muted` | `text-base` | `text-muted-foreground` |

Props: `variant`, `as` (span or p, defaults to p), `children`, `className`.

### Caption (atom)

Small descriptive text using `font-display` (JetBrains Mono). Uppercase, wide tracking — same aesthetic as `HudLabel` but semantically for captions/annotations.

Size: `text-xs`, color: `text-foreground/50`, tracking: `tracking-wide`. Renders `<span>`.

Props: `children`, `className`.

### Code (atom)

Inline code using `font-mono`.

Style: `font-mono text-sm`, `bg-foreground/[0.06]`, `border border-border`, `px-1.5 py-0.5`, `text-accent`.

Props: `children`, `className`. Renders `<code>`.

### CodeBlock (molecule)

Multi-line code with Shiki syntax highlighting, line numbers, copy button.

- Shiki at build time (server component compatible)
- `font-mono` for code text
- `bg-card`, `border-border`
- `TerminalTopBar` at top with language as label
- Line numbers in `text-muted-foreground`
- Copy button top-right, copies raw code to clipboard
- `<pre>` with horizontal scroll
- Custom Shiki theme mapping to CSS custom properties (works across all 5 themes)

Props: `code` (string), `language` (string), `showLineNumbers` (boolean, default true), `className`.

## Buttons

### Button (molecule)

Single component with variant prop, 3 sizes, optional icons.

#### Variants

| Variant | Background | Border | Text | Hover |
|---------|-----------|--------|------|-------|
| `primary` | `bg-accent` | none | `text-accent-foreground` | glow + brightness shift |
| `secondary` | `bg-transparent` | `border-border` | `text-foreground` | `border-border-hover`, faint glow |
| `ghost` | `bg-transparent` | none | `text-foreground/70` | `bg-foreground/[0.06]` |
| `link` | none | none | `text-accent` | underline |
| `danger` | `bg-error/10` | `border-error/30` | `text-error` | `bg-error/20` |

#### Sizes

| Size | Padding | Text |
|------|---------|------|
| `sm` | `px-3 py-1` | `text-xs` |
| `md` (default) | `px-4 py-2` | `text-sm` |
| `lg` | `px-6 py-3` | `text-base` |

Font: `font-display` uppercase `tracking-wider`.

#### Icons

`iconLeft` and `iconRight` props accept `ReactNode`. `gap-2` between icon and text.

#### States

- Disabled: `opacity-50`, `cursor-not-allowed`
- Focus: `ring-2 ring-ring ring-offset-2 ring-offset-background` via `focus-visible`
- Active: `active:scale-[0.98]`

#### HTML

Renders `<button>` by default. `as` prop to render as `<a>`.

### IconButton (molecule)

Square icon-only button. Same variant system as `Button`.

Props: `icon` (ReactNode, required), `variant`, `size`, `aria-label` (required), `className`.

Sizes: `sm` = 32px, `md` = 40px, `lg` = 48px.

## Showcase

Typography demos go in the Foundations tab. Button demos go in the Foundations tab alongside badges and other primitives.
