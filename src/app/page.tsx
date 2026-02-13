import {
  Server,
  Cpu,
  Database,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import {
  BlinkingCursor,
  CornerNotch,
  DotGrid,
  GlowBorder,
  GlowLine,
  HudLabel,
  ScanlineOverlay,
  ServiceTag,
  StatusDot,
  TerminalTopBar,
  TextGradient,
} from "@/atoms";
import {
  ProcessCard,
  Section,
  SectionHeading,
  StatCard,
  TerminalCard,
  TerminalPrompt,
  TerminalWindow,
} from "@/molecules";
import { ThemeSwitcher } from "./theme-switcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header with theme switcher */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <span className="font-display text-sm tracking-wider text-accent">
            DATA_TERMINAL
          </span>
          <ThemeSwitcher />
        </div>
      </div>

      {/* ===== ATOMS SHOWCASE ===== */}
      <Section spacing="lg" id="atoms">
        <SectionHeading subtitle="Atomic primitives that compose into larger patterns.">
          Atoms
        </SectionHeading>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* BlinkingCursor */}
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

          {/* StatusDot */}
          <div className="space-y-3 border border-border p-6">
            <HudLabel>STATUS_DOT</HudLabel>
            <div className="flex items-center gap-4 pt-2">
              <StatusDot />
              <StatusDot speed={1} color="bg-success" />
              <StatusDot speed={3} color="bg-warning" />
              <StatusDot speed={0.5} color="bg-error" />
            </div>
          </div>

          {/* HudLabel + ServiceTag */}
          <div className="space-y-3 border border-border p-6">
            <HudLabel>LABELS_AND_TAGS</HudLabel>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <HudLabel>SYS:MONITOR</HudLabel>
              <ServiceTag tag="SVC:COMPUTE" />
              <ServiceTag tag="NET:EDGE" />
            </div>
          </div>

          {/* TextGradient */}
          <div className="space-y-3 border border-border p-6">
            <HudLabel>TEXT_GRADIENT</HudLabel>
            <div className="space-y-2 pt-2">
              <p className="font-display text-2xl font-bold">
                <TextGradient variant="main">Main Gradient</TextGradient>
              </p>
              <p className="font-display text-2xl font-bold">
                <TextGradient variant="accent">Accent Gradient</TextGradient>
              </p>
            </div>
          </div>

          {/* GlowLine + GlowBorder */}
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

          {/* CornerNotch */}
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

      <GlowLine />

      {/* ===== MOLECULES SHOWCASE ===== */}

      {/* Terminal Cards */}
      <Section spacing="lg" dotGrid id="molecules">
        <SectionHeading subtitle="Components composed from atoms with layout and behavior.">
          Molecules
        </SectionHeading>

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
      </Section>

      <GlowLine />

      {/* Stats Section */}
      <Section spacing="lg" glow id="stats">
        <SectionHeading subtitle="System telemetry and performance metrics.">
          System Stats
        </SectionHeading>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard to={99.97} suffix="%" decimals={2} label="UPTIME_SCORE" />
          <StatCard to={847} suffix="ms" label="AVG_RESPONSE_TIME" />
          <StatCard to={12} suffix="M+" label="REQUESTS_DAILY" />
          <StatCard to={256} label="ACTIVE_NODES" />
        </div>
      </Section>

      <GlowLine />

      {/* Process Cards */}
      <Section spacing="lg" dotGrid id="processes">
        <SectionHeading subtitle="Active system processes and their current state.">
          Processes
        </SectionHeading>

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
      </Section>

      <GlowLine />

      {/* Boot Sequence */}
      <Section spacing="lg" id="boot">
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

      {/* CTA Terminal Prompt */}
      <Section spacing="xl" glowIntense id="cta">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to deploy?
          </h2>
          <p className="mt-4 text-foreground/50">
            Initialize your terminal session and start building with the Data
            Terminal design system.
          </p>
          <div className="mt-8">
            <TerminalPrompt command="npx create-data-terminal my-project" />
          </div>
        </div>
      </Section>
    </main>
  );
}
