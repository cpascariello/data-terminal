"use client";

import {
  Badge,
  BlinkingCursor,
  Caption,
  Code,
  CornerNotch,
  DataStream,
  DotGrid,
  FadeIn,
  GlitchText,
  GlowBorder,
  GlowLine,
  Heading,
  HudLabel,
  ProgressBar,
  ScanlineOverlay,
  ServiceTag,
  StatusDot,
  TerminalTopBar,
  Text,
  TextFlicker,
  TypewriterText,
} from "@dt/atoms";
import {
  Button,
  CodeBlock,
  IconButton,
  Section,
  SectionHeading,
} from "@dt/molecules";
import { cn } from "@dt/lib/cn";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Copy,
  Database,
  Download,
  ExternalLink,
  Eye,
  Layers,
  Lock,
  Monitor,
  Network,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  Terminal,
  Trash2,
  Upload,
  Wifi,
  X,
  Zap,
} from "lucide-react";

export function FoundationsTab() {
  return (
    <>
    <Section spacing="lg">
      <SectionHeading subtitle="Atomic primitives that compose into larger patterns.">
        Atoms
      </SectionHeading>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* BlinkingCursor */}
        <FadeIn delay={0}>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>BLINKING_CURSOR</HudLabel>
            <div className="flex items-center gap-6 pt-2 font-display text-lg">
              <span className="text-foreground/50">block:</span>
              <BlinkingCursor variant="block" />
              <span className="text-foreground/50">line:</span>
              <BlinkingCursor variant="line" />
              <span className="text-foreground/50">_:</span>
              <BlinkingCursor variant="underscore" />
            </div>
          </div>
        </FadeIn>

        {/* StatusDot */}
        <FadeIn delay={0.05}>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>STATUS_DOT</HudLabel>
            <div className="flex items-center gap-4 pt-2">
              <StatusDot />
              <StatusDot speed={1} variant="success" />
              <StatusDot speed={3} variant="warning" />
              <StatusDot speed={0.5} variant="error" />
            </div>
          </div>
        </FadeIn>

        {/* HudLabel + ServiceTag */}
        <FadeIn delay={0.1}>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>LABELS_AND_TAGS</HudLabel>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <HudLabel>SYS:MONITOR</HudLabel>
              <ServiceTag tag="SVC:COMPUTE" />
              <ServiceTag tag="NET:EDGE" />
            </div>
          </div>
        </FadeIn>

        {/* TextFlicker */}
        <FadeIn delay={0.15}>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>TEXT_FLICKER</HudLabel>
            <div className="space-y-2 pt-2">
              <p className="font-display text-2xl font-bold">
                <TextFlicker>Signal Unstable</TextFlicker>
              </p>
            </div>
          </div>
        </FadeIn>

        {/* GlowLine + GlowBorder */}
        <FadeIn delay={0.2}>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>GLOW_EFFECTS</HudLabel>
            <div className="space-y-4 pt-2">
              <GlowLine />
              <GlowBorder>
                <div className="px-4 py-2 text-sm text-foreground/60">
                  Standard glow border
                </div>
              </GlowBorder>
              <GlowBorder intense>
                <div className="px-4 py-2 text-sm text-foreground/60">
                  Intense glow border
                </div>
              </GlowBorder>
            </div>
          </div>
        </FadeIn>

        {/* CornerNotch */}
        <FadeIn delay={0.25}>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>CORNER_NOTCH</HudLabel>
            <div className="pt-2">
              <CornerNotch>
                <div className="bg-foreground/[0.04] px-4 py-3 text-sm text-foreground/60">
                  Clipped top-right corner (16px)
                </div>
              </CornerNotch>
              <CornerNotch size={32} className="mt-3">
                <div className="bg-foreground/[0.04] px-4 py-3 text-sm text-foreground/60">
                  Larger notch (32px)
                </div>
              </CornerNotch>
            </div>
          </div>
        </FadeIn>

        {/* TypewriterText */}
        <FadeIn>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>TYPEWRITER_TEXT</HudLabel>
            <div className="pt-2">
              <p className="font-display text-lg">
                <TypewriterText speed={40} delay={500}>
                  Initializing data terminal...
                </TypewriterText>
              </p>
            </div>
          </div>
        </FadeIn>

        {/* GlitchText */}
        <FadeIn>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>GLITCH_TEXT</HudLabel>
            <div className="pt-2">
              <p className="font-display text-2xl font-bold">
                <GlitchText>System Corrupted</GlitchText>
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ProgressBar */}
        <FadeIn>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>PROGRESS_BAR</HudLabel>
            <div className="space-y-3 pt-2">
              <ProgressBar value={72} />
              <ProgressBar indeterminate />
            </div>
          </div>
        </FadeIn>

        {/* Badge */}
        <FadeIn>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>BADGE</HudLabel>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="success">Online</Badge>
              <Badge variant="warning">Degraded</Badge>
              <Badge variant="error">Offline</Badge>
              <Badge variant="info">v2.1.0</Badge>
              <Badge variant="neutral">Beta</Badge>
            </div>
          </div>
        </FadeIn>

        {/* DataStream */}
        <FadeIn>
          <div className="space-y-3 border border-border p-6">
            <HudLabel>DATA_STREAM</HudLabel>
            <div className="relative h-32 pt-2">
              <DataStream columns={5} speed="fast" className="h-full" />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* TerminalTopBar */}
      <div className="mt-12">
        <HudLabel>TERMINAL_TOP_BAR</HudLabel>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="border border-border">
            <TerminalTopBar
              tag="SVC:COMPUTE"
              label="node_01"
              dotsPosition="right"
            />
          </div>
          <div className="border border-border">
            <TerminalTopBar label="terminal" dotsPosition="left" />
          </div>
        </div>
      </div>

      {/* Background overlays demo */}
      <div className="mt-12">
        <HudLabel>BACKGROUND_OVERLAYS</HudLabel>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="relative h-32 overflow-hidden border border-border">
            <DotGrid />
            <div className="relative flex h-full items-center justify-center">
              <span className="font-display text-xs tracking-widest text-foreground/40">
                DOT_GRID
              </span>
            </div>
          </div>
          <div className="relative h-32 overflow-hidden border border-border">
            <ScanlineOverlay />
            <div className="relative flex h-full items-center justify-center">
              <span className="font-display text-xs tracking-widest text-foreground/40">
                SCANLINE_OVERLAY
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section spacing="lg">
      <SectionHeading subtitle="Type scale, body text, and code formatting.">
        Typography
      </SectionHeading>

      <div className="mt-12 space-y-6">
        <HudLabel>HEADING_SCALE</HudLabel>
        <FadeIn>
          <div className="space-y-4 border border-border p-6">
            <Heading level={1}>Heading Level 1</Heading>
            <Heading level={2}>Heading Level 2</Heading>
            <Heading level={3}>Heading Level 3</Heading>
            <Heading level={4}>Heading Level 4</Heading>
          </div>
          <Caption className="mt-2 block">font-heading — Inter</Caption>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-6">
        <HudLabel>TEXT_VARIANTS</HudLabel>
        <FadeIn>
          <div className="space-y-4 border border-border p-6">
            <Text variant="large">
              Large text for introductions and lead paragraphs.
            </Text>
            <Text>
              Default body text for general content and descriptions.
            </Text>
            <Text variant="small">
              Small text for secondary information and metadata.
            </Text>
            <Text variant="muted">
              Muted text for supplementary context.
            </Text>
          </div>
          <Caption className="mt-2 block">font-sans — Titillium Web</Caption>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-6">
        <HudLabel>CAPTION</HudLabel>
        <FadeIn>
          <div className="space-y-3 border border-border p-6">
            <Caption>Figure 1.0 — System diagnostic output</Caption>
          </div>
          <Caption className="mt-2 block">font-display — JetBrains Mono</Caption>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-6">
        <HudLabel>INLINE_CODE</HudLabel>
        <FadeIn>
          <div className="space-y-3 border border-border p-6">
            <Text>
              Run <Code>pnpm dev</Code> to start the development server on{" "}
              <Code>localhost:3000</Code>.
            </Text>
          </div>
          <Caption className="mt-2 block">font-mono — Source Code Pro</Caption>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-6">
        <HudLabel>CODE_BLOCK</HudLabel>
        <FadeIn>
          <CodeBlock
            language="typescript"
            code={`import { TerminalCard } from "@dt/molecules";

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

    <Section spacing="lg">
      <SectionHeading subtitle="Action triggers with variant and size options.">
        Buttons
      </SectionHeading>

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

      <div className="mt-12 space-y-6">
        <HudLabel>BUTTONS_WITH_ICONS</HudLabel>
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 border border-border p-6">
            <Button iconLeft={<Terminal size={16} />}>Open Terminal</Button>
            <Button variant="secondary" iconRight={<Download size={16} />}>
              Download
            </Button>
            <Button variant="ghost" iconLeft={<ExternalLink size={16} />}>
              View Docs
            </Button>
            <Button variant="danger" iconLeft={<Trash2 size={16} />}>
              Delete
            </Button>
          </div>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-6">
        <HudLabel>BUTTON_STATES</HudLabel>
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 border border-border p-6">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-6">
        <HudLabel>ICON_BUTTON</HudLabel>
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 border border-border p-6">
            <IconButton icon={<Settings size={18} />} aria-label="Settings" />
            <IconButton
              icon={<Copy size={18} />}
              variant="secondary"
              aria-label="Copy"
            />
            <IconButton
              icon={<Search size={18} />}
              variant="primary"
              aria-label="Search"
            />
            <IconButton
              icon={<Trash2 size={18} />}
              variant="danger"
              aria-label="Delete"
            />
          </div>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-6">
        <HudLabel>ICON_BUTTON_SIZES</HudLabel>
        <FadeIn>
          <div className="flex flex-wrap items-end gap-4 border border-border p-6">
            <IconButton
              icon={<Settings size={14} />}
              size="sm"
              aria-label="Settings small"
            />
            <IconButton
              icon={<Settings size={18} />}
              size="md"
              aria-label="Settings medium"
            />
            <IconButton
              icon={<Settings size={22} />}
              size="lg"
              aria-label="Settings large"
            />
          </div>
        </FadeIn>
      </div>
    </Section>

    <Section spacing="lg">
      <SectionHeading subtitle="Semantic design tokens from the active theme.">
        Color Tokens
      </SectionHeading>

      <div className="mt-12 space-y-8">
        <HudLabel>CORE_TOKENS</HudLabel>
        <FadeIn>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { token: "--background", label: "background", cls: "bg-background border border-border" },
              { token: "--foreground", label: "foreground", cls: "bg-foreground" },
              { token: "--accent", label: "accent", cls: "bg-accent" },
              { token: "--primary", label: "primary", cls: "bg-primary" },
              { token: "--muted", label: "muted", cls: "bg-muted" },
              { token: "--card", label: "card", cls: "bg-card border border-border" },
            ].map(({ token, label, cls }) => (
              <div key={token} className="flex items-center gap-3 border border-border p-3">
                <div className={cn("h-10 w-10 shrink-0", cls)} />
                <div>
                  <Caption className="block">{label}</Caption>
                  <span className="font-mono text-xs text-foreground/40">{token}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <HudLabel>SEMANTIC_TOKENS</HudLabel>
        <FadeIn delay={0.1}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { token: "--success", label: "success", cls: "bg-success" },
              { token: "--warning", label: "warning", cls: "bg-warning" },
              { token: "--error", label: "error", cls: "bg-error" },
              { token: "--border", label: "border", cls: "bg-border" },
              { token: "--ring", label: "ring", cls: "bg-ring" },
              { token: "--input", label: "input", cls: "bg-input" },
            ].map(({ token, label, cls }) => (
              <div key={token} className="flex items-center gap-3 border border-border p-3">
                <div className={cn("h-10 w-10 shrink-0", cls)} />
                <div>
                  <Caption className="block">{label}</Caption>
                  <span className="font-mono text-xs text-foreground/40">{token}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <HudLabel>FOREGROUND_PAIRINGS</HudLabel>
        <FadeIn delay={0.2}>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { bg: "bg-accent", fg: "text-accent-foreground", label: "accent / accent-foreground" },
              { bg: "bg-primary", fg: "text-primary-foreground", label: "primary / primary-foreground" },
              { bg: "bg-muted", fg: "text-muted-foreground", label: "muted / muted-foreground" },
              { bg: "bg-card", fg: "text-card-foreground", label: "card / card-foreground" },
            ].map(({ bg, fg, label }) => (
              <div key={label} className={cn("p-4", bg)}>
                <span className={cn("font-display text-sm", fg)}>{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>

    <Section spacing="lg">
      <SectionHeading subtitle="Lucide icons used throughout the design system.">
        Icons
      </SectionHeading>

      <div className="mt-12 space-y-6">
        <HudLabel>SYSTEM_ICONS</HudLabel>
        <FadeIn>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
            {[
              { icon: Terminal, name: "Terminal" },
              { icon: Monitor, name: "Monitor" },
              { icon: Server, name: "Server" },
              { icon: Database, name: "Database" },
              { icon: Network, name: "Network" },
              { icon: Wifi, name: "Wifi" },
              { icon: Shield, name: "Shield" },
              { icon: Lock, name: "Lock" },
              { icon: Activity, name: "Activity" },
              { icon: Zap, name: "Zap" },
              { icon: Layers, name: "Layers" },
              { icon: Eye, name: "Eye" },
              { icon: Settings, name: "Settings" },
              { icon: RefreshCw, name: "RefreshCw" },
              { icon: Upload, name: "Upload" },
              { icon: Download, name: "Download" },
            ].map(({ icon: IconComp, name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 border border-border p-3 transition-colors hover:border-border-hover"
              >
                <IconComp size={20} className="text-foreground/70" />
                <span className="font-display text-[10px] uppercase tracking-wider text-foreground/40">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <HudLabel>ACTION_ICONS</HudLabel>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
            {[
              { icon: Search, name: "Search" },
              { icon: Copy, name: "Copy" },
              { icon: Trash2, name: "Trash" },
              { icon: ExternalLink, name: "External" },
              { icon: ChevronDown, name: "Chevron" },
              { icon: X, name: "Close" },
              { icon: CheckCircle, name: "Check" },
              { icon: AlertTriangle, name: "Warning" },
            ].map(({ icon: IconComp, name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 border border-border p-3 transition-colors hover:border-border-hover"
              >
                <IconComp size={20} className="text-foreground/70" />
                <span className="font-display text-[10px] uppercase tracking-wider text-foreground/40">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
    </>
  );
}
