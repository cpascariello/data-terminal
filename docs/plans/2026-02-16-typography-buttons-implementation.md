# Typography & Button Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add typography atoms (Heading, Text, Caption, Code), a CodeBlock molecule with Shiki syntax highlighting, and Button/IconButton molecules to the design system.

**Architecture:** Typography components are thin atoms wrapping semantic HTML elements with design-system fonts and sizes. CodeBlock is a molecule composing TerminalTopBar + Shiki CSS-variables theme + copy button. Button is a molecule with variant/size props. All components use CSS custom properties for theming.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Shiki (syntax highlighting), Lucide React (icons)

---

### Task 1: Create feature branch

**Step 1: Create and switch to feature branch**

```bash
git checkout -b feature/typography-buttons
```

---

### Task 2: Heading atom

**Files:**
- Create: `src/atoms/heading.tsx`
- Modify: `src/atoms/index.ts`

**Step 1: Create the Heading component**

Create `src/atoms/heading.tsx`:

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
}

const levelStyles: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight md:text-5xl",
  2: "text-3xl font-bold tracking-tight md:text-4xl",
  3: "text-2xl font-semibold tracking-tight md:text-3xl",
  4: "text-xl font-semibold md:text-2xl",
};

export function Heading({ level, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={cn("font-heading text-foreground", levelStyles[level], className)}>
      {children}
    </Tag>
  );
}
```

**Step 2: Add to barrel export**

Add to `src/atoms/index.ts` (alphabetical):

```ts
export { Heading } from "./heading";
```

**Step 3: Verify**

```bash
pnpm typecheck
```

**Step 4: Commit**

```bash
git add src/atoms/heading.tsx src/atoms/index.ts
git commit -m "feat: add Heading atom with 4-level type scale"
```

---

### Task 3: Text atom

**Files:**
- Create: `src/atoms/text.tsx`
- Modify: `src/atoms/index.ts`

**Step 1: Create the Text component**

Create `src/atoms/text.tsx`:

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type TextVariant = "body" | "large" | "small" | "muted";
type TextElement = "p" | "span";

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  as?: TextElement;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  body: "text-base text-foreground/80",
  large: "text-lg text-foreground/80",
  small: "text-sm text-foreground/60",
  muted: "text-base text-muted-foreground",
};

export function Text({
  children,
  variant = "body",
  as: Tag = "p",
  className,
}: TextProps) {
  return (
    <Tag className={cn("font-sans", variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
```

**Step 2: Add to barrel export**

Add to `src/atoms/index.ts`:

```ts
export { Text } from "./text";
```

**Step 3: Verify**

```bash
pnpm typecheck
```

**Step 4: Commit**

```bash
git add src/atoms/text.tsx src/atoms/index.ts
git commit -m "feat: add Text atom with body/large/small/muted variants"
```

---

### Task 4: Caption atom

**Files:**
- Create: `src/atoms/caption.tsx`
- Modify: `src/atoms/index.ts`

**Step 1: Create the Caption component**

Create `src/atoms/caption.tsx`:

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CaptionProps {
  children: ReactNode;
  className?: string;
}

export function Caption({ children, className }: CaptionProps) {
  return (
    <span
      className={cn(
        "font-display text-xs tracking-wide text-foreground/50",
        className,
      )}
    >
      {children}
    </span>
  );
}
```

**Step 2: Add to barrel export**

Add to `src/atoms/index.ts`:

```ts
export { Caption } from "./caption";
```

**Step 3: Verify**

```bash
pnpm typecheck
```

**Step 4: Commit**

```bash
git add src/atoms/caption.tsx src/atoms/index.ts
git commit -m "feat: add Caption atom"
```

---

### Task 5: Code atom (inline)

**Files:**
- Create: `src/atoms/code.tsx`
- Modify: `src/atoms/index.ts`

**Step 1: Create the inline Code component**

Create `src/atoms/code.tsx`:

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CodeProps {
  children: ReactNode;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded-sm border border-border bg-foreground/[0.06] px-1.5 py-0.5",
        "font-mono text-sm text-accent",
        className,
      )}
    >
      {children}
    </code>
  );
}
```

**Step 2: Add to barrel export**

Add to `src/atoms/index.ts`:

```ts
export { Code } from "./code";
```

**Step 3: Verify**

```bash
pnpm typecheck
```

**Step 4: Commit**

```bash
git add src/atoms/code.tsx src/atoms/index.ts
git commit -m "feat: add inline Code atom"
```

---

### Task 6: Install Shiki and add CSS variable tokens

**Files:**
- Modify: `package.json` (via pnpm)
- Modify: `src/theme/tokens.css`

**Step 1: Install shiki**

```bash
pnpm add shiki
```

**Step 2: Add Shiki CSS variable mappings to tokens.css**

Add this block at the end of `src/theme/tokens.css`, after all theme blocks. These map Shiki's token variables to our theme tokens. Since our theme tokens are already redefined per `.theme-*` class, these mappings work automatically across all 5 themes:

```css
/* --- Shiki syntax highlighting token mapping --- */
/* Maps Shiki CSS-variables theme to design system tokens. */
/* Inherits theme automatically via the cascade.           */
:root {
  --shiki-foreground: var(--foreground);
  --shiki-background: var(--card);
  --shiki-token-constant: var(--accent);
  --shiki-token-string: var(--success);
  --shiki-token-comment: var(--muted-foreground);
  --shiki-token-keyword: var(--primary);
  --shiki-token-parameter: var(--foreground);
  --shiki-token-function: var(--accent);
  --shiki-token-string-expression: var(--success);
  --shiki-token-punctuation: var(--muted-foreground);
  --shiki-token-link: var(--accent);
}
```

**Step 3: Verify**

```bash
pnpm typecheck
```

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml src/theme/tokens.css
git commit -m "feat: install shiki, add CSS variable token mappings"
```

---

### Task 7: Create highlighter singleton

**Files:**
- Create: `src/lib/highlighter.ts`

**Step 1: Create the lazy singleton highlighter**

Create `src/lib/highlighter.ts`:

```ts
import { createHighlighter, type Highlighter } from "shiki";
import { createCssVariablesTheme } from "shiki/core";

const theme = createCssVariablesTheme({
  name: "terminal",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

let instance: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!instance) {
    instance = createHighlighter({
      themes: [theme],
      langs: [
        "typescript",
        "javascript",
        "css",
        "html",
        "bash",
        "json",
        "tsx",
        "jsx",
      ],
    });
  }
  return instance;
}
```

**Step 2: Verify**

```bash
pnpm typecheck
```

**Step 3: Commit**

```bash
git add src/lib/highlighter.ts
git commit -m "feat: add Shiki highlighter singleton with CSS variables theme"
```

---

### Task 8: CodeBlock molecule

**Files:**
- Create: `src/molecules/copy-button.tsx`
- Create: `src/molecules/code-block.tsx`
- Modify: `src/molecules/index.ts`

**Step 1: Create CopyButton (internal client component)**

Create `src/molecules/copy-button.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center justify-center rounded-sm p-1.5",
        "text-foreground/30 transition-colors hover:text-foreground/60",
        className,
      )}
      aria-label="Copy code"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
```

**Step 2: Create CodeBlock component**

Create `src/molecules/code-block.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";
import { getHighlighter } from "@/lib/highlighter";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;
    getHighlighter()
      .then((highlighter) => {
        if (cancelled) return;
        const loadedLangs = highlighter.getLoadedLanguages();
        const lang = loadedLangs.includes(language) ? language : "text";
        const result = highlighter.codeToHtml(code, {
          lang,
          theme: "terminal",
        });
        setHtml(result);
      })
      .catch(() => {
        /* fall back to plain text rendering */
      });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-border bg-card",
        className,
      )}
    >
      <TerminalTopBar label={language} dotsPosition="right" />

      <div className="absolute right-2 top-9 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton text={code} />
      </div>

      {html ? (
        <div
          className={cn(
            "overflow-x-auto font-mono text-sm",
            "[&_.shiki]:!bg-transparent [&_.shiki]:p-4",
            "[&_.shiki_code]:block [&_.shiki_code]:w-fit [&_.shiki_code]:min-w-full",
            showLineNumbers && [
              "[&_.shiki_code]:counter-reset-[line]",
              "[&_.shiki_.line]:before:mr-4 [&_.shiki_.line]:before:inline-block [&_.shiki_.line]:before:w-4 [&_.shiki_.line]:before:text-right [&_.shiki_.line]:before:text-muted-foreground/40 [&_.shiki_.line]:before:content-[counter(line)] [&_.shiki_.line]:before:counter-increment-[line]",
            ],
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 font-mono text-sm text-foreground/80">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
```

Note: The CSS counter classes for line numbers use Tailwind arbitrary properties. If `counter-reset-[line]` and `counter-increment-[line]` are not supported by Tailwind 4, add these utility classes to `src/theme/utilities.css` instead:

```css
@layer utilities {
  .code-line-numbers code {
    counter-reset: line;
  }
  .code-line-numbers .line::before {
    counter-increment: line;
    content: counter(line);
    @apply mr-4 inline-block w-4 text-right text-muted-foreground/40;
  }
}
```

And replace the `showLineNumbers` ternary with `showLineNumbers && "code-line-numbers"`.

**Step 3: Add CodeBlock to barrel export**

Add to `src/molecules/index.ts`:

```ts
export { CodeBlock } from "./code-block";
```

Note: `CopyButton` is internal — don't export it from the barrel.

**Step 4: Verify**

```bash
pnpm typecheck
```

**Step 5: Commit**

```bash
git add src/molecules/copy-button.tsx src/molecules/code-block.tsx src/molecules/index.ts
git commit -m "feat: add CodeBlock molecule with Shiki syntax highlighting"
```

If line number CSS didn't work with Tailwind arbitrary properties, also add the utilities file:

```bash
git add src/theme/utilities.css
```

---

### Task 9: Button molecule

**Files:**
- Create: `src/molecules/button.tsx`
- Modify: `src/molecules/index.ts`

**Step 1: Create the Button component**

Create `src/molecules/button.tsx`:

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent text-accent-foreground border-transparent",
    "hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--accent-glow-intense)]",
  ].join(" "),
  secondary: [
    "bg-transparent text-foreground border-border",
    "hover:border-border-hover hover:shadow-[0_0_20px_-4px_var(--accent-hover-shadow)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground/70 border-transparent",
    "hover:bg-foreground/[0.06] hover:text-foreground",
  ].join(" "),
  link: [
    "bg-transparent text-accent border-transparent px-0 py-0",
    "hover:underline",
  ].join(" "),
  danger: [
    "bg-error/10 text-error border-error/30",
    "hover:bg-error/20",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    className,
    children,
    as: Tag = "button",
    ...rest
  } = props;

  const isLink = variant === "link";

  const classes = cn(
    "inline-flex items-center justify-center border font-display uppercase tracking-wider",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    !isLink && sizeStyles[size],
    className,
  );

  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (Tag === "a") {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

Button.iconSize = iconSizes;
```

**Step 2: Add to barrel export**

Add to `src/molecules/index.ts`:

```ts
export { Button } from "./button";
```

**Step 3: Verify**

```bash
pnpm typecheck
```

**Step 4: Commit**

```bash
git add src/molecules/button.tsx src/molecules/index.ts
git commit -m "feat: add Button molecule with 5 variants and icon support"
```

---

### Task 10: IconButton molecule

**Files:**
- Create: `src/molecules/icon-button.tsx`
- Modify: `src/molecules/index.ts`

**Step 1: Create the IconButton component**

Create `src/molecules/icon-button.tsx`:

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  "aria-label": string;
  className?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary: [
    "bg-accent text-accent-foreground border-transparent",
    "hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--accent-glow-intense)]",
  ].join(" "),
  secondary: [
    "bg-transparent text-foreground border-border",
    "hover:border-border-hover hover:shadow-[0_0_20px_-4px_var(--accent-hover-shadow)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground/70 border-transparent",
    "hover:bg-foreground/[0.06] hover:text-foreground",
  ].join(" "),
  danger: [
    "bg-error/10 text-error border-error/30",
    "hover:bg-error/20",
  ].join(" "),
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border",
        "transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
```

**Step 2: Add to barrel export**

Add to `src/molecules/index.ts`:

```ts
export { IconButton } from "./icon-button";
```

**Step 3: Verify**

```bash
pnpm typecheck
```

**Step 4: Commit**

```bash
git add src/molecules/icon-button.tsx src/molecules/index.ts
git commit -m "feat: add IconButton molecule"
```

---

### Task 11: Add typography demos to Foundations tab

**Files:**
- Modify: `src/app/tabs/foundations.tsx`

**Step 1: Add typography section to FoundationsTab**

Add a new section after the existing "Atoms" section in `src/app/tabs/foundations.tsx`. Import the new components and add showcase blocks:

```tsx
// Add to imports:
import { Caption, Code, Heading, Text } from "@/atoms";
import { CodeBlock } from "@/molecules";

// Add after the closing </Section> of the Atoms section, still inside FoundationsTab:
<Section spacing="lg">
  <SectionHeading subtitle="Type scale, body text, and code formatting.">
    Typography
  </SectionHeading>

  {/* Heading scale */}
  <div className="mt-12 space-y-6">
    <HudLabel>HEADING_SCALE</HudLabel>
    <FadeIn>
      <div className="space-y-4 border border-border p-6">
        <Heading level={1}>Heading Level 1</Heading>
        <Heading level={2}>Heading Level 2</Heading>
        <Heading level={3}>Heading Level 3</Heading>
        <Heading level={4}>Heading Level 4</Heading>
      </div>
    </FadeIn>
  </div>

  {/* Text variants */}
  <div className="mt-12 space-y-6">
    <HudLabel>TEXT_VARIANTS</HudLabel>
    <FadeIn>
      <div className="space-y-4 border border-border p-6">
        <Text variant="large">Large text for introductions and lead paragraphs.</Text>
        <Text>Default body text for general content and descriptions.</Text>
        <Text variant="small">Small text for secondary information and metadata.</Text>
        <Text variant="muted">Muted text for supplementary context.</Text>
      </div>
    </FadeIn>
  </div>

  {/* Caption */}
  <div className="mt-12 space-y-6">
    <HudLabel>CAPTION</HudLabel>
    <FadeIn>
      <div className="space-y-3 border border-border p-6">
        <Caption>Figure 1.0 — System diagnostic output</Caption>
      </div>
    </FadeIn>
  </div>

  {/* Inline Code */}
  <div className="mt-12 space-y-6">
    <HudLabel>INLINE_CODE</HudLabel>
    <FadeIn>
      <div className="space-y-3 border border-border p-6">
        <Text>
          Run <Code>pnpm dev</Code> to start the development server on <Code>localhost:3000</Code>.
        </Text>
      </div>
    </FadeIn>
  </div>

  {/* CodeBlock */}
  <div className="mt-12 space-y-6">
    <HudLabel>CODE_BLOCK</HudLabel>
    <FadeIn>
      <CodeBlock
        language="typescript"
        code={`import { TerminalCard } from "@/molecules";

export function Dashboard() {
  const status = "operational";

  return (
    <TerminalCard tag="SYS:MONITOR" label="node_01">
      <p>Status: {status}</p>
    </TerminalCard>
  );
}`}
      />
    </FadeIn>
  </div>
</Section>
```

**Step 2: Verify**

```bash
pnpm typecheck && pnpm build
```

**Step 3: Commit**

```bash
git add src/app/tabs/foundations.tsx
git commit -m "feat: add typography demos to Foundations tab"
```

---

### Task 12: Add button demos to Foundations tab

**Files:**
- Modify: `src/app/tabs/foundations.tsx`

**Step 1: Add button section to FoundationsTab**

Add after the Typography section:

```tsx
// Add to imports:
import { Button, IconButton } from "@/molecules";
import { Terminal, Download, ExternalLink, Trash2, Settings, Copy, Search } from "lucide-react";

// Add after Typography section:
<Section spacing="lg">
  <SectionHeading subtitle="Action triggers with variant and size options.">
    Buttons
  </SectionHeading>

  {/* Button variants */}
  <div className="mt-12 space-y-6">
    <HudLabel>BUTTON_VARIANTS</HudLabel>
    <FadeIn>
      <div className="flex flex-wrap items-center gap-4 border border-border p-6">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link Style</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </FadeIn>
  </div>

  {/* Button sizes */}
  <div className="mt-12 space-y-6">
    <HudLabel>BUTTON_SIZES</HudLabel>
    <FadeIn>
      <div className="flex flex-wrap items-end gap-4 border border-border p-6">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </FadeIn>
  </div>

  {/* Buttons with icons */}
  <div className="mt-12 space-y-6">
    <HudLabel>BUTTONS_WITH_ICONS</HudLabel>
    <FadeIn>
      <div className="flex flex-wrap items-center gap-4 border border-border p-6">
        <Button iconLeft={<Terminal size={16} />}>Open Terminal</Button>
        <Button variant="secondary" iconRight={<Download size={16} />}>Download</Button>
        <Button variant="ghost" iconLeft={<ExternalLink size={16} />}>View Docs</Button>
        <Button variant="danger" iconLeft={<Trash2 size={16} />}>Delete</Button>
      </div>
    </FadeIn>
  </div>

  {/* Button states */}
  <div className="mt-12 space-y-6">
    <HudLabel>BUTTON_STATES</HudLabel>
    <FadeIn>
      <div className="flex flex-wrap items-center gap-4 border border-border p-6">
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
    </FadeIn>
  </div>

  {/* IconButton */}
  <div className="mt-12 space-y-6">
    <HudLabel>ICON_BUTTON</HudLabel>
    <FadeIn>
      <div className="flex flex-wrap items-center gap-4 border border-border p-6">
        <IconButton icon={<Settings size={18} />} aria-label="Settings" />
        <IconButton icon={<Copy size={18} />} variant="secondary" aria-label="Copy" />
        <IconButton icon={<Search size={18} />} variant="primary" aria-label="Search" />
        <IconButton icon={<Trash2 size={18} />} variant="danger" aria-label="Delete" />
      </div>
    </FadeIn>
  </div>

  {/* IconButton sizes */}
  <div className="mt-12 space-y-6">
    <HudLabel>ICON_BUTTON_SIZES</HudLabel>
    <FadeIn>
      <div className="flex flex-wrap items-end gap-4 border border-border p-6">
        <IconButton icon={<Settings size={14} />} size="sm" aria-label="Settings small" />
        <IconButton icon={<Settings size={18} />} size="md" aria-label="Settings medium" />
        <IconButton icon={<Settings size={22} />} size="lg" aria-label="Settings large" />
      </div>
    </FadeIn>
  </div>
</Section>
```

**Step 2: Verify**

```bash
pnpm typecheck && pnpm build
```

**Step 3: Commit**

```bash
git add src/app/tabs/foundations.tsx
git commit -m "feat: add button demos to Foundations tab"
```

---

### Task 13: Full build verification

**Step 1: Run typecheck and build**

```bash
pnpm typecheck && pnpm build
```

**Step 2: Run dev server and visually verify**

```bash
pnpm dev
```

Open `http://localhost:3000#foundations` and verify:
- Heading scale renders all 4 levels with correct sizing
- Text variants show correct font/size/color
- Caption renders monospace uppercase
- Inline Code has accent color with background
- CodeBlock shows syntax highlighting that adapts to theme changes
- CodeBlock copy button appears on hover
- CodeBlock line numbers display correctly
- All 5 button variants render with correct styles
- Button sizes are visually distinct
- Icons render left/right of button text
- Disabled buttons show reduced opacity
- IconButtons render as squares
- All components adapt correctly when switching themes

**Step 3: Fix any issues found during verification**

Address visual or functional problems before proceeding.

**Step 4: Commit any fixes**

```bash
git add -A && git commit -m "fix: address visual issues from build verification"
```

Only if there were fixes needed.

---

### Task 14: Update documentation

**Files:**
- Modify: `CLAUDE.md` (component inventory section)
- Modify: `docs/ARCHITECTURE.md`
- Modify: `docs/BACKLOG.md`

**Step 1: Update CLAUDE.md component inventory**

Add to the Atoms section (alphabetical):
- `Caption` — small monospace uppercase annotation text (font-display)
- `Code` — inline code span with accent color and subtle background (font-mono)
- `Heading` — semantic h1-h4 with 4-level type scale (font-heading)
- `Text` — body text with body/large/small/muted variants (font-sans)

Add to the Molecules section (alphabetical):
- `Button` — action button with 5 variants (primary/secondary/ghost/link/danger), 3 sizes, optional left/right icons, renders as button or anchor
- `CodeBlock` — multi-line code with Shiki syntax highlighting, TerminalTopBar, line numbers, copy button, CSS-variables theme
- `IconButton` — square icon-only button with 4 variants (primary/secondary/ghost/danger), 3 sizes, required aria-label

**Step 2: Update ARCHITECTURE.md**

Add a "Typography" pattern section:

```markdown
### Typography System
**Context:** Consistent type scale across the design system with reskinning capability.
**Approach:** Four atomic components map to semantic HTML elements with design-system fonts: `Heading` (h1-h4, font-heading), `Text` (p/span, font-sans), `Caption` (span, font-display), `Code` (code, font-mono). `CodeBlock` molecule composes TerminalTopBar + Shiki CSS-variables theme + copy button for multi-line syntax-highlighted code. Shiki token colors map to theme tokens via `--shiki-*` CSS variables defined once in `:root` of `tokens.css`, inheriting theme automatically through the cascade.
**Key files:** `src/atoms/heading.tsx`, `src/atoms/text.tsx`, `src/atoms/caption.tsx`, `src/atoms/code.tsx`, `src/molecules/code-block.tsx`, `src/lib/highlighter.ts`, `src/theme/tokens.css` (Shiki mappings)
**Notes:** `SectionHeading` remains a separate molecule for section titles with cursor/subtitle — it does not use `Heading` internally. The Shiki highlighter is a lazy singleton (`src/lib/highlighter.ts`) that loads once and caches.
```

Add a "Buttons" pattern section:

```markdown
### Buttons
**Context:** Action triggers with terminal aesthetic and variant/size system.
**Approach:** Single `Button` molecule with `variant` prop (primary/secondary/ghost/link/danger) and `size` prop (sm/md/lg). Uses `font-display` uppercase tracking like Badge/HudLabel. Supports optional `iconLeft`/`iconRight` props. Renders `<button>` by default, `<a>` via `as="a"` prop. `IconButton` is a separate molecule for square, icon-only actions with required `aria-label`.
**Key files:** `src/molecules/button.tsx`, `src/molecules/icon-button.tsx`
**Notes:** Link variant strips padding for inline text use. Danger variant exists for destructive actions.
```

**Step 3: Update BACKLOG.md**

Move "Typography components" and "Button components" from the backlog to a new "Completed" section at the bottom:

```markdown
## Completed

### 2026-02-16 - Typography components
**Completed:** 2026-02-16
**Delivered:** Heading (4-level scale), Text (4 variants), Caption, Code (inline), CodeBlock (Shiki syntax highlighting)

### 2026-02-16 - Button components
**Completed:** 2026-02-16
**Delivered:** Button (5 variants, 3 sizes, icon support), IconButton (4 variants, 3 sizes)
```

**Step 4: Verify and commit**

```bash
pnpm typecheck
git add CLAUDE.md docs/ARCHITECTURE.md docs/BACKLOG.md
git commit -m "docs: update component inventory, architecture, and backlog"
```

---

### Summary of new files

| File | Type | Description |
|------|------|-------------|
| `src/atoms/heading.tsx` | Atom | h1-h4 with type scale |
| `src/atoms/text.tsx` | Atom | Body text variants |
| `src/atoms/caption.tsx` | Atom | Monospace caption text |
| `src/atoms/code.tsx` | Atom | Inline code span |
| `src/lib/highlighter.ts` | Utility | Shiki singleton with CSS vars theme |
| `src/molecules/copy-button.tsx` | Internal | Clipboard copy button |
| `src/molecules/code-block.tsx` | Molecule | Syntax-highlighted code block |
| `src/molecules/button.tsx` | Molecule | Action button with variants |
| `src/molecules/icon-button.tsx` | Molecule | Square icon-only button |
