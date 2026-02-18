# Data Terminal Design System

A cyberpunk terminal aesthetic design system built with React + Tailwind CSS 4 + OKLCH color tokens.

## Setup

Wrap the app in `ThemeProvider`. All components use CSS custom properties — no prop-based theming.

```tsx
import { ThemeProvider } from "@dt/providers/theme-provider";

<ThemeProvider>{children}</ThemeProvider>
```

## Themes

Five themes applied via class on `<html>`. Default: `dark`. Stored in localStorage.

| Theme | Aesthetic | Accent |
|-------|-----------|--------|
| `dark` | Cyberpunk, high contrast | Yellow-green |
| `light` | Inverted dark, reduced saturation | Purple |
| `contrast` | Pure black/white, WCAG AAA | Cyan |
| `warm` | Retro amber CRT | Amber/orange |
| `cool` | Sci-fi blue | Cyan/blue |

Switch themes via `useTheme()`:

```tsx
const { theme, setTheme } = useTheme();
setTheme("warm");
```

## Color Tokens

Use as Tailwind classes. All resolve to OKLCH values per theme.

| Token | Tailwind class | Purpose |
|-------|---------------|---------|
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Primary text |
| `--accent` | `text-accent`, `bg-accent` | Highlight, interactive elements |
| `--primary` | `bg-primary` | Buttons, actions |
| `--muted` | `bg-muted`, `text-muted` | Subdued backgrounds |
| `--card` | `bg-card` | Card/panel backgrounds |
| `--border` | `border-border` | Borders |
| `--success` | `text-success` | Success state |
| `--warning` | `text-warning` | Warning state |
| `--error` | `text-error` | Error state |

Glow tokens (pre-resolved opacity variants of accent): `--accent-glow`, `--accent-glow-intense`, `--accent-glow-line`, `--accent-hover-shadow`, `--accent-scan`.

## Fonts

| Tailwind class | Font | Use for |
|----------------|------|---------|
| `font-sans` | Titillium Web | Body text |
| `font-heading` | Inter | Headings |
| `font-mono` | Source Code Pro | Code blocks |
| `font-display` | JetBrains Mono | Terminal text, labels |

---

## When to Use What

Quick guide for choosing the right component.

**Building a form?**
`Checkbox`, `RadioGroup`, `Toggle` for boolean/choice inputs. `Select` for single pick, `MultiSelect` for multiple. `SearchInput` for search with debounce. `CommandInput` for terminal-styled text input. `Textarea` for multi-line. `Button` for actions, `IconButton` for icon-only actions.

**Displaying data?**
`DataTable` for tabular data with sortable columns. `StatCard` for animated statistics. `Badge` for status labels. `ProgressBar` for determinate/indeterminate progress. `Card` for generic containers, `TerminalCard` for terminal-styled cards.

**Building navigation?**
`Navbar` for horizontal top bar with dropdowns and mega menus. `Sidebar` for vertical nav with collapsible icon rail. `TerminalTabs` for tabbed content.

**Showing feedback?**
`Alert` for inline messages. `Toast` (via `useToast`) for auto-dismissing notifications. `Modal` for generic dialogs, `TerminalModal` for terminal-styled dialogs. `Tooltip` for hover hints. `Accordion` for collapsible sections. `Skeleton` for loading placeholders.

**Layout and sections?**
`Section` for page sections with optional effects. `SectionHeading` for section titles. `StickySection` for scroll-driven sticky content. `FadeIn` for scroll-triggered animations. `ScrollProgressBar` for scroll progress.

**Typography?**
`Heading` for h1-h4. `Text` for body copy. `Caption` for small annotations. `Code` for inline code. `CodeBlock` for syntax-highlighted blocks.

**Terminal effects?**
`GlitchText`, `TextFlicker`, `TypewriterText` for text animations. `DataStream` for hex columns. `ScanlineOverlay`, `HoverScanline` for CRT effects. `DotGrid` for dot backgrounds. `GlowBorder`, `GlowLine` for glow effects. `BlinkingCursor` for cursor animation. `CornerNotch` for clipped corners. `TerminalTopBar` for window chrome.

**Generic vs Terminal?**
Use `Card` and `Modal` for theme-agnostic UI. Use `TerminalCard` and `TerminalModal` for terminal-styled UI. See the Generic/Terminal Composition pattern in `docs/ARCHITECTURE.md`.

---

## Atoms

Atomic UI primitives. Import from `@dt/atoms/<name>`.

### Caption

Small monospace uppercase annotation text.

```tsx
<Caption>Figure 1.0 — System diagnostic output</Caption>
```

Uses `font-display` (JetBrains Mono), `text-xs`, uppercase, `tracking-wide`.

**See also:** HudLabel, Text

### Code

Inline code span with accent color.

```tsx
<Text>Run <Code>pnpm dev</Code> to start the server.</Text>
```

Uses `font-mono`. Renders a `<code>` element with subtle background and accent text.

**See also:** CodeBlock

### Heading

Semantic heading with 4-level type scale.

```tsx
<Heading level={1}>System Overview</Heading>
<Heading level={3}>Subsection</Heading>
```

| Prop | Type | Default |
|------|------|---------|
| `level` | `1 \| 2 \| 3 \| 4` | required |

Uses `font-heading`. Each level maps to a responsive size (e.g., level 1 = `text-4xl md:text-5xl`).

**See also:** SectionHeading, Text

### Text

Body text with variant support.

```tsx
<Text variant="large">Lead paragraph text.</Text>
<Text>Default body text.</Text>
<Text variant="small">Secondary metadata.</Text>
<Text variant="muted">Supplementary context.</Text>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"body" \| "large" \| "small" \| "muted"` | `"body"` |
| `as` | `"p" \| "span"` | `"p"` |

Uses `font-sans`.

**See also:** Heading, Caption

### Badge

Small pill label with semantic coloring.

```tsx
<Badge variant="success">ONLINE</Badge>
<Badge variant="error">FAILED</Badge>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"success" \| "warning" \| "error" \| "info" \| "neutral"` | `"neutral"` |
| `className` | `string` | — |

**See also:** StatusDot, Alert

### BlinkingCursor

Animated terminal cursor.

```tsx
<BlinkingCursor variant="block" />
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"block" \| "line" \| "underscore"` | `"block"` |

**See also:** TypewriterText, CommandInput

### CornerNotch

Container with clipped top-right corner.

```tsx
<CornerNotch size={20}>{children}</CornerNotch>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `number` (px) | `16` |

**See also:** Card, TerminalCard

### DataStream

Scrolling hex character columns (decorative).

```tsx
<DataStream columns={4} speed="fast" />
```

| Prop | Type | Default |
|------|------|---------|
| `columns` | `number` | `3` |
| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` |

Client component. Respects reduced motion. `aria-hidden`.

### DotGrid

Decorative dot grid overlay. Position parent must be `relative`.

```tsx
<div className="relative"><DotGrid />{content}</div>
```

### GlitchText

Text with random characters swapping to symbols at intervals.

```tsx
<GlitchText>SYSTEM ONLINE</GlitchText>
```

Client component. Children must be a string. Respects reduced motion.

**See also:** TextFlicker, TypewriterText

### GlowBorder

Container with glowing border effect.

```tsx
<GlowBorder intense>{children}</GlowBorder>
```

| Prop | Type | Default |
|------|------|---------|
| `intense` | `boolean` | `false` |

**See also:** GlowLine, Section

### GlowLine

Horizontal 1px divider with glow.

```tsx
<GlowLine />
```

**See also:** GlowBorder

### HoverScanline

Reusable hover scanline effect for terminal-styled containers.

```tsx
<div className="group relative">
  {content}
  <HoverScanline intensity="subtle" speed={2} />
</div>
```

| Prop | Type | Default |
|------|------|---------|
| `intensity` | `"normal" \| "subtle"` | `"normal"` |
| `speed` | `number` (seconds) | `2` |

Server component. Parent must have `group` and `relative` classes. `aria-hidden`.

**See also:** ScanlineOverlay, TerminalCard, TerminalModal

### HudLabel

Small uppercase tracking label (10px, monospace).

```tsx
<HudLabel>SECTOR 7-G</HudLabel>
```

### ProgressBar

Determinate or indeterminate progress bar.

```tsx
<ProgressBar value={75} />
<ProgressBar indeterminate />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` (0–100) | — (required when not indeterminate) |
| `indeterminate` | `boolean` | `false` |
| `label` | `string` | — |

**See also:** Skeleton, StatCard

### ScanlineOverlay

CRT scanline effect overlay. Position parent must be `relative`.

```tsx
<div className="relative"><ScanlineOverlay />{content}</div>
```

### ServiceTag

Bracketed service identifier.

```tsx
<ServiceTag tag="SVC:MAIN" />  // renders [SVC:MAIN]
```

### StatusDot

Pulsing status indicator dot.

```tsx
<StatusDot variant="success" speed={1.5} />
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"success" \| "warning" \| "error" \| "info" \| "neutral"` | `"info"` |
| `speed` | `number` (seconds) | `2` |

**See also:** Badge

### TerminalTopBar

Window chrome bar with three dots and optional tag/label.

```tsx
<TerminalTopBar tag="SVC:DB" label="database" dotsPosition="left" />
```

| Prop | Type | Default |
|------|------|---------|
| `tag` | `string` | — |
| `label` | `string` | — |
| `dotsPosition` | `"left" \| "right"` | `"right"` |

**See also:** TerminalCard, TerminalModal, CodeBlock

### TextFlicker

Accent-colored text with random letter opacity flicker.

```tsx
<TextFlicker>TRANSMISSION ACTIVE</TextFlicker>
```

Client component. Children must be a string. Respects reduced motion.

**See also:** GlitchText, TypewriterText

### TypewriterText

Character-by-character text reveal with cursor.

```tsx
<TypewriterText speed={40} delay={500} onComplete={() => {}}>
  Initializing system...
</TypewriterText>
```

| Prop | Type | Default |
|------|------|---------|
| `speed` | `number` (ms per char) | `50` |
| `delay` | `number` (ms before start) | `0` |
| `onComplete` | `() => void` | — |

Client component. Respects reduced motion (completes instantly).

**See also:** BlinkingCursor, GlitchText, TextFlicker

### FadeIn

Scroll-triggered fade-in with directional slide.

```tsx
<FadeIn direction="up" distance={30} delay={0.2}>
  {content}
</FadeIn>
```

| Prop | Type | Default |
|------|------|---------|
| `direction` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"up"` |
| `distance` | `number` (px) | `20` |
| `delay` | `number` (seconds) | `0` |
| `duration` | `number` (seconds) | `0.6` |
| `once` | `boolean` | `true` |

Client component. Uses IntersectionObserver.

**See also:** StickySection, ScrollProgressBar

### ScrollProgressBar

Horizontal scroll progress indicator.

```tsx
<ScrollProgressBar position="fixed" showLabel glow />
<ScrollProgressBar target={sectionRef} position="inline" />
```

| Prop | Type | Default |
|------|------|---------|
| `target` | `RefObject<HTMLElement>` | — (tracks page) |
| `position` | `"inline" \| "fixed"` | `"inline"` |
| `showLabel` | `boolean` | `false` |
| `glow` | `boolean` | `true` |

Client component. Uses CSS `scroll-timeline` with JS fallback.

**See also:** FadeIn, useScrollProgress

### Skeleton

Loading placeholder with scan animation.

```tsx
<Skeleton variant="text" lines={3} />
<Skeleton variant="heading" />
<Skeleton variant="circle" />
<Skeleton variant="card" />
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"text" \| "heading" \| "circle" \| "card"` | `"text"` |
| `width` | `string \| number` | — |
| `height` | `string \| number` | — |
| `lines` | `number` | `1` |

Server component. Multi-line text uses progressively shorter widths. Scan animation via `animations.css` keyframe. `role="status"` and `aria-label="Loading"`.

**See also:** ProgressBar

---

## Molecules

Composed components. Import from `@dt/molecules/<name>`.

### Accordion

Collapsible content sections for FAQ-style layouts.

```tsx
<Accordion
  items={[
    { id: "1", title: "Question one?", children: <span>Answer one.</span> },
    { id: "2", title: "Question two?", children: <span>Answer two.</span> },
  ]}
  single
  defaultOpen={["1"]}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `items` | `{ id: string; title: string; children: ReactNode }[]` | required |
| `single` | `boolean` | `false` |
| `defaultOpen` | `string[]` | `[]` |

Client component. CSS grid height transition (`grid-template-rows: 0fr → 1fr`). Chevron rotation on expand. Left accent border on expanded items. `single` mode collapses other items when one opens.

### Button

Action button with 5 variants, 3 sizes, and optional icons.

```tsx
<Button variant="primary" size="md">Deploy</Button>
<Button variant="secondary" iconLeft={<Download size={16} />}>Download</Button>
<Button variant="ghost" iconRight={<ExternalLink size={16} />}>View Docs</Button>
<Button variant="link">Learn More</Button>
<Button variant="danger" iconLeft={<Trash2 size={16} />}>Delete</Button>
<Button as="a" href="/docs">Documentation</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "link" \| "danger"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `iconLeft` | `ReactNode` | — |
| `iconRight` | `ReactNode` | — |
| `as` | `"button" \| "a"` | `"button"` |
| `disabled` | `boolean` | `false` |

Uses `font-display` uppercase tracking. Link variant strips padding for inline use. Supports `ref` forwarding via `forwardRef`.

**See also:** IconButton

### Card

Generic card container with flexible slots for header, overlay, and wrapper.

```tsx
{/* Plain card */}
<Card className="p-6">Content here</Card>

{/* Card with custom header */}
<Card header={<div className="border-b border-border px-4 py-2">Title</div>}>
  Content here
</Card>

{/* Card with all slots */}
<Card
  header={<MyHeader />}
  overlay={<MyOverlay />}
  wrapper={(card) => <MyWrapper>{card}</MyWrapper>}
>
  Content here
</Card>
```

| Prop | Type | Default |
|------|------|---------|
| `header` | `ReactNode` | — |
| `overlay` | `ReactNode` | — |
| `wrapper` | `(card: ReactNode) => ReactNode` | — |

No terminal imports. For terminal-styled cards, use `TerminalCard` which wraps this component.

**See also:** TerminalCard

### CodeBlock

Multi-line code block with Shiki syntax highlighting.

```tsx
<CodeBlock
  language="typescript"
  code={`const status = "operational";
console.log(status);`}
  showLineNumbers
/>
```

| Prop | Type | Default |
|------|------|---------|
| `code` | `string` | required |
| `language` | `string` | required |
| `showLineNumbers` | `boolean` | `true` |

Client component. Highlights async via Shiki with CSS-variables theme — adapts to all 5 themes automatically. Shows a `TerminalTopBar` with language label and a copy button on hover. Falls back to plain monospace text while Shiki loads.

Supported languages: `typescript`, `javascript`, `tsx`, `jsx`, `css`, `html`, `bash`, `json`.

**See also:** Code

### IconButton

Square icon-only button.

```tsx
<IconButton icon={<Settings size={18} />} aria-label="Settings" />
<IconButton icon={<Trash2 size={18} />} variant="danger" size="sm" aria-label="Delete" />
```

| Prop | Type | Default |
|------|------|---------|
| `icon` | `ReactNode` | required |
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"ghost"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `aria-label` | `string` | required |
| `disabled` | `boolean` | `false` |

Sizes: sm = 32px, md = 40px, lg = 48px. Supports `ref` forwarding via `forwardRef`.

**See also:** Button

### Alert

Left-bordered alert with variant icon and optional dismiss.

```tsx
<Alert variant="warning" dismissible onDismiss={() => {}}>
  Connection unstable
</Alert>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` |
| `dismissible` | `boolean` | `false` |
| `onDismiss` | `() => void` | — |

**See also:** Toast

### Checkbox

Styled checkbox with optional label.

```tsx
<Checkbox label="SYSTEM" onChange={(checked) => {}}>
  Enable notifications
</Checkbox>
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `checked` | `boolean` | — (controlled) |
| `defaultChecked` | `boolean` | `false` |
| `onChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | `false` |
| `children` | `ReactNode` | — (inline label) |

**See also:** Toggle, RadioGroup

### CommandInput

Terminal command input with prefix and cursor.

```tsx
<CommandInput prefix="$" placeholder="enter command..." onSubmit={(val) => {}} />
```

| Prop | Type | Default |
|------|------|---------|
| `prefix` | `string` | `">"` |
| `placeholder` | `string` | `"type a command..."` |
| `onSubmit` | `(value: string) => void` | — |

**See also:** SearchInput, Textarea

### DataTable

Sortable monospaced data table.

```tsx
<DataTable
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "status", label: "Status" },
  ]}
  rows={[
    { name: "Node-1", status: <Badge variant="success">UP</Badge> },
  ]}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `columns` | `Column<K>[]` (`{ key: K; label: string; sortable?: boolean }`) | required |
| `rows` | `Record<K, ReactNode>[]` | required |

Type parameter `K extends string` ties column keys to row keys for type safety. Sortable columns render accessible `<button>` elements with `aria-sort`.

**See also:** StatCard

### Modal

Dialog overlay with focus trap, backdrop blur, and flexible chrome slots.

```tsx
{/* Minimal modal — default title bar with close button */}
<Modal open={open} onClose={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>

{/* Modal with custom header and effects */}
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm"
  header={<MyCustomHeader />}
  overlay={<MyOverlayEffect />}
  wrapper={(panel) => <MyWrapper>{panel}</MyWrapper>}
>
  <p>Are you sure?</p>
</Modal>
```

| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `title` | `string` | — |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `header` | `ReactNode` | — (default title bar) |
| `overlay` | `ReactNode` | — |
| `wrapper` | `(panel: ReactNode) => ReactNode` | — |

Client component. Portal-rendered with backdrop blur. Focus trap via Tab/Shift+Tab cycling with focus restore on close. Closes on backdrop click or Escape. Body scroll lock while open. For terminal-styled modals, use `TerminalModal`.

**See also:** TerminalModal

### MultiSelect

Dropdown with checkboxes for multiple selections.

```tsx
<MultiSelect
  label="SERVICES"
  options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]}
  value={selected}
  onChange={setSelected}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `options` | `{ value: string; label: string }[]` | required |
| `value` | `string[]` | — (controlled) |
| `defaultValue` | `string[]` | `[]` |
| `onChange` | `(value: string[]) => void` | — |
| `placeholder` | `string` | `"select..."` |
| `disabled` | `boolean` | `false` |

**See also:** Select

### ProcessCard

Card styled like a terminal process entry.

```tsx
<ProcessCard pid="0x7F" title="renderer" description="GPU pipeline active" icon={<Monitor />} />
```

| Prop | Type | Default |
|------|------|---------|
| `pid` | `string` | required |
| `title` | `string` | required |
| `description` | `string` | required |
| `icon` | `ReactNode` | — |

### RadioGroup

Fieldset of radio inputs.

```tsx
<RadioGroup
  label="PROTOCOL"
  options={[{ value: "tcp", label: "TCP" }, { value: "udp", label: "UDP" }]}
  value={protocol}
  onChange={setProtocol}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `options` | `{ value: string; label: string }[]` | required |
| `value` | `string` | — (controlled) |
| `defaultValue` | `string` | `""` |
| `onChange` | `(value: string) => void` | — |
| `disabled` | `boolean` | `false` |

**See also:** Checkbox, Toggle

### SearchInput

Search input with icon, cursor, clear button, and debounced callback.

```tsx
<SearchInput label="SEARCH" onSearch={(query) => {}} debounceMs={200} />
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `placeholder` | `string` | `"search..."` |
| `value` | `string` | — (controlled) |
| `defaultValue` | `string` | `""` |
| `onSearch` | `(value: string) => void` | — (debounced) |
| `onChange` | `(value: string) => void` | — (immediate) |
| `debounceMs` | `number` | `300` |

**See also:** CommandInput

### Select

Custom dropdown select.

```tsx
<Select
  label="REGION"
  options={[{ value: "us", label: "US-EAST" }, { value: "eu", label: "EU-WEST" }]}
  value={region}
  onChange={setRegion}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `options` | `{ value: string; label: string }[]` | required |
| `value` | `string` | — (controlled) |
| `defaultValue` | `string` | `""` |
| `onChange` | `(value: string) => void` | — |
| `placeholder` | `string` | `"select..."` |
| `disabled` | `boolean` | `false` |

**See also:** MultiSelect

### Section

Layout section wrapper with optional effects.

```tsx
<Section spacing="lg" dotGrid scanlines glow id="hero">
  {content}
</Section>
```

| Prop | Type | Default |
|------|------|---------|
| `spacing` | `"sm" \| "md" \| "lg" \| "xl" \| "none"` | `"lg"` |
| `dotGrid` | `boolean` | `false` |
| `scanlines` | `boolean` | `false` |
| `glow` | `boolean` | `false` |
| `glowIntense` | `boolean` | `false` |
| `id` | `string` | — |

**See also:** SectionHeading, StickySection

### SectionHeading

Heading with optional cursor and subtitle.

```tsx
<SectionHeading as="h1" subtitle="System diagnostics" cursor>
  DASHBOARD
</SectionHeading>
```

| Prop | Type | Default |
|------|------|---------|
| `as` | `"h1" \| "h2" \| "h3" \| "h4"` | `"h2"` |
| `subtitle` | `string` | — |
| `cursor` | `boolean` | `true` |

**See also:** Heading, Section

### StatCard

Animated count-up statistic triggered on scroll.

```tsx
<StatCard to={99.9} label="UPTIME" suffix="%" decimals={1} />
```

| Prop | Type | Default |
|------|------|---------|
| `to` | `number` | required |
| `label` | `string` | required |
| `prefix` | `string` | `""` |
| `suffix` | `string` | `""` |
| `decimals` | `number` | `0` |

**See also:** DataTable, ProgressBar

### StickySection

Sticky scroll-through section with progress render prop.

```tsx
<StickySection steps={3} stepHeight="100vh">
  {({ progress, activeStep }) => (
    <div>Step {activeStep}, progress: {Math.round(progress * 100)}%</div>
  )}
</StickySection>
```

| Prop | Type | Default |
|------|------|---------|
| `steps` | `number` | required |
| `stepHeight` | `string` | `"100vh"` |
| `children` | `(state: { progress: number; activeStep: number }) => ReactNode` | required |

**See also:** Section, FadeIn

### TerminalCard

Card with terminal chrome, notch, and hover scanline.

```tsx
<TerminalCard tag="SVC:AUTH" label="auth-service">
  {content}
</TerminalCard>
```

| Prop | Type | Default |
|------|------|---------|
| `tag` | `string` | — |
| `label` | `string` | — |
| `notch` | `boolean` | `true` |
| `scanline` | `boolean` | `true` |

**See also:** Card

### TerminalModal

Modal with terminal chrome (TerminalTopBar, CornerNotch, HoverScanline). Wraps generic `Modal`.

```tsx
<TerminalModal open={open} onClose={() => setOpen(false)} title="SYS:CONFIRM" size="sm">
  <p>Are you sure?</p>
</TerminalModal>
```

| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `title` | `string` | — |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |

For custom-styled modals without terminal chrome, use `Modal` directly with `header`/`overlay`/`wrapper` slots.

**See also:** Modal

### TerminalPrompt

Terminal prompt display with `$` prefix and cursor.

```tsx
<TerminalPrompt command="npm run deploy" />
```

| Prop | Type | Default |
|------|------|---------|
| `command` | `string` | required |

### TerminalTabs

Tabbed content with dot indicators and glitch-in animation.

```tsx
<TerminalTabs
  tabs={[
    { label: "LOGS", content: <div>...</div> },
    { label: "METRICS", content: <div>...</div> },
  ]}
  defaultIndex={0}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `tabs` | `{ label: string; content: ReactNode }[]` | required |
| `defaultIndex` | `number` | `0` |

### TerminalWindow

Terminal window with command and output lines.

```tsx
<TerminalWindow label="build" command="pnpm build" output={["✓ compiled", "✓ 0 errors"]} />
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `command` | `string` | required |
| `output` | `string[]` | `[]` |
| `children` | `ReactNode` | — |

### Textarea

Multi-line terminal-styled input.

```tsx
<Textarea label="MESSAGE" autoResize rows={3} maxRows={8} onChange={(val) => {}} />
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `placeholder` | `string` | `"enter text..."` |
| `value` | `string` | — (controlled) |
| `defaultValue` | `string` | `""` |
| `onChange` | `(value: string) => void` | — |
| `rows` | `number` | `4` |
| `maxRows` | `number` | `12` |
| `autoResize` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

**See also:** CommandInput, SearchInput

### Toggle

Sliding switch with accent glow.

```tsx
<Toggle label="AUTO-SYNC" checked={enabled} onChange={setEnabled}>
  Enable automatic synchronization
</Toggle>
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `checked` | `boolean` | — (controlled) |
| `defaultChecked` | `boolean` | `false` |
| `onChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | `false` |
| `children` | `ReactNode` | — (inline label) |

**See also:** Checkbox, RadioGroup

### Toast Notifications

Auto-dismissing notification toasts with variant styles. Requires `ToastProvider` wrapping the app and `ToastContainer` in the layout.

```tsx
// layout.tsx
<ToastProvider>
  {children}
  <ToastContainer />
</ToastProvider>

// In any component
const { addToast } = useToast();
addToast({ message: "Deployment complete.", variant: "success" });
addToast({ message: "Memory at 92%.", variant: "warning", duration: 8000 });
```

**addToast input:**

| Field | Type | Default |
|-------|------|---------|
| `message` | `string` | required |
| `variant` | `"success" \| "error" \| "warning" \| "info"` | required |
| `duration` | `number` (ms) | `5000` |

Client component. Portal-rendered, stacked bottom-right, max 5 toasts. Slide-in/out animation. Progress bar countdown. Variant icons match Alert. Scanline hover effect.

**See also:** Alert

### Tooltip

Hover/focus tooltip with directional positioning.

```tsx
<Tooltip content="Settings panel" position="top" delay={200}>
  <Button>Hover me</Button>
</Tooltip>
```

| Prop | Type | Default |
|------|------|---------|
| `content` | `ReactNode` | required |
| `children` | `ReactElement` | required |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` |
| `delay` | `number` (ms) | `200` |

Client component. CSS border triangle arrows. Focus + hover accessible. Accent glow shadow. `font-display` uppercase styling.

**See also:** Alert

### Navbar

Horizontal top bar navigation with compact and mega dropdown menus.

```tsx
<Navbar
  items={[
    { id: "home", label: "Home" },
    // Compact dropdown (via children)
    { id: "tools", label: "Tools", children: [
      { id: "editor", label: "Editor", icon: <Code size={14} /> },
    ]},
    // Mega dropdown (via mega)
    { id: "about", label: "About", mega: {
      heading: "Company",
      description: "Learn more about our mission.",
      links: [
        { id: "team", label: "Team" },
        { id: "careers", label: "Careers" },
      ],
      featured: [
        { id: "news", title: "Latest News", subtitle: "Q1 update", image: "/news.jpg" },
      ],
    }},
  ]}
  defaultActiveId="home"
  onNavigate={(id) => {}}
  logo={<span>LOGO</span>}
  actions={<ThemeSwitcher />}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `items` | `NavItem[]` | required |
| `activeId` | `string` | — (controlled) |
| `defaultActiveId` | `string` | `""` |
| `onNavigate` | `(id: string) => void` | — |
| `logo` | `ReactNode` | — |
| `actions` | `ReactNode` | — |

**NavItem.mega** — `MegaDropdownConfig`:

| Field | Type | Description |
|-------|------|-------------|
| `heading` | `string?` | Small uppercase label above links |
| `description` | `string?` | Introductory paragraph (renders above links) |
| `links` | `NavItem[]?` | Navigation links in the left column |
| `featured` | `MegaDropdownFeatured[]?` | Featured items with images (right column) |

**MegaDropdownFeatured**:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `title` | `string` | Card title |
| `subtitle` | `string?` | Card subtitle |
| `image` | `string` | Image URL |
| `href` | `string?` | Optional link |

When `mega` is set, it takes priority over `children`. The mega panel spans the full navbar width. When `featured` items are present, the layout splits into a left column (heading + description + links) and a right area (featured cards in a grid). Without featured items, the panel is single-column.

Dropdowns open on hover (150ms delay) and click. Close on mouse leave, outside click, or Escape. Active item shows accent border glow. Parent containers must not have `overflow-hidden`.

### Sidebar

Vertical navigation with collapsible icon rail.

```tsx
<Sidebar
  items={[
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} />, children: [
      { id: "profile", label: "Profile", icon: <User size={14} /> },
    ]},
  ]}
  defaultActiveId="home"
  onNavigate={(id) => {}}
  header={{ logo: <span>APP</span>, collapsedLogo: <span>A</span> }}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `items` | `NavItem[]` | required |
| `activeId` | `string` | — (controlled) |
| `defaultActiveId` | `string` | `""` |
| `onNavigate` | `(id: string) => void` | — |
| `header` | `{ logo: ReactNode; collapsedLogo: ReactNode }` | — |
| `collapsed` | `boolean` | — (controlled) |
| `defaultCollapsed` | `boolean` | `false` |
| `onCollapsedChange` | `(collapsed: boolean) => void` | — |

Expanded: 240px with icon + label. Collapsed: 56px icon rail with tooltips/flyouts. Built-in collapse toggle at bottom.

---

## Hooks

Import from `@dt/hooks/<name>`.

### useTheme

Access current theme and setter. Must be inside `ThemeProvider`.

```tsx
const { theme, setTheme } = useTheme();
// theme: "dark" | "light" | "contrast" | "warm" | "cool"
```

### useInView

IntersectionObserver for scroll-triggered effects.

```tsx
const { ref, isInView } = useInView<HTMLDivElement>({ once: true, margin: "-64px" });
return <div ref={ref}>{isInView && <Content />}</div>;
```

| Option | Type | Default |
|--------|------|---------|
| `once` | `boolean` | `true` |
| `margin` | `string` | `"-64px"` |

### useCountUp

Animated number counting. Respects reduced motion.

```tsx
const value = useCountUp({ to: 1500, duration: 2000, decimals: 0, enabled: isInView });
// returns formatted string: "1,500"
```

| Option | Type | Default |
|--------|------|---------|
| `from` | `number` | `0` |
| `to` | `number` | required |
| `duration` | `number` (ms) | `2000` |
| `decimals` | `number` | `0` |
| `enabled` | `boolean` | `true` |

### useParallax

Scroll-driven parallax displacement. Respects reduced motion.

```tsx
const { ref, style } = useParallax<HTMLDivElement>({ speed: 0.3, direction: "vertical" });
return <div ref={ref} style={style}>Parallax content</div>;
```

| Option | Type | Default |
|--------|------|---------|
| `speed` | `number` (0–1) | `0.5` |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` |

### useDismiss

Click-outside and Escape key dismissal for dropdowns and modals.

```tsx
const ref = useRef<HTMLDivElement>(null);
const handleClose = useCallback(() => setOpen(false), []);
useDismiss(ref, handleClose, open);
```

| Param | Type | Default |
|-------|------|---------|
| `ref` | `RefObject<HTMLElement \| null>` | required |
| `onDismiss` | `() => void` | required |
| `enabled` | `boolean` | `true` |

Uses `mousedown` for click-outside (not `click`). Checks `instanceof Node` before `contains()`.

### useScrollProgress

Scroll progress 0–1 for page or target element. rAF-throttled.

```tsx
const progress = useScrollProgress({ target: sectionRef, enabled: true });
// progress: 0.0 to 1.0
```

| Option | Type | Default |
|--------|------|---------|
| `target` | `RefObject<HTMLElement>` | — (page scroll) |
| `enabled` | `boolean` | `true` |

**See also:** ScrollProgressBar

---

## CSS Utility Classes

Apply directly on elements for terminal effects.

| Class | Effect |
|-------|--------|
| `terminal-grid` | Dot grid overlay (needs `relative` parent) |
| `terminal-scanlines` | CRT scanline overlay (needs `relative` parent) |
| `terminal-glow-border` | Top/bottom glowing border |
| `terminal-glow-border-intense` | Intense glow border with inset shadow |
| `animate-reveal` | Fade-in + slide-up (0.4s) |
| `animate-glitch-in` | Clip-path glitch reveal (0.15s) |
| `pulse-ring` | Expanding ring animation via `::after` |
| `scroll-fade-in` | CSS scroll-timeline fade-in |
| `scroll-fade-in-up` | Scroll-driven fade from bottom |
| `scroll-fade-in-down` | Scroll-driven fade from top |
| `scroll-fade-in-left` | Scroll-driven fade from right |
| `scroll-fade-in-right` | Scroll-driven fade from left |
| `scroll-progress` | Scroll-driven scaleX for progress bars |

All animations respect `prefers-reduced-motion`.

---

## Patterns

### Form components

All form molecules (Checkbox, RadioGroup, Select, MultiSelect, SearchInput, Textarea, Toggle) share a pattern:
- **Controlled:** pass `value` + `onChange`
- **Uncontrolled:** pass `defaultValue` (or nothing)
- **Labels:** pass `label` for a HudLabel above the input
- **Inline labels:** pass `children` for text next to the control (Checkbox, Toggle)

### Composing a page section

```tsx
<Section spacing="lg" dotGrid glow>
  <SectionHeading as="h2" subtitle="Real-time metrics">
    DASHBOARD
  </SectionHeading>
  <div className="grid grid-cols-3 gap-6">
    <FadeIn delay={0}><StatCard to={99.9} label="UPTIME" suffix="%" decimals={1} /></FadeIn>
    <FadeIn delay={0.1}><StatCard to={2048} label="NODES" /></FadeIn>
    <FadeIn delay={0.2}><StatCard to={15} label="LATENCY" suffix="ms" /></FadeIn>
  </div>
</Section>
```

### Terminal card with data

```tsx
<TerminalCard tag="SVC:DB" label="database">
  <DataTable
    columns={[
      { key: "query", label: "Query", sortable: true },
      { key: "time", label: "Time (ms)", sortable: true },
      { key: "status", label: "Status" },
    ]}
    rows={[
      { query: "SELECT *", time: "12", status: <Badge variant="success">OK</Badge> },
    ]}
  />
</TerminalCard>
```

### Sticky scroll storytelling

```tsx
<StickySection steps={4}>
  {({ activeStep }) => (
    <div>
      {activeStep === 0 && <TypewriterText>Booting system...</TypewriterText>}
      {activeStep === 1 && <TypewriterText>Loading modules...</TypewriterText>}
      {activeStep === 2 && <TypewriterText>Running diagnostics...</TypewriterText>}
      {activeStep === 3 && <GlitchText>SYSTEM ONLINE</GlitchText>}
    </div>
  )}
</StickySection>
```

---

## Preview Page

The preview page (`/`) is organized into 6 functional tabs. Each tab is a file under `src/app/tabs/`.

| Tab | File | Content |
|-----|------|---------|
| Foundations | `foundations.tsx` | Atomic primitives, typography, buttons, color tokens, icons |
| Data Display | `data-display.tsx` | Terminal cards, stats, processes, boot sequence, tabs, tables, prompt |
| Forms | `forms.tsx` | Command input, checkboxes, radios, toggles, selects, search, textarea |
| Feedback | `feedback.tsx` | Alerts, toasts, modal, accordion, tooltips, skeleton, progress, data stream |
| Navigation | `navigation.tsx` | Navbar (horizontal with dropdowns), Sidebar (expanded + collapsed demos) |
| Effects | `effects.tsx` | Scroll progress, fade-in directions, typewriter, parallax, sticky sections |

Tab state is managed via `useState` with URL hash sync (`#foundations`, `#data-display`, etc.). To add a new component demo, add it to the appropriate tab file.
