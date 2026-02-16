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
} from "@/atoms";
import {
  Button,
  CodeBlock,
  IconButton,
  Section,
  SectionHeading,
} from "@/molecules";
import {
  Copy,
  Download,
  ExternalLink,
  Search,
  Settings,
  Terminal,
  Trash2,
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
              <StatusDot speed={1} color="bg-success" />
              <StatusDot speed={3} color="bg-warning" />
              <StatusDot speed={0.5} color="bg-error" />
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
    </>
  );
}
