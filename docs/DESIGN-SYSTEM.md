# Data Terminal Design System

A cyberpunk terminal aesthetic design system built with React + Tailwind CSS 4 + OKLCH color tokens.

## Setup

Wrap the app in `ThemeProvider`. All components use CSS custom properties — no prop-based theming.

```tsx
import { ThemeProvider } from "@/providers/theme-provider";

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

## Atoms

Atomic UI primitives. Import from `@/atoms/<name>`.

### Caption

Small monospace uppercase annotation text.

```tsx
<Caption>Figure 1.0 — System diagnostic output</Caption>
```

Uses `font-display` (JetBrains Mono), `text-xs`, uppercase, `tracking-wide`.

### Code

Inline code span with accent color.

```tsx
<Text>Run <Code>pnpm dev</Code> to start the server.</Text>
```

Uses `font-mono`. Renders a `<code>` element with subtle background and accent text.

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

### BlinkingCursor

Animated terminal cursor.

```tsx
<BlinkingCursor variant="block" />
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"block" \| "line" \| "underscore"` | `"block"` |

### CornerNotch

Container with clipped top-right corner.

```tsx
<CornerNotch size={20}>{children}</CornerNotch>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `number` (px) | `16` |

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

### GlowBorder

Container with glowing border effect.

```tsx
<GlowBorder intense>{children}</GlowBorder>
```

| Prop | Type | Default |
|------|------|---------|
| `intense` | `boolean` | `false` |

### GlowLine

Horizontal 1px divider with glow.

```tsx
<GlowLine />
```

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
| `value` | `number` (0–100) | `0` |
| `indeterminate` | `boolean` | `false` |

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
<StatusDot color="bg-success" speed={1.5} />
```

| Prop | Type | Default |
|------|------|---------|
| `color` | `string` (Tailwind bg class) | `"bg-accent"` |
| `speed` | `number` (seconds) | `2` |

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

### TextFlicker

Accent-colored text with random letter opacity flicker.

```tsx
<TextFlicker>TRANSMISSION ACTIVE</TextFlicker>
```

Client component. Children must be a string. Respects reduced motion.

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

---

## Molecules

Composed components. Import from `@/molecules/<name>`.

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

Uses `font-display` uppercase tracking. Link variant strips padding for inline use.

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

Sizes: sm = 32px, md = 40px, lg = 48px.

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
| `columns` | `{ key: string; label: string; sortable?: boolean }[]` | required |
| `rows` | `Record<string, ReactNode>[]` | required |

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

### Navbar

Horizontal top bar navigation with dropdown menus.

```tsx
<Navbar
  items={[
    { id: "home", label: "Home" },
    { id: "tools", label: "Tools", children: [
      { id: "editor", label: "Editor", icon: <Code size={14} /> },
    ]},
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

Dropdowns open on hover (150ms delay) and click. Close on mouse leave, outside click, or Escape. Active item shows accent border glow.

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

Import from `@/hooks/<name>`.

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
| Foundations | `foundations.tsx` | Atomic primitives, typography (headings, text, code), buttons |
| Data Display | `data-display.tsx` | Terminal cards, stats, processes, boot sequence, tabs, tables, prompt |
| Forms | `forms.tsx` | Command input, checkboxes, radios, toggles, selects, search, textarea |
| Feedback | `feedback.tsx` | Alerts, progress bars, data stream |
| Navigation | `navigation.tsx` | Navbar (horizontal with dropdowns), Sidebar (expanded + collapsed demos) |
| Effects | `effects.tsx` | Scroll progress, fade-in directions, typewriter, sticky sections |

Tab state is managed via `useState` with URL hash sync (`#foundations`, `#data-display`, etc.). To add a new component demo, add it to the appropriate tab file.
