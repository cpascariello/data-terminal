import {
  Server,
  Cpu,
  Database,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import {
  Badge,
  BlinkingCursor,
  CornerNotch,
  DataStream,
  DotGrid,
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
import {
  Alert,
  Checkbox,
  CommandInput,
  DataTable,
  MultiSelect,
  ProcessCard,
  RadioGroup,
  SearchInput,
  Section,
  SectionHeading,
  Select,
  StatCard,
  TerminalCard,
  TerminalPrompt,
  TerminalTabs,
  Textarea,
  Toggle,
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

          {/* TextFlicker */}
          <div className="space-y-3 border border-border p-6">
            <HudLabel>TEXT_FLICKER</HudLabel>
            <div className="space-y-2 pt-2">
              <p className="font-display text-2xl font-bold">
                <TextFlicker>Signal Unstable</TextFlicker>
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

          {/* TypewriterText */}
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

          {/* GlitchText */}
          <div className="space-y-3 border border-border p-6">
            <HudLabel>GLITCH_TEXT</HudLabel>
            <div className="pt-2">
              <p className="font-display text-2xl font-bold">
                <GlitchText>System Corrupted</GlitchText>
              </p>
            </div>
          </div>

          {/* ProgressBar */}
          <div className="space-y-3 border border-border p-6">
            <HudLabel>PROGRESS_BAR</HudLabel>
            <div className="space-y-3 pt-2">
              <ProgressBar value={72} />
              <ProgressBar indeterminate />
            </div>
          </div>

          {/* Badge */}
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

          {/* DataStream */}
          <div className="space-y-3 border border-border p-6">
            <HudLabel>DATA_STREAM</HudLabel>
            <div className="relative h-32 pt-2">
              <DataStream columns={5} speed="fast" className="h-full" />
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

      {/* Alerts */}
      <Section spacing="lg" id="alerts">
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

      {/* Terminal Tabs */}
      <Section spacing="lg" dotGrid id="tabs">
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
      <Section spacing="lg" id="table">
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

      {/* Command Input */}
      <Section spacing="lg" id="input">
        <SectionHeading subtitle="Interactive terminal command input.">
          Command Input
        </SectionHeading>

        <div className="mt-12 max-w-xl">
          <CommandInput placeholder="enter command..." />
        </div>
      </Section>

      <GlowLine />

      {/* Form Elements */}
      <Section spacing="lg" dotGrid id="forms">
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
