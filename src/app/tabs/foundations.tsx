"use client";

import {
  Badge,
  BlinkingCursor,
  CornerNotch,
  DataStream,
  DotGrid,
  FadeIn,
  GlitchText,
  GlowBorder,
  GlowLine,
  HudLabel,
  ProgressBar,
  ScanlineOverlay,
  ServiceTag,
  StatusDot,
  TerminalTopBar,
  TextFlicker,
  TypewriterText,
} from "@/atoms";
import { Section, SectionHeading } from "@/molecules";

export function FoundationsTab() {
  return (
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
  );
}
