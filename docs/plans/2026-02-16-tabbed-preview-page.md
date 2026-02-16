# Tabbed Preview Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reorganize the single-scroll preview page into six functional tabs (Foundations, Data Display, Forms, Feedback, Navigation, Effects).

**Architecture:** Extract each content section from `page.tsx` into a dedicated tab file in `src/app/tabs/`. The page shell manages tab state via `useState` + URL hash sync. Each tab is a client component rendering its own scrollable section.

**Tech Stack:** React, Next.js App Router, Tailwind CSS 4

---

### Task 1: Create the Foundations tab

Extract the atoms showcase section from `page.tsx` into a new tab file.

**Files:**
- Create: `src/app/tabs/foundations.tsx`

**Step 1: Create the Foundations tab component**

```tsx
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
              <TerminalTopBar tag="SVC:COMPUTE" label="node_01" dotsPosition="right" />
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
    </>
  );
}
```

**Step 2: Verify it compiles**

Run: `pnpm typecheck`
Expected: PASS (no type errors)

---

### Task 2: Create the Data Display tab

Extract terminal cards, stats, processes, boot sequence, terminal tabs, data table, and terminal prompt sections.

**Files:**
- Create: `src/app/tabs/data-display.tsx`

**Step 1: Create the Data Display tab component**

```tsx
import {
  Server,
  Cpu,
  Database,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { FadeIn, GlowLine } from "@/atoms";
import {
  DataTable,
  ProcessCard,
  Section,
  SectionHeading,
  StatCard,
  TerminalCard,
  TerminalPrompt,
  TerminalTabs,
  TerminalWindow,
} from "@/molecules";

export function DataDisplayTab() {
  return (
    <>
      {/* Terminal Cards */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Components composed from atoms with layout and behavior.">
          Terminal Cards
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TerminalCard tag="SVC:COMPUTE" label="cluster_01">
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Edge Computing
                </h3>
                <p className="mt-2 text-sm text-foreground/50">
                  Distributed compute nodes processing data at the network edge
                  with sub-millisecond latency.
                </p>
              </div>
            </TerminalCard>

            <TerminalCard tag="SVC:STORAGE" label="vault_07">
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Data Vault
                </h3>
                <p className="mt-2 text-sm text-foreground/50">
                  Encrypted distributed storage with automatic replication across
                  three geographic zones.
                </p>
              </div>
            </TerminalCard>

            <TerminalCard tag="SVC:NETWORK" label="mesh_03">
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Neural Mesh
                </h3>
                <p className="mt-2 text-sm text-foreground/50">
                  Self-healing network fabric with adaptive routing and zero-trust
                  authentication at every hop.
                </p>
              </div>
            </TerminalCard>
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* Stats Section */}
      <Section spacing="lg" glow>
        <SectionHeading subtitle="System telemetry and performance metrics.">
          System Stats
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard to={99.97} suffix="%" decimals={2} label="UPTIME_SCORE" />
            <StatCard to={847} suffix="ms" label="AVG_RESPONSE_TIME" />
            <StatCard to={12} suffix="M+" label="REQUESTS_DAILY" />
            <StatCard to={256} label="ACTIVE_NODES" />
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* Process Cards */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Active system processes and their current state.">
          Processes
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProcessCard
              pid="001"
              title="Data Ingestion"
              description="Real-time data pipeline processing streaming events from distributed sensors and APIs."
              icon={<Database size={24} />}
            />
            <ProcessCard
              pid="002"
              title="Compute Engine"
              description="Parallel processing engine for running analytical workloads across the cluster."
              icon={<Cpu size={24} />}
            />
            <ProcessCard
              pid="003"
              title="Security Monitor"
              description="Continuous threat detection and automated response across all network endpoints."
              icon={<Shield size={24} />}
            />
            <ProcessCard
              pid="004"
              title="Edge Relay"
              description="Low-latency relay nodes for distributing processed data to edge consumers."
              icon={<Zap size={24} />}
            />
            <ProcessCard
              pid="005"
              title="API Gateway"
              description="Unified entry point handling authentication, rate limiting, and request routing."
              icon={<Globe size={24} />}
            />
            <ProcessCard
              pid="006"
              title="Cluster Manager"
              description="Orchestration layer managing node health, scaling, and workload distribution."
              icon={<Server size={24} />}
            />
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* Boot Sequence */}
      <Section spacing="lg">
        <SectionHeading subtitle="System initialization and startup sequence.">
          Boot Sequence
        </SectionHeading>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TerminalWindow
            label="step_1"
            command="init --system-check"
            output={[
              "checking hardware...",
              "memory: 256GB OK",
              "cpu: 64 cores OK",
              "network: 10Gbps OK",
            ]}
          />
          <TerminalWindow
            label="step_2"
            command="load --config production"
            output={[
              "loading config...",
              "environment: production",
              "region: us-east-1",
              "cluster: primary",
            ]}
          />
          <TerminalWindow
            label="step_3"
            command="connect --mesh all"
            output={[
              "connecting to mesh...",
              "nodes discovered: 256",
              "handshake: complete",
              "status: ONLINE",
            ]}
          />
        </div>
      </Section>

      <GlowLine />

      {/* Terminal Tabs */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Tabbed content with glitch transitions.">
          Terminal Tabs
        </SectionHeading>

        <div className="mt-12">
          <TerminalTabs
            tabs={[
              {
                label: "LOGS",
                content: (
                  <div className="space-y-1 font-display text-sm text-foreground/60">
                    <div>[00:12:34] Connection established</div>
                    <div>[00:12:35] Authenticating...</div>
                    <div>[00:12:35] Session initialized</div>
                    <div>[00:12:36] Ready for input</div>
                  </div>
                ),
              },
              {
                label: "METRICS",
                content: (
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard to={99.9} suffix="%" decimals={1} label="UPTIME" />
                    <StatCard to={42} suffix="ms" label="LATENCY" />
                  </div>
                ),
              },
              {
                label: "CONFIG",
                content: (
                  <div className="space-y-1 font-display text-sm text-foreground/60">
                    <div>region: us-east-1</div>
                    <div>cluster: production</div>
                    <div>replicas: 3</div>
                    <div>auto_scale: true</div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <GlowLine />

      {/* Data Table */}
      <Section spacing="lg">
        <SectionHeading subtitle="Sortable data grid for system records.">
          Data Table
        </SectionHeading>

        <div className="mt-12">
          <DataTable
            columns={[
              { key: "pid", label: "PID", sortable: true },
              { key: "name", label: "Process", sortable: true },
              { key: "cpu", label: "CPU %", sortable: true },
              { key: "status", label: "Status" },
            ]}
            rows={[
              { pid: "001", name: "data-ingestion", cpu: "12.4", status: "running" },
              { pid: "002", name: "compute-engine", cpu: "45.2", status: "running" },
              { pid: "003", name: "security-monitor", cpu: "3.1", status: "idle" },
              { pid: "004", name: "edge-relay", cpu: "28.7", status: "running" },
              { pid: "005", name: "api-gateway", cpu: "8.9", status: "running" },
            ]}
          />
        </div>
      </Section>

      <GlowLine />

      {/* Terminal Prompt */}
      <Section spacing="lg">
        <SectionHeading subtitle="Terminal prompt for CTA displays.">
          Terminal Prompt
        </SectionHeading>

        <div className="mt-12 max-w-xl">
          <TerminalPrompt command="npx create-data-terminal my-project" />
        </div>
      </Section>
    </>
  );
}
```

**Step 2: Verify it compiles**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 3: Create the Forms tab

Extract form elements and command input sections.

**Files:**
- Create: `src/app/tabs/forms.tsx`

**Step 1: Create the Forms tab component**

```tsx
"use client";

import { GlowLine } from "@/atoms";
import {
  Checkbox,
  CommandInput,
  MultiSelect,
  RadioGroup,
  SearchInput,
  Section,
  SectionHeading,
  Select,
  Textarea,
  Toggle,
} from "@/molecules";

export function FormsTab() {
  return (
    <>
      {/* Command Input */}
      <Section spacing="lg">
        <SectionHeading subtitle="Interactive terminal command input.">
          Command Input
        </SectionHeading>

        <div className="mt-12 max-w-xl">
          <CommandInput placeholder="enter command..." />
        </div>
      </Section>

      <GlowLine />

      {/* Form Elements */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Terminal-styled form controls with built-in state management.">
          Form Elements
        </SectionHeading>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Checkbox */}
          <div className="space-y-3 border border-border p-6">
            <Checkbox label="CHECKBOX" defaultChecked>
              Enable notifications
            </Checkbox>
            <Checkbox>Auto-deploy on merge</Checkbox>
            <Checkbox disabled>Maintenance mode</Checkbox>
          </div>

          {/* RadioGroup */}
          <div className="space-y-3 border border-border p-6">
            <RadioGroup
              label="RADIO_GROUP"
              defaultValue="production"
              options={[
                { value: "production", label: "Production" },
                { value: "staging", label: "Staging" },
                { value: "development", label: "Development" },
              ]}
            />
          </div>

          {/* Toggle */}
          <div className="space-y-3 border border-border p-6">
            <Toggle label="TOGGLE" defaultChecked>
              Dark mode
            </Toggle>
            <Toggle>Verbose logging</Toggle>
            <Toggle disabled>Read-only mode</Toggle>
          </div>

          {/* Select */}
          <div className="space-y-3 border border-border p-6">
            <Select
              label="SELECT"
              placeholder="choose region..."
              options={[
                { value: "us-east-1", label: "US East (N. Virginia)" },
                { value: "us-west-2", label: "US West (Oregon)" },
                { value: "eu-west-1", label: "EU (Ireland)" },
                { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
              ]}
            />
          </div>

          {/* MultiSelect */}
          <div className="space-y-3 border border-border p-6">
            <MultiSelect
              label="MULTI_SELECT"
              placeholder="select services..."
              options={[
                { value: "compute", label: "Compute" },
                { value: "storage", label: "Storage" },
                { value: "network", label: "Network" },
                { value: "security", label: "Security" },
              ]}
            />
          </div>

          {/* SearchInput */}
          <div className="space-y-3 border border-border p-6">
            <SearchInput label="SEARCH_INPUT" placeholder="search nodes..." />
          </div>
        </div>

        {/* Textarea - full width */}
        <div className="mt-8 max-w-xl">
          <Textarea
            label="TEXTAREA"
            placeholder="enter command output..."
            rows={3}
            autoResize
          />
        </div>
      </Section>
    </>
  );
}
```

**Step 2: Verify it compiles**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 4: Create the Feedback tab

Extract alerts and add ProgressBar + DataStream demos.

**Files:**
- Create: `src/app/tabs/feedback.tsx`

**Step 1: Create the Feedback tab component**

```tsx
"use client";

import { DataStream, FadeIn, GlowLine, ProgressBar } from "@/atoms";
import { Alert, Section, SectionHeading } from "@/molecules";

export function FeedbackTab() {
  return (
    <>
      {/* Alerts */}
      <Section spacing="lg">
        <SectionHeading subtitle="System messages and feedback indicators.">
          Alerts
        </SectionHeading>

        <div className="mt-12 space-y-4">
          <Alert variant="info">
            System update available. Run &apos;update --latest&apos; to install.
          </Alert>
          <Alert variant="success">
            Deployment complete. All 256 nodes reporting healthy.
          </Alert>
          <Alert variant="warning">
            Memory usage at 87%. Consider scaling compute resources.
          </Alert>
          <Alert variant="error" dismissible>
            Connection to node_042 lost. Automatic failover initiated.
          </Alert>
        </div>
      </Section>

      <GlowLine />

      {/* Progress Indicators */}
      <Section spacing="lg">
        <SectionHeading subtitle="Determinate and indeterminate progress indicators.">
          Progress
        </SectionHeading>

        <div className="mt-12 max-w-xl space-y-6">
          <FadeIn>
            <div className="space-y-2">
              <span className="font-display text-xs tracking-widest text-foreground/40">
                DETERMINATE (72%)
              </span>
              <ProgressBar value={72} />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-2">
              <span className="font-display text-xs tracking-widest text-foreground/40">
                INDETERMINATE
              </span>
              <ProgressBar indeterminate />
            </div>
          </FadeIn>
        </div>
      </Section>

      <GlowLine />

      {/* Data Stream as loading indicator */}
      <Section spacing="lg">
        <SectionHeading subtitle="Streaming data visualization as a loading state.">
          Data Stream
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 max-w-xl">
            <div className="relative h-40 overflow-hidden border border-border">
              <DataStream columns={6} speed="fast" className="h-full" />
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
```

**Step 2: Verify it compiles**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 5: Create the Navigation tab (coming soon placeholder)

**Files:**
- Create: `src/app/tabs/navigation.tsx`

**Step 1: Create the placeholder component**

```tsx
import { BlinkingCursor, HudLabel } from "@/atoms";
import { Section } from "@/molecules";

export function NavigationTab() {
  return (
    <Section spacing="xl">
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
        <HudLabel>MODULE::NAVIGATION</HudLabel>
        <p className="font-display text-lg text-foreground/30">
          COMING SOON <BlinkingCursor />
        </p>
        <p className="max-w-md text-center text-sm text-foreground/20">
          Navbar, sidebar, breadcrumbs, footer, and pagination components.
        </p>
      </div>
    </Section>
  );
}
```

**Step 2: Verify it compiles**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 6: Create the Effects tab

Move scroll effects demo and add FadeIn direction demos + TypewriterText demo.

**Files:**
- Create: `src/app/tabs/effects.tsx`

**Step 1: Create the Effects tab component**

```tsx
"use client";

import {
  FadeIn,
  GlowLine,
  HudLabel,
  ScrollProgressBar,
  TypewriterText,
} from "@/atoms";
import { Section, SectionHeading } from "@/molecules";
import { ScrollEffectsDemo } from "../scroll-effects-demo";

export function EffectsTab() {
  return (
    <>
      {/* Scroll Progress */}
      <Section spacing="lg">
        <SectionHeading subtitle="Horizontal scroll progress indicator.">
          Scroll Progress
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 max-w-xl space-y-4">
            <HudLabel>INLINE_PROGRESS</HudLabel>
            <ScrollProgressBar position="inline" glow showLabel />
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* FadeIn Directions */}
      <Section spacing="lg">
        <SectionHeading subtitle="Scroll-triggered fade-in with directional slide.">
          Fade In
        </SectionHeading>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <FadeIn direction="up">
            <div className="border border-border p-6 text-center">
              <HudLabel>DIRECTION: UP</HudLabel>
            </div>
          </FadeIn>
          <FadeIn direction="down">
            <div className="border border-border p-6 text-center">
              <HudLabel>DIRECTION: DOWN</HudLabel>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div className="border border-border p-6 text-center">
              <HudLabel>DIRECTION: LEFT</HudLabel>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div className="border border-border p-6 text-center">
              <HudLabel>DIRECTION: RIGHT</HudLabel>
            </div>
          </FadeIn>
        </div>
      </Section>

      <GlowLine />

      {/* TypewriterText */}
      <Section spacing="lg">
        <SectionHeading subtitle="Character-by-character text reveal animation.">
          Typewriter Text
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 max-w-xl">
            <p className="font-display text-lg">
              <TypewriterText speed={40} delay={500}>
                Initializing data terminal systems...
              </TypewriterText>
            </p>
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* Sticky Section / Scroll Effects */}
      <ScrollEffectsDemo />
    </>
  );
}
```

**Step 2: Verify it compiles**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 7: Create the tab bar barrel export

**Files:**
- Create: `src/app/tabs/index.ts`

**Step 1: Create the barrel export**

```ts
export { DataDisplayTab } from "./data-display";
export { EffectsTab } from "./effects";
export { FeedbackTab } from "./feedback";
export { FormsTab } from "./forms";
export { FoundationsTab } from "./foundations";
export { NavigationTab } from "./navigation";
```

**Step 2: Verify it compiles**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 8: Rewrite page.tsx as tab shell

Replace the 640-line page with the slim tab shell.

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

**Step 1: Rewrite page.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import {
  DataDisplayTab,
  EffectsTab,
  FeedbackTab,
  FormsTab,
  FoundationsTab,
  NavigationTab,
} from "./tabs";

const TABS = [
  { id: "foundations", label: "Foundations", component: FoundationsTab },
  { id: "data-display", label: "Data Display", component: DataDisplayTab },
  { id: "forms", label: "Forms", component: FormsTab },
  { id: "feedback", label: "Feedback", component: FeedbackTab },
  { id: "navigation", label: "Navigation", component: NavigationTab },
  { id: "effects", label: "Effects", component: EffectsTab },
] as const;

function getInitialTab(): string {
  if (typeof window === "undefined") return TABS[0].id;
  const hash = window.location.hash.slice(1);
  return TABS.some((t) => t.id === hash) ? hash : TABS[0].id;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.slice(1);
      if (TABS.some((t) => t.id === hash)) {
        setActiveTab(hash);
      }
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function selectTab(id: string) {
    setActiveTab(id);
    window.location.hash = id;
    window.scrollTo({ top: 0 });
  }

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component ?? FoundationsTab;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <span className="font-display text-sm tracking-wider text-accent">
            DATA_TERMINAL
          </span>
          <ThemeSwitcher />
        </div>

        {/* Tab bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Component categories">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => selectTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-1 pb-3 font-display text-xs tracking-widest transition-colors ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground/40 hover:text-foreground/60"
                }`}
                style={
                  activeTab === tab.id
                    ? { textShadow: "0 0 8px var(--accent-glow-line)" }
                    : undefined
                }
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <ActiveComponent />
    </main>
  );
}
```

**Step 2: Verify it compiles and renders**

Run: `pnpm typecheck`
Expected: PASS

Run: `pnpm build`
Expected: PASS — no build errors

**Step 3: Commit**

```bash
git add src/app/tabs/ src/app/page.tsx
git commit -m "feat: reorganize preview page into functional tabs

Split the single-scroll showcase into six tabs:
Foundations, Data Display, Forms, Feedback, Navigation, Effects.
Tab state syncs with URL hash for linkability."
```

---

### Task 9: Visual verification and cleanup

**Step 1: Run dev server and verify each tab**

Run: `pnpm dev`

Check each tab in the browser:
- `#foundations` — all atoms visible, FadeIn animations trigger
- `#data-display` — terminal cards, stats, processes, boot sequence, tabs, data table, prompt
- `#forms` — command input, all form controls, textarea
- `#feedback` — alerts, progress bars, data stream
- `#navigation` — "coming soon" placeholder
- `#effects` — scroll progress, fade-in directions, typewriter, sticky scroll demo

**Step 2: Verify tab switching**

- Clicking tabs switches content
- URL hash updates
- Browser back/forward navigates tabs
- Page scrolls to top on tab switch
- Tab bar stays sticky below header

**Step 3: Verify responsive layout**

- Tab bar scrolls horizontally on mobile
- Content grids collapse properly on small screens
